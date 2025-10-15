import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Listing Writer",
  description: "Generate real estate listings with AI",
  manifest: "/manifest.json",
  themeColor: "#00796B",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-512.png",
  },
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Explicit PWA manifest + favicon links */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-512.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <meta name="theme-color" content="#00796B" />
      </head>
      <body
        style={{
          margin: 0,
          backgroundColor: "#F8FAFC",
          fontFamily: "Inter, sans-serif",
          color: "#222",
        }}
      >
        {children}
      </body>
    </html>
  );
}
