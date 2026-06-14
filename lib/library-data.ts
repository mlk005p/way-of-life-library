export type BookAvailability = "available" | "borrowed" | "reserved";

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  class: string;
  description: string;
  year: number;
  pages: number;
  isbn: string;
  quantity: number;
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
    description: "A comprehensive guide to community healthcare focusing on preventive measures, hygiene practices, and building healthier neighborhoods through collective action.",
    year: 2021,
    pages: 186,
    isbn: "978-1-234567-01-0",
    quantity: 3,
    availability: "available",
    coverAccent: "green",
  },
  {
    id: "2",
    title: "Sustainable Farming Guide",
    author: "Raj Patel",
    genre: "Agriculture",
    class: "Intermediate",
    description: "Learn sustainable agricultural practices including crop rotation, organic pest control, and water-efficient irrigation systems for small-scale farmers.",
    year: 2022,
    pages: 234,
    isbn: "978-1-234567-02-7",
    quantity: 1,
    availability: "borrowed",
    coverAccent: "forest",
  },
  {
    id: "3",
    title: "Introduction to Literacy",
    author: "Maria Santos",
    genre: "Education",
    class: "Beginner",
    description: "A foundational resource for adult literacy programs, covering reading, writing, and basic numeracy skills with culturally inclusive teaching methods.",
    year: 2020,
    pages: 142,
    isbn: "978-1-234567-03-4",
    quantity: 3,
    availability: "available",
    coverAccent: "blue",
  },
  {
    id: "4",
    title: "Water Conservation Handbook",
    author: "James Chen",
    genre: "Environment",
    class: "General",
    description: "Practical strategies for conserving water at home, in agriculture, and in communities. Includes case studies from water-scarce regions worldwide.",
    year: 2023,
    pages: 198,
    isbn: "978-1-234567-04-1",
    quantity: 3,
    availability: "available",
    coverAccent: "green",
  },
  {
    id: "5",
    title: "Women in Leadership",
    author: "Fatima Al-Hassan",
    genre: "Social Impact",
    class: "Advanced",
    description: "Explores pathways for women\u2019s leadership in community organizations, featuring interviews and frameworks for overcoming systemic barriers.",
    year: 2022,
    pages: 276,
    isbn: "978-1-234567-05-8",
    quantity: 2,
    availability: "reserved",
    coverAccent: "orange",
  },
  {
    id: "6",
    title: "Digital Skills for All",
    author: "Elena Rodriguez",
    genre: "Technology",
    class: "Beginner",
    description: "An accessible introduction to computers, the internet, email, and online safety designed for first-time users in developing communities.",
    year: 2023,
    pages: 168,
    isbn: "978-1-234567-06-5",
    quantity: 3,
    availability: "available",
    coverAccent: "blue",
  },
  {
    id: "7",
    title: "Climate Action for Communities",
    author: "David Okonkwo",
    genre: "Environment",
    class: "Intermediate",
    description: "A toolkit for community-level climate adaptation and mitigation, including tree planting drives, waste reduction, and local advocacy strategies.",
    year: 2023,
    pages: 212,
    isbn: "978-1-234567-07-2",
    quantity: 3,
    availability: "available",
    coverAccent: "forest",
  },
  {
    id: "8",
    title: "Early Childhood Education",
    author: "Grace Mbeki",
    genre: "Education",
    class: "Beginner",
    description: "Evidence-based approaches to early childhood development from birth to age six, emphasizing play-based learning and parental involvement.",
    year: 2021,
    pages: 194,
    isbn: "978-1-234567-08-9",
    quantity: 1,
    availability: "borrowed",
    coverAccent: "orange",
  },
  {
    id: "9",
    title: "Nutrition and Wellness",
    author: "Dr. Priya Sharma",
    genre: "Health",
    class: "General",
    description: "A practical guide to balanced nutrition using locally available foods, meal planning for families, and understanding nutritional needs at every life stage.",
    year: 2022,
    pages: 156,
    isbn: "978-1-234567-09-6",
    quantity: 3,
    availability: "available",
    coverAccent: "green",
  },
  {
    id: "10",
    title: "Solar Energy Basics",
    author: "Kofi Mensah",
    genre: "Technology",
    class: "Intermediate",
    description: "Understand solar panel technology, installation basics, and how communities can leverage solar energy for lighting, cooking, and small enterprises.",
    year: 2023,
    pages: 178,
    isbn: "978-1-234567-10-2",
    quantity: 3,
    availability: "available",
    coverAccent: "blue",
  },
  {
    id: "11",
    title: "Financial Literacy 101",
    author: "Sarah Johnson",
    genre: "Education",
    class: "Beginner",
    description: "Build foundational money management skills including budgeting, saving, understanding loans, and planning for the future with limited income.",
    year: 2022,
    pages: 148,
    isbn: "978-1-234567-11-9",
    quantity: 3,
    availability: "available",
    coverAccent: "green",
  },
  {
    id: "12",
    title: "Organic Gardening Guide",
    author: "Mei Lin",
    genre: "Agriculture",
    class: "Beginner",
    description: "Start your own organic garden with step-by-step instructions on composting, seed selection, natural fertilizers, and seasonal planting calendars.",
    year: 2021,
    pages: 164,
    isbn: "978-1-234567-12-6",
    quantity: 3,
    availability: "available",
    coverAccent: "forest",
  },
  {
    id: "13",
    title: "Mental Health Awareness",
    author: "Dr. James Wright",
    genre: "Health",
    class: "General",
    description: "Breaking stigma around mental health in communities. Covers stress management, recognizing warning signs, and accessing support resources.",
    year: 2023,
    pages: 202,
    isbn: "978-1-234567-13-3",
    quantity: 1,
    availability: "borrowed",
    coverAccent: "orange",
  },
  {
    id: "14",
    title: "Clean Water Solutions",
    author: "Amina Diallo",
    genre: "Environment",
    class: "Intermediate",
    description: "Innovative and low-cost water purification methods for rural communities including biosand filters, solar disinfection, and rainwater harvesting.",
    year: 2022,
    pages: 188,
    isbn: "978-1-234567-14-0",
    quantity: 3,
    availability: "available",
    coverAccent: "blue",
  },
  {
    id: "15",
    title: "Youth Empowerment Toolkit",
    author: "Carlos Mendoza",
    genre: "Social Impact",
    class: "General",
    description: "Programs and activities designed to build confidence, leadership, and civic engagement among young people aged 15 to 25.",
    year: 2023,
    pages: 224,
    isbn: "978-1-234567-15-7",
    quantity: 3,
    availability: "available",
    coverAccent: "orange",
  },
  {
    id: "16",
    title: "Basic Computer Skills",
    author: "Nia Thompson",
    genre: "Technology",
    class: "Beginner",
    description: "Step-by-step tutorials for using computers, word processors, spreadsheets, and the internet \u2014 perfect for digital literacy workshops.",
    year: 2022,
    pages: 136,
    isbn: "978-1-234567-16-4",
    quantity: 3,
    availability: "available",
    coverAccent: "blue",
  },
  {
    id: "17",
    title: "Child Rights & Protection",
    author: "Dr. Aisha Khan",
    genre: "Education",
    class: "Advanced",
    description: "An in-depth resource on international child rights frameworks, safeguarding policies, and implementing protection programs in NGO settings.",
    year: 2021,
    pages: 256,
    isbn: "978-1-234567-17-1",
    quantity: 3,
    availability: "available",
    coverAccent: "forest",
  },
  {
    id: "18",
    title: "Waste Management Handbook",
    author: "Paulo Silva",
    genre: "Environment",
    class: "General",
    description: "Community-driven waste management solutions including segregation at source, recycling cooperatives, and composting organic waste.",
    year: 2023,
    pages: 174,
    isbn: "978-1-234567-18-8",
    quantity: 2,
    availability: "reserved",
    coverAccent: "green",
  },
  {
    id: "19",
    title: "Micro-Enterprise Development",
    author: "Rose Nakamura",
    genre: "Social Impact",
    class: "Intermediate",
    description: "Start and grow small businesses with limited capital. Covers business planning, market research, record-keeping, and accessing microfinance.",
    year: 2022,
    pages: 218,
    isbn: "978-1-234567-19-5",
    quantity: 3,
    availability: "available",
    coverAccent: "orange",
  },
  {
    id: "20",
    title: "First Aid Essentials",
    author: "Dr. Michael Obi",
    genre: "Health",
    class: "Beginner",
    description: "Essential first aid knowledge for community health workers including wound care, CPR basics, managing burns, and when to seek emergency help.",
    year: 2023,
    pages: 152,
    isbn: "978-1-234567-20-1",
    quantity: 3,
    availability: "available",
    coverAccent: "green",
  },
];

export const featuredBooks = books.slice(0, 6);

export const recentlyAddedBooks = books.slice(14, 20);

export const recommendedBooks = books.slice(8, 11);

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
  copies: book.quantity,
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
