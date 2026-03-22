import { motion } from 'framer-motion';

/**
 * Premium animated accent compositions — network, growth, and convergence metaphors
 * for institutional PE branding. No stock photos.
 */
const AnimatedAccent = ({ variant = 'default' }: { variant?: 'default' | 'partnership' | 'industry' }) => {
  const draw = (delay: number, dur = 1.2) => ({
    initial: { pathLength: 0, opacity: 0 } as const,
    whileInView: { pathLength: 1, opacity: 1 } as const,
    viewport: { once: true } as const,
    transition: { duration: dur, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const nodeAppear = (delay: number, finalOpacity = 0.5) => ({
    initial: { scale: 0, opacity: 0 } as const,
    whileInView: { scale: 1, opacity: finalOpacity } as const,
    viewport: { once: true } as const,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="relative overflow-hidden rounded-sm aspect-[4/3] border border-foreground/[0.04] dark:border-primary-foreground/[0.04] bg-gradient-to-br from-cream to-background dark:from-primary/30 dark:to-navy-deep/40">
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {variant === 'partnership' ? (
          <>
            {/* Convergence: two paths meeting at a central point — partnership */}
            <motion.path d="M 40 260 C 120 220 160 170 200 140" {...draw(0.2, 1.4)} stroke="hsl(38 45% 55%)" strokeWidth="0.7" fill="none" />
            <motion.path d="M 360 260 C 280 220 240 170 200 140" {...draw(0.4, 1.4)} stroke="hsl(38 45% 55%)" strokeWidth="0.7" fill="none" />
            <motion.path d="M 200 140 L 200 40" {...draw(0.9, 1.0)} stroke="hsl(38 45% 55%)" strokeWidth="0.8" fill="none" />

            {/* Branching network from center */}
            <motion.path d="M 200 140 C 160 120 130 80 100 70" {...draw(1.2, 1.0)} stroke="hsl(38 45% 55%)" strokeWidth="0.35" fill="none" opacity={0.45} />
            <motion.path d="M 200 140 C 240 120 270 80 300 70" {...draw(1.3, 1.0)} stroke="hsl(38 45% 55%)" strokeWidth="0.35" fill="none" opacity={0.45} />
            <motion.path d="M 200 140 C 170 170 140 190 110 200" {...draw(1.4, 0.8)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.35} />
            <motion.path d="M 200 140 C 230 170 260 190 290 200" {...draw(1.5, 0.8)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.35} />

            {/* Nodes at endpoints */}
            <motion.circle cx="200" cy="140" r="5" fill="hsl(38 45% 55%)" {...nodeAppear(1.0, 0.6)} />
            <motion.circle cx="200" cy="40" r="3" fill="hsl(38 45% 55%)" {...nodeAppear(1.5, 0.4)} />
            <motion.circle cx="100" cy="70" r="2" fill="hsl(38 45% 55%)" {...nodeAppear(1.6, 0.3)} />
            <motion.circle cx="300" cy="70" r="2" fill="hsl(38 45% 55%)" {...nodeAppear(1.7, 0.3)} />
            <motion.circle cx="110" cy="200" r="1.5" fill="hsl(38 45% 55%)" {...nodeAppear(1.8, 0.25)} />
            <motion.circle cx="290" cy="200" r="1.5" fill="hsl(38 45% 55%)" {...nodeAppear(1.9, 0.25)} />

            {/* Growth ring around center */}
            <motion.circle cx="200" cy="140" r="20" stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" {...draw(1.6, 1.0)} opacity={0.2} />
            <motion.circle cx="200" cy="140" r="40" stroke="hsl(38 45% 55%)" strokeWidth="0.2" fill="none" {...draw(1.8, 1.2)} opacity={0.12} />
          </>
        ) : variant === 'industry' ? (
          <>
            {/* Structured grid: pillars of industry with connecting infrastructure */}
            {/* Vertical pillars */}
            <motion.line x1="100" y1="250" x2="100" y2="80" {...draw(0.2, 1.2)} stroke="hsl(38 45% 55%)" strokeWidth="0.6" fill="none" opacity={0.5} />
            <motion.line x1="200" y1="250" x2="200" y2="50" {...draw(0.4, 1.4)} stroke="hsl(38 45% 55%)" strokeWidth="0.7" fill="none" opacity={0.6} />
            <motion.line x1="300" y1="250" x2="300" y2="90" {...draw(0.3, 1.2)} stroke="hsl(38 45% 55%)" strokeWidth="0.6" fill="none" opacity={0.5} />

            {/* Horizontal connecting beams */}
            <motion.line x1="80" y1="120" x2="320" y2="120" {...draw(0.8, 1.0)} stroke="hsl(38 45% 55%)" strokeWidth="0.4" fill="none" opacity={0.35} />
            <motion.line x1="90" y1="180" x2="310" y2="180" {...draw(1.0, 1.0)} stroke="hsl(38 45% 55%)" strokeWidth="0.35" fill="none" opacity={0.3} />

            {/* Diagonal braces */}
            <motion.line x1="100" y1="120" x2="200" y2="180" {...draw(1.2, 0.8)} stroke="hsl(38 45% 55%)" strokeWidth="0.25" fill="none" opacity={0.25} />
            <motion.line x1="300" y1="120" x2="200" y2="180" {...draw(1.3, 0.8)} stroke="hsl(38 45% 55%)" strokeWidth="0.25" fill="none" opacity={0.25} />

            {/* Growth arrow */}
            <motion.path d="M 200 50 L 195 60 M 200 50 L 205 60" {...draw(1.0, 0.6)} stroke="hsl(38 45% 55%)" strokeWidth="0.6" fill="none" opacity={0.5} />

            {/* Node intersections */}
            <motion.circle cx="100" cy="120" r="2.5" fill="hsl(38 45% 55%)" {...nodeAppear(1.4, 0.4)} />
            <motion.circle cx="200" cy="120" r="3" fill="hsl(38 45% 55%)" {...nodeAppear(1.5, 0.5)} />
            <motion.circle cx="300" cy="120" r="2.5" fill="hsl(38 45% 55%)" {...nodeAppear(1.6, 0.4)} />
            <motion.circle cx="200" cy="180" r="2" fill="hsl(38 45% 55%)" {...nodeAppear(1.7, 0.35)} />

            {/* Base line */}
            <motion.line x1="60" y1="250" x2="340" y2="250" {...draw(0.1, 1.0)} stroke="hsl(38 45% 55%)" strokeWidth="0.5" fill="none" opacity={0.4} />
          </>
        ) : (
          <>
            {/* Default: abstract diamond network — institutional gravitas */}
            <motion.path d="M 200 50 L 340 150 L 200 250 L 60 150 Z" {...draw(0.3, 1.8)} stroke="hsl(38 45% 55%)" strokeWidth="0.6" fill="none" />
            <motion.line x1="200" y1="50" x2="200" y2="250" {...draw(0.9)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.3} />
            <motion.line x1="60" y1="150" x2="340" y2="150" {...draw(1.0)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.3} />

            {/* Inner diamond */}
            <motion.path d="M 200 100 L 270 150 L 200 200 L 130 150 Z" {...draw(1.2, 1.2)} stroke="hsl(38 45% 55%)" strokeWidth="0.4" fill="none" opacity={0.4} />

            {/* Nodes */}
            <motion.circle cx="200" cy="150" r="4" fill="hsl(38 45% 55%)" {...nodeAppear(1.5, 0.5)} />
            <motion.circle cx="200" cy="50" r="2" fill="hsl(38 45% 55%)" {...nodeAppear(1.6, 0.35)} />
            <motion.circle cx="340" cy="150" r="2" fill="hsl(38 45% 55%)" {...nodeAppear(1.7, 0.35)} />
            <motion.circle cx="200" cy="250" r="2" fill="hsl(38 45% 55%)" {...nodeAppear(1.8, 0.35)} />
            <motion.circle cx="60" cy="150" r="2" fill="hsl(38 45% 55%)" {...nodeAppear(1.9, 0.35)} />
          </>
        )}

        {/* Corner marks */}
        <motion.line x1="15" y1="15" x2="45" y2="15" {...draw(0.1, 0.6)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.2} />
        <motion.line x1="15" y1="15" x2="15" y2="45" {...draw(0.15, 0.6)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.2} />
        <motion.line x1="385" y1="285" x2="355" y2="285" {...draw(0.2, 0.6)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.2} />
        <motion.line x1="385" y1="285" x2="385" y2="255" {...draw(0.25, 0.6)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.2} />
      </svg>

      {/* Ambient center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
        style={{ background: 'radial-gradient(circle, hsl(38 45% 55% / 0.06), transparent 70%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Slow pulse ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full border border-gold/[0.06]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default AnimatedAccent;
