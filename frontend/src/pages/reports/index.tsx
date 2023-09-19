import React from "react";
import Container from "../../../components/Container";
import Navbar from "../../../components/Navbar";

function Reports() {
  return (
    <>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <Container>
          <h1> Reports for booking agents</h1>
        </Container>
      </main>
    </>
  );
}

export default Reports;
