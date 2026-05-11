import { useState, useEffect } from 'react';

type Theme = 'mist' | 'stone' | 'sky' | 'warm';

const themes: { id: Theme; name: string; color: string }[] = [
  { id: 'mist', name: '雾灰', color: '#d7d4cf' },
  { id: 'stone', name: '砂岩', color: '#c1bbbb' },
  { id: 'sky', name: '天青', color: '#b9ecfc' },
  { id: 'warm', name: '暖杏', color: '#ffdeb7' },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('mist');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const currentTheme = themes.find((t) => t.id === theme)!;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-100">
      <div className="flex gap-1.5">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            title={t.name}
            className={`w-5 h-5 rounded-full border-2 transition-all ${
              theme === t.id
                ? 'border-gray-800 scale-110'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: t.color }}
          />
        ))}
      </div>
      <span className="text-xs text-gray-600 font-medium ml-1">{currentTheme.name}</span>
    </div>
  );
}
