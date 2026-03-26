import { useRef, useState, useEffect } from 'react';
import { GoldRule } from '@/components/ui/Section';

/* ─── Vintage / Art Deco SVG Illustrations ─── */
const GOLD = 'hsl(38, 45%, 55%)';
const GOLD_DIM = 'hsl(38, 35%, 45%)';

const VintageIllustration = ({ index }: { index: number }) => {
  const illustrations: Record<number, React.ReactNode> = {
    /* 0 — Integrity: Compass Rose */
    0: (
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer circle */}
        <circle cx="200" cy="200" r="160" stroke={GOLD} strokeWidth="1.5" opacity="0.3" />
        <circle cx="200" cy="200" r="140" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />
        <circle cx="200" cy="200" r="120" stroke={GOLD} strokeWidth="0.5" opacity="0.15" strokeDasharray="4 4" />
        {/* Compass cardinal lines */}
        <line x1="200" y1="30" x2="200" y2="370" stroke={GOLD} strokeWidth="0.8" opacity="0.25" />
        <line x1="30" y1="200" x2="370" y2="200" stroke={GOLD} strokeWidth="0.8" opacity="0.25" />
        {/* Diagonal lines */}
        <line x1="80" y1="80" x2="320" y2="320" stroke={GOLD} strokeWidth="0.5" opacity="0.15" />
        <line x1="320" y1="80" x2="80" y2="320" stroke={GOLD} strokeWidth="0.5" opacity="0.15" />
        {/* Compass rose points */}
        <polygon points="200,50 210,180 200,170 190,180" fill={GOLD} opacity="0.3" />
        <polygon points="200,350 210,220 200,230 190,220" fill={GOLD_DIM} opacity="0.2" />
        <polygon points="50,200 180,190 170,200 180,210" fill={GOLD} opacity="0.3" />
        <polygon points="350,200 220,190 230,200 220,210" fill={GOLD_DIM} opacity="0.2" />
        {/* Center ornament */}
        <circle cx="200" cy="200" r="8" fill={GOLD} opacity="0.35" />
        <circle cx="200" cy="200" r="3" fill={GOLD} opacity="0.5" />
        {/* Decorative tick marks */}
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i * 10 * Math.PI) / 180;
          const r1 = i % 9 === 0 ? 145 : 155;
          const r2 = 162;
          return <line key={i} x1={200 + r1 * Math.cos(angle)} y1={200 + r1 * Math.sin(angle)} x2={200 + r2 * Math.cos(angle)} y2={200 + r2 * Math.sin(angle)} stroke={GOLD} strokeWidth={i % 9 === 0 ? '1.2' : '0.5'} opacity={i % 9 === 0 ? '0.35' : '0.15'} />;
        })}
      </svg>
    ),

    /* 1 — Servant Leadership: Hands supporting arch */
    1: (
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Arch */}
        <path d="M80 300 Q80 120 200 80 Q320 120 320 300" stroke={GOLD} strokeWidth="1.5" opacity="0.3" fill="none" />
        <path d="M100 300 Q100 140 200 105 Q300 140 300 300" stroke={GOLD} strokeWidth="0.8" opacity="0.2" fill="none" />
        {/* Keystone */}
        <polygon points="190,82 210,82 215,100 185,100" fill={GOLD} opacity="0.25" />
        {/* Support columns */}
        <rect x="72" y="280" width="16" height="60" fill={GOLD} opacity="0.15" rx="2" />
        <rect x="312" y="280" width="16" height="60" fill={GOLD} opacity="0.15" rx="2" />
        {/* Uplifting hands (stylized) */}
        <path d="M130 320 Q140 270 160 250 Q170 240 165 260 Q175 235 170 255 Q180 230 175 252 L185 240 Q180 260 170 280 Q155 310 140 330" stroke={GOLD} strokeWidth="1.2" opacity="0.3" fill="none" />
        <path d="M270 320 Q260 270 240 250 Q230 240 235 260 Q225 235 230 255 Q220 230 225 252 L215 240 Q220 260 230 280 Q245 310 260 330" stroke={GOLD} strokeWidth="1.2" opacity="0.3" fill="none" />
        {/* Radiating lines from keystone */}
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = ((i - 3) * 15 - 90) * (Math.PI / 180);
          return <line key={i} x1={200 + 25 * Math.cos(angle)} y1={90 + 25 * Math.sin(angle)} x2={200 + 60 * Math.cos(angle)} y2={90 + 60 * Math.sin(angle)} stroke={GOLD} strokeWidth="0.6" opacity="0.2" />;
        })}
        {/* Base line */}
        <line x1="60" y1="340" x2="340" y2="340" stroke={GOLD} strokeWidth="1" opacity="0.2" />
        {/* Decorative dots */}
        <circle cx="200" cy="340" r="3" fill={GOLD} opacity="0.3" />
        <circle cx="80" cy="340" r="2" fill={GOLD} opacity="0.2" />
        <circle cx="320" cy="340" r="2" fill={GOLD} opacity="0.2" />
      </svg>
    ),

    /* 2 — Humility: Open book with light rays */
    2: (
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Book pages */}
        <path d="M200 260 Q140 250 80 270 L80 170 Q140 150 200 160 Z" stroke={GOLD} strokeWidth="1.2" opacity="0.3" fill={GOLD} fillOpacity="0.05" />
        <path d="M200 260 Q260 250 320 270 L320 170 Q260 150 200 160 Z" stroke={GOLD} strokeWidth="1.2" opacity="0.3" fill={GOLD} fillOpacity="0.05" />
        {/* Book spine */}
        <line x1="200" y1="155" x2="200" y2="265" stroke={GOLD} strokeWidth="1.5" opacity="0.35" />
        {/* Page lines - left */}
        <line x1="110" y1="185" x2="185" y2="178" stroke={GOLD} strokeWidth="0.4" opacity="0.15" />
        <line x1="105" y1="200" x2="185" y2="192" stroke={GOLD} strokeWidth="0.4" opacity="0.15" />
        <line x1="100" y1="215" x2="185" y2="206" stroke={GOLD} strokeWidth="0.4" opacity="0.15" />
        <line x1="95" y1="230" x2="185" y2="220" stroke={GOLD} strokeWidth="0.4" opacity="0.15" />
        {/* Page lines - right */}
        <line x1="215" y1="178" x2="290" y2="185" stroke={GOLD} strokeWidth="0.4" opacity="0.15" />
        <line x1="215" y1="192" x2="295" y2="200" stroke={GOLD} strokeWidth="0.4" opacity="0.15" />
        <line x1="215" y1="206" x2="300" y2="215" stroke={GOLD} strokeWidth="0.4" opacity="0.15" />
        <line x1="215" y1="220" x2="305" y2="230" stroke={GOLD} strokeWidth="0.4" opacity="0.15" />
        {/* Light rays emanating upward */}
        {Array.from({ length: 11 }).map((_, i) => {
          const angle = ((i - 5) * 14 - 90) * (Math.PI / 180);
          const r1 = 20;
          const r2 = 70 + (i % 2 === 0 ? 15 : 0);
          return <line key={i} x1={200 + r1 * Math.cos(angle)} y1={150 + r1 * Math.sin(angle)} x2={200 + r2 * Math.cos(angle)} y2={150 + r2 * Math.sin(angle)} stroke={GOLD} strokeWidth={i === 5 ? '1' : '0.6'} opacity={i === 5 ? '0.3' : '0.18'} />;
        })}
        {/* Concentric arcs above */}
        <path d="M140 130 Q200 90 260 130" stroke={GOLD} strokeWidth="0.6" opacity="0.15" fill="none" />
        <path d="M160 115 Q200 85 240 115" stroke={GOLD} strokeWidth="0.5" opacity="0.12" fill="none" />
        {/* Small star at top */}
        <circle cx="200" cy="80" r="3" fill={GOLD} opacity="0.3" />
        {/* Base shadow */}
        <ellipse cx="200" cy="275" rx="130" ry="8" fill={GOLD} opacity="0.08" />
      </svg>
    ),

    /* 3 — Grit: Anvil with hammer and sparks */
    3: (
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Anvil body */}
        <path d="M120 240 L130 200 L270 200 L280 240 L310 240 Q320 240 320 250 L320 260 L300 280 L100 280 L80 260 L80 250 Q80 240 90 240 Z" stroke={GOLD} strokeWidth="1.5" opacity="0.3" fill={GOLD} fillOpacity="0.06" />
        {/* Anvil horn */}
        <path d="M270 200 Q310 195 330 210 Q335 215 330 220 L280 240" stroke={GOLD} strokeWidth="1.2" opacity="0.25" fill={GOLD} fillOpacity="0.04" />
        {/* Anvil face top */}
        <line x1="130" y1="200" x2="270" y2="200" stroke={GOLD} strokeWidth="1.8" opacity="0.35" />
        {/* Hammer */}
        <rect x="175" y="120" width="50" height="28" rx="3" stroke={GOLD} strokeWidth="1.2" opacity="0.3" fill={GOLD} fillOpacity="0.08" />
        <line x1="200" y1="148" x2="200" y2="195" stroke={GOLD} strokeWidth="2" opacity="0.25" />
        {/* Sparks */}
        {[
          [160, 175], [175, 165], [150, 160], [230, 170], [245, 165], [255, 175],
          [140, 185], [260, 185], [170, 155], [235, 155],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.5 - (i % 3) * 0.3} fill={GOLD} opacity={0.25 + (i % 3) * 0.1} />
        ))}
        {/* Spark lines */}
        <line x1="185" y1="195" x2="155" y2="170" stroke={GOLD} strokeWidth="0.5" opacity="0.2" />
        <line x1="215" y1="195" x2="245" y2="170" stroke={GOLD} strokeWidth="0.5" opacity="0.2" />
        <line x1="195" y1="195" x2="175" y2="160" stroke={GOLD} strokeWidth="0.4" opacity="0.15" />
        <line x1="205" y1="195" x2="225" y2="160" stroke={GOLD} strokeWidth="0.4" opacity="0.15" />
        {/* Base */}
        <rect x="90" y="280" width="220" height="20" rx="2" stroke={GOLD} strokeWidth="0.8" opacity="0.2" fill={GOLD} fillOpacity="0.04" />
        {/* Ground line */}
        <line x1="60" y1="300" x2="340" y2="300" stroke={GOLD} strokeWidth="0.6" opacity="0.15" />
      </svg>
    ),

    /* 4 — Bias to Action: Arrow through concentric rings */
    4: (
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Concentric rings */}
        <circle cx="220" cy="200" r="120" stroke={GOLD} strokeWidth="0.8" opacity="0.15" />
        <circle cx="220" cy="200" r="95" stroke={GOLD} strokeWidth="0.8" opacity="0.18" />
        <circle cx="220" cy="200" r="70" stroke={GOLD} strokeWidth="1" opacity="0.2" />
        <circle cx="220" cy="200" r="45" stroke={GOLD} strokeWidth="1" opacity="0.25" />
        <circle cx="220" cy="200" r="20" stroke={GOLD} strokeWidth="1.2" opacity="0.3" />
        <circle cx="220" cy="200" r="5" fill={GOLD} opacity="0.35" />
        {/* Arrow shaft */}
        <line x1="60" y1="200" x2="340" y2="200" stroke={GOLD} strokeWidth="2" opacity="0.3" />
        {/* Arrow head */}
        <polygon points="340,200 318,190 318,195 318,205 318,210" fill={GOLD} opacity="0.35" />
        {/* Arrow fletching */}
        <line x1="80" y1="200" x2="65" y2="185" stroke={GOLD} strokeWidth="1.2" opacity="0.25" />
        <line x1="80" y1="200" x2="65" y2="215" stroke={GOLD} strokeWidth="1.2" opacity="0.25" />
        <line x1="90" y1="200" x2="75" y2="183" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />
        <line x1="90" y1="200" x2="75" y2="217" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />
        {/* Speed lines */}
        <line x1="100" y1="175" x2="140" y2="175" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />
        <line x1="110" y1="165" x2="135" y2="165" stroke={GOLD} strokeWidth="0.4" opacity="0.1" />
        <line x1="100" y1="225" x2="140" y2="225" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />
        <line x1="110" y1="235" x2="135" y2="235" stroke={GOLD} strokeWidth="0.4" opacity="0.1" />
        {/* Impact marks at center */}
        <line x1="225" y1="185" x2="230" y2="175" stroke={GOLD} strokeWidth="0.6" opacity="0.2" />
        <line x1="230" y1="188" x2="238" y2="180" stroke={GOLD} strokeWidth="0.6" opacity="0.2" />
        <line x1="225" y1="215" x2="230" y2="225" stroke={GOLD} strokeWidth="0.6" opacity="0.2" />
      </svg>
    ),

    /* 5 — The Golden Rule: Balanced scale */
    5: (
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Central pillar */}
        <rect x="195" y="130" width="10" height="170" fill={GOLD} opacity="0.15" rx="2" />
        {/* Base */}
        <path d="M150 300 L250 300 L240 290 L160 290 Z" fill={GOLD} opacity="0.15" />
        <line x1="140" y1="300" x2="260" y2="300" stroke={GOLD} strokeWidth="1" opacity="0.25" />
        {/* Balance beam */}
        <line x1="80" y1="140" x2="320" y2="140" stroke={GOLD} strokeWidth="2" opacity="0.3" />
        {/* Fulcrum triangle */}
        <polygon points="200,130 190,145 210,145" fill={GOLD} opacity="0.3" />
        {/* Left pan chains */}
        <line x1="100" y1="140" x2="80" y2="200" stroke={GOLD} strokeWidth="0.8" opacity="0.25" />
        <line x1="100" y1="140" x2="120" y2="200" stroke={GOLD} strokeWidth="0.8" opacity="0.25" />
        {/* Left pan */}
        <path d="M65 200 Q100 215 135 200" stroke={GOLD} strokeWidth="1.2" opacity="0.3" fill={GOLD} fillOpacity="0.06" />
        {/* Right pan chains */}
        <line x1="300" y1="140" x2="280" y2="200" stroke={GOLD} strokeWidth="0.8" opacity="0.25" />
        <line x1="300" y1="140" x2="320" y2="200" stroke={GOLD} strokeWidth="0.8" opacity="0.25" />
        {/* Right pan */}
        <path d="M265 200 Q300 215 335 200" stroke={GOLD} strokeWidth="1.2" opacity="0.3" fill={GOLD} fillOpacity="0.06" />
        {/* Interconnected figures (left) */}
        <circle cx="90" cy="190" r="4" fill={GOLD} opacity="0.25" />
        <circle cx="110" cy="190" r="4" fill={GOLD} opacity="0.25" />
        <line x1="94" y1="190" x2="106" y2="190" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />
        {/* Interconnected figures (right) */}
        <circle cx="290" cy="190" r="4" fill={GOLD} opacity="0.25" />
        <circle cx="310" cy="190" r="4" fill={GOLD} opacity="0.25" />
        <line x1="294" y1="190" x2="306" y2="190" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />
        {/* Top ornament */}
        <circle cx="200" cy="125" r="5" fill={GOLD} opacity="0.3" />
        {/* Decorative hash marks on beam */}
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 100 + i * 25;
          return <line key={i} x1={x} y1="137" x2={x} y2="143" stroke={GOLD} strokeWidth="0.5" opacity="0.15" />;
        })}
      </svg>
    ),
  };

  return illustrations[index % 6];
};

