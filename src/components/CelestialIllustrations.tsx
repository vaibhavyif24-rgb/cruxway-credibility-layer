import React from 'react';

/* ─── Palette ─── */
const GOLD = 'hsl(38, 55%, 60%)';
const GOLD_DIM = 'hsl(38, 40%, 45%)';
const WARM_WHITE = 'hsl(40, 30%, 85%)';
const NAVY_DEEP = 'hsl(225, 45%, 5%)';

/* ─── Shared: procedural star field ─── */
const starSeed = (count: number, seed: number) => {
  const stars: { x: number; y: number; r: number; o: number }[] = [];
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 9301 + 49297) % 233280;
    const x = (s / 233280) * 800;
    s = (s * 9301 + 49297) % 233280;
    const y = (s / 233280) * 600;
    s = (s * 9301 + 49297) % 233280;
    const r = 0.4 + (s / 233280) * 1.4;
    s = (s * 9301 + 49297) % 233280;
    const o = 0.15 + (s / 233280) * 0.45;
    stars.push({ x, y, r, o });
  }
  return stars;
};

const StarField = React.memo(({ seed, count = 60 }: { seed: number; count?: number }) => (
  <>
    {starSeed(count, seed).map((s, i) => (
      <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={WARM_WHITE} opacity={s.o} />
    ))}
  </>
));
StarField.displayName = 'StarField';

/* ═══════════════════════════════════════════════════════════
   0 — INTEGRITY: Celestial Compass Rose
   ═══════════════════════════════════════════════════════════ */
const IntegrityIllustration = React.forwardRef<SVGSVGElement>((_, ref) => (
  <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="int-nebula" cx="50%" cy="35%" r="45%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.12" />
        <stop offset="60%" stopColor={GOLD_DIM} stopOpacity="0.04" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="int-star-glow" cx="50%" cy="12%" r="20%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.25" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="800" height="600" fill="url(#int-nebula)" />
    <rect width="800" height="600" fill="url(#int-star-glow)" />

    <StarField seed={42} count={70} />

    <circle cx="400" cy="300" r="220" stroke={GOLD} strokeWidth="0.6" opacity="0.15" />
    <circle cx="400" cy="300" r="200" stroke={GOLD} strokeWidth="0.4" opacity="0.1" strokeDasharray="6 6" />
    <circle cx="400" cy="300" r="180" stroke={GOLD} strokeWidth="0.3" opacity="0.08" />

    <line x1="400" y1="60" x2="400" y2="540" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />
    <line x1="160" y1="300" x2="640" y2="300" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />

    <line x1="230" y1="130" x2="570" y2="470" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />
    <line x1="570" y1="130" x2="230" y2="470" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />

    <polygon points="400,80 412,270 400,255 388,270" fill={GOLD} opacity="0.25" />
    <polygon points="400,520 412,330 400,345 388,330" fill={GOLD_DIM} opacity="0.15" />
    <polygon points="180,300 370,288 355,300 370,312" fill={GOLD} opacity="0.25" />
    <polygon points="620,300 430,288 445,300 430,312" fill={GOLD_DIM} opacity="0.15" />

    <polygon points="260,150 380,280 370,275 375,285" fill={GOLD} opacity="0.12" />
    <polygon points="540,150 420,280 430,275 425,285" fill={GOLD} opacity="0.12" />
    <polygon points="260,450 380,320 370,325 375,315" fill={GOLD} opacity="0.12" />
    <polygon points="540,450 420,320 430,325 425,315" fill={GOLD} opacity="0.12" />

    {Array.from({ length: 36 }).map((_, i) => {
      const angle = (i * 10 * Math.PI) / 180;
      const r1 = i % 9 === 0 ? 205 : 215;
      const r2 = 224;
      return (
        <line key={i} x1={400 + r1 * Math.cos(angle)} y1={300 + r1 * Math.sin(angle)}
          x2={400 + r2 * Math.cos(angle)} y2={300 + r2 * Math.sin(angle)}
          stroke={GOLD} strokeWidth={i % 9 === 0 ? '1' : '0.4'} opacity={i % 9 === 0 ? '0.3' : '0.12'} />
      );
    })}

    <circle cx="400" cy="300" r="12" fill={GOLD} opacity="0.2" />
    <circle cx="400" cy="300" r="5" fill={GOLD} opacity="0.4" />

    <circle cx="400" cy="72" r="4" fill={GOLD} opacity="0.6" />
    <circle cx="400" cy="72" r="10" fill={GOLD} opacity="0.1" />
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      return (
        <line key={`ray-${i}`} x1={400 + 6 * Math.cos(angle)} y1={72 + 6 * Math.sin(angle)}
          x2={400 + 22 * Math.cos(angle)} y2={72 + 22 * Math.sin(angle)}
          stroke={GOLD} strokeWidth="0.8" opacity="0.35" />
      );
    })}

    {[[400, 80], [400, 520], [180, 300], [620, 300]].map(([cx, cy], i) => (
      <circle key={`cd-${i}`} cx={cx} cy={cy} r="3" fill={WARM_WHITE} opacity="0.4" />
    ))}
  </svg>
));
IntegrityIllustration.displayName = 'IntegrityIllustration';

