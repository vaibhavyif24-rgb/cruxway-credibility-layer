import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';

const Contact = () => {
  const { region } = useRegion();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-prussian text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-navy-deep/15 pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-24 pb-14 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24">
          <FadeIn><SectionLabel light>Contact</SectionLabel></FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3rem)] text-primary-foreground max-w-[440px] leading-[1.12] tracking-[-0.025em]">
              Get in Touch
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}><GoldRule className="mt-6 mb-5" /></FadeIn>
          <FadeIn delay={0.22}>
            <p className="font-sans text-[14px] text-primary-foreground/30 max-w-[420px] leading-[1.75]">
              We welcome conversations with business owners, operators, and investors who share our long-term perspective.
            </p>
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Contact Details */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <FadeIn>
              <SectionLabel>General Inquiries</SectionLabel>
              <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground mb-2">
                Reach Our Team
              </h2>
              <GoldRule className="mt-3 mb-6" />
              <div className="border-t border-foreground/[0.06]">
                <div className="py-5">
                  <p className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground/40 mb-2">Email</p>
                  <a
                    href="mailto:info@cruxway.com"
                    className="font-serif text-[1.05rem] text-foreground hover:text-accent transition-colors duration-300"
                  >
                    info@cruxway.com
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          <div>
            <FadeIn delay={0.08}>
              <SectionLabel>Office</SectionLabel>
              <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground mb-2">
                {region === 'india' ? 'India' : 'United States'}
              </h2>
              <GoldRule className="mt-3 mb-6" />
              <div className="border-t border-foreground/[0.06]">
                <div className="py-5">
                  <p className="font-sans text-[13px] text-muted-foreground leading-[1.7]">
                    Office details available upon request.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Disclaimer */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-10 md:py-12">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <p className="font-sans text-[10.5px] text-muted-foreground/30 leading-[1.65] max-w-[580px]">
              This website has been prepared by Cruxway LLC solely for informational purposes. It does not constitute an offer, agreement, or commitment to invest, acquire, or otherwise proceed with any transaction. All content is non-binding and subject to change without notice.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Contact;
