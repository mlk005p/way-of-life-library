export type BookAvailability = "available" | "borrowed" | "reserved";

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  class: string;
  availability: BookAvailability;
  coverAccent: "green" | "forest" | "orange" | "blue";
};

export const platformStats = {
  booksAvailable: 1248,
  activeMembers: 342,
  booksShared: 5890,
  communitiesReached: 47,
};

export const books: Book[] = [
  {
    id: "1",
    title: "Community Health Basics",
    author: "Dr. Amara Osei",
    genre: "Health",
    class: "General",
    availability: "available",
    coverAccent: "green",
  },
  {
    id: "2",
    title: "Sustainable Farming Guide",
    author: "Raj Patel",
    genre: "Agriculture",
    class: "Intermediate",
    availability: "borrowed",
    coverAccent: "forest",
  },
  {
    id: "3",
    title: "Introduction to Literacy",
    author: "Maria Santos",
    genre: "Education",
    class: "Beginner",
    availability: "available",
    coverAccent: "blue",
  },
  {
    id: "4",
    title: "Water Conservation Handbook",
    author: "James Chen",
    genre: "Environment",
    class: "General",
    availability: "available",
    coverAccent: "green",
  },
  {
    id: "5",
    title: "Women in Leadership",
    author: "Fatima Al-Hassan",
    genre: "Social Impact",
    class: "Advanced",
    availability: "reserved",
    coverAccent: "orange",
  },
  {
    id: "6",
    title: "Digital Skills for All",
    author: "Elena Rodriguez",
    genre: "Technology",
    class: "Beginner",
    availability: "available",
    coverAccent: "blue",
  },
  {
    id: "7",
    title: "Climate Action for Communities",
    author: "David Okonkwo",
    genre: "Environment",
    class: "Intermediate",
    availability: "available",
    coverAccent: "forest",
  },
  {
    id: "8",
    title: "Early Childhood Education",
    author: "Grace Mbeki",
    genre: "Education",
    class: "Beginner",
    availability: "borrowed",
    coverAccent: "orange",
  },
];

export const featuredBooks = books.slice(0, 6);

export const recentlyAddedBooks = books.slice(4, 8);

export const recommendedBooks = books.slice(0, 3);

export const authors = Array.from(new Set(books.map((b) => b.author))).sort();

export const genres = Array.from(new Set(books.map((b) => b.genre))).sort();

export const categories = genres.map((genre) => ({
  name: genre,
  count: books.filter((b) => b.genre === genre).length,
}));

export const classes = Array.from(new Set(books.map((b) => b.class))).sort();

export const howItWorksSteps = [
  {
    step: 1,
    title: "Become a Member",
    description:
      "Join the library community to access books, track borrowing, and share knowledge.",
  },
  {
    step: 2,
    title: "Browse Books",
    description:
      "Search and filter our catalog by author, genre, class level, and availability.",
  },
  {
    step: 3,
    title: "Request Books",
    description:
      "Reserve titles online and pick them up from your nearest community hub.",
  },
  {
    step: 4,
    title: "Read & Return",
    description:
      "Enjoy your reading, then return books so others in the community can learn too.",
  },
];

export const membershipBenefits = [
  "Access to the full digital catalog",
  "Book request and reservation system",
  "Reading history and recommendations",
  "Community learning events and resources",
];

export const borrowedBooks = [
  { title: "Sustainable Farming Guide", dueDate: "Mar 18, 2026", status: "On loan" },
  { title: "Introduction to Literacy", dueDate: "Mar 22, 2026", status: "On loan" },
];

export const pendingRequests = [
  { title: "Women in Leadership", requested: "Mar 10, 2026", status: "Awaiting pickup" },
];

export const adminInventory = books.map((book) => ({
  ...book,
  copies: book.availability === "available" ? 3 : book.availability === "borrowed" ? 1 : 2,
  location: "Main Library",
}));

export const adminRecentRequests = [
  { member: "Jane Doe", book: "Climate Action for Communities", date: "Mar 12, 2026", status: "Pending" },
  { member: "Raj Patel", book: "Digital Skills for All", date: "Mar 11, 2026", status: "Approved" },
  { member: "Maria Santos", book: "Water Conservation Handbook", date: "Mar 10, 2026", status: "Fulfilled" },
  { member: "James Chen", book: "Early Childhood Education", date: "Mar 9, 2026", status: "Pending" },
];

export const adminMembers = [
  { name: "Jane Doe", booksBorrowed: 2, status: "Active", joined: "Jan 2025" },
  { name: "Raj Patel", booksBorrowed: 1, status: "Active", joined: "Feb 2025" },
  { name: "Maria Santos", booksBorrowed: 0, status: "Active", joined: "Mar 2025" },
  { name: "James Chen", booksBorrowed: 3, status: "Active", joined: "Dec 2024" },
];

export function getAvailabilityBadgeClass(availability: BookAvailability) {
  switch (availability) {
    case "available":
      return "badge-available";
    case "borrowed":
      return "badge-borrowed";
    case "reserved":
      return "badge-info";
  }
}

export function getAvailabilityLabel(availability: BookAvailability) {
  switch (availability) {
    case "available":
      return "Available";
    case "borrowed":
      return "On Loan";
    case "reserved":
      return "Reserved";
  }
}
