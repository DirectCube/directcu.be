window.SITE = {
  handle: "DirectCube",
  name: "DirectCube",
  role: "Minecraft network developer",
  tagline: "Owner & developer of TropixMC",
  about:
    "I own TropixMC, where I'm building **PrisonBlock**: a Minecraft gamemode made from **17 custom plugins**, " +
    "running on a network of servers that act as one. I've also worked across the Minecraft community " +
    "in production, QA and moderation, for audiences from **2,000 members** to **1.4 million users**.",

  avatar: "assets/avatar.webp",

  level: "",

  stats: [
    { label: "Class", value: "Network developer" },
    { label: "Guild", value: "TropixMC (Owner)" },
    { label: "Main quest", value: "PrisonBlock" },
  ],

  skills: [
    { glyph: "JAVA", name: "Java", detail: "Java 21 | Paper & Velocity plugins" },
    { glyph: "MC", name: "Minecraft networks", detail: "Paper 1.21 | Velocity proxy" },
    { glyph: "DB", name: "Data", detail: "MySQL | Redis" },
    { glyph: "OPS", name: "DevOps", detail: "Maven | Forgejo CI | Python deployer" },
    { glyph: "WEB", name: "Web", detail: "React | Vite" },
    { glyph: "PCK", name: "Resource packs", detail: "Nexo | shaders" },
    { glyph: "EVT", name: "Event production", detail: "Horizon Events | 10M+ views" },
    { glyph: "QA", name: "QA & bug hunting", detail: "Mineplex | Hypixel" },
    { glyph: "MOD", name: "Moderation", detail: "ScamSentry | PenguinGG" },
  ],

  experience: [
    {
      icon: "crown",
      title: "Owner",
      org: "TropixMC",
      dates: "Current",
      bullets: [
        "Passion project making groundbreaking tech for Minecraft.",
        "Building **PrisonBlock**: **17 custom plugins** and **2,000+ commits** since June 2026.",
        "Designed **Oasis**, the network layer that runs many servers as one.",
      ],
      ingredients: ["JAVA", "MC", "DB", "OPS", "WEB", "PCK", "QA", "MOD", ""],
    },
    {
      icon: "clapper",
      title: "Production",
      org: "Horizon Events",
      dates: "",
      bullets: ["Production on events that have reached **10,000,000+ views**."],
      ingredients: ["", "EVT", "", "", "MC", "", "", "", ""],
    },
    {
      icon: "bug",
      title: "Admin",
      org: "Player QA",
      dates: "",
      bullets: ["Helped run a **2,000-member** community finding bugs on Mineplex and Hypixel."],
      ingredients: ["", "QA", "", "", "MC", "", "", "MOD", ""],
    },
    {
      icon: "shield",
      title: "Mod / Maintainer",
      org: "ScamSentry",
      dates: "",
      bullets: ["Moderated and maintained ScamSentry for **1,400,000 users**."],
      ingredients: ["", "MOD", "", "", "QA", "", "", "", ""],
    },
    {
      icon: "shield",
      title: "Moderator",
      org: "PenguinGG",
      dates: "Former",
      bullets: ["Moderated the community at **100 concurrent players**, up until it shut down."],
      ingredients: ["", "MOD", "", "", "MC", "", "", "", ""],
    },
  ],

  projects: [
    {
      name: "PrisonBlock",
      kind: "Main project | TropixMC",
      color: "#ffff55",
      cube: { top: "#6fbf3b", left: "#8a5f3d", right: "#6b4630" },
      image: "",
      description:
        "A Minecraft gamemode I'm building from scratch: gangs with their own mines and islands, " +
        "fishing, mining and farming grinds with skill trees, missions, crates, an auction house " +
        "and collectable cards.",
      stack: ["Java 21", "Paper 1.21", "Velocity", "MySQL", "Redis", "Maven"],
      result: "**17 plugins** | ~2,800 Java files | **2,000+ commits** since June 2026",
      links: [
        { label: "Play", url: "https://tropixmc.net" },
        { label: "Wiki", url: "https://wiki.tropixmc.net" },
      ],
    },
    {
      name: "Oasis",
      kind: "Network tech",
      color: "#55ffff",
      cube: { top: "#7de3ea", left: "#2f8f97", right: "#24727a" },
      image: "",
      description:
        "The network layer under PrisonBlock. It makes many identical Paper servers behind a Velocity " +
        "proxy feel like one: players are load-balanced on join, their data syncs across servers over " +
        "Redis, and each gang's mine is pinned to a single server.",
      stack: ["Java", "Velocity", "Redis", "MySQL"],
      result: "The network grows by adding identical servers",
      links: [],
    },
    {
      name: "tropixmc.net",
      kind: "Web",
      color: "#55ff55",
      cube: { top: "#5fe39a", left: "#2a9a5c", right: "#1f7a48" },
      image: "",
      description:
        "One React app behind every TropixMC site: player stats with paid Stats+ breakdowns and " +
        "account linking, a headless PayNow webstore, the player wiki and a bug tracker.",
      stack: ["React", "Vite", "Python"],
      result: "Live at tropixmc.net and its subdomains",
      links: [
        { label: "Stats", url: "https://stats.tropixmc.net" },
        { label: "Store", url: "https://store.tropixmc.net" },
      ],
    },
    {
      name: "Oasis Deployer",
      kind: "Tooling",
      color: "#ffaa00",
      cube: { top: "#f5d55a", left: "#a8800f", right: "#87670b" },
      image: "",
      description:
        "A long-running Python daemon that builds and ships the plugin jars, syncs network config, " +
        "promotes builds from dev to prod, serves every web surface and runs the network's Discord bot.",
      stack: ["Python", "Redis", "Pterodactyl API", "Discord"],
      result: "**469** automated deploy commits so far",
      links: [],
    },
    {
      name: "TropixCollectables",
      kind: "Gameplay",
      color: "#ff88ff",
      cube: { top: "#b48cff", left: "#6e4bb8", right: "#563a93" },
      image: "",
      description:
        "Trading card sets, booster packs and binders, with plushies on the way. A standalone plugin " +
        "with its own database and Redis relay; packs sell through the in-game store.",
      stack: ["Java", "MySQL", "Redis"],
      result: "",
      links: [],
    },
    {
      name: "TropixStaff",
      kind: "Moderation tools",
      color: "#ff5555",
      cube: { top: "#e05a4f", left: "#a8352c", right: "#82271f" },
      image: "",
      description:
        "Network-wide staff tooling: punishments, offense tracking and ban enforcement at the proxy. " +
        "Every feature falls back to a single server instead of failing when others are down.",
      stack: ["Java", "Paper", "Velocity", "MySQL", "Redis"],
      result: "Runs on both the game servers and the proxy",
      links: [],
    },
    {
      name: "TropixStore",
      kind: "Store & currency",
      color: "#ffd25a",
      cube: { top: "#ffd25a", left: "#d99a1f", right: "#b07a14" },
      image: "",
      description:
        "The network's store: its own premium currency, player skins, and the PayNow webstore behind " +
        "store.tropixmc.net. A standalone plugin with its own MySQL and Redis.",
      stack: ["Java", "PayNow", "MySQL", "Redis"],
      result: "Live at **store.tropixmc.net**",
      links: [{ label: "Store", url: "https://store.tropixmc.net" }],
    },
    {
      name: "TropixCrates",
      kind: "Gameplay",
      color: "#e0b070",
      cube: { top: "#c8924a", left: "#8f5e28", right: "#70491f" },
      image: "",
      description:
        "Block and item crates with a **live SQL loot editor** and physical keys. Standalone, with its " +
        "own database and Redis relay, and hooks into the store, chat and collectables when they're present.",
      stack: ["Java", "Paper", "MySQL", "Redis"],
      result: "",
      links: [],
    },
    {
      name: "TropixClients",
      kind: "Client integrations",
      color: "#a8f07a",
      cube: { top: "#a8f07a", left: "#5fb03a", right: "#4a8c2d" },
      image: "",
      description:
        "Extra client features for players on Lunar Client, over its Apollo protocol, and on Dawn and " +
        "Feather, all from one plugin.",
      stack: ["Java", "Paper", "Lunar Apollo"],
      result: "",
      links: [],
    },
    {
      name: "TropixConnect",
      kind: "Seamless server switching",
      color: "#5fd6d0",
      cube: { top: "#5fd6d0", left: "#2f9a95", right: "#237873" },
      image: "",
      description:
        "Seamless server switching on Velocity, with no \"Downloading terrain\" screen between servers. " +
        "I traced Velocity's switch path and found it only bounces pre-1.16 clients through a throwaway " +
        "dimension, so the plugin stays clean: **no packet hacks**, just the branding and a " +
        "/tropixconnect command.",
      stack: ["Java 21", "Velocity", "Maven"],
      result: "Switches with **no terrain reload** on 1.16+ clients",
      links: [],
    },
    {
      name: "VertAI",
      kind: "AI video pipeline",
      color: "#ff9f6b",
      cube: { top: "#ff9f6b", left: "#d9733f", right: "#b05a2f" },
      image: "",
      description:
        "Makes vertical ad shorts for PrisonBlock on a schedule: cuts gameplay clips, writes a voiceover " +
        "with Gemini, voices it with Fish Audio, times the subtitles, adds music and an end card, then " +
        "posts to **YouTube Shorts, TikTok and Instagram Reels**. A Discord bot triggers renders.",
      stack: ["Python", "Gemini", "Fish Audio", "Cloudflare R2", "Discord"],
      result: "Deploys itself on every push to main",
      links: [],
    },
    {
      name: "BlockBenchAI",
      kind: "AI | Minecraft models",
      color: "#9be1ff",
      cube: { top: "#9be1ff", left: "#4aa3cf", right: "#3a82a6" },
      image: "",
      description:
        "Generates Minecraft Java item models (geometry, textures, display transforms and Nexo " +
        "packaging) in the measured style of a reference set. An AI coding agent designs over MCP; " +
        "the engine handles style measurement, geometry, validation, rendering and packaging.",
      stack: ["Python", "MCP", "Blockbench", "Nexo"],
      result: "**89 commits** since September 2026",
      links: [],
    },
    {
      name: "RPG-Stats",
      kind: "Stats website",
      color: "#ff9ab4",
      cube: { top: "#ff9ab4", left: "#cf5f7c", right: "#a84a62" },
      image: "",
      description:
        "A player-stats website for the og-network Minecraft server: player profiles, message and " +
        "language analysis, server-stat trends, AI-written summaries, leaderboards and a friend-map " +
        "graph. Node.js and Express serve server-rendered EJS pages backed by the built-in node:sqlite " +
        "store, with charts drawn as inline SVG, an interactive canvas friend map, an HTTP ingestion " +
        "endpoint and a public JSON API. **No build step and no CDN dependencies.**",
      stack: ["Node.js 22", "Express", "EJS", "node:sqlite", "Inline SVG", "Canvas", "OpenAI-compatible API"],
      result: "**273 commits** since June 2026",
      links: [],
    },
  ],

  contact: {
    discord: "directcube",
    greeting: "Thanks for exploring my world!",
    tip: "Anything that isn't a command gets copied, ready to paste into a Discord DM.",
    links: [
      { id: "github", label: "GitHub", url: "https://github.com/DirectCube" },
      { label: "TropixMC", url: "https://tropixmc.net" },
    ],
    server: {
      name: "TropixMC",
      address: "play.tropixmc.net",
      direct: "pb.tropixmc.net",
      directName: "PrisonBlock",
      bedrockPort: 19132,
    },
  },
};
