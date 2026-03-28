import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import CinematicHero from '@/components/CinematicHero';
import CinematicScrollReveal from '@/components/CinematicScrollReveal';
import USCinematicScrollReveal from '@/components/USCinematicScrollReveal';
import GlassCard from '@/components/GlassCard';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import heroIndiaCriteria from '@/assets/hero-india-criteria.jpg';
import heroUSCriteria from '@/assets/hero-us-criteria.jpg';

const investmentProfile = {
  us: [
    { label: 'Revenue Range', value: '$5M – $50M' },
    { label: 'EBITDA Range', value: '$1.5M – $10M' },
    { label: 'Enterprise Value', value: '$5M – $75M' },
    { label: 'Structure', value: 'Majority control' },
    { label: 'Hold Period', value: 'Long-term / permanent' },
    { label: 'Geography', value: 'United States' },
  ],
  india: [
    { label: 'Revenue Range', value: '₹20Cr – ₹500Cr' },
    { label: 'EBITDA Range', value: '₹5Cr – ₹75Cr' },
    { label: 'Enterprise Value', value: '₹30Cr – ₹750Cr' },
    { label: 'Structure', value: 'Majority stakes' },
    { label: 'Hold Period', value: 'Long-term partnership' },
    { label: 'Geography', value: 'Pan-India' },
  ],
};

const whatWeLookFor = [
  { num: '01', title: 'Ownership Succession', desc: 'Partnering with owners ready for the next chapter: retirees, families, and founders seeking continuity for the businesses and teams they built.', icon: '◆' },
  { num: '02', title: 'Essential & Regulated Services', desc: 'Compliance-driven B2B sectors across underserved and overlooked markets where reliability, safety, and recurring demand create natural moats.', icon: '◈' },
  { num: '03', title: 'Recurring Revenue & Retention', desc: 'Businesses with established customer trust, high switching costs, and proven persistency that generates predictable, compounding cash flows.', icon: '◇' },
  { num: '04', title: 'Platform & Consolidation Potential', desc: 'Fragmented, underserved markets where disciplined investment compounds value over a long hold period across multiple stages of growth.', icon: '⬡' },
  { num: '05', title: 'Operational Improvement Runway', desc: 'Undermanaged businesses where professionalised systems, reporting, and governance unlock enterprise value while preserving the culture that built the company.', icon: '△' },
  { num: '06', title: 'Prudent Capital Structure', desc: 'Conservative leverage philosophy focused on business building and cash flow generation, not financial engineering.', icon: '○' },
];

const StatBlock = ({ label, value, delay = 0 }: { label: string; value: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group text-center"
    >
      <div className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] text-gold leading-none tracking-[-0.02em] mb-1.5 group-hover:text-gold/90 transition-colors duration-300">
        {value}
      </div>
      <div className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground/35 group-hover:text-primary-foreground/50 transition-colors duration-300">
        {label}
      </div>
    </motion.div>
  );
};

/* ─── Sophisticated Criterion Card ─── */
const CriterionCard = ({ item, index, span }: { item: typeof whatWeLookFor[0]; index: number; span: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className={span}
      initial={{ opacity: 0, y: 32, x: index % 2 === 0 ? -16 : 16 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard index={index} hover className="h-full group/card">
        <div className="relative p-7 md:p-9 flex flex-col h-full overflow-hidden">
          {/* Watermark number */}
          <span className="absolute top-3 right-4 font-serif text-[4.5rem] md:text-[5.5rem] leading-none text-foreground/[0.04] select-none pointer-events-none tracking-[-0.04em] group-hover/card:text-gold/[0.07] transition-colors duration-500">
            {item.num}
          </span>

          {/* Gold left accent bar */}
          <motion.div
            className="absolute left-0 top-6 bottom-6 w-[2px] bg-gold/20 group-hover/card:bg-gold/50 transition-colors duration-500 rounded-full"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.09 }}
            style={{ originY: 0 }}
          />

          {/* Label */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-gold/40 text-base">{item.icon}</span>
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/45">
              Criterion {item.num}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-[clamp(1.2rem,2.2vw,1.5rem)] text-foreground leading-[1.2] tracking-[-0.02em] mb-4 group-hover/card:text-gold/90 transition-colors duration-400">
            {item.title}
          </h3>

          {/* Gold divider */}
          <motion.div
            className="h-[1.5px] bg-gold/20 mb-5 group-hover/card:bg-gold/40 transition-colors duration-500"
            initial={{ width: 0 }}
            animate={isInView ? { width: '2.5rem' } : {}}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.09 }}
          />

          {/* Description */}
          <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground leading-[1.8] flex-1">
            {item.desc}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
};

