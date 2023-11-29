import Signup from "@/components/Signup";
import Auth from "@/pages/auth";
import React from "react";
import { useRouter } from "next/router";
import Tests from "@/pages/tests";
import Button from "@/components/Buttons";
import NotLoggedIn from "@/components/NotLoggedIn";

describe("Auth comp", () => {
  it("mounts", () => {
    cy.mount(<NotLoggedIn />);

    cy.contains("button");
  });
});