/* ═══════════════════════════════════════════════════════════
   1 — SERVANT LEADERSHIP: Constellation Arch with Figure
   ═══════════════════════════════════════════════════════════ */
const LeadershipIllustration = React.forwardRef<SVGSVGElement>((_, ref) => (
  <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="lead-glow" cx="50%" cy="30%" r="40%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.15" />
        <stop offset="70%" stopColor={GOLD_DIM} stopOpacity="0.03" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="lead-keystone" cx="50%" cy="25%" r="15%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.3" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="800" height="600" fill="url(#lead-glow)" />
    <rect width="800" height="600" fill="url(#lead-keystone)" />

    <StarField seed={137} count={65} />

    <path d="M140 480 Q140 180 400 100 Q660 180 660 480" stroke={GOLD} strokeWidth="1.2" opacity="0.25" fill="none" />
    <path d="M180 480 Q180 210 400 140 Q620 210 620 480" stroke={GOLD} strokeWidth="0.6" opacity="0.15" fill="none" />
    <path d="M220 480 Q220 240 400 175 Q580 240 580 480" stroke={GOLD} strokeWidth="0.4" opacity="0.1" fill="none" strokeDasharray="8 6" />

    {[
      [140, 480], [180, 350], [220, 260], [300, 170], [400, 130], [500, 170],
      [580, 260], [620, 350], [660, 480],
    ].map(([cx, cy], i) => (
      <React.Fragment key={`arch-${i}`}>
        <circle cx={cx} cy={cy} r="3" fill={GOLD} opacity="0.4" />
        <circle cx={cx} cy={cy} r="8" fill={GOLD} opacity="0.06" />
      </React.Fragment>
    ))}

    <line x1="140" y1="480" x2="220" y2="260" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />
    <line x1="220" y1="260" x2="400" y2="130" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />
    <line x1="400" y1="130" x2="580" y2="260" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />
    <line x1="580" y1="260" x2="660" y2="480" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />

    <circle cx="400" cy="100" r="6" fill={GOLD} opacity="0.5" />
    <circle cx="400" cy="100" r="20" fill={GOLD} opacity="0.08" />

    {Array.from({ length: 9 }).map((_, i) => {
      const angle = ((i - 4) * 18 - 90) * (Math.PI / 180);
      return (
        <line key={i} x1={400 + 12 * Math.cos(angle)} y1={100 + 12 * Math.sin(angle)}
          x2={400 + 55 * Math.cos(angle)} y2={100 + 55 * Math.sin(angle)}
          stroke={GOLD} strokeWidth="0.6" opacity="0.18" />
      );
    })}

    <path d="M395 520 Q395 505 400 495 Q405 505 405 520 Z" fill={GOLD} opacity="0.3" />
    <circle cx="400" cy="488" r="6" fill={GOLD} opacity="0.25" />
    <line x1="393" y1="505" x2="382" y2="498" stroke={GOLD} strokeWidth="1" opacity="0.2" />
    <line x1="407" y1="505" x2="418" y2="498" stroke={GOLD} strokeWidth="1" opacity="0.2" />

    <rect x="135" y="460" width="10" height="40" fill={GOLD} opacity="0.1" rx="2" />
    <rect x="655" y="460" width="10" height="40" fill={GOLD} opacity="0.1" rx="2" />

    <line x1="100" y1="530" x2="700" y2="530" stroke={GOLD} strokeWidth="0.5" opacity="0.1" />
  </svg>
));
LeadershipIllustration.displayName = 'LeadershipIllustration';

/* ═══════════════════════════════════════════════════════════
   2 — HUMILITY: Spiral Galaxy with Cliff Figure
   ═══════════════════════════════════════════════════════════ */
