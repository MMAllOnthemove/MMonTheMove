"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useUserLoggedIn from '@/hooks/useGetUser'
import {
    ColumnFiltersState,
    ColumnOrderState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table"
import dynamic from 'next/dynamic'
import React, { useMemo, useState } from 'react'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page'), { ssr: false }
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page'), { ssr: false }
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page'), { ssr: false }
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)
const ReportTableHead = dynamic(() =>
    import('./report_tablehead'), { ssr: false }
)
const ReportTableBody = dynamic(() =>
    import('./report_tablebody'), { ssr: false }
)
const TableBody = dynamic(() =>
    import('./tablebody'), { ssr: false }
)
const TableHead = dynamic(() =>
    import('./tablehead'), { ssr: false }
)


import useBookingAgentsTasks from "@/hooks/useBookingAgentsTasks"
import useSocket from "@/hooks/useSocket"
import columns from "@/lib/booking_agents_dashboard_table_columns"
import openFullScreenPopup from "@/lib/openFullScreenPopup"
import { TBookingAgentsTasksViewIndieList } from '@/lib/types'
import moment from 'moment'
import { datetimestamp } from "@/lib/date_formats"
import useFetchHHPReports from "@/hooks/useFetchBookingAgentsDashboardReport"


const BookingAgentsReportScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { socket, isConnected } = useSocket()
    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");
    const { fetchBookingAgentTasks,
        addAgentTask,
        addAgentTaskLoading,
        bookingAgentTasksList,
        bookingAgentTasksListLoading,
        errors, } = useBookingAgentsTasks(dateFrom, dateTo)

    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");


    // Table column visibility 
    const [columnVisibility, setColumnVisibility] = useState({})

    // Table column order
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [openModal, setOpenModal] = useState<boolean | null | TBookingAgentsTasksViewIndieList | any>();
    const handleRowClick = (row: TBookingAgentsTasksViewIndieList) => {
        setOpenModal(row.original);
    };
    const { reportsLoading, fetchReports, error } = useFetchHHPReports()
    const downloadReport = async () => {
        const downloaded_by = user?.email;
        const downloaded_at = datetimestamp;
        await fetchReports(
            dateFrom || undefined,
            dateTo || undefined,
            downloaded_by,
            downloaded_at
        );
    }

    const closeModal = () => {
        setOpenModal(false);
    };
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data: bookingAgentTasksList,
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


    // Calculate total jobs count
    const totalJobsCount = useMemo(() => {
        return bookingAgentTasksList.reduce((total: undefined | any, group: undefined | any) => total + Number(group.total_tasks), 0);
    }, [bookingAgentTasksList]);


    return (
        <>




            {/* <PageTitle title="tasks" hasSpan={true} spanText={"Booking agent"} /> */}
            <p className="text-xs text-gray-500">{bookingAgentTasksListLoading ? 'Loading stats' : null}</p>
            <section className="flex flex-col justify-center gap-3 py-4">
                <div className="flex gap-3 items-center justify-between flex-col lg:flex-row">
                    <div className="flex gap-3 items-center">
                        <span>
                            <Label
                                htmlFor="dateFrom"
                                className="sr-only"
                            >
                                Date from
                            </Label>
                            <Input
                                type="date"
                                name="dateFrom"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="cursor-pointer w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none"
                                id="dateFrom"
                            />
                        </span>
                        <span>-</span>
                        <span>
                            <Label
                                htmlFor="dateTo"
                                className="sr-only"
                            >
                                Date to
                            </Label>
                            <Input
                                type="date"
                                name="dateTo"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="cursor-pointer w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none"
                                id="dateTo"
                            />
                        </span>
                    </div>
                    {isLoggedIn && user?.user_role === "admin" || user?.user_role === "manager" ?

                        <Button type="button" onClick={downloadReport} disabled={reportsLoading}>
                            {reportsLoading ? 'Downloading...' : 'Get report'}
                        </Button>

                        : null}
                </div>
            </section>

            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                <table className="w-full whitespace-wrap text-sm text-center text-gray-500 table-auto">
                    <ReportTableHead table={table} />
                    <ReportTableBody table={table} handleRowClick={handleRowClick} totalJobs={totalJobsCount} />
                </table>
            </div>
            {
                openModal && <Dialog open={openModal} onOpenChange={closeModal} >
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{openModal?.booking_agent}&apos;s tasks list</DialogTitle>
                        </DialogHeader>

                        <div className="overflow-auto h-[400px]">
                            {openModal?.tickets?.map((x: any, i: any) =>
                                <div className="font-semibold mt-2" key={i}>
                                    <p className="border p-2 rounded mb-2 text-gray-800 text-sm"> ({i + 1}) {x?.ticket_number}  {moment(x.date_booked).format("YYYY-MM-DD")} ({x?.warranty}) <Button variant='outline' className="text-xs ml-2" onClick={() => openFullScreenPopup(`/departments/hhp/technicians/${encodeURIComponent(x?.ticket_id)}`)}>View</Button></p>
                                </div>
                            )}
                        </div>

                    </DialogContent>
                </Dialog>
            }



        </>
    )
}

export default BookingAgentsReportScreen
