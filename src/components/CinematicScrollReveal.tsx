import { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import indiaIndustrialReveal from '@/assets/india-industrial-reveal.jpg';

const sectors = [
  { category: 'Industrials', items: ['Process and Flow Control', 'Value-Added Distribution', 'Industrial Services', 'Utility and Infrastructure Services', 'Industrial Technology', 'Aerospace and Defense', 'Packaging'] },
  { category: 'Business Services', items: ['Facility and Support Services', 'Testing, Inspection, and Certification', 'Lab Services and Products', 'Business Process Outsourcing / Contract Manufacturing', 'Insurance Services and Distribution'] },
];

const SectorBullet = ({ item }: { item: string }) => (
  <li className="flex items-center gap-[10px] group cursor-default">
    <span
      className="w-1 h-1 flex-shrink-0 rotate-45 transition-colors duration-200"
      style={{ backgroundColor: 'rgba(192,154,89,0.5)' }}
    />
    <span
      className="font-sans text-[13px] leading-[2] transition-colors duration-200"
      style={{ color: 'rgba(248,246,242,0.65)' }}
    />
    {/* Use a real visible span for hover */}
    <span
      className="font-sans text-[13px] leading-[2] transition-colors duration-200 group-hover:!text-[rgba(248,246,242,0.95)]"
      style={{ color: 'rgba(248,246,242,0.65)' }}
    >
      {item}
    </span>
  </li>
);

const SectorColumn = ({ category, items }: { category: string; items: string[] }) => (
  <div>
    <h3
      className="font-serif text-[1.15rem] leading-[1.2] mb-4"
      style={{ color: 'rgba(248,246,242,0.95)' }}
    >
      {category}
    </h3>
    <div
      style={{
        borderLeft: '2px solid rgba(192,154,89,0.4)',
        paddingLeft: '14px',
      }}
    >
      <ul className="list-none p-0 m-0 flex flex-col">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-[10px] group cursor-default">
            <span
              className="w-1 h-1 flex-shrink-0 rotate-45 transition-colors duration-200 group-hover:!bg-[rgba(192,154,89,0.9)]"
              style={{ backgroundColor: 'rgba(192,154,89,0.5)' }}
            />
            <span
              className="font-sans text-[13px] leading-[2] transition-colors duration-200 group-hover:!text-[rgba(248,246,242,0.95)]"
              style={{ color: 'rgba(248,246,242,0.65)' }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

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
  const textIsLight = imageProgress > 0.3;

  return (
    <section ref={containerRef} className="relative" style={{ height: '280vh' }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: isDark ? 'hsl(var(--primary))' : 'hsl(var(--background))' }}
      >
        {/* Expanding circle — starts at 62% top, moves to center */}
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
            loading="lazy"
            width={1920}
            height={1920}
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              imageRendering: '-webkit-optimize-contrast',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.5))',
              opacity: imageProgress,
            }}
          />
        </div>

        {/* Tagline — absolutely positioned upper area, z-index 10, never moves */}
        <h2
          className="absolute font-serif text-center px-6 leading-[1.1] tracking-[-0.03em]"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            color: textIsLight ? 'white' : isDark ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
            zIndex: 10,
            transition: 'color 0.3s ease',
            top: '26%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '820px',
            textShadow: textIsLight ? '0 2px 12px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          Where India's essential industries find their{' '}
          <span style={{ color: 'hsl(var(--gold))' }}>permanent home.</span>
        </h2>

        {/* Sectors card — slides up from bottom, max 60vh */}
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
            className="w-full max-w-[820px]"
            style={{
              maxHeight: '60vh',
              overflowY: 'auto',
              background: 'rgba(14, 22, 34, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px 24px 0 0',
              padding: 'clamp(1.8rem, 3vw, 2.8rem)',
              paddingTop: '40px',
            }}
          >
            {/* Card header */}
            <p
              className="font-sans text-[10px] font-medium uppercase"
              style={{
                letterSpacing: '0.22em',
                color: 'hsl(38, 55%, 58%)',
              }}
            >
              Sectors We Look At
            </p>
            <div
              style={{
                width: '48px',
                height: '1px',
                backgroundColor: 'rgba(192,154,89,0.2)',
                marginTop: '8px',
                marginBottom: '28px',
              }}
            />

            {/* Two-column grid with vertical divider */}
            <div
              className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-6 md:gap-0"
            >
              {/* Left column */}
              <div className="md:pr-6">
                <SectorColumn category={sectors[0].category} items={sectors[0].items} />
              </div>

              {/* Vertical divider — hidden on mobile */}
              <div
                className="hidden md:block"
                style={{ backgroundColor: 'rgba(192,154,89,0.1)' }}
              />

              {/* Right column */}
              <div className="md:pl-6">
                <SectorColumn category={sectors[1].category} items={sectors[1].items} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicScrollReveal;
