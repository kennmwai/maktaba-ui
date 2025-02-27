"use client"

import { useState, useEffect } from "react"
import type { Book } from "@/types"
import BookSkeleton from '@/components/BookSkeleton'
import BookCard from '@/components/BookCard'
import Pagination from '@/components/Pagination'
import PageControls from '@/components/PageControls'
import ErrorDisplay from '@/components/ErrorDisplay'

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination and sorting state
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sortBy, setSortBy] = useState("title,asc")

  useEffect(() => {
    fetchBooks(currentPage, pageSize, sortBy)
  }, [currentPage, pageSize, sortBy])

  const fetchBooks = async (page: number, size: number, sort: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/books?page=${page}&size=${size}&sort=${sort}`, {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error("Failed to fetch books")
      }

      const data = await response.json()

      if (data && Array.isArray(data.content)) {
        setBooks(data.content)
        setTotalPages(data.totalPages)
        setTotalItems(data.totalElements)
      } else if (Array.isArray(data)) {
        setBooks(data)
        // If the API doesn't return pagination info, make a best guess
        setTotalItems(data.length)
        setTotalPages(Math.ceil(data.length / pageSize))
      } else {
        setBooks([])
        setError("Invalid data format received from API")
        console.error("Expected array but got:", data)
      }

      setLoading(false)
    } catch (err) {
      console.error("Fetch error:", err)
      setError("Error fetching books. Please try again later.")
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value)
    setPageSize(newSize)
    setCurrentPage(0) // Reset to first page when changing page size
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
    setCurrentPage(0) // Reset to first page when changing sort
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageControls
          itemCount={0}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(pageSize > 6 ? 6 : pageSize)].map((_, index) => (
            <BookSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorDisplay message={error} />
  }

  return (
    <div className="space-y-6">
      <PageControls
        itemCount={books.length}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
