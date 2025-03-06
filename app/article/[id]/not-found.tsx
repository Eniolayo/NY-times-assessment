import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ArticleNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The article you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/">Browse Articles</Link>
      </Button>
    </div>
  );
}
