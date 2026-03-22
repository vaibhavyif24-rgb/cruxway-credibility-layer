import { motion } from 'framer-motion';

/**
 * Reusable cinematic hero background with Ken Burns zoom effect,
 * dark gradient overlay, and subtle gold geometric line accents.
 * Used across Home and About pages for consistent premium feel.
 */
interface CinematicHeroProps {
  imageSrc: string;
  /** Overlay intensity — 'strong' for hero sections with text, 'medium' for secondary */
  overlay?: 'strong' | 'medium';
}

const CinematicHero = ({ imageSrc, overlay = 'strong' }: CinematicHeroProps) => {
  const lineStyle = {
    stroke: 'hsl(38 45% 55%)',
    strokeWidth: 0.3,
    fill: 'none',
    opacity: 0.25,
  };

  const draw = (delay: number, dur = 1.5) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: dur, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Photo with Ken Burns cinematic zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.02 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 25, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      >
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          aria-hidden="true"
        />
      </motion.div>

      {/* Dark overlay for text readability */}
      <div
        className={`absolute inset-0 z-[1] ${
          overlay === 'strong'
            ? 'bg-gradient-to-t from-navy-deep/90 via-prussian/70 to-navy-deep/60'
            : 'bg-gradient-to-t from-navy-deep/85 via-prussian/60 to-navy-deep/50'
        }`}
      />

      {/* Peripheral geometric gold lines */}
      <svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full z-[2] opacity-50"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Corner frames */}
        <motion.line x1="30" y1="30" x2="100" y2="30" {...draw(0.3, 0.8)} style={lineStyle} />
        <motion.line x1="30" y1="30" x2="30" y2="100" {...draw(0.4, 0.8)} style={lineStyle} />
        <motion.line x1="1170" y1="30" x2="1100" y2="30" {...draw(0.3, 0.8)} style={lineStyle} />
        <motion.line x1="1170" y1="30" x2="1170" y2="100" {...draw(0.4, 0.8)} style={lineStyle} />
        <motion.line x1="30" y1="770" x2="100" y2="770" {...draw(0.5, 0.8)} style={lineStyle} />
        <motion.line x1="30" y1="770" x2="30" y2="700" {...draw(0.6, 0.8)} style={lineStyle} />
        <motion.line x1="1170" y1="770" x2="1100" y2="770" {...draw(0.5, 0.8)} style={lineStyle} />
        <motion.line x1="1170" y1="770" x2="1170" y2="700" {...draw(0.6, 0.8)} style={lineStyle} />

        {/* Subtle peripheral accent lines */}
        <motion.line x1="0" y1="600" x2="250" y2="480" {...draw(0.8)} style={{ ...lineStyle, strokeWidth: 0.2, opacity: 0.15 }} />
        <motion.line x1="1200" y1="600" x2="950" y2="480" {...draw(0.9)} style={{ ...lineStyle, strokeWidth: 0.2, opacity: 0.15 }} />

        {/* Small node dots */}
        <motion.circle
          cx="250" cy="480" r="1.5" fill="hsl(38 45% 55%)"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.8 }}
        />
        <motion.circle
          cx="950" cy="480" r="1.5" fill="hsl(38 45% 55%)"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.9 }}
        />
      </svg>

      {/* Ambient glow */}
      <motion.div
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[400px] h-[250px] rounded-full z-[2]"
        style={{ background: 'radial-gradient(circle, hsl(38 45% 55% / 0.04), transparent 70%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.4] }}
        transition={{ duration: 3, delay: 1.5, ease: 'easeOut' }}
      />
    </div>
  );
};

export default CinematicHero;
