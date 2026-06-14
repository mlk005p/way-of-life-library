"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";

import { BookCard } from "@/components/library/book-card";
import {
  books,
  authors,
  genres,
  classes,
  type BookAvailability,
} from "@/lib/library-data";

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");

  useEffect(() => {
    document.title = "Browse Catalog | Way Of Life Library";
  }, []);

  const hasFilters =
    searchQuery || selectedAuthor || selectedGenre || selectedClass || selectedAvailability;

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.genre.toLowerCase().includes(q);
      const matchesAuthor = !selectedAuthor || book.author === selectedAuthor;
      const matchesGenre = !selectedGenre || book.genre === selectedGenre;
      const matchesClass = !selectedClass || book.class === selectedClass;
      const matchesAvailability =
        !selectedAvailability || book.availability === selectedAvailability;
      return matchesSearch && matchesAuthor && matchesGenre && matchesClass && matchesAvailability;
    });
  }, [searchQuery, selectedAuthor, selectedGenre, selectedClass, selectedAvailability]);

  function clearFilters() {
    setSearchQuery("");
    setSelectedAuthor("");
    setSelectedGenre("");
    setSelectedClass("");
    setSelectedAvailability("");
  }

  const selectClass =
    "h-10 appearance-none rounded-lg border border-[#C8E6A0] bg-white px-3 font-body text-body-sm text-green-forest outline-none transition-colors focus:border-[#3EBCEB] focus:ring-1 focus:ring-[#3EBCEB]/30";

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-heading text-h1 font-medium tracking-tight text-green-forest">
          Book catalog
        </h1>
        <p className="mt-2 font-body text-body text-text-secondary">
          Search and filter to find the right book for you.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search by title, author, or genre…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-[#C8E6A0] bg-white pl-10 pr-4 font-body text-body-sm text-green-forest placeholder:text-text-secondary/50 outline-none transition-colors focus:border-[#3EBCEB] focus:ring-1 focus:ring-[#3EBCEB]/30"
          />
        </div>

        {/* Filter selects */}
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className={selectClass}>
          <option value="">All genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)} className={selectClass}>
          <option value="">All authors</option>
          {authors.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className={selectClass}>
          <option value="">All levels</option>
          {classes.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value as "" | BookAvailability)} className={selectClass}>
          <option value="">All availability</option>
          <option value="available">Available</option>
          <option value="borrowed">On Loan</option>
          <option value="reserved">Reserved</option>
        </select>
      </div>

      {/* Results info */}
      <div className="mb-8 flex items-center justify-between">
        <p className="font-body text-body-sm text-text-secondary">
          Showing <span className="font-semibold text-green-forest">{filteredBooks.length}</span> of{" "}
          <span className="font-semibold text-green-forest">{books.length}</span> books
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#C8E6A0] px-3 py-1.5 font-body text-body-sm font-medium text-text-secondary transition-colors hover:border-green-forest/30 hover:text-green-forest"
          >
            <XIcon className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} variant="minimal" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <SearchIcon className="mb-4 h-10 w-10 text-text-secondary/40" />
          <p className="font-heading text-h3 font-medium text-green-forest">
            No books found
          </p>
          <p className="mt-2 font-body text-body-sm text-text-secondary">
            Try adjusting your search or filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-lg bg-green-forest px-5 py-2.5 font-body text-body-sm font-medium text-white transition-colors hover:bg-green-forest/90"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
