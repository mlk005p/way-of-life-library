"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  SearchIcon,
  ShoppingCartIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { useCart } from "@/components/providers";
import {
  catalogBooks,
  catalogGenres,
  catalogAgeGroups,
  type CatalogBook,
} from "@/lib/library-catalog";

const BOOKS_PER_PAGE = 24;

// Top genres to show (with reasonable counts)
const topGenres = catalogGenres.filter((g) =>
  [
    "Fiction",
    "Romance",
    "Thriller / Horror/ Detective Books",
    "Self Learning - Motivation Books",
    "Biographies & Autobiographies",
    "Religious & Spirituality",
    "General Knowledge Books",
    "Fantasy",
    "Classics / Short Stories",
    "Political & Current Affairs",
  ].includes(g)
);

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");
  const [availFilter, setAvailFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { items, addItem } = useCart();

  const filtered = useMemo(() => {
    let result = catalogBooks;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }
    if (genreFilter) {
      result = result.filter((b) => b.genre === genreFilter);
    }
    if (ageFilter) {
      result = result.filter((b) => b.ageGroup === ageFilter);
    }
    if (langFilter) {
      result = result.filter((b) =>
        b.language.toLowerCase().includes(langFilter.toLowerCase())
      );
    }
    if (availFilter) {
      result = result.filter((b) => b.availability === availFilter);
    }

    return result;
  }, [search, genreFilter, ageFilter, langFilter, availFilter]);

  const totalPages = Math.ceil(filtered.length / BOOKS_PER_PAGE);
  const paginatedBooks = filtered.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  // Reset page when filters change
  const updateFilter = (setter: (v: string) => void, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-12 md:py-16">
      <h1 className="font-heading text-h1 font-bold tracking-tight text-green-forest">
        Book Catalog
      </h1>
      <p className="mt-2 font-body text-body text-text-secondary">
        Browse {catalogBooks.length} books across {topGenres.length}+ genres.
      </p>

      {/* Search + Filters */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search by title or author…"
            value={search}
            onChange={(e) => updateFilter(setSearch, e.target.value)}
            className="h-12 w-full rounded-xl border border-[#C8E6A0] bg-white pl-11 pr-4 font-body text-body text-green-forest placeholder:text-text-secondary/50 outline-none transition-colors focus:border-[#3EBCEB] focus:ring-1 focus:ring-[#3EBCEB]/30"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={genreFilter}
            onChange={(e) => updateFilter(setGenreFilter, e.target.value)}
            className="h-10 rounded-lg border border-[#C8E6A0] bg-white px-3 pr-8 font-body text-body-sm text-green-forest outline-none focus:border-[#3EBCEB]"
          >
            <option value="">All Genres</option>
            {topGenres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            value={ageFilter}
            onChange={(e) => updateFilter(setAgeFilter, e.target.value)}
            className="h-10 rounded-lg border border-[#C8E6A0] bg-white px-3 pr-8 font-body text-body-sm text-green-forest outline-none focus:border-[#3EBCEB]"
          >
            <option value="">All Ages</option>
            {catalogAgeGroups.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <select
            value={langFilter}
            onChange={(e) => updateFilter(setLangFilter, e.target.value)}
            className="h-10 rounded-lg border border-[#C8E6A0] bg-white px-3 pr-8 font-body text-body-sm text-green-forest outline-none focus:border-[#3EBCEB]"
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
          <select
            value={availFilter}
            onChange={(e) => updateFilter(setAvailFilter, e.target.value)}
            className="h-10 rounded-lg border border-[#C8E6A0] bg-white px-3 pr-8 font-body text-body-sm text-green-forest outline-none focus:border-[#3EBCEB]"
          >
            <option value="">All Availability</option>
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="mt-6 font-body text-body-sm text-text-secondary">
        Showing {paginatedBooks.length} of {filtered.length} books
        {filtered.length !== catalogBooks.length && " (filtered)"}
      </p>

      {/* Book Grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {paginatedBooks.map((book) => (
          <CatalogCard
            key={book.id}
            book={book}
            inCart={items.some((i) => String(i.id) === String(book.id))}
            onAdd={() =>
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
          />
        ))}
      </div>

      {/* Empty state */}
      {paginatedBooks.length === 0 && (
        <div className="flex flex-col items-center py-20 text-center">
          <SearchIcon className="mb-4 h-12 w-12 text-text-secondary/30" />
          <p className="font-heading text-h3 font-medium text-green-forest">
            No books found
          </p>
          <p className="mt-2 font-body text-body-sm text-text-secondary">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C8E6A0] bg-white text-green-forest transition-colors hover:bg-[#EEF8E6] disabled:opacity-40"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let page: number;
            if (totalPages <= 7) {
              page = i + 1;
            } else if (currentPage <= 4) {
              page = i + 1;
            } else if (currentPage >= totalPages - 3) {
              page = totalPages - 6 + i;
            } else {
              page = currentPage - 3 + i;
            }
            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg font-body text-body-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-green-forest text-white"
                    : "border border-[#C8E6A0] bg-white text-green-forest hover:bg-[#EEF8E6]"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C8E6A0] bg-white text-green-forest transition-colors hover:bg-[#EEF8E6] disabled:opacity-40"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Catalog Card Component ─────────────────────────────── */

function CatalogCard({
  book,
  inCart,
  onAdd,
}: {
  book: CatalogBook;
  inCart: boolean;
  onAdd: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const initials = book.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[#07593E]/[0.08] bg-white transition-all hover:-translate-y-1 hover:shadow-card-hover">
      {/* Cover */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-[#07593E]/10 to-[#76BE46]/10">
        {book.imageUrl && !imgError ? (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-heading text-[2rem] font-bold text-green-forest/25">
              {initials}
            </span>
          </div>
        )}
        {/* Availability badge */}
        <div className="absolute left-2 top-2">
          <span
            className={`inline-flex rounded-full px-2 py-0.5 font-body text-[10px] font-bold uppercase ${
              book.availability === "available"
                ? "bg-[#EEF8E6] text-[#07593E]"
                : "bg-[#FFF8EE] text-[#C47000]"
            }`}
          >
            {book.availability === "available" ? "Available" : "Borrowed"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 font-body text-[10px] font-bold uppercase tracking-wider text-text-secondary">
          {book.genre}
        </span>
        <Link
          href={`/books/${book.id}`}
          className="font-heading text-[15px] font-medium leading-snug text-green-forest no-underline transition-colors hover:text-green-nature"
        >
          {book.title}
        </Link>
        <p className="mt-1 font-body text-body-sm text-text-secondary">
          {book.author}
        </p>
        <p className="mt-0.5 font-body text-[11px] text-text-secondary/60">
          {book.publisher} · {book.year}
        </p>

        {/* Cart button */}
        <div className="mt-auto pt-3">
          {inCart ? (
            <div className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-green-nature/30 bg-green-nature/10 py-2 font-body text-body-sm font-medium text-green-nature">
              <CheckIcon className="h-4 w-4" />
              In Cart
            </div>
          ) : book.availability === "available" ? (
            <button
              type="button"
              onClick={onAdd}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-green-forest/20 py-2 font-body text-body-sm font-medium text-green-forest transition-colors hover:border-green-nature hover:bg-[#76BE46]/[0.06]"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              Add to Cart
            </button>
          ) : (
            <button
              type="button"
              className="w-full rounded-lg border border-green-forest/20 py-2 font-body text-body-sm font-medium text-green-forest/40"
              disabled
            >
              Unavailable
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
