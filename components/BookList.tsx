"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Book } from "@/types"
import { Barcode, BookIcon, Calendar, User} from "lucide-react"
import BookSkeleton from '@/components/BookSkeleton';


export default function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books")
      if (!response.ok) {
        throw new Error("Failed to fetch books")
      }
      const data = await response.json()
      setBooks(data)
      setLoading(false)
    } catch (err) {
      setError("Error fetching books. Please try again later.")
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, index) => (
          <BookSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
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
    )
  }

  return (
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Barcode className="h-4 w-4" />
              <span>{book.isbn}</span>
            </div>
            {book.description && <p className="mt-2 text-sm line-clamp-2 text-muted-foreground">{book.description}</p>}
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">View Details</button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

