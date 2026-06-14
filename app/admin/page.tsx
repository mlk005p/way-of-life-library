"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpenIcon,
  CheckCircleIcon,
  PlusIcon,
  SearchIcon,
  ShieldIcon,
  UsersIcon,
  XCircleIcon,
} from "lucide-react";

import { useAuth } from "@/components/providers";
import {
  adminInventory,
  adminMembers,
  adminRecentRequests,
  books,
  getAvailabilityBadgeClass,
  getAvailabilityLabel,
} from "@/lib/library-data";

type Tab = "overview" | "inventory" | "members";

export default function AdminPage() {
  const { user, profile, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [inventorySearch, setInventorySearch] = useState("");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-forest border-t-transparent" />
      </div>
    );
  }

  if (!user || !profile || profile.role !== "admin") {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12">
        <ShieldIcon className="mx-auto mb-4 h-12 w-12 text-text-secondary/40" />
        <h1 className="font-heading text-h1 font-medium text-green-forest">
          Admin access required
        </h1>
        <p className="mt-3 font-body text-body text-text-secondary">
          You need to be logged in as an admin to view this page.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-block rounded-lg bg-green-forest px-6 py-3 font-body text-body font-medium text-white no-underline transition-colors hover:bg-green-forest/90"
        >
          Login as Admin
        </Link>
      </div>
    );
  }

  const availableCount = books.filter((b) => b.availability === "available").length;
  const pendingCount = adminRecentRequests.filter((r) => r.status === "Pending").length;

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
      <div className="mt-10 flex gap-1 border-b border-[#C8E6A0] mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`-mb-px border-b-2 px-5 py-3 font-body text-sm font-medium transition-colors ${
              activeTab === tab.key
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
          totalBooks={books.length}
          availableCount={availableCount}
          memberCount={adminMembers.length}
          pendingCount={pendingCount}
        />
      )}
      {activeTab === "inventory" && (
        <InventoryTab search={inventorySearch} setSearch={setInventorySearch} />
      )}
      {activeTab === "members" && <MembersTab />}
    </div>
  );
}

/* ---------- Overview ---------- */

