import type { Book } from "@/lib/library-data";
import {
  getAvailabilityBadgeClass,
  getAvailabilityLabel,
} from "@/lib/library-data";

import { BookCover } from "@/components/library/book-cover";
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
          <h3 className="font-heading text-h4 font-medium text-green-forest leading-snug">
            {book.title}
          </h3>
          <p className="mt-1 font-body text-body-sm text-text-secondary">
            {book.author}
          </p>
          {showRequest && (
            <button
              type="button"
              className="mt-5 w-full rounded-lg border border-green-forest/20 py-2.5 font-body text-body-sm font-medium text-green-forest transition-colors hover:border-green-nature hover:bg-[#76BE46]/[0.06] disabled:opacity-40"
              disabled={book.availability !== "available"}
            >
              {book.availability === "available" ? "Request" : "Unavailable"}
            </button>
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
        <h3 className="card-book__title">{book.title}</h3>
        <p className="card-book__author">by {book.author}</p>
        <p className="mt-1 font-body text-body-sm text-text-secondary">
          Class: {book.class}
        </p>
        {showRequest && (
          <button
            type="button"
            className="btn-primary mt-auto w-full pt-4"
            disabled={book.availability !== "available"}
          >
            {book.availability === "available" ? "Request Book" : "Unavailable"}
          </button>
        )}
      </div>
    </article>
  );
}
