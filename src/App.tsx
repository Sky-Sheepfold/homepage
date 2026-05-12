import { useEffect } from 'react';
import ProfileSection from './components/ProfileSection';
import ChatSection from './components/ChatSection';
import ThemeSwitcher from './components/ThemeSwitcher';
import { applyFavicon } from './utils/faviconService';

function App() {
  useEffect(() => {
    applyFavicon();
  }, []);
  return (
    <div className="min-h-screen theme-bg">
      <div className="fixed inset-0 theme-dots bg-[size:24px_24px] pointer-events-none" />

      <ThemeSwitcher />

      <div className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="theme-bg-card rounded-2xl p-6 lg:sticky lg:top-8">
              <ProfileSection />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="theme-bg-card rounded-2xl p-6 h-[520px] lg:h-[640px] flex flex-col">
              <ChatSection />
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center">
          <p className="text-xs theme-text-muted font-mono">
            Designed & built by 天空
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
