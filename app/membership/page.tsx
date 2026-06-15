"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckIcon,
  ArrowRightIcon,
  MapPinIcon,
  ShieldCheckIcon,
  AlertCircleIcon,
  TruckIcon,
  UserCheckIcon,
  StarIcon,
} from "lucide-react";

type BillingCycle = "monthly" | "quarterly" | "yearly";

interface Plan {
  id: string;
  name: string;
  price: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  deposit: number;
  booksAtOneTime: string;
  monthlyLimit: string;
  description: string;
  isPopular?: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "sponsored",
    name: "Sponsored Reader",
    price: { monthly: 0, quarterly: 0, yearly: 0 },
    deposit: 0,
    booksAtOneTime: "1–2",
    monthlyLimit: "2–4",
    description: "Supported by sponsors to ensure every child has access to books.",
    features: [
      "1–2 books at a time",
      "2–4 books monthly limit",
      "No security deposit required",
      "Access to all kids & learning genres",
      "Self-pickup or free delivery"
    ]
  },
  {
    id: "basic",
    name: "Basic Reader",
    price: { monthly: 99, quarterly: 279, yearly: 999 },
    deposit: 399,
    booksAtOneTime: "2",
    monthlyLimit: "4",
    description: "Great for individual readers starting their reading habit.",
    features: [
      "2 books at a time",
      "4 books monthly limit",
      "Refundable deposit of ₹399",
      "Access to full general catalog",
      "Standard delivery options"
    ]
  },
  {
    id: "sibling",
    name: "Sibling Plan",
    price: { monthly: 179, quarterly: 499, yearly: 1799 },
    deposit: 699,
    booksAtOneTime: "4",
    monthlyLimit: "8",
    description: "Ideal for two children or siblings reading together.",
    features: [
      "4 books at a time",
      "8 books monthly limit",
      "Refundable deposit of ₹699",
      "Access to full kids & youth catalog",
      "Flexible exchange policy"
    ]
  },
  {
    id: "family",
    name: "Family Reader",
    price: { monthly: 299, quarterly: 849, yearly: 2999 },
    deposit: 999,
    booksAtOneTime: "6",
    monthlyLimit: "12",
    description: "Perfect for families with diverse reading interests.",
    isPopular: true,
    features: [
      "6 books at a time",
      "12 books monthly limit",
      "Refundable deposit of ₹999",
      "Access to all categories and genres",
      "Priority reservations & holds",
      "Ideal for parents + kids reading"
    ]
  },
  {
    id: "more-books",
    name: "More Books Plan",
    price: { monthly: 399, quarterly: 1099, yearly: 3999 },
    deposit: 1299,
    booksAtOneTime: "4",
    monthlyLimit: "16",
    description: "For high-frequency readers who read and return quickly.",
    features: [
      "4 books at a time",
      "16 books monthly limit",
      "Refundable deposit of ₹1,299",
      "Access to full library catalog",
      "Accelerated return & pick options"
    ]
  },
  {
    id: "unlimited",
    name: "Unlimited Exchange Plan",
    price: { monthly: 599, quarterly: 1699, yearly: 5999 },
    deposit: 1999,
    booksAtOneTime: "5",
    monthlyLimit: "Unlimited exchanges after returns",
    description: "The ultimate plan for voracious readers who finish books in days.",
    features: [
      "5 books at a time",
      "Unlimited exchanges (no monthly cap)",
      "Refundable deposit of ₹1,999",
      "Access to all premium & new releases",
      "Zero reading restrictions"
    ]
  }
];

