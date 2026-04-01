import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { SectionLabel, FadeIn, GoldRule } from '@/components/ui/Section';

const principles = [
  { t: 'Integrity', d: 'We say what we mean and follow through. Transparency and intellectual honesty in every interaction, even when the truth is uncomfortable.' },
  { t: 'Steward Leadership', d: 'Leadership is earned through stewardship, not authority. We succeed when the people and businesses around us succeed.' },
  { t: 'Humility', d: 'The best investors never stop learning. We approach every situation with curiosity and an open mind.' },
  { t: 'Grit', d: 'Building lasting businesses requires perseverance. We do hard things, especially when things get hard.' },
  { t: 'Bias to Action', d: 'Analysis has its place, but progress demands execution. We move decisively and learn in motion.' },
  { t: 'The Golden Rule', d: 'Treat every person, from founder to frontline employee, with respect, fairness, and genuine compassion.' },
];

const CARD_COUNT = principles.length;

const ConvictionsDeck = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  if (isMobile) {
    return (
      <section className="py-10 px-5">
        <div className="max-w-[1080px] mx-auto mb-8">
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

        {/* Horizontal swipe carousel */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 px-5 snap-x snap-mandatory scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {principles.map((p, i) => {
            const num = String(i + 1).padStart(2, '0');
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`flex-shrink-0 snap-center relative rounded-lg p-6 ${
                  isDark
                    ? 'border border-gold/10 bg-[hsl(228_55%_12%/0.7)] backdrop-blur-md'
                    : 'bg-white border border-gold/[0.08] shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06)]'
                }`}
                style={{
                  width: '85vw',
                  maxWidth: 380,
                  height: 360,
                  ...(isDark ? {} : { borderLeft: '3px solid hsl(43 78% 50% / 0.3)' }),
                }}
              >
                <span
                  className="absolute top-4 left-5 font-serif text-gold select-none pointer-events-none"
                  style={{ fontSize: '4rem', lineHeight: 1, opacity: isDark ? 0.08 : 0.1 }}
                >
                  {num}
                </span>
                <div className="relative mt-12">
                  <h3 className="font-serif text-gold text-[1.35rem] leading-[1.25]">{p.t}</h3>
                  <div className="h-[1.5px] w-10 bg-gold/40 mt-2.5 mb-3" />
                  <p className={`font-sans text-[14px] leading-[1.75] ${isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                    {p.d}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  }

  /* ─── Desktop: vertical-scroll → horizontal-translate sticky deck ─── */
  const totalScroll = CARD_COUNT * 0.6;
  const sectionHeight = `${100 + totalScroll * 100}vh`;

  return (
    <section ref={sectionRef} className="relative" style={{ height: sectionHeight }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 mb-8 w-full">
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
    [0.96, 1, 1, 0.96]
  );
  const borderOpacity = useTransform(
    scrollYProgress,
    [activeStart - 0.05, activeStart, activeEnd, activeEnd + 0.05],
    [0.1, 0.35, 0.35, 0.1]
  );

  return (
    <motion.div
      className={`flex-shrink-0 relative rounded-lg p-7 ${
        isDark
          ? 'backdrop-blur-md'
          : 'shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06)]'
      }`}
      style={{
        width: 380,
        height: 420,
        scale,
        willChange: 'transform',
        background: isDark ? 'hsl(228 55% 12% / 0.7)' : '#ffffff',
        borderLeft: isDark ? 'none' : '3px solid hsl(43 78% 50% / 0.3)',
        border: isDark ? '1px solid hsl(43 78% 50% / 0.1)' : undefined,
      }}
    >
      {/* Ghost number */}
      <span
        className="absolute top-5 left-6 font-serif text-gold select-none pointer-events-none"
        style={{ fontSize: '4rem', lineHeight: 1, opacity: isDark ? 0.08 : 0.12 }}
      >
        {num}
      </span>

      <div className="relative mt-16">
        <h3 className="font-serif text-gold text-[1.4rem] leading-[1.25]">{principle.t}</h3>
        <div className="h-[1.5px] w-10 bg-gold/40 mt-3 mb-4" />
        <p className={`font-sans text-[14px] md:text-[15px] leading-[1.75] ${isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
          {principle.d}
        </p>
      </div>
    </motion.div>
  );
};

export default ConvictionsDeck;
