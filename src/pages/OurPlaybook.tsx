import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import CinematicHero from '@/components/CinematicHero';
import ScrollRevealText from '@/components/ScrollRevealText';
import GlassCard from '@/components/GlassCard';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import heroIndiaPlaybook from '@/assets/hero-india-playbook.jpg';
import heroUSPlaybook from '@/assets/hero-us-playbook.jpg';

const evaluationSteps = [
  { num: '01', title: 'Discovery', description: 'We go beyond deal brokers. Our proprietary networks and deep sector relationships surface opportunities that never reach a market process.' },
  { num: '02', title: 'Evaluation', description: 'Strategic fit, market position, culture alignment, and growth vectors. Every dimension is assessed with institutional rigour before we proceed.' },
  { num: '03', title: 'Diligence', description: 'Deep financial, operational, legal, and commercial analysis. We leave no stone unturned because conviction requires evidence.' },
  { num: '04', title: 'Structuring', description: 'Ownership, governance, and capital structures designed for decades, not exits. Every term reflects our commitment to lasting partnership.' },
];

const valueCreationItems = [
  { title: 'Stabilise & Professionalise', desc: 'Implement institutional-grade systems, reporting, and governance from day one.' },
  { title: 'Optimise Operations', desc: 'Drive margin improvement through operational excellence and best-practice deployment.' },
  { title: 'Invest in Growth', desc: 'Deploy capital into organic expansion, adjacent markets, and strategic acquisitions.' },
  { title: 'Compound Value', desc: 'Long-term hold periods allow compounding of operational improvements and market position.' },
];

const StepNavigator = ({ steps, isDark }: { steps: typeof evaluationSteps; isDark: boolean }) => {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`min-w-[44px] min-h-[44px] px-4 md:px-5 py-2.5 rounded-sm font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.14em] transition-all duration-300 border
              ${active === i
                ? 'bg-gold/15 border-gold/40 text-gold shadow-[0_2px_12px_-2px_hsl(var(--gold)/0.2)]'
                : isDark
                  ? 'border-primary-foreground/10 text-primary-foreground/40 hover:border-gold/20 hover:text-primary-foreground/60'
                  : 'border-border/40 text-muted-foreground hover:border-gold/20 hover:text-foreground/70'
              }
            `}
          >
            <span className="text-gold/60 mr-1.5">{step.num}</span>
            <span className="hidden sm:inline">{step.title}</span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-sm border p-7 md:p-10 ${
              isDark
                ? 'border-primary-foreground/10 bg-primary-foreground/[0.03]'
                : 'border-[hsl(38,15%,90%)]/50 bg-[hsl(40,20%,98%)]/80'
            }`}
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/40 mb-3 block">
              Step {steps[active].num}
            </span>
            <h3 className={`font-serif text-[clamp(1.2rem,2.2vw,1.6rem)] leading-[1.2] tracking-[-0.02em] mb-4 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              {steps[active].title}
            </h3>
            <div className="w-10 h-[1.5px] bg-gold/25 mb-4" />
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] max-w-[600px] ${isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
              {steps[active].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const OurPlaybook = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isIndia = region === 'india';

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <section className={`relative overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
        <CinematicHero imageSrc={isIndia ? heroIndiaPlaybook : heroUSPlaybook} overlay="strong" />
        <WaveBackground variant="hero" />
        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-14">
          <FadeIn>
            <SectionLabel light={isDark}>{isIndia ? 'Our Playbook, India' : 'Our Playbook'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.6rem)] max-w-[600px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground'}`}>
              From <span className="text-gold">Sourcing</span> to Value Creation
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[480px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground'}`}>
              A disciplined, repeatable process for identifying exceptional businesses and building lasting value alongside management teams.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* How We Evaluate Opportunities */}
      <section className={`relative overflow-x-clip ${
        isDark ? 'bg-primary text-primary-foreground' : 'bg-[hsl(40,18%,96%)] text-foreground border-y border-[hsl(38,12%,90%)]'
      }`}>
        {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-10 md:pt-14 pb-10 md:pb-14">
          <FadeIn>
            <SectionLabel light={isDark}>Deal Process</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.15] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              How We Evaluate Opportunities
            </h2>
            <GoldRule className="mt-3 mb-6 md:mb-8" />
          </FadeIn>
          <StepNavigator steps={evaluationSteps} isDark={isDark} />
        </div>
      </section>

      {/* Our Edge */}
      <ScrollRevealText
        label="Our Edge"
        heading="A disciplined, repeatable framework for building lasting value in every business we partner with."
        highlights={['disciplined', 'lasting']}
        variant="light"
      />

      {/* Value Creation Playbook */}
      <section className="bg-background px-5 md:px-10 lg:px-16 pt-10 md:pt-14 pb-10 md:pb-14 overflow-x-hidden">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Value Creation</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-foreground leading-[1.15] mb-2">
              How We Build Value
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] max-w-[540px] mb-4">
              Our four-phase approach to professionalising operations and compounding long-term value.
            </p>
            <GoldRule className="mt-3 mb-6 md:mb-8" />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {valueCreationItems.map((item, i) => (
              <GlassCard key={i} index={i} variant={isDark ? 'dark' : 'light'}>
                <div className="p-6 md:p-7">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/40 mb-2 block">
                    Phase {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-[1.25rem] text-foreground leading-[1.2] tracking-[-0.02em] mb-3">
                    {item.title}
                  </h3>
                  <div className="w-8 h-[1.5px] bg-gold/25 mb-3" />
                  <p className="font-sans text-[1rem] text-muted-foreground leading-[1.75]">
                    {item.desc}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`relative overflow-hidden px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-14 ${
        isDark ? 'hero-gradient-animated text-primary-foreground' : 'bg-[hsl(38,16%,92%)] text-foreground border-t border-gold/10'
      }`}>
        <WaveBackground variant="section" />
        {isDark ? <DarkSectionEffects variant="cta" /> : <LightSectionEffects variant="cta" />}
        <div className="relative max-w-[1080px] mx-auto">
          <div className="max-w-[540px]">
            <FadeIn>
              <SectionLabel light={isDark}>Connect</SectionLabel>
              <h2 className={`font-serif text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.15] mb-4 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                {isIndia ? 'Partner With Us in India' : 'Start a Conversation'}
              </h2>
              <p className={`font-sans text-[15px] md:text-[16px] leading-[1.8] mb-6 ${isDark ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                {isIndia
                  ? 'If you\'re building a business meant to last, we\'d welcome a conversation about partnership.'
                  : 'If you\'re a founder considering your next chapter, we\'d welcome the conversation.'}
              </p>
              <Link
                to={`/${region}/contact`}
                className={`btn-premium inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-8 py-3.5 border transition-all duration-300 ${
                  isDark
                    ? 'border-primary-foreground/[0.1] text-primary-foreground/50 hover:border-gold/30 hover:text-primary-foreground/75'
                    : 'border-border text-muted-foreground hover:border-gold/30 hover:text-foreground'
                }`}
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

export default OurPlaybook;
