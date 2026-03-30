import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LightSectionEffects from '@/components/LightSectionEffects';
import { useTheme } from '@/contexts/ThemeContext';

interface ScrollRevealTextProps {
  label?: string;
  heading: string;
  subtext?: string;
  stats?: { value: string; label: string }[];
  variant?: 'dark' | 'light';
  className?: string;
  highlights?: string[];
}

const ScrollRevealText = React.forwardRef<HTMLDivElement, ScrollRevealTextProps>(({
  label,
  heading,
  subtext,
  stats,
  variant = 'dark',
  className = '',
  highlights = [],
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.95', 'end 0.35'],
  });

  const words = heading.split(' ');

  // 3-way classification
  const isActuallyDark = variant === 'dark' && theme === 'dark';
  const isContrastLight = variant === 'dark' && theme === 'light';
  const isLight = variant === 'light';

  // For sub-components: isDark means "use light text on dark bg"
  const isDarkText = isActuallyDark;

  const normHighlights = highlights.map(h => h.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()']/g, ''));

  return (
    <section
      ref={(node) => {
        (containerRef as any).current = node;
        if (typeof ref === 'function') ref(node as any);
        else if (ref) (ref as any).current = node;
      }}
      className={`relative overflow-hidden ${
        isActuallyDark
          ? 'bg-primary text-primary-foreground'
          : isContrastLight
            ? 'bg-[hsl(38,18%,93%)] text-foreground'
            : 'bg-background text-foreground'
      } ${className}`}
      style={{ contentVisibility: 'auto' }}
    >
      {/* Ambient effects */}
      {isContrastLight && <LightSectionEffects variant="section" />}
      {isLight && <LightSectionEffects variant="section" />}

      {/* Gold gradient bands for contrast sections */}
      {isContrastLight && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(38,48%,52%,0.12), transparent)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(38,48%,52%,0.12), transparent)' }} />
        </>
      )}

      <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16 flex flex-col items-center text-center">
        {label && (
          <motion.p
            style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [0, 1]) }}
            className={`font-sans text-[9px] md:text-[10px] font-medium uppercase tracking-[0.28em] mb-5 md:mb-7 ${
              isActuallyDark ? 'text-gold/50' : 'text-gold/50'
            }`}
          >
            {label}
          </motion.p>
        )}

        <p className="font-serif text-[clamp(1.6rem,4.5vw,3.2rem)] leading-[1.18] tracking-[-0.025em] max-w-[780px]">
          {words.map((word, i) => {
            const start = (i / words.length) * 0.8;
            const end = ((i + 1) / words.length) * 0.8;
            const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()']/g, '');
            const isHighlighted = normHighlights.includes(cleanWord);
            return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} isDark={isDarkText} isHighlighted={isHighlighted} />;
          })}
        </p>

        {subtext && !stats && (
          <motion.p
            style={{ opacity: useTransform(scrollYProgress, [0.7, 1], [0, 0.65]) }}
            className={`font-sans text-[13px] md:text-[15px] leading-[1.85] tracking-[0.01em] max-w-[520px] mt-7 md:mt-10 ${
              isActuallyDark ? 'text-primary-foreground/45' : 'text-muted-foreground'
            }`}
          >
            {subtext}
          </motion.p>
        )}

        {stats && stats.length > 0 && (
          <div className={`mt-8 md:mt-12 pt-8 md:pt-10 w-full max-w-[680px] ${
            isActuallyDark ? 'border-t border-gold/10' : 'border-t border-gold/15'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {stats.map((stat, i) => (
                <StatReveal key={i} stat={stat} index={i} total={stats.length} progress={scrollYProgress} isDark={isDarkText} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

ScrollRevealText.displayName = 'ScrollRevealText';

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
      style={{
        opacity,
        textShadow: isHighlighted && !isDark ? '0 0 40px hsl(38, 48%, 52%, 0.15)' : undefined,
      }}
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
      <p className={`font-serif text-[clamp(1.4rem,3vw,2rem)] tracking-[-0.02em] ${isDark ? 'text-primary-foreground' : 'text-gold'}`}>
        {stat.value}
      </p>
      <p className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.18em] mt-1.5 ${isDark ? 'text-primary-foreground/35' : 'text-muted-foreground/50'}`}>
        {stat.label}
      </p>
    </motion.div>
  );
};

export default ScrollRevealText;