import { motion } from 'framer-motion';

/**
 * Contextually relevant animated SVG compositions for PE branding:
 * - 'partnership': Target/dart — precision investing
 * - 'industry': Structured pillars — essential B2B sectors
 * - 'criteria': Clean pipeline diagram — Discovery to Partnership
 * - 'growth': Ascending trajectory — value creation
 * - default: Abstract diamond network
 */
const AnimatedAccent = ({ variant = 'default' }: { variant?: 'default' | 'partnership' | 'industry' | 'criteria' | 'growth' }) => {
  const draw = (delay: number, dur = 1.2) => ({
    initial: { pathLength: 0, opacity: 0 } as const,
    whileInView: { pathLength: 1, opacity: 1 } as const,
    viewport: { once: true } as const,
    transition: { duration: dur, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const nodeAppear = (delay: number, finalOpacity = 0.5) => ({
    initial: { scale: 0, opacity: 0 } as const,
    whileInView: { scale: 1, opacity: finalOpacity } as const,
    viewport: { once: true } as const,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const fadeIn = (delay: number, finalOpacity = 0.5) => ({
    initial: { opacity: 0 } as const,
    whileInView: { opacity: finalOpacity } as const,
    viewport: { once: true } as const,
    transition: { duration: 0.6, delay } as const,
  });

  const goldStroke = 'hsl(38 45% 55%)';
  const goldFill = 'hsl(38 45% 55%)';

  return (
    <div className="relative overflow-hidden rounded-sm aspect-[4/3] border border-foreground/[0.04] dark:border-primary-foreground/[0.04] bg-gradient-to-br from-cream to-background dark:from-primary/30 dark:to-navy-deep/40 cursor-pointer group/svg">
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {variant === 'partnership' ? (
          <>
            {/* Target board — clean concentric rings */}
            <motion.circle cx="200" cy="126" r="92" stroke={goldStroke} strokeWidth="0.5" fill="none" {...draw(0.2, 1.4)} opacity={0.14} />
            <motion.circle cx="200" cy="126" r="68" stroke={goldStroke} strokeWidth="0.5" fill="none" {...draw(0.35, 1.2)} opacity={0.18} />
            <motion.circle cx="200" cy="126" r="44" stroke={goldStroke} strokeWidth="0.5" fill="none" {...draw(0.5, 1.0)} opacity={0.24} />
            <motion.circle cx="200" cy="126" r="20" stroke={goldStroke} strokeWidth="0.6" fill="none" {...draw(0.65, 0.9)} opacity={0.34} />

            {/* Bullseye dot */}
            <motion.circle cx="200" cy="126" r="4" fill={goldFill} {...nodeAppear(0.95, 0.8)} />

            {/* Dart — single straight line from top-right into exact center */}
            {/* Shaft: straight diagonal line */}
            <motion.line x1="280" y1="46" x2="204" y2="122" stroke={goldStroke} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity={0.8} {...draw(1.0, 0.8)} />
            {/* Tip: sharp point into bullseye */}
            <motion.line x1="204" y1="122" x2="200" y2="126" stroke={goldStroke} strokeWidth="2.4" strokeLinecap="round" fill="none" opacity={0.95} {...draw(1.15, 0.2)} />

            {/* Fletching / Fins at tail — symmetric V shape */}
            <motion.line x1="280" y1="46" x2="296" y2="36" stroke={goldStroke} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.6} {...draw(1.2, 0.3)} />
            <motion.line x1="280" y1="46" x2="290" y2="60" stroke={goldStroke} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.6} {...draw(1.25, 0.3)} />
            {/* Second set of fins */}
            <motion.line x1="275" y1="51" x2="290" y2="44" stroke={goldStroke} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity={0.4} {...draw(1.3, 0.25)} />
            <motion.line x1="275" y1="51" x2="284" y2="64" stroke={goldStroke} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity={0.4} {...draw(1.32, 0.25)} />

            {/* Impact ripple from center */}
            <motion.circle cx="200" cy="126" r="12" stroke={goldStroke} strokeWidth="0.4" fill="none" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 2.5, opacity: 0 }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 1.3, ease: 'easeOut' }} />

            {/* Tagline — large, prominent, centered below target */}
            <motion.text x="200" y="252" fontSize="16" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-serif)" fontStyle="italic" fontWeight="500" letterSpacing="0.02em" {...fadeIn(1.4, 0.85)}>
              "Aligned ambition. Enduring partnership."
            </motion.text>
            <motion.line x1="100" y1="264" x2="300" y2="264" stroke={goldStroke} strokeWidth="0.35" fill="none" {...draw(1.55, 0.55)} opacity={0.18} />
          </>
        ) : variant === 'industry' ? (
          <>
            {/* Structured pillars — essential B2B sectors */}
            {[
              { x: 70, h: 175 },
              { x: 130, h: 200 },
              { x: 190, h: 230 },
              { x: 250, h: 210 },
              { x: 310, h: 185 },
              { x: 370, h: 160 },
            ].map((p, i) => (
              <motion.line key={i} x1={p.x} y1={260} x2={p.x} y2={260 - p.h}
                {...draw(0.15 + i * 0.12, 1.2)}
                stroke={goldStroke} strokeWidth={i === 2 ? 0.8 : 0.5} fill="none" opacity={i === 2 ? 0.65 : 0.4}
              />
            ))}
            <motion.line x1="55" y1="110" x2="385" y2="110" {...draw(0.9, 1.0)} stroke={goldStroke} strokeWidth="0.35" fill="none" opacity={0.3} />
            <motion.line x1="65" y1="160" x2="375" y2="160" {...draw(1.1, 1.0)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.25} />
            <motion.line x1="75" y1="210" x2="365" y2="210" {...draw(1.3, 0.8)} stroke={goldStroke} strokeWidth="0.25" fill="none" opacity={0.2} />
            <motion.line x1="130" y1="110" x2="190" y2="160" {...draw(1.4, 0.7)} stroke={goldStroke} strokeWidth="0.2" fill="none" opacity={0.2} />
            <motion.line x1="250" y1="110" x2="190" y2="160" {...draw(1.5, 0.7)} stroke={goldStroke} strokeWidth="0.2" fill="none" opacity={0.2} />
            <motion.path d="M 190 30 L 185 42 M 190 30 L 195 42" {...draw(1.2, 0.6)} stroke={goldStroke} strokeWidth="0.6" fill="none" opacity={0.45} />
            {['ELEC', 'ENV', 'FAC', 'ENG', 'COMP', 'DIST'].map((label, i) => (
              <motion.text key={label} x={[70, 130, 190, 250, 310, 370][i]} y={272} fontSize="4.5" fill={goldStroke} textAnchor="middle"
                {...fadeIn(1.6 + i * 0.05, 0.2)}>
                {label}
              </motion.text>
            ))}
            {[70, 130, 190, 250, 310, 370].map((x, i) => (
              <motion.circle key={x} cx={x} cy={110} r={i === 2 ? 3 : 2} fill={goldStroke} {...nodeAppear(1.5 + i * 0.08, i === 2 ? 0.5 : 0.3)} />
            ))}
            <motion.line x1="40" y1="260" x2="390" y2="260" {...draw(0.1, 1.0)} stroke={goldStroke} strokeWidth="0.5" fill="none" opacity={0.35} />
          </>
        ) : variant === 'criteria' ? (
          <>
            {/* Title — top center */}
            <motion.text x="200" y="22" fontSize="9" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="0.16em" {...fadeIn(0.15, 0.65)}>
              FROM DISCOVERY TO PARTNERSHIP
            </motion.text>
            <motion.line x1="100" y1="30" x2="300" y2="30" stroke={goldStroke} strokeWidth="0.35" fill="none" {...draw(0.25, 0.6)} opacity={0.2} />

            {(() => {
              const stages = [
                { x: 10, y: 42, w: 88, h: 148, num: '01', title: 'DISCOVERY', sub: ['Market mapping', 'Sector thesis', 'Deal origination'] },
                { x: 106, y: 42, w: 88, h: 148, num: '02', title: 'EVALUATION', sub: ['Fit scoring', 'Cultural alignment', 'Growth potential'] },
                { x: 202, y: 42, w: 88, h: 148, num: '03', title: 'DILIGENCE', sub: ['Operational review', 'Financial quality', 'Risk assessment'] },
                { x: 298, y: 42, w: 88, h: 148, num: '04', title: 'STRUCTURING', sub: ['Terms design', 'Governance plan', 'Value roadmap'] },
              ];

              return (
                <>
                  {stages.map((stage, index) => {
                    const centerX = stage.x + stage.w / 2;
                    const next = stages[index + 1];

                    return (
                      <g key={stage.title}>
                        {/* Card background */}
                        <motion.rect
                          x={stage.x} y={stage.y} width={stage.w} height={stage.h} rx="5"
                          stroke={goldStroke} strokeWidth="0.5" fill={goldFill} opacity={0.06}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 0.08, y: 0 }}
                          whileHover={{ opacity: 0.16, y: -3 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        />
                        {/* Card border */}
                        <motion.rect
                          x={stage.x} y={stage.y} width={stage.w} height={stage.h} rx="5"
                          stroke={goldStroke} strokeWidth="0.6" fill="none"
                          {...draw(0.35 + index * 0.1, 0.7)} opacity={0.3}
                        />
                        {/* Number badge */}
                        <motion.circle cx={stage.x + 16} cy={stage.y + 16} r="10" fill={goldFill}
                          initial={{ scale: 0.7, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 0.85 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.45 + index * 0.1 }}
                        />
                        <motion.text x={stage.x + 16} y={stage.y + 17} fontSize="5.5" fill="hsl(var(--primary))" textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-sans)" fontWeight="700" {...fadeIn(0.55 + index * 0.1, 1)}>
                          {stage.num}
                        </motion.text>
                        {/* Stage title */}
                        <motion.text x={stage.x + 12} y={stage.y + 40} fontSize="6" fill={goldStroke} fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="0.08em" {...fadeIn(0.6 + index * 0.1, 0.65)}>
                          {stage.title}
                        </motion.text>
                        {/* Divider */}
                        <motion.line x1={stage.x + 12} y1={stage.y + 48} x2={stage.x + stage.w - 12} y2={stage.y + 48} stroke={goldStroke} strokeWidth="0.3" fill="none" {...draw(0.7 + index * 0.1, 0.4)} opacity={0.2} />
                        {/* Sub-pointers — 3 per stage */}
                        {stage.sub.map((line, subIndex) => (
                          <g key={line}>
                            <motion.circle cx={stage.x + 16} cy={stage.y + 64 + subIndex * 26} r="2" fill={goldFill} {...nodeAppear(0.8 + index * 0.1 + subIndex * 0.05, 0.5)} />
                            <motion.text x={stage.x + 22} y={stage.y + 66 + subIndex * 26} fontSize="5" fill={goldStroke} fontFamily="var(--font-sans)" {...fadeIn(0.85 + index * 0.1 + subIndex * 0.05, 0.45)}>
                              {line}
                            </motion.text>
                          </g>
                        ))}

                        {/* Connecting arrow to next stage */}
                        {next && (() => {
                          const arrowY = stage.y + stage.h / 2;
                          return (
                            <>
                              <motion.line x1={stage.x + stage.w + 2} y1={arrowY} x2={next.x - 2} y2={arrowY} stroke={goldStroke} strokeWidth="0.8" fill="none" {...draw(0.65 + index * 0.1, 0.4)} opacity={0.3} />
                              <motion.path d={`M ${next.x - 6} ${arrowY - 3} L ${next.x - 1} ${arrowY} L ${next.x - 6} ${arrowY + 3}`} stroke={goldStroke} strokeWidth="0.7" fill="none" {...draw(0.75 + index * 0.1, 0.25)} opacity={0.35} />
                            </>
                          );
                        })()}

                        {/* Vertical arrow down from each card to partnership */}
                        <motion.line x1={centerX} y1={stage.y + stage.h + 2} x2={centerX} y2={stage.y + stage.h + 16} stroke={goldStroke} strokeWidth="0.5" fill="none" {...draw(1.1 + index * 0.06, 0.3)} opacity={0.2} />
                      </g>
                    );
                  })}

                  {/* Converging lines from all 4 cards down to partnership diamond */}
                  {stages.map((stage, index) => {
                    const centerX = stage.x + stage.w / 2;
                    return (
                      <motion.line key={`conv-${index}`} x1={centerX} y1={stage.y + stage.h + 16} x2={200} y2={232} stroke={goldStroke} strokeWidth="0.4" fill="none" {...draw(1.2 + index * 0.05, 0.5)} opacity={0.18} />
                    );
                  })}

                  {/* Partnership diamond — bottom center */}
                  <motion.path d="M 200 220 L 216 244 L 200 268 L 184 244 Z" stroke={goldStroke} strokeWidth="0.7" fill="none" {...draw(1.35, 0.7)} opacity={0.45} />
                  <motion.circle cx="200" cy="244" r="6" fill={goldFill} {...nodeAppear(1.45, 0.65)} />
                  <motion.text x="200" y="284" fontSize="6.5" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="0.14em" {...fadeIn(1.55, 0.6)}>
                    PARTNERSHIP
                  </motion.text>
                </>
              );
            })()}
          </>
        ) : variant === 'growth' ? (
          <>
            {/* Ascending trajectory — value creation over time */}
            <motion.line x1="40" y1="260" x2="380" y2="260" {...draw(0.1, 1.0)} stroke={goldStroke} strokeWidth="0.4" fill="none" opacity={0.3} />
            <motion.line x1="40" y1="260" x2="40" y2="30" {...draw(0.2, 1.0)} stroke={goldStroke} strokeWidth="0.4" fill="none" opacity={0.3} />
            <motion.path
              d="M 50 245 C 90 240 120 235 150 220 C 180 205 200 185 230 155 C 260 120 290 80 330 40"
              {...draw(0.5, 2.0)}
              stroke={goldStroke} strokeWidth="0.8" fill="none" opacity={0.6}
            />
            {[
              { x: 90, y: 240 },
              { x: 150, y: 220 },
              { x: 200, y: 185 },
              { x: 260, y: 120 },
              { x: 330, y: 40 },
            ].map((p, i) => (
              <g key={i}>
                <motion.circle cx={p.x} cy={p.y} r={i === 4 ? 4 : 2.5} fill={goldStroke} {...nodeAppear(1.2 + i * 0.15, i === 4 ? 0.55 : 0.35)} />
                <motion.line x1={p.x} y1={p.y} x2={p.x} y2={260}
                  {...draw(1.3 + i * 0.1, 0.6)}
                  stroke={goldStroke} strokeWidth="0.15" fill="none" opacity={0.12}
                  strokeDasharray="2 3"
                />
              </g>
            ))}
            <motion.path d="M 260 120 C 275 100 300 80 330 40" stroke={goldStroke} strokeWidth="1.2" fill="none" {...draw(2.0, 0.8)} opacity={0.15} />
            <motion.text x="210" y="278" fontSize="5" fill={goldStroke} textAnchor="middle"
              {...fadeIn(2.0, 0.2)}>
              TIME
            </motion.text>
            <motion.text x="25" y="150" fontSize="5" fill={goldStroke} textAnchor="middle" transform="rotate(-90,25,150)"
              {...fadeIn(2.1, 0.2)}>
              VALUE
            </motion.text>
            <motion.path d="M 330 40 L 325 50 M 330 40 L 335 50" {...draw(2.2, 0.5)} stroke={goldStroke} strokeWidth="0.6" fill="none" opacity={0.5} />
          </>
        ) : (
          <>
            {/* Default: abstract diamond network */}
            <motion.path d="M 200 50 L 340 150 L 200 250 L 60 150 Z" {...draw(0.3, 1.8)} stroke={goldStroke} strokeWidth="0.6" fill="none" />
            <motion.line x1="200" y1="50" x2="200" y2="250" {...draw(0.9)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.3} />
            <motion.line x1="60" y1="150" x2="340" y2="150" {...draw(1.0)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.3} />
            <motion.path d="M 200 100 L 270 150 L 200 200 L 130 150 Z" {...draw(1.2, 1.2)} stroke={goldStroke} strokeWidth="0.4" fill="none" opacity={0.4} />
            <motion.circle cx="200" cy="150" r="4" fill={goldStroke} {...nodeAppear(1.5, 0.5)} />
            <motion.circle cx="200" cy="50" r="2" fill={goldStroke} {...nodeAppear(1.6, 0.35)} />
            <motion.circle cx="340" cy="150" r="2" fill={goldStroke} {...nodeAppear(1.7, 0.35)} />
            <motion.circle cx="200" cy="250" r="2" fill={goldStroke} {...nodeAppear(1.8, 0.35)} />
            <motion.circle cx="60" cy="150" r="2" fill={goldStroke} {...nodeAppear(1.9, 0.35)} />
          </>
        )}

        {/* Corner marks */}
        <motion.line x1="15" y1="15" x2="45" y2="15" {...draw(0.1, 0.6)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.2} />
        <motion.line x1="15" y1="15" x2="15" y2="45" {...draw(0.15, 0.6)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.2} />
        <motion.line x1="385" y1="285" x2="355" y2="285" {...draw(0.2, 0.6)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.2} />
        <motion.line x1="385" y1="285" x2="385" y2="255" {...draw(0.25, 0.6)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.2} />
      </svg>

      {/* Ambient center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
        style={{ background: 'radial-gradient(circle, hsl(38 45% 55% / 0.06), transparent 70%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Slow pulse ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full border border-gold/[0.06]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default AnimatedAccent;
