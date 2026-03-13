import { motion } from 'framer-motion';

interface LogoItem {
  src: string;
  alt: string;
}

interface LogoMarqueeProps {
  logos: LogoItem[];
  /** Duration in seconds for one full cycle */
  duration?: number;
  /** Use dark (Prussian blue) background */
  variant?: 'dark' | 'inline';
}

const LogoMarquee = ({ logos, duration = 28, variant = 'dark' }: LogoMarqueeProps) => {
  // Double logos for seamless loop
  const doubled = [...logos, ...logos];

  const isDark = variant === 'dark';

  return (
    <div
      className={`relative overflow-hidden ${
        isDark ? 'bg-primary py-10 md:py-14' : 'py-6 md:py-8'
      }`}
    >
      {/* Edge fade masks */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-r from-primary to-transparent'
            : 'bg-gradient-to-r from-background to-transparent'
        }`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-l from-primary to-transparent'
            : 'bg-gradient-to-l from-background to-transparent'
        }`}
      />

      <motion.div
        className="flex items-center gap-14 md:gap-20 lg:gap-24 w-max"
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
            className="flex items-center justify-center shrink-0"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className={`h-[38px] md:h-[48px] w-auto object-contain transition-all duration-300 ${
                isDark
                  ? 'brightness-0 invert sepia saturate-[3] hue-rotate-[5deg] opacity-70 hover:opacity-90'
                  : 'brightness-0 invert sepia saturate-[3] hue-rotate-[5deg] opacity-50 hover:opacity-75'
              }`}
              style={{
                filter: isDark
                  ? 'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(0.85)'
                  : 'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(0.75)',
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoMarquee;
