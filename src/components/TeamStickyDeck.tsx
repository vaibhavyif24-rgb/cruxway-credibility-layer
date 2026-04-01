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

/* ─── Backgrounds ─── */
const darkCardBgs = [
  'hsl(220 8% 14%)',
  'hsl(228 48% 14%)',
  'hsl(228 12% 10%)',
];

const lightCardBgs = [
  'hsl(40 30% 97%)',
  'hsl(38 22% 94%)',
  'hsl(40 25% 95.5%)',
];

const goldFilter = 'brightness(0) invert(55%) sepia(60%) saturate(500%) hue-rotate(8deg) brightness(100%)';

/* ─── Inline Logo Marquee ─── */
const InlineMarquee: React.FC<{
  logos: TeamDeckMember['dealLogos'];
  isDark: boolean;
  bg: string;
}> = ({ logos, isDark, bg }) => {
  const [hovered, setHovered] = useState(false);
  if (!logos || logos.length === 0) return null;

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
        transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 16, ease: 'linear' } }}
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
  stickyBase: number;
  stickyStep: number;
}> = ({ member, index, totalMembers, isDark, stickyBase, stickyStep }) => {
  const bgs = isDark ? darkCardBgs : lightCardBgs;
  const bg = bgs[index % bgs.length];
  const stickyTop = stickyBase + index * stickyStep;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden w-full"
      style={{
        position: 'sticky',
        top: `${stickyTop}px`,
        zIndex: index + 1,
        backgroundColor: bg,
        boxShadow: '0 -6px 24px -4px rgba(0,0,0,0.2), 0 16px 40px -10px rgba(0,0,0,0.15)',
      }}
    >
      {/* Gold accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] bg-gradient-to-r from-gold/50 via-gold/25 to-transparent origin-left"
      />

      {/* Soft top fade for stacking blend */}
      {index > 0 && (
        <div
          className="absolute top-0 left-0 right-0 h-3 z-[2] pointer-events-none rounded-t-2xl"
          style={{ background: `linear-gradient(to bottom, ${bg}, transparent)` }}
        />
      )}

      <div className="flex flex-col md:flex-row h-full overflow-hidden">

        {/* ─── Left: Photo column ─── */}
        <div className="w-full md:w-[200px] lg:w-[240px] shrink-0 flex items-start justify-center pt-8 md:pt-10 px-6 md:px-0 md:pl-8 lg:pl-10">
          {member.photo ? (
            <div className="relative">
              <div
                className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden border-2 shadow-lg"
                style={{
                  borderColor: isDark ? 'hsl(43 70% 55% / 0.25)' : 'hsl(43 78% 50% / 0.2)',
                  boxShadow: `0 8px 32px -8px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}`,
                }}
              >
                <motion.img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  initial={{ filter: 'grayscale(100%)' }}
                  whileInView={{ filter: 'grayscale(0%)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  className="w-full h-full object-cover object-top"
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
            style={{ color: isDark ? 'hsl(43 70% 55% / 0.6)' : 'hsl(43 78% 50% / 0.65)' }}
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
              {/* Gold underline sweep */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-full origin-left mt-1 mb-1"
                style={{ background: `linear-gradient(90deg, ${isDark ? 'hsl(43 70% 55% / 0.4)' : 'hsl(43 78% 50% / 0.45)'}, transparent)` }}
              />
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
              style={{ color: 'hsl(43 78% 50%)' }}
            >
              {member.role}
            </p>
          </div>

          {/* Deal logos */}
          {member.dealLogos && member.dealLogos.length > 0 && (
            <div className="mb-4 md:mb-5 min-w-0 overflow-hidden">
              <p
                className="font-sans text-[8px] md:text-[9px] font-semibold uppercase tracking-[0.22em] mb-2"
                style={{ color: isDark ? 'hsl(43 70% 55% / 0.7)' : 'hsl(43 78% 50% / 0.8)' }}
              >
                Select Investments &amp; Deals
              </p>
              <InlineMarquee logos={member.dealLogos} isDark={isDark} bg={bg} />
            </div>
          )}

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-sans text-[11.5px] md:text-[12.5px] leading-[1.7] mb-4 break-words"
            style={{ color: isDark ? 'hsl(0 0% 100% / 0.45)' : 'hsl(var(--foreground) / 0.55)' }}
          >
            {member.summary}
          </motion.p>

          {/* Highlights */}
          <ul className="space-y-2 flex-1 min-w-0">
            {member.highlights.map((line, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                className="font-sans text-[10.5px] md:text-[11.5px] leading-[1.6] flex gap-2.5 items-start min-w-0"
                style={{ color: isDark ? 'hsl(0 0% 100% / 0.3)' : 'hsl(var(--foreground) / 0.4)' }}
              >
                <span
                  className="shrink-0 mt-[6px] w-2 h-px"
                  style={{ backgroundColor: isDark ? 'hsl(43 70% 55% / 0.45)' : 'hsl(43 78% 50% / 0.5)' }}
                />
                <span className="break-words overflow-wrap-anywhere">{line}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Team Sticky Deck ─── */
const TeamStickyDeck: React.FC<TeamStickyDeckProps> = ({ members }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  const stickyStep = isMobile ? 10 : 16;
  const stickyBase = isMobile ? 60 : 72;

  return (
    <div className="flex flex-col max-w-[1080px] mx-auto px-4 md:px-6 lg:px-10">
      {members.map((member, i) => (
        <TeamCard
          key={member.name}
          member={member}
          index={i}
          totalMembers={members.length}
          isDark={isDark}
          stickyBase={stickyBase}
          stickyStep={stickyStep}
        />
      ))}
      <div className="h-[120px] md:h-[80px]" />
    </div>
  );
};

export default TeamStickyDeck;
