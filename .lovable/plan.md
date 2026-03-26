

## Plan: Rich Celestial Illustrations for Principles Cards

### What We're Building

Replace the current small, geometric SVG illustrations with full-card, immersive celestial/painterly SVG backgrounds inspired by the reference images. Each card gets a deep navy-to-midnight gradient background with gold celestial elements (stars, constellations, nebulae, swirls) plus thematic figurative elements matching each principle.

### Design per Principle

1. **Integrity** — A celestial compass rose with gold constellation lines forming cardinal directions, scattered stars, and a radiant north star at top center
2. **Servant Leadership** — An upward arch/bridge formed by constellation lines, with radiating light from the keystone and scattered gold stars, a figure silhouette at the base looking upward
3. **Humility** — Van Gogh-style spiral galaxy swirl (like reference image), gold nebula curves, a figure on a cliff edge gazing at the cosmos
4. **Grit** — A mountain peak with constellation patterns, gold lightning/forge sparks, rugged terrain silhouette with stars above
5. **Bias to Action** — A comet/arrow streaking across a starfield, trailing gold particles, constellation rings it passes through
6. **The Golden Rule** — Two reaching hands (Sistine Chapel style, like reference image) with gold stardust between them, constellation patterns surrounding

### Technical Changes in `PrinciplesSlider.tsx`

**Card background**: Change from warm brown gradient to deep navy:
```
background: linear-gradient(135deg, hsl(220, 40%, 8%) 0%, hsl(225, 45%, 5%) 50%, hsl(215, 35%, 10%) 100%)
```

**SVG container**: Expand from 70% centered to full-bleed (`inset-0`, `w-full h-full`) so illustrations fill the entire card

**SVG complexity**: Each illustration uses:
- `<defs>` with radialGradient for nebula glows
- Procedurally generated star fields (50-80 small circles at random positions)
- Gold constellation lines connecting star groups
- Thematic figurative silhouettes as paths
- Multiple opacity layers for depth (0.1 to 0.6)
- Palette: gold `hsl(38, 55%, 60%)`, warm white `hsl(40, 30%, 85%)`, deep navy fills

**Texture overlay**: Update radial gradient to work with navy base instead of brown

**Text shadow**: Increase to `0 2px 30px rgba(0,0,0,0.7)` for readability against busier backgrounds

### File Modified

`src/components/PrinciplesSlider.tsx` — complete rewrite of `VintageIllustration` component + card background color change

