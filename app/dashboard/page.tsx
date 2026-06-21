"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpenIcon,
  ClockIcon,
  CreditCardIcon,
  BarChart3Icon,
  InboxIcon,
} from "lucide-react";

import { PrototypePaymentModal } from "@/components/payment/prototype-payment-modal";
import { useAuth } from "@/components/providers";
import { catalogBooks } from "@/lib/library-catalog";
import {
  BillingCycle,
  getMembershipPlan,
  membershipPlans,
} from "@/lib/membership-plans";

// Pick some recommendations from catalog
const recommendedCatalogBooks = catalogBooks
  .filter((b) => b.availability === "available" && b.imageUrl)
  .slice(10, 16);

const recentCatalogBooks = [...catalogBooks]
  .filter((b) => b.imageUrl)
  .sort((a, b) => b.year - a.year)
  .slice(0, 3);

function getValidCycle(cycle?: string | null): BillingCycle {
  return cycle === "quarterly" || cycle === "yearly" ? cycle : "monthly";
}

export default function DashboardPage() {
  const { user, profile, updateMembership, isLoading } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState("family");
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>("monthly");
  const [lastPaymentId, setLastPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shouldCheckout = params.get("checkout") === "1";
    const planId = params.get("plan");
    const cycle = getValidCycle(params.get("cycle"));

    if (planId) {
      setSelectedPlanId(getMembershipPlan(planId).id);
    }
    setSelectedCycle(cycle);

    if (shouldCheckout) {
      setCheckoutOpen(true);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-forest border-t-transparent" />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12">
        <h1 className="font-heading text-h1 font-medium text-green-forest">
          Sign in to access your dashboard
        </h1>
        <p className="mt-3 font-body text-body text-text-secondary">
          You need to be logged in to view your borrowing history, requests, and
          membership.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-block rounded-lg bg-green-forest px-6 py-3 font-body text-body font-medium text-white no-underline transition-colors hover:bg-green-forest/90"
        >
          Login
        </Link>
      </div>
    );
  }

  const isMemberActive = profile.membership_status === "active";
  const selectedPlan = getMembershipPlan(selectedPlanId);

  const dashboardStats = [
    {
      label: "Membership",
      value: isMemberActive
        ? "Active"
        : profile.membership_status.charAt(0).toUpperCase() +
          profile.membership_status.slice(1),
      icon: CreditCardIcon,
      accent: isMemberActive ? "text-green-nature" : "text-[#F7941D]",
    },
    { label: "Books Borrowed", value: "0", icon: BookOpenIcon, accent: "text-green-forest" },
    { label: "Pending Requests", value: "0", icon: ClockIcon, accent: "text-[#3EBCEB]" },
    { label: "Books Read", value: "0", icon: BarChart3Icon, accent: "text-[#F7941D]" },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-12 md:py-16">
      <h1 className="font-heading text-h1 font-medium tracking-tight text-green-forest">
        Welcome back, {user.full_name || user.email}
      </h1>
      <p className="mt-2 font-body text-body text-text-secondary">
        Manage your membership, borrowed books, and reading activity.
      </p>

      {/* Membership card */}
      <div className="mt-10 rounded-xl border border-[#07593E]/[0.08] bg-white p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-body text-label uppercase tracking-wider text-text-secondary">
              Membership status
            </p>
            <div className="mt-2 flex items-center gap-3">
              {isMemberActive ? (
                <span className="badge-available inline-flex items-center rounded-full px-3 py-1 font-body text-label font-semibold uppercase">
                  Active
                </span>
              ) : (
                <span className="badge-borrowed inline-flex items-center rounded-full px-3 py-1 font-body text-label font-semibold uppercase">
                  {profile.membership_status}
                </span>
              )}
              {isMemberActive && (
                <span className="font-body text-body-sm text-text-secondary">
                  Valid through Dec 2026
                </span>
              )}
            </div>
            {lastPaymentId && (
              <p className="mt-3 font-body text-body-sm text-text-secondary">
                Latest payment:{" "}
                <span className="font-semibold text-green-forest">
                  {lastPaymentId}
                </span>
              </p>
            )}
          </div>
          <div>
            {isMemberActive ? (
              <button
                type="button"
                onClick={() => alert("Membership renewal is a Phase 2 feature.")}
                className="rounded-lg border border-[#C8E6A0] px-5 py-2.5 font-body text-body-sm font-medium text-green-forest transition-colors hover:bg-[#EEF8E6]"
              >
                Renew
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                className="rounded-lg bg-green-forest px-5 py-2.5 font-body text-body-sm font-medium text-white transition-colors hover:bg-green-forest/90"
              >
                Activate with Payment
              </button>
            )}
          </div>
        </div>

        {!isMemberActive && (
          <div className="mt-6 rounded-lg border border-[#C8E6A0] bg-[#F8FDF4] p-4">
            <div className="grid gap-4 md:grid-cols-[1fr_180px_180px] md:items-end">
              <div>
                <label htmlFor="dashboard-plan" className="form-label">
                  Membership plan
                </label>
                <select
                  id="dashboard-plan"
                  className="select"
                  value={selectedPlanId}
                  onChange={(event) => setSelectedPlanId(event.target.value)}
                >
                  {membershipPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="dashboard-cycle" className="form-label">
                  Billing
                </label>
                <select
                  id="dashboard-cycle"
                  className="select"
                  value={selectedCycle}
                  onChange={(event) =>
                    setSelectedCycle(getValidCycle(event.target.value))
                  }
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                className="rounded-lg bg-orange-sunrise px-5 py-2.5 font-body text-body-sm font-bold text-white transition-colors hover:bg-[#e8851a]"
              >
                Pay now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[#07593E]/[0.08] bg-white p-5">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF8E6] ${stat.accent}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-h3 font-medium text-green-forest">{stat.value}</p>
                <p className="font-body text-label text-text-secondary">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Currently Borrowed — empty state */}
      <section className="mt-14">
        <h2 className="mb-6 font-heading text-h3 font-medium text-green-forest">Currently Borrowed</h2>
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#07593E]/[0.08] bg-white py-14 text-center">
          <InboxIcon className="mb-3 h-10 w-10 text-text-secondary/30" />
          <p className="font-heading text-h4 font-medium text-green-forest">No books borrowed yet</p>
          <p className="mt-1.5 max-w-sm font-body text-body-sm text-text-secondary">
            Browse the catalog and add books to your cart to request them.
          </p>
          <Link
            href="/books"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-forest px-5 py-2.5 font-body text-body-sm font-medium text-white no-underline transition-colors hover:bg-green-forest/90"
          >
            <BookOpenIcon className="h-4 w-4" />
            Browse Catalog
          </Link>
        </div>
      </section>

      {/* Pending Requests — empty state */}
      <section className="mt-14">
        <h2 className="mb-6 font-heading text-h3 font-medium text-green-forest">Pending Requests</h2>
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#07593E]/[0.08] bg-white py-14 text-center">
          <ClockIcon className="mb-3 h-10 w-10 text-text-secondary/30" />
          <p className="font-heading text-h4 font-medium text-green-forest">No pending requests</p>
          <p className="mt-1.5 max-w-sm font-body text-body-sm text-text-secondary">
            When you submit a book request from your cart, it will appear here.
          </p>
        </div>
      </section>

      {/* Recommended */}
      <section className="mt-14">
        <h2 className="mb-6 font-heading text-h3 font-medium text-green-forest">Recommended for you</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedCatalogBooks.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} className="group flex gap-4 rounded-xl border border-[#07593E]/[0.08] bg-white p-4 no-underline transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#07593E]/10 to-[#76BE46]/10">
                {book.imageUrl ? (
                  <img src={book.imageUrl} alt={book.title} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center"><span className="font-heading text-xs font-bold text-green-forest/20">{book.title.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase()}</span></div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-body text-[10px] font-bold uppercase tracking-wider text-text-secondary">{book.genre}</span>
                <p className="mt-1 font-heading text-body-sm font-medium leading-snug text-green-forest group-hover:text-green-nature">{book.title}</p>
                <p className="mt-0.5 font-body text-label text-text-secondary">{book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section className="mt-14">
        <h2 className="mb-6 font-heading text-h3 font-medium text-green-forest">Recently added</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentCatalogBooks.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} className="group flex gap-4 rounded-xl border border-[#07593E]/[0.08] bg-white p-4 no-underline transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#07593E]/10 to-[#76BE46]/10">
                {book.imageUrl ? (
                  <img src={book.imageUrl} alt={book.title} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center"><span className="font-heading text-xs font-bold text-green-forest/20">{book.title.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase()}</span></div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-body text-[10px] font-bold uppercase tracking-wider text-text-secondary">{book.genre}</span>
                <p className="mt-1 font-heading text-body-sm font-medium leading-snug text-green-forest group-hover:text-green-nature">{book.title}</p>
                <p className="mt-0.5 font-body text-label text-text-secondary">{book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PrototypePaymentModal
        open={checkoutOpen}
        plan={selectedPlan}
        cycle={selectedCycle}
        onClose={() => setCheckoutOpen(false)}
        onPaymentComplete={(paymentId) => {
          setLastPaymentId(paymentId);
          updateMembership("active");
          setCheckoutOpen(false);
        }}
      />
    </div>
  );
}
