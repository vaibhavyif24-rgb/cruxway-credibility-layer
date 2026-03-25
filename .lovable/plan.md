

## Fix Sticky Card Stack: Reduce Gap + Add Scroll-Reveal Text Animation

### Problems
1. **Excessive blank space**: The outer wrapper is `cards.length * 0.85 * 100vh` = ~340vh tall, but the visible card is only 380px. The remaining scroll runway creates massive empty space below the last card before "Institutional Experience."
2. **No scroll-triggered text reveal**: Card text appears instantly — it should fade in word-by-word or element-by-element as the card becomes active, matching the site's `ScrollRevealText` pattern.

### Changes

#### 1. `src/components/StickyCardStack.tsx`
- **Reduce scroll runway**: Change `SCROLL_PER_CARD` from `0.85` to `0.65` so the total outer height shrinks from ~340vh to ~260vh, eliminating the large gap before the next section.
- **Add scroll-triggered text animation to CardSurface**: Accept an `isActive` prop. When `isActive` becomes true, animate the step label, title, and description in sequence using CSS transitions (opacity 0→1, translateY 12px→0, staggered delays of 0s/0.1s/0.2s). When not active, elements stay at opacity 0 / translateY 12px. This mirrors the site's scroll-reveal pattern without needing framer-motion.
- Pass `isActive={i === activeIndex}` from the carousel to each `CardSurface`.

#### 2. `src/pages/Home.tsx`
- Reduce bottom padding on the "Our Process" section wrapper: change `pt-10 md:pt-14 lg:pt-16` and add `pb-0` to eliminate extra spacing below the stack before "Institutional Experience."

### Technical Detail
```text
CardSurface receives isActive boolean:
- Step label:   opacity/translateY transition, delay 0s
- Title:        opacity/translateY transition, delay 0.1s  
- Description:  opacity/translateY transition, delay 0.2s
- Big number:   opacity transition, delay 0.15s

All use CSS transition (0.5s ease-out) toggled by isActive,
no JS animation library needed.
```

