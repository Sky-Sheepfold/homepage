import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'mist' | 'stone' | 'sky' | 'warm';

const themes: { id: Theme; name: string; color: string }[] = [
  { id: 'mist', name: '雾灰', color: '#d7d4cf' },
  { id: 'stone', name: '砂岩', color: '#c1bbbb' },
  { id: 'sky', name: '天青', color: '#b9ecfc' },
  { id: 'warm', name: '暖杏', color: '#ffdeb7' },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('mist');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const currentTheme = themes.find((t) => t.id === theme)!;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex gap-1.5">
              {themes.map((t) => (
                <motion.button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  title={t.name}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
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
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-100"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-600"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  );
}