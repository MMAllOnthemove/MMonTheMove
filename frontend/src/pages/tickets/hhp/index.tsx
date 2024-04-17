// External imports
import React from "react";
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";


// Custom imports
import TableBody from "@/components/TicketsTable/TableBody";
import columns from "@/components/TicketsTable/columns";
import NotLoggedIn from "@/components/NotLoggedIn";
import PageTitle from "@/components/PageTitle";
import { fetchCurrentUser, fetchTicketById, fetchTickets } from "@/hooks/useFetch";
import TicketsModal from "@/components/PopupModal/tickets-modal";
import ManagementSearchForm from "@/components/Table/managementSearchForm";
const Container = dynamic(() => import("@/components/Container"));
const Navbar = dynamic(() => import("@/components/Navbar"));
const ToTopButton = dynamic(() => import("@/components/ToTopButton"));
const Pagination = dynamic(() => import("@/components/Table/Pagination"));

function HHPTickets() {
    const { userData } = fetchCurrentUser();

    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");

    const { getAllTickets } = fetchTickets();
    const table = useReactTable({
        data: getAllTickets,
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
    // console.log(table.getRowModel().rows)
    const [isTicketModalVisible, setIsTicketModalVisible] = useState<any>()

    const router = useRouter();
    // Redirects user to the edit table page
    const handleUpdate = (e: React.SyntheticEvent, unique_id: string | number) => {
        e.stopPropagation();
        router.push(`/tickets/hhp/${unique_id}`);
    };
    const [selectedRow, setSelectedRow] = useState(false);

    const openModal = (row: any) => {
        setIsTicketModalVisible(row);
    };

    const closeModal = () => {
        setIsTicketModalVisible(false);
    };
    return (
        <>
            <Head>
                <title>Tickets | MMALLONTHEMOVE</title>
                <meta name="robots" content="noindex"></meta>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className="space-between-navbar-and-content">
                <Container>

                    {!userData ? (<NotLoggedIn />) : (
                        <>

                            <PageTitle title="Tickets" hasSpan={false} />

                            <div className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />
                                <div />
                            </div>

                            <div className="max-h-[540px] overflow-y-auto">
                                <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] text-sm uppercase font-semibold">
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <tr key={headerGroup.id} className="font-semibold">
                                                <th className="px-4 py-3 cursor-pointer font-semibold">
                                                    Action
                                                </th>
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
                                    <TableBody>
                                        {table.getRowModel().rows.map((row: any) => (

                                            <tr
                                                key={row.id}
                                                className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]"
                                                onClick={() => openModal(row.original)}
                                            >
                                                <td className="px-4 py-3  font-medium text-sm max-w-full">
                                                    <button
                                                        type="button"
                                                        role="button"
                                                        onClick={(e) => handleUpdate(e, row.original.unique_id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
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
                                    </TableBody>

                                </table>

                                <TicketsModal isVisible={isTicketModalVisible} title="" content={isTicketModalVisible && (
                                    <div>
                                        <h2>Row Details</h2>
                                        <p>Customer: {isTicketModalVisible?.customer_fullname}</p>
                                        <p>Unit: {isTicketModalVisible?.type_of_unit}</p>
                                        <p>Warranty: {isTicketModalVisible?.warranty_period}</p>
                                        <p>Serial number: {isTicketModalVisible?.serial_number}</p>
                                        <p>Ticket: {isTicketModalVisible?.ticket_number}</p>
                                        <button onClick={closeModal}>Close Modal</button>
                                    </div>
                                )} onClose={closeModal} />


                            </div>
                            <div className="h-2" />
                            <Pagination table={table} />
                            <ToTopButton />
                        </>
                    )}
                </Container>
            </main>

        </>
    )
}

export default HHPTickets
