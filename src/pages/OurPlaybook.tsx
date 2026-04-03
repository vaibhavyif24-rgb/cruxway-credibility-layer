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
  { num: '01', title: 'Discovery', description: 'Most of our deal flow comes from relationships we\'ve cultivated over many years in our target sectors. When an owner starts thinking about a transition, we want to be someone they already know.' },
  { num: '02', title: 'Evaluation', description: 'We focus first on what could go wrong: customer concentration, key-person risk, competitive threats, and regulatory exposure. Businesses that survive that analysis earn a deeper look.' },
  { num: '03', title: 'Diligence', description: 'Comprehensive financial, legal, and operational analysis with sector-specific specialists. We aim to understand the business as well as the owner does before we make a commitment.' },
  { num: '04', title: 'Structuring', description: 'Aligned incentives between Cruxway and the owner. Governance that fits the size of the company. Conservative leverage. No artificial timelines.' },
];

const valueCreationItems = [
  { title: 'Stabilize & Professionalize', desc: 'Establish financial reporting, build or upgrade the finance function, create governance structures, and set an operating cadence that lets management focus forward.' },
  { title: 'Optimize Operations', desc: 'Identify the operational gaps that limit margin. Renegotiate where needed, streamline where possible, and fix the things the founder never had time to address.' },
  { title: 'Invest in Growth', desc: 'Deploy capital into organic growth, adjacent markets, and add-on acquisitions where the strategic fit is clear and the return case is strong.' },
  { title: 'Compound Value', desc: 'Operational improvements take time to compound. That\'s why we hold. Year three looks different from year one, and year seven looks different again.' },
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6 md:mb-8">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`relative w-full min-h-[48px] px-3 md:px-5 py-3 rounded-sm font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.14em] transition-all duration-300 border overflow-hidden text-center flex items-center justify-center
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
          >
            <GlassCard index={active} hover={false}>
              <div className="p-7 md:p-10">
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
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const ValueCreationChart = ({ items, isDark }: { items: typeof valueCreationItems; isDark: boolean }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const barHeights = isMobile ? [80, 135, 195, 260] : [130, 210, 295, 390];
  const barWidth = isMobile ? 52 : 100;
  const gap = isMobile ? 14 : 40;

  // Calculate SVG points for growth trajectory line
  const totalWidth = barWidth * 4 + gap * 3;
  const chartHeight = isMobile ? 340 : 480;
  const baselineY = chartHeight - 60;
  const points = barHeights.map((h, i) => ({
    x: i * (barWidth + gap) + barWidth / 2,
    y: baselineY - h - 8,
  }));
  const pathD = points.length === 4
    ? `M${points[0].x},${points[0].y} C${points[0].x + gap},${points[0].y} ${points[1].x - gap},${points[1].y} ${points[1].x},${points[1].y} S${points[2].x - gap},${points[2].y} ${points[2].x},${points[2].y} S${points[3].x - gap},${points[3].y} ${points[3].x},${points[3].y}`
    : '';

  return (
    <div className="w-full" ref={containerRef}>
      {/* Chart area */}
      <div className="relative flex justify-center" style={{ height: chartHeight }}>
        {/* SVG growth trajectory line */}
        <svg
          className="absolute pointer-events-none"
          style={{
            width: totalWidth,
            height: chartHeight,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          viewBox={`0 0 ${totalWidth} ${chartHeight}`}
          fill="none"
        >
          <motion.path
            d={pathD}
            stroke={isDark ? 'hsl(43 78% 50% / 0.2)' : 'hsl(43 78% 50% / 0.25)'}
            strokeWidth="1.5"
            strokeDasharray="6 4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        {/* Horizontal baseline with gradient fade */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: 60,
            height: '1.5px',
            background: isDark
              ? 'linear-gradient(90deg, transparent, hsl(43 78% 50% / 0.15) 15%, hsl(43 78% 50% / 0.15) 85%, transparent)'
              : 'linear-gradient(90deg, transparent, hsl(43 78% 50% / 0.2) 15%, hsl(43 78% 50% / 0.2) 85%, transparent)',
          }}
        />

        {/* Bars */}
        <div
          className="absolute left-0 right-0 flex items-end justify-center"
          style={{ bottom: 60, gap }}
        >
          {items.map((item, i) => {
            const isActive = selected === i;
            const isOther = selected !== null && !isActive;

            return (
              <motion.button
                key={i}
                onClick={() => setSelected(prev => prev === i ? null : i)}
                className="flex flex-col items-center cursor-pointer group focus:outline-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isInView ? (isOther ? 0.2 : 1) : 0,
                }}
                transition={{ duration: 0.5, delay: isInView ? i * 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Bar container */}
                <motion.div
                  className="relative rounded-t overflow-hidden"
                  style={{ width: barWidth }}
                  initial={{ height: 0 }}
                  animate={{
                    height: isInView ? (isActive ? barHeights[i] + 16 : barHeights[i]) : 0,
                  }}
                  transition={{
                    height: {
                      type: 'spring',
                      stiffness: 200,
                      damping: 25,
                      delay: isInView ? i * 0.12 : 0,
                    },
                  }}
                >
                  {/* Bar fill: multi-layer gradient + vertical line texture */}
                  <div
                    className="absolute inset-0 rounded-t"
                    style={{
                      background: isActive
                        ? 'linear-gradient(180deg, hsl(43 78% 60%) 0%, hsl(43 78% 42%) 100%)'
                        : isDark
                          ? 'linear-gradient(180deg, hsl(43 78% 50% / 0.30) 0%, hsl(43 78% 50% / 0.08) 100%)'
                          : 'linear-gradient(180deg, hsl(43 78% 50% / 0.35) 0%, hsl(43 78% 50% / 0.12) 100%)',
                      boxShadow: isActive
                        ? '0 0 30px hsl(43 78% 50% / 0.25), inset 0 1px 0 hsl(43 78% 70% / 0.4)'
                        : `0 4px 20px -4px hsl(43 78% 50% / 0.08), inset 0 0 0 1px ${
                            isDark ? 'hsl(43 78% 50% / 0.10)' : 'hsl(43 78% 50% / 0.15)'
                          }`,
                    }}
                  />

                  {/* Vertical line texture */}
                  <div
                    className="absolute inset-0 rounded-t pointer-events-none"
                    style={{
                      background: `repeating-linear-gradient(90deg, transparent, transparent 11px, ${
                        isDark ? 'hsl(43 78% 50% / 0.04)' : 'hsl(43 78% 50% / 0.06)'
                      } 11px, ${
                        isDark ? 'hsl(43 78% 50% / 0.04)' : 'hsl(43 78% 50% / 0.06)'
                      } 12px)`,
                    }}
                  />

                  {/* Top-edge highlight */}
                  <motion.div
                    className="absolute top-0 left-0 right-0"
                    style={{ background: 'hsl(43 78% 50%)' }}
                    animate={{ height: isActive ? 4 : 1.5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />

                  {/* Active shimmer overlay */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(180deg, hsl(43 78% 80% / 0.25) 0%, transparent 40%)',
                      }}
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.div>

                {/* Labels below bar */}
                <div className="mt-3 text-center" style={{ width: isMobile ? 70 : 110 }}>
                  <span
                    className={`block font-sans text-[12px] md:text-[14px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                      isActive ? 'text-gold' : isDark ? 'text-primary-foreground/30' : 'text-foreground/30'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`block font-serif text-[12px] md:text-[13px] mt-1 leading-[1.3] transition-colors duration-300 ${
                      isActive ? 'text-gold' : isDark ? 'text-primary-foreground/35' : 'text-foreground/35'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected phase detail panel */}
      <AnimatePresence mode="wait">
        {selected !== null && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard index={selected} hover={true}>
              <div className="flex">
                {/* Left gold accent strip */}
                <div className="w-[3px] flex-shrink-0 bg-gold/40" />

                <div className="p-7 md:p-10 flex-1 relative">
                  {/* Watermark number */}
                  <span
                    className={`absolute top-2 right-5 font-serif text-[6rem] leading-none select-none pointer-events-none ${
                      isDark ? 'text-primary-foreground/[0.03]' : 'text-foreground/[0.03]'
                    }`}
                  >
                    {String(selected + 1).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-gold block mb-2">
                      Phase {String(selected + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className={`font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] leading-[1.2] tracking-[-0.02em] mb-3 ${
                        isDark ? 'text-primary-foreground' : 'text-foreground'
                      }`}
                    >
                      {items[selected].title}
                    </h3>
                    <div className="w-10 h-[1.5px] bg-gold/25 mb-4" />
                    <p
                      className={`font-sans text-[15px] md:text-[17px] leading-[1.85] max-w-[640px] ${
                        isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'
                      }`}
                    >
                      {items[selected].desc}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
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
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2rem,5vw,3.4rem)] max-w-[720px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]'}`}>
              From <span className="text-gold">Sourcing</span> to Value Creation
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[480px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)]'}`}>
              We have spent our careers partnering with founders who have built industry-leading businesses. We know what separates good from great, and we bring that lens to every deal.
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
            <h2 className={`font-serif text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.15] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
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
        heading="The pattern recognition that comes from years of evaluating and operating businesses in our sectors is something we bring to every new opportunity. It doesn't replace judgment, but it sharpens it."
        highlights={['sharpens']}
        variant="light"
      />

      {/* Value Creation Playbook */}
      <section className="bg-background px-5 md:px-10 lg:px-16 pt-10 md:pt-14 pb-10 md:pb-14 overflow-x-hidden">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Value Creation</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] text-foreground leading-[1.15] mb-2">
              How We Build Value
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] max-w-[540px] mb-4">
              What the work looks like after closing.
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
                  {isIndia ? "Want to Understand Our Approach?" : "Interested in How This Works in Practice?"}
                </h2>
                <p className={`font-sans text-[13px] md:text-[15px] leading-[1.8] ${isDark ? 'text-primary-foreground/55' : 'text-muted-foreground'}`}>
                  {isIndia
                    ? "No two businesses are alike, and neither is our approach to any two deals. If you'd like to discuss how this would work for your company, we're here."
                    : "Every business is different and so is every partnership. If you'd like to understand how our process would apply to your specific situation, reach out."}
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
