"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon, ShieldIcon } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { BRAND_LIBRARY_NAME } from "@/lib/brand";
import { useAuth } from "@/components/providers";

export function AdminLoginForm() {
  const { login, logout } = useAuth();
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
        setIsSubmitting(false);
        return;
      }

      // Check if user is admin using the newly returned profile
      const isAdmin = res.profile?.role === "admin";
      if (!isAdmin) {
        // Log out immediately and show access denied
        await logout();
        setError("Access denied. This portal is restricted to administrators.");
        setIsSubmitting(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid email or password. Please try again.");
      }
      setIsSubmitting(false);
    }
  }

  return (
    <div className="card-padded w-full max-w-md border-2 border-green-nature/20">
      <div className="mb-6 flex justify-center relative">
        <BrandLogo variant="auth" />
        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF8E6] text-green-forest border border-green-nature/30">
          <ShieldIcon className="h-4 w-4" />
        </div>
      </div>
      <h1 className="text-center font-heading text-h2 text-green-forest">
        Admin Portal
      </h1>
      <p className="mt-2 text-center font-body text-body text-text-secondary">
        Sign in to {BRAND_LIBRARY_NAME} administrator panel.
      </p>

      <form className="form-section mt-6" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="admin-email" className="form-label">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            className="input"
            placeholder="admin@example.com"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="admin-password" className="form-label">
            Password
          </label>
          <input
            id="admin-password"
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
          className="btn-primary flex w-full items-center justify-center gap-2 bg-green-forest hover:bg-green-forest/90"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2Icon className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Signing in…" : "Sign In to Admin"}
        </button>
      </form>
    </div>
  );
}