const HumilityIllustration = () => (
  <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="hum-nebula" cx="45%" cy="40%" r="50%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.1" />
        <stop offset="40%" stopColor={GOLD_DIM} stopOpacity="0.05" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="800" height="600" fill="url(#hum-nebula)" />
    <StarField seed={271} count={75} />

    {[0, 1, 2, 3, 4].map(layer => {
      const r0 = 20 + layer * 35;
      const turns = 1.8 - layer * 0.15;
      const pts: string[] = [];
      for (let t = 0; t <= turns * 2 * Math.PI; t += 0.08) {
        const radius = r0 + t * 18;
        const x = 360 + radius * Math.cos(t + layer * 0.5);
        const y = 270 + radius * Math.sin(t + layer * 0.5) * 0.75;
        pts.push(`${x},${y}`);
      }
      return (
        <polyline key={`spiral-${layer}`} points={pts.join(' ')}
          stroke={layer % 2 === 0 ? GOLD : GOLD_DIM}
          strokeWidth={1.2 - layer * 0.15}
          opacity={0.22 - layer * 0.03}
          fill="none" strokeLinecap="round" />
      );
    })}

    <circle cx="360" cy="270" r="30" fill={GOLD} opacity="0.08" />
    <circle cx="360" cy="270" r="12" fill={GOLD} opacity="0.15" />
    <circle cx="360" cy="270" r="4" fill={GOLD} opacity="0.35" />

    {starSeed(30, 888).map((s, i) => {
      const angle = (i * 0.6);
      const radius = 60 + i * 6;
      const x = 360 + radius * Math.cos(angle);
      const y = 270 + radius * Math.sin(angle) * 0.75;
      return <circle key={`nd-${i}`} cx={x} cy={y} r={s.r * 0.7} fill={GOLD} opacity={s.o * 0.5} />;
    })}

    <path d="M620 600 L620 440 Q625 430 635 420 L640 415 Q642 410 650 405 L660 395 Q665 390 670 388 L680 600 Z"
      fill={NAVY_DEEP} opacity="0.9" />
    <path d="M620 600 L620 440 Q625 430 635 420 L640 415 Q642 410 650 405 L660 395 Q665 390 670 388"
      stroke={GOLD} strokeWidth="0.8" opacity="0.2" fill="none" />

    <path d="M648 398 Q648 386 652 378 Q656 386 656 398 Z" fill={GOLD} opacity="0.3" />
    <circle cx="652" cy="372" r="5" fill={GOLD} opacity="0.25" />

    <circle cx="630" cy="350" r="2" fill={WARM_WHITE} opacity="0.5" />
    <circle cx="610" cy="360" r="1.5" fill={WARM_WHITE} opacity="0.4" />
    <circle cx="640" cy="330" r="1.8" fill={GOLD} opacity="0.45" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   3 — GRIT: The Anvil & Hammer (Forging Through Adversity)
   ═══════════════════════════════════════════════════════════ */
const GritIllustration = () => (
  <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="grit-strike" cx="50%" cy="48%" r="25%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.22" />
        <stop offset="50%" stopColor={GOLD_DIM} stopOpacity="0.06" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="grit-ingot" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.4" />
        <stop offset="100%" stopColor={GOLD_DIM} stopOpacity="0.1" />
      </radialGradient>
    </defs>

    <rect width="800" height="600" fill="url(#grit-strike)" />
    <StarField seed={503} count={70} />

    {/* Anvil silhouette — classic horn shape */}
    <path
      d="M330 380 L330 340 Q330 320 350 310 L360 305 L360 290 L440 290 L440 305 L450 310 Q470 320 470 340 L470 380 L500 380 Q510 380 510 390 L510 410 Q510 420 500 420 L300 420 Q290 420 290 410 L290 390 Q290 380 300 380 Z"
      stroke={GOLD} strokeWidth="1.2" opacity="0.35" fill={GOLD} fillOpacity="0.06" strokeLinejoin="round"
    />
    {/* Anvil horn (left) */}
    <path d="M330 340 Q310 335 280 340 Q260 345 250 355" stroke={GOLD} strokeWidth="1" opacity="0.25" fill="none" strokeLinecap="round" />
    {/* Anvil base platform */}
    <rect x="310" y="420" width="180" height="20" rx="3" fill={GOLD} fillOpacity="0.05" stroke={GOLD} strokeWidth="0.6" opacity="0.2" />

    {/* Hammer — mid-strike above anvil */}
    <path d="M365 230 L370 200 L375 195 Q380 190 390 188 L420 186 Q432 186 435 192 L438 200 L443 230 Z"
      stroke={GOLD} strokeWidth="1" opacity="0.3" fill={GOLD} fillOpacity="0.08" strokeLinejoin="round" />
    {/* Hammer handle */}
    <line x1="400" y1="230" x2="395" y2="280" stroke={GOLD} strokeWidth="2" opacity="0.25" strokeLinecap="round" />

    {/* Glowing ingot on anvil */}
    <rect x="378" y="292" width="44" height="14" rx="2" fill="url(#grit-ingot)" opacity="0.6" />
    <rect x="378" y="292" width="44" height="14" rx="2" stroke={GOLD} strokeWidth="0.6" opacity="0.3" fill="none" />

    {/* Radial spark burst from impact point */}
    {Array.from({ length: 28 }).map((_, i) => {
      const angle = (i * 13 + 5) * (Math.PI / 180);
      const dist = 30 + (i % 4) * 18 + (i % 3) * 10;
      const x = 400 + dist * Math.cos(angle - Math.PI / 2);
      const y = 285 + dist * Math.sin(angle - Math.PI / 2) * 0.6;
      const r = 0.6 + (i % 3) * 0.5;
      const o = 0.45 - (dist / 120) * 0.25;
      return <circle key={`spark-${i}`} cx={x} cy={y} r={r} fill={GOLD} opacity={Math.max(o, 0.08)} />;
    })}

    {/* Spark trails — radiating lines */}
    {[[-30, -45], [25, -50], [-15, -55], [35, -40], [0, -60], [-40, -30], [45, -35]].map(([dx, dy], i) => (
      <line key={`st-${i}`} x1="400" y1="285" x2={400 + dx * 1.8} y2={285 + dy * 1.2}
        stroke={GOLD} strokeWidth="0.5" opacity={0.18 - i * 0.015} />
    ))}

    {/* Horizontal pressure strata below anvil */}
    {[455, 470, 488, 505, 520, 538, 555].map((y, i) => (
      <line key={`strata-${i}`} x1={200 + i * 12} y1={y} x2={600 - i * 12} y2={y}
        stroke={GOLD} strokeWidth={0.5 - i * 0.04} opacity={0.12 - i * 0.012} />
    ))}

    {/* Ground line */}
    <line x1="120" y1="570" x2="680" y2="570" stroke={GOLD} strokeWidth="0.5" opacity="0.08" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   4 — BIAS TO ACTION: The Arrow Released (Decisive Motion)
   ═══════════════════════════════════════════════════════════ */
const ActionIllustration = () => (
  <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="act-target" cx="82%" cy="42%" r="20%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.18" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="arrow-trail" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0" />
        <stop offset="30%" stopColor={GOLD} stopOpacity="0.08" />
        <stop offset="100%" stopColor={GOLD} stopOpacity="0.4" />
      </linearGradient>
    </defs>

    <rect width="800" height="600" fill="url(#act-target)" />
    <StarField seed={619} count={65} />

    {/* Bow silhouette — left side */}
    <path d="M185 210 Q145 300 185 390" stroke={GOLD} strokeWidth="1.8" opacity="0.3" fill="none" strokeLinecap="round" />
    {/* Bowstring — just released, still vibrating */}
    <line x1="185" y1="210" x2="185" y2="390" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />
    {/* Vibration echo lines */}
    <path d="M188 220 Q198 300 188 380" stroke={GOLD} strokeWidth="0.4" opacity="0.1" fill="none" />
    <path d="M191 230 Q200 300 191 370" stroke={GOLD} strokeWidth="0.3" opacity="0.06" fill="none" />
    {/* Bow grip */}
    <ellipse cx="150" cy="300" rx="8" ry="14" stroke={GOLD} strokeWidth="0.8" opacity="0.15" fill={GOLD} fillOpacity="0.03" />

    {/* Arrow in flight — angled slightly upward toward target */}
    <line x1="350" y1="282" x2="530" y2="262" stroke={GOLD} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    {/* Arrowhead */}
    <polygon points="530,262 540,255 545,260 536,264 545,268 540,273" fill={GOLD} opacity="0.45" />
    {/* Fletching at tail */}
    <polygon points="350,282 342,275 348,280" fill={GOLD} opacity="0.2" />
    <polygon points="350,282 342,289 348,284" fill={GOLD} opacity="0.2" />

    {/* Luminous trail from bow to arrow */}
    <path d="M190 300 Q270 290 350 282" stroke="url(#arrow-trail)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d="M220 298 Q280 290 340 284" stroke={GOLD} strokeWidth="0.5" opacity="0.08" fill="none" />

    {/* Motion lines ahead of arrowhead */}
    <line x1="552" y1="255" x2="575" y2="250" stroke={GOLD} strokeWidth="0.7" opacity="0.2" />
    <line x1="550" y1="262" x2="580" y2="258" stroke={GOLD} strokeWidth="0.5" opacity="0.15" />
    <line x1="548" y1="270" x2="572" y2="268" stroke={GOLD} strokeWidth="0.7" opacity="0.2" />

    {/* Distant target star — right side */}
    <circle cx="660" cy="248" r="5" fill={GOLD} opacity="0.5" />
    <circle cx="660" cy="248" r="14" fill={GOLD} opacity="0.08" />
    <circle cx="660" cy="248" r="28" fill={GOLD} opacity="0.03" />

    {/* Concentric target rings dissolving into constellation */}
    <circle cx="660" cy="248" r="45" stroke={GOLD} strokeWidth="0.7" opacity="0.15" />
    <circle cx="660" cy="248" r="70" stroke={GOLD} strokeWidth="0.5" opacity="0.1" strokeDasharray="5 4" />
    <circle cx="660" cy="248" r="100" stroke={GOLD} strokeWidth="0.3" opacity="0.06" strokeDasharray="3 6" />

    {/* Constellation dots where rings dissolve */}
    {[
      [705, 205], [715, 260], [695, 310], [625, 195], [610, 295],
      [720, 185], [740, 245], [630, 330], [580, 200], [590, 310],
    ].map(([cx, cy], i) => (
      <circle key={`cd-${i}`} cx={cx} cy={cy} r="1.8" fill={WARM_WHITE} opacity={0.3 - i * 0.02} />
    ))}
    {/* Constellation lines from dissolving rings */}
    <line x1="705" y1="205" x2="720" y2="185" stroke={GOLD} strokeWidth="0.4" opacity="0.1" />
    <line x1="715" y1="260" x2="740" y2="245" stroke={GOLD} strokeWidth="0.4" opacity="0.1" />
    <line x1="695" y1="310" x2="630" y2="330" stroke={GOLD} strokeWidth="0.4" opacity="0.08" />
    <line x1="625" y1="195" x2="580" y2="200" stroke={GOLD} strokeWidth="0.4" opacity="0.08" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   5 — THE GOLDEN RULE: Mirror of Reciprocity
   ═══════════════════════════════════════════════════════════ */
const GoldenRuleIllustration = () => (
  <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="gr-orb" cx="50%" cy="45%" r="20%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.3" />
        <stop offset="40%" stopColor={GOLD} stopOpacity="0.1" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="gr-ambient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.08" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="800" height="600" fill="url(#gr-ambient)" />
    <StarField seed={777} count={60} />

    {/* Overhead arc — bridge of mutual regard */}
    <path d="M250 320 Q250 120 400 100 Q550 120 550 320" stroke={GOLD} strokeWidth="0.7" opacity="0.15" fill="none" />
    <path d="M270 320 Q270 150 400 130 Q530 150 530 320" stroke={GOLD} strokeWidth="0.4" opacity="0.08" fill="none" strokeDasharray="5 4" />

    {/* Left figure silhouette — facing right */}
    <circle cx="260" cy="280" r="12" fill={GOLD} fillOpacity="0.08" stroke={GOLD} strokeWidth="0.8" opacity="0.25" />
    <path d="M260 292 L260 370 M260 310 L245 340 M260 310 L280 330 M260 370 L248 420 M260 370 L272 420"
      stroke={GOLD} strokeWidth="1.2" opacity="0.25" strokeLinecap="round" />
    {/* Extended hand toward center */}
    <line x1="280" y1="330" x2="320" y2="310" stroke={GOLD} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <circle cx="322" cy="309" r="2" fill={GOLD} opacity="0.35" />

    {/* Right figure silhouette — facing left (mirrored) */}
    <circle cx="540" cy="280" r="12" fill={GOLD} fillOpacity="0.08" stroke={GOLD} strokeWidth="0.8" opacity="0.25" />
    <path d="M540 292 L540 370 M540 310 L555 340 M540 310 L520 330 M540 370 L552 420 M540 370 L528 420"
      stroke={GOLD} strokeWidth="1.2" opacity="0.25" strokeLinecap="round" />
    {/* Extended hand toward center */}
    <line x1="520" y1="330" x2="480" y2="310" stroke={GOLD} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <circle cx="478" cy="309" r="2" fill={GOLD} opacity="0.35" />

    {/* Central radiant orb */}
    <rect width="800" height="600" fill="url(#gr-orb)" />
    <circle cx="400" cy="290" r="22" fill={GOLD} opacity="0.06" />
    <circle cx="400" cy="290" r="14" fill={GOLD} opacity="0.1" />
    <circle cx="400" cy="290" r="6" fill={GOLD} opacity="0.4" />

    {/* Sacred geometry — hexagonal pattern around orb */}
    {Array.from({ length: 6 }).map((_, i) => {
      const a1 = (i * 60) * (Math.PI / 180);
      const a2 = ((i + 1) * 60) * (Math.PI / 180);
      const r = 40;
      return (
        <line key={`hex-${i}`}
          x1={400 + r * Math.cos(a1)} y1={290 + r * Math.sin(a1)}
          x2={400 + r * Math.cos(a2)} y2={290 + r * Math.sin(a2)}
          stroke={GOLD} strokeWidth="0.5" opacity="0.15" />
      );
    })}
    {/* Outer hexagon */}
    {Array.from({ length: 6 }).map((_, i) => {
      const a1 = (i * 60 + 30) * (Math.PI / 180);
      const a2 = ((i + 1) * 60 + 30) * (Math.PI / 180);
      const r = 62;
      return (
        <line key={`hex2-${i}`}
          x1={400 + r * Math.cos(a1)} y1={290 + r * Math.sin(a1)}
          x2={400 + r * Math.cos(a2)} y2={290 + r * Math.sin(a2)}
          stroke={GOLD} strokeWidth="0.3" opacity="0.08" />
      );
    })}

    {/* Constellation lines from each figure's hand to the orb */}
    <line x1="322" y1="309" x2="386" y2="290" stroke={GOLD} strokeWidth="0.6" opacity="0.18" />
    <line x1="478" y1="309" x2="414" y2="290" stroke={GOLD} strokeWidth="0.6" opacity="0.18" />
    <line x1="280" y1="330" x2="360" y2="290" stroke={GOLD} strokeWidth="0.3" opacity="0.08" strokeDasharray="3 3" />
    <line x1="520" y1="330" x2="440" y2="290" stroke={GOLD} strokeWidth="0.3" opacity="0.08" strokeDasharray="3 3" />

    {/* Stardust between figures */}
    {starSeed(25, 555).map((s, i) => {
      const x = 340 + (s.x / 800) * 120;
      const y = 260 + (s.y / 600) * 80;
      return <circle key={`dust-${i}`} cx={x} cy={y} r={s.r * 0.6} fill={GOLD} opacity={s.o * 0.5} />;
    })}

    {/* Balanced beam / fulcrum — fairness symbol */}
    <line x1="320" y1="460" x2="480" y2="460" stroke={GOLD} strokeWidth="1" opacity="0.18" strokeLinecap="round" />
    <polygon points="400,455 393,468 407,468" fill={GOLD} opacity="0.2" />
    {/* Equal weight indicators */}
    <circle cx="340" cy="458" r="3" fill={GOLD} opacity="0.12" />
    <circle cx="460" cy="458" r="3" fill={GOLD} opacity="0.12" />
    <line x1="340" y1="460" x2="340" y2="472" stroke={GOLD} strokeWidth="0.5" opacity="0.1" />
    <line x1="460" y1="460" x2="460" y2="472" stroke={GOLD} strokeWidth="0.5" opacity="0.1" />
    <rect x="330" y="472" width="20" height="6" rx="1" fill={GOLD} opacity="0.06" />
    <rect x="450" y="472" width="20" height="6" rx="1" fill={GOLD} opacity="0.06" />
  </svg>
);

/* ─── Export map ─── */
const illustrations = [
  IntegrityIllustration,
  LeadershipIllustration,
  HumilityIllustration,
  GritIllustration,
  ActionIllustration,
  GoldenRuleIllustration,
];

const CelestialIllustration = React.memo(({ index }: { index: number }) => {
  const Comp = illustrations[index % illustrations.length];
  return <Comp />;
});

CelestialIllustration.displayName = 'CelestialIllustration';

export default CelestialIllustration;
