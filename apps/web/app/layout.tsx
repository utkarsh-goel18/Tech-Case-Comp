import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRIMUS ’26",
  description: "The live competition workspace for PRIMUS ’26",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#101815" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
