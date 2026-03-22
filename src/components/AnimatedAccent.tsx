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
            {/* Target board — cleaner and more legible */}
            <motion.circle cx="200" cy="126" r="92" stroke={goldStroke} strokeWidth="0.5" fill="none" {...draw(0.2, 1.4)} opacity={0.14} />
            <motion.circle cx="200" cy="126" r="68" stroke={goldStroke} strokeWidth="0.5" fill="none" {...draw(0.35, 1.2)} opacity={0.18} />
            <motion.circle cx="200" cy="126" r="44" stroke={goldStroke} strokeWidth="0.5" fill="none" {...draw(0.5, 1.0)} opacity={0.24} />
            <motion.circle cx="200" cy="126" r="20" stroke={goldStroke} strokeWidth="0.6" fill="none" {...draw(0.65, 0.9)} opacity={0.34} />
            <motion.circle cx="200" cy="126" r="6.5" fill={goldFill} {...nodeAppear(0.95, 0.65)} />

            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 200 + 89 * Math.cos(rad);
              const y1 = 126 + 89 * Math.sin(rad);
              const x2 = 200 + 96 * Math.cos(rad);
              const y2 = 126 + 96 * Math.sin(rad);
              return (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  {...draw(0.28 + i * 0.04, 0.28)}
                  stroke={goldStroke}
                  strokeWidth="0.38"
                  fill="none"
                  opacity={0.14}
                />
              );
            })}

            <motion.line x1="251" y1="77" x2="214" y2="115" stroke={goldStroke} strokeWidth="1.5" fill="none" opacity={0.82} {...draw(1.0, 0.7)} />
            <motion.path d="M 214 115 L 200 126 L 217 123 Z" fill={goldFill} opacity={0.72} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 0.72, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.15 }} />
            <motion.path d="M 249 79 L 264 64 L 257 84 Z" stroke={goldStroke} strokeWidth="0.85" fill="none" opacity={0.56} {...draw(1.15, 0.45)} />
            <motion.path d="M 248 79 L 268 84 L 255 93 Z" stroke={goldStroke} strokeWidth="0.85" fill="none" opacity={0.56} {...draw(1.25, 0.45)} />
            <motion.line x1="241" y1="87" x2="250" y2="78" stroke={goldStroke} strokeWidth="0.55" fill="none" opacity={0.34} {...draw(1.15, 0.35)} />
            <motion.circle cx="200" cy="126" r="11" stroke={goldStroke} strokeWidth="0.25" fill="none" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1.9, opacity: 0 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 1.25, ease: 'easeOut' }} />

            <motion.text x="200" y="246" fontSize="10.5" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-serif)" fontStyle="italic" fontWeight="500" letterSpacing="0.01em" {...fadeIn(1.4, 0.62)}>
              “Aligned ambition. Enduring partnership.”
            </motion.text>
            <motion.line x1="116" y1="258" x2="284" y2="258" stroke={goldStroke} strokeWidth="0.34" fill="none" {...draw(1.55, 0.55)} opacity={0.16} />
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
            <motion.text x="200" y="24" fontSize="7" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="0.22em" {...fadeIn(0.15, 0.54)}>
              FROM DISCOVERY TO PARTNERSHIP
            </motion.text>
            <motion.line x1="106" y1="31" x2="294" y2="31" stroke={goldStroke} strokeWidth="0.3" fill="none" {...draw(0.25, 0.75)} opacity={0.2} />

            {(() => {
              const stages = [
                { x: 24, y: 64, w: 72, h: 112, num: '01', title: 'DISCOVERY', sub: ['Market mapping', 'Sector thesis'] },
                { x: 110, y: 64, w: 72, h: 112, num: '02', title: 'EVALUATION', sub: ['Fit scoring', 'Cultural alignment'] },
                { x: 196, y: 64, w: 72, h: 112, num: '03', title: 'DILIGENCE', sub: ['Operational review', 'Financial quality'] },
                { x: 282, y: 64, w: 72, h: 112, num: '04', title: 'STRUCTURING', sub: ['Terms design', 'Governance plan'] },
              ];

              return (
                <>
                  {stages.map((stage, index) => {
                    const centerY = stage.y + stage.h / 2;
                    const next = stages[index + 1];

                    return (
                      <g key={stage.title}>
                        <motion.rect
                          x={stage.x}
                          y={stage.y}
                          width={stage.w}
                          height={stage.h}
                          rx="8"
                          stroke={goldStroke}
                          strokeWidth="0.45"
                          fill={goldFill}
                          opacity={0.06}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 0.08, y: 0 }}
                          whileHover={{ opacity: 0.14, y: -4 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: 0.3 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <motion.rect
                          x={stage.x}
                          y={stage.y}
                          width={stage.w}
                          height={stage.h}
                          rx="8"
                          stroke={goldStroke}
                          strokeWidth="0.55"
                          fill="none"
                          {...draw(0.38 + index * 0.12, 0.7)}
                          opacity={0.28}
                        />
                        <motion.circle cx={stage.x + 16} cy={stage.y + 16} r="10" fill={goldFill} initial={{ scale: 0.7, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.85 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.45 + index * 0.12 }} />
                        <motion.text x={stage.x + 16} y={stage.y + 16.5} fontSize="4.8" fill="hsl(var(--primary))" textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-sans)" fontWeight="700" {...fadeIn(0.6 + index * 0.12, 1)}>
                          {stage.num}
                        </motion.text>
                        <motion.text x={stage.x + 14} y={stage.y + 40} fontSize="4.85" fill={goldStroke} fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="0.08em" {...fadeIn(0.72 + index * 0.12, 0.6)}>
                          {stage.title}
                        </motion.text>
                        <motion.line x1={stage.x + 14} y1={stage.y + 47} x2={stage.x + stage.w - 14} y2={stage.y + 47} stroke={goldStroke} strokeWidth="0.25" fill="none" {...draw(0.82 + index * 0.12, 0.4)} opacity={0.18} />
                        {stage.sub.map((line, subIndex) => (
                          <g key={line}>
                            <motion.circle cx={stage.x + 14} cy={stage.y + 67 + subIndex * 19} r="1.5" fill={goldFill} {...nodeAppear(0.95 + index * 0.12 + subIndex * 0.06, 0.45)} />
                            <motion.text x={stage.x + 20} y={stage.y + 69 + subIndex * 19} fontSize="4.1" fill={goldStroke} fontFamily="var(--font-sans)" {...fadeIn(1.0 + index * 0.12 + subIndex * 0.06, 0.34)}>
                              {line}
                            </motion.text>
                          </g>
                        ))}

                        {next && (
                          <>
                            <motion.line x1={stage.x + stage.w + 8} y1={centerY} x2={next.x - 8} y2={centerY} stroke={goldStroke} strokeWidth="0.7" fill="none" {...draw(0.7 + index * 0.12, 0.45)} opacity={0.28} />
                            <motion.path d={`M ${next.x - 12} ${centerY - 3} L ${next.x - 7} ${centerY} L ${next.x - 12} ${centerY + 3}`} stroke={goldStroke} strokeWidth="0.48" fill="none" {...draw(0.8 + index * 0.12, 0.25)} opacity={0.28} />
                          </>
                        )}
                      </g>
                    );
                  })}

                  <motion.path d="M 370 92 L 388 120 L 370 148 L 352 120 Z" stroke={goldStroke} strokeWidth="0.65" fill="none" {...draw(1.15, 0.75)} opacity={0.4} />
                  <motion.circle cx="370" cy="120" r="5.5" fill={goldFill} {...nodeAppear(1.3, 0.6)} />
                  <motion.line x1="354" y1="120" x2="350" y2="120" stroke={goldStroke} strokeWidth="0.65" fill="none" {...draw(1.0, 0.2)} opacity={0.28} />
                  <motion.text x="370" y="164" fontSize="4.8" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="0.12em" {...fadeIn(1.45, 0.58)}>
                    PARTNERSHIP
                  </motion.text>

                  <motion.text x="200" y="219" fontSize="6" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-serif)" fontStyle="italic" {...fadeIn(1.55, 0.34)}>
                    Structured process. Disciplined judgment.
                  </motion.text>
                  <motion.line x1="52" y1="244" x2="348" y2="244" stroke={goldStroke} strokeWidth="0.26" fill="none" {...draw(1.65, 0.65)} opacity={0.12} />
                  <motion.line x1="52" y1="257" x2="382" y2="257" stroke={goldStroke} strokeWidth="0.32" fill="none" {...draw(1.8, 0.9)} opacity={0.16} />
                  <motion.line x1="52" y1="257" x2="382" y2="257" stroke={goldStroke} strokeWidth="0.62" fill="none" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.34 }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 1.95, ease: [0.22, 1, 0.36, 1] }} />
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
