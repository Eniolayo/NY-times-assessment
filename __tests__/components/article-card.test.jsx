import { render, screen } from "@testing-library/react";
import { ArticleCard } from "@/components/article-card";
import { formatDate } from "@/lib/utils";
import { describe, it, expect } from "@jest/globals";

// Mock the formatDate function
jest.mock("@/lib/utils", () => ({
  formatDate: jest.fn().mockReturnValue("January 1, 2023"),
  cn: jest.fn().mockImplementation((...args) => args.join(" ")),
}));

describe("ArticleCard", () => {
  const mockArticle = {
    uri: "nyt://article/123",
    url: "https://www.nytimes.com/article/123",
    id: 123,
    asset_id: 123,
    source: "New York Times",
    published_date: "2023-01-01",
    updated: "2023-01-01",
    section: "Technology",
    subsection: "",
    nytdsection: "technology",
    adx_keywords: "test",
    column: null,
    byline: "By Test Author",
    type: "Article",
    title: "Test Article Headline",
    abstract: "This is a test article abstract",
    des_facet: [],
    org_facet: [],
    per_facet: [],
    geo_facet: [],
    media: [
      {
        type: "image",
        subtype: "photo",
        caption: "Test caption",
        copyright: "Test copyright",
        approved_for_syndication: 1,
        "media-metadata": [
          {
            url: "https://example.com/image-small.jpg",
            format: "StandardThumbnail",
            height: 75,
            width: 75,
          },
          {
            url: "https://example.com/image-medium.jpg",
            format: "mediumThreeByTwo210",
            height: 140,
            width: 210,
          },
          {
            url: "https://example.com/image-large.jpg",
            format: "mediumThreeByTwo440",
            height: 293,
            width: 440,
          },
        ],
      },
    ],
    eta_id: 0,
  };

  it("renders article card with correct data", () => {
    render(<ArticleCard article={mockArticle} />);

    // Check headline
    expect(screen.getByText("Test Article Headline")).toBeInTheDocument();

    // Check abstract
    expect(
      screen.getByText("This is a test article abstract")
    ).toBeInTheDocument();

    // Check date
    expect(formatDate).toHaveBeenCalledWith("2023-01-01");
    expect(screen.getByText("January 1, 2023")).toBeInTheDocument();

    // Check section
    expect(screen.getByText("Technology")).toBeInTheDocument();

    // Check image
    const image = screen.getByAltText("Test Article Headline");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image-large.jpg");
  });

  it("renders article card without image when media is empty", () => {
    const articleWithoutImage = {
      ...mockArticle,
      media: [],
    };

    render(<ArticleCard article={articleWithoutImage} />);

    // Check headline still renders
    expect(screen.getByText("Test Article Headline")).toBeInTheDocument();

    // Check image doesn't render
    const image = screen.queryByRole("img");
    expect(image).not.toBeInTheDocument();
  });
});
