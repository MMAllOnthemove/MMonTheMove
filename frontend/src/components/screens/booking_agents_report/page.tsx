"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useUserLoggedIn from '@/hooks/useGetUser'
import useRepairshoprFetchTicket from '@/hooks/useRepairshoprFetchTicket'
import dynamic from 'next/dynamic'
import React, { useEffect, useMemo, useState } from 'react'
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
import { datetimestamp } from '@/lib/date_formats'
import { TBookingAgentsTasksViewIndieList } from '@/lib/types'
import moment from 'moment'

type tickets = {
    ticket_number: string | number;
    date_booked: string | null;
    warranty: string | null;
}
interface GroupedData {
    booking_agent: string;
    count: number;
    tickets: tickets[];
}
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


    const [openModal, setOpenModal] = useState<boolean | null | TBookingAgentsTasksViewIndieList | any>();
    const handleRowClick = (row: TBookingAgentsTasksViewIndieList) => {
        setOpenModal(row);
    };

    const closeModal = () => {
        setOpenModal(false);
    };


    // Calculate total jobs count
    const totalJobsCount = useMemo(() => {
        return bookingAgentTasksList.reduce((total: undefined | any, group: undefined | any) => total + Number(group.total_tasks), 0);
    }, [bookingAgentTasksList]);


    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='container p-1'>

                            <PageTitle title="tasks" hasSpan={true} spanText={"Booking agent"} />
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

                                </div>
                            </section>

                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-wrap text-sm text-center text-gray-500 table-auto">
                                    <ReportTableHead />
                                    <ReportTableBody groupedTasks={bookingAgentTasksList} handleRowClick={handleRowClick} totalJobs={totalJobsCount} />
                                </table>
                            </div>
                            {
                                openModal && <Dialog open={openModal} onOpenChange={closeModal} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{openModal?.booking_agent}&apos;s tasks list</DialogTitle>
                                        </DialogHeader>

                                        <div className="divide-y-1 overflow-auto h-[200px]">
                                            {openModal?.tickets?.map((x: any, i: any) =>
                                                <div className="font-semibold" key={i}>
                                                    <p> ({i + 1}) {x?.ticket_number} {x?.date_booked} ({x?.warranty})</p>
                                                </div>
                                            )}
                                        </div>

                                    </DialogContent>
                                </Dialog>
                            }
                        </main>
                    </>
                ) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    )
}

export default BookingAgentsReportScreen
