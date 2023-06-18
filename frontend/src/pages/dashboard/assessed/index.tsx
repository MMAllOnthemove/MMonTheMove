import React from "react";
import Navbar from "../../../../components/Navbar";
import { DepartmentCardAssessed } from "../../../../components/DepartmentCard";

export default function Units_in() {
  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto p-2">
          <section className="department_cards">
            <DepartmentCardAssessed />
          </section>
        </div>
      </main>
    </>
  );
}