/* ─── Card span mapping: 2 wide → 3 equal → 1 full ─── */
const cardSpans = [
  'md:col-span-3',  // Card 1 — half
  'md:col-span-3',  // Card 2 — half
  'md:col-span-2',  // Card 3 — third
  'md:col-span-2',  // Card 4 — third
  'md:col-span-2',  // Card 5 — third
  'md:col-span-6',  // Card 6 — full width
];

const OurFocus = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isIndia = region === 'india';
  const profile = isIndia ? investmentProfile.india : investmentProfile.us;

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <section className="relative text-primary-foreground overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end">
        <CinematicHero imageSrc={isIndia ? heroIndiaCriteria : heroUSCriteria} overlay="strong" />
        <DarkSectionEffects variant="hero" />
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'Our Focus, India' : 'Our Focus'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] text-white max-w-[600px] leading-[1.1] tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              {isIndia ? <><span className="text-gold">Disciplined</span> Capital for India's Best</> : <>Where <span className="text-gold">Conviction</span> Meets Capital</>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[15px] md:text-[16px] text-white/65 leading-[1.75] mt-5 max-w-[480px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
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

      {/* Investment Profile — dark stats band */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects variant="cta" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14">
          <FadeIn>
            <SectionLabel light>Investment Profile</SectionLabel>
            <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] text-primary-foreground leading-[1.15] mb-2">
              {isIndia ? 'Our Target Parameters, India' : 'Our Target Parameters'}
            </h2>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 h-auto overflow-visible">
            {profile.map((stat, i) => (
              <StatBlock key={stat.label} label={stat.label} value={stat.value} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For — Sophisticated Alternating Grid */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-16 md:py-24 lg:py-28">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Investment Criteria</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-foreground leading-[1.15] max-w-[480px] mb-2">
              What We Look For
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] max-w-[540px] mb-4">
              We evaluate opportunities through a rigorous lens: target sectors, ownership transitions, cultural fit, and enduring competitive advantages.
            </p>
            <GoldRule className="mt-3 mb-10 md:mb-14" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-6">
            {whatWeLookFor.map((item, i) => (
              <CriterionCard key={item.num} item={item} index={i} span={cardSpans[i]} />
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic Scroll Reveal with Sectors */}
      {isIndia ? <CinematicScrollReveal /> : <USCinematicScrollReveal />}

      {/* CTA */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden px-5 md:px-10 lg:px-16 py-14 md:py-20 lg:py-24">
        <DarkSectionEffects variant="cta" />
        <div className="relative max-w-[1080px] mx-auto">
          <div className="max-w-[540px]">
            <FadeIn>
              <SectionLabel light>Connect</SectionLabel>
              <h2 className="font-serif text-[clamp(1.4rem,3vw,2.2rem)] text-primary-foreground leading-[1.15] mb-4">
                {isIndia ? 'Partner With Us in India' : 'Start a Conversation'}
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/50 leading-[1.8] mb-6">
                {isIndia
                  ? 'If you\'re building a business meant to last, we\'d welcome a conversation about partnership.'
                  : 'If you\'re a founder considering your next chapter, we\'d welcome the conversation.'}
              </p>
              <Link
                to={`/${region}/contact`}
                className="btn-premium inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-8 py-3.5 border border-primary-foreground/[0.1] text-primary-foreground/50 hover:border-gold/30 hover:text-primary-foreground/75 transition-all duration-300"
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
