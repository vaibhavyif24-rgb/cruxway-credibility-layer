import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const WayReveal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // WAY text spring-in
  const textSpring = spring({ frame: frame - 8, fps, config: { damping: 22, stiffness: 100 } });
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);
  const textY = interpolate(textSpring, [0, 1], [30, 0]);

  // Path remnants in background
  const pathOpacity = interpolate(frame, [0, 20, 50, 75], [0.3, 0.2, 0.15, 0], { extrapolateRight: "clamp" });

  // Shimmer across WAY
  const shimmerX = interpolate(frame, [20, 55], [-100, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const fadeOut = interpolate(frame, [55, 75], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const vpX = 960;
  const vpY = 350;

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut, backgroundColor: "#0B131E" }}>
      {/* Background path remnants */}
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <line x1={vpX - 2} y1={vpY} x2={700} y2={1080} stroke="#C5922A" strokeWidth="1" opacity={pathOpacity} />
        <line x1={vpX + 2} y1={vpY} x2={1220} y2={1080} stroke="#C5922A" strokeWidth="1" opacity={pathOpacity} />
      </svg>

      {/* Horizon glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "35%",
          width: 500,
          height: 150,
          borderRadius: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(197,146,42,0.12) 0%, transparent 70%)",
        }}
      />

      {/* WAY text */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, calc(-50% + ${textY}px))`,
          opacity: textOpacity,
          fontFamily: "serif",
          fontSize: 180,
          fontWeight: 400,
          letterSpacing: "0.08em",
          color: "#C5922A",
          textShadow: "0 0 60px rgba(197,146,42,0.4), 0 0 120px rgba(197,146,42,0.15)",
        }}
      >
        WAY
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
    </AbsoluteFill>
  );
};
