import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const FinalMerge = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // CRUXWAY text scales in from spring
  const textSpring = spring({ frame: frame - 10, fps, config: { damping: 30, stiffness: 100 } });
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);
  const textScale = interpolate(textSpring, [0, 1], [0.9, 1]);

  // Gold line expands under text
  const lineSpring = spring({ frame: frame - 25, fps, config: { damping: 35, stiffness: 80 } });
  const lineWidth = interpolate(lineSpring, [0, 1], [0, 200]);

  // Background glow pulse
  const glowOpacity = interpolate(frame, [10, 35, 60, 90], [0, 0.25, 0.15, 0.1], { extrapolateRight: "clamp" });

  // Shimmer sweep
  const shimmerX = interpolate(frame, [30, 65], [-120, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Final hold - don't fade out, just hold
  const holdOpacity = interpolate(frame, [70, 90], [1, 0.95], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * holdOpacity, backgroundColor: "#0B131E" }}>
      {/* Radial glow behind wordmark */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 700,
          height: 400,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(ellipse, rgba(197,146,42,${glowOpacity}) 0%, transparent 60%)`,
        }}
      />

      {/* CRUXWAY text */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "46%",
          transform: `translate(-50%, -50%) scale(${textScale})`,
          opacity: textOpacity,
          fontFamily: "serif",
          fontSize: 160,
          fontWeight: 400,
          letterSpacing: "0.1em",
          color: "#C5922A",
          textShadow: "0 0 50px rgba(197,146,42,0.3), 0 0 100px rgba(197,146,42,0.1)",
        }}
      >
        CRUXWAY
        {/* Shimmer overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, transparent 30%, rgba(248,246,242,0.12) 50%, transparent 70%)`,
            transform: `translateX(${shimmerX}%)`,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* Gold line beneath */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "56%",
          height: 1.5,
          width: lineWidth,
          transform: "translateX(-50%)",
          backgroundColor: "#C5922A",
          boxShadow: "0 0 15px rgba(197,146,42,0.3)",
          opacity: interpolate(lineSpring, [0, 1], [0, 0.8]),
        }}
      />

      {/* Subtle tagline fade-in */}
      {frame > 45 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "61%",
            transform: "translateX(-50%)",
            opacity: interpolate(frame, [45, 65], [0, 0.4], { extrapolateRight: "clamp" }),
            fontFamily: "sans-serif",
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#F8F6F2",
          }}
        >
          LOWER MIDDLE MARKET PRIVATE EQUITY
        </div>
      )}
    </AbsoluteFill>
  );
};
