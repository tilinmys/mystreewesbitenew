import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { GoogleTag } from "@/components/google-tag";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/clinic";

const fontSerif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
  // Next requires variable weight loading when custom variable axes are used.
  // The design system below still limits authored weights to 400 and 500 (300 retired 24 Oct 2026: too thin on white).
  weight: "variable",
  style: ["normal", "italic"],
});

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  // 700 is used only by the /about display headings and figures (color.md,
  // "About page: rebuilt to the reference").
  weight: ["400", "500", "600", "700"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  // Resolves relative Open Graph and canonical URLs on every page.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gynaecologist & Women's Health Clinic in Indiranagar, Bengaluru | MyStree",
    template: "%s | MyStree",
  },
  description:
    "MyStree is a women's health clinic on 13th Main Road, Indiranagar, Bengaluru, with gynaecologists, obstetricians, fertility specialists, a nutritionist and a pelvic physiotherapist.",
  applicationName: "MyStree",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "MyStree Women's Health Clinic",
  },
  formatDetection: { telephone: true, address: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSerif.variable} ${fontSans.variable} ${fontMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased text-[#0C161D] bg-[#F8FAFC]">
        <GoogleTag />
        <SmoothScroll>
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
