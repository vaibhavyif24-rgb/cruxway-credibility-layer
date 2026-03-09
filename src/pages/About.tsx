import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';

const About = () => {
  const principles = [
    { title: 'Integrity & Intellectual Honesty', desc: 'Transparency and truthfulness in every interaction.' },
    { title: 'Servant Leadership', desc: 'Lead by example and lift others. Earn trust through service, not authority.' },
    { title: 'The Golden Rule', desc: "Treat people how you'd want to be treated — with respect, fairness, and compassion." },
    { title: 'Humility & Growth Mindset', desc: 'Stay curious, stay humble, and never stop learning.' },
    { title: 'Grit & Perseverance', desc: 'Do hard things, especially when things get hard. Fortune favors fortitude.' },
    { title: 'Bias to Action', desc: 'Act decisively — pursue perfection in speed and execution, not only planning.' },
  ];

  const approach = [
    { title: 'Long-Term Alignment', desc: 'Hold periods designed around thesis and growth runway. At each stage, we ask whether we are the right stewards and whether marginal returns justify the cost of capital.' },
    { title: 'Regulated & Technical Services', desc: 'We deliberately focus on stable, defensive industries — sectors where compliance, safety, and reliability are paramount.' },
    { title: 'Selective & Focused', desc: 'We only pursue one or two platforms at a time. This allows us to stay deeply involved, hands-on, and operationally supportive alongside management.' },
    { title: 'Trusted Network for Execution', desc: 'We bring an established bench of advisors and operators who help us execute with speed, rigor, and real-world expertise.' },
    { title: 'Prudent Use of Leverage', desc: 'We view leverage as an enabler, not a strategy. Our focus is on creating long-term value through business building and disciplined growth.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-prussian text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-navy-deep/15 pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-24 pb-14 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24">
          <FadeIn><SectionLabel light>About Cruxway</SectionLabel></FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3rem)] text-primary-foreground max-w-[580px] leading-[1.12] tracking-[-0.025em]">
              Values First — Integrity, Partnership, and&nbsp;Stewardship
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}><GoldRule className="mt-6 mb-5" /></FadeIn>
          <FadeIn delay={0.22}>
            <p className="font-sans text-[14px] text-primary-foreground/30 max-w-[460px] leading-[1.75]">
              Founded in 2025 by Harin Gupta and Benson Zhang, Cruxway exists to partner with exceptional companies and preserve what makes them special while helping them scale.
            </p>
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Mission */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <FadeIn>
              <SectionLabel>Our Mission</SectionLabel>
              <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground leading-[1.15]">
                Transforming Life's Work Into Market&nbsp;Leaders
              </h2>
              <GoldRule className="mt-5" />
            </FadeIn>
          </div>
          <div className="lg:col-span-8">
            <FadeIn delay={0.08}>
              <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8]">
                By combining long-term capital with deep operating expertise, we persevere to help owners transform their life's work into market-leading businesses — while protecting their legacy and strengthening the values that built their success.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Core Principles */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-14 md:py-20 lg:py-24">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Core Principles</SectionLabel>
            <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground mb-2">
              Guiding How We Partner With You
            </h2>
            <GoldRule className="mt-3 mb-10 md:mb-12" />
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 md:gap-y-10">
            {principles.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.04}>
                <div className="relative pl-4 border-l border-foreground/[0.06]">
                  <h3 className="font-serif text-[1rem] text-foreground mb-2">{p.title}</h3>
                  <p className="font-sans text-[12.5px] text-muted-foreground leading-[1.7]">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Approach */}
      <Section>
        <div className="mb-10 md:mb-12">
          <FadeIn>
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground">
              Partnership Model
            </h2>
            <GoldRule className="mt-4" />
          </FadeIn>
        </div>

        <div className="border-t border-foreground/[0.06]">
          {approach.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.04}>
              <div className="grid md:grid-cols-12 gap-2 md:gap-6 py-5 md:py-7 border-b border-foreground/[0.06]">
                <div className="md:col-span-1">
                  <span className="font-serif text-[13px] text-foreground/[0.08]">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-[1.05rem] text-foreground">{a.title}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-sans text-[13px] text-muted-foreground leading-[1.7]">{a.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default About;
