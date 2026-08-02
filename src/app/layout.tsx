import type { Metadata, Viewport } from "next";
import { Sora, Inter, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { Loader } from "@/components/chrome/Loader";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Utility face — spec figures, eyebrows, and data labels
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vidatech.pk"),
  title: {
    default: "VidaTech — Drinking water, made from thin air",
    template: "%s — VidaTech",
  },
  description:
    "VidaTech — atmospheric water generators for Pakistan. Clean drinking water made from air. Exclusive GENAQ partner.",
  keywords: [
    "atmospheric water generator",
    "AWG Pakistan",
    "GENAQ Pakistan",
    "drinking water from air",
    "water scarcity Pakistan",
    "off-grid water",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "VidaTech",
    title: "VidaTech — Drinking water, made from thin air",
    description:
      "Atmospheric water generators for Pakistan. Clean drinking water made from air. Exclusive GENAQ partner.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VidaTech — Drinking water, made from thin air",
    description:
      "Atmospheric water generators for Pakistan. Exclusive GENAQ partner.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfcfc",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${inter.variable} ${plexMono.variable} antialiased`}
      >
        <Loader />
        <a
          href="#main"
          className="sr-only rounded-full bg-navy px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110]"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
