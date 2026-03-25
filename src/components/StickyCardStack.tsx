import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface StickyCard {
  num: string;
  title: string;
  description: string;
}

interface StickyCardStackProps {
  cards: StickyCard[];
  variant?: 'light' | 'dark';
}

const lightBgs = [
  'radial-gradient(ellipse at 30% 40%, hsl(40 28% 97%), hsl(40 20% 93%) 70%)',
  'radial-gradient(ellipse at 60% 30%, hsl(40 22% 95%), hsl(38 18% 90%) 70%)',
  'radial-gradient(ellipse at 40% 60%, hsl(38 20% 94%), hsl(40 16% 89%) 70%)',
  'radial-gradient(ellipse at 70% 50%, hsl(40 24% 96%), hsl(40 18% 91%) 70%)',
];

const darkBgs = [
  'radial-gradient(ellipse at 30% 40%, hsl(207 55% 15%), hsl(207 65% 10%) 70%)',
  'radial-gradient(ellipse at 60% 30%, hsl(207 45% 18%), hsl(210 55% 9%) 70%)',
  'radial-gradient(ellipse at 40% 60%, hsl(210 50% 13%), hsl(207 60% 8%) 70%)',
  'radial-gradient(ellipse at 70% 50%, hsl(207 48% 16%), hsl(210 58% 10%) 70%)',
];

const CardItem: React.FC<{
  card: StickyCard;
  index: number;
  total: number;
  variant: 'light' | 'dark';
}> = ({ card, index, total, variant }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0.3, 0.9], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.6]);
  const isDark = variant === 'dark';
  const bgs = isDark ? darkBgs : lightBgs;
  const bg = bgs[index % bgs.length];
  const topOffset = 80 + index * 28;

  const borderColor = isDark
    ? `rgba(255,255,255,${0.06 + index * 0.02})`
    : `hsla(38,48%,52%,${0.08 + index * 0.03})`;

  const shadowIntensity = isDark ? 0.4 + index * 0.1 : 0.08 + index * 0.05;
  const shadowSpread = 20 + index * 14;
  const shadowBlur = 4 + index * 8;

  return (
    <div ref={cardRef} className="h-[70vh] md:h-[75vh]" style={{ zIndex: index + 1 }}>
      <motion.div
        style={{
          scale,
          opacity,
          top: `${topOffset}px`,
          background: bg,
          border: `1px solid ${borderColor}`,
          boxShadow: `0 ${shadowBlur}px ${shadowSpread}px -${4 + index * 2}px rgba(0,0,0,${shadowIntensity}), inset 0 1px 0 0 ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)'}`,
        }}
        className="sticky rounded-2xl md:rounded-3xl overflow-hidden will-change-transform"
        initial={false}
      >
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle, ${isDark ? 'hsl(38 45% 55%)' : 'hsl(207 65% 12%)'} 0.5px, transparent 0.5px)`,
            backgroundSize: '24px 24px',
            opacity: isDark ? 0.03 : 0.02,
          }}
        />

        {/* Floating abstract gradient shape */}
        <div
          className="absolute pointer-events-none rounded-full"
          aria-hidden="true"
          style={{
            width: '60%',
            height: '80%',
            right: index % 2 === 0 ? '-10%' : 'auto',
            left: index % 2 !== 0 ? '-10%' : 'auto',
            top: '10%',
            background: isDark
              ? 'radial-gradient(circle, hsl(38 45% 55% / 0.04), transparent 60%)'
              : 'radial-gradient(circle, hsl(207 65% 12% / 0.03), transparent 60%)',
          }}
        />

        {/* Gold shimmer line near top */}
        <div className="absolute top-6 left-6 right-6 h-px pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="w-[200px] h-full shimmer-effect"
            style={{
              background: `linear-gradient(90deg, transparent, ${isDark ? 'hsl(38 45% 55% / 0.12)' : 'hsl(38 48% 52% / 0.1)'}, transparent)`,
            }}
          />
        </div>

        {/* Corner geometric accent — top right */}
        <svg
          className="absolute top-4 right-4 md:top-6 md:right-6 pointer-events-none"
          width="60" height="60" viewBox="0 0 60 60" fill="none"
          aria-hidden="true"
          style={{ opacity: isDark ? 0.06 : 0.08 }}
        >
          <line x1="60" y1="0" x2="60" y2="30" stroke="hsl(38 45% 55%)" strokeWidth="0.5" />
          <line x1="30" y1="0" x2="60" y2="0" stroke="hsl(38 45% 55%)" strokeWidth="0.5" />
          <circle cx="60" cy="0" r="1.5" fill="hsl(38 45% 55%)" />
        </svg>

        {/* Corner geometric accent — bottom left */}
        <svg
          className="absolute bottom-4 left-4 md:bottom-6 md:left-6 pointer-events-none"
          width="60" height="60" viewBox="0 0 60 60" fill="none"
          aria-hidden="true"
          style={{ opacity: isDark ? 0.06 : 0.08 }}
        >
          <line x1="0" y1="30" x2="0" y2="60" stroke="hsl(38 45% 55%)" strokeWidth="0.5" />
          <line x1="0" y1="60" x2="30" y2="60" stroke="hsl(38 45% 55%)" strokeWidth="0.5" />
          <circle cx="0" cy="60" r="1.5" fill="hsl(38 45% 55%)" />
        </svg>

        {/* Card content — Swiss Grid */}
        <div className="relative min-h-[55vh] md:min-h-[60vh] flex items-center px-6 md:px-12 lg:px-16 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 w-full items-center">
            {/* Left: Content */}
            <div className="max-w-[520px]">
              {/* Step label */}
              <div className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] mb-4 ${isDark ? 'text-gold/40' : 'text-gold/50'}`}>
                Step {card.num}
              </div>

              {/* Title */}
              <h3
                className={`font-serif text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.12] tracking-[-0.02em] mb-4 md:mb-5 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}
                style={isDark ? { textShadow: '0 2px 8px rgba(0,0,0,0.3)' } : undefined}
              >
                {card.title}
              </h3>

              {/* Gold rule */}
              <div className="w-10 h-px bg-gold/25 mb-4 md:mb-5" />

              {/* Description */}
              <p className={`font-sans text-[14px] md:text-[16px] leading-[1.8] max-w-[460px] ${isDark ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                {card.description}
              </p>
            </div>

            {/* Right: Oversized number */}
            <div className="hidden md:flex items-center justify-center" aria-hidden="true">
              <span
                className={`font-serif text-[clamp(5rem,12vw,10rem)] leading-none tracking-[-0.04em] select-none ${isDark ? 'text-primary-foreground/[0.06]' : 'text-foreground/[0.06]'}`}
              >
                {card.num}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const StickyCardStack: React.FC<StickyCardStackProps> = ({ cards, variant = 'light' }) => {
  return (
    <div className="relative">
      {cards.map((card, i) => (
        <CardItem
          key={card.num}
          card={card}
          index={i}
          total={cards.length}
          variant={variant}
        />
      ))}
      <div className="h-[20vh]" />
    </div>
  );
};

export default StickyCardStack;
