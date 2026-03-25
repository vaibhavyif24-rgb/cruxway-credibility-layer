import { useRef, useState, useEffect } from 'react';
import { GoldRule } from '@/components/ui/Section';
import { useTheme } from '@/contexts/ThemeContext';

import integrityImg from '@/assets/principles/integrity.jpg';
import servantLeadershipImg from '@/assets/principles/servant-leadership.jpg';
import humilityImg from '@/assets/principles/humility.jpg';
import gritImg from '@/assets/principles/grit.jpg';
import biasToActionImg from '@/assets/principles/bias-to-action.jpg';
import goldenRuleImg from '@/assets/principles/golden-rule.jpg';

const images = [integrityImg, servantLeadershipImg, humilityImg, gritImg, biasToActionImg, goldenRuleImg];

// Preload all images on mount
const preloadImages = () => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

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
  image: string;
  index: number;
  total: number;
  stickyTop: number;
}> = ({ principle, image, index, total, stickyTop }) => {
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
        }}
      >
        {/* Background image */}
        <img
          src={image}
          alt={principle.t}
          className="absolute inset-0 w-full h-full object-cover"
          loading={index === 0 ? 'eager' : 'lazy'}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
          <div className="flex flex-col items-center max-w-[580px]">
            <p
              className="font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.28em] text-gold/60 mb-6"
              style={{
                opacity: isActive ? 0.7 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                textShadow: '0 1px 8px rgba(0,0,0,0.5)',
              }}
            >
              What Guides Us
            </p>

            <span
              className="font-serif text-[13px] md:text-[14px] font-medium tracking-[0.18em] text-white/50 mb-4"
              style={{
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.5s ease-out 0.05s, transform 0.5s ease-out 0.05s',
                textShadow: '0 1px 6px rgba(0,0,0,0.5)',
              }}
            >
              {String(index + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(total).padStart(2, '0')}
            </span>

            <h2
              className="font-serif text-[clamp(2.2rem,5.5vw,3.8rem)] text-white leading-[1.05] tracking-[-0.025em]"
              style={{
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s',
                textShadow: '0 2px 16px rgba(0,0,0,0.5)',
              }}
            >
              {principle.t}
            </h2>

            <div
              className="my-5 flex justify-center"
              style={{
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.5s ease-out 0.15s',
              }}
            >
              <GoldRule />
            </div>

            <p
              className="font-sans text-[14px] md:text-[16px] text-white/55 leading-[1.85] tracking-[0.01em] max-w-[440px]"
              style={{
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s',
                textShadow: '0 1px 10px rgba(0,0,0,0.4)',
              }}
            >
              {principle.d}
            </p>
              style={{
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s',
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
  useEffect(() => {
    preloadImages();
  }, []);

  const total = principles.length;

  return (
    <div className="relative px-5 md:px-10 lg:px-16 py-10 md:py-14">
      <div className="max-w-[1080px] mx-auto">
        {principles.map((principle, i) => (
          <PrincipleCard
            key={principle.t}
            principle={principle}
            image={images[i]}
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
