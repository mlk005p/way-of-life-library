"use client";

import Link from "next/link";
import { ShoppingCartIcon, CheckIcon } from "lucide-react";

import type { Book } from "@/lib/library-data";
import {
  getAvailabilityBadgeClass,
  getAvailabilityLabel,
} from "@/lib/library-data";
import { BookCover } from "@/components/library/book-cover";
import { useCart } from "@/components/providers";
import { cn } from "@/lib/utils";

type BookCardProps = {
  book: Book;
  showRequest?: boolean;
  variant?: "default" | "minimal";
};

export function BookCard({
  book,
  showRequest = true,
  variant = "default",
}: BookCardProps) {
  const { items, addItem } = useCart();
  const inCart = items.some((item) => item.id === book.id);

  if (variant === "minimal") {
    return (
      <article className="group flex flex-col">
        <BookCover book={book} variant="minimal" />
        <div className="flex flex-1 flex-col pt-5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <span className="font-body text-label uppercase tracking-wider text-text-secondary">
              {book.genre}
            </span>
            <span
              className={cn(
                getAvailabilityBadgeClass(book.availability),
                "bg-transparent px-0"
              )}
            >
              {getAvailabilityLabel(book.availability)}
            </span>
          </div>
          <Link
            href={`/books/${book.id}`}
            className="font-heading text-h4 font-medium text-green-forest leading-snug no-underline transition-colors hover:text-green-nature"
          >
            {book.title}
          </Link>
          <p className="mt-1 font-body text-body-sm text-text-secondary">
            {book.author}
          </p>
          {showRequest && (
            <div className="mt-5">
              {inCart ? (
                <div className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-green-nature/30 bg-green-nature/10 py-2.5 font-body text-body-sm font-medium text-green-nature">
                  <CheckIcon className="h-4 w-4" />
                  In Cart
                </div>
              ) : book.availability === "available" ? (
                <button
                  type="button"
                  onClick={() => addItem(book)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-green-forest/20 py-2.5 font-body text-body-sm font-medium text-green-forest transition-colors hover:border-green-nature hover:bg-[#76BE46]/[0.06]"
                >
                  <ShoppingCartIcon className="h-4 w-4" />
                  Add to Cart
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full rounded-lg border border-green-forest/20 py-2.5 font-body text-body-sm font-medium text-green-forest transition-colors disabled:opacity-40"
                  disabled
                >
                  Unavailable
                </button>
              )}
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="card-book flex flex-col">
      <BookCover book={book} />
      <div className="card-book__body flex flex-1 flex-col">
        <div className="mb-2 flex items-start justify-between gap-2">
          <span className="card-book__genre">{book.genre}</span>
          <span className={getAvailabilityBadgeClass(book.availability)}>
            {getAvailabilityLabel(book.availability)}
          </span>
        </div>
        <Link
          href={`/books/${book.id}`}
          className="card-book__title no-underline transition-colors hover:text-green-nature"
        >
          {book.title}
        </Link>
        <p className="card-book__author">by {book.author}</p>
        <p className="mt-1 font-body text-body-sm text-text-secondary">
          Class: {book.class}
        </p>
        {showRequest && (
          <div className="mt-auto pt-4">
            {inCart ? (
              <div className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-green-nature/30 bg-green-nature/10 py-2.5 font-body text-body-sm font-medium text-green-nature">
                <CheckIcon className="h-4 w-4" />
                In Cart
              </div>
            ) : book.availability === "available" ? (
              <button
                type="button"
                onClick={() => addItem(book)}
                className="btn-primary w-full"
              >
                Add to Cart
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary w-full"
                disabled
              >
                Unavailable
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
