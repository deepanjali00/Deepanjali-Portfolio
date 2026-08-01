import { createFileRoute, Link as RouterLink } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Deepanjali Nagarkoti — Software Developer" },
      { name: "description", content: "Software developer building fast, reliable web applications, APIs, and developer tooling." },
      { property: "og:title", content: "Deepanjali Nagarkoti — Software Developer" },
      { property: "og:description", content: "Software developer building fast, reliable web applications, APIs, and developer tooling." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Project = {
  n: string;
  title: string;
  tag: string;
  year: string;
  role: string;
  description: string;
  stack: string[];
  href?: string;
  gradient: string;
  terminal: { cmd: string; out: string; lines: string[] };
};

const projects: Project[] = [
  {
    n: "01",
    title: "EarnVault",
    tag: "Cooperative Savings & Loan Platform",
    year: "2025",
    role: "Full-stack — Backend & Web Dashboard",
    description:
      "Full-stack microfinance platform for cooperatives: KYC and passbook onboarding, daily interest accrual credited monthly via cron, real-time updates over Socket.IO, and flexible loan disbursement with multiple repayment schedules. Monorepo with a NestJS API, Next.js admin dashboard, and a React Native PWA for members — built for emerging markets and slow networks, with i18n and expense tracking in progress.",
    stack: ["NestJS", "Next.js", "React", "PostgreSQL", "Prisma", "Socket.IO", "Mapbox"],
    href: "https://earnvault.app",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    terminal: {
      cmd: "pnpm nest start",
      out: "EarnVault API ready · :3000",
      lines: [
        "[Nest] LOG  Mapped {/members/:id/passbook, GET}",
        "[Cron] LOG  interest.accrual scheduled · 0 0 1 * *",
        "[WS]   LOG  Socket.IO gateway listening · /ledger",
        "[DB]   LOG  prisma connected · postgres@earnvault",
      ],
    },
  },
];

function Portfolio() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <main
      className={`min-h-screen ${
        dark ? "bg-[#0b0b0d] text-white" : "bg-[#f4f2ee] text-[#0b0b0d]"
      } transition-colors duration-500 overflow-x-hidden`}
    >
      <TopBar dark={dark} setDark={setDark} />
      <Hero />
      <Experience />
      <Education />
      <Skills />
      <Work />
      <Footer />
    </main>
  );
}

function TopBar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const links = [
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-6 px-6 md:px-12 py-5">

        <a
          href="#top"
          className={`font-display text-sm font-black tracking-[-0.02em] h-9 w-9 grid place-items-center rounded-full ${
            dark ? "bg-white text-black" : "bg-black text-white"
          }`}
          aria-label="Home"
        >
          DN
        </a>

        <nav
          className={`hidden md:flex items-center gap-1 rounded-full px-2 py-1 text-[12px] tracking-[0.12em] uppercase ${
            dark ? "ring-1 ring-white/12 bg-white/5" : "ring-1 ring-black/10 bg-black/5"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3 py-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity"
            >
              {l.label}
            </a>
          ))}
          <RouterLink
            to="/blog"
            className="px-3 py-1.5 rounded-full opacity-70 hover:opacity-100 transition-opacity"
          >
            Blog
          </RouterLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className={`h-9 w-9 grid place-items-center rounded-full transition-colors ${
              dark ? "ring-1 ring-white/15 hover:bg-white/10" : "ring-1 ring-black/15 hover:bg-black/5"
            }`}
          >
            {dark ? <MoonIcon /> : <SunIcon />}
          </button>
          <a
            href="#contact"
            className={`h-9 px-4 inline-flex items-center rounded-full text-[11px] tracking-[0.16em] uppercase font-semibold transition-opacity hover:opacity-80 ${
              dark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}



const ROTATE = ["APIs", "dashboards", "ledgers", "real-time apps", "tooling"];

function PixelField() {
  const cells = Array.from({ length: 14 * 40 });
  return (
    <div
      aria-hidden
      className="absolute inset-0 grid opacity-70"
      style={{ gridTemplateColumns: "repeat(40, minmax(0, 1fr))" }}
    >
      {cells.map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-transparent transition-colors duration-[900ms] hover:bg-emerald-400/50 hover:duration-0"
        />
      ))}
    </div>
  );
}

