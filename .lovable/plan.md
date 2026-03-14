

## Page Transitions — Already Implemented

Smooth page transitions using Framer Motion `AnimatePresence` are **already fully in place**:

- `App.tsx` wraps all `<Routes>` in `<AnimatePresence mode="wait">` with `key={location.pathname}`
- Every route is wrapped in `<PageTransition>` which applies a fade + slide (opacity 0→1, y 8→0) with a 0.4s cubic-bezier easing
- Exit animations (opacity 1→0, y 0→-8) fire before the next page enters

This is working correctly. No changes needed.

### Possible enhancements if you want more polish

If you'd like to **upgrade** the existing transitions, here are options:

1. **Crossfade instead of wait** — Change `mode="wait"` to `mode="sync"` for overlapping transitions (pages blend rather than sequential exit→enter). Requires adding `position: absolute` layout handling.

2. **Direction-aware transitions** — Slide left when going deeper (Home → Case Study), slide right when going back. Requires tracking navigation direction via a context or comparing route depth.

3. **Shared layout animation** — Use Framer Motion `layoutId` on case study cards so the card morphs into the case study hero when clicked. Most visually impressive but requires refactoring card + hero components.

None of these are needed — the current setup is clean and functional. Let me know if you'd like to pursue any of the upgrades above.

