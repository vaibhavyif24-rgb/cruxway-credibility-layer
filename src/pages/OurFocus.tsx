import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import CinematicHero from '@/components/CinematicHero';
import CinematicScrollReveal from '@/components/CinematicScrollReveal';
import USCinematicScrollReveal from '@/components/USCinematicScrollReveal';
import WaveBackground from '@/components/WaveBackground';
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

const OurFocus = () => {
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
        <WaveBackground variant="hero" />
        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-14">
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

      {/* Investment Profile — Typographic Term Sheet */}
      <section className={`relative overflow-hidden ${
        isDark ? 'bg-primary text-primary-foreground' : 'bg-[hsl(40,18%,96%)] text-foreground border-y border-[hsl(38,12%,90%)]'
      }`}>
        {isDark ? <DarkSectionEffects variant="cta" /> : <LightSectionEffects variant="section" />}
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

        {/* Section entry gold wipe */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px z-10"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(38 48% 52% / 0.15), transparent)' }}
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

          {/* Top row: Revenue + EBITDA — headline numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-10">
            {numberCards.map((stat, i) => (
              <TypographicNumber key={stat.label} label={stat.label} value={stat.value} delay={i * 0.08} isDark={isDark} />
            ))}
          </div>

          {/* Thin gold divider */}
          <div className="h-px bg-gold/15 mb-8 md:mb-10" />

          {/* Bottom section: Structure, Hold Period, Aligned Partnerships */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {textCards.map((stat, i) => (
              <TypographicText key={stat.label} label={stat.label} value={stat.value} delay={(i + 2) * 0.08} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For — Numbered Prose */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-14">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Investment Criteria</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-foreground leading-[1.15] max-w-[480px] mb-2">
              What We Look For
            </h2>
            <GoldRule className="mt-3 mb-8 md:mb-10" />
          </FadeIn>

          <div className="space-y-0">
            {whatWeLookFor.map((item, i) => (
              <CriterionRow key={item.num} item={item} index={i} isDark={isDark} isLast={i === whatWeLookFor.length - 1} />
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

/* ─── Typographic Number Card (Revenue/EBITDA) ─── */
const TypographicNumber = ({ label, value, delay, isDark }: { label: string; value: string; delay: number; isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] mb-3 ${isDark ? 'text-gold/50' : 'text-gold/50'}`}>
        {label}
      </p>
      <p className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-gold leading-none tracking-[-0.02em]">
        {value}
      </p>
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 32 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1.5px] bg-gold/25 mt-3"
      />
    </motion.div>
  );
};

/* ─── Typographic Text Card (Structure/Hold/Partnerships) ─── */
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
      <p className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] mb-2 flex items-center gap-1.5 ${isDark ? 'text-gold/50' : 'text-gold/50'}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-gold/30" />
        {label}
      </p>
      <p className={`font-sans text-[14.5px] leading-[1.7] ${isDark ? 'text-primary-foreground/60' : 'text-foreground/85'}`}>
        {value}
      </p>
    </motion.div>
  );
};

/* ─── Criterion Row (Numbered Prose) ─── */
const CriterionRow = ({ item, index, isDark, isLast }: { item: typeof whatWeLookFor[0]; index: number; isDark: boolean; isLast: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-12 gap-3 md:gap-6 py-6 md:py-8 group"
      >
        {/* Number */}
        <div className="col-span-2 md:col-span-1">
          <span className="font-serif text-[2.5rem] md:text-[3.5rem] leading-none text-gold/15 group-hover:text-gold/30 transition-colors duration-500">
            {item.num}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-10 md:col-span-3 flex items-start pt-2 md:pt-3">
          <h3 className="font-serif text-[1.1rem] md:text-[1.25rem] text-foreground leading-[1.2] tracking-[-0.02em] group-hover:text-gold transition-colors duration-500">
            {item.title}
          </h3>
        </div>

        {/* Description */}
        <div className="col-span-12 md:col-span-8 pt-0 md:pt-3">
          <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75]">
            {item.desc}
          </p>
        </div>
      </motion.div>

      {/* Animated gold divider */}
      {!isLast && (
        <motion.div
          className="h-px origin-left"
          style={{ background: 'linear-gradient(90deg, hsl(38 48% 52% / 0.2), hsl(38 48% 52% / 0.05), transparent)' }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </div>
  );
};

export default OurFocus;
