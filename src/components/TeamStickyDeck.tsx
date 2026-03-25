import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

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
const SCROLL_RUNWAY = 600; // px of scroll per card transition

/* ─── Backgrounds ─── */
const darkCardBgs = [
  'hsl(220 8% 15%)',
  'hsl(207 45% 13%)',
  'hsl(215 12% 11%)',
];

const lightCardBgs = [
  'hsl(40 30% 96%)',
  'hsl(38 22% 93%)',
  'hsl(42 28% 95%)',
];

const goldFilter = 'brightness(0) invert(67%) sepia(65%) saturate(400%) hue-rotate(358deg) brightness(92%)';

/* ─── Inline Logo Marquee ─── */
const InlineMarquee: React.FC<{ logos: TeamDeckMember['dealLogos']; isDark: boolean }> = ({ logos, isDark }) => {
  const [hovered, setHovered] = React.useState(false);
  if (!logos || logos.length === 0) return null;
  const doubled = [...logos, ...logos];

  return (
    <div
      className="relative overflow-hidden py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none ${isDark ? 'team-marquee-fade-left-dark' : 'team-marquee-fade-left-light'}`} />
      <div className={`absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none ${isDark ? 'team-marquee-fade-right-dark' : 'team-marquee-fade-right-light'}`} />
      <motion.div
        className="flex items-center gap-7 md:gap-9 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 22, ease: 'linear' } }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo!.alt}-${i}`}
            className="flex items-center justify-center shrink-0 h-[28px] md:h-[36px]"
            style={{ marginRight: logo!.extraGap ? `${logo!.extraGap}px` : undefined }}
          >
            <img
              src={logo!.src}
              alt={logo!.alt}
              loading="lazy"
              className="h-[24px] md:h-[30px] w-auto max-w-[110px] md:max-w-[130px] object-contain transition-all duration-500"
              style={{
                filter: hovered ? 'none' : goldFilter,
                opacity: hovered ? 1 : 0.7,
                transform: logo!.scale ? `scale(${logo!.scale})` : undefined,
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Single Stacking Card ─── */
const StackingCard: React.FC<{
  member: TeamDeckMember;
  index: number;
  totalMembers: number;
  isDark: boolean;
  isMobile: boolean;
}> = ({ member, index, totalMembers, isDark, isMobile }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const bgs = isDark ? darkCardBgs : lightCardBgs;
  const bg = bgs[index % bgs.length];

  // Track this card's scroll progress within its wrapper
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  // As the NEXT card covers this one, scale down and dim
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.25]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.6, 1], [16, 16, 24]);

  const midpoint = Math.ceil(member.highlights.length / 2);
  const col1 = member.highlights.slice(0, midpoint);
  const col2 = member.highlights.slice(midpoint);

  // Progressive shadow for depth
  const shadowDepth = 8 + index * 6;

  return (
    <div
      ref={cardRef}
      style={{
        height: `${SCROLL_RUNWAY}px`,
      }}
    >
      <div
        className="sticky"
        style={{
          top: `${STICKY_TOP}px`,
          zIndex: index + 1,
          height: `calc(100vh - ${STICKY_TOP}px)`,
        }}
      >
        <motion.div
          className="relative w-full h-full overflow-hidden"
          style={{
            backgroundColor: bg,
            scale,
            opacity,
            borderRadius,
            boxShadow: `0 -4px ${shadowDepth}px -4px rgba(0,0,0,0.15), 0 ${shadowDepth}px ${shadowDepth * 2}px -${shadowDepth}px rgba(0,0,0,0.2)`,
            transformOrigin: 'top center',
          }}
        >
          {/* Subtle decorative radial accent */}
          <div
            className="absolute top-0 right-0 w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full opacity-[0.035] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, hsl(38 48% 52%) 0%, transparent 70%)',
              transform: 'translate(25%, -25%)',
            }}
          />

          {/* Card content */}
          <div className="relative z-10 flex h-full flex-col justify-between px-6 py-5 md:px-10 md:py-8 lg:px-14 lg:py-10 max-w-[1080px] mx-auto">
            {/* Counter */}
            <motion.div
              className="mb-3 md:mb-4 font-sans text-[10px] font-medium uppercase tracking-[0.25em] md:text-[11px]"
              style={{ color: 'hsl(38 48% 52%)', opacity: 0.45 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.45, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {String(index + 1).padStart(2, '0')} / {String(totalMembers).padStart(2, '0')}
            </motion.div>

            {/* Main content */}
            <div className="flex-1 flex flex-col justify-center min-h-0">
              {/* Profile header */}
              <motion.div
                className="flex items-center gap-5 md:gap-6 mb-5 md:mb-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {member.photo ? (
                  <div className="relative w-[72px] h-[72px] md:w-[120px] md:h-[120px] shrink-0 group">
                    <div className={`w-full h-full rounded-full overflow-hidden border-2 ${isDark ? 'border-white/[0.06]' : 'border-foreground/[0.06]'} shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:scale-[1.03]`}>
                      <img
                        src={member.photo}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    {/* Gold ring on hover */}
                    <div className="absolute inset-[-3px] rounded-full border border-transparent group-hover:border-[hsl(38_48%_52%)]/25 transition-colors duration-700" />
                  </div>
                ) : (
                  <div className={`w-[72px] h-[72px] md:w-[120px] md:h-[120px] rounded-full ${isDark ? 'bg-white/[0.04] border-white/[0.08]' : 'bg-foreground/[0.04] border-foreground/[0.08]'} border border-dashed flex items-center justify-center shrink-0`}>
                    <span className={`font-serif text-[1.1rem] md:text-[1.5rem] ${isDark ? 'text-white/20' : 'text-foreground/20'}`}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-serif text-[1.6rem] md:text-[2.2rem] lg:text-[2.4rem] ${isDark ? 'text-white' : 'text-foreground'} tracking-[-0.03em] leading-[1.1]`}>
                      {member.name}
                    </h3>
                    {member.linkedIn && (
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${isDark ? 'text-white/15 hover:text-[hsl(38_48%_52%)]' : 'text-foreground/15 hover:text-[hsl(38_48%_52%)]'} transition-colors duration-300`}
                      >
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                  </div>
                  <p className="font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-[hsl(38_48%_52%)] mt-1.5 md:mt-2">
                    {member.role}
                  </p>
                </div>
              </motion.div>

              {/* Summary */}
              <motion.p
                className={`font-sans text-[13px] md:text-[14px] ${isDark ? 'text-white/40' : 'text-foreground/50'} leading-[1.75] mb-4 md:mb-6 max-w-[780px]`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                {member.summary}
              </motion.p>

              {/* Highlights — 2-column grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 md:gap-y-2.5"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <ul className="space-y-2 md:space-y-2.5">
                  {col1.map((line, i) => (
                    <li
                      key={i}
                      className={`font-sans text-[12px] md:text-[13px] ${isDark ? 'text-white/28' : 'text-foreground/38'} leading-[1.6] flex gap-2.5 items-start`}
                    >
                      <span className="shrink-0 mt-[7px] w-2 h-px bg-[hsl(38_48%_52%)]/30" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                {col2.length > 0 && (
                  <ul className="space-y-2 md:space-y-2.5">
                    {col2.map((line, i) => (
                      <li
                        key={i}
                        className={`font-sans text-[12px] md:text-[13px] ${isDark ? 'text-white/28' : 'text-foreground/38'} leading-[1.6] flex gap-2.5 items-start`}
                      >
                        <span className="shrink-0 mt-[7px] w-2 h-px bg-[hsl(38_48%_52%)]/30" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </div>

            {/* Deal logos marquee */}
            {member.dealLogos && member.dealLogos.length > 0 && (
              <motion.div
                className={`pt-4 md:pt-5 mt-auto border-t ${isDark ? 'border-white/[0.04]' : 'border-foreground/[0.06]'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="font-sans text-[7.5px] md:text-[8.5px] font-semibold uppercase tracking-[0.22em] text-[hsl(38_48%_52%)]/45 mb-1.5">
                  Select Investments &amp; Deals
                </p>
                <InlineMarquee logos={member.dealLogos} isDark={isDark} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ─── Team Sticky Deck ─── */
const TeamStickyDeck: React.FC<TeamStickyDeckProps> = ({ members }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();

  return (
    <div className="relative">
      {members.map((member, i) => (
        <StackingCard
          key={member.name}
          member={member}
          index={i}
          totalMembers={members.length}
          isDark={isDark}
          isMobile={isMobile}
        />
      ))}
      {/* Extra space so the last card has room to be fully visible */}
      <div style={{ height: `calc(100vh - ${STICKY_TOP}px)` }} />
    </div>
  );
};

export default TeamStickyDeck;
