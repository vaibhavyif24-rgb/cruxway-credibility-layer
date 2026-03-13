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
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/20 pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[300px] bg-gold/[0.02] rounded-full blur-[100px] pointer-events-none" />
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
                <GoldRule className="mt-5" />
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <FadeIn delay={0.08}>
              <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8] mb-4">
                  {isIndia
                    ? 'Cruxway combines long-term capital with deep operational expertise to help Indian founders transform their businesses into market leaders across manufacturing, industrial services, and essential sectors, while protecting the legacy, culture, and values that built them.'
                    : 'Cruxway acquires majority stakes in founder-led businesses across the United States, combining long-term capital with operating expertise to help owners transform their companies into market leaders in regulated, compliance-driven industries, while protecting the legacy and values that built them.'}
                </p>
                {!isIndia && (
                  <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8]">
                    We believe the best businesses in America were not built to be sold on a five-year timeline. They were built by people who cared deeply about their employees, their customers, and the communities they serve. Our role is to honour that legacy while bringing the resources, systems, and capital to take these companies to the next level.
                  </p>
                )}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* US: Why Essential Services / India: Market Context */}
      {!isIndia ? (
        <section className="relative bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-prussian-mid/20 via-transparent to-navy-deep/30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[350px] h-[250px] bg-gold/[0.01] rounded-full blur-[100px] pointer-events-none" />
          <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-14 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-5">
                <FadeIn>
                  <SectionLabel light>Our Focus</SectionLabel>
                  <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.85rem)] text-primary-foreground leading-[1.18]">
                    Why Essential B2B Services in the United States
                  </h2>
                  <GoldRule className="mt-5" />
                </FadeIn>
              </div>
              <div className="lg:col-span-7">
                <FadeIn delay={0.08}>
                  <p className="font-sans text-[13.5px] text-primary-foreground/40 leading-[1.8] mb-4">
                    Essential B2B services represent the backbone of the American economy: companies that maintain critical infrastructure, ensure environmental and regulatory compliance, and provide specialised technical expertise that cannot be easily replicated or outsourced.
                  </p>
                  <p className="font-sans text-[13.5px] text-primary-foreground/40 leading-[1.8] mb-4">
                    These businesses share characteristics we find compelling: recurring revenue driven by regulatory mandates, high switching costs built on trust and performance, and resilience across economic cycles. Many are led by founders approaching retirement without a succession plan, creating a significant opportunity for a partner who can preserve what works while investing in growth.
                  </p>
                  <p className="font-sans text-[13.5px] text-primary-foreground/40 leading-[1.8]">
                    We deliberately focus on sectors too small for large private equity and too complex for unsophisticated buyers, where our operating expertise and patient capital create the most value.
                  </p>
                </FadeIn>
                <FadeIn delay={0.16}>
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-primary-foreground/[0.06]">
                    {[
                      { val: '$7-75M', lbl: 'Revenue Range' },
                      { val: '90%+', lbl: 'Revenue Retention' },
                      { val: '20+ Yrs', lbl: 'Avg. Company Age' },
                    ].map((s, i) => (
                      <motion.div
                        key={s.lbl}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center"
                      >
                        <p className="font-serif text-[clamp(1.1rem,2vw,1.5rem)] text-primary-foreground tracking-[-0.02em]">{s.val}</p>
                        <p className="font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-primary-foreground/25 mt-1">{s.lbl}</p>
                      </motion.div>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-prussian-mid/20 via-transparent to-navy-deep/30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[350px] h-[250px] bg-gold/[0.01] rounded-full blur-[100px] pointer-events-none" />
          <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-14 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-5">
                <FadeIn>
                  <SectionLabel light>The India Opportunity</SectionLabel>
                  <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.85rem)] text-primary-foreground leading-[1.18]">
                    A Generational Gap in India's Lower Middle Market
                  </h2>
                  <GoldRule className="mt-5" />
                </FadeIn>
              </div>
              <div className="lg:col-span-7">
                <FadeIn delay={0.08}>
                  <p className="font-sans text-[13.5px] text-primary-foreground/40 leading-[1.8] mb-4">
                    India is home to over 63 million MSMEs, yet less than 1% have access to institutional capital or structured operational expertise. Many of these businesses have thrived for decades through resilience, deep customer relationships, and founder-driven leadership.
                  </p>
                  <p className="font-sans text-[13.5px] text-primary-foreground/40 leading-[1.8]">
                    As India's economy accelerates toward $5 trillion, a new generation of these companies is ready for a partner who brings discipline, governance, and growth capital, without disrupting the culture and values that built them. This is the gap Cruxway was created to fill.
                  </p>
                </FadeIn>
                <FadeIn delay={0.16}>
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-primary-foreground/[0.06]">
                    {[
                      { val: '63M+', lbl: 'MSMEs in India' },
                      { val: '<1%', lbl: 'Institutionally Backed' },
                      { val: '$5T', lbl: 'Economy by 2028' },
                    ].map((s, i) => (
                      <motion.div
                        key={s.lbl}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center"
                      >
                        <p className="font-serif text-[clamp(1.1rem,2vw,1.5rem)] text-primary-foreground tracking-[-0.02em]">{s.val}</p>
                        <p className="font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-primary-foreground/25 mt-1">{s.lbl}</p>
                      </motion.div>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      )}

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
      <section className="bg-background px-5 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Principles</SectionLabel>
            <GoldRule className="mt-1 mb-7 md:mb-9" />
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-5 md:gap-y-6">
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
      <section className="hero-gradient-animated text-primary-foreground px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="max-w-[480px]">
            <FadeIn>
              <SectionLabel light>Connect</SectionLabel>
              <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.85rem)] text-primary-foreground leading-[1.18] mb-4">
                {isIndia ? 'Partner With Us in India' : 'Built for Owners Thinking Long-Term'}
              </h2>
              <p className="font-sans text-[13px] text-primary-foreground/30 leading-[1.8] mb-6">
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
