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
    <footer className="mt-auto border-t border-[#07593E]/[0.06] bg-white">
      <div className="mx-auto max-w-container px-6 py-12 md:px-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <BrandLogo variant="footer" />
            <p className="mt-4 font-body text-body-sm text-text-secondary">
              {BRAND_LIBRARY_NAME}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
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
        <div className="mt-12 border-t border-[#07593E]/[0.06] pt-8">
          <p className="font-body text-body-sm text-text-secondary">
            &copy; {new Date().getFullYear()} {BRAND_FOUNDATION}
          </p>
        </div>
      </div>
    </footer>
  );
}
