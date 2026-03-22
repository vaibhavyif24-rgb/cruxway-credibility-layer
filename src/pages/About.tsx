import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import ApproachTable from '@/components/ApproachTable';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import GlassCard from '@/components/GlassCard';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const usSectors = [
  { label: 'Electrical & Infrastructure', desc: 'High-voltage services, grid modernisation, and critical infrastructure maintenance' },
  { label: 'Environmental Services', desc: 'Compliance-driven remediation, waste management, and sustainability services' },
  { label: 'Facility Services', desc: 'Building maintenance, security, and specialised facility management' },
  { label: 'Engineering & Technical', desc: 'Inspection, testing, calibration, and specialised engineering solutions' },
  { label: 'Compliance & Safety', desc: 'Regulatory compliance, audit, and risk management services' },
  { label: 'Industrial Distribution', desc: 'Specialised parts, equipment, and supply chain solutions for essential industries' },
];

const About = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const approach = isIndia
    ? [
        { t: 'Low Market Focus', d: 'We target high-potential businesses in India\'s under-served lower middle market where operational improvement unlocks outsized returns.' },
        { t: 'Founder Alignment', d: 'We design partnerships around the founder\'s vision, not around fund constraints or artificial exit windows.' },
        { t: 'Operational Partnership', d: 'We work closely with management teams to drive meaningful, sustainable outcomes across Indian markets.' },
        { t: 'Disciplined Capital', d: 'Leverage is an enabler, not a strategy. We allocate capital toward the highest-return uses.' },
      ]
    : [
        { t: 'Long-Term Alignment', d: 'We design hold periods around the growth opportunity, not around fund constraints. Our capital is patient by design.' },
        { t: 'Essential Services', d: 'We focus on regulated, compliance-driven U.S. industries where trust and deep client relationships create lasting advantages.' },
        { t: 'Operational Partnership', d: 'We work closely with management teams to professionalise operations and drive sustainable growth.' },
        { t: 'Disciplined Capital', d: 'Leverage is an enabler, not a strategy. We protect downside and invest for long-term upside.' },
      ];

  const principles = [
    { t: 'Integrity', d: 'Transparency and intellectual honesty in every interaction.' },
    { t: 'Servant Leadership', d: 'Earn trust through service, not authority.' },
    { t: 'Humility', d: 'Stay curious. Never stop learning.' },
    { t: 'Grit', d: 'Do hard things, especially when things get hard.' },
    { t: 'Bias to Action', d: 'Execute decisively. Speed matters.' },
    { t: 'The Golden Rule', d: 'Treat people with respect, fairness, and compassion.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden">
        <DarkSectionEffects variant="hero" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'About — India' : 'About'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] text-primary-foreground max-w-[540px] leading-[1.1] tracking-[-0.03em]">
              {isIndia ? 'Building Enduring Value Across India' : 'Values-Driven Investing'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/45 leading-[1.75] mt-5 max-w-[460px]">
              {isIndia
                ? 'Long-term capital and operational expertise for India\'s most promising founder-led companies.'
                : 'Combining long-term capital with operating expertise to help business owners build lasting institutions in essential B2B services.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Mission */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14">
            <div className="lg:col-span-4">
              <FadeIn>
                <SectionLabel>Mission</SectionLabel>
                <h2 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] text-foreground leading-[1.15]">
                  {isIndia
                    ? 'Scale What India Builds. Preserve What Founders Value.'
                    : 'Preserve What Founders Built.\u00a0Scale What\u00a0Matters.'}
                </h2>
                <GoldRule className="mt-3" />
              </FadeIn>
            </div>
            <div className="lg:col-span-8">
              <FadeIn delay={0.08}>
                <p className="font-sans text-[15px] md:text-[16px] text-muted-foreground leading-[1.8] mb-4">
                  {isIndia
                    ? 'Cruxway combines long-term capital with deep operational expertise to help Indian founders transform their businesses into market leaders, while protecting the legacy and values that built them.'
                    : 'Cruxway invests in majority stakes in founder-led businesses across the United States, combining long-term capital with operating expertise to help owners transform their companies into market leaders in essential B2B services.'}
                </p>
                {!isIndia && (
                  <p className="font-sans text-[15px] md:text-[16px] text-muted-foreground leading-[1.8]">
                    We believe the best businesses in America were not built to be sold on a five-year timeline. Our role is to honour that legacy while bringing the resources, systems, and capital to take these companies to the next level.
                  </p>
                )}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach — dark */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <FadeIn>
            <SectionLabel light>Our Approach</SectionLabel>
            <h2 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] text-primary-foreground leading-[1.15] max-w-[480px] mb-2">
              How We Partner With Founders
            </h2>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>
          <ApproachTable items={approach} variant="dark" />
        </div>
      </section>

      {/* Target Sectors — US only, glass cards */}
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

      {/* Principles */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14">
            <div className="lg:col-span-4">
              <FadeIn>
                <SectionLabel>Principles</SectionLabel>
                <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] text-foreground leading-[1.2]">
                  What Guides Us
                </h2>
                <GoldRule className="mt-3" />
              </FadeIn>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {principles.map((p, i) => (
                  <FadeIn key={p.t} delay={i * 0.06}>
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="group"
                    >
                      <h3 className="font-serif text-[1rem] md:text-[1.05rem] text-foreground mb-1.5 leading-[1.2]">{p.t}</h3>
                      <div className="w-4 h-px bg-gold/20 group-hover:bg-gold/45 group-hover:w-7 transition-all duration-400 mb-2" />
                      <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground leading-[1.7] group-hover:text-foreground/75 transition-colors duration-300">{p.d}</p>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <DarkSectionEffects variant="cta" />
        <div className="relative max-w-[1080px] mx-auto">
          <div className="max-w-[540px]">
            <FadeIn>
              <SectionLabel light>Connect</SectionLabel>
              <h2 className="font-serif text-[clamp(1.4rem,3vw,2.2rem)] text-primary-foreground leading-[1.15] mb-4">
                {isIndia ? 'Partner With Us in India' : 'Built for Owners Thinking Long-Term'}
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
                Start a Conversation
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
