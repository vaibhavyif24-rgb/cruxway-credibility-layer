import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const PathScene = () => {
  const frame = useCurrentFrame();

  // Hard cut in (instant)
  const fadeIn = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // Path draws itself from bottom center toward horizon
  const pathProgress = interpolate(frame, [5, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Fog layers drift
  const fogDrift = interpolate(frame, [0, 95], [0, -40]);

  // Golden light traces path
  const lightY = interpolate(pathProgress, [0, 1], [900, 300]);
  const lightOpacity = interpolate(frame, [10, 25, 70, 95], [0, 0.6, 0.5, 0], { extrapolateRight: "clamp" });

  // Fade out
  const fadeOut = interpolate(frame, [75, 95], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Perspective path lines (converging to vanishing point)
  const vpX = 960;
  const vpY = 300;

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut, backgroundColor: "#0B131E" }}>
      {/* Fog layers */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: -100 + i * 200 + fogDrift * (i + 1) * 0.3,
            top: 200 + i * 100,
            width: 800,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(ellipse, rgba(248,246,242,${0.03 + i * 0.01}) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
      ))}

      {/* Path / road */}
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="pathGold" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopColor="#C5922A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C5922A" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Left path edge */}
        <line
          x1={vpX - 2}
          y1={vpY}
          x2={700}
          y2={1080}
          stroke="#C5922A"
          strokeWidth="1.5"
          opacity={0.4}
          strokeDasharray={1200}
          strokeDashoffset={interpolate(pathProgress, [0, 1], [1200, 0])}
        />

        {/* Right path edge */}
        <line
          x1={vpX + 2}
          y1={vpY}
          x2={1220}
          y2={1080}
          stroke="#C5922A"
          strokeWidth="1.5"
          opacity={0.4}
          strokeDasharray={1200}
          strokeDashoffset={interpolate(pathProgress, [0, 1], [1200, 0])}
        />

        {/* Center line */}
        <line
          x1={vpX}
          y1={vpY}
          x2={vpX}
          y2={1080}
          stroke="#C5922A"
          strokeWidth="0.5"
          opacity={0.2}
          strokeDasharray={800}
          strokeDashoffset={interpolate(pathProgress, [0, 1], [800, 0])}
        />
      </svg>

      {/* Golden light point moving along path */}
      <div
        style={{
          position: "absolute",
          left: vpX,
          top: lightY,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#C5922A",
          opacity: lightOpacity,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 40px rgba(197,146,42,0.5), 0 0 100px rgba(197,146,42,0.2)",
        }}
      />

      {/* Horizon glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: vpY - 50,
          width: 600,
          height: 200,
          borderRadius: "50%",
          transform: "translateX(-50%)",
          background: `radial-gradient(ellipse, rgba(197,146,42,${lightOpacity * 0.4}) 0%, transparent 70%)`,
        }}
      />
    </AbsoluteFill>
  );
};
