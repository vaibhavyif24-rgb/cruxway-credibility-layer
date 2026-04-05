import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
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

  // Raw normalised mouse: -1 … 1
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth spring
  const springCfg = { damping: 40, stiffness: 90, mass: 1 };
  const smX = useSpring(rawX, springCfg);
  const smY = useSpring(rawY, springCfg);

  // Per-layer transforms (all hoisted — stable hook count)
  // Layer 0: photo — 0.3x, max ±18px
  const photoX = useTransform(smX, [-1, 1], [-18, 18]);
  const photoY = useTransform(smY, [-1, 1], [-10, 10]);

  // Layer 2: mist — 0.15x, max ±8px
  const mistX = useTransform(smX, [-1, 1], [-8, 8]);

  // Layer 3: haze — 0.1x opposite, max ±5px
  const hazeX = useTransform(smX, [-1, 1], [5, -5]);

  // Layer 4: vignette — 0.05x, max ±3px
  const vigX = useTransform(smX, [-1, 1], [-3, 3]);
  const vigY = useTransform(smY, [-1, 1], [-3, 3]);

  // Layer 6: ambient glow — 0.2x, max ±12px
  const glowX = useTransform(smX, [-1, 1], [-12, 12]);
  const glowY = useTransform(smY, [-1, 1], [-8, 8]);

  // Mobile auto-oscillation
  const timeRef = useRef(0);
  useAnimationFrame((_, delta) => {
    if (!isMobile) return;
    timeRef.current += delta / 1000;
    const t = timeRef.current;
    rawX.set(Math.sin(t * 0.25) * 0.35);
    rawY.set(Math.cos(t * 0.18) * 0.2);
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    },
    [isMobile, rawX, rawY],
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden"
    >
      {/* ── Layer 0: Oak tree photo — parallax + Ken Burns ── */}
      <motion.div
        className="absolute inset-[-10%] z-[0]"
        style={{
          x: photoX,
          y: photoY,
          willChange: 'transform',
        }}
      >
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

      {/* ── Layer 1: Dark overlay (static) ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-deep/80 via-prussian/60 to-navy-deep/85 pointer-events-none" />

      {/* ── Layer 2: Low mist bands — parallax + independent drift ── */}
      <motion.div
        className="absolute bottom-0 left-[-20%] right-[-20%] h-[35%] z-[2] pointer-events-none"
        style={{ x: mistX, willChange: 'transform' }}
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

      <motion.div
        className="absolute bottom-[5%] left-[-15%] right-[-15%] h-[25%] z-[2] pointer-events-none"
        style={{ x: mistX, willChange: 'transform' }}
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

      {/* ── Layer 3: Atmospheric haze (mid, opposite direction) ── */}
      <motion.div
        className="absolute top-[30%] left-[-10%] right-[-10%] h-[40%] z-[2] pointer-events-none"
        style={{ x: hazeX, willChange: 'transform' }}
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

      {/* ── Layer 4: Dynamic vignette ── */}
      <motion.div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          x: vigX,
          y: vigY,
          willChange: 'transform',
          background:
            'radial-gradient(ellipse at center, transparent 30%, hsl(214 45% 8% / 0.5) 100%)',
        }}
      />

      {/* ── Layer 5: Gold corner brackets (anchored) ── */}
      <svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full z-[4] opacity-40 pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.line x1="50" y1="50" x2="130" y2="50" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }} />
        <motion.line x1="50" y1="50" x2="50" y2="130" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} />
        <motion.line x1="1150" y1="50" x2="1070" y2="50" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }} />
        <motion.line x1="1150" y1="50" x2="1150" y2="130" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} />
        <motion.line x1="50" y1="750" x2="130" y2="750" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }} />
        <motion.line x1="50" y1="750" x2="50" y2="670" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }} />
        <motion.line x1="1150" y1="750" x2="1070" y2="750" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }} />
        <motion.line x1="1150" y1="750" x2="1150" y2="670" stroke="hsl(43 70% 50%)" strokeWidth="0.4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }} />
      </svg>

      {/* ── Layer 6: Ambient glow — mouse-following light source ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full z-[5] pointer-events-none"
        style={{
          x: glowX,
          y: glowY,
          background: 'radial-gradient(circle, hsl(43 70% 50% / 0.04), transparent 70%)',
          willChange: 'transform',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6] }}
        transition={{ duration: 3, delay: 1.2, ease: 'easeOut' }}
      />
    </div>
  );
};

export default GeometricHero;
