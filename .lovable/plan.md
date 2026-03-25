

## Plan: India Reveal Image + About Heading + Home Scroll Reveal

### 1. Replace India Cinematic Scroll Reveal Image & Tagline

**File**: `src/assets/india-industrial-reveal.jpg` — overwrite with uploaded image

**File**: `src/components/CinematicScrollReveal.tsx` (lines 158-159)

Update tagline:
```
Current:  "Where India's essential industries find their permanent home."
New:      "Building enduring platforms across India's lower middle market."
```

### 2. About Page — "What Guides Us" Section Heading

**File**: `src/pages/About.tsx` (before line 102)

Add a section heading block above `PrinciplesSlider`:
```tsx
<div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-16 md:pt-20">
  <FadeIn>
    <SectionLabel>Our Values</SectionLabel>
    <h2 className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] text-foreground leading-[1.15] mb-3">
      What Guides Us
    </h2>
    <GoldRule />
  </FadeIn>
</div>
```

**File**: `src/components/PrinciplesSlider.tsx` (lines 88-98)

Remove the per-card "What Guides Us" overline label since it's now a section heading.

### 3. Home Page — Replace Social Proof with ScrollRevealText

**File**: `src/pages/Home.tsx` (lines 200-224)

Replace the small italic quote block with the existing `ScrollRevealText` component for a large, dramatic word-by-word scroll reveal above the logos:

- **US**: `"Decades of institutional experience. One mission — partnering with founders who built America's essential industries."`
- **India**: `"Global institutional expertise, applied locally — partnering with the founders shaping India's industrial future."`

```tsx
<ScrollRevealText
  heading={isIndia
    ? "Global institutional expertise, applied locally — partnering with the founders shaping India's industrial future."
    : "Decades of institutional experience. One mission — partnering with founders who built America's essential industries."
  }
  variant="light"
/>
<div className="bg-background">
  <FadeIn delay={0.1}>
    <LogoMarquee logos={isIndia ? allLogos : foundersLogos} duration={40} variant="dark" />
  </FadeIn>
</div>
```

### Files Modified

1. `src/assets/india-industrial-reveal.jpg` — replace with uploaded UHD image
2. `src/components/CinematicScrollReveal.tsx` — update tagline (line 158-159)
3. `src/pages/About.tsx` — add "What Guides Us" section heading above PrinciplesSlider
4. `src/components/PrinciplesSlider.tsx` — remove per-card "What Guides Us" overline
5. `src/pages/Home.tsx` — replace social proof with ScrollRevealText + LogoMarquee

