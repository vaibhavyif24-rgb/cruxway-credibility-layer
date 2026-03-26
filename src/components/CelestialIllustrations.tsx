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

const StarField = ({ seed, count = 60 }: { seed: number; count?: number }) => (
  <>
    {starSeed(count, seed).map((s, i) => (
      <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={WARM_WHITE} opacity={s.o} />
    ))}
  </>
);

/* ═══════════════════════════════════════════════════════════
   0 — INTEGRITY: Celestial Compass Rose
   ═══════════════════════════════════════════════════════════ */
const IntegrityIllustration = () => (
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

    {/* Nebula glow */}
    <rect width="800" height="600" fill="url(#int-nebula)" />
    <rect width="800" height="600" fill="url(#int-star-glow)" />

    <StarField seed={42} count={70} />

    {/* Outer compass circles */}
    <circle cx="400" cy="300" r="220" stroke={GOLD} strokeWidth="0.6" opacity="0.15" />
    <circle cx="400" cy="300" r="200" stroke={GOLD} strokeWidth="0.4" opacity="0.1" strokeDasharray="6 6" />
    <circle cx="400" cy="300" r="180" stroke={GOLD} strokeWidth="0.3" opacity="0.08" />

    {/* Cardinal constellation lines */}
    <line x1="400" y1="60" x2="400" y2="540" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />
    <line x1="160" y1="300" x2="640" y2="300" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />

    {/* Diagonal constellation lines */}
    <line x1="230" y1="130" x2="570" y2="470" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />
    <line x1="570" y1="130" x2="230" y2="470" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />

    {/* Compass rose petals */}
    <polygon points="400,80 412,270 400,255 388,270" fill={GOLD} opacity="0.25" />
    <polygon points="400,520 412,330 400,345 388,330" fill={GOLD_DIM} opacity="0.15" />
    <polygon points="180,300 370,288 355,300 370,312" fill={GOLD} opacity="0.25" />
    <polygon points="620,300 430,288 445,300 430,312" fill={GOLD_DIM} opacity="0.15" />

    {/* Diagonal petals (smaller) */}
    <polygon points="260,150 380,280 370,275 375,285" fill={GOLD} opacity="0.12" />
    <polygon points="540,150 420,280 430,275 425,285" fill={GOLD} opacity="0.12" />
    <polygon points="260,450 380,320 370,325 375,315" fill={GOLD} opacity="0.12" />
    <polygon points="540,450 420,320 430,325 425,315" fill={GOLD} opacity="0.12" />

    {/* Tick marks around outer ring */}
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

    {/* Center ornament */}
    <circle cx="400" cy="300" r="12" fill={GOLD} opacity="0.2" />
    <circle cx="400" cy="300" r="5" fill={GOLD} opacity="0.4" />

    {/* Radiant north star */}
    <circle cx="400" cy="72" r="4" fill={GOLD} opacity="0.6" />
    <circle cx="400" cy="72" r="10" fill={GOLD} opacity="0.1" />
    {/* Star rays */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      return (
        <line key={`ray-${i}`} x1={400 + 6 * Math.cos(angle)} y1={72 + 6 * Math.sin(angle)}
          x2={400 + 22 * Math.cos(angle)} y2={72 + 22 * Math.sin(angle)}
          stroke={GOLD} strokeWidth="0.8" opacity="0.35" />
      );
    })}

    {/* Constellation connector dots at cardinal ends */}
    {[[400, 80], [400, 520], [180, 300], [620, 300]].map(([cx, cy], i) => (
      <circle key={`cd-${i}`} cx={cx} cy={cy} r="3" fill={WARM_WHITE} opacity="0.4" />
    ))}
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   1 — SERVANT LEADERSHIP: Constellation Arch with Figure
   ═══════════════════════════════════════════════════════════ */
