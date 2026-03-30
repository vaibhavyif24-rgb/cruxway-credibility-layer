import React, { useRef, useEffect, useState } from 'react';
import CriteriaIllustration from './CriteriaIllustrations';
import { useIsMobile } from '@/hooks/use-mobile';
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
  mode?: 'sticky' | 'slides';
}

/* ─── Constants ─── */
const MIN_CARD_HEIGHT = 420;

const getCardHeight = () => {
  if (typeof window === 'undefined') return 560;
  return Math.max(MIN_CARD_HEIGHT, Math.min(window.innerHeight * 0.7, 620));
};

/* ─── Background palettes ─── */
const lightBgs = [
  'hsl(40 25% 96%)',
  'hsl(40 30% 96%)',
  'hsl(38 22% 90%)',
  'hsl(38 22% 90%)',
];

const darkBgs = [
  'hsl(228 55% 12%)',
  'hsl(228 45% 16%)',
  'hsl(228 40% 20%)',
  'hsl(228 50% 10%)',
];

const lightTextColors = [
  { title: 'hsl(228 58% 18%)', desc: 'hsl(228 8% 44%)', step: 'hsl(38 48% 52%)' },
  { title: 'hsl(228 58% 18%)', desc: 'hsl(228 8% 44%)', step: 'hsl(38 48% 52%)' },
  { title: 'hsl(228 58% 18%)', desc: 'hsl(228 8% 44%)', step: 'hsl(38 48% 52%)' },
  { title: 'hsl(228 58% 18%)', desc: 'hsl(228 8% 44%)', step: 'hsl(38 48% 52%)' },
];

const darkTextColors = {
  title: 'hsl(40 30% 96%)',
  desc: 'hsl(40 20% 72%)',
  step: 'hsl(38 48% 52%)',
};

