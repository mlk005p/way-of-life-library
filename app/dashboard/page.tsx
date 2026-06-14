import type { Metadata } from "next";
import Link from "next/link";
import {
  BookMarkedIcon,
  ClockIcon,
  SparklesIcon,
} from "lucide-react";

import { BookCard } from "@/components/library/book-card";
import { BRAND_LIBRARY_NAME } from "@/lib/brand";
import {
  borrowedBooks,
  pendingRequests,
  recentlyAddedBooks,
  recommendedBooks,
} from "@/lib/library-data";

export const metadata: Metadata = {
  title: "My Library",
  description: `Your personal ${BRAND_LIBRARY_NAME} portal.`,
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-container px-6 py-12 md:px-12 md:py-16">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-display font-medium tracking-tight text-green-forest md:text-[2.75rem]">
            My library
          </h1>
          <p className="mt-3 font-body text-body-lg text-text-secondary">
            Track borrowed books, requests, and recommendations.
          </p>
        </div>
        <Link
          href="/books"
          className="inline-flex items-center rounded-lg border border-green-forest/20 px-5 py-2.5 font-body text-body-sm font-medium text-green-forest no-underline transition-colors hover:border-green-nature hover:bg-[#76BE46]/[0.06]"
        >
          Browse catalog
        </Link>
      </div>

      <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#07593E]/[0.08] p-5">
          <p className="font-body text-body-sm uppercase tracking-wider text-text-secondary">
            Membership
          </p>
          <p className="mt-2 font-heading text-h3 font-medium text-green-forest">
            Active member
          </p>
          <p className="mt-1 font-body text-body-sm text-text-secondary">
            Since January 2025
          </p>
        </div>
        <div>
          <p className="font-heading text-[2rem] font-medium leading-none text-green-forest">
            {borrowedBooks.length}
          </p>
          <p className="mt-2 font-body text-body-sm uppercase tracking-wider text-text-secondary">
            Borrowed
          </p>
        </div>
        <div>
          <p className="font-heading text-[2rem] font-medium leading-none text-green-forest">
            {pendingRequests.length}
          </p>
          <p className="mt-2 font-body text-body-sm uppercase tracking-wider text-text-secondary">
            Pending requests
          </p>
        </div>
        <div>
          <p className="font-heading text-[2rem] font-medium leading-none text-green-forest">
            12
          </p>
          <p className="mt-2 font-body text-body-sm uppercase tracking-wider text-text-secondary">
            Books read
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-[#07593E]/[0.08] p-6">
          <div className="mb-4 flex items-center gap-2">
            <BookMarkedIcon className="h-5 w-5 text-green-nature" />
            <h2 className="font-heading text-h3 text-green-forest">
              Books Borrowed
            </h2>
          </div>
          <ul className="space-y-4">
            {borrowedBooks.map((item) => (
              <li
                key={item.title}
                className="flex items-center justify-between border-b border-[#F0F7EC] pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-body font-medium text-body text-green-forest">
                    {item.title}
                  </p>
                  <p className="font-body text-body-sm text-text-secondary">
                    Due: {item.dueDate}
                  </p>
                </div>
                <span className="badge-borrowed">{item.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-[#07593E]/[0.08] p-6">
          <div className="mb-4 flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-orange-sunrise" />
            <h2 className="font-heading text-h3 text-green-forest">
              Pending Requests
            </h2>
          </div>
          <ul className="space-y-4">
            {pendingRequests.map((item) => (
              <li
                key={item.title}
                className="flex items-center justify-between border-b border-[#F0F7EC] pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-body font-medium text-body text-green-forest">
                    {item.title}
                  </p>
                  <p className="font-body text-body-sm text-text-secondary">
                    Requested: {item.requested}
                  </p>
                </div>
                <span className="badge-info">{item.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-6 flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-green-nature" />
          <h2 className="font-heading text-h2 text-green-forest">
            Recommended for You
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedBooks.map((book) => (
            <BookCard key={book.id} book={book} variant="minimal" />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-6 font-heading text-h2 text-green-forest">
          Recently Added to the Library
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recentlyAddedBooks.map((book) => (
            <BookCard key={book.id} book={book} variant="minimal" />
          ))}
        </div>
      </section>
    </div>
  );
}
