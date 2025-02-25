export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  description?: string;
  cover_image: string | null;
}

export interface Insights {
  id: number;
  aiInsights: string;
  status: string; // InsightStatus ("PENDING", "SUCCESS", "FAILED")
  errorMessage: string | null;
  book: Book;
}
