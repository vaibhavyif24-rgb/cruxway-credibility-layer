import { useRef, useState, useEffect } from 'react';
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
const STICKY_STEP = 20;
const CARD_HEIGHT = 'min(85vh, 600px)';

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
      { threshold: [0, 0.5, 1], rootMargin: '-10% 0px -30% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mb-6 will-change-transform"
      style={{
        position: 'sticky',
        top: `${stickyTop}px`,
        zIndex: index + 1,
      }}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl"
        style={{
          height: CARD_HEIGHT,
          boxShadow: '0 -6px 24px -4px rgba(0,0,0,0.2), 0 16px 40px -8px rgba(0,0,0,0.18)',
          background: 'linear-gradient(135deg, hsl(220, 40%, 8%) 0%, hsl(225, 45%, 5%) 50%, hsl(215, 35%, 10%) 100%)',
        }}
      >
        {/* Celestial SVG illustration as full-bleed background */}
        <div className="absolute inset-0 w-full h-full">
          <CelestialIllustration index={index} />
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, hsl(220, 40%, 5%) 85%)',
        }} />

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
                transition: 'opacity 0.5s ease-out 0.05s, transform 0.5s ease-out 0.05s',
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
                transition: 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s',
                textShadow: '0 2px 30px rgba(0,0,0,0.7)',
              }}
            >
              {principle.t}
            </h2>

            {/* Gold rule */}
            <div
              className="my-5 flex justify-center"
              style={{
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.5s ease-out 0.15s',
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
                transition: 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s',
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
    <div className="relative px-5 md:px-10 lg:px-16 pt-6 md:pt-8 pb-10 md:pb-14">
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
      </div>
    </div>
  );
};

export default PrinciplesSlider;
