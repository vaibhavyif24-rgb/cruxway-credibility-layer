import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import AnimatedAccent from '@/components/AnimatedAccent';
import CinematicHero from '@/components/CinematicHero';
import PrinciplesSlider from '@/components/PrinciplesSlider';
import { motion } from 'framer-motion';

import heroIndiaPrinciples from '@/assets/hero-india-principles.jpg';
import heroUSPrinciples from '@/assets/hero-us-principles.jpg';

const principles = [
  { t: 'Integrity', d: 'Transparency and intellectual honesty in every interaction.' },
  { t: 'Servant Leadership', d: 'Earn trust through service, not authority.' },
  { t: 'Humility', d: 'Stay curious. Never stop learning.' },
  { t: 'Grit', d: 'Do hard things, especially when things get hard.' },
  { t: 'Bias to Action', d: 'Execute decisively. Speed matters.' },
  { t: 'The Golden Rule', d: 'Treat people with respect, fairness, and compassion.' },
];

const GuidingPrinciples = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  return (
    <div>
      {/* Hero — distinct region-specific cinematic photo */}
      <section className="relative text-primary-foreground overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end">
        <CinematicHero imageSrc={isIndia ? heroIndiaPrinciples : heroUSPrinciples} overlay="strong" />
        <DarkSectionEffects variant="hero" />
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'About Us — India' : 'About Us'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] text-white max-w-[540px] leading-[1.1] tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              {isIndia ? <>Building Enduring Value Across <span className="text-gold">India</span></> : <>Guiding <span className="text-gold">Principles</span></>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[15px] md:text-[16px] text-white/65 leading-[1.75] mt-5 max-w-[460px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
              The values and convictions that shape every partnership and every decision we make.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Mission with animated accent */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <FadeIn>
                <SectionLabel>Mission</SectionLabel>
                <h2 className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] text-foreground leading-[1.15]">
                  {isIndia
                    ? 'Scale What India Builds. Preserve What Founders Value.'
                    : 'Preserve What Founders Built.\u00a0Scale What\u00a0Matters.'}
                </h2>
                <GoldRule className="mt-3" />
              </FadeIn>
              <FadeIn delay={0.08}>
                <p className="font-sans text-[15px] md:text-[16px] text-muted-foreground leading-[1.8] mt-5 mb-4">
                  {isIndia
                    ? 'Cruxway invests in and acquires majority stakes in founder-led companies across India\'s essential sectors, providing long-term capital along with operational expertise to help founders transform their businesses into market leaders.'
                    : 'Cruxway invests in majority stakes in founder-led businesses, combining long-term capital with operating expertise to help owners build market leaders while protecting their legacy.'}
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <AnimatedAccent variant="partnership" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Principles — Bento Glass Cards */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16 border-t border-border">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] text-foreground leading-[1.15] mb-3">
              What Guides Us
            </h2>
            <GoldRule className="mb-8 md:mb-10" />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-fr">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <GlassCard key={p.t} index={i} className="p-5 md:p-7 h-full">
                  <div className="flex flex-col h-full">
                    <motion.div
                      className="w-10 h-10 rounded-full border border-gold/15 group-hover:border-gold/35 flex items-center justify-center mb-4 transition-colors duration-500"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 + 0.15 }}
                    >
                      <Icon className="w-4 h-4 text-gold/40 group-hover:text-gold/70 transition-colors duration-500" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="font-serif text-[1.1rem] md:text-[1.2rem] text-foreground mb-2 leading-[1.2]">
                      {p.t}
                    </h3>
                    <div className="w-5 h-px bg-gold/15 group-hover:bg-gold/40 group-hover:w-8 transition-all duration-500 mb-3" />
                    <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.7] group-hover:text-foreground/75 transition-colors duration-300 flex-1">
                      {p.d}
                    </p>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

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
                If you share our values and are exploring long-term partnership, we'd welcome the conversation.
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
    </div>
  );
};

export default GuidingPrinciples;
