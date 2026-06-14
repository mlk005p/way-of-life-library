// scripts/parse-excel.mjs
// Reads the Excel catalog, deduplicates, and outputs lib/library-catalog.ts
import { readFile, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// We'll use the xlsx package
import XLSX from "xlsx";

const EXCEL_PATH = join(
  "C:\\Users\\yash mohan\\Downloads",
  "E-Catalogue Books Wol -2026 (Responses).xlsx"
);

const workbook = XLSX.readFile(EXCEL_PATH);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

console.log(`Total rows: ${rows.length}`);

// Map columns (the column names from the header)
// Columns we care about:
//   "Name of the Book " -> title
//   "Author of the Book " -> author
//   "Publisher Name " -> publisher
//   "Year of Print " -> year
//   "Which Age Group " -> ageGroup
//   "Genre - Category of books  3" -> genre (column 17, the one that has data)
//   "Medium - English / Hindi 3" -> language
//   "Is there an ISBN or NOT  3" -> hasIsbn
//   "If Yes - ISBN  3" -> isbn
//   "Image of the Book Cover 2" -> imageUrl (Google Drive link)

function clean(s) {
  if (!s) return "";
  return String(s).trim();
}

function normalizeTitle(t) {
  return t.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Convert Google Drive link to direct image URL
function driveToImageUrl(url) {
  if (!url) return "";
  const match = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
  }
  return "";
}

const books = [];
const seen = new Set();

for (const row of rows) {
  const title = clean(
    row["Name of the Book "] || row["Name of the Book"]
  );
  const author = clean(
    row["Author of the Book "] || row["Author of the Book"]
  );
  const publisher = clean(row["Publisher Name "] || row["Publisher Name"]);
  const year = clean(row["Year of Print "] || row["Year of Print"]);
  const ageGroup = clean(row["Which Age Group "] || row["Which Age Group"]);

  // Genre is in column 17 (index "Genre - Category of books  3")
  let genre = clean(row["Genre - Category of books  3"]);
  if (!genre) genre = clean(row["Genre - Category of books "]);
  if (!genre) genre = clean(row["Genre - Category of books  2"]);

  let language = clean(row["Medium - English / Hindi 3"]);
  if (!language) language = clean(row["Medium - English / Hindi"]);
  if (!language) language = clean(row["Medium - English / Hindi 2"]);
  if (!language) language = "English";

  let hasIsbn = clean(row["Is there an ISBN or NOT  3"]);
  if (!hasIsbn) hasIsbn = clean(row["Is there an ISBN or NOT "]);

  let isbn = clean(row["If Yes - ISBN  3"]);
  if (!isbn) isbn = clean(row["If Yes - ISBN "]);

  let imageUrl = clean(row["Image of the Book Cover 2"]);
  if (!imageUrl) imageUrl = clean(row["Image of the Cover "]);
  if (!imageUrl) imageUrl = clean(row["Image of the Book Cover"]);

  if (!title) continue;

  // Deduplicate by normalized title + author
  const key = normalizeTitle(title) + "|" + normalizeTitle(author);
  if (seen.has(key)) continue;
  seen.add(key);

  // Clean up genre: take first genre if comma-separated
  const primaryGenre = genre.split(",")[0].trim();

  books.push({
    title,
    author,
    publisher,
    year: parseInt(year) || 0,
    ageGroup,
    genre: primaryGenre || "General",
    language,
    isbn: hasIsbn === "Yes" ? isbn : "",
    imageUrl: driveToImageUrl(imageUrl),
  });
}

console.log(`Deduplicated books: ${books.length}`);

// Count genres
const genreCounts = {};
for (const b of books) {
  genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1;
}
console.log("Genres:", JSON.stringify(genreCounts, null, 2));

// Count age groups
const ageCounts = {};
for (const b of books) {
  ageCounts[b.ageGroup] = (ageCounts[b.ageGroup] || 0) + 1;
}
console.log("Age Groups:", JSON.stringify(ageCounts, null, 2));

// Generate TypeScript
const tsContent = `// lib/library-catalog.ts
// Auto-generated from Excel catalog on ${new Date().toISOString().slice(0, 10)}
// Total unique books: ${books.length}

export type CatalogBook = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  ageGroup: string;
  genre: string;
  language: string;
  isbn: string;
  imageUrl: string;
  availability: "available" | "borrowed" | "reserved";
};

export const catalogBooks: CatalogBook[] = ${JSON.stringify(
  books.map((b, i) => ({
    ...b,
    id: i + 1,
    availability: Math.random() > 0.15 ? "available" : "borrowed",
  })),
  null,
  2
)};

export const catalogGenres = ${JSON.stringify(Object.keys(genreCounts).sort())};

export const catalogGenreCounts: Record<string, number> = ${JSON.stringify(genreCounts, null, 2)};

export const catalogAgeGroups = ${JSON.stringify(Object.keys(ageCounts).sort())};

export const catalogStats = {
  totalBooks: ${books.length},
  totalGenres: ${Object.keys(genreCounts).length},
  totalAuthors: ${new Set(books.map((b) => b.author)).size},
};
`;

const outPath = join(__dirname, "..", "lib", "library-catalog.ts");
await writeFile(outPath, tsContent, "utf8");
console.log(`\nWritten to ${outPath}`);

