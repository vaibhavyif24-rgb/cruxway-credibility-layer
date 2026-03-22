import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import ApproachTable from '@/components/ApproachTable';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import AnimatedAccent from '@/components/AnimatedAccent';
import GlassCard from '@/components/GlassCard';
import CinematicHero from '@/components/CinematicHero';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import heroIndiaCriteria from '@/assets/hero-india-criteria.jpg';
import heroUSCriteria from '@/assets/hero-us-criteria.jpg';

const usSectors = [
  { label: 'Electrical & Infrastructure', desc: 'High-voltage services, grid modernisation, and critical infrastructure maintenance', icon: '⚡' },
  { label: 'Environmental Services', desc: 'Compliance-driven remediation, waste management, and sustainability services', icon: '🌿' },
  { label: 'Facility Services', desc: 'Building maintenance, security, and specialised facility management', icon: '🏢' },
  { label: 'Engineering & Technical', desc: 'Inspection, testing, calibration, and specialised engineering solutions', icon: '⚙️' },
  { label: 'Compliance & Safety', desc: 'Regulatory compliance, audit, and risk management services', icon: '🛡️' },
  { label: 'Industrial Distribution', desc: 'Specialised parts, equipment, and supply chain solutions for essential industries', icon: '📦' },
];

const investmentCriteria = [
  { t: 'Target Sectors', d: 'Essential B2B services in regulated, compliance-driven industries with deep, long-standing client relationships and high barriers to entry.' },
  { t: 'All Stages', d: 'From founder-led transitions and succession events to mature businesses seeking operational improvement, professionalisation, and growth capital.' },
  { t: 'Underserved Markets', d: 'Overlooked segments of the lower middle market where institutional capital has been absent and where operational expertise creates outsized value.' },
  { t: 'Ownership Transition', d: 'Clean ownership transitions that honour the legacy founders built over decades, with structured approaches to leadership continuity.' },
  { t: 'Proven Persistency', d: 'Demonstrated customer retention with high switching costs, recurring revenue models, and trust built over years of consistent delivery.' },
  { t: 'Cultural Fit', d: 'Alignment of values is non-negotiable. We invest in people and culture as much as in the underlying business fundamentals.' },
  { t: 'Customer Trust', d: 'Long-standing client relationships built on reliability, deep domain expertise, and consistent performance form the foundation of our thesis.' },
];

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

const dealCharacteristics = [
  { title: 'Founder Succession', desc: 'Owners planning retirement or transition who seek a partner to preserve their legacy and take the business forward.' },
  { title: 'Growth Capital', desc: 'Profitable businesses with clear expansion opportunities that require patient capital and operational resources.' },
  { title: 'Operational Complexity', desc: 'Companies where professionalisation of systems, processes, and management creates meaningful enterprise value.' },
  { title: 'Fragmented Markets', desc: 'Industries ripe for consolidation where a platform strategy can drive superior returns through add-on acquisitions.' },
];

/** Animated stat counter */
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

