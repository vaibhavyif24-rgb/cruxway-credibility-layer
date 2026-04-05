
Goal

Fix the clipped descenders in desktop hero H1 headings everywhere, and repair the malformed JSX left by the earlier replacement, without changing anything else.

What I found

- The issue matches the screenshot: EB Garamond descenders like `g`, `y`, and `p` are being clipped in the page hero headlines.
- The intended visual fix is correct: all hero H1s should use `leading-[1.18]`.
- The build errors (`TS1381`, `TS1382`, `TS17008`) point to corrupted JSX/template-literal syntax on those same `<h1 className={\`...\`}>` lines from the previous bulk edit.
- The extra `Team.tsx` “missing closing tag” errors are likely just cascading parser failures from one broken hero H1 line near the top of that file.
- The affected hero H1s are in exactly these 8 files:
  - `src/pages/Home.tsx`
  - `src/pages/Team.tsx`
  - `src/pages/Contact.tsx`
  - `src/pages/OurFocus.tsx`
  - `src/pages/OurPlaybook.tsx`
  - `src/pages/GuidingPrinciples.tsx`
  - `src/pages/About.tsx`
  - `src/pages/InvestmentCriteria.tsx`

Implementation

1. Manually rewrite the full opening hero `<h1>` line in each of the 8 files.
   - Do not use another broad search/replace.
   - Retyping the complete opening tag is the safest way to remove any hidden malformed JSX characters.

2. Keep the only intended class change as:
   - `leading-[1.08]` -> `leading-[1.18]`
   - `leading-[1.1]` -> `leading-[1.18]`

3. Preserve everything else exactly as-is:
   - heading text
   - inline gold `<span>` styling
   - `text-[clamp(...)]`
   - `max-w-*`
   - `tracking-*`
   - dark/light conditional classes
   - spacing, imagery, motion, and structure

4. Do not touch any non-hero headings.
   - Some files already have other `leading-[1.18]` values on H2/H3 elements; those are unrelated.

Exact hero lines to repair

```text
src/pages/Home.tsx               line 417
src/pages/Team.tsx               line 372
src/pages/Contact.tsx            line 41
src/pages/OurFocus.tsx           line 123
src/pages/OurPlaybook.tsx        line 341
src/pages/GuidingPrinciples.tsx  line 36
src/pages/About.tsx              line 59
src/pages/InvestmentCriteria.tsx line 206
```

Validation

1. Run a TypeScript/build check and confirm these errors disappear:
   - `TS1381`
   - `TS1382`
   - `TS17008`

2. Confirm `Team.tsx` no longer reports unmatched JSX tags.

3. Verify on desktop across the affected pages that descenders like `g`, `y`, and `p` are fully visible.

4. Confirm no other copy, layout, animation, or structural changes occurred.

Technical details

- Even though the visible snippets already show `leading-[1.18]`, the compiler errors strongly suggest hidden corruption on those same lines, so each affected hero `<h1 ...>` opening tag should still be rewritten cleanly.
- `About.tsx` and `InvestmentCriteria.tsx` should also be corrected even if they are not currently routed, because TypeScript still compiles them.
- Scope stays strictly limited to this typography fix and syntax cleanup on those exact hero H1 lines.
