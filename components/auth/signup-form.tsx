"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { BRAND_LIBRARY_NAME } from "@/lib/brand";
import { useAuth } from "@/components/providers";
import {
  BillingCycle,
  getCycleLabel,
  getMembershipPlan,
  getPlanTotal,
} from "@/lib/membership-plans";

type SignupFormProps = {
  selectedPlanId?: string;
  selectedCycle?: string;
};

function getValidCycle(cycle?: string): BillingCycle {
  return cycle === "quarterly" || cycle === "yearly" ? cycle : "monthly";
}

export function SignupForm({ selectedPlanId, selectedCycle }: SignupFormProps) {
  const { signup } = useAuth();
  const router = useRouter();
  const cycle = getValidCycle(selectedCycle);
  const selectedPlan = selectedPlanId ? getMembershipPlan(selectedPlanId) : null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signup(name, email, password);
      if (selectedPlan) {
        router.push(`/dashboard?checkout=1&plan=${selectedPlan.id}&cycle=${cycle}`);
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="card-padded w-full max-w-md">
      <div className="mb-6 flex justify-center">
        <BrandLogo variant="auth" />
      </div>
      <h1 className="text-center font-heading text-h2 text-green-forest">
        Become a member
      </h1>
      <p className="mt-2 text-center font-body text-body text-text-secondary">
        Join {BRAND_LIBRARY_NAME} to browse, request, and share books.
      </p>

      {selectedPlan && (
        <div className="mt-5 rounded-lg border border-[#C8E6A0] bg-[#EEF8E6] p-4">
          <p className="font-body text-label uppercase tracking-wider text-text-secondary">
            Selected membership
          </p>
          <div className="mt-2 flex items-center justify-between gap-4">
            <div>
              <p className="font-heading text-body font-bold text-green-forest">
                {selectedPlan.name}
              </p>
              <p className="font-body text-label text-text-secondary">
                {cycle.charAt(0).toUpperCase() + cycle.slice(1)} billing
              </p>
            </div>
            <div className="text-right">
              <p className="font-heading text-h4 font-bold text-green-forest">
                ₹{getPlanTotal(selectedPlan, cycle).toLocaleString("en-IN")}
              </p>
              <p className="font-body text-label text-text-secondary">
                Due today / {getCycleLabel(cycle)}
              </p>
            </div>
          </div>
        </div>
      )}

      <form className="form-section mt-6" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full name
          </label>
          <input
            id="name"
            type="text"
            className="input"
            placeholder="Jane Doe"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="you@example.com"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input"
            placeholder="Create a password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password" className="form-label">
            Confirm password
          </label>
          <input
            id="confirm-password"
            type="password"
            className="input"
            placeholder="Confirm your password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-body text-body-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn-cta flex w-full items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2Icon className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center font-body text-body-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-blue-water no-underline hover:text-green-forest">
          Sign in
        </Link>
      </p>

      <p className="mt-4 rounded-lg bg-[#EEF8E6] px-4 py-3 text-center font-body text-[11px] leading-relaxed text-text-secondary">
        <strong className="text-green-forest">Demo:</strong> Use any
        email/password to sign up first, then login. Use an email containing
        &quot;admin&quot; for admin access.
      </p>
    </div>
  );
}
