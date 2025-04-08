describe("Authentication", () => {
    it("should login with valid credentials", () => {
        // Log in once before all tests
        cy.visit("http://localhost:3000");
        cy.get('button[type="button"]').click();
        cy.get('input[name="email"]').type("");
        cy.get('input[name="password"]').type("");
        // Toggle password visibility (button with eye icon, adjust selector if needed)
        cy.get('[data-testid="toggle-password"]').click();
        cy.get('button[type="submit"]').click();
        cy.contains("Successfully logged in").should("exist");
        cy.screenshot();
        cy.url().should("include", "/");
    });
});
