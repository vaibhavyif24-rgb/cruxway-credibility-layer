import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

/* ------------------------------------------------------------------ */
/*  Pexels media                                                       */
/* ------------------------------------------------------------------ */
const CRUCIBLE_VIDEO = 'https://videos.pexels.com/video-files/4927566/4927566-hd_1920_1080_24fps.mp4';
const CRUCIBLE_POSTER = 'https://images.pexels.com/videos/4927566/free-video-4927566.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const WAY_VIDEO = 'https://videos.pexels.com/video-files/1572342/1572342-hd_1920_1080_30fps.mp4';
const WAY_POSTER = 'https://images.pexels.com/videos/1572342/free-video-1572342.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

/* ------------------------------------------------------------------ */
/*  Lazy video with IO play/pause + fallback                           */
/* ------------------------------------------------------------------ */
const LazyVideo = ({ src, poster, className = '' }: { src: string; poster: string; className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || failed) return;
    const obs = new IntersectionObserver(
      ([e]) => { e.isIntersecting ? el.play().catch(() => {}) : el.pause(); },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [failed]);

  if (failed) {
    return (
      <motion.img
        src={poster}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        animate={{ scale: [1, 1.06] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
    );
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      onError={() => setFailed(true)}
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

  /* --- Overlays (light enough to see video) --- */
  const darkOverlay = 'linear-gradient(to bottom, hsl(228 55% 8% / 0.15) 0%, hsl(228 55% 8% / 0.3) 50%, hsl(228 55% 8% / 0.45) 100%)';
  const lightOverlay = 'linear-gradient(to bottom, hsl(40 25% 96% / 0.2) 0%, hsl(40 25% 96% / 0.35) 50%, hsl(40 25% 96% / 0.5) 100%)';
  const overlay = isDark ? darkOverlay : lightOverlay;

  /* --- Text shadows for legibility --- */
  const ts = '0 2px 20px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.3)';
  const cruxwayShadow = isDark
    ? '0 0 60px hsl(43 78% 50% / 0.2), 0 4px 30px rgba(0,0,0,0.6)'
    : '0 4px 30px rgba(0,0,0,0.2)';
  const subColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)';
  const subShadow = '0 1px 10px rgba(0,0,0,0.4)';

  /* ================================================================ */
  /*  MOBILE — crossfade, no split                                     */
  /* ================================================================ */
  if (isMobile) {
    const mCrucibleOp = useTransform(scrollYProgress, [0.15, 0.30], [1, 0]);
    const mWayOp = useTransform(scrollYProgress, [0.15, 0.30], [0, 1]);
    const mP1 = useTransform(scrollYProgress, [0, 0.02, 0.12, 0.20], [0, 1, 1, 0]);
    const mP2 = useTransform(scrollYProgress, [0.30, 0.38, 0.48, 0.55], [0, 1, 1, 0]);
    const mP3 = useTransform(scrollYProgress, [0.58, 0.68, 0.95, 1.0], [0, 1, 1, 1]);
    const mP3Scale = useTransform(scrollYProgress, [0.58, 0.68], [0.92, 1]);
    const mRuleW = useTransform(scrollYProgress, [0.62, 0.72], [0, 80]);

    return (
      <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Way video (behind) */}
          <motion.div className="absolute inset-0" style={{ opacity: mWayOp }}>
            <LazyVideo src={WAY_VIDEO} poster={WAY_POSTER} />
            <div className="absolute inset-0" style={{ background: overlay }} />
            <Grain />
          </motion.div>

          {/* Crucible video (front, fades out) */}
          <motion.div className="absolute inset-0" style={{ opacity: mCrucibleOp, zIndex: 2 }}>
            <LazyVideo src={CRUCIBLE_VIDEO} poster={CRUCIBLE_POSTER} />
            <div className="absolute inset-0" style={{ background: overlay }} />
            <Grain />
          </motion.div>

          {/* Phase 1: CRUCIBLE */}
          <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6" style={{ opacity: mP1 }}>
            <h2 className="font-serif text-gold uppercase tracking-[0.12em] text-center" style={{ fontSize: 'clamp(2.4rem, 10vw, 4rem)', textShadow: ts }}>Crucible</h2>
            <p className="font-sans text-[13px] text-center max-w-[320px] mt-4" style={{ color: subColor, textShadow: subShadow }}>A vessel where raw material is transformed under pressure.</p>
          </motion.div>

          {/* Phase 2: THE WAY */}
          <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6" style={{ opacity: mP2 }}>
            <h2 className="font-serif text-gold uppercase tracking-[0.12em] text-center" style={{ fontSize: 'clamp(2.2rem, 9vw, 3.5rem)', textShadow: ts }}>The Way</h2>
            <p className="font-sans text-[13px] text-center max-w-[320px] mt-4" style={{ color: subColor, textShadow: subShadow }}>The discipline that guides the transformation.</p>
          </motion.div>

          {/* Phase 3: CRUXWAY resolve */}
          <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6" style={{ opacity: mP3, scale: mP3Scale }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-serif text-gold uppercase tracking-[0.08em]" style={{ fontSize: 'clamp(1.1rem, 4.5vw, 1.6rem)', textShadow: ts }}>Crux</span>
              <span className="font-serif text-gold text-[1.2rem]" style={{ textShadow: ts }}>+</span>
              <span className="font-serif uppercase tracking-[0.08em]" style={{ fontSize: 'clamp(1.1rem, 4.5vw, 1.6rem)', color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)', textShadow: ts }}>Way</span>
            </div>
            <motion.div className="h-[2px] bg-gold/40 mx-auto mb-4" style={{ width: mRuleW }} />
            <p className="font-serif text-gold tracking-[-0.02em] text-center" style={{ fontSize: 'clamp(2.8rem, 12vw, 5rem)', textShadow: cruxwayShadow }}>Cruxway</p>
            <div className="h-[1.5px] bg-gold/40 w-[64px] mt-4" />
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] mt-3 text-center" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)' }}>Forging conviction through rigour.</p>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  DESKTOP — 3-phase horizontal split                               */
  /* ================================================================ */

  // Panel widths
  const leftWidth = useTransform(scrollYProgress, [0, 0.20, 0.45], ['100%', '100%', '50%']);
  const rightWidth = useTransform(scrollYProgress, [0, 0.20, 0.45], ['0%', '0%', '50%']);

  // Gold center seam
  const seamOpacity = useTransform(scrollYProgress, [0.25, 0.40], [0, 1]);
  const seamHeight = useTransform(scrollYProgress, [0.30, 0.48], ['0%', '100%']);

  // Phase 1: full-screen CRUCIBLE
  const p1 = useTransform(scrollYProgress, [0, 0.02, 0.18, 0.25], [0, 1, 1, 0]);

  // Phase 2: per-panel labels
  const p2 = useTransform(scrollYProgress, [0.40, 0.50, 0.55, 0.62], [0, 1, 1, 0]);

  // Phase 3: equation → CRUXWAY
  const p3 = useTransform(scrollYProgress, [0.60, 0.72, 0.95, 1.0], [0, 1, 1, 1]);
  const p3Scale = useTransform(scrollYProgress, [0.60, 0.72], [0.92, 1]);
  const ruleW = useTransform(scrollYProgress, [0.64, 0.76], [0, 120]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ---- Left panel (Crucible) ---- */}
        <motion.div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: leftWidth, zIndex: 2, willChange: 'transform' }}>
          <LazyVideo src={CRUCIBLE_VIDEO} poster={CRUCIBLE_POSTER} />
          <div className="absolute inset-0" style={{ background: overlay }} />
          <Grain />

          {/* Phase 2: CRUCIBLE label inside left panel */}
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: p2, zIndex: 10 }}>
            <h3 className="font-serif text-gold uppercase tracking-[0.1em]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', textShadow: ts }}>Crucible</h3>
            <p className="font-sans text-[13px] md:text-[15px] mt-2 text-center max-w-[240px]" style={{ color: subColor, textShadow: subShadow }}>Where conviction is forged.</p>
          </motion.div>
        </motion.div>

        {/* ---- Right panel (The Way) ---- */}
        <motion.div className="absolute top-0 right-0 h-full overflow-hidden" style={{ width: rightWidth, zIndex: 1, willChange: 'transform' }}>
          <LazyVideo src={WAY_VIDEO} poster={WAY_POSTER} />
          <div className="absolute inset-0" style={{ background: overlay }} />
          <Grain />

          {/* Phase 2: THE WAY label inside right panel */}
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: p2, zIndex: 10 }}>
            <h3 className="font-serif text-gold uppercase tracking-[0.1em]" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', textShadow: ts }}>The Way</h3>
            <p className="font-sans text-[13px] md:text-[15px] mt-2 text-center max-w-[240px]" style={{ color: subColor, textShadow: subShadow }}>The discipline that guides the transformation.</p>
          </motion.div>
        </motion.div>

        {/* ---- Gold center seam ---- */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px]"
          style={{ height: seamHeight, opacity: seamOpacity, zIndex: 10, background: 'hsl(43 78% 50%)', boxShadow: '0 0 15px hsl(43 78% 50% / 0.3)' }}
        />

        {/* ---- Phase 1: CRUCIBLE full-screen ---- */}
        <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: p1 }}>
          <h2 className="font-serif text-gold uppercase tracking-[0.12em]" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', textShadow: ts }}>Crucible</h2>
          <p className="font-sans text-[13px] md:text-[15px] mt-4 max-w-[380px] text-center" style={{ color: subColor, textShadow: subShadow }}>A vessel where raw material is transformed under pressure.</p>
        </motion.div>

        {/* ---- Phase 3: Equation → CRUXWAY ---- */}
        <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: p3, scale: p3Scale }}>
          <div className="flex items-center gap-3 md:gap-5 mb-3">
            <span className="font-serif text-gold uppercase tracking-[0.08em]" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', textShadow: ts }}>Crux</span>
            <span className="font-serif text-gold text-[1.5rem] md:text-[2rem]" style={{ textShadow: ts }}>+</span>
            <span className="font-serif uppercase tracking-[0.08em]" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)', textShadow: ts }}>Way</span>
          </div>
          <motion.div className="h-[2px] bg-gold/40 mx-auto mb-4" style={{ width: ruleW }} />
          <p className="font-serif text-gold tracking-[-0.02em]" style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)', textShadow: cruxwayShadow }}>Cruxway</p>
          <div className="h-[1.5px] bg-gold/40 w-[80px] mt-5" />
          <p className="font-sans text-[12px] md:text-[14px] uppercase tracking-[0.18em] mt-4" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)' }}>Forging conviction through rigour.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default CruxwayOriginStory;
