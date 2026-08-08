/*
 * Reads the actual tracker markdown files (LLD-Prep/, DSA-Prep/) and renders
 * live progress. Source of truth is always the .md files — check a box,
 * commit, push, refresh. No separate data store to keep in sync.
 */

const FILES = {
  lldTracker: "LLD-Prep/00_PROGRESS_TRACKER.md",
  lldCurriculum: "LLD-Prep/01_CURRICULUM.md",
  lldNotesManifest: "LLD-Prep/notes/manifest.json",
  lldNotesDir: "LLD-Prep/notes/",

  dsaTracker: "DSA-Prep/00_PROGRESS_TRACKER.md",
  dsaCurriculum: "DSA-Prep/01_CURRICULUM.md",
  dsaQuestions: "DSA-Prep/03_QUESTION_TRACKER.md",
  dsaCheatsheet: "DSA-Prep/04_PATTERN_CHEATSHEET.md",
  dsaRevision: "DSA-Prep/05_REVISION_QUEUE.md",
  dsaJavaSheet: "DSA-Prep/notes/00_java_toolkit.md",
  dsaNotesManifest: "DSA-Prep/notes/manifest.json",
  dsaNotesDir: "DSA-Prep/notes/",
};

const STATUS_WEIGHT = { " ": 0, "x": 1, "~": 0.5, "★": 1 };
const STATUS_ICON = { " ": "○", x: "✓", "~": "◐", "★": "★" };
const STATUS_CLASS = { " ": "todo", x: "done", "~": "partial", "★": "mastered" };

async function fetchText(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Could not load ${path} (${res.status})`);
  const text = await res.text();
  // Git on Windows checks these files out as CRLF; every parser below assumes
  // bare \n, so normalize once here rather than defend it in every regex.
  return text.replace(/\r\n/g, "\n");
}

async function fetchJson(path, fallback = []) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

/* ---------- generic checklist parser (00_PROGRESS_TRACKER.md style) ---------- */

function parsePhaseChecklist(md) {
  const lines = md.split("\n");
  const phases = [];
  let current = null;

  for (const line of lines) {
    const heading = line.match(/^##\s+(Phase\s*\d+.*)$/);
    if (heading) {
      current = { name: heading[1].trim(), items: [] };
      phases.push(current);
      continue;
    }
    // stop grouping into a phase once we hit a non-phase ## heading
    if (/^##\s+(?!Phase)/.test(line)) {
      current = null;
      continue;
    }
    const item = line.match(/^(\s*)-\s\[([ x~★])\]\s+(.+?)$/);
    if (item && current) {
      current.items.push({
        indent: item[1].length,
        status: item[2],
        text: stripMd(item[3]),
      });
    }
  }
  return phases.filter((p) => p.items.length > 0);
}

function stripMd(s) {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`/g, "")
    .replace(/\*+/g, "")
    .trim();
}

function summarize(items) {
  const total = items.length;
  const weighted = items.reduce((sum, it) => sum + (STATUS_WEIGHT[it.status] ?? 0), 0);
  const done = items.filter((it) => it.status === "x" || it.status === "★").length;
  return { total, done, weighted, pct: total ? Math.round((weighted / total) * 100) : 0 };
}

/* ---------- current status block ---------- */

function parseCurrentStatus(md) {
  const get = (label) => {
    const re = new RegExp(`\\*\\*${label}:?\\*\\*\\s*(.+)`);
    const m = md.match(re);
    return m ? stripMd(m[1].trim()) : null;
  };
  return {
    phase: get("Phase"),
    week: get("Week"),
    lastSession: get("Last session"),
    nextUp: get("Next up"),
    questionsSolved: get("Questions solved"),
  };
}

/* ---------- session log ---------- */

