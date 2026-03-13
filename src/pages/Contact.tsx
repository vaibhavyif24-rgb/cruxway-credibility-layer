import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const email = isIndia ? 'india@cruxway.com' : 'info@cruxway.com';
  const location = isIndia ? 'Delhi, India' : 'United States';

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/20 pointer-events-none" />
        <div className="absolute top-1/4 left-0 w-[500px] h-[400px] bg-gold/[0.012] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[250px] bg-gold/[0.008] rounded-full blur-[80px] pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28">
          <FadeIn>
            <SectionLabel light>Contact</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.85rem,4.5vw,3.2rem)] text-primary-foreground max-w-[400px] leading-[1.12] tracking-[-0.025em]">
              Get in Touch
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="font-sans text-[13px] text-primary-foreground/30 leading-[1.75] mt-4 max-w-[380px]">
              {isIndia
                ? 'We welcome conversations with Indian founders and business owners exploring long-term partnerships.'
                : 'We welcome conversations with founders and business owners exploring long-term partnerships.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <GoldRule className="mt-6" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Contact Cards */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {/* Email Card */}
          <FadeIn>
            <motion.a
              href={`mailto:${email}`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block group"
            >
              <div className="relative border border-foreground/[0.06] rounded-sm p-6 md:p-8 lg:p-10 overflow-hidden transition-colors duration-500 hover:border-gold/20 hover:bg-cream/40">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-gold/20 to-transparent" />
                  <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-gold/20 to-transparent" />
                </div>

                <div className="flex items-start justify-between mb-6 md:mb-8">
                  <div className="w-10 h-10 rounded-full border border-foreground/[0.06] flex items-center justify-center group-hover:border-gold/25 transition-colors duration-500">
                    <Mail className="w-4 h-4 text-muted-foreground/40 group-hover:text-gold-dim transition-colors duration-500" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-gold-dim group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
                </div>

                <p className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground/35 mb-3">
                  Email
                </p>
                <p className="font-serif text-[1.1rem] md:text-[1.25rem] text-foreground group-hover:text-gold-dim transition-colors duration-500 tracking-[-0.01em]">
                  {email}
                </p>
                <p className="font-sans text-[11px] text-muted-foreground/40 leading-[1.6] mt-3">
                  {isIndia
                    ? 'For inquiries related to partnerships and opportunities in India.'
                    : 'For general inquiries, partnership discussions, and deal flow.'}
                </p>
              </div>
            </motion.a>
          </FadeIn>

          {/* Location Card */}
          <FadeIn delay={0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="relative border border-foreground/[0.06] rounded-sm p-6 md:p-8 lg:p-10 overflow-hidden transition-colors duration-500 hover:border-gold/20 hover:bg-cream/40 h-full">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-gold/20 to-transparent" />
                  <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-gold/20 to-transparent" />
                </div>

                <div className="flex items-start justify-between mb-6 md:mb-8">
                  <div className="w-10 h-10 rounded-full border border-foreground/[0.06] flex items-center justify-center group-hover:border-gold/25 transition-colors duration-500">
                    <MapPin className="w-4 h-4 text-muted-foreground/40 group-hover:text-gold-dim transition-colors duration-500" />
                  </div>
                </div>

                <p className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground/35 mb-3">
                  Location
                </p>
                <p className="font-serif text-[1.1rem] md:text-[1.25rem] text-foreground tracking-[-0.01em]">
                  {location}
                </p>
                <p className="font-sans text-[11px] text-muted-foreground/40 leading-[1.6] mt-3">
                  {isIndia
                    ? 'Our India operations are based out of Delhi, with a network spanning key industrial regions.'
                    : 'Headquartered in the United States, with a nationwide investment focus.'}
                </p>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </Section>

      {/* Philosophy Strip */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
            <div className="md:col-span-4">
              <FadeIn>
                <SectionLabel>Our Commitment</SectionLabel>
                <GoldRule className="mt-2" />
              </FadeIn>
            </div>
            <div className="md:col-span-8">
              <FadeIn delay={0.08}>
                <p className="font-serif text-[clamp(1.05rem,2vw,1.35rem)] text-foreground leading-[1.55] tracking-[-0.01em]">
                  {isIndia
                    ? 'Every conversation is treated with discretion and respect. We engage selectively and commit deeply to the founders we partner with across India.'
                    : 'Every conversation is treated with discretion and respect. We engage selectively and commit deeply to the founders we partner with.'}
                </p>
              </FadeIn>
              <FadeIn delay={0.14}>
                <div className="mt-6 flex items-center gap-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 24 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-px bg-gold/25"
                  />
                  <p className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold-dim/50">
                    Privilege &amp; Confidential
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-8 md:py-10 border-t border-foreground/[0.04]">
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
