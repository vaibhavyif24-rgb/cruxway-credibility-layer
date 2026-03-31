import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { ArrowRight } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import AnimatedAccent from '@/components/AnimatedAccent';
import CinematicHero from '@/components/CinematicHero';
import PrinciplesGrid from '@/components/PrinciplesGrid';
import ScrollRevealText from '@/components/ScrollRevealText';
import WaveBackground from '@/components/WaveBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

import heroIndiaPrinciples from '@/assets/hero-india-principles.jpg';
import heroUSPrinciples from '@/assets/hero-us-principles.jpg';

const principles = [
  { t: 'Integrity', d: 'We say what we mean and follow through. Transparency and intellectual honesty in every interaction, even when the truth is uncomfortable.' },
  { t: 'Servant Leadership', d: 'Leadership is earned through service, not authority. We succeed when the people around us succeed.' },
  { t: 'Humility', d: 'The best investors never stop learning. We approach every situation with curiosity and an open mind.' },
  { t: 'Grit', d: 'Building lasting businesses requires perseverance. We do hard things, especially when things get hard.' },
  { t: 'Bias to Action', d: 'Analysis has its place, but progress demands execution. We move decisively and learn in motion.' },
  { t: 'The Golden Rule', d: 'Treat every person, from founder to frontline employee, with respect, fairness, and genuine compassion.' },
];

const GuidingPrinciples = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isIndia = region === 'india';
  const isDark = theme === 'dark';

  return (
    <div style={{ overflowX: 'clip' }}>
      {/* Hero */}
      <section className={`relative overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
        <CinematicHero imageSrc={isIndia ? heroIndiaPrinciples : heroUSPrinciples} overlay="strong" />
        
        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-14">
          <FadeIn>
            <SectionLabel light={isDark}>{isIndia ? 'About Us, India' : 'About Us'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.6rem)] max-w-[540px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground'}`}>
              {isIndia ? <>Building Enduring Value Across <span className="text-gold">India</span></> : <>Guiding <span className="text-gold">Principles</span></>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[460px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground'}`}>
              The values and convictions that shape every partnership and every decision we make.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Mission — scroll reveal */}
      <ScrollRevealText
        label="Mission"
        heading={
          isIndia
            ? 'Scale what India builds. Preserve what founders value. Partnering with conviction and discipline.'
            : 'Preserve what founders built. Scale what matters. Investing tailored to each company\'s needs, for the long term.'
        }
        highlights={isIndia ? ['India', 'conviction'] : ['founders', 'long']}
        subtext={
          isIndia
            ? 'Long-term capital along with operational expertise to help founders transform their businesses into market leaders.'
            : 'Combining long-term capital with operating expertise to help owners build market leaders while protecting their legacy.'
        }
        variant="light"
      />

      {/* Principles — refined heading + grid */}
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-8 md:pt-10">
        <FadeIn>
          <SectionLabel>Core Values</SectionLabel>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.15] mb-1">
            <span className="text-foreground">What We </span>
            <span className="text-gold">Stand For</span>
          </h2>
          <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] max-w-[480px] mt-2 mb-2">
            The principles that govern every partnership, every decision, and every relationship we build.
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <GoldRule />
          </motion.div>
        </FadeIn>
      </div>
      <PrinciplesGrid principles={principles} />

      {/* CTA */}
      <div className="h-px w-full shimmer-effect" style={{ background: 'linear-gradient(90deg, transparent, hsl(40, 60%, 48%, 0.12), transparent)', animationDuration: '5s' }} />

      <section className={`relative overflow-hidden px-5 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20 ${
        isDark ? 'hero-gradient-animated text-primary-foreground' : 'bg-[hsl(40,20%,91%)] text-foreground border-t border-gold/20'
      }`}>
        <WaveBackground variant="section" />
        {isDark ? <DarkSectionEffects variant="cta" /> : <LightSectionEffects variant="cta" />}
        <div className="relative max-w-[1080px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1 max-w-[560px]">
              <FadeIn>
                <SectionLabel light={isDark}>Connect</SectionLabel>
                <h2 className={`font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.15] mb-4 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {isIndia ? 'Partner With Us in India' : 'Start a Conversation'}
                </h2>
                <p className={`font-sans text-[13px] md:text-[15px] leading-[1.8] ${isDark ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                  If you share our values and are exploring long-term partnership, we'd welcome the conversation.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.1}>
              <Link
                to={`/${region}/contact`}
                className="group relative inline-flex items-center gap-3 font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.16em] border-2 border-gold text-gold px-10 py-5 md:px-12 md:py-6 transition-all duration-300 hover:bg-gold hover:text-white overflow-hidden"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 pointer-events-none overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-sweep" />
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuidingPrinciples;
