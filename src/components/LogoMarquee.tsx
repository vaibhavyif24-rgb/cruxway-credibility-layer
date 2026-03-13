import { motion } from 'framer-motion';

interface LogoItem {
  src: string;
  alt: string;
  /** Use smaller size for logos that are visually larger (e.g. square emblems) */
  small?: boolean;
}

interface LogoMarqueeProps {
  logos: LogoItem[];
  /** Duration in seconds for one full cycle */
  duration?: number;
  /** Use dark (Prussian blue) background */
  variant?: 'dark' | 'inline';
}

const LogoMarquee = ({ logos, duration = 28, variant = 'dark' }: LogoMarqueeProps) => {
  const doubled = [...logos, ...logos];
  const isDark = variant === 'dark';

  // Gold filter: converts any color logo to a warm gold monochrome
  const goldFilter = 'brightness(0) invert(67%) sepia(65%) saturate(400%) hue-rotate(358deg) brightness(92%)';

  return (
    <div
      className={`relative overflow-hidden ${
        isDark ? 'bg-primary py-12 md:py-16' : 'py-8 md:py-10'
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
        className="flex items-center gap-16 md:gap-24 lg:gap-28 w-max"
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
            className="flex items-center justify-center shrink-0 h-[56px] md:h-[68px]"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className={`w-auto object-contain transition-opacity duration-300 ${
                logo.small
                  ? 'h-[32px] md:h-[40px] max-w-[140px] md:max-w-[170px]'
                  : 'h-[48px] md:h-[60px] max-w-[180px] md:max-w-[220px]'
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
};

export default LogoMarquee;
