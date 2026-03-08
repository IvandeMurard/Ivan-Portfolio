

## Fix: Cinematic Entrance Stuck on Green Screen

### Root Cause

A **Framer Motion crash** in `HeroKinetic.tsx` line 188 kills the entire React render tree. The error:

> "Only two keyframes currently supported with spring and inertia animations. Trying to animate 0,4,0"

The animation `{ x: [0, 4, 0] }` uses 3 keyframes with a `spring` transition type (line 195), which Framer Motion does not support. This uncaught error prevents the cinematic entrance from ever completing its exit animation, leaving the green curtain permanently visible.

### Fix

**File: `src/components/hero/HeroKinetic.tsx`** (line 190-196)

Remove the `spring` type from the `x` transition so it falls back to `tween`, which supports multiple keyframes:

```tsx
transition={{
  duration: 1.5,
  repeat: Infinity,
  ease: "easeInOut",
  repeatDelay: 0.5,
  scale: { type: "spring", stiffness: 400, damping: 10 },
}}
```

This keeps the spring on `scale` (hover, 2 keyframes) and uses the parent tween config for `x` (3 keyframes). No visual change -- the arrow will still bounce left-right smoothly.

### Impact

- Fixes the app crash that blocks the cinematic entrance from dismissing
- Fixes the permanent green screen on first visit
- All other hospitality features (smooth scroll, custom cursor, page transitions, welcome-back toast) will become testable once this is resolved

