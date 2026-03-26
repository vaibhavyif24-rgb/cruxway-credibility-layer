import { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

const US_IMAGE_URL = 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=2400&q=90&auto=format&fit=crop';

const usSectors = {
  left: {
    heading: 'Industrials',
    items: [
      { name: 'Process & Flow Control', desc: 'Valves, pumps, instrumentation' },
      { name: 'Value-Added Distribution', desc: 'Technical & industrial products' },
      { name: 'Industrial Services', desc: 'Maintenance, repair & operations' },
      { name: 'Packaging & Containers', desc: 'Speciality & industrial packaging' },
    ],
  },
  right: {
    heading: 'Business & Industrial Services',
    items: [
      { name: 'Facility & Support Services', desc: 'Cleaning, security, staffing' },
      { name: 'Testing & Certification', desc: 'Quality assurance & compliance' },
      { name: 'Infrastructure Services', desc: 'Utilities, telecom, transport' },
      { name: 'Industrial Technology', desc: 'Automation & process software' },
    ],
  },
};

const USCinematicScrollReveal = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
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

  const imageProgress = Math.min(progress / 0.55, 1);
  const sectorProgress = Math.max(0, Math.min((progress - 0.55) / 0.45, 1));

  const circleSize = 180;
  const maxDim = Math.max(typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080);
  const targetScale = (maxDim * 1.5) / circleSize;
  const currentScale = 1 + (targetScale - 1) * imageProgress;
  const currentBorderRadius = 50 * (1 - imageProgress);

  const isDark = theme === 'dark';
  const textIsLight = imageProgress > 0.3;

  const taglineTop = 26 - (sectorProgress * 18);
  const overlayOffset = isMobile ? 18 : 15;

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: isDark ? '#0B131E' : 'hsl(var(--background))' }}>
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
            src={US_IMAGE_URL}
            alt="America's industrial landscape"
            className="w-full h-full"
            loading="eager"
            width={2400}
            height={1600}
            style={{ objectFit: 'cover', objectPosition: 'center center', imageRendering: '-webkit-optimize-contrast' } as React.CSSProperties}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.55))',
              opacity: imageProgress,
            }}
          />
        </div>

        <h2
          className="absolute font-serif text-center px-6 leading-[1.1] tracking-[-0.03em]"
          style={{
            fontSize: 'clamp(2.1rem, 5.2vw, 4rem)',
            color: textIsLight ? '#F8F6F2' : isDark ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
            zIndex: 10,
            pointerEvents: 'none',
            transition: 'color 0.3s ease',
            top: `${taglineTop}%`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '800px',
            textShadow: textIsLight ? '0 2px 12px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          Where America's essential industries find their{' '}
          <span style={{ color: 'hsl(38, 55%, 62%)' }}>permanent partner.</span>
        </h2>

        {/* Sector content overlay */}
        <div
          className="absolute left-1/2 w-full"
          style={{
            zIndex: 10,
            pointerEvents: sectorProgress > 0.1 ? 'auto' : 'none',
            transform: `translateX(-50%) translateY(${40 * (1 - sectorProgress)}px)`,
            opacity: sectorProgress,
            top: `${taglineTop + overlayOffset}%`,
            maxWidth: isMobile ? 'none' : '1000px',
            padding: isMobile ? '0 1.5rem' : '0 2.5rem',
            transition: 'opacity 0.1s ease',
          }}
        >
          <div className={`text-center ${isMobile ? 'mb-6' : 'mb-8 md:mb-10'}`}>
            <span
              className="font-sans font-semibold uppercase tracking-[0.22em]"
              style={{ color: 'hsl(38, 55%, 62%)', fontSize: isMobile ? '12px' : '13px' }}
            >
              Sectors We Look At
            </span>
            <div className="mx-auto mt-2.5 w-10 h-[1.5px]" style={{ background: 'hsl(38, 55%, 62%)' }} />
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-0'} relative`}>
            {!isMobile && (
              <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: 'hsl(38, 55%, 62%, 0.2)' }} />
            )}

            <div className={isMobile ? '' : 'pr-10'}>
              <h3
                className="font-serif leading-tight"
                style={{
                  color: '#F8F6F2',
                  fontSize: isMobile ? '1.3rem' : '1.6rem',
                  marginBottom: isMobile ? '1rem' : '0.875rem',
                }}
              >
                {usSectors.left.heading}
              </h3>
              <ul className={isMobile ? 'space-y-5' : 'space-y-4'}>
                {usSectors.left.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <span
                      className="flex-shrink-0 rotate-45"
                      style={{
                        background: 'hsl(38, 55%, 62%, 0.7)',
                        width: isMobile ? '8px' : '9px',
                        height: isMobile ? '8px' : '9px',
                        marginTop: '8px',
                      }}
                    />
                    <div>
                      <span
                        className="font-serif leading-[1.3] block"
                        style={{ color: '#F8F6F2', fontSize: isMobile ? '1.15rem' : '1.4rem' }}
                      >
                        {item.name}
                      </span>
                      <span
                        className="block font-sans leading-[1.6]"
                        style={{ color: 'rgba(248,246,242,0.5)', fontSize: isMobile ? '14px' : '16px' }}
                      >
                        {item.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={isMobile ? '' : 'pl-10'}>
              <h3
                className="font-serif leading-tight"
                style={{
                  color: '#F8F6F2',
                  fontSize: isMobile ? '1.3rem' : '1.6rem',
                  marginBottom: isMobile ? '1rem' : '0.875rem',
                }}
              >
                {usSectors.right.heading}
              </h3>
              <ul className={isMobile ? 'space-y-5' : 'space-y-4'}>
                {usSectors.right.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <span
                      className="flex-shrink-0 rotate-45"
                      style={{
                        background: 'hsl(38, 55%, 62%, 0.7)',
                        width: isMobile ? '8px' : '9px',
                        height: isMobile ? '8px' : '9px',
                        marginTop: '8px',
                      }}
                    />
                    <div>
                      <span
                        className="font-serif leading-[1.3] block"
                        style={{ color: '#F8F6F2', fontSize: isMobile ? '1.15rem' : '1.4rem' }}
                      >
                        {item.name}
                      </span>
                      <span
                        className="block font-sans leading-[1.6]"
                        style={{ color: 'rgba(248,246,242,0.5)', fontSize: isMobile ? '14px' : '16px' }}
                      >
                        {item.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USCinematicScrollReveal;
