
## Dead Code Policy

The following files have been deleted and should NOT be recreated:

- Pages: About.tsx, Index.tsx, InvestmentCriteria.tsx

- Components: CriteriaPipeline, HorizontalStickyDeck, NavLink, PrinciplesDeck, PrinciplesGrid, SectorShowcase, StrengthsWidget, StickyCardStack, AnimatedAccent, CriteriaIllustrations, CriteriaCarousel, CinematicScrollReveal, USCinematicScrollReveal

- UI: 23 unused shadcn components (accordion through toggle-group), toaster.tsx, use-toast.ts, hooks/use-toast.ts

## Import Rules

- Do NOT use `import React from 'react'` unless `React.` is explicitly referenced in the file body
- Import hooks directly: `import { useState, useEffect } from 'react'`
- framer-motion v12 is installed. Imports from `framer-motion` are correct for this project.

## Style Rules

- Extract static inline style objects to constants outside components
- Use `useMemo` for style objects that depend on theme/region

## Text Shimmer Fix

The `.text-shimmer-gold` utility in `src/index.css` includes a desktop-only descender buffer to prevent clipping of letters like `g`, `y`, `p` when using `background-clip: text`. This fix is centralized — do not add per-page workarounds.
