import React, { useState, useEffect, useRef } from 'react';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import LogoMarquee from '@/components/LogoMarquee';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import GlassCard from '@/components/GlassCard';
import CinematicHero from '@/components/CinematicHero';
import ScrollRevealText from '@/components/ScrollRevealText';
import WaveBackground from '@/components/WaveBackground';

import heroIndiaHome from '@/assets/hero-india-home.jpg';
import heroUSHome from '@/assets/hero-us-home.jpg';

import warburgLogo from '@/assets/logos/warburg-pincus.png';
import neosPartnersLogo from '@/assets/logos/neos-partners.png';
import deutscheBankLogo from '@/assets/logos/deutsche-bank.png';
import saltwaterLogo from '@/assets/logos/saltwater-capital.png';
import lamResearchLogo from '@/assets/logos/lam-research.png';
import evercoreLogo from '@/assets/logos/evercore.png';
import dunesPointLogo from '@/assets/logos/dunes-point-capital.png';
import nitiAayogLogo from '@/assets/logos/niti-aayog.png';
import iicLogo from '@/assets/logos/iic.png';
import treeforestLogo from '@/assets/logos/treeforest.png';
import lodhaGeniusLogo from '@/assets/logos/lodha-genius.png';
import swishinLogo from '@/assets/logos/swishin-ventures.png';

const foundersLogos = [
  { src: warburgLogo, alt: 'Warburg Pincus', scale: 1.3 },
  { src: neosPartnersLogo, alt: 'Neos Partners', scale: 1.2 },
  { src: deutscheBankLogo, alt: 'Deutsche Bank', scale: 0.7 },
  { src: saltwaterLogo, alt: 'Saltwater Capital', scale: 1.2 },
  { src: lamResearchLogo, alt: 'Lam Research', scale: 0.7 },
  { src: evercoreLogo, alt: 'Evercore', scale: 1.2 },
  { src: dunesPointLogo, alt: 'Dunes Point Capital', scale: 1.0 },
];

const allLogos = [
  ...foundersLogos,
  { src: nitiAayogLogo, alt: 'NITI Aayog', scale: 1.3 },
  { src: iicLogo, alt: 'Impact Investors Council', scale: 1.0 },
  { src: treeforestLogo, alt: 'TreeForest Capital', scale: 1.2 },
  { src: lodhaGeniusLogo, alt: 'Lodha Genius', scale: 1.2 },
  { src: swishinLogo, alt: 'Swishin Ventures', scale: 1.3 },
];

const processStepsUS = [
  { num: '01', title: 'Identify', description: 'We go where others don\'t. Deep networks, proprietary sourcing, and years of relationship-building surface businesses before they ever reach a market.' },
  { num: '02', title: 'Evaluate', description: 'Every opportunity is stress-tested across financials, operations, culture, and market position. Rigour is our edge.' },
  { num: '03', title: 'Invest', description: 'Majority stakes structured to preserve what works: continuity for employees, clients, and the legacy founders built.' },
  { num: '04', title: 'Build', description: 'Hands-on partnership from day one. We professionalise systems, deploy capital, and accelerate growth alongside management.' },
];

const processStepsIndia = [
  { num: '01', title: 'Identify', description: 'Deep networks across India\'s industrial heartland surface founder-led businesses with strong fundamentals and operational upside.' },
  { num: '02', title: 'Evaluate', description: 'Every opportunity is stress-tested across financials, operations, culture, and market position with institutional rigour.' },
  { num: '03', title: 'Invest', description: 'Majority stakes structured to preserve what works: continuity for employees, clients, and the legacy founders built.' },
  { num: '04', title: 'Build', description: 'Hands-on partnership from day one. We professionalise systems, deploy capital, and accelerate growth alongside management.' },
];