const LeadershipIllustration = () => (
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

    {/* Grand arch — constellation lines */}
    <path d="M140 480 Q140 180 400 100 Q660 180 660 480" stroke={GOLD} strokeWidth="1.2" opacity="0.25" fill="none" />
    <path d="M180 480 Q180 210 400 140 Q620 210 620 480" stroke={GOLD} strokeWidth="0.6" opacity="0.15" fill="none" />
    <path d="M220 480 Q220 240 400 175 Q580 240 580 480" stroke={GOLD} strokeWidth="0.4" opacity="0.1" fill="none" strokeDasharray="8 6" />

    {/* Arch constellation nodes */}
    {[
      [140, 480], [180, 350], [220, 260], [300, 170], [400, 130], [500, 170],
      [580, 260], [620, 350], [660, 480],
    ].map(([cx, cy], i) => (
      <React.Fragment key={`arch-${i}`}>
        <circle cx={cx} cy={cy} r="3" fill={GOLD} opacity="0.4" />
        <circle cx={cx} cy={cy} r="8" fill={GOLD} opacity="0.06" />
      </React.Fragment>
    ))}

    {/* Constellation lines between nodes */}
    <line x1="140" y1="480" x2="220" y2="260" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />
    <line x1="220" y1="260" x2="400" y2="130" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />
    <line x1="400" y1="130" x2="580" y2="260" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />
    <line x1="580" y1="260" x2="660" y2="480" stroke={GOLD} strokeWidth="0.5" opacity="0.12" />

    {/* Keystone glow */}
    <circle cx="400" cy="100" r="6" fill={GOLD} opacity="0.5" />
    <circle cx="400" cy="100" r="20" fill={GOLD} opacity="0.08" />

    {/* Radiating lines from keystone */}
    {Array.from({ length: 9 }).map((_, i) => {
      const angle = ((i - 4) * 18 - 90) * (Math.PI / 180);
      return (
        <line key={i} x1={400 + 12 * Math.cos(angle)} y1={100 + 12 * Math.sin(angle)}
          x2={400 + 55 * Math.cos(angle)} y2={100 + 55 * Math.sin(angle)}
          stroke={GOLD} strokeWidth="0.6" opacity="0.18" />
      );
    })}

    {/* Figure silhouette at base looking up */}
    <path d="M395 520 Q395 505 400 495 Q405 505 405 520 Z" fill={GOLD} opacity="0.3" />
    <circle cx="400" cy="488" r="6" fill={GOLD} opacity="0.25" />
    {/* Arms reaching slightly up */}
    <line x1="393" y1="505" x2="382" y2="498" stroke={GOLD} strokeWidth="1" opacity="0.2" />
    <line x1="407" y1="505" x2="418" y2="498" stroke={GOLD} strokeWidth="1" opacity="0.2" />

    {/* Supporting columns */}
    <rect x="135" y="460" width="10" height="40" fill={GOLD} opacity="0.1" rx="2" />
    <rect x="655" y="460" width="10" height="40" fill={GOLD} opacity="0.1" rx="2" />

    {/* Ground line */}
    <line x1="100" y1="530" x2="700" y2="530" stroke={GOLD} strokeWidth="0.5" opacity="0.1" />
  </svg>
);

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

    {/* Van Gogh spiral galaxy — multiple concentric spirals */}
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

    {/* Inner glow of galaxy center */}
    <circle cx="360" cy="270" r="30" fill={GOLD} opacity="0.08" />
    <circle cx="360" cy="270" r="12" fill={GOLD} opacity="0.15" />
    <circle cx="360" cy="270" r="4" fill={GOLD} opacity="0.35" />

    {/* Scattered nebula dots along spiral arms */}
    {starSeed(30, 888).map((s, i) => {
      const angle = (i * 0.6);
      const radius = 60 + i * 6;
      const x = 360 + radius * Math.cos(angle);
      const y = 270 + radius * Math.sin(angle) * 0.75;
      return <circle key={`nd-${i}`} cx={x} cy={y} r={s.r * 0.7} fill={GOLD} opacity={s.o * 0.5} />;
    })}

    {/* Cliff / rocky outcrop silhouette on right */}
    <path d="M620 600 L620 440 Q625 430 635 420 L640 415 Q642 410 650 405 L660 395 Q665 390 670 388 L680 600 Z"
      fill={NAVY_DEEP} opacity="0.9" />
    <path d="M620 600 L620 440 Q625 430 635 420 L640 415 Q642 410 650 405 L660 395 Q665 390 670 388"
      stroke={GOLD} strokeWidth="0.8" opacity="0.2" fill="none" />

    {/* Figure on cliff */}
    <path d="M648 398 Q648 386 652 378 Q656 386 656 398 Z" fill={GOLD} opacity="0.3" />
    <circle cx="652" cy="372" r="5" fill={GOLD} opacity="0.25" />

    {/* Stars near figure — wonder effect */}
    <circle cx="630" cy="350" r="2" fill={WARM_WHITE} opacity="0.5" />
    <circle cx="610" cy="360" r="1.5" fill={WARM_WHITE} opacity="0.4" />
    <circle cx="640" cy="330" r="1.8" fill={GOLD} opacity="0.45" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   3 — GRIT: Mountain Peak with Constellation & Sparks
   ═══════════════════════════════════════════════════════════ */
