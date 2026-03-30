import React, { useRef, useEffect, useState, useCallback } from 'react';

export interface DeckCard {
  num: string;
  title: string;
  description: string;
}

interface HorizontalStickyDeckProps {
  cards: DeckCard[];
  variant?: 'light' | 'dark';
}

/* ─── Constants ─── */
const STICKY_TOP = 88;
const MIN_CARD_HEIGHT = 420;
const SCROLL_PER_CARD = 0.65;

const getCardHeight = () => {
  if (typeof window === 'undefined') return 620;
  return Math.max(MIN_CARD_HEIGHT, window.innerHeight - STICKY_TOP);
};

/* ─── Background palettes (same as StickyCardStack for consistency) ─── */
const lightBgs = [
  'hsl(220 8% 18%)',
  'hsl(40 30% 96%)',
  'hsl(38 22% 90%)',
  'hsl(228 50% 16%)',
  'hsl(40 28% 94%)',
  'hsl(220 10% 16%)',
];

const darkBgs = [
  'hsl(228 55% 12%)',
  'hsl(228 45% 16%)',
  'hsl(228 40% 20%)',
  'hsl(228 50% 10%)',
  'hsl(228 50% 14%)',
  'hsl(228 42% 18%)',
];

const lightTextColors = [
  { title: 'hsl(40 30% 96%)', desc: 'hsl(40 20% 78%)', step: 'hsl(38 48% 52%)' },
  { title: 'hsl(228 58% 18%)', desc: 'hsl(228 8% 44%)', step: 'hsl(38 48% 52%)' },
  { title: 'hsl(228 58% 18%)', desc: 'hsl(228 8% 44%)', step: 'hsl(38 48% 52%)' },
  { title: 'hsl(40 30% 96%)', desc: 'hsl(40 20% 78%)', step: 'hsl(38 48% 52%)' },
  { title: 'hsl(228 58% 18%)', desc: 'hsl(228 8% 44%)', step: 'hsl(38 48% 52%)' },
  { title: 'hsl(40 30% 96%)', desc: 'hsl(40 20% 78%)', step: 'hsl(38 48% 52%)' },
];

const darkTextColors = {
  title: 'hsl(40 30% 96%)',
  desc: 'hsl(40 20% 72%)',
  step: 'hsl(38 48% 52%)',
};

