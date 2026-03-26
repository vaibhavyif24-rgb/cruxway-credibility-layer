

## Plan: Lower Desktop Nav Breakpoint

The current desktop navigation panel only appears at `lg` (1024px+). At your current viewport of 947px, you're seeing the mobile/tablet view with just the hamburger menu. The fix is to lower the breakpoint from `lg` to `md` (768px) so the full top navigation panel is visible on all desktop-class screens.

### Changes

**File**: `src/components/SiteHeader.tsx`

1. Change desktop nav from `hidden lg:flex` to `hidden md:flex` (line 59)
2. Change mobile controls from `lg:hidden` to `md:hidden` (line 107)
3. Slightly reduce nav item gaps for medium screens: `gap-4 lg:gap-5 xl:gap-7`
4. Reduce separator margin for medium screens: `mx-4 lg:mx-6`

This ensures the full navigation bar (Home, About Us, Investment Criteria, Team, Contact, theme toggle, Investor Login) is visible from 768px and up. Below 768px, the hamburger menu remains.

