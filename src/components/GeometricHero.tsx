import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-forking-road.jpg';

/**
 * Landing page hero: cinematic mountain ridge with Ken Burns zoom + parallax drift.
 * Minimal gold accent lines keep the focus on the photograph.
 */
const GeometricHero = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Photo with Ken Burns cinematic zoom + slow drift */}
      <motion.div
        className="absolute inset-[-10%] z-[0]"
        initial={{ scale: 1.0, x: 0 }}
        animate={{ scale: 1.18, x: [0, 15, -10, 5, 0] }}
        transition={{
          scale: { duration: 26, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
          x: { duration: 34, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
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

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-deep/85 via-prussian/70 to-navy-deep/90" />
      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, hsl(214 45% 8% / 0.5) 100%)',
        }}
      />

      {/* Minimal corner brackets — clean, institutional */}
      <svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full z-[2] opacity-40"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Top-left */}
        <motion.line x1="50" y1="50" x2="130" y2="50" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }} />
        <motion.line x1="50" y1="50" x2="50" y2="130" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} />
        {/* Top-right */}
        <motion.line x1="1150" y1="50" x2="1070" y2="50" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }} />
        <motion.line x1="1150" y1="50" x2="1150" y2="130" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} />
        {/* Bottom-left */}
        <motion.line x1="50" y1="750" x2="130" y2="750" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }} />
        <motion.line x1="50" y1="750" x2="50" y2="670" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }} />
        {/* Bottom-right */}
        <motion.line x1="1150" y1="750" x2="1070" y2="750" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }} />
        <motion.line x1="1150" y1="750" x2="1150" y2="670" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }} />
      </svg>

      {/* Subtle ambient glow at center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full z-[2]"
        style={{ background: 'radial-gradient(circle, hsl(43 70% 50% / 0.04), transparent 70%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6] }}
        transition={{ duration: 3, delay: 1.2, ease: 'easeOut' }}
      />
    </div>
  );
};

export default GeometricHero;
