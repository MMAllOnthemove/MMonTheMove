// External imports
import dynamic from "next/dynamic";
import React, { useState } from "react";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Pagination from "@/components/Table/Pagination";
import { fetchAllOTP, fetchCurrentUser } from "@/hooks/useFetch";
import { columns } from "@/components/OTPTable/columns";
import PageTitle from "@/components/PageTitle";
import NotLoggedIn from "@/components/NotLoggedIn";

// Dynamic imports
const Button = dynamic(() => import("@/components/Buttons"));
const Container = dynamic(() => import("@/components/Container"));
const ToTopButton = dynamic(() => import("@/components/ToTopButton"));
const Navbar = dynamic(() => import("@/components/Navbar"));

function Previous() {
  const { userData } = fetchCurrentUser();
  // Table sorting
  const [sorting, setSorting] = useState<SortingState>([]);

  // Table filtering
  const [filtering, setFiltering] = useState("");

  const { getAllOTP } = fetchAllOTP();

  const table = useReactTable({
    data: getAllOTP,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      <main className="space-between-navbar-and-content">
        <Container>
          <PageTitle hasSpan={false} title="One time pins" />
          {!userData ? (
            <NotLoggedIn />
          ) : (
            <>
              <div className="max-h-[540px] overflow-y-auto">
                <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                  <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] text-sm uppercase font-semibold">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className="font-semibold">
                        {headerGroup.headers.map((header) => {
                          return (
                            <th
                              key={header.id}
                              className="px-4 py-3 cursor-pointer  font-semibold"
                            >
                              {header.isPlaceholder ? null : (
                                <div
                                  {...{
                                    className: header.column.getCanSort()
                                      ? "cursor-pointer select-none"
                                      : "",
                                    onClick:
                                      header.column.getToggleSortingHandler(),
                                  }}
                                >
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {{
                                    asc: " ▽",
                                    desc: " △",
                                  }[header.column.getIsSorted() as string] ??
                                    null}
                                </div>
                              )}
                            </th>
                          );
                        })}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="z-0">
                    {table.getRowModel().rows.map((row: any) => (
                      <tr
                        key={row.id}
                        className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]"
                      >
                        {row.getVisibleCells().map((cell: any) => (
                          <td
                            key={cell.id}
                            className="px-4 py-3  font-medium text-sm max-w-full"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-2" />
              <Pagination table={table} />
              <ToTopButton />
            </>
          )}
        </Container>
      </main>
    </>
  );
}

export default Previous;
