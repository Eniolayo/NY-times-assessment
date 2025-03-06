import { render, screen } from "@testing-library/react";
import { Pagination } from "@/components/pagination";
import "@testing-library/jest-dom";

describe("Pagination", () => {
  it("renders pagination with correct page information", () => {
    render(<Pagination currentPage={2} totalPages={5} query="" />);
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<Pagination currentPage={1} totalPages={5} query="" />);
    const prevButton = screen.getByRole("link", { name: /previous/i });
    expect(prevButton).toHaveAttribute("aria-disabled", "true");
    expect(prevButton).toHaveAttribute("disabled");
  });

  it("enables previous button when not on first page", () => {
    render(<Pagination currentPage={2} totalPages={5} query="" />);
    const prevButton = screen.getByRole("link", { name: /previous/i });
    expect(prevButton).toHaveAttribute("aria-disabled", "false");
    expect(prevButton).not.toHaveAttribute("disabled");
    expect(prevButton).toHaveAttribute("href", "/?page=1");
  });

  it("disables next button on last page", () => {
    render(<Pagination currentPage={5} totalPages={5} query="" />);
    const nextButton = screen.getByRole("link", { name: /next/i });
    expect(nextButton).toHaveAttribute("aria-disabled", "true");
    expect(nextButton).toHaveAttribute("disabled");
  });

  it("enables next button when not on last page", () => {
    render(<Pagination currentPage={4} totalPages={5} query="" />);
    const nextButton = screen.getByRole("link", { name: /next/i });
    expect(nextButton).toHaveAttribute("aria-disabled", "false");
    expect(nextButton).not.toHaveAttribute("disabled");
    expect(nextButton).toHaveAttribute("href", "/?page=5");
  });

  it("includes query parameter in pagination links when provided", () => {
    render(<Pagination currentPage={2} totalPages={5} query="test" />);
    const prevButton = screen.getByRole("link", { name: /previous/i });
    const nextButton = screen.getByRole("link", { name: /next/i });
    expect(prevButton).toHaveAttribute("href", "/?q=test&page=1");
    expect(nextButton).toHaveAttribute("href", "/?q=test&page=3");
  });
});
