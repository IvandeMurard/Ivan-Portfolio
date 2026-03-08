

## Cinematic Entrance: Multilingual Welcome Typewriter

Replace the static "Ivan de Murard" text with a cycling typewriter effect that rotates through "welcome" in multiple languages, starting with "Bienvenue".

### Words sequence
`["Bienvenue", "Welcome", "Bienvenido", "Willkommen", "Benvenuto", "ようこそ", "환영합니다", "Bem-vindo"]`

### How it works
1. Add a `wordIndex` state that cycles every ~300ms through the array
2. Each word fades in with a subtle scale, then fades out before the next appears
3. Use `AnimatePresence mode="wait"` for the text swap with a quick crossfade (150ms in, 100ms out)
4. Extend the total display time from 1800ms to ~3200ms to show 8 words comfortably (the curtains open after the last word)
5. The curtain exit animation stays identical

### Changes
**Single file: `src/components/effects/CinematicEntrance.tsx`**
- Add `WELCOME_WORDS` array constant
- Add `useState` for `wordIndex`, `useEffect` with interval to cycle through words
- Replace the static `<motion.span>Ivan de Murard</motion.span>` with an `AnimatePresence mode="wait"` block that renders the current word with key-based swap animations
- Update the main timer from 1800ms to ~3200ms
- Use `font-serif italic` styling for the words to differentiate from the hero title

