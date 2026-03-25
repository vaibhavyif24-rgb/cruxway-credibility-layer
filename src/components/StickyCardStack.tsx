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

/* ─── Background palettes ─── */
const lightBgs = [
  'hsl(220 8% 18%)',      // dark charcoal
  'hsl(40 30% 96%)',      // warm cream
  'hsl(38 22% 90%)',      // warm sand
  'hsl(207 55% 14%)',     // prussian blue
];

const darkBgs = [
  'hsl(207 60% 10%)',
  'hsl(210 50% 14%)',
  'hsl(207 45% 18%)',
  'hsl(210 55% 8%)',
];

/* ─── Text color per bg ─── */
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

/* ─── Decorative SVG backgrounds per card ─── */
const CardDecoration: React.FC<{ index: number; isDark: boolean }> = ({ index, isDark }) => {
  const baseOpacity = isDark ? 0.06 : 0.08;
  const strokeColor = isDark ? 'hsl(38 48% 52%)' : 'hsl(210 8% 60%)';

  // Different geometric patterns per card
  const patterns = [
    // Card 0: concentric rings
    <svg key="0" viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {[80, 120, 160, 200].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={strokeColor} strokeWidth="0.5" opacity={baseOpacity} />
      ))}
      <circle cx="200" cy="200" r="4" fill={strokeColor} opacity={baseOpacity * 2} />
    </svg>,
    // Card 1: large arc sweep
    <svg key="1" viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <path d="M 400 400 A 350 350 0 0 0 50 400" fill="none" stroke={strokeColor} strokeWidth="0.8" opacity={baseOpacity} />
      <path d="M 400 400 A 280 280 0 0 0 120 400" fill="none" stroke={strokeColor} strokeWidth="0.5" opacity={baseOpacity * 0.7} />
      <path d="M 400 400 A 200 200 0 0 0 200 400" fill="none" stroke={strokeColor} strokeWidth="0.5" opacity={baseOpacity * 0.5} />
    </svg>,
    // Card 2: grid dots
    <svg key="2" viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={50 + col * 44}
            cy={50 + row * 44}
            r="1.5"
            fill={strokeColor}
            opacity={baseOpacity * (1 + (row + col) * 0.05)}
          />
        ))
      )}
    </svg>,
    // Card 3: diagonal lines
    <svg key="3" viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {[0, 60, 120, 180, 240, 300].map((offset) => (
        <line key={offset} x1={offset} y1="0" x2={offset + 200} y2="400" stroke={strokeColor} strokeWidth="0.5" opacity={baseOpacity * 0.8} />
      ))}
    </svg>,
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle radial highlight */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 60% 50% at 75% 50%, hsla(38, 48%, 52%, 0.04) 0%, transparent 70%)'
            : index % 2 === 0
              ? 'radial-gradient(ellipse 60% 50% at 75% 50%, hsla(40, 30%, 96%, 0.06) 0%, transparent 70%)'
              : 'radial-gradient(ellipse 60% 50% at 75% 50%, hsla(207, 55%, 14%, 0.03) 0%, transparent 70%)',
        }}
      />
      {/* SVG pattern */}
      <div className="absolute right-0 top-0 w-[45%] h-full flex items-center justify-center opacity-80">
        {patterns[index % patterns.length]}
      </div>
    </div>
  );
};

/* ─── Individual Card ─── */
const STICKY_TOP = 88; // px — all cards pin at this position

