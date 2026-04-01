import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRegion } from '@/contexts/RegionContext';
import crucibleImg from '@/assets/cruxway-crucible.jpg';
import wayImg from '@/assets/cruxway-way.jpg';
import CrucibleEffects from '@/components/origin-effects/CrucibleEffects';
import WayEffects from '@/components/origin-effects/WayEffects';
import MergeEffects from '@/components/origin-effects/MergeEffects';

/* ─── Grain overlay ─── */
const Grain = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      zIndex: 5,
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
    }}
  />
);

/* ─── Image background with Ken Burns zoom + optional drift ─── */
const ImageBackground = ({ src, variant = 'default' }: { src: string; variant?: 'default' | 'drift' }) => (
  <motion.div
    className="absolute inset-0"
    animate={
      variant === 'drift'
        ? { scale: [1, 1.12, 1], x: [0, -15, 0] }
        : { scale: [1, 1.12, 1] }
    }
    transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    style={{ willChange: 'transform' }}
  >
    <img
      src={src}
      alt=""
      loading="eager"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ willChange: 'transform' }}
    />
  </motion.div>
);

/* ─── Corner geometric SVG for Acts 3-4 ─── */
const CornerBrackets = () => {
  const lineStyle = { stroke: 'hsl(43 70% 50%)', strokeWidth: 0.4, fill: 'none' };
  return (
    <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
      <motion.line x1="30" y1="30" x2="100" y2="30" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} style={lineStyle} />
      <motion.line x1="30" y1="30" x2="30" y2="100" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} style={lineStyle} />
      <motion.line x1="1170" y1="30" x2="1100" y2="30" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} style={lineStyle} />
      <motion.line x1="1170" y1="30" x2="1170" y2="100" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} style={lineStyle} />
      <motion.line x1="30" y1="770" x2="100" y2="770" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} style={lineStyle} />
      <motion.line x1="30" y1="770" x2="30" y2="700" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} style={lineStyle} />
      <motion.line x1="1170" y1="770" x2="1100" y2="770" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} style={lineStyle} />
      <motion.line x1="1170" y1="770" x2="1170" y2="700" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} style={lineStyle} />
    </svg>
  );
};

/* ─── Floating gold particles for video acts ─── */
const GoldParticles = () => (
  <>
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gold/30"
        style={{
          width: 2,
          height: 2,
          left: `${12 + i * 15}%`,
          top: `${55 + (i % 3) * 12}%`,
          zIndex: 6,
        }}
        animate={{ y: [0, -30], opacity: [0, 0.3, 0] }}
        transition={{
          duration: 4 + i * 0.6,
          delay: i * 1.2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    ))}
  </>
);

