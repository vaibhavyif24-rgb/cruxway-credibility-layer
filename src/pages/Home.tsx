import React, { useState, useEffect, useRef } from 'react';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
import saltwaterLogo from '@/assets/logos/saltwater-capital.svg';

import evercoreLogo from '@/assets/logos/evercore.png';
import dunesPointLogo from '@/assets/logos/dunes-point-capital.png';
import nitiAayogLogo from '@/assets/logos/niti-aayog.png';
import iicLogo from '@/assets/logos/iic.png';
import treeforestLogo from '@/assets/logos/treeforest.png';
import lodhaGeniusLogo from '@/assets/logos/lodha-genius.png';
import swishinLogo from '@/assets/logos/swishin-ventures.png';

const foundersLogos = [
  { src: warburgLogo, alt: 'Warburg Pincus', scale: 1.0 },
  { src: neosPartnersLogo, alt: 'Neos Partners', scale: 1.2 },
  { src: deutscheBankLogo, alt: 'Deutsche Bank', scale: 0.7 },
  { src: saltwaterLogo, alt: 'Saltwater Capital', scale: 0.75 },
  
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
  { num: '01', title: 'Identify', description: 'Our deal flow comes from relationships we\'ve built over years in our target sectors. Accountants, brokers, attorneys, and business owners who know how we operate. Most of our opportunities never go to market.' },
  { num: '02', title: 'Evaluate', description: 'Financials, operations, customer quality, and competitive positioning. We want to understand what the numbers say and, just as importantly, what they don\'t.' },
  { num: '03', title: 'Invest', description: 'Majority positions structured to preserve continuity. Management stays. Employees stay. The founder decides how involved they want to be going forward.' },
  { num: '04', title: 'Build', description: 'Real systems from day one: financial controls, reporting infrastructure, and a growth plan built around what the business actually needs.' },
];

