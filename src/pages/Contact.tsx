import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule } from '@/components/ui/Section';

const Contact = () => {
  const { region } = useRegion();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-prussian text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/50 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-24 md:pt-40 md:pb-36">
          <FadeIn><SectionLabel light>Contact</SectionLabel></FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-serif text-display text-primary-foreground max-w-3xl text-balance">
              Get in Touch
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}><GoldRule className="mt-8 mb-8" /></FadeIn>
          <FadeIn delay={0.4}>
            <p className="font-sans text-body-lg text-primary-foreground/50 max-w-2xl">
              We welcome conversations with business owners, operators, and investors who share our long-term perspective.
            </p>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/8 to-transparent" />
      </section>

      {/* Contact Details */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
          <div className="lg:col-span-6">
            <FadeIn>
              <SectionLabel>General Inquiries</SectionLabel>
              <h2 className="font-serif text-heading text-foreground mb-8">
                Reach Our Team
              </h2>
              <div className="space-y-6">
                <div className="py-5 border-b border-foreground/6">
                  <p className="font-sans text-caption uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Email</p>
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

          <div className="lg:col-span-6">
            <FadeIn delay={0.15}>
              <SectionLabel>Office</SectionLabel>
              <h2 className="font-serif text-heading text-foreground mb-8">
                {region === 'india' ? 'India' : 'United States'}
              </h2>
              <div className="py-5 border-b border-foreground/6">
                <p className="font-sans text-body text-muted-foreground">
                  Office details available upon request.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Disclaimer-like bottom */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-14 md:py-18">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="font-sans text-[11px] text-muted-foreground/50 leading-relaxed max-w-3xl">
              This website has been prepared by Cruxway LLC solely for informational purposes. It does not constitute an offer, agreement, or commitment to invest, acquire, or otherwise proceed with any transaction. All content is non-binding and subject to change without notice.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Contact;
