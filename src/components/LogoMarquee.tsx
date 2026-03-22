import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';

interface LogoItem {
  src: string;
  alt: string;
  /** Use smaller size for logos that are visually larger (e.g. square emblems) */
  small?: boolean;
  /** Use larger size for logos that need more presence */
  large?: boolean;
}

interface LogoMarqueeProps {
  logos: LogoItem[];
  /** Duration in seconds for one full cycle */
  duration?: number;
  /** Use dark (Prussian blue) background */
  variant?: 'dark' | 'inline';
}

const LogoMarquee = forwardRef<HTMLDivElement, LogoMarqueeProps>(({ logos, duration = 28, variant = 'dark' }, ref) => {
  const doubled = [...logos, ...logos];
  const isDark = variant === 'dark';

  // Gold filter: converts any color logo to a warm gold monochrome
  const goldFilter = 'brightness(0) invert(67%) sepia(65%) saturate(400%) hue-rotate(358deg) brightness(92%)';

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${
        isDark ? 'bg-primary py-6 md:py-10 lg:py-14' : 'py-5 md:py-8 lg:py-10'
      }`}
    >
      {/* Edge fade masks */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-r from-primary to-transparent'
            : 'bg-gradient-to-r from-background to-transparent'
        }`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-l from-primary to-transparent'
            : 'bg-gradient-to-l from-background to-transparent'
        }`}
      />

      <motion.div
        className="flex items-center gap-8 md:gap-16 lg:gap-24 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration,
            ease: 'linear',
          },
        }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className={`flex items-center justify-center shrink-0 ${
              logo.large
                ? 'h-[52px] md:h-[80px] lg:h-[92px]'
                : 'h-[44px] md:h-[72px] lg:h-[80px]'
            }`}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className={`w-auto object-contain transition-opacity duration-300 ${
                logo.large
                  ? 'h-[48px] md:h-[76px] lg:h-[88px] max-w-[170px] md:max-w-[280px] lg:max-w-[320px]'
                  : logo.small
                    ? 'h-[36px] md:h-[56px] lg:h-[64px] max-w-[130px] md:max-w-[210px] lg:max-w-[240px]'
                    : 'h-[36px] md:h-[60px] lg:h-[72px] max-w-[130px] md:max-w-[220px] lg:max-w-[260px]'
              } ${isDark ? 'opacity-75 hover:opacity-95' : 'opacity-60 hover:opacity-80'}`}
              style={{
                filter: goldFilter,
                mixBlendMode: isDark ? 'screen' : undefined,
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
