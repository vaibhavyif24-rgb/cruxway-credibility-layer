import React from 'react';

/* 6 unique thematic illustrations for the "What We Look For" criteria deck */
const CriteriaIllustration: React.FC<{ index: number; isDark: boolean; isActive: boolean }> = ({ index, isDark, isActive }) => {
  const gold = 'hsl(38 45% 55%)';
  const goldDim = 'hsl(38 35% 45%)';
  const baseOpacity = isDark ? 0.12 : 0.1;

  const cornerAccents = (
    <>
      <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      <path d="M 270 10 L 290 10 L 290 30" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      <path d="M 10 270 L 10 290 L 30 290" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
      <path d="M 270 290 L 290 290 L 290 270" fill="none" stroke={goldDim} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
    </>
  );

  const illustrations: Record<number, React.ReactNode> = {
    // 0 — Founder Succession: Torch handoff
    0: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <rect x="130" y="140" width="40" height="120" rx="4" fill="none" stroke={gold} strokeWidth="0.8" opacity={baseOpacity * 1.2} />
        <rect x="125" y="130" width="50" height="16" rx="3" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        <path d="M 150 130 Q 130 90 150 50 Q 170 90 150 130" fill={gold} opacity={baseOpacity * 0.4}>
          <animate attributeName="d" values="M 150 130 Q 130 90 150 50 Q 170 90 150 130;M 150 130 Q 125 85 150 45 Q 175 85 150 130;M 150 130 Q 130 90 150 50 Q 170 90 150 130" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M 150 130 Q 140 100 150 70 Q 160 100 150 130" fill={gold} opacity={baseOpacity * 0.8}>
          <animate attributeName="d" values="M 150 130 Q 140 100 150 70 Q 160 100 150 130;M 150 130 Q 135 95 150 65 Q 165 95 150 130;M 150 130 Q 140 100 150 70 Q 160 100 150 130" dur="1.5s" repeatCount="indefinite" />
        </path>
        <path d="M 80 200 Q 100 180 125 190" fill="none" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.3} />
        <path d="M 220 200 Q 200 180 175 190" fill="none" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.3} />
        <circle cx="150" cy="90" r="30" fill={gold} opacity={baseOpacity * 0.1}>
          <animate attributeName="r" values="25;35;25" dur="3s" repeatCount="indefinite" />
        </circle>
        {cornerAccents}
      </svg>
    ),

    // 1 — Regulated Services: Shield with compliance
    1: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <path d="M 150 40 L 240 80 L 240 170 Q 240 240 150 270 Q 60 240 60 170 L 60 80 Z" fill="none" stroke={gold} strokeWidth="1" opacity={baseOpacity * 1.3} />
        <path d="M 150 40 L 240 80 L 240 170 Q 240 240 150 270 Q 60 240 60 170 L 60 80 Z" fill={gold} opacity={baseOpacity * 0.08} />
        <path d="M 115 155 L 140 180 L 190 120" fill="none" stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={baseOpacity * 2}>
          <animate attributeName="opacity" values={`0;${baseOpacity * 2.5};${baseOpacity * 2.5}`} dur="1.5s" fill="freeze" />
        </path>
        {[100, 140, 180, 220].map(y => (
          <line key={y} x1="80" y1={y} x2="220" y2={y} stroke={gold} strokeWidth="0.25" opacity={baseOpacity * 0.3} />
        ))}
        <circle cx="150" cy="155" r="50" fill={gold} opacity={baseOpacity * 0.06}>
          <animate attributeName="r" values="45;55;45" dur="4s" repeatCount="indefinite" />
        </circle>
        {cornerAccents}
      </svg>
    ),

    // 2 — Customer Retention: Circular loop
    2: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {['M 150 60 A 90 90 0 0 1 240 150', 'M 240 150 A 90 90 0 0 1 150 240', 'M 150 240 A 90 90 0 0 1 60 150', 'M 60 150 A 90 90 0 0 1 150 60'].map((d, i) => (
          <path key={i} d={d} fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.5} />
        ))}
        <path d="M 145 60 L 155 55 L 155 65" fill={gold} opacity={baseOpacity * 1.5} />
        <path d="M 240 145 L 245 155 L 235 155" fill={gold} opacity={baseOpacity * 1.5} />
        <path d="M 155 240 L 145 245 L 145 235" fill={gold} opacity={baseOpacity * 1.5} />
        <path d="M 60 155 L 55 145 L 65 145" fill={gold} opacity={baseOpacity * 1.5} />
        {[[150, 60], [240, 150], [150, 240], [60, 150]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill={gold} opacity={baseOpacity * 1.8}>
            <animate attributeName="r" values="4;6;4" dur="2.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <circle cx="150" cy="150" r="6" fill={gold} opacity={baseOpacity * 2}>
          <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite" />
        </circle>
        {cornerAccents}
      </svg>
    ),

    // 3 — Consolidation: Converging nodes
    3: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {[[60, 80], [240, 80], [60, 220], [240, 220], [50, 150], [250, 150]].map(([cx, cy], i) => (
          <React.Fragment key={i}>
            <circle cx={cx} cy={cy} r="12" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity}>
              <animate attributeName="r" values="10;14;10" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
            <line x1={cx} y1={cy} x2="150" y2="150" stroke={gold} strokeWidth="0.5" strokeDasharray="4 4" opacity={baseOpacity * 0.6} />
          </React.Fragment>
        ))}
        <circle cx="150" cy="150" r="35" fill="none" stroke={gold} strokeWidth="1.2" opacity={baseOpacity * 1.5} />
        <circle cx="150" cy="150" r="35" fill={gold} opacity={baseOpacity * 0.15}>
          <animate attributeName="r" values="30;38;30" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="150" r="8" fill={gold} opacity={baseOpacity * 2}>
          <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" />
        </circle>
        {cornerAccents}
      </svg>
    ),

    // 4 — Operational Upside: Ascending bars with trend
    4: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <line x1="50" y1="250" x2="260" y2="250" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        <line x1="50" y1="250" x2="50" y2="50" stroke={gold} strokeWidth="0.6" opacity={baseOpacity} />
        {[[80, 200], [115, 170], [150, 135], [185, 100], [220, 60]].map(([x, y], i) => (
          <rect key={i} x={(x as number) - 12} y={y as number} width="24" height={250 - (y as number)} fill={gold} opacity={baseOpacity * 0.5} rx="2">
            <animate attributeName="opacity" values={`${baseOpacity * 0.3};${baseOpacity * 0.7};${baseOpacity * 0.3}`} dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </rect>
        ))}
        <line x1="68" y1="210" x2="232" y2="50" stroke={gold} strokeWidth="0.8" strokeDasharray="4 4" opacity={baseOpacity * 1.2} />
        <circle cx="220" cy="80" r="18" fill="none" stroke={gold} strokeWidth="0.8" opacity={baseOpacity * 0.8} />
        <circle cx="220" cy="80" r="8" fill="none" stroke={gold} strokeWidth="0.6" opacity={baseOpacity * 0.8} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
          <line key={angle} x1="220" y1={80 - 15} x2="220" y2={80 - 22} stroke={gold} strokeWidth="2.5" strokeLinecap="round" opacity={baseOpacity * 0.8} transform={`rotate(${angle} 220 80)`} />
        ))}
        {cornerAccents}
      </svg>
    ),

    // 5 — Values Alignment: Concentric rings with compass star
    5: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {[40, 70, 100, 130].map(r => (
          <circle key={r} cx="150" cy="150" r={r} fill="none" stroke={gold} strokeWidth="0.5" opacity={baseOpacity * (r === 40 ? 1.2 : 0.6)}>
            <animate attributeName="r" values={`${r - 2};${r + 2};${r - 2}`} dur={`${3 + r / 30}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <path d="M 150 115 L 157 142 L 185 142 L 163 158 L 170 185 L 150 168 L 130 185 L 137 158 L 115 142 L 143 142 Z" fill="none" stroke={gold} strokeWidth="0.8" opacity={baseOpacity * 1.5} />
        <path d="M 150 115 L 157 142 L 150 168 L 143 142 Z" fill={gold} opacity={baseOpacity * 0.4} />
        {[[150, 20], [280, 150], [150, 280], [20, 150]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill={gold} opacity={baseOpacity * 1.2}>
            <animate attributeName="opacity" values={`${baseOpacity * 0.8};${baseOpacity * 2};${baseOpacity * 0.8}`} dur="3s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {cornerAccents}
      </svg>
    ),
  };

  const svg = illustrations[index % 6] || illustrations[0];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute right-0 top-0 h-full w-[45%] flex items-center justify-center">
        <div
          className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]"
          style={{
            opacity: isActive ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
          }}
        >
          {svg}
        </div>
      </div>
    </div>
  );
};

export default CriteriaIllustration;
