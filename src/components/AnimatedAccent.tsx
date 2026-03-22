import { motion } from 'framer-motion';
import { useState } from 'react';

const AnimatedAccent = ({ variant = 'default' }: { variant?: 'default' | 'partnership' | 'industry' | 'criteria' | 'growth' }) => {
  const [hovered, setHovered] = useState(false);

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

  const fadeIn = (delay: number, finalOpacity = 0.5) => ({
    initial: { opacity: 0 } as const,
    whileInView: { opacity: finalOpacity } as const,
    viewport: { once: true } as const,
    transition: { duration: 0.6, delay } as const,
  });

  const goldStroke = 'hsl(38 45% 55%)';
  const goldFill = 'hsl(38 45% 55%)';

  return (
    <div
      className="relative overflow-hidden rounded-sm aspect-[4/3] border border-foreground/[0.04] dark:border-primary-foreground/[0.04] bg-gradient-to-br from-cream to-background dark:from-primary/30 dark:to-navy-deep/40 cursor-pointer group/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {variant === 'partnership' ? (
          <>
            {/* Axes */}
            <motion.line x1="50" y1="250" x2="370" y2="250" {...draw(0.1, 0.8)} stroke={goldStroke} strokeWidth="0.5" fill="none" opacity={0.3} />
            <motion.line x1="50" y1="250" x2="50" y2="40" {...draw(0.2, 0.8)} stroke={goldStroke} strokeWidth="0.5" fill="none" opacity={0.3} />

            {/* Subtle grid lines */}
            {[200, 150, 100].map((y, i) => (
              <motion.line key={y} x1="50" y1={y} x2="370" y2={y} {...draw(0.3 + i * 0.1, 0.6)} stroke={goldStroke} strokeWidth="0.2" fill="none" opacity={0.1} strokeDasharray="4 6" />
            ))}

            {/* Area fill under curve */}
            <motion.path
              d="M 60 238 C 90 235 120 228 150 215 C 180 200 210 175 240 145 C 270 110 300 75 345 45 L 345 250 L 60 250 Z"
              fill={goldFill}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.06 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />

            {/* Main growth curve */}
            <motion.path
              d="M 60 238 C 90 235 120 228 150 215 C 180 200 210 175 240 145 C 270 110 300 75 345 45"
              {...draw(0.4, 2.2)}
              stroke={goldStroke}
              strokeWidth="1.2"
              fill="none"
              opacity={0.7}
            />

            {/* Data points with hover pulse */}
            {[
              { x: 60, y: 238 }, { x: 120, y: 228 }, { x: 180, y: 200 },
              { x: 240, y: 145 }, { x: 300, y: 75 }, { x: 345, y: 45 },
            ].map((p, i) => (
              <g key={i}>
                <motion.circle
                  cx={p.x} cy={p.y} r="3"
                  fill={goldFill}
                  {...nodeAppear(1.0 + i * 0.12, 0.6)}
                  animate={hovered ? { r: [3, 4.5, 3], opacity: [0.6, 0.9, 0.6] } : {}}
                  transition={hovered ? { duration: 1.5, repeat: Infinity, delay: i * 0.15 } : { duration: 0.5, delay: 1.0 + i * 0.12 }}
                />
                {/* Vertical drop line */}
                <motion.line
                  x1={p.x} y1={p.y} x2={p.x} y2={250}
                  {...draw(1.2 + i * 0.08, 0.5)}
                  stroke={goldStroke} strokeWidth="0.2" fill="none" opacity={0.1} strokeDasharray="2 3"
                />
              </g>
            ))}

            {/* Glow at peak */}
            <motion.circle
              cx="345" cy="45" r="12"
              fill={goldFill}
              animate={{ opacity: [0.02, 0.1, 0.02], scale: [1, 1.4, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Arrow tip at peak */}
            <motion.path
              d="M 340 50 L 345 40 L 350 50"
              {...draw(2.0, 0.6)}
              stroke={goldStroke} strokeWidth="0.8" fill="none" opacity={0.5}
            />

            {/* Axis labels */}
            <motion.text x="210" y="268" fontSize="5" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-sans)" letterSpacing="0.15em" {...fadeIn(2.0, 0.2)}>
              TIME
            </motion.text>
            <motion.text x="30" y="145" fontSize="5" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-sans)" letterSpacing="0.15em" transform="rotate(-90,30,145)" {...fadeIn(2.1, 0.2)}>
              VALUE
            </motion.text>

            {/* Tagline */}
            <motion.text x="200" y="288" fontSize="14" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-serif)" fontStyle="italic" fontWeight="500" letterSpacing="0.02em" {...fadeIn(1.8, 0.85)}>
              "Building enduring value, together."
            </motion.text>
          </>
        ) : variant === 'industry' ? (
          <>
            {[
              { x: 70, h: 175 }, { x: 130, h: 200 }, { x: 190, h: 230 },
              { x: 250, h: 210 }, { x: 310, h: 185 }, { x: 370, h: 160 },
            ].map((p, i) => (
              <motion.line key={i} x1={p.x} y1={260} x2={p.x} y2={260 - p.h} {...draw(0.15 + i * 0.12, 1.2)} stroke={goldStroke} strokeWidth={i === 2 ? 0.8 : 0.5} fill="none" opacity={i === 2 ? 0.65 : 0.4} />
            ))}
            <motion.line x1="55" y1="110" x2="385" y2="110" {...draw(0.9, 1.0)} stroke={goldStroke} strokeWidth="0.35" fill="none" opacity={0.3} />
            <motion.line x1="65" y1="160" x2="375" y2="160" {...draw(1.1, 1.0)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.25} />
            <motion.line x1="75" y1="210" x2="365" y2="210" {...draw(1.3, 0.8)} stroke={goldStroke} strokeWidth="0.25" fill="none" opacity={0.2} />
            <motion.line x1="130" y1="110" x2="190" y2="160" {...draw(1.4, 0.7)} stroke={goldStroke} strokeWidth="0.2" fill="none" opacity={0.2} />
            <motion.line x1="250" y1="110" x2="190" y2="160" {...draw(1.5, 0.7)} stroke={goldStroke} strokeWidth="0.2" fill="none" opacity={0.2} />
            <motion.path d="M 190 30 L 185 42 M 190 30 L 195 42" {...draw(1.2, 0.6)} stroke={goldStroke} strokeWidth="0.6" fill="none" opacity={0.45} />
            {['ELEC', 'ENV', 'FAC', 'ENG', 'COMP', 'DIST'].map((label, i) => (
              <motion.text key={label} x={[70, 130, 190, 250, 310, 370][i]} y={272} fontSize="4.5" fill={goldStroke} textAnchor="middle" {...fadeIn(1.6 + i * 0.05, 0.2)}>{label}</motion.text>
            ))}
            {[70, 130, 190, 250, 310, 370].map((x, i) => (
              <motion.circle key={x} cx={x} cy={110} r={i === 2 ? 3 : 2} fill={goldStroke} {...nodeAppear(1.5 + i * 0.08, i === 2 ? 0.5 : 0.3)} />
            ))}
            <motion.line x1="40" y1="260" x2="390" y2="260" {...draw(0.1, 1.0)} stroke={goldStroke} strokeWidth="0.5" fill="none" opacity={0.35} />
          </>
        ) : variant === 'growth' ? (
          <>
            <motion.line x1="40" y1="260" x2="380" y2="260" {...draw(0.1, 1.0)} stroke={goldStroke} strokeWidth="0.4" fill="none" opacity={0.3} />
            <motion.line x1="40" y1="260" x2="40" y2="30" {...draw(0.2, 1.0)} stroke={goldStroke} strokeWidth="0.4" fill="none" opacity={0.3} />
            <motion.path d="M 50 245 C 90 240 120 235 150 220 C 180 205 200 185 230 155 C 260 120 290 80 330 40" {...draw(0.5, 2.0)} stroke={goldStroke} strokeWidth="0.8" fill="none" opacity={0.6} />
            {[
              { x: 90, y: 240 }, { x: 150, y: 220 }, { x: 200, y: 185 }, { x: 260, y: 120 }, { x: 330, y: 40 },
            ].map((p, i) => (
              <g key={i}>
                <motion.circle cx={p.x} cy={p.y} r={i === 4 ? 4 : 2.5} fill={goldStroke} {...nodeAppear(1.2 + i * 0.15, i === 4 ? 0.55 : 0.35)} />
                <motion.line x1={p.x} y1={p.y} x2={p.x} y2={260} {...draw(1.3 + i * 0.1, 0.6)} stroke={goldStroke} strokeWidth="0.15" fill="none" opacity={0.12} strokeDasharray="2 3" />
              </g>
            ))}
            <motion.path d="M 260 120 C 275 100 300 80 330 40" stroke={goldStroke} strokeWidth="1.2" fill="none" {...draw(2.0, 0.8)} opacity={0.15} />
            <motion.text x="210" y="278" fontSize="5" fill={goldStroke} textAnchor="middle" {...fadeIn(2.0, 0.2)}>TIME</motion.text>
            <motion.text x="25" y="150" fontSize="5" fill={goldStroke} textAnchor="middle" transform="rotate(-90,25,150)" {...fadeIn(2.1, 0.2)}>VALUE</motion.text>
            <motion.path d="M 330 40 L 325 50 M 330 40 L 335 50" {...draw(2.2, 0.5)} stroke={goldStroke} strokeWidth="0.6" fill="none" opacity={0.5} />
          </>
        ) : (
          <>
            <motion.path d="M 200 50 L 340 150 L 200 250 L 60 150 Z" {...draw(0.3, 1.8)} stroke={goldStroke} strokeWidth="0.6" fill="none" />
            <motion.line x1="200" y1="50" x2="200" y2="250" {...draw(0.9)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.3} />
            <motion.line x1="60" y1="150" x2="340" y2="150" {...draw(1.0)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.3} />
            <motion.path d="M 200 100 L 270 150 L 200 200 L 130 150 Z" {...draw(1.2, 1.2)} stroke={goldStroke} strokeWidth="0.4" fill="none" opacity={0.4} />
            <motion.circle cx="200" cy="150" r="4" fill={goldStroke} {...nodeAppear(1.5, 0.5)} />
            <motion.circle cx="200" cy="50" r="2" fill={goldStroke} {...nodeAppear(1.6, 0.35)} />
            <motion.circle cx="340" cy="150" r="2" fill={goldStroke} {...nodeAppear(1.7, 0.35)} />
            <motion.circle cx="200" cy="250" r="2" fill={goldStroke} {...nodeAppear(1.8, 0.35)} />
            <motion.circle cx="60" cy="150" r="2" fill={goldStroke} {...nodeAppear(1.9, 0.35)} />
          </>
        )}

        {/* Corner accents */}
        <motion.line x1="15" y1="15" x2="45" y2="15" {...draw(0.1, 0.6)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.2} />
        <motion.line x1="15" y1="15" x2="15" y2="45" {...draw(0.15, 0.6)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.2} />
        <motion.line x1="385" y1="285" x2="355" y2="285" {...draw(0.2, 0.6)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.2} />
        <motion.line x1="385" y1="285" x2="385" y2="255" {...draw(0.25, 0.6)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.2} />
      </svg>

      {/* Ambient glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, hsl(38 45% 55% / 0.06), transparent 70%)' }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.06]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default AnimatedAccent;
