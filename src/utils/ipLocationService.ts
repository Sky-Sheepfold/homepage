import { type SolarLocation } from './solarTheme';

interface IpLocationResponse {
  city?: string;
  country_name?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

export interface VisitorLocation extends SolarLocation {
  label: string;
  source: 'ip' | 'fallback';
}

const FALLBACK_LOCATION: VisitorLocation = {
  latitude: 29.56,
  longitude: 106.55,
  timezone: 'Asia/Shanghai',
  label: 'Chongqing',
  source: 'fallback',
};

const LOCATION_TIMEOUT_MS = 2800;
const JSONP_CALLBACK_NAME = 'skyHeroIpLocation';

function hasValidCoordinates(data: IpLocationResponse): data is IpLocationResponse & {
  latitude: number;
  longitude: number;
} {
  return (
    typeof data.latitude === 'number' &&
    typeof data.longitude === 'number' &&
    Number.isFinite(data.latitude) &&
    Number.isFinite(data.longitude) &&
    data.latitude >= -90 &&
    data.latitude <= 90 &&
    data.longitude >= -180 &&
    data.longitude <= 180
  );
}

function getLocationLabel(data: IpLocationResponse): string {
  return [data.city, data.country_name].filter(Boolean).join(', ') || 'visitor location';
}

function toVisitorLocation(data: IpLocationResponse): VisitorLocation | null {
  if (!hasValidCoordinates(data)) {
    return null;
  }

  return {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
    label: getLocationLabel(data),
    source: 'ip',
  };
}

async function getLocationWithFetch(): Promise<VisitorLocation | null> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), LOCATION_TIMEOUT_MS);

  try {
    const response = await fetch('https://ipapi.co/json/', {
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as IpLocationResponse;
    return toVisitorLocation(data);
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function getLocationWithJsonp(): Promise<VisitorLocation | null> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    const previousCallback = (window as typeof window & Record<string, unknown>)[JSONP_CALLBACK_NAME];
    const cleanup = () => {
      window.clearTimeout(timeoutId);
      script.remove();

      if (previousCallback) {
        (window as typeof window & Record<string, unknown>)[JSONP_CALLBACK_NAME] = previousCallback;
      } else {
        delete (window as typeof window & Record<string, unknown>)[JSONP_CALLBACK_NAME];
      }
    };

    const timeoutId = window.setTimeout(() => {
      cleanup();
      resolve(null);
    }, LOCATION_TIMEOUT_MS);

    (window as typeof window & Record<string, (data: IpLocationResponse) => void>)[JSONP_CALLBACK_NAME] = (data) => {
      cleanup();
      resolve(toVisitorLocation(data));
    };

    script.async = true;
    script.src = `https://ipapi.co/jsonp/?callback=${JSONP_CALLBACK_NAME}`;
    script.onerror = () => {
      cleanup();
      resolve(null);
    };

    document.head.appendChild(script);
  });
}

export async function getVisitorLocation(): Promise<VisitorLocation> {
  return (await getLocationWithFetch()) ?? (await getLocationWithJsonp()) ?? FALLBACK_LOCATION;
}
