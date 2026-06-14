import type { Metadata } from "next";
import Image from "next/image";
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
  CheckCircleIcon,
  XCircleIcon,
  SparklesIcon,
} from "lucide-react";

import { BRAND_FOUNDATION_NAME } from "@/lib/brand";
import {
  howItWorksSteps,
  membershipBenefits,
} from "@/lib/library-data";
import {
  catalogBooks,
  catalogGenreCounts,
  catalogStats,
} from "@/lib/library-catalog";

// Pick 6 featured books (available, with images)
const featuredCatalogBooks = catalogBooks
  .filter((b) => b.availability === "available" && b.imageUrl)
  .slice(0, 6);

// Recently added = sorted by year descending
const recentCatalogBooks = [...catalogBooks]
  .filter((b) => b.imageUrl)
  .sort((a, b) => b.year - a.year)
  .slice(0, 3);

// Top categories with images
const realCategories = Object.entries(catalogGenreCounts)
  .filter(([_name, count]) => count >= 5)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(([name, count]) => ({ name, count }));

export const metadata: Metadata = {
  title: "Home",
  description: `${BRAND_FOUNDATION_NAME} — search books, browse the catalog, and learn together.`,
};

const stats = [
  { label: "Books Available", value: catalogStats.totalBooks.toLocaleString(), icon: BookOpenIcon },
  { label: "Authors", value: catalogStats.totalAuthors.toLocaleString(), icon: UsersIcon },
  { label: "Genres", value: catalogStats.totalGenres.toLocaleString(), icon: HeartIcon },
  { label: "Communities", value: "47", icon: GlobeIcon },
];

const stepIcons = [UserPlusIcon, SearchIcon, BookOpenIcon, ArrowRightLeftIcon];



const buyingPoints = [
  { text: "₹400+ per book", bad: true },
  { text: "Limited variety", bad: true },
  { text: "Storage issues at home", bad: true },
  { text: "₹24,000+ for 60 books/year", bad: true },
];

