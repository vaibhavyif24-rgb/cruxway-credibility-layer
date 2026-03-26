import { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import indiaIndustrialReveal from '@/assets/india-industrial-reveal.jpg';

const CinematicScrollReveal = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const totalScrollable = container.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;
    setProgress(Math.max(0, Math.min(1, -rect.top / totalScrollable)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const imageProgress = Math.min(progress / 0.85, 1);

  const circleSize = 180;
  const maxDim = Math.max(typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080);
  const targetScale = (maxDim * 1.5) / circleSize;
  const currentScale = 1 + (targetScale - 1) * imageProgress;
  const currentBorderRadius = 50 * (1 - imageProgress);

  const isDark = theme === 'dark';
  const textIsLight = imageProgress > 0.3;

  return (
    <section ref={containerRef} className="relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: isDark ? '#0B131E' : 'hsl(var(--background))' }}>
        {/* Expanding circle */}
        <div
          className="absolute"
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderRadius: `${currentBorderRadius}%`,
            overflow: 'hidden',
            transform: `translate(-50%, -50%) scale(${currentScale})`,
            willChange: 'transform',
            zIndex: 1,
            top: `${62 + (50 - 62) * imageProgress}%`,
            left: '50%',
          }}
        >
          <img
            src={indiaIndustrialReveal}
            alt="India's industrial landscape"
            className="w-full h-full"
            loading="eager"
            width={2400}
            height={2400}
            style={{ objectFit: 'cover', objectPosition: 'center center', imageRendering: '-webkit-optimize-contrast' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.5))',
              opacity: imageProgress,
            }}
          />
        </div>

        {/* Tagline */}
        <h2
          className="absolute font-serif text-center px-6 leading-[1.1] tracking-[-0.03em]"
          style={{
            fontSize: 'clamp(2.1rem, 5.2vw, 4rem)',
            color: textIsLight ? '#F8F6F2' : isDark ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
            zIndex: 10,
            pointerEvents: 'none',
            transition: 'color 0.3s ease',
            top: '26%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '820px',
            textShadow: textIsLight ? '0 2px 12px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          Building enduring platforms across India's{' '}
          <span style={{ color: 'hsl(38, 55%, 62%)' }}>lower middle market.</span>
        </h2>
      </div>
    </section>
  );
};

export default CinematicScrollReveal;
