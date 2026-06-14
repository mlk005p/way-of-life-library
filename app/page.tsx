import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { HomeSearch } from "@/components/home/home-search";
import { RotatingTagline } from "@/components/home/rotating-tagline";
import { BookCard } from "@/components/library/book-card";
import { BRAND_FOUNDATION_NAME } from "@/lib/brand";
import {
  categories,
  featuredBooks,
  membershipBenefits,
  platformStats,
} from "@/lib/library-data";

export const metadata: Metadata = {
  title: "Home",
  description: `${BRAND_FOUNDATION_NAME} — search books, browse the catalog, and learn together.`,
};

const stats = [
  { label: "Books", value: platformStats.booksAvailable.toLocaleString() },
  { label: "Members", value: platformStats.activeMembers.toLocaleString() },
  { label: "Shared", value: platformStats.booksShared.toLocaleString() },
  { label: "Communities", value: platformStats.communitiesReached.toLocaleString() },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero — minimal, typography-led */}
      <section className="mx-auto max-w-container px-6 pt-16 pb-10 md:px-12 md:pt-24 md:pb-14">
        <BrandLogo variant="hero-brand" priority className="opacity-95" />
        <h1 className="mt-10 max-w-3xl font-heading text-display font-medium tracking-tight text-green-forest md:text-[3.25rem] md:leading-[1.1]">
          Find your next book
        </h1>
        <RotatingTagline
          className="mt-5 max-w-xl font-body text-body-lg text-text-secondary"
        />
      </section>

      {/* Search — primary focus */}
      <section className="pb-20 md:pb-28">
        <HomeSearch />
      </section>

      {/* Featured books */}
      <section className="mx-auto max-w-container px-6 pb-24 md:px-12 md:pb-32">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-h1 font-medium tracking-tight text-green-forest">
              Featured books
            </h2>
            <p className="mt-2 font-body text-body text-text-secondary">
              Popular titles from the community catalog.
            </p>
          </div>
          <Link
            href="/books"
            className="inline-flex items-center gap-1.5 font-body text-body font-medium text-green-forest no-underline transition-colors hover:text-green-nature"
          >
            View all
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} variant="minimal" />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-[#07593E]/[0.06] bg-white py-24 md:py-32">
        <div className="mx-auto max-w-container px-6 md:px-12">
          <h2 className="font-heading text-h1 font-medium tracking-tight text-green-forest">
            Browse by category
          </h2>
          <p className="mt-2 font-body text-body text-text-secondary">
            Explore subjects across education, health, and community learning.
          </p>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href="/books"
                className="group flex items-center justify-between rounded-xl border border-[#07593E]/[0.08] px-5 py-4 no-underline transition-colors hover:border-green-forest/20 hover:bg-[#07593E]/[0.02]"
              >
                <span className="font-body text-body font-medium text-green-forest">
                  {category.name}
                </span>
                <span className="font-body text-body-sm text-text-secondary transition-colors group-hover:text-green-forest">
                  {category.count} books
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats — quiet, typographic */}
      <section className="border-t border-[#07593E]/[0.06] py-20 md:py-28">
        <div className="mx-auto max-w-container px-6 md:px-12">
          <div className="grid grid-cols-2 gap-12 lg:grid-cols-4 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-[2.5rem] font-medium leading-none tracking-tight text-green-forest md:text-[3rem]">
                  {stat.value}
                </p>
                <p className="mt-3 font-body text-body-sm uppercase tracking-wider text-text-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership — understated */}
      <section className="border-t border-[#07593E]/[0.06] py-24 md:py-32">
        <div className="mx-auto max-w-container px-6 md:px-12">
          <div className="max-w-2xl">
            <h2 className="font-heading text-h1 font-medium tracking-tight text-green-forest">
              Request books with a free membership
            </h2>
            <p className="mt-4 font-body text-body-lg text-text-secondary">
              Join to borrow from the catalog, track your reading, and connect
              with learners in your community.
            </p>
            <ul className="mt-8 space-y-3">
              {membershipBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 font-body text-body text-green-forest"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-green-nature" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="mt-10 inline-flex items-center gap-2 rounded-lg bg-green-forest px-6 py-3 font-body text-body font-medium text-white no-underline transition-colors hover:bg-green-forest/90"
            >
              Create free account
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
