export type Theme = 'light' | 'dark';

export interface SolarLocation {
  latitude: number;
  longitude: number;
  timezone?: string;
}

interface SolarThemeSchedule {
  theme: Theme;
  sunrise: Date;
  sunset: Date;
  nextTransition: Date;
  nextTheme: Theme;
}

const CHONGQING: SolarLocation = {
  latitude: 29.56,
  longitude: 106.55,
  timezone: 'Asia/Shanghai',
};

const ZENITH = 90.833;
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

interface ZonedDateParts {
  year: number;
  month: number;
  day: number;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

function normalize(value: number, max: number): number {
  return ((value % max) + max) % max;
}

function getZonedDateParts(date: Date, timezone?: string): ZonedDateParts {
  if (!timezone) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  };
}

function getDayOfYear(parts: ZonedDateParts): number {
  const start = Date.UTC(parts.year, 0, 0);
  const current = Date.UTC(parts.year, parts.month - 1, parts.day);
  return Math.floor((current - start) / DAY_MS);
}

function getTimeZoneOffsetHours(date: Date, timezone?: string): number {
  if (!timezone) {
    return -date.getTimezoneOffset() / 60;
  }

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    hourCycle: 'h23',
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const zonedAsUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  );

  return (zonedAsUtc - date.getTime()) / HOUR_MS;
}

function makeLocalTime(parts: ZonedDateParts, decimalHours: number, timezone?: string): Date {
  const hours = Math.floor(decimalHours);
  const minutesFloat = (decimalHours - hours) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Math.round((minutesFloat - minutes) * 60);

  if (!timezone) {
    return new Date(parts.year, parts.month - 1, parts.day, hours, minutes, seconds);
  }

  const localAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, hours, minutes, seconds);
  const offsetHours = getTimeZoneOffsetHours(new Date(localAsUtc), timezone);
  return new Date(localAsUtc - offsetHours * HOUR_MS);
}

function calculateSolarEvent(date: Date, location: SolarLocation, isSunrise: boolean): Date {
  const dateParts = getZonedDateParts(date, location.timezone);
  const dayOfYear = getDayOfYear(dateParts);
  const longitudeHour = location.longitude / 15;
  const approximateTime = dayOfYear + ((isSunrise ? 6 : 18) - longitudeHour) / 24;
  const meanAnomaly = 0.9856 * approximateTime - 3.289;

  const trueLongitude = normalize(
    meanAnomaly +
      1.916 * Math.sin(toRadians(meanAnomaly)) +
      0.02 * Math.sin(toRadians(2 * meanAnomaly)) +
      282.634,
    360
  );

  let rightAscension = normalize(toDegrees(Math.atan(0.91764 * Math.tan(toRadians(trueLongitude)))), 360);
  const longitudeQuadrant = Math.floor(trueLongitude / 90) * 90;
  const ascensionQuadrant = Math.floor(rightAscension / 90) * 90;
  rightAscension = (rightAscension + longitudeQuadrant - ascensionQuadrant) / 15;

  const sinDeclination = 0.39782 * Math.sin(toRadians(trueLongitude));
  const cosDeclination = Math.cos(Math.asin(sinDeclination));
  const latitudeRadians = toRadians(location.latitude);
  const cosHourAngle =
    (Math.cos(toRadians(ZENITH)) - sinDeclination * Math.sin(latitudeRadians)) /
    (cosDeclination * Math.cos(latitudeRadians));

  if (cosHourAngle > 1 || cosHourAngle < -1) {
    return makeLocalTime(dateParts, isSunrise ? 6 : 18, location.timezone);
  }

  const hourAngle = (isSunrise ? 360 - toDegrees(Math.acos(cosHourAngle)) : toDegrees(Math.acos(cosHourAngle))) / 15;
  const localMeanTime = hourAngle + rightAscension - 0.06571 * approximateTime - 6.622;
  const universalTime = normalize(localMeanTime - longitudeHour, 24);
  const timezoneOffsetHours = getTimeZoneOffsetHours(date, location.timezone);

  return makeLocalTime(dateParts, normalize(universalTime + timezoneOffsetHours, 24), location.timezone);
}

function getSolarTimes(date: Date, location: SolarLocation) {
  return {
    sunrise: calculateSolarEvent(date, location, true),
    sunset: calculateSolarEvent(date, location, false),
  };
}

function addDays(date: Date, days: number, timezone?: string): Date {
  const parts = getZonedDateParts(date, timezone);
  return makeLocalTime({ ...parts, day: parts.day + days }, 12, timezone);
}

export function getSolarThemeSchedule(now = new Date(), location = CHONGQING): SolarThemeSchedule {
  const today = getSolarTimes(now, location);

  if (now < today.sunrise) {
    return {
      theme: 'dark',
      sunrise: today.sunrise,
      sunset: today.sunset,
      nextTransition: today.sunrise,
      nextTheme: 'light',
    };
  }

  if (now < today.sunset) {
    return {
      theme: 'light',
      sunrise: today.sunrise,
      sunset: today.sunset,
      nextTransition: today.sunset,
      nextTheme: 'dark',
    };
  }

  const tomorrow = getSolarTimes(addDays(now, 1, location.timezone), location);

  return {
    theme: 'dark',
    sunrise: today.sunrise,
    sunset: today.sunset,
    nextTransition: tomorrow.sunrise,
    nextTheme: 'light',
  };
}
