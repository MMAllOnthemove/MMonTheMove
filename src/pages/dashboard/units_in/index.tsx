import React from "react";
import Navbar from "../../../../components/Navbar";
import DepartmentCard from "../../../../components/DepartmentCard";

export default function Units_in() {
  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto p-2">
          <section className="department_cards">
            <DepartmentCard />
          </section>
        </div>
      </main>
    </>
  );
}