/* ─── 6 Unique Thematic Illustrations ─── */
const HorizontalIllustration: React.FC<{ index: number; isDark: boolean; isActive: boolean }> = ({ index, isDark, isActive }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => setPhase(p => (p === 0 ? 1 : 0)), 2000);
    return () => clearInterval(timer);
  }, [isActive]);

  const gold = 'hsl(38 45% 55%)';
  const goldDim = 'hsl(38 35% 45%)';
  const baseOpacity = isDark ? 0.15 : 0.25;

  const cornerAccents = (
    <>
      <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      <path d="M 10 270 L 10 290 L 30 290" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      <path d="M 270 290 L 290 290 L 290 270" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
    </>
  );

  const illustrations: Record<number, [React.ReactNode, React.ReactNode]> = {
    // 01 Founder Succession — Torch/flame handoff
    0: [
      <svg key="h0a" viewBox="0 0 300 300" className="w-full h-full">
        {/* Torch body */}
        <rect x="130" y="140" width="40" height="120" rx="4" fill="none" stroke={gold} strokeWidth="0.8" opacity={baseOpacity * 1.2} />
        <rect x="125" y="130" width="50" height="16" rx="3" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        {/* Flame */}
        <path d="M 150 130 Q 130 90 150 50 Q 170 90 150 130" fill={gold} opacity={baseOpacity * 0.4}>
          <animate attributeName="d" values="M 150 130 Q 130 90 150 50 Q 170 90 150 130;M 150 130 Q 125 85 150 45 Q 175 85 150 130;M 150 130 Q 130 90 150 50 Q 170 90 150 130" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M 150 130 Q 140 100 150 70 Q 160 100 150 130" fill={gold} opacity={baseOpacity * 0.8}>
          <animate attributeName="d" values="M 150 130 Q 140 100 150 70 Q 160 100 150 130;M 150 130 Q 135 95 150 65 Q 165 95 150 130;M 150 130 Q 140 100 150 70 Q 160 100 150 130" dur="1.5s" repeatCount="indefinite" />
        </path>
        {/* Hand left */}
        <path d="M 80 200 Q 100 180 125 190" fill="none" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.3} />
        {/* Hand right */}
        <path d="M 220 200 Q 200 180 175 190" fill="none" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.3} />
        {/* Glow */}
        <circle cx="150" cy="90" r="30" fill={gold} opacity={baseOpacity * 0.1}>
          <animate attributeName="r" values="25;35;25" dur="3s" repeatCount="indefinite" />
        </circle>
        {cornerAccents}
      </svg>,
      <svg key="h0b" viewBox="0 0 300 300" className="w-full h-full">
        {/* Arrow handoff */}
        <path d="M 60 180 Q 100 120 150 150 Q 200 180 240 120" fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.5} />
        {/* Nodes at ends */}
        <circle cx="60" cy="180" r="8" fill={gold} opacity={baseOpacity * 1.5}>
          <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="240" cy="120" r="8" fill={gold} opacity={baseOpacity * 1.5}>
          <animate attributeName="r" values="7;10;7" dur="3s" begin="1.5s" repeatCount="indefinite" />
        </circle>
        {/* Directional arrow */}
        <path d="M 230 115 L 245 118 L 235 130" fill="none" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.5} />
        {/* Pulse between */}
        <circle cx="150" cy="150" r="5" fill={gold} opacity={baseOpacity * 2}>
          <animate attributeName="cx" values="100;200;100" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values={`${baseOpacity};${baseOpacity * 2.5};${baseOpacity}`} dur="4s" repeatCount="indefinite" />
        </circle>
        {cornerAccents}
      </svg>,
    ],

    // 02 Regulated Services — Shield with compliance
    1: [
      <svg key="h1a" viewBox="0 0 300 300" className="w-full h-full">
        {/* Shield */}
        <path d="M 150 40 L 240 80 L 240 170 Q 240 240 150 270 Q 60 240 60 170 L 60 80 Z" fill="none" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.3} />
        <path d="M 150 40 L 240 80 L 240 170 Q 240 240 150 270 Q 60 240 60 170 L 60 80 Z" fill={gold} opacity={baseOpacity * 0.08} />
        {/* Checkmark */}
        <path d="M 115 155 L 140 180 L 190 120" fill="none" stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={baseOpacity * 2}>
          <animate attributeName="opacity" values={`0;${baseOpacity * 2.5};${baseOpacity * 2.5}`} dur="1.5s" fill="freeze" />
        </path>
        {/* Grid lines */}
        {[100, 140, 180, 220].map(y => (
          <line key={y} x1="80" y1={y} x2="220" y2={y} stroke={gold} strokeWidth="0.25" opacity={baseOpacity * 0.3} />
        ))}
        {cornerAccents}
      </svg>,
      <svg key="h1b" viewBox="0 0 300 300" className="w-full h-full">
        {/* Regulatory document */}
        <rect x="70" y="40" width="160" height="220" rx="6" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        {/* Section lines */}
        {[75, 105, 135, 165, 195, 225].map((y, i) => (
          <React.Fragment key={i}>
            <circle cx="95" cy={y} r="3" fill={gold} opacity={baseOpacity * (i < 4 ? 1.5 : 0.6)} />
            <line x1="108" y1={y} x2={190 - (i % 3) * 15} y2={y} stroke={gold} strokeWidth="0.5" opacity={baseOpacity * 0.7} />
          </React.Fragment>
        ))}
        {/* Shield badge */}
        <path d="M 150 30 L 170 40 L 170 55 Q 170 65 150 70 Q 130 65 130 55 L 130 40 Z" fill={gold} opacity={baseOpacity * 0.5} />
        <circle cx="150" cy="150" r="70" fill={gold} opacity={baseOpacity * 0.06}>
          <animate attributeName="r" values="65;75;65" dur="4s" repeatCount="indefinite" />
        </circle>
        {cornerAccents}
      </svg>,
    ],

    // 03 Customer Retention — Loyalty loop
    2: [
      <svg key="h2a" viewBox="0 0 300 300" className="w-full h-full">
        {/* Circular arrows */}
        <path d="M 150 60 A 90 90 0 0 1 240 150" fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.5} />
        <path d="M 240 150 A 90 90 0 0 1 150 240" fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.5} />
        <path d="M 150 240 A 90 90 0 0 1 60 150" fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.5} />
        <path d="M 60 150 A 90 90 0 0 1 150 60" fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.5} />
        {/* Arrow heads at 4 points */}
        <path d="M 145 60 L 155 55 L 155 65" fill={gold} opacity={baseOpacity * 1.5} />
        <path d="M 240 145 L 245 155 L 235 155" fill={gold} opacity={baseOpacity * 1.5} />
        <path d="M 155 240 L 145 245 L 145 235" fill={gold} opacity={baseOpacity * 1.5} />
        <path d="M 60 155 L 55 145 L 65 145" fill={gold} opacity={baseOpacity * 1.5} />
        {/* Connection nodes */}
        {[[150, 60], [240, 150], [150, 240], [60, 150]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill={gold} opacity={baseOpacity * 1.8}>
            <animate attributeName="r" values="4;6;4" dur="2.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {/* Center pulse */}
        <circle cx="150" cy="150" r="6" fill={gold} opacity={baseOpacity * 2}>
          <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite" />
        </circle>
        {cornerAccents}
      </svg>,
      <svg key="h2b" viewBox="0 0 300 300" className="w-full h-full">
        {/* Infinity loop */}
        <path d="M 150 150 Q 100 80 60 150 Q 100 220 150 150 Q 200 80 240 150 Q 200 220 150 150" fill="none" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.3} />
        {/* Nodes along path */}
        {[[60, 150], [105, 110], [150, 150], [195, 110], [240, 150], [195, 190], [105, 190]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill={gold} opacity={baseOpacity * 1.5}>
            <animate attributeName="opacity" values={`${baseOpacity};${baseOpacity * 2.5};${baseOpacity}`} dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <circle cx="150" cy="150" r="60" fill={gold} opacity={baseOpacity * 0.06}>
          <animate attributeName="r" values="55;65;55" dur="4s" repeatCount="indefinite" />
        </circle>
        {cornerAccents}
      </svg>,
    ],

    // 04 Consolidation — Merge diagram
    3: [
      <svg key="h3a" viewBox="0 0 300 300" className="w-full h-full">
        {/* Small circles converging */}
        {[[60, 80], [240, 80], [60, 220], [240, 220], [50, 150], [250, 150]].map(([cx, cy], i) => (
          <React.Fragment key={i}>
            <circle cx={cx} cy={cy} r="12" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity}>
              <animate attributeName="r" values="10;14;10" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
            <line x1={cx} y1={cy} x2="150" y2="150" stroke={gold} strokeWidth="0.5" strokeDasharray="4 4" opacity={baseOpacity * 0.6} />
          </React.Fragment>
        ))}
        {/* Central large circle */}
        <circle cx="150" cy="150" r="35" fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.5} />
        <circle cx="150" cy="150" r="35" fill={gold} opacity={baseOpacity * 0.15}>
          <animate attributeName="r" values="30;38;30" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="150" r="8" fill={gold} opacity={baseOpacity * 2}>
          <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" />
        </circle>
        {cornerAccents}
      </svg>,
      <svg key="h3b" viewBox="0 0 300 300" className="w-full h-full">
        {/* Funnel shape */}
        <path d="M 40 60 L 260 60 L 180 150 L 180 240 L 120 240 L 120 150 Z" fill="none" stroke={gold} strokeWidth="0.8" opacity={baseOpacity} />
        <path d="M 40 60 L 260 60 L 180 150 L 120 150 Z" fill={gold} opacity={baseOpacity * 0.1} />
        {/* Input dots */}
        {[70, 110, 150, 190, 230].map((x, i) => (
          <circle key={i} cx={x} cy={50} r="4" fill={gold} opacity={baseOpacity * 1.5}>
            <animate attributeName="cy" values="50;150;50" dur="4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values={`${baseOpacity * 1.5};${baseOpacity * 0.3};${baseOpacity * 1.5}`} dur="4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {/* Output node */}
        <circle cx="150" cy="250" r="6" fill={gold} opacity={baseOpacity * 2}>
          <animate attributeName="r" values="5;8;5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        {cornerAccents}
      </svg>,
    ],

    // 05 Operational Upside — Ascending bars with gear
    4: [
      <svg key="h4a" viewBox="0 0 300 300" className="w-full h-full">
        {/* Axes */}
        <line x1="50" y1="250" x2="260" y2="250" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        <line x1="50" y1="250" x2="50" y2="50" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        {/* Ascending bars */}
        {[
          [80, 200], [115, 170], [150, 135], [185, 100], [220, 60]
        ].map(([x, y], i) => (
          <rect key={i} x={x as number - 12} y={y as number} width="24" height={250 - (y as number)} fill={gold} opacity={baseOpacity * 0.5} rx="2">
            <animate attributeName="opacity" values={`${baseOpacity * 0.3};${baseOpacity * 0.7};${baseOpacity * 0.3}`} dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </rect>
        ))}
        {/* Trend line */}
        <line x1="68" y1="210" x2="232" y2="50" stroke={gold} strokeWidth="0.8" strokeDasharray="4 4" opacity={baseOpacity * 1.2} />
        {/* Gear icon overlay */}
        <circle cx="220" cy="80" r="18" fill="none" stroke={gold} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <circle cx="220" cy="80" r="8" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity * 0.8} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
          <line key={angle} x1="220" y1={80 - 15} x2="220" y2={80 - 22} stroke={gold} strokeWidth="2.5" strokeLinecap="round" opacity={baseOpacity * 0.8} transform={`rotate(${angle} 220 80)`} />
        ))}
        {cornerAccents}
      </svg>,
      <svg key="h4b" viewBox="0 0 300 300" className="w-full h-full">
        {/* Staircase growth */}
        <path d="M 50 250 L 50 200 L 100 200 L 100 160 L 150 160 L 150 120 L 200 120 L 200 80 L 250 80 L 250 50" fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.5} />
        <path d="M 50 250 L 50 200 L 100 200 L 100 160 L 150 160 L 150 120 L 200 120 L 200 80 L 250 80 L 250 50 L 250 250 Z" fill={gold} opacity={baseOpacity * 0.08} />
        {/* Step nodes */}
        {[[50, 200], [100, 160], [150, 120], [200, 80], [250, 50]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill={gold} opacity={baseOpacity * 1.8}>
            <animate attributeName="r" values="3;5.5;3" dur="2.5s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {/* Up arrow */}
        <path d="M 250 50 L 245 60 M 250 50 L 255 60" fill="none" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.5} />
        {cornerAccents}
      </svg>,
    ],

    // 06 Values Alignment — Concentric circles with star
    5: [
      <svg key="h5a" viewBox="0 0 300 300" className="w-full h-full">
        {/* Concentric circles */}
        {[40, 70, 100, 130].map(r => (
          <circle key={r} cx="150" cy="150" r={r} fill="none" stroke={gold} strokeWidth="0.5" opacity={baseOpacity * (r === 40 ? 1.2 : 0.6)}>
            <animate attributeName="r" values={`${r - 2};${r + 2};${r - 2}`} dur={`${3 + r / 30}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {/* Compass star at center */}
        <path d="M 150 115 L 157 142 L 185 142 L 163 158 L 170 185 L 150 168 L 130 185 L 137 158 L 115 142 L 143 142 Z" fill="none" stroke={gold} strokeWidth="0.8" opacity={baseOpacity * 1.5} />
        <path d="M 150 115 L 157 142 L 150 168 L 143 142 Z" fill={gold} opacity={baseOpacity * 0.4} />
        {/* Cardinal dots */}
        {[[150, 20], [280, 150], [150, 280], [20, 150]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill={gold} opacity={baseOpacity * 1.2}>
            <animate attributeName="opacity" values={`${baseOpacity * 0.8};${baseOpacity * 2};${baseOpacity * 0.8}`} dur="3s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {cornerAccents}
      </svg>,
      <svg key="h5b" viewBox="0 0 300 300" className="w-full h-full">
        {/* Radial lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1="150" y1="150" x2="150" y2="30" stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.4} transform={`rotate(${i * 30} 150 150)`} />
        ))}
        {/* Inner and outer rings */}
        <circle cx="150" cy="150" r="50" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity * 0.8} />
        <circle cx="150" cy="150" r="100" fill="none" stroke={gold} strokeWidth="0.4" opacity={baseOpacity * 0.5} />
        {/* Heart/values icon at center */}
        <path d="M 150 165 Q 130 145 135 130 Q 140 115 150 125 Q 160 115 165 130 Q 170 145 150 165" fill={gold} opacity={baseOpacity * 1.5}>
          <animate attributeName="opacity" values={`${baseOpacity};${baseOpacity * 2};${baseOpacity}`} dur="2s" repeatCount="indefinite" />
        </path>
        {/* Orbit dots */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 150 + 100 * Math.sin(rad);
          const cy = 150 - 100 * Math.cos(rad);
          return (
            <circle key={i} cx={cx} cy={cy} r="4" fill={gold} opacity={baseOpacity * 1.3}>
              <animate attributeName="r" values="3;5;3" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
        {cornerAccents}
      </svg>,
    ],
  };

  const [variantA, variantB] = illustrations[index % 6] || illustrations[0];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute right-0 top-0 h-full w-[45%] flex items-center justify-center">
        <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
          <div
            className="absolute inset-0"
            style={{
              opacity: isActive ? (phase === 0 ? 1 : 0) : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          >
            {variantA}
          </div>
          <div
            className="absolute inset-0"
            style={{
              opacity: isActive ? (phase === 1 ? 1 : 0) : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          >
            {variantB}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Card Surface (Horizontal) ─── */
const HorizontalCardSurface: React.FC<{
  card: DeckCard;
  index: number;
  totalCards: number;
  variant: 'light' | 'dark';
  isActive: boolean;
  cardHeight: number;
}> = ({ card, index, totalCards, variant, isActive, cardHeight }) => {
  const isDark = variant === 'dark';
  const bg = isDark ? darkBgs[index % darkBgs.length] : lightBgs[index % lightBgs.length];
  const colors = isDark ? darkTextColors : lightTextColors[index % lightTextColors.length];

  return (
    <div
      className="absolute top-0 overflow-hidden rounded-2xl md:rounded-3xl"
      style={{
        backgroundColor: bg,
        height: `${cardHeight}px`,
        width: `${100 / totalCards}%`,
        left: `${(index * 100) / totalCards}%`,
        boxShadow: '0 -6px 24px -4px rgba(0,0,0,0.2), 0 16px 40px -8px rgba(0,0,0,0.18)',
      }}
    >
      <HorizontalIllustration index={index} isDark={isDark} isActive={isActive} />

      <div className="relative z-10 flex h-full items-center">
        <div className="flex-1 px-8 py-10 md:px-14 md:py-14 lg:px-20 lg:py-16">
          <div
            className="mb-5 font-sans text-[10px] font-medium uppercase tracking-[0.22em] md:text-[11px]"
            style={{
              color: colors.step,
              opacity: isActive ? 0.6 : 0,
              transform: `translateY(${isActive ? 0 : 12}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              transitionDelay: '0s',
            }}
          >
            {card.num}
          </div>
          <h3
            className="mb-4 font-serif text-[clamp(1.9rem,4vw,3.3rem)] leading-[1.05] tracking-[-0.02em] md:mb-5"
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
            className="max-w-[560px] font-sans text-[15px] leading-[1.8] md:text-[17px]"
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
      </div>
    </div>
  );
};

/* ─── Scroll-Driven Horizontal Deck ─── */
const HorizontalStickyDeck: React.FC<HorizontalStickyDeckProps> = ({ cards, variant = 'light' }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState(getCardHeight);

  const handleScroll = useCallback(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const rect = outer.getBoundingClientRect();
    const outerHeight = outer.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrolled = -(rect.top - STICKY_TOP);
    const scrollableRange = Math.max(1, outerHeight - viewportHeight + STICKY_TOP);
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
    const intervalCount = Math.max(cards.length - 1, 1);
    const idx = cards.length === 1
      ? 0
      : Math.min(cards.length - 1, Math.round(progress * intervalCount));

    setActiveIndex(idx);
  }, [cards.length]);

  useEffect(() => {
    const updateMeasurements = () => setCardHeight(getCardHeight());
    updateMeasurements();
    window.addEventListener('resize', updateMeasurements);
    return () => window.removeEventListener('resize', updateMeasurements);
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    handleScroll();
  }, [cardHeight, handleScroll]);

  const scrollStepPx = (cardHeight + STICKY_TOP) * SCROLL_PER_CARD;
  const outerHeight = cardHeight + Math.max(cards.length - 1, 0) * scrollStepPx;

  // Discrete full-slide translation
  const translateX = activeIndex * (100 / cards.length);

  return (
    <div
      ref={outerRef}
      className="relative"
      style={{ height: `${outerHeight}px` }}
    >
      <div
        className="sticky overflow-hidden rounded-2xl md:rounded-3xl"
        style={{
          top: `${STICKY_TOP}px`,
          height: `${cardHeight}px`,
        }}
      >
        {/* Horizontal track — discrete slide changes */}
        <div
          className="relative will-change-transform"
          style={{
            width: `${cards.length * 100}%`,
            height: `${cardHeight}px`,
            transform: `translateX(-${translateX}%)`,
            transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {cards.map((card, i) => (
            <HorizontalCardSurface
              key={card.num}
              card={card}
              index={i}
              totalCards={cards.length}
              variant={variant}
              isActive={i === activeIndex}
              cardHeight={cardHeight}
            />
          ))}
        </div>

        {/* Dot indicators — inside the sticky frame */}
        <div
          className="pointer-events-none absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2 md:right-5"
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
    </div>
  );
};

export default HorizontalStickyDeck;
