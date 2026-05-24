import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono, EB_Garamond } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindSafelist } from "@/components/TailwindSafelist";
import { NavigationProgress } from "@/components/NavigationProgress";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://taxxa-graphrag-demo.vercel.app";
const TITLE = "RAGTAG - Retrieval Augmented Graph Tax Answer Generator";
const SHORT_TITLE = "RAGTAG - Finnish tax GraphRAG";
const DESCRIPTION =
  "Multi-agent GraphRAG over the Finnish tax-law corpus (Finlex + Vero + KHO case law + treaties). Typed temporal graph, agent debate, cited answers. Aalto Prompt Finance Hackathon 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s - RAGTAG",
  },
  description: DESCRIPTION,
  applicationName: "RAGTAG",
  keywords: [
    "RAGTAG",
    "Taxxa",
    "Finnish tax law",
    "Finlex",
    "Vero",
    "GraphRAG",
    "RAG",
    "retrieval augmented generation",
    "knowledge graph",
    "legal AI",
    "Aalto Prompt Finance Hackathon",
    "tax research",
  ],
  authors: [{ name: "Team Lex Atlas / RAGTAG" }],
  creator: "Team Lex Atlas / RAGTAG",
  publisher: "Team Lex Atlas / RAGTAG",
  category: "Legal technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "RAGTAG",
    title: SHORT_TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SHORT_TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${ebGaramond.variable} light`}
    >
      <head>
        {/* Material Symbols - loaded async, won't block paint */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-screen bg-background text-on-surface antialiased">
        <div className="architectural-grid" aria-hidden />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TailwindSafelist />
          {/* Wrapped in Suspense because NavigationProgress reads
              useSearchParams(), which would otherwise force the whole
              tree out of static optimization. */}
          <Suspense fallback={null}>
            <NavigationProgress />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
