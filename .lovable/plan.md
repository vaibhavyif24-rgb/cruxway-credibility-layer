

## Plan: Generate Cinematic Reveal Images for India & US Criteria Pages

### Context
The CinematicScrollReveal (India) and USCinematicScrollReveal (US) components each use a single hero image that starts as a small circle and expands to fill the viewport during scroll. These images need to be high-quality, cinematic photographs that reinforce the regional taglines.

### Image Generation

**Step 1: Generate India image**
Use AI image generation (Nano banana pro for highest quality) to create a cinematic industrial photograph for India's lower middle market.

Prompt: "Cinematic aerial photograph of India's industrial heartland at golden hour. Vast manufacturing facilities, steel plants, and warehouses stretching across a river valley with dramatic warm golden light cutting through atmospheric haze. Deep navy blue shadows contrasting with amber industrial glow. No text, no people visible. Ultra high definition professional industrial photography, moody and aspirational. Square composition."

Save to `src/assets/india-industrial-reveal.jpg` (replacing existing).

**Step 2: Generate US image**
Create a cinematic photograph representing America's essential industries and permanent partnership.

Prompt: "Cinematic wide photograph of American industrial infrastructure at dawn. A major highway interchange leading toward a sprawling industrial complex with grain silos, distribution centers, and manufacturing plants under a dramatic sky with golden sunrise breaking through deep blue clouds. Heartland America, essential industries. No text, no people. Ultra high definition professional landscape photography, moody navy tones with warm golden highlights. Square composition."

Save to `src/assets/us-industrial-reveal.jpg` (replacing existing).

**Step 3: No code changes needed**
Both components already import from these exact file paths. All existing effects (expanding circle, Ken Burns-like scroll zoom, dark overlay gradient, tagline positioning, sector card slide-up) remain completely untouched.

### Files Modified
1. `src/assets/india-industrial-reveal.jpg` — new AI-generated image (replace)
2. `src/assets/us-industrial-reveal.jpg` — new AI-generated image (replace)

### Technical Notes
- Images are rendered at 2400x2400 in the components with `object-fit: cover`, so square or near-square composition works best
- The dark gradient overlay (`rgba(0,0,0,0.35)` to `rgba(0,0,0,0.5)`) is applied on top, so the image can be vibrant
- Color palette should match the site's navy/gold brand identity

