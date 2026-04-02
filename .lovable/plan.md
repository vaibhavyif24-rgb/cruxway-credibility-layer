

## Plan: Tighten Team Carousel Spacing and Polish Footer

### 1. Reduce gaps and padding in LogoMarquee (keep logo sizes unchanged)

**File: `src/components/LogoMarquee.tsx`**

- Add optional `compact` prop (boolean, default false)
- When `compact`: reduce padding to `py-2 md:py-3 lg:py-4` and gaps to `gap-5 md:gap-8 lg:gap-10`
- Default remains unchanged so Home and other pages are unaffected

### 2. Tighten Team page marquee wrapper

**File: `src/pages/Team.tsx`** (lines 458-467)

- Reduce wrapper padding from `pt-8 md:pt-10 pb-8 md:pb-10` to `pt-4 md:pt-5 pb-2 md:pb-3`
- Pass `compact` to `<LogoMarquee>`

### 3. Polish footer for desktop

**File: `src/components/SiteFooter.tsx`**

- Widen container from `1080px` to `1140px`
- Tighten Row 1 padding: `py-5 md:py-4` to `py-3`
- Tighten Row 2 padding: `py-3` to `py-2`
- Increase nav link desktop gap: `md:gap-5`
- Single-line layout on desktop: ensure all three groups (brand, nav, region/email) sit on one row with proper `justify-between` and no wrapping

