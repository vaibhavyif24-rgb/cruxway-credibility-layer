import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import LightSectionEffects from '@/components/LightSectionEffects';

interface LogoItem {
  src: string;
  alt: string;
  small?: boolean;
  large?: boolean;
}

interface LogoMarqueeProps {
  logos: LogoItem[];
  duration?: number;
  variant?: 'dark' | 'inline';
}

const LogoMarquee = forwardRef<HTMLDivElement, LogoMarqueeProps>(({ logos, duration = 28, variant = 'dark' }, ref) => {
  const doubled = [...logos, ...logos];
  const { theme } = useTheme();

  const isDarkVariant = variant === 'dark';
  const isActuallyDark = isDarkVariant && theme === 'dark';
  const isContrastLight = isDarkVariant && theme === 'light';

  const goldFilter = 'brightness(0) invert(67%) sepia(65%) saturate(400%) hue-rotate(358deg) brightness(92%)';

  const bgClass = isActuallyDark
    ? 'bg-primary py-6 md:py-10 lg:py-14'
    : isContrastLight
      ? 'bg-[hsl(38,16%,92%)] py-6 md:py-10 lg:py-14'
      : 'py-5 md:py-8 lg:py-10';

  const fadeFromClass = isActuallyDark
    ? 'from-primary'
    : isContrastLight
      ? 'from-[hsl(38,16%,92%)]'
      : 'from-background';

  const logoOpacity = isActuallyDark
    ? 'opacity-80 hover:opacity-100'
    : isContrastLight
      ? 'opacity-65 hover:opacity-90'
      : 'opacity-65 hover:opacity-85';

  const blendMode = isActuallyDark ? 'screen' : undefined;

  return (
    <div ref={ref} className={`relative overflow-hidden ${bgClass}`}>
      {/* Gold border accents for contrast light */}
      {isContrastLight && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-gold/10" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/10" />
        </>
      )}

      {/* Light section effects */}
      {isContrastLight && <LightSectionEffects variant="section" />}

      <div className={`absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r ${fadeFromClass} to-transparent`} />
      <div className={`absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l ${fadeFromClass} to-transparent`} />

      <motion.div
        className="flex items-center gap-8 md:gap-16 lg:gap-24 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ x: { repeat: Infinity, repeatType: 'loop', duration, ease: 'linear' } }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex items-center justify-center shrink-0 h-[48px] md:h-[72px] lg:h-[80px] transition-transform duration-500 hover:scale-110"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className={`w-auto object-contain h-[40px] md:h-[64px] lg:h-[72px] max-w-[140px] md:max-w-[240px] lg:max-w-[280px] ${logoOpacity}`}
              style={{
                filter: goldFilter,
                mixBlendMode: blendMode as any,
                transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
});

LogoMarquee.displayName = 'LogoMarquee';

export default LogoMarquee;