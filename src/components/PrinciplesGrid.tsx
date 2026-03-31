import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRef } from 'react';

interface Principle {
  t: string;
  d: string;
}

interface PrinciplesGridProps {
  principles: Principle[];
}

const PrincipleItem = ({ principle, index, isDark, isMobile }: {
  principle: Principle;
  index: number;
  isDark: boolean;
  isMobile: boolean;
}) => {
  const num = String(index + 1).padStart(2, '0');
  const isLeft = index % 2 === 0;
  const itemRef = useRef<HTMLDivElement>(null);

  // Always call hooks unconditionally (React rules of hooks)
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start 0.85', 'center center', 'end 0.15'],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.3, 0.85, 1, 0.85, 0.3]);
  const numberColor = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.45, 0.1]);
  const underlineWidth = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '100%', '0%']);
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.4, 0.8]);
  const dotGlowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  // Mobile: simple whileInView instead of scroll-linked tracking
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative pl-14"
      >
        {/* Timeline dot */}
        <div className="absolute top-1 left-[calc(1.5rem-5px)]">
          <div className="w-3 h-3 rounded-full border-2 border-gold/30 bg-background" />
        </div>

        <span className="block font-serif text-[3rem] leading-none text-gold select-none opacity-20">
          {num}
        </span>

        <h3 className={`font-serif text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.2] tracking-[-0.02em] mt-1 ${
          isDark ? 'text-primary-foreground' : 'text-foreground'
        }`}>
          {principle.t}
        </h3>

        <p className={`font-sans text-[13.5px] md:text-[14px] leading-[1.75] mt-2 max-w-[400px] ${
          isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'
        }`}>
          {principle.d}
        </p>
      </motion.div>
    );
  }

  // Desktop: full scroll-linked version
  return (
    <motion.div
      ref={itemRef}
      style={{ opacity: glowOpacity }}
      className={`relative ${
        isLeft
          ? 'md:pr-[calc(50%+2.5rem)] md:text-right'
          : 'md:pl-[calc(50%+2.5rem)] md:text-left'
      }`}
    >
      {/* Timeline dot with glow */}
      <div className="absolute top-1 left-[calc(50%-6px)]">
        <motion.div
          style={{ scale: dotScale }}
          className="w-3 h-3 rounded-full border-2 border-gold/30 bg-background transition-colors duration-500"
        />
        <motion.div
          style={{ opacity: dotGlowOpacity }}
          className="absolute inset-[-4px] rounded-full bg-gold/20 blur-sm"
        />
      </div>

      {/* Number */}
      <motion.span
        style={{ opacity: numberColor }}
        className={`block font-serif text-[3rem] md:text-[3.5rem] leading-none text-gold select-none ${
          isLeft ? 'md:text-right' : 'md:text-left'
        }`}
      >
        {num}
      </motion.span>

      {/* Title with scroll-linked underline */}
      <h3 className={`font-serif text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.2] tracking-[-0.02em] mt-1 relative inline-block ${
        isDark ? 'text-primary-foreground' : 'text-foreground'
      }`}>
        {principle.t}
        <motion.span
          style={{ width: underlineWidth }}
          className="absolute bottom-0 left-0 h-[1.5px] bg-gold/40"
        />
      </h3>

      {/* Description */}
      <p className={`font-sans text-[13.5px] md:text-[14px] leading-[1.75] mt-2 max-w-[400px] inline-block ${
        isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'
      }`}>
        {principle.d}
      </p>
    </motion.div>
  );
};

const PrinciplesGrid = ({ principles }: PrinciplesGridProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();

  return (
    <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pb-6 md:pb-8">
      <div className="relative">
        {/* Vertical connecting line */}
        <div
          className={`absolute top-0 bottom-0 w-px ${
            isMobile ? 'left-[1.5rem]' : 'left-1/2 -translate-x-px'
          }`}
        >
          <motion.div
            className="w-full h-full bg-gold/10"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
          />
          <div
            className="absolute inset-0 w-full"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, hsl(40,65%,44%,0.15) 50%, transparent 100%)',
              backgroundSize: '100% 200%',
              animation: 'shimmer-line-pulse 4s ease-in-out infinite',
            }}
          />
        </div>

        {/* Principles */}
        <div className="relative space-y-8 md:space-y-12">
          {principles.map((principle, i) => (
            <PrincipleItem
              key={i}
              principle={principle}
              index={i}
              isDark={isDark}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrinciplesGrid;
