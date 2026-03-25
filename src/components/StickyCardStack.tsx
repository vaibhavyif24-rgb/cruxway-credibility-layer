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
  'hsl(40 25% 96%)',
  'hsl(40 20% 93%)',
  'hsl(38 18% 90%)',
  'hsl(40 22% 94%)',
];

const darkBgs = [
  'hsl(207 65% 12%)',
  'hsl(207 50% 18%)',
  'hsl(210 55% 10%)',
  'hsl(207 45% 15%)',
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

  const scale = useTransform(scrollYProgress, [0.3, 0.85], [1, 0.96]);
  const isDark = variant === 'dark';
  const bgs = isDark ? darkBgs : lightBgs;
  const bg = bgs[index % bgs.length];
  const topOffset = 80 + index * 24;

  return (
    <div ref={cardRef} className="h-[70vh] md:h-[75vh]" style={{ zIndex: index + 1 }}>
      <motion.div
        style={{
          scale,
          top: `${topOffset}px`,
          backgroundColor: bg,
        }}
        className="sticky rounded-2xl md:rounded-3xl overflow-hidden will-change-transform"
        initial={false}
      >
        {/* Shadow overlay that deepens with stacking */}
        <div
          className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none"
          style={{
            boxShadow: `0 ${4 + index * 6}px ${20 + index * 12}px -${4 + index * 2}px rgba(0,0,0,${isDark ? 0.4 + index * 0.08 : 0.08 + index * 0.04})`,
          }}
        />

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
              <h3 className={`font-serif text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.12] tracking-[-0.02em] mb-4 md:mb-5 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
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
                className={`font-serif text-[clamp(4rem,10vw,8rem)] leading-none tracking-[-0.04em] select-none ${isDark ? 'text-primary-foreground/[0.04]' : 'text-foreground/[0.04]'}`}
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
      {/* Extra space so last card has room to breathe */}
      <div className="h-[20vh]" />
    </div>
  );
};

export default StickyCardStack;
