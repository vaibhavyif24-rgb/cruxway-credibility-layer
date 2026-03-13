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
        className="flex items-center gap-12 md:gap-16 lg:gap-20 w-max"
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
              className={`h-[28px] md:h-[36px] w-auto object-contain ${
                isDark ? 'opacity-60 brightness-150' : 'opacity-50'
              } hover:opacity-80 transition-opacity duration-300`}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoMarquee;
