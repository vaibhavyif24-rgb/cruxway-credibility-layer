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
        { t: 'Market Focus', d: 'The ₹10Cr–₹100Cr revenue segment, where professionalizing operations creates outsized returns relative to capital deployed.' },
        { t: 'Founder-First Terms', d: 'Structures built around the founder\'s priorities: team continuity, personal legacy, and flexibility on involvement.' },
        { t: 'Operational Involvement', d: 'Governance, financial controls, reporting, and working capital optimization, implemented on the ground alongside the existing team.' },
        { t: 'Capital Discipline', d: 'Cash-flow-first thinking, conservative leverage, and capital deployed where the return case is clearest.' },
      ]
    : [
        { t: 'Hold Period', d: 'We invest against an opportunity, not a fund timeline. Some positions may be held for a decade or longer.' },
        { t: 'Sector Specificity', d: 'Regulated, compliance-driven industries where switching costs are high and demand is not discretionary. We stay narrow deliberately.' },
        { t: 'Operational Involvement', d: 'We work inside the business: building the finance function, creating reporting cadences, and professionalizing operations alongside management.' },
        { t: 'Capital Discipline', d: 'Conservative structures. Returns from growing the business, not from leverage. We model the downside first.' },
      ];

  const principles = [
    { t: 'Integrity', d: 'Say what we mean. Follow through. Even when the honest answer is not the comfortable one.' },
    { t: 'Steward Leadership', d: 'We measure ourselves by what happens to the people and businesses we work with, not by what we extract.' },
    { t: 'Humility', d: 'Every founder we sit across from has built something we haven\'t. The best thing we can do first is listen.' },
    { t: 'Grit', d: 'The real work of improving a business is detailed and unglamorous. We signed up for that part too.' },
    { t: 'Bias to Action', d: 'Analysis is valuable up to a point. After that, you have to move.' },
    { t: 'The Golden Rule', d: 'Treat every person with respect and fairness. Founder, employee, partner. No exceptions, no qualifications.' },
  ];

  return (
    <div style={{ overflowX: 'clip' }}>
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
              {isIndia ? <>An Investment Philosophy Built for India's <span className="text-gold">Industrial Middle Market</span></> : <>An Approach Shaped by Experience, Refined by <span className="text-gold">Conviction</span></>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[460px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)]'}`}>
              {isIndia
                ? 'An approach shaped at global firms and focused on India\'s founder-led industrial companies, where operational improvement creates disproportionate value.'
                : 'We spent our early careers at large institutions, studying what makes businesses succeed and fail. Cruxway was built to apply those lessons to a part of the market we believe deserves better.'}
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
            ? 'India\'s strongest companies have been built by families and founders with deep industry knowledge. What many of them need next is capital that comes with the right operating systems.'
            : 'The companies we invest in don\'t need a new strategy. They need someone who understands what\'s already working and can build the infrastructure around it.'
        }
        highlights={isIndia ? ['families', 'founders'] : ['already', 'working']}
        subtext={
          isIndia
            ? 'Majority positions. Founder-aligned structures. A commitment that extends well beyond the typical investment horizon.'
            : 'Preserve what the founder built. Professionalize what holds it back. Hold it for as long as the opportunity warrants.'
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
              What a Partnership Looks Like
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
            The Principles Behind Every Decision
          </h2>
          <GoldRule />
        </FadeIn>
        <motion.div
          className="h-px mt-4 origin-left"
          style={{ background: 'linear-gradient(90deg, hsl(43 78% 50% / 0.3), transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
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
                <p className={`font-sans text-[13px] md:text-[15px] leading-[1.8] ${isDark ? 'text-primary-foreground/55' : 'text-muted-foreground'}`}>
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
