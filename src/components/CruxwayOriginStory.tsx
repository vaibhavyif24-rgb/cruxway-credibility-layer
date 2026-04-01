import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import crucibleImage from '@/assets/cruxway-crucible.jpg';
import wayImage from '@/assets/cruxway-way.jpg';

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

type MediaImageProps = {
  alt: string;
  className?: string;
  scale: MotionValue<number>;
  src: string;
};

const MediaImage = ({ src, alt, scale, className = '' }: MediaImageProps) => (
  <motion.img
    alt={alt}
    className={`absolute inset-0 h-full w-full object-cover ${className}`}
    fetchPriority="high"
    loading="eager"
    src={src}
    style={{ scale, willChange: 'transform' }}
  />
);

const CruxwayOriginStory = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const overlay = isDark
    ? 'linear-gradient(to bottom, hsl(var(--navy-deep) / 0.18) 0%, hsl(var(--navy-deep) / 0.34) 50%, hsl(var(--navy-deep) / 0.56) 100%)'
    : 'linear-gradient(to bottom, hsl(var(--background) / 0.16) 0%, hsl(var(--background) / 0.32) 50%, hsl(var(--background) / 0.56) 100%)';

  const sectionBase = isDark ? 'hsl(var(--navy-deep))' : 'hsl(var(--background))';
  const bodyColor = isDark ? 'hsl(var(--primary-foreground) / 0.74)' : 'hsl(var(--foreground) / 0.58)';
  const mutedColor = isDark ? 'hsl(var(--primary-foreground) / 0.48)' : 'hsl(var(--foreground) / 0.42)';
  const symbolColor = isDark ? 'hsl(var(--primary-foreground) / 0.34)' : 'hsl(var(--foreground) / 0.24)';

  const textShadow = '0 2px 20px rgba(0,0,0,0.72), 0 0 40px rgba(0,0,0,0.3)';
  const subShadow = '0 1px 10px rgba(0,0,0,0.42)';
  const wordmarkShadow = isDark
    ? '0 0 60px hsl(var(--gold) / 0.22), 0 4px 30px rgba(0,0,0,0.6)'
    : '0 4px 24px rgba(0,0,0,0.16)';

  const crucibleScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);
  const wayScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02]);

  const mobileCrucibleOpacity = useTransform(scrollYProgress, [0.22, 0.42], [1, 0]);
  const mobileWayOpacity = useTransform(scrollYProgress, [0.22, 0.42], [0, 1]);
  const mobilePhase1Opacity = useTransform(scrollYProgress, [0, 0.02, 0.16, 0.24], [1, 1, 1, 0]);
  const mobilePhase2Opacity = useTransform(scrollYProgress, [0.30, 0.38, 0.54, 0.62], [0, 1, 1, 0]);
  const mobilePhase3Opacity = useTransform(scrollYProgress, [0.60, 0.68, 0.78, 0.84], [0, 1, 1, 0]);
  const mobilePhase3Rule = useTransform(scrollYProgress, [0.68, 0.76], [0, 110]);
  const mobilePhase4Opacity = useTransform(scrollYProgress, [0.82, 0.90, 0.96, 1], [0, 1, 1, 1]);
  const mobilePhase4Scale = useTransform(scrollYProgress, [0.82, 0.90], [0.95, 1]);

  const leftWidth = useTransform(scrollYProgress, [0, 0.20, 0.42], ['100%', '100%', '50%']);
  const rightWidth = useTransform(scrollYProgress, [0, 0.20, 0.42], ['0%', '0%', '50%']);
  const seamOpacity = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);
  const seamHeight = useTransform(scrollYProgress, [0.30, 0.46], ['0%', '100%']);

  const phase1Opacity = useTransform(scrollYProgress, [0, 0.02, 0.18, 0.26], [1, 1, 1, 0]);
  const phase2Opacity = useTransform(scrollYProgress, [0.40, 0.48, 0.60, 0.68], [0, 1, 1, 0]);
  const phase3Opacity = useTransform(scrollYProgress, [0.62, 0.70, 0.78, 0.84], [0, 1, 1, 0]);
  const phase3Rule = useTransform(scrollYProgress, [0.70, 0.78], [0, 140]);
  const phase4Opacity = useTransform(scrollYProgress, [0.82, 0.90, 0.96, 1], [0, 1, 1, 1]);
  const phase4Scale = useTransform(scrollYProgress, [0.82, 0.90], [0.95, 1]);

  if (isMobile) {
    return (
      <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: sectionBase }}>
          <motion.div className="absolute inset-0" style={{ opacity: mobileWayOpacity, zIndex: 1 }}>
            <MediaImage alt="Long road stretching toward the horizon" scale={wayScale} src={wayImage} />
            <div className="absolute inset-0" style={{ background: overlay }} />
            <Grain />
          </motion.div>

          <motion.div className="absolute inset-0" style={{ opacity: mobileCrucibleOpacity, zIndex: 2 }}>
            <MediaImage alt="Bright crucible with flames and molten heat" scale={crucibleScale} src={crucibleImage} />
            <div className="absolute inset-0" style={{ background: overlay }} />
            <Grain />
          </motion.div>

          <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: mobilePhase1Opacity }}>
            <h2 className="font-serif text-gold uppercase tracking-[0.12em]" style={{ fontSize: 'clamp(2.6rem, 11vw, 4.25rem)', textShadow }}>
              Crucible
            </h2>
            <p className="mt-4 max-w-[320px] font-sans text-[13px] leading-[1.6]" style={{ color: bodyColor, textShadow: subShadow }}>
              A vessel where raw material is transformed under pressure.
            </p>
          </motion.div>

          <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: mobilePhase2Opacity }}>
            <h2 className="font-serif text-gold uppercase tracking-[0.12em]" style={{ fontSize: 'clamp(2.35rem, 10vw, 4rem)', textShadow }}>
              The Way
            </h2>
            <p className="mt-4 max-w-[320px] font-sans text-[13px] leading-[1.6]" style={{ color: bodyColor, textShadow: subShadow }}>
              The discipline that guides the transformation.
            </p>
          </motion.div>

          <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: mobilePhase3Opacity }}>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-gold uppercase tracking-[0.18em]" style={{ fontSize: 'clamp(2rem, 8vw, 3.25rem)', textShadow }}>
                CRU
              </span>
              <span className="font-serif" style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', color: symbolColor, textShadow }}>
                ×
              </span>
              <span className="font-serif text-gold uppercase tracking-[0.18em]" style={{ fontSize: 'clamp(2rem, 8vw, 3.25rem)', textShadow }}>
                WAY
              </span>
            </div>
            <motion.div className="mt-5 overflow-hidden" style={{ width: mobilePhase3Rule }}>
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, hsl(var(--gold) / 0.35) 20%, hsl(var(--gold)) 50%, hsl(var(--gold) / 0.35) 80%, transparent 100%)' }} />
            </motion.div>
            <p className="mt-4 max-w-[320px] font-sans text-[10px] uppercase tracking-[0.22em]" style={{ color: mutedColor, textShadow: subShadow }}>
              The crucible of conviction · The way forward
            </p>
          </motion.div>

          <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: mobilePhase4Opacity, scale: mobilePhase4Scale }}>
            <p className="font-serif text-gold tracking-[-0.02em]" style={{ fontSize: 'clamp(3rem, 12vw, 5.25rem)', textShadow: wordmarkShadow }}>
              Cruxway
            </p>
            <div className="mt-4 h-[1.5px] w-[68px] bg-gold/50" />
            <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.18em]" style={{ color: mutedColor }}>
              Forging conviction through rigour.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: sectionBase }}>
        <motion.div className="absolute left-0 top-0 h-full overflow-hidden" style={{ width: leftWidth, zIndex: 2 }}>
          <MediaImage alt="Bright crucible with flames and molten heat" scale={crucibleScale} src={crucibleImage} />
          <div className="absolute inset-0" style={{ background: overlay }} />
          <Grain />

          <motion.div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center" style={{ opacity: phase2Opacity }}>
            <h3 className="font-serif text-gold uppercase tracking-[0.11em]" style={{ fontSize: 'clamp(1.85rem, 4vw, 3.1rem)', textShadow }}>
              Crucible
            </h3>
            <p className="mt-3 max-w-[260px] font-sans text-[13px] md:text-[15px] leading-[1.55]" style={{ color: bodyColor, textShadow: subShadow }}>
              Where conviction is forged.
            </p>
          </motion.div>
        </motion.div>

        <motion.div className="absolute right-0 top-0 h-full overflow-hidden" style={{ width: rightWidth, zIndex: 1 }}>
          <MediaImage alt="Long road stretching toward the horizon" scale={wayScale} src={wayImage} />
          <div className="absolute inset-0" style={{ background: overlay }} />
          <Grain />

          <motion.div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center" style={{ opacity: phase2Opacity }}>
            <h3 className="font-serif text-gold uppercase tracking-[0.11em]" style={{ fontSize: 'clamp(1.85rem, 4vw, 3.1rem)', textShadow }}>
              The Way
            </h3>
            <p className="mt-3 max-w-[260px] font-sans text-[13px] md:text-[15px] leading-[1.55]" style={{ color: bodyColor, textShadow: subShadow }}>
              The discipline that guides the transformation.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-0 z-20 w-[2px] -translate-x-1/2"
          style={{
            height: seamHeight,
            opacity: seamOpacity,
            background: 'hsl(var(--gold) / 0.72)',
            boxShadow: '0 0 14px hsl(var(--gold) / 0.32)',
          }}
        />

        <motion.div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center" style={{ opacity: phase1Opacity }}>
          <h2 className="font-serif text-gold uppercase tracking-[0.12em]" style={{ fontSize: 'clamp(2.9rem, 7vw, 5.7rem)', textShadow }}>
            Crucible
          </h2>
          <p className="mt-4 max-w-[400px] font-sans text-[13px] md:text-[15px] leading-[1.6]" style={{ color: bodyColor, textShadow: subShadow }}>
            A vessel where raw material is transformed under pressure.
          </p>
        </motion.div>

        <motion.div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center" style={{ opacity: phase3Opacity }}>
          <div className="flex items-baseline gap-3 md:gap-4">
            <span className="font-serif text-gold uppercase tracking-[0.18em]" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', textShadow }}>
              CRU
            </span>
            <span className="font-serif" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.8rem)', color: symbolColor, textShadow }}>
              ×
            </span>
            <span className="font-serif text-gold uppercase tracking-[0.18em]" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', textShadow }}>
              WAY
            </span>
          </div>
          <motion.div className="mt-6 overflow-hidden" style={{ width: phase3Rule }}>
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, hsl(var(--gold) / 0.35) 20%, hsl(var(--gold)) 50%, hsl(var(--gold) / 0.35) 80%, transparent 100%)' }} />
          </motion.div>
          <p className="mt-5 font-sans text-[11px] md:text-[13px] uppercase tracking-[0.24em]" style={{ color: mutedColor, textShadow: subShadow }}>
            The crucible of conviction · The way forward
          </p>
        </motion.div>

        <motion.div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center" style={{ opacity: phase4Opacity, scale: phase4Scale }}>
          <p className="font-serif text-gold tracking-[-0.02em]" style={{ fontSize: 'clamp(3.2rem, 8.5vw, 6.75rem)', textShadow: wordmarkShadow }}>
            Cruxway
          </p>
          <div className="mt-5 h-[1.5px] w-[80px] bg-gold/50" />
          <p className="mt-4 font-sans text-[12px] md:text-[14px] uppercase tracking-[0.18em]" style={{ color: mutedColor }}>
            Forging conviction through rigour.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CruxwayOriginStory;
