import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BRAND_FOUNDATION_NAME, BRAND_LIBRARY_NAME } from "@/lib/brand";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: BRAND_LIBRARY_NAME,
    template: `%s | ${BRAND_LIBRARY_NAME}`,
  },
  description: `${BRAND_FOUNDATION_NAME} — community access to books and learning resources.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-svh flex-col bg-white text-green-forest">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
