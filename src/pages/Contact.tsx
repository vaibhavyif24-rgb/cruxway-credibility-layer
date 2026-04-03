import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import CinematicHero from '@/components/CinematicHero';
import GlassCard from '@/components/GlassCard';
import ScrollRevealText from '@/components/ScrollRevealText';


import heroIndiaContact from '@/assets/hero-india-contact.jpg';
import heroUSContact from '@/assets/hero-us-contact.jpg';

const Contact = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isIndia = region === 'india';

  const email = isIndia ? 'india@cruxway.com' : 'us@cruxway.com';
  const location = isIndia ? 'E-97, GK II, Delhi, India' : 'San Diego, California';
  const mapsUrl = isIndia
    ? 'https://maps.app.goo.gl/C4V6nKknHo7vPrrj9'
    : 'https://maps.google.com/?q=San+Diego+California';

  return (
    <div style={{ overflowX: 'clip' }}>
      {/* Hero */}
      <section className={`relative overflow-hidden min-h-[45vh] md:min-h-[50vh] flex items-end ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
        <CinematicHero imageSrc={isIndia ? heroIndiaContact : heroUSContact} overlay="strong" />
        
        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-12 md:pt-36 md:pb-14 lg:pt-40 lg:pb-14">
          <FadeIn>
            <SectionLabel light={isDark}>Contact</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2rem,5vw,3.4rem)] max-w-[420px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]'}`}>
              Get in <span className="text-gold">Touch</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[420px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)]'}`}>
              {isIndia
                ? 'Confidential, direct conversations with founders and business owners across India.'
                : 'Direct, confidential conversations with business owners. No intermediaries, no pressure.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <GoldRule className="mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Contact Cards */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-14">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            <FadeIn>
              <motion.a href={`mailto:${email}`} className="block h-full" whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <GlassCard index={0} className="p-6 md:p-8 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center group-hover:border-gold/25 transition-colors duration-500">
                      <Mail className="w-4 h-4 text-muted-foreground group-hover:text-gold-dim transition-colors duration-500" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/45 group-hover:text-gold-dim group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
                  </div>
                  <p className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground/70 mb-2">
                    Email
                  </p>
                  <p className="font-serif text-[1.2rem] md:text-[1.4rem] text-foreground group-hover:text-gold-dim transition-colors duration-500 tracking-[-0.01em]">
                    {email}
                  </p>
                  <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.7] mt-3">
                  {isIndia
                      ? 'For partnership and investment inquiries in India.'
                      : 'For partnership discussions and general inquiries.'}
                  </p>
                </GlassCard>
              </motion.a>
            </FadeIn>

            <FadeIn delay={0.08}>
              <motion.a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block h-full" whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <GlassCard index={1} className="p-6 md:p-8 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center group-hover:border-gold/25 transition-colors duration-500">
                    <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-gold-dim transition-colors duration-500" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/45 group-hover:text-gold-dim group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
                </div>
                <p className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground/70 mb-2">
                  Location
                </p>
                <p className="font-serif text-[1.2rem] md:text-[1.4rem] text-foreground tracking-[-0.01em]">
                  {location}
                </p>
                <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.7] mt-3">
                  {isIndia
                    ? 'Based in Delhi, with relationships across India\'s key industrial corridors.'
                    : 'Based in San Diego, investing across the United States.'}
                </p>
              </GlassCard>
              </motion.a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <ScrollRevealText
        label="Our Commitment"
        heading="Every conversation is treated with discretion and respect. We engage selectively and commit deeply to the founders we partner with."
        subtext="Privileged & Confidential"
        variant="light"
      />

      {/* Disclaimer */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-6 md:py-8 border-t border-border">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <p className="font-sans text-[12px] text-muted-foreground/55 leading-[1.7] max-w-[560px]">
              This website has been prepared by Cruxway LLC solely for informational purposes. It does not constitute an offer, agreement, or commitment to invest.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Contact;
