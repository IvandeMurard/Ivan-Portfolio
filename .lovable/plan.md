

## Faster Cinematic Entrance

Current timing: 8 words × 350ms interval = 2.8s cycling + 3.2s total before curtains open. Too slow.

### Proposed: ~2s total

- **Reduce words from 8 to 5**: Keep `["Bienvenue", "Welcome", "Bienvenido", "Willkommen", "ようこそ"]` -- cuts the less impactful ones while keeping variety
- **Speed up interval**: 350ms → 250ms per word (5 × 250ms = 1.25s of cycling)
- **Reduce total timer**: 3200ms → 2000ms
- **Faster curtain exit**: 0.8s → 0.6s duration, remove 0.1s delay

Result: snappy 2-second entrance that still delivers the multilingual welcome without overstaying.

### Single file change
`src/components/effects/CinematicEntrance.tsx`

