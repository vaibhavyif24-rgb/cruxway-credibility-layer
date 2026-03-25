import React, { useState } from 'react';
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
const STICKY_TOP_BASE = 72;
const STICKY_OFFSET_STEP = 16;
const CARD_MIN_H = 520;

/* ─── Backgrounds ─── */
const darkCardBgs = [
  'hsl(220 8% 14%)',
  'hsl(207 50% 12%)',
  'hsl(210 12% 10%)',
];

const lightCardBgs = [
  'hsl(40 30% 97%)',
  'hsl(38 22% 94%)',
  'hsl(40 25% 95.5%)',
];

const goldFilter = 'brightness(0) invert(67%) sepia(65%) saturate(400%) hue-rotate(358deg) brightness(92%)';

/* ─── Inline Logo Marquee (auto-scrolling, no duplicate logos visible) ─── */
const InlineMarquee: React.FC<{
  logos: TeamDeckMember['dealLogos'];
  isDark: boolean;
  bg: string;
}> = ({ logos, isDark, bg }) => {
  const [hovered, setHovered] = useState(false);
  if (!logos || logos.length === 0) return null;

  // Triple the set: the visible container only ever shows ~1 set width,
  // the animation scrolls by exactly 1/3 (one set) then loops seamlessly
  const track = [...logos, ...logos, ...logos];

  return (
    <div
      className="relative overflow-hidden py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${bg}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${bg}, transparent)` }} />
      <motion.div
        className="flex items-center gap-6 md:gap-8 lg:gap-10 w-max"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 28, ease: 'linear' } }}
        style={{ animationPlayState: hovered ? 'paused' : 'running' }}
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex items-center justify-center shrink-0 h-[24px] md:h-[30px] lg:h-[34px]"
            style={{ marginRight: logo.extraGap ? `${logo.extraGap}px` : undefined }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="h-[20px] md:h-[24px] lg:h-[28px] w-auto max-w-[90px] md:max-w-[110px] lg:max-w-[130px] object-contain transition-all duration-500"
              style={{
                filter: hovered ? 'none' : goldFilter,
                opacity: hovered ? 1 : 0.7,
                transform: logo.scale ? `scale(${logo.scale})` : undefined,
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Team Card ─── */
const TeamCard: React.FC<{
  member: TeamDeckMember;
  index: number;
  totalMembers: number;
  isDark: boolean;
}> = ({ member, index, totalMembers, isDark }) => {
  const bgs = isDark ? darkCardBgs : lightCardBgs;
  const bg = bgs[index % bgs.length];
  const stickyTop = STICKY_TOP_BASE + index * STICKY_OFFSET_STEP;

  return (
    <div
      className="rounded-2xl overflow-hidden will-change-transform"
      style={{
        position: 'sticky',
        top: `${stickyTop}px`,
        zIndex: index + 1,
        backgroundColor: bg,
        minHeight: undefined,
        boxShadow: '0 -6px 24px -4px rgba(0,0,0,0.2), 0 16px 40px -10px rgba(0,0,0,0.15)',
      }}
    >
      <div className="flex flex-col md:flex-row h-full">

        {/* ─── Left: Photo column ─── */}
        <div className="w-full md:w-[200px] lg:w-[240px] shrink-0 flex items-start justify-center pt-8 md:pt-10 px-6 md:px-0 md:pl-8 lg:pl-10">
          {member.photo ? (
            <div className="relative">
              <div
                className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden border-2 shadow-lg"
                style={{
                  borderColor: isDark ? 'hsl(38 48% 52% / 0.15)' : 'hsl(38 48% 52% / 0.12)',
                  boxShadow: `0 8px 32px -8px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}`,
                }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top grayscale"
                />
              </div>
            </div>
          ) : (
            <div
              className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: isDark ? 'hsl(0 0% 100% / 0.04)' : 'hsl(0 0% 0% / 0.03)' }}
            >
              <span
                className="font-serif text-[2rem] md:text-[2.5rem]"
                style={{ color: isDark ? 'hsl(0 0% 100% / 0.1)' : 'hsl(0 0% 0% / 0.08)' }}
              >
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
        </div>

        {/* ─── Right: Content ─── */}
        <div className="flex-1 min-w-0 flex flex-col justify-between p-6 md:p-8 lg:py-10 lg:pr-10 lg:pl-6 overflow-hidden">
          {/* Counter */}
          <p
            className="font-sans text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.25em] mb-5"
            style={{ color: 'hsl(38 48% 52% / 0.4)' }}
          >
            {String(index + 1).padStart(2, '0')} / {String(totalMembers).padStart(2, '0')}
          </p>

          {/* Name + Role + LinkedIn */}
          <div className="mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className="font-serif text-[1.35rem] md:text-[1.6rem] lg:text-[1.85rem] tracking-[-0.025em] leading-[1.1]"
                style={{ color: isDark ? 'hsl(0 0% 100%)' : 'hsl(var(--foreground))' }}
              >
                {member.name}
              </h3>
              {member.linkedIn && (
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full transition-colors cursor-pointer"
                  style={{
                    backgroundColor: isDark ? 'hsl(0 0% 100% / 0.06)' : 'hsl(var(--foreground) / 0.06)',
                    color: isDark ? 'hsl(0 0% 100% / 0.35)' : 'hsl(var(--foreground) / 0.35)',
                  }}
                  aria-label={`${member.name} LinkedIn`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <p
              className="font-sans text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.25em] mt-1.5"
              style={{ color: 'hsl(38 48% 52%)' }}
            >
              {member.role}
            </p>
          </div>

          {/* Deal logos — directly below name */}
          {member.dealLogos && member.dealLogos.length > 0 && (
            <div className="mb-4 md:mb-5 min-w-0 overflow-hidden">
              <p
                className="font-sans text-[7px] md:text-[8px] font-semibold uppercase tracking-[0.22em] mb-2"
                style={{ color: 'hsl(38 48% 52% / 0.45)' }}
              >
                Select Investments &amp; Deals
              </p>
              <InlineMarquee logos={member.dealLogos} isDark={isDark} bg={bg} />
            </div>
          )}

          {/* Summary — proper wrapping */}
          <p
            className="font-sans text-[11.5px] md:text-[12.5px] leading-[1.7] mb-4 break-words"
            style={{ color: isDark ? 'hsl(0 0% 100% / 0.45)' : 'hsl(var(--foreground) / 0.55)' }}
          >
            {member.summary}
          </p>

          {/* Highlights — proper wrapping */}
          <ul className="space-y-2 flex-1 min-w-0">
            {member.highlights.map((line, i) => (
              <li
                key={i}
                className="font-sans text-[10.5px] md:text-[11.5px] leading-[1.6] flex gap-2.5 items-start min-w-0"
                style={{ color: isDark ? 'hsl(0 0% 100% / 0.3)' : 'hsl(var(--foreground) / 0.4)' }}
              >
                <span
                  className="shrink-0 mt-[6px] w-2 h-px"
                  style={{ backgroundColor: 'hsl(38 48% 52% / 0.3)' }}
                />
                <span className="break-words overflow-wrap-anywhere">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ─── Team Sticky Deck ─── */
const TeamStickyDeck: React.FC<TeamStickyDeckProps> = ({ members }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col max-w-[1080px] mx-auto px-4 md:px-6 lg:px-10">
      {members.map((member, i) => (
        <TeamCard
          key={member.name}
          member={member}
          index={i}
          totalMembers={members.length}
          isDark={isDark}
        />
      ))}
      {/* Scroll clearance for last card — smaller on desktop */}
      <div className="h-[120px] md:h-[80px]" />
    </div>
  );
};

export default TeamStickyDeck;
