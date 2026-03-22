import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import DarkSectionEffects from '@/components/DarkSectionEffects';

const Contact = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const email = isIndia ? 'india@cruxway.com' : 'info@cruxway.com';
  const location = isIndia ? 'GK II, Delhi, India' : 'San Diego, California';

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden">
        <DarkSectionEffects variant="hero" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-12 md:pt-36 md:pb-18 lg:pt-40 lg:pb-22">
          <FadeIn>
            <SectionLabel light>Contact</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2rem,4.5vw,3.4rem)] text-primary-foreground max-w-[400px] leading-[1.12] tracking-[-0.025em]">
              Get in Touch
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="font-sans text-[14px] md:text-[15px] text-primary-foreground/40 leading-[1.75] mt-4 max-w-[400px]">
              {isIndia
                ? 'We welcome conversations with Indian founders and business owners exploring long-term partnerships.'
                : 'We welcome conversations with founders and business owners exploring long-term partnerships.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <GoldRule className="mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Contact Cards */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-7 md:py-10 lg:py-14">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid md:grid-cols-2 gap-5 md:gap-7">
            {/* Email Card */}
            <FadeIn>
              <motion.a
                href={`mailto:${email}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block group h-full"
              >
                <div className="relative border border-border rounded-sm p-5 md:p-7 lg:p-8 overflow-hidden transition-colors duration-500 hover:border-gold/20 hover:bg-card h-full">
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-gold/20 to-transparent" />
                    <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-gold/20 to-transparent" />
                  </div>

                  <div className="flex items-start justify-between mb-5 md:mb-7">
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-gold/25 transition-colors duration-500">
                      <Mail className="w-4 h-4 text-muted-foreground group-hover:text-gold-dim transition-colors duration-500" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-gold-dim group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
                  </div>

                  <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/50 mb-2">
                    Email
                  </p>
                  <p className="font-serif text-[1.15rem] md:text-[1.3rem] text-foreground group-hover:text-gold-dim transition-colors duration-500 tracking-[-0.01em]">
                    {email}
                  </p>
                  <p className="font-sans text-[12px] md:text-[13px] text-muted-foreground leading-[1.6] mt-2">
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
                <div className="relative border border-border rounded-sm p-5 md:p-7 lg:p-8 overflow-hidden transition-colors duration-500 hover:border-gold/20 hover:bg-card h-full">
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-gold/20 to-transparent" />
                    <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-gold/20 to-transparent" />
                  </div>

                  <div className="flex items-start justify-between mb-5 md:mb-7">
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-gold/25 transition-colors duration-500">
                      <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-gold-dim transition-colors duration-500" />
                    </div>
                  </div>

                  <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/50 mb-2">
                    Location
                  </p>
                  <p className="font-serif text-[1.15rem] md:text-[1.3rem] text-foreground tracking-[-0.01em]">
                    {location}
                  </p>
                  <p className="font-sans text-[12px] md:text-[13px] text-muted-foreground leading-[1.6] mt-2">
                    {isIndia
                      ? 'Our India operations are based out of Delhi, with a network spanning key industrial regions.'
                      : 'Headquartered in San Diego, with a nationwide investment focus across the United States.'}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Presence — animated geometric */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-7 md:py-10 lg:py-14">
          <FadeIn>
            <SectionLabel light>Our Presence</SectionLabel>
            <GoldRule className="mt-1 mb-5 md:mb-7" />
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            <FadeIn delay={0.06}>
              <div className="relative border border-primary-foreground/[0.06] rounded-sm p-5 md:p-6 hover:border-gold/15 transition-colors duration-500">
                <svg viewBox="0 0 300 120" className="w-full h-[80px] mb-4">
                  <motion.path d="M 30 90 Q 80 30 150 50 T 270 30" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.3 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.3 }} stroke="hsl(38 45% 55%)" strokeWidth="0.5" fill="none" />
                  <motion.circle cx="150" cy="50" r="3" fill="hsl(38 45% 55%)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1 }} opacity={0.4} />
                </svg>
                <p className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-1">
                  Headquarters
                </p>
                <h3 className="font-serif text-[1.15rem] md:text-[1.3rem] text-primary-foreground leading-[1.2]">
                  San Diego, California
                </h3>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="relative border border-primary-foreground/[0.06] rounded-sm p-5 md:p-6 hover:border-gold/15 transition-colors duration-500">
                <svg viewBox="0 0 300 120" className="w-full h-[80px] mb-4">
                  <motion.rect x="90" y="30" width="30" height="70" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.25 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} stroke="hsl(38 45% 55%)" strokeWidth="0.4" fill="none" />
                  <motion.rect x="130" y="20" width="25" height="80" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.3 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} stroke="hsl(38 45% 55%)" strokeWidth="0.5" fill="none" />
                  <motion.rect x="165" y="40" width="20" height="60" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.2 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.7 }} stroke="hsl(38 45% 55%)" strokeWidth="0.4" fill="none" />
                </svg>
                <p className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-1">
                  {isIndia ? 'India Operations' : 'East Coast'}
                </p>
                <h3 className="font-serif text-[1.15rem] md:text-[1.3rem] text-primary-foreground leading-[1.2]">
                  {isIndia ? 'GK II, Delhi' : 'New York City'}
                </h3>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Philosophy Strip */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-7 md:py-10 lg:py-12">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid md:grid-cols-12 gap-5 md:gap-8 items-start">
            <div className="md:col-span-4">
              <FadeIn>
                <SectionLabel>Our Commitment</SectionLabel>
                <GoldRule className="mt-2" />
              </FadeIn>
            </div>
            <div className="md:col-span-8">
              <FadeIn delay={0.08}>
                <p className="font-serif text-[clamp(1.1rem,2vw,1.4rem)] text-foreground leading-[1.55] tracking-[-0.01em]">
                  {isIndia
                    ? 'Every conversation is treated with discretion and respect. We engage selectively and commit deeply to the founders we partner with across India.'
                    : 'Every conversation is treated with discretion and respect. We engage selectively and commit deeply to the founders we partner with.'}
                </p>
              </FadeIn>
              <FadeIn delay={0.14}>
                <div className="mt-5 flex items-center gap-3">
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
      <section className="bg-background px-5 md:px-10 lg:px-16 py-6 md:py-8 border-t border-border">
        <div className="max-w-[1080px] mx-auto">
          <p className="font-sans text-[11px] text-muted-foreground/40 leading-[1.65] max-w-[560px]">
            This website has been prepared by Cruxway LLC solely for informational purposes. It does not constitute an offer, agreement, or commitment to invest. All content is non-binding and subject to change.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
