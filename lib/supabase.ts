import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

// Warn in the browser console if env vars are missing at runtime.
// During build/prerender the vars won't be present, so we must NOT throw
// at module-init time – that causes every page to fail static export.
if (typeof window !== "undefined" && (!supabaseUrl || !supabaseKey)) {
  console.error(
    "[supabase] Missing environment variables: " +
      "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY " +
      "must be set in your .env.local (or Vercel project settings)."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseKey || "placeholder-anon-key"
);
