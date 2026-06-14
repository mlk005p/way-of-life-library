import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  UserPlusIcon,
  SearchIcon,
  BookOpenIcon,
  ArrowRightLeftIcon,
  LibraryIcon,
  UsersIcon,
  GlobeIcon,
  HeartIcon,
} from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { HomeSearch } from "@/components/home/home-search";
import { BookCard } from "@/components/library/book-card";
import { BRAND_FOUNDATION_NAME } from "@/lib/brand";
import {
  categories,
  featuredBooks,
  recentlyAddedBooks,
  howItWorksSteps,
  membershipBenefits,
  platformStats,
} from "@/lib/library-data";

export const metadata: Metadata = {
  title: "Home",
  description: `${BRAND_FOUNDATION_NAME} — search books, browse the catalog, and learn together.`,
};

const stats = [
  { label: "Books Available", value: platformStats.booksAvailable.toLocaleString(), icon: BookOpenIcon },
  { label: "Active Members", value: platformStats.activeMembers.toLocaleString(), icon: UsersIcon },
  { label: "Books Shared", value: platformStats.booksShared.toLocaleString(), icon: HeartIcon },
  { label: "Communities", value: platformStats.communitiesReached.toLocaleString(), icon: GlobeIcon },
];

const stepIcons = [UserPlusIcon, SearchIcon, BookOpenIcon, ArrowRightLeftIcon];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07593E] via-[#0a6b4a] to-[#0d7d56]">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#76BE46]/10" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#3EBCEB]/10" />
        <div className="pointer-events-none absolute right-1/4 bottom-10 h-40 w-40 rounded-full bg-[#F7941D]/8" />

        <div className="relative mx-auto max-w-[1280px] px-6 pb-14 pt-12 md:px-12 md:pb-20 md:pt-16">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-16">
            {/* Left: text content */}
            <div className="flex-1">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                <LibraryIcon className="h-4 w-4 text-[#76BE46]" />
                <span className="font-body text-body-sm font-medium text-white/90">
                  Way Of Life Digital Library
                </span>
              </div>
              <h1 className="max-w-lg font-heading text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white md:text-[3.25rem]">
                Find your next book
              </h1>
              <p className="mt-4 max-w-md font-body text-body-lg leading-relaxed text-white/70">
                Access thousands of books on education, health, environment &amp; technology — free for community members.
              </p>

              {/* Search inside hero */}
              <div className="mt-8 max-w-lg">
                <Link
                  href="/books"
                  className="group relative block no-underline"
                >
                  <div className="flex h-14 items-center rounded-2xl border border-white/15 bg-white/10 pl-5 pr-4 backdrop-blur-sm transition-all group-hover:bg-white/15">
                    <SearchIcon className="mr-3 h-5 w-5 text-white/50" />
                    <span className="flex-1 font-body text-body text-white/40">
                      Search by title, author, or genre…
                    </span>
                    <span className="rounded-xl bg-[#76BE46] px-4 py-2 font-body text-body-sm font-semibold text-white transition-colors group-hover:bg-[#5FA535]">
                      Search
                    </span>
                  </div>
                </Link>
                {/* Quick category pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Education", "Health", "Environment", "Technology"].map((tag) => (
                    <Link
                      key={tag}
                      href="/books"
                      className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-body text-body-sm text-white/60 no-underline transition-colors hover:bg-white/10 hover:text-white/80"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Stats cards */}
            <div className="grid w-full grid-cols-2 gap-3 lg:w-auto lg:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm lg:p-5"
                >
                  <stat.icon className="mb-2 h-5 w-5 text-[#76BE46]" />
                  <p className="font-heading text-h3 font-bold text-white md:text-h2">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 font-body text-label text-white/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured books ────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-h1 font-bold tracking-tight text-green-forest">
                Featured books
              </h2>
              <p className="mt-1.5 font-body text-body text-text-secondary">
                Popular titles from the community catalog.
              </p>
            </div>
            <Link
              href="/books"
              className="inline-flex items-center gap-1.5 font-body text-body font-semibold text-green-forest no-underline transition-colors hover:text-green-nature"
            >
              View all
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} variant="minimal" />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────── */}
      <section className="border-y border-[#07593E]/[0.06] bg-[#F8FDF4] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-h1 font-bold tracking-tight text-green-forest">
              How it works
            </h2>
            <p className="mt-1.5 font-body text-body text-text-secondary">
              Four simple steps to start reading.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div
                  key={step.step}
                  className="group relative flex flex-col items-center rounded-xl border border-[#07593E]/[0.08] bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  {/* Step number */}
                  <div className="absolute -top-3 left-6 rounded-full bg-[#76BE46] px-3 py-0.5 font-body text-label font-bold text-white">
                    {step.step}
                  </div>
                  <div className="mb-4 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#76BE46]/15 to-[#07593E]/10">
                    <Icon className="h-7 w-7 text-green-forest" />
                  </div>
                  <h3 className="mb-2 font-heading text-h4 font-bold text-green-forest">
                    {step.title}
                  </h3>
                  <p className="font-body text-body-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <h2 className="font-heading text-h1 font-bold tracking-tight text-green-forest">
            Browse by category
          </h2>
          <p className="mt-1.5 font-body text-body text-text-secondary">
            Explore subjects across education, health, and community learning.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href="/books"
                className="group flex items-center justify-between rounded-xl border border-[#07593E]/[0.08] bg-[#F8FDF4] px-5 py-4 no-underline transition-all hover:-translate-y-0.5 hover:border-green-forest/20 hover:bg-[#EEF8E6] hover:shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#76BE46]/10">
                    <BookOpenIcon className="h-4 w-4 text-green-nature" />
                  </div>
                  <span className="font-body text-body font-semibold text-green-forest">
                    {category.name}
                  </span>
                </div>
                <span className="rounded-full bg-white px-3 py-1 font-body text-label font-bold text-text-secondary shadow-sm">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recently Added ────────────────────────────────────── */}
      <section className="border-t border-[#07593E]/[0.06] bg-[#F8FDF4] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-h1 font-bold tracking-tight text-green-forest">
                Recently added
              </h2>
              <p className="mt-1.5 font-body text-body text-text-secondary">
                Fresh titles just added to the catalog.
              </p>
            </div>
            <Link
              href="/books"
              className="inline-flex items-center gap-1.5 font-body text-body font-semibold text-green-forest no-underline transition-colors hover:text-green-nature"
            >
              Browse all
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {recentlyAddedBooks.slice(0, 3).map((book) => (
              <BookCard key={book.id} book={book} variant="minimal" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Membership CTA ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07593E] via-[#0a6b4a] to-[#0d7d56] py-16 md:py-24">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#76BE46]/10" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-[#3EBCEB]/10" />
        <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2 className="font-heading text-h1 font-bold tracking-tight text-white md:text-[2.25rem]">
                Request books with a free membership
              </h2>
              <p className="mt-4 font-body text-body-lg leading-relaxed text-white/70">
                Join to borrow from the catalog, track your reading, and connect with learners in your community.
              </p>
              <Link
                href="/signup"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#76BE46] px-7 py-3.5 font-body text-body font-bold text-white no-underline shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#5FA535] hover:shadow-xl"
              >
                Create free account
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {membershipBenefits.map((benefit, i) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#76BE46]">
                    <span className="font-body text-label font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <span className="font-body text-body-sm leading-snug text-white/80">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
