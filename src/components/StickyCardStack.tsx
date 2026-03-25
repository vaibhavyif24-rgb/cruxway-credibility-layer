import React, { useRef, useEffect, useState } from 'react';

import art01 from '@/assets/sticky-card-art-01.png';
import art02 from '@/assets/sticky-card-art-02.png';
import art03 from '@/assets/sticky-card-art-03.png';
import art04 from '@/assets/sticky-card-art-04.png';

const artImages = [art01, art02, art03, art04];

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
  'hsl(220 8% 20%)',      // dark charcoal  (like infrastructure card)
  'hsl(40 30% 96%)',      // warm cream      (like talent card)
  'hsl(38 22% 88%)',      // warm beige      (like demand card)
  'hsl(207 55% 14%)',     // prussian blue   (contrast closer)
];

const darkBgs = [
  'hsl(207 60% 10%)',
  'hsl(210 50% 14%)',
  'hsl(207 45% 18%)',
  'hsl(210 55% 8%)',
];

/* ─── Text color per bg (light variant) ─── */
const lightTextColors = [
  { title: 'hsl(40 30% 96%)', desc: 'hsl(40 20% 80%)', step: 'hsl(38 48% 52%)' },   // light on dark
  { title: 'hsl(207 65% 12%)', desc: 'hsl(210 8% 46%)', step: 'hsl(38 48% 52%)' },   // dark on cream
  { title: 'hsl(207 65% 12%)', desc: 'hsl(210 8% 46%)', step: 'hsl(38 48% 52%)' },   // dark on beige
  { title: 'hsl(40 30% 96%)', desc: 'hsl(40 20% 80%)', step: 'hsl(38 48% 52%)' },   // light on prussian
];

const CardItem: React.FC<{
  card: StickyCard;
  index: number;
  total: number;
  variant: 'light' | 'dark';
}> = ({ card, index, total, variant }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  /* IntersectionObserver for entrance animation */
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isDark = variant === 'dark';
  const bg = isDark ? darkBgs[index % darkBgs.length] : lightBgs[index % lightBgs.length];
  const topOffset = 60 + index * 32;
  const artSrc = artImages[index % artImages.length];

  /* Text colors */
  const colors = isDark
    ? { title: 'hsl(40 30% 96%)', desc: 'hsl(40 20% 75%)', step: 'hsl(38 48% 52%)' }
    : lightTextColors[index % lightTextColors.length];

  /* Progressive shadow for stacking depth */
  const shadowAlpha = 0.15 + index * 0.1;
  const shadowBlur = 12 + index * 16;

  return (
    <div
      ref={cardRef}
      className="relative"
      style={{
        height: index < total - 1 ? '100vh' : 'auto',
        zIndex: index + 1,
      }}
    >
      <div
        className="sticky rounded-2xl md:rounded-3xl overflow-hidden will-change-transform"
        style={{
          top: `${topOffset}px`,
          backgroundColor: bg,
          boxShadow: `0 ${shadowBlur}px ${shadowBlur * 2}px -${6 + index * 3}px rgba(0,0,0,${shadowAlpha})`,
          /* Entrance animation via class toggle */
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
          transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Card content — two-column layout like Boundless reference */}
        <div className="relative min-h-[50vh] md:min-h-[60vh] flex items-center">
          {/* Left: Text content */}
          <div className="relative z-10 flex-1 px-8 md:px-14 lg:px-20 py-12 md:py-16">
            {/* Step label */}
            <div
              className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] mb-6"
              style={{ color: colors.step, opacity: 0.7 }}
            >
              Step {card.num}
            </div>

            {/* Title — large serif like reference */}
            <h3
              className="font-serif text-[clamp(1.8rem,4vw,3rem)] leading-[1.08] tracking-[-0.02em] mb-5 md:mb-6"
              style={{ color: colors.title }}
            >
              {card.title.toLowerCase()}.
            </h3>

            {/* Description */}
            <p
              className="font-sans text-[15px] md:text-[17px] leading-[1.7] max-w-[480px]"
              style={{ color: colors.desc }}
            >
              {card.description}
            </p>
          </div>

          {/* Right: Decorative abstract art */}
          <div className="hidden md:flex items-center justify-center w-[40%] lg:w-[45%] pr-8 lg:pr-12" aria-hidden="true">
            <img
              src={artSrc}
              alt=""
              loading="lazy"
              width={800}
              height={800}
              className="w-full max-w-[360px] h-auto object-contain opacity-60"
              style={{
                filter: isDark ? 'brightness(0.7) saturate(0.8)' : 'none',
                mixBlendMode: isDark ? 'lighten' : 'multiply',
              }}
            />
          </div>
        </div>
      </div>
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
      {/* Bottom spacer so last card can be scrolled past */}
      <div className="h-[10vh]" />
    </div>
  );
};

export default StickyCardStack;