function Hero() {
  const [word, setWord] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWord((w) => (w + 1) % ROTATE.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 pixel-grid opacity-[0.07]" aria-hidden />
      <PixelField />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-current/[0.04]" aria-hidden />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="relative pointer-events-none pt-28 md:pt-36 pb-20 md:pb-28">

          <div className="font-pixel text-[9px] md:text-[10px] flex flex-wrap items-center gap-x-4 gap-y-2 text-emerald-500">
            <span>PLAYER 01</span>
            <span className="opacity-40">·</span>
            <span className="opacity-80">DEEPANJALI NAGARKOTI</span>
            <span className="opacity-40">·</span>
            <span className="opacity-60">LVL 04 SOFTWARE DEV</span>
            <span className="animate-pixel-blink">_</span>
          </div>

          <h1 className="mt-8 font-pixel pixel-text leading-[1.5] text-[clamp(1.5rem,5.4vw,4.2rem)]">
            I BUILD
            <br />
            <span className="text-emerald-500">{"{"}</span>
            <span key={word} className="inline-block animate-pixel-pop mx-2">
              {ROTATE[word]}
            </span>
            <span className="text-emerald-500">{"}"}</span>
          </h1>

          <div className="mt-10 grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-6 text-sm md:text-base leading-relaxed opacity-70">
              Full-stack developer shipping fast, reliable web apps — clean APIs, tuned databases,
              polished frontends. I care about performance, DX, and code that ages well.
            </p>
            <div className="md:col-span-6 md:justify-self-end pointer-events-auto flex flex-wrap gap-3">
              <a
                href="#work"
                className="font-pixel text-[10px] px-5 py-4 bg-emerald-500 text-black shadow-[4px_4px_0_0_rgba(0,0,0,0.35)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <span className="text-black">PRESS START ▶</span>
              </a>
              <a
                href="#contact"
                className="font-pixel text-[10px] px-5 py-4 ring-1 ring-current/30 hover:bg-current/10 transition-colors"
              >
                CONTACT
              </a>
            </div>
          </div>

          <div className="mt-10 font-pixel text-[9px] flex flex-wrap gap-x-6 gap-y-2 opacity-50">
            <span>◆ 3 YRS XP</span>
            <span>◆ NESTJS · NEXTJS</span>
            <span>◆ POSTGRES</span>
            <span>◆ REMOTE / KATHMANDU</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function useParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        setY(-center * speed);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);
  return { ref, y };
}

function SectionHead({ label, right }: { label: string; right?: string }) {
  return (
    <div className="flex items-baseline justify-between mb-10 md:mb-14">
      <h2 className="text-xs uppercase tracking-[0.24em] opacity-60">({label})</h2>
      {right ? <span className="text-xs uppercase tracking-[0.24em] opacity-40">{right}</span> : null}
    </div>
  );
}

const experience = [
  {
    role: "Full-Stack Developer",
    company: "Cooperative Tech Labs",
    period: "2024 — Present",
    place: "Kathmandu · Remote",
    level: "LVL 04",
    status: "ACTIVE QUEST",
    xp: 92,
    points: [
      "Designed and shipped the EarnVault microfinance platform end to end (NestJS + Next.js + PWA).",
      "Cut ledger query times ~70% with composite indexes and materialised monthly balances.",
      "Built the cron-driven interest engine and Socket.IO real-time layer serving live passbooks.",
    ],
    stack: ["NestJS", "PostgreSQL", "Prisma", "Next.js"],
  },
  {
    role: "Backend Engineer",
    company: "Northline Systems",
    period: "2023 — 2024",
    place: "Remote",
    level: "LVL 03",
    status: "CLEARED",
    xp: 74,
    points: [
      "Owned a REST + webhook integration layer used by 20+ partner services.",
      "Introduced typed API contracts and contract tests, dropping integration bugs sharply.",
    ],
    stack: ["Node.js", "TypeScript", "Redis", "Docker"],
  },
  {
    role: "Software Engineering Intern",
    company: "Bitframe",
    period: "2022 — 2023",
    place: "Kathmandu",
    level: "LVL 01",
    status: "CLEARED",
    xp: 40,
    points: ["Built internal admin tooling in React and automated release checks in CI."],
    stack: ["React", "Express", "GitHub Actions"],
  },
];

