

## Fix: Sectors Card Layout — Mobile and Desktop

### Problems Identified
1. **Mobile**: All 3 category groups stack vertically creating an excessively long card. India has 12 items across 3 categories; US has 6 items across 3 categories. The vertical list feels unstructured.
2. **Desktop**: The US card's third column ("Specialist Services") has only 1 item, making it visually unbalanced versus the other two columns.
3. **Both**: The border-left styling on mobile looks cramped within the tight 18px padding.

### Solution

**Restructure the data and layout for both components to be more balanced and compact.**

#### India (`CinematicScrollReveal.tsx`)

**Consolidate from 3 categories to 2** for better visual balance:
- **Industrials**: Process & Flow Control, Value-Added Distribution, Industrial Services, Packaging
- **Business & Industrial Services**: Facility & Support Services, Testing & Certification, Infrastructure Services, Industrial Technology, Aerospace & Defense

Trim verbose names:
- "Testing, Inspection, and Certification" → "Testing & Certification"
- "Utility and Infrastructure Services" → "Infrastructure Services"
- "Business Process Outsourcing / Contract Manufacturing" and "Insurance Services and Distribution" → Remove (least core to thesis)
- "Lab Services and Products" → Remove

**Mobile layout**: Use a `grid-cols-2` layout with the two categories side by side even on mobile. Remove the vertical dividers on mobile, keep the border-left accent. This halves the vertical height.

**Desktop layout**: Switch from `grid-cols-[1fr_1px_1fr_1px_1fr]` to `grid-cols-[1fr_1px_1fr]` (two columns with divider).

#### US (`USCinematicScrollReveal.tsx`)

**Consolidate from 3 categories to 2** for balance:
- **Infrastructure & Industrial**: Electrical & Infrastructure, Industrial Distribution, Engineering & Technical
- **Services & Compliance**: Facility Services, Compliance & Safety, Environmental Services

Move "Engineering & Technical" from "Specialist Services" into "Infrastructure & Industrial". Remove the lone third column entirely.

**Mobile layout**: Same `grid-cols-2` approach — two categories side by side. Hide descriptions on mobile (already hidden). Remove the verbose descriptions entirely on mobile for clean compact look.

**Desktop layout**: Switch to `grid-cols-[1fr_1px_1fr]` (two balanced columns).

#### Shared layout changes for both files

```
Mobile (< md):
  grid grid-cols-2 gap-4

Desktop (md+):
  grid md:grid-cols-[1fr_1px_1fr] md:gap-0
```

- Remove the third column and its two divider elements
- Keep the border-left accent on each category
- Slightly increase mobile font sizes: items from `10px` to `11px`, category headers from `0.85rem` to `0.8rem`
- Mobile card padding stays at `20px 18px`

### Files Modified
- `src/components/CinematicScrollReveal.tsx` — restructure data to 2 categories, update grid to 2-column
- `src/components/USCinematicScrollReveal.tsx` — restructure data to 2 categories, update grid to 2-column

### What Stays Unchanged
- All scroll animations, expanding circle, sticky behavior
- Card glass background, border, backdrop-filter styling
- Desktop/mobile padding overrides
- `src/index.css` — no changes
- No JS logic changes (scroll handlers, progress calculations)

