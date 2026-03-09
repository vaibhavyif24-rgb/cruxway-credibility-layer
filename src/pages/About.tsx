import { Section, SectionLabel, FadeIn, GoldRule } from '@/components/ui/Section';

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
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/50 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-24 md:pt-40 md:pb-36">
          <FadeIn><SectionLabel light>About Cruxway</SectionLabel></FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-serif text-display text-primary-foreground max-w-3xl text-balance">
              Values First — Integrity, Partnership, and&nbsp;Stewardship
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}><GoldRule className="mt-8 mb-8" /></FadeIn>
          <FadeIn delay={0.4}>
            <p className="font-sans text-body-lg text-primary-foreground/50 max-w-2xl">
              Founded in 2025 by Harin Gupta and Benson Zhang, Cruxway exists to partner with exceptional companies and preserve what makes them special while helping them scale.
            </p>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/8 to-transparent" />
      </section>

      {/* Mission */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>Our Mission</SectionLabel>
              <h2 className="font-serif text-heading text-foreground text-balance">
                Transforming Life's Work Into Market&nbsp;Leaders
              </h2>
              <GoldRule className="mt-6" />
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <FadeIn delay={0.15}>
              <p className="font-sans text-body text-muted-foreground leading-[1.9]">
                By combining long-term capital with deep operating expertise, we persevere to help owners transform their life's work into market-leading businesses — while protecting their legacy and strengthening the values that built their success.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Core Principles */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-20 md:py-28 lg:py-36">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionLabel>Core Principles</SectionLabel>
            <h2 className="font-serif text-heading text-foreground mb-4 text-balance">
              Guiding How We Partner With You
            </h2>
            <p className="font-sans text-body text-muted-foreground max-w-2xl mb-14">
              These principles guide how we protect your legacy while growing your business.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 md:gap-y-14">
            {principles.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.06}>
                <div className="relative pl-5 border-l border-foreground/8">
                  <h3 className="font-serif text-lg text-foreground mb-2.5">{p.title}</h3>
                  <p className="font-sans text-body text-muted-foreground">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Approach */}
      <Section>
        <FadeIn>
          <SectionLabel>Our Approach</SectionLabel>
          <h2 className="font-serif text-heading text-foreground mb-14 md:mb-18">
            Partnership Model
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {approach.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.08}>
              <div className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-foreground/6 first:border-t first:border-foreground/6">
                <div className="md:col-span-1">
                  <span className="font-serif text-lg text-foreground/15">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-subheading text-foreground">{a.title}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-sans text-body text-muted-foreground">{a.desc}</p>
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
