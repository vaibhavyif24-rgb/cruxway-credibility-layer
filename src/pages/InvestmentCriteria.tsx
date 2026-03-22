import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion, useInView } from 'framer-motion';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import ApproachTable from '@/components/ApproachTable';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import AnimatedAccent from '@/components/AnimatedAccent';
import GlassCard from '@/components/GlassCard';
import { useRef } from 'react';

const usSectors = [
  { label: 'Electrical & Infrastructure', desc: 'High-voltage services, grid modernisation, and critical infrastructure maintenance' },
  { label: 'Environmental Services', desc: 'Compliance-driven remediation, waste management, and sustainability services' },
  { label: 'Facility Services', desc: 'Building maintenance, security, and specialised facility management' },
  { label: 'Engineering & Technical', desc: 'Inspection, testing, calibration, and specialised engineering solutions' },
  { label: 'Compliance & Safety', desc: 'Regulatory compliance, audit, and risk management services' },
  { label: 'Industrial Distribution', desc: 'Specialised parts, equipment, and supply chain solutions for essential industries' },
];

const investmentCriteria = [
  { t: 'Target Sectors', d: 'Essential B2B services in regulated, compliance-driven industries where reliability and deep client relationships define long-term value.' },
  { t: 'All Stages', d: 'We invest across all stages of a company\'s lifecycle, from founder-led transitions to mature businesses seeking growth.' },
  { t: 'Underserved Markets', d: 'We focus on overlooked segments of the lower middle market where institutional capital has been absent.' },
  { t: 'Ownership Transition', d: 'We partner with founders navigating succession, providing clean transitions that preserve the legacy they built.' },
  { t: 'Proven Persistency', d: 'Businesses with demonstrated customer retention, recurring revenue, and trust built over years of consistent delivery.' },
  { t: 'Cultural Fit', d: 'Alignment of values between Cruxway and management is non-negotiable. We invest in people as much as businesses.' },
  { t: 'Established Customer Trust', d: 'Companies with long-standing client relationships and high switching costs form our investment thesis foundation.' },
];

const InvestmentCriteria = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const approach = isIndia
    ? [
        { t: 'Low Market Focus', d: 'We target high-potential businesses in India\'s under-served lower middle market where operational improvement unlocks outsized returns.' },
        { t: 'Founder Alignment', d: 'We design partnerships around the founder\'s vision and growth timeline, not around fund constraints.' },
        { t: 'Operational Partnership', d: 'We work closely with management teams to drive meaningful, sustainable outcomes across Indian markets.' },
        { t: 'Disciplined Capital', d: 'Leverage is an enabler, not a strategy. We allocate capital toward the highest-return uses with discipline.' },
      ]
    : [
        { t: 'Long-Term Alignment', d: 'We design hold periods around the growth opportunity, not around fund constraints. Our capital is patient by design.' },
        { t: 'Essential Services', d: 'We focus on regulated, compliance-driven U.S. industries where trust and deep client relationships create lasting advantages.' },
        { t: 'Operational Partnership', d: 'We work closely with management teams to professionalise operations and drive sustainable growth.' },
        { t: 'Disciplined Capital', d: 'Leverage is an enabler, not a strategy. We protect downside and invest for long-term upside.' },
      ];

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden">
        <DarkSectionEffects variant="hero" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'Investment Criteria — India' : 'Investment Criteria'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] text-primary-foreground max-w-[600px] leading-[1.1] tracking-[-0.03em]">
              Investing Tailored to Each Company's Needs
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/45 leading-[1.75] mt-5 max-w-[480px]">
              {isIndia
                ? 'Long-term capital and operational expertise for India\'s most promising founder-led companies.'
                : 'Combining long-term capital with operating expertise to help business owners build lasting institutions.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Our Approach */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14">
            <div className="lg:col-span-5">
              <FadeIn>
                <SectionLabel>Our Approach</SectionLabel>
                <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-foreground leading-[1.15]">
                  How We Partner With Founders
                </h2>
                <GoldRule className="mt-3" />
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <FadeIn delay={0.08}>
                <p className="font-sans text-[15px] md:text-[16px] text-muted-foreground leading-[1.8]">
                  {isIndia
                    ? 'Cruxway invests in majority stakes in founder-led and family-owned businesses across India\'s lower middle market. We focus on sectors where operational improvement and deep client relationships define long-term value.'
                    : 'Cruxway invests in majority stakes in founder-led and family-owned businesses in critical B2B services across the United States. We focus on sectors where reliability, deep client relationships, and high barriers to entry define long-term value.'}
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Criteria — dark with glass cards */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <FadeIn>
            <SectionLabel light>What We Look For</SectionLabel>
            <h2 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] text-primary-foreground leading-[1.15] max-w-[480px] mb-2">
              Investment Criteria
            </h2>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>
          <ApproachTable items={investmentCriteria} variant="dark" />
        </div>
      </section>

      {/* Partnership — animated accent */}
      <section className="relative bg-background overflow-hidden">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <FadeIn>
              <AnimatedAccent variant="industry" />
            </FadeIn>
            <FadeIn delay={0.12}>
              <SectionLabel>Partnership Model</SectionLabel>
              <h2 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] text-foreground leading-[1.15] mb-4">
                Built for Owners Thinking Long-Term
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] text-muted-foreground leading-[1.8] mb-4">
                {isIndia
                  ? 'We believe the best businesses in India were not built to be sold on a five-year timeline. They were built by people who cared deeply about their employees, customers, and communities.'
                  : 'We believe the best businesses in America were not built to be sold on a five-year timeline. They were built by people who cared deeply about their employees, customers, and communities.'}
              </p>
              <p className="font-sans text-[15px] md:text-[16px] text-muted-foreground leading-[1.8]">
                Our role is to honour that legacy while bringing the resources, systems, and capital to take these companies to the next level.
              </p>
              <GoldRule className="mt-5" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Target Sectors — US only, bento glass cards */}
      {!isIndia && (
        <section className="bg-cream px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <div className="max-w-[1080px] mx-auto">
            <FadeIn>
              <SectionLabel>Target Sectors</SectionLabel>
              <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] text-foreground leading-[1.2] max-w-[480px] mb-2">
                Essential B2B services across the United States
              </h2>
              <GoldRule className="mb-6 md:mb-8" />
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {usSectors.map((sector, i) => (
                <GlassCard key={sector.label} index={i} className="p-5 md:p-6">
                  <h4 className="font-serif text-[1rem] md:text-[1.1rem] text-foreground leading-[1.3] mb-2">
                    {sector.label}
                  </h4>
                  <div className="w-5 h-px bg-gold/20 group-hover:bg-gold/40 group-hover:w-8 transition-all duration-500 mb-2" />
                  <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground leading-[1.7] group-hover:text-foreground/75 transition-colors duration-300">
                    {sector.desc}
                  </p>
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
              <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/45 leading-[1.8] mb-6">
                {isIndia
                  ? 'If you\'re building a business meant to last in India, we\'d welcome a conversation about partnership.'
                  : 'If you\'re a founder or business owner considering your next chapter, we\'d welcome the conversation.'}
              </p>
              <Link
                to={`/${region}/contact`}
                className="btn-premium inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-8 py-3.5 border border-primary-foreground/[0.1] text-primary-foreground/45 hover:border-gold/30 hover:text-primary-foreground/70 transition-all duration-300"
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
