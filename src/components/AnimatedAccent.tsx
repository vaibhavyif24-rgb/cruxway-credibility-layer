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
            {/* TARGET BOARD WITH DART — centered, interactive */}
            {/* Outer ring */}
            <motion.circle cx="200" cy="135" r="95" stroke={goldStroke} strokeWidth="0.5" fill="none"
              {...draw(0.3, 1.6)} opacity={0.15}
              whileHover={{ scale: 1.03 }}
            />
            {/* Second ring */}
            <motion.circle cx="200" cy="135" r="70" stroke={goldStroke} strokeWidth="0.5" fill="none"
              {...draw(0.5, 1.4)} opacity={0.2}
            />
            {/* Third ring */}
            <motion.circle cx="200" cy="135" r="45" stroke={goldStroke} strokeWidth="0.5" fill="none"
              {...draw(0.7, 1.2)} opacity={0.3}
            />
            {/* Inner ring */}
            <motion.circle cx="200" cy="135" r="22" stroke={goldStroke} strokeWidth="0.6" fill="none"
              {...draw(0.9, 1.0)} opacity={0.4}
            />
            {/* Bullseye */}
            <motion.circle cx="200" cy="135" r="7" fill={goldFill}
              {...nodeAppear(1.3, 0.6)}
              whileHover={{ scale: 1.4 }}
            />

            {/* Crosshairs */}
            <motion.line x1="200" y1="35" x2="200" y2="235" stroke={goldStroke} strokeWidth="0.2" fill="none"
              {...draw(0.4, 1.2)} opacity={0.1}
            />
            <motion.line x1="100" y1="135" x2="300" y2="135" stroke={goldStroke} strokeWidth="0.2" fill="none"
              {...draw(0.4, 1.2)} opacity={0.1}
            />

            {/* Dart — angled into bullseye */}
            <motion.path d="M 200 135 L 248 82" {...draw(1.5, 0.8)}
              stroke={goldStroke} strokeWidth="1.4" fill="none" opacity={0.7}
            />
            {/* Dart tip glow */}
            <motion.circle cx="200" cy="135" r="3.5" fill={goldFill}
              {...nodeAppear(1.6, 0.9)}
            />
            {/* Dart fins */}
            <motion.path d="M 243 87 L 254 74 L 248 82 M 243 87 L 256 83 L 248 82"
              {...draw(1.7, 0.6)} stroke={goldStroke} strokeWidth="0.8" fill="none" opacity={0.5}
            />

            {/* Impact ripples — animated */}
            <motion.circle cx="200" cy="135" r="14" stroke={goldStroke} strokeWidth="0.3" fill="none"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1.8, opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.8, ease: 'easeOut' }}
            />
            <motion.circle cx="200" cy="135" r="10" stroke={goldStroke} strokeWidth="0.2" fill="none"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 2.5, opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, delay: 2.0, ease: 'easeOut' }}
            />

            {/* Quote — italic, centered below */}
            <motion.text x="200" y="258" fontSize="7.5" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-serif)" fontStyle="italic" letterSpacing="0.02em"
              {...fadeIn(2.0, 0.4)}>
              "Precision in every partnership we build."
            </motion.text>
            <motion.line x1="130" y1="266" x2="270" y2="266" stroke={goldStroke} strokeWidth="0.3" fill="none"
              {...draw(2.2, 0.6)} opacity={0.15}
            />

            {/* Subtle tick marks on rings */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 200 + 92 * Math.cos(rad);
              const y1 = 135 + 92 * Math.sin(rad);
              const x2 = 200 + 98 * Math.cos(rad);
              const y2 = 135 + 98 * Math.sin(rad);
              return (
                <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  {...draw(0.3 + i * 0.05, 0.3)} stroke={goldStroke} strokeWidth="0.4" fill="none" opacity={0.15}
                />
              );
            })}
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
            {/* FROM DISCOVERY TO PARTNERSHIP — Interactive pipeline */}
            <motion.text x="200" y="24" fontSize="6.5" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="0.25em"
              {...fadeIn(0.2, 0.5)}>
              FROM DISCOVERY TO PARTNERSHIP
            </motion.text>
            <motion.line x1="110" y1="30" x2="290" y2="30" stroke={goldStroke} strokeWidth="0.3" fill="none"
              {...draw(0.3, 0.8)} opacity={0.2}
            />

            {(() => {
              const stages = [
                { label: 'DISCOVERY', num: '01', sub: ['Market scan', 'Sector thesis', 'Pipeline build'], x: 55 },
                { label: 'EVALUATION', num: '02', sub: ['Fit scoring', 'Culture check', 'Thesis alignment'], x: 138 },
                { label: 'DILIGENCE', num: '03', sub: ['Financials', 'Operations', 'Legal review'], x: 221 },
                { label: 'STRUCTURING', num: '04', sub: ['Deal terms', 'Governance', 'Integration plan'], x: 304 },
              ];
              const y = 100;

              return (
                <>
                  {/* Main horizontal line */}
                  <motion.line x1={30} y1={y} x2={370} y2={y}
                    {...draw(0.4, 1.4)} stroke={goldStroke} strokeWidth="0.4" fill="none" opacity={0.15}
                  />

                  {stages.map((s, i) => (
                    <g key={s.label}>
                      {/* Outer interactive ring */}
                      <motion.circle cx={s.x} cy={y} r="18" stroke={goldStroke} strokeWidth="0.4" fill="none"
                        {...draw(0.5 + i * 0.15, 0.8)} opacity={0.2}
                        whileHover={{ scale: 1.15, opacity: 0.5 }}
                      />
                      {/* Pulse ring */}
                      <motion.circle cx={s.x} cy={y} r="22" stroke={goldStroke} strokeWidth="0.2" fill="none"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: [0.8, 1.2, 0.8], opacity: [0, 0.15, 0] }}
                        viewport={{ once: false }}
                        transition={{ duration: 3, delay: 1.5 + i * 0.4, repeat: Infinity }}
                      />
                      {/* Inner filled dot */}
                      <motion.circle cx={s.x} cy={y} r="5" fill={goldFill}
                        {...nodeAppear(0.7 + i * 0.15, 0.5)}
                        whileHover={{ scale: 1.5 }}
                      />
                      {/* Stage number */}
                      <motion.text x={s.x} y={y + 2} fontSize="4.5" fill="hsl(210 50% 5%)" textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-sans)" fontWeight="700"
                        {...fadeIn(0.9 + i * 0.12, 0.7)}>
                        {s.num}
                      </motion.text>
                      {/* Stage label */}
                      <motion.text x={s.x} y={y + 34} fontSize="5" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="0.1em"
                        {...fadeIn(1.0 + i * 0.12, 0.4)}>
                        {s.label}
                      </motion.text>
                      {/* Sub-details */}
                      {s.sub.map((line, j) => (
                        <motion.text key={j} x={s.x} y={y + 50 + j * 12} fontSize="3.8" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-sans)"
                          {...fadeIn(1.3 + i * 0.1 + j * 0.05, 0.2)}>
                          {line}
                        </motion.text>
                      ))}
                      {/* Connector arrows */}
                      {i < stages.length - 1 && (
                        <>
                          <motion.line x1={s.x + 20} y1={y} x2={stages[i + 1].x - 20} y2={y}
                            {...draw(0.6 + i * 0.15, 0.5)} stroke={goldStroke} strokeWidth="0.7" fill="none" opacity={0.3}
                          />
                          <motion.path
                            d={`M ${stages[i + 1].x - 24} ${y - 3} L ${stages[i + 1].x - 19} ${y} L ${stages[i + 1].x - 24} ${y + 3}`}
                            {...draw(0.8 + i * 0.15, 0.3)} stroke={goldStroke} strokeWidth="0.5" fill="none" opacity={0.3}
                          />
                        </>
                      )}
                    </g>
                  ))}

                  {/* Final destination — PARTNERSHIP diamond */}
                  <motion.path d="M 380 80 L 398 100 L 380 120 L 362 100 Z" stroke={goldStroke} strokeWidth="0.6" fill="none"
                    {...draw(1.6, 1.0)} opacity={0.35}
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.circle cx="380" cy="100" r="5" fill={goldFill}
                    {...nodeAppear(1.8, 0.6)}
                  />
                  {/* Arrow to diamond */}
                  <motion.line x1={stages[3].x + 20} y1={y} x2="358" y2={y}
                    {...draw(1.4, 0.5)} stroke={goldStroke} strokeWidth="0.7" fill="none" opacity={0.3}
                  />
                  <motion.text x="380" y="132" fontSize="4.5" fill={goldStroke} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="0.12em"
                    {...fadeIn(2.0, 0.5)}>
                    PARTNERSHIP
                  </motion.text>

                  {/* Bottom progress bar */}
                  <motion.line x1="55" y1="270" x2="380" y2="270" stroke={goldStroke} strokeWidth="0.3" fill="none"
                    {...draw(2.0, 1.0)} opacity={0.1}
                  />
                  <motion.line x1="55" y1="270" x2="380" y2="270" stroke={goldStroke} strokeWidth="0.6" fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
                  />
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
