import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { ArrowRight } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
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
  { t: 'Steward Leadership', d: 'Leadership is earned through stewardship, not authority. We succeed when the people and businesses around us succeed.' },
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
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.6rem)] max-w-[540px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]'}`}>
              {isIndia ? <>Building Enduring Value Across <span className="text-gold">India</span></> : <>Guiding <span className="text-gold">Principles</span></>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[460px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)]'}`}>
              The values and convictions that shape every partnership and every decision we make.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Naming Story — scroll reveal */}
      <ScrollRevealText
        label="Our Name"
        heading="Crucible. The Way. Two words that define everything we do."
        highlights={['Crucible', 'Way']}
        subtext="A crucible is a vessel in which raw materials are subjected to extreme heat and pressure until something stronger emerges. 'The Way' is the path, the discipline, the philosophy. Cruxway: forging conviction through rigour."
        variant="light"
      />

      {/* Etymology Reveal */}
      <section className={`relative overflow-hidden px-5 md:px-10 lg:px-16 py-8 md:py-12 ${isDark ? 'bg-primary' : 'bg-background'}`}>
        {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
        <div className="relative max-w-[800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0 items-stretch">
            {/* Crucible card */}
            <FadeIn delay={0}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`p-6 md:p-8 rounded-sm border border-gold/20 ${isDark ? 'bg-primary-foreground/[0.03]' : 'bg-[hsl(40,20%,98%)]'}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold/50">
                    <path d="M7 4h10l2 8-4 8H9L5 12l2-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M9 4v4M15 4v4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  </svg>
                  <h3 className={`font-serif text-[1.3rem] tracking-[-0.02em] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                    Crucible
                  </h3>
                </div>
                <p className={`font-sans text-[13px] leading-[1.75] ${isDark ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                  A ceramic or metal container in which metals or other substances may be melted or subjected to very high temperatures.
                </p>
              </motion.div>
            </FadeIn>

            {/* Gold + connector */}
            <div className="hidden md:flex items-center justify-center px-6">
              <motion.span
                animate={{ rotate: [0, 90, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-gold text-2xl font-serif select-none"
              >
                +
              </motion.span>
            </div>
            <div className="flex md:hidden items-center justify-center">
              <motion.span
                animate={{ rotate: [0, 90, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-gold text-2xl font-serif select-none"
              >
                +
              </motion.span>
            </div>

            {/* The Way card */}
            <FadeIn delay={0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`p-6 md:p-8 rounded-sm border border-gold/20 ${isDark ? 'bg-primary-foreground/[0.03]' : 'bg-[hsl(40,20%,98%)]'}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold/50">
                    <path d="M5 19l7-14 7 14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M12 5v14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                  </svg>
                  <h3 className={`font-serif text-[1.3rem] tracking-[-0.02em] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                    The Way
                  </h3>
                </div>
                <p className={`font-sans text-[13px] leading-[1.75] ${isDark ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                  A method, style, or manner of doing something; a road, track, or path for travelling along.
                </p>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

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
            className="mb-6 md:mb-0"
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
              <motion.div whileHover={{ y: -2, boxShadow: '0 4px 20px hsl(43 78% 50% / 0.15)' }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={`/${region}/contact`}
                  className="group relative inline-flex items-center gap-3 font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.16em] border-2 border-gold text-gold px-10 py-5 md:px-12 md:py-6 transition-all duration-300 hover:bg-gold hover:text-white overflow-hidden btn-premium-glow"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 pointer-events-none overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-sweep" />
                  </span>
                </Link>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuidingPrinciples;