import { type TimeOfDay, type WeatherType, getWeather } from './faviconService';

interface AvatarInfo {
  filename: string;
  label: string;
}

const AVATARS: Record<WeatherType, Record<TimeOfDay, AvatarInfo>> = {
  clear: {
    dawn: { filename: 'favicon-sunset-512.png', label: '晨曦天空' },
    day: { filename: 'favicon-sky-512.png', label: '晴朗天空' },
    dusk: { filename: 'favicon-sunset-512.png', label: '黄昏天空' },
    night: { filename: 'favicon-night-512.png', label: '夜空天空' },
  },
  cloudy: {
    dawn: { filename: 'favicon-sky-512.png', label: '晨云天空' },
    day: { filename: 'favicon-sky-512.png', label: '多云天空' },
    dusk: { filename: 'favicon-sunset-512.png', label: '暮云天空' },
    night: { filename: 'favicon-night-512.png', label: '夜云天空' },
  },
  rainy: {
    dawn: { filename: 'favicon-storm-512.png', label: '晨雨天空' },
    day: { filename: 'favicon-storm-512.png', label: '雨天天空' },
    dusk: { filename: 'favicon-storm-512.png', label: '暮雨天空' },
    night: { filename: 'favicon-night-512.png', label: '夜雨天空' },
  },
  stormy: {
    dawn: { filename: 'favicon-storm-512.png', label: '晨暴天空' },
    day: { filename: 'favicon-storm-512.png', label: '暴风雨天空' },
    dusk: { filename: 'favicon-storm-512.png', label: '暮暴天空' },
    night: { filename: 'favicon-night-512.png', label: '夜暴天空' },
  },
};

export async function getCurrentAvatar(): Promise<AvatarInfo> {
  const hour = new Date().getHours();
  let timeOfDay: TimeOfDay;
  if (hour >= 5 && hour < 8) timeOfDay = 'dawn';
  else if (hour >= 8 && hour < 17) timeOfDay = 'day';
  else if (hour >= 17 && hour < 20) timeOfDay = 'dusk';
  else timeOfDay = 'night';

  const weatherData = await getWeather();
  return AVATARS[weatherData.weather][timeOfDay];
}

export async function getAvatarUrl(): Promise<string> {
  const avatar = await getCurrentAvatar();
  return `/favicon/${avatar.filename}`;
}

export async function getAvatarLabel(): Promise<string> {
  const avatar = await getCurrentAvatar();
  return avatar.label;
}
