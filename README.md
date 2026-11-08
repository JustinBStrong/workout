# Workout

A plain, light-mode reference for a seven-session round-robin strength and rehabilitation program.

The live page puts the complete cheat sheet first. Choose a session number to show only that workout and its relevant movement cues, or choose All to read the complete program. The last selection is remembered on the device. There are no accounts or workout tracking.

`filter.js` progressively enhances the static document: it builds workout-day and movement-cue components from the Markdown headings and links, then changes their native `hidden` state. The full document remains available without JavaScript. `sw.js` caches the page shell for instant repeat launches and offline use.

- Live page: <https://justinbstrong.github.io/workout/>
- Source document: [`workout.md`](workout.md)

`index.html` is generated from `workout.md` with Pandoc:

```bash
pandoc workout.md --from=markdown --standalone --template=template.html \
  --metadata pagetitle='Workout' --output=index.html
```

The program is a personal training reference, not medical diagnosis or treatment. Reduce or stop movements that reproduce worsening symptoms, and seek qualified assessment for swelling, locking, giving way, or progressively increasing pain.
