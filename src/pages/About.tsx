import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion, useInView } from 'framer-motion';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import ApproachTable from '@/components/ApproachTable';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import { useRef } from 'react';

const processStepsUS = [
  { num: '01', title: 'Identify', description: 'We source founder-led and family-owned businesses across the U.S. in essential B2B sectors with durable competitive advantages and strong client relationships.' },
  { num: '02', title: 'Evaluate', description: 'Rigorous due diligence across financials, operations, and culture to ensure alignment between the business, its people, and our long-term vision.' },
  { num: '03', title: 'Acquire', description: 'We acquire majority stakes through structured transactions designed to preserve continuity for employees, clients, and stakeholders while providing founders a clean transition.' },
  { num: '04', title: 'Build', description: 'Hands-on operational partnership to accelerate growth, professionalise systems, and unlock value without disrupting what already works.' },
];

const processStepsIndia = [
  { num: '01', title: 'Identify', description: 'We source founder-led and family-owned businesses across India\'s lower middle market with strong fundamentals and operational upside.' },
  { num: '02', title: 'Evaluate', description: 'Rigorous due diligence across financials, operations, and culture to ensure alignment between the business, its people, and our long-term vision.' },
  { num: '03', title: 'Acquire', description: 'We acquire majority stakes through structured transactions designed to preserve continuity for employees, clients, and stakeholders while providing founders a clean transition.' },
  { num: '04', title: 'Build', description: 'Hands-on operational partnership to professionalise systems, strengthen governance, and accelerate growth across Indian markets.' },
];

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
      <section className="bg-background px-5 md:px-10 lg:px-16 py-9 md:py-14 lg:py-20">
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

      {/* Our Process — moved from Home for a clean separation of concerns */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-18 lg:py-24">
          <FadeIn>
            <SectionLabel light>Our Process</SectionLabel>
            <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-primary-foreground leading-[1.18] max-w-[480px] mb-1.5">
              From Discovery to Partnership
            </h2>
            <GoldRule className="mb-6 md:mb-10 lg:mb-14" />
          </FadeIn>

          {/* Premium vertical timeline */}
          <div className="relative">
            <div className="absolute left-[15px] md:left-[18px] lg:left-0 top-0 bottom-0 lg:top-[22px] lg:bottom-auto lg:right-0 lg:h-px w-px lg:w-full bg-primary-foreground/[0.06]" />

            <div className="space-y-0 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-0">
              {(isIndia ? processStepsIndia : processStepsUS).map((step, i) => (
                <FadeIn key={step.num} delay={i * 0.12}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="group relative pl-10 md:pl-12 lg:pl-0 lg:pr-6 py-5 md:py-6 lg:py-0"
                  >
                    {/* Timeline node */}
                    <div className="absolute left-0 lg:left-auto lg:relative lg:mb-5">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.12 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                      >
                        <div className="w-[30px] h-[30px] md:w-[36px] md:h-[36px] rounded-full border border-gold/20 group-hover:border-gold/40 transition-colors duration-500 flex items-center justify-center bg-primary/80 backdrop-blur-sm">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.12 + 0.4 }}
                            className="w-[6px] h-[6px] md:w-[8px] md:h-[8px] rounded-full bg-gold/40 group-hover:bg-gold/70 transition-colors duration-300"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-gold/0 group-hover:bg-gold/[0.06] blur-[8px] transition-all duration-500" />
                      </motion.div>
                    </div>

                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.12 + 0.3 }}
                      className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-gold/25 group-hover:text-gold/45 transition-colors duration-500 block mb-2"
                    >
                      Step {step.num}
                    </motion.span>

                    <h3 className="font-serif text-[1.05rem] md:text-[1.15rem] text-primary-foreground tracking-[-0.01em] mb-1.5 group-hover:text-primary-foreground transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="font-sans text-[11.5px] md:text-[12px] text-primary-foreground/25 group-hover:text-primary-foreground/40 leading-[1.7] transition-colors duration-300">
                      {step.description}
                    </p>

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 32 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.12 + 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-px bg-gold/15 mt-4 lg:mt-5"
                    />
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach — cream/light themed to match brand palette */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-10 md:py-18 lg:py-24">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="font-serif text-[clamp(1.2rem,2.5vw,1.85rem)] text-foreground leading-[1.18] max-w-[480px] mb-1.5">
              How We Partner With Founders
            </h2>
            <GoldRule className="mb-6 md:mb-10" />
          </FadeIn>

          <ApproachTable items={approach} variant="light" />
        </div>
      </section>

      {/* Principles */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-9 md:py-14 lg:py-20">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Principles</SectionLabel>
            <GoldRule className="mt-1 mb-5 md:mb-9" />
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
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16">
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
