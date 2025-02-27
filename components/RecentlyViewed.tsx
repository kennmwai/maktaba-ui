import { Book } from '../types'
import BookCard from './BookCard'

interface RecentlyViewedProps {
  books: Book[]
}

export default function RecentlyViewed({ books }: RecentlyViewedProps) {
  if (books.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
