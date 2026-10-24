import { createFileRoute, Link as RouterLink } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Deepanjali Nagarkoti — Software Engineer" },
      {
        name: "description",
        content:
          "Software engineer building full-stack web applications, REST APIs and ML-powered tools. Blueprint of my experience, skills and shipped work.",
      },
      { property: "og:title", content: "Deepanjali Nagarkoti — Software Engineer" },
      {
        property: "og:description",
        content: "Full-stack web applications, REST APIs and ML-powered tools.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og.jpg" },
    ],
  }),
});

/* ------------------------------------------------------------------ data */

type Project = {
  n: string;
  title: string;
  tag: string;
  year: string;
  role: string;
  description: string;
  stack: string[];
  href?: string;
  terminal: { cmd: string; out: string; lines: string[] };
};

const projects: Project[] = [
  {
    n: "01",
    title: "Tumor Insight",
    tag: "Brain Tumor Classification System",
    year: "2024",
    role: "Full-stack — ML & Web",
    description:
      "Web app that classifies brain MRI scans into glioma, meningioma, pituitary or no tumor. VGG-16 and ResNet-50 implemented from scratch in TensorFlow/Keras without pretrained weights, trained on 7,023 MRI images and reaching 93.60% (VGG-16) and 91.31% (ResNet-50) test accuracy. Includes upload validation, three free attempts before login, a daily limit for registered users, a report for each result and nearby-doctor suggestions.",
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
    n: "02",
    title: "EarnVault",
    tag: "Microfinance & Savings Platform",
    year: "2025",
    role: "Full-stack — Backend & Web Dashboard",
    description:
      "Monorepo (Turborepo) with a responsive PWA, an admin dashboard and a NestJS API. The PWA lets members complete KYC, upload documents, track savings and apply for loans; the admin dashboard handles financial reporting and loan management. Implemented savings, interest accrual, microloans, EMI calculations and transaction tracking, and made monthly interest crediting safe to re-run so no month is credited twice.",
    stack: ["React", "NestJS", "PostgreSQL", "PWA", "Turborepo"],
    href: "https://earnvault.app",
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
  {
    n: "03",
    title: "Heatwave Forecasting",
    tag: "Anticipatory Action Dashboard",
    year: "2025",
    role: "Full-stack — Frontend & Integration",
    description:
      "Leaflet-based forecasting dashboard with real-time DHM weather data, interactive WMS maps and multiple models (DHMWRF, GFS), optimised with React Query caching. Built for anticipatory action, surfacing heatwave risk to responders.",
    stack: ["React", "Leaflet", "React Query", "TypeScript", "WMS"],
    terminal: {
      cmd: "pnpm dev",
      out: "Heatwave dashboard ready · :5173",
      lines: [
        "[Vite] LOG  dev server running · :5173",
        "[WMS]  LOG  DHM layers loaded · 4 sources",
        "[RQ]   LOG  cache warmed · forecast models",
      ],
    },
  },
  {
    n: "04",
    title: "Civic Alert Platform",
    tag: "Citizen Incident Reporting",
    year: "2025",
    role: "Full-stack — API & Web",
    description:
      "Citizen alert and incident-reporting platform: REST APIs, database models and responsive interfaces, incident management workflows, JWT/OTP login, Mapbox-based maps and multilingual support.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Mapbox"],
    terminal: {
      cmd: "pnpm nest start",
      out: "Civic alert API ready · :3000",
      lines: [
        "[Nest] LOG  Mapped {/incidents, GET}",
        "[Auth] LOG  JWT/OTP gateway ready",
        "[Map]  LOG  Mapbox token loaded",
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
    points: [
      "Built and maintained full-stack web applications for civic technology, fintech and disaster-response projects, mainly with TypeScript, Next.js, NestJS, Prisma and PostgreSQL.",
      "On a citizen alert and incident-reporting platform, designed the REST APIs, database models and responsive interfaces, and implemented incident management workflows, JWT/OTP login, Mapbox-based maps and multilingual support.",
      "Built a Leaflet-based forecasting dashboard with real-time DHM weather data, interactive WMS maps and multiple models (DHMWRF, GFS), optimised with React Query caching.",
      "Developed reusable UI components and shared SDKs, contributing to debugging, refactoring and deployment.",
    ],
    stack: ["TypeScript", "Next.js", "NestJS", "Prisma", "PostgreSQL", "Mapbox", "React Query"],
  },
  {
    role: "Software Engineer Trainee",
    company: "TEJ Center",
    period: "Feb 2025 — Jun 2025",
    place: "Lalitpur, Nepal",
    points: [
      "Completed an intensive full-stack traineeship and built applications with JavaScript, React.js, Node.js, REST APIs and databases.",
      "Built frontend and backend features in an Agile team, using Git and GitHub for version control and collaboration.",
      "Wrote unit, integration and end-to-end tests with Jest and Cypress to catch bugs and confirm that features worked as expected.",
    ],
    stack: ["JavaScript", "React", "Node.js", "REST APIs", "Jest", "Cypress"],
  },
];

const education = [
  {
    school: "Prime College (affiliated with Tribhuvan University)",
    degree: "B.Sc. Computer Science & Information Technology",
    period: "2021 — 2025",
    note: "First Division, 75.60% (top 5% of batch). Core coursework: Data Structures and Algorithms, Design and Analysis of Algorithms, Database Systems, Operating Systems, Artificial Intelligence, Software Engineering, Discrete Structures, Calculus and Differential Equations, Linear Algebra, Probability and Statistics, and Numerical Methods.",
  },
];

const skills = [
  { group: "Languages", code: "LNG", items: ["JavaScript", "TypeScript", "SQL", "Python"] },
  {
    group: "Web Development",
    code: "WEB",
    items: ["React", "Next.js", "Node.js", "NestJS", "Express.js", "HTML", "Tailwind CSS", "REST APIs"],
  },
  {
    group: "Databases & Tools",
    code: "DB",
    items: ["PostgreSQL", "Supabase", "Prisma ORM", "MongoDB", "Git", "GitHub", "Docker", "Postman", "Agile/Scrum"],
  },
  {
    group: "ML & Data",
    code: "ML",
    items: ["TensorFlow/Keras", "NumPy", "Pandas", "Matplotlib", "CNNs", "scikit-learn", "Model Evaluation"],
  },
];

const certifications = [
  {
    title: "Full Stack Open",
    org: "University of Helsinki",
    date: "Mar 2025",
    note: "Practical full-stack web development using React, Node.js, REST APIs, databases, and TypeScript.",
    href: "https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/8eeb3a5c21ed20e936338ee1c66a21f6",
  },
  {
    title: "Advanced Learning Algorithms",
    org: "DeepLearning.AI",
    date: "Apr 2024",
    note: "Neural networks with TensorFlow, model evaluation, and decision tree ensemble methods.",
    href: "https://coursera.org/share/724eca0a5d7c6759f8acdd33527d6b1c",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    org: "DeepLearning.AI",
    date: "Feb 2024",
    note: "Built supervised machine learning models in Python using NumPy and scikit-learn for regression and binary classification.",
    href: "https://coursera.org/share/95e74d45077080824bcfb33a095eae4d",
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
        <Plate id="experience" code="A-01" label="Experience" meta="2025 —">
          <Timeline items={experience.map(expToNode)} />
        </Plate>
        <Plate id="education" code="A-02" label="Education" meta="2021 — 2025">
          <Timeline items={education.map(eduToNode)} />
        </Plate>
        <Plate id="skills" code="A-03" label="Skills" meta="Toolset">
          <Skills />
        </Plate>
        <Plate id="certifications" code="A-04" label="Certifications" meta="Credentials">
          <Certifications />
        </Plate>
        <Plate id="work" code="A-05" label="Selected Work" meta="Build log">
          <Work />
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
          <span className="text-primary/70">Software Developer</span>
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
          <RouterLink
            to="/blog"
            className="px-3.5 py-2.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
          >
            Blog
          </RouterLink>
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

function Plate({
  id,
  code,
  label,
  meta,
  children,
}: {
  id: string;
  code: string;
  label: string;
  meta?: string;
  children: React.ReactNode;
}) {
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
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-dashed border-primary/25 pb-4 md:mb-12">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-primary">{code}</span>
            <h2 className="font-display text-2xl font-semibold md:text-4xl">{label}</h2>
          </div>
          {meta ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {meta}
            </span>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1500px] px-5 pb-20 pt-14 md:px-10 md:pb-28 md:pt-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-ring" />
            Sheet 01 — Available for work
          </div>
          <h1 className="font-display text-[clamp(2.8rem,9vw,8.5rem)] font-bold leading-[0.9]">
            <span className="block animate-fade-up">Systems</span>
            <span
              className="block animate-fade-up text-primary"
              style={{ animationDelay: "0.12s" }}
            >
              that hold
            </span>
            <span className="block animate-fade-up" style={{ animationDelay: "0.24s" }}>
              under load.
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I'm <span className="text-foreground">Deepanjali</span>, a full-stack developer who
            designs the schema, writes the API and ships the interface. I've built
            disaster-response dashboards, civic alert platforms and cooperative fintech, and I'm
            now moving into applied ML.
          </p>
        </div>

        {/* spec card */}
        <aside className="md:col-span-4">
          <div className="frame relative h-full animate-float-slow bg-card/60 p-5 backdrop-blur-sm">
            <Ticks />
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Specification
            </div>
            <dl className="mt-5 space-y-3 font-mono text-[11px]">
              {[
                ["Role", "Software Engineer"],
                ["Base", "Kathmandu, NP · UTC+5:45"],
                ["Focus", "Full-stack · ML"],
                ["Scale", "Web apps & AI"],
                ["Languages", "Nepali · English (C2)"],
                ["Status", "Open to roles · relocation"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-2">
                  <dt className="uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
                  <span
                    aria-hidden
                    className="mx-1 flex-1 border-b border-dotted border-primary/35"
                  />
                  <dd className="text-right text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-primary/60 to-transparent" />
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Rev. 2026.01 — scale 1:1
            </div>
          </div>
        </aside>
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
    meta: `${e.period}  ·  ${e.company}  ·  ${e.place}`,
    body: (
      <>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground md:text-base">
          {e.points.map((pt) => (
            <li key={pt} className="flex gap-3">
              <span aria-hidden className="pt-1 font-mono text-[10px] text-primary">
                ▸
              </span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
        <Chips items={e.stack} />
      </>
    ),
  };
}

function eduToNode(e: (typeof education)[number]): TimelineNode {
  return {
    key: e.school,
    title: e.degree,
    meta: `${e.period}  ·  ${e.school}`,
    body: e.note ? (
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {e.note}
      </p>
    ) : null,
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
                reached ? "translate-x-0 opacity-100" : "translate-x-2 opacity-45"
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

function Certifications() {
  return (
    <div className="space-y-4">
      {certifications.map((c) => (
        <a
          key={c.title}
          href={c.href}
          target="_blank"
          rel="noreferrer"
          className="group block border border-dashed border-primary/25 p-5 transition-colors hover:border-primary hover:bg-primary/5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-semibold tracking-tight md:text-xl">
              {c.title}
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {c.org} · {c.date}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            {c.note}
          </p>
          <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            View certificate ↗
          </span>
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ work */

function Work() {
  return (
    <div className="space-y-14">
      {projects.map((p) => (
        <ProjectEntry key={p.n} p={p} />
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
          <span className="font-mono text-[11px] text-primary">{p.n}</span>
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
        {p.href ? (
          <div className="mt-7">
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
          <div className="absolute inset-0 animate-boot-in">
            {previews.map((pv, i) => (
              <img
                key={pv.src}
                src={pv.src}
                alt={`${p.title} preview — ${pv.label}`}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  i === slide
                    ? "animate-ken-burns opacity-100 blur-0"
                    : i < slide
                      ? "-translate-x-6 scale-105 opacity-0 blur-md"
                      : "translate-x-6 scale-105 opacity-0 blur-md"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d18]/90 via-[#080d18]/10 to-[#080d18]/40" />
            <div className="pointer-events-none absolute inset-0 opacity-25 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-scan bg-gradient-to-b from-[#79c0ff]/25 to-transparent" />

            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
              <span key={slide} className="animate-fade-up font-mono text-[10px] text-[#79c0ff]">
                {previews[slide]?.label}
              </span>
              <div className="ml-auto flex gap-1.5">
                {previews.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 transition-all duration-500 ${
                      i === slide ? "w-6 bg-[#79c0ff]" : "w-2 bg-white/25"
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

/* ------------------------------------------------------------------ contact */

function Contact() {
  const { ref, seen } = useInView<HTMLElement>();
  const items = [
    { label: "Email", value: "deepanjalinagarkoti@gmail.com", href: "mailto:deepanjalinagarkoti@gmail.com" },
    { label: "LinkedIn", value: "Deepanjali Nagarkoti", href: "https://linkedin.com/in/deepanjali-nagarkoti" },
    { label: "Website", value: "deepanjalinagarkoti.com.np", href: "https://deepanjalinagarkoti.com.np" },
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
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              A-05 — Contact
            </div>
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
                href="/cv.txt"
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
                    className="group flex items-center gap-4 py-4 transition-colors hover:bg-primary/5"
                  >
                    <span className="w-20 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {c.label}
                    </span>
                    <span className="font-display text-base tracking-tight transition-colors group-hover:text-primary md:text-lg">
                      {c.value}
                    </span>
                    <span
                      aria-hidden
                      className="ml-auto font-mono text-primary transition-transform group-hover:translate-x-1"
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
        <span className="hidden sm:inline">Sheet 01 of 01 — rev. 2026.01</span>
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
