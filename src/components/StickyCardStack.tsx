import React, { useRef, useEffect, useState, useCallback } from 'react';

export interface StickyCard {
  num: string;
  title: string;
  description: string;
}

interface StickyCardStackProps {
  cards: StickyCard[];
  variant?: 'light' | 'dark';
}

/* ─── Constants ─── */
const STICKY_TOP = 88;
const CARD_HEIGHT = '52vh';
const WRAPPER_HEIGHT = '100vh'; // tall enough for real sticky runway

/* ─── Background palettes ─── */
const lightBgs = [
  'hsl(220 8% 18%)',   // dark charcoal
  'hsl(40 30% 96%)',   // warm cream
  'hsl(38 22% 90%)',   // warm sand
  'hsl(207 55% 14%)',  // prussian blue
];

const darkBgs = [
  'hsl(207 60% 10%)',
  'hsl(210 50% 14%)',
  'hsl(207 45% 18%)',
  'hsl(210 55% 8%)',
];

const lightTextColors = [
  { title: 'hsl(40 30% 96%)', desc: 'hsl(40 20% 78%)', step: 'hsl(38 48% 52%)' },
  { title: 'hsl(207 65% 12%)', desc: 'hsl(210 8% 44%)', step: 'hsl(38 48% 52%)' },
  { title: 'hsl(207 65% 12%)', desc: 'hsl(210 8% 44%)', step: 'hsl(38 48% 52%)' },
  { title: 'hsl(40 30% 96%)', desc: 'hsl(40 20% 78%)', step: 'hsl(38 48% 52%)' },
];

const darkTextColors = {
  title: 'hsl(40 30% 96%)',
  desc: 'hsl(40 20% 72%)',
  step: 'hsl(38 48% 52%)',
};

/* ─── Minimal SVG decoration ─── */
const CardDecoration: React.FC<{ index: number; isDark: boolean }> = ({ index, isDark }) => {
  const opacity = isDark ? 0.05 : 0.06;
  const stroke = isDark ? 'hsl(38 48% 52%)' : 'hsl(210 8% 55%)';

  const patterns: Record<number, React.ReactNode> = {
    0: (
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {[100, 150, 200].map(r => (
          <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={stroke} strokeWidth="0.5" opacity={opacity} />
        ))}
      </svg>
    ),
    1: (
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <path d="M 400 400 A 320 320 0 0 0 80 400" fill="none" stroke={stroke} strokeWidth="0.6" opacity={opacity} />
        <path d="M 400 400 A 220 220 0 0 0 180 400" fill="none" stroke={stroke} strokeWidth="0.4" opacity={opacity * 0.7} />
      </svg>
    ),
    2: (
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={60 + c * 56} cy={60 + r * 56} r="1.2" fill={stroke} opacity={opacity} />
          ))
        )}
      </svg>
    ),
    3: (
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {[0, 80, 160, 240].map(o => (
          <line key={o} x1={o} y1="0" x2={o + 200} y2="400" stroke={stroke} strokeWidth="0.4" opacity={opacity * 0.8} />
        ))}
      </svg>
    ),
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute right-0 top-0 w-[40%] h-full flex items-center justify-center">
        {patterns[index % 4]}
      </div>
    </div>
  );
};

