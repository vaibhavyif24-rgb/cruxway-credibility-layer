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
    { num: '01', title: 'Long-Term Alignment', desc: 'Hold periods designed around thesis and growth runway, not artificial timelines.' },
    { num: '02', title: 'Regulated & Technical Services', desc: 'Stable, defensive industries where compliance, safety, and reliability are paramount.' },
    { num: '03', title: 'Selective & Focused', desc: 'One or two platforms at a time. Deeply involved, hands-on, operationally supportive.' },
    { num: '04', title: 'Trusted Network', desc: 'An established bench of advisors and operators who execute with speed and rigor.' },
    { num: '05', title: 'Prudent Use of Leverage', desc: 'Leverage as an enabler, not a strategy. Long-term value through disciplined growth.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding py-24 md:py-36">
        <div className="container-narrow">
          <p className="text-caption text-gold-muted mb-6">About Cruxway</p>
          <h1 className="text-display text-primary-foreground max-w-3xl">
            Values First — Integrity, Partnership, and Stewardship
          </h1>
          <div className="w-16 h-px bg-gold-muted/40 mt-8 mb-8" />
          <p className="text-body text-primary-foreground/60 max-w-2xl">
            Founded in 2025 by Harin Gupta and Benson Zhang, Cruxway exists to partner with exceptional companies and preserve what makes them special while helping them scale.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <p className="text-caption text-muted-foreground mb-4">Our Mission</p>
          <h2 className="text-heading text-foreground mb-6">Transforming Life's Work Into Market Leaders</h2>
          <p className="text-body text-muted-foreground max-w-2xl">
            By combining long-term capital with deep operating expertise, we persevere to help owners transform their life's work into market-leading businesses — while protecting their legacy and strengthening the values that built their success.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="section-padding bg-secondary">
        <div className="container-narrow">
          <p className="text-caption text-muted-foreground mb-4">Our Core Principles</p>
          <h2 className="text-heading text-foreground mb-12">
            Guiding How We Partner With You
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((p) => (
              <div key={p.title} className="py-4">
                <h3 className="font-serif text-lg text-foreground mb-3">{p.title}</h3>
                <p className="text-body text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Approach */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <p className="text-caption text-muted-foreground mb-4">Our Approach</p>
          <h2 className="text-heading text-foreground mb-12">Partnership Model</h2>
          <div className="space-y-10">
            {approach.map((a) => (
              <div key={a.num} className="flex gap-6 items-start border-b border-border pb-8 last:border-b-0">
                <span className="font-serif text-2xl text-primary/30 min-w-[3rem]">{a.num}</span>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-2">{a.title}</h3>
                  <p className="text-body text-muted-foreground">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
