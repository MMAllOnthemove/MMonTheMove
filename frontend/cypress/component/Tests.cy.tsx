import Spinner from "../../components/Spinner";
import Button from "../../components/Buttons";

describe("<Button/>", () => {
  it('finds the content "element"', () => {
    // cy.visit("https://example.cypress.io");

    cy.get("<button>").click();
  });
});
