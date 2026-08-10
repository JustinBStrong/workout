# Workout

A mobile-first, light-mode reference for a six-session round-robin strength and rehabilitation program.

## What it does

- Keeps the next session in the round-robin visible.
- Links every cheat-sheet movement to a program-specific exercise page.
- Stores optional completion, weight, reps, and notes only in the current browser.
- Archives completed sessions locally and advances to the next card.
- Supports a knee-sensitive mode for the two conditional movements in Session 5.
- Works offline after the first successful visit.

## Local use

```bash
npm test
npm run serve
```

Then open <http://localhost:4173>.

## Data and privacy

No account or backend is used. Workout logs stay in local browser storage and do not sync between devices. Clearing site data removes them.

The program is a personal training reference, not medical diagnosis or treatment. Stop a movement that produces a nerve zap or worsening symptoms, and seek qualified assessment for swelling, locking, giving way, or progressively increasing pain.
