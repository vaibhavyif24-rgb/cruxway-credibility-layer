import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-forking-road.jpg';

/**
 * Landing page hero: crossroads photo with Ken Burns cinematic zoom + parallax drift
 * + gold geometric line overlay. Strong dark overlay for text readability.
 */
const GeometricHero = () => {
  const lineStyle = {
    stroke: 'hsl(43 70% 50%)',
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
      {/* Crossroads photo with Ken Burns + slow horizontal drift */}
      <motion.div
        className="absolute inset-[-10%] z-[0]"
        initial={{ scale: 1.0, x: 0 }}
        animate={{ scale: 1.22, x: [0, 25, -18, 8, 0] }}
        transition={{
          scale: { duration: 22, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
          x: { duration: 30, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
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
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-deep/90 via-prussian/80 to-navy-deep/92" />
      {/* Vignette */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at center, transparent 35%, hsl(214 45% 8% / 0.45) 100%)'
      }} />

      {/* Geometric SVG — edges only */}
      <svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full z-[2] opacity-60"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.line x1="0" y1="600" x2="300" y2="450" {...draw(0.8)} style={faintLine} />
        <motion.line x1="0" y1="400" x2="250" y2="350" {...draw(1.0)} style={{ ...faintLine, strokeWidth: 0.2 }} />
        <motion.line x1="1200" y1="600" x2="900" y2="450" {...draw(0.9)} style={faintLine} />
        <motion.line x1="1200" y1="400" x2="950" y2="350" {...draw(1.1)} style={{ ...faintLine, strokeWidth: 0.2 }} />
        <motion.line x1="200" y1="700" x2="500" y2="650" {...draw(1.3)} style={{ ...faintLine, strokeWidth: 0.2 }} />
        <motion.line x1="700" y1="650" x2="1000" y2="700" {...draw(1.4)} style={{ ...faintLine, strokeWidth: 0.2 }} />
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

        <motion.circle cx="300" cy="450" r="2" fill="hsl(43 70% 50%)" {...pulse(2.0)} />
        <motion.circle cx="900" cy="450" r="2" fill="hsl(43 70% 50%)" {...pulse(2.1)} />
        <motion.circle cx="250" cy="350" r="1.5" fill="hsl(43 70% 50%)" {...pulse(2.2)} />
        <motion.circle cx="950" cy="350" r="1.5" fill="hsl(43 70% 50%)" {...pulse(2.3)} />
      </svg>

      {/* Ambient glow */}
      <motion.div
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full z-[2]"
        style={{ background: 'radial-gradient(circle, hsl(43 70% 50% / 0.05), transparent 70%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.5] }}
        transition={{ duration: 3, delay: 1.5, ease: 'easeOut' }}
      />

      {/* Floating light particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-gold/20 z-[2]"
          style={{ left: `${20 + i * 20}%`, top: `${25 + (i % 2) * 30}%` }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.35, 0], y: [-5, -25] }}
          transition={{
            duration: 5 + i,
            delay: 3 + i * 1.2,
            repeat: Infinity,
            repeatDelay: 4 + i,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

export default GeometricHero;
