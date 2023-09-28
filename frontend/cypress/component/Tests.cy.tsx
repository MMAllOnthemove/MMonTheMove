import Dashboard from "@/pages/dashboard";
import Home from "@/pages";

describe("<Home/>", () => {
  it("has Page title", () => {
    cy.mount(<Home />);
    cy.get("input").should(
      "have.attr",
      "placeholder",
      "Subscribe to our newsletter"
    );
  });
});
