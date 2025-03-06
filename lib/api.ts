import { Article } from "./types";

const API_KEY = process.env.NYTIMES_API_KEY;
const BASE_URL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json";

export async function fetchArticles(query: string = "", page: number = 1) {
  try {
    const searchParams = new URLSearchParams({
      "api-key": API_KEY!,
    });

    const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }

    const data = await response.json();

    // Filter by query if provided
    let articles = data.results as Article[];
    if (query) {
      const lowerQuery = query.toLowerCase();
      articles = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerQuery) ||
          article.abstract.toLowerCase().includes(lowerQuery)
      );
    }

    // Handle pagination (client-side since the API doesn't support it)
    const itemsPerPage = 10;
    const totalResults = articles.length;
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedArticles = articles.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return {
      articles: paginatedArticles,
      totalResults,
    };
  } catch (error) {
    return { articles: [], totalResults: 0 };
  }
}

export async function fetchArticleById(id: string) {
  try {
    const searchParams = new URLSearchParams({
      "api-key": API_KEY!,
    });

    const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }

    const data = await response.json();
    const articles = data.results as Article[];

    // Find the article with the matching ID
    const article = articles.find((article) => {
      const articleId = article.uri.split("/").pop();
      return articleId === id;
    });

    if (!article) {
      return null;
    }

    return article;
  } catch (error) {
    return null;
  }
}
