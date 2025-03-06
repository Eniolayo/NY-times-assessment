"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query: string;
}

export function Pagination({
  currentPage,
  totalPages,
  query,
}: PaginationProps) {
  const createPageURL = (pageNumber: number) => {
    const searchParams = new URLSearchParams();
    if (query) {
      searchParams.set("q", query);
    }
    // Always include page parameter even for page 1 when going backward
    searchParams.set("page", pageNumber.toString());
    return `/?${searchParams.toString()}`;
  };

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <Link
        href={isPrevDisabled ? "/" : createPageURL(currentPage - 1)}
        aria-disabled={isPrevDisabled}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
        {...(isPrevDisabled ? { disabled: true } : {})}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Link>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={isNextDisabled ? "/" : createPageURL(currentPage + 1)}
        aria-disabled={isNextDisabled}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
        {...(isNextDisabled ? { disabled: true } : {})}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
}
