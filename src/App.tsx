import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileSection from './components/ProfileSection';
import ChatSection from './components/ChatSection';
import ThemeSwitcher from './components/ThemeSwitcher';
import WorksSection from './components/WorksSection';
import { applyFavicon } from './utils/faviconService';

function App() {
  useEffect(() => {
    applyFavicon();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen theme-bg">
      <div className="fixed inset-0 theme-dots bg-[size:24px_24px] pointer-events-none" />

      <ThemeSwitcher />

      <div className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10"
        >
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="theme-bg-card rounded-2xl p-6 lg:sticky lg:top-8"
            >
              <ProfileSection />
            </motion.div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              <WorksSection />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="theme-bg-card rounded-2xl p-6 h-[520px] lg:h-[640px] flex flex-col"
            >
              <ChatSection />
            </motion.div>
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-xs theme-text-muted font-mono">
            Designed & built by 天空
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;