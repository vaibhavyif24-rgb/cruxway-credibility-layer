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

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start 0.75', 'center 0.45', 'end 0.25'],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.45, 0.65, 1], [0.3, 0.85, 1, 0.85, 0.3]);
  const numberColor = useTransform(scrollYProgress, [0, 0.45, 1], [0.1, 0.45, 0.1]);
  const underlineWidth = useTransform(scrollYProgress, [0, 0.45, 1], ['0%', '100%', '0%']);
  const dotScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.8, 1.4, 0.8]);
  const dotGlowOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0, 1, 0]);
  const itemScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.97, 1, 0.97]);
  const numberY = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative pl-12"
      >
        <div className="absolute top-1 left-[calc(1.25rem-5px)]">
          <div className="w-3 h-3 rounded-full border-2 border-gold/40 bg-background" />
        </div>

        <span className="block font-serif text-[2.5rem] leading-none text-gold select-none opacity-25">
          {num}
        </span>

        <h3 className={`font-serif text-[1.15rem] leading-[1.25] tracking-[-0.02em] mt-1.5 ${
          isDark ? 'text-primary-foreground' : 'text-foreground'
        }`}>
          {principle.t}
        </h3>
        <div className="w-8 h-[1.5px] bg-gold/40 mt-1.5" />

        <p className={`font-sans text-[13px] leading-[1.75] mt-2.5 ${
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
      style={{ opacity: glowOpacity, scale: itemScale }}
      initial={{ x: isLeft ? -30 : 30 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${
        isLeft
          ? 'md:pr-[calc(50%+2.5rem)]'
          : 'md:pl-[calc(50%+2.5rem)]'
      }`}
    >
      {/* Timeline dot with glow */}
      <div className="absolute top-1 left-[calc(50%-6px)]">
        <motion.div
          style={{ scale: dotScale }}
          className="w-3 h-3 rounded-full border-2 border-gold/40 bg-background transition-colors duration-500"
        />
        <motion.div
          style={{ opacity: dotGlowOpacity }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-[-6px] rounded-full bg-gold/35 blur-md"
        />
      </div>

      {/* Content wrapper: forces all children into a vertical stack */}
      <div className={`flex flex-col ${isLeft ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
        {/* Number */}
        <motion.span
          style={{ opacity: numberColor, y: numberY }}
          className="block font-serif text-[3.5rem] md:text-[4rem] leading-none text-gold select-none"
        >
          {num}
        </motion.span>

        {/* Title with scroll-linked underline */}
        <div className="mt-1 relative">
          <h3 className={`font-serif text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.2] tracking-[-0.02em] ${
            isDark ? 'text-primary-foreground' : 'text-foreground'
          }`}>
            {principle.t}
          </h3>
          <motion.div
            style={{ width: underlineWidth }}
            className={`h-[1.5px] bg-gold/50 mt-1 ${isLeft ? 'ml-auto' : ''}`}
          />
        </div>

        {/* Description */}
        <p className={`font-sans text-[13.5px] md:text-[14px] leading-[1.75] mt-3 max-w-[400px] ${
          isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'
        }`}>
          {principle.d}
        </p>
      </div>
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
            isMobile ? 'left-[1.25rem]' : 'left-1/2 -translate-x-px'
          }`}
        >
          <motion.div
            className="w-full h-full bg-gold/15"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
          />
          <div
            className="absolute inset-0 w-full"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, hsl(40,65%,44%,0.25) 50%, transparent 100%)',
              backgroundSize: '100% 300%',
              animation: 'shimmer-line-pulse 5s ease-in-out infinite',
            }}
          />
        </div>

        {/* Principles */}
        <div className="relative space-y-0">
          {principles.map((principle, i) => (
            <div key={i}>
              <PrincipleItem
                principle={principle}
                index={i}
                isDark={isDark}
                isMobile={isMobile}
              />
              {i < principles.length - 1 && (
                <div className={`py-4 md:py-6 ${isMobile ? 'pl-12' : ''}`}>
                  <div className="h-px bg-gold/10" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrinciplesGrid;
