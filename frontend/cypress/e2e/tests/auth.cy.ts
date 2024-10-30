describe("Authentication screen", () => {
    it("has a button with login as title", () => {
        cy.visit("http://localhost:3000/auth").title().should('eq', 'Auth')
    });
    it("click the continue button", () => {
        cy.visit("http://localhost:3000/auth").get("button").contains("Continue");
        cy.visit("http://localhost:3000/auth").get("a").contains("Forgot password");
    });
});
