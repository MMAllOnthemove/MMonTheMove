/// <reference types="cypress" />

describe("HHP Technicians", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/departments/hhp/technicians");
    });

    it("displays the correct title", () => {
        cy.title().should("eq", "HHP technicians tasks");
    });

    it("displays the correct headings", () => {
        cy.get("button").contains("Sort columns");
        cy.get("button").contains("Add task");
    });
});
