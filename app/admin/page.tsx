"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers";

export default function AdminRootPage() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Unauthenticated -> redirect to /admin/login
        router.replace("/admin/login");
      } else if (profile?.role === "admin") {
        // Logged in admin user -> allow access to /admin/dashboard
        router.replace("/admin/dashboard");
      } else {
        // Logged in non-admin user -> redirect to /
        router.replace("/");
      }
    }
  }, [user, profile, isLoading, router]);

  return (
    <div className="flex items-center justify-center py-32">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-nature border-t-transparent" />
    </div>
  );
}
