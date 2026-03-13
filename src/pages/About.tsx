import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion, useInView } from 'framer-motion';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import ApproachTable from '@/components/ApproachTable';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import { useRef } from 'react';

const usSectors = [
  { label: 'Electrical & Infrastructure', desc: 'High-voltage services, grid modernisation, and critical infrastructure maintenance' },
  { label: 'Environmental Services', desc: 'Compliance-driven remediation, waste management, and sustainability services' },
  { label: 'Facility Services', desc: 'Building maintenance, security, and specialised facility management' },
  { label: 'Engineering & Technical', desc: 'Inspection, testing, calibration, and specialised engineering solutions' },
  { label: 'Compliance & Safety', desc: 'Regulatory compliance, audit, and risk management services' },
  { label: 'Industrial Distribution', desc: 'Specialised parts, equipment, and supply chain solutions for essential industries' },
];

/* ── Premium Sector Card ── */
const SectorCard = ({ sector, index }: { sector: { label: string; desc: string }; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full p-4 md:p-5 rounded-[3px] border border-foreground/[0.06] bg-background hover:border-gold/25 hover:shadow-[0_6px_24px_-8px_hsl(var(--gold)/0.08)] transition-all duration-400"
      >
        {/* Top accent */}
        <div className="absolute top-0 left-4 md:left-5 right-4 md:right-5 h-px overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold/25 via-gold/40 to-gold/25"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: index * 0.08 + 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
          />
        </div>

        <h4 className="font-serif text-[0.92rem] md:text-[1rem] text-foreground leading-[1.25] mb-1.5">
          {sector.label}
        </h4>
        <p className="font-sans text-[11.5px] md:text-[12px] text-muted-foreground/60 leading-[1.65] group-hover:text-muted-foreground/85 transition-colors duration-300">
          {sector.desc}
        </p>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const approach = isIndia
    ? [
        { t: 'Low Market Focus', d: 'We target high-potential businesses in India\'s under-served lower middle market where operational improvement unlocks outsized returns.' },
        { t: 'Founder Alignment', d: 'We design partnerships around the founder\'s vision and growth timeline, not around fund constraints or artificial exit windows.' },
        { t: 'Operational Partnership', d: 'We work closely with management teams, one platform at a time, to drive meaningful, sustainable outcomes across Indian markets.' },
        { t: 'Disciplined Capital', d: 'Leverage is an enabler, not a strategy. We allocate capital toward the highest-return uses with discipline.' },
      ]
    : [
        { t: 'Long-Term Alignment', d: 'We design hold periods around the growth opportunity, not around fund constraints or artificial timelines. Our capital is patient by design.' },
        { t: 'Essential Services', d: 'We focus on regulated, compliance-driven U.S. industries where trust, reliability, and deep client relationships create lasting competitive advantages.' },
        { t: 'Operational Partnership', d: 'We work closely with management teams, one platform at a time, to professionalise operations, expand capabilities, and drive sustainable growth.' },
        { t: 'Disciplined Capital', d: 'Leverage is an enabler, not a strategy. We protect downside, invest for long-term upside, and never over-lever a business to meet return targets.' },
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
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-24 pb-10 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'About — India' : 'About'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.85rem,4.5vw,3.2rem)] text-primary-foreground max-w-[520px] leading-[1.12] tracking-[-0.025em]">
              {isIndia ? 'Building Enduring Value Across India' : 'Values-Driven Investing'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[12.5px] md:text-[13px] text-primary-foreground/30 leading-[1.7] md:leading-[1.75] mt-3 md:mt-4 max-w-[420px]">
              {isIndia
                ? 'Long-term capital and operational expertise for India\'s most promising founder-led companies in manufacturing, industrial services, and essential sectors.'
                : 'Combining long-term capital with operating expertise to help business owners across the United States build lasting institutions in essential B2B services.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-6" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Mission */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-4 md:gap-6 lg:gap-16">
            <div className="lg:col-span-5">
              <FadeIn>
                <SectionLabel>Mission</SectionLabel>
                <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground leading-[1.18]">
                  {isIndia
                    ? 'Scale What India Builds. Preserve What Founders Value.'
                    : 'Preserve What Founders Built.\u00a0Scale What\u00a0Matters.'}
                </h2>
                <GoldRule className="mt-3 md:mt-5" />
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <FadeIn delay={0.08}>
                <p className="font-sans text-[13px] md:text-[13.5px] text-muted-foreground leading-[1.75] md:leading-[1.8] mb-3 md:mb-4">
                  {isIndia
                    ? 'Cruxway combines long-term capital with deep operational expertise to help Indian founders transform their businesses into market leaders across manufacturing, industrial services, and essential sectors, while protecting the legacy, culture, and values that built them.'
                    : 'Cruxway acquires majority stakes in founder-led businesses across the United States, combining long-term capital with operating expertise to help owners transform their companies into market leaders in regulated, compliance-driven industries, while protecting the legacy and values that built them.'}
                </p>
                {!isIndia && (
                  <p className="font-sans text-[13px] md:text-[13.5px] text-muted-foreground leading-[1.75] md:leading-[1.8]">
                    We believe the best businesses in America were not built to be sold on a five-year timeline. They were built by people who cared deeply about their employees, their customers, and the communities they serve. Our role is to honour that legacy while bringing the resources, systems, and capital to take these companies to the next level.
                  </p>
                )}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16">
          <FadeIn>
            <SectionLabel light>Our Approach</SectionLabel>
            <h2 className="font-serif text-[clamp(1.2rem,2.5vw,1.85rem)] text-primary-foreground leading-[1.18] max-w-[480px] mb-1.5">
              How We Partner With Founders
            </h2>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>

          <ApproachTable items={approach} variant="dark" />
        </div>
      </section>

      {/* Target Sectors — US only */}
      {!isIndia && (
        <section className="bg-cream px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16">
          <div className="max-w-[1080px] mx-auto">
            <FadeIn>
              <SectionLabel>Target Sectors</SectionLabel>
              <h2 className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] text-foreground leading-[1.2] max-w-[480px] mb-2">
                Essential B2B services across the United States
              </h2>
              <GoldRule className="mt-3 md:mt-4 mb-4 md:mb-7" />
            </FadeIn>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {usSectors.map((sector, i) => (
                <SectorCard key={sector.label} sector={sector} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Principles */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Principles</SectionLabel>
            <GoldRule className="mt-1 mb-4 md:mb-7" />
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-10 gap-y-4 md:gap-y-6">
            {principles.map((p, i) => (
              <FadeIn key={p.t} delay={i * 0.03}>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="pl-3 md:pl-4 border-l border-foreground/[0.06] hover:border-gold/25 transition-colors duration-300 group"
                >
                  <h3 className="font-serif text-[0.9rem] md:text-[1rem] text-foreground mb-1">{p.t}</h3>
                  <p className="font-sans text-[11.5px] md:text-[12.5px] text-muted-foreground leading-[1.65]">{p.d}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden px-5 md:px-10 lg:px-16 py-8 md:py-10 lg:py-14">
        <DarkSectionEffects variant="cta" />
        <div className="relative max-w-[1080px] mx-auto">
          <div className="max-w-[480px]">
            <FadeIn>
              <SectionLabel light>Connect</SectionLabel>
              <h2 className="font-serif text-[clamp(1.2rem,2.5vw,1.85rem)] text-primary-foreground leading-[1.18] mb-3 md:mb-4">
                {isIndia ? 'Partner With Us in India' : 'Built for Owners Thinking Long-Term'}
              </h2>
              <p className="font-sans text-[12.5px] md:text-[13px] text-primary-foreground/30 leading-[1.75] md:leading-[1.8] mb-5 md:mb-6">
                {isIndia
                  ? 'If you\'re building a business meant to last in India, we\'d welcome a conversation about partnership.'
                  : 'If you\'re a founder or business owner considering your next chapter, we\'d welcome the conversation. No pressure, no timeline, just an honest discussion about what a long-term partnership could look like.'}
              </p>
              <Link
                to={`/${region}/contact`}
                className="btn-premium inline-block font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] px-7 py-3 border border-primary-foreground/[0.08] text-primary-foreground/35 hover:border-gold/25 hover:text-primary-foreground/65 transition-all duration-300"
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
