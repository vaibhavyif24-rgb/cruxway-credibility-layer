import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-landing.jpg';

/**
 * Landing page hero: architectural glass facade with Ken Burns cinematic zoom
 * + refined gold geometric overlay. Strong dark overlay for text readability.
 */
const GeometricHero = () => {
  const draw = (delay: number, dur = 1.5) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: dur, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const goldColor = 'hsl(43 70% 50%)';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Architectural photo with Ken Burns + slow drift */}
      <motion.div
        className="absolute inset-[-10%] z-[0]"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.15 }}
        transition={{
          scale: { duration: 25, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
        }}
      >
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          aria-hidden="true"
        />
      </motion.div>

      {/* Strong dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-deep/92 via-prussian/85 to-navy-deep/95" />
      {/* Vignette */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, hsl(214 45% 8% / 0.5) 100%)'
      }} />

      {/* Minimal geometric SVG — architectural corner brackets + center diamond */}
      <svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full z-[2] opacity-50"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Corner brackets — top left */}
        <motion.line x1="60" y1="60" x2="140" y2="60" {...draw(0.4, 0.8)} style={{ stroke: goldColor, strokeWidth: 0.4, fill: 'none' }} />
        <motion.line x1="60" y1="60" x2="60" y2="140" {...draw(0.5, 0.8)} style={{ stroke: goldColor, strokeWidth: 0.4, fill: 'none' }} />

        {/* Corner brackets — top right */}
        <motion.line x1="1140" y1="60" x2="1060" y2="60" {...draw(0.4, 0.8)} style={{ stroke: goldColor, strokeWidth: 0.4, fill: 'none' }} />
        <motion.line x1="1140" y1="60" x2="1140" y2="140" {...draw(0.5, 0.8)} style={{ stroke: goldColor, strokeWidth: 0.4, fill: 'none' }} />

        {/* Corner brackets — bottom left */}
        <motion.line x1="60" y1="740" x2="140" y2="740" {...draw(0.6, 0.8)} style={{ stroke: goldColor, strokeWidth: 0.4, fill: 'none' }} />
        <motion.line x1="60" y1="740" x2="60" y2="660" {...draw(0.7, 0.8)} style={{ stroke: goldColor, strokeWidth: 0.4, fill: 'none' }} />

        {/* Corner brackets — bottom right */}
        <motion.line x1="1140" y1="740" x2="1060" y2="740" {...draw(0.6, 0.8)} style={{ stroke: goldColor, strokeWidth: 0.4, fill: 'none' }} />
        <motion.line x1="1140" y1="740" x2="1140" y2="660" {...draw(0.7, 0.8)} style={{ stroke: goldColor, strokeWidth: 0.4, fill: 'none' }} />

        {/* Center diamond accent */}
        <motion.path
          d="M 600 370 L 615 400 L 600 430 L 585 400 Z"
          {...draw(1.2, 1.2)}
          style={{ stroke: goldColor, strokeWidth: 0.5, fill: 'none' }}
        />
      </svg>

      {/* Ambient gold glow — subtle center warmth */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full z-[2]"
        style={{ background: 'radial-gradient(circle, hsl(43 70% 50% / 0.04), transparent 70%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.7] }}
        transition={{ duration: 3, delay: 1, ease: 'easeOut' }}
      />

      {/* Floating light particles — minimal */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-gold/15 z-[2]"
          style={{ left: `${25 + i * 25}%`, top: `${30 + (i % 2) * 25}%` }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.3, 0], y: [-5, -30] }}
          transition={{
            duration: 6 + i,
            delay: 3 + i * 1.5,
            repeat: Infinity,
            repeatDelay: 5 + i,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

export default GeometricHero;
