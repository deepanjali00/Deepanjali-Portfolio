import { createFileRoute } from "@tanstack/react-router";
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
  terminal: { cmd: string; out: string };
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
    terminal: { cmd: "$ pnpm nest start", out: "▸ EarnVault API ready · :3000 · cron: interest@0 0 1 * *" },
  },
];

type View = "grid" | "list";

function Portfolio() {
  const [dark, setDark] = useState(true);
  const [view, setView] = useState<View>("grid");

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <main
      className={`min-h-screen ${
        dark ? "bg-[#0b0b0d] text-white" : "bg-[#f4f2ee] text-[#0b0b0d]"
      } transition-colors duration-500 overflow-x-hidden`}
    >
      <TopBar dark={dark} setDark={setDark} view={view} setView={setView} />
      <Hero />
      <Work view={view} />
      <Footer />
    </main>
  );
}

function TopBar({
  dark,
  setDark,
  view,
  setView,
}: {
  dark: boolean;
  setDark: (v: boolean) => void;
  view: View;
  setView: (v: View) => void;
}) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-6 px-6 md:px-12 py-6">
        <nav className="flex items-center gap-8 text-[13px] tracking-[0.14em] uppercase">
          <a href="#work" className="opacity-70 hover:opacity-100 transition-opacity">Work</a>
          <a href="#contact" className="opacity-70 hover:opacity-100 transition-opacity">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center rounded-full p-1 ${
              dark ? "ring-1 ring-white/15" : "ring-1 ring-black/15"
            }`}
            role="tablist"
            aria-label="View"
          >
            <button
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              className={`h-7 px-3 rounded-full flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase transition-colors ${
                view === "grid"
                  ? dark
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <GridIcon /> Grid
            </button>
            <button
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              className={`h-7 px-3 rounded-full flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase transition-colors ${
                view === "list"
                  ? dark
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <ListIcon /> List
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6 text-[13px] tracking-[0.14em] uppercase">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity"
          >
            <GitHubIcon /> GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity"
          >
            <LinkedInIcon /> LinkedIn
          </a>
          <a
            href="mailto:hello@deepanjali.dev"
            className="font-semibold hover:opacity-70 transition-opacity"
          >
            Email
          </a>
          <button
            aria-label="Toggle theme"
            onClick={() => setDark(!dark)}
            className={`h-9 w-9 rounded-full grid place-items-center ${
              dark ? "ring-1 ring-white/20 hover:bg-white/10" : "ring-1 ring-black/20 hover:bg-black/5"
            } transition-colors`}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
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

function Work({ view }: { view: View }) {
  return (
    <section id="work" className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
      <div className="flex items-baseline justify-between mb-10 md:mb-14">
        <h2 className="text-xs uppercase tracking-[0.24em] opacity-60">(Selected Projects)</h2>
        <span className="text-xs uppercase tracking-[0.24em] opacity-40">2025 —</span>
      </div>
      {view === "grid" ? (
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {projects.map((p) => (
            <ProjectCard key={p.n} p={p} />
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-current/15 border-y border-current/15">
          {projects.map((p) => (
            <ProjectRow key={p.n} p={p} />
          ))}
        </ul>
      )}
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const { ref, y } = useParallax(0.12);
  return (
    <article ref={ref} className="group" id="contact">
      <a href={p.href ?? "#"} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-black/20">
          <div
            className={`absolute -inset-8 bg-gradient-to-br ${p.gradient} animate-slow-pan will-change-transform`}
            style={{ transform: `translate3d(0, ${y}px, 0)` }}
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 grid grid-rows-6 opacity-30">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="border-t border-white/20 animate-scan"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            ))}
          </div>
          <div className="absolute left-5 top-5 right-5 font-mono text-[11px] text-white/80 leading-relaxed">
            <div className="opacity-60">{p.terminal.cmd}</div>
            <div className="opacity-90 animate-type">{p.terminal.out}</div>
          </div>
          <div className="absolute left-5 bottom-5 right-5 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-white/10 backdrop-blur-sm text-white ring-1 ring-white/15"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <div>
            <div className="font-display text-2xl md:text-3xl tracking-[-0.02em] group-hover:opacity-70 transition-opacity">
              {p.title}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] opacity-60 mt-1">{p.tag}</div>
          </div>
          <span className="text-xs font-mono opacity-50">{p.year}</span>
        </div>
      </a>
    </article>
  );
}

function ProjectRow({ p }: { p: Project }) {
  const [open, setOpen] = useState(true);
  return (
    <li className="py-6 md:py-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full grid grid-cols-12 gap-4 items-baseline text-left"
      >
        <span className="col-span-1 font-mono text-xs opacity-40">{p.n}</span>
        <span className="col-span-11 md:col-span-6 font-display text-2xl md:text-4xl tracking-[-0.02em]">
          {p.title}
        </span>
        <span className="hidden md:block md:col-span-4 text-xs uppercase tracking-[0.2em] opacity-60">
          {p.tag}
        </span>
        <span className="hidden md:block md:col-span-1 text-xs font-mono opacity-50 text-right">
          {p.year}
        </span>
      </button>
      {open && (
        <div className="mt-5 grid grid-cols-12 gap-4">
          <div className="col-start-1 md:col-start-2 col-span-12 md:col-span-7">
            <p className="text-sm md:text-base leading-relaxed opacity-80">{p.description}</p>
            <div className="mt-4 text-[11px] uppercase tracking-[0.2em] opacity-60">{p.role}</div>
          </div>
          <div className="col-start-1 md:col-start-9 col-span-12 md:col-span-4 flex flex-wrap gap-2 md:justify-end content-start">
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
      )}
    </li>
  );
}

function Footer() {
  return (
    <footer className="border-t border-current/15">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8 flex flex-wrap justify-between gap-4 text-xs uppercase tracking-[0.2em] opacity-60">
        <span>© 2026 Deepanjali Nagarkoti</span>
        <a href="mailto:hello@deepanjali.dev" className="hover:opacity-100">hello@deepanjali.dev</a>
        <a href="#" className="hover:opacity-100">Back to top ↑</a>
      </div>
    </footer>
  );
}

function GridIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
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
