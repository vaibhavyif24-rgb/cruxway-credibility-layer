import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';

const Contact = () => {
  const { region } = useRegion();

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/20 pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[300px] bg-gold/[0.015] rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28">
          <FadeIn>
            <SectionLabel light>Contact</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.85rem,4.5vw,3.2rem)] text-primary-foreground max-w-[400px] leading-[1.12] tracking-[-0.025em]">
              Get in Touch
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <GoldRule className="mt-7" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Contact */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <FadeIn>
              <SectionLabel>Inquiries</SectionLabel>
              <div className="border-t border-foreground/[0.06] mt-4">
                <div className="py-5">
                  <p className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground/35 mb-2">Email</p>
                  <a
                    href={region === 'india' ? 'mailto:india@cruxway.com' : 'mailto:info@cruxway.com'}
                    className="font-serif text-[1.05rem] text-foreground hover:text-gold-dim transition-colors duration-300"
                  >
                    {region === 'india' ? 'india@cruxway.com' : 'info@cruxway.com'}
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
          <div>
            <FadeIn delay={0.08}>
              <SectionLabel>Location</SectionLabel>
              <div className="border-t border-foreground/[0.06] mt-4">
                <div className="py-5">
                  <p className="font-sans text-[13px] text-muted-foreground leading-[1.7]">
                    {region === 'india' ? 'Delhi, India' : 'United States'}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Disclaimer */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-8 md:py-10">
        <div className="max-w-[1080px] mx-auto">
          <p className="font-sans text-[10px] text-muted-foreground/25 leading-[1.6] max-w-[540px]">
            This website has been prepared by Cruxway LLC solely for informational purposes. It does not constitute an offer, agreement, or commitment to invest. All content is non-binding and subject to change.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;