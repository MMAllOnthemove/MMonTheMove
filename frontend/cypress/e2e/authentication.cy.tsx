describe('Auth', () => {
    before(() => {
        // Login only once for all tests
        cy.visit('http://localhost:3000');
        cy.get('button').contains("Login").should('be.visible').click();
        cy.get('input[type="email"]').type('');
        cy.get('input[type="password"]').type('');
        cy.get('button[type="submit"]').click();

        // Confirm login successful by URL or visible element
        cy.url().should("eq", "http://localhost:3000/");
        cy.contains('HHP Management'); // Or any unique element post-login
    });

    it('should display the view tickets main screen correctly', () => {
        cy.url().should("eq", "http://localhost:3000/");

        // Check elements on main screen
        cy.get('input[type="search"]').type("127742");
        cy.contains('button', 'Bin stats').should('exist');
        cy.contains('button', 'Get report').should('exist');
        cy.get('#dateFrom').should('exist');
        cy.get('#dateTo').should('exist');
    });

    it('should display the view ticket page correctly', () => {
        cy.visit('http://localhost:3000/departments/hhp/technicians/2613');
        cy.contains('h1', '127742').should('exist'); // Assuming 127742 is in the h1
        // Add more specific checks if needed
    });
});
