import React, { useRef, useState, useEffect, useCallback } from 'react';
import { GoldRule } from '@/components/ui/Section';
import CelestialIllustration from '@/components/CelestialIllustrations';

interface Principle {
  t: string;
  d: string;
}

interface PrinciplesSliderProps {
  principles: Principle[];
}

/* ─── Constants ─── */
const STICKY_BASE = 80;
const STICKY_STEP = 16;
const CARD_HEIGHT = 'min(75vh, 520px)';

const MemoizedCelestial = React.memo(CelestialIllustration);

const PrincipleCard: React.FC<{
  principle: Principle;
  index: number;
  total: number;
  stickyTop: number;
}> = ({ principle, index, total, stickyTop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting && entry.intersectionRatio > 0.5),
      { threshold: [0, 0.5, 1], rootMargin: '-15% 0px -25% 0px' }
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

  return (
    <div
      ref={ref}
      className="mb-3"
      style={{
        position: 'sticky',
        top: `${stickyTop}px`,
        zIndex: index + 1,
        willChange: isNearViewport ? 'transform' : 'auto',
        contain: 'layout style paint',
      }}
    >
      <div
        className={`relative w-full overflow-hidden rounded-2xl md:rounded-3xl transition-shadow duration-500 ${
          isActive ? 'shadow-[0_-6px_30px_-4px_rgba(0,0,0,0.25),0_20px_50px_-10px_rgba(0,0,0,0.22)]' : 'shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.15),0_8px_24px_-6px_rgba(0,0,0,0.12)]'
        }`}
        style={{
          height: CARD_HEIGHT,
          background: 'linear-gradient(135deg, hsl(220, 40%, 8%) 0%, hsl(225, 45%, 5%) 50%, hsl(215, 35%, 10%) 100%)',
        }}
      >
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Slow-rotating radial glow */}
          <div
            className="absolute w-[140%] h-[140%] top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(ellipse at center, hsl(38, 45%, 55%, 0.08) 0%, transparent 60%)',
              animation: 'celestial-rotate 20s linear infinite',
            }}
          />
          {/* Pulsing nebula glow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 40% 45%, hsl(207, 50%, 30%, 0.15) 0%, transparent 50%), radial-gradient(circle at 65% 60%, hsl(38, 48%, 52%, 0.1) 0%, transparent 45%)',
              animation: 'nebula-pulse 6s ease-in-out infinite',
            }}
          />
          {/* Floating gold particles */}
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
          {/* Shimmer sweep */}
          <div
            className="absolute top-1/2 left-0 w-full h-px shimmer-effect"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(38, 45%, 55%, 0.15), transparent)',
              animationDuration: '6s',
            }}
          />
        </div>

        {/* Celestial SVG illustration as full-bleed background */}
        <div className="absolute inset-0 w-full h-full z-[1]">
          <MemoizedCelestial index={index} />
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 z-[2]" style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, hsl(220, 40%, 5%) 85%)',
        }} />

        {/* Active gold glow pulse on edges */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none rounded-2xl md:rounded-3xl transition-opacity duration-700"
          style={{
            opacity: isActive ? 1 : 0,
            boxShadow: 'inset 0 0 60px -20px hsl(38, 45%, 55%, 0.06)',
          }}
        />

        {/* Content — centered */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
          <div className="flex flex-col items-center max-w-[540px]">
            {/* Numbered index */}
            <span
              className="font-serif text-[13px] md:text-[15px] tracking-[0.18em]"
              style={{
                color: 'hsl(38, 45%, 55%, 0.5)',
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.4s ease-out 0.05s, transform 0.4s ease-out 0.05s',
              }}
            >
              {String(index + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(total).padStart(2, '0')}
            </span>

            {/* Title */}
            <h2
              className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.025em] mt-4"
              style={{
                color: '#F8F6F2',
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s',
                textShadow: '0 2px 30px rgba(0,0,0,0.7)',
              }}
            >
              {principle.t}
            </h2>

            {/* Gold rule */}
            <div
              className="my-4 flex justify-center"
              style={{
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.4s ease-out 0.15s',
              }}
            >
              <GoldRule />
            </div>

            {/* Description */}
            <p
              className="font-sans text-[14px] md:text-[17px] leading-[1.85] tracking-[0.01em] max-w-[440px]"
              style={{
                color: 'rgba(248,246,242,0.7)',
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s',
                textShadow: '0 2px 20px rgba(0,0,0,0.6)',
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

const PrinciplesSlider = ({ principles }: PrinciplesSliderProps) => {
  const total = principles.length;

  return (
    <div
      className="relative px-5 md:px-10 lg:px-16 pt-4 md:pt-6 pb-6 md:pb-10"
      style={{ contain: 'layout style paint' }}
    >
      <div className="max-w-[1080px] mx-auto">
        {principles.map((principle, i) => (
          <PrincipleCard
            key={principle.t}
            principle={principle}
            index={i}
            total={total}
            stickyTop={STICKY_BASE + i * STICKY_STEP}
          />
        ))}
        {/* Scroll clearance after last card */}
        <div className="h-[80px] md:h-[50px]" />
      </div>
    </div>
  );
};

export default PrinciplesSlider;
