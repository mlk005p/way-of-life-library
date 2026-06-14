"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { BRAND_LIBRARY_NAME } from "@/lib/brand";

export function SignupForm() {
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

      <form
        className="form-section mt-6"
        onSubmit={(event) => event.preventDefault()}
      >
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
          />
        </div>
        <button type="submit" className="btn-cta w-full">
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center font-body text-body-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-blue-water no-underline hover:text-green-forest">
          Sign in
        </Link>
      </p>
    </div>
  );
}
