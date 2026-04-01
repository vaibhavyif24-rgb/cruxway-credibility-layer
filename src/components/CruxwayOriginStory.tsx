import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

/* ------------------------------------------------------------------ */
/*  Pexels media                                                       */
/* ------------------------------------------------------------------ */
const CRUCIBLE_VIDEO = 'https://videos.pexels.com/video-files/33938968/14402040_2560_1440_32fps.mp4';
const CRUCIBLE_POSTER = 'https://images.pexels.com/videos/33938968/pexels-photo-33938968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const WAY_VIDEO = 'https://videos.pexels.com/video-files/7895948/7895948-uhd_2560_1440_25fps.mp4';
const WAY_POSTER = 'https://images.pexels.com/videos/7895948/pexels-photo-7895948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

/* ------------------------------------------------------------------ */
/*  Intersection-observed video                                        */
/* ------------------------------------------------------------------ */
const LazyVideo = ({ src, poster, className = '' }: { src: string; poster: string; className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { e.isIntersecting ? el.play().catch(() => {}) : el.pause(); },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Grain overlay                                                      */
/* ------------------------------------------------------------------ */
const Grain = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{
      zIndex: 5,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
    }}
  />
);

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
const CruxwayOriginStory = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* ------ Overlay colours (LIGHT — video must be visible) ------ */
  const darkOverlay = 'linear-gradient(to bottom, hsl(228 55% 8% / 0.2) 0%, hsl(228 55% 8% / 0.4) 50%, hsl(228 55% 8% / 0.6) 100%)';
  const lightOverlay = 'linear-gradient(to bottom, hsl(40 25% 96% / 0.25) 0%, hsl(40 25% 96% / 0.4) 50%, hsl(40 25% 96% / 0.65) 100%)';
  const overlay = isDark ? darkOverlay : lightOverlay;

  /* ------ Text shadows for legibility over bright video ------ */
  const textShadow = '0 2px 20px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.3)';
  const cruxwayShadow = isDark
    ? '0 0 60px hsl(43 78% 50% / 0.2), 0 4px 30px rgba(0,0,0,0.6)'
    : '0 4px 30px rgba(0,0,0,0.2)';

  const subColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)';
  const subShadow = '0 1px 10px rgba(0,0,0,0.4)';

  /* ================================================================ */
  /*  ALL hooks declared unconditionally (Rules of Hooks)              */
  /* ================================================================ */

  // Mobile transforms
  const mCrucibleOpacity = useTransform(scrollYProgress, [0.15, 0.30], [1, 0]);
  const mWayOpacity = useTransform(scrollYProgress, [0.15, 0.30], [0, 1]);
  const mPhase1Opacity = useTransform(scrollYProgress, [0, 0.01, 0.10, 0.16], [1, 1, 1, 0]);
  const mPhase2Opacity = useTransform(scrollYProgress, [0.20, 0.28, 0.42, 0.48], [0, 1, 1, 0]);
  const mPhase3Opacity = useTransform(scrollYProgress, [0.50, 0.58, 0.65, 0.72], [0, 1, 1, 0]);
  const mPhase3RuleW = useTransform(scrollYProgress, [0.54, 0.62], [0, 100]);
  const mPhase4Opacity = useTransform(scrollYProgress, [0.73, 0.80, 0.95, 1.0], [0, 1, 1, 1]);
  const mPhase4Scale = useTransform(scrollYProgress, [0.73, 0.80], [0.92, 1]);

  // Desktop transforms
  const leftWidth = useTransform(scrollYProgress, [0, 0.15, 0.35], ['100%', '100%', '50%']);
  const rightWidth = useTransform(scrollYProgress, [0, 0.15, 0.35], ['0%', '0%', '50%']);
  const seamOpacity = useTransform(scrollYProgress, [0.20, 0.35], [0, 1]);
  const seamHeight = useTransform(scrollYProgress, [0.25, 0.40], ['0%', '100%']);
  const phase1TextOpacity = useTransform(scrollYProgress, [0, 0.01, 0.12, 0.18], [1, 1, 1, 0]);
  const phase2TextOpacity = useTransform(scrollYProgress, [0.32, 0.40, 0.48, 0.55], [0, 1, 1, 0]);
  const phase3TextOpacity = useTransform(scrollYProgress, [0.53, 0.60, 0.68, 0.75], [0, 1, 1, 0]);
  const phase3RuleWidth = useTransform(scrollYProgress, [0.56, 0.65], [0, 120]);
  const phase4TextOpacity = useTransform(scrollYProgress, [0.73, 0.82, 0.95, 1.0], [0, 1, 1, 1]);
  const phase4Scale = useTransform(scrollYProgress, [0.73, 0.82], [0.92, 1]);

  /* ================================================================ */
  /*  MOBILE RENDER                                                    */
  /* ================================================================ */
  if (isMobile) {
    return (
      <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: isDark ? 'hsl(228 55% 8%)' : 'hsl(40 25% 20%)' }}>
          {/* Way video (behind) */}
          <motion.div className="absolute inset-0" style={{ opacity: mWayOpacity, willChange: 'transform' }}>
            <LazyVideo src={WAY_VIDEO} poster={WAY_POSTER} />
            <div className="absolute inset-0" style={{ background: overlay }} />
            <Grain />
          </motion.div>

          {/* Crucible video (on top, fades out) */}
          <motion.div className="absolute inset-0" style={{ opacity: mCrucibleOpacity, zIndex: 2, willChange: 'transform' }}>
            <LazyVideo src={CRUCIBLE_VIDEO} poster={CRUCIBLE_POSTER} />
            <div className="absolute inset-0" style={{ background: overlay }} />
            <Grain />
          </motion.div>

          {/* Phase 1: CRUCIBLE */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
            style={{ opacity: mPhase1Opacity }}
          >
            <h2 className="font-serif text-gold uppercase tracking-[0.12em] text-center"
              style={{ fontSize: 'clamp(2.4rem, 10vw, 4rem)', textShadow }}>
              Crucible
            </h2>
            <p className="font-sans text-[13px] text-center max-w-[320px] mt-4"
              style={{ color: subColor, textShadow: subShadow }}>
              A vessel where raw material is transformed under pressure.
            </p>
          </motion.div>

          {/* Phase 2: THE WAY */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
            style={{ opacity: mPhase2Opacity }}
          >
            <h2 className="font-serif text-gold uppercase tracking-[0.12em] text-center"
              style={{ fontSize: 'clamp(2.2rem, 9vw, 3.5rem)', textShadow }}>
              The Way
            </h2>
            <p className="font-sans text-[13px] text-center max-w-[320px] mt-4"
              style={{ color: subColor, textShadow: subShadow }}>
              The discipline that guides the transformation.
            </p>
          </motion.div>

          {/* Phase 3: CRU × WAY Equation */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
            style={{ opacity: mPhase3Opacity }}
          >
            <div className="flex items-baseline gap-0">
              <span className="font-serif text-gold uppercase tracking-[0.18em] font-light"
                style={{ fontSize: 'clamp(2rem, 8vw, 3.2rem)', textShadow }}>
                CRU
              </span>
              <span className="font-serif mx-2 md:mx-3"
                style={{ fontSize: 'clamp(1rem, 4vw, 1.6rem)', color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)', textShadow }}>
                ×
              </span>
              <span className="font-serif text-gold uppercase tracking-[0.18em] font-light"
                style={{ fontSize: 'clamp(2rem, 8vw, 3.2rem)', textShadow }}>
                WAY
              </span>
            </div>
            <motion.div className="mt-5 mx-auto overflow-hidden" style={{ width: mPhase3RuleW }}>
              <div className="h-[1px] w-full" style={{
                background: isDark
                  ? 'linear-gradient(90deg, transparent 0%, hsl(43 78% 50% / 0.6) 30%, hsl(43 78% 50%) 50%, hsl(43 78% 50% / 0.6) 70%, transparent 100%)'
                  : 'linear-gradient(90deg, transparent 0%, hsl(43 78% 50% / 0.4) 30%, hsl(43 78% 50% / 0.8) 50%, hsl(43 78% 50% / 0.4) 70%, transparent 100%)',
              }} />
            </motion.div>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] mt-4 text-center"
              style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)', textShadow: subShadow }}>
              The crucible of conviction · The way forward
            </p>
          </motion.div>

          {/* Phase 4: Final */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
            style={{ opacity: mPhase4Opacity, scale: mPhase4Scale }}
          >
            <p className="font-serif text-gold tracking-[-0.02em] text-center"
              style={{ fontSize: 'clamp(2.8rem, 12vw, 5rem)', textShadow: cruxwayShadow }}>
              Cruxway
            </p>
            <div className="h-[1.5px] bg-gold/40 w-[64px] mt-4" />
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] mt-3 text-center"
              style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)' }}>
              Forging conviction through rigour.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }
  /* ================================================================ */
  /*  DESKTOP RENDER                                                   */
  /* ================================================================ */
  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: isDark ? 'hsl(228 55% 8%)' : 'hsl(40 25% 20%)' }}>
        {/* ---- Left panel (Crucible) ---- */}
        <motion.div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: leftWidth, zIndex: 2, willChange: 'transform' }}
        >
          <LazyVideo src={CRUCIBLE_VIDEO} poster={CRUCIBLE_POSTER} />
          <div className="absolute inset-0" style={{ background: overlay }} />
          <Grain />

          {/* Phase 2: CRUCIBLE label (inside left panel) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: phase2TextOpacity, zIndex: 10 }}
          >
            <h3 className="font-serif text-gold uppercase tracking-[0.1em]"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', textShadow }}>
              Crucible
            </h3>
            <p className="font-sans text-[13px] md:text-[15px] mt-2 text-center max-w-[240px]"
              style={{ color: subColor, textShadow: subShadow }}>
              Where conviction is forged.
            </p>
          </motion.div>
        </motion.div>

        {/* ---- Right panel (The Way) ---- */}
        <motion.div
          className="absolute top-0 right-0 h-full overflow-hidden"
          style={{ width: rightWidth, zIndex: 1, willChange: 'transform' }}
        >
          <LazyVideo src={WAY_VIDEO} poster={WAY_POSTER} />
          <div className="absolute inset-0" style={{ background: overlay }} />
          <Grain />

          {/* Phase 2: THE WAY label (inside right panel) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: phase2TextOpacity, zIndex: 10 }}
          >
            <h3 className="font-serif text-gold uppercase tracking-[0.1em]"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', textShadow }}>
              The Way
            </h3>
            <p className="font-sans text-[13px] md:text-[15px] mt-2 text-center max-w-[240px]"
              style={{ color: subColor, textShadow: subShadow }}>
              The discipline that guides the transformation.
            </p>
          </motion.div>
        </motion.div>

        {/* ---- Gold center seam ---- */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px]"
          style={{
            height: seamHeight,
            opacity: seamOpacity,
            zIndex: 10,
            background: 'hsl(43 78% 50%)',
            boxShadow: '0 0 15px hsl(43 78% 50% / 0.3)',
          }}
        />

        {/* ---- Phase 1: CRUCIBLE full-screen ---- */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: phase1TextOpacity }}
        >
          <h2 className="font-serif text-gold uppercase tracking-[0.12em]"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', textShadow }}>
            Crucible
          </h2>
          <p className="font-sans text-[13px] md:text-[15px] mt-4 max-w-[380px] text-center"
            style={{ color: subColor, textShadow: subShadow }}>
            A vessel where raw material is transformed under pressure.
          </p>
        </motion.div>

        {/* ---- Phase 3: CRU × WAY Equation ---- */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: phase3TextOpacity }}
        >
          {/* Letter assembly — CRU × WAY */}
          <div className="flex items-baseline gap-0">
            <span className="font-serif text-gold uppercase tracking-[0.2em] font-light"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', textShadow }}>
              CRU
            </span>
            <span className="font-serif mx-3 md:mx-4"
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                textShadow,
              }}>
              ×
            </span>
            <span className="font-serif text-gold uppercase tracking-[0.2em] font-light"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', textShadow }}>
              WAY
            </span>
          </div>

          {/* Animated gradient gold rule */}
          <motion.div
            className="mt-6 mx-auto overflow-hidden"
            style={{ width: phase3RuleWidth }}
          >
            <div className="h-[1px] w-full" style={{
              background: isDark
                ? 'linear-gradient(90deg, transparent 0%, hsl(43 78% 50% / 0.5) 20%, hsl(43 78% 50%) 50%, hsl(43 78% 50% / 0.5) 80%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, hsl(43 78% 50% / 0.35) 20%, hsl(43 78% 50% / 0.8) 50%, hsl(43 78% 50% / 0.35) 80%, transparent 100%)',
            }} />
          </motion.div>

          {/* Meaning tagline */}
          <p className="font-sans text-[11px] md:text-[13px] uppercase tracking-[0.25em] mt-5 text-center"
            style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)', textShadow: subShadow }}>
            The crucible of conviction · The way forward
          </p>
        </motion.div>

        {/* ---- Phase 4: Final CRUXWAY ---- */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: phase4TextOpacity, scale: phase4Scale }}
        >
          <p className="font-serif text-gold tracking-[-0.02em]"
            style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)', textShadow: cruxwayShadow }}>
            Cruxway
          </p>
          <div className="h-[1.5px] bg-gold/40 w-[80px] mt-5" />
          <p className="font-sans text-[12px] md:text-[14px] uppercase tracking-[0.18em] mt-4"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)' }}>
            Forging conviction through rigour.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CruxwayOriginStory;
