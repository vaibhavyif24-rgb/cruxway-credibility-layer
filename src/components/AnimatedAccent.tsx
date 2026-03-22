import { motion } from 'framer-motion';

/**
 * Contextually relevant animated SVG compositions for PE branding:
 * - 'partnership': Two converging paths meeting — founder + investor alignment
 * - 'industry': Structured pillars with infrastructure — essential B2B sectors
 * - 'criteria': Evaluation framework with weighted scoring metaphor
 * - 'growth': Ascending trajectory with compounding nodes — value creation
 * - default: Abstract diamond network — institutional gravitas
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

  const goldStroke = 'hsl(38 45% 55%)';

  return (
    <div className="relative overflow-hidden rounded-sm aspect-[4/3] border border-foreground/[0.04] dark:border-primary-foreground/[0.04] bg-gradient-to-br from-cream to-background dark:from-primary/30 dark:to-navy-deep/40">
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {variant === 'partnership' ? (
          <>
            {/* Two converging paths — founder meets investor */}
            <motion.path d="M 30 250 C 80 210 130 180 200 130" {...draw(0.2, 1.4)} stroke={goldStroke} strokeWidth="0.7" fill="none" />
            <motion.path d="M 370 250 C 320 210 270 180 200 130" {...draw(0.4, 1.4)} stroke={goldStroke} strokeWidth="0.7" fill="none" />
            {/* United path upward — shared vision */}
            <motion.path d="M 200 130 L 200 35" {...draw(0.9, 1.0)} stroke={goldStroke} strokeWidth="0.8" fill="none" />

            {/* Expanding network from convergence — portfolio growth */}
            <motion.path d="M 200 130 C 155 105 120 75 85 60" {...draw(1.2, 1.0)} stroke={goldStroke} strokeWidth="0.35" fill="none" opacity={0.45} />
            <motion.path d="M 200 130 C 245 105 280 75 315 60" {...draw(1.3, 1.0)} stroke={goldStroke} strokeWidth="0.35" fill="none" opacity={0.45} />
            <motion.path d="M 200 130 C 165 165 135 185 100 195" {...draw(1.4, 0.8)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.35} />
            <motion.path d="M 200 130 C 235 165 265 185 300 195" {...draw(1.5, 0.8)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.35} />

            {/* Labels: "Founder" and "Investor" origin points */}
            <motion.text x="30" y="270" fontSize="6" fill={goldStroke} opacity={0.25}
              initial={{ opacity: 0 }} whileInView={{ opacity: 0.25 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.0 }}>
              FOUNDER
            </motion.text>
            <motion.text x="335" y="270" fontSize="6" fill={goldStroke} opacity={0.25}
              initial={{ opacity: 0 }} whileInView={{ opacity: 0.25 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.1 }}>
              INVESTOR
            </motion.text>

            {/* Nodes */}
            <motion.circle cx="200" cy="130" r="5" fill={goldStroke} {...nodeAppear(1.0, 0.6)} />
            <motion.circle cx="200" cy="35" r="3" fill={goldStroke} {...nodeAppear(1.5, 0.4)} />
            <motion.circle cx="85" cy="60" r="2" fill={goldStroke} {...nodeAppear(1.6, 0.3)} />
            <motion.circle cx="315" cy="60" r="2" fill={goldStroke} {...nodeAppear(1.7, 0.3)} />
            <motion.circle cx="100" cy="195" r="1.5" fill={goldStroke} {...nodeAppear(1.8, 0.25)} />
            <motion.circle cx="300" cy="195" r="1.5" fill={goldStroke} {...nodeAppear(1.9, 0.25)} />

            {/* Growth rings */}
            <motion.circle cx="200" cy="130" r="20" stroke={goldStroke} strokeWidth="0.3" fill="none" {...draw(1.6, 1.0)} opacity={0.2} />
            <motion.circle cx="200" cy="130" r="40" stroke={goldStroke} strokeWidth="0.2" fill="none" {...draw(1.8, 1.2)} opacity={0.12} />
          </>
        ) : variant === 'industry' ? (
          <>
            {/* Structured pillars — essential B2B sectors */}
            {/* Six sector pillars of varying height */}
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

            {/* Horizontal infrastructure connecting layers */}
            <motion.line x1="55" y1="110" x2="385" y2="110" {...draw(0.9, 1.0)} stroke={goldStroke} strokeWidth="0.35" fill="none" opacity={0.3} />
            <motion.line x1="65" y1="160" x2="375" y2="160" {...draw(1.1, 1.0)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.25} />
            <motion.line x1="75" y1="210" x2="365" y2="210" {...draw(1.3, 0.8)} stroke={goldStroke} strokeWidth="0.25" fill="none" opacity={0.2} />

            {/* Diagonal braces connecting sectors */}
            <motion.line x1="130" y1="110" x2="190" y2="160" {...draw(1.4, 0.7)} stroke={goldStroke} strokeWidth="0.2" fill="none" opacity={0.2} />
            <motion.line x1="250" y1="110" x2="190" y2="160" {...draw(1.5, 0.7)} stroke={goldStroke} strokeWidth="0.2" fill="none" opacity={0.2} />

            {/* Growth arrow on tallest pillar */}
            <motion.path d="M 190 30 L 185 42 M 190 30 L 195 42" {...draw(1.2, 0.6)} stroke={goldStroke} strokeWidth="0.6" fill="none" opacity={0.45} />

            {/* Sector labels */}
            {['ELEC', 'ENV', 'FAC', 'ENG', 'COMP', 'DIST'].map((label, i) => (
              <motion.text key={label} x={[70, 130, 190, 250, 310, 370][i]} y={272} fontSize="4.5" fill={goldStroke} textAnchor="middle"
                initial={{ opacity: 0 }} whileInView={{ opacity: 0.2 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.6 + i * 0.05 }}>
                {label}
              </motion.text>
            ))}

            {/* Node intersections */}
            {[70, 130, 190, 250, 310, 370].map((x, i) => (
              <motion.circle key={x} cx={x} cy={110} r={i === 2 ? 3 : 2} fill={goldStroke} {...nodeAppear(1.5 + i * 0.08, i === 2 ? 0.5 : 0.3)} />
            ))}

            {/* Base line */}
            <motion.line x1="40" y1="260" x2="390" y2="260" {...draw(0.1, 1.0)} stroke={goldStroke} strokeWidth="0.5" fill="none" opacity={0.35} />
          </>
        ) : variant === 'criteria' ? (
          <>
            {/* Evaluation framework — weighted scoring / radar-like assessment */}
            {/* Central evaluation node */}
            <motion.circle cx="200" cy="150" r="3.5" fill={goldStroke} {...nodeAppear(0.5, 0.55)} />

            {/* Seven evaluation axes radiating outward */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
              const x2 = 200 + Math.cos(angle) * 110;
              const y2 = 150 + Math.sin(angle) * 100;
              const xMid = 200 + Math.cos(angle) * 70;
              const yMid = 150 + Math.sin(angle) * 63;
              return (
                <g key={i}>
                  <motion.line x1={200} y1={150} x2={x2} y2={y2}
                    {...draw(0.3 + i * 0.1, 1.0)}
                    stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.2}
                  />
                  {/* Score marker on axis */}
                  <motion.circle cx={xMid} cy={yMid} r="2" fill={goldStroke}
                    {...nodeAppear(1.0 + i * 0.1, 0.4)}
                  />
                  {/* Endpoint node */}
                  <motion.circle cx={x2} cy={y2} r="1.2" fill={goldStroke}
                    {...nodeAppear(1.4 + i * 0.08, 0.2)}
                  />
                </g>
              );
            })}

            {/* Connect score markers to form evaluation polygon */}
            {(() => {
              const points = [0, 1, 2, 3, 4, 5, 6].map((i) => {
                const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
                const scores = [0.7, 0.85, 0.65, 0.9, 0.75, 0.8, 0.7];
                const r = scores[i] * 100;
                return `${200 + Math.cos(angle) * r},${150 + Math.sin(angle) * (r * 0.9)}`;
              });
              return (
                <motion.polygon
                  points={points.join(' ')}
                  {...draw(1.5, 1.4)}
                  stroke={goldStroke} strokeWidth="0.6" fill="none" opacity={0.35}
                />
              );
            })()}

            {/* Inner reference rings */}
            <motion.circle cx="200" cy="150" r="35" stroke={goldStroke} strokeWidth="0.15" fill="none" {...draw(0.8, 1.0)} opacity={0.1} />
            <motion.circle cx="200" cy="150" r="70" stroke={goldStroke} strokeWidth="0.15" fill="none" {...draw(0.9, 1.0)} opacity={0.1} />
            <motion.circle cx="200" cy="150" r="100" stroke={goldStroke} strokeWidth="0.15" fill="none" {...draw(1.0, 1.0)} opacity={0.08} />

            {/* Axis labels */}
            {['SECTOR', 'TRUST', 'CULTURE', 'REVENUE', 'MOAT', 'FOUNDER', 'MARKET'].map((label, i) => {
              const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
              const x = 200 + Math.cos(angle) * 125;
              const y = 150 + Math.sin(angle) * 113;
              return (
                <motion.text key={label} x={x} y={y} fontSize="4.5" fill={goldStroke} textAnchor="middle" dominantBaseline="middle"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 0.22 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.8 + i * 0.05 }}>
                  {label}
                </motion.text>
              );
            })}
          </>
        ) : variant === 'growth' ? (
          <>
            {/* Ascending trajectory — value creation over time */}
            {/* Base timeline */}
            <motion.line x1="40" y1="260" x2="380" y2="260" {...draw(0.1, 1.0)} stroke={goldStroke} strokeWidth="0.4" fill="none" opacity={0.3} />
            {/* Vertical axis */}
            <motion.line x1="40" y1="260" x2="40" y2="30" {...draw(0.2, 1.0)} stroke={goldStroke} strokeWidth="0.4" fill="none" opacity={0.3} />

            {/* Growth curve — accelerating upward */}
            <motion.path
              d="M 50 245 C 90 240 120 235 150 220 C 180 205 200 185 230 155 C 260 120 290 80 330 40"
              {...draw(0.5, 2.0)}
              stroke={goldStroke} strokeWidth="0.8" fill="none" opacity={0.6}
            />

            {/* Milestone nodes along curve */}
            {[
              { x: 90, y: 240 },
              { x: 150, y: 220 },
              { x: 200, y: 185 },
              { x: 260, y: 120 },
              { x: 330, y: 40 },
            ].map((p, i) => (
              <g key={i}>
                <motion.circle cx={p.x} cy={p.y} r={i === 4 ? 4 : 2.5} fill={goldStroke} {...nodeAppear(1.2 + i * 0.15, i === 4 ? 0.55 : 0.35)} />
                {/* Vertical reference lines to axis */}
                <motion.line x1={p.x} y1={p.y} x2={p.x} y2={260}
                  {...draw(1.3 + i * 0.1, 0.6)}
                  stroke={goldStroke} strokeWidth="0.15" fill="none" opacity={0.12}
                  strokeDasharray="2 3"
                />
              </g>
            ))}

            {/* Compounding effect visualization — expanding arcs */}
            <motion.path d="M 260 120 C 275 100 300 80 330 40" stroke={goldStroke} strokeWidth="1.2" fill="none" {...draw(2.0, 0.8)} opacity={0.15} />

            {/* Axis labels */}
            <motion.text x="210" y="278" fontSize="5" fill={goldStroke} textAnchor="middle"
              initial={{ opacity: 0 }} whileInView={{ opacity: 0.2 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 2.0 }}>
              TIME
            </motion.text>
            <motion.text x="25" y="150" fontSize="5" fill={goldStroke} textAnchor="middle" transform="rotate(-90,25,150)"
              initial={{ opacity: 0 }} whileInView={{ opacity: 0.2 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 2.1 }}>
              VALUE
            </motion.text>

            {/* Growth arrow at peak */}
            <motion.path d="M 330 40 L 325 50 M 330 40 L 335 50" {...draw(2.2, 0.5)} stroke={goldStroke} strokeWidth="0.6" fill="none" opacity={0.5} />
          </>
        ) : (
          <>
            {/* Default: abstract diamond network — institutional gravitas */}
            <motion.path d="M 200 50 L 340 150 L 200 250 L 60 150 Z" {...draw(0.3, 1.8)} stroke={goldStroke} strokeWidth="0.6" fill="none" />
            <motion.line x1="200" y1="50" x2="200" y2="250" {...draw(0.9)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.3} />
            <motion.line x1="60" y1="150" x2="340" y2="150" {...draw(1.0)} stroke={goldStroke} strokeWidth="0.3" fill="none" opacity={0.3} />

            {/* Inner diamond */}
            <motion.path d="M 200 100 L 270 150 L 200 200 L 130 150 Z" {...draw(1.2, 1.2)} stroke={goldStroke} strokeWidth="0.4" fill="none" opacity={0.4} />

            {/* Nodes */}
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
