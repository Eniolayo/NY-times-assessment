import { describe, it, expect } from "@jest/globals";
import { formatDate, cn } from "@/lib/utils";

describe("formatDate", () => {
  it("formats date string correctly", () => {
    const dateString = "2023-01-15T12:30:45Z";
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe("January 15, 2023");
  });

  it("handles different date formats", () => {
    const dateString = "2023/05/20";
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe("May 20, 2023");
  });
});

describe("cn", () => {
  it("combines class names correctly", () => {
    const result = cn("class1", "class2");
    expect(result).toBe("class1 class2");
  });

  it("handles conditional class names", () => {
    const condition = true;
    const result = cn("class1", condition && "class2", !condition && "class3");
    expect(result).toBe("class1 class2");
  });

  it("handles array of class names", () => {
    const result = cn("class1", ["class2", "class3"]);
    expect(result).toBe("class1 class2 class3");
  });

  it("handles object of class names", () => {
    const result = cn("class1", { class2: true, class3: false });
    expect(result).toBe("class1 class2");
  });
});
