import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LightSectionEffects from '@/components/LightSectionEffects';
import WaveBackground from '@/components/WaveBackground';
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

  const isActuallyDark = variant === 'dark' && theme === 'dark';
  const isContrastLight = variant === 'dark' && theme === 'light';
  const isLight = variant === 'light';
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
            ? 'bg-[hsl(40,22%,91%)] text-foreground'
            : 'bg-background text-foreground'
      } ${className}`}
    >
      {isActuallyDark && <WaveBackground variant="section" />}
      {isContrastLight && (
        <>
          <LightSectionEffects variant="section" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent origin-center z-10"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent origin-center z-10"
          />
        </>
      )}
      {isLight && <LightSectionEffects variant="section" />}

      <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-8 md:py-10 lg:py-12 flex flex-col items-center text-center">
        {label && (
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [0, 1]) }}
            className="flex items-center gap-3 mb-5 md:mb-6"
          >
            <div className="w-6 h-px bg-gold/50" />
            <p className="font-sans text-[11px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-gold">
              {label}
            </p>
            <div className="w-6 h-px bg-gold/50" />
          </motion.div>
        )}

        <p className="font-serif text-[clamp(1.6rem,4.5vw,3.2rem)] leading-[1.18] tracking-[-0.025em] max-w-[780px] break-words">
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
            isActuallyDark ? 'border-t border-gold/35' : 'border-t border-gold/40'
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
  word, range, progress, isDark, isHighlighted = false,
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
        textShadow: isHighlighted ? '0 0 20px hsl(43,78%,50%,0.35), 0 0 40px hsl(43,78%,50%,0.15)' : undefined,
        fontWeight: isHighlighted ? 600 : undefined,
      }}
      className={`inline-block mr-[0.3em] ${
        isHighlighted
          ? 'text-gold font-medium'
          : isDark ? 'text-primary-foreground' : 'text-foreground'
      }`}
    >
      {word}
    </motion.span>
  );
};

const StatReveal = ({
  stat, index, total, progress, isDark,
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
    <motion.div
      style={{ opacity }}
      className="text-center"
      initial={{ y: 15, scale: 0.95 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        whileHover={{ scale: 1.05, textShadow: '0 0 25px hsl(43,78%,50%,0.3)' }}
        transition={{ duration: 0.2 }}
        className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.02em] text-gold font-semibold cursor-default"
      >
        {stat.value}
      </motion.p>
      <p className={`font-sans text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mt-2 ${isDark ? 'text-primary-foreground/50' : 'text-foreground/60'}`}>
        {stat.label}
      </p>
    </motion.div>
  );
};

export default ScrollRevealText;
