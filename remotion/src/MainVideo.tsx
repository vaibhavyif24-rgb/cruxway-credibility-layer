import { AbsoluteFill, Sequence } from "remotion";
import { CrucibleScene } from "./scenes/CrucibleScene";
import { CruxReveal } from "./scenes/CruxReveal";
import { PathScene } from "./scenes/PathScene";
import { WayReveal } from "./scenes/WayReveal";
import { FinalMerge } from "./scenes/FinalMerge";
import { PersistentGrain } from "./components/PersistentGrain";

// 12 seconds total at 30fps = 360 frames
// Scene 1: Crucible (0-90, 3s)
// Scene 2: CRUX solidifies (60-150, crossfade at 60)
// Scene 3: Path (140-230)
// Scene 4: WAY (210-280)
// Scene 5: CRUXWAY merge (270-360)

export const MainVideo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B131E" }}>
      {/* Scene 1: Molten crucible */}
      <Sequence from={0} durationInFrames={100}>
        <CrucibleScene />
      </Sequence>

      {/* Scene 2: CRUX solidifies */}
      <Sequence from={70} durationInFrames={100}>
        <CruxReveal />
      </Sequence>

      {/* Scene 3: Path through fog */}
      <Sequence from={145} durationInFrames={95}>
        <PathScene />
      </Sequence>

      {/* Scene 4: WAY materializes */}
      <Sequence from={215} durationInFrames={75}>
        <WayReveal />
      </Sequence>

      {/* Scene 5: Final CRUXWAY merge */}
      <Sequence from={270} durationInFrames={90}>
        <FinalMerge />
      </Sequence>

      {/* Persistent grain overlay */}
      <PersistentGrain />
    </AbsoluteFill>
  );
};
