

## Plan: Fix Identity Heading, Playbook Auto-Rotation, CTA Button, Nav Consistency

### 1. Fix India Principles Page Heading — `src/pages/GuidingPrinciples.tsx`

**Problem**: The SectionLabel shows "Our Identity, India" for the India region.

**Fix**: Change to just `'Our Identity'` for both regions.

### 2. Add Auto-Rotation to Playbook Step Navigator — `src/pages/OurPlaybook.tsx`

**Problem**: On mobile, only step numbers (01, 02, etc.) are shown without titles. The steps should auto-advance every 10 seconds.

**Fix**:
- Add a `useEffect` with a 10-second `setInterval` that increments `active` and wraps around
- Always show the step title text on mobile (remove `hidden sm:inline`)
- Reset the timer when user manually clicks a step

### 3. Remove Inner Shimmer Effect from CTA Buttons — All pages

**Problem**: The "Get in Touch" button has an inner white gradient shimmer sweep that creates a distracting visual artifact on hover.

**Fix**: Remove the inner `<span>` shimmer overlay from the CTA button across all 5 pages:
- `OurPlaybook.tsx`, `GuidingPrinciples.tsx`, `Home.tsx`, `OurFocus.tsx`, `InvestmentCriteria.tsx`

The button keeps `btn-premium-glow`, `hover:bg-gold hover:text-white`, and motion hover/tap effects.

### 4. Fix Footer Nav Labels — `src/components/SiteFooter.tsx`

**Problem**: Footer says "Principles", "Focus", "Playbook" instead of matching header labels.

**Fix**: Update to `'Our Identity'`, `'Our Focus'`, `'Our Playbook'`.

### 5. Verify All Route Links

All routes verified as correct. Header, footer, and CTA links all resolve properly. No broken links.

### Files Modified
- `src/pages/GuidingPrinciples.tsx`
- `src/pages/OurPlaybook.tsx`
- `src/pages/Home.tsx`
- `src/pages/OurFocus.tsx`
- `src/pages/InvestmentCriteria.tsx`
- `src/components/SiteFooter.tsx`

