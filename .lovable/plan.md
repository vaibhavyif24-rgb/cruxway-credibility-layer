

## Plan: Senior UI/UX Overhaul: Origin Story, Animations, Spellings, Loader, and Headings

### 1. CRU x WAY Origin Story: Professional Definition Layout (CruxwayOriginStory.tsx)

**Problem:** The Act 2 definitions are plain text lines stacked vertically with tiny 12px font. Looks like a bulleted list, not a cinematic naming story.

**Fix:** Redesign the definition area into a structured, elegant layout:
- Each language definition gets a subtle left gold border accent (2px vertical line), creating visual hierarchy
- Increase font size to `text-[13px] md:text-[15px]`
- Add staggered `y` entrance transforms (each line slides up 12px as it fades in) using individual `useTransform` for `y` values
- Add a thin gold horizontal divider between the "Way道" heading and the definitions
- Language labels get `tracking-[0.12em]` uppercase styling for gravitas
- Add a subtle glow pulse behind the definition block using a radial gradient that breathes

### 2. Animation Audit: Add Motion Throughout (Multiple Files)

**Files to enhance:**

**InvestmentCriteria.tsx:**
- Sector items in lists: stagger `FadeIn` with `delay={index * 0.08}`  
- EvalStep icons: add `whileInView` rotate entrance (rotate from -10deg to 0)
- CTA button: add `whileHover={{ y: -2, boxShadow }}` if missing

**OurFocus.tsx:**
- Sector list items (`<li>` elements): wrap each in `motion.li` with staggered `whileInView` fade-up
- Vertical divider between sector columns: animate `scaleY` from 0 to 1 on viewport entry
- CriteriaTabs/Accordion content: ensure `AnimatePresence` transitions on tab change

**Contact.tsx:**
- Email/location cards: add `whileHover={{ y: -4 }}` lift effect
- Map link: gold underline animation on hover

**Home.tsx:**
- Process carousel step indicators: add scale pulse on active dot
- Social proof heading: add word-by-word stagger if not present

**GuidingPrinciples.tsx:**
- ConvictionsDeck entry: ensure cards have staggered entrance

### 3. British to American English (Multiple Files)

**src/pages/Home.tsx line 54:** "Rigour" -> "Rigor"

Global search confirmed this is the only remaining British spelling instance.

### 4. PageLoader Light Mode Effects (App.tsx)

**Problem:** Light mode loader has floating particles but they're nearly invisible at 0.15 opacity. Dark mode looks rich; light mode looks bare.

**Fix:**
- Increase light-mode particle opacity from 0.15 to 0.25
- Add a soft pulsing radial gradient ring behind the wordmark (gold/8 that breathes from scale 0.9 to 1.1)
- Add a second set of particles that drift horizontally (not just vertically) for more visual depth
- Add a subtle rotating gold arc (thin SVG circle segment, 120 degrees, rotating slowly) around the wordmark area

### 5. Investment Criteria Headings (InvestmentCriteria.tsx)

**Problem:** Section headings use `text-[clamp(1.3rem,2.5vw,1.8rem)]` and `text-[clamp(1.5rem,2.8vw,2.2rem)]` which are too small on mobile at 390px (renders ~1.3rem = 20.8px).

**Fix:**
- "Our Target Parameters" heading: `text-[clamp(1.5rem,3vw,2.2rem)]` (was 1.3rem min)
- "What We Look For" heading: `text-[clamp(1.6rem,3.2vw,2.4rem)]` (was 1.5rem min)  
- "How We Evaluate Opportunities" heading: `text-[clamp(1.6rem,3.2vw,2.4rem)]` (was 1.5rem min)
- EvalStep titles: `text-[1.2rem] md:text-[1.35rem]` (was 1.1rem/1.25rem)
- EvalStep descriptions: `text-[14px] md:text-[15px]` (was 13px/14px)
- Value Creation carousel heading in CriteriaCarousel: verify and increase if needed

### Technical Summary

| File | Changes |
|------|---------|
| `CruxwayOriginStory.tsx` | Redesign Act 2 definitions with gold accent borders, larger text, staggered y-entrance, divider |
| `App.tsx` | PageLoader: brighter light-mode particles, pulsing glow ring, rotating gold arc |
| `InvestmentCriteria.tsx` | Increase all section headings, eval step titles/descriptions |
| `Home.tsx` | Fix "Rigour" -> "Rigor" |
| `OurFocus.tsx` | Animate sector list items with staggered fade-up, animate vertical divider |
| `Contact.tsx` | Add hover lift effects to cards |

### Constraints
- No em-dashes. American English only.
- Framer Motion for all animations. Standard ease: [0.22, 1, 0.36, 1].
- Both themes must look professional.
- Do not touch ThemeContext, RegionContext, SiteHeader, SiteFooter, or Landing page.

