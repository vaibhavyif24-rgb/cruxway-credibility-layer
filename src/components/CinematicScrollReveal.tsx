import { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import indiaIndustrialReveal from '@/assets/india-industrial-reveal.jpg';

const indiaSectors = [
  {
    category: 'Industrials',
    items: ['Process & Flow Control', 'Value-Added Distribution', 'Industrial Services', 'Packaging'],
  },
  {
    category: 'Business & Industrial Services',
    items: ['Facility & Support Services', 'Testing & Certification', 'Infrastructure Services', 'Industrial Technology', 'Aerospace & Defense'],
  },
];

const SectorColumn = ({ category, items }: { category: string; items: string[] }) => (
  <div>
    <h3
      className="font-serif text-[1.05rem] md:text-[1.2rem] leading-[1.2] mb-3 md:mb-4"
      style={{ color: 'var(--cin-card-heading)' }}
    >
      {category}
    </h3>
    <div style={{ borderLeft: '2px solid var(--cin-card-bullet)', paddingLeft: '12px' }} className="md:pl-[16px]">
      <ul className="list-none p-0 m-0 flex flex-col gap-1">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-[8px] md:gap-[12px] group cursor-default">
            <span
              className="flex-shrink-0 rotate-45 transition-colors duration-200"
              style={{ width: '6px', height: '6px', backgroundColor: 'var(--cin-card-bullet)' }}
            />
            <span
              className="font-sans text-[13px] md:text-[15px] leading-[1.8] md:leading-[2] transition-colors duration-200"
              style={{ color: 'var(--cin-card-subtext)' }}
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
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const updateCardMaxHeight = useCallback(() => {
    const taglineEl = taglineRef.current;
    const stickyEl = stickyRef.current;
    const cardEl = cardWrapperRef.current;
    if (!taglineEl || !stickyEl || !cardEl) return;
    const taglineBottom = taglineEl.getBoundingClientRect().bottom - stickyEl.getBoundingClientRect().top;
    cardEl.style.maxHeight = `${stickyEl.offsetHeight - taglineBottom - 24}px`;
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const totalScrollable = container.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;
    setProgress(Math.max(0, Math.min(1, -rect.top / totalScrollable)));
    updateCardMaxHeight();
  }, [updateCardMaxHeight]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateCardMaxHeight);
    handleScroll();
    updateCardMaxHeight();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateCardMaxHeight);
    };
  }, [handleScroll, updateCardMaxHeight]);

  const imageProgress = Math.min(progress / 0.65, 1);
  const cardProgress = progress > 0.65 ? (progress - 0.65) / 0.35 : 0;

  const circleSize = 180;
  const maxDim = Math.max(typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080);
  const targetScale = (maxDim * 1.5) / circleSize;
  const currentScale = 1 + (targetScale - 1) * imageProgress;
  const currentBorderRadius = 50 * (1 - imageProgress);

  const isDark = theme === 'dark';
  const textIsLight = imageProgress > 0.3;

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div
        ref={stickyRef}
        className="cin-sticky sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: isDark ? '#0B131E' : 'hsl(var(--background))' }}
      >
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

        {/* Tagline — static, never moves/fades */}
        <h2
          ref={taglineRef}
          className="cin-tagline absolute font-serif text-center px-6 leading-[1.1] tracking-[-0.03em]"
          style={{
            fontSize: 'clamp(2.1rem, 5.2vw, 4rem)',
            color: textIsLight ? '#F8F6F2' : isDark ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
            zIndex: 10,
            pointerEvents: 'none',
            willChange: 'unset' as const,
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

        {/* Sectors card */}
        <div
          ref={cardWrapperRef}
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 'auto',
            transform: `translateY(${(1 - cardProgress) * 100}%)`,
            willChange: 'transform',
            zIndex: 3,
            opacity: cardProgress > 0.05 ? 1 : 0,
            transition: 'opacity 0.15s ease',
          }}
        >
          <div
            className="cin-card w-full"
            style={{
              background: 'var(--cin-card-bg)',
              backdropFilter: 'blur(24px) saturate(160%)',
              WebkitBackdropFilter: 'blur(24px) saturate(160%)',
              borderTop: '1px solid var(--cin-card-border)',
              borderRadius: '24px 24px 0 0',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(192,154,89,0.2) transparent',
              transition: 'background 0.3s ease, border-color 0.3s ease',
              padding: '28px 48px 32px 48px',
            }}
          >
            {/* Card header */}
            <p
              className="font-sans text-[10px] md:text-[11px] font-medium uppercase"
              style={{ letterSpacing: '0.22em', color: 'var(--cin-card-label)' }}
            >
              Sectors We Look At
            </p>
            <div
              style={{
                width: '48px',
                height: '1px',
                backgroundColor: 'var(--cin-card-divider)',
                marginTop: '8px',
                marginBottom: '10px',
              }}
            />
            <p
              className="font-sans text-[13px] md:text-[15px] leading-[1.7] md:leading-[1.8]"
              style={{ color: 'var(--cin-card-subtext)', marginBottom: '20px', maxWidth: '680px' }}
            >
              Long-term capital partnering with India's essential B2B industries, built around recurring revenue, operational depth, and enduring competitive advantages.
            </p>

            {/* Three-column grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-[1fr_1px_1fr] md:gap-0">
              <div className="md:pr-5">
                <SectorColumn category={indiaSectors[0].category} items={indiaSectors[0].items} />
              </div>
              <div className="hidden md:block" style={{ backgroundColor: 'var(--cin-card-divider)' }} />
              <div className="md:pl-5">
                <SectorColumn category={indiaSectors[1].category} items={indiaSectors[1].items} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile card padding override */}
      <style>{`
        @media (max-width: 767px) {
          .cin-card { padding: 20px 18px 24px 18px !important; }
        }
      `}</style>
    </section>
  );
};

export default CinematicScrollReveal;
