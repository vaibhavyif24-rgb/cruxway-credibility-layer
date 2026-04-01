import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

/* ------------------------------------------------------------------ */
/*  Pexels media                                                       */
/* ------------------------------------------------------------------ */
const CRUCIBLE_VIDEO = 'https://videos.pexels.com/video-files/5121751/5121751-uhd_2560_1440_25fps.mp4';
const CRUCIBLE_POSTER = 'https://images.pexels.com/videos/5121751/pexels-photo-5121751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
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

  /* ------ Overlay colours (LIGHTER than typical hero) ------ */
  const darkOverlay = 'linear-gradient(to bottom, hsl(228 55% 8% / 0.25) 0%, hsl(228 55% 8% / 0.45) 60%, hsl(228 55% 8% / 0.7) 100%)';
  const lightOverlay = 'linear-gradient(to bottom, hsl(40 25% 96% / 0.3) 0%, hsl(40 25% 96% / 0.5) 60%, hsl(40 25% 96% / 0.75) 100%)';
  const overlay = isDark ? darkOverlay : lightOverlay;

  /* ================================================================ */
  /*  DESKTOP transforms                                               */
  /* ================================================================ */

  // Phase 1: Full-viewport CRUCIBLE text (z-30, centered on viewport)
  const phase1TextOpacity = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0]);
  const defOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25, 0.30], [0, 1, 1, 0]);

  // Phase 2: Panel split
  const leftPanelWidth = useTransform(scrollYProgress, [0.30, 0.55], ['100%', '50%']);
  const rightPanelWidth = useTransform(scrollYProgress, [0.30, 0.55], ['0%', '50%']);

  // Gold center seam
  const goldLineHeight = useTransform(scrollYProgress, [0.40, 0.58], ['0%', '100%']);
  const goldLineOpacity = useTransform(scrollYProgress, [0.39, 0.44], [0, 1]);

  // Per-panel diptych labels (contained WITHIN each panel)
  const diptychOpacity = useTransform(scrollYProgress, [0.48, 0.58, 0.65, 0.72], [0, 1, 1, 0]);
  const diptychRightOpacity = useTransform(scrollYProgress, [0.50, 0.60, 0.65, 0.72], [0, 1, 1, 0]);

  // Phase 3: CRUXWAY resolution
  const cruxwayOpacity = useTransform(scrollYProgress, [0.72, 0.84], [0, 1]);
  const cruxwayScale = useTransform(scrollYProgress, [0.72, 0.84], [0.92, 1]);
  const ruleWidth = useTransform(scrollYProgress, [0.84, 0.92], [0, 80]);
  const taglineOpacity = useTransform(scrollYProgress, [0.88, 0.96], [0, 1]);

  /* ================================================================ */
  /*  MOBILE transforms (crossfade instead of split)                   */
  /* ================================================================ */
  const mCrucibleVideoOpacity = useTransform(scrollYProgress, [0.28, 0.45], [1, 0]);
  const mWayVideoOpacity = useTransform(scrollYProgress, [0.28, 0.45], [0, 1]);
  const mPhase1TextOpacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const mDefOpacity = useTransform(scrollYProgress, [0.05, 0.13, 0.22, 0.28], [0, 1, 1, 0]);
  const mWayTextOpacity = useTransform(scrollYProgress, [0.38, 0.50, 0.55, 0.62], [0, 1, 1, 0]);
  const mWayDefOpacity = useTransform(scrollYProgress, [0.42, 0.52, 0.55, 0.60], [0, 1, 1, 0]);
  const mCruxwayOpacity = useTransform(scrollYProgress, [0.65, 0.78], [0, 1]);
  const mCruxwayScale = useTransform(scrollYProgress, [0.65, 0.78], [0.92, 1]);
  const mRuleWidth = useTransform(scrollYProgress, [0.78, 0.88], [0, 64]);
  const mTaglineOpacity = useTransform(scrollYProgress, [0.85, 0.94], [0, 1]);

  /* ------ Text shadows for legibility over bright video ------ */
  const textShadow = '0 2px 20px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.3)';
  const cruxwayShadow = isDark
    ? '0 0 50px hsl(43 78% 50% / 0.25), 0 4px 24px rgba(0,0,0,0.5)'
    : '0 0 30px hsl(43 78% 50% / 0.15), 0 4px 16px rgba(0,0,0,0.15)';

  const subColor = isDark ? 'text-white/70' : 'text-foreground/60';

  /* ================================================================ */
  /*  MOBILE RENDER                                                    */
  /* ================================================================ */
  if (isMobile) {
    return (
      <div ref={containerRef} className="relative" style={{ height: '180vh' }}>
        <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
          {/* Crucible video */}
          <motion.div className="absolute inset-0" style={{ opacity: mCrucibleVideoOpacity, willChange: 'transform' }}>
            <LazyVideo src={CRUCIBLE_VIDEO} poster={CRUCIBLE_POSTER} />
            <div className="absolute inset-0" style={{ background: overlay }} />
            <Grain />
          </motion.div>

          {/* Way video (behind crucible, revealed by crossfade) */}
          <motion.div className="absolute inset-0" style={{ opacity: mWayVideoOpacity, willChange: 'transform' }}>
            <LazyVideo src={WAY_VIDEO} poster={WAY_POSTER} />
            <div className="absolute inset-0" style={{ background: overlay }} />
            <Grain />
          </motion.div>

          {/* Phase 1: CRUCIBLE */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{ opacity: mPhase1TextOpacity, zIndex: 10 }}
          >
            <h2
              className="font-serif text-[clamp(2.8rem,12vw,5rem)] uppercase tracking-[0.12em] text-gold text-center"
              style={{ textShadow }}
            >
              Crucible
            </h2>
            <motion.p
              className={`font-sans text-[13px] text-center max-w-[320px] mt-4 ${subColor}`}
              style={{ opacity: mDefOpacity, textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              A vessel where raw material becomes something stronger.
            </motion.p>
          </motion.div>

          {/* Phase 2: THE WAY */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{ opacity: mWayTextOpacity, zIndex: 10 }}
          >
            <h2
              className="font-serif text-[clamp(2.5rem,10vw,4.5rem)] uppercase tracking-[0.12em] text-gold text-center"
              style={{ textShadow }}
            >
              The Way
            </h2>
            <motion.p
              className={`font-sans text-[13px] text-center max-w-[320px] mt-4 ${subColor}`}
              style={{ opacity: mWayDefOpacity, textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              The discipline that guides the transformation.
            </motion.p>
          </motion.div>

          {/* Phase 3: CRUXWAY */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{ opacity: mCruxwayOpacity, scale: mCruxwayScale, zIndex: 10 }}
          >
            <h2
              className="font-serif text-[clamp(3rem,14vw,5.5rem)] text-gold tracking-[-0.02em] text-center"
              style={{ textShadow: cruxwayShadow }}
            >
              Cruxway
            </h2>
            <motion.div className="mt-4 h-[2px] bg-gold/60 mx-auto" style={{ width: mRuleWidth }} />
            <motion.p
              className="font-sans text-[12px] uppercase tracking-[0.18em] text-center mt-4 text-gold/70"
              style={{ opacity: mTaglineOpacity }}
            >
              Forging conviction through rigour.
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  DESKTOP RENDER                                                   */
  /* ================================================================ */
  return (
    <div ref={containerRef} className="relative" style={{ height: '180vh' }}>
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        {/* ---- Left panel (Crucible) ---- */}
        <motion.div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: leftPanelWidth, willChange: 'transform' }}
        >
          <LazyVideo src={CRUCIBLE_VIDEO} poster={CRUCIBLE_POSTER} />
          <div className="absolute inset-0" style={{ background: overlay }} />
          <Grain />

          {/* Diptych label: CRUCIBLE (inside left panel only) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: diptychOpacity, zIndex: 10 }}
          >
            <h3
              className="font-serif text-[clamp(1.8rem,4vw,3rem)] uppercase tracking-[0.1em] text-gold"
              style={{ textShadow }}
            >
              Crucible
            </h3>
            <p
              className={`font-sans text-[13px] md:text-[15px] mt-3 ${subColor}`}
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              Where conviction is forged.
            </p>
          </motion.div>
        </motion.div>

        {/* ---- Right panel (The Way) ---- */}
        <motion.div
          className="absolute top-0 right-0 h-full overflow-hidden"
          style={{ width: rightPanelWidth, willChange: 'transform' }}
        >
          <LazyVideo src={WAY_VIDEO} poster={WAY_POSTER} />
          <div className="absolute inset-0" style={{ background: overlay }} />
          <Grain />

          {/* Diptych label: THE WAY (inside right panel only) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: diptychRightOpacity, zIndex: 10 }}
          >
            <h3
              className="font-serif text-[clamp(1.8rem,4vw,3rem)] uppercase tracking-[0.1em] text-gold"
              style={{ textShadow }}
            >
              The Way
            </h3>
            <p
              className={`font-sans text-[13px] md:text-[15px] mt-3 ${subColor}`}
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              The discipline that guides the transformation.
            </p>
          </motion.div>
        </motion.div>

        {/* ---- Gold center seam ---- */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-gold/50"
          style={{
            height: goldLineHeight,
            opacity: goldLineOpacity,
            zIndex: 20,
            boxShadow: '0 0 12px hsl(43 78% 50% / 0.3)',
          }}
        />

        {/* ---- Phase 1: CRUCIBLE (full viewport overlay, z-30) ---- */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: phase1TextOpacity, zIndex: 30 }}
        >
          <h2
            className="font-serif text-[clamp(2.8rem,7vw,5.5rem)] uppercase tracking-[0.12em] text-gold"
            style={{ textShadow }}
          >
            Crucible
          </h2>
          <motion.p
            className={`font-sans text-[13px] md:text-[15px] text-center max-w-[380px] mt-5 ${subColor}`}
            style={{ opacity: defOpacity, textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
          >
            A vessel where raw material becomes something stronger.
          </motion.p>
        </motion.div>

        {/* ---- Phase 3: CRUXWAY (full viewport overlay, z-30) ---- */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: cruxwayOpacity, scale: cruxwayScale, zIndex: 30 }}
        >
          <h2
            className="font-serif text-[clamp(3rem,9vw,7rem)] text-gold tracking-[-0.02em]"
            style={{ textShadow: cruxwayShadow }}
          >
            Cruxway
          </h2>
          <motion.div className="mt-5 h-[2px] bg-gold/60 mx-auto" style={{ width: ruleWidth }} />
          <motion.p
            className="font-sans text-[12px] md:text-[14px] uppercase tracking-[0.18em] mt-5 text-gold/70"
            style={{ opacity: taglineOpacity }}
          >
            Forging conviction through rigour.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default CruxwayOriginStory;
