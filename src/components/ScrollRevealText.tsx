import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import LightSectionEffects from '@/components/LightSectionEffects';
import WaveBackground from '@/components/WaveBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile ? ['start end', 'end start'] : ['start 0.85', 'end 0.45'],
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

      <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-12 lg:py-14 flex flex-col items-center text-center">
        {/* Label */}
        {label && (
          isMobile ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-5 md:mb-6"
            >
              <div className="w-6 h-px bg-gold/50" />
              <p className="font-sans text-[12px] md:text-[13px] font-bold uppercase tracking-[0.3em] text-gold">
                {label}
              </p>
              <div className="w-6 h-px bg-gold/50" />
            </motion.div>
          ) : (
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [0, 1]) }}
              className="flex items-center gap-3 mb-5 md:mb-6"
            >
              <div className="w-6 h-px bg-gold/50" />
              <p className="font-sans text-[12px] md:text-[13px] font-bold uppercase tracking-[0.3em] text-gold">
                {label}
              </p>
              <div className="w-6 h-px bg-gold/50" />
            </motion.div>
          )
        )}

        {/* Heading */}
        {isMobile ? (
          <MobileHeading words={words} normHighlights={normHighlights} isDark={isDarkText} />
        ) : (
          <p className="font-serif text-[clamp(1.9rem,5.5vw,3.2rem)] leading-[1.18] tracking-[-0.025em] max-w-[780px] break-words">
            {words.map((word, i) => {
              const start = (i / words.length) * 0.8;
              const end = ((i + 1) / words.length) * 0.8;
              const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()']/g, '');
              const isHighlighted = normHighlights.includes(cleanWord);
              return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} isDark={isDarkText} isHighlighted={isHighlighted} />;
            })}
          </p>
        )}

        {/* Subtext */}
        {subtext && !stats && (
          isMobile ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`font-sans text-[14px] md:text-[15px] leading-[1.85] tracking-[0.01em] max-w-[520px] mt-7 md:mt-10 ${
                isActuallyDark ? 'text-primary-foreground/45' : 'text-muted-foreground'
              }`}
            >
              {subtext}
            </motion.p>
          ) : (
            <motion.p
              style={{ opacity: useTransform(scrollYProgress, [0.7, 1], [0, 0.65]) }}
              className={`font-sans text-[14px] md:text-[15px] leading-[1.85] tracking-[0.01em] max-w-[520px] mt-7 md:mt-10 ${
                isActuallyDark ? 'text-primary-foreground/45' : 'text-muted-foreground'
              }`}
            >
              {subtext}
            </motion.p>
          )
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className={`mt-6 md:mt-12 pt-6 md:pt-10 w-full max-w-[680px] ${
            isActuallyDark ? 'border-t border-gold/35' : 'border-t border-gold/40'
          }`}>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <StatReveal key={i} stat={stat} index={i} total={stats.length} progress={scrollYProgress} isDark={isDarkText} isMobile={isMobile} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

ScrollRevealText.displayName = 'ScrollRevealText';

/* ─── Mobile: Viewport-triggered staggered word entrance ─── */
const MobileHeading = ({ words, normHighlights, isDark }: {
  words: string[];
  normHighlights: string[];
  isDark: boolean;
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <p ref={ref} className="font-serif text-[clamp(1.9rem,5.5vw,3.2rem)] leading-[1.18] tracking-[-0.025em] max-w-[780px] break-words">
      {words.map((word, i) => {
        const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()']/g, '');
        const isHighlighted = normHighlights.includes(cleanWord);
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-block mr-[0.3em] ${
              isHighlighted
                ? 'text-gold font-medium'
                : isDark ? 'text-primary-foreground' : 'text-foreground'
            }`}
            style={{
              textShadow: isHighlighted ? '0 0 20px hsl(43,78%,50%,0.35), 0 0 40px hsl(43,78%,50%,0.15)' : undefined,
              fontWeight: isHighlighted ? 600 : undefined,
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

/* ─── Desktop: Scroll-linked word reveal ─── */
const Word = ({
  word, range, progress, isDark, isHighlighted = false,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  isDark: boolean;
  isHighlighted?: boolean;
}) => {
  const opacity = useTransform(progress, range, [0.25, 1]);
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

/* ─── Stat with counting animation ─── */
const StatReveal = ({
  stat, index, total, progress, isDark, isMobile = false,
}: {
  stat: { value: string; label: string };
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  isDark: boolean;
  isMobile?: boolean;
}) => {
  const start = 0.65 + (index / total) * 0.15;
  const end = Math.min(start + 0.2, 1);
  const desktopOpacity = useTransform(progress, [start, end], [0, 1]);

  const statRef = useRef<HTMLDivElement>(null);
  const isInViewStat = useInView(statRef, { once: true });
  const [displayVal, setDisplayVal] = useState(stat.value);

  useEffect(() => {
    if (!isInViewStat) return;
    const numMatch = stat.value.match(/[\d.]+/);
    if (!numMatch) return;
    const target = parseFloat(numMatch[0]);
    const prefix = stat.value.slice(0, stat.value.indexOf(numMatch[0]));
    const suffix = stat.value.slice(stat.value.indexOf(numMatch[0]) + numMatch[0].length);
    let frame = 0;
    const totalFrames = 30;
    const timer = setInterval(() => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / totalFrames, 3);
      const current = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
      setDisplayVal(`${prefix}${current}${suffix}`);
      if (frame >= totalFrames) { setDisplayVal(stat.value); clearInterval(timer); }
    }, 30);
    return () => clearInterval(timer);
  }, [isInViewStat, stat.value]);

  return (
    <motion.div
      ref={statRef}
      style={isMobile ? undefined : { opacity: desktopOpacity }}
      className="text-center"
      initial={{ y: 15, scale: 0.95 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        whileHover={{ scale: 1.05, textShadow: '0 0 25px hsl(43,78%,50%,0.3)' }}
        transition={{ duration: 0.2 }}
        className={`font-serif tracking-[-0.02em] text-gold font-semibold cursor-default ${
          isMobile ? 'text-[1.5rem]' : 'text-[clamp(2rem,5vw,2.8rem)]'
        }`}
      >
        {displayVal}
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: isMobile ? 16 : 24 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        className="h-[1.5px] bg-gold/40 mx-auto mt-1.5 md:mt-2"
      />
      <p className={`font-sans text-[8px] md:text-[11px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] mt-1.5 md:mt-2 ${isDark ? 'text-primary-foreground/50' : 'text-foreground/60'}`}>
        {stat.label}
      </p>
    </motion.div>
  );
};

export default ScrollRevealText;
