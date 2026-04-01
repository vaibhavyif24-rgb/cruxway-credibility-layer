

## Plan: Intersection-Triggered Auto-Rotation with Progress Bar

### What changes

**File: `src/pages/OurPlaybook.tsx` — `StepNavigator` component**

1. **Add `useInView` from framer-motion** to detect when the step navigator enters the viewport. The 10-second auto-rotation timer only starts when the section is visible, and pauses when it scrolls out of view.

2. **Add an animated progress bar** beneath each active step button that fills over 10 seconds, giving a polished visual indicator of time remaining before the next step. When the user clicks a step manually, the progress resets.

3. **Refined transitions**: Keep the existing crossfade but add a subtle scale effect (0.98 → 1) on enter for a more cinematic feel, and use a smoother easing curve.

### Technical details

- Use `useInView` with `{ amount: 0.3 }` on the container `ref` — timer runs only when `isInView` is true.
- `useEffect` depends on `[isInView, active]` — clears interval when out of view, restarts on re-entry.
- Progress bar: a `motion.div` inside each active button with `animate={{ scaleX: 1 }}` over 10s linear, reset via `key={active}`. Thin gold line (2px) at the bottom of the active button.
- Content panel transition updated: `initial={{ opacity: 0, y: 12, scale: 0.98 }}`, `animate={{ opacity: 1, y: 0, scale: 1 }}`, with spring-like ease `[0.16, 1, 0.3, 1]` at 0.45s duration.

### Files modified
- `src/pages/OurPlaybook.tsx`

