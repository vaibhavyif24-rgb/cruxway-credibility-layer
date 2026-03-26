import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealTextProps {
  label?: string;
  heading: string;
  subtext?: string;
  stats?: { value: string; label: string }[];
  variant?: 'dark' | 'light';
  className?: string;
  highlights?: string[];
}

/**
 * Scroll-triggered word-by-word opacity reveal.
 * Each word transitions from ~15 % opacity to full as the viewport scrolls
 * through the container, creating a cinematic reading cadence.
 * Words matching the `highlights` array render in gold for emphasis.
 */
const ScrollRevealText = ({
  label,
  heading,
  subtext,
  stats,
  variant = 'dark',
  className = '',
  highlights = [],
}: ScrollRevealTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.95', 'end 0.35'],
  });

  const words = heading.split(' ');
  const isDark = variant === 'dark';

  // Normalise highlights for matching
  const normHighlights = highlights.map(h => h.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()']/g, ''));

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden ${
        isDark
          ? 'bg-primary text-primary-foreground'
          : 'bg-background text-foreground'
      } ${className}`}
    >
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-20 md:py-28 lg:py-36 flex flex-col items-center text-center">
        {/* Overline label */}
        {label && (
          <motion.p
            style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [0, 1]) }}
            className={`font-sans text-[9px] md:text-[10px] font-medium uppercase tracking-[0.28em] mb-8 md:mb-10 ${
              isDark ? 'text-gold/50' : 'text-muted-foreground/50'
            }`}
          >
            {label}
          </motion.p>
        )}

        {/* Heading — word-by-word reveal */}
        <p className="font-serif text-[clamp(1.6rem,4.5vw,3.2rem)] leading-[1.18] tracking-[-0.025em] max-w-[780px]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()']/g, '');
            const isHighlighted = normHighlights.includes(cleanWord);
            return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} isDark={isDark} isHighlighted={isHighlighted} />;
          })}
        </p>

        {/* Subtext */}
        {subtext && !stats && (
          <motion.p
            style={{ opacity: useTransform(scrollYProgress, [0.7, 1], [0, 0.65]) }}
            className={`font-sans text-[13px] md:text-[15px] leading-[1.85] tracking-[0.01em] max-w-[520px] mt-10 md:mt-14 ${
              isDark ? 'text-primary-foreground/45' : 'text-muted-foreground'
            }`}
          >
            {subtext}
          </motion.p>
        )}

        {/* Stat blocks */}
        {stats && stats.length > 0 && (
          <div className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-gold/10 w-full max-w-[680px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {stats.map((stat, i) => (
                <StatReveal key={i} stat={stat} index={i} total={stats.length} progress={scrollYProgress} isDark={isDark} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* Individual word with scroll-driven opacity */
const Word = ({
  word,
  range,
  progress,
  isDark,
  isHighlighted = false,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  isDark: boolean;
  isHighlighted?: boolean;
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.3em] ${
        isHighlighted
          ? 'text-gold'
          : isDark ? 'text-primary-foreground' : 'text-foreground'
      }`}
    >
      {word}
    </motion.span>
  );
};

/* Individual stat with scroll-driven opacity */
const StatReveal = ({
  stat,
  index,
  total,
  progress,
  isDark,
}: {
  stat: { value: string; label: string };
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  isDark: boolean;
}) => {
  const start = 0.65 + (index / total) * 0.15;
  const end = Math.min(start + 0.2, 1);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="text-center">
      <p className={`font-serif text-[clamp(1.4rem,3vw,2rem)] tracking-[-0.02em] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
        {stat.value}
      </p>
      <p className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.18em] mt-1.5 ${isDark ? 'text-primary-foreground/35' : 'text-muted-foreground/50'}`}>
        {stat.label}
      </p>
    </motion.div>
  );
};

export default ScrollRevealText;
