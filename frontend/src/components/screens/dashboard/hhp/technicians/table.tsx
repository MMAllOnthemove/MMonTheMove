"use client";
import ManagementSearchForm from "@/components/search_field/page";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useFetchEngineer from "@/hooks/useFetchEngineers";
import useFetchHHPReports from "@/hooks/useFetchHHPTableDashboardReports";
import useUserLoggedIn from "@/hooks/useGetUser";
import useHHPDashboardTable from "@/hooks/useHHPDashboardTable";
import { useHHPTasksCrud } from "@/hooks/useHHPTasksCrud";
import { datetimestamp } from "@/lib/date_formats";
import openEngineerBinsTab from "@/lib/openEngineerBinsTab";
import openFullScreenPopup from "@/lib/openFullScreenPopup";
import repairshopr_statuses_techs from "@/lib/tech_rs_statuses";
import { ColumnDef, ColumnFiltersState, ColumnOrderState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable } from "@tanstack/react-table";
import moment from "moment";
import React, { useMemo, useState } from "react";

const repairshopr_statuses = [
    ...repairshopr_statuses_techs,
    { id: 19, _status: "QC Passed" }, // Add QC Passed status
];





const HHPDashboardTable = () => {
    const { user, isLoggedIn } = useUserLoggedIn()
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedEngineer, setSelectedEngineer] = useState<string | null>(null);
    const [selectedTickets, setSelectedTickets] = useState<any[]>([]);
    const [fromDate, setFromDate] = useState<string | null>(null);
    const [toDate, setToDate] = useState<string | null>(null);
    const { engineersList } = useFetchEngineer();
    const [openSortTableColumnsModal, setSortTableColumns] = useState(false)
    const { hhpTasks, hhpTasksLoading } = useHHPTasksCrud()
    const hhpTechs = engineersList?.filter((x) => x.department === "HHP")
    const { hhpDashboardTable, hhpDashboardTableLoading, refetchHHPDashboardTable } = useHHPDashboardTable(fromDate, toDate)
    const [modalOpen, setModalOpen] = useState(false);
    const [modalLabel, setModalLabel] = useState("");
    const [modalTickets, setModalTickets] = useState<any[]>([]);
    const handleShowTickets = (tickets: any[], label: string) => {
        setModalLabel(label);
        setModalTickets(tickets);

        setModalOpen(true);
    };
    const { reportsLoading, fetchReports, error } = useFetchHHPReports()

    // know how many were booked
    // Filter the tasks based on date range
    const filteredTasks = useMemo(() => {
        return hhpTasks.filter((ticket: any) => {
            const ticketDate = new Date(ticket.date_booked);
            const from = fromDate ? new Date(fromDate) : null;
            const to = toDate ? new Date(toDate) : null;

            if (from && ticketDate < from) return false;
            if (to && ticketDate > to) return false;

            return true;
        });
    }, [hhpTasks, fromDate, toDate]);

    // Display the count of filtered tasks
    const filteredTaskCount = filteredTasks.length;


    const calculateColumnTotals = (data: any[]) => {
        const totals: Record<string, number> = {
            new_tickets_count: 0,
            assigned_tickets_count: 0,
            customer_reply_tickets_count: 0,
            parts_request_tickets_count: 0,
            in_progress_tickets_count: 0,
            qc_passed_count: 0,
            for_invoicing_count: 0,
            resolved_count: 0,
            qc_failed_count: 0,
        };

        data.forEach(row => {
            totals.new_tickets_count += Number(row.new_tickets_count) || 0;
            totals.assigned_tickets_count += Number(row.assigned_tickets_count) || 0;
            totals.customer_reply_tickets_count += Number(row.customer_reply_tickets_count) || 0;
            totals.parts_request_tickets_count += Number(row.parts_request_tickets_count) || 0;
            totals.in_progress_tickets_count += Number(row.in_progress_tickets_count) || 0;
            totals.qc_passed_count += Number(row.qc_passed_count) || 0;
            totals.for_invoicing_count += Number(row.for_invoicing_count) || 0;
            totals.resolved_count += Number(row.resolved_count) || 0;
            totals.qc_failed_count += Number(row.qc_failed_count) || 0;
        });

        return totals;
    };

    const totals = calculateColumnTotals(hhpDashboardTable || []);

    // Create columns dynamically
    const engineerColumns = (handleShowTickets: (tickets: any[], label: string) => void, totals: Record<string, number>): ColumnDef<any>[] => [

        {
            header: "Engineer",
            accessorKey: "engineer",

            footer: () => <strong>Total</strong> // Display "Total" as footer label for the first column
        },
        {
            header: "New",
            accessorKey: "new_tickets_count",
            cell: ({ row }) => {
                const tickets = row.original.new_tickets;
                return (
                    <button
                        className="text-blue-600 underline"
                        onClick={() => handleShowTickets(tickets, "New")}
                    >
                        {row.original.new_tickets_count}
                    </button>
                );
            },
            footer: () => totals?.new_tickets_count ?? 0,
        },
        {
            header: "Assigned to Tech",
            accessorKey: "assigned_tickets_count",
            cell: ({ row }) => {
                const tickets = row.original.assigned_tickets;
                return (
                    <button
                        className="text-blue-600 underline"
                        onClick={() => handleShowTickets(tickets, "Assigned to Tech")}
                    >
                        {row.original.assigned_tickets_count}
                    </button>
                );
            },
            footer: () => totals?.assigned_tickets_count ?? 0,
        },
        {
            header: "Customer Reply",
            accessorKey: "customer_reply_tickets_count",
            cell: ({ row }) => {
                const tickets = row.original.customer_reply_tickets;
                return (
                    <button
                        className="text-blue-600 underline"
                        onClick={() => handleShowTickets(tickets, "Customer Reply")}
                    >
                        {row.original.customer_reply_tickets_count}
                    </button>
                );
            },
            footer: () => totals?.customer_reply_tickets_count ?? 0,
        },
        {
            header: "Parts request 1st approval",
            accessorKey: "parts_request_tickets_count",
            cell: ({ row }) => {
                const tickets = row.original.parts_request_tickets;
                return (
                    <button
                        className="text-blue-600 underline"
                        onClick={() => handleShowTickets(tickets, "Parts request 1st approval")}
                    >
                        {row.original.parts_request_tickets_count}
                    </button>
                );
            },
            footer: () => totals?.parts_request_tickets_count ?? 0,
        },
        {
            header: "In Progress",
            accessorKey: "in_progress_tickets_count",
            cell: ({ row }) => {
                const tickets = row.original.in_progress_tickets;
                return (
                    <button
                        className="text-blue-600 underline"
                        onClick={() => handleShowTickets(tickets, "In Progress")}
                    >
                        {row.original.in_progress_tickets_count}
                    </button>
                );
            },
            footer: () => totals?.in_progress_tickets_count ?? 0,
        },

        {
            header: "Completed",
            accessorKey: "qc_passed_count",
            cell: ({ row }) => {
                const tickets = row.original.qc_passed_tickets;
                return (
                    <button
                        className="text-blue-600 underline"
                        onClick={() => handleShowTickets(tickets, "Completed")}
                    >
                        {row.original.qc_passed_count}
                    </button>
                );
            },
            footer: () => totals?.qc_passed_count ?? 0,
        },
        {
            header: "For Invoicing",
            accessorKey: "for_invoicing_count",
            cell: ({ row }) => {
                const tickets = row.original.for_invoicing_tickets;
                return (
                    <button
                        className="text-blue-600 underline"
                        onClick={() => handleShowTickets(tickets, "For Invoicing")}
                    >
                        {row.original.for_invoicing_count}
                    </button>
                );
            },
            footer: () => totals?.for_invoicing_count ?? 0,
        },
        {
            header: "Resolved",
            accessorKey: "resolved_count",
            cell: ({ row }) => {
                const tickets = row.original.resolved_tickets;
                return (
                    <button
                        className="text-blue-600 underline"
                        onClick={() => handleShowTickets(tickets, "Resolved")}
                    >
                        {row.original.resolved_count}
                    </button>
                );
            },
            footer: () => totals?.resolved_count ?? 0,
        },
        {
            header: "QC Failed",
            accessorKey: "qc_failed_count",
            cell: ({ row }) => {
                const tickets = row.original.qc_failed_tickets;
                return (
                    <button
                        className="text-blue-600 underline"
                        onClick={() => handleShowTickets(tickets, "QC Failed")}
                    >
                        {row.original.qc_failed_count}
                    </button>
                );
            },
            footer: () => totals?.qc_failed_count ?? 0,
        },
    ];

    const downloadReport = async () => {
        const downloaded_by = user?.email;
        const downloaded_at = datetimestamp;
        await fetchReports(
            fromDate || undefined,
            toDate || undefined,
            downloaded_by,
            downloaded_at
        );
    }


    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");


    // Table column visibility 
    const [columnVisibility, setColumnVisibility] = useState({})

    // Table column order
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const resetFilters = () => {
        setFromDate(""); // Clear unassigned filter
        setToDate(""); // Clear engineer filter
    };
    // Initialize table instance
    const table = useReactTable({
        data: hhpDashboardTable,
        columns: engineerColumns(handleShowTickets, totals),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            pagination,
            columnVisibility,
            columnOrder,
            columnFilters
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
    });

    return (
        <div>
            <h1 className="text-xl font-medium text-gray-800 mb-4">Total booked in  <strong>{filteredTaskCount}</strong></h1>
            <div className="flex justify-between items-center gap-3 mb-3">
                <div className="flex-grow min-w-[200px]">
                    <ManagementSearchForm
                        filtering={filtering}
                        setFiltering={(e) => setFiltering(e.target.value)}
                    />
                </div>
                {/* Date Filters */}
                <div className="flex items-center">
                    <Input
                        type="date"
                        value={fromDate || ""}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="mr-2 w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none"
                    />
                    <Input
                        type="date"
                        value={toDate || ""}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none"
                    />
                </div>
                {isLoggedIn && user?.user_role === "admin" || user?.user_role === "manager" ?

                        <Button type="button" onClick={downloadReport} disabled={reportsLoading}>
                            {reportsLoading ? 'Downloading...' : 'Get report'}
                        </Button>

                    : null}
                <Button type="button" onClick={() => setSortTableColumns(true)} className="hidden md:block className='text-sm text-gray-100 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] shadow-none border-none'">Sort columns</Button>
                <Button type="button" onClick={resetFilters} className="className='text-sm text-gray-100 bg-[#075985] hover:bg-[#082f49] active:bg-[#082f49] shadow-none border-none"> Reset filters</Button>

            </div>
            {
                openSortTableColumnsModal &&
                <Dialog open={openSortTableColumnsModal} onOpenChange={() => setSortTableColumns(false)} >
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Sort columns</DialogTitle>
                            <DialogDescription>
                                Toggle columns you want/do not want
                            </DialogDescription>
                        </DialogHeader>

                        <div className="inline-block border border-black shadow rounded">
                            <div className="px-1 border-b border-black">
                                <label>
                                    <input
                                        className='bg-sky-600 cursor-pointer checked:bg-slate-950 focus:bg-slate-950'
                                        {...{
                                            type: 'checkbox',
                                            checked: table.getIsAllColumnsVisible(),
                                            onChange: table.getToggleAllColumnsVisibilityHandler(),
                                        }}
                                    />{' '}
                                    Show them all
                                </label>
                            </div>
                            {table.getAllLeafColumns().map(column => {
                                return (
                                    <div key={column.id} className="px-1">
                                        <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                            <input
                                                className='bg-sky-600 cursor-pointer checked:bg-slate-950 focus:bg-slate-950'
                                                {...{
                                                    type: 'checkbox',
                                                    checked: column.getIsVisible(),
                                                    onChange: column.getToggleVisibilityHandler(),
                                                }}
                                            />{' '}
                                            {column?.columnDef?.header as any}

                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </DialogContent>
                </Dialog>
            }
            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                <table className="w-full whitespace-wrap text-sm text-start text-gray-500 table-auto">
                    <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white text-xs uppercase font-medium">
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
                                                        asc: " 👇",
                                                        desc: " 👆",
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
                        {
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b cursor-pointer hover:bg-gray-100"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-3 font-medium text-sm">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        {table.getFooterGroups().map((footerGroup) => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map((footer) => (
                                    <td key={footer.id} className="px-4 py-3 font-medium text-sm">
                                        {flexRender(footer.column.columnDef.footer, footer.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
            </div>

            {/* Ticket List Modal */}
            <Dialog open={!!modalOpen} onOpenChange={() => setModalOpen(false)}>
                <DialogContent>
                    <DialogTitle>
                        {modalLabel} Tickets
                    </DialogTitle>
                    <div className="overflow-auto h-[400px]">
                        <ul className="mt-2">
                            {modalTickets && modalTickets?.length > 0 ? (
                                modalTickets.map((ticket, index: number) => (
                                    <li key={ticket.ticket_number} className="border p-2 rounded mb-2">
                                        ({index + 1})  <strong>{ticket.ticket_number}</strong> - Booked on: {moment(ticket.date_booked).format("YYYY-MM-DD")} <Button variant='outline' className="text-xs ml-2" onClick={() => openFullScreenPopup(`/departments/hhp/technicians/${encodeURIComponent(ticket.ticket_id)}`)}>View</Button>
                                        {ticket?.fail_reason && <><br /> <span className="text-xs text-gray-500">{ticket?.fail_reason}</span></>}
                                    </li>

                                ))
                            ) : (
                                <p>No tickets found.</p>
                            )}
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default HHPDashboardTable;
