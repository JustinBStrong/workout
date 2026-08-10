# Workout

A plain, light-mode reference for a seven-session round-robin strength and rehabilitation program.

The live page puts the complete cheat sheet first. Session headings link to their full notes, and movements with scapular-control instructions link directly to those cues. There are no buttons, accounts, tracking, browser storage, or runtime JavaScript.

`sw.js` exists only to retire the previous version's offline worker: it removes that version's `workout-shell-v1` cache and unregisters itself. The document does not register a new worker.

- Live page: <https://justinbstrong.github.io/workout/>
- Source document: [`workout.md`](workout.md)

`index.html` is generated from `workout.md` with Pandoc:

```bash
pandoc workout.md --from=markdown --standalone --template=template.html \
  --metadata pagetitle='Workout' --output=index.html
```

The program is a personal training reference, not medical diagnosis or treatment. Reduce or stop movements that reproduce worsening symptoms, and seek qualified assessment for swelling, locking, giving way, or progressively increasing pain.
