

## Plan: Mobile Fixes, Typography, Origin Story Polish, and Animation Enhancements

### 1. Mobile Overflow Fixes (Multiple Pages)

**OurFocus.tsx:** The `overflow-x-clip` on root div is good. Verify sector columns don't overflow. The CTA button with `px-10 py-5` is fine at 390px.

**OurPlaybook.tsx:** The ValueCreationChart container uses `overflow-x-hidden` but the root div lacks `overflow-x-clip`. Add it. Also ensure the chart container constrains bars on 390px screens.

**Home.tsx, Contact.tsx, About.tsx:** Add `overflow-x-clip` to root containers where missing (Contact.tsx has bare `<div>` wrapper).

**GuidingPrinciples.tsx:** Already has `overflowX: 'clip'`. Good.

### 2. "What We Look For" Accordion Titles: Larger and Bolder (OurFocus.tsx)

**CriteriaAccordion (lines 408-462):**
- Accordion title font: increase from `text-[1rem]` to `text-[1.1rem] md:text-[1.2rem]` and add `font-medium`
- Number: increase from `text-[1.5rem]` to `text-[1.6rem]`  
- Description text: increase from `text-[13px]` to `text-[14px]`

**CriteriaTabs tab labels (lines 337-343):**
- Increase tab title from `text-[0.8rem]` to `text-[0.85rem] md:text-[0.9rem]`

**Sector item names (lines 212, 238):**
- Add `font-medium` to sector names for prominence

### 3. Remove Extra Effect Under "Way" (CruxwayOriginStory.tsx)

There are TWO dividers after the "Way道" heading:
- Line 346: Gold accent line (the standard one under all headings)
- Line 351: A second gold gradient divider between heading and definitions

**Remove the duplicate divider at lines 350-357.** Keep only the accent line at 346. This eliminates the redundant visual clutter.

### 4. Professional Definition Text in Way Act (CruxwayOriginStory.tsx)

Current definitions are too simple. Replace with more institutional, thematic language:

- **English:** "A deliberate path chosen with intent and conviction" (was: "The path and method one takes")
- **Japanese (道, do):** "A lifelong discipline pursued through relentless refinement" (was: "The disciplined path of mastery through practice")  
- **Chinese (道, dao):** "The natural principle that governs all things when left unforced" (was: "The natural order; reality flowing when unforced")
- **Hindi (मार्ग, marg):** "A sacred road walked with purpose and moral resolve" (was: "The committed road; a path walked with purpose")

### 5. Additional Animations Across the Site

**OurFocus.tsx:**
- Accordion items: Add staggered `FadeIn` wrapping each accordion item with `delay={i * 0.06}`
- Investment profile section: Add a subtle shimmer sweep animation to the section background

**Home.tsx:**
- Process step cards: Add `whileHover={{ y: -3, transition: { duration: 0.2 } }}` to GlassCard wrappers
- Active dot in carousel: Add `layoutId` for smooth dot transition animation

**GuidingPrinciples.tsx:**
- ConvictionsDeck: Wrap each `AccordionRow` in a `FadeIn` with staggered delays

**About.tsx:**
- PrinciplesSlider section: Ensure the section entry has a gold shimmer line that animates `scaleX` from 0 to 1

**Contact.tsx:**
- Add `overflow-x-clip` to root div
- Footer CTA area: Add a breathing gold glow behind the email link

### Technical Summary

| File | Changes |
|------|---------|
| `CruxwayOriginStory.tsx` | Remove duplicate Way divider; upgrade definition text to professional language |
| `OurFocus.tsx` | Increase accordion title/description sizes; add font-medium to sector names; staggered FadeIn on accordion items |
| `Home.tsx` | Hover lift on process cards; active dot layoutId |
| `Contact.tsx` | Add overflow-x-clip; breathing glow on email |
| `GuidingPrinciples.tsx` | Staggered FadeIn on ConvictionsDeck rows |
| `OurPlaybook.tsx` | Add overflow-x-clip to root div |
| `About.tsx` | Gold shimmer line entry animation |

