import { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import indiaIndustrialReveal from '@/assets/india-industrial-reveal.jpg';

const sectors = [
  { category: 'Industrials', items: ['Process and Flow Control', 'Value-Added Distribution', 'Industrial Services', 'Utility and Infrastructure Services', 'Industrial Technology', 'Aerospace and Defense', 'Packaging'] },
  { category: 'Business Services', items: ['Facility and Support Services', 'Testing, Inspection, and Certification', 'Lab Services and Products', 'Business Process Outsourcing / Contract Manufacturing', 'Insurance Services and Distribution'] },
];

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

  const imageProgress = Math.min(progress / 0.6, 1);
  const cardProgress = progress > 0.6 ? (progress - 0.6) / 0.4 : 0;

  const circleSize = 180;
  const maxDim = Math.max(typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080);
  const targetScale = (maxDim * 1.5) / circleSize;
  const currentScale = 1 + (targetScale - 1) * imageProgress;
  const currentBorderRadius = 50 * (1 - imageProgress);

  const isDark = theme === 'dark';
  // Text starts in theme color, transitions to white as image expands
  const textIsLight = imageProgress > 0.3;

  return (
    <section ref={containerRef} className="relative" style={{ height: '280vh' }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
        style={{ backgroundColor: isDark ? 'hsl(var(--primary))' : 'hsl(var(--background))' }}
      >
        {/* Expanding circle — positioned below text */}
        <div
          className="absolute"
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderRadius: `${currentBorderRadius}%`,
            overflow: 'hidden',
            transform: `scale(${currentScale})`,
            willChange: 'transform',
            zIndex: 1,
            // Start below center, moves to center as it expands
            top: `${60 + (50 - 60) * imageProgress}%`,
            left: '50%',
            marginLeft: `-${circleSize / 2}px`,
            marginTop: `-${circleSize / 2}px`,
          }}
        >
          <img
            src={indiaIndustrialReveal}
            alt="India's industrial landscape"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1920}
            height={1080}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.5))',
              opacity: imageProgress,
            }}
          />
        </div>

        {/* Tagline — upper area, above the circle */}
        <h2
          className="relative font-serif text-center max-w-[780px] px-6 leading-[1.1] tracking-[-0.03em]"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            color: textIsLight ? 'white' : isDark ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
            zIndex: 2,
            transition: 'color 0.3s ease',
            // Position text in upper portion
            marginBottom: `${80 + (0 - 80) * imageProgress}px`,
            textShadow: textIsLight ? '0 2px 12px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          Where India's essential industries find their{' '}
          <span style={{ color: 'hsl(var(--gold))' }}>permanent home.</span>
        </h2>

        {/* Single unified sectors card */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-16 flex justify-center"
          style={{
            transform: `translateY(${(1 - cardProgress) * 100}%)`,
            willChange: 'transform',
            zIndex: 3,
            opacity: cardProgress > 0.05 ? 1 : 0,
            transition: 'opacity 0.15s ease',
          }}
        >
          <div
            className="w-full max-w-[720px]"
            style={{
              background: isDark ? 'rgba(20, 25, 35, 0.94)' : 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '24px 24px 0 0',
              padding: 'clamp(1.8rem, 3vw, 2.8rem)',
            }}
          >
            <p
              className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] mb-5"
              style={{ color: isDark ? 'hsl(var(--gold-dim))' : 'hsl(var(--muted-foreground))' }}
            >
              Our Sectors
            </p>

            <div className="flex flex-col gap-6">
              {sectors.map((group) => (
                <div key={group.category}>
                  <h3
                    className="font-serif text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.2] mb-3"
                    style={{ color: isDark ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))' }}
                  >
                    {group.category}
                  </h3>
                  <div
                    className="w-6 h-px mb-3"
                    style={{ backgroundColor: 'hsl(var(--gold) / 0.3)' }}
                  />
                  <div className="flex flex-wrap gap-x-1.5 gap-y-1">
                    {group.items.map((item, i) => (
                      <span key={item} className="flex items-center">
                        <span
                          className="font-sans text-[13px] md:text-[14px] leading-[1.8]"
                          style={{ color: isDark ? 'hsl(var(--primary-foreground) / 0.55)' : 'hsl(var(--muted-foreground))' }}
                        >
                          {item}
                        </span>
                        {i < group.items.length - 1 && (
                          <span
                            className="mx-1.5 text-[10px]"
                            style={{ color: 'hsl(var(--gold) / 0.35)' }}
                          >
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicScrollReveal;
