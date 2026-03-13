import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';

// Logos for social proof
import warburgLogo from '@/assets/logos/warburg-pincus.png';
import jpMorganLogo from '@/assets/logos/jp-morgan.png';
import evercoreLogo from '@/assets/logos/evercore.png';
import deutscheBankLogo from '@/assets/logos/deutsche-bank.png';
import blackrockLogo from '@/assets/logos/blackrock.png';
import creditSuisseLogo from '@/assets/logos/credit-suisse.png';
import hggcLogo from '@/assets/logos/hggc.png';

const institutionalLogos = [
  { src: warburgLogo, alt: 'Warburg Pincus' },
  { src: blackrockLogo, alt: 'BlackRock' },
  { src: jpMorganLogo, alt: 'J.P. Morgan' },
  { src: evercoreLogo, alt: 'Evercore' },
  { src: deutscheBankLogo, alt: 'Deutsche Bank' },
  { src: hggcLogo, alt: 'HGGC' },
  { src: creditSuisseLogo, alt: 'Credit Suisse' },
];

const Home = () => {
  const { region } = useRegion();

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-44 lg:pb-32">
          <FadeIn>
            <SectionLabel light>Investment Firm</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1 className="font-serif text-[clamp(1.85rem,4.5vw,3.4rem)] text-primary-foreground max-w-[620px] leading-[1.1] tracking-[-0.025em]">
              The Right Partner for Enduring&nbsp;Businesses
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[13.5px] text-primary-foreground/35 leading-[1.7] mt-5 max-w-[460px]">
              We acquire and grow founder-led companies in essential B2B services — providing long-term capital, operational expertise, and a commitment to preserving what works.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-7" />
          </FadeIn>
          <FadeIn delay={0.28}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to={`/${region}/about`}
                className="btn-premium inline-block font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] px-7 py-3 border border-primary-foreground/[0.1] text-primary-foreground/40 hover:border-gold/25 hover:text-primary-foreground/70 transition-all duration-300"
              >
                Our Approach
              </Link>
              <Link
                to={`/${region}/contact`}
                className="btn-premium inline-block font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] px-7 py-3 border border-gold/15 text-gold/50 hover:border-gold/35 hover:text-gold/80 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* What We Do */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>What We Do</SectionLabel>
              <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground leading-[1.18]">
                Acquiring &amp; Building Essential Companies
              </h2>
              <GoldRule className="mt-5" />
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <FadeIn delay={0.08}>
              <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8] mb-4">
                Cruxway identifies, acquires, and actively grows founder-led and family-owned businesses in critical B2B services. We focus on sectors where reliability, compliance, and deep client relationships define long-term value.
              </p>
              <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8]">
                Our team brings institutional investing and operating experience to companies seeking a partner — not just capital.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Approach */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-14 md:py-20 lg:py-24">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Our Approach</SectionLabel>
            <GoldRule className="mt-1 mb-10 md:mb-12" />
          </FadeIn>

          <div className="border-t border-foreground/[0.06]">
            {[
              { t: 'Long-term alignment', d: 'Hold periods designed around value creation, not fund timelines.' },
              { t: 'Operational depth', d: 'Hands-on involvement alongside management teams to drive growth.' },
              { t: 'Disciplined capital', d: 'Leverage as an enabler, not a strategy.' },
              { t: 'Selective focus', d: 'One platform at a time. Deep conviction, not diversification.' },
            ].map((item, i) => (
              <FadeIn key={item.t} delay={i * 0.04}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-5 md:gap-8 py-5 md:py-6 border-b border-foreground/[0.06] items-baseline group cursor-default"
                >
                  <span className="font-serif text-[13px] text-foreground/[0.08] group-hover:text-gold/30 transition-colors duration-300 shrink-0 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-8 flex-1">
                    <h3 className="font-serif text-[1.05rem] text-foreground md:w-52 shrink-0">{item.t}</h3>
                    <p className="font-sans text-[13px] text-muted-foreground leading-[1.7]">{item.d}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof — Institutional Logo Bar */}
      <Section>
        <FadeIn>
          <SectionLabel>Institutional Experience</SectionLabel>
          <h2 className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] text-foreground leading-[1.2] max-w-[520px]">
            Our team has invested and operated across leading global institutions
          </h2>
          <GoldRule className="mt-5 mb-10 md:mb-14" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="border-t border-foreground/[0.06] pt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
              {institutionalLogos.map((logo, i) => (
                <motion.div
                  key={logo.alt}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="flex items-center justify-center h-[56px] md:h-[64px] rounded-sm bg-card border border-foreground/[0.04] px-4 hover:border-gold/15 transition-colors duration-300"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-[24px] md:h-[30px] w-auto max-w-full object-contain opacity-35 grayscale hover:opacity-55 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="max-w-[480px]">
          <FadeIn>
            <SectionLabel light>Connect</SectionLabel>
            <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.85rem)] text-primary-foreground leading-[1.18] mb-5">
              Built for Owners Thinking Long-Term
            </h2>
            <p className="font-sans text-[13.5px] text-primary-foreground/30 leading-[1.8] mb-8">
              If you're building a business meant to last, we'd welcome a conversation about how we can partner together.
            </p>
            <Link
              to={`/${region}/contact`}
              className="btn-premium inline-block font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] px-7 py-3 border border-primary-foreground/[0.08] text-primary-foreground/35 hover:border-gold/25 hover:text-primary-foreground/65 transition-all duration-300"
            >
              Start a Conversation
            </Link>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
};

export default Home;
