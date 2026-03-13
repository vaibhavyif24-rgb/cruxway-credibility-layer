import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import ApproachTable from '@/components/ApproachTable';

const About = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const approach = isIndia
    ? [
        { t: 'Low Market Focus', d: 'We target high-potential businesses in India\'s under-served lower middle market where operational improvement unlocks outsized returns.' },
        { t: 'Founder Alignment', d: 'We design partnerships around the founder\'s vision and growth timeline, not around fund constraints or artificial exit windows.' },
        { t: 'Operational Partnership', d: 'We work closely with management teams, one platform at a time, to drive meaningful, sustainable outcomes.' },
        { t: 'Disciplined Capital', d: 'Leverage is an enabler, not a strategy. We allocate capital toward the highest-return uses with discipline.' },
      ]
    : [
        { t: 'Long-Term Alignment', d: 'We design hold periods around the American growth opportunity, not around fund constraints or artificial timelines.' },
        { t: 'Essential Services', d: 'We focus on regulated, compliance-driven U.S. industries where trust and reliability create lasting competitive advantages.' },
        { t: 'Operational Partnership', d: 'We work closely with American management teams, one platform at a time, to drive meaningful, sustainable outcomes.' },
        { t: 'Disciplined Capital', d: 'Leverage is an enabler, not a strategy. We allocate capital toward the highest-return uses with discipline.' },
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
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/20 pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[300px] bg-gold/[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-14 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'About — India' : 'About — United States'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.85rem,4.5vw,3.2rem)] text-primary-foreground max-w-[520px] leading-[1.12] tracking-[-0.025em]">
              {isIndia ? 'Building Enduring Value Across India' : 'Values-Driven Investing in America'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[13px] text-primary-foreground/30 leading-[1.75] mt-4 max-w-[420px]">
              {isIndia
                ? 'Long-term capital and operational expertise for India\'s most promising founder-led companies in manufacturing, industrial services, and essential sectors.'
                : 'Combining long-term capital with operating expertise to help American business owners build lasting institutions in essential B2B services.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-6" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Mission */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>Mission</SectionLabel>
              <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground leading-[1.18]">
                {isIndia
                  ? 'Scale What India Builds. Preserve What Founders Value.'
                  : 'Preserve What American Founders Built.\u00a0Scale What\u00a0Matters.'}
              </h2>
              <GoldRule className="mt-5" />
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <FadeIn delay={0.08}>
              <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8]">
                {isIndia
                  ? 'Cruxway combines long-term capital with deep operational expertise to help Indian founders transform their businesses into market leaders across manufacturing, industrial services, and essential sectors, while protecting the legacy, culture, and values that built them.'
                  : 'Cruxway combines long-term capital with operating expertise to help American business owners transform their companies into market leaders in regulated, compliance-driven industries, while protecting the legacy and values that built them.'}
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Approach */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-14 md:py-20 lg:py-24">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Approach</SectionLabel>
            <GoldRule className="mt-1 mb-8 md:mb-12" />
          </FadeIn>

          <ApproachTable items={approach} />
        </div>
      </section>

      {/* Principles */}
      <Section>
        <FadeIn>
          <SectionLabel>Principles</SectionLabel>
          <GoldRule className="mt-1 mb-8 md:mb-10" />
        </FadeIn>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-6 md:gap-y-7">
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
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="max-w-[480px]">
          <FadeIn>
            <SectionLabel light>Connect</SectionLabel>
            <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.85rem)] text-primary-foreground leading-[1.18] mb-4">
              {isIndia ? 'Partner With Us in India' : 'Built for Owners Thinking Long-Term'}
            </h2>
            <p className="font-sans text-[13px] text-primary-foreground/30 leading-[1.8] mb-7">
              {isIndia
                ? 'If you\'re building a business meant to last in India, we\'d welcome a conversation about partnership.'
                : 'If you\'re building a business meant to last, we\'d welcome a conversation about how we can partner together.'}
            </p>
            <Link
              to={`/${region}/contact`}
              className="btn-premium inline-block font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] px-7 py-3 border border-primary-foreground/[0.08] text-primary-foreground/35 hover:border-gold/25 hover:text-primary-foreground/65 transition-all duration-300"
            >
              Start a Conversation
            </Link>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
};

export default About;
