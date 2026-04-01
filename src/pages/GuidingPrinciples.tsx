import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { ArrowRight } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import CinematicHero from '@/components/CinematicHero';
import CruxwayOriginStory from '@/components/CruxwayOriginStory';
import ConvictionsDeck from '@/components/ConvictionsDeck';
import WaveBackground from '@/components/WaveBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

import heroIndiaPrinciples from '@/assets/hero-india-principles.jpg';
import heroUSPrinciples from '@/assets/hero-us-principles.jpg';

const GuidingPrinciples = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isIndia = region === 'india';
  const isDark = theme === 'dark';

  return (
    <div style={{ overflowX: 'clip' }}>
      {/* ═══ Hero with CinematicHero ═══ */}
      <section className={`relative overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
        <CinematicHero imageSrc={isIndia ? heroIndiaPrinciples : heroUSPrinciples} overlay="strong" />

        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}

        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-14">
          <FadeIn>
            <SectionLabel light={isDark}>{isIndia ? 'Our Identity, India' : 'Our Identity'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.6rem)] max-w-[540px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]'}`}>
              The Name. The <span className="text-gold">Conviction</span>. The Way.
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[460px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)]'}`}>
              How we named ourselves, what we believe, and why it matters in every decision we make.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Transition bridge with intro heading into origin story */}
      <div
        className="relative -mt-1 pointer-events-none"
        style={{
          zIndex: 5,
        }}
      >
        {/* Gradient from hero into dark origin section */}
        <div
          className="h-16 md:h-20"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, hsl(228 55% 8%), hsl(228 55% 6%))'
              : 'linear-gradient(to bottom, hsl(40 25% 96%), hsl(228 40% 10%))',
          }}
        />
        {/* Intro label area */}
        <div
          className="flex flex-col items-center justify-center py-8 md:py-12 pointer-events-auto"
          style={{
            background: isDark ? 'hsl(228 55% 6%)' : 'hsl(228 40% 10%)',
          }}
        >
          <motion.p
            className="font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.32em] text-gold/70 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Origin Story
          </motion.p>
          <motion.div
            className="h-[1px] w-[40px] md:w-[56px] bg-gold/25"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ transformOrigin: 'center' }}
          />
          <motion.p
            className="font-sans text-[12px] md:text-[13px] leading-[1.7] text-white/40 mt-3 text-center max-w-[340px] px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Every name carries weight. Ours was forged with intent.
          </motion.p>
        </div>
      </div>

      {/* Naming Story */}
      <CruxwayOriginStory />

      {/* Convictions Deck */}
      <ConvictionsDeck />

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
