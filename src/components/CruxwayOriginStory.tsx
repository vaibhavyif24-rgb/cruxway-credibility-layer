import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

/* ─── Grain overlay ─── */
const Grain = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.03]"
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
  poster,
  style,
  className = '',
}: {
  src: string;
  poster?: string;
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
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      style={{ willChange: 'transform', ...style }}
    />
  );
};

/* ─── Pexels video sources ─── */
const CRUCIBLE_VIDEO = 'https://videos.pexels.com/video-files/5547729/5547729-hd_1920_1080_25fps.mp4';
const WAY_VIDEO = 'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4';

const ease = [0.22, 1, 0.36, 1] as const;

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

  /* ─── Overlay colors ─── */
  const darkOverlay = 'linear-gradient(to bottom, hsl(228 55% 8% / 0.55) 0%, hsl(228 55% 8% / 0.72) 50%, hsl(228 55% 8% / 0.85) 100%)';
  const lightOverlay = 'linear-gradient(to bottom, hsl(40 25% 96% / 0.35) 0%, hsl(40 25% 96% / 0.52) 50%, hsl(40 25% 96% / 0.7) 100%)';
  const overlay = isDark ? darkOverlay : lightOverlay;

  const solidBg = isDark ? 'hsl(228, 55%, 8%)' : 'hsl(40, 25%, 96%)';
  const bodyColor = isDark ? 'rgba(255,255,255,0.72)' : 'rgba(11,33,50,0.6)';
  const mutedColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(11,33,50,0.4)';
  const symbolColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(11,33,50,0.2)';
  const textShadow = '0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.25)';
  const subShadow = '0 1px 10px rgba(0,0,0,0.35)';
  const wordmarkShadow = isDark
    ? '0 0 60px hsl(43 78% 50% / 0.15), 0 4px 30px rgba(0,0,0,0.5)'
    : '0 4px 24px rgba(0,0,0,0.12)';

  /* ─── ACT 1: Crucible (0 → 0.22) ─── */
  const act1VideoOpacity = useTransform(scrollYProgress, [0, 0.18, 0.25], [1, 1, 0]);
  const act1LabelOp = useTransform(scrollYProgress, [0, 0.01, 0.04, 0.18], [0, 1, 1, 0]);
  const act1HeadingOp = useTransform(scrollYProgress, [0.01, 0.04, 0.05, 0.18], [0, 0, 1, 0]);
  const act1HeadingScale = useTransform(scrollYProgress, [0.01, 0.05], [0.92, 1]);
  const act1PhoneticOp = useTransform(scrollYProgress, [0.03, 0.06, 0.18], [0, 1, 0]);
  const act1Def1Op = useTransform(scrollYProgress, [0.05, 0.08, 0.18], [0, 1, 0]);
  const act1Def2Op = useTransform(scrollYProgress, [0.08, 0.12, 0.18], [0, 1, 0]);

  /* ─── ACT 2: The Way (0.22 → 0.45) ─── */
  const act2VideoOpacity = useTransform(scrollYProgress, [0.18, 0.25, 0.40, 0.47], [0, 1, 1, 0]);
  const act2LabelOp = useTransform(scrollYProgress, [0.25, 0.28, 0.40], [0, 1, 0]);
  const act2HeadingOp = useTransform(scrollYProgress, [0.26, 0.30, 0.40], [0, 1, 0]);
  const act2HeadingScale = useTransform(scrollYProgress, [0.26, 0.30], [0.92, 1]);
  const act2PhoneticOp = useTransform(scrollYProgress, [0.28, 0.31, 0.40], [0, 1, 0]);
  const act2Def1Op = useTransform(scrollYProgress, [0.30, 0.33, 0.40], [0, 1, 0]);
  const act2Def2Op = useTransform(scrollYProgress, [0.33, 0.37, 0.40], [0, 1, 0]);

  /* ─── ACT 3: The Equation (0.45 → 0.65) ─── */
  const solidBgOp = useTransform(scrollYProgress, [0.42, 0.48, 0.92, 1], [0, 1, 1, 1]);
  const act3Op = useTransform(scrollYProgress, [0.47, 0.52, 0.62, 0.67], [0, 1, 1, 0]);
  const cruX = useTransform(scrollYProgress, isMobile ? [0.47, 0.52] : [0.47, 0.52], isMobile ? [0, 0] : [-60, 0]);
  const wayX = useTransform(scrollYProgress, isMobile ? [0.47, 0.52] : [0.47, 0.52], isMobile ? [0, 0] : [60, 0]);
  const symbolOp = useTransform(scrollYProgress, [0.51, 0.54], [0, 1]);
  const ruleWidth = useTransform(scrollYProgress, [0.53, 0.58], [0, 120]);
  const taglineOp = useTransform(scrollYProgress, [0.56, 0.60], [0, 1]);

  /* ─── ACT 4: The Name (0.67 → 0.92) ─── */
  const act4Op = useTransform(scrollYProgress, [0.67, 0.73, 0.92, 1], [0, 1, 1, 1]);
  const act4Scale = useTransform(scrollYProgress, [0.67, 0.73], [0.92, 1]);
  const act4DividerOp = useTransform(scrollYProgress, [0.73, 0.76], [0, 1]);
  const act4StatementOp = useTransform(scrollYProgress, [0.75, 0.80], [0, 1]);
  const act4ClosingOp = useTransform(scrollYProgress, [0.80, 0.85], [0, 1]);

  return (
    <div ref={containerRef} className="relative" style={{ height: scrollH }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: solidBg }}>

        {/* ─── Video: Crucible ─── */}
        <motion.div className="absolute inset-0" style={{ opacity: act1VideoOpacity, zIndex: 1 }}>
          <VideoLayer src={CRUCIBLE_VIDEO} />
          <div className="absolute inset-0" style={{ background: overlay }} />
          <Grain />
        </motion.div>

        {/* ─── Video: The Way ─── */}
        <motion.div className="absolute inset-0" style={{ opacity: act2VideoOpacity, zIndex: 2 }}>
          <VideoLayer src={WAY_VIDEO} />
          <div className="absolute inset-0" style={{ background: overlay }} />
          <Grain />
        </motion.div>

        {/* ─── Solid background for Acts 3–4 ─── */}
        <motion.div className="absolute inset-0" style={{ opacity: solidBgOp, zIndex: 3, background: solidBg }} />

        {/* ─── ACT 1 Content ─── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-8 text-center"
          style={{ opacity: act1LabelOp }}
        >
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
              fontSize: isMobile ? 'clamp(2.8rem, 12vw, 4rem)' : 'clamp(3.2rem, 7vw, 5.5rem)',
              textShadow,
              willChange: 'transform',
            }}
          >
            Crucible
          </motion.h2>

          <motion.p
            className="font-sans italic text-[13px] md:text-[14px] mt-3"
            style={{ opacity: act1PhoneticOp, color: mutedColor, textShadow: subShadow }}
          >
            /ˈkruː.sɪ.bəl/ · <em>noun</em>
          </motion.p>

          <motion.p
            className="font-sans text-[13px] md:text-[15px] leading-[1.75] mt-4 max-w-[520px]"
            style={{ opacity: act1Def1Op, color: bodyColor, textShadow: subShadow }}
          >
            "A vessel in which raw material is subjected to intense heat, pressure, and transformation. What emerges is fundamentally changed: refined, stronger, and purified of what does not serve."
          </motion.p>

          <motion.p
            className="font-sans text-[13px] md:text-[15px] leading-[1.75] mt-4 max-w-[520px]"
            style={{ opacity: act1Def2Op, color: bodyColor, textShadow: subShadow }}
          >
            "In private equity, every investment is a crucible. Capital alone changes nothing. Conviction under pressure: that is what transforms a company."
          </motion.p>
        </motion.div>

        {/* ─── ACT 2 Content ─── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-8 text-center"
          style={{ opacity: act2LabelOp }}
        >
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
              fontSize: isMobile ? 'clamp(2.8rem, 12vw, 4rem)' : 'clamp(3.2rem, 7vw, 5.5rem)',
              textShadow,
              willChange: 'transform',
            }}
          >
            Way
          </motion.h2>

          <motion.p
            className="font-sans italic text-[13px] md:text-[14px] mt-3"
            style={{ opacity: act2PhoneticOp, color: mutedColor, textShadow: subShadow }}
          >
            /weɪ/ · <em>noun</em>
          </motion.p>

          <motion.p
            className="font-sans text-[13px] md:text-[15px] leading-[1.75] mt-4 max-w-[520px]"
            style={{ opacity: act2Def1Op, color: bodyColor, textShadow: subShadow }}
          >
            "A path, a method, a discipline. In Hindi: मार्ग (mārg), the road one commits to walking."
          </motion.p>

          <motion.p
            className="font-sans text-[13px] md:text-[15px] leading-[1.75] mt-4 max-w-[520px]"
            style={{ opacity: act2Def2Op, color: bodyColor, textShadow: subShadow }}
          >
            "Not just a direction. A deliberate practice. The way you do one thing is the way you do everything."
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
                letterSpacing: '0.2em',
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
                letterSpacing: '0.2em',
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

          <motion.div
            className="mt-5"
            style={{ opacity: act4DividerOp }}
          >
            <div className="h-[1.5px] w-[80px] mx-auto bg-gold/40" />
          </motion.div>

          <motion.p
            className="font-sans text-[13px] md:text-[15px] leading-[1.8] mt-5 max-w-[480px]"
            style={{ opacity: act4StatementOp, color: bodyColor }}
          >
            We named ourselves after what we believe: that the path to building something enduring runs through the crucible. There are no shortcuts. Only the discipline of showing up, day after day, with conviction.
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
