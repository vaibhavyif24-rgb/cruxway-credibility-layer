## Plan: Fix Identity Heading, Playbook Auto-Rotation, CTA Button, Nav Consistency

### 1. Fix India Principles Page Heading — `src/pages/GuidingPrinciples.tsx`

**Problem**: The SectionLabel shows "Our Identity, India" for the India region.

**Fix**: Change line 33 from `{isIndia ? 'Our Identity, India' : 'Our Identity'}` to just `'Our Identity'` for both regions.

### 2. Add Auto-Rotation to Playbook Step Navigator — `src/pages/OurPlaybook.tsx`

**Problem**: On mobile, only step numbers (01, 02, etc.) are shown without titles (titles are `hidden sm:inline`). The steps should auto-advance every 10 seconds.

**Fix**:
- Add a `useEffect` with a 10-second `setInterval` that increments `active` and wraps around
- Always show the step title text (remove `hidden sm:inline` so titles are visible on mobile too)
- Reset the timer when user manually clicks a step
- Use `useInView` or similar to only auto-advance when the section is visible (optional, keep simple with just interval)

### 3. Remove Inner Shimmer Effect from CTA Buttons — All pages

**Problem**: The "Get in Touch" button has an inner `animate-shimmer-sweep` white gradient that creates a distracting effect on hover. The user's screenshot shows this as undesirable.

**Fix**: Remove the inner `<span>` shimmer overlay from the CTA button in:
- `src/pages/OurPlaybook.tsx` (lines 210-212)
- `src/pages/GuidingPrinciples.tsx` (lines 126-128)
- `src/pages/Home.tsx` (lines 566-568)
- `src/pages/OurFocus.tsx` (lines 299-301)
- `src/pages/InvestmentCriteria.tsx` (lines 389-391)

The button retains `btn-premium-glow`, `hover:bg-gold hover:text-white`, and the motion hover/tap effects — just the inner white shimmer sweep is removed.

### 4. Fix Footer Nav Labels — `src/components/SiteFooter.tsx`

**Problem**: Footer still says "Principles" instead of "Our Identity", and "Focus"/"Playbook" don't match header labels.

**Fix**: Update footer `navLinks` labels to match header:
- `'Principles'` → `'Our Identity'`
- `'Focus'` → `'Our Focus'`
- `'Playbook'` → `'Our Playbook'`

### 5. Verify All Route Links

Routes in `App.tsx` are correctly defined. Header and footer links all point to `/:region/principles`, `/:region/focus`, etc. All CTA "Get in Touch" buttons link to `/${region}/contact`. No broken links identified.

### Files Modified
- `src/pages/GuidingPrinciples.tsx` — remove "India" from heading
- `src/pages/OurPlaybook.tsx` — add 10s auto-rotation to StepNavigator, show titles on mobile, remove shimmer
- `src/pages/GuidingPrinciples.tsx` — remove shimmer
- `src/pages/Home.tsx` — remove shimmer
- `src/pages/OurFocus.tsx` — remove shimmer
- `src/pages/InvestmentCriteria.tsx` — remove shimmer
- `src/components/SiteFooter.tsx` — update nav labels
