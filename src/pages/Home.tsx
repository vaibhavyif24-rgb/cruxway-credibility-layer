import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';

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
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(207_50%_18%/0.25)_0%,_transparent_60%)] pointer-events-none" />
        <div className="relative max-w-[1120px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 md:pt-44 md:pb-32 lg:pt-52 lg:pb-40">
          <FadeIn>
            <SectionLabel light>
              {isIndia ? 'Cruxway India' : 'Cruxway United States'}
            </SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-[clamp(2rem,5.5vw,3.75rem)] text-primary-foreground max-w-[720px] leading-[1.1] tracking-[-0.03em]">
              Building Enduring Businesses Through Partnership&nbsp;&amp;&nbsp;Stewardship
            </h1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <GoldRule className="mt-8 mb-8" />
          </FadeIn>
          <FadeIn delay={0.35}>
            <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/40 max-w-[540px] leading-[1.8]">
              We partner with exceptional companies in essential B2B services — preserving what makes them special while helping them scale for generations.
            </p>
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Overview */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-4">
            <FadeIn>
              <SectionLabel>Who We Are</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground leading-[1.15]">
                Transformation Done Right
              </h2>
              <GoldRule className="mt-6" />
            </FadeIn>
          </div>
          <div className="lg:col-span-8">
            <FadeIn delay={0.1}>
              <p className="font-sans text-[15px] text-muted-foreground leading-[1.85] mb-5">
                At Cruxway, we believe enduring businesses are built on values first — integrity, partnership, and stewardship. Founded in 2025 by Harin Gupta and Benson Zhang, Cruxway exists to partner with exceptional companies and preserve what makes them special while helping them scale.
              </p>
              <p className="font-sans text-[15px] text-muted-foreground leading-[1.85]">
                We focus on essential B2B services — industries with recurring, compliance-driven demand where reliability and trust are non-negotiable. This includes maintenance, repair &amp; operations, testing, inspection, certification &amp; compliance, and other mission-critical service models.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* What We Offer */}
      <section className="bg-cream px-6 md:px-12 lg:px-20 py-20 md:py-28 lg:py-36">
        <div className="max-w-[1120px] mx-auto">
          <FadeIn>
            <SectionLabel>What We Offer</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground mb-12 md:mb-16">
              Our Commitment
            </h2>
          </FadeIn>

          <div className="space-y-0 border-t border-foreground/[0.06]">
            {offerings.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06}>
                <div className="grid md:grid-cols-12 gap-3 md:gap-8 py-6 md:py-8 border-b border-foreground/[0.06]">
                  <div className="md:col-span-1">
                    <span className="font-serif text-base text-foreground/12">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-serif text-lg md:text-xl text-foreground">{item.title}</h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="font-sans text-[14px] text-muted-foreground leading-[1.75]">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section dark>
        <div className="text-center max-w-[640px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,2rem)] text-primary-foreground leading-[1.35] mb-6">
              By combining long-term capital with deep operating expertise, we help owners transform their life's work into market-leading businesses.
            </h2>
            <GoldRule className="justify-center my-8" />
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <Link
                to={`/${region}/about`}
                className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] px-8 py-3.5 bg-primary-foreground/[0.06] text-primary-foreground/60 hover:bg-primary-foreground/[0.12] hover:text-primary-foreground transition-all duration-300"
              >
                Our Approach
              </Link>
              <Link
                to={`/${region}/contact`}
                className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] px-8 py-3.5 border border-primary-foreground/8 text-primary-foreground/35 hover:border-primary-foreground/20 hover:text-primary-foreground/60 transition-all duration-300"
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