/* ─── Thematic Illustrations (AnimatedAccent style) ─── */
const ThematicIllustration = React.forwardRef<HTMLDivElement, { index: number; isDark: boolean; isActive: boolean }>(({ index, isDark, isActive }, _ref) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => setPhase(p => (p === 0 ? 1 : 0)), 2000);
    return () => clearInterval(timer);
  }, [isActive]);

  const gold = 'hsl(38 45% 55%)';
  const goldDim = 'hsl(38 35% 45%)';
  const baseOpacity = isDark ? 0.15 : 0.25;

  const illustrations: Record<number, [React.ReactNode, React.ReactNode]> = {
    0: [
      <svg key="0a" viewBox="0 0 300 300" className="w-full h-full">
        {[50, 90, 130].map(r => (
          <circle key={r} cx="150" cy="150" r={r} fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        ))}
        <line x1="150" y1="20" x2="150" y2="280" stroke={gold} strokeWidth="0.4" opacity={baseOpacity * 0.6} />
        <line x1="20" y1="150" x2="280" y2="150" stroke={gold} strokeWidth="0.4" opacity={baseOpacity * 0.6} />
        <line x1="150" y1="150" x2="250" y2="60" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.5}>
          <animateTransform attributeName="transform" type="rotate" from="0 150 150" to="360 150 150" dur="6s" repeatCount="indefinite" />
        </line>
        {[[200, 80], [100, 220], [230, 200], [80, 90]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill={gold} opacity={baseOpacity * 1.8}>
            <animate attributeName="r" values="3;5;3" dur="2.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values={`${baseOpacity};${baseOpacity * 2.5};${baseOpacity}`} dur="2.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 10 270 L 10 290 L 30 290" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 290 L 290 290 L 290 270" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
      <svg key="0b" viewBox="0 0 300 300" className="w-full h-full">
        <circle cx="150" cy="150" r="120" fill="none" stroke={gold} strokeWidth="0.5" opacity={baseOpacity} />
        <circle cx="150" cy="150" r="80" fill="none" stroke={gold} strokeWidth="0.5" opacity={baseOpacity * 0.7} />
        {[0, 45, 90, 135].map(angle => (
          <line key={angle} x1="150" y1="30" x2="150" y2="270" stroke={gold} strokeWidth={angle % 90 === 0 ? '0.6' : '0.3'} opacity={baseOpacity * 0.5} transform={`rotate(${angle} 150 150)`} />
        ))}
        <path d="M 150 50 L 170 150 L 150 250 L 130 150 Z" fill="none" stroke={gold} strokeWidth="0.8" opacity={baseOpacity * 1.2} />
        <path d="M 150 50 L 170 150 L 150 150 Z" fill={gold} opacity={baseOpacity * 0.4} />
        <circle cx="150" cy="150" r="5" fill={gold} opacity={baseOpacity * 2}>
          <animate attributeName="r" values="4;7;4" dur="3s" repeatCount="indefinite" />
        </circle>
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
    ],
    1: [
      <svg key="1a" viewBox="0 0 300 300" className="w-full h-full">
        <polygon points="150,100 165,250 135,250" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        <line x1="40" y1="120" x2="260" y2="100" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.3}>
          <animateTransform attributeName="transform" type="rotate" values="-2 150 110;2 150 110;-2 150 110" dur="4s" repeatCount="indefinite" />
        </line>
        <path d="M 40 120 Q 40 145 70 145 L 90 145 Q 120 145 120 120" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity}>
          <animateTransform attributeName="transform" type="rotate" values="-2 150 110;2 150 110;-2 150 110" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M 180 100 Q 180 125 210 125 L 230 125 Q 260 125 260 100" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity}>
          <animateTransform attributeName="transform" type="rotate" values="-2 150 110;2 150 110;-2 150 110" dur="4s" repeatCount="indefinite" />
        </path>
        {[[65, 130], [95, 128], [210, 112], [240, 108]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill={gold} opacity={baseOpacity * 1.6}>
            <animate attributeName="opacity" values={`${baseOpacity};${baseOpacity * 2.2};${baseOpacity}`} dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {[60, 120, 180, 240].map(x => (
          <line key={x} x1={x} y1="50" x2={x} y2="270" stroke={gold} strokeWidth="0.2" opacity={baseOpacity * 0.3} />
        ))}
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 10 270 L 10 290 L 30 290" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 290 L 290 290 L 290 270" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
      <svg key="1b" viewBox="0 0 300 300" className="w-full h-full">
        {Array.from({ length: 7 }).map((_, i) => (
          <React.Fragment key={i}>
            <line x1={30 + i * 40} y1="30" x2={30 + i * 40} y2="270" stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.3} />
            <line x1="30" y1={30 + i * 40} x2="270" y2={30 + i * 40} stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.3} />
          </React.Fragment>
        ))}
        {[
          [70, 190, 40], [110, 150, 40], [150, 110, 40], [190, 130, 40], [230, 90, 40]
        ].map(([x, y, w], i) => (
          <rect key={i} x={x as number - 15} y={y as number} width="30" height={270 - (y as number)} fill={gold} opacity={baseOpacity * 0.5} rx="2">
            <animate attributeName="opacity" values={`${baseOpacity * 0.3};${baseOpacity * 0.7};${baseOpacity * 0.3}`} dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </rect>
        ))}
        <line x1="30" y1="150" x2="270" y2="150" stroke={gold} strokeWidth="0.8" strokeDasharray="4 4" opacity={baseOpacity * 0.8} />
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
    ],
    2: [
      <svg key="2a" viewBox="0 0 300 300" className="w-full h-full">
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={50 + c * 30} cy={50 + r * 30} r="1.5" fill={gold} opacity={baseOpacity * 0.4} />
          ))
        )}
        <circle cx="160" cy="140" r="65" fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.5} />
        <line x1="206" y1="186" x2="260" y2="240" stroke={gold} strokeWidth="2.5" strokeLinecap="round" opacity={baseOpacity * 1.3} />
        {[[135, 120], [170, 110], [150, 150], [180, 145], [140, 160]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill={gold} opacity={baseOpacity * 2}>
            <animate attributeName="r" values="3;5.5;3" dur="2s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values={`${baseOpacity * 1.5};${baseOpacity * 3};${baseOpacity * 1.5}`} dur="2s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <path d="M 135 120 L 170 110 L 180 145 L 150 150 L 140 160" fill="none" stroke={gold} strokeWidth="0.5" opacity={baseOpacity * 0.8} />
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 10 270 L 10 290 L 30 290" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 290 L 290 290 L 290 270" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
      <svg key="2b" viewBox="0 0 300 300" className="w-full h-full">
        <rect x="60" y="30" width="180" height="240" rx="6" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        {[70, 110, 150, 190, 230].map((y, i) => (
          <React.Fragment key={i}>
            <rect x="85" y={y} width="12" height="12" rx="2" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity * 1.2} />
            {i < 3 && <path d={`M 88 ${y + 7} L 91 ${y + 10} L 97 ${y + 3}`} fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 2}>
              <animate attributeName="opacity" values={`0;${baseOpacity * 2.5};${baseOpacity * 2.5}`} dur="0.5s" begin={`${i * 0.8 + 0.5}s`} fill="freeze" />
            </path>}
            <line x1="110" y1={y + 6} x2={180 + (i % 2) * 30} y2={y + 6} stroke={gold} strokeWidth="0.5" opacity={baseOpacity * 0.6} />
          </React.Fragment>
        ))}
        <circle cx="150" cy="150" r="80" fill={gold} opacity={baseOpacity * 0.08}>
          <animate attributeName="r" values="75;85;75" dur="4s" repeatCount="indefinite" />
        </circle>
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
    ],
    3: [
      <svg key="3a" viewBox="0 0 300 300" className="w-full h-full">
        <line x1="50" y1="250" x2="270" y2="250" stroke={gold} strokeWidth="0.8" opacity={baseOpacity * 1.2} />
        <line x1="50" y1="250" x2="50" y2="40" stroke={gold} strokeWidth="0.8" opacity={baseOpacity * 1.2} />
        <text x="160" y="275" textAnchor="middle" fill={gold} fontSize="8" fontFamily="sans-serif" letterSpacing="0.15em" opacity={baseOpacity * 1.5}>TIME</text>
        <text x="25" y="145" textAnchor="middle" fill={gold} fontSize="8" fontFamily="sans-serif" letterSpacing="0.15em" opacity={baseOpacity * 1.5} transform="rotate(-90 25 145)">VALUE</text>
        {[100, 150, 200].map(y => (
          <line key={y} x1="50" y1={y} x2="270" y2={y} stroke={gold} strokeWidth="0.2" opacity={baseOpacity * 0.3} />
        ))}
        <path d="M 50 240 Q 100 235 130 210 Q 160 180 190 130 Q 220 80 260 55" fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.8} />
        <path d="M 50 240 Q 100 235 130 210 Q 160 180 190 130 Q 220 80 260 55 L 260 250 L 50 250 Z" fill={gold} opacity={baseOpacity * 0.15} />
        {[[90, 232], [130, 210], [170, 165], [210, 105], [250, 60]].map(([cx, cy], i) => (
          <React.Fragment key={i}>
            <line x1={cx} y1={cy as number + 5} x2={cx} y2="250" stroke={gold} strokeWidth="0.4" strokeDasharray="3 3" opacity={baseOpacity * 0.5} />
            <circle cx={cx} cy={cy} r="4" fill={gold} opacity={baseOpacity * 1.8}>
              <animate attributeName="r" values="3;5;3" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          </React.Fragment>
        ))}
        <circle cx="250" cy="60" r="15" fill={gold} opacity={baseOpacity * 0.15}>
          <animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite" />
        </circle>
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 10 270 L 10 290 L 30 290" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <path d="M 270 290 L 290 290 L 290 270" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      </svg>,
      <svg key="3b" viewBox="0 0 300 300" className="w-full h-full">
        <circle cx="150" cy="150" r="8" fill={gold} opacity={baseOpacity * 1.5}>
          <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite" />
        </circle>
        {[[80, 80], [220, 80], [60, 200], [240, 200], [150, 50], [150, 250]].map(([cx, cy], i) => (
          <React.Fragment key={i}>
            <line x1="150" y1="150" x2={cx} y2={cy} stroke={gold} strokeWidth="0.5" opacity={baseOpacity * 0.6} />
            <circle cx={cx} cy={cy} r="5" fill={gold} opacity={baseOpacity * 1.3}>
              <animate attributeName="opacity" values={`${baseOpacity};${baseOpacity * 2};${baseOpacity}`} dur="2.5s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </React.Fragment>
        ))}
        <line x1="80" y1="80" x2="220" y2="80" stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.4} />
        <line x1="60" y1="200" x2="240" y2="200" stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.4} />
        <line x1="80" y1="80" x2="60" y2="200" stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.4} />
        <line x1="220" y1="80" x2="240" y2="200" stroke={gold} strokeWidth="0.3" opacity={baseOpacity * 0.4} />
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
});
ThematicIllustration.displayName = 'ThematicIllustration';

