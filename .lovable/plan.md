

## Plan: Redesign Footer for Professional Desktop Layout

### Problem
The current footer crams brand, 6 navigation links, and email/region into a single row, causing nav links to wrap onto two lines at typical desktop widths (~947px). This looks unprofessional.

### Solution: Clean 3-row institutional footer

Restructure to a vertically stacked layout that never wraps:

```text
Row 1:  Cruxway | LOWER MIDDLE MARKET PE          info@cruxway.com  |  India
        ──────────────────────────────────────────────────────────────────
Row 2:  HOME · OUR IDENTITY · OUR FOCUS · OUR PLAYBOOK · TEAM · CONTACT
        ──────────────────────────────────────────────────────────────────
Row 3:  (c) 2026 Cruxway LLC...                    Privacy Policy  Terms
```

### File: `src/components/SiteFooter.tsx`

- **Row 1** (brand + contact): `flex justify-between items-center py-4`
  - Left: Cruxway wordmark + tagline (as-is)
  - Right: email + divider + region switcher (as-is)
- **Divider** between Row 1 and Row 2
- **Row 2** (navigation): `flex justify-center items-center py-3` - all 6 links in a single centered row with `gap-6 md:gap-8` so they never wrap
- **Divider** between Row 2 and Row 3
- **Row 3** (legal): copyright left, Privacy/Terms right, `py-2.5`
- Increase font sizes slightly: nav links to `text-[12px]`, email to `text-[12px]`, copyright/legal to `text-[11px]`
- Widen container to `max-w-[1200px]` for more breathing room
- Keep mobile stacking behavior with `flex-col` breakpoints

No other files modified.

