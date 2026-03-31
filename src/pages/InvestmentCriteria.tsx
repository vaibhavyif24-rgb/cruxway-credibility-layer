import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import CriteriaCarousel from '@/components/CriteriaCarousel';
import CinematicHero from '@/components/CinematicHero';
import ScrollRevealText from '@/components/ScrollRevealText';
import CinematicScrollReveal from '@/components/CinematicScrollReveal';
import USCinematicScrollReveal from '@/components/USCinematicScrollReveal';
import WaveBackground from '@/components/WaveBackground';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

import heroIndiaCriteria from '@/assets/hero-india-criteria.jpg';
import heroUSCriteria from '@/assets/hero-us-criteria.jpg';

const investmentProfile = {
  us: [
    { label: 'Revenue Range', value: '$1M – $10M' },
    { label: 'EBITDA Range', value: '$500K – $2.5M' },
    { label: 'Structure', value: 'Primarily majority control, with structured minority investments where alignment is strong' },
    { label: 'Hold Period', value: 'Long-term ownership with no predefined exit horizon' },
    { label: 'Aligned Partnerships', value: 'Prioritize situations where owners reinvest and teams remain in place' },
  ],
  india: [
    { label: 'Revenue Range', value: '₹10Cr – ₹100Cr' },
    { label: 'EBITDA Range', value: '₹5Cr – ₹25Cr' },
    { label: 'Structure', value: 'Primarily majority control, with structured minority investments where alignment is strong' },
    { label: 'Hold Period', value: 'Long-term ownership with no predefined exit horizon' },
    { label: 'Aligned Partnerships', value: 'Prioritize situations where owners reinvest and teams remain in place' },
  ],
};

const whatWeLookFor = [
  { title: 'Ownership Succession', desc: 'Partnering with owners ready for the next chapter: retirees, families, and founders seeking continuity for the businesses and teams they built.' },
  { title: 'Essential & Regulated Services', desc: 'Compliance-driven B2B sectors across underserved and overlooked markets where reliability, safety, and recurring demand create natural moats.' },
  { title: 'Recurring Revenue & Retention', desc: 'Businesses with established customer trust, high switching costs, and proven persistency that generates predictable, compounding cash flows.' },
  { title: 'Platform & Consolidation Potential', desc: 'Fragmented, underserved markets where disciplined investment compounds value over a long hold period across multiple stages of growth.' },
  { title: 'Operational Improvement Runway', desc: 'Undermanaged businesses where professionalised systems, reporting, and governance unlock enterprise value while preserving the culture that built the company.' },
  { title: 'Prudent Capital Structure', desc: 'Conservative leverage philosophy focused on business building and cash flow generation, not financial engineering.' },
];

/* ─── Typographic Number (Revenue/EBITDA) ─── */
const TypographicNumber = ({ label, value, delay, isDark }: { label: string; value: string; delay: number; isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-4"
    >
      <motion.div
        className="absolute left-0 top-0 w-[2px] bg-gold/30"
        initial={{ height: 0 }}
        animate={isInView ? { height: '100%' } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <p className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] mb-3 text-gold/75`}>
        {label}
      </p>
      <motion.p
        className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-gold leading-none tracking-[-0.02em]"
        animate={isInView ? {
          textShadow: ['0 0 0px hsl(43 78% 50% / 0)', '0 0 30px hsl(43 78% 50% / 0.4)', '0 0 0px hsl(43 78% 50% / 0)'],
        } : {}}
        transition={{ duration: 2, delay: delay + 0.5, ease: 'easeInOut' }}
      >
        {value}
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 32 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1.5px] bg-gold/25 mt-3"
      />
    </motion.div>
  );
};

/* ─── Typographic Text (Structure/Hold/Partnerships) ─── */
const TypographicText = ({ label, value, delay, isDark }: { label: string; value: string; delay: number; isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] mb-2 flex items-center gap-1.5 text-gold/75`}>
        <span className="w-1.5 h-1.5 rounded-full bg-gold/30" />
        {label}
      </p>
      <p className={`font-sans text-[14.5px] leading-[1.7] ${isDark ? 'text-primary-foreground/60' : 'text-foreground/85'}`}>
        {value}
      </p>
    </motion.div>
  );
};

