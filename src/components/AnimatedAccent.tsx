import { motion } from 'framer-motion';

/**
 * Premium animated accent block replacing handshake/stock photos.
 * Uses geometric shapes, animated lines, and gold accents.
 */
const AnimatedAccent = ({ variant = 'default' }: { variant?: 'default' | 'partnership' | 'industry' }) => {
  const draw = (delay: number, dur = 1.2) => ({
    initial: { pathLength: 0, opacity: 0 } as const,
    whileInView: { pathLength: 1, opacity: 1 } as const,
    viewport: { once: true } as const,
    transition: { duration: dur, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="relative overflow-hidden rounded-sm aspect-[4/3] bg-gradient-to-br from-primary/[0.03] to-primary/[0.08] dark:from-primary-foreground/[0.02] dark:to-primary-foreground/[0.05] border border-foreground/[0.04]">
      {/* SVG geometric pattern */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {variant === 'partnership' ? (
          <>
            {/* Two converging paths → partnership metaphor */}
            <motion.path d="M 50 250 Q 150 200 200 150" {...draw(0.2)} stroke="hsl(38 45% 55%)" strokeWidth="0.6" fill="none" />
            <motion.path d="M 350 250 Q 250 200 200 150" {...draw(0.4)} stroke="hsl(38 45% 55%)" strokeWidth="0.6" fill="none" />
            <motion.line x1="200" y1="150" x2="200" y2="50" {...draw(0.7)} stroke="hsl(38 45% 55%)" strokeWidth="0.6" fill="none" />
            <motion.circle cx="200" cy="150" r="4" fill="hsl(38 45% 55%)" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.5 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.9 }} />
            <motion.circle cx="200" cy="50" r="2.5" fill="hsl(38 45% 55%)" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.35 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1.1 }} />
            {/* Subtle radiating lines */}
            <motion.line x1="200" y1="150" x2="120" y2="100" {...draw(1.0, 0.8)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.4} />
            <motion.line x1="200" y1="150" x2="280" y2="100" {...draw(1.1, 0.8)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.4} />
            <motion.line x1="200" y1="150" x2="150" y2="220" {...draw(1.2, 0.8)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.3} />
            <motion.line x1="200" y1="150" x2="250" y2="220" {...draw(1.3, 0.8)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.3} />
          </>
        ) : variant === 'industry' ? (
          <>
            {/* Grid-like pattern → industry/structure metaphor */}
            <motion.rect x="100" y="80" width="80" height="80" {...draw(0.2)} stroke="hsl(38 45% 55%)" strokeWidth="0.4" fill="none" opacity={0.5} />
            <motion.rect x="220" y="80" width="80" height="80" {...draw(0.4)} stroke="hsl(38 45% 55%)" strokeWidth="0.4" fill="none" opacity={0.5} />
            <motion.rect x="160" y="140" width="80" height="80" {...draw(0.6)} stroke="hsl(38 45% 55%)" strokeWidth="0.5" fill="none" opacity={0.6} />
            <motion.line x1="140" y1="120" x2="220" y2="120" {...draw(0.8)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.35} />
            <motion.line x1="200" y1="80" x2="200" y2="220" {...draw(0.9)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.35} />
            <motion.circle cx="200" cy="150" r="3" fill="hsl(38 45% 55%)" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.4 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.1 }} />
          </>
        ) : (
          <>
            {/* Default abstract diamond */}
            <motion.path d="M 200 60 L 320 150 L 200 240 L 80 150 Z" {...draw(0.3, 1.5)} stroke="hsl(38 45% 55%)" strokeWidth="0.5" fill="none" />
            <motion.line x1="200" y1="60" x2="200" y2="240" {...draw(0.8)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.3} />
            <motion.line x1="80" y1="150" x2="320" y2="150" {...draw(0.9)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.3} />
            <motion.circle cx="200" cy="150" r="3" fill="hsl(38 45% 55%)" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.45 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.2 }} />
          </>
        )}

        {/* Corner marks */}
        <motion.line x1="20" y1="20" x2="50" y2="20" {...draw(0.1, 0.6)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.2} />
        <motion.line x1="20" y1="20" x2="20" y2="50" {...draw(0.15, 0.6)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.2} />
        <motion.line x1="380" y1="280" x2="350" y2="280" {...draw(0.2, 0.6)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.2} />
        <motion.line x1="380" y1="280" x2="380" y2="250" {...draw(0.25, 0.6)} stroke="hsl(38 45% 55%)" strokeWidth="0.3" fill="none" opacity={0.2} />
      </svg>

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
        style={{ background: 'radial-gradient(circle, hsl(38 45% 55% / 0.05), transparent 70%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Slow pulse ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-gold/[0.06]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default AnimatedAccent;
