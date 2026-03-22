

## Plan: Fix SVGs and Equalize Box Layouts

### 1. Partnership (Target/Dart) SVG — About Us Page

**Issues identified:** The dart shape is unclear (just triangles), there are crosshair tick marks around the rings that clutter the design, and the tagline text is too small (fontSize="10.5").

**Fix:**
- Redesign the dart with a clear, recognizable shape: a long shaft line, a proper pointed tip at center (200,126), and two distinct angled fins/fletching at the tail end
- Remove the 8 tick marks around the outer ring (the `[0, 45, 90, 135, ...].map` section)
- Increase tagline font size from `10.5` to `16` and make it bolder with higher opacity (0.8+)
- Keep the concentric target rings and impact ripple as-is

### 2. "What Guides Us" Boxes — GuidingPrinciples Page

**Issue:** GlassCard wraps content in two nested divs (outer `group` div + inner styled div), and has no height enforcement. The grid cells vary based on content length.

**Fix in `GuidingPrinciples.tsx`:**
- Add `h-full` to the GlassCard className prop
- Ensure the outer GlassCard wrapper also stretches: add `h-full` to the outer `motion.div` in `GlassCard.tsx` (the `group` div)
- This ensures `auto-rows-fr` on the grid can properly equalize all 6 cards

**Fix in `GlassCard.tsx`:**
- Add `h-full` to the outer `motion.div` (line 24's className="group" → className="group h-full")
- Add `h-full` to the inner `motion.div` so it stretches to fill

### 3. Criteria Pipeline SVG — Investment Criteria Page

**Issues identified:** The SVG viewBox is 400×300 but the pipeline diagram is cramped into a small area, sub-pointers are tiny (fontSize 4.1), the title is tiny (fontSize 7), there's excessive empty space at the bottom with decorative lines.

**Fix:**
- Increase title fontSize from `7` to `10` and make it more prominent
- Increase stage card sizes: wider boxes (w: 72→80), taller (h: 112→130)
- Increase all text sizes: stage titles from `4.85` to `6.5`, sub-pointers from `4.1` to `5.5`, number labels from `4.8` to `6`
- Remove the bottom decorative lines (lines 207-209) that create unnecessary gap
- Move the quote text up and reduce bottom padding
- Make connecting arrows thicker and more visible (strokeWidth 0.7→1.0)
- Increase the PARTNERSHIP diamond and its label size

### Files to Edit
1. **`src/components/AnimatedAccent.tsx`** — Redesign `partnership` dart, polish `criteria` pipeline
2. **`src/components/GlassCard.tsx`** — Add `h-full` to both wrapper divs
3. **`src/pages/GuidingPrinciples.tsx`** — Add `h-full` to GlassCard className for equal height

