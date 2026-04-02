

## Fix: Mobile Accordion Should Start Collapsed

### Problem
The `CriteriaAccordion` component (mobile-only) in `src/pages/OurFocus.tsx` initializes with `useState(0)`, which auto-expands the first item ("Ownership Succession") on page load. It should start fully collapsed.

### Change

**File: `src/components/../pages/OurFocus.tsx`** — Line 405

Change:
```ts
const [open, setOpen] = useState(0);
```
To:
```ts
const [open, setOpen] = useState(-1);
```

This single-character change ensures no accordion item is expanded on load. Users must tap to expand. Desktop tabs (`CriteriaTabs`) remain unaffected.

