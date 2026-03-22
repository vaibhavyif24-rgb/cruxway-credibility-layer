import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import ApproachTable from '@/components/ApproachTable';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import AnimatedAccent from '@/components/AnimatedAccent';
import GlassCard from '@/components/GlassCard';
import CinematicHero from '@/components/CinematicHero';

import heroIndiaCriteria from '@/assets/hero-india-criteria.jpg';
import heroUSCriteria from '@/assets/hero-us-criteria.jpg';

const usSectors = [
  { label: 'Electrical & Infrastructure', desc: 'High-voltage services, grid modernisation, and critical infrastructure maintenance' },
  { label: 'Environmental Services', desc: 'Compliance-driven remediation, waste management, and sustainability services' },
  { label: 'Facility Services', desc: 'Building maintenance, security, and specialised facility management' },
  { label: 'Engineering & Technical', desc: 'Inspection, testing, calibration, and specialised engineering solutions' },
  { label: 'Compliance & Safety', desc: 'Regulatory compliance, audit, and risk management services' },
  { label: 'Industrial Distribution', desc: 'Specialised parts, equipment, and supply chain solutions for essential industries' },
];

const investmentCriteria = [
  { t: 'Target Sectors', d: 'Essential B2B services in regulated, compliance-driven industries with deep client relationships.' },
  { t: 'All Stages', d: 'From founder-led transitions to mature businesses seeking operational improvement and growth.' },
  { t: 'Underserved Markets', d: 'Overlooked segments of the lower middle market where institutional capital has been absent.' },
  { t: 'Ownership Transition', d: 'Clean transitions that preserve the legacy founders built over decades.' },
  { t: 'Proven Persistency', d: 'Demonstrated customer retention, recurring revenue, and trust built over years.' },
  { t: 'Cultural Fit', d: 'Alignment of values is non-negotiable. We invest in people as much as businesses.' },
  { t: 'Customer Trust', d: 'Long-standing client relationships with high switching costs form our thesis foundation.' },
];

const InvestmentCriteria = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const approach = isIndia
    ? [
        { t: 'Low Market Focus', d: 'High-potential businesses where operational improvement unlocks outsized returns.' },
        { t: 'Founder Alignment', d: 'Partnerships around the founder\'s vision, not fund constraints.' },
        { t: 'Operational Partnership', d: 'Driving meaningful, sustainable outcomes across Indian markets.' },
        { t: 'Disciplined Capital', d: 'Capital allocated toward highest-return uses with discipline.' },
      ]
    : [
        { t: 'Long-Term Alignment', d: 'Hold periods designed around the growth opportunity. Our capital is patient by design.' },
        { t: 'Essential Services', d: 'Regulated industries where trust and deep relationships create lasting advantages.' },
        { t: 'Operational Partnership', d: 'Professionalising operations and driving sustainable growth alongside management.' },
        { t: 'Disciplined Capital', d: 'Protecting downside and investing for long-term upside.' },
      ];

  return (
    <div>
      {/* Hero — distinct region-specific cinematic photo */}
      <section className="relative text-primary-foreground overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end">
        <CinematicHero imageSrc={isIndia ? heroIndiaCriteria : heroUSCriteria} overlay="strong" />
        <DarkSectionEffects variant="hero" />
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'Investment Criteria — India' : 'Investment Criteria'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] text-white max-w-[600px] leading-[1.1] tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              Investing Tailored to Each Company's Needs
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[15px] md:text-[16px] text-white/55 leading-[1.75] mt-5 max-w-[480px]">
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
                  <GlassCard key={item.t} index={i} className="p-4 md:p-5" hover={false}>
                    <h4 className="font-serif text-[0.95rem] md:text-[1.05rem] text-foreground leading-[1.25] mb-1.5">{item.t}</h4>
                    <p className="font-sans text-[12px] md:text-[13px] text-muted-foreground leading-[1.65]">{item.d}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
            <FadeIn delay={0.12}>
              <AnimatedAccent variant="industry" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Investment Criteria — dark */}
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

      {/* Target Sectors — US only */}
      {!isIndia && (
        <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
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
