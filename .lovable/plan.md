

## Plan: Remove Frosted Boxes, Add Text Glow Effects, Fix Transitions

### Problems
1. **Visible frosted white rectangles** over photos look amateurish — need invisible text enhancement instead
2. **Text still getting lost** in light mode against busy backgrounds
3. **Transitions between acts not smooth** — some text disappears too early or appears too late
4. **Merge section (Acts 3-4)** needs more professional imagery — converging roads/waves instead of static image

### Approach

Replace the `FrostedScrim` component entirely with an invisible **text glow aura** — a large, soft radial glow centered behind the text that blends seamlessly with the image overlay. No visible edges, no rectangles.

---

### Changes to `CruxwayOriginStory.tsx`

**1. Remove FrostedScrim component entirely** — delete lines 106-135 and all 4 usages (lines 264, 328, 392, 462)

**2. Replace with TextAura component** — invisible radial glow behind text:
```tsx
const TextAura = ({ isDark }: { isDark: boolean }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      width: '700px',
      height: '500px',
      background: isDark
        ? 'radial-gradient(ellipse, hsl(220 30% 6% / 0.7) 0%, hsl(220 30% 6% / 0.3) 40%, transparent 70%)'
        : 'radial-gradient(ellipse, hsl(40 30% 94% / 0.85) 0%, hsl(40 25% 92% / 0.5) 35%, transparent 65%)',
      filter: isDark ? 'blur(40px)' : 'blur(50px)',
      zIndex: -1,
    }}
  />
);
```
This creates an invisible fog/haze behind text — no edges, no box, just atmospheric contrast. The heavy blur makes it blend into the image naturally.

**3. Strengthen light-mode overlays further** to reduce image busyness:
- Crucible light: bottom opacity → `0.68` (was `0.62`)
- Way light: bottom → `0.72` (was `0.65`)
- Merge light: bottom → `0.82` (was `0.78`)

**4. Fix light-mode text shadows** — use subtle dark shadows instead of white halos:
- `videoTextShadow` light: `'0 1px 3px rgba(0,0,0,0.15), 0 0 30px hsl(40 30% 94% / 0.8)'`
- `videoSubShadow` light: `'0 1px 2px rgba(0,0,0,0.10), 0 0 20px hsl(40 30% 94% / 0.6)'`

**5. Generate new merge image** — use AI image generation to create a cinematic image of converging golden roads/paths merging into one, with a dark-to-warm gradient. This replaces the current `cruxway-merge-v2.jpg` and works for both themes.

**6. Fix transition timing gaps** — currently Act 1 fades out at `0.28` and Act 2 background fades in at `0.22-0.28`, but Act 2 *text* doesn't appear until `0.32-0.36`. This creates a 4-8% dead zone where the user sees an image with no text. Fix:
- Act 2 label: `[0.28, 0.32]` → start right as Act 1 text fades
- Act 2 heading: `[0.29, 0.34]` → stagger after label
- Act 2 phonetic: `[0.31, 0.35]`
- Act 2 definition: `[0.33, 0.38]`
- Similarly tighten Act 3 and Act 4 entry points

**7. Redesign Origin Story bridge heading** in `GuidingPrinciples.tsx`:
- Increase the visual weight: use serif font for "The Origin Story" at `text-[18px] md:text-[22px]`
- Add a subtle gold gradient underline below the heading
- Keep subtitle but make it `text-[12px]` muted
- Reduce padding to `py-6 md:py-8`
- Ensure colors work in both themes (dark navy text in light, white in dark)

### Files Modified
- `src/components/CruxwayOriginStory.tsx` — remove FrostedScrim, add TextAura, fix overlays/shadows/timing
- `src/pages/GuidingPrinciples.tsx` — redesign bridge heading
- `src/assets/cruxway-merge-v3.jpg` — new AI-generated converging paths image