const rentingPoints = [
  { text: "Free for community members", good: true },
  { text: "1,200+ books across 6 categories", good: true },
  { text: "No storage needed — return & borrow", good: true },
  { text: "New titles added every month", good: true },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero with Image ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07593E] via-[#0a6b4a] to-[#0d7d56]">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#76BE46]/10" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#3EBCEB]/10" />

        <div className="relative mx-auto max-w-[1280px] px-6 pb-0 pt-12 md:px-12 md:pt-16">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: text content */}
            <div className="pb-10 lg:pb-16">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                <LibraryIcon className="h-4 w-4 text-[#76BE46]" />
                <span className="font-body text-body-sm font-medium text-white/90">
                  Way Of Life Digital Library
                </span>
              </div>
              <h1 className="max-w-lg font-heading text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white md:text-[3.5rem]">
                Books for every learner
              </h1>
              <p className="mt-4 max-w-md font-body text-body-lg leading-relaxed text-white/70">
                Access books on education, health, environment &amp; technology — <span className="font-semibold text-[#76BE46]">completely free</span> for community members.
              </p>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#76BE46] px-7 py-3.5 font-body text-body font-bold text-white no-underline shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#5FA535] hover:shadow-xl"
                >
                  Browse Catalog
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/25 bg-white/10 px-7 py-3 font-body text-body font-semibold text-white no-underline backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Join Free
                </Link>
              </div>

              {/* Mini stats */}
              <div className="mt-8 flex flex-wrap gap-6">
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <stat.icon className="h-4 w-4 text-[#76BE46]" />
                    <span className="font-body text-body-sm font-bold text-white">{stat.value}</span>
                    <span className="font-body text-body-sm text-white/50">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="relative hidden lg:block">
              <div className="relative overflow-hidden rounded-t-2xl">
                <Image
                  src="/images/hero-banner.png"
                  alt="Community members reading and learning together"
                  width={640}
                  height={480}
                  className="h-auto w-full object-cover"
                  priority
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a6b4a] to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Browse by Category — Circular Images ─────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-h1 font-bold tracking-tight text-green-forest">
              Browse Books by Category
            </h2>
            <p className="mt-2 font-body text-body text-text-secondary">
              Explore subjects across education, health, and community learning.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {realCategories.slice(0, 5).map((category) => (
              <Link
                key={category.name}
                href="/books"
                className="group flex flex-col items-center gap-4 no-underline"
              >
                <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-[#76BE46]/30 bg-gradient-to-br from-[#07593E]/10 to-[#76BE46]/10 transition-all group-hover:border-[#76BE46] group-hover:shadow-lg group-hover:shadow-[#76BE46]/20">
                  <BookOpenIcon className="h-10 w-10 text-green-forest/30 transition-transform group-hover:scale-110" />
                </div>
                <div className="text-center">
                  <p className="font-heading text-h4 font-bold text-green-forest group-hover:text-green-nature">
                    {category.name}
                  </p>
                  <p className="font-body text-body-sm text-text-secondary">
                    {category.count} books
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Buying vs Borrowing Comparison ────────────────────── */}
      <section className="bg-[#F8FDF4] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-h1 font-bold tracking-tight text-green-forest">
              Why Borrow from Us?
            </h2>
            <p className="mt-2 font-body text-body text-text-secondary">
              See how community borrowing compares to buying books.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Buying column */}
            <div className="rounded-2xl border-2 border-red-200 bg-white p-8">
              <div className="mb-6 text-center">
                <span className="inline-block rounded-full bg-red-100 px-5 py-2 font-heading text-h3 font-bold text-red-600">
                  Buying Books
                </span>
                <p className="mt-3 font-heading text-[2.5rem] font-bold text-red-600">
                  ₹24,000+
                </p>
                <p className="font-body text-body-sm text-text-secondary">
                  for 60 books/year
                </p>
              </div>
              <ul className="space-y-3">
                {buyingPoints.map((point) => (
                  <li key={point.text} className="flex items-center gap-3">
                    <XCircleIcon className="h-5 w-5 shrink-0 text-red-400" />
                    <span className="font-body text-body text-text-secondary">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Borrowing column */}
            <div className="relative rounded-2xl border-2 border-[#76BE46] bg-white p-8 shadow-lg shadow-[#76BE46]/10">
              {/* Recommended badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#76BE46] px-5 py-1.5 font-body text-body-sm font-bold text-white shadow-md">
                <SparklesIcon className="mr-1.5 inline h-4 w-4" />
                Recommended
              </div>
              <div className="mb-6 text-center">
                <span className="inline-block rounded-full bg-[#EEF8E6] px-5 py-2 font-heading text-h3 font-bold text-green-forest">
                  Borrowing Books
                </span>
                <p className="mt-3 font-heading text-[2.5rem] font-bold text-green-forest">
                  ₹0
                </p>
                <p className="font-body text-body-sm text-text-secondary">
                  free for members
                </p>
              </div>
              <ul className="space-y-3">
                {rentingPoints.map((point) => (
                  <li key={point.text} className="flex items-center gap-3">
                    <CheckCircleIcon className="h-5 w-5 shrink-0 text-[#76BE46]" />
                    <span className="font-body text-body font-medium text-green-forest">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works — Visual Steps ──────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-h1 font-bold tracking-tight text-green-forest">
              How to Get Started?
            </h2>
            <p className="mt-2 font-body text-body text-text-secondary">
              Three simple steps to start reading.
            </p>
          </div>
          <div className="relative grid gap-8 md:grid-cols-4">
            {/* Connecting dashed line (desktop only) */}
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-10 hidden h-0.5 border-t-2 border-dashed border-[#76BE46]/40 md:block" />

            {howItWorksSteps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={step.step} className="relative flex flex-col items-center text-center">
                  {/* Step number circle */}
                  <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#76BE46] to-[#07593E] shadow-lg">
                    <span className="font-heading text-h1 font-bold text-white">{step.step}</span>
                  </div>
                  {/* Icon */}
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF8E6]">
                    <Icon className="h-6 w-6 text-green-forest" />
                  </div>
                  <h3 className="mb-2 font-heading text-h3 font-bold text-green-forest">
                    {step.title}
                  </h3>
                  <p className="max-w-[220px] font-body text-body-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured books ────────────────────────────────────── */}
      <section className="border-y border-[#07593E]/[0.06] bg-[#F8FDF4] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-h1 font-bold tracking-tight text-green-forest">
                Featured Books
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCatalogBooks.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`} className="group flex gap-4 rounded-xl border border-[#07593E]/[0.08] bg-white p-4 no-underline transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#07593E]/10 to-[#76BE46]/10">
                  {book.imageUrl ? (
                    <img src={book.imageUrl} alt={book.title} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center"><span className="font-heading text-sm font-bold text-green-forest/20">{book.title.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase()}</span></div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-[10px] font-bold uppercase tracking-wider text-text-secondary">{book.genre}</span>
                  <p className="mt-1 font-heading text-body font-medium leading-snug text-green-forest group-hover:text-green-nature">{book.title}</p>
                  <p className="mt-0.5 font-body text-body-sm text-text-secondary">{book.author}</p>
                  <p className="mt-auto font-body text-[11px] text-text-secondary/60">{book.publisher} · {book.year}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recently Added ────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-h1 font-bold tracking-tight text-green-forest">
                Recently Added
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentCatalogBooks.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`} className="group flex gap-4 rounded-xl border border-[#07593E]/[0.08] bg-white p-4 no-underline transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#07593E]/10 to-[#76BE46]/10">
                  {book.imageUrl ? (
                    <img src={book.imageUrl} alt={book.title} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center"><span className="font-heading text-sm font-bold text-green-forest/20">{book.title.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase()}</span></div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-[10px] font-bold uppercase tracking-wider text-text-secondary">{book.genre}</span>
                  <p className="mt-1 font-heading text-body font-medium leading-snug text-green-forest group-hover:text-green-nature">{book.title}</p>
                  <p className="mt-0.5 font-body text-body-sm text-text-secondary">{book.author}</p>
                  <p className="mt-auto font-body text-[11px] text-text-secondary/60">{book.publisher} · {book.year}</p>
                </div>
              </Link>
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
                Ready to start reading?
              </h2>
              <p className="mt-4 font-body text-body-lg leading-relaxed text-white/70">
                Join our community of readers. Borrow books, learn new skills, and grow together — all for free.
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
