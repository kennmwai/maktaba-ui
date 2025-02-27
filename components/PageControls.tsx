"use client"

interface PageControlsProps {
  itemCount: number
  totalItems: number
  pageSize: number
  onPageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  sortBy: string
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function PageControls({
  itemCount,
  totalItems,
  pageSize,
  onPageSizeChange,
  sortBy,
  onSortChange
}: PageControlsProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="text-sm text-muted-foreground">
        Showing {itemCount} of {totalItems} books
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="sortBy" className="text-sm whitespace-nowrap">Sort by:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={onSortChange}
            className="select select-sm select-bordered"
          >
            <option value="title,asc">Title (A-Z)</option>
            <option value="title,desc">Title (Z-A)</option>
            <option value="author,asc">Author (A-Z)</option>
            <option value="author,desc">Author (Z-A)</option>
            <option value="publicationYear,desc">Newest First</option>
            <option value="publicationYear,asc">Oldest First</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm whitespace-nowrap">Books per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={onPageSizeChange}
            className="select select-sm select-bordered"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  )
}