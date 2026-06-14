import type { Metadata } from "next";
import { SearchIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Design System Verify",
  robots: { index: false, follow: false },
};

export default function DesignSystemVerifyPage() {
  return (
    <div className="mx-auto max-w-container px-6 py-8">
      <h1 className="font-heading text-h1 text-green-forest">Design System Verify</h1>
      <p className="mt-2 font-body text-body text-text-secondary">
        Internal page to confirm WOL tokens and utility classes compile correctly.
      </p>

      <section className="mt-8">
        <h2 className="font-heading text-h2 text-green-forest">Brand Colors</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="h-16 w-24 rounded-md bg-green-nature" title="green-nature" />
          <div className="h-16 w-24 rounded-md bg-green-forest" title="green-forest" />
          <div className="h-16 w-24 rounded-md bg-orange-sunrise" title="orange-sunrise" />
        </div>
      </section>

      <section className="mt-8 flex flex-wrap gap-3">
        <button type="button" className="btn-primary">btn-primary</button>
        <button type="button" className="btn-secondary">btn-secondary</button>
        <button type="button" className="btn-cta">btn-cta</button>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="card-stat">
          <p className="card-stat__label">card-stat</p>
          <p className="card-stat__value">42</p>
        </div>
        <div className="card-book max-w-[220px]">
          <div className="card-book__body">
            <span className="card-book__genre">Education</span>
            <p className="card-book__title">card-book</p>
            <p className="card-book__author">Sample Author</p>
          </div>
        </div>
      </section>

      <section className="relative mt-8 max-w-md">
        <SearchIcon className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-green-nature" />
        <input type="search" className="input-search" placeholder="input-search" readOnly />
      </section>
    </div>
  );
}
