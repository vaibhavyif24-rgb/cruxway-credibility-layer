import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-crossroads.jpg';

/**
 * Landing page hero: crossroads photo with Ken Burns cinematic zoom + gold geometric line overlay.
 * Photo is behind a strong dark overlay so text remains fully readable.
 * Geometric lines are subtle and placed around the edges, never over central text area.
 */
const GeometricHero = () => {
  const lineStyle = {
    stroke: 'hsl(38 45% 55%)',
    strokeWidth: 0.5,
    fill: 'none',
  };

  const faintLine = {
    ...lineStyle,
    strokeWidth: 0.3,
    opacity: 0.4,
  };

  const draw = (delay: number, dur = 1.5) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: dur, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const pulse = (delay: number) => ({
    initial: { scale: 0, opacity: 0 },
    animate: { scale: [0, 1.2, 1], opacity: [0, 0.5, 0.25] },
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Crossroads photo with Ken Burns */}
      <motion.div
        className="absolute inset-0 z-[0]"
        initial={{ scale: 1.02 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 25, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      >
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          aria-hidden="true"
        />
      </motion.div>

      {/* Strong dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-deep/85 via-prussian/75 to-navy-deep/90" />

      {/* Geometric SVG — edges only, avoids center text area */}
      <svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full z-[2] opacity-60"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Peripheral lines — left side */}
        <motion.line x1="0" y1="600" x2="300" y2="450" {...draw(0.8)} style={faintLine} />
        <motion.line x1="0" y1="400" x2="250" y2="350" {...draw(1.0)} style={{ ...faintLine, strokeWidth: 0.2 }} />
        
        {/* Peripheral lines — right side */}
        <motion.line x1="1200" y1="600" x2="900" y2="450" {...draw(0.9)} style={faintLine} />
        <motion.line x1="1200" y1="400" x2="950" y2="350" {...draw(1.1)} style={{ ...faintLine, strokeWidth: 0.2 }} />

        {/* Bottom accent lines */}
        <motion.line x1="200" y1="700" x2="500" y2="650" {...draw(1.3)} style={{ ...faintLine, strokeWidth: 0.2 }} />
        <motion.line x1="700" y1="650" x2="1000" y2="700" {...draw(1.4)} style={{ ...faintLine, strokeWidth: 0.2 }} />

        {/* Top accent arc */}
        <motion.path d="M 100 100 Q 600 50 1100 100" {...draw(1.6, 2)} style={{ ...faintLine, strokeWidth: 0.2 }} />

        {/* Corner frames */}
        <motion.line x1="40" y1="40" x2="120" y2="40" {...draw(0.3, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.2 }} />
        <motion.line x1="40" y1="40" x2="40" y2="120" {...draw(0.4, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.2 }} />
        <motion.line x1="1160" y1="40" x2="1080" y2="40" {...draw(0.3, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.2 }} />
        <motion.line x1="1160" y1="40" x2="1160" y2="120" {...draw(0.4, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.2 }} />
        <motion.line x1="40" y1="760" x2="120" y2="760" {...draw(0.5, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.2 }} />
        <motion.line x1="40" y1="760" x2="40" y2="680" {...draw(0.6, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.2 }} />
        <motion.line x1="1160" y1="760" x2="1080" y2="760" {...draw(0.5, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.2 }} />
        <motion.line x1="1160" y1="760" x2="1160" y2="680" {...draw(0.6, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.2 }} />

        {/* Small node dots at periphery */}
        <motion.circle cx="300" cy="450" r="2" fill="hsl(38 45% 55%)" {...pulse(2.0)} />
        <motion.circle cx="900" cy="450" r="2" fill="hsl(38 45% 55%)" {...pulse(2.1)} />
        <motion.circle cx="250" cy="350" r="1.5" fill="hsl(38 45% 55%)" {...pulse(2.2)} />
        <motion.circle cx="950" cy="350" r="1.5" fill="hsl(38 45% 55%)" {...pulse(2.3)} />
      </svg>

      {/* Ambient glow — bottom center, behind text */}
      <motion.div
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full z-[2]"
        style={{ background: 'radial-gradient(circle, hsl(38 45% 55% / 0.05), transparent 70%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.5] }}
        transition={{ duration: 3, delay: 1.5, ease: 'easeOut' }}
      />
    </div>
  );
};

export default GeometricHero;
