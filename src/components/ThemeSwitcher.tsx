import { Moon, Sun } from 'lucide-react';
import { type Theme } from '../utils/solarTheme';

interface ThemeSwitcherProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeSwitcher({ theme, onThemeChange }: ThemeSwitcherProps) {
  const isDark = theme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => onThemeChange(nextTheme)}
      aria-label={isDark ? '切换到亮色主题' : '切换到暗色主题'}
      title={isDark ? '亮色主题' : '暗色主题'}
    >
      {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}
