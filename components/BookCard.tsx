"use client"

import Link from "next/link"
import { Barcode, BookIcon, Calendar, User } from "lucide-react"
import type { Book } from "@/types"

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.id}`}
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
  )
}