export default function MembershipPage() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  const getCycleLabel = (c: BillingCycle) => {
    switch (c) {
      case "monthly":
        return "Month";
      case "quarterly":
        return "Quarter";
      case "yearly":
        return "Year";
    }
  };

  const calculateSavingsPercent = (plan: Plan, selectedCycle: BillingCycle) => {
    if (selectedCycle === "monthly" || plan.price.monthly === 0) return 0;
    const monthlyCost = plan.price.monthly;
    if (selectedCycle === "quarterly") {
      const qtrMonthlyEquivalent = plan.price.quarterly / 3;
      return Math.round(((monthlyCost - qtrMonthlyEquivalent) / monthlyCost) * 100);
    } else {
      const yrMonthlyEquivalent = plan.price.yearly / 12;
      return Math.round(((monthlyCost - yrMonthlyEquivalent) / monthlyCost) * 100);
    }
  };

  return (
    <div className="bg-background-page min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* ── Page Header ────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 mb-3 text-overline text-green-nature bg-[#EEF8E6] rounded-full border border-[#C8E6A0]">
            Pricing Plans
          </span>
          <h1 className="font-heading text-display font-bold text-green-forest tracking-tight md:text-[3rem]">
            Choose Your Reading Journey
          </h1>
          <p className="mt-3 text-body-lg text-text-secondary max-w-2xl mx-auto">
            Unlock thousands of books on health, education, tech, and fiction. Pick a membership tier that matches your reading pace.
          </p>
        </div>

        {/* ── Billing Cycle Toggle ───────────────────────────────── */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl bg-white border border-[#C8E6A0] p-1.5 shadow-sm">
            {(["monthly", "quarterly", "yearly"] as BillingCycle[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCycle(c)}
                className={`relative px-6 py-2.5 rounded-lg font-body text-sm font-semibold transition-all duration-200 uppercase tracking-wider ${
                  cycle === c
                    ? "bg-green-nature text-white shadow-sm"
                    : "text-green-forest hover:bg-[#EEF8E6]/60"
                }`}
              >
                {c}
                {c === "yearly" && (
                  <span className="absolute -top-3 -right-2 bg-accent text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-normal animate-pulse">
                    Save ~16%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Plans Cards Grid ───────────────────────────────────── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {plans.map((plan) => {
            const savings = calculateSavingsPercent(plan, cycle);
            const currentPrice = plan.price[cycle];

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl bg-white p-8 transition-all duration-200 border-2 ${
                  plan.isPopular
                    ? "border-accent shadow-cta ring-1 ring-accent/15 scale-105 z-10"
                    : "border-border-default shadow-card hover:shadow-card-hover hover:-translate-y-1"
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full font-body text-xs font-bold shadow-md flex items-center gap-1.5">
                    <StarIcon className="h-3.5 w-3.5 fill-white" />
                    Most Popular
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="font-heading text-h2 font-bold text-green-forest leading-tight">
                    {plan.name}
                  </h3>
                  <p className="mt-2 font-body text-body-sm text-text-secondary min-h-[40px]">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-[#07593E]/[0.08] flex items-baseline gap-1">
                  <span className="font-heading text-[2.5rem] font-bold text-green-forest leading-none">
                    ₹{currentPrice}
                  </span>
                  <span className="text-body-sm text-text-secondary font-medium uppercase tracking-wider">
                    / {getCycleLabel(cycle)}
                  </span>
                  {savings > 0 && (
                    <span className="ml-2 inline-block bg-green-nature/10 text-green-nature text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Save {savings}%
                    </span>
                  )}
                </div>

                {/* Main Plan Limits / Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-body-sm border-b border-[#07593E]/[0.04] pb-2">
                    <span className="text-text-secondary">Books at one time</span>
                    <span className="font-bold text-green-forest bg-[#EEF8E6] px-2.5 py-1 rounded-lg">
                      {plan.booksAtOneTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-start text-body-sm border-b border-[#07593E]/[0.04] pb-2">
                    <span className="text-text-secondary">Monthly limit</span>
                    <span className="font-bold text-green-forest text-right max-w-[150px]">
                      {plan.monthlyLimit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm pb-2">
                    <span className="text-text-secondary">Security Deposit</span>
                    <span className="font-bold text-green-forest">
                      {plan.deposit === 0 ? "Free" : `₹${plan.deposit}`}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckIcon className="h-5 w-5 shrink-0 text-green-nature mt-0.5" />
                      <span className="font-body text-body-sm text-green-forest">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Action */}
                <Link
                  href="/signup"
                  className={`w-full block py-3.5 px-6 text-center font-body text-body-sm font-bold no-underline rounded-xl transition-all duration-200 ${
                    plan.isPopular
                      ? "bg-accent hover:bg-[#e8851a] text-white shadow-cta hover:shadow-hero"
                      : "bg-[#76BE46] hover:bg-[#5fa535] text-white"
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            );
          })}
        </div>

        {/* ── Refundable Deposit Section ─────────────────────────── */}
        <section className="rounded-2xl border border-border-default bg-white p-6 md:p-8 shadow-card mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-green-nature">
              <ShieldCheckIcon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="font-heading text-h2 font-bold text-green-forest leading-tight">
                100% Refundable Security Deposit
              </h2>
              <p className="mt-2 font-body text-body text-text-secondary leading-relaxed">
                To keep our community catalog safe and ensure books are returned in good condition, we collect a one-time refundable security deposit based on your plan. The entire amount is **fully refunded** to your bank account immediately upon membership termination, with no hidden cancellation fees.
              </p>
            </div>
          </div>
        </section>

        {/* ── Delivery Charges Section ───────────────────────────── */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-2xl border border-border-default bg-white p-6 md:p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-green-nature">
                  <TruckIcon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-h3 font-bold text-green-forest">
                  Convenient Delivery Charges
                </h3>
              </div>
              <p className="font-body text-body-sm text-text-secondary mb-6 leading-relaxed">
                Enjoy home delivery and pick-up services straight to your doorstep or school hub, tailored to keep books flowing smoothly.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#07593E]/[0.06]">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-green-nature" />
                    <span className="font-body text-body-sm font-semibold text-green-forest">Self Pickup</span>
                  </div>
                  <span className="font-heading text-body font-bold text-green-nature bg-[#EEF8E6] px-2.5 py-0.5 rounded-full">Free</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#07593E]/[0.06]">
                  <div className="flex items-center gap-2">
                    <TruckIcon className="h-4 w-4 text-[#3EBCEB]" />
                    <span className="font-body text-body-sm font-semibold text-green-forest">One-side Delivery</span>
                  </div>
                  <span className="font-heading text-body font-bold text-green-forest">₹40–₹70</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#07593E]/[0.06]">
                  <div className="flex items-center gap-2">
                    <TruckIcon className="h-4 w-4 text-accent" />
                    <span className="font-body text-body-sm font-semibold text-green-forest">Delivery + Pickup</span>
                  </div>
                  <span className="font-heading text-body font-bold text-green-forest">₹80–₹120</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <UserCheckIcon className="h-4 w-4 text-green-nature" />
                    <span className="font-body text-body-sm font-semibold text-green-forest">Sponsored Child Delivery</span>
                  </div>
                  <span className="font-heading text-body font-bold text-green-nature bg-[#EEF8E6] px-2.5 py-0.5 rounded-full">Free</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border-default bg-[#EEF8E6] p-6 md:p-8 shadow-sm flex flex-col justify-center">
            <div className="flex items-start gap-3.5">
              <AlertCircleIcon className="h-6 w-6 text-green-nature shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-h3 font-bold text-green-forest">
                  How Delivery Billing Works
                </h4>
                <ul className="mt-3 space-y-3 font-body text-body-sm text-text-secondary leading-relaxed">
                  <li>
                    Delivery and pickup rates depend on the physical distance from our nearest community hub.
                  </li>
                  <li>
                    Delivery options can be customized or scheduled on a weekly/monthly basis inside your portal.
                  </li>
                  <li>
                    Sponsored reader deliveries are funded by community sponsors, ensuring Zero delivery cost for child accounts.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Membership Comparison Table ────────────────────────── */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="font-heading text-h2 font-bold text-green-forest">
              Compare Membership Tiers
            </h2>
            <p className="mt-1 font-body text-body text-text-secondary">
              Find the perfect plan for you or your family by comparing their features side-by-side.
            </p>
          </div>

          <div className="table-container shadow-md">
            <div className="overflow-x-auto">
              <table className="table min-w-[800px]">
                <thead>
                  <tr>
                    <th>Membership Plan</th>
                    <th>Books at Once</th>
                    <th>Monthly Limit</th>
                    <th>Security Deposit</th>
                    <th>Monthly Price</th>
                    <th>Quarterly Price</th>
                    <th>Yearly Price</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((p) => (
                    <tr
                      key={p.id}
                      className={p.isPopular ? "bg-[#EEF8E6]/40 hover:bg-[#EEF8E6]/60 font-medium" : ""}
                    >
                      <td className="font-bold">
                        <div className="flex items-center gap-1.5">
                          {p.name}
                          {p.isPopular && (
                            <span className="bg-accent text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                              Popular
                            </span>
                          )}
                        </div>
                      </td>
                      <td>{p.booksAtOneTime}</td>
                      <td>{p.monthlyLimit}</td>
                      <td className="font-semibold text-green-forest">
                        {p.deposit === 0 ? "₹0 (Free)" : `₹${p.deposit}`}
                      </td>
                      <td className="font-bold">₹{p.price.monthly}</td>
                      <td className="font-bold">₹{p.price.quarterly}</td>
                      <td className="font-bold text-green-nature">₹{p.price.yearly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-h2 font-bold text-green-forest">
              Frequently Asked Questions
            </h2>
            <p className="mt-1 font-body text-body text-text-secondary">
              Got questions? We have answers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl border border-border-default shadow-sm">
              <h4 className="font-heading text-h4 font-bold text-green-forest mb-2">
                Can I upgrade or downgrade my plan?
              </h4>
              <p className="font-body text-body-sm text-text-secondary leading-relaxed">
                Yes! You can change your membership plan at any time through your dashboard. If upgrading, you&apos;ll need to top up the security deposit difference. If downgrading, the difference in the security deposit will be refunded to you.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border-default shadow-sm">
              <h4 className="font-heading text-h4 font-bold text-green-forest mb-2">
                What does &quot;Books at one time&quot; mean?
              </h4>
              <p className="font-body text-body-sm text-text-secondary leading-relaxed">
                It refers to the maximum number of books you can have checked out simultaneously. Once you return one or more books, you can borrow new ones up to your monthly limit.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border-default shadow-sm">
              <h4 className="font-heading text-h4 font-bold text-green-forest mb-2">
                How does the Sponsored Reader plan work?
              </h4>
              <p className="font-body text-body-sm text-text-secondary leading-relaxed">
                The Sponsored Reader plan is reserved for children and families in need. Community sponsors fund the costs of the books and free deliveries, so readers pay ₹0 membership and ₹0 deposit.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border-default shadow-sm">
              <h4 className="font-heading text-h4 font-bold text-green-forest mb-2">
                How do I get my deposit back?
              </h4>
              <p className="font-body text-body-sm text-text-secondary leading-relaxed">
                If you choose to cancel your membership, click &quot;Terminate Membership&quot; in your account dashboard. Once all checked-out books are safely returned to our hub, your security deposit will be instantly credited to your original payment method.
              </p>
            </div>
          </div>
        </section>

        {/* ── Become a Member CTA Section ────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#07593E] via-[#0a6b4a] to-[#0d7d56] py-14 md:py-18 rounded-3xl text-white shadow-hero">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#76BE46]/10" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-[#3EBCEB]/10" />

          <div className="relative text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="font-heading text-display font-bold text-white tracking-tight leading-tight">
              Ready to start your reading adventure?
            </h2>
            <p className="mt-4 font-body text-body-lg text-white/80 leading-relaxed">
              Create your account today, choose your membership, and unlock thousands of books immediately.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 font-body text-body font-bold text-white no-underline shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#e8851a] hover:shadow-xl w-full sm:w-auto"
              >
                Create Account
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/books"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/10 px-8 py-3.5 font-body text-body font-semibold text-white no-underline backdrop-blur-sm transition-all hover:bg-white/20 w-full sm:w-auto"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
