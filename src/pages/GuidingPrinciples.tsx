import { useRef, useEffect } from 'react';
import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { ArrowRight } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import CruxwayOriginStory from '@/components/CruxwayOriginStory';
import ConvictionsDeck from '@/components/ConvictionsDeck';
import WaveBackground from '@/components/WaveBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, useScroll, useTransform } from 'framer-motion';

const CRUCIBLE_VIDEO = 'https://videos.pexels.com/video-files/3170469/3170469-hd_1920_1080_25fps.mp4';

const lineStyle = {
  stroke: 'hsl(43 70% 50%)',
  strokeWidth: 0.3,
  fill: 'none',
  opacity: 0.25,
};

const draw = (delay: number, dur = 1.5) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true },
  transition: { duration: dur, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const GuidingPrinciples = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isIndia = region === 'india';
  const isDark = theme === 'dark';

  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -60]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {});
  }, []);

  const overlayClass = isDark
    ? 'bg-gradient-to-t from-navy-deep/95 via-prussian/80 to-navy-deep/70'
    : 'bg-gradient-to-t from-[hsl(40,20%,93%)]/[0.96] via-[hsl(40,25%,96%)]/[0.88] to-[hsl(40,20%,93%)]/[0.78]';

  const vignetteColor = isDark
    ? 'radial-gradient(ellipse at center, transparent 40%, hsl(228 45% 8% / 0.5) 100%)'
    : 'radial-gradient(ellipse at center, transparent 40%, hsl(40 20% 90% / 0.4) 100%)';

  return (
    <div style={{ overflowX: 'clip' }}>
      {/* ═══ Hero with looping crucible video ═══ */}
      <section className={`relative overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
        {/* Video background with Ken Burns */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute inset-[-5%]"
            style={{ y: parallaxY, willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          >
            <motion.div
              className="w-full h-full"
              initial={{ scale: 1.02 }}
              animate={{ scale: 1.12 }}
              transition={{ duration: 25, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={CRUCIBLE_VIDEO}
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>

          {/* Overlay */}
          <div className={`absolute inset-0 z-[1] ${overlayClass}`} />
          {/* Vignette */}
          <div className="absolute inset-0 z-[1]" style={{ background: vignetteColor }} />

          {/* Gold geometric corner brackets */}
          <svg
            viewBox="0 0 1200 800"
            className="absolute inset-0 w-full h-full z-[2] opacity-50"
            preserveAspectRatio="xMidYMid slice"
          >
            <motion.line x1="30" y1="30" x2="100" y2="30" {...draw(0.3, 0.8)} style={lineStyle} />
            <motion.line x1="30" y1="30" x2="30" y2="100" {...draw(0.4, 0.8)} style={lineStyle} />
            <motion.line x1="1170" y1="30" x2="1100" y2="30" {...draw(0.3, 0.8)} style={lineStyle} />
            <motion.line x1="1170" y1="30" x2="1170" y2="100" {...draw(0.4, 0.8)} style={lineStyle} />
            <motion.line x1="30" y1="770" x2="100" y2="770" {...draw(0.5, 0.8)} style={lineStyle} />
            <motion.line x1="30" y1="770" x2="30" y2="700" {...draw(0.6, 0.8)} style={lineStyle} />
            <motion.line x1="1170" y1="770" x2="1100" y2="770" {...draw(0.5, 0.8)} style={lineStyle} />
            <motion.line x1="1170" y1="770" x2="1170" y2="700" {...draw(0.6, 0.8)} style={lineStyle} />
            <motion.line x1="0" y1="600" x2="250" y2="480" {...draw(0.8)} style={{ ...lineStyle, strokeWidth: 0.2, opacity: 0.15 }} />
            <motion.line x1="1200" y1="600" x2="950" y2="480" {...draw(0.9)} style={{ ...lineStyle, strokeWidth: 0.2, opacity: 0.15 }} />
            <motion.line x1="400" y1="720" x2="800" y2="720" {...draw(1.0, 1.2)} style={{ ...lineStyle, strokeWidth: 0.15, opacity: 0.1 }} />
            <motion.path d="M600 700 L605 710 L600 720 L595 710 Z" {...draw(1.2, 0.6)} style={{ ...lineStyle, strokeWidth: 0.25, opacity: 0.18 }} />
            <motion.circle cx="250" cy="480" r="1.5" fill="hsl(43 70% 50%)" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.2 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.8 }} />
            <motion.circle cx="950" cy="480" r="1.5" fill="hsl(43 70% 50%)" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.2 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.9 }} />
          </svg>

          {/* Ambient gold glow */}
          <motion.div
            className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[400px] h-[250px] rounded-full z-[2]"
            style={{ background: 'radial-gradient(circle, hsl(43 70% 50% / 0.04), transparent 70%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.4] }}
            transition={{ duration: 3, delay: 1.5, ease: 'easeOut' }}
          />

          {/* Floating light particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-gold/20 z-[2]"
              style={{ left: `${10 + i * 11}%`, top: `${25 + (i % 4) * 15}%` }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.35, 0], y: [-5, -25] }}
              transition={{ duration: 4 + i * 0.4, delay: 2 + i * 0.6, repeat: Infinity, repeatDelay: 3 + i * 0.5, ease: 'easeOut' }}
            />
          ))}

          {/* Soft horizontal shimmer */}
          <motion.div
            className="absolute top-[40%] left-0 right-0 h-px z-[2]"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(43 70% 50% / 0.06), transparent)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 6, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}

        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-14">
          <FadeIn>
            <SectionLabel light={isDark}>{isIndia ? 'Our Identity, India' : 'Our Identity'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.6rem)] max-w-[540px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]'}`}>
              The Name. The <span className="text-gold">Conviction</span>. The Way.
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[460px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)]'}`}>
              How we named ourselves, what we believe, and why it matters in every decision we make.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Naming Story */}
      <CruxwayOriginStory />

      {/* Convictions Deck */}
      <ConvictionsDeck />

      {/* CTA */}
      <div className="h-px w-full shimmer-effect" style={{ background: 'linear-gradient(90deg, transparent, hsl(40, 60%, 48%, 0.12), transparent)', animationDuration: '5s' }} />

      <section className={`relative overflow-hidden px-5 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20 ${
        isDark ? 'hero-gradient-animated text-primary-foreground' : 'bg-[hsl(40,20%,91%)] text-foreground border-t border-gold/20'
      }`}>
        <WaveBackground variant="section" />
        {isDark ? <DarkSectionEffects variant="cta" /> : <LightSectionEffects variant="cta" />}
        <div className="relative max-w-[1080px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1 max-w-[560px]">
              <FadeIn>
                <SectionLabel light={isDark}>Connect</SectionLabel>
                <h2 className={`font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.15] mb-4 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {isIndia ? 'Partner With Us in India' : 'Start a Conversation'}
                </h2>
                <p className={`font-sans text-[13px] md:text-[15px] leading-[1.8] ${isDark ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                  If you share our values and are exploring long-term partnership, we'd welcome the conversation.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.1}>
              <motion.div whileHover={{ y: -2, boxShadow: '0 4px 20px hsl(43 78% 50% / 0.15)' }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={`/${region}/contact`}
                  className="group relative inline-flex items-center gap-3 font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.16em] border-2 border-gold text-gold px-10 py-5 md:px-12 md:py-6 transition-all duration-300 hover:bg-gold hover:text-white overflow-hidden btn-premium-glow"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 pointer-events-none overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-sweep" />
                  </span>
                </Link>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuidingPrinciples;
