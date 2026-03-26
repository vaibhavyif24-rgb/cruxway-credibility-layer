import { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, useScroll, useTransform } from 'framer-motion';

const INDIA_IMG = 'https://images.unsplash.com/photo-1764115424737-25aca6f47835?w=4000&q=90&auto=format&fit=crop&dpr=2';

const indiaSectors = {
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

const OVERLAY_GRADIENT = 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.82) 75%, rgba(0,0,0,0.88) 100%)';

const SectorColumn = ({ heading, items, side, isMobile }: { heading: string; items: { name: string; desc: string }[]; side: 'left' | 'right'; isMobile: boolean }) => (
  <div className={isMobile ? '' : side === 'left' ? 'pr-12' : 'pl-12'}>
    <h3
      className="font-serif leading-tight"
      style={{
        color: '#F8F6F2',
        fontSize: isMobile ? '1.25rem' : '1.8rem',
        marginBottom: isMobile ? '0.75rem' : '1rem',
        textShadow: '0 2px 12px rgba(0,0,0,0.7)',
      }}
    >
      {heading}
    </h3>
    <ul className={isMobile ? 'space-y-3' : 'space-y-4'}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span
            className="flex-shrink-0 rotate-45"
            style={{
              background: 'hsl(38, 55%, 62%, 0.7)',
              width: isMobile ? '7px' : '9px',
              height: isMobile ? '7px' : '9px',
              marginTop: isMobile ? '5px' : '8px',
            }}
          />
          <div>
            <span
              className="font-serif leading-[1.3] block"
              style={{ color: '#F8F6F2', fontSize: isMobile ? '1.05rem' : '1.5rem', textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
            >
              {item.name}
            </span>
            <span
              className="block font-sans leading-[1.4]"
              style={{ color: 'rgba(248,246,242,0.65)', fontSize: isMobile ? '13px' : '17px', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
            >
              {item.desc}
            </span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const MobileWordReveal = ({ words, goldWords, containerRef }: { words: string[]; goldWords: string[]; containerRef: React.RefObject<HTMLDivElement> }) => {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <div className="absolute inset-0 flex items-center justify-center px-7" style={{ zIndex: 10 }}>
      <h2
        className="font-serif text-center leading-[1.08] tracking-[-0.03em] flex flex-wrap justify-center gap-x-[0.3em]"
        style={{ fontSize: 'clamp(2.4rem, 11vw, 3.4rem)', maxWidth: '360px' }}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <MobileWord key={i} word={word} range={[start, end]} progress={scrollYProgress} isGold={goldWords.includes(word)} />
          );
        })}
      </h2>
    </div>
  );
};

const MobileWord = ({ word, range, progress, isGold }: { word: string; range: [number, number]; progress: any; isGold: boolean }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{
        opacity,
        color: isGold ? 'hsl(38, 55%, 62%)' : '#F8F6F2',
        textShadow: '0 3px 24px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.6)',
      }}
    >
      {word}
    </motion.span>
  );
};

