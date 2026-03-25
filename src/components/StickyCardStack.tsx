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
const CARD_HEIGHT = 380;          // px – visible card surface height
const SCROLL_PER_CARD = 0.65;     // fraction of viewport per card transition

/* ─── Background palettes ─── */
const lightBgs = [
  'hsl(220 8% 18%)',
  'hsl(40 30% 96%)',
  'hsl(38 22% 90%)',
  'hsl(207 55% 14%)',
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

/* ─── Card Surface ─── */
const CardSurface: React.FC<{
  card: StickyCard;
  index: number;
  variant: 'light' | 'dark';
  isActive: boolean;
}> = ({ card, index, variant, isActive }) => {
  const isDark = variant === 'dark';
  const bg = isDark ? darkBgs[index % darkBgs.length] : lightBgs[index % lightBgs.length];
  const colors = isDark ? darkTextColors : lightTextColors[index % lightTextColors.length];

  return (
    <div
      className="rounded-2xl md:rounded-3xl overflow-hidden relative w-full"
      style={{
        backgroundColor: bg,
        height: `${CARD_HEIGHT}px`,
        boxShadow: `0 -6px 24px -4px rgba(0,0,0,0.2), 0 16px 40px -8px rgba(0,0,0,0.18)`,
      }}
    >
      <CardDecoration index={index} isDark={isDark} />

      <div className="relative z-10 flex items-center h-full">
        <div className="flex-1 px-8 md:px-14 lg:px-20 py-10 md:py-14">
          <div
            className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] mb-5"
            style={{
              color: colors.step,
              opacity: isActive ? 0.6 : 0,
              transform: `translateY(${isActive ? 0 : 12}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              transitionDelay: '0s',
            }}
          >
            Step {card.num}
          </div>
          <h3
            className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.1] tracking-[-0.02em] mb-4 md:mb-5"
            style={{
              color: colors.title,
              opacity: isActive ? 1 : 0,
              transform: `translateY(${isActive ? 0 : 12}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              transitionDelay: '0.1s',
            }}
          >
            {card.title.toLowerCase()}.
          </h3>
          <p
            className="font-sans text-[14px] md:text-[16px] leading-[1.75] max-w-[480px]"
            style={{
              color: colors.desc,
              opacity: isActive ? 1 : 0,
              transform: `translateY(${isActive ? 0 : 12}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              transitionDelay: '0.2s',
            }}
          >
            {card.description}
          </p>
        </div>

        <div className="hidden md:flex items-center justify-center w-[35%] lg:w-[40%] pr-8 lg:pr-12" aria-hidden="true">
          <span
            className="font-serif text-[clamp(6rem,12vw,10rem)] leading-none tracking-[-0.04em] select-none"
            style={{
              color: colors.step,
              opacity: isActive ? 0.06 : 0,
              transition: 'opacity 0.5s ease-out',
              transitionDelay: '0.15s',
            }}
          >
            {card.num}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Scroll-Driven Vertical Carousel ───
 *
 * Outer wrapper: tall div creating scroll runway (cards.length * SCROLL_PER_CARD * 100vh)
 * Inner sticky: pinned container with overflow:hidden, exactly CARD_HEIGHT tall
 * Track: all cards stacked vertically, translateY driven by scroll progress
 *
 * As user scrolls through the outer wrapper, the track moves up,
 * each card sliding into the visible window and covering the previous one.
 */
const StickyCardStack: React.FC<StickyCardStackProps> = ({ cards, variant = 'light' }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const rect = outer.getBoundingClientRect();
    const outerHeight = outer.offsetHeight;
    const viewportHeight = window.innerHeight;

    // How far into the outer wrapper we've scrolled (0 to 1)
    // Start tracking when the top of the outer hits STICKY_TOP
    const scrolled = -(rect.top - STICKY_TOP);
    const scrollableRange = outerHeight - viewportHeight + STICKY_TOP;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));

    // Map progress to card index
    const idx = Math.min(
      cards.length - 1,
      Math.floor(progress * cards.length)
    );
    setActiveIndex(idx);
  }, [cards.length]);

  useEffect(() => {
    const onScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  // Outer height: enough scroll runway for each card transition
  const outerHeight = cards.length * SCROLL_PER_CARD * 100; // in vh units

  return (
    <div
      ref={outerRef}
      className="relative"
      style={{ height: `${outerHeight}vh` }}
    >
      {/* Sticky container — pinned in viewport */}
      <div
        className="sticky overflow-hidden rounded-2xl md:rounded-3xl"
        style={{
          top: `${STICKY_TOP}px`,
          height: `${CARD_HEIGHT}px`,
        }}
      >
        {/* Carousel track — slides up based on active index */}
        <div
          className="will-change-transform"
          style={{
            transform: `translateY(-${activeIndex * CARD_HEIGHT}px)`,
            transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {cards.map((card, i) => (
            <CardSurface
              key={card.num}
              card={card}
              index={i}
              variant={variant}
            />
          ))}
        </div>
      </div>

      {/* Dot indicators — fixed alongside the sticky container */}
      <div
        className="sticky flex flex-col items-center gap-2 pointer-events-none"
        style={{
          top: `${STICKY_TOP + CARD_HEIGHT / 2 - (cards.length * 14) / 2}px`,
          marginTop: `-${CARD_HEIGHT}px`,
          marginLeft: 'auto',
          width: '40px',
        }}
      >
        {cards.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? '8px' : '5px',
              height: i === activeIndex ? '8px' : '5px',
              backgroundColor: i === activeIndex
                ? 'hsl(38 48% 52%)'
                : variant === 'dark'
                  ? 'hsla(40, 30%, 96%, 0.2)'
                  : 'hsla(210, 8%, 44%, 0.25)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StickyCardStack;
