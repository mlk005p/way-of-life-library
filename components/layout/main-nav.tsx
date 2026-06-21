"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/membership", label: "Membership" },
] as const;

function DesktopNavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        isActive ? "navbar__link--active" : "navbar__link",
        "no-underline"
      )}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        isActive ? "text-green-forest font-medium" : "text-text-secondary",
        "mx-0 rounded-none border-b border-[#07593E]/[0.06] py-4 font-body text-body no-underline transition-colors hover:text-green-forest"
      )}
    >
      {label}
    </Link>
  );
}

export function MainNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, profile } = useAuth();

  // All nav items are always visible; admin-only routes are handled in the header avatar
  const visibleNavItems = navItems;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="hidden items-center gap-1 md:flex">
        {visibleNavItems.map((item) => (
          <DesktopNavLink key={item.href} href={item.href} label={item.label} />
        ))}
      </nav>

      <button
        type="button"
        className="btn-icon btn-secondary md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-modal bg-black/50 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="fixed inset-y-0 left-0 z-modal flex w-[280px] flex-col border-r border-[#07593E]/[0.08] bg-white md:hidden">
            <div className="flex h-16 items-center border-b border-[#07593E]/[0.06] px-6">
              <span className="font-heading font-medium text-green-forest">Menu</span>
              <button
                type="button"
                className="btn-icon ml-auto text-green-forest hover:bg-[#07593E]/[0.04]"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 px-2 flex flex-col">
              {visibleNavItems.map((item) => (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  onClick={() => setOpen(false)}
                />
              ))}
              {!user ? (
                <MobileNavLink
                  href="/login"
                  label="Login"
                  onClick={() => setOpen(false)}
                />
              ) : profile?.role === "admin" ? (
                <MobileNavLink
                  href="/admin/dashboard"
                  label="Admin Panel"
                  onClick={() => setOpen(false)}
                />
              ) : (
                <MobileNavLink
                  href="/dashboard"
                  label="My Library"
                  onClick={() => setOpen(false)}
                />
              )}
            </nav>
            <div className="border-t border-[#07593E]/[0.06] p-4">
              {!user ? (
                <Link
                  href="/signup"
                  className="block w-full rounded-lg bg-green-forest py-3 text-center font-body text-body-sm font-medium text-white no-underline hover:bg-green-forest/90"
                >
                  Become Member
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="block w-full rounded-lg border border-[#07593E] py-3 text-center font-body text-body-sm font-medium text-[#07593E] hover:bg-[#07593E]/[0.04]"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
