import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

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

/* ─── Video layer with IntersectionObserver ─── */
const VideoLayer = ({
  src,
  style,
  className = '',
}: {
  src: string;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: '500px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      style={{ willChange: 'transform', ...style }}
    />
  );
};

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

/* ─── Pexels video sources ─── */
const CRUCIBLE_VIDEO = 'https://videos.pexels.com/video-files/3170469/3170469-hd_1920_1080_25fps.mp4';
const WAY_VIDEO = 'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4';

const CruxwayOriginStory = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scrollH = isMobile ? '350vh' : '400vh';

  /* ─── Separate overlays: Crucible (lighter) vs Way (heavier) ─── */
  const crucibleOverlay = isDark
    ? 'linear-gradient(to bottom, hsl(228 55% 8% / 0.35) 0%, hsl(228 55% 8% / 0.50) 50%, hsl(228 55% 8% / 0.70) 100%)'
    : 'linear-gradient(to bottom, hsl(40 25% 96% / 0.25) 0%, hsl(40 25% 96% / 0.42) 50%, hsl(40 25% 96% / 0.62) 100%)';

  const wayOverlay = isDark
    ? 'linear-gradient(to bottom, hsl(228 55% 8% / 0.60) 0%, hsl(228 55% 8% / 0.72) 50%, hsl(228 55% 8% / 0.82) 100%)'
    : 'linear-gradient(to bottom, hsl(40 25% 20% / 0.50) 0%, hsl(40 25% 15% / 0.62) 50%, hsl(40 25% 10% / 0.72) 100%)';

  const solidBg = isDark ? 'hsl(228, 55%, 8%)' : 'hsl(40, 25%, 96%)';
  const bodyColor = isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.55)';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';
  const symbolColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)';
  const textShadow = isDark
    ? '0 2px 24px rgba(0,0,0,0.7)'
    : '0 1px 12px rgba(255,255,255,0.8)';
  const subShadow = isDark
    ? '0 1px 12px rgba(0,0,0,0.5)'
    : '0 1px 8px rgba(255,255,255,0.6)';
  const wordmarkShadow = isDark
    ? '0 0 60px hsl(43 78% 50% / 0.15), 0 4px 30px rgba(0,0,0,0.5)'
    : '0 4px 24px rgba(0,0,0,0.12)';

  /* heading glow */
  const headingGlowBg = isDark
    ? 'radial-gradient(circle, hsl(43 78% 50% / 0.04), transparent 70%)'
    : 'radial-gradient(circle, hsl(43 78% 50% / 0.06), transparent 70%)';

  /* ─── ACT 1: Crucible (0.00 → 0.28) ─── */
  const act1VideoOp = useTransform(scrollYProgress, [0, 0.20, 0.28], [1, 1, 0]);
  const act1LabelOp = useTransform(scrollYProgress, [0.02, 0.05, 0.22, 0.28], [0, 1, 1, 0]);
  const act1HeadingOp = useTransform(scrollYProgress, [0.03, 0.08, 0.22, 0.28], [0, 1, 1, 0]);
  const act1HeadingScale = useTransform(scrollYProgress, [0.03, 0.08], [0.92, 1]);
  const act1HeadingY = useTransform(scrollYProgress, [0.03, 0.08], [20, 0]);
  const act1RuleW = useTransform(scrollYProgress, [0.05, 0.10], [0, 48]);
  const act1PhoneticOp = useTransform(scrollYProgress, [0.05, 0.09, 0.22, 0.28], [0, 1, 1, 0]);
  const act1DefOp = useTransform(scrollYProgress, [0.07, 0.12, 0.22, 0.28], [0, 1, 1, 0]);

  /* ─── ACT 2: The Way (0.22 → 0.52) ─── */
  const act2VideoOp = useTransform(scrollYProgress, [0.22, 0.28, 0.46, 0.52], [0, 1, 1, 0]);
  const act2LabelOp = useTransform(scrollYProgress, [0.32, 0.36, 0.46, 0.52], [0, 1, 1, 0]);
  const act2HeadingOp = useTransform(scrollYProgress, [0.33, 0.38, 0.46, 0.52], [0, 1, 1, 0]);
  const act2HeadingScale = useTransform(scrollYProgress, [0.33, 0.38], [0.92, 1]);
  const act2HeadingY = useTransform(scrollYProgress, [0.33, 0.38], [20, 0]);
  const act2RuleW = useTransform(scrollYProgress, [0.35, 0.40], [0, 48]);
  const act2PhoneticOp = useTransform(scrollYProgress, [0.35, 0.39, 0.46, 0.52], [0, 1, 1, 0]);
  const act2DefOp = useTransform(scrollYProgress, [0.37, 0.42, 0.46, 0.52], [0, 1, 1, 0]);

  /* ─── ACT 3: The Equation (0.50 → 0.72) ─── */
  const solidBgOp = useTransform(scrollYProgress, [0.48, 0.52, 0.92, 1], [0, 1, 1, 1]);
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

        {/* ─── Video: Crucible ─── */}
        <motion.div className="absolute inset-0" style={{ opacity: act1VideoOp, zIndex: 1 }}>
          <VideoLayer src={CRUCIBLE_VIDEO} />
          <div className="absolute inset-0" style={{ background: crucibleOverlay }} />
          <Grain />
          <GoldParticles />
          <ShimmerLine />
        </motion.div>

        {/* ─── Video: The Way ─── */}
        <motion.div className="absolute inset-0" style={{ opacity: act2VideoOp, zIndex: 2 }}>
          <VideoLayer src={WAY_VIDEO} />
          <div className="absolute inset-0" style={{ background: wayOverlay }} />
          <Grain />
          <GoldParticles />
          <ShimmerLine />
        </motion.div>

        {/* ─── Solid background for Acts 3-4 ─── */}
        <motion.div className="absolute inset-0" style={{ opacity: solidBgOp, zIndex: 3, background: solidBg }}>
          <CornerBrackets />
        </motion.div>

        {/* ─── ACT 1 Content ─── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-8 text-center"
          style={{ opacity: act1LabelOp }}
        >
          {/* Heading glow */}
          <div className="absolute w-[400px] h-[300px] rounded-full pointer-events-none" style={{ background: headingGlowBg }} />

          <motion.p
            className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.28em] text-gold mb-4 md:mb-5"
            style={{ opacity: act1LabelOp, textShadow: subShadow }}
          >
            What's in a name
          </motion.p>

          <motion.h2
            className="font-serif text-gold"
            style={{
              opacity: act1HeadingOp,
              scale: act1HeadingScale,
              y: act1HeadingY,
              fontSize: headingSize,
              letterSpacing: '0.04em',
              textShadow,
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
              color: mutedColor,
              textShadow: subShadow,
              fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
              fontSize: isMobile ? '12px' : '14px',
            }}
          >
            /ˈkruː.sɪ.bəl/ · <span className="font-sans italic">noun</span>
          </motion.p>

          <motion.p
            className="font-sans leading-[1.8] mt-5 max-w-[480px]"
            style={{
              opacity: act1DefOp,
              color: bodyColor,
              textShadow: subShadow,
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
          {/* Dark scrim backdrop for readability over bright road video */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '500px',
              height: '400px',
              background: isDark
                ? 'radial-gradient(ellipse, hsl(228 55% 6% / 0.6) 0%, transparent 70%)'
                : 'radial-gradient(ellipse, hsl(40 20% 15% / 0.4) 0%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: -1,
            }}
          />

          <div className="absolute w-[400px] h-[300px] rounded-full pointer-events-none" style={{ background: headingGlowBg }} />

          <motion.p
            className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.28em] text-gold mb-4 md:mb-5"
            style={{ opacity: act2LabelOp, textShadow: subShadow }}
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
              textShadow,
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
              color: mutedColor,
              textShadow: subShadow,
              fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
              fontSize: isMobile ? '12px' : '14px',
            }}
          >
            /weɪ/ · <span className="font-sans italic">noun</span> · Hindi: मार्ग (mārg)
          </motion.p>

          <motion.p
            className="font-sans leading-[1.8] mt-5 max-w-[480px]"
            style={{
              opacity: act2DefOp,
              color: bodyColor,
              textShadow: subShadow,
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
                color: symbolColor,
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
            style={{ opacity: taglineOp, color: mutedColor }}
          >
            The crucible of conviction · The discipline of the path
          </motion.p>

          <motion.p
            className="font-sans leading-[1.75] mt-4 max-w-[520px]"
            style={{
              opacity: act3ExplainOp,
              color: bodyColor,
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
              color: bodyColor,
              fontSize: isMobile ? '14px' : '15px',
              letterSpacing: '0.01em',
            }}
          >
            The path to building something enduring runs through the crucible. There are no shortcuts.
          </motion.p>

          <motion.p
            className="font-sans text-[10px] md:text-[12px] font-semibold uppercase tracking-[0.22em] mt-8"
            style={{ opacity: act4ClosingOp, color: mutedColor }}
          >
            Forging conviction through rigour
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default CruxwayOriginStory;
