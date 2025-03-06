import { fetchArticles, fetchArticleById } from "@/lib/api";
import { describe, it, expect, beforeEach } from "@jest/globals";

// Mock the fetch function
global.fetch = jest.fn();

describe("API functions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("fetchArticles", () => {
    it("fetches articles with the correct URL and parameters", async () => {
      // Mock successful response
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          status: "OK",
          results: [
            {
              uri: "nyt://article/123",
              title: "Article 1",
              abstract: "Abstract 1",
            },
            {
              uri: "nyt://article/456",
              title: "Article 2",
              abstract: "Abstract 2",
            },
          ],
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchArticles();

      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=test-api-key"
      );

      expect(result).toEqual({
        articles: [
          {
            uri: "nyt://article/123",
            title: "Article 1",
            abstract: "Abstract 1",
          },
          {
            uri: "nyt://article/456",
            title: "Article 2",
            abstract: "Abstract 2",
          },
        ],
        totalResults: 2,
      });
    });

    it("filters articles by query", async () => {
      // Mock successful response
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          status: "OK",
          results: [
            {
              uri: "nyt://article/123",
              title: "Test Article",
              abstract: "Abstract 1",
            },
            {
              uri: "nyt://article/456",
              title: "Another Article",
              abstract: "Test abstract",
            },
            {
              uri: "nyt://article/789",
              title: "Third Article",
              abstract: "Abstract 3",
            },
          ],
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchArticles("test");

      // Check result is filtered correctly
      expect(result.articles.length).toBe(2);
      expect(result.articles[0].title).toBe("Test Article");
      expect(result.articles[1].abstract).toBe("Test abstract");
    });

    it("handles pagination correctly", async () => {
      // Create 15 mock articles
      const mockArticles = Array.from({ length: 15 }, (_, i) => ({
        uri: `nyt://article/${i}`,
        title: `Article ${i}`,
        abstract: `Abstract ${i}`,
      }));

      // Mock successful response
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          status: "OK",
          results: mockArticles,
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Request page 2 (should return items 10-14)
      const result = await fetchArticles("", 2);

      // Check pagination works correctly
      expect(result.articles.length).toBe(5); // Second page has 5 items
      expect(result.totalResults).toBe(15);
      expect(result.articles[0].title).toBe("Article 10");
    });

    it("handles fetch errors gracefully", async () => {
      // Mock error response
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      const result = await fetchArticles();

      // Check result
      expect(result).toEqual({
        articles: [],
        totalResults: 0,
      });
    });
  });

  describe("fetchArticleById", () => {
    it("fetches article by ID with the correct URL and parameters", async () => {
      // Mock successful response
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          status: "OK",
          results: [
            {
              uri: "nyt://article/123",
              title: "Article 1",
              abstract: "Abstract 1",
            },
            {
              uri: "nyt://article/456",
              title: "Article 2",
              abstract: "Abstract 2",
            },
          ],
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchArticleById("123");

      // Check fetch was called with correct URL and parameters
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=test-api-key"
      );

      // Check result
      expect(result).toEqual({
        uri: "nyt://article/123",
        title: "Article 1",
        abstract: "Abstract 1",
      });
    });

    it("returns null when article is not found", async () => {
      // Mock successful response but without the article we're looking for
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          status: "OK",
          results: [
            {
              uri: "nyt://article/456",
              title: "Article 2",
              abstract: "Abstract 2",
            },
          ],
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchArticleById("123");

      // Check result
      expect(result).toBeNull();
    });

    it("handles fetch errors gracefully", async () => {
      // Mock error response
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      const result = await fetchArticleById("123");

      // Check result
      expect(result).toBeNull();
    });
  });
});
