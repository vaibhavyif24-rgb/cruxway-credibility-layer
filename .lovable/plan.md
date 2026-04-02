
Fix the remaining Team hero line artifact and polish the hero so it feels cinematic in both India and US modes.

What I found
- The line behind “founders.” is the Team page stats-strip separator, not the image itself.
- In `src/pages/Team.tsx`, the absolute bottom stats bar uses a full-width `border-t`, and at the current tablet/desktop spacing that line lands directly behind the last line of the paragraph.
- This affects both `/india/team` and `/us/team` because they share the same hero layout.

Plan
1. Remove the hard separator from the Team stats bar
   - Delete the full-width `border-t` on the Team hero stats strip so the random line disappears completely.

2. Redesign the stats strip so it still feels premium
   - Replace the hard line with a softer treatment: a subtle translucent/blurred band or top fade.
   - Keep the existing gold stat accents so the section still has structure without a distracting rule.

3. Rebalance the Team hero layout
   - Increase the bottom clearance between the intro copy and the stats strip, especially around the current ~947px viewport where the overlap is most visible.
   - Tune spacing so both the India and US text variants sit comfortably above the stats row.

4. Make the moving hero image read better
   - Keep the shared `CinematicHero` motion system (Ken Burns + parallax), but lighten the Team hero’s overlay using the existing softer overlay option so the background movement is more visible in both themes.
   - Do not add new decorative lines or extra separators.

Technical details
- Main file: `src/pages/Team.tsx`
- Intended edits:
  - remove the stats bar `border-t`
  - add a soft gradient/backdrop treatment to the stats strip
  - adjust hero content padding/alignment
  - switch Team’s `CinematicHero` usage to the lighter existing overlay mode
- Scope stays Team-only so other hero sections are not unintentionally changed.

Validation
- Check `/india/team` and `/us/team`
- Check light and dark themes
- Confirm:
  - no line appears behind the hero paragraph
  - hero copy and stats never collide
  - the image still feels subtly alive behind the content
