import React, { useRef, useState, useEffect, useCallback } from 'react';
import { GoldRule } from '@/components/ui/Section';
import CelestialIllustration from '@/components/CelestialIllustrations';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

interface Principle {
  t: string;
  d: string;
}

interface PrinciplesDeckProps {
  principles: Principle[];
  isDark?: boolean;
}

/* ─── Constants ─── */
const STICKY_TOP = 88;
const SCROLL_PER_CARD = 0.8;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const MemoizedCelestial = React.memo(CelestialIllustration);

const getCardHeight = () => Math.min(window.innerHeight * 0.65, 480);

/* ─── Alternating palettes ─── */
const darkBgEven = 'linear-gradient(135deg, hsl(220, 40%, 8%) 0%, hsl(225, 45%, 5%) 50%, hsl(215, 35%, 10%) 100%)';
const darkBgOdd = 'linear-gradient(135deg, hsl(225, 35%, 11%) 0%, hsl(220, 40%, 7%) 50%, hsl(228, 38%, 12%) 100%)';
const lightBgEven = 'linear-gradient(135deg, hsl(40, 25%, 96%) 0%, hsl(38, 20%, 93%) 50%, hsl(40, 22%, 91%) 100%)';
const lightBgOdd = 'linear-gradient(135deg, hsl(38, 18%, 91%) 0%, hsl(36, 22%, 88%) 50%, hsl(40, 20%, 86%) 100%)';

const getCardBg = (isDark: boolean, index: number) => {
  const isEven = index % 2 === 0;
  return isDark ? (isEven ? darkBgEven : darkBgOdd) : (isEven ? lightBgEven : lightBgOdd);
};

const darkVignette = 'radial-gradient(ellipse at center, transparent 20%, hsl(220, 40%, 5%) 85%)';
const lightVignetteEven = 'radial-gradient(ellipse at center, transparent 25%, hsl(40, 25%, 96%) 88%)';
const lightVignetteOdd = 'radial-gradient(ellipse at center, transparent 25%, hsl(38, 18%, 91%) 88%)';

const getVignette = (isDark: boolean, index: number) => {
  if (isDark) return darkVignette;
  return index % 2 === 0 ? lightVignetteEven : lightVignetteOdd;
};

/* ─── Single Card ─── */
interface DeckCardProps {
  principle: Principle;
  index: number;
  total: number;
  isDark: boolean;
  isActive: boolean;
  stagger: number; // 0 or 0.08
  cardHeight: number;
  isMobile: boolean;
}

