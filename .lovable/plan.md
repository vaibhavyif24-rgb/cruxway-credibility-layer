

## Plan: Remaining Fixes Across Copy, Fonts, Sectors, and Team Marquee

### Status Check: What is Already Done vs. Still Needs Fixing

| Item | Status |
|------|--------|
| Footer tagline "Long-Term Investment Partners" | Done |
| Act 4 statement "The path to building anything enduring has no shortcuts." | Done |
| ConvictionsDeck subtitle "Six principles that shape how we partner, decide, and build." | Done |
| US hero heading "How We Think About Investing" | Done |
| US hero subtitle (blue-chip institutions) | Done |
| India hero heading/subtitle | Done |
| US sectors split into 3 columns | Done |
| OurPlaybook hero subtitle (partnered with founders) | Done |
| British spellings (Speciality/defence) | Done |
| Home.tsx India copy (overlooked, building India's future) | Done |
| Team.tsx India subtitle | Done |
| Team.tsx advisory text | Done |

### What Still Needs Fixing

**1. CruxwayOriginStory.tsx: Act 3 explanation text**
Current (line 489): "Getting from A to B matters. To get there, you transform under pressure and sustained discipline. But the journey itself matters. It must be aligned with the natural order of things."

The user explicitly wants this kept. The previous round overwrote it with a different version, but the current file shows this version is back. Confirmed: no change needed here.

**2. OurFocus.tsx: Font size inconsistencies in CriteriaTabs**
The tab titles at line 315 use `text-[1rem] md:text-[1.1rem]` which was already bumped. But the user says "Ownership Succession" and "Essential and Regulated Industries" are still tiny. The issue is these are inside tab buttons that are `flex-1` with `py-3 px-3` -- on desktop with 6 tabs in a row, `flex-1` squeezes each tab very narrow. The font itself is `1rem` (16px) on mobile, `1.1rem` (17.6px) on desktop. This is reasonable, but 6 tabs in a single row may compress text.

Fix: The real problem is likely that the tabs are too cramped. Allow horizontal scroll on the tab row to prevent text compression.

**3. Font size standardization audit**

Current h2 sizes across pages:
- OurFocus "Where We Invest": `clamp(1.5rem,2.8vw,2.2rem)` -- slightly different from standard `clamp(1.5rem,3vw,2.2rem)`
- OurFocus "What We Look For": `clamp(1.5rem,3vw,2.2rem)` -- correct
- OurPlaybook "How We Evaluate": `clamp(1.5rem,2.8vw,2.2rem)` -- slightly different
- ConvictionsDeck "Guiding Principles": `clamp(1.5rem,3vw,2.4rem)` -- different max (2.4rem vs 2.2rem)
- GuidingPrinciples hero h1: `clamp(1.6rem,4.5vw,3.6rem)` -- different from standard `clamp(2rem,5vw,3.4rem)`

Fix: Standardize ALL section h2s to `clamp(1.5rem,3vw,2.2rem)`. Standardize all hero h1s to `clamp(2rem,5vw,3.4rem)`.

Files with h2 fixes:
- `OurFocus.tsx` line 196: change `2.8vw` to `3vw`
- `OurPlaybook.tsx` line 365: change `2.8vw` to `3vw`
- `ConvictionsDeck.tsx` line 145: change `2.4rem` to `2.2rem`
- `GuidingPrinciples.tsx` line 36: change hero h1 `clamp(1.6rem,4.5vw,3.6rem)` to `clamp(2rem,5vw,3.4rem)`
- `OurPlaybook.tsx` line 341: hero h1 uses `clamp(2.2rem,5vw,3.2rem)` -- standardize to `clamp(2rem,5vw,3.4rem)`

**4. OurFocus.tsx: Sector heading font size**
Line 206: sector column headings use `text-[1.15rem] md:text-[1.3rem]`. This is fine and matches h3 hierarchy.

Sector item names at line 215: `text-[0.95rem] md:text-[1.05rem]` -- these are body-level items, acceptable.

**5. OurFocus.tsx: CriteriaTabs content panel description**
Line 371: `text-[15px] md:text-[17px]` -- correct per plan.
Mobile accordion at line 428: `text-[14px]` -- should be `text-[15px]` for consistency.

**6. Team.tsx: Institutional Experience blank marquee**
Line 466: `<LogoMarquee logos={isIndia ? allLogos : foundersLogos} duration={55} variant="dark" />`

The `foundersLogos` array (line 141-149) has 6 logos with valid imports. The `variant="dark"` in light mode uses `isContrastLight = true`, which sets bg to `bg-[hsl(40,20%,91%)]`. The parent div has `bg-background`. If `bg-background` is white/cream and the marquee bg is slightly different, the fade edges may hide logos.

Fix: Change the parent wrapper at line 459 from `bg-background` to match the marquee's bg, OR change the LogoMarquee's `fadeFromClass` for `isContrastLight` to use `from-background`. Also ensure the section has enough vertical padding -- the `compact` prop was removed, which gives more padding. The logos use `goldFilter` which should make them visible. If they're still blank, the issue may be that `fadeFromClass` gradients are too wide and cover all logos. Reduce fade gradient widths.

**7. OurFocus.tsx: CriteriaTabs sub-heading in content panel**
Line 362: `text-[clamp(1.2rem,2.5vw,1.6rem)]` -- this is the correct h3 size per the standard.

### Changes by File

**CruxwayOriginStory.tsx**
- No changes needed. Act 3 and Act 4 text are correct.

**ConvictionsDeck.tsx**
- Line 145: h2 max clamp from `2.4rem` to `2.2rem`

**OurFocus.tsx**
- Line 196: h2 `2.8vw` to `3vw`
- Line 428: accordion description `text-[14px]` to `text-[15px]`
- CriteriaTabs: make tab row horizontally scrollable so titles don't compress

**OurPlaybook.tsx**
- Line 341: hero h1 `clamp(2.2rem,5vw,3.2rem)` to `clamp(2rem,5vw,3.4rem)`
- Line 365: h2 `2.8vw` to `3vw`

**GuidingPrinciples.tsx**
- Line 36: hero h1 `clamp(1.6rem,4.5vw,3.6rem)` to `clamp(2rem,5vw,3.4rem)`

**Team.tsx**
- Line 459: change parent wrapper `bg-background` to match marquee light bg, or sync fade gradients
- Verify the marquee renders by ensuring the `foundersLogos` array is non-empty and images load

**Home.tsx**
- No changes. Copy is already updated.

**SiteFooter.tsx**
- No changes. Tagline already updated.

