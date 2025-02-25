"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import type { Book } from "@/types"
import { ArrowLeft, BookIcon, Calendar, User, Search, Barcode } from "lucide-react"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q")
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (query) {
      fetchSearchResults()
    }
  }, [query])

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`/api/books/search?q=${encodeURIComponent(query || "")}`)
      if (!response.ok) {
        throw new Error("Failed to fetch search results")
      }
      const data = await response.json()
      setBooks(data)
      setLoading(false)
    } catch (err) {
      setError("Error fetching search results. Please try again later.")
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-muted-foreground">Searching books...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error shadow-lg max-w-md mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => router.back()} className="btn btn-ghost mb-6 gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="flex items-center gap-3 mb-8">
        <Search className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Search Results for "{query}"</h1>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <BookIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">No books found matching your search.</p>
          <Link href="/" className="btn btn-primary mt-4">
            Return to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Link
              href={`/books/${book.id}`}
              key={book.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <h2 className="card-title text-lg font-bold line-clamp-2">{book.title}</h2>
                  <BookIcon className="h-5 w-5 text-primary shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <User className="h-4 w-4" />
                  <span>{book.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{book.publicationYear}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Barcode className="h-4 w-4" />
                  <span>{book.isbn}</span>
                </div>
                {book.description && (
                  <p className="mt-2 text-sm line-clamp-2 text-muted-foreground">{book.description}</p>
                )}
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">View Details</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

