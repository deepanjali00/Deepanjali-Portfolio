import { createFileRoute, Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Deepanjali Nagarkoti — Software Engineer" },
      {
        name: "description",
        content:
          "Deepanjali Nagarkoti is a software engineer in Kathmandu, Nepal, building full-stack web applications and applied machine learning tools.",
      },
      { property: "og:title", content: "Deepanjali Nagarkoti — Software Engineer" },
      {
        property: "og:description",
        content: "Software engineer in Kathmandu, Nepal. Full-stack development and applied ML.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://deepanjalinagarkoti.com.np/" },
      { property: "og:image", content: "https://deepanjalinagarkoti.com.np/og.jpg" },
      {
        property: "og:image:alt",
        content: "Deepanjali Nagarkoti — Software Engineer",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://deepanjalinagarkoti.com.np/og.jpg" },
    ],
  }),
});

/* ------------------------------------------------------------------ data */

type Project = {
  title: string;
  tag: string;
  year: string;
  role: string;
  description: string;
  stack: string[];
  href?: string;
  codeHref?: string;
  terminal: { cmd: string; out: string; lines: string[] };
};

const projects: Project[] = [
  {
    title: "Tumor Insight",
    tag: "Brain Tumor Classification System",
    year: "2024",
    role: "Full-stack — ML & Web",
    description:
      "Research project, not a diagnostic tool. Classifies brain MRI scans into glioma, meningioma, pituitary or no tumor. VGG-16 and ResNet-50 implemented from scratch in TensorFlow/Keras without pretrained weights, trained on 7,023 MRI images and reaching 93.60% (VGG-16) and 91.31% (ResNet-50) test accuracy. Includes upload validation, three free attempts before login, a daily limit for registered users, a report for each result and nearby-doctor suggestions.",
    stack: ["Python", "TensorFlow/Keras", "Flask", "React"],
    terminal: {
      cmd: "python app.py",
      out: "Tumor Insight API ready · :5000",
      lines: [
        "[Flask] LOG  Mapped {/predict, POST}",
        "[TF]    LOG  VGG-16 loaded · 93.60% acc",
        "[DB]    LOG  sqlite connected · tumor_insight",
      ],
    },
  },
  {
    title: "EarnVault",
    tag: "Microfinance & Savings Platform",
    year: "2025",
    role: "Full-stack — Backend & Web Dashboard",
    description:
      "Monorepo (Turborepo) with a responsive PWA, an admin dashboard and a NestJS API. The PWA lets members complete KYC, upload documents, track savings and apply for loans; the admin dashboard handles financial reporting and loan management. Implemented savings, interest accrual, microloans, EMI calculations and transaction tracking, and made monthly interest crediting safe to re-run so no month is credited twice.",
    stack: ["React", "NestJS", "PostgreSQL", "PWA", "Turborepo"],
    href: "https://earnvault.app",
    codeHref: "https://github.com/deepanjali00/Earn-Vault",
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

const experience = [
  {
    role: "Software Engineer",
    company: "Rumsan Associates",
    period: "Jul 2025 — Jun 2026",
    place: "Lalitpur, Nepal",
  },
  {
    role: "Software Engineer Trainee",
    company: "TEJ Center",
    period: "Feb 2025 — Jun 2025",
    place: "Lalitpur, Nepal",
  },
];

const education = [
  {
    school: "Prime College (affiliated with Tribhuvan University)",
    degree: "B.Sc. Computer Science & Information Technology",
    period: "2021 — 2025",
  },
];

const skills = [
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript", "SQL", "Python"],
  },
  {
    group: "Web Development",
    items: ["React", "Next.js", "Node.js", "NestJS", "Express.js", "Tailwind CSS", "REST APIs"],
  },
  {
    group: "Databases & Tools",
    items: ["PostgreSQL", "Supabase", "MongoDB", "Prisma ORM", "Git", "GitHub", "Docker"],
  },
  {
    group: "ML & Data",
    items: [
      "TensorFlow/Keras",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "CNNs",
      "scikit-learn",
      "Model Evaluation",
    ],
  },
];

/* ------------------------------------------------------------------ hooks */

function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/** 0 → 1 progress of an element travelling through the viewport. */
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const anchor = window.innerHeight * 0.62;
        const raw = (anchor - r.top) / Math.max(r.height, 1);
        setP(Math.min(1, Math.max(0, raw)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, p };
}

function useParallax(speed = 0.08) {
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

/* ------------------------------------------------------------------ shell */

function Portfolio() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      {/* blueprint paper */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 blueprint-grid opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[70vh] bg-gradient-to-b from-primary/8 to-transparent"
      />

      <div className="relative z-10">
        <TopBar dark={dark} setDark={setDark} />
        <Hero />
        <Plate id="work" label="Selected Work">
          <Work />
        </Plate>
        <Plate id="experience" label="Experience">
          <Timeline items={experience.map(expToNode)} />
        </Plate>
        <Plate id="skills" label="Skills">
          <Skills />
        </Plate>
        <Plate id="education" label="Education">
          <Timeline items={education.map(eduToNode)} />
        </Plate>
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ chrome */

function TopBar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const links = [
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-dashed border-primary/25 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] items-center gap-4 px-5 py-3 md:px-10">
        <a
          href="#top"
          aria-label="Home"
          className="group relative grid h-10 w-10 place-items-center border border-primary/45 font-mono text-[11px] font-medium tracking-[0.1em] text-primary"
        >
          DN
          <span className="absolute inset-0 scale-0 border border-primary bg-primary/10 transition-transform duration-300 group-hover:scale-100" />
        </a>

        <div className="hidden font-mono text-[10px] uppercase leading-tight tracking-[0.18em] text-muted-foreground sm:block">
          Deepanjali Nagarkoti
          <br />
          <span className="text-primary/70">Software Engineer</span>
        </div>

        <nav className="ml-auto hidden items-center gap-0 border border-dashed border-primary/25 font-mono text-[10px] uppercase tracking-[0.16em] md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative border-r border-dashed border-primary/20 px-3.5 py-2.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/blog"
            className="px-3.5 py-2.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
          >
            Blog
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-10 w-10 place-items-center border border-dashed border-primary/35 text-primary transition-colors hover:bg-primary/10"
          >
            {dark ? <MoonIcon /> : <SunIcon />}
          </button>
          <a
            href="#contact"
            className="group relative hidden h-10 items-center overflow-hidden border border-primary px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-primary sm:inline-flex"
          >
            <span className="relative z-10 transition-colors group-hover:text-primary-foreground">
              Get in touch
            </span>
            <span className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-300 group-hover:translate-y-0" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Ticks() {
  return (
    <>
      <span aria-hidden className="tick -left-px -top-px border-l border-t" />
      <span aria-hidden className="tick -right-px -top-px border-r border-t" />
      <span aria-hidden className="tick -bottom-px -left-px border-b border-l" />
      <span aria-hidden className="tick -bottom-px -right-px border-b border-r" />
    </>
  );
}

function Plate({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  const { ref, seen } = useInView<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`mx-auto max-w-[1500px] px-5 pb-20 md:px-10 md:pb-28 ${
        seen ? "animate-fade-up" : "opacity-0"
      }`}
    >
      <div className="frame relative bg-background/40 p-5 md:p-10">
        <Ticks />
        <div className="mb-8 border-b border-dashed border-primary/25 pb-4 md:mb-12">
          <h2 className="font-display text-2xl font-semibold md:text-4xl">{label}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-[1500px] px-5 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24"
    >
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-ring" />
            Software Engineer · Full-stack Developer
          </div>
          <h1 className="font-display text-[clamp(2.7rem,6.2vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            Deepanjali
            <span className="mt-2 block text-primary">Nagarkoti</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I&apos;m a software engineer from Kathmandu, Nepal. I build full-stack web applications
            and APIs, and I&apos;m exploring applied machine learning.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group relative inline-flex h-12 items-center overflow-hidden border border-primary px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary"
            >
              <span className="relative z-10 transition-colors group-hover:text-primary-foreground">
                Explore my work
              </span>
              <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-300 group-hover:translate-x-0" />
            </a>
            <a
              href="mailto:deepanjalinagarkoti@gmail.com"
              className="inline-flex h-12 items-center border border-dashed border-primary/35 px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Get in touch
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-dashed border-primary/20 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>Kathmandu, Nepal</span>
            <span>B.Sc. Computer Science &amp; IT</span>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="frame relative mx-auto max-w-[470px] overflow-hidden bg-card/55 p-5 sm:p-7 md:ml-auto">
            <Ticks />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative">
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>A little about me</span>
                <span className="text-primary">PROFILE</span>
              </div>
              <div className="relative mt-7 flex aspect-[1.35] items-center justify-center overflow-hidden border border-dashed border-primary/25 bg-background/70">
                <div aria-hidden className="absolute inset-0 blueprint-grid opacity-60" />
                <div
                  aria-hidden
                  className="absolute h-44 w-44 rounded-full border border-primary/15 sm:h-52 sm:w-52"
                />
                <div
                  aria-hidden
                  className="absolute h-32 w-32 rounded-full border border-dashed border-primary/25 sm:h-40 sm:w-40"
                />
                <span className="relative font-display text-[clamp(5rem,14vw,9rem)] font-bold leading-none tracking-[-0.1em] text-primary/90">
                  DN
                </span>
                <span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  Software · People · Purpose
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="border-l border-primary/50 pl-3">
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    I work with
                  </div>
                  <div className="mt-2 font-display text-sm sm:text-base">TypeScript · React</div>
                </div>
                <div className="border-l border-primary/50 pl-3">
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    I care about
                  </div>
                  <div className="mt-2 font-display text-sm sm:text-base">
                    Useful, thoughtful software
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ timeline */

type TimelineNode = { key: string; title: string; meta: string; body: React.ReactNode };

function expToNode(e: (typeof experience)[number]): TimelineNode {
  return {
    key: e.company,
    title: e.role,
    meta: e.company,
    body: (
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground md:text-[11px]">
        <span>{e.period}</span>
        <span aria-hidden className="text-primary/60">
          ·
        </span>
        <span>{e.place}</span>
      </div>
    ),
  };
}

function eduToNode(e: (typeof education)[number]): TimelineNode {
  return {
    key: e.school,
    title: e.degree,
    meta: `${e.period}  ·  ${e.school}`,
    body: null,
  };
}

function Timeline({ items }: { items: TimelineNode[] }) {
  const { ref, p } = useScrollProgress<HTMLOListElement>();
  const n = items.length;

  return (
    <ol ref={ref} className="relative max-w-4xl">
      {/* rail */}
      <span
        aria-hidden
        className="absolute left-[7px] top-2 bottom-6 w-px border-l border-dashed border-primary/25"
      />
      {/* drawn line */}
      <span
        aria-hidden
        className="absolute left-[7px] top-2 w-px origin-top bg-primary transition-[height] duration-200 ease-out"
        style={{
          height: `calc(${Math.min(p * 1.08, 1) * 100}% - 24px)`,
          boxShadow: "0 0 12px var(--draft)",
        }}
      />

      {items.map((it, i) => {
        const reached = p >= (i + 0.15) / n;
        return (
          <li key={it.key} className="relative pl-10 pb-12 last:pb-0 md:pl-14">
            <span
              aria-hidden
              className={`absolute left-0 top-1 grid h-[15px] w-[15px] place-items-center border transition-all duration-500 ${
                reached
                  ? "rotate-45 border-primary bg-primary/20 shadow-[0_0_14px_var(--draft)]"
                  : "rotate-0 border-primary/30 bg-background"
              }`}
            >
              <span
                className={`h-[5px] w-[5px] transition-colors duration-500 ${
                  reached ? "bg-primary" : "bg-primary/25"
                }`}
              />
            </span>
            <div
              className={`transition-all duration-700 ${
                reached ? "translate-x-0 opacity-100" : "translate-x-2 opacity-80"
              }`}
            >
              <h3 className="font-display text-xl font-semibold leading-tight md:text-3xl">
                {it.title}
              </h3>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-primary/80 md:text-[12px]">
                {it.meta}
              </div>
              {it.body}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {items.map((s) => (
        <span
          key={s}
          className="border border-dashed border-primary/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ skills */

function Skills() {
  return (
    <div className="grid gap-px bg-primary/15 sm:grid-cols-2 lg:grid-cols-4">
      {skills.map((s) => (
        <div key={s.group} className="group relative overflow-hidden bg-background p-5">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-y-full bg-primary/5 transition-transform duration-500 group-hover:translate-y-0"
          />
          <div className="relative flex items-baseline justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              {s.group}
            </h3>
            <span className="font-mono text-[10px] text-muted-foreground">{s.code}</span>
          </div>
          <ul className="relative mt-5 space-y-2.5">
            {s.items.map((i) => (
              <li
                key={i}
                className="group/i flex items-center gap-2 font-display text-lg tracking-tight md:text-xl"
              >
                <span
                  aria-hidden
                  className="h-px w-0 bg-primary transition-all duration-300 group-hover/i:w-4"
                />
                <span className="transition-colors group-hover/i:text-primary">{i}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ certifications */

/* ------------------------------------------------------------------ work */

function Work() {
  return (
    <div className="space-y-14">
      {projects.map((p) => (
        <ProjectEntry key={p.title} p={p} />
      ))}
    </div>
  );
}

function ProjectEntry({ p }: { p: Project }) {
  const { ref, y } = useParallax(0.06);
  return (
    <article ref={ref} className="grid items-start gap-8 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-5">
        <Terminal p={p} y={y} />
      </div>
      <div className="flex flex-col md:col-span-7">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
            {p.title}
          </h3>
          <span className="ml-auto font-mono text-[11px] text-muted-foreground">{p.year}</span>
        </div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">
          {p.tag}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          {p.description}
        </p>
        <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {p.role}
        </div>
        <Chips items={p.stack} />
        {p.codeHref || p.href ? (
          <div className="mt-7 flex flex-wrap gap-3">
            {p.codeHref ? (
              <a
                href={p.codeHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 border border-dashed border-primary/50 px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/10"
              >
                View code <span aria-hidden>↗</span>
              </a>
            ) : null}
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex h-11 items-center gap-2 overflow-hidden border border-primary px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary"
              >
                <span className="relative z-10 transition-colors group-hover:text-primary-foreground">
                  Live demo
                </span>
                <span
                  aria-hidden
                  className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-primary-foreground"
                >
                  ↗
                </span>
                <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-300 group-hover:translate-x-0" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function Terminal({ p, y }: { p: Project; y: number }) {
  const [phase, setPhase] = useState<"boot" | "preview">("boot");

  const bootMs = 300 + (p.terminal.lines.length + 1) * 350 + 1400;
  const previewMs = 7000;

  useEffect(() => {
    const t = setTimeout(
      () => {
        setPhase((current) => (current === "boot" ? "preview" : "boot"));
      },
      phase === "boot" ? bootMs : previewMs,
    );
    return () => clearTimeout(t);
  }, [phase, bootMs, previewMs]);

  return (
    <div className="relative overflow-hidden border border-primary/30 bg-[#080d18] shadow-[0_20px_60px_-30px_var(--draft)]">
      <div
        aria-hidden
        className="absolute -inset-16 animate-slow-pan bg-gradient-to-br from-primary/40 via-primary/10 to-transparent opacity-40 blur-3xl will-change-transform"
        style={{ transform: `translate3d(0, ${y}px, 0)` }}
      />
      <div className="relative flex h-9 items-center gap-2 border-b border-white/10 bg-white/5 px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto font-mono text-[10px] text-white/50">
          {phase === "boot"
            ? `${p.title.toLowerCase()} — zsh — 80×24`
            : `localhost:3000 — ${p.title.toLowerCase()}`}
        </span>
      </div>

      <div className="relative h-[300px] overflow-hidden md:h-[400px]">
        {phase === "boot" ? (
          <div
            key={`boot-${bootMs}`}
            className="animate-fade-up p-3.5 font-mono text-[11px] leading-[1.75]"
          >
            <div className="text-white/60">
              <span className="text-[#7ee787]">deepanjali@dev</span>
              <span className="text-white/30">:</span>
              <span className="text-[#79c0ff]">~/{p.title.toLowerCase()}</span>
              <span className="text-white/30">$ </span>
              <span className="text-white/90">{p.terminal.cmd}</span>
            </div>
            {p.terminal.lines.map((l, i) => (
              <div
                key={l}
                className="animate-fade-up text-[#79c0ff]/85"
                style={{ animationDelay: `${0.3 + i * 0.35}s` }}
              >
                {l}
              </div>
            ))}
            <div
              className="animate-fade-up text-white/90"
              style={{ animationDelay: `${0.3 + p.terminal.lines.length * 0.35}s` }}
            >
              ✔ {p.terminal.out}
            </div>
            <div
              className="animate-fade-up text-white/50"
              style={{ animationDelay: `${0.5 + p.terminal.lines.length * 0.35}s` }}
            >
              → opening preview…
            </div>
            <div className="mt-1 text-white/60">
              <span className="text-[#7ee787]">deepanjali@dev</span>
              <span className="text-white/30">:</span>
              <span className="text-[#79c0ff]">~/{p.title.toLowerCase()}</span>
              <span className="text-white/30">$ </span>
              <span className="inline-block h-[13px] w-[7px] animate-caret bg-[#79c0ff] align-middle" />
            </div>
          </div>
        ) : (
          <div key={`${p.title}-preview`} className="absolute inset-0 animate-boot-in">
            <div className="absolute inset-0 animate-ken-burns">
              <ProjectPreview project={p} />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-25 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-scan bg-gradient-to-b from-[#79c0ff]/25 to-transparent"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  const isTumorInsight = project.title === "Tumor Insight";

  return (
    <div
      aria-label={`${project.title} interface preview`}
      className="absolute inset-0 animate-boot-in overflow-hidden bg-[#0d1420] p-4 text-white sm:p-6"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/55 sm:text-[10px]">
        <span>{isTumorInsight ? "Tumor Insight / Research" : "EarnVault / Member ledger"}</span>
        <span className="text-[#79c0ff]">UI concept preview</span>
      </div>
      {isTumorInsight ? (
        <div className="grid h-[calc(100%-2.5rem)] grid-cols-[1fr_1.1fr] items-center gap-3 sm:gap-5">
          <div className="relative mx-auto aspect-square w-full max-w-[190px] overflow-hidden rounded-full border border-[#79c0ff]/40 bg-[radial-gradient(ellipse_at_45%_42%,#76879a_0%,#344356_28%,#111d2b_65%,#060b12_100%)] shadow-[0_0_35px_#79c0ff22]">
            <span className="absolute inset-[18%] rounded-full border border-white/15" />
            <span className="absolute inset-[34%] rounded-full border border-white/20" />
            <span className="absolute left-1/2 top-0 h-full w-px bg-white/15" />
            <span className="absolute left-0 top-1/2 h-px w-full bg-white/15" />
            <span className="absolute left-[56%] top-[38%] h-3 w-3 rounded-full bg-[#79c0ff]/80 blur-[2px]" />
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/45 sm:text-[10px]">
              Test accuracy
            </div>
            <div className="font-display text-lg leading-tight sm:text-2xl">Model comparison</div>
            <div className="space-y-2">
              {[
                ["VGG-16", "93.60%"],
                ["ResNet-50", "91.31%"],
              ].map(([label, accuracy]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="w-16 text-[9px] text-white/60 sm:w-20 sm:text-[10px]">
                    {label}
                  </span>
                  <span className="font-mono text-[9px] text-[#79c0ff] sm:text-[10px]">
                    {accuracy}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[9px] leading-relaxed text-white/45 sm:text-[10px]">
              Research project — not a diagnostic tool.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-[1fr_2fr] gap-3 sm:mt-5 sm:gap-5">
          <aside className="space-y-2 border-r border-white/10 pr-2 font-mono text-[8px] text-white/50 sm:space-y-3 sm:text-[9px]">
            <div className="pb-2 text-[9px] uppercase tracking-[0.12em] text-[#79c0ff] sm:text-[10px]">
              Overview
            </div>
            <div>Savings</div>
            <div>Passbook</div>
            <div>Loans</div>
            <div>Profile</div>
          </aside>
          <div className="min-w-0">
            <div className="font-display text-sm sm:text-lg">Member passbook</div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3">
              {[
                ["Total savings", "NPR ••••••"],
                ["Interest earned", "NPR ••••••"],
              ].map(([label, value]) => (
                <div key={label} className="border border-white/10 bg-white/[0.03] p-2 sm:p-3">
                  <div className="text-[8px] text-white/45 sm:text-[9px]">{label}</div>
                  <div className="mt-1 font-mono text-[10px] text-[#79c0ff] sm:text-xs">
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 border border-white/10 sm:mt-4">
              {[
                ["Monthly savings", "Transaction"],
                ["Interest credit", "Transaction"],
                ["Loan repayment", "Transaction"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-2 border-b border-white/10 px-2 py-2 last:border-0 sm:px-3"
                >
                  <span className="truncate text-[8px] text-white/55 sm:text-[9px]">{label}</span>
                  <span className="whitespace-nowrap font-mono text-[8px] text-white/80 sm:text-[9px]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ contact */

function Contact() {
  const { ref, seen } = useInView<HTMLElement>();
  const items = [
    {
      label: "Email",
      value: "deepanjalinagarkoti@gmail.com",
      href: "mailto:deepanjalinagarkoti@gmail.com",
      icon: Mail,
      iconColor: "#EA4335",
      iconTileClass: "border-dashed border-primary/30",
    },
    {
      label: "LinkedIn",
      value: "Deepanjali Nagarkoti",
      href: "https://linkedin.com/in/deepanjali-nagarkoti",
      icon: Linkedin,
      iconColor: "#0A66C2",
      iconTileClass: "border-dashed border-primary/30",
    },
    {
      label: "GitHub",
      value: "github.com/deepanjali00",
      href: "https://github.com/deepanjali00",
      icon: Github,
      iconColor: "#181717",
      iconTileClass: "border-[#f0f0f0] bg-[#f0f0f0]",
    },
  ];
  return (
    <section
      id="contact"
      ref={ref}
      className={`mx-auto max-w-[1500px] px-5 pb-20 md:px-10 md:pb-28 ${
        seen ? "animate-fade-up" : "opacity-0"
      }`}
    >
      <div className="frame relative overflow-hidden bg-card/50 p-6 md:p-12">
        <Ticks />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-24 animate-sweep bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        />
        <div className="relative grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[0.95]">
              Let's draft
              <br />
              something.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Open to full-stack and backend roles, and to freelance builds where the schema matters
              as much as the screen.
            </p>
            <div className="mt-6">
              <a
                href="/cv.pdf"
                download
                className="group relative inline-flex h-11 items-center gap-2 overflow-hidden border border-primary px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary"
              >
                <span className="relative z-10 transition-colors group-hover:text-primary-foreground">
                  Download CV
                </span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-primary-foreground">
                  ↓
                </span>
                <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-300 group-hover:translate-x-0" />
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <ul className="divide-y divide-dashed divide-primary/25 border-y border-dashed border-primary/25">
              {items.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex min-w-0 items-center gap-3 py-4 transition-colors hover:bg-primary/5 sm:gap-4"
                  >
                    <span className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:w-20">
                      {c.label}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center border transition-colors ${
                        c.iconTileClass
                      } ${
                        c.label === "GitHub"
                          ? "group-hover:border-[#f0f0f0] group-hover:bg-[#f0f0f0]"
                          : "group-hover:border-primary group-hover:bg-primary/10"
                      }`}
                    >
                      <c.icon size={16} strokeWidth={1.8} color={c.iconColor} aria-hidden="true" />
                    </span>
                    <span
                      className={`min-w-0 flex-1 font-display text-sm tracking-tight transition-colors group-hover:text-primary sm:text-base md:text-lg ${
                        c.label === "Email" ? "break-all" : "break-words"
                      }`}
                    >
                      {c.value}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 font-mono text-primary transition-transform group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-dashed border-primary/25">
      <div className="mx-auto flex max-w-[1500px] flex-wrap justify-between gap-4 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:px-10">
        <span className="hidden sm:inline">Note: measure twice, migrate once.</span>
        <span>© 2026 Deepanjali Nagarkoti</span>
        <a href="#top" className="transition-colors hover:text-primary">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
