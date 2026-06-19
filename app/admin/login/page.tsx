import type { Metadata } from "next";

import { AdminLoginForm } from "@/components/auth/admin-login-form";
import { BRAND_LIBRARY_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Admin Login",
  description: `Administrator Sign-In Portal for ${BRAND_LIBRARY_NAME}.`,
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex max-w-container items-center justify-center px-6 py-12 md:px-12 md:py-20">
      <AdminLoginForm />
    </div>
  );
}