interface Principle {
  t: string;
  d: string;
}

interface PrinciplesSliderProps {
  principles: Principle[];
}

/* ─── Constants ─── */
const STICKY_BASE = 80;
const STICKY_STEP = 20;
const CARD_HEIGHT = 'min(85vh, 600px)';

const PrincipleCard: React.FC<{
  principle: Principle;
  index: number;
  total: number;
  stickyTop: number;
}> = ({ principle, index, total, stickyTop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting && entry.intersectionRatio > 0.5),
      { threshold: [0, 0.5, 1], rootMargin: '-10% 0px -30% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mb-6 will-change-transform"
      style={{
        position: 'sticky',
        top: `${stickyTop}px`,
        zIndex: index + 1,
      }}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl"
        style={{
          height: CARD_HEIGHT,
          boxShadow: '0 -6px 24px -4px rgba(0,0,0,0.2), 0 16px 40px -8px rgba(0,0,0,0.18)',
          background: 'linear-gradient(135deg, hsl(25, 15%, 12%) 0%, hsl(30, 12%, 8%) 50%, hsl(20, 18%, 10%) 100%)',
        }}
      >
        {/* Vintage SVG illustration as background */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.6 }}>
          <div className="w-[70%] h-[70%] max-w-[320px] max-h-[320px]">
            <VintageIllustration index={index} />
          </div>
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(25, 15%, 8%) 80%)',
        }} />

        {/* Content — centered */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
          <div className="flex flex-col items-center max-w-[540px]">
            {/* Numbered index */}
            <span
              className="font-serif text-[13px] md:text-[15px] tracking-[0.18em]"
              style={{
                color: 'hsl(38, 45%, 55%, 0.5)',
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.5s ease-out 0.05s, transform 0.5s ease-out 0.05s',
              }}
            >
              {String(index + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(total).padStart(2, '0')}
            </span>

            {/* Title */}
            <h2
              className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.025em] mt-4"
              style={{
                color: '#F8F6F2',
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s',
                textShadow: '0 2px 20px rgba(0,0,0,0.45)',
              }}
            >
              {principle.t}
            </h2>

            {/* Gold rule */}
            <div
              className="my-5 flex justify-center"
              style={{
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.5s ease-out 0.15s',
              }}
            >
              <GoldRule />
            </div>

            {/* Description */}
            <p
              className="font-sans text-[14px] md:text-[17px] leading-[1.85] tracking-[0.01em] max-w-[440px]"
              style={{
                color: 'rgba(248,246,242,0.6)',
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 12}px)`,
                transition: 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s',
                textShadow: '0 1px 10px rgba(0,0,0,0.35)',
              }}
            >
              {principle.d}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrinciplesSlider = ({ principles }: PrinciplesSliderProps) => {
  const total = principles.length;

  return (
    <div className="relative px-5 md:px-10 lg:px-16 pt-6 md:pt-8 pb-10 md:pb-14">
      <div className="max-w-[1080px] mx-auto">
        {principles.map((principle, i) => (
          <PrincipleCard
            key={principle.t}
            principle={principle}
            index={i}
            total={total}
            stickyTop={STICKY_BASE + i * STICKY_STEP}
          />
        ))}
      </div>
    </div>
  );
};

export default PrinciplesSlider;
