

## Plan: Complete Typographic Consistency Audit and Fix

### Current Inconsistencies Found

After auditing every page and component, here are all deviations from the enforced type scale:

```text
HIERARCHY (Target System):
──────────────────────────────────────────────────
Hero H1:           clamp(2rem, 5vw, 3.4rem)
Section H2:        clamp(1.5rem, 3vw, 2.2rem)
CTA H2:            clamp(1.6rem, 3.5vw, 2.6rem)
Sub-section H3:    clamp(1.2rem, 2.5vw, 1.6rem)
ScrollReveal:      clamp(1.9rem, 5.5vw, 3.2rem)  [pull-quote style, OK]
Eyebrow/Label:     11px, font-bold, uppercase, tracking-[0.25em]
Body:              15px, leading-[1.75]
Body-sm:           14px, leading-[1.7]
Caption/Meta:      10-11px, uppercase, tracking-[0.18-0.22em]
```

### Deviations by File

**Home.tsx**
| Line | Current | Target | Element |
|------|---------|--------|---------|
| 76 | `clamp(1.4rem,3vw,2rem)` | `clamp(1.5rem,3vw,2.2rem)` | StatBlock value (should match section scale) |
| 144 | `text-[0.75rem] md:text-[1rem]` | `text-[0.85rem] md:text-[1rem]` | Process carousel step title (0.75rem = 12px, too small on mobile) |
| 175 | `text-[3rem] md:text-[4rem]` | `text-[3.5rem] md:text-[4.5rem]` | Watermark number (decorative, OK to leave) |
| 185 | `clamp(1.2rem,2.5vw,1.7rem)` | `clamp(1.2rem,2.5vw,1.6rem)` | Process card h3 (max 1.7rem vs standard 1.6rem) |
| 357 | `clamp(1.6rem,4.5vw,2.8rem)` | `clamp(1.6rem,4vw,2.6rem)` | Opportunity cinematic h2 (should match CTA h2 scale) |
| 412 | `text-[12px] md:text-[13px]` | `text-[11px] md:text-[12px]` | "Built for Owners" tagline (slightly large for eyebrow) |
| 417 | `clamp(2.2rem,5vw,3.6rem)` | `clamp(2rem,5vw,3.4rem)` | Hero h1 (oversized vs standard) |
| 503 | `clamp(1.5rem,3vw,2.4rem)` | `clamp(1.5rem,3vw,2.2rem)` | "From Discovery to Partnership" h2 (max 2.4rem) |

**Team.tsx**
| Line | Current | Target | Element |
|------|---------|--------|---------|
| 253 | `text-[1.05rem] md:text-[1.3rem]` | `text-[1.1rem] md:text-[1.3rem]` | ProfileCard name h3 (minor) |
| 263 | `text-[9px]` | `text-[10px]` | Role label (too small, below minimum) |
| 270 | `text-[12.5px] md:text-[13px]` | `text-[13px] md:text-[14px]` | Summary body (fractional px, normalize) |
| 281 | `text-[11.5px] md:text-[12px]` | `text-[12px] md:text-[12px]` | Highlight bullets (fractional px) |
| 291 | `text-[8px]` | `text-[9px]` | "Select Investments" label (below minimum) |
| 325 | `clamp(1.2rem,3vw,2rem)` | `clamp(1.5rem,3vw,2.2rem)` | CountingStat value (too small for a stat display) |
| 347 | `text-[8.5px] md:text-[10px]` | `text-[10px] md:text-[11px]` | Stat label (below minimum on mobile) |
| 372 | `clamp(2.2rem,5vw,3.6rem)` | `clamp(2rem,5vw,3.4rem)` | Hero h1 (oversized) |
| 435 | `clamp(1.3rem,2.5vw,1.85rem)` | `clamp(1.5rem,3vw,2.2rem)` | "Our Network" h2 (too small for h2) |

**Contact.tsx**
| Line | Current | Target | Element |
|------|---------|--------|---------|
| 41 | `clamp(2.2rem,5vw,3.6rem)` | `clamp(2rem,5vw,3.4rem)` | Hero h1 (oversized) |
| 75 | `text-[1.2rem] md:text-[1.4rem]` | `text-[1.15rem] md:text-[1.3rem]` | Email/location display (too large for card content) |
| 99 | same | same | Location display |
| 72 | `text-[10px] md:text-[11px]` | OK | |

**OurFocus.tsx**
| Line | Current | Target | Element |
|------|---------|--------|---------|
| 128 | `text-[15px] md:text-[16px]` | `text-[15px]` | Hero subtitle (md override breaks clamp philosophy) |
| 499 | `text-[14.5px]` | `text-[14px]` | TypographicText body (fractional px) |

