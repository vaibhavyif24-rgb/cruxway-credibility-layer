import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export interface TeamDeckMember {
  name: string;
  role: string;
  photo?: string;
  summary: string;
  highlights: string[];
  dealLogos?: { src: string; alt: string; scale?: number; extraGap?: number }[];
  linkedIn?: string;
}

interface TeamStickyDeckProps {
  members: TeamDeckMember[];
}

/* ─── Constants ─── */
const STICKY_TOP = 88;
const MIN_CARD_HEIGHT = 420;
const SCROLL_PER_CARD = 0.65;

const getCardHeight = () => {
  if (typeof window === 'undefined') return 620;
  return Math.max(MIN_CARD_HEIGHT, window.innerHeight - STICKY_TOP);
};

/* ─── Backgrounds ─── */
const darkCardBgs = [
  'hsl(220 8% 18%)',
  'hsl(207 55% 14%)',
  'hsl(210 12% 12%)',
];

const lightCardBgs = [
  'hsl(40 30% 96%)',
  'hsl(38 22% 92%)',
  'hsl(40 25% 94%)',
];

const goldFilter = 'brightness(0) invert(67%) sepia(65%) saturate(400%) hue-rotate(358deg) brightness(92%)';

/* ─── Inline Logo Marquee ─── */
const InlineMarquee: React.FC<{ logos: TeamDeckMember['dealLogos']; bgFrom?: string }> = ({ logos, bgFrom = 'hsl(220_8%_18%)' }) => {
  const [hovered, setHovered] = useState(false);
  if (!logos || logos.length === 0) return null;
  const doubled = [...logos, ...logos];

  return (
    <div
      className="relative overflow-hidden py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-[${bgFrom}] to-transparent`} />
      <div className={`absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-[${bgFrom}] to-transparent`} />
      <motion.div
        className="flex items-center gap-6 md:gap-8 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 20, ease: 'linear' } }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex items-center justify-center shrink-0 h-[28px] md:h-[34px]"
            style={{ marginRight: logo.extraGap ? `${logo.extraGap}px` : undefined }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="h-[22px] md:h-[28px] w-auto max-w-[100px] md:max-w-[120px] object-contain transition-all duration-500"
              style={{
                filter: hovered ? 'none' : goldFilter,
                opacity: hovered ? 1 : 0.75,
                transform: logo.scale ? `scale(${logo.scale})` : undefined,
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Team Card Surface ─── */
const TeamCardSurface: React.FC<{
  member: TeamDeckMember;
  index: number;
  totalMembers: number;
  isActive: boolean;
  cardHeight: number;
  isDark: boolean;
}> = ({ member, index, totalMembers, isActive, cardHeight, isDark }) => {
  const bgs = isDark ? darkCardBgs : lightCardBgs;
  const bg = bgs[index % bgs.length];
  // Split highlights into 2 columns for better density
  const midpoint = Math.ceil(member.highlights.length / 2);
  const col1 = member.highlights.slice(0, midpoint);
  const col2 = member.highlights.slice(midpoint);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl"
      style={{
        backgroundColor: bg,
        height: `${cardHeight}px`,
        boxShadow: '0 -6px 24px -4px rgba(0,0,0,0.2), 0 16px 40px -8px rgba(0,0,0,0.18)',
      }}
    >
      {/* Subtle decorative accent */}
      <div
        className="absolute top-0 right-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, hsl(38 48% 52%) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-5 md:px-10 md:py-8 lg:px-14 lg:py-10">
        {/* Counter */}
        <div
          className="mb-2 md:mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.22em] md:text-[11px]"
          style={{
            color: 'hsl(38 48% 52%)',
            opacity: isActive ? 0.5 : 0,
            transform: `translateY(${isActive ? 0 : 12}px)`,
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          {String(index + 1).padStart(2, '0')} / {String(totalMembers).padStart(2, '0')}
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          {/* Profile header row */}
          <div
            className="flex items-center gap-4 md:gap-5 mb-4 md:mb-5"
            style={{
              opacity: isActive ? 1 : 0,
              transform: `translateY(${isActive ? 0 : 12}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              transitionDelay: '0.05s',
            }}
          >
            {member.photo ? (
              <div className="relative w-[56px] h-[56px] md:w-[80px] md:h-[80px] shrink-0">
                <div className={`w-full h-full rounded-full overflow-hidden border ${isDark ? 'border-white/[0.06]' : 'border-foreground/[0.06]'} shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]`}>
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            ) : (
              <div className={`w-[56px] h-[56px] md:w-[80px] md:h-[80px] rounded-full ${isDark ? 'bg-white/[0.04] border-white/[0.08]' : 'bg-foreground/[0.04] border-foreground/[0.08]'} border border-dashed flex items-center justify-center shrink-0`}>
                <span className={`font-serif text-[0.9rem] md:text-[1.1rem] ${isDark ? 'text-white/20' : 'text-foreground/20'}`}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif text-[1.15rem] md:text-[1.5rem] text-white tracking-[-0.02em] leading-[1.15]">
                  {member.name}
                </h3>
                {member.linkedIn && (
                  <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-[hsl(38_48%_52%)] transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </a>
                )}
              </div>
              <p className="font-sans text-[9px] md:text-[10px] font-medium uppercase tracking-[0.22em] text-[hsl(38_48%_52%)] mt-0.5">
                {member.role}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div
            style={{
              opacity: isActive ? 1 : 0,
              transform: `translateY(${isActive ? 0 : 12}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              transitionDelay: '0.1s',
            }}
          >
            <p className="font-sans text-[12px] md:text-[13px] text-white/45 leading-[1.65] mb-3 md:mb-4 max-w-[720px]">
              {member.summary}
            </p>
          </div>

          {/* Highlights in 2-column grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 md:gap-y-2"
            style={{
              opacity: isActive ? 1 : 0,
              transform: `translateY(${isActive ? 0 : 12}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              transitionDelay: '0.15s',
            }}
          >
            <ul className="space-y-1.5 md:space-y-2">
              {col1.map((line, i) => (
                <li
                  key={i}
                  className="font-sans text-[11px] md:text-[12px] text-white/30 leading-[1.55] flex gap-2 items-start"
                >
                  <span className="shrink-0 mt-[6px] w-1.5 h-px bg-[hsl(38_48%_52%)]/30" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            {col2.length > 0 && (
              <ul className="space-y-1.5 md:space-y-2">
                {col2.map((line, i) => (
                  <li
                    key={i}
                    className="font-sans text-[11px] md:text-[12px] text-white/30 leading-[1.55] flex gap-2 items-start"
                  >
                    <span className="shrink-0 mt-[6px] w-1.5 h-px bg-[hsl(38_48%_52%)]/30" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

        {/* Deal logos — floating on deck */}
        {member.dealLogos && member.dealLogos.length > 0 && (
          <div
            className="pt-3 md:pt-3 border-t border-white/[0.04]"
            style={{
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.6s ease-out',
              transitionDelay: '0.25s',
            }}
          >
            <p className="font-sans text-[7px] md:text-[8px] font-medium uppercase tracking-[0.2em] text-[hsl(38_48%_52%)]/50 mb-1">
              Select Investments &amp; Deals
            </p>
            <InlineMarquee logos={member.dealLogos} bgFrom={bg.replace(/\s/g, '_')} />
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Team Sticky Deck ─── */
const TeamStickyDeck: React.FC<TeamStickyDeckProps> = ({ members }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
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
    const intervalCount = Math.max(members.length - 1, 1);
    const idx = members.length === 1
      ? 0
      : Math.min(members.length - 1, Math.round(progress * intervalCount));

    setActiveIndex(idx);
  }, [members.length]);

  useEffect(() => {
    const update = () => setCardHeight(getCardHeight());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const onScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  useEffect(() => { handleScroll(); }, [cardHeight, handleScroll]);

  const scrollStepPx = (cardHeight + STICKY_TOP) * SCROLL_PER_CARD;
  const outerHeight = cardHeight + Math.max(members.length - 1, 0) * scrollStepPx;

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
          {members.map((member, i) => (
            <TeamCardSurface
              key={member.name}
              member={member}
              index={i}
              totalMembers={members.length}
              isActive={i === activeIndex}
              cardHeight={cardHeight}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Dot indicators */}
        <div
          className="pointer-events-none absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2 md:right-5"
        >
          {members.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === activeIndex ? '8px' : '5px',
                height: i === activeIndex ? '8px' : '5px',
                backgroundColor: i === activeIndex
                  ? 'hsl(38 48% 52%)'
                  : 'hsla(40, 30%, 96%, 0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamStickyDeck;