import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Sans } from "next/font/google";
import "./globals.css";

/**
 * Deliberately minimal. Font loading and <html>/<body> live here because
 * both the public site AND /admin use them. Everything else — the brand
 * fetch, <Navbar>, <Footer> — lives in (site)/layout.tsx instead of here.
 *
 * Next.js nests layouts, so anything in a root layout wraps EVERY route,
 * /admin included. An earlier version of this file fetched CMS brand
 * content and rendered the public Navbar/Footer directly here, which
 * quietly forced the admin dashboard to render inside the marketing
 * chrome too, and forced every /admin/* page to depend on a Firestore
 * read just to build. Route groups fix both problems: (site)/ gets the
 * public shell, admin/ gets its own sidebar shell, and only the actual
 * public pages pay for the content fetch.
 */

const display = Instrument_Sans({
  subsets: ["latin"],
  variable: "--next-font-display",
  display: "swap",
});
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--next-font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--next-font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://calliexgroup.co"),
  title: {
    default: "Callie X Group \u2014 Fintech, Real Estate & Trade",
    template: "%s \u2014 Callie X Group",
  },
  description:
    "Callie X Group is a Nigerian fintech and investment conglomerate spanning digital finance, real estate, automobiles, and China trade sourcing.",
  openGraph: {
    title: "Callie X Group",
    description: "Building simple solutions for complex problems.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