const CinematicScrollReveal = () => {
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

  const isDark = theme === 'dark';

  // ── Mobile: full-bleed image with scroll-triggered word reveal ──
  if (isMobile) {
    const words = ['Building', 'enduring', 'platforms', 'across', "India's", 'lower', 'middle', 'market.'];
    const goldWords = ['enduring', 'lower', 'middle', 'market.'];

    return (
      <>
        <section ref={containerRef} className="relative" style={{ height: '180vh' }}>
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <img
              src={INDIA_IMG}
              alt="India's industrial landscape"
              className="absolute inset-0 w-full h-full"
              loading="eager"
              width={4000}
              height={2667}
              style={{ objectFit: 'cover', objectPosition: 'center 40%', imageRendering: '-webkit-optimize-contrast' } as React.CSSProperties}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.65) 100%)' }}
            />
            <MobileWordReveal words={words} goldWords={goldWords} containerRef={containerRef} />
          </div>
        </section>

        <div
          className="relative overflow-hidden"
          style={{ padding: '2.5rem 1.25rem 3rem' }}
        >
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <img src={INDIA_IMG} alt="" aria-hidden="true" className="w-full h-full" style={{ objectFit: 'cover', filter: 'blur(8px)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(11,19,30,0.92) 0%, rgba(11,19,30,0.96) 50%, rgba(11,19,30,0.98) 100%)' }} />
          </div>
          <div className="relative" style={{ zIndex: 1 }}>
            <div className="text-center mb-8">
              <span className="font-sans font-semibold uppercase" style={{ color: 'hsl(38, 55%, 62%)', fontSize: '12px', letterSpacing: '0.28em' }}>Sectors We Look At</span>
              <div className="mx-auto mt-2.5 w-12 h-[1.5px]" style={{ background: 'hsl(38, 55%, 62%)' }} />
            </div>
            <div className="space-y-10">
              <SectorColumn heading={indiaSectors.left.heading} items={indiaSectors.left.items} side="left" isMobile={true} />
              <SectorColumn heading={indiaSectors.right.heading} items={indiaSectors.right.items} side="right" isMobile={true} />
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Desktop: full 250vh sticky circle-expand animation ──
  const circleSize = 300;
  const imageProgress = Math.min(progress / 0.55, 1);
  const sectorProgress = Math.max(0, Math.min((progress - 0.55) / 0.45, 1));

  const maxDim = Math.max(typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080);
  const targetScale = (maxDim * 1.5) / circleSize;
  const currentScale = 1 + (targetScale - 1) * imageProgress;
  const currentBorderRadius = 50 * (1 - imageProgress);
  const textIsLight = imageProgress > 0.3;
  const taglineTop = 26 - (sectorProgress * 20);
  const overlayOffset = 18;
  const circleTop = 62 + (50 - 62) * imageProgress;

  return (
    <section ref={containerRef} className="relative" style={{ height: '250vh' }}>
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
            top: `${circleTop}%`,
            left: '50%',
          }}
        >
          <img
            src={INDIA_IMG}
            alt="India's industrial landscape"
            className="w-full h-full"
            loading="eager"
            width={4000}
            height={2667}
            style={{ objectFit: 'cover', objectPosition: 'center center', imageRendering: '-webkit-optimize-contrast' } as React.CSSProperties}
          />
          <div
            className="absolute inset-0"
            style={{ background: OVERLAY_GRADIENT, opacity: imageProgress }}
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
            maxWidth: '820px',
            textShadow: textIsLight ? '0 3px 20px rgba(0,0,0,0.8)' : 'none',
          }}
        >
          Building enduring platforms across India's{' '}
          <span style={{ color: 'hsl(38, 55%, 62%)' }}>lower middle market.</span>
        </h2>

        <div
          className="absolute left-1/2 w-full"
          style={{
            zIndex: 10,
            pointerEvents: sectorProgress > 0.1 ? 'auto' : 'none',
            transform: `translateX(-50%) translateY(${40 * (1 - sectorProgress)}px)`,
            opacity: sectorProgress,
            top: `${taglineTop + overlayOffset}%`,
            maxWidth: '1100px',
            padding: '0 2.5rem',
            transition: 'opacity 0.1s ease',
          }}
        >
          <div className="text-center mb-10">
            <span
              className="font-sans font-semibold uppercase"
              style={{ color: 'hsl(38, 55%, 62%)', fontSize: '14px', letterSpacing: '0.28em' }}
            >
              Sectors We Look At
            </span>
            <div className="mx-auto mt-2.5 w-12 h-[1.5px]" style={{ background: 'hsl(38, 55%, 62%)' }} />
          </div>
          <div className="grid grid-cols-2 gap-8 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: 'hsl(38, 55%, 62%, 0.2)' }} />
            <SectorColumn heading={indiaSectors.left.heading} items={indiaSectors.left.items} side="left" isMobile={false} />
            <SectorColumn heading={indiaSectors.right.heading} items={indiaSectors.right.items} side="right" isMobile={false} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicScrollReveal;
