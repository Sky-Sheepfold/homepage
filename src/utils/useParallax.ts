import { useEffect, useRef, useState } from 'react';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'both';
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
) {
  const { speed = 0.5, direction = 'up' } = options;
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect();
          const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;

          let newOffset = distanceFromCenter * speed * -1;

          if (direction === 'up') {
            newOffset = Math.abs(newOffset);
          } else if (direction === 'down') {
            newOffset = -Math.abs(newOffset);
          }

          setOffset(newOffset);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);

  return { ref, offset };
}