// Session Log columns are: Date | Phase | Hours | Covered | [Questions] | Notes/Follow-up
// (the DSA log has an extra Questions column the LLD log doesn't). We locate
// Phase/Hours/Notes by position from the ends since the middle is variable width.
function parseSessionLog(md) {
  const idx = md.indexOf("## Session Log");
  if (idx === -1) return [];
  const end = md.indexOf("\n## ", idx + 1);
  const section = md.slice(idx, end === -1 ? undefined : end);
  const rows = [...section.matchAll(/^\|\s*(\d{4}-\d{2}-\d{2})\s*\|(.+)\|$/gm)];
  return rows
    .map((r) => {
      const rest = r[2].split("|").map((c) => c.trim());
      // rest = [Phase, Hours, Covered, ...maybe Questions..., Notes/Follow-up]
      if (rest.length < 4) return null;
      const [phase, hours, ...tail] = rest;
      const followup = tail[tail.length - 1];
      const covered = tail.slice(0, tail.length - 1).join(" — ");
      const hoursNum = parseFloat(hours);
      return {
        date: r[1],
        phase: stripMd(phase),
        hours: isNaN(hoursNum) ? null : hoursNum,
        hoursLabel: stripMd(hours),
        covered: stripMd(covered),
        followup: stripMd(followup),
      };
    })
    .filter(Boolean)
    .filter((r) => !/^-+$/.test(r.covered));
}

function sumHours(log) {
  return log.reduce((sum, r) => sum + (r.hours ?? 0), 0);
}

/* ---------- DSA question tracker (table rows) ---------- */

function parseQuestionTracker(md) {
  const lines = md.split("\n");
  const topics = [];
  let current = null;

  const topicHeadRe = /^##\s+(T\d{2})\s*[—-]\s*(.+?)\s*\(\d+\)/;
  const rowRe = /^\|\s*\d+\s*\|\s*\[([ x~★])\]\s*\|\s*\[([^\]]+)\]\(([^)]*)\)\s*\|\s*(E|M|H)\s*\|\s*(C|S)\s*\|\s*(.*?)\s*\|\s*([^|]+?)\s*\|\s*$/;

  for (const line of lines) {
    const h = line.match(topicHeadRe);
    if (h) {
      current = { code: h[1], name: h[2].trim(), rows: [] };
      topics.push(current);
      continue;
    }
    const r = line.match(rowRe);
    if (r && current) {
      current.rows.push({
        status: r[1],
        title: r[2],
        url: r[3],
        diff: r[4],
        tier: r[5],
        note: stripMd(r[6]),
      });
    }
  }
  return topics.filter((t) => t.rows.length > 0);
}

function aggregateQuestions(topics) {
  const all = topics.flatMap((t) => t.rows);
  const total = all.length;
  const done = all.filter((r) => r.status === "x" || r.status === "★").length;
  const partial = all.filter((r) => r.status === "~").length;
  const byDiff = { E: { done: 0, total: 0 }, M: { done: 0, total: 0 }, H: { done: 0, total: 0 } };
  const byTier = { C: { done: 0, total: 0 }, S: { done: 0, total: 0 } };
  for (const r of all) {
    byDiff[r.diff].total++;
    byTier[r.tier].total++;
    if (r.status === "x" || r.status === "★") {
      byDiff[r.diff].done++;
      byTier[r.tier].done++;
    }
  }
  return { total, done, partial, byDiff, byTier };
}

/* ---------- revision queue ---------- */

function parseRevisionQueue(md) {
  const idx = md.indexOf("## Active queue");
  if (idx === -1) return [];
  const end = md.indexOf("## Graduated", idx);
  const section = md.slice(idx, end === -1 ? undefined : end);
  const rows = [...section.matchAll(/^\|(.+)\|$/gm)].slice(2); // skip header + separator
  return rows
    .map((r) => r[1].split("|").map((c) => c.trim()))
    .filter((cells) => cells.length >= 3 && cells[0] && !cells[0].startsWith("_example"))
    .map((cells) => ({ problem: stripMd(cells[0]), topic: cells[1], reason: stripMd(cells[2]) }));
}

