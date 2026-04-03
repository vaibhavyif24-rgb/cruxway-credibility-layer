import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { ArrowRight, Search, BarChart3, FileSearch, Layers } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import StickyCardStack from '@/components/StickyCardStack';
import CriteriaCarousel from '@/components/CriteriaCarousel';
import CinematicHero from '@/components/CinematicHero';
import ScrollRevealText from '@/components/ScrollRevealText';
import CinematicScrollReveal from '@/components/CinematicScrollReveal';
import USCinematicScrollReveal from '@/components/USCinematicScrollReveal';
import WaveBackground from '@/components/WaveBackground';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import GlassCard from '@/components/GlassCard';

import heroIndiaCriteria from '@/assets/hero-india-criteria.jpg';
import heroUSCriteria from '@/assets/hero-us-criteria.jpg';

const investmentProfile = {
  us: [
    { label: 'Revenue Range', value: '$1M – $10M' },
    { label: 'EBITDA Range', value: '$500K – $2.5M+' },
    { label: 'Structure', value: 'Primarily majority control, with structured minority investments where alignment is strong' },
    { label: 'Hold Period', value: 'Long-term ownership with no predefined exit horizon' },
    { label: 'Aligned Partnerships', value: 'Prioritize situations where owners reinvest and teams remain in place' },
  ],
  india: [
    { label: 'Revenue Range', value: '₹10Cr – ₹100Cr' },
    { label: 'EBITDA Range', value: '₹5Cr – ₹25Cr+' },
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
  { title: 'Operational Improvement Runway', desc: 'Undermanaged businesses where professionalized systems, reporting, and governance unlock enterprise value while preserving the culture that built the company.' },
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
      {/* Gold accent line */}
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
const evalIcons = [Search, BarChart3, FileSearch, Layers];

const EvalStep = React.memo(({ step, index, isDark }: { step: { num: string; title: string; desc: string }; index: number; isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'center center', 'end 0.1'],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0.4, 0.9, 1, 0.9, 0.4]);
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const dotGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 0]);
  const Icon = evalIcons[index] || Search;

  return (
    <motion.div ref={ref} style={{ opacity: glowOpacity }} className="relative">
      <GlassCard index={index} hover={true}>
        <div className="pt-10 px-4 pb-6">
          {/* Timeline dot with ring */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center group hover:bg-gold/10 transition-colors duration-300">
              <motion.div
                style={{
                  scale: dotScale,
                  boxShadow: useTransform(dotGlow, v => `0 0 ${v * 20}px hsl(43 78% 50% / ${v * 0.5})`),
                }}
                className="w-3 h-3 rounded-full bg-gold/60 border-2 border-gold/30"
              />
            </div>
          </div>

          {/* Icon */}
          <motion.div
            className="flex justify-center mt-3 mb-2"
            initial={{ rotate: -10, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon className="w-5 h-5 text-gold/40" />
          </motion.div>

          {/* Step number */}
          <motion.p className="text-center font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-gold/40 mb-2">
            Step {step.num}
          </motion.p>

          {/* Title */}
          <h3 className={`text-center font-serif text-[1.2rem] md:text-[1.35rem] leading-[1.2] tracking-[-0.02em] mb-2 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
            {step.title}
          </h3>

          {/* Gold underline */}
          <motion.div
            className="w-8 h-[1.5px] bg-gold/25 mx-auto mb-3 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Description */}
          <p className={`text-center font-sans text-[14px] md:text-[15px] leading-[1.7] ${isDark ? 'text-primary-foreground/55' : 'text-muted-foreground'}`}>
            {step.desc}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
});

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
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.6rem)] max-w-[600px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]'}`}>
              {isIndia ? <>How We <span className="text-gold">Choose</span> Our Partners in India</> : <>What We Look for in a <span className="text-gold">Business</span></>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[480px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)]'}`}>
              {isIndia
                ? 'We have spent years learning what makes a founder-led business special. Here is how we evaluate the ones we want to back.'
                : 'We have spent our careers studying what makes certain businesses endure. These are the qualities we look for.'}
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
            <h2 className={`font-serif text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.15] mb-2 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
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

      {/* What We Look For */}
      <section className="bg-background overflow-x-clip">
        <div className="px-5 md:px-10 lg:px-16 pt-4 md:pt-6 lg:pt-8">
          <div className="max-w-[1080px] mx-auto">
            <FadeIn>
              <SectionLabel>Investment Criteria</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] max-w-[480px] mb-2 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                What We Look For
              </h2>
              <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] max-w-[540px] mb-4">
                We evaluate opportunities through a rigorous lens: target sectors, ownership transitions, cultural fit, and enduring competitive advantages that align with our long-term partnership model.
              </p>
              <GoldRule className="mt-3 mb-4 md:mb-5" />
            </FadeIn>
          </div>
        </div>
        <StickyCardStack
          cards={whatWeLookFor.map((item, i) => ({
            num: String(i + 1).padStart(2, '0'),
            title: item.title,
            description: item.desc,
          }))}
          variant={isDark ? 'dark' : 'light'}
          illustrationSet="criteria"
          labelPrefix="Criterion"
          mode="sticky"
        />
      </section>

      {/* Cinematic Scroll Reveal */}
      {isIndia ? <CinematicScrollReveal /> : <USCinematicScrollReveal />}

      {/* Evaluation Framework — Horizontal Timeline */}
      <section className={`relative overflow-x-clip ${isDark ? 'bg-primary text-primary-foreground' : 'bg-[hsl(40,18%,96%)] text-foreground border-y border-[hsl(38,12%,90%)]'}`}>
        {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14">
          <FadeIn>
            <SectionLabel light={isDark}>Evaluation Framework</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              How We Evaluate Opportunities
            </h2>
            <GoldRule className="mt-3 mb-6 md:mb-8" />
          </FadeIn>

          {/* Timeline container */}
          <div className="relative">
            {/* Horizontal connecting line with draw animation */}
            <motion.div
              className="absolute top-[16px] left-0 right-0 h-px bg-gold/20 hidden md:block origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
              {[
                { num: '01', title: 'Discovery', desc: 'Proprietary networks, trusted adviser relationships, and deep sector immersion surface off-market opportunities long before they reach an auction process.' },
                { num: '02', title: 'Evaluation', desc: 'Every opportunity is stress-tested across financials, unit economics, customer concentration, competitive positioning, management quality, and cultural alignment.' },
                { num: '03', title: 'Diligence', desc: 'Rigorous financial, operational, legal, regulatory, and commercial analysis with third-party specialists. We model downside scenarios and build conviction through evidence.' },
                { num: '04', title: 'Structuring', desc: 'Ownership, governance, incentive alignment, and capital structures engineered for multi-decade compounding. Every term reflects our commitment to permanence.' },
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
              { title: 'Stabilize & Professionalize', desc: 'Implement institutional-grade systems, reporting, and governance from day one.' },
              { title: 'Optimize Operations', desc: 'Drive margin improvement through operational excellence and best-practice deployment.' },
              { title: 'Invest in Growth', desc: 'Deploy capital into organic expansion, adjacent markets, and strategic acquisitions.' },
              { title: 'Compound Value', desc: 'Long-term hold periods allow compounding of operational improvements and market position.' },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
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
                    ? "If you're building a business meant to last, we'd welcome a conversation about partnership."
                    : "If you're a founder considering your next chapter, we'd welcome the conversation."}
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.1}>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={`/${region}/contact`}
                  className="group relative inline-flex items-center gap-3 font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.16em] border-2 border-gold text-gold px-10 py-5 md:px-12 md:py-6 transition-all duration-300 hover:bg-gold hover:text-white overflow-hidden"
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

export default InvestmentCriteria;