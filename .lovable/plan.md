

## Replace CinematicBreaker + Market Thesis with OpportunityCinematic

### What changes
Delete `CinematicBreaker` component (lines 236-299). Create `OpportunityCinematic` in its place — a video-backed section header with the "The Opportunity" / "Our Thesis" heading overlaid on cinematic video. Then update the JSX to replace the breaker + full ScrollRevealText with the new component + a stats-only ScrollRevealText.

### File: `src/pages/Home.tsx`

**1. Delete `CinematicBreaker` (lines 236-299), replace with `OpportunityCinematic`:**
- `useScroll` + `useTransform` for parallax video (scale 1.08→1.15→1.08, y 0%→6%)
- Text parallax: y 40→0, opacity 0→1 based on scroll
- `<video autoPlay muted loop playsInline>` with poster fallback images
- Deep navy overlay (not black): `hsl(228,55%,8%)` gradients at 70-92% opacity
- SVG noise grain at 3% opacity for cinematic texture
- Centered content: gold label with animated flanking lines, white heading with gold keyword highlights, gold ornament (lines + diamond)
- Top/bottom gradient fades matching adjacent sections
- Height: `clamp(50vh, 60vh, 70vh)`
- India video: `3571264-uhd_2560_1440_30fps.mp4`, US: `3129671-uhd_2560_1440_30fps.mp4`
- Poster images: existing Unsplash URLs for instant visual while video loads

**2. Update JSX (lines 396-414):**

Replace:
```
<CinematicBreaker ... />
<ScrollRevealText label="The Opportunity" heading="India's lower middle market..." stats={...} variant="dark" />
```

With:
```
<OpportunityCinematic isIndia={isIndia} isDark={isDark} />
<ScrollRevealText
  heading="Companies proven over decades..."  (secondary statement only)
  highlights={['discipline'] / ['Patient']}
  stats={...same stats...}
  variant="dark"
/>
```

The primary hook heading moves into the video section. ScrollRevealText keeps only the secondary statement and stats, with no `label` prop.

### Design rationale
- Video provides ambient motion and texture without distraction
- Deep navy overlay (not black) maintains brand identity
- Heading split: dramatic hook in video, evidence/stats in scroll section = narrative arc
- Film grain adds analog warmth at imperceptible 3% opacity
- Gold ornament is minimal (lines + tiny diamond) — institutional, not decorative

