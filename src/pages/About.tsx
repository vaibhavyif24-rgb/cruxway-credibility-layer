import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { ArrowRight } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import ApproachTable from '@/components/ApproachTable';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import CinematicHero from '@/components/CinematicHero';
import PrinciplesSlider from '@/components/PrinciplesSlider';
import ScrollRevealText from '@/components/ScrollRevealText';
import WaveBackground from '@/components/WaveBackground';
import { motion } from 'framer-motion';

import heroIndiaAbout from '@/assets/hero-india-about.jpg';
import heroUSAbout from '@/assets/hero-us-about.jpg';

const About = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isIndia = region === 'india';
  const isDark = theme === 'dark';

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
    { t: 'Integrity', d: 'We say what we mean and follow through. Transparency and intellectual honesty in every interaction, even when the truth is uncomfortable.' },
    { t: 'Steward Leadership', d: 'Leadership is earned through stewardship, not authority. We succeed when the people and businesses around us succeed.' },
    { t: 'Humility', d: 'The best investors never stop learning. We approach every situation with curiosity and an open mind.' },
    { t: 'Grit', d: 'Building lasting businesses requires perseverance. We do hard things, especially when things get hard.' },
    { t: 'Bias to Action', d: 'Analysis has its place, but progress demands execution. We move decisively and learn in motion.' },
    { t: 'The Golden Rule', d: 'Treat every person, from founder to frontline employee, with respect, fairness, and genuine compassion.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className={`relative overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
        <CinematicHero imageSrc={isIndia ? heroIndiaAbout : heroUSAbout} overlay="strong" />
        
        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-14">
          <FadeIn>
            <SectionLabel light={isDark}>{isIndia ? 'About, India' : 'About'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.6rem)] max-w-[540px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]'}`}>
              {isIndia ? <>Building Enduring Value Across <span className="text-gold">India</span></> : <>Investing Tailored to Each <span className="text-gold">Company's Needs</span></>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[460px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)]'}`}>
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

      {/* Mission */}
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
            : 'Our role is to honor that legacy while bringing the resources, systems, and capital to take these companies to the next level.'
        }
        variant="light"
      />

      {/* Our Approach — dark/light responsive */}
      <section className={`relative overflow-hidden ${
        isDark ? 'bg-primary text-primary-foreground' : 'bg-[hsl(40,18%,96%)] text-foreground border-y border-[hsl(38,12%,90%)]'
      }`}>
        {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14">
          <FadeIn>
            <SectionLabel light={isDark}>Our Approach</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] leading-[1.15] max-w-[480px] mb-2 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              How We Partner With Founders
            </h2>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>
          <ApproachTable items={approach} variant={isDark ? 'dark' : 'light'} />
        </div>
      </section>

      {/* Principles */}
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-10 md:pt-14">
        <FadeIn>
          <SectionLabel>Principles</SectionLabel>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] text-foreground leading-[1.15] mb-3">
            What We Stand For
          </h2>
          <GoldRule />
        </FadeIn>
      </div>
      <PrinciplesSlider principles={principles} />

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
                  Built for Owners Thinking Long-Term
                </h2>
                <p className={`font-sans text-[13px] md:text-[15px] leading-[1.8] ${isDark ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                  {isIndia
                    ? "If you're building a business meant to last in India, we'd welcome a conversation about partnership."
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
                  Start a Conversation
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

export default About;
