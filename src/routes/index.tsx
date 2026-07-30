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
    href: "#",
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
  const [dark, setDark] = useState(true);

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
    <header className="sticky top-0 z-50 backdrop-blur-md">
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



function Hero() {
  return (
    <section className="max-w-[1600px] mx-auto px-6 md:px-12 pt-10 md:pt-20 pb-20 md:pb-32">
      <div className="text-[11px] tracking-[0.28em] uppercase opacity-60 mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-semibold opacity-100">Deepanjali Nagarkoti</span>
        <span aria-hidden className="opacity-40">/</span>
        <span>Software Developer</span>
      </div>
      <div className="grid md:grid-cols-12 gap-10 items-end">
        <h1 className="md:col-span-8 font-display font-black leading-[0.92] tracking-[-0.03em] text-[clamp(3.5rem,12vw,13rem)]">
          Building<br />the web.
        </h1>
        <p className="md:col-span-4 text-base md:text-lg leading-relaxed opacity-70 md:pb-6">
          I'm a software developer focused on shipping fast, reliable web applications — from clean APIs and databases to polished frontends. I care about performance, DX, and code that ages well.
        </p>
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

function Work() {
  return (
    <section id="work" className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
      <div className="flex items-baseline justify-between mb-10 md:mb-14">
        <h2 className="text-xs uppercase tracking-[0.24em] opacity-60">(Selected Projects)</h2>
        <span className="text-xs uppercase tracking-[0.24em] opacity-40">2025 —</span>
      </div>
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
    <article ref={ref} className="py-10 md:py-14 grid md:grid-cols-12 gap-8 md:gap-10">
      <div className="md:col-span-7">
        <Terminal p={p} y={y} />
      </div>
      <div className="md:col-span-5 flex flex-col justify-center">
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

      <div className="relative h-[220px] md:h-[260px] overflow-hidden">
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
