import { motion } from 'framer-motion';

/**
 * Animated background effects for dark/blue sections.
 * Renders floating orbs, shimmer lines, and subtle particle effects
 * to give life and depth to Prussian Blue sections.
 */
const DarkSectionEffects = ({ variant = 'default' }: { variant?: 'default' | 'hero' | 'cta' }) => {
  return (
    <>
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/20 pointer-events-none" />

      {/* Floating gold orb - top right */}
      <div
        className="absolute top-[10%] right-[5%] w-[200px] h-[200px] md:w-[350px] md:h-[250px] rounded-full pointer-events-none float-orb-slow"
        style={{ background: 'radial-gradient(circle, hsl(38 45% 55% / 0.025), transparent 70%)' }}
      />

      {/* Floating prussian orb - bottom left */}
      <div
        className="absolute bottom-[5%] left-[2%] w-[250px] h-[180px] md:w-[400px] md:h-[280px] rounded-full pointer-events-none float-orb-medium"
        style={{ background: 'radial-gradient(circle, hsl(207 50% 18% / 0.25), transparent 70%)' }}
      />

      {/* Central pulsing glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none pulse-glow-effect"
        style={{ background: 'radial-gradient(circle, hsl(38 45% 55% / 1), transparent 60%)' }}
      />

      {/* Horizontal shimmer line */}
      <div className="absolute top-[30%] left-0 right-0 h-px pointer-events-none overflow-hidden">
        <div
          className="w-[200px] h-full shimmer-effect"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(38 45% 55% / 0.08), transparent)' }}
        />
      </div>

      {/* Animated corner accent - top left */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.03]">
          <line x1="0" y1="60" x2="60" y2="60" stroke="hsl(38 45% 55%)" strokeWidth="0.5" />
          <line x1="60" y1="0" x2="60" y2="60" stroke="hsl(38 45% 55%)" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="2" fill="hsl(38 45% 55%)" />
        </svg>
      </motion.div>

      {/* Animated corner accent - bottom right */}
      {variant === 'hero' && (
        <motion.div
          className="absolute bottom-0 right-0 pointer-events-none rotate-180"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.03]">
            <line x1="0" y1="60" x2="60" y2="60" stroke="hsl(38 45% 55%)" strokeWidth="0.5" />
            <line x1="60" y1="0" x2="60" y2="60" stroke="hsl(38 45% 55%)" strokeWidth="0.5" />
            <circle cx="60" cy="60" r="2" fill="hsl(38 45% 55%)" />
          </svg>
        </motion.div>
      )}

      {/* Subtle diagonal lines pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.008]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            135deg,
            transparent,
            transparent 40px,
            hsl(38 45% 55%) 40px,
            hsl(38 45% 55%) 40.5px
          )`,
        }}
      />
    </>
  );
};

export default DarkSectionEffects;
