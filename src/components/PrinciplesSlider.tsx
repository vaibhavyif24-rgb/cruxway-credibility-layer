import React, { useRef, useState, useEffect } from 'react';
import { GoldRule } from '@/components/ui/Section';
import CelestialIllustration from '@/components/CelestialIllustrations';

interface Principle {
  t: string;
  d: string;
}

interface PrinciplesSliderProps {
  principles: Principle[];
  isDark?: boolean;
}

/* ─── Constants ─── */
const STICKY_BASE = 80;
const STICKY_STEP = 16;
const CARD_HEIGHT = 'min(75vh, 520px)';

const MemoizedCelestial = React.memo(CelestialIllustration);

/* ─── Theme palettes ─── */
const darkCardBg = 'linear-gradient(135deg, hsl(220, 40%, 8%) 0%, hsl(225, 45%, 5%) 50%, hsl(215, 35%, 10%) 100%)';
const lightCardBg = 'linear-gradient(135deg, hsl(40, 25%, 96%) 0%, hsl(38, 20%, 93%) 50%, hsl(40, 22%, 91%) 100%)';

const PrincipleCard: React.FC<{
  principle: Principle;
  index: number;
  total: number;
  stickyTop: number;
  isDark: boolean;
}> = ({ principle, index, total, stickyTop, isDark }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(index === 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting && entry.intersectionRatio > 0.5),
      { threshold: [0, 0.5, 1], rootMargin: '-10% 0px -20% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // will-change cleanup
  const [isNearViewport, setIsNearViewport] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: '200px 0px 200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const titleColor = isDark ? '#F8F6F2' : 'hsl(207, 65%, 12%)';
  const descColor = isDark ? 'rgba(248,246,242,0.7)' : 'hsl(210, 8%, 38%)';
  const indexColor = isDark ? 'hsl(38, 45%, 55%, 0.5)' : 'hsl(38, 48%, 42%, 0.6)';
  const shadowActive = isDark
    ? '0 -6px 30px -4px rgba(0,0,0,0.25), 0 20px 50px -10px rgba(0,0,0,0.22)'
    : '0 -4px 20px -4px rgba(0,0,0,0.08), 0 12px 36px -8px rgba(0,0,0,0.1)';
  const shadowInactive = isDark
    ? '0 -4px 16px -4px rgba(0,0,0,0.15), 0 8px 24px -6px rgba(0,0,0,0.12)'
    : '0 -2px 10px -2px rgba(0,0,0,0.04), 0 6px 16px -4px rgba(0,0,0,0.06)';

  return (
    <div
      ref={ref}
      className="mb-3"
      style={{
        position: 'sticky',
        top: `${stickyTop}px`,
        zIndex: index + 1,
        willChange: isNearViewport ? 'transform' : 'auto',
      }}
    >
      <div
        className="relative w-full overflow-hidden rounded-xl transition-shadow duration-500"
        style={{
          height: CARD_HEIGHT,
          background: isDark ? darkCardBg : lightCardBg,
          boxShadow: isActive ? shadowActive : shadowInactive,
        }}
      >
        {/* Animated background effects — only in dark mode */}
        {isDark && (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute w-[140%] h-[140%] top-1/2 left-1/2"
              style={{
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(ellipse at center, hsl(38, 45%, 55%, 0.08) 0%, transparent 60%)',
                animation: 'celestial-rotate 20s linear infinite',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 40% 45%, hsl(207, 50%, 30%, 0.15) 0%, transparent 50%), radial-gradient(circle at 65% 60%, hsl(38, 48%, 52%, 0.1) 0%, transparent 45%)',
                animation: 'nebula-pulse 6s ease-in-out infinite',
              }}
            />
            {[
              { top: '20%', left: '15%', delay: '0s', size: 3 },
              { top: '70%', left: '80%', delay: '4s', size: 2 },
              { top: '45%', left: '90%', delay: '8s', size: 2.5 },
            ].map((p, i) => (
              <div
                key={i}
                className="absolute rounded-full float-orb-slow"
                style={{
                  top: p.top,
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  background: 'hsl(38, 45%, 55%)',
                  animationDelay: p.delay,
                  opacity: 0.5,
                }}
              />
            ))}
            <div
              className="absolute top-1/2 left-0 w-full h-px shimmer-effect"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(38, 45%, 55%, 0.15), transparent)',
                animationDuration: '6s',
              }}
            />
          </div>
        )}

        {/* Light mode subtle accents */}
        {!isDark && (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute w-[120%] h-[120%] top-1/2 left-1/2"
              style={{
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(ellipse at center, hsl(38, 45%, 55%, 0.04) 0%, transparent 60%)',
              }}
            />
            <div
              className="absolute top-1/2 left-0 w-full h-px shimmer-effect"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(38, 45%, 55%, 0.08), transparent)',
                animationDuration: '6s',
              }}
            />
          </div>
        )}

        {/* Celestial SVG illustration — full-bleed background (dark only for contrast) */}
        {isDark && (
          <div className="absolute inset-0 w-full h-full z-[1]">
            <MemoizedCelestial index={index} />
          </div>
        )}

        {/* Vignette overlay (dark mode only) */}
        {isDark && (
          <div className="absolute inset-0 z-[2]" style={{
            background: 'radial-gradient(ellipse at center, transparent 20%, hsl(220, 40%, 5%) 85%)',
          }} />
        )}

        {/* Active gold glow pulse on edges */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none rounded-xl transition-opacity duration-700"
          style={{
            opacity: isActive ? 1 : 0,
            boxShadow: isDark
              ? 'inset 0 0 60px -20px hsl(38, 45%, 55%, 0.06)'
              : 'inset 0 0 40px -15px hsl(38, 45%, 55%, 0.04)',
          }}
        />

        {/* Content — centered */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
          <div className="flex flex-col items-center max-w-[540px]">
            <span
              className="font-serif text-[13px] md:text-[15px] tracking-[0.18em]"
              style={{
                color: indexColor,
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.5s ease-out 0.05s, transform 0.5s ease-out 0.05s',
              }}
            >
              {String(index + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(total).padStart(2, '0')}
            </span>

            <h2
              className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.025em] mt-4"
              style={{
                color: titleColor,
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s',
                textShadow: isDark ? '0 2px 30px rgba(0,0,0,0.7)' : 'none',
              }}
            >
              {principle.t}
            </h2>

            <div
              className="my-4 flex justify-center"
              style={{
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.5s ease-out 0.15s',
              }}
            >
              <GoldRule />
            </div>

            <p
              className="font-sans text-[14px] md:text-[17px] leading-[1.85] tracking-[0.01em] max-w-[440px]"
              style={{
                color: descColor,
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s',
                textShadow: isDark ? '0 2px 20px rgba(0,0,0,0.6)' : 'none',
              }}
            >
              {principle.d}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrinciplesSlider = ({ principles, isDark = true }: PrinciplesSliderProps) => {
  const total = principles.length;

  return (
    <div
      className="relative px-5 md:px-10 lg:px-16 pt-4 md:pt-6 pb-6 md:pb-10"
    >
      <div className="max-w-[1080px] mx-auto">
        {principles.map((principle, i) => (
          <PrincipleCard
            key={principle.t}
            principle={principle}
            index={i}
            total={total}
            stickyTop={STICKY_BASE + i * STICKY_STEP}
            isDark={isDark}
          />
        ))}
        <div className="h-[80px] md:h-[50px]" />
      </div>
    </div>
  );
};

export default PrinciplesSlider;
