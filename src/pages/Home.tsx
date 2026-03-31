import React, { useState, useEffect, useRef } from 'react';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
import culinaryInstituteLogo from '@/assets/logos/culinary-institute.png';
import depaulLogo from '@/assets/logos/depaul.png';
import nitiAayogLogo from '@/assets/logos/niti-aayog.png';
import ashokaLogo from '@/assets/logos/ashoka.png';
import iicLogo from '@/assets/logos/iic.png';
import treeforestLogo from '@/assets/logos/treeforest.png';
import lodhaGeniusLogo from '@/assets/logos/lodha-genius.png';
import swishinLogo from '@/assets/logos/swishin-ventures.png';

const foundersLogos = [
  { src: warburgLogo, alt: 'Warburg Pincus', scale: 2.0 },
  { src: neosPartnersLogo, alt: 'Neos Partners', scale: 1.2 },
  { src: deutscheBankLogo, alt: 'Deutsche Bank', scale: 1.0 },
  { src: saltwaterLogo, alt: 'Saltwater Capital', scale: 1.2 },
  { src: lamResearchLogo, alt: 'Lam Research', scale: 1.0 },
  { src: evercoreLogo, alt: 'Evercore', scale: 1.2 },
  { src: dunesPointLogo, alt: 'Dunes Point Capital', scale: 1.0 },
  { src: culinaryInstituteLogo, alt: 'Culinary Institute of America', scale: 1.0 },
  { src: depaulLogo, alt: 'DePaul University', scale: 1.0 },
];