const CardItem: React.FC<{
  card: StickyCard;
  index: number;
  total: number;
  variant: 'light' | 'dark';
  scrollProgress: number; // 0 = not yet reached, 1 = fully covered by next card
}> = ({ card, index, total, variant, scrollProgress }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isDark = variant === 'dark';
  const bg = isDark ? darkBgs[index % darkBgs.length] : lightBgs[index % lightBgs.length];
  const colors = isDark
    ? darkTextColors
    : lightTextColors[index % lightTextColors.length];

  // Depth cues: buried cards scale down and dim
  const scale = 1 - scrollProgress * 0.06;
  const opacity = 1 - scrollProgress * 0.35;
  const shadowAlpha = 0.12 + index * 0.08;
  const shadowBlur = 16 + index * 12;

  return (
    <div
      ref={cardRef}
      className="sticky will-change-transform"
      style={{
        top: `${STICKY_TOP}px`,
        zIndex: (index + 1) * 10,
        /* Entrance animation */
        opacity: isVisible ? opacity : 0,
        transform: isVisible
          ? `scale(${scale})`
          : 'translateY(80px)',
        transition: isVisible
          ? 'transform 0.15s ease-out, opacity 0.15s ease-out'
          : 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      <div
        className="relative rounded-2xl md:rounded-3xl overflow-hidden"
        style={{
          backgroundColor: bg,
          boxShadow: `0 ${shadowBlur}px ${shadowBlur * 2}px -${8 + index * 2}px rgba(0,0,0,${shadowAlpha})`,
        }}
      >
        <CardDecoration index={index} isDark={isDark} />

        {/* Card content */}
        <div className="relative z-10 min-h-[44vh] md:min-h-[52vh] flex items-center">
          <div className="flex-1 px-8 md:px-14 lg:px-20 py-10 md:py-14">
            {/* Step label */}
            <div
              className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] mb-5"
              style={{ color: colors.step, opacity: 0.65 }}
            >
              Step {card.num}
            </div>

            {/* Title */}
            <h3
              className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.1] tracking-[-0.02em] mb-4 md:mb-5"
              style={{ color: colors.title }}
            >
              {card.title.toLowerCase()}.
            </h3>

            {/* Description */}
            <p
              className="font-sans text-[14px] md:text-[16px] leading-[1.75] max-w-[480px]"
              style={{ color: colors.desc }}
            >
              {card.description}
            </p>
          </div>

          {/* Right: large step number watermark */}
          <div
            className="hidden md:flex items-center justify-center w-[35%] lg:w-[40%] pr-8 lg:pr-12"
            aria-hidden="true"
          >
            <span
              className="font-serif text-[clamp(6rem,12vw,10rem)] leading-none tracking-[-0.04em] select-none"
              style={{
                color: colors.step,
                opacity: 0.06,
              }}
            >
              {card.num}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Stack Container ─── */
const StickyCardStack: React.FC<StickyCardStackProps> = ({ cards, variant = 'light' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progresses, setProgresses] = useState<number[]>(() => cards.map(() => 0));

  const setWrapperRef = useCallback((el: HTMLDivElement | null, i: number) => {
    wrapperRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const newProgresses = cards.map((_, i) => {
        const wrapper = wrapperRefs.current[i];
        if (!wrapper) return 0;
        const rect = wrapper.getBoundingClientRect();
        const cardHeight = rect.height * 0.6; // approximate visible card height
        // Progress: how much this card has been scrolled past (0 to 1)
        const scrolledPast = STICKY_TOP - rect.top;
        const progress = Math.max(0, Math.min(1, scrolledPast / cardHeight));
        return i < cards.length - 1 ? progress : 0; // last card never shrinks
      });
      setProgresses(newProgresses);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cards.length]);

  return (
    <div ref={containerRef} className="relative pb-[10vh]">
      {cards.map((card, i) => (
        <div
          key={card.num}
          ref={(el) => setWrapperRef(el, i)}
          style={{
            // Each wrapper gives scroll distance for the card to pin.
            // Cards after the first overlap tighter.
            height: i < cards.length - 1 ? '70vh' : 'auto',
            marginBottom: i < cards.length - 1 ? '-2vh' : 0,
          }}
        >
          <CardItem
            card={card}
            index={i}
            total={cards.length}
            variant={variant}
            scrollProgress={progresses[i]}
          />
        </div>
      ))}
    </div>
  );
};

export default StickyCardStack;
