import { motion } from 'framer-motion';

/**
 * Landing page hero: deep dark abstract background with subtle gold geometric
 * accents — compass rose motif suggesting navigation & direction.
 * No photo dependency. Premium institutional aesthetic.
 */
const GeometricHero = () => {
  const gold = 'hsl(43 70% 50%)';
  const goldFaint = 'hsl(43 70% 50% / 0.12)';
  const goldMid = 'hsl(43 70% 50% / 0.25)';

  const draw = (delay: number, dur = 1.8) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: dur, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const fadeIn = (delay: number, dur = 1.2) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: dur, delay, ease: 'easeOut' as const },
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Deep layered gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 45%, hsl(220 35% 12%) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 30% 70%, hsl(220 40% 8% / 0.8) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 30%, hsl(228 35% 10% / 0.6) 0%, transparent 60%),
            linear-gradient(175deg, hsl(222 42% 7%) 0%, hsl(220 38% 9%) 40%, hsl(225 35% 8%) 100%)
          `,
        }}
      />

      {/* Very subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Central compass/crossroads geometric motif */}
      <svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full z-[2]"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Central cross — the "crux" / decision point */}
        <motion.line x1="600" y1="280" x2="600" y2="520" {...draw(0.6, 2.0)} style={{ stroke: goldFaint, strokeWidth: 0.5 }} />
        <motion.line x1="480" y1="400" x2="720" y2="400" {...draw(0.8, 2.0)} style={{ stroke: goldFaint, strokeWidth: 0.5 }} />

        {/* Radiating diagonal paths — choices branching out */}
        <motion.line x1="600" y1="400" x2="380" y2="260" {...draw(1.0, 2.2)} style={{ stroke: goldFaint, strokeWidth: 0.3 }} />
        <motion.line x1="600" y1="400" x2="820" y2="260" {...draw(1.1, 2.2)} style={{ stroke: goldFaint, strokeWidth: 0.3 }} />
        <motion.line x1="600" y1="400" x2="380" y2="540" {...draw(1.2, 2.2)} style={{ stroke: goldFaint, strokeWidth: 0.3 }} />
        <motion.line x1="600" y1="400" x2="820" y2="540" {...draw(1.3, 2.2)} style={{ stroke: goldFaint, strokeWidth: 0.3 }} />

        {/* Concentric circles — precision, compass feel */}
        <motion.circle cx="600" cy="400" r="60" {...draw(1.4, 2.5)} style={{ stroke: goldFaint, strokeWidth: 0.4, fill: 'none' }} />
        <motion.circle cx="600" cy="400" r="120" {...draw(1.6, 2.8)} style={{ stroke: `hsl(43 70% 50% / 0.06)`, strokeWidth: 0.3, fill: 'none' }} />
        <motion.circle cx="600" cy="400" r="200" {...draw(1.8, 3.0)} style={{ stroke: `hsl(43 70% 50% / 0.04)`, strokeWidth: 0.3, fill: 'none' }} />

        {/* Small cardinal markers */}
        <motion.circle cx="600" cy="280" r="2" fill={gold} {...fadeIn(2.2)} style={{ opacity: 0.2 }} />
        <motion.circle cx="600" cy="520" r="2" fill={gold} {...fadeIn(2.3)} style={{ opacity: 0.2 }} />
        <motion.circle cx="480" cy="400" r="2" fill={gold} {...fadeIn(2.4)} style={{ opacity: 0.2 }} />
        <motion.circle cx="720" cy="400" r="2" fill={gold} {...fadeIn(2.5)} style={{ opacity: 0.2 }} />

        {/* Corner brackets — institutional framing */}
        <motion.line x1="50" y1="50" x2="110" y2="50" {...draw(0.3, 0.8)} style={{ stroke: goldMid, strokeWidth: 0.4 }} />
        <motion.line x1="50" y1="50" x2="50" y2="110" {...draw(0.4, 0.8)} style={{ stroke: goldMid, strokeWidth: 0.4 }} />
        <motion.line x1="1150" y1="50" x2="1090" y2="50" {...draw(0.3, 0.8)} style={{ stroke: goldMid, strokeWidth: 0.4 }} />
        <motion.line x1="1150" y1="50" x2="1150" y2="110" {...draw(0.4, 0.8)} style={{ stroke: goldMid, strokeWidth: 0.4 }} />
        <motion.line x1="50" y1="750" x2="110" y2="750" {...draw(0.5, 0.8)} style={{ stroke: goldMid, strokeWidth: 0.4 }} />
        <motion.line x1="50" y1="750" x2="50" y2="690" {...draw(0.6, 0.8)} style={{ stroke: goldMid, strokeWidth: 0.4 }} />
        <motion.line x1="1150" y1="750" x2="1090" y2="750" {...draw(0.5, 0.8)} style={{ stroke: goldMid, strokeWidth: 0.4 }} />
        <motion.line x1="1150" y1="750" x2="1150" y2="690" {...draw(0.6, 0.8)} style={{ stroke: goldMid, strokeWidth: 0.4 }} />
      </svg>

      {/* Central ambient gold glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-[1]"
        style={{ background: `radial-gradient(circle, hsl(43 70% 50% / 0.04), transparent 60%)` }}
        {...fadeIn(1.0, 2.0)}
      />

      {/* Subtle floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px rounded-full bg-gold/15 z-[2]"
          style={{ left: `${25 + i * 13}%`, top: `${30 + (i % 3) * 15}%` }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.3, 0], y: [-3, -20] }}
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
