import { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import indiaIndustrialReveal from '@/assets/india-industrial-reveal.jpg';

const industrialsSectors = [
  'Process and Flow Control',
  'Value-Added Distribution',
  'Industrial Services',
  'Utility and Infrastructure Services',
  'Industrial Technology',
  'Aerospace and Defense',
  'Packaging',
];

const businessServicesSectors = [
  'Facility and Support Services',
  'Testing, Inspection, and Certification',
  'Lab Services and Products',
  'Business Process Outsourcing / Contract Manufacturing',
  'Insurance Services and Distribution',
];

const CinematicScrollReveal = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrolled = -rect.top;
    const totalScrollable = containerHeight - viewportHeight;

    if (totalScrollable <= 0) return;

    const raw = scrolled / totalScrollable;
    setProgress(Math.max(0, Math.min(1, raw)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Phase 1: 0→0.6 = image expansion, Phase 2: 0.6→1.0 = cards rise
  const imageProgress = Math.min(progress / 0.6, 1);
  const cardProgress = progress > 0.6 ? (progress - 0.6) / 0.4 : 0;

  // Circle starts at 180px, expands to fill viewport
  // Scale factor: at progress=0, circle is 180px. At progress=1, it fills screen.
  // We use a combination of width/height and border-radius
  const circleSize = 180;
  // Calculate scale needed to fill viewport from 180px circle
  const maxDim = Math.max(typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080);
  const targetScale = (maxDim * 1.5) / circleSize;
  const currentScale = 1 + (targetScale - 1) * imageProgress;
  const currentBorderRadius = 50 * (1 - imageProgress); // 50% → 0%

  // Text color transitions from foreground to white as image expands
  const textIsLight = imageProgress > 0.3;

  const isDark = theme === 'dark';

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '280vh' }}
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
        style={{
          backgroundColor: isDark ? 'hsl(var(--primary))' : 'hsl(var(--background))',
        }}
      >
        {/* Expanding circle image */}
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
          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.5))',
              opacity: imageProgress,
            }}
          />
        </div>

        {/* Tagline text — always centered, on top */}
        <h2
          className="relative font-serif text-center max-w-[780px] px-6 leading-[1.1] tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            color: textIsLight ? 'white' : isDark ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
            zIndex: 2,
            transition: 'color 0.3s ease',
          }}
        >
          Where India's essential industries find their{' '}
          <span style={{ color: 'hsl(var(--gold))' }}>permanent home.</span>
        </h2>

        {/* Cards sliding up from bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row gap-3 md:gap-4 max-w-[1080px] mx-auto"
          style={{
            transform: `translateY(${(1 - cardProgress) * 100}%)`,
            willChange: 'transform',
            zIndex: 3,
            opacity: cardProgress > 0.05 ? 1 : 0,
            transition: 'opacity 0.15s ease',
          }}
        >
          {/* Card 1 — Industrials */}
          <div
            className="flex-1"
            style={{
              background: isDark ? 'rgba(20, 25, 35, 0.92)' : 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '20px 20px 0 0',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            <p
              className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] mb-3"
              style={{ color: isDark ? 'hsl(var(--gold-dim))' : 'hsl(var(--muted-foreground))' }}
            >
              Our Sectors
            </p>
            <h3
              className="font-serif text-[clamp(1.4rem,2.5vw,1.8rem)] leading-[1.2] mb-4"
              style={{ color: isDark ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))' }}
            >
              Industrials
            </h3>
            <div className="w-8 h-px mb-4" style={{ backgroundColor: 'hsl(var(--gold) / 0.3)' }} />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {industrialsSectors.map((s) => (
                <li
                  key={s}
                  className="font-sans text-[13px] md:text-[14px] leading-[1.7]"
                  style={{ color: isDark ? 'hsl(var(--primary-foreground) / 0.55)' : 'hsl(var(--muted-foreground))' }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 — Business Services */}
          <div
            className="flex-1"
            style={{
              background: isDark ? 'rgba(20, 25, 35, 0.92)' : 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '20px 20px 0 0',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            <p
              className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] mb-3"
              style={{ color: isDark ? 'hsl(var(--gold-dim))' : 'hsl(var(--muted-foreground))' }}
            >
              Our Sectors
            </p>
            <h3
              className="font-serif text-[clamp(1.4rem,2.5vw,1.8rem)] leading-[1.2] mb-4"
              style={{ color: isDark ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))' }}
            >
              Business Services
            </h3>
            <div className="w-8 h-px mb-4" style={{ backgroundColor: 'hsl(var(--gold) / 0.3)' }} />
            <ul className="grid grid-cols-1 gap-y-1.5">
              {businessServicesSectors.map((s) => (
                <li
                  key={s}
                  className="font-sans text-[13px] md:text-[14px] leading-[1.7]"
                  style={{ color: isDark ? 'hsl(var(--primary-foreground) / 0.55)' : 'hsl(var(--muted-foreground))' }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicScrollReveal;
