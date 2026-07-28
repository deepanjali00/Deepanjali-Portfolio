import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work4 from "@/assets/work-4.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const projects = [
  { n: "01", title: "Ember Studio", tag: "Brand · Web", year: "2025", img: work1 },
  { n: "02", title: "Arcade Hall", tag: "Art Direction", year: "2024", img: work2 },
  { n: "03", title: "Folio Journal", tag: "Editorial · Product", year: "2024", img: work4 },
  { n: "04", title: "Northlight", tag: "Identity", year: "2023", img: heroBg },
];

function Portfolio() {
  const [dark, setDark] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <main className={`min-h-screen ${dark ? "bg-[#0b0b0d] text-white" : "bg-[#f4f2ee] text-[#0b0b0d]"} transition-colors duration-500 overflow-x-hidden`}>
      <TopBar dark={dark} setDark={setDark} view={view} setView={setView} />
      <Hero />
      <Work view={view} />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}

function TopBar({
  dark, setDark, view, setView,
}: { dark: boolean; setDark: (v: boolean) => void; view: "grid" | "list"; setView: (v: "grid" | "list") => void }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-6 px-6 md:px-12 py-6">
        {/* Left: name + location */}
        <div className="flex items-baseline gap-3 text-[13px] tracking-[0.14em]">
          <span className="font-semibold uppercase">Deepanjali Nagarkoti</span>
          <span className="opacity-50 uppercase hidden sm:inline">Kathmandu, NP</span>
        </div>

        {/* Center: view toggle pill */}
        <div className={`hidden md:flex items-center rounded-full p-1 ${dark ? "bg-white/5 ring-1 ring-white/10" : "bg-black/5 ring-1 ring-black/10"}`}>
          <button
            aria-label="Grid view"
            onClick={() => setView("grid")}
            className={`h-10 w-12 rounded-full grid place-items-center transition-colors ${
              view === "grid"
                ? (dark ? "bg-white text-black" : "bg-black text-white")
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <GridIcon />
          </button>
          <button
            aria-label="List view"
            onClick={() => setView("list")}
            className={`h-10 w-12 rounded-full grid place-items-center transition-colors ${
              view === "list"
                ? (dark ? "bg-white text-black" : "bg-black text-white")
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <ListIcon />
          </button>
        </div>

        {/* Right: socials + contact + theme */}
        <div className="flex items-center gap-4 md:gap-6 text-[13px] tracking-[0.14em] uppercase">
          {[
            ["TW", "https://twitter.com"],
            ["IG", "https://instagram.com"],
            ["DRIB", "https://dribbble.com"],
            ["LIN", "https://linkedin.com"],
          ].map(([label, href]) => (
            <a key={label} href={href} className="hidden sm:inline-flex items-center gap-0.5 opacity-70 hover:opacity-100 transition-opacity">
              {label}<span className="text-[10px]">↗</span>
            </a>
          ))}
          <a href="#contact" className="font-semibold hover:opacity-70 transition-opacity">Contacts</a>
          <button
            aria-label="Toggle theme"
            onClick={() => setDark(!dark)}
            className={`h-9 w-9 rounded-full grid place-items-center ${dark ? "ring-1 ring-white/20 hover:bg-white/10" : "ring-1 ring-black/20 hover:bg-black/5"} transition-colors`}
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
          Shaping<br />what's next.
        </h1>
        <p className="md:col-span-4 text-base md:text-lg leading-relaxed opacity-70 md:pb-6">
          I lead, design and help build strategic solutions for products, digital experiences and brands that play meaningful roles in people's lives.
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
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [speed]);
  return { ref, y };
}

function Work({ view }: { view: "grid" | "list" }) {
  return (
    <section id="work" className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
      {view === "grid" ? (
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {projects.map((p) => <ProjectCard key={p.n} p={p} />)}
        </div>
      ) : (
        <ul className="border-t border-current/15">
          {projects.map((p) => (
            <li key={p.n} className="border-b border-current/15 py-6 md:py-8 flex items-center justify-between gap-6 group cursor-pointer">
              <div className="flex items-center gap-6 md:gap-10">
                <span className="text-xs opacity-40 font-mono">{p.n}</span>
                <span className="font-display text-3xl md:text-5xl tracking-[-0.02em]">{p.title}</span>
              </div>
              <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] opacity-60">
                <span>{p.tag}</span>
                <span>{p.year}</span>
                <span className="group-hover:translate-x-1 transition-transform">↗</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  const { ref, y } = useParallax(0.12);
  return (
    <article ref={ref} className="group">
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-black/20">
        <img
          src={p.img}
          alt={p.title}
          loading="lazy"
          className="absolute inset-0 h-[120%] w-full object-cover will-change-transform"
          style={{ transform: `translate3d(0, ${y}px, 0) scale(1.05)` }}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <div className="font-display text-2xl md:text-3xl tracking-[-0.02em]">{p.title}</div>
          <div className="text-xs uppercase tracking-[0.2em] opacity-60 mt-1">{p.tag}</div>
        </div>
        <span className="text-xs font-mono opacity-50">{p.year}</span>
      </div>
    </article>
  );
}

function About() {
  return (
    <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-current/15">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3 text-xs uppercase tracking-[0.2em] opacity-60">(About)</div>
        <div className="md:col-span-9">
          <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-[-0.02em]">
            Independent designer working at the intersection of editorial craft and interactive systems.
            I partner with founders, studios, and cultural institutions to build brands that read like magazines and feel like films.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-40 border-t border-current/15">
      <div className="text-xs uppercase tracking-[0.2em] opacity-60 mb-8">(Get in touch)</div>
      <h2 className="font-display font-black leading-[0.9] tracking-[-0.03em] text-[clamp(3rem,10vw,10rem)]">
        Let's make<br />something honest.
      </h2>
      <a
        href="mailto:hello@deepanjali.studio"
        className="mt-12 inline-flex items-center gap-3 font-display text-2xl md:text-4xl border-b border-current pb-2 hover:opacity-70 transition-opacity"
      >
        hello@deepanjali.studio<span>↗</span>
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-current/15">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8 flex flex-wrap justify-between gap-4 text-xs uppercase tracking-[0.2em] opacity-60">
        <span>© 2026 Deepanjali Nagarkoti</span>
        <span>Kathmandu · Remote worldwide</span>
        <a href="#" className="hover:opacity-100">Back to top ↑</a>
      </div>
    </footer>
  );
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="5" height="5" rx="1" fill="currentColor"/><rect x="9.5" y="1.5" width="5" height="5" rx="1" fill="currentColor"/><rect x="1.5" y="9.5" width="5" height="5" rx="1" fill="currentColor"/><rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="currentColor"/></svg>
  );
}
function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
  );
}
function SunIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>);
}
function MoonIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>);
}
