import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
const STICKY_TOP_BASE = 80;
const STICKY_OFFSET_STEP = 20;
const CARD_HEIGHT = 680;

/* ─── Backgrounds ─── */
const darkCardBgs = [
  'hsl(220 8% 18%)',   // dark charcoal
  'hsl(207 55% 14%)',  // deep navy
  'hsl(210 12% 12%)',  // near-black
];

const lightCardBgs = [
  'hsl(40 30% 96%)',   // warm cream
  'hsl(38 22% 92%)',   // sand
  'hsl(40 25% 94%)',   // ivory
];

const goldFilter = 'brightness(0) invert(67%) sepia(65%) saturate(400%) hue-rotate(358deg) brightness(92%)';

/* ─── Inline Logo Marquee ─── */
const InlineMarquee: React.FC<{
  logos: TeamDeckMember['dealLogos'];
  isDark: boolean;
}> = ({ logos, isDark }) => {
  const [hovered, setHovered] = useState(false);
  if (!logos || logos.length === 0) return null;
  const doubled = [...logos, ...logos];

  return (
    <div
      className="relative overflow-hidden py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Edge fades use parent's bg via inherit trick */}
      <div className={`absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none ${isDark ? 'team-marquee-fade-left-dark' : 'team-marquee-fade-left-light'}`} style={{ background: 'linear-gradient(to right, inherit, transparent)' }} />
      <div className={`absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none ${isDark ? 'team-marquee-fade-right-dark' : 'team-marquee-fade-right-light'}`} style={{ background: 'linear-gradient(to left, inherit, transparent)' }} />
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

/* ─── Team Card (Boundless-style two-column sticky) ─── */
const TeamCard: React.FC<{
  member: TeamDeckMember;
  index: number;
  totalMembers: number;
  isDark: boolean;
  isMobile: boolean;
}> = ({ member, index, totalMembers, isDark, isMobile }) => {
  const bgs = isDark ? darkCardBgs : lightCardBgs;
  const bg = bgs[index % bgs.length];
  const stickyTop = STICKY_TOP_BASE + index * STICKY_OFFSET_STEP;

  return (
    <div
      className="rounded-2xl md:rounded-3xl overflow-hidden will-change-transform"
      style={{
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? undefined : `${stickyTop}px`,
        zIndex: index + 1,
        backgroundColor: bg,
        minHeight: isMobile ? undefined : `${CARD_HEIGHT}px`,
        boxShadow: '0 -8px 30px -4px rgba(0,0,0,0.25), 0 20px 50px -10px rgba(0,0,0,0.2)',
        marginBottom: isMobile ? '24px' : '0px',
      }}
    >
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-full`} style={{ minHeight: isMobile ? undefined : `${CARD_HEIGHT}px` }}>
        {/* ─── Left column: content (~40%) ─── */}
        <div className={`${isMobile ? 'w-full order-2' : 'w-[42%]'} flex flex-col justify-between p-6 md:p-8 lg:p-10`}>
          {/* Counter */}
          <p
            className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] mb-4 md:mb-6"
            style={{ color: 'hsl(38 48% 52%)', opacity: 0.5 }}
          >
            {String(index + 1).padStart(2, '0')} / {String(totalMembers).padStart(2, '0')}
          </p>

          {/* Name + role */}
          <div className="mb-4 md:mb-5">
            <div className="flex items-center gap-1.5">
              <h3 className={`font-serif text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] ${isDark ? 'text-white' : 'text-foreground'} tracking-[-0.025em] leading-[1.1]`}>
                {member.name}
              </h3>
              {member.linkedIn && (
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDark ? 'text-white/20 hover:text-white/50' : 'text-foreground/20 hover:text-foreground/50'} transition-colors`}
                >
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              )}
            </div>
            <p
              className="font-sans text-[9px] md:text-[10px] font-medium uppercase tracking-[0.22em] mt-1"
              style={{ color: 'hsl(38 48% 52%)' }}
            >
              {member.role}
            </p>
          </div>

          {/* Summary */}
          <p className={`font-sans text-[12px] md:text-[13px] ${isDark ? 'text-white/45' : 'text-foreground/55'} leading-[1.65] mb-4 md:mb-5`}>
            {member.summary}
          </p>

          {/* Highlights */}
          <ul className="space-y-2 md:space-y-2.5 flex-1">
            {member.highlights.map((line, i) => (
              <li
                key={i}
                className={`font-sans text-[11px] md:text-[12px] ${isDark ? 'text-white/35' : 'text-foreground/45'} leading-[1.6] flex gap-2.5 items-start`}
              >
                <span className="shrink-0 mt-[7px] w-2 h-px" style={{ backgroundColor: 'hsl(38 48% 52% / 0.35)' }} />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          {/* Deal logos strip */}
          {member.dealLogos && member.dealLogos.length > 0 && (
            <div className={`mt-4 md:mt-6 pt-3 md:pt-4 border-t ${isDark ? 'border-white/[0.06]' : 'border-foreground/[0.08]'}`}>
              <p
                className="font-sans text-[7px] md:text-[8px] font-medium uppercase tracking-[0.2em] mb-1.5"
                style={{ color: 'hsl(38 48% 52% / 0.5)' }}
              >
                Select Investments &amp; Deals
              </p>
              <InlineMarquee logos={member.dealLogos} isDark={isDark} />
            </div>
          )}
        </div>

        {/* ─── Right column: full-bleed image (~58%) ─── */}
        <div className={`${isMobile ? 'w-full order-1 h-[280px]' : 'w-[58%]'} relative`} style={{ minHeight: isMobile ? undefined : `${CARD_HEIGHT}px` }}>
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : (
            <div className={`absolute inset-0 flex items-center justify-center ${isDark ? 'bg-white/[0.03]' : 'bg-foreground/[0.03]'}`}>
              <span className={`font-serif text-[3rem] md:text-[4rem] ${isDark ? 'text-white/10' : 'text-foreground/10'}`}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          {/* Subtle gradient overlay on the image edge closest to text */}
          {!isMobile && (
            <div
              className="absolute inset-y-0 left-0 w-[60px] pointer-events-none"
              style={{ background: `linear-gradient(to right, ${bg}, transparent)` }}
            />
          )}
          {isMobile && (
            <div
              className="absolute inset-x-0 bottom-0 h-[40px] pointer-events-none"
              style={{ background: `linear-gradient(to top, ${bg}, transparent)` }}
            />
          )}
        </div>
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
    <div className="flex flex-col max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
      {members.map((member, i) => (
        <TeamCard
          key={member.name}
          member={member}
          index={i}
          totalMembers={members.length}
          isDark={isDark}
          isMobile={isMobile}
        />
      ))}
      {/* Extra scroll clearance so last card can be fully visible */}
      {!isMobile && <div style={{ height: `${CARD_HEIGHT * 0.3}px` }} />}
    </div>
  );
};

export default TeamStickyDeck;
