import Navbar from "../../../components/Navbar";
import React, { useState, useEffect } from "react";

export default function Management() {
  const [data, setData] = useState<null | any>(null);

  const [search, setSearch] = useState<string>("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSearch(event.target.value);
  };
  return (
    <>
      <Navbar />

      <main>
        <div className="container flex justify-center flex-col mx-auto p-2">
          <section className="my-4 flex justify-center flex-col items-center gap-2">
            <form onSubmit={handleSubmit} className="flex flex-row gap-2">
              <label htmlFor="searchPart" className="sr-only">
                Search Part
              </label>
              <input
                className="searchInput search input placeholder-sky-900 outline-none text-gray-950"
                placeholder="Search Part"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <input
                type="submit"
                value="Search"
                className="bg-sky-700 py-3 px-4 rounded text-white border-0 font-sans font-medium hover:bg-sky-950"
              />
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
