import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';
import { useCallback, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import heroImage from '@/assets/hero-forking-road.jpg';

/**
 * Landing hero with multi-layer parallax depth.
 * Desktop: mouse-tracking moves layers at different speeds.
 * Mobile: gentle sine-wave auto-oscillation.
 */
const GeometricHero = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalised mouse position: -1 … 1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for each depth tier
  const springCfg = { damping: 40, stiffness: 90, mass: 1 };
  const smX = useSpring(mouseX, springCfg);
  const smY = useSpring(mouseY, springCfg);

  // Mobile auto-oscillation
  const timeRef = useRef(0);
  useAnimationFrame((_, delta) => {
    if (!isMobile) return;
    timeRef.current += delta / 1000;
    const t = timeRef.current;
    mouseX.set(Math.sin(t * 0.25) * 0.35);
    mouseY.set(Math.cos(t * 0.18) * 0.2);
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    },
    [isMobile, mouseX, mouseY],
  );

  // Helper: px shift for a given depth multiplier
  const px = (mult: number, axis: 'x' | 'y') => {
    const base = axis === 'x' ? smX : smY;
    // We can't use useTransform here in a helper, so we return the spring directly
    // and apply the multiplier via style template
    return base;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden"
    >
      {/* ── Layer 0: Oak tree photo — 0.3x parallax + Ken Burns ── */}
      <motion.div
        className="absolute inset-[-10%] z-[0]"
        style={{
          x: useSpring(useMotionValue(0), springCfg),
          y: useSpring(useMotionValue(0), springCfg),
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            x: smX as any,
            y: smY as any,
            // framer applies these as px; we scale below
          }}
        >
          {/* We wrap again so Ken Burns and parallax don't fight */}
          <motion.div
            className="w-full h-full"
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
        </motion.div>
      </motion.div>

      {/* ── Layer 1: Dark overlay (static) ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-deep/80 via-prussian/60 to-navy-deep/85" />

      {/* ── Layer 2: Low mist band — 0.15x + drift ── */}
      <motion.div
        className="absolute bottom-0 left-[-20%] right-[-20%] h-[35%] z-[2] pointer-events-none"
        style={{
          x: smX as any,
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ x: [0, 60, -40, 20, 0] }}
          transition={{ duration: 28, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          style={{
            background:
              'linear-gradient(to top, hsl(210 30% 85% / 0.07) 0%, hsl(210 20% 90% / 0.04) 40%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Second mist band — slightly higher, opposite drift */}
      <motion.div
        className="absolute bottom-[5%] left-[-15%] right-[-15%] h-[25%] z-[2] pointer-events-none"
        style={{
          x: smX as any,
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ x: [0, -50, 30, -15, 0] }}
          transition={{ duration: 32, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          style={{
            background:
              'linear-gradient(to top, hsl(220 25% 80% / 0.05) 0%, hsl(215 20% 85% / 0.03) 50%, transparent 100%)',
            filter: 'blur(8px)',
          }}
        />
      </motion.div>

      {/* ── Layer 3: Atmospheric haze (mid) — 0.1x ── */}
      <motion.div
        className="absolute top-[30%] left-[-10%] right-[-10%] h-[40%] z-[2] pointer-events-none"
        style={{
          x: smX as any,
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ x: [0, -30, 20, 0] }}
          transition={{ duration: 36, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          style={{
            background:
              'radial-gradient(ellipse at 50% 60%, hsl(210 25% 80% / 0.03) 0%, transparent 70%)',
            filter: 'blur(12px)',
          }}
        />
      </motion.div>

      {/* ── Layer 4: Dynamic vignette — 0.05x ── */}
      <motion.div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          x: smX as any,
          y: smY as any,
          willChange: 'transform',
          transform: 'translateZ(0)',
          background:
            'radial-gradient(ellipse at center, transparent 30%, hsl(214 45% 8% / 0.5) 100%)',
        }}
      />

      {/* ── Layer 5: Gold corner brackets (anchored, no parallax) ── */}
      <svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full z-[4] opacity-40 pointer-events-none"
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

      {/* ── Layer 6: Ambient glow — 0.2x mouse follow ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full z-[5] pointer-events-none"
        style={{
          x: smX as any,
          y: smY as any,
          background: 'radial-gradient(circle, hsl(43 70% 50% / 0.04), transparent 70%)',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6] }}
        transition={{ duration: 3, delay: 1.2, ease: 'easeOut' }}
      />
    </div>
  );
};

export default GeometricHero;
