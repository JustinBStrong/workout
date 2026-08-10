import test from "node:test";
import assert from "node:assert/strict";
import {
  controlExposureCount,
  exerciseIndex,
  sessions
} from "../program.js";

test("the program is a six-session round-robin", () => {
  assert.equal(sessions.length, 6);
  assert.deepEqual(
    sessions.map((session) => session.id),
    [1, 2, 3, 4, 5, 6]
  );
});

test("the dedicated rehabilitation density remains 23 exposures", () => {
  const audit = sessions.map(controlExposureCount);
  assert.deepEqual(audit, [3, 4, 4, 3, 4, 5]);
  assert.equal(audit.reduce((total, count) => total + count, 0), 23);
});

test("every movement has a unique id and a working exercise-library entry", () => {
  const movements = sessions.flatMap((session) => session.movements);
  const ids = new Set(movements.map((movement) => movement.id));
  const indexedSlugs = new Set(exerciseIndex.map((exercise) => exercise.slug));

  assert.equal(ids.size, movements.length);
  for (const movement of movements) {
    assert.ok(movement.slug);
    assert.ok(indexedSlugs.has(movement.slug));
  }
});

test("only the two intended Session 5 movements are flagged for knee-sensitive mode", () => {
  const flagged = sessions
    .flatMap((session) =>
      session.movements
        .filter((movement) => movement.kneeSensitiveSkip)
        .map((movement) => ({ sessionId: session.id, slug: movement.slug }))
    );

  assert.deepEqual(flagged, [
    { sessionId: 5, slug: "knee-dominant-anchor" },
    { sessionId: 5, slug: "unilateral-knee-pattern" }
  ]);
});
