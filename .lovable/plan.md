## Surgical Visual Polish — Footer, CinematicBreaker, ScrollReveal, Social Proof

### Section 1:  CinematicBreaker Component + Insertion

**File**: `src/pages/Home.tsx`

Create `CinematicBreaker` component above `Home`:

- Uses `useRef`, `useScroll`, `useTransform` for parallax image with Ken Burns zoom (1.05→1.12→1.05)
- `imgY` parallax: -8% to 8%
- Scroll-linked overlay opacity (0.9→0.4→0.9)
- India image: `photo-1590650153855-d9e808231d41` (industrial), US: `photo-1486406146926-c627a92ad1ab` (corporate skyline)
- Top/bottom gradient fades blending into adjacent sections
- Centered gold ornament: two crossing lines + slowly rotating diamond (20s infinite)
- Light mode: frosted overlay div
- Height: `h-[30vh] md:h-[40vh]`

Insert between "What We Do" `<ScrollRevealText>` (line 329) and "Market Thesis" `<ScrollRevealText>` (line 331):

```
<CinematicBreaker isIndia={isIndia} isDark={isDark} />
```

Add `useRef` to React import (line 1), ensure `useScroll`, `useTransform` in framer-motion import (line 6).

### Section 3: ScrollRevealText Tightening

**File**: `src/components/ScrollRevealText.tsx`

- Line 31: Scroll offset `['start 0.95', 'end 0.35']` → `['start 0.85', 'end 0.5']`
- Line 142: Word starting opacity `0.15` → `0.3`
- Lines 86, 90: Replace static `<div className="w-6 h-px bg-gold/50" />` with `<motion.div>` that animates width from 0 to 24px on viewport entry
- Lines 170-172, 200: Remove scroll-linked opacity from StatReveal — stats appear on viewport entry via `whileInView` only. Remove the `style={{ opacity }}` prop and the `useTransform` for opacity. Keep the `whileInView` animation.

### Section 4: Social Proof Simplification

**File**: `src/pages/Home.tsx`

Replace lines 363-371 (the third `<ScrollRevealText>`) with a simple `<FadeIn>` section:

- Uses `<section>` with light bg, `LightSectionEffects`
- Single `<FadeIn>` containing `<p>` with the quote text
- Gold highlights via `<span className="text-gold">` tags on key words
- No scroll-linked word reveal — just a clean fade-in entrance

### Section 5: Label Line Animation

**File**: `src/components/ScrollRevealText.tsx`

Lines 86, 90: Replace static gold lines with animated `motion.div`:

```tsx
<motion.div initial={{ width: 0 }} whileInView={{ width: 24 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }} className="h-px bg-gold/50" />
```

Second line gets `delay: 0.2`.

### Technical Details

**Files modified (2)**:

1. `src/pages/Home.tsx` — CinematicBreaker component, Social Proof simplification, useRef/useScroll imports
2. `src/components/ScrollRevealText.tsx` — tighter scroll range, higher starting opacity, viewport-triggered stats, animated label lines