const allLogos = [
  ...foundersLogos,
  { src: ashokaLogo, alt: 'Ashoka University', scale: 1.0 },
  { src: nitiAayogLogo, alt: 'NITI Aayog', scale: 2.0 },
  { src: iicLogo, alt: 'Impact Investors Council', scale: 1.0 },
  { src: treeforestLogo, alt: 'TreeForest Capital', scale: 1.2 },
  { src: lodhaGeniusLogo, alt: 'Lodha Genius', scale: 1.2 },
  { src: swishinLogo, alt: 'Swishin Ventures', scale: 2.0 },
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

/* ─── Process Carousel ─── */
const ProcessCarousel = ({ steps, isDark }: { steps: typeof processStepsUS; isDark: boolean }) => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [steps.length, autoplay]);

  return (
    <div className="w-full">
      {/* Step headings — always visible, clickable */}
      <div className="flex border-b border-gold/10">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setAutoplay(false); }}
            className={`group flex-1 text-left relative py-3 md:py-4 transition-all duration-500 ${
              i > 0 ? 'border-l border-gold/10' : ''
            }`}
          >
            {/* Gold progress line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
              {i === active && autoplay && (
                <motion.div
                  key={`progress-${active}`}
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
              <span className={`block font-serif text-[0.85rem] md:text-[1rem] tracking-[-0.02em] mt-0.5 transition-colors duration-300 ${
                i === active
                  ? isDark ? 'text-primary-foreground font-medium' : 'text-foreground font-medium'
                  : isDark ? 'text-primary-foreground/30' : 'text-foreground/30'
              }`}>
                {step.title}
              </span>
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
            {/* Large step number */}
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
            className={`font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-20 ${
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
            className={`font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-20 ${
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

/* ─── Cinematic Breaker ─── */
const CinematicBreaker = ({ isIndia, isDark }: { isIndia: boolean; isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.12, 1.05]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 0.4, 0.9]);

  return (
    <section ref={ref} className="relative h-[30vh] md:h-[40vh] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y: imgY, scale: imgScale }}
      >
        <img
          src={isIndia
            ? 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=1920&q=80'
            : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80'
          }
          alt={isIndia ? 'Indian industrial infrastructure' : 'American corporate skyline'}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Top gradient fade */}
      <div className={`absolute top-0 left-0 right-0 h-1/3 z-10 ${
        isDark
          ? 'bg-gradient-to-b from-primary to-transparent'
          : 'bg-gradient-to-b from-background to-transparent'
      }`} />

      {/* Bottom gradient fade */}
      <div className={`absolute bottom-0 left-0 right-0 h-1/3 z-10 ${
        isDark
          ? 'bg-gradient-to-t from-primary to-transparent'
          : 'bg-gradient-to-t from-[hsl(40,22%,91%)] to-transparent'
      }`} />

      {/* Dark overlay — scroll-linked */}
      <motion.div
        className="absolute inset-0 bg-black z-[5]"
        style={{ opacity: overlayOpacity }}
      />
      {!isDark && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px] z-[6]" />
      )}

      {/* Centered gold ornament */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px bg-gold/40"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-3 h-3 border border-gold/50 rotate-45"
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-px bg-gold/40"
          />
        </motion.div>
      </div>
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
      <section className={`relative overflow-hidden min-h-[80vh] md:min-h-[85vh] flex items-end ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
        <CinematicHero imageSrc={isIndia ? heroIndiaHome : heroUSHome} overlay="strong" />
        
        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}

        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pb-12 md:pb-16 lg:pb-20 pt-32">
          <FadeIn>
            <SectionLabel light={isDark}>{isIndia ? 'Cruxway India' : 'Investment Firm'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.04}>
            <p className="font-sans text-[12px] md:text-[14px] font-semibold uppercase tracking-[0.22em] text-gold mb-4">
              Built for Owners Thinking Long-Term
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.8rem)] max-w-[680px] leading-[1.08] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground'}`}>
              {isIndia
                ? <>Investing in India's Next Generation of <span className="text-gold" style={{ textShadow: '0 2px 12px hsl(43,78%,50%,0.4)' }}>Essential</span> Companies</>
                : <>Building the <span className="text-gold" style={{ textShadow: '0 2px 12px hsl(43,78%,50%,0.4)' }}>Next Generation</span> of Essential U.S. Companies</>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[14px] md:text-[16px] leading-[1.75] mt-5 max-w-[520px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground'}`}>
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
              <Link
                to={`/${region}/contact`}
                className="btn-premium btn-gold btn-premium-glow inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-6 md:px-8 py-3.5 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center"
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

      {/* Market Thesis */}
      <ScrollRevealText
        label={isIndia ? 'The Opportunity' : 'Our Thesis'}
        heading={
          isIndia
            ? 'India\'s lower middle market is one of the most under-served segments in global investing. Companies proven over decades are ready for a partner who can help them scale with discipline.'
            : 'Tens of thousands of essential businesses keep America running. Patient capital and operational expertise unlock their next chapter of growth.'
        }
        highlights={isIndia ? ['under-served', 'discipline'] : ['essential', 'Patient']}
        stats={
          isIndia
            ? [{ value: '63M+', label: 'MSMEs' }, { value: '<1%', label: 'Institutionally Backed' }, { value: '$5T', label: 'Economy by 2028' }]
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

      {/* Social Proof — Simple fade, no scroll-linked words */}
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

      {/* CTA — Full-Width Gold Band */}
      <div className="h-px w-full shimmer-effect mt-0" style={{ background: 'linear-gradient(90deg, transparent, hsl(40, 60%, 48%, 0.15), transparent)', animationDuration: '5s' }} />

      <section className={`relative overflow-hidden px-5 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20 ${
        isDark ? 'hero-gradient-animated text-primary-foreground' : 'bg-[hsl(40,20%,91%)] text-foreground border-t border-gold/20'
      }`}>
        <WaveBackground variant="section" />
        {isDark ? <DarkSectionEffects variant="cta" /> : <LightSectionEffects variant="cta" />}

        <div className="relative max-w-[1080px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left: Text */}
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

            {/* Right: Large CTA Button */}
            <FadeIn delay={0.1}>
              <Link
                to={`/${region}/contact`}
                className="group relative inline-flex items-center gap-3 font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.16em] border-2 border-gold text-gold px-10 py-5 md:px-12 md:py-6 transition-all duration-300 hover:bg-gold hover:text-white overflow-hidden"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 pointer-events-none overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-sweep" />
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