const InvestmentCriteria = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const approach = isIndia
    ? [
        { t: 'Low Market Focus', d: 'High-potential businesses where operational improvement unlocks outsized returns across India\'s expanding middle market.' },
        { t: 'Founder Alignment', d: 'Partnerships structured around the founder\'s vision and growth timeline, not rigid fund mandates.' },
        { t: 'Operational Partnership', d: 'Driving meaningful, sustainable outcomes by embedding institutional best practices across Indian markets.' },
        { t: 'Disciplined Capital', d: 'Capital allocated toward highest-return uses with rigorous diligence and downside protection.' },
      ]
    : [
        { t: 'Long-Term Alignment', d: 'Hold periods designed around the growth opportunity, not exit timelines. Our capital is patient by design.' },
        { t: 'Essential Services', d: 'Regulated industries where trust, compliance expertise, and deep relationships create durable competitive advantages.' },
        { t: 'Operational Partnership', d: 'Professionalising operations, implementing scalable systems, and driving sustainable growth alongside management teams.' },
        { t: 'Disciplined Capital', d: 'Protecting downside through conservative structures while investing for long-term enterprise value creation.' },
      ];

  const profile = isIndia ? investmentProfile.india : investmentProfile.us;

  return (
    <div>
      {/* Hero */}
      <section className="relative text-primary-foreground overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end">
        <CinematicHero imageSrc={isIndia ? heroIndiaCriteria : heroUSCriteria} overlay="strong" />
        <DarkSectionEffects variant="hero" />
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'Investment Criteria — India' : 'Investment Criteria'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] text-white max-w-[600px] leading-[1.1] tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              {isIndia ? <>Investing Tailored to <span className="text-gold">India's</span> Needs</> : <>Investing Tailored to Each <span className="text-gold">Company's</span> Needs</>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[15px] md:text-[16px] text-white/65 leading-[1.75] mt-5 max-w-[480px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
              {isIndia
                ? 'Cruxway invests in and acquires majority stakes in founder-led companies across India\'s essential sectors, providing long-term capital along with operational expertise.'
                : 'Combining long-term capital with operating expertise to help business owners build lasting institutions.'}
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
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-8 md:py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {profile.map((stat, i) => (
              <StatBlock key={stat.label} label={stat.label} value={stat.value} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach + Criteria SVG */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <FadeIn>
                <SectionLabel>Our Approach</SectionLabel>
                <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-foreground leading-[1.15]">
                  How We Partner With Founders
                </h2>
                <GoldRule className="mt-3 mb-5" />
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {approach.map((item, i) => (
                  <GlassCard key={item.t} index={i} className="p-4 md:p-5 h-full" hover={false}>
                    <div className="flex flex-col h-full">
                      <h4 className="font-serif text-[0.95rem] md:text-[1.05rem] text-foreground leading-[1.25] mb-1.5">{item.t}</h4>
                      <p className="font-sans text-[12px] md:text-[13px] text-muted-foreground leading-[1.65] flex-1">{item.d}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
            <FadeIn delay={0.12}>
              <AnimatedAccent variant="criteria" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Investment Criteria — dark, expanded */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <FadeIn>
            <SectionLabel light>What We Look For</SectionLabel>
            <h2 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] text-primary-foreground leading-[1.15] max-w-[480px] mb-2">
              Investment Criteria
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-primary-foreground/40 leading-[1.75] max-w-[540px] mb-6 md:mb-8">
              We evaluate opportunities through a rigorous lens, seeking businesses with enduring competitive advantages and alignment with our long-term partnership model.
            </p>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>
          <ApproachTable items={investmentCriteria} variant="dark" />
        </div>
      </section>

      {/* Deal Characteristics — light */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14">
            <div className="lg:col-span-4">
              <FadeIn>
                <SectionLabel>Deal Characteristics</SectionLabel>
                <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] text-foreground leading-[1.2]">
                  What Drives Our Thesis
                </h2>
                <GoldRule className="mt-3" />
                <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground leading-[1.75] mt-4">
                  We seek specific business characteristics that align with our value creation playbook and long-term partnership approach.
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {dealCharacteristics.map((item, i) => (
                  <GlassCard key={item.title} index={i} className="p-5 md:p-6 h-full">
                    <div className="flex items-start gap-3 h-full">
                      <div className="w-1 self-stretch bg-gold/20 group-hover:bg-gold/40 transition-all duration-500 rounded-full shrink-0" />
                      <div className="flex flex-col h-full">
                        <h4 className="font-serif text-[1rem] md:text-[1.1rem] text-foreground leading-[1.25] mb-2">{item.title}</h4>
                        <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground leading-[1.7] group-hover:text-foreground/75 transition-colors duration-300 flex-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Creation + Growth SVG */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <FadeIn>
                <SectionLabel light>Value Creation</SectionLabel>
                <h2 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] text-primary-foreground leading-[1.15] mb-3">
                  Our Path to Long-Term Value
                </h2>
                <GoldRule className="mb-5" />
              </FadeIn>
              <FadeIn delay={0.08}>
                <p className="font-sans text-[14px] md:text-[15px] text-primary-foreground/45 leading-[1.75] mb-5">
                  We build value through operational improvement, strategic investment in growth, and patient stewardship of businesses we believe in for the long term.
                </p>
              </FadeIn>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Stabilise & Professionalise', desc: 'Implement institutional-grade systems, reporting, and governance from day one.' },
                  { step: '02', title: 'Optimise Operations', desc: 'Drive margin improvement through operational excellence and best-practice deployment.' },
                  { step: '03', title: 'Invest in Growth', desc: 'Deploy capital into organic expansion, adjacent markets, and strategic acquisitions.' },
                  { step: '04', title: 'Compound Value', desc: 'Long-term hold periods allow compounding of operational improvements and market position.' },
                ].map((item, i) => (
                  <FadeIn key={item.step} delay={0.12 + i * 0.08}>
                    <div className="group flex items-start gap-4">
                      <span className="font-serif text-[1.1rem] text-gold/25 group-hover:text-gold/50 transition-colors duration-400 tabular-nums leading-none pt-1 shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="font-serif text-[0.95rem] md:text-[1.05rem] text-primary-foreground leading-[1.25] mb-1">{item.title}</h4>
                        <p className="font-sans text-[12px] md:text-[13px] text-primary-foreground/35 group-hover:text-primary-foreground/50 leading-[1.65] transition-colors duration-300">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
            <FadeIn delay={0.15}>
              <AnimatedAccent variant="growth" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Target Sectors — US only */}
      {!isIndia && (
        <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <div className="max-w-[1080px] mx-auto">
            <FadeIn>
              <SectionLabel>Target Sectors</SectionLabel>
              <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] text-foreground leading-[1.2] max-w-[480px] mb-2">
                Essential B2B Services Across the <span className="text-gold">United States</span>
              </h2>
              <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] max-w-[520px] mb-6 md:mb-8">
                We focus on sectors characterised by recurring revenue, regulatory requirements, and critical infrastructure dependency.
              </p>
              <GoldRule className="mb-6 md:mb-8" />
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {usSectors.map((sector, i) => (
                <GlassCard key={sector.label} index={i} className="p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5 opacity-60 group-hover:opacity-90 transition-opacity duration-300">{sector.icon}</span>
                    <div>
                      <h4 className="font-serif text-[1rem] md:text-[1.1rem] text-foreground leading-[1.3] mb-2">
                        {sector.label}
                      </h4>
                      <div className="w-5 h-px bg-gold/20 group-hover:bg-gold/40 group-hover:w-8 transition-all duration-500 mb-2" />
                      <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground leading-[1.7] group-hover:text-foreground/75 transition-colors duration-300">
                        {sector.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
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

export default InvestmentCriteria;
