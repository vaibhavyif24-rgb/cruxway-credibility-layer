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
    { title: 'Prudent Use of Leverage', desc: 'We view leverage as an enabler, not a strategy. Our focus is on creating long-term value through business building and disciplined growth — not financial engineering.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-prussian text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(207_50%_18%/0.15)_0%,_transparent_60%)] pointer-events-none" />
        <div className="relative max-w-[1120px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 md:pt-44 md:pb-28 lg:pt-48 lg:pb-36">
          <FadeIn><SectionLabel light>About Cruxway</SectionLabel></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-[clamp(2rem,5vw,3.25rem)] text-primary-foreground max-w-[620px] leading-[1.1] tracking-[-0.03em]">
              Values First — Integrity, Partnership, and&nbsp;Stewardship
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}><GoldRule className="mt-8 mb-8" /></FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-sans text-[15px] text-primary-foreground/35 max-w-[500px] leading-[1.8]">
              Founded in 2025 by Harin Gupta and Benson Zhang, Cruxway exists to partner with exceptional companies and preserve what makes them special while helping them scale.
            </p>
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Mission */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-4">
            <FadeIn>
              <SectionLabel>Our Mission</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground leading-[1.15]">
                Transforming Life's Work Into Market&nbsp;Leaders
              </h2>
              <GoldRule className="mt-6" />
            </FadeIn>
          </div>
          <div className="lg:col-span-8">
            <FadeIn delay={0.1}>
              <p className="font-sans text-[14.5px] text-muted-foreground leading-[1.85]">
                By combining long-term capital with deep operating expertise, we persevere to help owners transform their life's work into market-leading businesses — while protecting their legacy and strengthening the values that built their success.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Core Principles */}
      <section className="bg-cream px-6 md:px-12 lg:px-20 py-20 md:py-28 lg:py-36">
        <div className="max-w-[1120px] mx-auto">
          <FadeIn>
            <SectionLabel>Core Principles</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground mb-3">
              Guiding How We Partner With You
            </h2>
            <GoldRule className="mt-4 mb-12 md:mb-16" />
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 md:gap-y-14">
            {principles.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.05}>
                <div className="relative pl-5 border-l border-foreground/[0.06]">
                  <h3 className="font-serif text-[1.05rem] text-foreground mb-2.5">{p.title}</h3>
                  <p className="font-sans text-[13px] text-muted-foreground leading-[1.75]">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Approach */}
      <Section>
        <div className="mb-12 md:mb-16">
          <FadeIn>
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground">
              Partnership Model
            </h2>
            <GoldRule className="mt-5" />
          </FadeIn>
        </div>

        <div className="border-t border-foreground/[0.05]">
          {approach.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.06}>
              <div className="grid md:grid-cols-12 gap-3 md:gap-8 py-7 md:py-9 border-b border-foreground/[0.05]">
                <div className="md:col-span-1">
                  <span className="font-serif text-[15px] text-foreground/10">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-lg md:text-[1.2rem] text-foreground">{a.title}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-sans text-[13.5px] md:text-[14px] text-muted-foreground leading-[1.75]">{a.desc}</p>
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