const processStepsIndia = [
  { num: '01', title: 'Identify', description: 'We source directly through local networks across India\'s industrial corridors. Relationships with chartered accountants, industry associations, and family business advisors.' },
  { num: '02', title: 'Evaluate', description: 'Every opportunity is evaluated in person: the financials, the operations, the team, and the competitive dynamics of the local market.' },
  { num: '03', title: 'Invest', description: 'Majority positions with structures designed around the founder\'s priorities. Continuity for the team and flexibility on the founder\'s level of involvement.' },
  { num: '04', title: 'Build', description: 'Institutional-grade governance, financial reporting, working capital management, and a growth roadmap. We bring the infrastructure. They bring the business.' },
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
const ProcessCarousel = React.memo(({ steps, isDark }: { steps: typeof processStepsUS; isDark: boolean }) => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInView(sectionRef, { once: false, amount: 0.3 });
  const [hasEnteredView, setHasEnteredView] = useState(false);

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
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gold/10 -mx-2 px-2 md:mx-0 md:px-0">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setAutoplay(false); }}
            className={`group flex-1 min-w-[80px] text-left relative py-3 md:py-4 transition-all duration-500 min-h-[44px] whitespace-nowrap ${
              i > 0 ? 'border-l border-gold/10' : ''
            }`}
          >
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
                i === active ? 'text-gold' : isDark ? 'text-primary-foreground/30' : 'text-foreground/30'
              }`}>
                {step.num}
              </span>
              <motion.span
                className={`block font-serif text-[0.85rem] md:text-[1rem] tracking-[-0.02em] mt-0.5 transition-colors duration-300 ${
                  i === active
                    ? isDark ? 'text-primary-foreground font-medium' : 'text-foreground font-medium'
                     : isDark ? 'text-primary-foreground/35' : 'text-foreground/35'
                }`}
                animate={i === active ? { scale: [1, 1.01, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {step.title}
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
          >
            <GlassCard index={active} hover={true}>
              <div className="p-6 md:p-10">
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
                    className={`font-serif text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.2] tracking-[-0.02em] mb-3 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}
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
                    className={`font-sans text-[14px] leading-[1.7] max-w-[600px] ${isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}
                  >
                    {steps[active].description}
                  </motion.p>
                </div>
              </div>
            </GlassCard>
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
          <span className={`font-sans text-[10px] font-medium tracking-[0.15em] ${isDark ? 'text-primary-foreground/35' : 'text-foreground/35'}`}>
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
});
ProcessCarousel.displayName = 'ProcessCarousel';

/* ─── Opportunity Cinematic Section Header ─── */
const OpportunityCinematic = ({ isIndia, isDark }: { isIndia: boolean; isDark: boolean }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideoInView = useInView(sectionRef, { once: false, margin: '500px' });
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

  // Play/pause video based on viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVideoInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVideoInView]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: 'clamp(50vh, 60vh, 70vh)' }}
    >
      <motion.div
        className="absolute inset-[-10%]"
        style={{ scale: videoScale, y: videoY, willChange: 'transform' }}
      >
        <video
          ref={videoRef}
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

      <div className="absolute inset-0 z-[2]" style={{
        background: isDark
          ? 'linear-gradient(to bottom, hsl(228 55% 8% / 0.7) 0%, hsl(228 55% 8% / 0.85) 40%, hsl(228 55% 8% / 0.92) 100%)'
          : 'linear-gradient(to bottom, hsl(40 25% 94% / 0.75) 0%, hsl(40 22% 91% / 0.88) 40%, hsl(40 22% 91% / 0.95) 100%)'
      }} />
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: isDark
          ? 'radial-gradient(ellipse at center, transparent 30%, hsl(228 55% 8% / 0.25) 100%)'
          : 'radial-gradient(ellipse at center, transparent 30%, hsl(40 20% 85% / 0.3) 100%)'
      }} />
      {!isDark && (
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 60%, hsl(40 30% 50% / 0.08) 0%, transparent 60%)'
        }} />
      )}
      <div className={`absolute inset-0 z-[3] pointer-events-none ${isDark ? 'opacity-[0.03]' : 'opacity-[0.015]'}`}
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

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
            className={`font-serif text-[clamp(1.6rem,4.5vw,2.8rem)] leading-[1.15] tracking-[-0.025em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-prussian'}`}
          >
            {isIndia
              ? <>India's industrial middle market is one of the largest pools of <span className="text-gold font-semibold">uninstitutionalized</span> value in the world.</>
              : <>Every year, thousands of American business owners start thinking about what comes <span className="text-gold font-semibold">next.</span> Most of them don't have an answer.</>
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

      <div className={`absolute top-0 left-0 right-0 h-20 z-[5] pointer-events-none ${
        isDark
          ? 'bg-gradient-to-b from-primary to-transparent'
          : 'bg-gradient-to-b from-background to-transparent'
      }`} />
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
            <SectionLabel light={isDark}>Long-Term Capital</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.04}>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-gold mb-4">
              Built for Owners Thinking Long-Term
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.4rem)] max-w-[680px] leading-[1.08] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]'}`}>
              {isIndia
                ? <>Partnering with the Industrial Businesses Building <span className="text-gold" style={{ textShadow: '0 2px 12px hsl(43,78%,50%,0.4)' }}>India's Next Decade</span></>
                : <>Supporting the Essential Businesses That Keep American <span className="text-gold" style={{ textShadow: '0 2px 12px hsl(43,78%,50%,0.4)' }}>Industry</span> Running</>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] leading-[1.75] mt-5 max-w-[520px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)]'}`}>
              {isIndia
                ? 'We take majority positions in India\'s industrial and business services companies, bringing an investment approach refined over a decade of global dealmaking.'
                : 'We take majority stakes in power services, financial compliance, and IT infrastructure companies. Our investment philosophy was shaped at some of the best firms in the world and refined into something we could call our own.'}
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
                  className={`btn-premium inline-block font-sans text-[11px] font-medium uppercase tracking-[0.16em] px-6 md:px-8 py-3.5 border transition-all duration-300 ${
                    isDark
                      ? 'border-white/[0.15] text-white/55 hover:border-gold/30 hover:text-white/80'
                      : 'border-border text-muted-foreground hover:border-gold/30 hover:text-foreground'
                  }`}
                >
                  Our Focus
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={`/${region}/contact`}
                  className="btn-premium btn-gold inline-block font-sans text-[11px] font-medium uppercase tracking-[0.16em] px-6 md:px-8 py-3.5 transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* What We Do */}
      <ScrollRevealText
        label="What We Do"
        heading="We partner with businesses where the product is proven and the customers are loyal. We help professionalize the systems around them and protect what the founder built."
        highlights={['professionalize', 'protect']}
        subtext="Every partnership is structured around what the business actually needs."
        variant="light"
      />

      {/* The Opportunity — Cinematic video header */}
      <OpportunityCinematic isIndia={isIndia} isDark={isDark} />

      {/* Market Thesis — Stats and supporting text */}
      <ScrollRevealText
        heading={
          isIndia
            ? 'Sixty-three million MSMEs, real revenue, real customers, and almost no access to the kind of capital and systems that could scale them.'
            : 'Thousands of profitable service businesses will change hands this decade. Most founders want more than a buyer. They want a partner who will stay close and think long-term.'
        }
        highlights={isIndia ? ['scale'] : ['partner']}
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
            <h2 className={`font-serif text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.15] max-w-[480px] mb-3 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              From Discovery to Partnership
            </h2>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>
          <ProcessCarousel steps={isIndia ? processStepsIndia : processStepsUS} isDark={isDark} />
        </div>
      </section>

      {/* Social Proof */}
      <section className={`relative overflow-hidden ${isDark ? 'bg-primary' : 'bg-background'}`}>
        {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16 text-center">
          <FadeIn>
            <p className={`font-serif text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.22] tracking-[-0.02em] max-w-[720px] mx-auto ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              {isIndia
                ? <>Global training refined into a local <span className="text-gold">conviction.</span> Working alongside the founders and families building India's <span className="text-gold">industrial base.</span></>
                : <>An investment philosophy shaped at some of the best firms in the world, now applied with personal <span className="text-gold">conviction</span> to the businesses that run America's <span className="text-gold">infrastructure.</span></>
              }
            </p>
          </FadeIn>
        </div>
      </section>
      <div className={isDark ? 'bg-[hsl(228,40%,6%)]' : 'bg-[hsl(40,20%,91%)]'}>
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
                <h2 className={`font-serif text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.15] tracking-[-0.02em] mb-4 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {isIndia ? "Let's Talk" : 'Start a Conversation'}
                </h2>
                <p className={`font-sans text-[15px] leading-[1.75] ${isDark ? 'text-primary-foreground/55' : 'text-muted-foreground'}`}>
                  {isIndia
                    ? "If you run a business in India's industrial or services space and you're exploring what partnership could look like, reach out. Every conversation starts with listening."
                    : "If you're a business owner in one of our sectors and you've been thinking about what the next chapter looks like, we'd welcome a conversation. No pitch. Just a straightforward discussion."}
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.1}>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={`/${region}/contact`}
                  className="group relative inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] border-2 border-gold text-gold px-10 py-5 md:px-12 md:py-6 transition-all duration-300 hover:bg-gold hover:text-white overflow-hidden"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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