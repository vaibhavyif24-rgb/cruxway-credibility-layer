import React, { useRef, useEffect, useState, useCallback } from 'react';
import CriteriaIllustration from './CriteriaIllustrations';
export interface StickyCard {
  num: string;
  title: string;
  description: string;
}

interface StickyCardStackProps {
  cards: StickyCard[];
  variant?: 'light' | 'dark';
  illustrationSet?: 'process' | 'criteria';
  labelPrefix?: string;
}

/* ─── Constants ─── */
const STICKY_TOP = 88;
const MIN_CARD_HEIGHT = 420;
const SCROLL_PER_CARD = 0.65;

const getCardHeight = () => {
  if (typeof window === 'undefined') return 620;
  return Math.max(MIN_CARD_HEIGHT, window.innerHeight - STICKY_TOP);
};

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

/* ─── Thematic Illustrations (AnimatedAccent style) ─── */
const ThematicIllustration: React.FC<{ index: number; isDark: boolean; isActive: boolean }> = ({ index, isDark, isActive }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => setPhase(p => (p === 0 ? 1 : 0)), 2000);
    return () => clearInterval(timer);
  }, [isActive]);

  const gold = 'hsl(38 45% 55%)';
  const goldDim = 'hsl(38 35% 45%)';
  const baseOpacity = isDark ? 0.12 : 0.1;

  const illustrations: Record<number, [React.ReactNode, React.ReactNode]> = {
    // Discovery — Radar / Compass
    0: [
      <svg key="0a" viewBox="0 0 300 300" className="w-full h-full">
        {[50, 90, 130].map(r => (
          <circle key={r} cx="150" cy="150" r={r} fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        ))}
        <line x1="150" y1="20" x2="150" y2="280" stroke={gold} strokeWidth="0.4" opacity={baseOpacity * 0.6} />
        <line x1="20" y1="150" x2="280" y2="150" stroke={gold} strokeWidth="0.4" opacity={baseOpacity * 0.6} />
        {/* Sweep line */}
        <line x1="150" y1="150" x2="250" y2="60" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.5}>
          <animateTransform attributeName="transform" type="rotate" from="0 150 150" to="360 150 150" dur="6s" repeatCount="indefinite" />
        </line>
        {/* Nodes */}
        {[[200, 80], [100, 220], [230, 200], [80, 90]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill={gold} opacity={baseOpacity * 1.8}>
            <animate attributeName="r" values="3;5;3" dur="2.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values={`${baseOpacity};${baseOpacity * 2.5};${baseOpacity}`} dur="2.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {/* Corner accents */}
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 10 270 L 10 290 L 30 290" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 290 L 290 290 L 290 270" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
      // Variant 2 — Compass rose
      <svg key="0b" viewBox="0 0 300 300" className="w-full h-full">
        <circle cx="150" cy="150" r="120" fill="none" stroke={gold} strokeWidth="0.5" opacity={baseOpacity} />
        <circle cx="150" cy="150" r="80" fill="none" stroke={gold} strokeWidth="0.5" opacity={baseOpacity * 0.7} />
        {/* Cardinal lines */}
        {[0, 45, 90, 135].map(angle => (
          <line key={angle} x1="150" y1="30" x2="150" y2="270" stroke={gold} strokeWidth={angle % 90 === 0 ? '0.6' : '0.3'} opacity={baseOpacity * 0.5} transform={`rotate(${angle} 150 150)`} />
        ))}
        {/* Compass diamond */}
        <path d="M 150 50 L 170 150 L 150 250 L 130 150 Z" fill="none" stroke={gold} strokeWidth="0.8" opacity={baseOpacity * 1.2} />
        <path d="M 150 50 L 170 150 L 150 150 Z" fill={gold} opacity={baseOpacity * 0.4} />
        {/* Pulsing center */}
        <circle cx="150" cy="150" r="5" fill={gold} opacity={baseOpacity * 2}>
          <animate attributeName="r" values="4;7;4" dur="3s" repeatCount="indefinite" />
        </circle>
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
    ],

    // Evaluation — Balance / Scales
    1: [
      <svg key="1a" viewBox="0 0 300 300" className="w-full h-full">
        {/* Fulcrum */}
        <polygon points="150,100 165,250 135,250" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        {/* Balance beam */}
        <line x1="40" y1="120" x2="260" y2="100" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.3}>
          <animateTransform attributeName="transform" type="rotate" values="-2 150 110;2 150 110;-2 150 110" dur="4s" repeatCount="indefinite" />
        </line>
        {/* Left pan */}
        <path d="M 40 120 Q 40 145 70 145 L 90 145 Q 120 145 120 120" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity}>
          <animateTransform attributeName="transform" type="rotate" values="-2 150 110;2 150 110;-2 150 110" dur="4s" repeatCount="indefinite" />
        </path>
        {/* Right pan */}
        <path d="M 180 100 Q 180 125 210 125 L 230 125 Q 260 125 260 100" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity}>
          <animateTransform attributeName="transform" type="rotate" values="-2 150 110;2 150 110;-2 150 110" dur="4s" repeatCount="indefinite" />
        </path>
        {/* Data points on pans */}
        {[[65, 130], [95, 128], [210, 112], [240, 108]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill={gold} opacity={baseOpacity * 1.6}>
            <animate attributeName="opacity" values={`${baseOpacity};${baseOpacity * 2.2};${baseOpacity}`} dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {/* Grid lines behind */}
        {[60, 120, 180, 240].map(x => (
          <line key={x} x1={x} y1="50" x2={x} y2="270" stroke={gold} strokeWidth="0.2" opacity={baseOpacity * 0.3} />
        ))}
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 10 270 L 10 290 L 30 290" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 290 L 290 290 L 290 270" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
      // Variant 2 — Grid with weighted indicators
      <svg key="1b" viewBox="0 0 300 300" className="w-full h-full">
        {/* Grid */}
        {Array.from({ length: 7 }).map((_, i) => (
          <React.Fragment key={i}>
            <line x1={30 + i * 40} y1="30" x2={30 + i * 40} y2="270" stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.3} />
            <line x1="30" y1={30 + i * 40} x2="270" y2={30 + i * 40} stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.3} />
          </React.Fragment>
        ))}
        {/* Bars */}
        {[
          [70, 190, 40], [110, 150, 40], [150, 110, 40], [190, 130, 40], [230, 90, 40]
        ].map(([x, y, w], i) => (
          <rect key={i} x={x as number - 15} y={y as number} width="30" height={270 - (y as number)} fill={gold} opacity={baseOpacity * 0.5} rx="2">
            <animate attributeName="opacity" values={`${baseOpacity * 0.3};${baseOpacity * 0.7};${baseOpacity * 0.3}`} dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </rect>
        ))}
        {/* Equilibrium line */}
        <line x1="30" y1="150" x2="270" y2="150" stroke={gold} strokeWidth="0.8" strokeDasharray="4 4" opacity={baseOpacity * 0.8} />
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
    ],

    // Diligence — Magnifying glass with data
    2: [
      <svg key="2a" viewBox="0 0 300 300" className="w-full h-full">
        {/* Dot grid */}
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={50 + c * 30} cy={50 + r * 30} r="1.5" fill={gold} opacity={baseOpacity * 0.4} />
          ))
        )}
        {/* Magnifying glass */}
        <circle cx="160" cy="140" r="65" fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.5} />
        <line x1="206" y1="186" x2="260" y2="240" stroke={gold} strokeWidth="2.5" strokeLinecap="round" opacity={baseOpacity * 1.3} />
        {/* Highlighted nodes inside lens */}
        {[[135, 120], [170, 110], [150, 150], [180, 145], [140, 160]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill={gold} opacity={baseOpacity * 2}>
            <animate attributeName="r" values="3;5.5;3" dur="2s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values={`${baseOpacity * 1.5};${baseOpacity * 3};${baseOpacity * 1.5}`} dur="2s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {/* Connecting lines inside lens */}
        <path d="M 135 120 L 170 110 L 180 145 L 150 150 L 140 160" fill="none" stroke={gold} strokeWidth="0.5" opacity={baseOpacity * 0.8} />
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 10 270 L 10 290 L 30 290" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 290 L 290 290 L 290 270" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
      // Variant 2 — Data checklist
      <svg key="2b" viewBox="0 0 300 300" className="w-full h-full">
        {/* Document outline */}
        <rect x="60" y="30" width="180" height="240" rx="6" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        {/* Check rows */}
        {[70, 110, 150, 190, 230].map((y, i) => (
          <React.Fragment key={i}>
            <rect x="85" y={y} width="12" height="12" rx="2" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity * 1.2} />
            {i < 3 && <path d={`M 88 ${y + 7} L 91 ${y + 10} L 97 ${y + 3}`} fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 2}>
              <animate attributeName="opacity" values={`0;${baseOpacity * 2.5};${baseOpacity * 2.5}`} dur="0.5s" begin={`${i * 0.8 + 0.5}s`} fill="freeze" />
            </path>}
            <line x1="110" y1={y + 6} x2={180 + (i % 2) * 30} y2={y + 6} stroke={gold} strokeWidth="0.5" opacity={baseOpacity * 0.6} />
          </React.Fragment>
        ))}
        {/* Ambient glow */}
        <circle cx="150" cy="150" r="80" fill={gold} opacity={baseOpacity * 0.08}>
          <animate attributeName="r" values="75;85;75" dur="4s" repeatCount="indefinite" />
        </circle>
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
    ],

    // Structuring — Partnership growth graph (adapted from AnimatedAccent)
    3: [
      <svg key="3a" viewBox="0 0 300 300" className="w-full h-full">
        {/* Axes */}
        <line x1="50" y1="250" x2="270" y2="250" stroke={gold} strokeWidth="0.8" opacity={baseOpacity * 1.2} />
        <line x1="50" y1="250" x2="50" y2="40" stroke={gold} strokeWidth="0.8" opacity={baseOpacity * 1.2} />
        {/* Axis labels */}
        <text x="160" y="275" textAnchor="middle" fill={gold} fontSize="8" fontFamily="sans-serif" letterSpacing="0.15em" opacity={baseOpacity * 1.5}>TIME</text>
        <text x="25" y="145" textAnchor="middle" fill={gold} fontSize="8" fontFamily="sans-serif" letterSpacing="0.15em" opacity={baseOpacity * 1.5} transform="rotate(-90 25 145)">VALUE</text>
        {/* Grid */}
        {[100, 150, 200].map(y => (
          <line key={y} x1="50" y1={y} x2="270" y2={y} stroke={gold} strokeWidth="0.2" opacity={baseOpacity * 0.3} />
        ))}
        {/* Growth curve */}
        <path d="M 50 240 Q 100 235 130 210 Q 160 180 190 130 Q 220 80 260 55" fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.8} />
        {/* Area fill */}
        <path d="M 50 240 Q 100 235 130 210 Q 160 180 190 130 Q 220 80 260 55 L 260 250 L 50 250 Z" fill={gold} opacity={baseOpacity * 0.15} />
        {/* Data points with drop lines */}
        {[[90, 232], [130, 210], [170, 165], [210, 105], [250, 60]].map(([cx, cy], i) => (
          <React.Fragment key={i}>
            <line x1={cx} y1={cy as number + 5} x2={cx} y2="250" stroke={gold} strokeWidth="0.4" strokeDasharray="3 3" opacity={baseOpacity * 0.5} />
            <circle cx={cx} cy={cy} r="4" fill={gold} opacity={baseOpacity * 1.8}>
              <animate attributeName="r" values="3;5;3" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          </React.Fragment>
        ))}
        {/* Peak glow */}
        <circle cx="250" cy="60" r="15" fill={gold} opacity={baseOpacity * 0.15}>
          <animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite" />
        </circle>
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 10 270 L 10 290 L 30 290" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 290 L 290 290 L 290 270" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
      // Variant 2 — Handshake / partnership nodes
      <svg key="3b" viewBox="0 0 300 300" className="w-full h-full">
        {/* Network graph */}
        {/* Central node */}
        <circle cx="150" cy="150" r="8" fill={gold} opacity={baseOpacity * 1.5}>
          <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Outer nodes */}
        {[[80, 80], [220, 80], [60, 200], [240, 200], [150, 50], [150, 250]].map(([cx, cy], i) => (
          <React.Fragment key={i}>
            <line x1="150" y1="150" x2={cx} y2={cy} stroke={gold} strokeWidth="0.5" opacity={baseOpacity * 0.6} />
            <circle cx={cx} cy={cy} r="5" fill={gold} opacity={baseOpacity * 1.3}>
              <animate attributeName="opacity" values={`${baseOpacity};${baseOpacity * 2};${baseOpacity}`} dur="2.5s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </React.Fragment>
        ))}
        {/* Cross connections */}
        <line x1="80" y1="80" x2="220" y2="80" stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.4} />
        <line x1="60" y1="200" x2="240" y2="200" stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.4} />
        <line x1="80" y1="80" x2="60" y2="200" stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.4} />
        <line x1="220" y1="80" x2="240" y2="200" stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.4} />
        {/* Ambient glow */}
        <circle cx="150" cy="150" r="90" fill={gold} opacity={baseOpacity * 0.06}>
          <animate attributeName="r" values="85;95;85" dur="4s" repeatCount="indefinite" />
        </circle>
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 10 270 L 10 290 L 30 290" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 290 L 290 290 L 290 270" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
    ],
  };

  const [variantA, variantB] = illustrations[index % 4] || illustrations[0];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute right-0 top-0 h-full w-[45%] flex items-center justify-center">
        <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
          {/* Variant A */}
          <div
            className="absolute inset-0"
            style={{
              opacity: isActive ? (phase === 0 ? 1 : 0) : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          >
            {variantA}
          </div>
          {/* Variant B */}
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

/* ─── Card Surface ─── */
const CardSurface: React.FC<{
  card: StickyCard;
  index: number;
  variant: 'light' | 'dark';
  isActive: boolean;
  cardHeight: number;
  illustrationSet: 'process' | 'criteria';
  labelPrefix: string;
}> = ({ card, index, variant, isActive, cardHeight, illustrationSet, labelPrefix }) => {
  const isDark = variant === 'dark';
  const bg = isDark ? darkBgs[index % darkBgs.length] : lightBgs[index % lightBgs.length];
  const colors = isDark ? darkTextColors : lightTextColors[index % lightTextColors.length];

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl"
      style={{
        backgroundColor: bg,
        height: `${cardHeight}px`,
        boxShadow: `0 -6px 24px -4px rgba(0,0,0,0.2), 0 16px 40px -8px rgba(0,0,0,0.18)`,
      }}
    >
      {illustrationSet === 'criteria'
        ? <CriteriaIllustration index={index} isDark={isDark} isActive={isActive} />
        : <ThematicIllustration index={index} isDark={isDark} isActive={isActive} />
      }

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
            Step {card.num}
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

/* ─── Scroll-Driven Vertical Carousel ─── */
const StickyCardStack: React.FC<StickyCardStackProps> = ({ cards, variant = 'light', illustrationSet = 'process' }) => {
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
    const onScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  useEffect(() => {
    handleScroll();
  }, [cardHeight, handleScroll]);

  const scrollStepPx = (cardHeight + STICKY_TOP) * SCROLL_PER_CARD;
  const outerHeight = cardHeight + Math.max(cards.length - 1, 0) * scrollStepPx;

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
        <div
          className="will-change-transform"
          style={{
            transform: `translateY(-${activeIndex * cardHeight}px)`,
            transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {cards.map((card, i) => (
            <CardSurface
              key={card.num}
              card={card}
              index={i}
              variant={variant}
              isActive={i === activeIndex}
              cardHeight={cardHeight}
              illustrationSet={illustrationSet}
            />
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none sticky ml-auto flex w-10 flex-col items-center gap-2"
        style={{
          top: `${STICKY_TOP + cardHeight / 2 - (cards.length * 14) / 2}px`,
          marginTop: `-${cardHeight}px`,
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
