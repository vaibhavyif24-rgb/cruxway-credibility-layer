import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const CrucibleScene = () => {
  const frame = useCurrentFrame();

  // Scene fades in over first 15 frames
  const sceneOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  // Scene fades out at end to blend into CRUX reveal
  const fadeOut = interpolate(frame, [75, 100], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Crucible vessel glow pulses
  const glowPulse = interpolate(frame, [0, 30, 60, 90], [0.4, 0.8, 0.5, 0.9], { extrapolateRight: "clamp" });

  // Liquid gold swirl rotation
  const swirl = interpolate(frame, [0, 100], [0, 120]);

  // Camera slowly pulls back (scale down from 1.3 to 1.0)
  const scale = interpolate(frame, [0, 100], [1.3, 1.0], { extrapolateRight: "clamp" });

  // Sparks rising
  const sparks = Array.from({ length: 12 }, (_, i) => {
    const startFrame = i * 7;
    const x = 960 + Math.sin(i * 2.3) * 120;
    const startY = 620;
    const progress = interpolate(frame, [startFrame, startFrame + 50], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const y = interpolate(progress, [0, 1], [startY, startY - 350]);
    const sparkOpacity = interpolate(progress, [0, 0.1, 0.7, 1], [0, 0.9, 0.6, 0]);
    const sparkX = x + Math.sin(progress * Math.PI * 2 + i) * 30;
    return { x: sparkX, y, opacity: sparkOpacity, size: 2 + (i % 3) };
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity * fadeOut }}>
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale})`,
          willChange: "transform",
          background: `radial-gradient(ellipse at 50% 65%, rgba(197,146,42,${glowPulse * 0.25}) 0%, rgba(197,146,42,${glowPulse * 0.08}) 30%, transparent 60%)`,
        }}
      />

      {/* Crucible vessel */}
      <svg
        viewBox="0 0 400 300"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 500,
          height: 375,
          transform: `translate(-50%, -40%) scale(${scale})`,
        }}
      >
        {/* Vessel body */}
        <path
          d="M120 100 Q100 100 90 140 L100 250 Q110 270 200 270 Q290 270 300 250 L310 140 Q300 100 280 100 Z"
          fill="none"
          stroke="#C5922A"
          strokeWidth="2"
          opacity={0.6}
        />
        {/* Vessel rim */}
        <ellipse cx="200" cy="100" rx="82" ry="14" fill="none" stroke="#C5922A" strokeWidth="1.5" opacity={0.5} />

        {/* Liquid gold surface - swirling */}
        <g transform={`rotate(${swirl}, 200, 130)`}>
          <ellipse cx="200" cy="125" rx="70" ry="10" fill="#C5922A" opacity={glowPulse * 0.7} />
          <ellipse cx="190" cy="128" rx="40" ry="6" fill="#D4A843" opacity={glowPulse * 0.5} />
          <ellipse cx="215" cy="122" rx="30" ry="5" fill="#E8C45A" opacity={glowPulse * 0.3} />
        </g>

        {/* Inner glow */}
        <ellipse cx="200" cy="160" rx="60" ry="50" fill="url(#crucibleGlow)" opacity={glowPulse} />

        <defs>
          <radialGradient id="crucibleGlow">
            <stop offset="0%" stopColor="#C5922A" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#C5922A" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Heat waves */}
      {[0, 1, 2].map((i) => {
        const waveY = interpolate(
          frame,
          [i * 12, i * 12 + 60],
          [580, 350],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const waveOp = interpolate(
          frame,
          [i * 12, i * 12 + 15, i * 12 + 45, i * 12 + 60],
          [0, 0.15, 0.1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 860 + i * 40,
              top: waveY,
              width: 200,
              height: 2,
              background: `linear-gradient(90deg, transparent, rgba(197,146,42,${waveOp}), transparent)`,
              filter: "blur(2px)",
            }}
          />
        );
      })}

      {/* Sparks */}
      {sparks.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            backgroundColor: "#C5922A",
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 3}px rgba(197,146,42,0.6)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