const DeckCard: React.FC<DeckCardProps> = ({
  principle, index, total, isDark, isActive, stagger, cardHeight, isMobile,
}) => {
  const fxOpacity = isDark ? 1 : 0.55;
  const titleColor = isDark ? '#F8F6F2' : 'hsl(207, 65%, 12%)';
  const descColor = isDark ? 'rgba(248,246,242,0.7)' : 'hsl(210, 8%, 38%)';
  const indexColor = isDark ? 'hsl(38, 45%, 55%, 0.5)' : 'hsl(38, 48%, 42%, 0.6)';
  const borderColor = isDark ? 'hsl(38, 45%, 55%, 0.06)' : 'hsl(38, 30%, 60%, 0.12)';

  const shadowActive = isDark
    ? '0 -6px 30px -4px rgba(0,0,0,0.25), 0 20px 50px -10px rgba(0,0,0,0.22)'
    : '0 -4px 20px -4px rgba(0,0,0,0.08), 0 12px 36px -8px rgba(0,0,0,0.1)';

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{
        height: isMobile ? 'auto' : `${cardHeight}px`,
        minHeight: isMobile ? '50vh' : undefined,
        background: getCardBg(isDark, index),
        boxShadow: isActive ? shadowActive : 'none',
        border: `1px solid ${borderColor}`,
        opacity: isActive ? 1 : 0,
        transform: `translateY(${isActive ? 0 : 8}px)`,
        transition: `opacity 0.55s ${EASE} ${stagger}s, transform 0.55s ${EASE} ${stagger}s, box-shadow 0.5s ease`,
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[140%] h-[140%] top-1/2 left-1/2"
          style={{
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(ellipse at center, hsl(38, 45%, 55%, ${0.08 * fxOpacity}) 0%, transparent 60%)`,
            animation: 'celestial-rotate 20s linear infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 40% 45%, hsl(207, 50%, 30%, ${0.15 * fxOpacity}) 0%, transparent 50%), radial-gradient(circle at 65% 60%, hsl(38, 48%, 52%, ${0.1 * fxOpacity}) 0%, transparent 45%)`,
            animation: 'nebula-pulse 6s ease-in-out infinite',
          }}
        />
        {[
          { top: '20%', left: '15%', delay: '0s', size: 3 },
          { top: '70%', left: '80%', delay: '4s', size: 2 },
          { top: '45%', left: '90%', delay: '8s', size: 2.5 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full float-orb-slow"
            style={{
              top: p.top, left: p.left,
              width: p.size, height: p.size,
              background: 'hsl(38, 45%, 55%)',
              animationDelay: p.delay,
              opacity: 0.5 * fxOpacity,
            }}
          />
        ))}
        <div
          className="absolute top-1/2 left-0 w-full h-px shimmer-effect"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(38, 45%, 55%, ${0.15 * fxOpacity}), transparent)`,
            animationDuration: '6s',
          }}
        />
      </div>

      {/* Celestial illustration */}
      <div
        className="absolute inset-0 w-full h-full z-[1]"
        style={{ opacity: isDark ? 1 : 0.35 }}
      >
        <MemoizedCelestial index={index} />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-[2]" style={{ background: getVignette(isDark, index) }} />

      {/* Active gold glow */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none rounded-xl transition-opacity duration-700"
        style={{
          opacity: isActive ? 1 : 0,
          boxShadow: isDark
            ? 'inset 0 0 60px -20px hsl(38, 45%, 55%, 0.06)'
            : 'inset 0 0 40px -15px hsl(38, 45%, 55%, 0.04)',
        }}
      />

      {/* Content — with float animation */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-5 py-8">
        <motion.div
          className="flex flex-col items-center max-w-[440px]"
          animate={isActive ? { y: [0, -4, 0] } : { y: 0 }}
          transition={isActive ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
        >
          <span
            className="font-serif text-[12px] md:text-[14px] tracking-[0.18em]"
            style={{ color: indexColor }}
          >
            {String(index + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(total).padStart(2, '0')}
          </span>

          <h3
            className="font-serif text-[clamp(1.6rem,4vw,2.8rem)] leading-[1.05] tracking-[-0.025em] mt-3"
            style={{
              color: titleColor,
              textShadow: isDark ? '0 2px 30px rgba(0,0,0,0.7)' : 'none',
            }}
          >
            {principle.t}
          </h3>

          <div className="my-3 flex justify-center">
            <GoldRule />
          </div>

          <p
            className="font-sans text-[13px] md:text-[15px] leading-[1.85] tracking-[0.01em]"
            style={{
              color: descColor,
              textShadow: isDark ? '0 2px 20px rgba(0,0,0,0.6)' : 'none',
            }}
          >
            {principle.d}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

/* ─── PrinciplesDeck ─── */
const PrinciplesDeck: React.FC<PrinciplesDeckProps> = ({ principles, isDark = true }) => {
  const total = principles.length;
  const isMobile = useIsMobile();
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState(getCardHeight);

  // Group into pairs
  const pairs: Principle[][] = [];
  for (let i = 0; i < principles.length; i += 2) {
    pairs.push(principles.slice(i, i + 2));
  }

  const handleScroll = useCallback(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const rect = outer.getBoundingClientRect();
    const outerHeight = outer.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrolled = -(rect.top - STICKY_TOP);
    const scrollableRange = Math.max(1, outerHeight - viewportHeight + STICKY_TOP);
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
    const intervalCount = Math.max(pairs.length - 1, 1);
    const idx = Math.min(pairs.length - 1, Math.round(progress * intervalCount));
    setActiveIndex(idx);
  }, [pairs.length]);

  useEffect(() => {
    const update = () => setCardHeight(getCardHeight());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
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

  useEffect(() => { handleScroll(); }, [cardHeight, handleScroll]);

  const scrollStepPx = (cardHeight + STICKY_TOP) * SCROLL_PER_CARD;
  const outerHeight = cardHeight + Math.max(pairs.length - 1, 0) * scrollStepPx;

  // Mobile: card height for each card in the pair
  const mobileCardH = Math.min(window.innerHeight * 0.42, 360);
  const mobileStickyH = mobileCardH * 2 + 16; // 2 cards + gap
  const mobileOuterH = mobileStickyH + Math.max(pairs.length - 1, 0) * (mobileStickyH * SCROLL_PER_CARD);

  return (
    <div
      ref={outerRef}
      className="relative px-5 md:px-10 lg:px-16 pt-4 md:pt-6"
      style={{ height: isMobile ? `${mobileOuterH}px` : `${outerHeight}px` }}
    >
      <div
        className="sticky max-w-[1080px] mx-auto"
        style={{
          top: `${STICKY_TOP}px`,
          height: isMobile ? `${mobileStickyH}px` : `${cardHeight}px`,
        }}
      >
        {/* Pairs as stacked layers */}
        {pairs.map((pair, pairIdx) => {
          const isActive = pairIdx === activeIndex;
          const globalOffset = pairIdx * 2; // base index for this pair

          return (
            <div
              key={pairIdx}
              className="absolute inset-0"
              style={{
                pointerEvents: isActive ? 'auto' : 'none',
                zIndex: isActive ? 10 : 1,
              }}
            >
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-3'} h-full`}>
                {pair.map((principle, cardIdx) => (
                  <DeckCard
                    key={globalOffset + cardIdx}
                    principle={principle}
                    index={globalOffset + cardIdx}
                    total={total}
                    isDark={isDark}
                    isActive={isActive}
                    stagger={cardIdx * 0.08}
                    cardHeight={isMobile ? mobileCardH : cardHeight}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Dot indicators */}
        <div className="pointer-events-none absolute right-2 md:right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2">
          {pairs.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === activeIndex ? '8px' : '5px',
                height: i === activeIndex ? '8px' : '5px',
                backgroundColor: i === activeIndex
                  ? 'hsl(38, 48%, 52%)'
                  : isDark
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

export default PrinciplesDeck;
