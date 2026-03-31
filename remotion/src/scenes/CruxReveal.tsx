import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const CruxReveal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in from crucible scene
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Gold text materializes — spring entrance
  const textSpring = spring({ frame: frame - 15, fps, config: { damping: 25, stiffness: 120 } });
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);
  const textScale = interpolate(textSpring, [0, 1], [0.85, 1]);

  // Glow behind text
  const glowOpacity = interpolate(frame, [15, 40, 60, 100], [0, 0.5, 0.3, 0], { extrapolateRight: "clamp" });

  // Subtle shimmer sweep across text
  const shimmerX = interpolate(frame, [30, 70], [-100, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Residual sparks from solidification
  const residualSparks = Array.from({ length: 6 }, (_, i) => {
    const delay = 20 + i * 5;
    const progress = interpolate(frame, [delay, delay + 30], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return {
      x: 960 + (i - 3) * 80 + Math.sin(i) * 40,
      y: interpolate(progress, [0, 1], [540, 400]),
      opacity: interpolate(progress, [0, 0.2, 0.8, 1], [0, 0.7, 0.3, 0]),
    };
  });

  // Fade out at end
  const fadeOut = interpolate(frame, [80, 100], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      {/* Background warm glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, rgba(197,146,42,${glowOpacity}) 0%, transparent 50%)`,
        }}
      />

      {/* CRUX text */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${textScale})`,
          opacity: textOpacity,
          fontFamily: "serif",
          fontSize: 180,
          fontWeight: 400,
          letterSpacing: "0.08em",
          color: "#C5922A",
          textShadow: "0 0 60px rgba(197,146,42,0.4), 0 0 120px rgba(197,146,42,0.15)",
        }}
      >
        CRUX
        {/* Shimmer overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, transparent 30%, rgba(248,246,242,0.15) 50%, transparent 70%)`,
            transform: `translateX(${shimmerX}%)`,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* Residual sparks */}
      {residualSparks.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: 3,
            height: 3,
            borderRadius: "50%",
            backgroundColor: "#C5922A",
            opacity: s.opacity,
            boxShadow: "0 0 8px rgba(197,146,42,0.5)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
