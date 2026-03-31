

## Redesign CinematicBreaker — From Amateur to Institutional

### Problem
The current breaker has three issues:
1. **Images drowned by 90% black overlay** — the photos are barely visible, defeating the purpose
2. **Gold diamond ornament is meaningless** — a random rotating shape with no connection to content or brand
3. **Static feel** — no real motion or cinematic quality despite the name

### Design Direction
Replace the static image + ornament with a **cinematic ambient video loop** using high-quality stock footage. Video inherently provides the "something moving" the user wants. The overlay will be lighter (50-65%) so the footage is actually visible. Instead of a random gold diamond, use a **subtle typographic element** — a single word or the brand mark — that gives the section meaning.

### Changes

**File: `src/pages/Home.tsx` — Rewrite `CinematicBreaker` component**

Replace the `<img>` with a `<video>` element using free stock video loops:
- **US**: Corporate/urban aerial footage (slow drone over city skyline at dusk)
- **India**: Industrial/business district footage (modern infrastructure timelapse)
- Video: `autoPlay`, `muted`, `loop`, `playsInline` — no controls, pure ambient
- Source: Unsplash or Pexels free video URLs (e.g., Pexels stock video embeds)

Reduce overlay from 0.9 max → **0.55 max** so the video is clearly visible with depth.

Remove the gold diamond ornament entirely. Replace with a **thin horizontal rule** that simply separates — or nothing at all, letting the video speak for itself. Optionally, a single understated word like the section transition context (e.g., a very faint "·" dot separator or a subtle brand wordmark at 15% opacity).

Keep the parallax scroll transforms on the video container and the top/bottom gradient fades for seamless blending into adjacent sections.

**Specific implementation:**
1. Replace `<img>` with `<video autoPlay muted loop playsInline className="w-full h-full object-cover">`
2. Video sources: use Pexels free video CDN URLs (720p for performance)
   - US: aerial city/corporate footage
   - India: modern business/infrastructure footage
3. Overlay: change `overlayOpacity` range from `[0.9, 0.4, 0.9]` to `[0.65, 0.35, 0.65]`
4. Remove the entire gold ornament `<div>` block (lines 287-314)
5. Remove the `backdrop-blur` frosted div in light mode (line 283) — unnecessary with video
6. Add a single centered thin gold horizontal line (60px wide, 1px tall, 30% opacity) as a minimal separator — clean and institutional, no gimmicky shapes

### Technical Details
- Single file edit: `src/pages/Home.tsx`, lines 237-317
- Video element with `autoPlay muted loop playsInline` for silent ambient playback
- Pexels provides direct CDN video URLs that work as `<video src="...">`
- Fallback: if video fails to load, the gradient fades still provide visual separation

