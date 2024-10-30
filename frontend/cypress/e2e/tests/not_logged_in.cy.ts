describe("not logged in screen", () => {
 
    it("has a button with login as title", () => {
        cy.visit("http://localhost:3000").get("button").contains("Login");
    });
    it("has a p with text You are not logged in", () => {
        cy.visit("http://localhost:3000")
            .get("p")
            .contains("You are not logged in");
    });
    it("has a role of button when you are not logged in", () => {
        cy.visit("http://localhost:3000");
        cy.contains("button", "Login").click();
    });
});
