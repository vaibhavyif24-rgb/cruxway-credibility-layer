

## Plan: Professional StepNavigator + Mobile-Optimized Value Creation Chart

### Problem 1: StepNavigator Buttons Look Childish
The current `flex-wrap gap-2` layout creates an uneven 2x2 grid on mobile with mismatched button widths. This looks amateurish. The screenshot confirms the issue: buttons have inconsistent sizing and awkward wrapping.

### Fix: Clean Vertical List on Mobile, Horizontal Row on Desktop
Replace the `flex-wrap` button layout with a structured approach:

**Mobile (< 768px):** A clean 2-column CSS grid with equal-width buttons, consistent height, and proper alignment. Each button fills its cell evenly. This eliminates the ragged wrapping.

**Desktop:** A single horizontal row with `grid-cols-4` so all four buttons are equal width and perfectly aligned.

**Button styling upgrade:**
- Remove `min-w-[44px]` (causes uneven sizing)
- Use `grid grid-cols-2 md:grid-cols-4` for perfect alignment
- Add `text-center justify-center` so content is centered within each cell
- Slightly increase padding for institutional feel

### Problem 2: Value Creation Chart Overflows on Mobile
The chart uses absolute positioning with fixed pixel widths (`barWidth: 64px * 4 + gap: 20px * 3 = 316px`) but the SVG and bar container don't constrain properly on 390px screens. The bars and trajectory line may clip or overflow.

### Fix: Reduce Mobile Bar Dimensions + Responsive Chart
- Reduce mobile bar widths from `64px` to `52px`
- Reduce mobile gaps from `20px` to `14px`
- Reduce mobile bar heights from `[100, 160, 230, 310]` to `[80, 135, 195, 260]`
- Reduce chart height on mobile from `380px` to `340px`
- Make label containers narrower on mobile (`width: 70px` instead of `90px`)
- Ensure the SVG trajectory line recalculates with the smaller dimensions

### Technical Changes

**File: `src/pages/OurPlaybook.tsx`**

**StepNavigator (lines 43-95):** Replace the button container `div` with a CSS grid layout:
- `grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3`
- Each button becomes `w-full` with centered text
- Consistent `py-3` height across all buttons

**ValueCreationChart (lines 98-322):** Adjust mobile dimensions:
- `barHeights`: `[80, 135, 195, 260]` mobile
- `barWidth`: `52` mobile
- `gap`: `14` mobile  
- `chartHeight`: `340` mobile
- Label container width: `70px` mobile
- Font sizes slightly smaller on mobile for labels

### What stays the same
- All interaction logic (click-to-select, AnimatePresence)
- Desktop dimensions unchanged
- All styling layers (gradients, textures, shimmer)
- Growth trajectory SVG (just recalculates with new mobile coords)