/* ---------- markdown -> HTML (small hand-rolled renderer, no dependency) ----------
 * Covers exactly what our own docs use: headings, bold/italic/inline code,
 * links, fenced code blocks, tables, ordered/unordered lists (1 level of
 * nesting), horizontal rules, paragraphs. Not a general CommonMark parser.
 */

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// A relative markdown link like `[x](00_TRACKER.md)` or `[x](../foo.md)` is
// written relative to the *source file's own folder*. Once its HTML lands in
// index.html, an unresolved relative href would instead resolve against the
// page's own URL — wrong file, and silently wrong if the page happens to be
// served from a subpath (e.g. GitHub Pages project sites). Resolve eagerly
// against the source file's directory so the emitted href is always correct.
function resolveUrl(baseDir, url) {
  if (/^([a-z][a-z0-9+.-]*:)|^#/i.test(url)) return url; // absolute URL, mailto:, or in-page anchor
  try {
    return new URL(baseDir + url, document.baseURI).href;
  } catch {
    return url;
  }
}

function inlineMd(raw, baseDir = "") {
  let s = raw;
  // Whole-paragraph underscore-italic (our docs only ever use `_...text..._`
  // wrapping an entire line, never mid-sentence). Handled as a special case
  // rather than a generic substring regex: a naive `_(.+?)_` match latches
  // onto the *first* inner underscore it finds — which breaks the moment the
  // wrapped text contains its own underscore, e.g. a filename like
  // `04_PATTERN_CHEATSHEET.md`, closing the <em> after "04" instead of at
  // the real end of the sentence.
  let wrapEm = false;
  const wholeWrap = s.match(/^_(.+)_$/s);
  if (wholeWrap) {
    s = wholeWrap[1];
    wrapEm = true;
  }

  s = escapeHtml(s);
  s = s.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  s = s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, t, u) => `<a href="${resolveUrl(baseDir, u)}" target="_blank" rel="noopener">${t}</a>`
  );
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return wrapEm ? `<em>${s}</em>` : s;
}

function renderList(items, ordered, baseDir) {
  const tag = ordered ? "ol" : "ul";
  let html = "";
  const stack = [];
  for (const it of items) {
    while (stack.length && it.indent < stack[stack.length - 1].indent) {
      html += `</li></${stack.pop().tag}>`;
    }
    if (!stack.length || it.indent > stack[stack.length - 1].indent) {
      html += `<${tag} class="md-list">`;
      stack.push({ indent: it.indent, tag });
    } else {
      html += `</li>`;
    }
    html += `<li>${inlineMd(it.text, baseDir)}`;
  }
  while (stack.length) html += `</li></${stack.pop().tag}>`;
  return html;
}

