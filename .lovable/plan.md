

## Plan: Mobile Scan, Copy Polish, Font Consistency, and Marquee Fix

### 1. Team "Rolodex" Copy Fix (Team.tsx line 425)
**Current**: "Relationships built over years of working together, not a Rolodex."
**Replace with**: "Relationships built over years of working together, not a contact list."

### 2. Team Institutional Experience Marquee Fix (Team.tsx line 468)
The marquee uses `variant="inline"` which applies NO background and uses `from-background` for fade gradients. But the parent section uses `bg-[hsl(40,18%,96%)]` in light mode. The fade gradients don't match the parent, obscuring logos.

**Fix**: Change `variant="inline"` to `variant="dark"` on line 468. The `variant="dark"` in light mode applies `bg-[hsl(40,20%,91%)]` which closely matches the parent `bg-[hsl(40,18%,96%)]`, and uses `from-[hsl(38,16%,92%)]` for fades. Also sync the parent section bg to `bg-[hsl(40,20%,91%)]` so fades blend perfectly.

Line 459: change `bg-[hsl(40,18%,96%)]` to `bg-[hsl(40,20%,91%)]`
Line 468: change `variant="inline"` to `variant="dark"`

### 3. Font Consistency: Mobile Typography Audit

**ScrollRevealText heading** (line 106): `text-[clamp(1.9rem,5.5vw,3.2rem)]` — on a 375px mobile, 5.5vw = 20.6px which is less than the 1.9rem (30.4px) minimum. The clamp floor holds at 1.9rem. This is fine but quite large for mobile. Reduce minimum to `1.6rem` so it breathes better on small screens:
`text-[clamp(1.6rem,5vw,3.2rem)]`

**Process step titles** (Home.tsx line 144): Already `text-[0.85rem]` on mobile. Good.

**Home.tsx process panel body** (line 199): `text-[14px] md:text-[15px]` — consistent with other panels.

**OurFocus.tsx sector item names** (line 215): `text-[0.95rem] md:text-[1.05rem]` — on mobile 0.95rem = 15.2px. Fine.

**OurFocus.tsx sector descriptions** (line 218): `text-[13px]` — acceptable for mobile descriptions.

**CriteriaTabs title** (line 315): `text-[1.05rem] md:text-[1.15rem]` — correct. But the tab row has `min-w-[140px]` per tab. With 6 tabs, that's 840px minimum which triggers horizontal scroll. This is fine on mobile with overflow-x-auto.

**CriteriaAccordion title** (line 402): `text-[1.1rem]` — consistent with tab titles. Good.

**Standardize all body text to minimum 14px on mobile**, verify:
- OurPlaybook panel: `text-[14px] md:text-[15px]` ✓
- OurFocus panel: `text-[15px] md:text-[17px]` ✓ (slightly larger, fine for criteria)
- OurFocus accordion: `text-[15px]` ✓
- Contact cards: `text-[13px] md:text-[14px]` — bump to `text-[14px] md:text-[15px]`
- Team advisory text: `text-[12.5px] md:text-[13px]` — too small on mobile. Bump to `text-[14px] md:text-[15px]`
- Team advisory disclaimer: `text-[10.5px] md:text-[11px]` — fine for disclaimer

### 4. Remaining Copy Issues

**Home.tsx India process steps** (lines 60-63): Some still sound formulaic.
- Line 60: "Deep networks across India's industrial heartland surface founder-led businesses with strong fundamentals and operational upside." → "We go deep into India's industrial heartland to find founder-led businesses with strong fundamentals and room to grow."
- Line 61: "Every opportunity is stress-tested across financials, operations, culture, and market position with institutional rigor." → "We pressure-test every opportunity: the financials, the operations, the culture, and the competitive position."
- Line 63: "Hands-on partnership from day one. We professionalize systems, deploy capital, and accelerate growth alongside management." → "From day one, we work alongside management to put better systems in place, deploy capital, and build."

**Home.tsx US process steps** (lines 53-56):
- Line 53: "We go where others don't. Deep networks, proprietary sourcing, and years of relationship-building surface businesses before they ever reach a market." → "We go where others don't. Years of relationship-building across our sectors give us access to businesses before they reach the market."
- Line 54: "Every opportunity is stress-tested across financials, operations, culture, and market position. Rigor is our edge." → "We pressure-test everything: financials, operations, culture, and competitive position. Rigor is our edge."
- Line 56: "Hands-on partnership from day one. We professionalize systems, deploy capital, and accelerate growth alongside management." → "From day one, we work alongside management to put better systems in place, deploy capital, and build."

**Team.tsx India hero subtitle** (line 379): "Global experience, local conviction. Building alongside the founders who are building India." — Good, keep.

**Team.tsx US hero subtitle** (line 380): "Operators and investors building alongside founders." — A bit thin. Change to: "Operators and investors who understand what it takes to build."

**Team.tsx US advisory text** (line 447): "Operators and leaders who have built businesses like the ones we invest in." — Good.

**Team.tsx India advisory text** (line 446): "Our advisors are senior operators and industry leaders across India and the US who have built what we aspire to build." — Good, keep.

### 5. Home.tsx Logo Marquee Wrapper (line 518)
Currently `<div className="bg-[hsl(40,20%,91%)]">` — good, matches the `variant="dark"` light-mode bg.

### 6. Contact.tsx Body Text Size Fix
Line 78: `text-[13px] md:text-[14px]` → `text-[14px] md:text-[15px]`

### Summary of Changes

| File | Changes |
|------|---------|
| `Team.tsx` | "Rolodex" → "contact list"; marquee variant to "dark"; parent bg synced; advisory body text bumped to 14px; US subtitle improved |
| `Home.tsx` | India process steps rewritten; US process steps tightened |
| `Contact.tsx` | Card description text bumped to 14px/15px |
| `ScrollRevealText.tsx` | Heading min clamp reduced from 1.9rem to 1.6rem for mobile |

