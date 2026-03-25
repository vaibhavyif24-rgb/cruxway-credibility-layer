import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import CinematicHero from '@/components/CinematicHero';
import GlassCard from '@/components/GlassCard';
import ScrollRevealText from '@/components/ScrollRevealText';

import heroIndiaContact from '@/assets/hero-india-contact.jpg';
import heroUSContact from '@/assets/hero-us-contact.jpg';

const Contact = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const email = isIndia ? 'india@cruxway.com' : 'info@cruxway.com';
  const location = isIndia ? 'GK II, Delhi, India' : 'San Diego, California';

  return (
    <div>
      {/* Hero */}
      <section className="relative text-primary-foreground overflow-hidden min-h-[45vh] md:min-h-[50vh] flex items-end">
        <CinematicHero imageSrc={isIndia ? heroIndiaContact : heroUSContact} overlay="strong" />
        <DarkSectionEffects variant="hero" />
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-12 md:pt-36 md:pb-16 lg:pt-40 lg:pb-18">
          <FadeIn>
            <SectionLabel light>Contact</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] text-white max-w-[420px] leading-[1.1] tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              Get in <span className="text-gold">Touch</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="font-sans text-[15px] md:text-[16px] text-white/65 leading-[1.75] mt-5 max-w-[420px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
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
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {/* Email Card */}
            <FadeIn>
              <a href={`mailto:${email}`} className="block h-full">
                <GlassCard index={0} className="p-6 md:p-8 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center group-hover:border-gold/25 transition-colors duration-500">
                      <Mail className="w-4 h-4 text-muted-foreground group-hover:text-gold-dim transition-colors duration-500" />
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
                </GlassCard>
              </a>
            </FadeIn>

            {/* Location Card */}
            <FadeIn delay={0.08}>
              <GlassCard index={1} className="p-6 md:p-8 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center group-hover:border-gold/25 transition-colors duration-500">
                    <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-gold-dim transition-colors duration-500" />
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
                    ? 'India operations based in Delhi, with a network spanning key industrial regions.'
                    : 'Headquartered in San Diego, with a nationwide investment focus.'}
                </p>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Commitment — scroll reveal */}
      <ScrollRevealText
        label="Our Commitment"
        heading="Every conversation is treated with discretion and respect. We engage selectively and commit deeply to the founders we partner with."
        subtext="Privileged & Confidential"
        variant="light"
      />

      {/* CTA */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <DarkSectionEffects variant="cta" />
        <div className="relative max-w-[1080px] mx-auto">
          <div className="max-w-[540px]">
            <FadeIn>
              <SectionLabel light>Connect</SectionLabel>
              <h2 className="font-serif text-[clamp(1.4rem,3vw,2.2rem)] text-primary-foreground leading-[1.15] mb-4">
                {isIndia ? 'Partner With Us in India' : 'Start a Conversation'}
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/50 leading-[1.8] mb-6">
                {isIndia
                  ? 'If you\'re building a business meant to last in India, we\'d welcome a conversation about partnership.'
                  : 'If you\'re a founder considering your next chapter, we\'d welcome an honest discussion about long-term partnership.'}
              </p>
              <Link
                to={`/${region}/contact`}
                className="btn-premium inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-8 py-3.5 border border-primary-foreground/[0.1] text-primary-foreground/50 hover:border-gold/30 hover:text-primary-foreground/75 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-6 md:py-8 border-t border-border">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <p className="font-sans text-[12px] text-muted-foreground/45 leading-[1.7] max-w-[560px]">
              This website has been prepared by Cruxway LLC solely for informational purposes. It does not constitute an offer, agreement, or commitment to invest.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Contact;
