"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { BRAND_LIBRARY_NAME } from "@/lib/brand";

export function LoginForm() {
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

      <form
        className="form-section mt-6"
        onSubmit={(event) => event.preventDefault()}
      >
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
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Sign In
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
