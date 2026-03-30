import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import CinematicHero from '@/components/CinematicHero';
import CinematicScrollReveal from '@/components/CinematicScrollReveal';
import USCinematicScrollReveal from '@/components/USCinematicScrollReveal';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
  { num: '01', title: 'Ownership Succession', desc: 'Partnering with owners ready for the next chapter: retirees, families, and founders seeking continuity for the businesses and teams they built.' },
  { num: '02', title: 'Essential & Regulated Services', desc: 'Compliance-driven B2B sectors across underserved and overlooked markets where reliability, safety, and recurring demand create natural moats.' },
  { num: '03', title: 'Recurring Revenue & Retention', desc: 'Businesses with established customer trust, high switching costs, and proven persistency that generates predictable, compounding cash flows.' },
  { num: '04', title: 'Platform & Consolidation Potential', desc: 'Fragmented, underserved markets where disciplined investment compounds value over a long hold period across multiple stages of growth.' },
  { num: '05', title: 'Operational Improvement Runway', desc: 'Undermanaged businesses where professionalised systems, reporting, and governance unlock enterprise value while preserving the culture that built the company.' },
  { num: '06', title: 'Prudent Capital Structure', desc: 'Conservative leverage philosophy focused on business building and cash flow generation, not financial engineering.' },
];