/* ─── Presentation Slide Card ─── */
const SlideCard: React.FC<{
  card: StickyCard;
  index: number;
  variant: 'light' | 'dark';
  isActive: boolean;
  cardHeight: number;
  illustrationSet: 'process' | 'criteria';
  labelPrefix: string;
  isMobile?: boolean;
}> = ({ card, index, variant, isActive, cardHeight, illustrationSet, labelPrefix, isMobile }) => {
  const isDark = variant === 'dark';
  const bg = isDark ? darkBgs[index % darkBgs.length] : lightBgs[index % lightBgs.length];
  const colors = isDark ? darkTextColors : lightTextColors[index % lightTextColors.length];
  const dur = isMobile ? '0.3s' : '0.5s';

  return (
    <div
      className="absolute inset-0 w-full overflow-hidden rounded-2xl md:rounded-3xl"
      style={{
        backgroundColor: bg,
        opacity: isActive ? 1 : 0,
        transform: `translateY(${isActive ? 0 : 20}px)`,
        transition: `opacity ${dur} ease-out, transform ${dur} ease-out`,
        pointerEvents: isActive ? 'auto' : 'none',
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
              transition: `opacity ${dur} ease-out 0.1s, transform ${dur} ease-out 0.1s`,
            }}
          >
            {labelPrefix} {card.num}
          </div>
          <h3
            className="mb-4 font-serif text-[clamp(1.9rem,4vw,3.3rem)] leading-[1.05] tracking-[-0.02em] md:mb-5"
            style={{
              color: colors.title,
              opacity: isActive ? 1 : 0,
              transform: `translateY(${isActive ? 0 : 12}px)`,
              transition: `opacity ${dur} ease-out 0.15s, transform ${dur} ease-out 0.15s`,
            }}
          >
{card.title}.
          </h3>
          <p
            className="max-w-[560px] font-sans text-[15px] leading-[1.8] md:text-[17px]"
            style={{
              color: colors.desc,
              opacity: isActive ? 1 : 0,
              transform: `translateY(${isActive ? 0 : 12}px)`,
              transition: `opacity ${dur} ease-out 0.2s, transform ${dur} ease-out 0.2s`,
            }}
          >
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─── Sticky Card (for sticky stacking mode) ─── */
const STICKY_BASE = 80;
const STICKY_STEP = 20;

const StickyCardSurface: React.FC<{
  card: StickyCard;
  index: number;
  variant: 'light' | 'dark';
  cardHeight: number;
  illustrationSet: 'process' | 'criteria';
  labelPrefix: string;
}> = ({ card, index, variant, cardHeight, illustrationSet, labelPrefix }) => {
  const isDark = variant === 'dark';
  const bg = isDark ? darkBgs[index % darkBgs.length] : lightBgs[index % lightBgs.length];
  const colors = isDark ? darkTextColors : lightTextColors[index % lightTextColors.length];

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl"
      style={{
        backgroundColor: bg,
        height: `${cardHeight}px`,
        boxShadow: '0 -6px 24px -4px rgba(0,0,0,0.2), 0 16px 40px -8px rgba(0,0,0,0.18)',
      }}
    >
      {illustrationSet === 'criteria'
        ? <CriteriaIllustration index={index} isDark={isDark} isActive={true} />
        : <ThematicIllustration index={index} isDark={isDark} isActive={true} />
      }
      <div className="relative z-10 flex h-full items-center">
        <div className="flex-1 px-8 py-10 md:px-14 md:py-14 lg:px-20 lg:py-16">
          <div
            className="mb-5 font-sans text-[10px] font-medium uppercase tracking-[0.22em] md:text-[11px]"
            style={{ color: colors.step, opacity: 0.6 }}
          >
            {labelPrefix} {card.num}
          </div>
          <h3
            className="mb-4 font-serif text-[clamp(1.9rem,4vw,3.3rem)] leading-[1.05] tracking-[-0.02em] md:mb-5"
            style={{ color: colors.title }}
          >
            {card.title}.
          </h3>
          <p
            className="max-w-[560px] font-sans text-[15px] leading-[1.8] md:text-[17px]"
            style={{ color: colors.desc }}
          >
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const StickyCardItem: React.FC<{
  card: StickyCard;
  index: number;
  variant: 'light' | 'dark';
  cardHeight: number;
  illustrationSet: 'process' | 'criteria';
  labelPrefix: string;
  stickyTop: number;
}> = ({ card, index, variant, cardHeight, illustrationSet, labelPrefix, stickyTop }) => {
  return (
    <div
      className="mb-4"
      style={{ position: 'sticky', top: `${stickyTop}px`, zIndex: index + 1 }}
    >
      <StickyCardSurface
        card={card} index={index} variant={variant}
        cardHeight={cardHeight} illustrationSet={illustrationSet} labelPrefix={labelPrefix}
      />
    </div>
  );
};

/* ─── Main Component ─── */
const StickyCardStack: React.FC<StickyCardStackProps> = ({ cards, variant = 'light', illustrationSet = 'process', labelPrefix = 'Step', mode = 'slides' }) => {
  const isMobile = useIsMobile();
  const [cardHeight, setCardHeight] = useState(getCardHeight);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMeasurements = () => setCardHeight(getCardHeight());
    updateMeasurements();
    window.addEventListener('resize', updateMeasurements);
    return () => window.removeEventListener('resize', updateMeasurements);
  }, []);

  /* ─── Window-level scroll listener for slides mode ─── */
  useEffect(() => {
    if (mode !== 'slides') return;
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const updateActiveCard = () => {
      const rect = sectionEl.getBoundingClientRect();
      const scrollableRange = sectionEl.offsetHeight - window.innerHeight;
      if (scrollableRange <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollableRange, 0), 1);
      const newIndex = Math.min(Math.round(progress * (cards.length - 1)), cards.length - 1);
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', updateActiveCard, { passive: true });
    window.addEventListener('resize', updateActiveCard, { passive: true });
    updateActiveCard();

    return () => {
      window.removeEventListener('scroll', updateActiveCard);
      window.removeEventListener('resize', updateActiveCard);
    };
  }, [cards.length, mode]);

  const isDark = variant === 'dark';

  /* ─── Sticky stacking mode ─── */
  if (mode === 'sticky') {
    return (
      <div className="relative px-5 md:px-10 lg:px-16">
        <div className="max-w-[1080px] mx-auto">
          {cards.map((card, i) => (
            <StickyCardItem
              key={card.num} card={card} index={i} variant={variant}
              cardHeight={cardHeight} illustrationSet={illustrationSet}
              labelPrefix={labelPrefix} stickyTop={STICKY_BASE + i * STICKY_STEP}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ─── Slides mode (default) ─── */
  /* Tall outer wrapper gives the page enough scroll range for all cards.
     The sticky inner div stays in view while scroll progress drives activeIndex. */
  const sectionHeight = cardHeight * cards.length;

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${sectionHeight}px` }}
    >
      <div
        className="sticky top-0 px-5 md:px-10 lg:px-16 py-6 md:py-8"
        style={{ height: '100vh' }}
      >
        <div className="max-w-[1080px] mx-auto h-full flex items-center">
          <div
            className="relative rounded-2xl md:rounded-3xl overflow-hidden w-full"
            style={{
              height: `${cardHeight}px`,
              boxShadow: '0 -6px 24px -4px rgba(0,0,0,0.2), 0 16px 40px -8px rgba(0,0,0,0.18)',
            }}
          >
            {cards.map((card, i) => (
              <SlideCard
                key={card.num} card={card} index={i} variant={variant}
                isActive={i === activeIndex} cardHeight={cardHeight}
                illustrationSet={illustrationSet} labelPrefix={labelPrefix}
                isMobile={isMobile}
              />
            ))}
            <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2.5">
              {cards.map((_, i) => (
                <button
                  key={i} onClick={() => setActiveIndex(i)}
                  className="group relative w-3 h-3 flex items-center justify-center"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIndex ? 8 : 5,
                      height: i === activeIndex ? 8 : 5,
                      backgroundColor: i === activeIndex ? 'hsl(38 48% 52%)' : isDark ? 'hsl(0 0% 100% / 0.15)' : 'hsl(0 0% 100% / 0.25)',
                      boxShadow: i === activeIndex ? '0 0 8px hsl(38 48% 52% / 0.4)' : 'none',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCardStack;
