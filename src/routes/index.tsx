import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work4 from "@/assets/work-4.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const projects = [
  {
    n: "01",
    title: "Ember Studio",
    tag: "Brand · Web",
    year: "2025",
    blurb:
      "A cinematic identity system and site for an independent film studio — bold serif logotype, warm palette, editorial motion.",
    img: work1,
  },
  {
    n: "02",
    title: "Arcade Hall",
    tag: "Architecture · Art Direction",
    year: "2024",
    blurb:
      "Visual direction for an architectural exhibition. Long shadows, warm streaks of light, and a wayfinding system that echoes the space.",
    img: work2,
  },
  {
    n: "03",
    title: "Folio Journal",
    tag: "Editorial · Product",
    year: "2024",
    blurb:
      "A quiet writing tool for designers. Thoughtful typography, subtle interactions, and a reading experience that respects the page.",
    img: work4,
  },
];

function useParallax(speed = 0.3) {
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

function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero scrollY={scrollY} />
      <Marquee />
      <Intro />
      <Work />
      <Capabilities />
      <Contact />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 py-6 text-cream">
        <a href="#top" className="font-display text-xl tracking-tight">
          Deepanjali<span className="text-ember">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em]">
          <a href="#work" className="hover:text-ember transition-colors">Work</a>
          <a href="#about" className="hover:text-ember transition-colors">About</a>
          <a href="#contact" className="hover:text-ember transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="text-xs uppercase tracking-[0.2em] border border-current rounded-full px-4 py-2 hover:bg-current hover:text-background transition-colors"
        >
          Let's talk
        </a>
      </div>
    </header>
  );
}