/** Stat card for the investment profile band */
const StatCard = ({ label, value, delay = 0, isDark, isCompact = false, currencySymbol }: {
  label: string; value: string; delay?: number; isDark: boolean; isCompact?: boolean; currencySymbol?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-sm transition-all duration-500 overflow-hidden ${
        isCompact
          ? `border-t-2 border-gold/30 border-x border-b p-5 md:p-6 ${
              isDark
                ? 'bg-[hsl(210,45%,9%)]/80 backdrop-blur-sm border-x-border/30 border-b-border/30'
                : 'bg-white border-x-[hsl(38,15%,90%)] border-b-[hsl(38,15%,90%)] hover:shadow-[0_12px_40px_-8px_hsl(38,45%,52%,0.12)] hover:border-t-gold/70'
            }`
          : `border-l-2 border-gold/20 group-hover:border-gold/50 border-y border-r p-5 md:p-6 ${
              isDark
                ? 'bg-[hsl(210,45%,9%)]/80 backdrop-blur-sm border-y-border/30 border-r-border/30'
                : 'bg-white border-y-[hsl(38,15%,90%)] border-r-[hsl(38,15%,90%)] hover:shadow-[0_12px_40px_-8px_hsl(38,45%,52%,0.12)]'
            }`
      }`}
    >
      {/* Hover inner glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,hsl(38,48%,52%,0.04),transparent_70%)]" />

      {/* Currency watermark for compact cards */}
      {isCompact && currencySymbol && (
        <span className="absolute top-3 right-4 font-serif italic text-[3rem] text-gold/[0.05] select-none pointer-events-none leading-none">
          {currencySymbol}
        </span>
      )}

      <div className="relative">
        <div className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.18em] mb-2 ${
          isDark ? 'text-primary-foreground/35' : 'text-muted-foreground'
        }`}>
          {!isCompact && <span className="text-gold mr-1">•</span>}
          {label}
        </div>
        {isCompact ? (
          <>
            <div
              className="font-serif text-[clamp(1.5rem,3vw,2rem)] text-gold leading-none tracking-[-0.02em] group-hover:text-gold/90 transition-all duration-300"
              style={{ textShadow: 'none' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.textShadow = '0 0 30px hsl(38,48%,52%,0.15)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.textShadow = 'none'; }}
            >
              {value}
            </div>
            {/* Animated gold underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 40 } : {}}
              transition={{ duration: 0.6, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1.5px] bg-gold/30 mt-2"
            />
          </>
        ) : (
          <p className={`font-sans text-[14.5px] md:text-[15px] leading-[1.7] ${isDark ? 'text-primary-foreground/60' : 'text-foreground/85'}`}>
            {value}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const CriterionCard = ({ item, index, isDark }: { item: typeof whatWeLookFor[0]; index: number; isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -30 : 30, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative"
    >
      <div className={`relative h-full overflow-hidden rounded-sm border backdrop-blur-sm transition-all duration-500 ${
        isDark
          ? 'border-border/40 bg-card/50 group-hover:border-gold/20 group-hover:shadow-[0_8px_32px_-8px_hsl(var(--gold)/0.15)]'
          : 'border-[hsl(38,15%,90%)]/60 bg-[hsl(40,20%,98%)]/80 group-hover:border-gold/25 group-hover:shadow-[0_12px_40px_-10px_hsl(38,45%,52%,0.1)]'
      }`}>
        <div className={`absolute left-0 top-0 w-[2px] h-0 transition-all duration-700 ease-out group-hover:h-full ${
          isDark ? 'bg-gold/60' : 'bg-gold/20 group-hover:bg-gold/60'
        }`} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--gold)/0.04),transparent_70%)]" />
        <span className={`absolute -right-2 -bottom-4 font-serif text-[6rem] md:text-[7rem] leading-none italic select-none pointer-events-none transition-colors duration-500 ${
          isDark
            ? 'text-gold/[0.04] group-hover:text-gold/[0.08]'
            : 'text-gold/[0.05] group-hover:text-gold/[0.1]'
        }`}>
          {item.num}
        </span>
        <div className="relative p-7 md:p-8 lg:p-10 flex flex-col h-full">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/40 mb-5 md:mb-6 block">
            Criterion {item.num}
          </span>
          <h3 className="font-serif text-[clamp(1.2rem,2.2vw,1.5rem)] text-foreground leading-[1.2] tracking-[-0.02em] mb-4">
            {item.title}
          </h3>
          <div className={`w-10 h-[1.5px] mb-5 transition-all duration-500 group-hover:w-16 ${
            isDark ? 'bg-gold/25 group-hover:bg-gold/40' : 'bg-gold/30 group-hover:bg-gold/50'
          }`} />
          <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] flex-1">
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const OurFocus = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isIndia = region === 'india';
  const profile = isIndia ? investmentProfile.india : investmentProfile.us;
  const currencySymbol = isIndia ? '₹' : '$';

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
            <SectionLabel light={isDark}>{isIndia ? 'Our Focus, India' : 'Our Focus'}</SectionLabel>
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

      {/* Investment Profile — theme-responsive stat band */}
      <section className={`relative overflow-hidden ${
        isDark ? 'bg-primary text-primary-foreground' : 'bg-[hsl(40,18%,96%)] text-foreground border-y border-[hsl(38,12%,90%)]'
      }`}>
        {isDark ? <DarkSectionEffects variant="cta" /> : <LightSectionEffects variant="section" />}
        {/* Shimmer sweep overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, hsl(38,48%,52%,0.03) 50%, transparent 60%)',
              backgroundSize: '300% 100%',
              animation: 'shimmer-sweep 8s linear infinite',
            }}
          />
        </div>
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14">
          <FadeIn>
            <SectionLabel light={isDark}>Investment Profile</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] leading-[1.15] mb-2 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              {isIndia ? 'Our Target Parameters, India' : 'Our Target Parameters'}
            </h2>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>

          {/* Top row: number cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
            {numberCards.map((stat, i) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} delay={i * 0.06} isDark={isDark} isCompact currencySymbol={currencySymbol} />
            ))}
          </div>

          {/* Bottom row: text cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {textCards.map((stat, i) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} delay={(i + 2) * 0.06} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-14">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Investment Criteria</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-foreground leading-[1.15] max-w-[480px] mb-2">
              What We Look For
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] max-w-[540px] mb-4">
              We evaluate opportunities through a rigorous lens: target sectors, ownership transitions, cultural fit, and enduring competitive advantages.
            </p>
            <GoldRule className="mt-3 mb-8 md:mb-10" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {whatWeLookFor.map((item, i) => (
              <CriterionCard key={item.num} item={item} index={i} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic Scroll Reveal */}
      {isIndia ? <CinematicScrollReveal /> : <USCinematicScrollReveal />}

      {/* CTA */}
      <section className={`relative overflow-hidden px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-14 ${
        isDark ? 'hero-gradient-animated text-primary-foreground' : 'bg-[hsl(38,16%,92%)] text-foreground border-t border-gold/10'
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

export default OurFocus;