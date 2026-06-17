"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Book } from "@/lib/library-data";

// ---------------------------------------------------------------------------
// Auth Types
// ---------------------------------------------------------------------------

type User = {
  id: string;
  email: string;
  name: string;
};

type Profile = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  membership_status: "active" | "inactive" | "expired";
};

type StoredUser = {
  id: string;
  email: string;
  name: string;
  password: string;
  role: "user" | "admin";
  membership_status: "active" | "inactive" | "expired";
};

type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
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

const USERS_KEY = "wol_users";
const SESSION_KEY = "wol_session";
const CART_KEY = "wol_cart";

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession(): StoredUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

function saveSession(user: StoredUser | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

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
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ---------------------------------------------------------------------------
// Auth Provider
// ---------------------------------------------------------------------------

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate session on mount
  useEffect(() => {
    const session = getSession();
    if (session) {
      setUser({ id: session.id, email: session.email, name: session.name });
      setProfile({
        id: session.id,
        name: session.name,
        email: session.email,
        role: session.role,
        membership_status: session.membership_status,
      });
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: string }> => {
      const users = getStoredUsers();
      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!found) {
        return { success: false, error: "No account found with this email." };
      }

      if (found.password !== password) {
        return { success: false, error: "Incorrect password." };
      }

      setUser({ id: found.id, email: found.email, name: found.name });
      setProfile({
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
        membership_status: found.membership_status,
      });
      saveSession(found);

      return { success: true };
    },
    []
  );

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: string }> => {
      const users = getStoredUsers();
      const exists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (exists) {
        return {
          success: false,
          error: "An account with this email already exists.",
        };
      }

      const role: "user" | "admin" = email
        .toLowerCase()
        .includes("admin")
        ? "admin"
        : "user";

      const newUser: StoredUser = {
        id: generateId(),
        email,
        name,
        password,
        role,
        membership_status: "inactive",
      };

      const updatedUsers = [...users, newUser];
      saveStoredUsers(updatedUsers);

      setUser({ id: newUser.id, email: newUser.email, name: newUser.name });
      setProfile({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        membership_status: newUser.membership_status,
      });
      saveSession(newUser);

      return { success: true };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setProfile(null);
    saveSession(null);
  }, []);

  const updateMembership = useCallback(
    (status: "active" | "inactive" | "expired") => {
      if (!profile) return;

      const updatedProfile = { ...profile, membership_status: status };
      setProfile(updatedProfile);

      // Update stored users list
      const users = getStoredUsers();
      const idx = users.findIndex((u) => u.id === profile.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], membership_status: status };
        saveStoredUsers(users);
        saveSession(users[idx]);
      }
    },
    [profile]
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
