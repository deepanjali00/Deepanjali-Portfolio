import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Deepanjali Nagarkoti — Software Developer" },
      { name: "description", content: "Software developer building fast, reliable web applications and developer tooling." },
      { property: "og:title", content: "Deepanjali Nagarkoti — Software Developer" },
      { property: "og:description", content: "Software developer building fast, reliable web applications and developer tooling." },
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
  stack: string[];
  href?: string;
  gradient: string;
};

const projects: Project[] = [
  {
    n: "01",
    title: "Project One",
    tag: "Full-stack Web App",
    year: "2025",
    stack: ["TypeScript", "React", "Node", "PostgreSQL"],
    href: "#",
    gradient: "from-indigo-500 via-fuchsia-500 to-orange-400",
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
      <Work />
      <Footer />
    </main>
  );
}

function TopBar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-6 px-6 md:px-12 py-6">
        <div className="flex items-baseline gap-3 text-[13px] tracking-[0.14em]">
          <span className="font-semibold uppercase">Deepanjali Nagarkoti</span>
          <span className="opacity-50 uppercase hidden sm:inline">Software Developer</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.14em] uppercase">
          <a href="#work" className="opacity-70 hover:opacity-100 transition-opacity">Work</a>
          <a href="#contact" className="opacity-70 hover:opacity-100 transition-opacity">Contact</a>
        </nav>

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
      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {projects.map((p) => (
          <ProjectCard key={p.n} p={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const { ref, y } = useParallax(0.12);
  return (
    <article ref={ref} className="group" id="contact">
      <a href={p.href ?? "#"} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-black/20">
          {/* Animated gradient preview */}
          <div
            className={`absolute -inset-8 bg-gradient-to-br ${p.gradient} animate-slow-pan will-change-transform`}
            style={{ transform: `translate3d(0, ${y}px, 0)` }}
          />
          {/* Code-like overlay */}
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
            <div className="opacity-60">$ pnpm dev</div>
            <div className="opacity-90 animate-type">▸ ready in 342ms · localhost:3000</div>
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