const GritIllustration = () => (
  <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="grit-glow" cx="50%" cy="30%" r="35%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.12" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="grit-mtn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={GOLD_DIM} stopOpacity="0.15" />
        <stop offset="100%" stopColor={NAVY_DEEP} stopOpacity="0.95" />
      </linearGradient>
    </defs>

    <rect width="800" height="600" fill="url(#grit-glow)" />
    <StarField seed={503} count={70} />

    {/* Mountain range silhouette */}
    <path d="M0 600 L100 500 L180 540 L260 450 L340 490 L400 320 L460 480 L520 420 L600 470 L680 510 L760 460 L800 490 L800 600 Z"
      fill="url(#grit-mtn)" opacity="0.8" />
    {/* Mountain ridge line */}
    <path d="M0 600 L100 500 L180 540 L260 450 L340 490 L400 320 L460 480 L520 420 L600 470 L680 510 L760 460 L800 490"
      stroke={GOLD} strokeWidth="1" opacity="0.25" fill="none" />

    {/* Secondary range */}
    <path d="M0 600 L150 520 L250 550 L350 500 L420 540 L500 510 L600 530 L700 500 L800 530 L800 600 Z"
      fill={NAVY_DEEP} opacity="0.5" />

    {/* Peak star / summit glow */}
    <circle cx="400" cy="310" r="5" fill={GOLD} opacity="0.5" />
    <circle cx="400" cy="310" r="18" fill={GOLD} opacity="0.08" />

    {/* Constellation pattern above peak */}
    {[
      [350, 200], [380, 160], [420, 150], [460, 170], [440, 220],
      [370, 240], [400, 100], [320, 180], [480, 200],
    ].map(([cx, cy], i) => (
      <circle key={`gc-${i}`} cx={cx} cy={cy} r="2.5" fill={GOLD} opacity="0.35" />
    ))}
    {/* Constellation lines */}
    <polyline points="350,200 380,160 420,150 460,170 440,220 370,240 350,200" stroke={GOLD} strokeWidth="0.5" opacity="0.15" fill="none" />
    <line x1="420" y1="150" x2="400" y2="100" stroke={GOLD} strokeWidth="0.5" opacity="0.15" />
    <line x1="350" y1="200" x2="320" y2="180" stroke={GOLD} strokeWidth="0.4" opacity="0.1" />
    <line x1="460" y1="170" x2="480" y2="200" stroke={GOLD} strokeWidth="0.4" opacity="0.1" />

    {/* Forge sparks rising from peak */}
    {[
      [385, 295], [395, 285], [405, 280], [415, 290], [390, 270],
      [410, 265], [400, 255], [380, 260], [420, 275], [395, 245],
      [405, 240], [392, 230], [408, 235],
    ].map(([x, y], i) => (
      <circle key={`sp-${i}`} cx={x} cy={y} r={0.8 + Math.random() * 1.2} fill={GOLD} opacity={0.3 + (i % 3) * 0.12} />
    ))}
    {/* Spark trails */}
    <line x1="400" y1="310" x2="390" y2="270" stroke={GOLD} strokeWidth="0.4" opacity="0.15" />
    <line x1="400" y1="310" x2="410" y2="265" stroke={GOLD} strokeWidth="0.4" opacity="0.15" />
    <line x1="400" y1="310" x2="395" y2="245" stroke={GOLD} strokeWidth="0.3" opacity="0.1" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   4 — BIAS TO ACTION: Comet through Constellation Rings
   ═══════════════════════════════════════════════════════════ */
const ActionIllustration = () => (
  <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="act-glow" cx="60%" cy="45%" r="30%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.12" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="comet-trail" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0" />
        <stop offset="40%" stopColor={GOLD} stopOpacity="0.15" />
        <stop offset="100%" stopColor={GOLD} stopOpacity="0.35" />
      </linearGradient>
    </defs>

    <rect width="800" height="600" fill="url(#act-glow)" />
    <StarField seed={619} count={65} />

    {/* Constellation rings */}
    <ellipse cx="450" cy="300" rx="200" ry="180" stroke={GOLD} strokeWidth="0.6" opacity="0.12" transform="rotate(-8 450 300)" />
    <ellipse cx="450" cy="300" rx="155" ry="140" stroke={GOLD} strokeWidth="0.5" opacity="0.1" transform="rotate(-8 450 300)" strokeDasharray="6 4" />
    <ellipse cx="450" cy="300" rx="110" ry="100" stroke={GOLD} strokeWidth="0.8" opacity="0.15" transform="rotate(-8 450 300)" />
    <ellipse cx="450" cy="300" rx="65" ry="58" stroke={GOLD} strokeWidth="0.6" opacity="0.12" transform="rotate(-8 450 300)" />

    {/* Target center */}
    <circle cx="450" cy="300" r="8" fill={GOLD} opacity="0.25" />
    <circle cx="450" cy="300" r="3" fill={GOLD} opacity="0.45" />

    {/* Comet body — bright head */}
    <circle cx="520" cy="270" r="6" fill={GOLD} opacity="0.5" />
    <circle cx="520" cy="270" r="14" fill={GOLD} opacity="0.08" />

    {/* Comet trail */}
    <path d="M520 270 Q420 280 280 310 Q180 335 80 350" stroke="url(#comet-trail)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M520 270 Q430 275 300 295 Q200 315 100 330" stroke={GOLD} strokeWidth="0.6" opacity="0.1" fill="none" />

    {/* Trailing particles */}
    {[
      [480, 278], [440, 285], [400, 293], [360, 300], [320, 308],
      [280, 315], [240, 322], [200, 330], [160, 337], [120, 344],
      [460, 275], [420, 282], [380, 290], [340, 297],
    ].map(([x, y], i) => (
      <circle key={`tp-${i}`} cx={x} cy={y} r={0.5 + (i < 5 ? 1.2 : 0.6)} fill={GOLD} opacity={0.35 - i * 0.02} />
    ))}

    {/* Forward motion lines */}
    <line x1="530" y1="260" x2="560" y2="248" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />
    <line x1="535" y1="270" x2="580" y2="265" stroke={GOLD} strokeWidth="0.6" opacity="0.15" />
    <line x1="530" y1="280" x2="560" y2="290" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />

    {/* Ring intersection sparkles */}
    {[[340, 290], [560, 280], [450, 120], [450, 480]].map(([cx, cy], i) => (
      <circle key={`rs-${i}`} cx={cx} cy={cy} r="2" fill={WARM_WHITE} opacity="0.3" />
    ))}
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   5 — THE GOLDEN RULE: Reaching Hands with Stardust
   ═══════════════════════════════════════════════════════════ */
const GoldenRuleIllustration = () => (
  <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="gr-center" cx="50%" cy="50%" r="30%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.18" />
        <stop offset="60%" stopColor={GOLD_DIM} stopOpacity="0.05" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="gr-dust" cx="50%" cy="48%" r="15%">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.2" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="800" height="600" fill="url(#gr-center)" />
    <rect width="800" height="600" fill="url(#gr-dust)" />
    <StarField seed={777} count={60} />

    {/* Left hand — reaching right */}
    <path d="M240 340 Q260 330 280 310 Q290 300 295 290 Q298 295 300 305 Q305 290 303 280 Q308 285 310 298 Q315 278 312 270 Q318 280 320 295 L325 280 Q322 295 318 310 Q310 340 290 360 Q270 375 250 370 Z"
      stroke={GOLD} strokeWidth="1.2" opacity="0.3" fill={GOLD} fillOpacity="0.04" strokeLinejoin="round" />
    {/* Left forearm */}
    <path d="M240 340 Q220 350 180 360 Q140 370 100 375" stroke={GOLD} strokeWidth="1.5" opacity="0.2" fill="none" strokeLinecap="round" />

    {/* Right hand — reaching left (mirrored) */}
    <path d="M560 340 Q540 330 520 310 Q510 300 505 290 Q502 295 500 305 Q495 290 497 280 Q492 285 490 298 Q485 278 488 270 Q482 280 480 295 L475 280 Q478 295 482 310 Q490 340 510 360 Q530 375 550 370 Z"
      stroke={GOLD} strokeWidth="1.2" opacity="0.3" fill={GOLD} fillOpacity="0.04" strokeLinejoin="round" />
    {/* Right forearm */}
    <path d="M560 340 Q580 350 620 360 Q660 370 700 375" stroke={GOLD} strokeWidth="1.5" opacity="0.2" fill="none" strokeLinecap="round" />

    {/* Stardust between hands */}
    {starSeed(40, 333).map((s, i) => {
      const x = 340 + (s.x / 800) * 120;
      const y = 260 + (s.y / 600) * 100;
      return <circle key={`dust-${i}`} cx={x} cy={y} r={s.r * 0.8} fill={GOLD} opacity={s.o * 0.7} />;
    })}

    {/* Central bright point — connection */}
    <circle cx="400" cy="300" r="4" fill={GOLD} opacity="0.45" />
    <circle cx="400" cy="300" r="15" fill={GOLD} opacity="0.06" />
    <circle cx="400" cy="300" r="30" fill={GOLD} opacity="0.03" />

    {/* Constellation arc connecting the hands */}
    <path d="M320 295 Q360 260 400 255 Q440 260 480 295" stroke={GOLD} strokeWidth="0.6" opacity="0.15" fill="none" />
    <path d="M330 310 Q370 280 400 275 Q430 280 470 310" stroke={GOLD} strokeWidth="0.4" opacity="0.1" fill="none" strokeDasharray="4 3" />

    {/* Constellation nodes along arc */}
    {[[340, 300], [370, 275], [400, 268], [430, 275], [460, 300]].map(([cx, cy], i) => (
      <circle key={`cn-${i}`} cx={cx} cy={cy} r="2" fill={WARM_WHITE} opacity="0.35" />
    ))}

    {/* Balanced scale overlay — subtle */}
    <line x1="360" y1="380" x2="440" y2="380" stroke={GOLD} strokeWidth="0.5" opacity="0.1" />
    <polygon points="400,375 395,385 405,385" fill={GOLD} opacity="0.12" />
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

const CelestialIllustration = ({ index }: { index: number }) => {
  const Comp = illustrations[index % illustrations.length];
  return <Comp />;
};

export default CelestialIllustration;