function XpBar({ value }: { value: number }) {
  const blocks = 20;
  const filled = Math.round((value / 100) * blocks);
  return (
    <div className="flex gap-[3px]" aria-label={`XP ${value}%`}>
      {Array.from({ length: blocks }).map((_, i) => (
        <span
          key={i}
          className={`h-3 w-[7px] ${i < filled ? "bg-emerald-500" : "bg-current/15"}`}
        />
      ))}
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
      <SectionHead label="Experience — Quest Log" right="2022 —" />
      <div className="space-y-5">
        {experience.map((e, idx) => (
          <article
            key={e.company}
            className="group relative ring-1 ring-current/20 hover:ring-emerald-500/60 transition-all p-5 md:p-7 hover:-translate-y-[3px] hover:shadow-[6px_6px_0_0_currentColor]"
          >
            <div className="absolute inset-0 pixel-grid opacity-[0.05] pointer-events-none" aria-hidden />
            <div className="relative grid md:grid-cols-12 gap-6 md:gap-10">
              <div className="md:col-span-4 space-y-4">
                <div className="flex items-center gap-3 font-pixel text-[9px]">
                  <span className="px-2 py-1.5 bg-emerald-500 text-black">{e.level}</span>
                  <span
                    className={
                      e.status === "ACTIVE QUEST"
                        ? "text-emerald-500 animate-pixel-blink"
                        : "opacity-45"
                    }
                  >
                    {e.status}
                  </span>
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-55">
                  <div>{e.period}</div>
                  <div className="mt-1 opacity-70">{e.place}</div>
                </div>
                <div className="space-y-2">
                  <XpBar value={e.xp} />
                  <div className="font-pixel text-[8px] opacity-45">XP {e.xp}/100</div>
                </div>
              </div>

              <div className="md:col-span-8">
                <h3 className="font-pixel text-sm md:text-lg leading-relaxed">{e.role}</h3>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] opacity-60">
                  {e.company}
                </div>
                <ul className="mt-5 space-y-2 text-sm md:text-base leading-relaxed opacity-80">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span className="text-emerald-500 font-pixel text-[8px] pt-1.5">▸</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <span
                      key={s}
                      className="font-pixel text-[8px] px-2 py-1.5 ring-1 ring-current/25 opacity-80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <span className="absolute -top-2 -left-2 font-pixel text-[9px] px-2 py-1 bg-emerald-500 text-black">
              {String(idx + 1).padStart(2, "0")}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

const education = [
  {
    school: "Tribhuvan University",
    degree: "B.Sc. Computer Science & Information Technology",
    period: "2019 — 2023",
    note: "Thesis on distributed ledgers for community savings groups. Graduated with distinction.",
  },
  {
    school: "Open Course Work",
    degree: "Systems Design & Databases",
    period: "2023 — 2024",
    note: "Self-directed study: query planning, indexing strategy, and event-driven architecture.",
  },
];

function Education() {
  return (
    <section id="education" className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
      <SectionHead label="Education" />
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {education.map((e) => (
          <div
            key={e.school}
            className="rounded-2xl p-6 md:p-8 ring-1 ring-current/15 hover:ring-current/35 transition-colors"
          >
            <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">{e.period}</div>
            <h3 className="mt-4 font-display text-2xl md:text-3xl tracking-[-0.02em]">{e.school}</h3>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] opacity-60">{e.degree}</div>
            <p className="mt-4 text-sm leading-relaxed opacity-75">{e.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const skills = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { group: "Backend", items: ["NestJS", "Node.js", "Express", "Prisma", "REST", "WebSockets"] },
  { group: "Frontend", items: ["React", "Next.js", "React Native", "Tailwind CSS"] },
  { group: "Data & Infra", items: ["PostgreSQL", "Redis", "Docker", "GitHub Actions", "AWS"] },
];

function Skills() {
  return (
    <section id="skills" className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
      <SectionHead label="Skills" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 border-t border-current/15 pt-10">
        {skills.map((s) => (
          <div key={s.group}>
            <h3 className="text-[11px] uppercase tracking-[0.22em] opacity-50">{s.group}</h3>
            <ul className="mt-4 space-y-2">
              {s.items.map((i) => (
                <li key={i} className="font-display text-lg md:text-xl tracking-[-0.01em] opacity-85">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
      <SectionHead label="Selected Projects" right="2025 —" />
      <div className="divide-y divide-current/15 border-y border-current/15">
        {projects.map((p) => (
          <ProjectEntry key={p.n} p={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectEntry({ p }: { p: Project }) {
  const { ref, y } = useParallax(0.08);
  return (
    <article ref={ref} className="py-10 md:py-14 grid md:grid-cols-12 gap-8 md:gap-10 items-center">
      <div className="md:col-span-5">
        <Terminal p={p} y={y} />
      </div>
      <div className="md:col-span-7 flex flex-col justify-center">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs opacity-40">{p.n}</span>
          <h3 className="font-display text-3xl md:text-5xl tracking-[-0.02em]">{p.title}</h3>
          <span className="ml-auto text-xs font-mono opacity-50">{p.year}</span>
        </div>
        <div className="mt-2 text-xs uppercase tracking-[0.2em] opacity-60">{p.tag}</div>
        <p className="mt-5 text-sm md:text-base leading-relaxed opacity-80">{p.description}</p>
        <div className="mt-4 text-[11px] uppercase tracking-[0.2em] opacity-60">{p.role}</div>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded ring-1 ring-current/25 opacity-80"
            >
              {s}
            </span>
          ))}
        </div>
        {p.href ? (
          <div className="mt-7">
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 h-11 px-5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] ring-1 ring-current/30 hover:bg-current/10 transition-colors"
            >
              Live demo
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>↗</span>
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}

const previews = [
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    label: "admin dashboard — member ledger",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    label: "interest accrual analytics",
  },
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    label: "loan disbursement flow",
  },
  {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    label: "member PWA — passbook",
  },
];

const SLIDE_MS = 3200;

function Terminal({ p, y }: { p: Project; y: number }) {
  const [phase, setPhase] = useState<"boot" | "preview">("boot");
  const [slide, setSlide] = useState(0);

  const bootMs = 300 + (p.terminal.lines.length + 1) * 350 + 1400;

  useEffect(() => {
    if (phase !== "boot") return;
    const t = setTimeout(() => {
      setSlide(0);
      setPhase("preview");
    }, bootMs);
    return () => clearTimeout(t);
  }, [phase, bootMs]);

  useEffect(() => {
    if (phase !== "preview") return;
    const t = setTimeout(() => {
      if (slide < previews.length - 1) setSlide((s) => s + 1);
      else setPhase("boot");
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [phase, slide]);

  return (
    <div className="relative rounded-xl overflow-hidden ring-1 ring-white/15 shadow-2xl bg-[#0d1117]">
      <div
        className={`absolute -inset-16 bg-gradient-to-br ${p.gradient} opacity-25 blur-2xl animate-slow-pan will-change-transform`}
        style={{ transform: `translate3d(0, ${y}px, 0)` }}
        aria-hidden
      />
      <div className="relative flex items-center gap-2 px-4 h-9 bg-white/5 border-b border-white/10">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto font-mono text-[11px] text-white/50">
          {phase === "boot"
            ? `${p.title.toLowerCase()} — zsh — 80×24`
            : `localhost:3000 — ${p.title.toLowerCase()}`}
        </span>
      </div>

      <div className="relative h-[340px] md:h-[420px] overflow-hidden">
        {phase === "boot" ? (
          <div
            key={`boot-${bootMs}`}
            className="p-4 font-mono text-[11.5px] leading-[1.7] animate-fade-up"
          >
            <div className="text-white/60">
              <span className="text-emerald-400">deepanjali@dev</span>
              <span className="text-white/30">:</span>
              <span className="text-cyan-400">~/{p.title.toLowerCase()}</span>
              <span className="text-white/30">$ </span>
              <span className="text-white/90">{p.terminal.cmd}</span>
            </div>
            {p.terminal.lines.map((l, i) => (
              <div
                key={l}
                className="text-emerald-300/80 animate-fade-up"
                style={{ animationDelay: `${0.3 + i * 0.35}s` }}
              >
                {l}
              </div>
            ))}
            <div
              className="text-white/90 animate-fade-up"
              style={{ animationDelay: `${0.3 + p.terminal.lines.length * 0.35}s` }}
            >
              ✔ {p.terminal.out}
            </div>
            <div
              className="text-white/50 animate-fade-up"
              style={{ animationDelay: `${0.5 + p.terminal.lines.length * 0.35}s` }}
            >
              → opening preview…
            </div>
            <div className="mt-1 text-white/60">
              <span className="text-emerald-400">deepanjali@dev</span>
              <span className="text-white/30">:</span>
              <span className="text-cyan-400">~/{p.title.toLowerCase()}</span>
              <span className="text-white/30">$ </span>
              <span className="inline-block w-[7px] h-[14px] align-middle bg-emerald-400 animate-caret" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 animate-boot-in">
            {previews.map((pv, i) => (
              <img
                key={pv.src}
                src={pv.src}
                alt={`${p.title} preview — ${pv.label}`}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  i === slide
                    ? "opacity-100 blur-0 animate-ken-burns"
                    : i < slide
                      ? "opacity-0 blur-md scale-105 -translate-x-6"
                      : "opacity-0 blur-md scale-105 translate-x-6"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
            <div className="pointer-events-none absolute inset-0 opacity-30 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-emerald-300/25 to-transparent animate-scan" />

            <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
              <span
                key={slide}
                className="font-mono text-[11px] text-emerald-300 animate-fade-up"
              >
                {pv_label(slide)}
              </span>
              <div className="ml-auto flex gap-1.5">
                {previews.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === slide ? "w-6 bg-emerald-400" : "w-2 bg-white/25"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function pv_label(i: number) {
  return previews[i]?.label ?? "";
}



function Footer() {
  return (
    <footer id="contact" className="border-t border-current/15">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8 flex flex-wrap justify-between gap-4 text-xs uppercase tracking-[0.2em] opacity-60">
        <span>© 2026 Deepanjali Nagarkoti</span>
        <a href="mailto:hello@deepanjali.dev" className="hover:opacity-100">hello@deepanjali.dev</a>
        <a href="#" className="hover:opacity-100">Back to top ↑</a>
      </div>
    </footer>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.68.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.63-1.86 3.36-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
