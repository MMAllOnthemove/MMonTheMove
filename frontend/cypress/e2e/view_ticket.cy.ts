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
        cy.visit("http://localhost:3000");
        // Interact with status select
        // cy.get('select[name="unit_status"]')
        //     .first()
        //     .should("contain", "Select status")
        //     .select("New");
        // cy.wait(5000);
        // cy.get('select[name="unit_status"]').first().select("Resolved");

        // // Interact with engineer select
        // cy.get('select[name="engineer"]')
        //     .should("contain", "Select engineer")
        //     .select("Dineo Langa");
        // cy.wait(5000);
        // cy.get('select[name="engineer"]')
        //     .should("contain", "Select engineer")
        //     .select("Andrea Likomba");
        // cy.get("h5#booked_by").contains("Booked by");

        // // Open edit dialog
        // cy.get("button").contains("Edit").click();

        // // Wait for the modal to open and check visibility of the fields
        // cy.get('select[name="rs_warranty"]').should("be.visible").select("OOW");
        // cy.get('input[name="serviceOrder"]')
        //     .should("be.visible")
        //     .type("123456789");
        // cy.get('input[name="device_location"]')
        //     .should("be.visible")
        //     .type("Test location");
        // cy.get('input[name="add_job_repair_no"]')
        //     .should("be.visible")
        //     .type("123456789");
        // cy.get('textarea[name="additionalInfo"]')
        //     .should("be.visible")
        //     .type("Test requirement");

        // Wait for the modal to fully load before clicking Update button
        // cy.get('button[type="button"]')
        //     .contains("Update")
        //     .should("be.visible")
        //     .click();

        // Quality Control
        cy.get('[type="radio"]').check("Pass");
        cy.get('textarea[name="qc_comment"]').type("Test qc comment");
        cy.get('button[type="submit"]')
            .contains("Update Quality control")
            .click();

        // Attachments
        cy.get("button").contains("Upload").click();

        // Parts section
        // Add part
        // opening the accordion it is located under

        // Ensure trigger is present
        cy.contains("Search and add part").should("exist").click();
        cy.get('input[name="part_name"]').type("GH82-33133A");
        cy.wait(5000);
        cy.get('input[name="part_desc"]').should(
            "have.value",
            "SVC FRONT MODULE-FRAME(E/ZA),SM-F731"
        );
        cy.wait(3000);
        cy.get('input[name="part_quantity"]').focus().type("1");

        cy.wait(3000);
        cy.contains("Add part").click();
        cy.wait(5000);
        // close it
        cy.contains("Search and add part").should("exist").click();

        cy.contains("Parts used for unit").should("exist").click();
        cy.get("p#GH82-33133A").contains("GH82-33133A");
        cy.get("button[type='button']").contains("Send to ticket");
        cy.contains("Parts used for unit").should("exist").click();

        cy.contains("Old parts returned").should("exist").click();
        cy.get("checkbox#GH82-33133A").check();
        cy.get("#submitOldParts").contains(
            "Publish old parts as comment on repairshopr"
        );
        cy.contains("Old parts returned").should("exist").click();
        // // Comment
        // cy.get('textarea[name="partsExtraText"]').type("Testing...");
        // cy.contains("Submit comment").click();
    });
});
