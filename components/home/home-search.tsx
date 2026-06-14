import Link from "next/link";
import { SearchIcon } from "lucide-react";

export function HomeSearch() {
  return (
    <section className="mx-auto max-w-container px-6 md:px-12">
      <div className="mx-auto max-w-3xl">
        <label htmlFor="home-search" className="sr-only">
          Search the library catalog
        </label>
        <div className="relative">
          <SearchIcon
            className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-green-forest/50"
            aria-hidden
          />
          <input
            id="home-search"
            type="search"
            readOnly
            placeholder="Search by title, author, or genre…"
            className="h-14 w-full rounded-2xl border border-[#07593E]/10 bg-white pl-14 pr-6 font-body text-body text-green-forest shadow-[0_1px_2px_rgba(7,89,62,0.04)] transition-shadow placeholder:text-text-secondary/50 focus:border-green-forest/25 focus:outline-none focus:ring-2 focus:ring-[#76BE46]/20"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          {["Education", "Health", "Environment", "Technology"].map((tag) => (
            <Link
              key={tag}
              href="/books"
              className="rounded-full border border-[#07593E]/10 px-3 py-1 font-body text-body-sm text-text-secondary no-underline transition-colors hover:border-green-forest/20 hover:text-green-forest"
            >
              {tag}
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center font-body text-body-sm text-text-secondary sm:text-left">
          <Link href="/books" className="font-medium text-green-forest no-underline hover:text-green-nature">
            Browse full catalog
          </Link>
          <span className="mx-2 text-[#07593E]/20">·</span>
          1,248 books available
        </p>
      </div>
    </section>
  );
}
