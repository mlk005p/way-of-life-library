"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { MainNav } from "@/components/layout/main-nav";
import { CartDrawer } from "@/components/library/cart-drawer";
import { useAuth, useCart } from "@/components/providers";

/** Avatar link that routes admins to /admin/dashboard and regular users to /dashboard */
function AdminAvatarLink({ user, isAdmin }: { user: { full_name: string; email: string }; isAdmin: boolean }) {
  const href = isAdmin ? "/admin/dashboard" : "/dashboard";
  const initial = (user.full_name || user.email).charAt(0).toUpperCase();
  return (
    <Link
      href={href}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF8E6] border-2 border-green-nature font-body text-xs font-bold text-green-forest no-underline"
      title={isAdmin ? "Admin Dashboard" : "My Dashboard"}
    >
      {initial}
    </Link>
  );
}

export function SiteHeader() {
  const { user, profile, logout } = useAuth();
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const isAdmin = profile?.role === "admin";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#07593E]/[0.06] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-6 px-6 md:px-12">
          <Link href="/" className="no-underline hover:opacity-90">
            <BrandLogo variant="navbar" priority />
          </Link>
          <MainNav />
          <div className="ml-auto flex items-center gap-3">
            {/* Cart button */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-green-forest transition-colors hover:bg-[#EEF8E6]"
              aria-label="Open cart"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-nature text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="hidden items-center gap-3 sm:flex">
                <AdminAvatarLink user={user} isAdmin={isAdmin} />
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-2 font-body text-body-sm font-medium text-text-secondary transition-colors hover:text-green-forest"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden items-center gap-3 sm:flex">
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
                  Become Member
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
