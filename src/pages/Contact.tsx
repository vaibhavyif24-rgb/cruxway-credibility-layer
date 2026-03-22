import { useRegion } from '@/contexts/RegionContext';
import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import GlassCard from '@/components/GlassCard';

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
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-12 md:pt-36 md:pb-16 lg:pt-40 lg:pb-18">
          <FadeIn>
            <SectionLabel light>Contact</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] text-primary-foreground max-w-[420px] leading-[1.1] tracking-[-0.03em]">
              Get in Touch
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/45 leading-[1.75] mt-5 max-w-[420px]">
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

      {/* Contact Cards — Glassmorphism */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {/* Email Card */}
            <FadeIn>
              <motion.a
                href={`mailto:${email}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block group h-full"
              >
                <div className="relative border border-border rounded-sm p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-gold/25 bg-background/60 dark:bg-card/40 backdrop-blur-sm h-full glass-card">
                  {/* Gold corner accents */}
                  <span className="absolute top-0 left-0 w-0 h-px bg-gold/30 group-hover:w-8 transition-all duration-500" />
                  <span className="absolute top-0 left-0 h-0 w-px bg-gold/30 group-hover:h-8 transition-all duration-500" />

                  <div className="flex items-start justify-between mb-6">
                    <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center group-hover:border-gold/25 transition-colors duration-500">
                      <Mail className="w-4.5 h-4.5 text-muted-foreground group-hover:text-gold-dim transition-colors duration-500" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-gold-dim group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
                  </div>

                  <p className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground/55 mb-2">
                    Email
                  </p>
                  <p className="font-serif text-[1.2rem] md:text-[1.4rem] text-foreground group-hover:text-gold-dim transition-colors duration-500 tracking-[-0.01em]">
                    {email}
                  </p>
                  <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground leading-[1.7] mt-3">
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
                className="group h-full"
              >
                <div className="relative border border-border rounded-sm p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-gold/25 bg-background/60 dark:bg-card/40 backdrop-blur-sm h-full glass-card">
                  <span className="absolute top-0 left-0 w-0 h-px bg-gold/30 group-hover:w-8 transition-all duration-500" />
                  <span className="absolute top-0 left-0 h-0 w-px bg-gold/30 group-hover:h-8 transition-all duration-500" />

                  <div className="flex items-start justify-between mb-6">
                    <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center group-hover:border-gold/25 transition-colors duration-500">
                      <MapPin className="w-4.5 h-4.5 text-muted-foreground group-hover:text-gold-dim transition-colors duration-500" />
                    </div>
                  </div>

                  <p className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground/55 mb-2">
                    Location
                  </p>
                  <p className="font-serif text-[1.2rem] md:text-[1.4rem] text-foreground tracking-[-0.01em]">
                    {location}
                  </p>
                  <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground leading-[1.7] mt-3">
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
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <FadeIn>
            <SectionLabel light>Our Presence</SectionLabel>
            <GoldRule className="mt-1 mb-6 md:mb-8" />
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            <GlassCard index={0} variant="dark" className="p-6 md:p-7">
              <svg viewBox="0 0 300 80" className="w-full h-[60px] md:h-[70px] mb-4">
                <motion.path d="M 30 60 Q 80 20 150 35 T 270 20" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.35 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.3 }} stroke="hsl(38 45% 55%)" strokeWidth="0.6" fill="none" />
                <motion.circle cx="150" cy="35" r="3" fill="hsl(38 45% 55%)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1 }} opacity={0.5} />
              </svg>
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-gold/55 mb-1.5">
                Headquarters
              </p>
              <h3 className="font-serif text-[1.2rem] md:text-[1.4rem] text-primary-foreground leading-[1.2]">
                San Diego, California
              </h3>
            </GlassCard>

            <GlassCard index={1} variant="dark" className="p-6 md:p-7">
              <svg viewBox="0 0 300 80" className="w-full h-[60px] md:h-[70px] mb-4">
                <motion.rect x="90" y="15" width="30" height="55" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.3 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} stroke="hsl(38 45% 55%)" strokeWidth="0.5" fill="none" />
                <motion.rect x="130" y="8" width="22" height="62" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.35 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} stroke="hsl(38 45% 55%)" strokeWidth="0.6" fill="none" />
                <motion.rect x="162" y="22" width="18" height="48" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.25 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.7 }} stroke="hsl(38 45% 55%)" strokeWidth="0.4" fill="none" />
              </svg>
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-gold/55 mb-1.5">
                {isIndia ? 'India Operations' : 'East Coast'}
              </p>
              <h3 className="font-serif text-[1.2rem] md:text-[1.4rem] text-primary-foreground leading-[1.2]">
                {isIndia ? 'GK II, Delhi' : 'New York City'}
              </h3>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Philosophy Strip */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
            <div className="md:col-span-4">
              <FadeIn>
                <SectionLabel>Our Commitment</SectionLabel>
                <GoldRule className="mt-2" />
              </FadeIn>
            </div>
            <div className="md:col-span-8">
              <FadeIn delay={0.08}>
                <p className="font-serif text-[clamp(1.15rem,2.2vw,1.5rem)] text-foreground leading-[1.55] tracking-[-0.01em]">
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
                    Privileged &amp; Confidential
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
          <p className="font-sans text-[12px] text-muted-foreground/45 leading-[1.7] max-w-[560px]">
            This website has been prepared by Cruxway LLC solely for informational purposes. It does not constitute an offer, agreement, or commitment to invest. All content is non-binding and subject to change.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
