

## Plan: Nav Click Effect + Full Site Audit (Spacing, Content, Light Mode)

### 1. Navigation Click/Selection Effect

**File**: `src/components/SiteHeader.tsx`

Add a visual feedback effect when clicking nav items:

**Desktop nav links** (line 65): Add `active:scale-[0.93]` and a brief gold glow flash on click. Also add a subtle background highlight on the active item for persistent feedback.

```tsx
// Each nav link gets:
className={`relative font-sans text-[11.5px] font-medium uppercase tracking-[0.12em] py-1.5 px-2.5 rounded-sm transition-all duration-200
  active:scale-[0.93] active:bg-gold/[0.06]
  ${isActive(item.path)
    ? 'text-primary-foreground bg-primary-foreground/[0.04]'
    : 'text-primary-foreground/40 hover:text-primary-foreground/70 hover:bg-primary-foreground/[0.03]'
  }`}
```

**Mobile nav links** (line 150-154): Add `active:scale-95 active:text-gold/60` for tactile press feedback.

### 2. Full Site Content & Spacing Audit

After reviewing all pages end-to-end, here are the issues found and fixes:

#### A. Home Page (`src/pages/Home.tsx`)
- **Line 187**: `pb-0` on "Our Process" section creates no bottom breathing room before the next scroll reveal. Change to `pb-4`.
- **Lines 200-212**: Gap between ScrollRevealText and LogoMarquee. The ScrollRevealText has `py-20 md:py-28` internally. The LogoMarquee wrapper `<div className="bg-background">` needs no additional spacing. This is fine.

#### B. Investment Criteria (`src/pages/InvestmentCriteria.tsx`)
- **Line 207**: Double blank line. Remove extra blank line.
- **Lines 127-128**: Duplicate comments ("What We Look For" appears twice). Remove duplicate comment.

#### C. Contact Page (`src/pages/Contact.tsx`)
- **Lines 112-136**: The CTA section repeats the same "Get in Touch" / "Start a Conversation" messaging that's already on the page hero. This is redundant on a Contact page. Remove the entire CTA section (lines 112-136) since the user is already on the Contact page.
- This also removes the gap between the Commitment scroll reveal and footer.

#### D. Team Page (`src/pages/Team.tsx`)
- **Line 417**: `py-10 md:py-16` on Team Sticky Deck section creates excessive top padding since there's already a ScrollRevealText above with `py-20 md:py-28`. Change to `pt-0 pb-10 md:pb-16`.
- **Line 469-478**: "Institutional Experience" section at the bottom has `pt-10 md:pt-14 pb-6`. The `pb-6` creates a tight gap before footer. Change to `pb-10 md:pb-14`.

#### E. About Page (`src/pages/About.tsx`)
- Content is clean. No issues found.

#### F. Guiding Principles (`src/pages/GuidingPrinciples.tsx`)
- Content is clean. The "What Guides Us" heading is properly placed.

#### G. Footer (`src/components/SiteFooter.tsx`)
- Clean. No spacing issues.

### 3. Remove Remaining Em Dashes in Comments (Low Priority, Cleanliness)

All user-facing em dashes were already removed. Only code comments contain them. No action needed since they don't render.

### Files Modified Summary

1. `src/components/SiteHeader.tsx` - Add click/selection visual feedback (scale + gold glow + subtle bg)
2. `src/pages/Home.tsx` - Add `pb-4` to "Our Process" section
3. `src/pages/Contact.tsx` - Remove redundant CTA section (user is already on Contact)
4. `src/pages/Team.tsx` - Tighten top padding on Team Deck, increase bottom padding before footer
5. `src/pages/InvestmentCriteria.tsx` - Remove duplicate comments and extra blank lines