const StatBlock = React.forwardRef<HTMLDivElement, { val: string; lbl: string; delay?: number; light?: boolean }>(
  ({ val, lbl, delay = 0, light = false }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <p className={`font-serif text-[clamp(1.4rem,3vw,2rem)] tracking-[-0.02em] ${light ? 'text-primary-foreground' : 'text-foreground'}`}>
        {val}
      </p>
      <p className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.18em] mt-1.5 ${light ? 'text-primary-foreground/35' : 'text-muted-foreground/50'}`}>
        {lbl}
      </p>
    </motion.div>
  )
);
StatBlock.displayName = 'StatBlock';

/* ─── Process Carousel with Intersection Observer ─── */
const ProcessCarousel = ({ steps, isDark }: { steps: typeof processStepsUS; isDark: boolean }) => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInView(sectionRef, { once: false, amount: 0.3 });
  const [hasEnteredView, setHasEnteredView] = useState(false);

  // Only start once it enters viewport
  useEffect(() => {
    if (isInViewport && !hasEnteredView) {
      setHasEnteredView(true);
    }
  }, [isInViewport, hasEnteredView]);

  useEffect(() => {
    if (!autoplay || !hasEnteredView) return;
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [steps.length, autoplay, hasEnteredView]);

  return (
    <div ref={sectionRef} className="w-full">
      {/* Step headings */}
      <div className="flex border-b border-gold/10">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setAutoplay(false); }}
            className={`group flex-1 text-left relative py-3 md:py-4 transition-all duration-500 min-h-[44px] ${
              i > 0 ? 'border-l border-gold/10' : ''
            }`}
          >
            {/* Gold progress line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
              {i === active && autoplay && hasEnteredView && (
                <motion.div
                  key={`progress-${active}-${hasEnteredView}`}
                  className="h-full bg-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              )}
              {i === active && !autoplay && (
                <div className="h-full w-full bg-gold" />
              )}
            </div>

            <div className="px-2 md:px-4">
              <span className={`font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                i === active ? 'text-gold' : isDark ? 'text-primary-foreground/20' : 'text-foreground/20'
              }`}>
                {step.num}
              </span>
              <motion.span
                className={`block font-serif text-[0.85rem] md:text-[1rem] tracking-[-0.02em] mt-0.5 transition-colors duration-300 ${
                  i === active
                    ? isDark ? 'text-primary-foreground font-medium' : 'text-foreground font-medium'
                    : isDark ? 'text-primary-foreground/30' : 'text-foreground/30'
                }`}
                animate={i === active ? { scale: [1, 1.01, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isMobile ? step.title.charAt(0) : step.title}
              </motion.span>
            </div>
          </button>
        ))}
      </div>

      {/* Active content panel */}
      <div className="mt-6 md:mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-sm border p-6 md:p-10 ${
              isDark
                ? 'border-primary-foreground/10 bg-primary-foreground/[0.03]'
                : 'border-[hsl(38,15%,90%)]/50 bg-[hsl(40,20%,98%)]/80'
            }`}
            whileHover={{ rotateX: 0.5, rotateY: -0.5 }}
            style={{ transformPerspective: 800 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="font-serif text-[3rem] md:text-[4rem] leading-none text-gold/15 block mb-2"
            >
              {steps[active].num}
            </motion.span>

            <div>
              <motion.h3
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className={`font-serif text-[clamp(1.2rem,2.5vw,1.7rem)] leading-[1.2] tracking-[-0.02em] mb-3 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}
              >
                {steps[active].title}
              </motion.h3>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="h-[1.5px] bg-gold/30 mb-4"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className={`font-sans text-[14px] md:text-[15px] leading-[1.8] max-w-[600px] ${isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}
              >
                {steps[active].description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom navigation arrows */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => { setActive(Math.max(0, active - 1)); setAutoplay(false); }}
            disabled={active === 0}
            className={`min-h-[44px] font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-20 ${
              isDark ? 'text-primary-foreground/40 hover:text-gold' : 'text-foreground/40 hover:text-gold'
            }`}
          >
            ← Previous
          </button>
          <span className={`font-sans text-[10px] font-medium tracking-[0.15em] ${isDark ? 'text-primary-foreground/25' : 'text-foreground/25'}`}>
            {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </span>
          <button
            onClick={() => { setActive(Math.min(steps.length - 1, active + 1)); setAutoplay(false); }}
            disabled={active === steps.length - 1}
            className={`min-h-[44px] font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-20 ${
              isDark ? 'text-primary-foreground/40 hover:text-gold' : 'text-foreground/40 hover:text-gold'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Opportunity Cinematic Section Header ─── */
const OpportunityCinematic = ({ isIndia, isDark }: { isIndia: boolean; isDark: boolean }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.15, 1.08]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const textY = useTransform(scrollYProgress, [0.15, 0.5], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);

  const pexelsUSVid = 'https://videos.pexels.com/video-files/31209892/13331473_2560_1440_24fps.mp4';
  const pexelsUSImg = 'https://images.pexels.com/videos/31209892/pexels-photo-31209892.jpeg?auto=compress&w=1200';

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: 'clamp(50vh, 60vh, 70vh)' }}
    >
      {/* Video background with parallax */}
      <motion.div
        className="absolute inset-[-10%]"
        style={{ scale: videoScale, y: videoY, willChange: 'transform' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          // @ts-ignore
          fetchpriority="low"
          className="w-full h-full object-cover"
          poster={isIndia
            ? 'https://images.pexels.com/videos/35213732/4k-aerial-4k-aerial-shot-abstract-sky-aerial-from-the-sky-35213732.jpeg?auto=compress&w=1200'
            : pexelsUSImg
          }
        >
          <source
            src={isIndia
              ? 'https://videos.pexels.com/video-files/35213732/14917606_2560_1440_60fps.mp4'
              : pexelsUSVid
            }
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Deep cinematic overlay */}
      <div className="absolute inset-0 z-[2]" style={{
        background: isDark
          ? 'linear-gradient(to bottom, hsl(228 55% 8% / 0.7) 0%, hsl(228 55% 8% / 0.85) 40%, hsl(228 55% 8% / 0.92) 100%)'
          : 'linear-gradient(to bottom, hsl(228 45% 12% / 0.75) 0%, hsl(228 45% 12% / 0.88) 40%, hsl(228 45% 12% / 0.95) 100%)'
      }} />

      {/* Radial vignette */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, hsl(228 55% 8% / 0.25) 100%)'
      }} />

      {/* Light-mode warm center glow */}
      {!isDark && (
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 60%, hsl(40 30% 50% / 0.04) 0%, transparent 60%)'
        }} />
      )}

      {/* Subtle grain texture */}
      <div className="absolute inset-0 z-[3] opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-[4] flex items-center justify-center">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="text-center px-5 md:px-10 max-w-[680px]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-px bg-gold/50"
            />
            <p className="font-sans text-[11px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-gold">
              {isIndia ? 'The Opportunity' : 'Our Thesis'}
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-px bg-gold/50"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(1.6rem,4.5vw,2.8rem)] leading-[1.15] tracking-[-0.025em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          >
            {isIndia
              ? <>India's lower middle market is one of the most <span className="text-gold font-semibold">under-served</span> segments in global investing.</>
              : <>Tens of thousands of <span className="text-gold font-semibold">essential</span> businesses keep America running.</>
            }
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-2.5 mt-6"
          >
            <div className="w-6 h-px bg-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 border border-gold/40" />
            <div className="w-6 h-px bg-gold/30" />
          </motion.div>
        </motion.div>
      </div>

      {/* Top gradient fade */}
      <div className={`absolute top-0 left-0 right-0 h-20 z-[5] pointer-events-none ${
        isDark
          ? 'bg-gradient-to-b from-primary to-transparent'
          : 'bg-gradient-to-b from-background to-transparent'
      }`} />

      {/* Bottom gradient fade */}
      <div className={`absolute bottom-0 left-0 right-0 h-20 z-[5] pointer-events-none ${
        isDark
          ? 'bg-gradient-to-t from-primary to-transparent'
          : 'bg-gradient-to-t from-[hsl(40,22%,91%)] to-transparent'
      }`} />
    </section>
  );
};

const Home = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isIndia = region === 'india';

  return (
    <div style={{ overflowX: 'clip' }}>
      {/* Hero */}
      <section className={`relative overflow-hidden min-h-[60vh] md:min-h-[85vh] flex items-end ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
        <CinematicHero imageSrc={isIndia ? heroIndiaHome : heroUSHome} overlay="strong" />
        
        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}

        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pb-12 md:pb-16 lg:pb-20 pt-32">
          <FadeIn>
            <SectionLabel light={isDark}>Investment Firm</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.04}>
            <p className="font-sans text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.22em] text-gold mb-4">
              Built for Owners Thinking Long-Term
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.6rem)] max-w-[680px] leading-[1.08] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]'}`}>
              {isIndia
                ? <>Investing in India's Next Generation of <span className="text-gold" style={{ textShadow: '0 2px 12px hsl(43,78%,50%,0.4)' }}>Essential</span> Companies</>
                : <>Building the <span className="text-gold" style={{ textShadow: '0 2px 12px hsl(43,78%,50%,0.4)' }}>Next Generation</span> of Essential U.S. Companies</>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[520px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)]'}`}>
              {isIndia
                ? 'Long-term capital and operational expertise for founder-led companies shaping India\'s economic future.'
                : 'Patient capital and hands-on partnership for essential businesses that keep America running.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-5 md:mt-6" />
          </FadeIn>
          <FadeIn delay={0.28}>
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={{ y: -2, boxShadow: '0 4px 20px hsl(43 78% 50% / 0.15)' }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={`/${region}/focus`}
                  className={`btn-premium inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-6 md:px-8 py-3.5 border transition-all duration-300 ${
                    isDark
                      ? 'border-white/[0.15] text-white/55 hover:border-gold/30 hover:text-white/80'
                      : 'border-border text-muted-foreground hover:border-gold/30 hover:text-foreground'
                  }`}
                >
                  Our Focus
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2, boxShadow: '0 4px 20px hsl(43 78% 50% / 0.15)' }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={`/${region}/contact`}
                  className="btn-premium btn-gold btn-premium-glow inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-6 md:px-8 py-3.5 transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </FadeIn>
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-5 h-5 text-gold/85" />
            </motion.div>
          </motion.div>
        </div>
        <HeroDivider />
      </section>

      {/* What We Do */}
      <ScrollRevealText
        label="What We Do"
        heading={
          isIndia
            ? 'Investing in and building the next generation of essential companies across India.'
            : 'Investing in and building essential U.S. companies across regulated, compliance-driven sectors.'
        }
        highlights={isIndia ? ['essential', 'building'] : ['essential', 'regulated']}
        subtext={
          isIndia
            ? 'Long-term capital and operational expertise for founder-led companies shaping India\'s economic future.'
            : 'We focus on owner-operated and family-held businesses where reliability, deep client relationships, and high barriers to entry define long-term value.'
        }
        variant="light"
      />

      {/* The Opportunity — Cinematic video header */}
      <OpportunityCinematic isIndia={isIndia} isDark={isDark} />

      {/* Market Thesis — Stats and supporting text */}
      <ScrollRevealText
        heading={
          isIndia
            ? 'Companies proven over decades are ready for a partner who can help them scale with discipline.'
            : 'Patient capital and operational expertise unlock their next chapter of growth.'
        }
        highlights={isIndia ? ['discipline'] : ['Patient']}
        stats={
          isIndia
            ? [{ value: '63M+', label: 'MSMEs' }, { value: '<1%', label: 'Institutionally Backed' }, { value: '$7T', label: 'Economy by 2030' }]
            : [{ value: '10M+', label: 'Small Businesses' }, { value: '$10T+', label: 'Transition Value' }, { value: '70%+', label: 'Lack Succession Plans' }]
        }
        variant="dark"
      />

      {/* Our Process — Horizontal Carousel */}
      <section className={`relative overflow-hidden ${isDark ? 'bg-primary' : 'bg-background'}`}>
        {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <FadeIn>
            <SectionLabel light={isDark}>Our Process</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.15] max-w-[480px] mb-3 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              From Discovery to Partnership
            </h2>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>
          <ProcessCarousel steps={isIndia ? processStepsIndia : processStepsUS} isDark={isDark} />
        </div>
      </section>

      {/* Social Proof */}
      <section className={`relative overflow-hidden ${isDark ? 'bg-primary' : 'bg-background'}`}>
        <LightSectionEffects variant="section" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16 text-center">
          <FadeIn>
            <p className={`font-serif text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.22] tracking-[-0.02em] max-w-[720px] mx-auto ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              {isIndia
                ? <>Global <span className="text-gold">institutional expertise</span> applied locally, partnering with the founders <span className="text-gold">shaping</span> India's industrial future.</>
                : <>Decades of <span className="text-gold">institutional experience</span> dedicated to partnering with the owners who built America's <span className="text-gold">essential</span> industries.</>
              }
            </p>
          </FadeIn>
        </div>
      </section>
      <div className="bg-background">
        <LogoMarquee logos={isIndia ? allLogos : foundersLogos} duration={55} variant="dark" />
      </div>

      {/* CTA */}
      <div className="h-px w-full shimmer-effect mt-0" style={{ background: 'linear-gradient(90deg, transparent, hsl(40, 60%, 48%, 0.15), transparent)', animationDuration: '5s' }} />

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
                  {isIndia
                    ? "If you're building a business meant to last in India, we'd welcome a conversation about partnership."
                    : "If you're a founder considering your next chapter, we'd welcome an honest discussion about long-term partnership."}
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

export default Home;
