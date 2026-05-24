/**
 * Landing - "Utility Focus" - ported from Stitch.
 *
 * 5-col hero text + 7-col canvas topology box, then a 4-card hard-bordered
 * utility grid ("Core Utility Architecture v2.4.0"). Editorial EB Garamond
 * for the H1 with italic second line, terracotta insight marker on the hero.
 */

import Link from "next/link";
import { Header, GITHUB_URL } from "@/components/Header";
import { TopologyCanvas } from "@/components/TopologyCanvas";

const PILLARS = [
  {
    n: "01",
    icon: "account_tree",
    title: "Semantic Mapping",
    body:
      "Constructs dense vector representations of statutory text, aligning Vero guidance directly with overarching Finlex legislative intent.",
  },
  {
    n: "02",
    icon: "history",
    title: "Temporal Logic",
    body:
      "Tracks legislative amendments chronologically. Ensures retrieval agents isolate the exact regulatory framework active during the specified tax period.",
  },
  {
    n: "03",
    icon: "forum",
    title: "Agentic Debate",
    body:
      "Deploys adversarial LLM instances to cross-examine proposed tax interpretations against historical Supreme Administrative Court (KHO) rulings.",
  },
  {
    n: "04",
    icon: "format_quote",
    title: "Citations",
    body:
      "Generates immutable, hyperlinked audit trails for every assertion, mapping generated advice directly back to raw source paragraphs.",
  },
];

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <div
        className="mx-auto flex w-full max-w-[1440px] flex-grow flex-col px-6"
        style={{ paddingBlock: "var(--space-9)", gap: "var(--space-9)" }}
      >
        {/* ─── Hero ─── 5/7 split, generous spacing. */}
        <section
          className="grid grid-cols-1 items-center lg:grid-cols-12"
          style={{ gap: "var(--space-7)" }}
        >
          <div
            className="z-10 flex flex-col lg:col-span-5"
            style={{ gap: "var(--space-7)" }}
          >
            <div className="insight-marker" style={{ paddingLeft: "var(--space-5)" }}>
              <h1
                className="font-serif font-medium tracking-tight text-on-surface"
                style={{
                  marginBottom: "var(--space-5)",
                  fontSize: "clamp(40px, 5.5vw, 72px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                RAGTAG
                <br />
                <span className="italic text-on-surface-variant">
                  for Finnish tax law.
                </span>
              </h1>
              <p
                className="text-on-surface-variant"
                style={{
                  maxWidth: "44ch",
                  fontSize: "var(--text-body-lg)",
                  lineHeight: 1.6,
                }}
              >
                <strong>R</strong>etrieval <strong>A</strong>ugmented{" "}
                <strong>G</strong>raph <strong>T</strong>ax{" "}
                <strong>A</strong>nswer <strong>G</strong>enerator. A
                multi-agent retrieval and reasoning loop over Finlex and Vero
                that walks a typed legal graph to resolve complex regulatory
                questions with cited answers.
              </p>
            </div>
            <div
              className="flex flex-col sm:flex-row"
              style={{ gap: "var(--space-3)", paddingLeft: "var(--space-5)" }}
            >
              <Link href="/ask" className="btn-primary group">
                Initialize Workspace
                <span
                  className="material-symbols-outlined transition-transform group-hover:translate-x-1"
                  style={{ fontSize: "var(--icon-md)" }}
                >
                  arrow_forward
                </span>
              </Link>
              <Link href="/methodology" className="btn-secondary">
                Methodology
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group inline-flex items-center"
                style={{ gap: "var(--space-2)" }}
                aria-label="Source on GitHub (behramulukir/prompt-hackathon-taxxa)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="18"
                  height="18"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                </svg>
                Source
              </a>
            </div>
          </div>

          {/* TOPOLOGY CANVAS - contained hero visualization */}
          <div className="relative h-[400px] overflow-hidden border border-outline-variant bg-surface-container-lowest lg:col-span-7 lg:h-[600px]">
            <div className="absolute right-4 top-4 z-10 system-label">
              SYS.VIS.01 // TOPOLOGY
            </div>
            <TopologyCanvas />
          </div>
        </section>

        {/* ─── Core Utility Architecture ─── 4-pillar grid, hairline-divided. */}
        <section
          className="flex flex-col"
          style={{ gap: "var(--space-6)" }}
        >
          <div
            className="flex items-center border-b border-outline-variant"
            style={{ gap: "var(--space-4)", paddingBottom: "var(--space-3)" }}
          >
            <h2
              className="font-serif font-medium text-on-surface"
              style={{ fontSize: "var(--text-h3)", lineHeight: 1.15 }}
            >
              Core Utility Architecture
            </h2>
            <span className="system-label">v2.4.0</span>
          </div>

          <div className="grid grid-cols-1 border-l border-t border-outline-variant md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div
                key={p.n}
                className="group relative flex flex-col border-b border-r border-outline-variant bg-surface-container-lowest transition-colors hover:bg-surface"
                style={{ padding: "var(--space-6)", gap: "var(--space-3)" }}
              >
                <div
                  className="absolute font-mono text-outline-variant"
                  style={{
                    right: "var(--space-4)",
                    top: "var(--space-4)",
                    fontSize: "var(--text-meta)",
                  }}
                >
                  {p.n}
                </div>
                <div
                  className="flex items-center justify-center border border-outline-variant transition-colors group-hover:border-secondary"
                  style={{
                    width: 40,
                    height: 40,
                    marginBottom: "var(--space-3)",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-on-surface"
                    style={{ fontSize: "var(--icon-md)" }}
                  >
                    {p.icon}
                  </span>
                </div>
                <h3
                  className="font-sans font-medium text-on-surface"
                  style={{ fontSize: "var(--text-h4)", lineHeight: 1.3 }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-sans text-on-surface-variant"
                  style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.55 }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
