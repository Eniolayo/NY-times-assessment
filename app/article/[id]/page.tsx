import { fetchArticleById } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await fetchArticleById(params.id);

  if (!article) {
    notFound();
  }

  // Find the largest image
  const imageMetadata = article.media[0]?.["media-metadata"]?.find(
    (meta) => meta.format === "mediumThreeByTwo440"
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to articles
      </Link>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Calendar className="mr-2 h-4 w-4" />
          <time dateTime={article.published_date}>
            {formatDate(article.published_date)}
          </time>
          {article.byline && <span className="ml-4">{article.byline}</span>}
        </div>

        {imageMetadata && (
          <div className="mb-6 relative h-[400px] w-full">
            <Image
              src={imageMetadata.url || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {article.abstract && (
          <p className="text-lg font-medium mb-6">{article.abstract}</p>
        )}

        <div className="mt-8">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-primary hover:underline"
          >
            Read full article on NY Times
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </article>
    </main>
  );
}
