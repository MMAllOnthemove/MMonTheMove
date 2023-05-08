import { useState } from "react";
import Navbar from "../../../components/Navbar";
import SortableTable from "../../../components/SortableTable";
import { tableRowData } from "../../../public/_data/table";
import Link from "next/link";

export default function Management() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filterTable = tableRowData.filter((item) => {
    return (
      item.serviceOrder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ticketNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.problem.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const TableInfo = (props: any) =>
    props.list.map((item: any, index: any) => {
      const {
        serviceOrder,
        ticketNo,
        model,
        problem,
        warranty,
        department,
        bookingDate,
        assessDate,
        tech,
        partsOrdered,
        partsETA,
        repairDate,
        repairComplete,
        repairPeriod,
        _status,
      } = item;
      return (
        <tr key={index}>
          <td>{serviceOrder}</td>
          <td>{ticketNo}</td>
          <td>{model}</td>
          <td>{problem}</td>
          <td>{warranty}</td>
          <td>{department}</td>
          <td>{bookingDate}</td>
          <td>{assessDate}</td>
          <td>{tech}</td>
          <td>{partsOrdered}</td>
          <td>{partsETA}</td>
          <td>{repairDate}</td>
          <td>{repairComplete}</td>
          <td>{repairPeriod}</td>
          <td>{_status}</td>
        </tr>
      );
    });

  return (
    <>
      <Navbar />

      <main>
        <div className="container flex justify-center flex-col mx-auto p-2">
          <section className="flex justify-center my-5">
            <h1 className="text-2xl lg:text-4xl font-semibold text-gray-700">
              Projects HHP - DTV - HA
            </h1>
          </section>
          <section className="my-4">
            <label htmlFor="search" className="sr-only">
              Search here
            </label>
            <input
              className="input"
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search table"
            />
          </section>
          <section className="">
            {/* <SortableTable tableRowData={tableRowData} /> */}
            {/* <div id="example-table"></div> */}

            <div className="w-100 overflow-auto">
              <table className="table table-hoverable border-collapse font-weight-normal">
                <thead>
                  <tr>
                    <th>Service Order No</th>
                    <th>Ticket No</th>
                    <th>Model</th>
                    <th>Problem</th>
                    <th>Warranty</th>
                    <th>Department</th>
                    <th>Booking Date</th>
                    <th>Assessment Date</th>
                    <th>Tech</th>
                    <th>Parts Ordered</th>
                    <th>Parts ETA</th>
                    <th>Repair Date</th>
                    <th>Repair Complete</th>
                    <th>Repair Period</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="tableBody" id="myTable">
                  <TableInfo list={filterTable} />
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
