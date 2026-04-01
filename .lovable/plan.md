

# Rebuild CruxwayOriginStory: Scroll-Driven Diptych

## Problem
The current component has the right code structure (useScroll/useTransform, 300vh sticky) but is broken in practice:
- **Videos aren't loading** -- the crucible video (33938968) shows nothing/black, the "Way" video (7895948) is static desert aerial, not forward-moving
- **4 phases is too many** -- Phase 3 (equation) and Phase 4 (final CRUXWAY) are redundant. User wants 3 clean phases
- **Text bleeds across panels** during the split (the Phase 1 full-viewport text lingers into Phase 2 timing)

## What Changes

### 1. Replace both video sources
- **Crucible**: Replace with Pexels **4927566** (close-up of metalworker grinding with bright orange sparks flying) or **3191572** (molten iron being poured in foundry). Both are bright, warm, unmistakably "forge/transformation." Include a fallback to a Pexels still image with Ken Burns if video fails to load.
- **The Way**: Replace with Pexels **1572342** ("Car Driving Along The Desert Highway") -- a forward-driving POV video on a long desert road with strong vanishing-point perspective and actual movement. This is the "moving" video the user wants.

### 2. Simplify to exactly 3 phases (not 4)

**Phase 1: CRUCIBLE (progress 0.00 -- 0.25)**
Full-screen crucible video. "CRUCIBLE" centered in gold serif + one-line definition. Right panel width: 0%.

**Phase 2: THE SPLIT (progress 0.25 -- 0.55)**
Left panel compresses 100% -> 50%, right panel grows 0% -> 50%. Gold seam draws. Per-panel text appears: "CRUCIBLE" (left, contained), "THE WAY" (right, contained) with one-line definitions each.

**Phase 3: CRUXWAY resolves (progress 0.55 -- 1.00)**  
Per-panel text fades. Centered across both panels: "CRUX + WAY" equation that resolves into "CRUXWAY" with gold rule + "Forging conviction through rigour." This is ONE phase, not two. The equation and the final word happen together in a continuous reveal.

### 3. Delete all existing code, write from scratch

The component keeps the same interface (`<CruxwayOriginStory />`, no props, reads useTheme/useIsMobile internally). Same 300vh container, same sticky top-0 h-screen architecture. But rewritten cleanly with exactly 3 text layers, proper phase timing, and working videos.

### 4. Mobile: crossfade (unchanged approach)
Same as current: crossfade between crucible and way videos instead of horizontal split. 3 phases mapped to crossfade timing.

## Technical Details

**File changed**: `src/components/CruxwayOriginStory.tsx` (full rewrite)

**Video URLs to use**:
```
CRUCIBLE_VIDEO = 'https://videos.pexels.com/video-files/4927566/4927566-hd_1920_1080_24fps.mp4'
CRUCIBLE_POSTER = 'https://images.pexels.com/videos/4927566/free-video-4927566.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
WAY_VIDEO = 'https://videos.pexels.com/video-files/1572342/1572342-hd_1920_1080_30fps.mp4'
WAY_POSTER = 'https://images.pexels.com/videos/1572342/free-video-1572342.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
```

**Scroll mapping (3 phases)**:
```
leftWidth:   [0, 0.20, 0.45] -> ['100%', '100%', '50%']
rightWidth:  [0, 0.20, 0.45] -> ['0%', '0%', '50%']
seamHeight:  [0.30, 0.48] -> ['0%', '100%']
phase1Text:  [0, 0.02, 0.18, 0.25] -> [0, 1, 1, 0]
phase2Text:  [0.40, 0.50, 0.55, 0.62] -> [0, 1, 1, 0]
phase3Text:  [0.60, 0.72, 0.95, 1.0] -> [0, 1, 1, 1]
phase3Scale: [0.60, 0.72] -> [0.92, 1]
```

**Overlays**: Keep lighter (20-45% opacity max) with heavy textShadow for legibility.

**LazyVideo**: Same IntersectionObserver play/pause pattern. Add `onError` fallback to show poster as static image with Ken Burns if video fails.

