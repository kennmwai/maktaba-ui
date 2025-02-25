import { Book, Search, Sparkles } from "lucide-react"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Library UI</h1>

        <div className="grid gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Book className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Our Library</h2>
              </div>
              <p className="text-muted-foreground">
                Maktaba is a modern digital library management system that makes it easy to explore and discover
                books. Our platform provides a seamless experience for browsing through our extensive collection of
                literature.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Search className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Easy Search</h2>
              </div>
              <p className="text-muted-foreground">
                Find your next read quickly with our powerful search functionality. Search by title, author, or browse
                through our carefully curated collection.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">AI-Powered Insights</h2>
              </div>
              <p className="text-muted-foreground">
                Get unique perspectives on books with our AI-powered insights feature. Discover themes, connections, and
                interesting facts about your favorite books.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

