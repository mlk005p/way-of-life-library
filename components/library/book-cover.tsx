import { cn } from "@/lib/utils";
import type { Book } from "@/lib/library-data";

/** Minimal cover placeholders — official palette only, low saturation */
const minimalCoverStyles = {
  green: "bg-[#76BE46]/[0.08] border-b border-[#76BE46]/15",
  forest: "bg-[#07593E]/[0.06] border-b border-[#07593E]/12",
  orange: "bg-[#F7941D]/[0.06] border-b border-[#F7941D]/12",
  blue: "bg-[#07593E]/[0.06] border-b border-[#07593E]/12",
};

const boldCoverStyles = {
  green: "from-green-nature/90 to-green-nature",
  forest: "from-green-forest to-green-forest/80",
  orange: "from-orange-sunrise to-orange-sunrise/80",
  blue: "from-green-forest to-green-forest/80",
};

type BookCoverProps = {
  book: Pick<Book, "title" | "genre" | "coverAccent">;
  className?: string;
  variant?: "default" | "minimal";
};

export function BookCover({ book, className, variant = "default" }: BookCoverProps) {
  const initials = book.title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  if (variant === "minimal") {
    return (
      <div
        className={cn(
          "relative aspect-[3/4] w-full overflow-hidden rounded-lg",
          minimalCoverStyles[book.coverAccent],
          className
        )}
      >
        <div className="flex h-full flex-col justify-between p-5">
          <span className="font-body text-label uppercase tracking-wider text-green-forest/60">
            {book.genre}
          </span>
          <p className="font-heading text-3xl font-bold tracking-tight text-green-forest/20">
            {initials}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "card-book__cover relative flex items-end overflow-hidden bg-gradient-to-br p-4",
        boldCoverStyles[book.coverAccent],
        className
      )}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-white/10" />
      </div>
      <div className="relative w-full">
        <span className="badge-genre mb-2 bg-white/20 text-white">{book.genre}</span>
        <p className="font-heading text-2xl font-bold text-white/30">{initials}</p>
      </div>
    </div>
  );
}
