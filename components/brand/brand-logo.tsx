import Image from "next/image";

import {
  BRAND_LIBRARY_NAME,
  BRAND_LOGO_ALT,
  BRAND_LOGO_PATH,
} from "@/lib/brand";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "navbar" | "footer" | "hero-brand" | "auth" | "dashboard";
  className?: string;
  priority?: boolean;
  showLibraryName?: boolean;
};

const sizeClasses = {
  navbar: "max-h-14 w-auto sm:max-h-16",
  footer: "max-h-36 w-auto",
  "hero-brand": "max-h-16 w-auto sm:max-h-[4.5rem]",
  auth: "max-h-44 w-auto mx-auto",
  dashboard: "max-h-32 w-auto",
};

export function BrandLogo({
  variant = "navbar",
  className,
  priority = false,
  showLibraryName = false,
}: BrandLogoProps) {
  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      <Image
        src={BRAND_LOGO_PATH}
        alt={BRAND_LOGO_ALT}
        width={480}
        height={480}
        priority={priority}
        className={cn("h-auto object-contain", sizeClasses[variant])}
      />
      {showLibraryName && (
        <p className="font-heading text-h4 text-green-forest">{BRAND_LIBRARY_NAME}</p>
      )}
    </div>
  );
}
