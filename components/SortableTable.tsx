import { MouseEventHandler, useCallback, useState } from "react";
import { tableRowData } from "../public/_data/table";

type Data = typeof tableRowData;

type SortKeys = keyof Data[0];

type SortOrder = "ascn" | "desc";

function sortData({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Data;
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return tableData;

  const sortedData = tableRowData.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
  children,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: any;
}) {
  return (
    // <button
    //     onClick={onClick}
    //     className={`${sortKey === columnKey && sortOrder === "desc"
    //         ? "sort-button sort-reverse"
    //         : "sort-button"
    //         }`}
    // >
    //     ⇅
    // </button>
    <button
      onClick={onClick}
      className={`${
        sortKey === columnKey && sortOrder === "desc"
          ? "sort-button sort-reverse"
          : "sort-button"
      }`}
    >
      {children}
    </button>
  );
}

function SortableTable({ tableRowData }: { tableRowData: Data }) {
  const [sortKey, setSortKey] = useState<SortKeys>("model");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const columns: { key: SortKeys; label: string }[] = [
    { label: "Service Order", key: "serviceOrder" },
    { label: "Ticket", key: "ticketNo" },
    { label: "Model", key: "model" },
    { label: "Problem", key: "problem" },
    { label: "Warranty", key: "warranty" },
    { label: "Department", key: "department" },
    { label: "Booking", key: "bookingDate" },
    { label: "Assessed", key: "assessDate" },
    { label: "Assessment Completion", key: "assessComplete" },
    { label: "Technician", key: "tech" },
    { label: "Parts Ordered Date", key: "partsOrdered" },
    { label: "Parts ETA", key: "partsETA" },
    { label: "Repair Date", key: "repairDate" },
    { label: "Repair Completed", key: "repairComplete" },
    { label: "Repair Period", key: "repairPeriod" },
    { label: "Status", key: "status" },
  ];
  const sortedData = useCallback(
    () =>
      sortData({
        tableData: tableRowData,
        sortKey,
        reverse: sortOrder === "desc",
      }),
    [tableRowData, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

    setSortKey(key);
  }
  return (
    <>
      <table>
        <thead className="bg-gray-100">
          <tr>
            {columns.map((row) => {
              return (
                <td key={row.key}>
                  <SortButton
                    columnKey={row.key}
                    onClick={() => changeSort(row.key)}
                    {...{
                      sortOrder,
                      sortKey,
                    }}
                  >
                    {row.label}
                  </SortButton>
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData().map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.serviceOrder}</td>
                <td>{item.ticketNo}</td>
                <td>{item.model}</td>
                <td>{item.problem}</td>
                <td>{item.warranty}</td>
                <td>{item.department}</td>
                <td>{item.bookingDate}</td>
                <td>{item.assessDate}</td>
                <td>{item.assessComplete}</td>
                <td>{item.tech}</td>
                <td>{item.partsOrdered}</td>
                <td>{item.partsETA}</td>
                <td>{item.repairDate}</td>
                <td>{item.repairComplete}</td>
                <td>{item.repairPeriod}</td>
                <td>{item.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SortableTable;
