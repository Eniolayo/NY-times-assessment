import { render, screen, act } from "@testing-library/react";
import { SearchForm } from "@/components/search-form";
import userEvent from "@testing-library/user-event";
import "jest";
import "@testing-library/jest-dom";

// Mock the useRouter hook
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("SearchForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search form with empty input by default", async () => {
    await act(async () => {
      render(<SearchForm />);
    });

    const input = screen.getByPlaceholderText("Search articles...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");

    const button = screen.getByRole("button", { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  it("renders search form with initial query", async () => {
    await act(async () => {
      render(<SearchForm initialQuery="test query" />);
    });

    const input = screen.getByPlaceholderText("Search articles...");
    expect(input).toHaveValue("test query");
  });

  it("updates input value when typing", async () => {
    await act(async () => {
      render(<SearchForm />);
    });

    const input = screen.getByPlaceholderText("Search articles...");
    await act(async () => {
      await userEvent.type(input, "new search");
    });

    expect(input).toHaveValue("new search");
  });

  it("navigates to search results when form is submitted", async () => {
    await act(async () => {
      render(<SearchForm />);
    });

    const input = screen.getByPlaceholderText("Search articles...");
    await act(async () => {
      await userEvent.type(input, "test search");
    });

    const button = screen.getByRole("button", { name: /search/i });
    await act(async () => {
      await userEvent.click(button);
    });

    expect(mockPush).toHaveBeenCalledWith("/?q=test%20search");
  });

  it("navigates to home when empty search is submitted", async () => {
    await act(async () => {
      render(<SearchForm initialQuery="test" />);
    });

    const input = screen.getByPlaceholderText("Search articles...");
    await act(async () => {
      await userEvent.clear(input);
    });

    const button = screen.getByRole("button", { name: /search/i });
    await act(async () => {
      await userEvent.click(button);
    });

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("submits form when Enter key is pressed", async () => {
    await act(async () => {
      render(<SearchForm />);
    });

    const input = screen.getByPlaceholderText("Search articles...");
    await act(async () => {
      await userEvent.type(input, "keyboard search{enter}");
    });

    expect(mockPush).toHaveBeenCalledWith("/?q=keyboard%20search");
  });
});
