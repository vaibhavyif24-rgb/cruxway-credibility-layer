import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import LightSectionEffects from '@/components/LightSectionEffects';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoItem {
  src: string;
  alt: string;
  small?: boolean;
  large?: boolean;
  scale?: number;
}

interface LogoMarqueeProps {
  logos: LogoItem[];
  duration?: number;
  variant?: 'dark' | 'inline';
}

const LogoMarquee = forwardRef<HTMLDivElement, LogoMarqueeProps>(({ logos, duration = 55, variant = 'dark' }, ref) => {
  const doubled = [...logos, ...logos];
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const baseHeight = isMobile ? 34 : 80;
  const baseMaxWidth = isMobile ? 120 : 280;
  const containerHeight = isMobile ? 40 : 96;

  const isDarkVariant = variant === 'dark';
  const isActuallyDark = isDarkVariant && theme === 'dark';
  const isContrastLight = isDarkVariant && theme === 'light';

  const goldFilter = 'brightness(0) invert(55%) sepia(60%) saturate(500%) hue-rotate(8deg) brightness(100%)';

  const bgClass = isActuallyDark
    ? 'bg-primary py-4 md:py-6 lg:py-8'
    : isContrastLight
      ? 'bg-[hsl(40,20%,91%)] py-4 md:py-6 lg:py-8'
      : 'py-3 md:py-5 lg:py-6';

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
      {isContrastLight && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-gold/20" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/20" />
        </>
      )}
      {isContrastLight && <LightSectionEffects variant="section" />}

      <div className={`absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r ${fadeFromClass} to-transparent`} />
      <div className={`absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l ${fadeFromClass} to-transparent`} />

      <motion.div
        className="flex items-center gap-6 md:gap-10 lg:gap-14 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ x: { repeat: Infinity, repeatType: 'loop', duration, ease: 'linear' } }}
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        {doubled.map((logo, i) => {
          const clampedScale = Math.max(0.7, Math.min(1.3, logo.scale || 1));
          return (
            <div
              key={`${logo.alt}-${i}`}
              className="flex items-center justify-center shrink-0 transition-transform duration-500 hover:scale-110"
              style={{
                height: `${Math.round(clampedScale * containerHeight)}px`,
                transform: `translateY(${Math.sin(i * 0.6) * 3}px)`,
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className={`w-auto object-contain ${logoOpacity}`}
                style={{
                  height: `${Math.round(clampedScale * baseHeight)}px`,
                  maxWidth: `${Math.round(clampedScale * baseMaxWidth)}px`,
                  filter: goldFilter,
                  mixBlendMode: blendMode as any,
                  transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                loading="lazy"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
});

LogoMarquee.displayName = 'LogoMarquee';

export default LogoMarquee;
