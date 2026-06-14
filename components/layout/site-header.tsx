import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { MainNav } from "@/components/layout/main-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-topbar border-b border-[#07593E]/[0.06] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-container items-center gap-6 px-6 md:px-12">
        <Link href="/" className="no-underline hover:opacity-90">
          <BrandLogo variant="navbar" priority />
        </Link>
        <MainNav />
        <div className="ml-auto hidden items-center gap-3 sm:flex">
          <Link
            href="/login"
            className="px-3 py-2 font-body text-body-sm font-medium text-green-forest no-underline transition-colors hover:text-green-nature"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-green-forest px-4 py-2 font-body text-body-sm font-medium text-white no-underline transition-colors hover:bg-green-forest/90"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
