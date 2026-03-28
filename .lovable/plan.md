

## Plan: Fix Playbook Heading & Add Scroll-to-Top

### Issue 1: "How We Build Value" heading rendering
The screenshot shows the heading with corrupted/broken font rendering. The `font-serif` class may be causing display issues on this particular heading. Fix by ensuring the heading uses proper font weight and adding explicit `font-display` handling. Also, the `text-foreground` color on a light `bg-background` section may have contrast issues depending on theme — will strengthen the color explicitly.

**File: `src/pages/OurPlaybook.tsx` (line 93)**
- Change the h2 from `text-foreground` to an explicit dark color with stronger weight
- Add `font-display: swap` safeguard via inline style if needed
- Slightly increase the font size clamp for better prominence

### Issue 2: Pages don't scroll to top on navigation
React Router doesn't auto-scroll to top on route changes. Will add a `ScrollToTop` component.

**New file: `src/components/ScrollToTop.tsx`**
- Listens to `pathname` changes via `useLocation`
- Calls `window.scrollTo({ top: 0, left: 0 })` on every route change

**File: `src/App.tsx`**
- Import and place `<ScrollToTop />` inside `<BrowserRouter>` before `<Routes>`

---

### Files
| File | Change |
|------|--------|
| `src/pages/OurPlaybook.tsx` | Fix h2 heading styling for "How We Build Value" |
| `src/components/ScrollToTop.tsx` | New component for scroll-to-top on navigation |
| `src/App.tsx` | Add `<ScrollToTop />` inside BrowserRouter |

