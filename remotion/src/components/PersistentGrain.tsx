import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const PersistentGrain = () => {
  const frame = useCurrentFrame();
  // Shift the SVG filter seed each frame for organic grain
  const seed = frame % 100;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.06 }}>
      <svg width="100%" height="100%">
        <filter id={`grain-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed={seed} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};
