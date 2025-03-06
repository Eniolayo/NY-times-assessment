export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="h-6 w-24 bg-muted rounded animate-pulse mb-6"></div>

        <div className="h-10 w-3/4 bg-muted rounded animate-pulse mb-4"></div>

        <div className="flex items-center mb-6">
          <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-muted rounded animate-pulse ml-4"></div>
        </div>

        <div className="h-[400px] w-full bg-muted rounded animate-pulse mb-6"></div>

        <div className="space-y-4">
          <div className="h-6 w-full bg-muted rounded animate-pulse"></div>
          <div className="h-6 w-full bg-muted rounded animate-pulse"></div>
          <div className="h-6 w-3/4 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
