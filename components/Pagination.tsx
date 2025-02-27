"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Don't render pagination if only one page
  if (totalPages <= 1) return null

  // Calculate which page buttons to show (show 5 pages max)
  const getPageButtons = () => {
    let startPage = Math.max(0, Math.min(currentPage - 2, totalPages - 5))
    let endPage = Math.min(totalPages, Math.max(5, currentPage + 3))

    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i)
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="join">
        <button
          className="join-item btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {getPageButtons().map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
          >
            {page + 1}
          </button>
        ))}

        <button
          className="join-item btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}