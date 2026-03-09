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
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-navy-deep/15 pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-24 pb-14 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24">
          <FadeIn>
            <SectionLabel light>
              {isIndia ? 'Cruxway India' : 'Cruxway United States'}
            </SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3rem)] text-primary-foreground max-w-[640px] leading-[1.12] tracking-[-0.025em]">
              Building Enduring Businesses Through Partnership&nbsp;&amp;&nbsp;Stewardship
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <GoldRule className="mt-6 mb-5" />
          </FadeIn>
          <FadeIn delay={0.22}>
            <p className="font-sans text-[14px] text-primary-foreground/30 max-w-[480px] leading-[1.75]">
              We partner with exceptional companies in essential B2B services — preserving what makes them special while helping them scale for generations.
            </p>
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Overview */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <FadeIn>
              <SectionLabel>Who We Are</SectionLabel>
              <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground leading-[1.15]">
                Transformation Done Right
              </h2>
              <GoldRule className="mt-5" />
            </FadeIn>
          </div>
          <div className="lg:col-span-8">
            <FadeIn delay={0.08}>
              <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8] mb-4">
                At Cruxway, we believe enduring businesses are built on values first — integrity, partnership, and stewardship. Founded in 2025 by Harin Gupta and Benson Zhang, Cruxway exists to partner with exceptional companies and preserve what makes them special while helping them scale.
              </p>
              <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8]">
                We focus on essential B2B services — industries with recurring, compliance-driven demand where reliability and trust are non-negotiable.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* What We Offer */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-14 md:py-20 lg:py-24">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>What We Offer</SectionLabel>
            <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground mb-3">
              Our Commitment
            </h2>
            <GoldRule className="mt-3 mb-10 md:mb-12" />
          </FadeIn>

          <div className="border-t border-foreground/[0.06]">
            {offerings.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.04}>
                <div className="grid md:grid-cols-12 gap-2 md:gap-6 py-5 md:py-7 border-b border-foreground/[0.06]">
                  <div className="md:col-span-1">
                    <span className="font-serif text-[13px] text-foreground/[0.08]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-serif text-[1.05rem] md:text-[1.1rem] text-foreground">{item.title}</h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="font-sans text-[13px] text-muted-foreground leading-[1.7]">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section dark>
        <div className="text-center max-w-[560px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-[clamp(1.2rem,2.5vw,1.75rem)] text-primary-foreground leading-[1.35] mb-5">
              By combining long-term capital with deep operating expertise, we help owners transform their life's work into market-leading businesses.
            </h2>
            <GoldRule className="justify-center my-6" />
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center mt-8">
              <Link
                to={`/${region}/about`}
                className="font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] px-7 py-3 bg-primary-foreground/[0.05] text-primary-foreground/45 hover:bg-primary-foreground/[0.1] hover:text-primary-foreground/75 transition-all duration-300 text-center"
              >
                Our Approach
              </Link>
              <Link
                to={`/${region}/contact`}
                className="font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] px-7 py-3 border border-primary-foreground/[0.06] text-primary-foreground/25 hover:border-primary-foreground/15 hover:text-primary-foreground/55 transition-all duration-300 text-center"
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
