import type { Metadata } from "next";

import { SignupForm } from "@/components/auth/signup-form";
import { BRAND_LIBRARY_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Sign Up",
  description: `Create an account for ${BRAND_LIBRARY_NAME}.`,
};

type SignupPageProps = {
  searchParams?: {
    plan?: string;
    cycle?: string;
  };
};

export default function SignupPage({ searchParams }: SignupPageProps) {
  return (
    <div className="mx-auto flex max-w-container items-center justify-center px-6 py-12 md:px-12 md:py-20">
      <SignupForm
        selectedPlanId={searchParams?.plan}
        selectedCycle={searchParams?.cycle}
      />
    </div>
  );
}
