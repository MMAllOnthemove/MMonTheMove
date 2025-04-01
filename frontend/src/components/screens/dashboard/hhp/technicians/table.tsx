"use client";
import React, { useState, useMemo } from "react";
import { useReactTable, ColumnDef, getCoreRowModel, flexRender, ColumnFiltersState, ColumnOrderState, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, SortingState } from "@tanstack/react-table";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { useHHPTasksCrud } from "@/hooks/useHHPTasksCrud";
import useFetchEngineer from "@/hooks/useFetchEngineers";
import moment from "moment";
import repairshopr_statuses_techs from "@/lib/tech_rs_statuses";
import { TDashboardRowData } from "@/lib/types";
import groupedDataFunction from "@/lib/group_tickets_hhp_dahboard_table";
import ManagementSearchForm from "@/components/search_field/page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromDate, hhpTechs, toDate]);


    // Create columns dynamically
    const columns: ColumnDef<TDashboardRowData>[] = [
        { header: "Engineer", accessorKey: "engineer" },
        ...repairshopr_statuses.map(({ _status }) => ({
            header: _status,
            accessorKey: _status,
            cell: ({ row }: any) => {
                const tickets = row.original[_status] as any[] | undefined;
                const count = tickets?.length || 0;

                return (
                    <button
                        onClick={() => {
                            setSelectedStatus(_status);
                            setSelectedEngineer(row.original.engineer as string);
                            setSelectedTickets(tickets || []);
                        }}
                        className={`w-full h-full px-2 py-1 rounded ${count > 0 ? "bg-blue-100 hover:bg-blue-200 cursor-pointer" : "text-gray-400"}`}
                    >
                        {count}
                    </button>
                );
            },
        })),
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


    // Initialize table instance
    const table = useReactTable({
        data: groupedData,
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
            <h1 className="text-xl font-bold mb-4">Repair Jobs by Engineer & Status</h1>
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
                    <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] uppercase font-semibold">
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
                    {
                        hhpTasksLoading ? <p className="px-3 text-center">Loading...</p> :

                            <tbody className="z-0">
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-[#22303c] dark:bg-[#2f3f4e]">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-4 py-3 font-medium text-sm">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                    }
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