function OverviewTab({
  totalBooks,
  availableCount,
  memberCount,
  pendingCount,
}: {
  totalBooks: number;
  availableCount: number;
  memberCount: number;
  pendingCount: number;
}) {
  const overviewStats = [
    { label: "Total Books", value: totalBooks, icon: BookOpenIcon },
    { label: "Available", value: availableCount, icon: CheckCircleIcon },
    { label: "Members", value: memberCount, icon: UsersIcon },
    { label: "Pending Requests", value: pendingCount, icon: SearchIcon },
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

      {/* Recent requests */}
      <section className="mt-12">
        <h2 className="mb-6 font-heading text-h3 font-medium text-green-forest">
          Recent Requests
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[#07593E]/[0.08]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#07593E]/[0.06] bg-[#F8FDF4]">
                <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Member</th>
                <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Book</th>
                <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Date</th>
                <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Status</th>
                <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminRecentRequests.map((req, i) => (
                <tr key={i} className="border-b border-[#07593E]/[0.04] last:border-0">
                  <td className="px-5 py-4 font-body text-body font-medium text-green-forest">{req.member}</td>
                  <td className="px-5 py-4 font-body text-body-sm text-text-secondary">{req.book}</td>
                  <td className="px-5 py-4 font-body text-body-sm text-text-secondary">{req.date}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 font-body text-label font-semibold uppercase ${
                      req.status === "Pending" ? "badge-info" : req.status === "Approved" ? "badge-available" : "badge-borrowed"
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {req.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => alert(`Approved request from ${req.member} for "${req.book}"`)}
                          className="flex items-center gap-1 rounded-md bg-green-forest px-3 py-1.5 font-body text-label font-medium text-white transition-colors hover:bg-green-forest/90"
                        >
                          <CheckCircleIcon className="h-3.5 w-3.5" />
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => alert(`Rejected request from ${req.member}`)}
                          className="flex items-center gap-1 rounded-md border border-red-200 bg-white px-3 py-1.5 font-body text-label font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          <XCircleIcon className="h-3.5 w-3.5" />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="font-body text-label text-text-secondary">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Member overview */}
      <section className="mt-12">
        <h2 className="mb-6 font-heading text-h3 font-medium text-green-forest">
          Member Overview
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[#07593E]/[0.08]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#07593E]/[0.06] bg-[#F8FDF4]">
                <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Name</th>
                <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Books</th>
                <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Status</th>
                <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Joined</th>
              </tr>
            </thead>
            <tbody>
              {adminMembers.map((member) => (
                <tr key={member.name} className="border-b border-[#07593E]/[0.04] last:border-0">
                  <td className="px-5 py-4 font-body text-body font-medium text-green-forest">{member.name}</td>
                  <td className="px-5 py-4 font-body text-body-sm text-text-secondary">{member.booksBorrowed}</td>
                  <td className="px-5 py-4">
                    <span className="badge-available inline-flex rounded-full px-2.5 py-0.5 font-body text-label font-semibold uppercase">
                      {member.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-body text-body-sm text-text-secondary">{member.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

/* ---------- Inventory ---------- */

function InventoryTab({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  const filteredInventory = useMemo(() => {
    if (!search) return adminInventory;
    const q = search.toLowerCase();
    return adminInventory.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search inventory…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-[#C8E6A0] bg-white pl-10 pr-4 font-body text-body-sm text-green-forest placeholder:text-text-secondary/50 outline-none transition-colors focus:border-[#3EBCEB] focus:ring-1 focus:ring-[#3EBCEB]/30"
          />
        </div>
        <button
          type="button"
          onClick={() => alert("Add Book is a Phase 2 feature.")}
          className="inline-flex items-center gap-2 rounded-lg bg-green-forest px-5 py-2.5 font-body text-body-sm font-medium text-white transition-colors hover:bg-green-forest/90"
        >
          <PlusIcon className="h-4 w-4" />
          Add Book
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#07593E]/[0.08]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#07593E]/[0.06] bg-[#F8FDF4]">
              <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Title</th>
              <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Author</th>
              <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Genre</th>
              <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Level</th>
              <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Copies</th>
              <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Status</th>
              <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((book) => (
              <tr key={book.id} className="border-b border-[#07593E]/[0.04] last:border-0">
                <td className="px-5 py-4 font-body text-body font-medium text-green-forest">{book.title}</td>
                <td className="px-5 py-4 font-body text-body-sm text-text-secondary">{book.author}</td>
                <td className="px-5 py-4 font-body text-body-sm text-text-secondary">{book.genre}</td>
                <td className="px-5 py-4 font-body text-body-sm text-text-secondary">{book.class}</td>
                <td className="px-5 py-4 font-body text-body-sm font-semibold text-green-forest">{book.copies}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 font-body text-label font-semibold uppercase ${getAvailabilityBadgeClass(book.availability)}`}>
                    {getAvailabilityLabel(book.availability)}
                  </span>
                </td>
                <td className="px-5 py-4 font-body text-body-sm text-text-secondary">{book.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ---------- Members ---------- */

function MembersTab() {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#07593E]/[0.08]">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#07593E]/[0.06] bg-[#F8FDF4]">
            <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Name</th>
            <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Books Borrowed</th>
            <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Status</th>
            <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Joined</th>
            <th className="px-5 py-3 font-body text-label uppercase tracking-wider text-text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminMembers.map((member) => (
            <tr key={member.name} className="border-b border-[#07593E]/[0.04] last:border-0">
              <td className="px-5 py-4 font-body text-body font-medium text-green-forest">{member.name}</td>
              <td className="px-5 py-4 font-body text-body-sm text-text-secondary">{member.booksBorrowed}</td>
              <td className="px-5 py-4">
                <span className="badge-available inline-flex rounded-full px-2.5 py-0.5 font-body text-label font-semibold uppercase">
                  {member.status}
                </span>
              </td>
              <td className="px-5 py-4 font-body text-body-sm text-text-secondary">{member.joined}</td>
              <td className="px-5 py-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => alert(`${member.name}'s membership deactivated (demo).`)}
                    className="rounded-md border border-red-200 bg-white px-3 py-1.5 font-body text-label font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    Deactivate
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
