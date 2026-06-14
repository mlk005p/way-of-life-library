"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { BRAND_LIBRARY_NAME } from "@/lib/brand";
import { useAuth } from "@/components/providers";

export function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();

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
      router.push("/dashboard");
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
