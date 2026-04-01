import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { SectionLabel, FadeIn, GoldRule } from '@/components/ui/Section';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import WaveBackground from '@/components/WaveBackground';

const principles = [
  { t: 'Integrity', d: 'We say what we mean and follow through. Transparency and intellectual honesty in every interaction, even when the truth is uncomfortable.' },
  { t: 'Steward Leadership', d: 'Leadership is earned through stewardship, not authority. We succeed when the people and businesses around us succeed.' },
  { t: 'Humility', d: 'The best investors never stop learning. We approach every situation with curiosity and an open mind.' },
  { t: 'Grit', d: 'Building lasting businesses requires perseverance. We do hard things, especially when things get hard.' },
  { t: 'Bias to Action', d: 'Analysis has its place, but progress demands execution. We move decisively and learn in motion.' },
  { t: 'The Golden Rule', d: 'Treat every person, from founder to frontline employee, with respect, fairness, and genuine compassion.' },
];

const CARD_COUNT = principles.length;
const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Mobile Dot Indicator ─── */
const DotIndicator = ({ count, active }: { count: number; active: number }) => (
  <div className="flex items-center justify-center gap-2 mt-5">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="rounded-full transition-all duration-300"
        style={{
          width: i === active ? 8 : 6,
          height: i === active ? 8 : 6,
          background: i === active ? 'hsl(43 78% 50%)' : 'hsl(43 78% 50% / 0.2)',
        }}
      />
    ))}
  </div>
);

