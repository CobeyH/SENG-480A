describe("Login Specs", () => {
  beforeEach(() => {
    cy.logout();
  });

  describe("User can login with UI", () => {
    beforeEach(() => {
      cy.visit("/login");
    });
    it("is accessible via url", () => {
      cy.contains("Sign in");
    });
    it("existing user can log in", () => {
      cy.get("[data-cy=email]").type("cypress@example.com");
      cy.get("[data-cy=password]").type("password");
      cy.get("[data-cy=auth-submit]").click();
      cy.url().should("include", "/welcome");
    });
  });

  describe("Login without UI", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Visit a page that requires authentication", () => {
      cy.visit("/welcome");
      cy.contains("Welcome to Tandem!");
    });
  });
});
