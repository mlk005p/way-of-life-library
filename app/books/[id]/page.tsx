"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeftIcon, ShoppingCartIcon, CheckIcon } from "lucide-react";

import { BookCover } from "@/components/library/book-cover";
import { useCart } from "@/components/providers";
import {
  books,
  getAvailabilityBadgeClass,
  getAvailabilityLabel,
} from "@/lib/library-data";

export default function BookDetailPage() {
  const params = useParams();
  const { items, addItem } = useCart();

  const book = books.find((b) => b.id === params.id);

  if (!book) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12">
        <h1 className="font-heading text-h1 font-medium text-green-forest">
          Book not found
        </h1>
        <p className="mt-3 font-body text-body text-text-secondary">
          The book you&apos;re looking for doesn&apos;t exist in our catalog.
        </p>
        <Link
          href="/books"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-green-forest px-5 py-2.5 font-body text-body-sm font-medium text-white no-underline transition-colors hover:bg-green-forest/90"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to catalog
        </Link>
      </div>
    );
  }

  const isInCart = items.some((item) => item.id === book.id);
  const isAvailable = book.availability === "available";

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-12 md:py-16">
      {/* Back link */}
      <Link
        href="/books"
        className="mb-10 inline-flex items-center gap-2 font-body text-body-sm font-medium text-text-secondary no-underline transition-colors hover:text-green-forest"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to catalog
      </Link>

      {/* Two-column layout */}
      <div className="grid gap-12 md:grid-cols-[340px_1fr] lg:grid-cols-[380px_1fr] lg:gap-16">
        {/* Cover */}
        <div className="aspect-[3/4] overflow-hidden rounded-xl">
          <BookCover book={book} />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {/* Genre badge */}
          <span className="mb-3 w-fit rounded-full bg-[#EEF8E6] px-3 py-1 font-body text-label font-semibold uppercase tracking-wider text-green-forest">
            {book.genre}
          </span>

          <h1 className="font-heading text-h1 font-medium tracking-tight text-green-forest md:text-[2.25rem]">
            {book.title}
          </h1>

          <p className="mt-2 font-body text-body-lg text-text-secondary">
            by {book.author}
          </p>

          {/* Availability */}
          <div className="mt-5">
            <span className={`${getAvailabilityBadgeClass(book.availability)} inline-flex items-center rounded-full px-3 py-1 font-body text-label font-semibold uppercase`}>
              {getAvailabilityLabel(book.availability)}
            </span>
          </div>

          {/* Description */}
          <p className="mt-8 max-w-xl font-body text-body leading-relaxed text-text-secondary">
            {book.description}
          </p>

          {/* Details grid */}
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
            <div>
              <p className="font-body text-label uppercase tracking-wider text-text-secondary/70">
                Year
              </p>
              <p className="mt-1 font-body text-body font-semibold text-green-forest">
                {book.year}
              </p>
            </div>
            <div>
              <p className="font-body text-label uppercase tracking-wider text-text-secondary/70">
                Pages
              </p>
              <p className="mt-1 font-body text-body font-semibold text-green-forest">
                {book.pages}
              </p>
            </div>
            <div>
              <p className="font-body text-label uppercase tracking-wider text-text-secondary/70">
                Level
              </p>
              <p className="mt-1 font-body text-body font-semibold text-green-forest">
                {book.class}
              </p>
            </div>
            <div>
              <p className="font-body text-label uppercase tracking-wider text-text-secondary/70">
                ISBN
              </p>
              <p className="mt-1 font-body text-body-sm font-semibold text-green-forest">
                {book.isbn}
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-10">
            {isInCart ? (
              <span className="inline-flex items-center gap-2 rounded-lg border-2 border-green-nature bg-[#EEF8E6] px-6 py-3 font-body text-body font-medium text-green-forest">
                <CheckIcon className="h-5 w-5 text-green-nature" />
                In Cart
              </span>
            ) : isAvailable ? (
              <button
                type="button"
                onClick={() => addItem(book)}
                className="inline-flex items-center gap-2 rounded-lg bg-green-forest px-6 py-3 font-body text-body font-medium text-white transition-colors hover:bg-green-forest/90"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                Add to Cart
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-6 py-3 font-body text-body font-medium text-gray-500 cursor-not-allowed"
              >
                Currently Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
