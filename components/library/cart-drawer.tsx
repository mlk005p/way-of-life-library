"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingCartIcon, Trash2Icon, XIcon } from "lucide-react";

import { useAuth, useCart } from "@/components/providers";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { user, profile } = useAuth();
  const { items, removeItem, clearCart, itemCount } = useCart();

  /* Lock body scroll while drawer is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleSubmit() {
    window.alert(
      `Request submitted for ${itemCount} book${itemCount > 1 ? "s" : ""}! You will be notified when they are ready for pickup.`
    );
    clearCart();
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[380px] max-w-[90vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#C8E6A0] px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCartIcon className="h-5 w-5 text-green-forest" />
            <h2 className="font-heading text-h4 font-bold text-green-forest">
              Your Cart
            </h2>
            {itemCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-green-nature px-1.5 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-[#EEF8E6] hover:text-green-forest"
            aria-label="Close cart"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingCartIcon className="mb-4 h-12 w-12 text-green-forest/20" />
              <p className="font-heading text-h4 font-medium text-green-forest">
                Your cart is empty
              </p>
              <p className="mt-2 font-body text-body-sm text-text-secondary">
                Browse our catalog to find books you&apos;d like to request.
              </p>
              <Link
                href="/books"
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-forest px-5 py-2.5 font-body text-body-sm font-medium text-white no-underline transition-colors hover:bg-green-forest/90"
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((book) => (
                <li
                  key={book.id}
                  className="flex items-start gap-3 rounded-lg border border-[#C8E6A0] p-3 transition-colors hover:bg-[#EEF8E6]/50"
                >
                  {/* Mini cover accent */}
                  <div className="flex h-14 w-10 flex-shrink-0 items-center justify-center rounded bg-green-forest/10">
                    <span className="font-heading text-xs font-bold text-green-forest/40">
                      {book.title
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col gap-0.5">
                    <p className="font-heading text-body-sm font-medium leading-snug text-green-forest">
                      {book.title}
                    </p>
                    <p className="font-body text-label text-text-secondary">
                      {book.author}
                    </p>
                    <span className="mt-1 inline-flex w-fit rounded-full bg-[#EEF8E6] px-2 py-0.5 font-body text-[10px] font-medium uppercase tracking-wider text-green-forest/70">
                      {book.genre}
                    </span>
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeItem(book.id)}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-red-50 hover:text-red-500"
                    aria-label={`Remove ${book.title} from cart`}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="border-t border-[#C8E6A0] px-6 py-4">
            {!user ? (
              <Link
                href="/login"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-lg bg-green-forest px-4 py-3 font-body text-body-sm font-medium text-white no-underline transition-colors hover:bg-green-forest/90"
              >
                Sign in to request books
              </Link>
            ) : profile?.membership_status !== "active" ? (
              <Link
                href="/dashboard"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-lg border-2 border-orange-sunrise bg-orange-sunrise/10 px-4 py-3 font-body text-body-sm font-medium text-orange-sunrise no-underline transition-colors hover:bg-orange-sunrise/20"
              >
                Activate membership to request
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full rounded-lg bg-green-nature px-4 py-3 font-body text-body-sm font-bold text-white transition-colors hover:bg-green-nature/90"
              >
                Submit Request ({itemCount} book{itemCount > 1 ? "s" : ""})
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
