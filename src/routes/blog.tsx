import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Blog — Deepanjali Nagarkoti" },
      {
        name: "description",
        content:
          "Notes on backend architecture, Postgres performance, and shipping full-stack products for emerging markets.",
      },
      { property: "og:title", content: "Blog — Deepanjali Nagarkoti" },
      {
        property: "og:description",
        content: "Notes on backend architecture, Postgres performance, and shipping full-stack products.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const posts = [
  {
    title: "Accruing interest daily, crediting monthly",
    date: "Jun 2026",
    read: "6 min",
    excerpt:
      "How I modelled savings interest in Postgres without floating-point drift, and why the cron job writes ledger rows instead of mutating balances.",
  },
  {
    title: "A monorepo that three apps actually share",
    date: "Apr 2026",
    read: "8 min",
    excerpt:
      "NestJS API, Next.js dashboard and a React Native PWA in one repo — the boundaries that kept the shared types honest.",
  },
  {
    title: "Designing for slow networks",
    date: "Feb 2026",
    read: "5 min",
    excerpt:
      "Offline-first passbooks, optimistic writes and a 40kb critical path: what it takes for a fintech PWA to work on 2G.",
  },
];

function Blog() {
  return (
    <main className="min-h-screen bg-[#0b0b0d] text-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <Link
          to="/"
          className="text-[11px] tracking-[0.24em] uppercase opacity-60 hover:opacity-100 transition-opacity"
        >
          ← Back
        </Link>
        <h1 className="mt-10 font-display font-black leading-[0.95] tracking-[-0.03em] text-[clamp(2.75rem,9vw,6rem)]">
          Writing.
        </h1>
        <p className="mt-6 max-w-xl opacity-70 leading-relaxed">
          Occasional notes on backend architecture, database performance, and building products that
          have to work on bad connections.
        </p>

        <div className="mt-14 border-y border-white/15 divide-y divide-white/10">
          {posts.map((p) => (
            <article key={p.title} className="py-8 group">
              <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.18em] opacity-50">
                <span>{p.date}</span>
                <span>·</span>
                <span>{p.read}</span>
              </div>
              <h2 className="mt-3 font-display text-2xl md:text-3xl tracking-[-0.02em] group-hover:opacity-70 transition-opacity">
                {p.title}
              </h2>
              <p className="mt-3 text-sm md:text-base leading-relaxed opacity-70 max-w-2xl">
                {p.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
