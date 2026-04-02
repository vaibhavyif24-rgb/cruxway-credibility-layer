

## Plan: Improve Footer Region Switcher Label

### Change
In `src/components/SiteFooter.tsx`, line 122, change the region switcher text from just the country name to a descriptive "Switch to" label:

**Current:** `India` or `US`
**New:** `Switch to India` or `Switch to United States`

### Technical Details

**File: `src/components/SiteFooter.tsx`**

- Line 122: Change `{otherRegion === 'india' ? 'India' : 'US'}` → `{otherRegion === 'india' ? 'Switch to India' : 'Switch to United States'}`
- Increase gap from `gap-1.5` to `gap-2` for better spacing with longer text
- Single-line change, desktop and mobile both benefit from clearer affordance

