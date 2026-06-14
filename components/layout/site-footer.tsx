import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { BRAND_FOUNDATION, BRAND_LIBRARY_NAME } from "@/lib/brand";

const footerLinks = [
  { href: "/books", label: "Books" },
  { href: "/dashboard", label: "My Library" },
  { href: "/signup", label: "Membership" },
  { href: "/login", label: "Login" },
  { href: "/admin", label: "Admin" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#07593E]/[0.06] bg-[#F8FDF4]">
      <div className="mx-auto max-w-container px-6 py-6 md:px-12 md:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo variant="footer" />
            <p className="font-body text-body-sm text-text-secondary">
              {BRAND_LIBRARY_NAME}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-body-sm text-text-secondary no-underline transition-colors hover:text-green-forest"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-4 border-t border-[#07593E]/[0.06] pt-4">
          <p className="font-body text-label text-text-secondary/60">
            &copy; {new Date().getFullYear()} {BRAND_FOUNDATION}
          </p>
        </div>
      </div>
    </footer>
  );
}
