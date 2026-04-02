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
  compact?: boolean;
}

const LogoMarquee = forwardRef<HTMLDivElement, LogoMarqueeProps>(({ logos, duration = 55, variant = 'dark', compact = false }, ref) => {
  const doubled = [...logos, ...logos];
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const baseHeight = isMobile ? 40 : 96;
  const baseMaxWidth = isMobile ? 140 : 320;
  const containerHeight = isMobile ? 48 : 112;

  const isDarkVariant = variant === 'dark';
  const isActuallyDark = isDarkVariant && theme === 'dark';
  const isContrastLight = isDarkVariant && theme === 'light';

  const goldFilter = 'brightness(0) invert(55%) sepia(60%) saturate(500%) hue-rotate(8deg) brightness(100%)';

  const paddingClass = compact
    ? 'py-2 md:py-3 lg:py-4'
    : isDarkVariant ? 'py-5 md:py-8 lg:py-10' : 'py-4 md:py-6 lg:py-8';

  const bgClass = isActuallyDark
    ? `bg-primary ${paddingClass}`
    : isContrastLight
      ? `bg-[hsl(40,20%,91%)] ${paddingClass}`
      : paddingClass;

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
    <div ref={ref} className={`relative overflow-hidden ${bgClass}`} style={{ contain: 'layout style paint' }}>
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
        className={`flex items-center w-max ${compact ? 'gap-5 md:gap-8 lg:gap-10' : 'gap-8 md:gap-12 lg:gap-16'}`}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ x: { repeat: Infinity, repeatType: 'loop', duration, ease: 'linear' } }}
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        {doubled.map((logo, i) => {
          const clampedScale = Math.max(0.7, Math.min(2.0, logo.scale || 1));
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