**OurPlaybook.tsx**
| Line | Current | Target | Element |
|------|---------|--------|---------|
| 85 | `text-[15px] md:text-[16px]` | `text-[15px]` | Step description (md override) |
| 248 | `text-[12px] md:text-[14px]` | `text-[11px] md:text-[12px]` | Bar chart step number (too large for caption) |
| 255 | `text-[12px] md:text-[13px]` | `text-[12px] md:text-[13px]` | Bar label (OK) |
| 298 | `clamp(1.3rem,2.5vw,1.8rem)` | `clamp(1.2rem,2.5vw,1.6rem)` | Value creation panel h3 (oversized) |
| 306 | `text-[15px] md:text-[17px]` | `text-[15px]` | Panel description (md override inconsistent) |
| 346 | `text-[15px] md:text-[16px]` | `text-[15px]` | Hero subtitle (md override) |
| 390 | `text-[14px] md:text-[15px]` | `text-[14px]` | Value creation subtitle (md override) |

**ConvictionsDeck.tsx**
| Line | Current | Target | Element |
|------|---------|--------|---------|
| 61 | `text-[14px]` | `text-[12px]` | Accordion number (too large for a number index) |
| 110 | `text-[14px] md:text-[15px]` | `text-[14px]` | Accordion body (md override) |

**ScrollRevealText.tsx**
| Line | Current | Target | Element |
|------|---------|--------|---------|
| 99 | `text-[12px] md:text-[13px]` | `text-[11px]` | Label eyebrow (too large, should match SectionLabel) |
| 119 | `text-[14px] md:text-[15px]` | `text-[14px]` | Subtext (md override) |

**SiteFooter.tsx**
| Line | Current | Target | Element |
|------|---------|--------|---------|
| 43 | `text-[12px]` | `text-[11px]` | Nav links (slightly oversized for footer) |

**SiteHeader.tsx**
- Already uses `text-nav` (11px). OK.

### Changes by File

**Home.tsx** (6 fixes)
- Line 76: StatBlock value `clamp(1.4rem,3vw,2rem)` to `clamp(1.5rem,3vw,2rem)`
- Line 144: step title `text-[0.75rem]` to `text-[0.85rem]`
- Line 185: card h3 max `1.7rem` to `1.6rem`
- Line 357: opportunity h2 `clamp(1.6rem,4.5vw,2.8rem)` to `clamp(1.6rem,4vw,2.6rem)`
- Line 417: hero h1 `clamp(2.2rem,5vw,3.6rem)` to `clamp(2rem,5vw,3.4rem)`
- Line 503: process h2 `clamp(1.5rem,3vw,2.4rem)` to `clamp(1.5rem,3vw,2.2rem)`

**Team.tsx** (8 fixes)
- Line 263: role label `text-[9px]` to `text-[10px]`
- Line 270: summary `text-[12.5px]` to `text-[13px]`
- Line 281: highlights `text-[11.5px]` to `text-[12px]`
- Line 291: deal label `text-[8px]` to `text-[9px]`
- Line 325: CountingStat `clamp(1.2rem,3vw,2rem)` to `clamp(1.5rem,3vw,2rem)`
- Line 347: stat label `text-[8.5px]` to `text-[10px]`
- Line 372: hero h1 `clamp(2.2rem,5vw,3.6rem)` to `clamp(2rem,5vw,3.4rem)`
- Line 435: "Our Network" h2 `clamp(1.3rem,2.5vw,1.85rem)` to `clamp(1.5rem,3vw,2.2rem)`

**Contact.tsx** (3 fixes)
- Line 41: hero h1 `clamp(2.2rem,5vw,3.6rem)` to `clamp(2rem,5vw,3.4rem)`
- Line 75: email display `text-[1.2rem] md:text-[1.4rem]` to `text-[1.15rem] md:text-[1.3rem]`
- Line 99: location display same fix

**OurFocus.tsx** (2 fixes)
- Line 128: remove `md:text-[16px]` (keep `text-[15px]` only)
- Line 499: `text-[14.5px]` to `text-[14px]`

**OurPlaybook.tsx** (5 fixes)
- Line 85: remove `md:text-[16px]` override
- Line 248: bar number `text-[12px] md:text-[14px]` to `text-[11px] md:text-[12px]`
- Line 298: value creation h3 `clamp(1.3rem,2.5vw,1.8rem)` to `clamp(1.2rem,2.5vw,1.6rem)`
- Line 306: remove `md:text-[17px]` override
- Line 346, 390: remove `md:` overrides

**ConvictionsDeck.tsx** (2 fixes)
- Line 61: accordion number `text-[14px]` to `text-[12px]`
- Line 110: remove `md:text-[15px]` override

**ScrollRevealText.tsx** (2 fixes)
- Line 99: label `text-[12px] md:text-[13px]` to `text-[11px]`
- Line 119: remove `md:text-[15px]` override

**SiteFooter.tsx** (1 fix)
- Line 43: nav links `text-[12px]` to `text-[11px]`

### Summary

29 targeted font-size corrections across 8 files. No layout, animation, copy, or structural changes. Every fix aligns an element to the defined hierarchy, eliminates fractional pixel values, removes `md:` responsive overrides that conflict with the `clamp()` philosophy, and raises any text below the 9px floor.

