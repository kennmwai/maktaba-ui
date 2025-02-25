import BookList from "@/components/BookList"
import SearchBar from "@/components/SearchBar"
import { Book } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Book className="h-8 w-8 text-primary" />
          Library Catalog
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of books, discover new titles, and get AI-powered insights about your favorite reads.
        </p>
      </div>
      <SearchBar />
      <BookList />
    </main>
  )
}

