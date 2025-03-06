import type { Article } from "@/lib/types";
import { ArticleCard } from "./article-card";
import { Pagination } from "./pagination";

interface ArticleListProps {
  articles: Article[];
  currentPage: number;
  totalResults: number;
  query: string;
}

export function ArticleList({
  articles,
  currentPage,
  totalResults,
  query,
}: ArticleListProps) {
  const totalPages = Math.ceil(totalResults / 10);

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {query ? `No articles found for "${query}"` : "No articles found"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
        />
      )}
    </div>
  );
}
