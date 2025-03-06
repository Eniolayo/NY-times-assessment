/// <reference types="cypress" />

describe("Article Detail Page", () => {
  beforeEach(() => {
    // Visit the article detail page
    cy.visit("/article/821e56d6-cc94-56fa-a5ae-624a83a3970b");
  });

  it("displays the article title", () => {
    cy.get("h1").should("be.visible");
    cy.get("h1").should("contain", "Oscars 2025 Winners: Full List");
  });

  it("displays the article metadata", () => {
    cy.get("time").should("be.visible");
    cy.get("time").should("contain", "March 2, 2025");
  });

  it("displays the article content", () => {
    cy.contains(
      "The complete list of winners at the 97th annual Academy Awards."
    ).should("be.visible");
  });

  it("displays the article image when available", () => {
    cy.get("img").should("be.visible");
    cy.get("img").should("have.attr", "alt", "Oscars 2025 Winners: Full List");
  });

  it("has a working back button", () => {
    // Click the back button
    cy.contains("Back to articles").click();

    // Should be on the home page
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("has a link to the full article on NY Times", () => {
    cy.contains("Read full article on NY Times")
      .should("have.attr", "href")
      .and("include", "nytimes.com");

    cy.contains("Read full article on NY Times")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "rel", "noopener noreferrer");
  });
});
