
Goal

- Keep the cinematic loader with effects as the only intentional loading/transition experience.
- Remove the extra static “Cruxway” screen shown in your screenshot.

What I found

- `src/App.tsx` already has the intended animated loader: `PageLoader`.
- `index.html` contains a second, full-screen hard-coded fallback with a dark background and static `Cruxway` wordmark.
- That static HTML is the duplicate screen, so the first-load sequence currently becomes:

```text
static HTML wordmark
→ animated loader
→ actual page
```

Implementation plan

1. Remove the branded static fallback from `index.html`
- Replace the current full-screen `Cruxway` wordmark block inside `#root` with a neutral full-screen shell only.
- No text, no logo, no second “page”.

2. Make the initial shell theme-aware before React mounts
- Add a tiny inline bootstrap in `index.html` that applies the correct dark/light background immediately using the same route/manual theme logic already used in `ThemeContext`.
- This avoids a dark flash on light pages and makes first paint blend into the animated loader.

3. Keep `PageLoader` in `src/App.tsx` as the only branded loading state
- Preserve the effects-based loader for lazy-load and transition moments.
- If needed, slightly soften its entrance so it feels like a continuation from the neutral shell rather than a second screen.

4. Do not change the overall transition concept
- This fix targets the duplicate static page only.
- The cinematic transition loader remains the visible experience, exactly as requested.

Files to update

- `index.html`
- `src/App.tsx` (only for minor loader polish if needed)

Technical details

- Root cause: the hard-coded static H1 fallback in `index.html`.
- I would not keep that static wordmark fallback, because it directly causes the double-loading experience.
- I would avoid broad router/Suspense restructuring in this pass since your requirement is specifically to remove the duplicate static screen, not replace the transition system.

Expected result

```text
neutral theme-matched shell
→ cinematic loader with effects
→ page
```

Verification

- Hard refresh on `/india/playbook`
- First visit to `/`
- Navigate between `Home`, `Our Playbook`, and `Team`
- Confirm the static wordmark screen never appears, and only the animated loader is shown during real loading states
