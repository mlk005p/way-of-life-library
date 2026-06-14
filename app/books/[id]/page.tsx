"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeftIcon,
  CheckIcon,
  ShoppingCartIcon,
} from "lucide-react";

import { useCart } from "@/components/providers";
import { catalogBooks, type CatalogBook } from "@/lib/library-catalog";

export default function BookDetailPage() {
  const params = useParams();
  const bookId = Number(params.id);
  const book = catalogBooks.find((b) => b.id === bookId);
  const { items, addItem } = useCart();
  const [imgError, setImgError] = useState(false);

  if (!book) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12">
        <h1 className="font-heading text-h1 font-medium text-green-forest">
          Book not found
        </h1>
        <Link
          href="/books"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-forest px-5 py-2.5 font-body text-body-sm font-medium text-white no-underline"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Catalog
        </Link>
      </div>
    );
  }

  const inCart = items.some((i) => String(i.id) === String(book.id));
  const relatedBooks = catalogBooks
    .filter((b) => b.genre === book.genre && b.id !== book.id)
    .slice(0, 4);

  const initials = book.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-12 md:py-16">
      {/* Back link */}
      <Link
        href="/books"
        className="mb-8 inline-flex items-center gap-2 font-body text-body-sm font-medium text-text-secondary no-underline transition-colors hover:text-green-forest"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Catalog
      </Link>

      <div className="grid gap-10 lg:grid-cols-[350px_1fr] lg:gap-14">
        {/* Cover */}
        <div className="relative aspect-[3/4] w-full max-w-[350px] overflow-hidden rounded-xl bg-gradient-to-br from-[#07593E]/10 to-[#76BE46]/10 shadow-card-hover">
          {book.imageUrl && !imgError ? (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-heading text-[4rem] font-bold text-green-forest/20">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <span className="mb-2 inline-flex rounded-full bg-[#EEF8E6] px-3 py-1 font-body text-label font-bold uppercase tracking-wider text-[#4A7C59]">
            {book.genre}
          </span>
          <h1 className="mt-3 font-heading text-[2rem] font-bold leading-tight tracking-tight text-green-forest md:text-[2.5rem]">
            {book.title}
          </h1>
          <p className="mt-2 font-body text-body-lg text-text-secondary">
            by <span className="font-semibold text-green-forest">{book.author}</span>
          </p>

          {/* Status badge */}
          <div className="mt-5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-body-sm font-semibold ${
                book.availability === "available"
                  ? "bg-[#EEF8E6] text-[#07593E]"
                  : "bg-[#FFF8EE] text-[#C47000]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  book.availability === "available"
                    ? "bg-[#76BE46]"
                    : "bg-[#F7941D]"
                }`}
              />
              {book.availability === "available"
                ? "Available for borrowing"
                : "Currently borrowed"}
            </span>
          </div>

          {/* Metadata grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              { label: "Publisher", value: book.publisher },
              { label: "Year", value: book.year.toString() },
              { label: "Language", value: book.language },
              { label: "Age Group", value: book.ageGroup },
              { label: "ISBN", value: book.isbn || "N/A" },
              { label: "Genre", value: book.genre },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-[#07593E]/[0.06] bg-[#F8FDF4] p-3"
              >
                <p className="font-body text-label uppercase tracking-wider text-text-secondary">
                  {item.label}
                </p>
                <p className="mt-1 font-body text-body-sm font-medium text-green-forest">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Cart action */}
          <div className="mt-8">
            {inCart ? (
              <div className="inline-flex items-center gap-2 rounded-xl border border-green-nature/30 bg-green-nature/10 px-8 py-3.5 font-body text-body font-semibold text-green-nature">
                <CheckIcon className="h-5 w-5" />
                Added to Cart
              </div>
            ) : book.availability === "available" ? (
              <button
                type="button"
                onClick={() =>
                  addItem({
                    id: String(book.id),
                    title: book.title,
                    author: book.author,
                    genre: book.genre,
                    availability: book.availability,
                    class: "",
                    description: "",
                    year: book.year || 0,
                    pages: 0,
                    isbn: book.isbn || "",
                    quantity: 1,
                    coverAccent: "green",
                  })
                }
                className="inline-flex items-center gap-2 rounded-xl bg-green-forest px-8 py-3.5 font-body text-body font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-green-forest/90 hover:shadow-lg"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                Add to Cart
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C8E6A0] px-8 py-3.5 font-body text-body font-medium text-text-secondary"
                disabled
              >
                Currently Unavailable
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-heading text-h2 font-bold text-green-forest">
            More in {book.genre}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {relatedBooks.map((rb) => (
              <RelatedCard key={rb.id} book={rb} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function RelatedCard({ book }: { book: CatalogBook }) {
  const [err, setErr] = useState(false);
  const initials = book.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/books/${book.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#07593E]/[0.08] bg-white no-underline transition-all hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-[#07593E]/10 to-[#76BE46]/10">
        {book.imageUrl && !err ? (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setErr(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-heading text-xl font-bold text-green-forest/20">
              {initials}
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="font-heading text-body-sm font-medium leading-snug text-green-forest">
          {book.title}
        </p>
        <p className="mt-0.5 font-body text-label text-text-secondary">
          {book.author}
        </p>
      </div>
    </Link>
  );
}
