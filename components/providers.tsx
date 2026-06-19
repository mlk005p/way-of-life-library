"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Book } from "@/lib/library-data";
import { supabase } from "@/lib/supabase";

// ---------------------------------------------------------------------------
// Auth Types
// ---------------------------------------------------------------------------

type User = {
  id: string;
  email: string;
  full_name: string;
};

type Profile = {
  id: string;
  full_name: string;
  role: "user" | "admin";
};

type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string; profile?: Profile | null }>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>;
  logout: () => Promise<void>;
  updateMembership: (status: "active" | "inactive" | "expired") => void;
};

// ---------------------------------------------------------------------------
// Cart Types
// ---------------------------------------------------------------------------

type CartContextValue = {
  items: Book[];
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  clearCart: () => void;
  itemCount: number;
};

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | null>(null);
const CartContext = createContext<CartContextValue | null>(null);

// ---------------------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------------------

const CART_KEY = "wol_cart";

function getStoredCart(): Book[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as Book[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: Book[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

// ---------------------------------------------------------------------------
// Auth Provider
// ---------------------------------------------------------------------------

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile by user ID
  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      console.error("Error fetching profile:", error);
      return null;
    }
    return data as Profile;
  }, []);

  // Hydrate session and set up listener on mount
  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user && mounted) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          full_name: session.user.user_metadata?.full_name || "",
        });
        const fetchedProfile = await fetchProfile(session.user.id);
        if (mounted && fetchedProfile) {
          setProfile(fetchedProfile);
        }
      }
      if (mounted) {
        setIsLoading(false);
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          full_name: session.user.user_metadata?.full_name || "",
        });
        const fetchedProfile = await fetchProfile(session.user.id);
        setProfile(fetchedProfile);
      } else {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const login = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: string; profile?: Profile | null }> => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Proactively fetch and set the profile before returning so callers can redirect correctly
      if (data.session?.user) {
        setUser({
          id: data.session.user.id,
          email: data.session.user.email || "",
          full_name: data.session.user.user_metadata?.full_name || "",
        });
        const fetchedProfile = await fetchProfile(data.session.user.id);
        setProfile(fetchedProfile);
        return { success: true, profile: fetchedProfile };
      }

      return { success: true, profile: null };
    },
    [fetchProfile]
  );

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: string; needsVerification?: boolean }> => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // If auto-login is enabled and no email confirmation is required, set the session immediately
      if (data.session?.user) {
        setUser({
          id: data.session.user.id,
          email: data.session.user.email || "",
          full_name: data.session.user.user_metadata?.full_name || "",
        });
        const fetchedProfile = await fetchProfile(data.session.user.id);
        setProfile(fetchedProfile);
        return { success: true, needsVerification: false };
      } else if (data.user) {
        // User created but no session means email confirmation is likely required
        return { success: true, needsVerification: true };
      }

      return { success: true, needsVerification: false };
    },
    [fetchProfile]
  );

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  const updateMembership = useCallback(
    async (status: "active" | "inactive" | "expired") => {
      console.warn("TODO: updateMembership needs to be updated to write to the memberships table");
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{ user, profile, isLoading, login, signup, logout, updateMembership }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Cart Provider
// ---------------------------------------------------------------------------

function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Book[]>([]);

  // Hydrate cart on mount
  useEffect(() => {
    setItems(getStoredCart());
  }, []);

  // Persist cart whenever it changes (skip initial empty render)
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (hydrated) {
      saveCart(items);
    }
  }, [items, hydrated]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const addItem = useCallback((book: Book) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === book.id)) return prev;
      return [...prev, book];
    });
  }, []);

  const removeItem = useCallback((bookId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== bookId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, itemCount: items.length }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Combined Providers Wrapper
// ---------------------------------------------------------------------------

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within a <Providers> component.");
  }
  return ctx;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a <Providers> component.");
  }
  return ctx;
}
