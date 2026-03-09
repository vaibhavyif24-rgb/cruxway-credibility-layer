import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import { Section, SectionLabel, FadeIn, GoldRule } from '@/components/ui/Section';

const Home = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const offerings = [
    { title: 'Proven Experience', desc: 'Capabilities and track record in supporting growth and value creation for market-leading companies.' },
    { title: 'Alignment & Focus', desc: 'Focused on building companies one at a time, with deep operational involvement alongside management.' },
    { title: 'Vast Network', desc: 'Resources, expertise, and relationships cultivated over decades to help drive long-term success.' },
    { title: 'Prudent Capital', desc: 'Disciplined capital allocation for the highest-return uses, with leverage as an enabler — not a strategy.' },
    { title: 'Long-Term Orientation', desc: 'No artificially set timeline to monetize investments. Hold periods designed around the growth runway.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-prussian text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/50 via-transparent to-prussian-mid/20 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-24 md:pt-40 md:pb-36 lg:pt-48 lg:pb-44">
          <FadeIn>
            <SectionLabel light>
              {isIndia ? 'Cruxway India' : 'Cruxway United States'}
            </SectionLabel>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-serif text-display text-primary-foreground max-w-4xl text-balance">
              Building Enduring Businesses Through Partnership&nbsp;&amp;&nbsp;Stewardship
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <GoldRule className="mt-8 mb-8" />
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="font-sans text-body-lg text-primary-foreground/50 max-w-2xl leading-relaxed">
              We partner with exceptional companies in essential B2B services — preserving what makes them special while helping them scale for generations.
            </p>
          </FadeIn>
        </div>
        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/8 to-transparent" />
      </section>

      {/* Overview */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>Who We Are</SectionLabel>
              <h2 className="font-serif text-heading text-foreground text-balance">
                Transformation Done Right
              </h2>
              <GoldRule className="mt-6" />
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <FadeIn delay={0.15}>
              <p className="font-sans text-body text-muted-foreground leading-[1.9] mb-6">
                At Cruxway, we believe enduring businesses are built on values first — integrity, partnership, and stewardship. Founded in 2025 by Harin Gupta and Benson Zhang, Cruxway exists to partner with exceptional companies and preserve what makes them special while helping them scale.
              </p>
              <p className="font-sans text-body text-muted-foreground leading-[1.9]">
                We focus on essential B2B services — industries with recurring, compliance-driven demand where reliability and trust are non-negotiable. This includes maintenance, repair &amp; operations, testing, inspection, certification &amp; compliance, and other mission-critical service models.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* What We Offer */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-20 md:py-28 lg:py-36">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionLabel>What We Offer</SectionLabel>
            <h2 className="font-serif text-heading text-foreground mb-14 md:mb-18">
              Our Commitment
            </h2>
          </FadeIn>

          <div className="space-y-0">
            {offerings.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="grid md:grid-cols-12 gap-4 md:gap-8 py-7 md:py-8 border-b border-foreground/6 first:border-t first:border-foreground/6">
                  <div className="md:col-span-1">
                    <span className="font-serif text-lg text-foreground/15">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-serif text-subheading text-foreground">{item.title}</h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="font-sans text-body text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section dark>
        <div className="text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="font-serif text-heading text-primary-foreground mb-5 text-balance">
              By combining long-term capital with deep operating expertise, we help owners transform their life's work into market-leading businesses.
            </h2>
            <GoldRule className="justify-center my-8" />
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <Link
                to={`/${region}/about`}
                className="font-sans text-nav uppercase tracking-[0.15em] px-8 py-3.5 bg-primary-foreground/8 text-primary-foreground/70 hover:bg-primary-foreground/15 hover:text-primary-foreground transition-all duration-300"
              >
                Our Approach
              </Link>
              <Link
                to={`/${region}/contact`}
                className="font-sans text-nav uppercase tracking-[0.15em] px-8 py-3.5 border border-primary-foreground/12 text-primary-foreground/40 hover:border-primary-foreground/25 hover:text-primary-foreground/70 transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
};

export default Home;
