

## Plan: Improve India Copy as a Senior Copywriter

The user wants a clear narrative arc across the India sections: **What we invest in → What our capital unlocks → How we do it → The opportunity gap → Social proof.** This plan refines copy across Home.tsx, OurFocus.tsx, OurPlaybook.tsx, and Team.tsx for the India region only, following the copy-only constraint (no layout/animation changes).

---

### Narrative Architecture

```text
Hero (Home)     → WHAT: "Investing in India's Industrial Backbone"
Subtitle        → VALUE-ADD: Enabling fragmented operators to become scaled platforms
What We Do      → HOW: Strengthening operations, enabling continuity and capability
Opportunity     → GAP: Large, fragmented essential service economy + our capital unlocks
Social Proof    → TRUST: Proven businesses deserve the right partner
```

---

### 1. Home.tsx — India Hero (lines 416-428)

**Hero h1** (line 419):
- Current: `Investing in India's Next Generation of Essential Companies`
- New: `Investing in India's <gold>Industrial</gold> Backbone`

**Hero subtitle** (line 426):
- Current: `Long-term capital and hands-on partnership for the founder-led companies building India's future.`
- New: `Enabling India's essential businesses to move from fragmented operators to scaled, system-critical platforms.`

### 2. Home.tsx — What We Do (lines 462-476)

**India heading** (line 466):
- Current: `Preserve what founders built. Scale what matters. Investing tailored to each company's needs, for the long term.`
- New: `We invest to strengthen operations and scale businesses, enabling continuity, capability, and sustained growth.`
- Highlights: `['strengthen', 'continuity']`

**India subtext** (line 472):
- Current: `Combining long-term capital with operating expertise to help owners build market leaders while protecting their legacy.`
- New: `Long-term capital, operating discipline, and the patience to build something that lasts.`

### 3. Home.tsx — Opportunity Cinematic (line 360)

**India heading**:
- Current: `India's lower middle market is one of the most overlooked opportunities in global investing.`
- New: `India's essential service economy is large, fragmented, and ready for partners who can build resilient platforms with long-term capital.`
- Gold highlight: `resilient platforms` instead of `overlooked`

### 4. Home.tsx — Market Thesis (lines 484-485)

**India heading**:
- Current: `Companies proven over decades are ready for a partner who can help them scale with discipline.`
- New: `Proven businesses deserve a partner who understands what they have built and can help them scale it.`
- Highlight: `['partner']`

### 5. Home.tsx — Social Proof (line 519)

**India text**:
- Current: `Global institutional expertise applied locally, partnering with the founders shaping India's industrial future.`
- New: `The founders building India's industrial base deserve institutional capital that respects what they have built.`
- Gold highlights: `institutional capital`, `built`

### 6. Home.tsx — CTA (line 549)

**India CTA subtitle**:
- Current: `If you're building a business meant to last in India, we'd welcome a conversation about partnership.`
- New: `If you have built something real and want a partner for the next chapter, we would welcome a conversation.`

### 7. OurFocus.tsx — India Hero (lines 124, 130)

**India subtitle**:
- Current: `We bring institutional discipline and a personal touch to partnering with India's best founder-led businesses.`
- New: `We spent our careers at global institutions. This firm exists to bring that discipline to founders who built something real in India, for India.`

### 8. OurPlaybook.tsx — India context (line 347)

The subtitle is shared across regions. Keep as-is since it already reflects the founder-partnership voice. No change.

### 9. Team.tsx — India Hero (lines 373, 379)

**India h1**:
- Current: `India Leadership`
- New: `Our Team in India`

**India subtitle**:
- Current: `Global experience, local conviction. Building alongside the founders who are building India.`
- New: `Global experience, applied with local conviction. We partner with founders and families building India's industrial base.`

### 10. Team.tsx — Advisory text (line 446)

- Current: `Our advisors are senior operators and industry leaders across India and the US who have built what we aspire to build.`
- New: `Our advisors are operators and industry leaders across India and the US. They have built what we aspire to build, and they inform how we partner.`

### 11. Team.tsx — Network ScrollRevealText (line 425)

- Current: `A curated network built over decades of shared conviction and institutional rigor.`
- New: `Relationships built over decades of shared work and mutual respect.`

---

### Files Changed

| File | Scope |
|------|-------|
| `Home.tsx` | India hero h1, subtitle, What We Do, Opportunity, Market Thesis, Social Proof, CTA |
| `OurFocus.tsx` | India hero subtitle |
| `Team.tsx` | India hero h1, subtitle, advisory text, network heading |

No layout, animation, font, or structural changes. Copy strings only.

