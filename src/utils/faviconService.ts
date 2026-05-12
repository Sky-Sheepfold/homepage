type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';
type WeatherType = 'clear' | 'cloudy' | 'rainy' | 'stormy';

interface FaviconInfo {
  filename: string;
  label: string;
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

function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 8) return 'dawn';
  if (hour >= 8 && hour < 17) return 'day';
  if (hour >= 17 && hour < 20) return 'dusk';
  return 'night';
}

function getMonth(): number {
  return new Date().getMonth() + 1;
}

function guessWeather(): WeatherType {
  const month = getMonth();
  const hour = new Date().getHours();
  const isStormSeason = (month >= 6 && month <= 8) || (month >= 3 && month <= 5);

  if (month >= 12 || month <= 2) {
    return Math.random() > 0.3 ? 'clear' : 'cloudy';
  }

  if (isStormSeason && hour >= 14 && hour <= 18) {
    return Math.random() > 0.5 ? 'stormy' : 'rainy';
  }

  if (month >= 6 && month <= 9) {
    return Math.random() > 0.6 ? 'rainy' : 'clear';
  }

  return 'clear';
}

export function getCurrentFavicon(): FaviconInfo {
  const hour = new Date().getHours();
  const timeOfDay = getTimeOfDay(hour);
  const weather = guessWeather();
  return FAVICONS[weather][timeOfDay];
}

export function applyFavicon(): void {
  const favicon = getCurrentFavicon();
  const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
  if (link) {
    link.href = `/favicon/${favicon.filename}`;
    link.setAttribute('type', 'image/png');
  }
}

export function getFaviconLabel(): string {
  const favicon = getCurrentFavicon();
  return favicon.label;
}

export { type WeatherType, type TimeOfDay };
