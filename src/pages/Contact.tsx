import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';

const Contact = () => {
  const { region } = useRegion();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-prussian text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/20 pointer-events-none" />
        <div className="relative max-w-[1120px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 md:pt-44 md:pb-32 lg:pt-48 lg:pb-36">
          <FadeIn><SectionLabel light>Contact</SectionLabel></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-[clamp(2rem,5.5vw,3.5rem)] text-primary-foreground max-w-[480px] leading-[1.1] tracking-[-0.03em]">
              Get in Touch
            </h1>
          </FadeIn>
          <FadeIn delay={0.25}><GoldRule className="mt-8 mb-8" /></FadeIn>
          <FadeIn delay={0.35}>
            <p className="font-sans text-[15px] md:text-base text-primary-foreground/40 max-w-[480px] leading-[1.8]">
              We welcome conversations with business owners, operators, and investors who share our long-term perspective.
            </p>
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Contact Details */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <FadeIn>
              <SectionLabel>General Inquiries</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground mb-8">
                Reach Our Team
              </h2>
              <div className="border-t border-foreground/[0.06]">
                <div className="py-6">
                  <p className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">Email</p>
                  <a
                    href="mailto:info@cruxway.com"
                    className="font-serif text-lg text-foreground hover:text-accent transition-colors duration-300"
                  >
                    info@cruxway.com
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          <div>
            <FadeIn delay={0.1}>
              <SectionLabel>Office</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground mb-8">
                {region === 'india' ? 'India' : 'United States'}
              </h2>
              <div className="border-t border-foreground/[0.06]">
                <div className="py-6">
                  <p className="font-sans text-[14px] text-muted-foreground leading-[1.75]">
                    Office details available upon request.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Disclaimer */}
      <section className="bg-cream px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="max-w-[1120px] mx-auto">
          <FadeIn>
            <p className="font-sans text-[11px] text-muted-foreground/40 leading-[1.7] max-w-[640px]">
              This website has been prepared by Cruxway LLC solely for informational purposes. It does not constitute an offer, agreement, or commitment to invest, acquire, or otherwise proceed with any transaction. All content is non-binding and subject to change without notice.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Contact;
