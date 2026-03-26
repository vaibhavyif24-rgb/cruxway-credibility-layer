import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import ApproachTable from '@/components/ApproachTable';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import CinematicHero from '@/components/CinematicHero';
import PrinciplesSlider from '@/components/PrinciplesSlider';
import ScrollRevealText from '@/components/ScrollRevealText';
import { motion } from 'framer-motion';

import heroIndiaAbout from '@/assets/hero-india-about.jpg';
import heroUSAbout from '@/assets/hero-us-about.jpg';

const About = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const approach = isIndia
    ? [
        { t: 'Low Market Focus', d: 'High-potential businesses where operational improvement unlocks outsized returns.' },
        { t: 'Founder Alignment', d: 'Partnerships designed around the founder\'s vision and growth timeline.' },
        { t: 'Operational Partnership', d: 'Driving meaningful, sustainable outcomes across Indian markets.' },
        { t: 'Disciplined Capital', d: 'Capital allocated toward highest-return uses with discipline.' },
      ]
    : [
        { t: 'Long-Term Alignment', d: 'Hold periods designed around the growth opportunity. Patient capital by design.' },
        { t: 'Essential Services', d: 'Regulated industries where trust and deep relationships create lasting advantages.' },
        { t: 'Operational Partnership', d: 'Professionalising operations and driving sustainable growth alongside management.' },
        { t: 'Disciplined Capital', d: 'Protecting downside and investing for long-term upside.' },
      ];

  const principles = [
    { t: 'Integrity', d: 'Transparency and intellectual honesty in every interaction.' },
    { t: 'Servant Leadership', d: 'Earn trust through service, not authority.' },
    { t: 'Humility', d: 'Stay curious. Never stop learning.' },
    { t: 'Grit', d: 'Do hard things, especially when things get hard.' },
    { t: 'Bias to Action', d: 'Execute decisively. Speed matters.' },
    { t: 'The Golden Rule', d: 'Treat people with respect, fairness, and compassion.' },
  ];

  return (
    <div>
      {/* Hero — distinct region-specific cinematic photo */}
      <section className="relative text-primary-foreground overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end">
        <CinematicHero imageSrc={isIndia ? heroIndiaAbout : heroUSAbout} overlay="strong" />
        <DarkSectionEffects variant="hero" />
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'About, India' : 'About'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] text-white max-w-[540px] leading-[1.1] tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              {isIndia ? <>Building Enduring Value Across <span className="text-gold">India</span></> : <>Investing Tailored to Each <span className="text-gold">Company's Needs</span></>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[15px] md:text-[16px] text-white/65 leading-[1.75] mt-5 max-w-[460px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
              {isIndia
                ? 'Long-term capital and operational expertise for India\'s most promising founder-led companies.'
                : 'Combining long-term capital with operating expertise to help business owners build lasting institutions.'}
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
            ? 'Scale what India builds. Preserve what founders value. Long-term capital for companies meant to last.'
            : 'Preserve what founders built. Scale what matters. Long-term capital with operating expertise.'
        }
        highlights={isIndia ? ['India', 'founders'] : ['founders', 'Scale']}
        subtext={
          isIndia
            ? 'Cruxway invests in and takes majority stakes in founder-led companies across India\'s essential sectors.'
            : 'Our role is to honour that legacy while bringing the resources, systems, and capital to take these companies to the next level.'
        }
        variant="light"
      />

      {/* Our Approach — dark */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <FadeIn>
            <SectionLabel light>Our Approach</SectionLabel>
            <h2 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] text-primary-foreground leading-[1.15] max-w-[480px] mb-2">
              How We Partner With Founders
            </h2>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>
          <ApproachTable items={approach} variant="dark" />
        </div>
      </section>

      {/* Principles — Scroll-triggered vertical slider */}
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-12 md:pt-16">
        <FadeIn>
          <SectionLabel>Our Values</SectionLabel>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] text-foreground leading-[1.15] mb-3">
            What Guides Us
          </h2>
          <GoldRule />
        </FadeIn>
      </div>
      <PrinciplesSlider principles={principles} />

      {/* CTA */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <DarkSectionEffects variant="cta" />
        <div className="relative max-w-[1080px] mx-auto">
          <div className="max-w-[540px]">
            <FadeIn>
              <SectionLabel light>Connect</SectionLabel>
              <h2 className="font-serif text-[clamp(1.4rem,3vw,2.2rem)] text-primary-foreground leading-[1.15] mb-4">
                Built for Owners Thinking Long-Term
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/50 leading-[1.8] mb-6">
                {isIndia
                  ? 'If you\'re building a business meant to last in India, we\'d welcome a conversation about partnership.'
                  : 'If you\'re a founder considering your next chapter, we\'d welcome the conversation.'}
              </p>
              <Link
                to={`/${region}/contact`}
                className="btn-premium inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-8 py-3.5 border border-primary-foreground/[0.1] text-primary-foreground/50 hover:border-gold/30 hover:text-primary-foreground/75 transition-all duration-300"
              >
                Start a Conversation
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
