

## Plan: Copy Polish, Animation Fixes, and Font Consistency

### 1. Footer Tagline (SiteFooter.tsx)

Replace "Long-Term Investment Partners" with **"Conviction-Driven Capital"**. It is distinctive, says something real about the firm's philosophy, and avoids the generic PE category label. Short enough to sit elegantly beside the wordmark.

### 2. Identity Page: Act 3 Rewrite (CruxwayOriginStory.tsx, line 489)

Current: "Getting from A to B matters. To get there, you transform under pressure and sustained discipline. But the journey itself matters. It must be aligned with the natural order of things."

Replace with: **"Outcomes matter, but so does how you get there. Real conviction is forged under pressure. Real discipline is sustained over years, not quarters. The two together are what build things that last."**

This says the same thing but reads like a person wrote it. No abstract metaphors about "natural order of things."

### 3. Copy Audit: Kill AI-Sounding Text Across All Pages

| File | Current | Replacement |
|------|---------|-------------|
| **OurPlaybook.tsx** line 20 | "Proprietary networks, trusted adviser relationships, and deep sector immersion surface off-market opportunities long before they reach an auction process. We invest years in building relationships that yield decades of deal flow." | "We find deals where others aren't looking. Years of relationship-building across our sectors give us access to businesses long before they hit the market." |
| **OurPlaybook.tsx** line 21 | "Every opportunity is stress-tested across financials, unit economics, customer concentration, competitive positioning, management quality, and cultural alignment. We triangulate data with on-the-ground diligence and reference networks." | "We pressure-test everything: the financials, the customers, the team, and the competitive dynamics. Data gets validated on the ground, not just in a spreadsheet." |
| **OurPlaybook.tsx** line 22 | "Rigorous financial, operational, legal, regulatory, and commercial analysis with third-party specialists. We model downside scenarios, validate assumptions with industry operators, and build conviction through evidence, not intuition." | "Deep financial, operational, and legal analysis with specialists who know the space. We model the downside first and build conviction through evidence, not gut feel." |
| **OurPlaybook.tsx** line 23 | "Ownership, governance, incentive alignment, and capital structures engineered for multi-decade compounding. Every term sheet reflects our commitment to permanence over optionality." | "We structure deals for permanence: aligned incentives, sensible governance, and capital that compounds over decades, not exits in three years." |
| **OurPlaybook.tsx** line 27 | "Implement institutional-grade systems, reporting, and governance from day one." | "Put real systems, reporting, and governance in place from day one." |
| **OurPlaybook.tsx** line 28 | "Drive margin improvement through operational excellence and best-practice deployment." | "Find and fix the operational gaps that unlock margin." |
| **OurPlaybook.tsx** line 29 | "Deploy capital into organic expansion, adjacent markets, and strategic acquisitions." | "Put capital to work in organic growth, adjacent markets, and smart acquisitions." |
| **OurPlaybook.tsx** line 30 | "Long-term hold periods allow compounding of operational improvements and market position." | "Hold long enough for improvements to compound and market position to deepen." |
| **OurPlaybook.tsx** line 377 | "We bring structure, experience, and patience to every business we partner with." | "We have seen what works and what doesn't across hundreds of deals. That pattern recognition is our edge." |
| **OurPlaybook.tsx** line 391 | "How we professionalize operations and compound value over time." | "What we actually do once we invest." |
| **Home.tsx** line 466-467 | "Preserve what founders built. Scale what matters. Investing tailored to each company's needs, for the long term." (duplicated for both regions) | "We preserve what founders built and invest in what comes next. Every partnership is shaped around the business, not a template." |
| **Home.tsx** line 472-473 | "Combining long-term capital with operating expertise to help owners build market leaders while protecting their legacy." (duplicated) | "Patient capital, real operating experience, and a genuine respect for the businesses we partner with." |
| **Home.tsx** line 485 | "Companies proven over decades are ready for a partner who can help them scale with discipline." | "Proven businesses deserve a partner who understands what they have built and can help them scale it." |
| **Home.tsx** line 486 | "Patient capital and operational expertise unlock their next chapter of growth." | "Patient capital and hands-on experience open the next chapter." |
| **Team.tsx** line 402 | "Operators and investors who've built, scaled, and partnered across cycles." | "People who have been in the trenches, built businesses, and invested through every kind of market." |
| **Team.tsx** line 425 | "A curated network built over decades of shared conviction and institutional rigor." | "Relationships built over years of working together, not a Rolodex." |
| **Team.tsx** line 447 | "Our advisory network includes senior operators, industry veterans, and institutional leaders across the United States." | "Operators and leaders who have built businesses like the ones we invest in." |
| **OurFocus.tsx** line 38 | "Compliance-driven B2B sectors across underserved and overlooked markets where reliability, safety, and recurring demand create natural moats." | "Compliance-driven B2B sectors in overlooked markets where reliability and recurring demand create real staying power." |
| **OurFocus.tsx** line 41 | "Undermanaged businesses where professionalized systems, reporting, and governance unlock enterprise value while preserving the culture that built the company." | "Businesses that have outgrown their systems. We professionalize operations without losing what made the company special." |

