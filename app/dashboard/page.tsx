"use client";

import Link from "next/link";
import {
  BookOpenIcon,
  ClockIcon,
  CreditCardIcon,
  BarChart3Icon,
  InboxIcon,
} from "lucide-react";

import { BookCard } from "@/components/library/book-card";
import { useAuth } from "@/components/providers";
import { recommendedBooks, recentlyAddedBooks } from "@/lib/library-data";

export default function DashboardPage() {
  const { user, profile, updateMembership, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-forest border-t-transparent" />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12">
        <h1 className="font-heading text-h1 font-medium text-green-forest">
          Sign in to access your dashboard
        </h1>
        <p className="mt-3 font-body text-body text-text-secondary">
          You need to be logged in to view your borrowing history, requests, and
          membership.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-block rounded-lg bg-green-forest px-6 py-3 font-body text-body font-medium text-white no-underline transition-colors hover:bg-green-forest/90"
        >
          Login
        </Link>
      </div>
    );
  }

  const isMemberActive = profile.membership_status === "active";

  const dashboardStats = [
    {
      label: "Membership",
      value: isMemberActive
        ? "Active"
        : profile.membership_status.charAt(0).toUpperCase() +
          profile.membership_status.slice(1),
      icon: CreditCardIcon,
      accent: isMemberActive ? "text-green-nature" : "text-[#F7941D]",
    },
    {
      label: "Books Borrowed",
      value: "0",
      icon: BookOpenIcon,
      accent: "text-green-forest",
    },
    {
      label: "Pending Requests",
      value: "0",
      icon: ClockIcon,
      accent: "text-[#3EBCEB]",
    },
    {
      label: "Books Read",
      value: "0",
      icon: BarChart3Icon,
      accent: "text-[#F7941D]",
    },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-12 md:py-16">
      {/* Welcome */}
      <h1 className="font-heading text-h1 font-medium tracking-tight text-green-forest">
        Welcome back, {user.name}
      </h1>
      <p className="mt-2 font-body text-body text-text-secondary">
        Manage your membership, borrowed books, and reading activity.
      </p>

      {/* Membership card */}
      <div className="mt-10 rounded-xl border border-[#07593E]/[0.08] bg-white p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-body text-label uppercase tracking-wider text-text-secondary">
              Membership status
            </p>
            <div className="mt-2 flex items-center gap-3">
              {isMemberActive ? (
                <span className="badge-available inline-flex items-center rounded-full px-3 py-1 font-body text-label font-semibold uppercase">
                  Active
                </span>
              ) : (
                <span className="badge-borrowed inline-flex items-center rounded-full px-3 py-1 font-body text-label font-semibold uppercase">
                  {profile.membership_status}
                </span>
              )}
              {isMemberActive && (
                <span className="font-body text-body-sm text-text-secondary">
                  Valid through Dec 2026
                </span>
              )}
            </div>
          </div>
          <div>
            {isMemberActive ? (
              <button
                type="button"
                onClick={() =>
                  alert("Membership renewal is a Phase 2 feature.")
                }
                className="rounded-lg border border-[#C8E6A0] px-5 py-2.5 font-body text-body-sm font-medium text-green-forest transition-colors hover:bg-[#EEF8E6]"
              >
                Renew
              </button>
            ) : (
              <button
                type="button"
                onClick={() => updateMembership("active")}
                className="rounded-lg bg-green-forest px-5 py-2.5 font-body text-body-sm font-medium text-white transition-colors hover:bg-green-forest/90"
              >
                Activate Membership
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#07593E]/[0.08] bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF8E6] ${stat.accent}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-h3 font-medium text-green-forest">
                  {stat.value}
                </p>
                <p className="font-body text-label text-text-secondary">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Currently Borrowed — empty state */}
      <section className="mt-14">
        <h2 className="mb-6 font-heading text-h3 font-medium text-green-forest">
          Currently Borrowed
        </h2>
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#07593E]/[0.08] bg-white py-14 text-center">
          <InboxIcon className="mb-3 h-10 w-10 text-text-secondary/30" />
          <p className="font-heading text-h4 font-medium text-green-forest">
            No books borrowed yet
          </p>
          <p className="mt-1.5 max-w-sm font-body text-body-sm text-text-secondary">
            Browse the catalog and add books to your cart to request them.
          </p>
          <Link
            href="/books"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-forest px-5 py-2.5 font-body text-body-sm font-medium text-white no-underline transition-colors hover:bg-green-forest/90"
          >
            <BookOpenIcon className="h-4 w-4" />
            Browse Catalog
          </Link>
        </div>
      </section>

      {/* Pending Requests — empty state */}
      <section className="mt-14">
        <h2 className="mb-6 font-heading text-h3 font-medium text-green-forest">
          Pending Requests
        </h2>
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#07593E]/[0.08] bg-white py-14 text-center">
          <ClockIcon className="mb-3 h-10 w-10 text-text-secondary/30" />
          <p className="font-heading text-h4 font-medium text-green-forest">
            No pending requests
          </p>
          <p className="mt-1.5 max-w-sm font-body text-body-sm text-text-secondary">
            When you submit a book request from your cart, it will appear here.
          </p>
        </div>
      </section>

      {/* Recommended */}
      <section className="mt-14">
        <h2 className="mb-6 font-heading text-h3 font-medium text-green-forest">
          Recommended for you
        </h2>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedBooks.map((book) => (
            <BookCard key={book.id} book={book} variant="minimal" />
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section className="mt-14">
        <h2 className="mb-6 font-heading text-h3 font-medium text-green-forest">
          Recently added
        </h2>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {recentlyAddedBooks.slice(0, 3).map((book) => (
            <BookCard key={book.id} book={book} variant="minimal" />
          ))}
        </div>
      </section>
    </div>
  );
}
