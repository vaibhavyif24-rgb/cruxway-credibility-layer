import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';

const About = () => {
  const approach = [
    { t: 'Long-Term Alignment', d: 'We design hold periods around the growth opportunity — not around fund constraints or artificial timelines.' },
    { t: 'Essential Services', d: 'We focus on regulated, compliance-driven industries where trust and reliability create lasting competitive advantages.' },
    { t: 'Operational Partnership', d: 'We work closely with management teams — one platform at a time — to drive meaningful, sustainable outcomes.' },
    { t: 'Disciplined Capital', d: 'Leverage is an enabler, not a strategy. We allocate capital toward the highest-return uses with discipline.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-prussian text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-navy-deep/15 pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28">
          <FadeIn>
            <SectionLabel light>About</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.85rem,4.5vw,3.2rem)] text-primary-foreground max-w-[520px] leading-[1.12] tracking-[-0.025em]">
              Values-Driven Investing
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <GoldRule className="mt-7" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Mission */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>Mission</SectionLabel>
              <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground leading-[1.18]">
                Preserve What Founders Built.&nbsp;Scale What&nbsp;Matters.
              </h2>
              <GoldRule className="mt-5" />
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <FadeIn delay={0.08}>
              <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8]">
                Cruxway combines long-term capital with operating expertise to help owners transform their businesses into market leaders — while protecting the legacy and values that built them.
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
            <GoldRule className="mt-1 mb-10 md:mb-12" />
          </FadeIn>

          <div className="border-t border-foreground/[0.06]">
            {approach.map((a, i) => (
              <FadeIn key={a.t} delay={i * 0.04}>
                <div className="flex gap-5 md:gap-8 py-5 md:py-6 border-b border-foreground/[0.06] items-baseline">
                  <span className="font-serif text-[13px] text-foreground/[0.08] shrink-0 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-8 flex-1">
                    <h3 className="font-serif text-[1.05rem] text-foreground md:w-56 shrink-0">{a.t}</h3>
                    <p className="font-sans text-[13px] text-muted-foreground leading-[1.7]">{a.d}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Principles — compact grid */}
      <Section>
        <FadeIn>
          <SectionLabel>Principles</SectionLabel>
          <GoldRule className="mt-1 mb-10" />
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-7">
          {[
            { t: 'Integrity', d: 'Transparency and intellectual honesty in every interaction.' },
            { t: 'Servant Leadership', d: 'Earn trust through service, not authority.' },
            { t: 'Humility', d: 'Stay curious. Never stop learning.' },
            { t: 'Grit', d: 'Do hard things, especially when things get hard.' },
            { t: 'Bias to Action', d: 'Execute decisively. Speed matters.' },
            { t: 'The Golden Rule', d: 'Treat people with respect, fairness, and compassion.' },
          ].map((p, i) => (
            <FadeIn key={p.t} delay={i * 0.03}>
              <div className="pl-4 border-l border-foreground/[0.06]">
                <h3 className="font-serif text-[1rem] text-foreground mb-1.5">{p.t}</h3>
                <p className="font-sans text-[12.5px] text-muted-foreground leading-[1.65]">{p.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default About;
