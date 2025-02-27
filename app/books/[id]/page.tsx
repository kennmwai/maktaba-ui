"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Book, Insights } from "@/types"
import { ArrowLeft, Barcode , BookIcon, Calendar, User, Sparkles } from "lucide-react"
import { toast } from 'sonner';
import Image from 'next/image';
import RecentlyViewed from "@/components/RecentlyViewed";

export default function BookDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)
  const [aiInsight, setAiInsight] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [insightLoading, setInsightLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBookDetails()
  }, [])

  const [recentlyViewedBooks, setRecentlyViewedBooks] = useState<Book[]>([])

  const updateRecentlyViewed = (book: Book) => {
    const MAX_ITEMS = 5;
    const storedItems = localStorage.getItem('recentlyViewedBooks');
    let items: Book[] = storedItems ? JSON.parse(storedItems) : [];

    // Remove duplicates and limit to max items
    items = items.filter(item => item.id !== book.id);
    items.unshift(book);
    items = items.slice(0, MAX_ITEMS);

    localStorage.setItem('recentlyViewedBooks', JSON.stringify(items));
    setRecentlyViewedBooks(items.filter(b => b.id !== book.id)); // Exclude current book
  }

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`/api/books/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch book details")
      }
      const data: Book  = await response.json()
      setBook(data)
      updateRecentlyViewed(data);
      setLoading(false)
    } catch (err) {
      setError("Error fetching book details. Please try again later.")
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedItems = localStorage.getItem('recentlyViewedBooks');
    if (storedItems) {
      setRecentlyViewedBooks(JSON.parse(storedItems));
    }
  }, []);

  const fetchAiInsights = async () => {
    const loadingToastId = toast.loading('Fetching AI insights...')
    try {
      setInsightLoading(true)
      setAiInsight(null)
      const response = await fetch(`/api/books/${id}/ai-insights`)
      if (!response.ok) {
        throw new Error("Failed to fetch AI insights")
      }
      const data: Insights  = await response.json()
      setAiInsight(data.aiInsights)
      toast.success('AI insights fetched successfully!', { id: loadingToastId })
    } catch (err) {
      setError("Error fetching AI insights. Please try again later.")
      toast.error('Failed to fetch AI insights.', { id: loadingToastId })
    } finally {
      setInsightLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-muted-foreground">Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => router.back()} className="btn btn-ghost mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="alert alert-info shadow-lg max-w-md mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Book not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => router.back()} className="btn btn-ghost mb-6 gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="card bg-base-100 shadow-xl flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/3 h-[200px]">
          <Image
            src={book.cover_image || `https://placehold.co/400x800/png?text=${book.title}`}
            alt={book.title}
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <div className="card-body w-full md:w-2/3 p-6">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <BookIcon className="h-6 w-6 text-primary" />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg">{book.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg">{book.publicationYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <Barcode className="h-5 w-5" />
              <span>{book.isbn}</span>
            </div>
          </div>

          {book.description && <p className="mt-6 text-muted-foreground leading-relaxed">{book.description}</p>}

          {error && (
            <div className="alert alert-error shadow-lg mt-4">
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
          )}

          <div className="divider"></div>

          <div className="space-y-4">
            <button
              className={`btn btn-primary gap-2 ${insightLoading ? "loading" : ""}`}
              onClick={fetchAiInsights}
              disabled={insightLoading}
            >
              {!insightLoading && <Sparkles className="h-4 w-4" />}
              {insightLoading ? "Generating Insights..." : "Get AI Insights"}
            </button>

            {aiInsight && (
              <div className="card bg-base-200 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
                <div className="card-body">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Insight
                  </h2>
                  <p className="text-muted-foreground">{aiInsight}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
       <RecentlyViewed books={recentlyViewedBooks} />
    </div>
  );
}

