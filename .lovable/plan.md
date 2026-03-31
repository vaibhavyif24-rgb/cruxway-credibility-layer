

## Navigation Bar: Visible Active Page Indicator

### Changes
**File**: `src/components/SiteHeader.tsx`

**Desktop nav links (lines 130-147)**:
- Active text: `text-gold font-semibold` in both light and dark modes (replacing invisible `bg-foreground/[0.03]` and dark blue text)
- Inactive text: `text-foreground/40 hover:text-foreground/70` in light mode (clearer contrast with active gold)
- Active underline: `h-[2px] bg-gold rounded-full` at `-bottom-1` (replacing 1px 30%-opacity blue/gold line)
- Remove `active:bg-gold/[0.06]` tap highlight and invisible active backgrounds

**Mobile nav links (lines 298-302)**:
- Active: `text-gold font-medium` in both modes (replacing `text-foreground` / `text-primary-foreground` which blends with inactive)
- Inactive: `text-foreground/25` (light) / `text-primary-foreground/25` (dark) — unchanged

### Technical Details
Single file edit (`SiteHeader.tsx`), two className replacements. No structural changes.

