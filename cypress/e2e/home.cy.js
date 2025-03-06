/// <reference types="cypress" />
describe("Home Page", () => {
  beforeEach(() => {
    // Visit the home page
    cy.visit("/");
  });

  it("displays the header with correct title", () => {
    cy.get("header").should("be.visible");
    cy.contains("NY Times Articles").should("be.visible");
  });

  it("displays the search form", () => {
    cy.get('input[placeholder="Search articles..."]').should("be.visible");
    cy.contains("button", "Search").should("be.visible");
  });

  it("displays article cards", () => {
    cy.get('[data-testid="article-card"]').should("have.length.at.least", 1);
  });

  it("allows searching for articles", () => {
    // Type in the search box and submit
    cy.get('input[placeholder="Search articles..."]').type("oscar");
    cy.contains("button", "Search").click();

    // URL should be updated
    cy.url().should("include", "?q=oscar");

    // Search results should be displayed
    cy.get('[data-testid="article-card"]').should("have.length.at.least", 1);
  });

  it("navigates to article detail page when clicking on an article", () => {
    // Click on the first article
    cy.get('[data-testid="article-card-link"]').first().click();

    // URL should be updated to article detail page
    cy.url().should("include", "/article/");

    // Article detail should be displayed
    cy.get("h1").should("be.visible");
    cy.contains("Read full article on NY Times").should("be.visible");
  });
});