function Hero({ scrollY }: { scrollY: number }) {
  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden grain">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${scrollY * 0.4}px, 0) scale(1.15)` }}
      >
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      <div className="grain-overlay absolute inset-0" />

      <div
        className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-16 md:pb-24"
        style={{ transform: `translate3d(0, ${scrollY * -0.15}px, 0)` }}
      >
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/70 mb-8 animate-fade-up">
          <span className="h-px w-10 bg-ember" />
          Portfolio · 2020 — 2026
        </div>
        <h1 className="font-display text-[clamp(3rem,11vw,11rem)] leading-[0.9] tracking-[-0.03em] text-cream animate-fade-up">
          Designing
          <br />
          <em className="text-ember not-italic font-normal">quiet</em> interfaces
          <br />
          for loud ideas.
        </h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 animate-fade-up">
          <p className="max-w-md text-base md:text-lg text-cream/70 leading-relaxed">
            Independent designer &amp; creative developer based between Kathmandu and the internet.
            Brand systems, editorial sites, and interactive stories.
          </p>
          <a
            href="#work"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-cream"
          >
            <span className="h-10 w-10 rounded-full border border-cream/40 grid place-items-center group-hover:bg-ember group-hover:border-ember group-hover:text-background transition-colors">
              ↓
            </span>
            Scroll to explore
          </a>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Brand Systems", "Editorial Web", "Motion", "Art Direction", "Product Design", "Creative Dev"];
  return (
    <div className="border-y border-border py-6 overflow-hidden bg-secondary/40">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="font-display text-3xl md:text-5xl px-8 flex items-center gap-8">
            {w}
            <span className="text-ember">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Intro() {
  const { ref, y } = useParallax(0.15);
  return (
    <section id="about" ref={ref} className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-32 md:py-48">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            (01) — About
          </div>
        </div>
        <div className="md:col-span-9" style={{ transform: `translate3d(0, ${y}px, 0)` }}>
          <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-[-0.02em]">
            I'm <span className="text-ember">Deepanjali</span> — a designer working at the intersection of
            <em className="not-italic"> editorial craft</em> and <em className="not-italic">interactive systems</em>.
            I partner with founders, studios, and cultural institutions to build brands that read like
            magazines and feel like films.
          </p>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <Stat k="+6" v="Years designing" />
            <Stat k="30+" v="Projects shipped" />
            <Stat k="12" v="Countries" />
            <Stat k="1:1" v="Studio, always" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-t border-border pt-4">
      <div className="font-display text-4xl text-cream">{k}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{v}</div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16 md:mb-24 flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            (02) — Selected Work
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-[-0.02em]">
            Recent <em className="text-ember not-italic">chapters</em>.
          </h2>
        </div>
        <div className="hidden md:block text-xs uppercase tracking-[0.25em] text-muted-foreground">
          2023 — 2026
        </div>
      </div>

      <div className="flex flex-col">
        {projects.map((p, i) => (
          <ProjectRow key={p.n} p={p} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({
  p,
  reverse,
}: {
  p: (typeof projects)[number];
  reverse: boolean;
}) {
  const { ref, y } = useParallax(0.12);
  return (
    <article
      ref={ref}
      className="border-t border-border last:border-b py-16 md:py-24"
    >
      <div
        className={`max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="md:col-span-6 overflow-hidden rounded-sm">
          <img
            src={p.img}
            alt={p.title}
            loading="lazy"
            width={1200}
            height={1500}
            className="w-full h-[60vh] md:h-[75vh] object-cover will-change-transform"
            style={{ transform: `translate3d(0, ${y}px, 0) scale(1.1)` }}
          />
        </div>
        <div className="md:col-span-6 md:pl-10">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
            <span className="text-ember font-mono">{p.n}</span>
            <span className="h-px flex-1 bg-border" />
            <span>{p.year}</span>
          </div>
          <h3 className="font-display text-5xl md:text-7xl tracking-[-0.02em] leading-none">
            {p.title}
          </h3>
          <div className="mt-4 text-sm text-ember uppercase tracking-[0.2em]">{p.tag}</div>
          <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
            {p.blurb}
          </p>
          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] hover:text-ember transition-colors"
          >
            <span className="h-px w-10 bg-current" />
            View case study
          </a>
        </div>
      </div>
    </article>
  );
}

function Capabilities() {
  const items = [
    ["Brand", "Identity systems, logotypes, guidelines, art direction."],
    ["Digital", "Editorial websites, product surfaces, design systems."],
    ["Motion", "Scroll narratives, transitions, cinematic hero moments."],
    ["Consulting", "Design reviews, hiring support, creative sparring."],
  ];
  return (
    <section className="relative bg-secondary/30 border-y border-border py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            (03) — Capabilities
          </div>
          <h2 className="font-display text-4xl md:text-6xl tracking-[-0.02em]">
            What I do,
            <br />
            in <em className="text-ember not-italic">four</em> movements.
          </h2>
        </div>
        <div className="md:col-span-8 grid sm:grid-cols-2 gap-px bg-border">
          {items.map(([k, v]) => (
            <div key={k} className="bg-background p-8 md:p-10">
              <div className="font-display text-3xl mb-4">{k}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-48 grain">
      <div className="grain-overlay absolute inset-0" />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">
          (04) — Get in touch
        </div>
        <h2 className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]">
          Let's make
          <br />
          something <em className="text-ember not-italic">honest</em>.
        </h2>
        <a
          href="mailto:hello@deepanjali.studio"
          className="mt-16 inline-flex items-center gap-4 font-display text-2xl md:text-4xl border-b border-cream/40 hover:border-ember hover:text-ember transition-colors pb-2"
        >
          hello@deepanjali.studio
          <span className="text-ember">↗</span>
        </a>
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <a href="#" className="hover:text-cream">Instagram</a>
          <a href="#" className="hover:text-cream">Are.na</a>
          <a href="#" className="hover:text-cream">Read.cv</a>
          <a href="#" className="hover:text-cream">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <div>© 2026 Deepanjali Nagarkoti — Studio of one.</div>
        <div>Kathmandu · Remote worldwide</div>
        <a href="#top" className="hover:text-ember">Back to top ↑</a>
      </div>
    </footer>
  );
}
