Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Note app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.get("#username").type("JWCTempleton");
    cy.get("#password").type("setonsut");
    cy.get("#login-button").click();
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("Note app, JWCT Designs 2023");
  });

  // it("user can log in", function () {
  //   cy.get("#username").type("JWCTempleton");
  //   cy.get("#password").type("setonsut");
  //   cy.get("#login-button").click();
  //   cy.contains("Jacob Templeton logged in");
  // });

  it("a new note can be created", function () {
    cy.contains("new note").click();
    cy.get("input").type("a note created by cypress");
    cy.contains("save").click();
    cy.contains("a note created by cypress");
  });
});
