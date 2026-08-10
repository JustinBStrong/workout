export const programRules = [
  {
    label: "Format",
    value: "Six-session round-robin",
    detail: "Continue to the next card when you train; the program is not tied to weekdays."
  },
  {
    label: "Heavy bench",
    value: "Top set 3–5 @ RPE 8–9",
    detail: "Follow with 3 back-off sets of 5–8 @ RPE 7–8."
  },
  {
    label: "Accessories",
    value: "Mostly 8–20 reps",
    detail: "Push near failure only where the movement is stable and safe."
  },
  {
    label: "Control work",
    value: "Clean reps only",
    detail: "No sloppy failure or nerve zaps. Progress control, range, then small loads."
  }
];

export const kneeSensitiveNote = {
  title: "While the knee is sensitive",
  body:
    "In Session 5, omit the primary knee-dominant movement and the unilateral movement. Keep leg curls, calves, tibialis, hip work, Pallof presses, and side planks. Reintroduce one knee-dominant movement first after baseline sensitivity settles.",
  escalation:
    "Swelling, locking, giving way, or progressively increasing pain warrants assessment rather than continued experimentation under load."
};

export const sessions = [
  {
    id: 1,
    slug: "bench-strength",
    shortTitle: "Bench",
    title: "Bench Strength + Chest/Triceps + Serratus",
    marker: "PRESS / FIX / RESTORE",
    focus: ["Bench strength", "Chest", "Triceps", "Serratus"],
    accent: "#175cd3",
    summary:
      "The only full chest session: heavy bench, one secondary press, triceps, and scapular control bracketing the pressing block.",
    whyOrder:
      "Push-up plus gives a low-fatigue serratus exposure before benching. Bench stays fresh, the supported row adds retraction without taxing the QL, and only one secondary chest movement follows. Cable punch restores free protraction after the blades have been fixed against the bench; face-pull to external rotation finishes with posterior shoulder and cuff control.",
    movements: [
      {
        id: "s1-push-up-plus",
        slug: "push-up-plus",
        name: "Push-up plus on handles",
        prescription: "2 × 5–8 · comfortably short of fatigue",
        kind: "control",
        exposures: 1,
        intent: "Prime serratus-driven protraction before benching without tiring the prime movers.",
        cue: "Keep the elbows quiet and finish each rep by letting the shoulder blades wrap forward around the ribs."
      },
      {
        id: "s1-bench",
        slug: "bench-press",
        name: "Flat bench press",
        prescription: "Top set 3–5 · then 3 × 5–8",
        kind: "lift",
        intent: "Primary strength exposure toward the two-plate bench goal.",
        cue: "Use a repeatable setup and stable upper back; add load when the back-off sets reach the top of the range cleanly."
      },
      {
        id: "s1-supported-row",
        slug: "chest-supported-row",
        name: "Chest-supported T-bar row / seal row",
        prescription: "3 × 6–10",
        kind: "lift",
        intent: "Add heavy back work and scapular retraction without loading the QL.",
        cue: "Allow a controlled reach at the bottom, then pull without lifting the chest from the support."
      },
      {
        id: "s1-incline-press",
        slug: "incline-press",
        name: "Incline DB press / machine chest press",
        prescription: "2–3 × 8–12",
        kind: "lift",
        intent: "Provide the session’s only secondary chest movement.",
        cue: "Keep this subordinate to the heavy bench; remove it first if chest continues to outpace everything else."
      },
      {
        id: "s1-cable-punch",
        slug: "cable-punch",
        name: "Cable punch",
        prescription: "2 × 12–15",
        kind: "control",
        exposures: 1,
        intent: "Restore free scapular protraction after the pressing block.",
        cue: "Reach through the punch with the shoulder blade instead of twisting the torso."
      },
      {
        id: "s1-overhead-extension",
        slug: "overhead-cable-extension",
        name: "Overhead cable extension",
        prescription: "3 × 8–12",
        kind: "lift",
        intent: "Train the triceps in an overhead position after the compound pressing.",
        cue: "Keep the upper arm position steady and use a controlled stretch."
      },
      {
        id: "s1-rope-pushdown",
        slug: "rope-pushdown",
        name: "Rope pushdown",
        prescription: "3 × 10–15",
        kind: "lift",
        intent: "Finish direct triceps work with a stable cable movement.",
        cue: "Keep the shoulders quiet and finish with the elbows fully extended without swinging."
      },
      {
        id: "s1-face-pull",
        slug: "face-pull-er",
        name: "Face-pull to external rotation",
        prescription: "2 × 12–15",
        kind: "control",
        exposures: 1,
        intent: "Restore posterior shoulder, cuff, and scapular control after pressing.",
        cue: "Use a light load that permits a smooth pull and rotation without shrugging or forcing range."
      }
    ]
  },
  {
    id: 2,
    slug: "posterior-chain",
    shortTitle: "Hinge",
    title: "Posterior Chain + QL, Knee-Light",
    marker: "BRACE / HINGE / CARRY",
    focus: ["Posterior chain", "Hamstrings", "Glutes", "QL"],
    accent: "#0f7b6c",
    summary:
      "A hip- and hamstring-dominant lower session with direct anti-rotation and anti-lateral-flexion work after the demanding lifts.",
    whyOrder:
      "Dead bug supplies low-fatigue trunk positioning before the hinge. The lower-body block stays posterior-chain dominant. Bear crawl, Pallof press, and suitcase carries come after the lifts so the trunk and QL are not pre-fatigued; suitcase carries finish because they are the most direct loaded anti-lateral-flexion exposure.",
    notes: ["Choose either the Romanian deadlift or conventional deadlift as the anchor, not both."],
    movements: [
      {
        id: "s2-dead-bug",
        slug: "dead-bug",
        name: "Dead bug",
        prescription: "2 controlled sets",
        kind: "control",
        exposures: 1,
        intent: "Set low-fatigue trunk position before hinging.",
        cue: "Move only as far as you can while keeping the trunk position quiet and controlled."
      },
      {
        id: "s2-hinge",
        slug: "hinge-anchor",
        name: "Romanian deadlift / deadlift",
        prescription: "Top set 5–8 · then 3 × 6–10",
        kind: "lift",
        intent: "Anchor the session with one heavy hinge pattern.",
        cue: "Choose one variation for the day and stop the set before trunk position or bar path degrades."
      },
      {
        id: "s2-hip-thrust",
        slug: "hip-thrust",
        name: "Hip thrust / glute bridge machine",
        prescription: "3 × 8–12",
        kind: "lift",
        intent: "Add glute loading without duplicating the hinge.",
        cue: "Use a controlled lockout and avoid turning the finish into a lower-back extension."
      },
      {
        id: "s2-seated-curl",
        slug: "seated-leg-curl",
        name: "Seated leg curl",
        prescription: "3 × 8–15",
        kind: "lift",
        intent: "Train knee-flexion hamstring strength after the hinge work.",
        cue: "Keep the hips settled and control the return."
      },
      {
        id: "s2-back-extension",
        slug: "back-extension",
        name: "45-degree back extension",
        prescription: "2–3 × 10–15",
        kind: "lift",
        intent: "Build posterior-chain and trunk tolerance with a controlled accessory.",
        cue: "Move through the hips and finish in a neutral stacked position rather than hyperextending."
      },
      {
        id: "s2-standing-calf",
        slug: "standing-calf-raise",
        name: "Standing calf raise",
        prescription: "3–4 × 8–15",
        kind: "lift",
        intent: "Provide direct calf work on the knee-light lower day.",
        cue: "Use a full controlled stretch and pause rather than bouncing."
      },
      {
        id: "s2-hips",
        slug: "hip-abductor-adductor",
        name: "Hip abductor + hip adductor",
        prescription: "2–3 × 15–25 each",
        kind: "lift",
        intent: "Broaden hip capacity after the primary posterior-chain work.",
        cue: "Keep the pelvis steady and use a range you can control."
      },
      {
        id: "s2-bear",
        slug: "bear-crawl-hold",
        name: "Bear-crawl hold",
        prescription: "2 sets",
        kind: "control",
        exposures: 1,
        intent: "Train integrated serratus and trunk stability after lifting.",
        cue: "Hover low with quiet hips and push the floor away."
      },
      {
        id: "s2-pallof",
        slug: "pallof-press",
        name: "Pallof press",
        prescription: "2–3 × 10–12 each side",
        kind: "control",
        exposures: 1,
        intent: "Add anti-rotation capacity without pre-fatiguing the hinge.",
        cue: "Press straight out while resisting the cable’s attempt to rotate the torso."
      },
      {
        id: "s2-suitcase",
        slug: "suitcase-carry",
        name: "Suitcase carry",
        prescription: "2–3 carries each side",
        kind: "control",
        exposures: 1,
        intent: "Finish with the most direct loaded anti-lateral-flexion QL exposure.",
        cue: "Walk tall without leaning toward or away from the weight."
      }
    ]
  },
  {
    id: 3,
    slug: "back-thickness",
    shortTitle: "Thickness",
    title: "Back Thickness + Biceps + Retraction Control",
    marker: "REACH / ROW / RETRACT",
    focus: ["Back thickness", "Biceps", "Retraction", "Horizontal abduction"],
    accent: "#8b5e19",
    summary:
      "A horizontal-pull day: controlled forward glide into the stretch, retraction through the pull, then biceps and lower-trap/cuff restoration.",
    whyOrder:
      "Cable punch first teaches the scapula to wrap around the ribs before repeated protraction and retraction under load. Rows allow controlled forward glide at the stretch and retraction during the pull. Reverse pec deck adds horizontal abduction without another nearly identical row. Biceps follow the major pulls; prone Y/T and face-pull work restore lower-trap, posterior-tilt, and cuff control after fatigue.",
    notes: ["Keep this day horizontal and thickness-oriented; do not turn it into four subtly different pulldowns."],
    movements: [
      {
        id: "s3-cable-punch",
        slug: "cable-punch",
        name: "Cable punch",
        prescription: "2 × 12–15",
        kind: "control",
        exposures: 1,
        intent: "Teach the scapula to wrap before loaded rows.",
        cue: "Reach without rotating the torso; let the shoulder blade glide around the ribs."
      },
      {
        id: "s3-seal-row",
        slug: "chest-supported-row",
        name: "Seal row / chest-supported T-bar row",
        prescription: "Top set 5–8 · then 3 × 6–10",
        kind: "lift",
        intent: "Anchor the day with a heavy horizontal pull and minimal QL demand.",
        cue: "Permit a controlled reach at the stretch, then retract during the pull instead of holding the blades permanently pinched."
      },
      {
        id: "s3-high-row",
        slug: "machine-high-row",
        name: "Machine high row / one-arm cable row",
        prescription: "3 × 8–12",
        kind: "lift",
        intent: "Add a second substantial row through a different path.",
        cue: "Keep the ribcage and pelvis quiet while the shoulder blade moves with the arm."
      },
      {
        id: "s3-reverse-pec-deck",
        slug: "reverse-pec-deck",
        name: "Reverse pec deck",
        prescription: "3 × 12–20",
        kind: "lift",
        intent: "Train horizontal abduction without adding another similar row.",
        cue: "Move through the rear shoulder without aggressively pinching or shrugging."
      },
      {
        id: "s3-ez-curl",
        slug: "ez-preacher-curl",
        name: "EZ-bar curl / preacher curl",
        prescription: "4 × 6–10",
        kind: "lift",
        intent: "Provide the heavy direct biceps work after the major pulling.",
        cue: "Keep the working position stable and avoid turning the last reps into a body swing."
      },
      {
        id: "s3-incline-curl",
        slug: "incline-db-curl",
        name: "Incline DB curl",
        prescription: "3 × 10–15",
        kind: "lift",
        intent: "Add a lengthened-position biceps accessory.",
        cue: "Use a load that lets the upper arm remain controlled through the stretch."
      },
      {
        id: "s3-prone-yt",
        slug: "prone-y-t",
        name: "Prone Y + prone T",
        prescription: "2 sets each",
        kind: "control",
        exposures: 2,
        intent: "Restore lower-trap and posterior-tilt control after the heavy retractors and lats are tired.",
        cue: "Use small, clean movements; stop before shrugging or forcing height."
      },
      {
        id: "s3-face-pull",
        slug: "face-pull-er",
        name: "Face-pull to external rotation",
        prescription: "2 × 12–15",
        kind: "control",
        exposures: 1,
        intent: "Finish with cuff and scapular control after the pull volume.",
        cue: "Keep the load light enough for a smooth pull-and-rotate path."
      }
    ]
  },
  {
    id: 4,
    slug: "delts-arms",
    shortTitle: "Delts",
    title: "Delts + Arms + Bench Technique + Upward Rotation",
    marker: "PRACTICE / ROTATE / RAISE",
    focus: ["Delts", "Arms", "Bench skill", "Upward rotation"],
    accent: "#8a3ffc",
    summary:
      "Two easy bench-practice sets preserve the 225 goal without creating a second chest day, followed by upward-rotation work, delts, and arms.",
    whyOrder:
      "Paused bench technique comes first while setup and bar path are fresh, but remains too easy to become a hypertrophy block. Wall slide then rehearses the switch from fixed scapulae on the bench to free upward rotation and posterior tilt for Arnold pressing. Cable punch restores serratus control after shoulder fatigue; prone external rotation finishes so the cuff is not pre-fatigued before pressing.",
    notes: ["The bench exposure is skill practice only: two clean sets at RPE 6–7, not another chest workout."],
    movements: [
      {
        id: "s4-bench-technique",
        slug: "bench-press",
        name: "Normal-grip paused bench technique",
        prescription: "2 × 5 · RPE 6–7",
        kind: "lift",
        intent: "Practice setup, bar path, control off the chest, and familiarity without meaningful chest fatigue.",
        cue: "Keep every rep crisp and deliberately submaximal; this is practice, not a test."
      },
      {
        id: "s4-wall-slide",
        slug: "wall-slide-liftoff",
        name: "Wall slide + lift-off",
        prescription: "2 × 8–12",
        kind: "control",
        exposures: 1,
        intent: "Transition from bench fixation to free upward rotation and posterior tilt.",
        cue: "Slide only through a range where the ribs stay quiet and the shoulders move smoothly."
      },
      {
        id: "s4-arnold",
        slug: "arnold-press",
        name: "Arnold press",
        prescription: "4 × 6–10",
        kind: "lift",
        intent: "Anchor the day with loaded upward rotation and shoulder elevation.",
        cue: "Let the shoulder blades move with the arms rather than pinning them down."
      },
      {
        id: "s4-lateral",
        slug: "lateral-raise",
        name: "DB or cable lateral raise",
        prescription: "4 × 12–20",
        kind: "lift",
        intent: "Add high-rep delt work and loaded scapular-elevation practice.",
        cue: "Raise smoothly without heaving; use a path and range the shoulder tolerates."
      },
      {
        id: "s4-ez-curl",
        slug: "ez-preacher-curl",
        name: "Preacher curl / EZ-bar curl",
        prescription: "4 × 6–10",
        kind: "lift",
        intent: "Train biceps as a priority rather than a leftover.",
        cue: "Keep the movement controlled and the shoulder from rolling forward under fatigue."
      },
      {
        id: "s4-overhead-extension",
        slug: "overhead-cable-extension",
        name: "Overhead cable extension",
        prescription: "3 × 8–12",
        kind: "lift",
        intent: "Provide substantial direct triceps work.",
        cue: "Keep the upper arm position steady and control the lengthened position."
      },
      {
        id: "s4-pushdown-hammer",
        slug: "pushdown-hammer-curl",
        name: "Rope pushdown + hammer curl",
        prescription: "3 × 10–15 each",
        kind: "lift",
        intent: "Finish the arm block with a stable antagonistic pairing.",
        cue: "Use clean cable extensions and neutral-grip curls without torso swing."
      },
      {
        id: "s4-cable-punch",
        slug: "cable-punch",
        name: "Cable punch",
        prescription: "2 × 12–15",
        kind: "control",
        exposures: 1,
        intent: "Reinforce serratus control after the shoulders have accumulated fatigue.",
        cue: "Reach through the shoulder blade while resisting torso rotation."
      },
      {
        id: "s4-prone-er",
        slug: "prone-er-90-90",
        name: "Prone ER 90/90",
        prescription: "2 × 12–15",
        kind: "control",
        exposures: 1,
        intent: "Finish with external-rotation control after pressing and raises.",
        cue: "Use a very manageable load and rotate without forcing the end range."
      }
    ]
  },
  {
    id: 5,
    slug: "knee-dominant",
    shortTitle: "Knee",
    title: "Light Knee-Dominant Legs + QL",
    marker: "TRACK / STEP / RESIST",
    focus: ["Quadriceps", "Calves", "Tibialis", "Hips", "QL"],
    accent: "#c45124",
    summary:
      "One modest knee-dominant pattern, at most one unilateral pattern, then lower-leg, hip, and controlled trunk work.",
    whyOrder:
      "Band preparation and dead bug support knee tracking and trunk control without substantial fatigue. The day never stacks several hard knee-dominant movements. QL and anti-rotation work stay late so they do not interfere with loaded lower-body patterns.",
    notes: [
      "In knee-sensitive mode, skip movements 3 and 4. Do not replace the missing squat with another squat-like exercise merely to complete the list."
    ],
    movements: [
      {
        id: "s5-band-squat",
        slug: "banded-squat-warmup",
        name: "Band-above-knee squat warm-up",
        prescription: "2 light sets",
        kind: "control",
        exposures: 1,
        intent: "Prepare the known knee-tracking pattern before loaded work.",
        cue: "Use a light band and rehearse smooth tracking rather than turning the warm-up into fatigue."
      },
      {
        id: "s5-dead-bug",
        slug: "dead-bug",
        name: "Dead bug",
        prescription: "2 controlled sets",
        kind: "control",
        exposures: 1,
        intent: "Prime trunk control without pre-fatiguing the lower-body work.",
        cue: "Move only within the range where the trunk stays stable."
      },
      {
        id: "s5-knee-anchor",
        slug: "knee-dominant-anchor",
        name: "Back squat / hack squat / leg press / goblet squat",
        prescription: "Choose one · 2–3 × 6–12",
        kind: "lift",
        kneeSensitiveSkip: true,
        intent: "Provide a single modest primary knee-dominant exposure.",
        cue: "Choose the best-tolerated option and do not add another squat-like substitute."
      },
      {
        id: "s5-unilateral",
        slug: "unilateral-knee-pattern",
        name: "Reverse lunge / split squat / step-up",
        prescription: "Choose one · 2–3 × 8–12 each side",
        kind: "lift",
        kneeSensitiveSkip: true,
        intent: "Add at most one modest unilateral pattern when tolerated.",
        cue: "Use only when tolerated; return it after the primary pattern has been reintroduced successfully."
      },
      {
        id: "s5-lying-curl",
        slug: "lying-leg-curl",
        name: "Lying leg curl",
        prescription: "3 × 10–15",
        kind: "lift",
        intent: "Keep hamstring work in the session without adding knee-dominant load.",
        cue: "Control both directions and keep the hips settled."
      },
      {
        id: "s5-calf-tib",
        slug: "calf-tibialis",
        name: "Seated calf raise + tibialis raise",
        prescription: "3–4 rounds",
        kind: "lift",
        intent: "Train both sides of the lower leg.",
        cue: "Use full controlled ranges and avoid bouncing."
      },
      {
        id: "s5-hips",
        slug: "hip-abductor-adductor",
        name: "Hip abductor + hip adductor",
        prescription: "2–3 × 15–25 each",
        kind: "lift",
        intent: "Build hip capacity without stacking more knee-dominant work.",
        cue: "Keep the pelvis steady and the tempo controlled."
      },
      {
        id: "s5-pallof",
        slug: "pallof-press",
        name: "Pallof press",
        prescription: "2–3 × 10–12 each side",
        kind: "control",
        exposures: 1,
        intent: "Add anti-rotation work after the lower-body block.",
        cue: "Stay square while the cable tries to rotate you."
      },
      {
        id: "s5-side-plank",
        slug: "side-plank",
        name: "Side plank",
        prescription: "2–3 sets each side",
        kind: "control",
        exposures: 1,
        intent: "Finish with controlled lateral-trunk and QL capacity.",
        cue: "Use a position you can hold without twisting or collapsing."
      }
    ]
  },
  {
    id: 6,
    slug: "back-width",
    shortTitle: "Width",
    title: "Back Width + Lower Trap/Cuff + Scapular Rotation",
    marker: "ROTATE / PULL / RESTORE",
    focus: ["Back width", "Lats", "Lower trap", "Cuff", "Serratus"],
    accent: "#1d6f9f",
    summary:
      "A vertical-pull day that permits upward rotation at the top, trains controlled depression/downward rotation, then restores lower-trap, cuff, and serratus work.",
    whyOrder:
      "Wall slide rehearses the upwardly rotated top position before pulldowns. The neutral- and one-arm pulldowns are the heavy vertical work; one high row adds a distinct path. Straight-arm pulldowns build loaded lat and scapular capacity after the main lifts. Prone Y and face-pull restore lower-trap, posterior-tilt, and cuff control; bear crawl returns the session to serratus-driven protraction and stability.",
    movements: [
      {
        id: "s6-wall-slide",
        slug: "wall-slide-liftoff",
        name: "Wall slide + lift-off",
        prescription: "2 × 8–12",
        kind: "control",
        exposures: 1,
        intent: "Rehearse upward rotation at the top position before vertical pulling.",
        cue: "Let the shoulder blades rotate upward instead of starting with them dragged down."
      },
      {
        id: "s6-neutral-pulldown",
        slug: "neutral-grip-pulldown",
        name: "Heavy neutral-grip pulldown",
        prescription: "4 × 6–10",
        kind: "lift",
        intent: "Anchor the day with heavy bilateral vertical pulling.",
        cue: "Allow a controlled reach at the top, then pull without turning the rep into a lean-back row."
      },
      {
        id: "s6-one-arm-pulldown",
        slug: "one-arm-pulldown",
        name: "One-arm cable pulldown",
        prescription: "3 × 8–12 each side",
        kind: "lift",
        intent: "Add unilateral vertical pulling and scapular motion.",
        cue: "Keep the torso quiet while the shoulder blade moves with the arm."
      },
      {
        id: "s6-high-row",
        slug: "lat-biased-high-row",
        name: "Lat-biased chest-supported high row",
        prescription: "3 × 8–12",
        kind: "lift",
        intent: "Provide one horizontal movement with a path distinct from the thickness day.",
        cue: "Stay supported and use the intended elbow path rather than chasing range by twisting."
      },
      {
        id: "s6-straight-arm",
        slug: "straight-arm-pulldown",
        name: "Straight-arm pulldown",
        prescription: "3 × 12–15",
        kind: "control",
        exposures: 1,
        intent: "Bridge bodybuilding and loaded scapular depression/downward-rotation capacity after the heavy pulls.",
        cue: "Use a stable ribcage and a smooth arc; avoid turning it into a torso-driven pressdown."
      },
      {
        id: "s6-rear-delt",
        slug: "rear-delt-fly",
        name: "Rear-delt cable fly / reverse pec deck",
        prescription: "3 × 15–25",
        kind: "lift",
        intent: "Add rear-delt and horizontal-abduction volume without another row.",
        cue: "Use a controlled range without aggressive shrugging or over-pinching."
      },
      {
        id: "s6-prone-y",
        slug: "prone-y",
        name: "Prone Y",
        prescription: "2 × 8–12",
        kind: "control",
        exposures: 1,
        intent: "Restore lower-trap and posterior-tilt control after lat-dominant pulling.",
        cue: "Keep it light and stop before shrugging replaces the intended motion."
      },
      {
        id: "s6-face-pull",
        slug: "face-pull-er",
        name: "Face-pull to external rotation",
        prescription: "2 × 12–15",
        kind: "control",
        exposures: 1,
        intent: "Restore cuff and scapular control after downward-rotation-heavy work.",
        cue: "Use a smooth, light pull-and-rotate motion."
      },
      {
        id: "s6-bear",
        slug: "bear-crawl-hold",
        name: "Bear-crawl hold",
        prescription: "2 sets",
        kind: "control",
        exposures: 1,
        intent: "Finish by returning to serratus-driven protraction and integrated stability.",
        cue: "Push the floor away, hover low, and keep the hips quiet."
      }
    ]
  }
];

export const exerciseIndex = Array.from(
  sessions
    .flatMap((session) =>
      session.movements.map((movement) => ({
        ...movement,
        sessionId: session.id,
        sessionTitle: session.title,
        sessionAccent: session.accent
      }))
    )
    .reduce((index, movement) => {
      const entry = index.get(movement.slug) ?? {
        slug: movement.slug,
        name: movement.name,
        kind: movement.kind,
        appearances: []
      };
      entry.appearances.push(movement);
      index.set(movement.slug, entry);
      return index;
    }, new Map())
    .values()
).sort((a, b) => a.name.localeCompare(b.name));

export function controlExposureCount(session) {
  return session.movements.reduce(
    (total, movement) => total + (movement.exposures ?? 0),
    0
  );
}
