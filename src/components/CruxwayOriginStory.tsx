import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useRegion } from '@/contexts/RegionContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { SectionLabel, FadeIn, GoldRule } from '@/components/ui/Section';

/* ------------------------------------------------------------------ */
/*  Pexels media (free-to-use)                                        */
/* ------------------------------------------------------------------ */
const CRUCIBLE_VIDEO = 'https://videos.pexels.com/video-files/7518826/7518826-uhd_2732_1440_25fps.mp4';
const CRUCIBLE_POSTER = 'https://images.pexels.com/videos/7518826/pexels-photo-7518826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

const WAY_VIDEO = 'https://videos.pexels.com/video-files/34373737/14561661_2560_1440_60fps.mp4';
const WAY_POSTER = 'https://images.pexels.com/videos/34373737/18th-century-architecture-4k-4k-background-4k-footage-34373737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

/* ------------------------------------------------------------------ */
/*  Noise overlay (matches CinematicHero grain)                       */
/* ------------------------------------------------------------------ */
const Grain = () => (
  <div
    className="absolute inset-0 z-[3] pointer-events-none opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
    }}
  />
);

/* ------------------------------------------------------------------ */
/*  Intersection-observed video                                       */
/* ------------------------------------------------------------------ */
const LazyVideo = ({ src, poster }: { src: string; poster: string }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { e.isIntersecting ? el.play().catch(() => {}) : el.pause(); },
      { threshold: 0.15 },
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
      className="absolute inset-0 w-full h-full object-cover"
      style={{ willChange: 'transform' }}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Media panel with parallax, overlay & grain                        */
/* ------------------------------------------------------------------ */
interface MediaPanelProps {
  videoSrc: string;
  poster: string;
  gradientDir: string; // 'to right' | 'to left' | 'to bottom'
  isDark: boolean;
}

const MediaPanel = ({ videoSrc, poster, gradientDir, isDark }: MediaPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '4%']);

  const overlayBg = isDark
    ? `linear-gradient(${gradientDir}, transparent 0%, hsl(228 55% 8% / 0.75) 85%, hsl(228 55% 8% / 0.95) 100%)`
    : `linear-gradient(${gradientDir}, transparent 0%, hsl(40 25% 96% / 0.7) 80%, hsl(40 25% 96% / 0.95) 100%)`;

  const vignette = 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.15) 100%)';

  return (
    <div ref={panelRef} className="relative w-full h-full overflow-hidden">
      <motion.div className="absolute inset-[-4%]" style={{ y, willChange: 'transform' }}>
        <LazyVideo src={videoSrc} poster={poster} />
      </motion.div>
      <div className="absolute inset-0 z-[1]" style={{ background: overlayBg }} />
      <div className="absolute inset-0 z-[2]" style={{ background: vignette }} />
      <Grain />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Act text block                                                    */
/* ------------------------------------------------------------------ */
interface ActTextProps {
  number: string;
  label: string;
  heading: string;
  body: string[];
  isDark: boolean;
}

const ActText = ({ number, label, heading, body, isDark }: ActTextProps) => (
  <div className="flex flex-col justify-center h-full px-6 py-10 md:px-12 lg:px-16">
    <FadeIn>
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-gold mb-4">
        {number} — {label}
      </p>
    </FadeIn>
    <FadeIn delay={0.08}>
      <h3
        className={`font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] tracking-[-0.02em] mb-3 ${
          isDark ? 'text-primary-foreground' : 'text-foreground'
        }`}
      >
        {heading}
      </h3>
    </FadeIn>
    <FadeIn delay={0.14}>
      <GoldRule className="mb-5" />
    </FadeIn>
    {body.map((p, i) => (
      <FadeIn key={i} delay={0.2 + i * 0.06}>
        <p
          className={`font-sans text-[14px] md:text-[15px] leading-[1.8] max-w-[480px] ${
            i > 0 ? 'mt-4' : ''
          } ${isDark ? 'text-primary-foreground/55' : 'text-muted-foreground'}`}
        >
          {p}
        </p>
      </FadeIn>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Diamond ornament divider                                          */
/* ------------------------------------------------------------------ */
const DiamondDivider = () => (
  <div className="relative w-full py-4 flex items-center justify-center">
    <div
      className="absolute inset-x-0 top-1/2 h-px"
      style={{
        background: 'linear-gradient(90deg, transparent, hsl(40 60% 48% / 0.12), transparent)',
      }}
    />
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-[1] w-[6px] h-[6px] rotate-45 border border-gold/40 bg-background"
    />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
const CruxwayOriginStory = () => {
  const { theme } = useTheme();
  const { region } = useRegion();
  const isDark = theme === 'dark';
  const isIndia = region === 'india';
  const isMobile = useIsMobile();

  const crucibleBody = isIndia
    ? [
        'A crucible is a vessel where raw materials are subjected to extreme heat and pressure until something fundamentally stronger emerges. It demands resilience. It demands patience. It does not forgive shortcuts.',
        'This is how we think about building businesses across India. Every company we partner with enters a process of rigorous transformation — not to become something different, but to become the strongest version of what it already is.',
      ]
    : [
        'A crucible is a vessel where raw materials are subjected to extreme heat and pressure until something fundamentally stronger emerges. It demands resilience. It demands patience. It does not forgive shortcuts.',
        'This is how we think about building businesses. Every company we partner with enters a process of rigorous transformation — not to become something different, but to become the strongest version of what it already is.',
      ];

  const wayBody = isIndia
    ? [
        'The Way is not a destination. It is a practice — a commitment to process, to intellectual honesty, and to the belief that how you invest matters as much as what you invest in.',
        'Every partnership, every decision, every relationship at Cruxway follows this principle: steward what exists, build what endures, and never compromise the path for a shortcut.',
      ]
    : [
        'The Way is not a destination. It is a practice — a commitment to process, to intellectual honesty, and to the belief that how you invest matters as much as what you invest in.',
        'Every partnership, every decision, every relationship at Cruxway follows this principle: steward what exists, build what endures, and never compromise the path for a shortcut.',
      ];

  const gradientDirMobile = 'to bottom';

  return (
    <>
      {/* ---- Entry: "Why Cruxway?" ---- */}
      <section
        className={`relative py-16 md:py-24 ${isDark ? 'bg-primary' : 'bg-background'}`}
      >
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 text-center">
          <FadeIn>
            <SectionLabel light={isDark}>Our Name</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className={`font-serif text-[clamp(2rem,5vw,3.4rem)] leading-[1.1] tracking-[-0.03em] ${
                isDark ? 'text-primary-foreground' : 'text-foreground'
              }`}
            >
              Why{' '}
              <span className="text-gold">Cruxway</span>?
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* ---- Act 1: Crucible ---- */}
      <section
        className={`relative overflow-hidden ${isDark ? 'bg-[hsl(228,55%,8%)]' : 'bg-[hsl(40,25%,96%)]'}`}
      >
        {isMobile ? (
          <>
            <div className="relative h-[45vh]">
              <MediaPanel
                videoSrc={CRUCIBLE_VIDEO}
                poster={CRUCIBLE_POSTER}
                gradientDir={gradientDirMobile}
                isDark={isDark}
              />
            </div>
            <ActText
              number="01"
              label="THE CRUCIBLE"
              heading="Where Conviction Is Forged"
              body={crucibleBody}
              isDark={isDark}
            />
          </>
        ) : (
          <div className="flex min-h-[70vh]">
            <div className="relative w-[55%]">
              <MediaPanel
                videoSrc={CRUCIBLE_VIDEO}
                poster={CRUCIBLE_POSTER}
                gradientDir="to right"
                isDark={isDark}
              />
            </div>
            <div className="w-[45%]">
              <ActText
                number="01"
                label="THE CRUCIBLE"
                heading="Where Conviction Is Forged"
                body={crucibleBody}
                isDark={isDark}
              />
            </div>
          </div>
        )}
      </section>

      {/* ---- Diamond divider ---- */}
      <DiamondDivider />

      {/* ---- Act 2: The Way ---- */}
      <section
        className={`relative overflow-hidden ${isDark ? 'bg-[hsl(228,55%,8%)]' : 'bg-[hsl(40,25%,96%)]'}`}
      >
        {isMobile ? (
          <>
            <div className="relative h-[45vh]">
              <MediaPanel
                videoSrc={WAY_VIDEO}
                poster={WAY_POSTER}
                gradientDir={gradientDirMobile}
                isDark={isDark}
              />
            </div>
            <ActText
              number="02"
              label="THE WAY"
              heading="A Path Built on Discipline"
              body={wayBody}
              isDark={isDark}
            />
          </>
        ) : (
          <div className="flex min-h-[70vh]">
            <div className="w-[45%]">
              <ActText
                number="02"
                label="THE WAY"
                heading="A Path Built on Discipline"
                body={wayBody}
                isDark={isDark}
              />
            </div>
            <div className="relative w-[55%]">
              <MediaPanel
                videoSrc={WAY_VIDEO}
                poster={WAY_POSTER}
                gradientDir="to left"
                isDark={isDark}
              />
            </div>
          </div>
        )}
      </section>

      {/* ---- Resolution: The Merge ---- */}
      <section className={`relative py-20 md:py-28 ${isDark ? 'bg-primary' : 'bg-background'}`}>
        <div className="max-w-[680px] mx-auto px-5 text-center">
          <FadeIn>
            <motion.span
              className="inline-block font-serif text-gold text-[2rem] md:text-[3rem] select-none"
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              +
            </motion.span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2
              className={`font-serif text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.2] mt-4 ${
                isDark ? 'text-primary-foreground' : 'text-foreground'
              }`}
            >
              Crucible <span className="text-gold">+</span> The Way
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="font-serif text-gold text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] mt-3 tracking-[-0.03em]"
              style={isDark ? { textShadow: '0 0 40px hsl(43 78% 50% / 0.3)' } : undefined}
            >
              Cruxway
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex justify-center mt-5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <GoldRule />
              </motion.div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p
              className={`font-sans text-[14px] md:text-[16px] tracking-[0.04em] leading-[1.7] mt-5 ${
                isDark ? 'text-primary-foreground/50' : 'text-muted-foreground'
              }`}
            >
              Forging conviction through rigour.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default CruxwayOriginStory;
