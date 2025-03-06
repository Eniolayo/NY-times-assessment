export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="h-10 w-48 bg-muted rounded animate-pulse mx-auto mb-8"></div>

      <div className="flex w-full max-w-lg mx-auto items-center space-x-2 mb-8">
        <div className="h-10 flex-1 bg-muted rounded animate-pulse"></div>
        <div className="h-10 w-24 bg-muted rounded animate-pulse"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4 h-[350px]">
            <div className="h-6 w-3/4 bg-muted rounded animate-pulse mb-4"></div>
            <div className="h-48 w-full bg-muted rounded animate-pulse mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

