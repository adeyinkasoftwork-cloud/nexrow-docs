import type { Metadata, Viewport } from "next";
import { site } from "@/content/content";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name}: ${site.tagline}`,
  description:
    "Nexrow is a single shareable link that holds a client's USDC in escrow the moment a deal is agreed, and releases it to the freelancer on approval in seconds.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0d" },
  ],
};

/**
 * Runs before paint, so the correct theme class is on <html> from the first
 * frame. Without this, a dark-mode visitor sees a white flash on every load.
 *
 * It also stamps `js`, which is what gates the scroll-reveal's hidden start
 * state. Setting it here rather than from React means the reveal never flashes
 * its content before hiding it, and a visitor without JavaScript simply gets
 * the page with no animation instead of a page of invisible sections.
 */
const noFlashScript = `
(function() {
  document.documentElement.classList.add('js');
  try {
    var stored = localStorage.getItem('nexrow-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
