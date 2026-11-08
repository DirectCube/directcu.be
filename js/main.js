(() => {
  "use strict";

  const S = window.SITE;
  if (!S) return;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const slot = (name) => $(`[data-slot="${name}"]`);
  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ESC[c]);
  const rich = (v) => esc(v).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const bind = (key, text) => {
    $$(`[data-bind="${key}"]`).forEach((el) => {
      el.textContent = text;
    });
  };
  const isExternal = (url) => /^https?:\/\//i.test(url);
  const linkAttrs = (url) =>
    `href="${esc(url)}"${isExternal(url) ? ' target="_blank" rel="noopener noreferrer"' : ""}`;

  const cubeSvg = (c = {}) => `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <polygon points="16,2 30,9 16,16 2,9" fill="${esc(c.top || "#d8d8d8")}"/>
      <polygon points="2,9 16,16 16,30 2,23" fill="${esc(c.left || "#6f6f6f")}"/>
      <polygon points="30,9 16,16 16,30 30,23" fill="${esc(c.right || "#585858")}"/>
    </svg>`;

  const RESULT_ICONS = {
    crown: `
      <svg width="40" height="40" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="5" y="10" width="4" height="10" fill="#e0b030"/>
        <rect x="14" y="7" width="4" height="13" fill="#e0b030"/>
        <rect x="23" y="10" width="4" height="10" fill="#e0b030"/>
        <rect x="5" y="16" width="22" height="11" fill="#e0b030"/>
        <rect x="5" y="25" width="22" height="2" fill="#a87a1c"/>
        <rect x="8" y="20" width="3" height="3" fill="#3cc8d2"/>
        <rect x="14" y="20" width="4" height="3" fill="#d23c3c"/>
        <rect x="21" y="20" width="3" height="3" fill="#3cc8d2"/>
      </svg>`,
    clapper: `
      <svg width="40" height="40" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="6" width="24" height="5" fill="#f2f2f2"/>
        <rect x="8" y="6" width="4" height="5" fill="#2b2b2b"/>
        <rect x="16" y="6" width="4" height="5" fill="#2b2b2b"/>
        <rect x="24" y="6" width="4" height="5" fill="#2b2b2b"/>
        <rect x="4" y="12" width="24" height="16" fill="#2b2b2b"/>
        <rect x="8" y="17" width="16" height="2" fill="#f2f2f2"/>
        <rect x="8" y="22" width="10" height="2" fill="#f2f2f2"/>
      </svg>`,
    bug: `
      <svg width="40" height="40" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="12" y="5" width="8" height="6" fill="#2b2b2b"/>
        <rect x="10" y="10" width="12" height="16" fill="#3fa34d"/>
        <rect x="15" y="10" width="2" height="16" fill="#2b7a36"/>
        <rect x="6" y="12" width="4" height="2" fill="#2b2b2b"/>
        <rect x="22" y="12" width="4" height="2" fill="#2b2b2b"/>
        <rect x="6" y="18" width="4" height="2" fill="#2b2b2b"/>
        <rect x="22" y="18" width="4" height="2" fill="#2b2b2b"/>
        <rect x="6" y="24" width="4" height="2" fill="#2b2b2b"/>
        <rect x="22" y="24" width="4" height="2" fill="#2b2b2b"/>
      </svg>`,
    shield: `
      <svg width="40" height="40" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="7" y="4" width="18" height="14" fill="#3f6fd6"/>
        <rect x="9" y="18" width="14" height="4" fill="#3f6fd6"/>
        <rect x="11" y="22" width="10" height="3" fill="#3f6fd6"/>
        <rect x="13" y="25" width="6" height="3" fill="#3f6fd6"/>
        <rect x="15" y="6" width="2" height="19" fill="#f2f2f2"/>
        <rect x="9" y="10" width="14" height="2" fill="#f2f2f2"/>
      </svg>`,
    job: `
      <svg width="40" height="40" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="11" y="6" width="10" height="2" fill="#4a2c10"/>
        <rect x="11" y="6" width="2" height="5" fill="#4a2c10"/>
        <rect x="19" y="6" width="2" height="5" fill="#4a2c10"/>
        <rect x="4" y="11" width="24" height="16" fill="#7a4a1f"/>
        <rect x="4" y="17" width="24" height="2" fill="#4a2c10"/>
        <rect x="14" y="16" width="4" height="4" fill="#e0c050"/>
      </svg>`,
  };

  const ARROW = `
    <svg class="craft-arrow" width="40" height="32" viewBox="0 0 40 32" aria-hidden="true">
      <rect x="0" y="12" width="26" height="8" fill="#5a5a5a"/>
      <rect x="26" y="4" width="4" height="24" fill="#5a5a5a"/>
      <rect x="30" y="8" width="4" height="16" fill="#5a5a5a"/>
      <rect x="34" y="12" width="4" height="8" fill="#5a5a5a"/>
    </svg>`;

  bind("handle", S.handle);
  bind("tagline", S.tagline || S.role);
  bind("name", S.name);
  $$('[data-bind="about"]').forEach((el) => {
    el.innerHTML = rich(S.about);
  });
  if (S.level) bind("level", `LVL ${S.level}`);
  else $$('[data-bind="level"]').forEach((el) => el.remove());
  bind("footer", `© ${new Date().getFullYear()} ${S.name} | Crafted by hand.`);

  const avatar = slot("avatar");
  if (S.avatar) {
    avatar.classList.add("has-image");
    avatar.innerHTML = `<img src="${esc(S.avatar)}" alt="Profile picture of ${esc(S.name)}" width="200" height="200">`;
  } else {
    avatar.textContent = "[Your avatar or photo]";
  }

  slot("stats").innerHTML = (S.stats || [])
    .map((s) => `<div class="stat"><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`)
    .join("");

  slot("skills").innerHTML = (S.skills || [])
    .map((s) => {
      const label = s.detail ? `${s.name}: ${s.detail}` : s.name;
      const dim = s.detail ? `<span class="tip-dim">${esc(s.detail)}</span>` : "";
      return `
        <li>
          <button type="button" class="slot has-tip" aria-label="${esc(label)}">
            <span aria-hidden="true">${esc(s.glyph)}</span>
            <span class="tip" aria-hidden="true"><strong>${esc(s.name)}</strong>${dim}</span>
          </button>
        </li>`;
    })
    .join("");

  const skillName = new Map((S.skills || []).map((s) => [s.glyph, s.name]));

  slot("recipes").innerHTML = (S.experience || [])
    .map((job) => {
      const cells = Array.from({ length: 9 }, (_, i) => (job.ingredients || [])[i] || "");
      const used = cells.filter(Boolean).map((g) => skillName.get(g) || g);
      const craftCells = cells
        .map((g) => `<div class="slot">${g ? esc(g) : ""}</div>`)
        .join("");
      const bullets = (job.bullets || []).map((b) => `<li>${rich(b)}</li>`).join("");
      const icon = RESULT_ICONS[job.icon] || RESULT_ICONS.job;
      const meta = [job.org, job.dates].filter(Boolean).map(esc).join(" | ");
      return `
        <li class="recipe">
          <div class="craft" aria-hidden="true">
            <div class="craft-grid">${craftCells}</div>
            ${ARROW}
            <div class="slot craft-result">${icon}</div>
          </div>
          <div class="recipe-body">
            <h3 class="recipe-title">${esc(job.title)}</h3>
            <p class="recipe-meta">${meta}</p>
            ${bullets ? `<ul>${bullets}</ul>` : ""}
            ${used.length ? `<p class="sr-only">Skills used: ${esc(used.join(", "))}</p>` : ""}
          </div>
        </li>`;
    })
    .join("");

  const projects = S.projects || [];
  const grid = slot("chest-grid");
  const inspect = slot("inspect");
  const totalSlots = Math.max(18, Math.ceil(projects.length / 18) * 18);
  let selected = 0;

  grid.innerHTML =
    projects
      .map((p, i) => {
        const icon = p.icon ? `<img src="${esc(p.icon)}" alt="">` : cubeSvg(p.cube);
        return `
          <button type="button" class="slot has-tip" data-index="${i}"
            aria-label="${esc(p.name)}" aria-controls="inspect" aria-pressed="false" tabindex="-1">
            ${icon}
            <span class="tip" aria-hidden="true">${esc(p.name)}</span>
          </button>`;
      })
      .join("") +
    Array.from({ length: totalSlots - projects.length }, () => '<div class="slot" aria-hidden="true"></div>').join("");

  const chestButtons = $$("button[data-index]", grid);

  const renderInspect = (p) => {
    const preview = p.image
      ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.name)}" loading="lazy">`
      : cubeSvg(p.cube);
    const links = (p.links || [])
      .filter((l) => l.url)
      .map((l) => `<a class="btn" ${linkAttrs(l.url)}>${esc(l.label)}</a>`)
      .join("");
    const stack = (p.stack || []).join(" | ");
    inspect.innerHTML = `
      <div class="inspect-preview">${preview}</div>
      <h3 class="inspect-name">${esc(p.name)}</h3>
      <p class="inspect-kind">${esc(p.kind)}</p>
      <p class="inspect-desc">${rich(p.description)}</p>
      ${stack ? `<p class="inspect-meta">Stack: ${esc(stack)}</p>` : ""}
      ${p.result ? `<p class="inspect-meta">Result: ${rich(p.result)}</p>` : ""}
      ${links ? `<div class="btn-row">${links}</div>` : ""}`;
    $(".inspect-preview", inspect).style.setProperty("--preview", (p.cube && p.cube.left) || "#3a3a3a");
    $(".inspect-kind", inspect).style.color = p.color || "#ffffff";
  };

  const select = (i, focus = false) => {
    if (!projects[i]) return;
    selected = i;
    chestButtons.forEach((b, j) => {
      b.setAttribute("aria-pressed", String(j === i));
      b.tabIndex = j === i ? 0 : -1;
    });
    renderInspect(projects[i]);
    if (focus) chestButtons[i].focus();
  };

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-index]");
    if (btn) select(Number(btn.dataset.index));
  });

  grid.addEventListener("keydown", (e) => {
    if (!e.target.closest("button[data-index]")) return;
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const last = projects.length - 1;
    const moves = {
      ArrowLeft: selected - 1,
      ArrowRight: selected + 1,
      ArrowUp: selected - cols,
      ArrowDown: selected + cols,
      Home: 0,
      End: last,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const next = moves[e.key];
    if (next >= 0 && next <= last) select(next, true);
  });

  if (projects.length) {
    select(0);
  } else {
    inspect.innerHTML = '<p class="inspect-desc">The chest is empty. Add projects in js/content.js.</p>';
  }

  const placeTip = (host) => {
    const tip = $(".tip", host);
    if (!tip) return;
    tip.style.setProperty("--tip-shift", "0px");
    const r = tip.getBoundingClientRect();
    const pad = 8;
    let shift = 0;
    const vw = document.documentElement.clientWidth;
    if (r.left < pad) shift = pad - r.left;
    else if (r.right > vw - pad) shift = vw - pad - r.right;
    tip.style.setProperty("--tip-shift", `${Math.round(shift)}px`);
  };

  const closeTips = (except) => {
    $$(".has-tip.is-open").forEach((el) => {
      if (el !== except) el.classList.remove("is-open");
    });
  };

  let hoverHost = null;
  document.addEventListener("pointerover", (e) => {
    const host = e.target.closest(".has-tip");
    if (host === hoverHost) return;
    hoverHost = host;
    if (host) {
      closeTips(host);
      placeTip(host);
    }
  });

  document.addEventListener("focusin", (e) => {
    const host = e.target.closest(".has-tip");
    if (host) placeTip(host);
  });

  document.addEventListener("click", (e) => {
    const host = e.target.closest(".has-tip");
    closeTips(host);
    if (host && host.closest('[data-slot="skills"]')) {
      placeTip(host);
      host.classList.toggle("is-open");
    }
  });

  const c = S.contact || {};
  const server = c.server || {};
  const log = slot("chat-log");
  const MAX_LINES = 120;
  const say = (html, cls = "") => {
    const line = document.createElement("div");
    if (cls) line.className = cls;
    line.innerHTML = html;
    log.appendChild(line);
    while (log.children.length > MAX_LINES) log.firstElementChild.remove();
    log.scrollTop = log.scrollHeight;
  };
  const fromMe = (html) => say(`&lt;${esc(S.handle)}&gt; ${html}`);
  const fromServer = (html, cls = "is-system") => say(`[Server] ${html}`, cls);
  const serverText = (text, cls) => fromServer(esc(text), cls);
  const out = (html) => say(html, "is-out");
  const dim = (text) => (text ? ` <span class="chat-dim">${esc(text)}</span>` : "");

  const runLink = (cmd, label = cmd) =>
    `<button type="button" class="chat-link" data-run="${esc(cmd)}">${esc(label)}</button>`;
  const fillLink = (cmd, label = cmd) =>
    `<button type="button" class="chat-link" data-fill="${esc(cmd)}">${esc(label)}</button>`;
  const copyLink = (text, label = text) =>
    `<button type="button" class="chat-link" data-copy="${esc(text)}" title="Copy ${esc(text)}">${esc(label)}</button>`;
  const gotoLink = (id, label) =>
    `<button type="button" class="chat-link" data-goto="${esc(id)}">${esc(label)}</button>`;

  const discordHandle = c.discord ? `@${c.discord}` : "";

  let shortcuts = true;
  try {
    shortcuts = localStorage.getItem("shortcuts") !== "off";
  } catch {}

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const prev = document.activeElement;
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "0";
      ta.style.left = "0";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      ta.remove();
      if (prev && prev.focus) prev.focus({ preventScroll: true });
      return ok;
    }
  };

  const contactLinks = (c.links || []).filter((l) => l.url);
  const github = contactLinks.find((l) => l.id === "github");

  const findProject = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) return -1;
    const names = projects.map((p) => p.name.toLowerCase());
    let i = names.indexOf(q);
    if (i < 0) i = names.findIndex((n) => n.startsWith(q));
    if (i < 0) i = names.findIndex((n) => n.includes(q));
    return i;
  };

  let status = null;

  const COMMANDS = [
    {
      name: "help",
      aliases: ["?", "commands"],
      desc: "List every command",
      run: () => {
        fromServer("Commands (click one to use it):");
        COMMANDS.forEach((cmd) => {
          const usage = cmd.args ? `/${cmd.name} ${cmd.args}` : `/${cmd.name}`;
          const link = cmd.args ? fillLink(`/${cmd.name} `, usage) : runLink(`/${cmd.name}`);
          out(`${link}${dim(cmd.desc)}`);
        });
      },
    },
    {
      name: "projects",
      aliases: ["chest", "work"],
      desc: "List everything in the project chest",
      run: () => {
        fromServer(`${projects.length} items in the chest (click one to inspect it):`);
        projects.forEach((p) => out(`${runLink(`/project ${p.name}`, p.name)}${dim(p.kind)}`));
      },
    },
    {
      name: "project",
      args: "<name>",
      desc: "Open a project in the chest",
      run: (arg) => {
        if (!arg) {
          fromServer(`Usage: /project &lt;name&gt;. See ${runLink("/projects")} for names.`);
          return;
        }
        const i = findProject(arg);
        if (i < 0) {
          fromServer(`No project called "${esc(arg)}". See ${runLink("/projects")}.`, "is-bad");
          return;
        }
        select(i);
        goTo("chest");
        serverText(`Opened ${projects[i].name} in the chest.`);
      },
    },
    {
      name: "jobs",
      aliases: ["experience", "exp"],
      desc: "Experience, newest first",
      run: () => {
        (S.experience || []).forEach((job) => out(`<strong>${esc(job.title)}</strong> @ ${esc(job.org)}${dim(job.dates)}`));
        fromServer(`Details in ${gotoLink("quests", "Crafting Recipes")}.`);
      },
    },
    {
      name: "skills",
      desc: "What I build with",
      run: () => {
        (S.skills || []).forEach((s) => out(`<strong>${esc(s.name)}</strong>${dim(s.detail)}`));
      },
    },
    {
      name: "ip",
      aliases: ["server", "join"],
      desc: `${server.name || "Server"} address`,
      run: () => {
        if (!server.address) {
          serverText("No server address set up yet.");
          return;
        }
        fromServer(`Join ${esc(server.name || "the server")} at ${copyLink(server.address)} (click to copy).`);
        if (server.direct) {
          fromServer(`${copyLink(server.direct)} drops you straight into ${esc(server.directName || "the gamemode")}.`);
        }
        if (server.bedrockPort) {
          serverText(`Bedrock: ${server.direct || server.address}, port ${server.bedrockPort}.`);
        }
      },
    },
    {
      name: "online",
      aliases: ["players", "status"],
      desc: `Live player count on ${server.name || "the server"}`,
      run: async () => {
        if (!server.address) {
          serverText("No server address set up yet.");
          return;
        }
        if (!status || Date.now() - status.at > 60000) {
          serverText(`Pinging ${server.name || server.address}...`);
          const entry = {
            at: Date.now(),
            data: fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(server.address)}`, {
              signal: AbortSignal.timeout?.(8000),
            }).then((res) => {
              if (!res.ok) throw new Error(String(res.status));
              return res.json();
            }),
          };
          entry.data.catch(() => {
            if (status === entry) status = null;
          });
          status = entry;
        }
        try {
          const d = await status.data;
          const p = d.players || {};
          if (d.online) {
            serverText(`${server.name || server.address} is online: ${p.online ?? "?"}/${p.max ?? "?"} players.`, "is-good");
            fromServer(`Hop on: ${runLink("/ip")}`);
          } else {
            serverText(`${server.name || server.address} looks offline right now.`, "is-bad");
          }
        } catch {
          serverText("Couldn't reach the status service. Try again in a bit.", "is-bad");
        }
      },
    },
    {
      name: "discord",
      aliases: ["dm", "contact"],
      desc: "Copy my Discord username",
      run: async () => {
        if (!discordHandle) {
          serverText("No Discord set up yet.");
          return;
        }
        const ok = await copyText(c.discord);
        serverText(ok ? `Copied ${c.discord} to your clipboard. Add me on Discord!` : `Add ${discordHandle} on Discord.`);
      },
    },
    {
      name: "github",
      aliases: ["code"],
      desc: "Open my GitHub",
      run: () => {
        if (!github) {
          serverText("No GitHub link set up yet.");
          return;
        }
        window.open(github.url, "_blank", "noopener");
        fromServer(`Opening <a ${linkAttrs(github.url)}>${esc(github.url.replace(/^https?:\/\//, ""))}</a>`);
      },
    },
    {
      name: "keys",
      aliases: ["shortcuts"],
      desc: "Turn the 1-4, t and / shortcuts on or off",
      run: () => {
        shortcuts = !shortcuts;
        try {
          localStorage.setItem("shortcuts", shortcuts ? "on" : "off");
        } catch {}
        serverText(`Keyboard shortcuts ${shortcuts ? "on" : "off"}.`);
      },
    },
    {
      name: "clear",
      desc: "Clear the chat",
      run: () => {
        log.innerHTML = "";
      },
    },
  ];

  const findCommand = (name) => COMMANDS.find((cmd) => cmd.name === name || (cmd.aliases || []).includes(name));

  const sentLines = [];
  let historyAt = 0;

  const execute = async (raw) => {
    const text = raw.trim();
    if (!text) return;
    sentLines.push(text);
    if (sentLines.length > 50) sentLines.shift();
    historyAt = sentLines.length;

    if (text.startsWith("/")) {
      out(`<span class="chat-dim">&gt; ${esc(text)}</span>`);
      const [head, ...rest] = text.slice(1).trim().split(/\s+/);
      const cmd = findCommand(head.toLowerCase());
      if (!cmd) {
        fromServer(`Unknown command: /${esc(head)}. Type ${runLink("/help")} for help.`, "is-bad");
        return;
      }
      await cmd.run(rest.join(" "));
      return;
    }

    say(`&lt;You&gt; ${esc(text)}`, "is-you");
    if (!discordHandle) {
      serverText("No Discord set up yet.");
      return;
    }
    const ok = await copyText(text);
    serverText(
      ok ? `Copied! Paste it into a DM to ${discordHandle} on Discord.` : `Couldn't copy. DM ${discordHandle} on Discord.`
    );
  };

  if (c.greeting) fromMe(esc(c.greeting));
  if (discordHandle) fromMe(`Best way to reach me: Discord ${copyLink(c.discord, discordHandle)}`);
  if (contactLinks.length) {
    fromMe(`Also on ${contactLinks.map((l) => `<a ${linkAttrs(l.url)}>${esc(l.label)}</a>`).join(" | ")}`);
  }
  fromServer(`Type ${runLink("/help")} for commands${shortcuts ? ", or press / anywhere to open chat" : ""}.`);
  if (c.tip) serverText(c.tip);

  const form = slot("chat-form");
  const input = $("#chat-input");
  const suggestBox = slot("chat-suggest");

  log.addEventListener("click", async (e) => {
    const btn = e.target.closest(".chat-link");
    if (!btn) return;
    const d = btn.dataset;
    if (d.copy) {
      const ok = await copyText(d.copy);
      serverText(ok ? `Copied ${d.copy} to your clipboard.` : `Couldn't copy ${d.copy}.`);
    } else if (d.run) {
      execute(d.run);
    } else if (d.fill) {
      input.value = d.fill;
      input.focus();
      updateSuggest();
    } else if (d.goto) {
      goTo(d.goto);
    }
  });

  let suggestions = [];
  let activeSuggestion = 0;

  const computeSuggestions = (value) => {
    if (!value.startsWith("/")) return [];
    const body = value.slice(1);
    const space = body.indexOf(" ");
    if (space < 0) {
      const q = body.toLowerCase();
      return COMMANDS.filter((cmd) => cmd.name.startsWith(q)).map((cmd) => ({
        label: cmd.args ? `/${cmd.name} ${cmd.args}` : `/${cmd.name}`,
        desc: cmd.desc,
        value: cmd.args ? `/${cmd.name} ` : `/${cmd.name}`,
        complete: !cmd.args,
      }));
    }
    const cmd = findCommand(body.slice(0, space).toLowerCase());
    if (!cmd || cmd.name !== "project") return [];
    const q = body.slice(space + 1).trim().toLowerCase();
    const starts = (p) => (p.name.toLowerCase().startsWith(q) ? 0 : 1);
    return projects
      .filter((p) => p.name.toLowerCase().includes(q))
      .sort((a, b) => starts(a) - starts(b))
      .map((p) => ({ label: p.name, desc: p.kind, value: `/project ${p.name}`, complete: true }));
  };

  const renderSuggest = () => {
    const open = suggestions.length > 0;
    suggestBox.hidden = !open;
    input.setAttribute("aria-expanded", String(open));
    if (!open) {
      suggestBox.innerHTML = "";
      input.removeAttribute("aria-activedescendant");
      return;
    }
    suggestBox.innerHTML = suggestions
      .map(
        (s, i) => `
          <li role="none">
            <button type="button" role="option" id="suggest-${i}" aria-selected="${i === activeSuggestion}"
              class="suggest-item${i === activeSuggestion ? " is-active" : ""}" data-i="${i}" tabindex="-1">
              <span>${esc(s.label)}</span>${dim(s.desc)}
            </button>
          </li>`
      )
      .join("");
    input.setAttribute("aria-activedescendant", `suggest-${activeSuggestion}`);
    const activeEl = $(".is-active", suggestBox);
    if (activeEl) {
      const top = activeEl.offsetTop;
      const bottom = top + activeEl.offsetHeight;
      if (top < suggestBox.scrollTop) suggestBox.scrollTop = top;
      else if (bottom > suggestBox.scrollTop + suggestBox.clientHeight) {
        suggestBox.scrollTop = bottom - suggestBox.clientHeight;
      }
    }
  };

  function updateSuggest() {
    suggestions = computeSuggestions(input.value);
    const exact = suggestions.findIndex((s) => s.value.trim() === input.value.trim());
    activeSuggestion = Math.max(0, exact);
    renderSuggest();
  }

  const closeSuggest = () => {
    suggestions = [];
    renderSuggest();
  };

  const acceptSuggestion = (s, runNow) => {
    if (runNow && s.complete) {
      input.value = "";
      closeSuggest();
      execute(s.value);
    } else {
      input.value = s.value;
      updateSuggest();
    }
    input.focus();
  };

  input.addEventListener("input", updateSuggest);

  let draft = "";

  input.addEventListener("keydown", (e) => {
    const open = suggestions.length > 0;
    if (e.key === "Tab" && !e.shiftKey && open && input.value !== suggestions[activeSuggestion].value) {
      e.preventDefault();
      acceptSuggestion(suggestions[activeSuggestion], false);
    } else if (e.key === "Enter" && open && input.value.trim() !== suggestions[activeSuggestion].value.trim()) {
      e.preventDefault();
      acceptSuggestion(suggestions[activeSuggestion], true);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      closeSuggest();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      if (open) {
        activeSuggestion = (activeSuggestion + step + suggestions.length) % suggestions.length;
        renderSuggest();
      } else if (sentLines.length) {
        if (historyAt === sentLines.length) draft = input.value;
        historyAt = Math.min(sentLines.length, Math.max(0, historyAt + step));
        input.value = historyAt === sentLines.length ? draft : sentLines[historyAt];
      }
    }
  });

  suggestBox.addEventListener("pointerdown", (e) => e.preventDefault());
  suggestBox.addEventListener("click", (e) => {
    const btn = e.target.closest(".suggest-item");
    if (btn) acceptSuggestion(suggestions[Number(btn.dataset.i)], true);
  });

  input.addEventListener("blur", () =>
    setTimeout(() => {
      if (document.activeElement !== input) closeSuggest();
    }, 100)
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value;
    if (!text.trim()) {
      serverText("Type a message, or /help for commands.");
      input.focus();
      return;
    }
    input.value = "";
    closeSuggest();
    execute(text);
  });

  const hotLinks = $$(".hot[data-section]");
  const sections = hotLinks.map((a) => document.getElementById(a.dataset.section)).filter(Boolean);
  const xpFill = slot("xp-fill");

  const setActive = (id) => {
    hotLinks.forEach((a) => {
      const on = a.dataset.section === id;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  };
  setActive(sections[0] && sections[0].id);

  let scrollLock = 0;
  window.addEventListener("scrollend", () => {
    scrollLock = 0;
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < scrollLock) return;
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
  }

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 1;
      xpFill.style.width = `${(progress * 100).toFixed(1)}%`;
      if (max > 0 && progress > 0.995 && sections.length && Date.now() >= scrollLock) {
        setActive(sections[sections.length - 1].id);
      }
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    scrollLock = Date.now() + 1500;
    el.scrollIntoView({ block: "start" });
    if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
    setActive(id);
  };

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest("input, textarea, select, [contenteditable]")) return;
    if (e.key === "Escape") {
      closeTips();
      return;
    }
    if (!shortcuts) return;
    if (e.key === "/" || e.key === "t" || e.key === "T") {
      e.preventDefault();
      goTo("chat");
      if (!input.value) input.value = e.key === "/" ? "/" : "";
      input.focus({ preventScroll: true });
      updateSuggest();
      return;
    }
    const n = Number(e.key);
    if (!Number.isInteger(n) || n < 1 || n > hotLinks.length) return;
    e.preventDefault();
    goTo(hotLinks[n - 1].dataset.section);
  });
})();