/* ─── Card Surface (inner, receives animation transforms) ─── */
const CardSurface: React.FC<{
  card: StickyCard;
  index: number;
  variant: 'light' | 'dark';
  isVisible: boolean;
  buriedProgress: number; // 0 = fully visible, 1 = fully buried
}> = ({ card, index, variant, isVisible, buriedProgress }) => {
  const isDark = variant === 'dark';
  const bg = isDark ? darkBgs[index % darkBgs.length] : lightBgs[index % lightBgs.length];
  const colors = isDark ? darkTextColors : lightTextColors[index % lightTextColors.length];

  // Depth cues on the inner surface
  const scale = 1 - buriedProgress * 0.06;
  const dimmedOpacity = 1 - buriedProgress * 0.35;
  const shadowBlur = 16 + index * 10;
  const shadowAlpha = 0.1 + index * 0.06;

  return (
    <div
      className="rounded-2xl md:rounded-3xl overflow-hidden relative"
      style={{
        backgroundColor: bg,
        minHeight: CARD_HEIGHT,
        boxShadow: `0 ${shadowBlur}px ${shadowBlur * 2}px -${6 + index * 2}px rgba(0,0,0,${shadowAlpha})`,
        transform: isVisible ? `scale(${scale})` : 'translateY(80px)',
        opacity: isVisible ? dimmedOpacity : 0,
        transition: isVisible
          ? 'transform 0.18s ease-out, opacity 0.18s ease-out'
          : 'opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
        transformOrigin: 'center top',
      }}
    >
      <CardDecoration index={index} isDark={isDark} />

      <div className="relative z-10 flex items-center" style={{ minHeight: CARD_HEIGHT }}>
        <div className="flex-1 px-8 md:px-14 lg:px-20 py-10 md:py-14">
          <div
            className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] mb-5"
            style={{ color: colors.step, opacity: 0.6 }}
          >
            Step {card.num}
          </div>
          <h3
            className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.1] tracking-[-0.02em] mb-4 md:mb-5"
            style={{ color: colors.title }}
          >
            {card.title.toLowerCase()}.
          </h3>
          <p
            className="font-sans text-[14px] md:text-[16px] leading-[1.75] max-w-[480px]"
            style={{ color: colors.desc }}
          >
            {card.description}
          </p>
        </div>

        <div className="hidden md:flex items-center justify-center w-[35%] lg:w-[40%] pr-8 lg:pr-12" aria-hidden="true">
          <span
            className="font-serif text-[clamp(6rem,12vw,10rem)] leading-none tracking-[-0.04em] select-none"
            style={{ color: colors.step, opacity: 0.06 }}
          >
            {card.num}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Stack Container ─── */
const StickyCardStack: React.FC<StickyCardStackProps> = ({ cards, variant = 'light' }) => {
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSet, setVisibleSet] = useState<Set<number>>(() => new Set());
  const [buriedProgresses, setBuriedProgresses] = useState<number[]>(() => cards.map(() => 0));

  // Entrance observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    wrapperRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSet(prev => new Set(prev).add(i));
            obs.unobserve(el);
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [cards.length]);

  // Scroll-driven buried progress: card i's progress is based on wrapper i+1 approaching sticky top
  useEffect(() => {
    const onScroll = () => {
      const next: number[] = cards.map((_, i) => {
        if (i >= cards.length - 1) return 0; // last card never buries
        const nextWrapper = wrapperRefs.current[i + 1];
        if (!nextWrapper) return 0;
        const rect = nextWrapper.getBoundingClientRect();
        // How far the next wrapper's top has passed the sticky top
        const travel = STICKY_TOP - rect.top;
        const cardH = nextWrapper.offsetHeight * 0.5;
        return Math.max(0, Math.min(1, travel / cardH));
      });
      setBuriedProgresses(next);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [cards.length]);

  const setRef = useCallback((el: HTMLDivElement | null, i: number) => {
    wrapperRefs.current[i] = el;
  }, []);

  return (
    <div className="relative">
      {cards.map((card, i) => (
        <div
          key={card.num}
          ref={el => setRef(el, i)}
          style={{
            height: i < cards.length - 1 ? WRAPPER_HEIGHT : 'auto',
            marginTop: i > 0 ? '-15vh' : 0,
          }}
        >
          <div
            className="sticky will-change-transform"
            style={{
              top: `${STICKY_TOP}px`,
              zIndex: (i + 1) * 10,
            }}
          >
            <CardSurface
              card={card}
              index={i}
              variant={variant}
              isVisible={visibleSet.has(i)}
              buriedProgress={buriedProgresses[i]}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StickyCardStack;