### 4. Font Consistency Audit and Fixes

Standardize hero h1 across ALL pages to `clamp(2rem,5vw,3.4rem)`:

| File | Current | Fix |
|------|---------|-----|
| **Home.tsx** line 417 | `clamp(2.2rem,5vw,3.6rem)` | `clamp(2rem,5vw,3.4rem)` |
| **Team.tsx** line 372 | `clamp(2.2rem,5vw,3.6rem)` | `clamp(2rem,5vw,3.4rem)` |
| **Contact.tsx** line 41 | `clamp(2.2rem,5vw,3.6rem)` | `clamp(2rem,5vw,3.4rem)` |

Home.tsx "Our Process" h2 (line 503): `clamp(1.5rem,3vw,2.4rem)` should be `clamp(1.5rem,3vw,2.2rem)`.

Home.tsx process step title (line 144): `text-[0.75rem] md:text-[1rem]` is too small on mobile. Change to `text-[0.85rem] md:text-[1rem]`.

Home.tsx process panel h3 (line 185): `clamp(1.2rem,2.5vw,1.7rem)` should be `clamp(1.2rem,2.5vw,1.6rem)`.

Home.tsx social proof heading (line 517): `clamp(1.6rem,4vw,2.6rem)` should be `clamp(1.5rem,3vw,2.2rem)` to match section h2 standard.

Team.tsx "Our Network" h2 (line 435): `clamp(1.3rem,2.5vw,1.85rem)` should be `clamp(1.5rem,3vw,2.2rem)`.

### 5. Team Marquee Fix (Team.tsx)

The LogoMarquee at line 466 uses `variant="dark"` which in light mode applies `bg-[hsl(40,20%,91%)]` while the parent `<div>` has no matching background. The fade gradients use `from-[hsl(38,16%,92%)]` which doesn't match the parent's transparent background, creating visible gradient edges that obscure logos.

**Fix**: Add `className="bg-[hsl(40,20%,91%)]"` to the parent wrapper div so the fade edges blend seamlessly. Also add bottom padding to the overall page wrapper so it doesn't feel clipped.

### 6. Animation/Effect Visibility Fixes

The `LightSectionEffects` component may not be rendering visible effects on certain sections in light mode. Need to verify the component renders visible elements. If the shimmer sweep on the Investment Profile section (OurFocus line 148-153) is invisible in light mode, increase the gold opacity from `0.03` to `0.05`.

### Summary of Files Changed

| File | Changes |
|------|---------|
| `SiteFooter.tsx` | Tagline to "Conviction-Driven Capital" |
| `CruxwayOriginStory.tsx` | Act 3 rewrite |
| `OurPlaybook.tsx` | All evaluation step descriptions, value creation items, ScrollRevealText heading, subtitle rewritten |
| `Home.tsx` | ScrollRevealText copy, stats headings, h1/h2/h3 font sizes standardized |
| `Team.tsx` | ScrollRevealText headings, advisory text, h2 standardized, marquee wrapper bg fix |
| `OurFocus.tsx` | Two criteria descriptions improved |
| `Contact.tsx` | h1 font size standardized |

