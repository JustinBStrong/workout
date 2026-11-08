(() => {
  const STORAGE_KEY = "workout-selected-day";
  const VALID_DAYS = new Set(["all", "1", "2", "3", "4", "5", "6", "7"]);
  const main = document.querySelector("main");
  const filter = document.querySelector("[data-day-filter]");

  if (!main || !filter) return;

  const wrapRanges = (headings, className) =>
    headings.map((heading, index) => {
      const boundary = headings[index + 1] || null;
      const wrapper = document.createElement("section");
      wrapper.className = className;
      heading.before(wrapper);

      let node = heading;
      while (node && node !== boundary) {
        const next = node.nextSibling;
        wrapper.append(node);
        node = next;
      }

      return wrapper;
    });

  const topLevelHeadings = [...main.children].filter((element) => element.tagName === "H2");
  const programSections = wrapRanges(topLevelHeadings, "program-section");
  const sectionById = new Map(
    programSections.map((section) => [section.querySelector("h2")?.id, section])
  );

  const cheatSheet = sectionById.get("cheat-sheet");
  const movementCues = sectionById.get("exercise-notes");
  if (!cheatSheet || !movementCues) return;

  const dayHeadings = [...cheatSheet.children].filter((element) => element.tagName === "H3");
  const daySections = wrapRanges(dayHeadings, "workout-day").filter((section) => {
    const target = section.querySelector("h3 a")?.getAttribute("href") || "";
    const match = target.match(/^#session-([1-7])$/);
    if (!match) return false;

    const day = match[1];
    const headingLink = section.querySelector("h3 a");
    section.dataset.day = day;
    headingLink.dataset.dayChoice = day;
    headingLink.href = `?day=${day}#cheat-sheet`;
    return true;
  });

  const cueHeadings = [...movementCues.children].filter(
    (element) => element.tagName === "H3"
  );
  const cueGroups = wrapRanges(cueHeadings, "cue-group");

  cueGroups.forEach((group) => {
    const detailHeadings = [...group.children].filter((element) => element.tagName === "H4");
    group.cueDetails = wrapRanges(detailHeadings, "cue-detail");
    group.cueIds = new Set([...group.querySelectorAll("[id]")].map((element) => element.id));

    group.querySelectorAll("ol > li").forEach((item) => {
      item.classList.add("movement-cue");
      item.cueIds = new Set([...item.querySelectorAll("[id]")].map((element) => element.id));
    });

    group.cueDetails.forEach((detail) => {
      detail.cueIds = new Set(
        [...detail.querySelectorAll("[id]")].map((element) => element.id)
      );
    });
  });

  const fullProgramSections = ["session-details", "progression", "rationale"]
    .map((id) => sectionById.get(id))
    .filter(Boolean);
  const fullProgramOnly = [...document.querySelectorAll(".full-program-only")];
  const filteredOnly = [...document.querySelectorAll(".filtered-only")];

  const intersects = (left, right) => [...left].some((value) => right.has(value));

  const cueTargetsFor = (daySection) =>
    new Set(
      [...daySection.querySelectorAll('ol a[href^="#"]')]
        .map((link) => link.hash.slice(1))
        .filter(Boolean)
    );

  const filterCueGroups = (targets) => {
    cueGroups.forEach((group) => {
      const isQuickLookup = group.querySelector("h3")?.id === "quick-lookup";
      const isRelevant = !isQuickLookup && intersects(group.cueIds, targets);
      group.hidden = !isRelevant;
      group.toggleAttribute("data-filtered", isRelevant);

      if (!isRelevant) return;

      group.querySelectorAll(".movement-cue").forEach((item) => {
        item.hidden = !intersects(item.cueIds, targets);
      });

      group.cueDetails.forEach((detail) => {
        detail.hidden = !intersects(detail.cueIds, targets);
      });
    });
  };

  const showAllCueGroups = () => {
    cueGroups.forEach((group) => {
      group.hidden = false;
      group.removeAttribute("data-filtered");
      group.querySelectorAll(".movement-cue, .cue-detail").forEach((element) => {
        element.hidden = false;
      });
    });
  };

  const readStoredDay = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return VALID_DAYS.has(stored) ? stored : null;
    } catch {
      return null;
    }
  };

  const storeDay = (day) => {
    try {
      localStorage.setItem(STORAGE_KEY, day);
    } catch {
      // Filtering still works when storage is unavailable.
    }
  };

  const dayFromLocation = ({ allowStored = false } = {}) => {
    const requested = new URL(location.href).searchParams.get("day");
    if (VALID_DAYS.has(requested)) return requested;
    if (location.hash) return "all";
    return allowStored ? readStoredDay() || "all" : "all";
  };

  const updateLocation = (day, { replace = false } = {}) => {
    const url = new URL(location.href);
    if (day === "all") {
      url.searchParams.delete("day");
      url.hash = "";
    } else {
      url.searchParams.set("day", day);
      url.hash = "cheat-sheet";
    }
    history[replace ? "replaceState" : "pushState"]({ day }, "", url);
  };

  const applyDay = (day, { persist = true } = {}) => {
    const selectedDay = daySections.find((section) => section.dataset.day === day);
    const isFiltered = Boolean(selectedDay);

    document.documentElement.dataset.day = isFiltered ? day : "all";
    document.title = isFiltered
      ? `${selectedDay.querySelector("h3")?.textContent.trim()} · Workout`
      : "Workout";

    daySections.forEach((section) => {
      section.hidden = isFiltered && section !== selectedDay;
    });
    fullProgramSections.forEach((section) => {
      section.hidden = isFiltered;
    });
    fullProgramOnly.forEach((element) => {
      element.hidden = isFiltered;
    });
    filteredOnly.forEach((element) => {
      element.hidden = !isFiltered;
    });

    if (isFiltered) {
      filterCueGroups(cueTargetsFor(selectedDay));
    } else {
      showAllCueGroups();
    }

    document.querySelectorAll("[data-day-choice]").forEach((link) => {
      const current = link.dataset.dayChoice === (isFiltered ? day : "all");
      link.toggleAttribute("aria-current", current);
      if (current) link.setAttribute("aria-current", "page");
    });

    if (persist) storeDay(isFiltered ? day : "all");
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-day-choice]");
    if (!link || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const day = link.dataset.dayChoice;
    if (!VALID_DAYS.has(day)) return;

    event.preventDefault();
    updateLocation(day);
    applyDay(day);
    document.getElementById("cheat-sheet")?.scrollIntoView();
  });

  addEventListener("popstate", () => {
    applyDay(dayFromLocation(), { persist: false });
  });

  const initialUrl = new URL(location.href);
  const requestedDay = initialUrl.searchParams.get("day");
  const initialDay = dayFromLocation({ allowStored: true });
  if (!VALID_DAYS.has(requestedDay) && initialDay !== "all" && !location.hash) {
    updateLocation(initialDay, { replace: true });
  }
  applyDay(initialDay, { persist: VALID_DAYS.has(requestedDay) });

  if (location.hash && location.hash !== "#cheat-sheet") {
    const targetId = decodeURIComponent(location.hash.slice(1));
    requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
  }
})();
