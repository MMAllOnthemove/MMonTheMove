"use client";
import ManagementSearchForm from "@/components/search_field/page";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useFetchEngineer from "@/hooks/useFetchEngineers";
import useHHPDashboardTable from "@/hooks/useHHPDashboardTable";
import { useHHPTasksCrud } from "@/hooks/useHHPTasksCrud";
import repairshopr_statuses_techs from "@/lib/tech_rs_statuses";
import { TDashboardRowData } from "@/lib/types";
import { ColumnDef, ColumnFiltersState, ColumnOrderState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable } from "@tanstack/react-table";
import moment from "moment";
import React, { useMemo, useState } from "react";

const repairshopr_statuses = [
    ...repairshopr_statuses_techs,
    { id: 19, _status: "QC Passed" }, // Add QC Passed status
];





const HHPDashboardTable = () => {
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
    // Group tickets by engineer and unit_status
    // Group tickets by engineer and unit_status
    const groupedData: TDashboardRowData[] = useMemo(() => {
        const grouped: { [key: string]: TDashboardRowData } = {};

        hhpTasks
            .filter((ticket: any) => {
                // Filter by engineer (only include engineers in the engineersList)
                return hhpTechs.some((engineer) => `${engineer?.engineer_firstname} ${engineer?.engineer_lastname}` === ticket.engineer);
            })
            .filter((ticket: any) => {
                // Filter by date range
                const ticketDate = new Date(ticket.date_booked);
                const from = fromDate ? new Date(fromDate) : null;
                const to = toDate ? new Date(toDate) : null;

                if (from && ticketDate < from) return false;
                if (to && ticketDate > to) return false;

                return true;
            })
            .forEach((ticket: any) => {
                if (!grouped[ticket.engineer]) {
                    grouped[ticket.engineer] = { engineer: ticket.engineer };
                }
                // Group by unit_status (e.g., 'New', 'In Progress', etc.)
                if (!grouped[ticket.engineer][ticket.unit_status]) {
                    grouped[ticket.engineer][ticket.unit_status] = [];
                }
                (grouped[ticket.engineer][ticket.unit_status] as any[]).push(ticket);

                // Handle the qc_complete field as its own status if it's 'Pass'
                if (ticket.qc_complete === 'Pass') {
                    const qcStatus = 'QC Passed';
                    if (!grouped[ticket.engineer][qcStatus]) {
                        grouped[ticket.engineer][qcStatus] = [];
                    }
                    (grouped[ticket.engineer][qcStatus] as any[]).push(ticket);
                }
            });
        return Object.values(grouped);
    }, []);

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
    const columnTotals = useMemo(() => {
        const totals: Record<string, number> = {};

        groupedData.forEach((row) => {
            repairshopr_statuses.forEach(({ _status }) => {
                const count = (row[_status] as any[])?.length || 0;
                totals[_status] = (totals[_status] || 0) + count;
            });
        });
        return totals;
    }, [groupedData, repairshopr_statuses]);


    // Create columns dynamically
    const columns: ColumnDef<TDashboardRowData>[] = [
        {
            header: "Engineer",
            accessorKey: "engineer",
            // footer: () => <strong>Total</strong> // Display "Total" as footer label for the first column
        },
        {
            header: "New",
            accessorKey: "new_tickets_count",
            // footer: () => <strong>Total</strong> // Display "Total" as footer label for the first column
        },
        {
            header: "Assigned to Tech",
            accessorKey: "assigned_tickets_count",
            // footer: () => <strong>Total</strong> // Display "Total" as footer label for the first column
        },
        {
            header: "Customer Reply",
            accessorKey: "customer_reply_tickets_count",
            // footer: () => <strong>Total</strong> // Display "Total" as footer label for the first column
        },
        {
            header: "Parts request 1st approval",
            accessorKey: "parts_request_tickets_count",
            // footer: () => <strong>Total</strong> // Display "Total" as footer label for the first column
        },
        {
            header: "In Progress",
            accessorKey: "in_progress_tickets_count",
            // footer: () => <strong>Total</strong> // Display "Total" as footer label for the first column
        },

        {
            header: "Completed",
            accessorKey: "qc_passed_count",
            // footer: () => <strong>Total</strong> // Display "Total" as footer label for the first column
        },
        {
            header: "QC Failed",
            accessorKey: "qc_failed_count",
            // footer: () => <strong>Total</strong> // Display "Total" as footer label for the first column
        },

    ];



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
        columns,
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
            <h1 className="text-xl font-bold mb-4">Repair Jobs by Engineer & Status  <strong>{filteredTaskCount}</strong></h1>
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
                        className="mr-2 p-2 border border-gray-300 rounded"
                    />
                    <Input
                        type="date"
                        value={toDate || ""}
                        onChange={(e) => setToDate(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <Button type="button" onClick={() => setSortTableColumns(true)} className="hidden md:block">Sort columns</Button>
                <Button type="button" onClick={resetFilters}> Reset filters</Button>

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
                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                    <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] uppercase font-medium">
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
                        {hhpTasksLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-3">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-[#22303c] dark:bg-[#2f3f4e]"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-3 font-medium text-sm">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
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
            <Dialog open={!!selectedStatus} onOpenChange={() => setSelectedStatus(null)}>
                <DialogContent>
                    <DialogTitle>
                        {selectedEngineer} - {selectedStatus} Tickets
                    </DialogTitle>
                    <div className="overflow-auto h-[400px]">
                        <ul className="mt-2">
                            {selectedTickets.length > 0 ? (
                                selectedTickets.map((ticket, index: number) => (
                                    <li key={ticket.ticket_number} className="border p-2 rounded mb-2">
                                        {index + 1}  <strong>{ticket.ticket_number}</strong> - Booked on: {moment(ticket.date_booked).format("YYYY-MM-DD")}
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
