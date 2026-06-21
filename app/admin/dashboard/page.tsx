"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  BookOpenIcon,
  CheckCircleIcon,
  PlusIcon,
  SearchIcon,
  ShieldIcon,
  UsersIcon,
  InboxIcon,
  TagIcon,
  XIcon,
} from "lucide-react";

import { useAuth } from "@/components/providers";
import { catalogBooks, catalogStats } from "@/lib/library-catalog";

type Tab = "overview" | "inventory" | "members";

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-32">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#76BE46] border-t-transparent" />
        </div>
      }
    >
      <AdminDashboardPageContent />
    </Suspense>
  );
}

function AdminDashboardPageContent() {
  const { user, profile, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  // ── Tab state lives in the URL so refresh preserves the active tab ──
  const activeTab = (searchParams.get("tab") as Tab) || "overview";

  const [inventorySearch, setInventorySearch] = useState("");

  function setActiveTab(tab: Tab) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  const isAdmin = profile?.role === "admin";

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/admin/login");
      } else if (!isAdmin) {
        router.replace("/");
      }
    }
  }, [user, isAdmin, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-forest border-t-transparent" />
      </div>
    );
  }

  if (!user || !profile || !isAdmin) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12">
        <ShieldIcon className="mx-auto mb-4 h-12 w-12 text-text-secondary/40" />
        <h1 className="font-heading text-h1 font-medium text-green-forest">
          Admin access required
        </h1>
        <p className="mt-3 font-body text-body text-text-secondary">
          Redirecting...
        </p>
      </div>
    );
  }

  const availableCount = catalogBooks.filter(
    (b) => b.availability === "available"
  ).length;

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "inventory", label: "Inventory" },
    { key: "members", label: "Members" },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-12 md:py-16">
      <h1 className="font-heading text-h1 font-medium tracking-tight text-green-forest">
        Admin Dashboard
      </h1>
      <p className="mt-2 font-body text-body text-text-secondary">
        Manage inventory, requests, and members.
      </p>

      {/* Tabs */}
      <div className="mb-8 mt-10 flex gap-1 border-b border-[#C8E6A0]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`-mb-px border-b-2 px-5 py-3 font-body text-sm font-medium transition-colors ${activeTab === tab.key
              ? "border-[#76BE46] font-semibold text-[#07593E]"
              : "border-transparent text-[#4A7C59] hover:text-[#07593E]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <OverviewTab
          totalBooks={catalogStats.totalBooks}
          availableCount={availableCount}
          totalAuthors={catalogStats.totalAuthors}
          totalGenres={catalogStats.totalGenres}
        />
      )}
      {activeTab === "inventory" && (
        <InventoryTab
          search={inventorySearch}
          setSearch={setInventorySearch}
        />
      )}
      {activeTab === "members" && <MembersTab />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Overview Tab
───────────────────────────────────────────── */

function OverviewTab({
  totalBooks,
  availableCount,
  totalAuthors,
  totalGenres,
}: {
  totalBooks: number;
  availableCount: number;
  totalAuthors: number;
  totalGenres: number;
}) {
  const overviewStats = [
    { label: "Total Books", value: totalBooks, icon: BookOpenIcon },
    { label: "Available", value: availableCount, icon: CheckCircleIcon },
    { label: "Authors", value: totalAuthors, icon: UsersIcon },
    { label: "Genres", value: totalGenres, icon: TagIcon },
  ];

  return (
    <>
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#07593E]/[0.08] bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF8E6] text-green-forest">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-h3 font-medium text-green-forest">
                  {stat.value}
                </p>
                <p className="font-body text-label text-text-secondary">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent requests — empty state */}
      <section className="mt-12">
        <h2 className="mb-6 font-heading text-h3 font-medium text-green-forest">
          Recent Requests
        </h2>
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#07593E]/[0.08] bg-white py-14 text-center">
          <InboxIcon className="mb-3 h-10 w-10 text-text-secondary/30" />
          <p className="font-heading text-h4 font-medium text-green-forest">
            No pending requests
          </p>
          <p className="mt-1.5 max-w-sm font-body text-body-sm text-text-secondary">
            Member book requests will appear here when submitted.
          </p>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   Inventory Tab
───────────────────────────────────────────── */

function InventoryTab({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  const [page, setPage] = useState(1);
  const [showPhase2Notice, setShowPhase2Notice] = useState(false);
  const perPage = 20;

  const filteredInventory = useMemo(() => {
    if (!search) return catalogBooks;
    const q = search.toLowerCase();
    return catalogBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.ceil(filteredInventory.length / perPage);
  const paged = filteredInventory.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative max-w-md flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search by title, author, or genre…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="h-10 w-full rounded-lg border border-[#C8E6A0] bg-white pl-10 pr-4 font-body text-body-sm text-green-forest outline-none transition-colors placeholder:text-text-secondary/50 focus:border-[#3EBCEB] focus:ring-1 focus:ring-[#3EBCEB]/30"
          />
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="flex items-center gap-3">
            <span className="font-body text-body-sm text-text-secondary">
              {filteredInventory.length} books
            </span>
            <button
              type="button"
              onClick={() => setShowPhase2Notice((v) => !v)}
              className="inline-flex items-center gap-2 rounded-lg bg-green-forest px-5 py-2.5 font-body text-body-sm font-medium text-white transition-colors hover:bg-green-forest/90"
            >
              <PlusIcon className="h-4 w-4" />
              Add Book
            </button>
          </div>

          {/* Phase 2 notice — dismissible inline banner */}
          {showPhase2Notice && (
            <div className="flex items-center gap-2 rounded-lg border border-[#C8E6A0] bg-[#F8FDF4] px-4 py-2.5 text-left">
              <p className="font-body text-body-sm text-green-forest">
                Adding books manually is coming in Phase 2.
              </p>
              <button
                type="button"
                onClick={() => setShowPhase2Notice(false)}
                className="ml-1 text-text-secondary hover:text-green-forest"
                aria-label="Dismiss"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#07593E]/[0.08]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#07593E]/[0.06] bg-[#F8FDF4]">
              {["Title", "Author", "Genre", "Year", "Language", "Status"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {paged.map((book) => (
              <tr
                key={book.id}
                className="border-b border-[#07593E]/[0.04] last:border-0"
              >
                <td className="px-5 py-4 font-body text-body font-medium text-green-forest">
                  {book.title}
                </td>
                <td className="px-5 py-4 font-body text-body-sm text-text-secondary">
                  {book.author}
                </td>
                <td className="px-5 py-4 font-body text-body-sm text-text-secondary">
                  {book.genre}
                </td>
                <td className="px-5 py-4 font-body text-body-sm text-text-secondary">
                  {book.year}
                </td>
                <td className="px-5 py-4 font-body text-body-sm text-text-secondary">
                  {book.language}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 font-body text-label font-semibold uppercase ${book.availability === "available"
                      ? "badge-available"
                      : "badge-borrowed"
                      }`}
                  >
                    {book.availability}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-[#C8E6A0] bg-white px-3 py-1.5 font-body text-body-sm text-green-forest disabled:opacity-40"
          >
            Prev
          </button>
          <span className="font-body text-body-sm text-text-secondary">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-[#C8E6A0] bg-white px-3 py-1.5 font-body text-body-sm text-green-forest disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   Members Tab
───────────────────────────────────────────── */

function MembersTab() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-[#07593E]/[0.08] bg-white py-14 text-center">
      <UsersIcon className="mb-3 h-10 w-10 text-text-secondary/30" />
      <p className="font-heading text-h4 font-medium text-green-forest">
        No members registered yet
      </p>
      <p className="mt-1.5 max-w-sm font-body text-body-sm text-text-secondary">
        Members who sign up will appear here. Member management is coming in
        Phase 2.
      </p>
    </div>
  );
}
