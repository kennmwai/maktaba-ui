export default function BookSkeleton() {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <figure className="px-4 pt-4">
        <div className="relative w-full h-[200px] bg-base-300 rounded-xl" />
      </figure>
      <div className="card-body">
        <div className="h-6 bg-base-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-base-300 rounded w-1/2 mb-2" />
        <div className="h-4 bg-base-300 rounded w-1/3 mb-4" />
        <div className="card-actions justify-end">
          <div className="h-10 bg-base-300 rounded w-32" />
        </div>
      </div>
    </div>
  );
}