import { render, screen } from "@testing-library/react";
import { ArticleList } from "@/components/article-list";
import { describe, it, expect } from "@jest/globals";

// Mock the ArticleCard component
jest.mock("@/components/article-card", () => ({
  ArticleCard: ({ article }) => (
    <div data-testid="article-card">{article.headline.main}</div>
  ),
}));

// Mock the Pagination component
jest.mock("@/components/pagination", () => ({
  Pagination: ({ currentPage, totalPages, query }) => (
    <div data-testid="pagination">
      Page {currentPage} of {totalPages} - Query: {query}
    </div>
  ),
}));

describe("ArticleList", () => {
  const mockArticles = [
    {
      id: "nyt://article/123",
      headline: { main: "Article 1" },
      web_url: "https://example.com/1",
      pub_date: "2023-01-01",
    },
    {
      id: "nyt://article/456",
      headline: { main: "Article 2" },
      web_url: "https://example.com/2",
      pub_date: "2023-01-02",
    },
  ];

  it("renders a list of article cards", () => {
    render(
      <ArticleList
        articles={mockArticles}
        currentPage={1}
        totalResults={20}
        query=""
      />
    );

    const articleCards = screen.getAllByTestId("article-card");
    expect(articleCards).toHaveLength(2);
    expect(articleCards[0]).toHaveTextContent("Article 1");
    expect(articleCards[1]).toHaveTextContent("Article 2");
  });

  it("renders pagination when there are multiple pages", () => {
    render(
      <ArticleList
        articles={mockArticles}
        currentPage={1}
        totalResults={20}
        query=""
      />
    );

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("Page 1 of 2");
  });

  it("does not render pagination when there is only one page", () => {
    render(
      <ArticleList
        articles={mockArticles}
        currentPage={1}
        totalResults={10}
        query=""
      />
    );

    const pagination = screen.queryByTestId("pagination");
    expect(pagination).not.toBeInTheDocument();
  });

  it("displays a message when no articles are found", () => {
    render(
      <ArticleList
        articles={[]}
        currentPage={1}
        totalResults={0}
        query="nonexistent"
      />
    );

    expect(
      screen.getByText('No articles found for "nonexistent"')
    ).toBeInTheDocument();
  });

  it("displays a generic message when no articles are found with no query", () => {
    render(
      <ArticleList articles={[]} currentPage={1} totalResults={0} query="" />
    );

    expect(screen.getByText("No articles found")).toBeInTheDocument();
  });
});
