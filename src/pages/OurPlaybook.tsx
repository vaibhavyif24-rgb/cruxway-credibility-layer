import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { ArrowRight } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import CinematicHero from '@/components/CinematicHero';
import ScrollRevealText from '@/components/ScrollRevealText';
import GlassCard from '@/components/GlassCard';
import WaveBackground from '@/components/WaveBackground';
import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

import heroIndiaPlaybook from '@/assets/hero-india-playbook.jpg';
import heroUSPlaybook from '@/assets/hero-us-playbook.jpg';

const evaluationSteps = [
  { num: '01', title: 'Discovery', description: 'Proprietary networks, trusted adviser relationships, and deep sector immersion surface off-market opportunities long before they reach an auction process. We invest years in building relationships that yield decades of deal flow.' },
  { num: '02', title: 'Evaluation', description: 'Every opportunity is stress-tested across financials, unit economics, customer concentration, competitive positioning, management quality, and cultural alignment. We triangulate data with on-the-ground diligence and reference networks.' },
  { num: '03', title: 'Diligence', description: 'Rigorous financial, operational, legal, regulatory, and commercial analysis with third-party specialists. We model downside scenarios, validate assumptions with industry operators, and build conviction through evidence, not intuition.' },
  { num: '04', title: 'Structuring', description: 'Ownership, governance, incentive alignment, and capital structures engineered for multi-decade compounding. Every term sheet reflects our commitment to permanence over optionality.' },
];

const valueCreationItems = [
  { title: 'Stabilize & Professionalize', desc: 'Implement institutional-grade systems, reporting, and governance from day one.' },
  { title: 'Optimize Operations', desc: 'Drive margin improvement through operational excellence and best-practice deployment.' },
  { title: 'Invest in Growth', desc: 'Deploy capital into organic expansion, adjacent markets, and strategic acquisitions.' },
  { title: 'Compound Value', desc: 'Long-term hold periods allow compounding of operational improvements and market position.' },
];

const StepNavigator = ({ steps, isDark }: { steps: typeof evaluationSteps; isDark: boolean }) => {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  const handleClick = useCallback((i: number) => {
    setActive(i);
  }, []);


  return (
    <div ref={containerRef}>
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`relative min-w-[44px] min-h-[44px] px-4 md:px-5 py-2.5 rounded-sm font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.14em] transition-all duration-300 border overflow-hidden
              ${active === i
                ? 'bg-gold/20 border-gold/40 text-gold shadow-[0_2px_12px_-2px_hsl(var(--gold)/0.2)]'
                : isDark
                  ? 'border-primary-foreground/10 text-primary-foreground/40 hover:border-gold/20 hover:text-primary-foreground/60'
                  : 'border-border/40 text-muted-foreground hover:border-gold/20 hover:text-foreground/70'
              }
            `}
          >
            <span className="relative z-10">
              <span className="text-gold/85 mr-1.5">{step.num}</span>
              <span>{step.title}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
        
        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-14">
          <FadeIn>
            <SectionLabel light={isDark}>{isIndia ? 'Our Playbook, India' : 'Our Playbook'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.2rem)] max-w-[720px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]'}`}>
              From <span className="text-gold">Sourcing</span> to Value Creation
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[480px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)]'}`}>
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
              Our four-phase approach to professionalizing operations and compounding long-term value.
            </p>
            <GoldRule className="mt-3 mb-6 md:mb-8" />
          </FadeIn>
          <ValueCreationChart items={valueCreationItems} isDark={isDark} />
        </div>
      </section>

      {/* CTA */}
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
                  {isIndia
                    ? "If you're building a business meant to last, we'd welcome a conversation about partnership."
                    : "If you're a founder considering your next chapter, we'd welcome the conversation."}
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.1}>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={`/${region}/contact`}
                  className="group relative inline-flex items-center gap-3 font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.16em] border-2 border-gold text-gold px-10 py-5 md:px-12 md:py-6 transition-all duration-300 hover:bg-gold hover:text-white overflow-hidden"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurPlaybook;
