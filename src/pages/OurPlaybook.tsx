import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import CinematicHero from '@/components/CinematicHero';
import ScrollRevealText from '@/components/ScrollRevealText';
import CriteriaCarousel from '@/components/CriteriaCarousel';
import StickyCardStack from '@/components/StickyCardStack';

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

const OurPlaybook = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isIndia = region === 'india';

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <section className="relative text-primary-foreground overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end">
        <CinematicHero imageSrc={isIndia ? heroIndiaPlaybook : heroUSPlaybook} overlay="strong" />
        <DarkSectionEffects variant="hero" />
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'Our Playbook, India' : 'Our Playbook'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] text-white max-w-[600px] leading-[1.1] tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              From <span className="text-gold">Sourcing</span> to Value Creation
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[15px] md:text-[16px] text-white/65 leading-[1.75] mt-5 max-w-[480px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
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
      <section className="relative bg-primary text-primary-foreground overflow-x-clip">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-10 md:pt-14 lg:pt-16">
          <FadeIn>
            <SectionLabel light>Deal Process</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-primary-foreground leading-[1.15]">
              How We Evaluate Opportunities
            </h2>
            <GoldRule className="mt-3 mb-6 md:mb-8" />
          </FadeIn>
        </div>
        <div className="relative">
          <StickyCardStack
            cards={evaluationSteps}
            variant="dark"
          />
        </div>
      </section>

      {/* Our Edge — scroll reveal */}
      <ScrollRevealText
        label="Our Edge"
        heading="A disciplined, repeatable framework for building lasting value in every business we partner with."
        highlights={['disciplined', 'lasting']}
        variant="light"
      />

      {/* Value Creation Playbook */}
      <section className="bg-background px-5 md:px-10 lg:px-16 pt-14 md:pt-20 lg:pt-24 pb-14 md:pb-20 lg:pb-24 overflow-x-hidden">
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
          <CriteriaCarousel items={valueCreationItems} />
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
                {isIndia
                  ? 'If you\'re building a business meant to last, we\'d welcome a conversation about partnership.'
                  : 'If you\'re a founder considering your next chapter, we\'d welcome the conversation.'}
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

export default OurPlaybook;