function renderMarkdown(md, baseDir = "") {
  const lines = md.split("\n");
  let html = "";
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    let m;
    if ((m = line.match(/^```(\w*)\s*$/))) {
      const codeLines = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      html += `<pre class="md-code"><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`;
      continue;
    }

    if ((m = line.match(/^(#{1,6})\s+(.*)$/))) {
      const level = m[1].length;
      html += `<h${level} class="md-h md-h${level}">${inlineMd(m[2], baseDir)}</h${level}>`;
      i++;
      continue;
    }

    if (/^-{3,}\s*$/.test(line)) {
      html += `<hr class="md-hr">`;
      i++;
      continue;
    }

    if (/^\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\|?[\s:-]+\|[\s:|-]*$/.test(lines[i + 1])) {
      const headerCells = line.split("|").slice(1, -1).map((c) => c.trim());
      i += 2;
      const bodyRows = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) {
        bodyRows.push(lines[i].split("|").slice(1, -1).map((c) => c.trim()));
        i++;
      }
      html +=
        `<div class="md-table-wrap"><table class="md-table"><thead><tr>` +
        headerCells.map((c) => `<th>${inlineMd(c, baseDir)}</th>`).join("") +
        `</tr></thead><tbody>` +
        bodyRows.map((r) => `<tr>${r.map((c) => `<td>${inlineMd(c, baseDir)}</td>`).join("")}</tr>`).join("") +
        `</tbody></table></div>`;
      continue;
    }

    if (/^(\s*)-\s+(.*)$/.test(line)) {
      const items = [];
      while (i < lines.length && /^(\s*)-\s+(.*)$/.test(lines[i])) {
        const mm = lines[i].match(/^(\s*)-\s+(.*)$/);
        items.push({ indent: mm[1].length, text: mm[2] });
        i++;
      }
      html += renderList(items, false, baseDir);
      continue;
    }

    if (/^(\s*)\d+\.\s+(.*)$/.test(line)) {
      const items = [];
      while (i < lines.length && /^(\s*)\d+\.\s+(.*)$/.test(lines[i])) {
        const mm = lines[i].match(/^(\s*)\d+\.\s+(.*)$/);
        items.push({ indent: mm[1].length, text: mm[2] });
        i++;
      }
      html += renderList(items, true, baseDir);
      continue;
    }

    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^```/.test(lines[i]) &&
      !/^#{1,6}\s/.test(lines[i]) &&
      !/^\|.*\|\s*$/.test(lines[i]) &&
      !/^(\s*)-\s+/.test(lines[i]) &&
      !/^(\s*)\d+\.\s+/.test(lines[i]) &&
      !/^-{3,}\s*$/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      html += `<p class="md-p">${inlineMd(paraLines.join(" "), baseDir)}</p>`;
    } else {
      i++;
    }
  }
  return html;
}

/* ---------- rendering helpers ---------- */

function animateNumber(el, to, duration = 900) {
  const start = performance.now();
  const from = 0;
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function barRow(name, done, total, pct, extraClass = "") {
  return `
    <div class="bar-row">
      <div class="bar-row-top">
        <span class="bar-row-name">${name}</span>
        <span class="bar-row-frac">${done}/${total}</span>
      </div>
      <div class="bar-track"><div class="bar-fill ${extraClass}" data-final-width="${pct}"></div></div>
    </div>`;
}

// Same as barRow, but wrapped in <details> with the actual checklist items
// underneath — this is "show me exactly what's in this phase," not just a %.
function expandablePhaseRow(name, items) {
  const s = summarize(items);
  const rows = items
    .map(
      (it) => `<div class="chk-row chk-${STATUS_CLASS[it.status]}" style="padding-left:${it.indent > 0 ? 18 : 0}px">
        <span class="chk-icon">${STATUS_ICON[it.status]}</span><span class="chk-text">${it.text}</span>
      </div>`
    )
    .join("");
  return `<details class="bar-row expandable">
    <summary>
      <div class="bar-row-top">
        <span class="bar-row-name">${name}</span>
        <span class="bar-row-frac">${s.done}/${s.total} <span class="chev">▸</span></span>
      </div>
      <div class="bar-track"><div class="bar-fill" data-final-width="${s.pct}"></div></div>
    </summary>
    <div class="chk-list">${rows}</div>
  </details>`;
}

// Same idea for a DSA topic: aggregate bar as <summary>, full question list inside.
function expandableTopicRow(topic) {
  const total = topic.rows.length;
  const done = topic.rows.filter((r) => r.status === "x" || r.status === "★").length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const rows = topic.rows
    .map((r, idx) => {
      const link = r.url ? `<a href="${r.url}" target="_blank" rel="noopener">${r.title}</a>` : r.title;
      return `<div class="q-row q-${STATUS_CLASS[r.status]}">
        <span class="chk-icon">${STATUS_ICON[r.status]}</span>
        <span class="q-num">${idx + 1}.</span>
        <span class="q-title">${link}</span>
        <span class="q-diff q-diff-${r.diff}">${r.diff}</span>
        <span class="q-tier">${r.tier}</span>
      </div>`;
    })
    .join("");
  return `<details class="bar-row expandable">
    <summary>
      <div class="bar-row-top">
        <span class="bar-row-name">${topic.code} · ${topic.name}</span>
        <span class="bar-row-frac">${done}/${total} <span class="chev">▸</span></span>
      </div>
      <div class="bar-track"><div class="bar-fill" data-final-width="${pct}"></div></div>
    </summary>
    <div class="q-list">${rows}</div>
  </details>`;
}

function statCard(num, label) {
  // Correct value is in the DOM from the first paint — data-final only drives
  // the optional count-up polish, so a reveal animation that never fires
  // (backgrounded tab, reduced motion, IO quirks) can never show wrong data.
  return `<div class="stat-card"><div class="stat-num" data-final="${num}">${num}</div><div class="stat-lbl">${label}</div></div>`;
}

function revealElement(el) {
  if (el.dataset.revealed) return;
  el.dataset.revealed = "1";
  el.classList.add("in");

  const numEl = el.querySelector("[data-final]");
  if (numEl) {
    numEl.textContent = "0";
    animateNumber(numEl, parseInt(numEl.dataset.final, 10));
  }
  const fillEl = el.querySelector("[data-final-width]");
  if (fillEl) requestAnimationFrame(() => (fillEl.style.width = fillEl.dataset.finalWidth + "%"));

  const ringEl = el.matches("[data-final-offset]") ? el : el.querySelector("[data-final-offset]");
  if (ringEl) requestAnimationFrame(() => (ringEl.style.strokeDashoffset = ringEl.dataset.finalOffset));
}

function revealOnScroll(selector) {
  const els = document.querySelectorAll(selector);

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            revealElement(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
  }

  // Safety net: whatever IntersectionObserver missed (never scrolled to,
  // observer unsupported/throttled, tab backgrounded) still reaches its
  // correct final state — animation is cosmetic, never load-bearing.
  window.setTimeout(() => els.forEach(revealElement), 1400);
}

/* ---------- main ---------- */

async function main() {
  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", () => {
    const root = document.documentElement;
    const cur = root.getAttribute("data-theme");
    const next = cur === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

  try {
    const [lldMd, dsaMd, dsaQMd, dsaRevMd, lldCurriculumMd, dsaCurriculumMd, dsaCheatsheetMd, dsaJavaSheetMd] =
      await Promise.all([
        fetchText(FILES.lldTracker),
        fetchText(FILES.dsaTracker),
        fetchText(FILES.dsaQuestions),
        fetchText(FILES.dsaRevision),
        fetchText(FILES.lldCurriculum),
        fetchText(FILES.dsaCurriculum),
        fetchText(FILES.dsaCheatsheet),
        fetchText(FILES.dsaJavaSheet),
      ]);

    const lldHours = renderLLD(lldMd);
    const dsaHours = renderDSA(dsaMd, dsaQMd, dsaRevMd);

    document.getElementById("lld-curriculum").innerHTML = renderMarkdown(lldCurriculumMd, "LLD-Prep/");
    document.getElementById("dsa-curriculum").innerHTML = renderMarkdown(dsaCurriculumMd, "DSA-Prep/");
    document.getElementById("cheatsheet-content").innerHTML = renderMarkdown(dsaCheatsheetMd, "DSA-Prep/");
    document.getElementById("javasheet-content").innerHTML = renderMarkdown(dsaJavaSheetMd, "DSA-Prep/notes/");

    await renderNotes("lld-notes", FILES.lldNotesManifest, FILES.lldNotesDir);
    await renderNotes("dsa-notes", FILES.dsaNotesManifest, FILES.dsaNotesDir);

    const totalHoursEl = document.getElementById("hero-hours");
    if (totalHoursEl) {
      const total = Math.round((lldHours + dsaHours) * 10) / 10;
      totalHoursEl.textContent = total > 0 ? `${total}h invested so far` : "tracking starts next session";
    }

    revealOnScroll(".ring-card, .stat-card, .bar-row, .tl-item");
  } catch (err) {
    document.getElementById("global-error").innerHTML = `<div class="error-note">
      Couldn't load the tracker files (${err.message}). If you're viewing this from
      a local <code>file://</code> path, browsers block that fetch — run a tiny local
      server instead (e.g. <code>python -m http.server</code> from this folder) or view
      the live GitHub Pages URL.</div>`;
    document.getElementById("loading-note")?.remove();
  }
}

async function renderNotes(containerId, manifestPath, dir) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const manifest = await fetchJson(manifestPath, []);
  if (!manifest.length) {
    container.innerHTML = `<div class="empty-note">No notes published yet — they'll show up here as soon as they're written.</div>`;
    return;
  }
  const sections = await Promise.all(
    manifest.map(async (n) => {
      try {
        const md = await fetchText(dir + n.file);
        const handwrittenLink = n.handwritten
          ? `<a href="${dir}${n.handwritten}" target="_blank" rel="noopener" class="note-hw-link">handwritten version ↗</a>`
          : "";
        return `<details class="note-block">
          <summary>${n.title} ${handwrittenLink}</summary>
          <div class="md-content">${renderMarkdown(md, dir)}</div>
        </details>`;
      } catch {
        return "";
      }
    })
  );
  container.innerHTML = sections.join("");
}

function renderLLD(md) {
  const phases = parsePhaseChecklist(md);
  const status = parseCurrentStatus(md);
  const log = parseSessionLog(md).reverse();

  const overallItems = phases.flatMap((p) => p.items);
  const overall = summarize(overallItems);

  document.getElementById("lld-ring-pct").textContent = overall.pct + "%";
  document.getElementById("lld-ring-sub").textContent = `${overall.done}/${overall.total} items`;
  const ringEl = document.querySelector("#lld-ring-svg .ring-fill");
  const c = 2 * Math.PI * 34;
  ringEl.setAttribute("stroke-dasharray", c);
  ringEl.setAttribute("data-final-offset", c - (overall.pct / 100) * c);
  ringEl.setAttribute("stroke-dashoffset", c);

  // status card
  document.getElementById("lld-status").innerHTML = `
    <div class="status-item"><div class="k">Phase</div><div class="v">${status.phase ?? "—"}</div></div>
    <div class="status-item"><div class="k">Last session</div><div class="v">${status.lastSession ?? "—"}</div></div>
    <div class="status-item"><div class="k">Next up</div><div class="v">${status.nextUp ?? "—"}</div></div>
  `;

  // stat cards
  const lldHours = sumHours(log);
  document.getElementById("lld-stats").innerHTML = [
    statCard(overall.done, "Items done"),
    statCard(overall.total, "Total items"),
    statCard(phases.length, "Phases"),
    statCard(log.length, "Sessions logged"),
    statCard(Math.round(lldHours * 10) / 10, "Hours invested"),
  ].join("");

  // phase bars — expandable, showing every pattern/problem in the phase
  document.getElementById("lld-phase-bars").innerHTML = phases.map((p) => expandablePhaseRow(p.name, p.items)).join("");

  // timeline
  document.getElementById("lld-timeline").innerHTML = log.length
    ? log.slice(0, 6).map(renderTimelineItem).join("")
    : `<div class="empty-note">No sessions logged yet.</div>`;

  return lldHours;
}

function renderTimelineItem(r) {
  const meta = [r.phase, r.hoursLabel].filter((v) => v && v !== "—").join(" · ");
  return `<div class="tl-item">
    <div class="tl-date">${r.date}${meta ? ` <span class="tl-meta">— ${meta}</span>` : ""}</div>
    <div class="tl-body">${r.covered}</div>
    ${r.followup ? `<div class="tl-follow">${r.followup}</div>` : ""}
  </div>`;
}

function renderDSA(md, questionsMd, revisionMd) {
  const phases = parsePhaseChecklist(md);
  const status = parseCurrentStatus(md);
  const log = parseSessionLog(md).reverse();
  const topics = parseQuestionTracker(questionsMd);
  const q = aggregateQuestions(topics);
  const revQueue = parseRevisionQueue(revisionMd);

  const overallItems = phases.flatMap((p) => p.items);
  const overallPhase = summarize(overallItems);
  // primary ring uses question completion (the real signal for DSA), phase checklist is secondary
  const qPct = q.total ? Math.round((q.done / q.total) * 100) : 0;

  document.getElementById("dsa-ring-pct").textContent = qPct + "%";
  document.getElementById("dsa-ring-sub").textContent = `${q.done}/${q.total} questions`;
  const ringEl = document.querySelector("#dsa-ring-svg .ring-fill");
  const c = 2 * Math.PI * 34;
  ringEl.setAttribute("stroke-dasharray", c);
  ringEl.setAttribute("data-final-offset", c - (qPct / 100) * c);
  ringEl.setAttribute("stroke-dashoffset", c);

  document.getElementById("dsa-status").innerHTML = `
    <div class="status-item"><div class="k">Phase</div><div class="v">${status.phase ?? "—"}</div></div>
    <div class="status-item"><div class="k">Week</div><div class="v">${status.week ?? "—"}</div></div>
    <div class="status-item"><div class="k">Last session</div><div class="v">${status.lastSession ?? "—"}</div></div>
    <div class="status-item"><div class="k">Next up</div><div class="v">${status.nextUp ?? "—"}</div></div>
  `;

  const dsaHours = sumHours(log);
  document.getElementById("dsa-stats").innerHTML = [
    statCard(q.done, "Questions solved"),
    statCard(q.total, "Total questions"),
    statCard(q.partial, "Needs revisit"),
    statCard(topics.length, "Topics"),
    statCard(overallPhase.done, "Checklist items done"),
    statCard(revQueue.length, "In revision queue"),
    statCard(Math.round(dsaHours * 10) / 10, "Hours invested"),
  ].join("");

  document.getElementById("dsa-pills").innerHTML = `
    <div class="pill"><span class="dot" style="background:var(--accent-2)"></span>Easy <b>${q.byDiff.E.done}/${q.byDiff.E.total}</b></div>
    <div class="pill"><span class="dot" style="background:var(--accent)"></span>Medium <b>${q.byDiff.M.done}/${q.byDiff.M.total}</b></div>
    <div class="pill"><span class="dot" style="background:var(--accent-warn)"></span>Hard <b>${q.byDiff.H.done}/${q.byDiff.H.total}</b></div>
    <div class="pill">CORE <b>${q.byTier.C.done}/${q.byTier.C.total}</b></div>
    <div class="pill">STRETCH <b>${q.byTier.S.done}/${q.byTier.S.total}</b></div>
  `;

  // topic bars — expandable, showing every one of the 476 questions
  document.getElementById("dsa-topic-bars").innerHTML = topics.map(expandableTopicRow).join("");

  document.getElementById("dsa-phase-bars").innerHTML = phases.map((p) => expandablePhaseRow(p.name, p.items)).join("");

  document.getElementById("dsa-timeline").innerHTML = log.length
    ? log.slice(0, 6).map(renderTimelineItem).join("")
    : `<div class="empty-note">No sessions logged yet.</div>`;

  const revBody = document.getElementById("dsa-revision-body");
  if (revQueue.length) {
    revBody.innerHTML = revQueue
      .map((r) => `<tr><td>${r.problem}</td><td>${r.topic}</td><td>${r.reason}</td></tr>`)
      .join("");
    document.getElementById("dsa-revision-empty").style.display = "none";
  } else {
    document.getElementById("dsa-revision-table").style.display = "none";
  }

  return dsaHours;
}

document.addEventListener("DOMContentLoaded", main);
