describe("View and update single ticket", () => {
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

    it("should update ticket details end to end", () => {
        cy.visit("http://localhost:3000/departments/hhp/technicians/2613");
        // Interact with status select
        cy.get('select[name="unit_status"]')
            .first()
            .should("contain", "Select status")
            .select("New");
        cy.wait(5000);
        cy.get('select[name="unit_status"]').first().select("Resolved");

        // Interact with engineer select
        cy.get('select[name="engineer"]')
            .should("contain", "Select engineer")
            .select("Dineo Langa");
        cy.wait(5000);
        cy.get('select[name="engineer"]')
            .should("contain", "Select engineer")
            .select("Andrea Likomba");

        // Open edit dialog
        cy.get("button").contains("Edit").click();

        // Wait for the modal to open and check visibility of the fields
        cy.get('select[name="rs_warranty"]').should("be.visible").select("OOW");
        cy.get('input[name="serviceOrder"]')
            .should("be.visible")
            .type("123456789");
        cy.get('input[name="device_location"]')
            .should("be.visible")
            .type("Test location");
        cy.get('input[name="add_job_repair_no"]')
            .should("be.visible")
            .type("123456789");
        cy.get('textarea[name="additionalInfo"]')
            .should("be.visible")
            .type("Test requirement");

        // Wait for the modal to fully load before clicking Update button
        cy.get('button[type="button"]')
            .contains("Update")
            .should("be.visible")
            .click();

        // // Quality Control
        // cy.get('textarea[name="qc_comment"]').type("Test qc comment");
        // cy.contains("Update Quality Control").click();

        // // Add part
        // cy.get('input[name="part_name"]').type("GH82-33133A");
        // cy.get('input[name="part_desc"]').should(
        //     "have.value",
        //     "SVC FRONT MODULE-FRAME(E/ZA),SM-F731"
        // );
        // cy.get('input[name="part_quantity"]').type("1");
        // cy.contains("Add part").click();

        // // Comment
        // cy.get('textarea[name="partsExtraText"]').type("Testing...");
        // cy.contains("Submit comment").click();
    });
});
