import { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  // Extract the article ID from the URI
  const articleId = article.uri.split("/").pop();

  // Find the first image that has the format we want
  const imageMetadata = article.media[0]?.["media-metadata"]?.find(
    (meta) => meta.format === "mediumThreeByTwo440"
  );

  return (
    <Card className="h-full flex flex-col" data-testid="article-card">
      <CardHeader className="p-4">
        {imageMetadata ? (
          <div className="mb-0 relative h-48 w-full">
            <Image
              src={imageMetadata.url || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ) : (
          <div className="mb-0 relative h-48 w-full"></div>
        )}
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow">
        <CardTitle className="line-clamp-2 text-lg">
          <Link
            href={`/article/${articleId}`}
            data-testid="article-card-link"
            className="hover:underline"
          >
            {article.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.abstract}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center text-xs text-muted-foreground">
        <Calendar className="mr-1 h-3 w-3" />
        <time dateTime={article.published_date}>
          {formatDate(article.published_date)}
        </time>

        {article.section && (
          <span className="ml-auto bg-muted px-2 py-1 rounded-full">
            {article.section}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
