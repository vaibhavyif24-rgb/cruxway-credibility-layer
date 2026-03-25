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
const CARD_MIN_H = 340;          // px – the visible card surface
const PEEK = 180;                // px – scroll distance between each card reveal
const LAST_CARD_RUNWAY = 120;    // px – extra space so last card stays pinned

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

/* ─── Card Surface ─── */
const CardSurface: React.FC<{
  card: StickyCard;
  index: number;
  variant: 'light' | 'dark';
}> = ({ card, index, variant }) => {
  const isDark = variant === 'dark';
  const bg = isDark ? darkBgs[index % darkBgs.length] : lightBgs[index % lightBgs.length];
  const colors = isDark ? darkTextColors : lightTextColors[index % lightTextColors.length];

  const shadowBlur = 16 + index * 10;
  const shadowAlpha = 0.15 + index * 0.06;

  return (
    <div
      className="rounded-2xl md:rounded-3xl overflow-hidden relative"
      style={{
        backgroundColor: bg,
        minHeight: `${CARD_MIN_H}px`,
        boxShadow: `0 -4px ${shadowBlur}px -4px rgba(0,0,0,${shadowAlpha}), 0 ${shadowBlur}px ${shadowBlur * 2}px -${6 + index * 2}px rgba(0,0,0,${shadowAlpha})`,
      }}
    >
      <CardDecoration index={index} isDark={isDark} />

      <div className="relative z-10 flex items-center" style={{ minHeight: `${CARD_MIN_H}px` }}>
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

/* ─── Stack Container ───
 *
 * Mechanical approach: ONE parent container, all cards are sticky children.
 * Each card uses negative margin-bottom so it only occupies PEEK px in the
 * document flow. As the user scrolls, the next card (higher z-index) slides
 * up and pins at the same top, physically covering the previous card.
 *
 * Container height = (cards.length - 1) * PEEK + CARD_MIN_H + LAST_CARD_RUNWAY
 * This ensures the last card stays pinned long enough before the section ends.
 */
const StickyCardStack: React.FC<StickyCardStackProps> = ({ cards, variant = 'light' }) => {
  const containerHeight = (cards.length - 1) * PEEK + CARD_MIN_H + LAST_CARD_RUNWAY;

  return (
    <div
      className="relative"
      style={{ minHeight: `${containerHeight}px` }}
    >
      {cards.map((card, i) => (
        <div
          key={card.num}
          className="sticky"
          style={{
            top: `${STICKY_TOP}px`,
            zIndex: (i + 1) * 10,
            // Each card except the last uses negative margin to only consume PEEK px in flow
            marginBottom: i < cards.length - 1 ? `${-(CARD_MIN_H - PEEK)}px` : undefined,
          }}
        >
          <CardSurface
            card={card}
            index={i}
            variant={variant}
          />
        </div>
      ))}
    </div>
  );
};

export default StickyCardStack;
