import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

/* ------------------------------------------------------------------ */
/*  Pexels media                                                       */
/* ------------------------------------------------------------------ */
const CRUCIBLE_VIDEO = 'https://videos.pexels.com/video-files/33938968/14402040_2560_1440_32fps.mp4';
const CRUCIBLE_POSTER = 'https://images.pexels.com/videos/33938968/pexels-photo-33938968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const WAY_VIDEO = 'https://videos.pexels.com/video-files/10852325/10852325-hd_2560_1440_30fps.mp4';
const WAY_POSTER = 'https://images.pexels.com/videos/10852325/asphalt-driveway-natural-open-road-10852325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

/* ------------------------------------------------------------------ */
/*  Intersection-observed video                                        */
/* ------------------------------------------------------------------ */
const LazyVideo = ({ src, poster }: { src: string; poster: string }) => {
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
    <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ willChange: 'transform' }} />
  );
};

/* ------------------------------------------------------------------ */
/*  Grain overlay                                                      */
/* ------------------------------------------------------------------ */
const Grain = () => (
  <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
    }} />
);

/* ------------------------------------------------------------------ */
/*  Letter with scroll-driven opacity                                  */
/* ------------------------------------------------------------------ */
const ScrollLetter = ({ char, opacity }: { char: string; opacity: MotionValue<number> }) => (
  <motion.span style={{ opacity, display: 'inline-block' }}>{char}</motion.span>
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

  /* ------ Overlays (LIGHT) ------ */
  const crucibleOverlay = isDark
    ? 'linear-gradient(to bottom, hsl(228 55% 8% / 0.15) 0%, hsl(228 55% 8% / 0.35) 50%, hsl(228 55% 8% / 0.55) 100%)'
    : 'linear-gradient(to bottom, hsl(40 25% 96% / 0.2) 0%, hsl(40 25% 96% / 0.4) 50%, hsl(40 25% 96% / 0.6) 100%)';
  const wayOverlay = crucibleOverlay;

  /* ------ Shared text styles ------ */
  const textShadow = '0 2px 30px rgba(0,0,0,0.6), 0 0 60px rgba(0,0,0,0.3)';
  const subColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)';
  const subShadow = '0 1px 12px rgba(0,0,0,0.5)';
  const cruxwayShadow = isDark
    ? '0 0 60px hsl(43 78% 50% / 0.2), 0 4px 30px rgba(0,0,0,0.6)'
    : '0 4px 30px rgba(0,0,0,0.2)';

  /* ------ Letter shedding opacities ------ */
  const crucibleLetters = ['C', 'R', 'U', 'C', 'I', 'B', 'L', 'E'];
  // Indices 0-2 (CRU) stay at 1 always. 3-7 shed right-to-left.
  const shedRanges: [number, number][] = [
    [1, 1],     // 0: C — stays
    [1, 1],     // 1: R — stays
    [1, 1],     // 2: U — stays
    [0.26, 0.29], // 3: C — last to shed
    [0.23, 0.26], // 4: I
    [0.20, 0.23], // 5: B
    [0.17, 0.20], // 6: L
    [0.14, 0.17], // 7: E — first to shed
  ];

  const letterOpacities = crucibleLetters.map((_, i) => {
    if (i < 3) return useTransform(scrollYProgress, [0, 1], [1, 1]); // always visible
    const [start, end] = shedRanges[i];
    return useTransform(scrollYProgress, [start, end], [1, 0]);
  });

  /* ================================================================ */
  /*  MOBILE                                                           */
  /* ================================================================ */
  if (isMobile) {
    // Crossfade videos
    const mCrucibleOp = useTransform(scrollYProgress, [0.14, 0.32], [1, 0]);

    // Phase 1: CRUCIBLE full word + definition
    const mP1Op = useTransform(scrollYProgress, [0, 0.02, 0.10, 0.16], [0, 1, 1, 0]);

    // Phase 2: Letter shedding CRU + WAY stacked
    const mLetterPhaseOp = useTransform(scrollYProgress, [0.13, 0.18, 0.48, 0.54], [0, 1, 1, 0]);
    const mWayOp = useTransform(scrollYProgress, [0.28, 0.36, 0.48, 0.54], [0, 1, 1, 0]);
    const mXOp = useTransform(scrollYProgress, [0.36, 0.42, 0.54, 0.58], [0, 1, 1, 0]);
    const mXScale = useTransform(scrollYProgress, [0.36, 0.42], [0.5, 1]);

    // Phase 3: Assembly
    const mAssemblyOp = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
    const mAssemblyScale = useTransform(scrollYProgress, [0.55, 0.65], [0.85, 1]);

    // Phase 4: Meaning
    const mMeaningOp = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);

    return (
      <div ref={containerRef} className="relative" style={{ height: '350vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ background: isDark ? 'hsl(228 55% 8%)' : 'hsl(40 25% 96%)' }}>

          {/* Way video (behind) */}
          <div className="absolute inset-0 z-[1]">
            <LazyVideo src={WAY_VIDEO} poster={WAY_POSTER} />
            <div className="absolute inset-0" style={{ background: wayOverlay }} />
            <Grain />
          </div>

          {/* Crucible video (fades out) */}
          <motion.div className="absolute inset-0 z-[2]" style={{ opacity: mCrucibleOp }}>
            <LazyVideo src={CRUCIBLE_VIDEO} poster={CRUCIBLE_POSTER} />
            <div className="absolute inset-0" style={{ background: crucibleOverlay }} />
            <Grain />
          </motion.div>

          {/* Phase 1: CRUCIBLE */}
          <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
            style={{ opacity: mP1Op }}>
            <h2 className="font-serif text-gold uppercase tracking-[0.12em] text-center"
              style={{ fontSize: 'clamp(2.4rem, 10vw, 4rem)', textShadow }}>
              Crucible
            </h2>
            <p className="font-sans text-[13px] text-center max-w-[320px] mt-4"
              style={{ color: subColor, textShadow: subShadow }}>
              A vessel where raw material is transformed under pressure.
            </p>
          </motion.div>

          {/* Phase 2: Letter shedding + WAY + X */}
          <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 gap-3"
            style={{ opacity: mLetterPhaseOp }}>
            <h2 className="font-serif text-gold uppercase tracking-[0.12em]"
              style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', textShadow }}>
              {crucibleLetters.map((ch, i) => (
                <ScrollLetter key={i} char={ch} opacity={letterOpacities[i]} />
              ))}
            </h2>
          </motion.div>

          {/* X on mobile */}
          <motion.div className="absolute top-[calc(50%+2rem)] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            style={{ opacity: mXOp, scale: mXScale }}>
            <span className="font-serif text-gold font-bold"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', textShadow: '0 0 30px hsl(43 78% 50% / 0.5), 0 2px 20px rgba(0,0,0,0.5)' }}>
              ✕
            </span>
          </motion.div>

          {/* WAY on mobile */}
          <motion.div className="absolute top-[calc(50%+4rem)] left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center"
            style={{ opacity: mWayOp }}>
            <h3 className="font-serif text-gold uppercase tracking-[0.1em]"
              style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', textShadow }}>
              Way
            </h3>
            <p className="font-sans text-[12px] text-center max-w-[260px] mt-2"
              style={{ color: subColor, textShadow: subShadow }}>
              A path of discipline and conviction.
            </p>
          </motion.div>

          {/* Phase 3: Assembly */}
          <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
            style={{ opacity: mAssemblyOp, scale: mAssemblyScale }}>
            <h2 className="font-serif text-gold tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.8rem, 12vw, 5rem)', textShadow: cruxwayShadow }}>
              Cruxway
            </h2>
          </motion.div>

          {/* Phase 4: Meaning */}
          <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
            style={{ opacity: mAssemblyOp }}>
            <h2 className="font-serif text-gold tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.8rem, 12vw, 5rem)', textShadow: cruxwayShadow }}>
              Cruxway
            </h2>
            <motion.div style={{ opacity: mMeaningOp }}>
              <div className="h-[1.5px] bg-gold/40 w-[64px] mx-auto mt-5" />
              <p className="font-sans text-center max-w-[340px] mt-4"
                style={{ fontSize: '13px', lineHeight: 1.7, color: subColor, textShadow: subShadow }}>
                Conviction forged under pressure. Discipline to stay the course.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  DESKTOP                                                          */
  /* ================================================================ */

  // Panel widths
  const leftWidth = useTransform(scrollYProgress, [0, 0.12, 0.32], ['100%', '100%', '50%']);
  const rightWidth = useTransform(scrollYProgress, [0, 0.12, 0.32], ['0%', '0%', '50%']);

  // Phase 1: full-screen CRUCIBLE
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.02, 0.10, 0.16], [0, 1, 1, 0]);

  // Phase 2: letter shedding text (inside left panel)
  const letterPhaseOpacity = useTransform(scrollYProgress, [0.13, 0.18, 0.52, 0.58], [0, 1, 1, 0]);

  // Way text (inside right panel)
  const wayTextOpacity = useTransform(scrollYProgress, [0.25, 0.34, 0.48, 0.55], [0, 1, 1, 0]);
  const wayDefOpacity = useTransform(scrollYProgress, [0.25, 0.34, 0.42, 0.48], [0, 1, 1, 0]);

  // Gold center seam
  const seamOpacity = useTransform(scrollYProgress, [0.22, 0.35, 0.72, 0.78], [0, 0.6, 0.6, 0]);
  const seamHeight = useTransform(scrollYProgress, [0.25, 0.40], ['0%', '100%']);

  // X at intersection
  const xOpacity = useTransform(scrollYProgress, [0.35, 0.42, 0.72, 0.78], [0, 1, 1, 0]);
  const xScale = useTransform(scrollYProgress, [0.35, 0.42], [0.5, 1]);
  const horizontalLineWidth = useTransform(scrollYProgress, [0.38, 0.48], [0, 120]);

  // Phase 3: Assembly
  const assemblyOpacity = useTransform(scrollYProgress, [0.58, 0.68], [0, 1]);
  const assemblyScale = useTransform(scrollYProgress, [0.58, 0.68], [0.85, 1]);

  // Phase 4: Meaning
  const meaningOpacity = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '350vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: isDark ? 'hsl(228 55% 8%)' : 'hsl(40 25% 96%)' }}>

        {/* ---- Left panel (Crucible) ---- */}
        <motion.div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: leftWidth, zIndex: 2, willChange: 'transform' }}
        >
          <LazyVideo src={CRUCIBLE_VIDEO} poster={CRUCIBLE_POSTER} />
          <div className="absolute inset-0" style={{ background: crucibleOverlay }} />
          <Grain />

          {/* Phase 2: Letter shedding CRU...CIBLE inside left panel */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
            style={{ opacity: letterPhaseOpacity }}
          >
            <h2 className="font-serif text-gold uppercase tracking-[0.12em]"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}>
              {crucibleLetters.map((ch, i) => (
                <ScrollLetter key={i} char={ch} opacity={letterOpacities[i]} />
              ))}
            </h2>
          </motion.div>
        </motion.div>

        {/* ---- Right panel (The Way) ---- */}
        <motion.div
          className="absolute top-0 right-0 h-full overflow-hidden"
          style={{ width: rightWidth, zIndex: 1, willChange: 'transform' }}
        >
          <LazyVideo src={WAY_VIDEO} poster={WAY_POSTER} />
          <div className="absolute inset-0" style={{ background: wayOverlay }} />
          <Grain />

          {/* Phase 2: WAY + definition inside right panel */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
            style={{ opacity: wayTextOpacity }}
          >
            <h3 className="font-serif text-gold uppercase tracking-[0.1em]"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}>
              Way
            </h3>
            <motion.p className="font-sans text-center max-w-[220px] mt-3"
              style={{
                fontSize: '13px',
                color: subColor,
                textShadow: subShadow,
                opacity: wayDefOpacity,
              }}>
              A path of discipline and conviction.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* ---- Gold center seam ---- */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px]"
          style={{
            height: seamHeight,
            opacity: seamOpacity,
            zIndex: 14,
            background: 'hsl(43 78% 50% / 0.3)',
          }}
        />

        {/* ---- Horizontal line through X ---- */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px]"
          style={{
            width: horizontalLineWidth,
            background: 'linear-gradient(90deg, transparent, hsl(43 78% 50% / 0.4), hsl(43 78% 50% / 0.4), transparent)',
            opacity: xOpacity,
            zIndex: 14,
          }}
        />

        {/* ---- X at intersection ---- */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ opacity: xOpacity, scale: xScale, zIndex: 15 }}
        >
          <span className="font-serif text-gold font-bold"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              textShadow: '0 0 30px hsl(43 78% 50% / 0.5), 0 2px 20px rgba(0,0,0,0.5)',
            }}>
            ✕
          </span>
        </motion.div>

        {/* ---- Phase 1: CRUCIBLE full-screen ---- */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: phase1Opacity }}
        >
          <h2 className="font-serif text-gold uppercase tracking-[0.12em]"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', textShadow }}>
            Crucible
          </h2>
          <p className="font-sans text-[13px] md:text-[15px] mt-4 max-w-[400px] text-center"
            style={{ color: subColor, textShadow: subShadow }}>
            A vessel where raw material is transformed under pressure.
          </p>
        </motion.div>

        {/* ---- Phase 3: Assembly (CRUXWAY) ---- */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: assemblyOpacity, scale: assemblyScale }}
        >
          <h2 className="font-serif text-gold tracking-[-0.02em]"
            style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)', textShadow: cruxwayShadow }}>
            Cruxway
          </h2>

          <motion.div style={{ opacity: meaningOpacity }}>
            <div className="h-[1.5px] bg-gold/40 w-[80px] mx-auto mt-6" />
            <p className="font-sans text-center max-w-[500px] mt-5 px-6"
              style={{
                fontSize: 'clamp(14px, 2vw, 17px)',
                lineHeight: 1.7,
                color: subColor,
                textShadow: '0 1px 8px rgba(0,0,0,0.3)',
              }}>
              Conviction forged under pressure. Discipline to stay the course. We invest in essential
              businesses, preserve what founders built, and build what endures.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CruxwayOriginStory;
