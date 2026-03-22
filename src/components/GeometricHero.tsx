import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-crossroads.jpg';

/**
 * Landing page hero: crossroads photo with Ken Burns cinematic zoom + gold geometric line overlay.
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
    opacity: 0.5,
  };

  const draw = (delay: number, dur = 1.5) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: dur, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const pulse = (delay: number) => ({
    initial: { scale: 0, opacity: 0 },
    animate: { scale: [0, 1.2, 1], opacity: [0, 0.6, 0.35] },
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Crossroads photo with Ken Burns effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.15 }}
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

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-prussian/70 to-navy-deep/85" />

      {/* Geometric SVG lines on top */}
      <svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Main diagonal lines forming a crossroads */}
        <motion.line x1="0" y1="500" x2="600" y2="400" {...draw(0.5)} style={lineStyle} />
        <motion.line x1="1200" y1="500" x2="600" y2="400" {...draw(0.7)} style={lineStyle} />
        <motion.line x1="600" y1="400" x2="600" y2="100" {...draw(1.0, 1.2)} style={lineStyle} />
        <motion.line x1="600" y1="400" x2="400" y2="200" {...draw(1.2)} style={faintLine} />
        <motion.line x1="600" y1="400" x2="800" y2="200" {...draw(1.3)} style={faintLine} />

        {/* Radiating network lines */}
        <motion.line x1="600" y1="400" x2="200" y2="350" {...draw(1.5)} style={faintLine} />
        <motion.line x1="600" y1="400" x2="1000" y2="350" {...draw(1.6)} style={faintLine} />
        <motion.line x1="600" y1="400" x2="350" y2="600" {...draw(1.7)} style={faintLine} />
        <motion.line x1="600" y1="400" x2="850" y2="600" {...draw(1.8)} style={faintLine} />

        {/* Horizontal accent lines */}
        <motion.line x1="100" y1="400" x2="500" y2="400" {...draw(1.4)} style={{ ...faintLine, strokeWidth: 0.2 }} />
        <motion.line x1="700" y1="400" x2="1100" y2="400" {...draw(1.5)} style={{ ...faintLine, strokeWidth: 0.2 }} />

        {/* Subtle arc */}
        <motion.path
          d="M 300 600 Q 600 250 900 600"
          {...draw(2.0, 2)}
          style={{ ...faintLine, strokeWidth: 0.25 }}
        />

        {/* Diamond at intersection */}
        <motion.path
          d="M 600 380 L 615 400 L 600 420 L 585 400 Z"
          {...draw(2.2, 0.8)}
          style={{ ...lineStyle, strokeWidth: 0.8 }}
        />

        {/* Node dots */}
        <motion.circle cx="600" cy="400" r="3" fill="hsl(38 45% 55%)" {...pulse(2.4)} />
        <motion.circle cx="200" cy="350" r="1.5" fill="hsl(38 45% 55%)" {...pulse(2.6)} />
        <motion.circle cx="1000" cy="350" r="1.5" fill="hsl(38 45% 55%)" {...pulse(2.7)} />
        <motion.circle cx="400" cy="200" r="1.5" fill="hsl(38 45% 55%)" {...pulse(2.8)} />
        <motion.circle cx="800" cy="200" r="1.5" fill="hsl(38 45% 55%)" {...pulse(2.9)} />
        <motion.circle cx="600" cy="100" r="2" fill="hsl(38 45% 55%)" {...pulse(2.5)} />

        {/* Corner frame lines */}
        <motion.line x1="40" y1="40" x2="140" y2="40" {...draw(0.3, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.25 }} />
        <motion.line x1="40" y1="40" x2="40" y2="140" {...draw(0.4, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.25 }} />
        <motion.line x1="1160" y1="40" x2="1060" y2="40" {...draw(0.3, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.25 }} />
        <motion.line x1="1160" y1="40" x2="1160" y2="140" {...draw(0.4, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.25 }} />
        <motion.line x1="40" y1="760" x2="140" y2="760" {...draw(0.5, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.25 }} />
        <motion.line x1="40" y1="760" x2="40" y2="660" {...draw(0.6, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.25 }} />
        <motion.line x1="1160" y1="760" x2="1060" y2="760" {...draw(0.5, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.25 }} />
        <motion.line x1="1160" y1="760" x2="1160" y2="660" {...draw(0.6, 0.8)} style={{ ...lineStyle, strokeWidth: 0.3, opacity: 0.25 }} />
      </svg>

      {/* Ambient glow at intersection */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, hsl(38 45% 55% / 0.08), transparent 70%)' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0.7], scale: [0.5, 1.1, 1] }}
        transition={{ duration: 3, delay: 1.5, ease: 'easeOut' }}
      />

      {/* Slow-rotating subtle ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-gold/[0.06]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default GeometricHero;
