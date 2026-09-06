import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster as SonnerToaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ULTRABULB IT — We Code Your Ideas Into Light",
  description:
    "ULTRABULB IT is a software development agency crafting custom software, cloud, AI and digital products that power businesses worldwide.",
  keywords: [
    "ULTRABULB IT",
    "software development",
    "custom software",
    "cloud",
    "AI",
    "web development",
    "IT agency",
  ],
  authors: [{ name: "ULTRABULB IT" }],
  openGraph: {
    title: "ULTRABULB IT — We Code Your Ideas Into Light",
    description:
      "Custom software, cloud, AI and digital products that power businesses worldwide.",
    siteName: "ULTRABULB IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ULTRABULB IT",
    description:
      "Custom software, cloud, AI and digital products that power businesses worldwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ULTRABULB IT",
    description:
      "Software development agency crafting custom software, cloud, AI and digital products.",
    url: "https://ultrabulb.com",
    logo: "/logo.svg",
    sameAs: [],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="ultrabulb-theme"
          disableTransitionOnChange={false}
        >
          {children}
          <SonnerToaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
