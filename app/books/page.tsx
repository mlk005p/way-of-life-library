import type { Metadata } from "next";
import { SearchIcon } from "lucide-react";

import { BookCard } from "@/components/library/book-card";
import { BRAND_LIBRARY_NAME } from "@/lib/brand";
import {
  authors,
  books,
  classes,
  genres,
} from "@/lib/library-data";

export const metadata: Metadata = {
  title: "Books",
  description: `Browse and request books from the ${BRAND_LIBRARY_NAME} catalog.`,
};

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-container px-6 py-12 md:px-12 md:py-16">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-heading text-display font-medium tracking-tight text-green-forest md:text-[2.75rem]">
          Book catalog
        </h1>
        <p className="mt-3 font-body text-body-lg text-text-secondary">
          Search and request books from the community library.
        </p>
      </div>

      <div className="mb-10">
        <label htmlFor="catalog-search" className="sr-only">
          Search catalog
        </label>
        <div className="relative mx-auto max-w-3xl">
          <SearchIcon
            className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-green-forest/50"
            aria-hidden
          />
          <input
            id="catalog-search"
            type="search"
            className="h-14 w-full rounded-2xl border border-[#07593E]/10 bg-white pl-14 pr-6 font-body text-body text-green-forest shadow-[0_1px_2px_rgba(7,89,62,0.04)] transition-shadow placeholder:text-text-secondary/50 focus:border-green-forest/25 focus:outline-none focus:ring-2 focus:ring-[#76BE46]/20"
            placeholder="Search by title, author, or genre…"
          />
        </div>
      </div>

      <div className="mb-12 border-t border-[#07593E]/[0.06] pt-8">
        <p className="mb-4 font-body text-body-sm uppercase tracking-wider text-text-secondary">
          Filters
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="form-group">
            <label htmlFor="filter-author" className="form-label">
              Author
            </label>
            <select id="filter-author" className="select" defaultValue="">
              <option value="">All authors</option>
              {authors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="filter-genre" className="form-label">
              Genre
            </label>
            <select id="filter-genre" className="select" defaultValue="">
              <option value="">All genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="filter-class" className="form-label">
              Level
            </label>
            <select id="filter-class" className="select" defaultValue="">
              <option value="">All levels</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="filter-availability" className="form-label">
              Availability
            </label>
            <select id="filter-availability" className="select" defaultValue="">
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="borrowed">On loan</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
        </div>
        <p className="mt-6 font-body text-body-sm text-text-secondary">
          Showing {books.length} books
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} variant="minimal" />
        ))}
      </div>
    </div>
  );
}
