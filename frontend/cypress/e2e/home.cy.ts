describe("Home screen UI", () => {
    before(() => {
        // Log in once before all tests
        cy.visit("http://localhost:3000");
        cy.get('button[type="button"]').click();
        cy.get('input[name="email"]').type("");
        cy.get('input[name="password"]').type("");
        // Toggle password visibility (button with eye icon, adjust selector if needed)
        cy.get('[data-testid="toggle-password"]').click();
        cy.get('button[type="submit"]').click();
        cy.contains("Successfully logged in").should("exist");
        cy.url().should("include", "/");
    });

    it("should show all key elements", () => {
        // Check that you're still on the correct page
        cy.url().should("include", "/");
        cy.get('button[type="button"]').contains("Bin stats");
        cy.get('button[type="button"]').contains("Get report");
        cy.get('input[name="dateFrom"]');
        cy.get('input[name="dateTo"]');
        cy.get('input[id="simple-search"]').type("127742");
        // Click the button that triggers the Dropdown Menu
        cy.get("tr button").click();
        // Verify the dropdown menu is visible
        cy.get('[role="menu"]').should("be.visible");
        cy.screenshot();
        // Click on the 'View' menu item
        // cy.get('[role="menuitem"]').contains("View ticket").click();
    });
});