/* ─── Eval Step (Horizontal Timeline) ─── */
const EvalStep = ({ step, index, isDark }: { step: { num: string; title: string; desc: string }; index: number; isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'center center', 'end 0.1'],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0.4, 0.9, 1, 0.9, 0.4]);
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const dotGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 0]);

  return (
    <motion.div ref={ref} style={{ opacity: glowOpacity }} className="relative pt-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <motion.div
          style={{
            scale: dotScale,
            boxShadow: useTransform(dotGlow, v => `0 0 ${v * 20}px hsl(43 78% 50% / ${v * 0.5})`),
          }}
          className="w-3 h-3 rounded-full bg-gold/60 border-2 border-gold/30"
        />
      </div>
      <motion.p className="text-center font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-gold/40 mt-4 mb-2">
        Step {step.num}
      </motion.p>
      <h3 className={`text-center font-serif text-[1.1rem] md:text-[1.25rem] leading-[1.2] tracking-[-0.02em] mb-2 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
        {step.title}
      </h3>
      <div className="w-8 h-[1.5px] bg-gold/25 mx-auto mb-3" />
      <p className={`text-center font-sans text-[13px] md:text-[14px] leading-[1.7] ${isDark ? 'text-primary-foreground/55' : 'text-muted-foreground'}`}>
        {step.desc}
      </p>
    </motion.div>
  );
};

/* ─── CriteriaScrollZoom ─── */
type CriteriaItem = { title: string; desc: string; num?: string };

const ICCriteriaScrollZoom = ({ items, isDark }: { items: CriteriaItem[]; isDark: boolean }) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalItems = items.length;
  const numberedItems = items.map((item, i) => ({ ...item, num: item.num || String(i + 1).padStart(2, '0') }));

  if (isMobile) {
    return (
      <div className="px-5 py-6">
        <div className="space-y-6">
          {numberedItems.map((item, i) => (
            <ICMobileCriterionCard key={item.num} item={item} index={i} isDark={isDark} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 pt-4 pb-2">
          {numberedItems.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold/20" />
          ))}
        </div>
      </div>
    );
  }

  const sectionHeight = totalItems * 100;

  return (
    <>
      <div className="h-12 bg-gradient-to-b from-background to-transparent pointer-events-none relative z-10" />
      <div ref={containerRef} className="relative" style={{ height: `${sectionHeight}vh` }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 w-full relative">
            {numberedItems.map((item, i) => {
              const itemStart = i / totalItems;
              const itemEnd = (i + 1) / totalItems;
              const itemCenter = (itemStart + itemEnd) / 2;

              return (
                <ICDesktopCriterionItem
                  key={item.num}
                  item={item}
                  index={i}
                  totalItems={totalItems}
                  isDark={isDark}
                  scrollProgress={scrollYProgress}
                  itemStart={itemStart}
                  itemEnd={itemEnd}
                  itemCenter={itemCenter}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-12 bg-gradient-to-t from-background to-transparent pointer-events-none relative z-10" />
    </>
  );
};

const ICDesktopCriterionItem = ({ item, index, totalItems, isDark, scrollProgress, itemStart, itemEnd, itemCenter }: {
  item: { num: string; title: string; desc: string };
  index: number;
  totalItems: number;
  isDark: boolean;
  scrollProgress: any;
  itemStart: number;
  itemEnd: number;
  itemCenter: number;
}) => {
  const opacity = useTransform(scrollProgress,
    [itemStart, itemCenter - 0.03, itemCenter, itemCenter + 0.03, itemEnd],
    [0, 0.4, 1, 0.4, 0]
  );
  const scale = useTransform(scrollProgress, [itemStart, itemCenter, itemEnd], [0.92, 1, 0.92]);
  const y = useTransform(scrollProgress, [itemStart, itemCenter, itemEnd], [40, 0, -40]);
  const numberScale = useTransform(scrollProgress, [itemStart, itemCenter, itemEnd], [0.7, 1, 0.7]);
  const underlineWidth = useTransform(scrollProgress,
    [itemStart, itemCenter - 0.02, itemCenter, itemCenter + 0.02, itemEnd],
    ['0%', '30%', '100%', '30%', '0%']
  );
  const numberGlow = useTransform(scrollProgress,
    [itemCenter - 0.02, itemCenter, itemCenter + 0.02],
    ['0 0 0px hsl(43 78% 50% / 0)', '0 0 40px hsl(43 78% 50% / 0.3)', '0 0 0px hsl(43 78% 50% / 0)']
  );
  const progressWidth = useTransform(scrollProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div style={{ opacity, scale, y }} className="absolute inset-x-0 px-5 md:px-10 lg:px-16">
      <div className="max-w-[1080px] mx-auto grid grid-cols-12 gap-8 items-center">
        <div className="col-span-2">
          <motion.span
            style={{ scale: numberScale, textShadow: numberGlow }}
            className="block font-serif text-[5rem] md:text-[7rem] leading-none text-gold/30"
          >
            {item.num}
          </motion.span>
        </div>
        <div className="col-span-10 md:col-span-4">
          <h3 className={`font-serif text-[1.4rem] md:text-[1.8rem] leading-[1.15] tracking-[-0.02em] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
            {item.title}
          </h3>
          <motion.div style={{ width: underlineWidth }} className="h-[2px] bg-gold/60 mt-2" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <p className={`font-sans text-[15px] md:text-[16px] leading-[1.8] ${isDark ? 'text-primary-foreground/55' : 'text-muted-foreground'}`}>
            {item.desc}
          </p>
        </div>
      </div>
      <div className="max-w-[1080px] mx-auto mt-8 flex items-center gap-2">
        {Array.from({ length: totalItems }, (_, i) => (
          <div key={i} className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${
            i === index
              ? 'bg-gold/60 shadow-[0_0_8px_hsl(43,78%,50%,0.2)]'
              : isDark ? 'bg-primary-foreground/10' : 'bg-foreground/8'
          }`} />
        ))}
      </div>
      <div className="max-w-[1080px] mx-auto mt-4 flex items-center justify-center gap-3">
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold/60">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="w-16 h-px bg-foreground/10 relative overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 bg-gold/60" style={{ width: progressWidth }} />
        </div>
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/25">
          {String(totalItems).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
};

const ICMobileCriterionCard = ({ item, index, isDark }: { item: { num: string; title: string; desc: string }; index: number; isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'center center', 'end 0.2'],
  });
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.4, 0.9, 1, 0.9, 0.4]);

  return (
    <div className="min-h-[140px]">
      <motion.div
        ref={ref}
        style={{ scale: cardScale, opacity: cardOpacity }}
        whileTap={{ scale: 0.98 }}
        className={`relative p-5 rounded-lg ${isDark ? 'bg-card/40' : 'bg-[hsl(40,22%,96%)]/80'}`}
      >
        <span className="font-serif text-[2rem] leading-none text-gold/25 block mb-2">{item.num}</span>
        <h3 className={`font-serif text-[1.1rem] leading-[1.25] tracking-[-0.02em] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
          {item.title}
        </h3>
        <div className="w-8 h-[1.5px] bg-gold/50 mt-1.5 mb-2" />
        <p className={`font-sans text-[13px] leading-[1.75] ${isDark ? 'text-primary-foreground/55' : 'text-muted-foreground'}`}>
          {item.desc}
        </p>
      </motion.div>
    </div>
  );
};

const InvestmentCriteria = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isIndia = region === 'india';
  const profile = isIndia ? investmentProfile.india : investmentProfile.us;

  const numberCards = profile.slice(0, 2);
  const textCards = profile.slice(2);

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <section className={`relative overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
        <CinematicHero imageSrc={isIndia ? heroIndiaCriteria : heroUSCriteria} overlay="strong" />
        
        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-14">
          <FadeIn>
            <SectionLabel light={isDark}>{isIndia ? 'Investment Criteria, India' : 'Investment Criteria'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.6rem)] max-w-[600px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground'}`}>
              {isIndia ? <><span className="text-gold">Disciplined</span> Capital for India's Best</> : <>Where <span className="text-gold">Conviction</span> Meets Capital</>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[480px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground'}`}>
              {isIndia
                ? 'A rigorous framework for identifying, evaluating, and partnering with India\'s most promising founder-led companies.'
                : 'Our disciplined criteria for identifying exceptional businesses with enduring competitive advantages.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Investment Profile — Typographic Term Sheet */}
      <section className={`relative overflow-hidden ${
        isDark ? 'bg-primary text-primary-foreground' : 'bg-[hsl(40,18%,96%)] text-foreground border-y border-[hsl(38,12%,90%)]'
      }`}>
        {isDark ? <DarkSectionEffects variant="cta" /> : <LightSectionEffects variant="section" />}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, hsl(40,65%,44%,0.03) 50%, transparent 60%)',
              backgroundSize: '300% 100%',
              animation: 'shimmer-sweep 8s linear infinite',
            }}
          />
        </div>

        <motion.div
          className="absolute top-0 left-0 right-0 h-px z-10"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(43 78% 50% / 0.15), transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14">
          <FadeIn>
            <SectionLabel light={isDark}>Investment Profile</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] leading-[1.15] mb-2 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              {isIndia ? 'Our Target Parameters, India' : 'Our Target Parameters'}
            </h2>
            <GoldRule className="mb-8 md:mb-10" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-10">
            {numberCards.map((stat, i) => (
              <TypographicNumber key={stat.label} label={stat.label} value={stat.value} delay={i * 0.08} isDark={isDark} />
            ))}
          </div>

          <motion.div
            className="h-px bg-gold/20 mb-8 md:mb-10 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {textCards.map((stat, i) => (
              <TypographicText key={stat.label} label={stat.label} value={stat.value} delay={(i + 2) * 0.08} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For — Scroll Zoom */}
      <section className="bg-background overflow-x-clip">
        <div className="px-5 md:px-10 lg:px-16 pt-4 md:pt-6 lg:pt-8">
          <div className="max-w-[1080px] mx-auto">
            <FadeIn>
              <SectionLabel>Investment Criteria</SectionLabel>
              <h2 className={`font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.15] max-w-[480px] mb-2 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                What We Look For
              </h2>
              <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] max-w-[540px] mb-4">
                We evaluate opportunities through a rigorous lens: target sectors, ownership transitions, cultural fit, and enduring competitive advantages.
              </p>
              <GoldRule className="mt-3 mb-0" />
            </FadeIn>
          </div>
        </div>
        <ICCriteriaScrollZoom items={whatWeLookFor} isDark={isDark} />
      </section>

      {/* Cinematic Scroll Reveal */}
      {isIndia ? <CinematicScrollReveal /> : <USCinematicScrollReveal />}

      {/* Evaluation Framework — Horizontal Timeline */}
      <section className={`relative overflow-x-clip ${isDark ? 'bg-primary text-primary-foreground' : 'bg-[hsl(40,18%,96%)] text-foreground border-y border-[hsl(38,12%,90%)]'}`}>
        {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14">
          <FadeIn>
            <SectionLabel light={isDark}>Evaluation Framework</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.15] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              How We Evaluate Opportunities
            </h2>
            <GoldRule className="mt-3 mb-6 md:mb-8" />
          </FadeIn>

          <div className="relative">
            <div className="absolute top-[6px] left-0 right-0 h-px bg-gold/20 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
              {[
                { num: '01', title: 'Discovery', desc: 'Proprietary networks and deep sector relationships surface opportunities that never reach a market process.' },
                { num: '02', title: 'Evaluation', desc: 'Strategic fit, market position, culture alignment, and growth vectors assessed with institutional rigour.' },
                { num: '03', title: 'Diligence', desc: 'Deep financial, operational, legal, and commercial analysis. Conviction requires evidence.' },
                { num: '04', title: 'Structuring', desc: 'Ownership, governance, and capital structures designed for decades, not exits.' },
              ].map((step, i) => (
                <EvalStep key={i} step={step} index={i} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Edge */}
      <ScrollRevealText
        label="Our Edge"
        heading="A disciplined, repeatable framework for building lasting value in every business we partner with."
        highlights={['disciplined', 'lasting']}
        variant="light"
      />

      {/* Value Creation Playbook */}
      <section className="bg-background px-5 md:px-10 lg:px-16 pb-10 md:pb-14 -mt-10 overflow-x-hidden">
        <div className="max-w-[1080px] mx-auto">
          <CriteriaCarousel
            items={[
              { title: 'Stabilise & Professionalise', desc: 'Implement institutional-grade systems, reporting, and governance from day one.' },
              { title: 'Optimise Operations', desc: 'Drive margin improvement through operational excellence and best-practice deployment.' },
              { title: 'Invest in Growth', desc: 'Deploy capital into organic expansion, adjacent markets, and strategic acquisitions.' },
              { title: 'Compound Value', desc: 'Long-term hold periods allow compounding of operational improvements and market position.' },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className={`relative overflow-hidden px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-14 ${
        isDark ? 'hero-gradient-animated text-primary-foreground' : 'bg-[hsl(40,20%,91%)] text-foreground border-t border-gold/20'
      }`}>
        <WaveBackground variant="section" />
        {isDark ? <DarkSectionEffects variant="cta" /> : <LightSectionEffects variant="cta" />}
        <div className="relative max-w-[1080px] mx-auto">
          <div className="max-w-[540px]">
            <FadeIn>
              <SectionLabel light={isDark}>Connect</SectionLabel>
              <h2 className={`font-serif text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.15] mb-4 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                {isIndia ? 'Partner With Us in India' : 'Start a Conversation'}
              </h2>
              <p className={`font-sans text-[15px] md:text-[16px] leading-[1.8] mb-6 ${isDark ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                {isIndia
                  ? 'If you\'re building a business meant to last, we\'d welcome a conversation about partnership.'
                  : 'If you\'re a founder considering your next chapter, we\'d welcome the conversation.'}
              </p>
              <Link
                to={`/${region}/contact`}
                className="btn-premium btn-gold btn-premium-glow inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-6 md:px-8 py-3.5 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentCriteria;