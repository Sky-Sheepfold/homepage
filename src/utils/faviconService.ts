export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';
export type WeatherType = 'clear' | 'cloudy' | 'rainy' | 'stormy';

interface FaviconInfo {
  filename: string;
  label: string;
}

interface WeatherData {
  weather: WeatherType;
  temperature: number;
}

const FAVICONS: Record<WeatherType, Record<TimeOfDay, FaviconInfo>> = {
  clear: {
    dawn: { filename: 'favicon-sunset-32.png', label: '晨曦' },
    day: { filename: 'favicon-sky-32.png', label: '晴空' },
    dusk: { filename: 'favicon-sunset-32.png', label: '黄昏' },
    night: { filename: 'favicon-night-32.png', label: '夜空' },
  },
  cloudy: {
    dawn: { filename: 'favicon-sky-32.png', label: '晨云' },
    day: { filename: 'favicon-sky-32.png', label: '多云' },
    dusk: { filename: 'favicon-sunset-32.png', label: '暮云' },
    night: { filename: 'favicon-night-32.png', label: '夜云' },
  },
  rainy: {
    dawn: { filename: 'favicon-storm-32.png', label: '晨雨' },
    day: { filename: 'favicon-storm-32.png', label: '雨天' },
    dusk: { filename: 'favicon-storm-32.png', label: '暮雨' },
    night: { filename: 'favicon-storm-32.png', label: '夜雨' },
  },
  stormy: {
    dawn: { filename: 'favicon-storm-32.png', label: '晨暴' },
    day: { filename: 'favicon-storm-32.png', label: '暴风雨' },
    dusk: { filename: 'favicon-storm-32.png', label: '暮暴' },
    night: { filename: 'favicon-storm-32.png', label: '夜暴' },
  },
};

export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 8) return 'dawn';
  if (hour >= 8 && hour < 17) return 'day';
  if (hour >= 17 && hour < 20) return 'dusk';
  return 'night';
}

function mapWeatherCode(code: number): WeatherType {
  if (code === 0) return 'clear';
  if (code >= 1 && code <= 3) return 'cloudy';
  if (code >= 45 && code <= 48) return 'cloudy';
  if (code >= 51 && code <= 67) return 'rainy';
  if (code >= 71 && code <= 77) return 'cloudy';
  if (code >= 80 && code <= 82) return 'rainy';
  if (code >= 85 && code <= 86) return 'rainy';
  if (code >= 95) return 'stormy';
  return 'clear';
}

async function fetchWeather(): Promise<WeatherData> {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=29.56&longitude=106.55&current_weather=true&timezone=Asia%2FShanghai'
    );
    const data = await response.json();
    const weatherCode = data.current_weather?.weathercode ?? 0;
    const temperature = data.current_weather?.temperature ?? 20;
    return {
      weather: mapWeatherCode(weatherCode),
      temperature,
    };
  } catch {
    return { weather: 'clear', temperature: 20 };
  }
}

let cachedWeather: WeatherData | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 10 * 60 * 1000;

export async function getWeather(): Promise<WeatherData> {
  const now = Date.now();
  if (cachedWeather && now - cacheTime < CACHE_DURATION) {
    return cachedWeather;
  }
  cachedWeather = await fetchWeather();
  cacheTime = now;
  return cachedWeather;
}

export async function getCurrentFavicon(): Promise<FaviconInfo> {
  const hour = new Date().getHours();
  const timeOfDay = getTimeOfDay(hour);
  const weatherData = await getWeather();
  return FAVICONS[weatherData.weather][timeOfDay];
}

export async function applyFavicon(): Promise<void> {
  const favicon = await getCurrentFavicon();
  const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
  if (link) {
    link.href = `/favicon/${favicon.filename}`;
    link.setAttribute('type', 'image/png');
  }
}

export async function getFaviconLabel(): Promise<string> {
  const favicon = await getCurrentFavicon();
  return favicon.label;
}
