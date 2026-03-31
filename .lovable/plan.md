

## Video Upgrade + Overlay Fix + Performance Attributes

**File**: `src/pages/Home.tsx` — `OpportunityCinematic` component (lines 260-279, 283-287)

### 1. Replace video sources (lines 272-278)

**US region**: Manhattan evening skyline — cinematic, horizontal 2560x1440, slow pan across Midtown at dusk
```
https://videos.pexels.com/video-files/31209892/13331473_2560_1440_24fps.mp4
```

**India region**: Drone aerial of modern high-rise cityscape — aspirational, horizontal 2562x1440, smooth aerial dolly
```
https://videos.pexels.com/video-files/4193140/4193140-uhd_2562_1440_24fps.mp4
```

### 2. Update poster images (lines 267-270)

Match poster images to the video content:
- India: `https://images.pexels.com/videos/4193140/pexels-photo-4193140.jpeg?auto=compress&w=1200`
- US: `https://images.pexels.com/videos/31209892/pexels-photo-31209892.jpeg?auto=compress&w=1200`

### 3. Fix light-mode overlay (line 286)

Change from:
```
hsl(228 45% 14% / 0.65) ... 0.82 ... 0.92
```
To:
```
hsl(228 45% 12% / 0.75) ... 0.88 ... 0.95
```

### 4. Add performance attributes to `<video>` (line 260-265)

Add `fetchPriority="low"` and `loading="lazy"` to the `<video>` element (note: `loading="lazy"` is non-standard on video but harmless; the key optimization is `preload="metadata"` which is already there, plus `fetchPriority="low"`).

### 5. Fix hooks error

The "fewer hooks" error needs investigation — will also check if there's a conditional hook call anywhere in the render path. The `ScrollRevealText` component uses `useScroll` unconditionally so it should be fine. This error may have been transient from a hot-reload. Will ensure no conditional returns exist before hooks in the component.

### Technical details
- Single file edit: `src/pages/Home.tsx`, lines 260-287
- All changes are within the `OpportunityCinematic` component
- Video URLs are confirmed horizontal (landscape) format from Pexels with high engagement

