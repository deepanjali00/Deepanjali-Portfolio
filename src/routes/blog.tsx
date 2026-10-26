import { createFileRoute, Link } from "@tanstack/react-router";

const articleUrl =
  "https://medium.com/@deepanjalinagarkoti/stop-copy-pasting-google-login-understand-oauth-passport-google-strategy-in-nestjs-e21ff5c00775";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Writing — Deepanjali Nagarkoti" },
      {
        name: "description",
        content: "An article about understanding OAuth and Google login in NestJS.",
      },
      { property: "og:title", content: "Writing — Deepanjali Nagarkoti" },
      {
        property: "og:description",
        content: "An article about understanding OAuth and Google login in NestJS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Blog() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[900px] px-6 py-16 md:px-12 md:py-24">
        <Link
          to="/"
          className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back
        </Link>
        <h1 className="mt-10 font-display text-[clamp(2.75rem,9vw,6rem)] font-black leading-[0.95] tracking-[-0.03em]">
          Writing.
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
          Notes on backend architecture, authentication, and building full-stack products.
        </p>

        <article className="mt-14 border-y border-dashed border-primary/25 py-8">
          <h2 className="font-display text-2xl tracking-[-0.02em] md:text-3xl">
            Stop Copy-Pasting Google Login: Understand OAuth, Passport &amp; Google Strategy in
            NestJS
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            A walkthrough of the OAuth flow and how Passport&apos;s Google Strategy fits into a
            NestJS application.
          </p>
          <a
            href={articleUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex font-mono text-[10px] uppercase tracking-[0.18em] text-primary hover:underline"
          >
            Read on Medium ↗
          </a>
        </article>
      </div>
    </main>
  );
}
