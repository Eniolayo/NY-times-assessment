import { SearchForm } from "@/components/search-form"
import { ArticleList } from "@/components/article-list"
import { fetchArticles } from "@/lib/api"

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; page?: string }
}) {
  const query = searchParams.q || ""
  const page = Number.parseInt(searchParams.page || "1", 10)

  const { articles, totalResults } = await fetchArticles(query, page)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">NY Times Articles</h1>
      <SearchForm initialQuery={query} />
      <ArticleList articles={articles} currentPage={page} totalResults={totalResults} query={query} />
    </main>
  )
}

