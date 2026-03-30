import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
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
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import heroIndiaCriteria from '@/assets/hero-india-criteria.jpg';
import heroUSCriteria from '@/assets/hero-us-criteria.jpg';

const investmentProfile = {
  us: [
    { label: 'Revenue Range', value: '$1M – $10M', subtitle: '₹10Cr – ₹100Cr' },
    { label: 'EBITDA Range', value: '$500K – $2.5M', subtitle: '₹5Cr – ₹25Cr' },
    { label: 'Structure', value: 'Primarily majority control, with structured minority investments where alignment is strong' },
    { label: 'Hold Period', value: 'Long-term ownership with no predefined exit horizon' },
    { label: 'Aligned Partnerships', value: 'Prioritize situations where owners reinvest and teams remain in place.' },
  ],
  india: [
    { label: 'Revenue Range', value: '₹10Cr – ₹100Cr', subtitle: '$1M – $10M' },
    { label: 'EBITDA Range', value: '₹5Cr – ₹25Cr', subtitle: '$500K – $2.5M' },
    { label: 'Structure', value: 'Primarily majority control, with structured minority investments where alignment is strong' },
    { label: 'Hold Period', value: 'Long-term ownership with no predefined exit horizon' },
    { label: 'Aligned Partnerships', value: 'Prioritize situations where owners reinvest and teams remain in place.' },
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

/** Stat card for the investment profile band */
const StatCard = ({ label, value, subtitle, delay = 0, isDark, isCompact = false }: {
  label: string; value: string; subtitle?: string; delay?: number; isDark: boolean; isCompact?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className={`group rounded-sm border p-5 md:p-6 transition-all duration-500 hover:border-gold/25 ${
        isDark
          ? 'bg-[hsl(210,45%,9%)]/80 backdrop-blur-sm border-border/30'
          : 'bg-white/70 backdrop-blur-sm border-[hsl(38,15%,90%)]/50 hover:shadow-[0_8px_32px_-8px_hsl(38,45%,52%,0.08)]'
      }`}
    >
      <div className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.18em] mb-2 ${
        isDark ? 'text-primary-foreground/35' : 'text-muted-foreground'
      }`}>
        {label}
      </div>
      {isCompact ? (
        <>
          <div className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] text-gold leading-none tracking-[-0.02em] group-hover:text-gold/90 transition-colors duration-300">
            {value}
          </div>
          {subtitle && (
            <div className={`font-sans text-[11px] md:text-[12px] mt-1.5 ${isDark ? 'text-primary-foreground/25' : 'text-muted-foreground/60'}`}>
              {subtitle}
            </div>
          )}
        </>
      ) : (
        <p className={`font-sans text-[14px] md:text-[15px] leading-[1.65] ${isDark ? 'text-primary-foreground/60' : 'text-foreground/80'}`}>
          {value}
        </p>
      )}
    </motion.div>
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
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16">
          <FadeIn>
            <SectionLabel light={isDark}>{isIndia ? 'Investment Criteria, India' : 'Investment Criteria'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`font-serif text-[clamp(2.2rem,5vw,3.6rem)] max-w-[600px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground'}`}>
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

      {/* Investment Profile — theme-responsive stat band */}
      <section className={`relative overflow-hidden ${
        isDark ? 'bg-primary text-primary-foreground' : 'bg-[hsl(40,18%,96%)] text-foreground border-y border-[hsl(38,12%,90%)]'
      }`}>
        {isDark ? <DarkSectionEffects variant="cta" /> : <LightSectionEffects variant="section" />}
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14">
          <FadeIn>
            <SectionLabel light={isDark}>Investment Profile</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] leading-[1.15] mb-2 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              {isIndia ? 'Our Target Parameters, India' : 'Our Target Parameters'}
            </h2>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
            {numberCards.map((stat, i) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} subtitle={stat.subtitle} delay={i * 0.06} isDark={isDark} isCompact />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {textCards.map((stat, i) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} delay={(i + 2) * 0.06} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For — Sticky Card Stack */}
      <section className="bg-background overflow-x-clip">
        <div className="px-5 md:px-10 lg:px-16 pt-4 md:pt-6 lg:pt-8">
          <div className="max-w-[1080px] mx-auto">
            <FadeIn>
              <SectionLabel>Investment Criteria</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-foreground leading-[1.15] max-w-[480px] mb-2">
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

      {/* Evaluation Framework */}
      <section className={`relative overflow-x-clip ${isDark ? 'bg-primary text-primary-foreground' : 'bg-[hsl(40,18%,96%)] text-foreground border-y border-[hsl(38,12%,90%)]'}`}>
        {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-10 md:pt-14 lg:pt-16">
          <FadeIn>
            <SectionLabel light={isDark}>Evaluation Framework</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.15] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              How We Evaluate Opportunities
            </h2>
            <GoldRule className="mt-3 mb-6 md:mb-8" />
          </FadeIn>
        </div>
        <div className="relative">
          <StickyCardStack
            cards={[
              { num: '01', title: 'Discovery', description: 'We go beyond deal brokers. Our proprietary networks and deep sector relationships surface opportunities that never reach a market process.' },
              { num: '02', title: 'Evaluation', description: 'Strategic fit, market position, culture alignment, and growth vectors. Every dimension is assessed with institutional rigour before we proceed.' },
              { num: '03', title: 'Diligence', description: 'Deep financial, operational, legal, and commercial analysis. We leave no stone unturned because conviction requires evidence.' },
              { num: '04', title: 'Structuring', description: 'Ownership, governance, and capital structures designed for decades, not exits. Every term reflects our commitment to lasting partnership.' },
            ]}
            variant={isDark ? 'dark' : 'light'}
          />
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
      <section className="bg-background px-5 md:px-10 lg:px-16 pb-10 md:pb-14 lg:pb-16 -mt-10 overflow-x-hidden">
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
      <section className={`relative overflow-hidden px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16 ${
        isDark ? 'hero-gradient-animated text-primary-foreground' : 'bg-[hsl(40,18%,96%)] text-foreground'
      }`}>
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
                className={`btn-premium inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-8 py-3.5 border transition-all duration-300 ${
                  isDark
                    ? 'border-primary-foreground/[0.1] text-primary-foreground/50 hover:border-gold/30 hover:text-primary-foreground/75'
                    : 'border-border text-muted-foreground hover:border-gold/30 hover:text-foreground'
                }`}
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
