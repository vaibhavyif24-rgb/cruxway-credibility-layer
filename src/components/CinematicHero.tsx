import { motion } from 'framer-motion';

/**
 * Reusable cinematic hero background with Ken Burns zoom effect,
 * dark gradient overlay, gold geometric line overlays,
 * floating particles, soft vignette, and ambient motion.
 */
interface CinematicHeroProps {
  imageSrc: string;
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
      {/* Photo with Ken Burns cinematic zoom + slow horizontal drift */}
      <motion.div
        className="absolute inset-[-5%]"
        initial={{ scale: 1.02, x: 0 }}
        animate={{ scale: 1.14, x: [0, 12, -8, 0] }}
        transition={{
          scale: { duration: 28, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
          x: { duration: 35, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
        }}
      >
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          aria-hidden="true"
        />
      </motion.div>

      {/* Dark overlay */}
      <div
        className={`absolute inset-0 z-[1] ${
          overlay === 'strong'
            ? 'bg-gradient-to-t from-navy-deep/95 via-prussian/80 to-navy-deep/70'
            : 'bg-gradient-to-t from-navy-deep/90 via-prussian/65 to-navy-deep/55'
        }`}
      />

      {/* Vignette for edge darkening */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, hsl(214 45% 8% / 0.5) 100%)'
      }} />

      {/* Gold geometric overlay — corner frames */}
      <svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full z-[2] opacity-50"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Top-left corner */}
        <motion.line x1="30" y1="30" x2="100" y2="30" {...draw(0.3, 0.8)} style={lineStyle} />
        <motion.line x1="30" y1="30" x2="30" y2="100" {...draw(0.4, 0.8)} style={lineStyle} />
        {/* Top-right corner */}
        <motion.line x1="1170" y1="30" x2="1100" y2="30" {...draw(0.3, 0.8)} style={lineStyle} />
        <motion.line x1="1170" y1="30" x2="1170" y2="100" {...draw(0.4, 0.8)} style={lineStyle} />
        {/* Bottom-left corner */}
        <motion.line x1="30" y1="770" x2="100" y2="770" {...draw(0.5, 0.8)} style={lineStyle} />
        <motion.line x1="30" y1="770" x2="30" y2="700" {...draw(0.6, 0.8)} style={lineStyle} />
        {/* Bottom-right corner */}
        <motion.line x1="1170" y1="770" x2="1100" y2="770" {...draw(0.5, 0.8)} style={lineStyle} />
        <motion.line x1="1170" y1="770" x2="1170" y2="700" {...draw(0.6, 0.8)} style={lineStyle} />

        {/* Subtle diagonal accent lines */}
        <motion.line x1="0" y1="600" x2="250" y2="480" {...draw(0.8)} style={{ ...lineStyle, strokeWidth: 0.2, opacity: 0.15 }} />
        <motion.line x1="1200" y1="600" x2="950" y2="480" {...draw(0.9)} style={{ ...lineStyle, strokeWidth: 0.2, opacity: 0.15 }} />

        {/* Horizontal rule accent near bottom */}
        <motion.line x1="400" y1="720" x2="800" y2="720" {...draw(1.0, 1.2)} style={{ ...lineStyle, strokeWidth: 0.15, opacity: 0.1 }} />

        {/* Small diamond at center-bottom */}
        <motion.path
          d="M600 700 L605 710 L600 720 L595 710 Z"
          {...draw(1.2, 0.6)}
          style={{ ...lineStyle, strokeWidth: 0.25, opacity: 0.18 }}
        />

        {/* Node dots */}
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

      {/* Ambient gold glow */}
      <motion.div
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[400px] h-[250px] rounded-full z-[2]"
        style={{ background: 'radial-gradient(circle, hsl(38 45% 55% / 0.04), transparent 70%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.4] }}
        transition={{ duration: 3, delay: 1.5, ease: 'easeOut' }}
      />

      {/* Floating light particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-gold/20 z-[2]"
          style={{
            left: `${10 + i * 11}%`,
            top: `${25 + (i % 4) * 15}%`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.35, 0], y: [-5, -25] }}
          transition={{
            duration: 4 + i * 0.4,
            delay: 2 + i * 0.6,
            repeat: Infinity,
            repeatDelay: 3 + i * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Soft horizontal shimmer */}
      <motion.div
        className="absolute top-[40%] left-0 right-0 h-px z-[2]"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(38 45% 55% / 0.06), transparent)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 6, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default CinematicHero;
