

## Add Scroll-Reveal Stat Blocks to ScrollRevealText

### Summary
Replace the plain-text metric subtext in the Market Thesis section with proper stat blocks that use the same scroll-driven opacity effect as the heading words. The stats will appear as large serif numbers with small uppercase labels — all animated by the shared `scrollYProgress`.

### Changes

**File: `src/components/ScrollRevealText.tsx`**

1. Add a new optional `stats` prop: `stats?: { value: string; label: string }[]`
2. When `stats` is provided, render a horizontal grid (3 columns on md+, stacked on mobile) after the heading, replacing the subtext area
3. Each stat block gets scroll-driven opacity using `useTransform(scrollYProgress, [0.65, 0.9], [0, 1])` — fading in near the end of the scroll range
4. Stat styling: large serif value (`text-[clamp(1.4rem,3vw,2rem)]`), small uppercase tracking label (`text-[10px] tracking-[0.18em]`), centered, with appropriate light/dark color treatment

**File: `src/pages/Home.tsx`**

1. Remove the `subtext` prop from the Market Thesis `ScrollRevealText`
2. Add a `stats` prop instead:
   - **India**: `[{ value: '63M+', label: 'MSMEs' }, { value: '<1%', label: 'Institutionally Backed' }, { value: '$5T', label: 'Economy by 2028' }]`
   - **US**: `[{ value: '10M+', label: 'Small Businesses' }, { value: '$10T+', label: 'Transition Value' }, { value: '70%+', label: 'Lack Succession Plans' }]`

### Technical Details
- The stat blocks reuse the same `scrollYProgress` from `useScroll` already in the component — no new scroll listeners
- Stats render inside the same `<section>` container, inheriting the dark background and centered layout
- A thin gold rule (`border-t border-gold/10`) separates heading from stats for visual structure
- Stats stagger slightly: each stat's opacity range is offset by ~0.05 for a sequential reveal feel

