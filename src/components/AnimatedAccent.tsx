import { motion } from 'framer-motion';

/**
 * Contextually relevant animated SVG compositions for PE branding:
 * - 'partnership': Target/dart — precision investing with three keywords
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
            {/* Target board — clean concentric rings, no tick marks */}
            <motion.circle cx="200" cy="120" r="92" stroke={goldStroke} strokeWidth="0.5" fill="none" {...draw(0.2, 1.4)} opacity={0.14} />
            <motion.circle cx="200" cy="120" r="68" stroke={goldStroke} strokeWidth="0.5" fill="none" {...draw(0.35, 1.2)} opacity={0.18} />
            <motion.circle cx="200" cy="120" r="44" stroke={goldStroke} strokeWidth="0.5" fill="none" {...draw(0.5, 1.0)} opacity={0.24} />
            <motion.circle cx="200" cy="120" r="20" stroke={goldStroke} strokeWidth="0.6" fill="none" {...draw(0.65, 0.9)} opacity={0.34} />
            <motion.circle cx="200" cy="120" r="5" fill={goldFill} {...nodeAppear(0.95, 0.7)} />

            {/* Dart — clear shaft + pointed tip + two fins */}
            {/* Shaft */}
            <motion.line x1="258" y1="68" x2="206" y2="116" stroke={goldStroke} strokeWidth="1.8" fill="none" opacity={0.85} {...draw(1.0, 0.7)} />
            {/* Pointed tip */}
            <motion.path d="M 206 116 L 200 120" stroke={goldStroke} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity={0.9} {...draw(1.1, 0.3)} />
            {/* Fin 1 — upper right */}
            <motion.path d="M 254 72 L 270 58 L 260 78 Z" fill={goldFill} opacity={0.5} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 0.5, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1.15 }} />
            {/* Fin 2 — lower right */}
            <motion.path d="M 254 72 L 274 76 L 258 86 Z" fill={goldFill} opacity={0.5} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 0.5, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1.2 }} />

            {/* Impact ripple */}
            <motion.circle cx="200" cy="120" r="11" stroke={goldStroke} strokeWidth="0.3" fill="none" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 2.2, opacity: 0 }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 1.25, ease: 'easeOut' }} />

            {/* Tagline — large and prominent */}
            <motion.text x="200" y="248" fontSize="16" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-serif)" fontStyle="italic" fontWeight="500" letterSpacing="0.02em" {...fadeIn(1.4, 0.82)}>
              "Aligned ambition. Enduring partnership."
            </motion.text>
            <motion.line x1="100" y1="260" x2="300" y2="260" stroke={goldStroke} strokeWidth="0.35" fill="none" {...draw(1.55, 0.55)} opacity={0.18} />
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
            {/* Title — prominent header */}
            <motion.text x="200" y="28" fontSize="10" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="0.18em" {...fadeIn(0.15, 0.6)}>
              FROM DISCOVERY TO PARTNERSHIP
            </motion.text>
            <motion.line x1="90" y1="36" x2="310" y2="36" stroke={goldStroke} strokeWidth="0.35" fill="none" {...draw(0.25, 0.75)} opacity={0.22} />

            {(() => {
              const stages = [
                { x: 12, y: 52, w: 80, h: 130, num: '01', title: 'DISCOVERY', sub: ['Market mapping', 'Sector thesis'] },
                { x: 104, y: 52, w: 80, h: 130, num: '02', title: 'EVALUATION', sub: ['Fit scoring', 'Cultural alignment'] },
                { x: 196, y: 52, w: 80, h: 130, num: '03', title: 'DILIGENCE', sub: ['Operational review', 'Financial quality'] },
                { x: 288, y: 52, w: 80, h: 130, num: '04', title: 'STRUCTURING', sub: ['Terms design', 'Governance plan'] },
              ];

              return (
                <>
                  {stages.map((stage, index) => {
                    const centerY = stage.y + stage.h / 2;
                    const next = stages[index + 1];

                    return (
                      <g key={stage.title}>
                        {/* Card background */}
                        <motion.rect
                          x={stage.x}
                          y={stage.y}
                          width={stage.w}
                          height={stage.h}
                          rx="6"
                          stroke={goldStroke}
                          strokeWidth="0.5"
                          fill={goldFill}
                          opacity={0.06}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 0.08, y: 0 }}
                          whileHover={{ opacity: 0.16, y: -4 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: 0.3 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        />
                        {/* Card border */}
                        <motion.rect
                          x={stage.x}
                          y={stage.y}
                          width={stage.w}
                          height={stage.h}
                          rx="6"
                          stroke={goldStroke}
                          strokeWidth="0.6"
                          fill="none"
                          {...draw(0.38 + index * 0.12, 0.7)}
                          opacity={0.3}
                        />
                        {/* Number badge */}
                        <motion.circle cx={stage.x + 18} cy={stage.y + 18} r="11" fill={goldFill} initial={{ scale: 0.7, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.85 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.45 + index * 0.12 }} />
                        <motion.text x={stage.x + 18} y={stage.y + 19} fontSize="6" fill="hsl(var(--primary))" textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-sans)" fontWeight="700" {...fadeIn(0.6 + index * 0.12, 1)}>
                          {stage.num}
                        </motion.text>
                        {/* Stage title */}
                        <motion.text x={stage.x + 14} y={stage.y + 46} fontSize="6.5" fill={goldStroke} fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="0.08em" {...fadeIn(0.72 + index * 0.12, 0.65)}>
                          {stage.title}
                        </motion.text>
                        {/* Divider */}
                        <motion.line x1={stage.x + 14} y1={stage.y + 54} x2={stage.x + stage.w - 14} y2={stage.y + 54} stroke={goldStroke} strokeWidth="0.3" fill="none" {...draw(0.82 + index * 0.12, 0.4)} opacity={0.2} />
                        {/* Sub-pointers */}
                        {stage.sub.map((line, subIndex) => (
                          <g key={line}>
                            <motion.circle cx={stage.x + 16} cy={stage.y + 74 + subIndex * 22} r="2" fill={goldFill} {...nodeAppear(0.95 + index * 0.12 + subIndex * 0.06, 0.5)} />
                            <motion.text x={stage.x + 22} y={stage.y + 76 + subIndex * 22} fontSize="5.5" fill={goldStroke} fontFamily="var(--font-sans)" {...fadeIn(1.0 + index * 0.12 + subIndex * 0.06, 0.42)}>
                              {line}
                            </motion.text>
                          </g>
                        ))}

                        {/* Connecting arrow to next stage */}
                        {next && (
                          <>
                            <motion.line x1={stage.x + stage.w + 4} y1={centerY} x2={next.x - 4} y2={centerY} stroke={goldStroke} strokeWidth="1.0" fill="none" {...draw(0.7 + index * 0.12, 0.45)} opacity={0.3} />
                            <motion.path d={`M ${next.x - 9} ${centerY - 4} L ${next.x - 3} ${centerY} L ${next.x - 9} ${centerY + 4}`} stroke={goldStroke} strokeWidth="0.7" fill="none" {...draw(0.8 + index * 0.12, 0.25)} opacity={0.3} />
                          </>
                        )}
                      </g>
                    );
                  })}

                  {/* Partnership diamond endpoint */}
                  <motion.path d="M 382 88 L 396 117 L 382 146 L 368 117 Z" stroke={goldStroke} strokeWidth="0.7" fill="none" {...draw(1.15, 0.75)} opacity={0.45} />
                  <motion.circle cx="382" cy="117" r="6" fill={goldFill} {...nodeAppear(1.3, 0.65)} />
                  <motion.text x="382" y="162" fontSize="6" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="0.12em" {...fadeIn(1.45, 0.6)}>
                    PARTNERSHIP
                  </motion.text>

                  {/* Quote */}
                  <motion.text x="200" y="210" fontSize="7" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-serif)" fontStyle="italic" {...fadeIn(1.55, 0.38)}>
                    Structured process. Disciplined judgment.
                  </motion.text>

                  {/* Progress bar */}
                  <motion.line x1="12" y1="228" x2="396" y2="228" stroke={goldStroke} strokeWidth="0.3" fill="none" {...draw(1.65, 0.65)} opacity={0.14} />
                  <motion.line x1="12" y1="228" x2="396" y2="228" stroke={goldStroke} strokeWidth="0.7" fill="none" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.35 }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }} />
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
