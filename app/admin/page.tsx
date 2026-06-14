import type { Metadata } from "next";
import {
  adminInventory,
  adminMembers,
  adminRecentRequests,
  books,
  platformStats,
} from "@/lib/library-data";
import {
  getAvailabilityBadgeClass,
  getAvailabilityLabel,
} from "@/lib/library-data";
import { BRAND_FOUNDATION_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Admin",
  description: `${BRAND_FOUNDATION_NAME} inventory and member management.`,
};

const availableCount = books.filter((b) => b.availability === "available").length;
const pendingCount = adminRecentRequests.filter(
  (r) => r.status === "Pending"
).length;

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-container px-6 py-12 md:px-12 md:py-16">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-display font-medium tracking-tight text-green-forest md:text-[2.75rem]">
            Library management
          </h1>
          <p className="mt-3 font-body text-body-lg text-text-secondary">
            Inventory, members, and requests for {BRAND_FOUNDATION_NAME}.
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg bg-green-forest px-5 py-2.5 font-body text-body-sm font-medium text-white transition-colors hover:bg-green-forest/90"
        >
          Add book
        </button>
      </div>

      <div className="mb-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
        <div>
          <p className="font-heading text-[2rem] font-medium leading-none text-green-forest">
            {platformStats.booksAvailable.toLocaleString()}
          </p>
          <p className="mt-2 font-body text-body-sm uppercase tracking-wider text-text-secondary">
            Total books
          </p>
        </div>
        <div>
          <p className="font-heading text-[2rem] font-medium leading-none text-green-forest">
            {availableCount}
          </p>
          <p className="mt-2 font-body text-body-sm uppercase tracking-wider text-text-secondary">
            Available
          </p>
        </div>
        <div>
          <p className="font-heading text-[2rem] font-medium leading-none text-green-forest">
            {platformStats.activeMembers.toLocaleString()}
          </p>
          <p className="mt-2 font-body text-body-sm uppercase tracking-wider text-text-secondary">
            Members
          </p>
        </div>
        <div>
          <p className="font-heading text-[2rem] font-medium leading-none text-orange-sunrise">
            {pendingCount}
          </p>
          <p className="mt-2 font-body text-body-sm uppercase tracking-wider text-text-secondary">
            Pending requests
          </p>
        </div>
      </div>

      {/* Inventory table */}
      <section className="mt-10">
        <h2 className="mb-4 font-heading text-h2 text-green-forest">
          Book Inventory
        </h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Class</th>
                <th>Copies</th>
                <th>Status</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {adminInventory.map((book) => (
                <tr key={book.id}>
                  <td className="font-medium">{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.class}</td>
                  <td>{book.copies}</td>
                  <td>
                    <span className={getAvailabilityBadgeClass(book.availability)}>
                      {getAvailabilityLabel(book.availability)}
                    </span>
                  </td>
                  <td>{book.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Recent requests */}
        <section>
          <h2 className="mb-4 font-heading text-h3 text-green-forest">
            Recent Requests
          </h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Book</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {adminRecentRequests.map((request, index) => (
                  <tr key={index}>
                    <td>{request.member}</td>
                    <td>{request.book}</td>
                    <td>{request.date}</td>
                    <td>
                      <span
                        className={
                          request.status === "Pending"
                            ? "badge-borrowed"
                            : request.status === "Approved"
                              ? "badge-info"
                              : "badge-available"
                        }
                      >
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Member overview */}
        <section>
          <h2 className="mb-4 font-heading text-h3 text-green-forest">
            Member Overview
          </h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Borrowed</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {adminMembers.map((member) => (
                  <tr key={member.name}>
                    <td className="font-medium">{member.name}</td>
                    <td>{member.booksBorrowed}</td>
                    <td>
                      <span className="badge-available">{member.status}</span>
                    </td>
                    <td>{member.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
