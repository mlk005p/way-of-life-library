import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import { BRAND_LIBRARY_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Login",
  description: `Sign in to ${BRAND_LIBRARY_NAME}.`,
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-container items-center justify-center px-6 py-12 md:px-12 md:py-20">
      <LoginForm />
    </div>
  );
}