const ConvictionsDeck = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* Mobile: track active card via IntersectionObserver */
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardRefs.current[i] = el;
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveMobileIndex(i);
        },
        { threshold: 0.6 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="relative overflow-hidden py-10 px-5">
        {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
        <WaveBackground variant="section" />
        <div className="relative max-w-[1080px] mx-auto mb-8">
          <FadeIn>
            <SectionLabel>What we stand for</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.15] mb-1">
              <span className="text-foreground">Our </span>
              <span className="text-gold">Convictions</span>
            </h2>
            <p className="font-sans text-[14px] text-muted-foreground leading-[1.75] max-w-[480px] mt-2 mb-3">
              Six principles that govern every partnership, every decision, and every relationship we build.
            </p>
            <GoldRule />
          </FadeIn>
        </div>

        {/* Horizontal swipe carousel with edge fades */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-5 z-10 pointer-events-none" style={{ background: isDark ? 'linear-gradient(to right, hsl(228 55% 8%), transparent)' : 'linear-gradient(to right, hsl(40 20% 96%), transparent)' }} />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-5 z-10 pointer-events-none" style={{ background: isDark ? 'linear-gradient(to left, hsl(228 55% 8%), transparent)' : 'linear-gradient(to left, hsl(40 20% 96%), transparent)' }} />

          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-2 px-5 snap-x snap-mandatory scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {principles.map((p, i) => {
              const num = String(i + 1).padStart(2, '0');
              return (
                <motion.div
                  key={i}
                  ref={(el) => setCardRef(el, i)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                  className={`flex-shrink-0 snap-center relative rounded-lg p-6 group ${
                    isDark
                      ? 'backdrop-blur-xl'
                      : 'shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]'
                  }`}
                  style={{
                    width: '82vw',
                    maxWidth: 340,
                    minHeight: 300,
                    background: isDark ? 'hsl(228 55% 10% / 0.6)' : '#ffffff',
                    border: isDark ? '1px solid hsl(43 78% 50% / 0.08)' : undefined,
                    borderLeft: isDark ? undefined : '3px solid hsl(43 78% 50% / 0.25)',
                    boxShadow: isDark ? '0 8px 32px -8px rgba(0,0,0,0.4), 0 0 0 1px hsl(43 78% 50% / 0.05) inset' : undefined,
                  }}
                >
                  {/* Ghost number with gradient */}
                  <span
                    className="absolute top-4 left-5 font-serif select-none pointer-events-none"
                    style={{
                      fontSize: '4rem',
                      lineHeight: 1,
                      background: 'linear-gradient(135deg, hsl(43 78% 50% / 0.15), hsl(43 78% 50% / 0.05))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {num}
                  </span>
                  {/* Gold diamond */}
                  <span className="absolute top-6 right-6 text-gold/20 text-[6px] select-none">◆</span>
                  <div className="relative mt-12">
                    <h3 className="font-serif text-gold text-[1.35rem] leading-[1.25]" style={{ letterSpacing: '-0.01em' }}>{p.t}</h3>
                    <motion.div
                      className="h-[1.5px] bg-gold/40 mt-2.5 mb-3"
                      initial={{ width: 0 }}
                      whileInView={{ width: 40 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease }}
                    />
                    <p className={`font-sans text-[14px] leading-[1.75] ${isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                      {p.d}
                    </p>
                  </div>
                  {/* Light mode warm gradient */}
                  {!isDark && (
                    <div className="absolute inset-0 rounded-lg pointer-events-none" style={{ background: 'linear-gradient(180deg, hsl(43 78% 50% / 0.02) 0%, transparent 30%)' }} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
        <DotIndicator count={CARD_COUNT} active={activeMobileIndex} />
      </section>
    );
  }

  /* ─── Desktop: vertical-scroll → horizontal-translate sticky deck ─── */
  const totalScroll = CARD_COUNT * 0.6;
  const sectionHeight = `${100 + totalScroll * 100}vh`;

  return (
    <section ref={sectionRef} className="relative" style={{ height: sectionHeight }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Ambient effects */}
        <div className="absolute inset-0 pointer-events-none">
          {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
          <WaveBackground variant="section" />
        </div>

        {/* Header */}
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 mb-8 w-full">
          <FadeIn>
            <SectionLabel>What we stand for</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.15] mb-1">
              <span className="text-foreground">Our </span>
              <span className="text-gold">Convictions</span>
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] max-w-[480px] mt-2 mb-2">
              Six principles that govern every partnership, every decision, and every relationship we build.
            </p>
            <GoldRule />
          </FadeIn>
        </div>

        {/* Card track */}
        <div className="relative w-full overflow-hidden">
          <CardTrack scrollYProgress={scrollYProgress} isDark={isDark} />
        </div>
      </div>
    </section>
  );
};

/* ─── Horizontal card track driven by scroll ─── */
const CardTrack = ({
  scrollYProgress,
  isDark,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  isDark: boolean;
}) => {
  const cardW = 380;
  const gap = 24;
  const totalTrackW = CARD_COUNT * (cardW + gap) - gap;
  const viewportOverflow = totalTrackW - (typeof window !== 'undefined' ? window.innerWidth * 0.8 : 1000);
  const translateX = useTransform(scrollYProgress, [0.08, 0.92], [0, -Math.max(0, viewportOverflow)]);

  return (
    <motion.div
      className="flex gap-6 pl-[10vw]"
      style={{ x: translateX, willChange: 'transform' }}
    >
      {principles.map((p, i) => {
        const num = String(i + 1).padStart(2, '0');
        const progress = i / (CARD_COUNT - 1);
        const activeStart = 0.08 + progress * 0.75;
        const activeEnd = activeStart + 0.12;

        return (
          <CardItem
            key={i}
            num={num}
            principle={p}
            isDark={isDark}
            scrollYProgress={scrollYProgress}
            activeStart={activeStart}
            activeEnd={activeEnd}
          />
        );
      })}
    </motion.div>
  );
};

const CardItem = ({
  num,
  principle,
  isDark,
  scrollYProgress,
  activeStart,
  activeEnd,
}: {
  num: string;
  principle: { t: string; d: string };
  isDark: boolean;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  activeStart: number;
  activeEnd: number;
}) => {
  const scale = useTransform(
    scrollYProgress,
    [activeStart - 0.05, activeStart, activeEnd, activeEnd + 0.05],
    [0.97, 1, 1, 0.97]
  );
  const glowOpacity = useTransform(
    scrollYProgress,
    [activeStart - 0.05, activeStart, activeEnd, activeEnd + 0.05],
    [0, 1, 1, 0]
  );
  const brightness = useTransform(
    scrollYProgress,
    [activeStart - 0.05, activeStart, activeEnd, activeEnd + 0.05],
    isDark ? [0.92, 1, 1, 0.92] : [0.98, 1, 1, 0.98]
  );
  const borderColor = useTransform(
    scrollYProgress,
    [activeStart - 0.05, activeStart, activeEnd, activeEnd + 0.05],
    isDark
      ? ['hsl(43 78% 50% / 0.08)', 'hsl(43 78% 50% / 0.25)', 'hsl(43 78% 50% / 0.25)', 'hsl(43 78% 50% / 0.08)']
      : ['hsl(43 78% 50% / 0.25)', 'hsl(43 78% 50% / 0.5)', 'hsl(43 78% 50% / 0.5)', 'hsl(43 78% 50% / 0.25)']
  );

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`flex-shrink-0 relative rounded-lg p-7 group transition-shadow duration-300 ${
        isDark ? 'backdrop-blur-xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: 380,
        height: 420,
        scale,
        filter: useTransform(brightness, v => `brightness(${v})`),
        willChange: 'transform',
        background: isDark ? 'hsl(228 55% 10% / 0.6)' : '#ffffff',
        borderLeft: isDark ? 'none' : '3px solid hsl(43 78% 50% / 0.25)',
        border: isDark ? '1px solid hsl(43 78% 50% / 0.08)' : undefined,
        borderColor: isDark ? borderColor : undefined,
        boxShadow: isDark
          ? isHovered
            ? '0 12px 40px -8px rgba(0,0,0,0.5), 0 0 20px hsl(43 78% 50% / 0.08)'
            : '0 8px 32px -8px rgba(0,0,0,0.4), 0 0 0 1px hsl(43 78% 50% / 0.05) inset'
          : isHovered
            ? '0 8px 32px -6px rgba(0,0,0,0.08)'
            : '0 4px 24px -6px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Gold top-edge glow for active card */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-lg"
        style={{
          opacity: glowOpacity,
          background: 'linear-gradient(90deg, transparent, hsl(43 78% 50% / 0.6), transparent)',
          boxShadow: '0 0 12px hsl(43 78% 50% / 0.15)',
        }}
      />

      {/* Shimmer sweep on hover */}
      {isHovered && (
        <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 animate-shimmer-sweep"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(43 78% 50% / 0.04), transparent)' }}
          />
        </div>
      )}

      {/* Light mode warm gradient overlay */}
      {!isDark && (
        <div className="absolute inset-0 rounded-lg pointer-events-none" style={{ background: 'linear-gradient(180deg, hsl(43 78% 50% / 0.02) 0%, transparent 30%)' }} />
      )}

      {/* Ghost number with gradient */}
      <span
        className="absolute top-5 left-6 font-serif select-none pointer-events-none"
        style={{
          fontSize: '4rem',
          lineHeight: 1,
          background: 'linear-gradient(135deg, hsl(43 78% 50% / 0.15), hsl(43 78% 50% / 0.05))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {num}
      </span>

      {/* Gold diamond ornament */}
      <span className="absolute top-6 right-6 text-gold/20 text-[6px] select-none pointer-events-none">◆</span>

      <div className="relative mt-16">
        <h3 className="font-serif text-gold text-[1.4rem] leading-[1.25]" style={{ letterSpacing: '-0.01em' }}>{principle.t}</h3>
        <motion.div
          className="h-[1.5px] bg-gold/40 mt-3 mb-4"
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        />
        <p className={`font-sans text-[14px] md:text-[15px] leading-[1.75] ${isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
          {principle.d}
        </p>
      </div>
    </motion.div>
  );
};

export default ConvictionsDeck;
