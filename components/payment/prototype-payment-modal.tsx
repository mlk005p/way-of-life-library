"use client";

import { useState } from "react";
import {
  BadgeCheckIcon,
  Building2Icon,
  CreditCardIcon,
  Loader2Icon,
  QrCodeIcon,
  SmartphoneIcon,
  XIcon,
} from "lucide-react";

import {
  BillingCycle,
  getCycleLabel,
  getPlanTotal,
  MembershipPlan,
} from "@/lib/membership-plans";

type PaymentMethod = "upi" | "card" | "netbanking";

type PrototypePaymentModalProps = {
  open: boolean;
  plan: MembershipPlan;
  cycle: BillingCycle;
  onClose: () => void;
  onPaymentComplete: (paymentId: string) => void;
};

const paymentMethods: Array<{
  id: PaymentMethod;
  label: string;
  description: string;
  icon: typeof SmartphoneIcon;
}> = [
  {
    id: "upi",
    label: "UPI",
    description: "PhonePe, Google Pay, Paytm",
    icon: SmartphoneIcon,
  },
  {
    id: "card",
    label: "Card",
    description: "Debit or credit card",
    icon: CreditCardIcon,
  },
  {
    id: "netbanking",
    label: "NetBanking",
    description: "Pay from your bank",
    icon: Building2Icon,
  },
];

function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function PrototypePaymentModal({
  open,
  plan,
  cycle,
  onClose,
  onPaymentComplete,
}: PrototypePaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("upi");
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const [paymentId, setPaymentId] = useState("");
  const total = getPlanTotal(plan, cycle);

  if (!open) return null;

  function handlePayNow() {
    const nextPaymentId = `WOL-PAY-${Date.now().toString().slice(-6)}`;
    setPaymentId(nextPaymentId);
    setStatus("processing");
    window.setTimeout(() => {
      setStatus("success");
      window.setTimeout(() => {
        onPaymentComplete(nextPaymentId);
        setStatus("idle");
      }, 900);
    }, 1100);
  }

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === selectedMethod
  );

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center bg-black/45 px-4 py-8">
      <div
        className="absolute inset-0"
        onClick={status === "processing" ? undefined : onClose}
        aria-hidden="true"
      />
      <section
        className="relative grid w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-hero md:grid-cols-[1fr_360px]"
        role="dialog"
        aria-modal="true"
        aria-label="Membership payment"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="badge-info">Prototype checkout</span>
              <h2 className="mt-3 font-heading text-h2 font-bold text-green-forest">
                Complete your membership payment
              </h2>
              <p className="mt-1 font-body text-body-sm text-text-secondary">
                Select a payment method to activate your library membership.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={status === "processing"}
              className="flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-[#EEF8E6] hover:text-green-forest disabled:opacity-40"
              aria-label="Close payment"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {status === "success" ? (
            <div className="mt-10 flex min-h-[330px] flex-col items-center justify-center rounded-lg border border-[#C8E6A0] bg-[#F8FDF4] p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-nature text-white">
                <BadgeCheckIcon className="h-9 w-9" />
              </div>
              <h3 className="mt-5 font-heading text-h2 font-bold text-green-forest">
                Payment successful
              </h3>
              <p className="mt-2 font-body text-body-sm text-text-secondary">
                Transaction {paymentId} has been recorded for the demo.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = method.id === selectedMethod;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`rounded-lg border p-4 text-left transition-all ${
                        isSelected
                          ? "border-green-nature bg-[#EEF8E6] shadow-card"
                          : "border-[#C8E6A0] bg-white hover:border-green-nature"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          isSelected ? "text-green-nature" : "text-text-secondary"
                        }`}
                      />
                      <p className="mt-3 font-heading text-body font-bold text-green-forest">
                        {method.label}
                      </p>
                      <p className="font-body text-label text-text-secondary">
                        {method.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-lg border border-[#C8E6A0] bg-[#F8FDF4] p-5">
                {selectedMethod === "upi" && (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-[#C8E6A0] bg-white">
                      <QrCodeIcon className="h-12 w-12 text-green-forest" />
                    </div>
                    <div className="flex-1">
                      <label className="form-label" htmlFor="upi-id">
                        UPI ID
                      </label>
                      <input
                        id="upi-id"
                        className="input"
                        placeholder="name@upi"
                        defaultValue="demo@upi"
                      />
                    </div>
                  </div>
                )}

                {selectedMethod === "card" && (
                  <div className="grid gap-4">
                    <div>
                      <label className="form-label" htmlFor="card-number">
                        Card number
                      </label>
                      <input
                        id="card-number"
                        className="input"
                        inputMode="numeric"
                        defaultValue="4111 1111 1111 1111"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label" htmlFor="card-expiry">
                          Expiry
                        </label>
                        <input id="card-expiry" className="input" defaultValue="12/28" />
                      </div>
                      <div>
                        <label className="form-label" htmlFor="card-cvv">
                          CVV
                        </label>
                        <input id="card-cvv" className="input" defaultValue="123" />
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === "netbanking" && (
                  <div>
                    <label className="form-label" htmlFor="bank">
                      Select bank
                    </label>
                    <select id="bank" className="select">
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handlePayNow}
                disabled={status === "processing"}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-forest px-5 py-3 font-body text-body-sm font-bold text-white transition-colors hover:bg-green-forest/90 disabled:opacity-70"
              >
                {status === "processing" && (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                )}
                {status === "processing"
                  ? "Processing payment..."
                  : `Pay ${formatCurrency(total)}`}
              </button>

              <p className="mt-3 text-center font-body text-label text-text-secondary">
                Demo only: no real payment will be charged through{" "}
                {selectedPaymentMethod?.label}.
              </p>
            </>
          )}
        </div>

        <aside className="bg-[#EEF8E6] p-6 md:p-8">
          <p className="font-body text-label uppercase tracking-wider text-text-secondary">
            Order summary
          </p>
          <h3 className="mt-2 font-heading text-h2 font-bold text-green-forest">
            {plan.name}
          </h3>
          <p className="mt-1 font-body text-body-sm text-text-secondary">
            {cycle.charAt(0).toUpperCase() + cycle.slice(1)} billing
          </p>

          <div className="mt-8 space-y-4 rounded-lg bg-white p-5 shadow-card">
            <div className="flex justify-between gap-4 font-body text-body-sm">
              <span className="text-text-secondary">
                Membership / {getCycleLabel(cycle)}
              </span>
              <span className="font-bold text-green-forest">
                {formatCurrency(plan.price[cycle])}
              </span>
            </div>
            <div className="flex justify-between gap-4 font-body text-body-sm">
              <span className="text-text-secondary">Refundable deposit</span>
              <span className="font-bold text-green-forest">
                {formatCurrency(plan.deposit)}
              </span>
            </div>
            <div className="border-t border-[#C8E6A0] pt-4">
              <div className="flex justify-between gap-4">
                <span className="font-body text-body font-bold text-green-forest">
                  Total due today
                </span>
                <span className="font-heading text-h3 font-bold text-green-forest">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-[#C8E6A0] bg-white/70 p-4">
            <p className="font-body text-label font-bold uppercase tracking-wider text-green-forest">
              Included after payment
            </p>
            <ul className="mt-3 space-y-2 font-body text-body-sm text-text-secondary">
              <li>{plan.booksAtOneTime} books at one time</li>
              <li>{plan.monthlyLimit} monthly limit</li>
              <li>Instant membership activation</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
