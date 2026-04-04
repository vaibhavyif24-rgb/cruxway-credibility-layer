import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { SectionLabel, FadeIn, GoldRule } from '@/components/ui/Section';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import WaveBackground from '@/components/WaveBackground';

const principles = [
  { t: 'Integrity', d: 'We say what we mean and follow through. Transparency and intellectual honesty in every interaction, even when the truth is uncomfortable.' },
  { t: 'Steward Leadership', d: 'Leadership is earned through stewardship, not authority. We succeed when the people and businesses around us succeed.' },
  { t: 'Humility', d: 'The best investors never stop learning. We approach every situation with curiosity and an open mind.' },
  { t: 'Grit', d: 'Building lasting businesses requires perseverance. We do hard things, especially when things get hard.' },
  { t: 'Bias to Action', d: 'Analysis has its place, but progress demands execution. We move decisively and learn in motion.' },
  { t: 'The Golden Rule', d: 'Treat every person, from founder to frontline employee, with respect, fairness, and genuine compassion.' },
];

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Single Accordion Row ─── */
const AccordionRow = ({
  index,
  principle,
  isOpen,
  onToggle,
  isDark,
  isMobile,
}: {
  index: number;
  principle: { t: string; d: string };
  isOpen: boolean;
  onToggle: () => void;
  isDark: boolean;
  isMobile: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const num = String(index + 1).padStart(2, '0');
  const nameIsGold = isOpen || isHovered;

  return (
    <div className="border-b border-gold/10">
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full flex items-center gap-3 md:gap-4 py-4 md:py-6 cursor-pointer text-left group overflow-hidden"
      >
        {/* Shimmer sweep on hover (desktop only) */}
        {!isMobile && isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-0 animate-shimmer-sweep"
              style={{ background: 'linear-gradient(90deg, transparent, hsl(43 78% 50% / 0.03), transparent)' }}
            />
          </div>
        )}

        {/* Number */}
        <span
          className="font-serif text-gold text-[14px] tracking-[0.1em] min-w-[2.5rem] md:min-w-[3rem] transition-opacity duration-300 select-none"
          style={{ opacity: nameIsGold ? 0.7 : 0.4 }}
        >
          {num}
        </span>

        {/* Principle name */}
        <span
          className="font-serif flex-1 transition-colors duration-300"
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
            letterSpacing: '-0.01em',
            color: nameIsGold
              ? 'hsl(43, 78%, 50%)'
              : isDark ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
          }}
        >
          {principle.t}
        </span>

        {/* + / × toggle */}
        <motion.span
          className="font-sans text-gold text-[18px] md:text-[20px] leading-none select-none flex-shrink-0"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease }}
        >
          +
        </motion.span>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className={`${isMobile ? 'pl-[2.5rem]' : 'pl-[3rem]'} pb-5`}>
              {/* Gold accent line */}
              <motion.div
                className="h-[1.5px] bg-gold/30 mb-3"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.5, ease }}
              />
              <p
                className={`font-sans text-[14px] md:text-[15px] leading-[1.8] max-w-[600px] ${
                  isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'
                }`}
              >
                {principle.d}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main Component ─── */
const ConvictionsDeck = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setOpenIndex(prev => (prev === i ? null : i));
  };

  return (
    <section className="relative overflow-hidden py-10 md:py-14 px-5 md:px-10 lg:px-16">
      {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
      <WaveBackground variant="section" />

      <div className="relative max-w-[1080px] mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <FadeIn>
            <SectionLabel>What we stand for</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.15] mb-1">
              <span className="text-foreground">Guiding </span>
              <span className="text-gold">Principles</span>
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] max-w-[480px] mt-2 mb-3">
              Six principles that shape how we partner, decide, and build.
            </p>
            <GoldRule />
          </FadeIn>
        </div>

        {/* Accordion */}
        <div className="border-t border-gold/10">
          {principles.map((p, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.06}>
              <AccordionRow
                index={i}
                principle={p}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
                isDark={isDark}
                isMobile={isMobile}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConvictionsDeck;