/* ─── Horizontal shimmer line ─── */
const ShimmerLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px"
    style={{
      top: '40%',
      zIndex: 6,
      background: 'linear-gradient(90deg, transparent, hsl(43 78% 50% / 0.06), transparent)',
    }}
    animate={{ opacity: [0, 0.4, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const CruxwayOriginStory = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  const { region } = useRegion();
  const isIndia = region === 'india';

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scrollH = isMobile ? '350vh' : '400vh';

  /* ─── Overlays: theme-aware ─── */
  /* Dark: deep navy cinematic overlays · Light: warm cream/amber — bright editorial feel */
  const crucibleOverlay = isDark
    ? 'linear-gradient(to bottom, hsl(228 55% 6% / 0.25) 0%, hsl(228 55% 6% / 0.42) 50%, hsl(228 55% 6% / 0.62) 100%)'
    : 'linear-gradient(to bottom, hsl(35 30% 92% / 0.40) 0%, hsl(35 25% 88% / 0.55) 50%, hsl(35 25% 88% / 0.65) 100%)';
  const wayOverlay = isDark
    ? 'linear-gradient(to bottom, hsl(220 20% 8% / 0.55) 0%, hsl(220 20% 6% / 0.68) 50%, hsl(220 20% 4% / 0.80) 100%)'
    : 'linear-gradient(to bottom, hsl(40 25% 90% / 0.45) 0%, hsl(40 20% 85% / 0.60) 50%, hsl(40 20% 85% / 0.68) 100%)';
  const crucibleReturnOverlay = isDark
    ? 'linear-gradient(to bottom, hsl(228 55% 6% / 0.72) 0%, hsl(228 55% 6% / 0.80) 50%, hsl(228 55% 6% / 0.88) 100%)'
    : 'linear-gradient(to bottom, hsl(35 20% 90% / 0.65) 0%, hsl(35 18% 85% / 0.75) 50%, hsl(35 18% 85% / 0.80) 100%)';

  /* Solid bg between transitions */
  const solidBg = isDark ? 'hsl(228, 55%, 8%)' : 'hsl(40, 25%, 94%)';

  /* ─── Text: dark navy in light mode, white in dark mode ─── */
  const videoBodyColor = isDark ? 'rgba(255, 255, 255, 0.88)' : 'hsl(228, 45%, 15%)';
  const videoMutedColor = isDark ? 'rgba(255, 255, 255, 0.55)' : 'hsl(228, 30%, 35%)';
  const videoTextShadow = isDark
    ? '0 2px 20px rgba(0, 0, 0, 0.8), 0 1px 4px rgba(0, 0, 0, 0.5)'
    : '0 1px 12px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.4)';
  const videoSubShadow = isDark
    ? '0 1px 12px rgba(0, 0, 0, 0.6)'
    : '0 1px 8px rgba(255, 255, 255, 0.7)';
  const wordmarkShadow = isDark
    ? '0 0 60px hsl(43 78% 50% / 0.15), 0 4px 30px rgba(0,0,0,0.5)'
    : '0 0 60px hsl(43 78% 50% / 0.20), 0 2px 16px rgba(255,255,255,0.3)';

  /* heading glow – warmer in light mode */
  const headingGlowBg = isDark
    ? 'radial-gradient(circle, hsl(43 78% 50% / 0.04), transparent 70%)'
    : 'radial-gradient(circle, hsl(35 60% 50% / 0.08), transparent 70%)';

  /* ─── ACT 1: Crucible (0.00 → 0.28) ─── */
  const act1BgOp = useTransform(scrollYProgress, [0, 0.20, 0.28], [1, 1, 0]);
  const act1LabelOp = useTransform(scrollYProgress, [0.02, 0.05, 0.22, 0.28], [0, 1, 1, 0]);
  const act1HeadingOp = useTransform(scrollYProgress, [0.03, 0.08, 0.22, 0.28], [0, 1, 1, 0]);
  const act1HeadingScale = useTransform(scrollYProgress, [0.03, 0.08], [0.92, 1]);
  const act1HeadingY = useTransform(scrollYProgress, [0.03, 0.08], [20, 0]);
  const act1RuleW = useTransform(scrollYProgress, [0.05, 0.10], [0, 48]);
  const act1PhoneticOp = useTransform(scrollYProgress, [0.05, 0.09, 0.22, 0.28], [0, 1, 1, 0]);
  const act1DefOp = useTransform(scrollYProgress, [0.07, 0.12, 0.22, 0.28], [0, 1, 1, 0]);

  /* ─── ACT 2: The Way (0.22 → 0.52) ─── */
  const act2BgOp = useTransform(scrollYProgress, [0.22, 0.28, 0.46, 0.52], [0, 1, 1, 0]);
  const act2LabelOp = useTransform(scrollYProgress, [0.32, 0.36, 0.46, 0.52], [0, 1, 1, 0]);
  const act2HeadingOp = useTransform(scrollYProgress, [0.33, 0.38, 0.46, 0.52], [0, 1, 1, 0]);
  const act2HeadingScale = useTransform(scrollYProgress, [0.33, 0.38], [0.92, 1]);
  const act2HeadingY = useTransform(scrollYProgress, [0.33, 0.38], [20, 0]);
  const act2RuleW = useTransform(scrollYProgress, [0.35, 0.40], [0, 48]);
  const act2PhoneticOp = useTransform(scrollYProgress, [0.35, 0.39, 0.46, 0.52], [0, 1, 1, 0]);
  const act2DefOp = useTransform(scrollYProgress, [0.37, 0.42, 0.46, 0.52], [0, 1, 1, 0]);

  /* ─── ACT 3: The Equation (0.50 → 0.72) ─── */
  const crucibleReturnOp = useTransform(scrollYProgress, [0.46, 0.54, 0.95, 1.0], [0, 1, 1, 1]);
  const act3Op = useTransform(scrollYProgress, [0.50, 0.54, 0.68, 0.72], [0, 1, 1, 0]);
  const cruX = useTransform(scrollYProgress, isMobile ? [0.50, 0.54] : [0.50, 0.56], isMobile ? [0, 0] : [-80, 0]);
  const wayX = useTransform(scrollYProgress, isMobile ? [0.50, 0.54] : [0.50, 0.56], isMobile ? [0, 0] : [80, 0]);
  const cruLetterSpacing = useTransform(scrollYProgress, [0.50, 0.56], ['0.3em', '0.2em']);
  const symbolOp = useTransform(scrollYProgress, [0.55, 0.57], [0, 1]);
  const ruleWidth = useTransform(scrollYProgress, [0.57, 0.61], [0, 120]);
  const taglineOp = useTransform(scrollYProgress, [0.60, 0.63], [0, 1]);
  const act3ExplainOp = useTransform(scrollYProgress, [0.62, 0.66, 0.68, 0.72], [0, 1, 1, 0]);

  /* ─── ACT 4: The Name (0.70 → 1.00) ─── */
  const act4Op = useTransform(scrollYProgress, [0.70, 0.76, 0.95, 1], [0, 1, 1, 1]);
  const act4Scale = useTransform(scrollYProgress, [0.70, 0.78], [0.92, 1]);
  const act4DividerOp = useTransform(scrollYProgress, [0.78, 0.80], [0, 1]);
  const act4StatementOp = useTransform(scrollYProgress, [0.80, 0.84], [0, 1]);
  const act4ClosingOp = useTransform(scrollYProgress, [0.84, 0.88], [0, 1]);

  const headingSize = isMobile ? 'clamp(3rem, 13vw, 4.5rem)' : 'clamp(3.5rem, 8vw, 6rem)';

  return (
    <div ref={containerRef} className="relative" style={{ height: scrollH }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: solidBg }}>

        {/* ─── Background: Crucible ─── */}
        <motion.div className="absolute inset-0" style={{ opacity: act1BgOp, zIndex: 1 }}>
          <ImageBackground src={crucibleImg} />
          <CrucibleEffects isMobile={isMobile} isDark={isDark} />
          <div className="absolute inset-0" style={{ background: crucibleOverlay }} />
          <Grain />
          <GoldParticles />
          <ShimmerLine />
        </motion.div>

        {/* ─── Background: The Way ─── */}
        <motion.div className="absolute inset-0" style={{ opacity: act2BgOp, zIndex: 2 }}>
          <ImageBackground src={wayImg} variant="drift" />
          <WayEffects isMobile={isMobile} isDark={isDark} />
          <div className="absolute inset-0" style={{ background: wayOverlay }} />
          <Grain />
          <GoldParticles />
          <ShimmerLine />
        </motion.div>

        {/* ─── Background: Crucible Return (Acts 3-4) ─── */}
        <motion.div className="absolute inset-0" style={{ opacity: crucibleReturnOp, zIndex: 3 }}>
          <ImageBackground src={crucibleImg} />
          <MergeEffects isMobile={isMobile} isDark={isDark} />
          <div className="absolute inset-0" style={{ background: crucibleReturnOverlay }} />
          <Grain />
          <GoldParticles />
          <ShimmerLine />
          <CornerBrackets />
        </motion.div>

        {/* ─── ACT 1 Content ─── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-8 text-center"
          style={{ opacity: act1LabelOp }}
        >
          {/* Tight radial frost behind gold heading for light mode */}
          {!isDark && (
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: isMobile ? '240px' : '320px',
                height: isMobile ? '100px' : '120px',
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.35) 50%, transparent 80%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                zIndex: -1,
                transform: 'translateY(-8px)',
              }}
            />
          )}
          {/* Heading glow */}
          <div className="absolute w-[400px] h-[300px] rounded-full pointer-events-none" style={{ background: headingGlowBg }} />

          <motion.p
            className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.28em] text-gold mb-4 md:mb-5"
            style={{ opacity: act1LabelOp, textShadow: videoSubShadow }}
          >
            The First Word
          </motion.p>

          <motion.h2
            className="font-serif text-gold"
            style={{
              opacity: act1HeadingOp,
              scale: act1HeadingScale,
              y: act1HeadingY,
              fontSize: headingSize,
              letterSpacing: '0.04em',
              textShadow: videoTextShadow,
              willChange: 'transform',
            }}
          >
            Crucible
          </motion.h2>

          {/* Gold accent line under heading */}
          <motion.div className="overflow-hidden mt-3 mb-2" style={{ width: act1RuleW, opacity: act1HeadingOp }}>
            <div className="h-[1px] w-full bg-gold/30" />
          </motion.div>

          <motion.p
            className="mt-1"
            style={{
              opacity: act1PhoneticOp,
              color: videoMutedColor,
              textShadow: videoSubShadow,
              fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
              fontSize: isMobile ? '12px' : '14px',
            }}
          >
            /ˈkruː.sɪ.bəl/ · <span className="font-sans italic">noun</span>{isIndia && <> · <span className="font-sans">Hindi: कसौटी (kasauṭī)</span></>}
          </motion.p>

          <motion.p
            className="font-sans leading-[1.8] mt-5 max-w-[480px]"
            style={{
              opacity: act1DefOp,
              color: videoBodyColor,
              textShadow: videoSubShadow,
              fontSize: isMobile ? '14px' : '15px',
              letterSpacing: '0.01em',
            }}
          >
            A vessel where raw material is transformed under intense heat and pressure into something fundamentally stronger.
          </motion.p>
        </motion.div>

        {/* ─── ACT 2 Content ─── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-8 text-center"
          style={{ opacity: act2LabelOp }}
        >
          {/* Tight radial frost behind gold heading for light mode */}
          {!isDark && (
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: isMobile ? '200px' : '280px',
                height: isMobile ? '90px' : '110px',
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.35) 50%, transparent 80%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                zIndex: -1,
                transform: 'translateY(-8px)',
              }}
            />
          )}
          {/* Dark mode scrim */}
          {isDark && (
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '600px',
                height: '500px',
                background: 'radial-gradient(ellipse, hsl(220 30% 6% / 0.65) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: -1,
              }}
            />
          )}

          <div className="absolute w-[400px] h-[300px] rounded-full pointer-events-none" style={{ background: headingGlowBg }} />

          <motion.p
            className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.28em] text-gold mb-4 md:mb-5"
            style={{ opacity: act2LabelOp, textShadow: videoSubShadow }}
          >
            The second word
          </motion.p>

          <motion.h2
            className="font-serif text-gold"
            style={{
              opacity: act2HeadingOp,
              scale: act2HeadingScale,
              y: act2HeadingY,
              fontSize: headingSize,
              letterSpacing: '0.04em',
              textShadow: videoTextShadow,
              willChange: 'transform',
            }}
          >
            Way
          </motion.h2>

          {/* Gold accent line under heading */}
          <motion.div className="overflow-hidden mt-3 mb-2" style={{ width: act2RuleW, opacity: act2HeadingOp }}>
            <div className="h-[1px] w-full bg-gold/30" />
          </motion.div>

          <motion.p
            className="mt-1"
            style={{
              opacity: act2PhoneticOp,
              color: videoMutedColor,
              textShadow: videoSubShadow,
              fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
              fontSize: isMobile ? '12px' : '14px',
            }}
          >
            /weɪ/ · <span className="font-sans italic">noun</span>{isIndia && <> · <span className="font-sans">Hindi: मार्ग (mārg)</span></>}
          </motion.p>

          <motion.p
            className="font-sans leading-[1.8] mt-5 max-w-[480px]"
            style={{
              opacity: act2DefOp,
              color: videoBodyColor,
              textShadow: videoSubShadow,
              fontSize: isMobile ? '14px' : '15px',
              letterSpacing: '0.01em',
            }}
          >
            A path. A method. A discipline. The road one commits to walking.
          </motion.p>
        </motion.div>

        {/* ─── ACT 3: The Equation ─── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-8 text-center"
          style={{ opacity: act3Op }}
        >
          {/* Tight radial frost for light mode */}
          {!isDark && (
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: isMobile ? '260px' : '360px',
                height: isMobile ? '90px' : '110px',
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.35) 50%, transparent 80%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                zIndex: -1,
                transform: 'translateY(-20px)',
              }}
            />
          )}
          <div className="flex items-baseline gap-3 md:gap-5">
            <motion.span
              className="font-serif text-gold uppercase"
              style={{
                x: cruX,
                fontSize: isMobile ? 'clamp(2rem, 9vw, 3rem)' : 'clamp(2.4rem, 5vw, 4rem)',
                letterSpacing: cruLetterSpacing,
              }}
            >
              CRU
            </motion.span>
            <motion.span
              className="font-serif"
              style={{
                opacity: symbolOp,
                fontSize: isMobile ? 'clamp(1rem, 4vw, 1.5rem)' : 'clamp(1.2rem, 2.5vw, 2rem)',
                color: isDark ? 'rgba(255,255,255,0.3)' : 'hsl(228, 45%, 15%, 0.35)',
                textShadow: videoSubShadow,
              }}
            >
              ×
            </motion.span>
            <motion.span
              className="font-serif text-gold uppercase"
              style={{
                x: wayX,
                fontSize: isMobile ? 'clamp(2rem, 9vw, 3rem)' : 'clamp(2.4rem, 5vw, 4rem)',
                letterSpacing: cruLetterSpacing,
              }}
            >
              WAY
            </motion.span>
          </div>

          <motion.div className="mt-6 overflow-hidden" style={{ width: ruleWidth }}>
            <div
              className="h-[1.5px] w-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, hsl(43 78% 50% / 0.4) 20%, hsl(43 78% 50%) 50%, hsl(43 78% 50% / 0.4) 80%, transparent 100%)',
              }}
            />
          </motion.div>

          <motion.p
            className="font-sans text-[10px] md:text-[12px] uppercase tracking-[0.22em] mt-5"
            style={{ opacity: taglineOp, color: videoMutedColor, textShadow: videoSubShadow }}
          >
            The crucible of conviction · The discipline of the path
          </motion.p>

          <motion.p
            className="font-sans leading-[1.75] mt-4 max-w-[520px]"
            style={{
              opacity: act3ExplainOp,
              color: videoBodyColor,
              textShadow: videoSubShadow,
              fontSize: isMobile ? '13px' : '14px',
              letterSpacing: '0.01em',
            }}
          >
            We believe that building something enduring demands both: the pressure that forges conviction, and the discipline to walk the path every single day.
          </motion.p>
        </motion.div>

        {/* ─── ACT 4: The Name ─── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-8 text-center"
          style={{ opacity: act4Op, scale: act4Scale, willChange: 'transform' }}
        >
          {/* Frosted scrim for light mode readability */}
          {!isDark && (
            <div
              className="absolute rounded-2xl pointer-events-none"
              style={{
                width: isMobile ? '92%' : '560px',
                height: isMobile ? '65%' : '360px',
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 60%, transparent 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                zIndex: -1,
              }}
            />
          )}
          <p
            className="font-serif text-gold tracking-[-0.02em]"
            style={{
              fontSize: isMobile ? 'clamp(3.2rem, 14vw, 5rem)' : 'clamp(4rem, 9vw, 7rem)',
              textShadow: wordmarkShadow,
            }}
          >
            Cruxway
          </p>

          <motion.div className="mt-5" style={{ opacity: act4DividerOp }}>
            <div className="h-[1.5px] w-[80px] mx-auto bg-gold/40" />
          </motion.div>

          <motion.p
            className="font-sans leading-[1.8] mt-5 max-w-[480px]"
            style={{
              opacity: act4StatementOp,
              color: videoBodyColor,
              textShadow: videoSubShadow,
              fontSize: isMobile ? '14px' : '15px',
              letterSpacing: '0.01em',
            }}
          >
            The path to building something enduring runs through the crucible. There are no shortcuts.
          </motion.p>

          <motion.p
            className="font-sans text-[10px] md:text-[12px] font-semibold uppercase tracking-[0.22em] mt-8"
            style={{ opacity: act4ClosingOp, color: videoMutedColor, textShadow: videoSubShadow }}
          >
            Forging conviction through rigour
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default CruxwayOriginStory;
