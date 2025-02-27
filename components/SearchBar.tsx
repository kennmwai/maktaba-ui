"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [searchBy, setSearchBy] = useState<{ title: boolean; author: boolean; isbn: boolean }>({
    title: false,
    author: false,
    isbn: false,
  })
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      const searchParams = new URLSearchParams()

      if (searchBy.title) searchParams.set("title", query.trim())
      if (searchBy.author) searchParams.set("author", query.trim())
      if (searchBy.isbn) searchParams.set("isbn", query.trim())

      if (!searchBy.title && !searchBy.author && !searchBy.isbn) {
        searchParams.set("q", query.trim())
      }
      router.push(`/search?${searchParams.toString()}`)
    }
  }

  const handleCheckboxChange = (criteria: keyof typeof searchBy) => {
    setSearchBy((prev) => ({ ...prev, [criteria]: !prev[criteria] }))
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search books by title, author, or ISBN..."
          className="input input-bordered w-full pr-16 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search books by title, author, or ISBN"
        />
        <button
          className="btn btn-primary absolute right-0 top-0 rounded-l-none hover:bg-primary-dark transition-all"
          type="submit"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {/* Advanced Search Options */}
      <div className="mt-4 flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="searchBy"
            checked={searchBy.title}
            onChange={() => handleCheckboxChange("title")}
            className="checkbox checkbox-primary"
          />
          <span>Title</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="searchBy"
            checked={searchBy.author}
            onChange={() => handleCheckboxChange("author")}
            className="checkbox checkbox-primary"
          />
          <span>Author</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="searchBy"
            checked={searchBy.isbn}
            onChange={() => handleCheckboxChange("isbn")}
            className="checkbox checkbox-primary"
          />
          <span>ISBN</span>
        </label>
      </div>
    </div>
  )
}