"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { BRAND_LIBRARY_NAME } from "@/lib/brand";
import { useAuth } from "@/components/providers";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.error || "Invalid email or password. Please try again.");
        return;
      }

      /* Redirect based on role from resolved login result */
      if (res.profile?.role === "admin" || email.toLowerCase().includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
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
        Welcome back
      </h1>
      <p className="mt-2 text-center font-body text-body text-text-secondary">
        Sign in to {BRAND_LIBRARY_NAME} to access your library portal.
      </p>

      <form className="form-section mt-6" onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-body text-body-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary flex w-full items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2Icon className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center font-body text-body-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-bold text-blue-water no-underline hover:text-green-forest">
          Sign up
        </Link>
      </p>
    </div>
  );
}
