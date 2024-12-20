"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAddAgentTask from '@/hooks/useAddBookingAgentTask'
import useUserLoggedIn from '@/hooks/useGetUser'
import useRepairshoprFetchTicket from '@/hooks/useRepairshoprFetchTicket'
import dynamic from 'next/dynamic'
import React, { useEffect, useMemo, useState } from 'react'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page')
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page')
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page')
)
const ReportTableHead = dynamic(() =>
    import('./report_tablehead')
)
const ReportTableBody = dynamic(() =>
    import('./report_tablebody')
)
const TableBody = dynamic(() =>
    import('./tablebody')
)
const TableHead = dynamic(() =>
    import('./tablehead')
)


import useFetchAgentTasks from '@/hooks/useFetchBookingAgentsTasks'
import { datetimestamp } from '@/lib/date_formats'
import { TBookingAgentsTasksViewIndieList } from '@/lib/types'
import moment from 'moment'

interface GroupedData {
    booking_agent: string;
    count?: number;
    tickets: string[];
}
const BookingAgentsReportScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { addAgentTask, addAgentTaskLoading, errors } = useAddAgentTask()
    const { bookingAgentTasksList } = useFetchAgentTasks()
    const [searchTicket, setSearchTicket] = useState("")
    const [ticket_number, setTicketNumber] = useState<string | undefined>("")
    const [booking_agent, setBookingAgent] = useState<string | undefined>("")
    const [original_ticket_date, setDateBooked] = useState<string | undefined>("")
    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");
    // This simply means which department the task is from
    const [problemType, setProblemType] = useState<string | undefined>("")
    const { fetchRSTicketData } = useRepairshoprFetchTicket(searchTicket)


    const [openModal, setOpenModal] = useState<boolean | null | TBookingAgentsTasksViewIndieList | any>();
    const handleRowClick = (row: TBookingAgentsTasksViewIndieList) => {
        setOpenModal(row);
    };

    const closeModal = () => {
        setOpenModal(false);
    };


    const addTask = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const created_by = user?.email;
        const created_at = datetimestamp;
        const payload = { ticket_number, created_by, booking_agent, created_at, original_ticket_date, problemType };
        await addAgentTask(payload);

    }
    useEffect(() => {
        const k: any = fetchRSTicketData?.tickets[0]['user_id']
        if (fetchRSTicketData || k == user?.repairshopr_id) {
            setDateBooked(fetchRSTicketData?.tickets[0]?.created_at)
            setTicketNumber(fetchRSTicketData?.tickets[0]?.number)
            setProblemType(fetchRSTicketData?.tickets[0]?.problem_type)
            setBookingAgent(user?.full_name)
        }
    }, [searchTicket, fetchRSTicketData, user?.full_name, user?.repairshopr_id])


    // Group tasks by name and calculate jobs count based on date range
    const filteredData = useMemo(() => {
        if (!dateFrom || !dateTo) return []; // Show no data if dates are not selected
        const filteredTasks = bookingAgentTasksList?.filter((ticket) => {
            const taskDate = moment(ticket.original_ticket_date).format("YYYY-MM-DD");
            return (!dateFrom || taskDate >= dateFrom) && (!dateTo || taskDate <= dateTo);
        });

        // group tasks that have the same booking agent, so it does not show every entry, the add the entry to the jobs count
        const filtered = filteredTasks.reduce<GroupedData[]>((acc, ticket: any) => {
            const existingGroup = acc.find(
                (group: string | any) => group.booking_agent === ticket.booking_agent
            );
            if (existingGroup) {
                existingGroup.count = (existingGroup.count ?? 0) + 1;
                existingGroup?.tickets?.push(ticket.ticket_number);
            } else {
                acc.push({
                    booking_agent: ticket.booking_agent,
                    count: 1,
                    tickets: [ticket.ticket_number],
                });
            }

            return acc;
        }, []);
        // Sort grouped data by highest count
        filtered.sort((a: number | any, b: number | any) => b.count - a.count);
        return filtered

    }, [bookingAgentTasksList, dateFrom, dateTo]); // Dependencies for recalculation

    // Calculate total jobs count
    const totalJobsCount = useMemo(() => {
        return filteredData.reduce((total, group: any) => total + group?.count, 0);
    }, [filteredData]);


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

                            <section className="flex flex-col justify-center gap-3 py-4">
                                <div className="flex gap-3 items-center justify-between flex-col lg:flex-row">
                                    <div className="flex gap-3 items-center">
                                        <span>
                                            <Label
                                                htmlFor="dateFrom"
                                                className="sr-only dark:text-[#eee]"
                                            >
                                                Date from
                                            </Label>
                                            <Input
                                                type="date"
                                                name="dateFrom"
                                                value={dateFrom}
                                                onChange={(e) => setDateFrom(e.target.value)}
                                                className="cursor-pointer"
                                                id="dateFrom"
                                            />
                                        </span>
                                        <span>-</span>
                                        <span>
                                            <Label
                                                htmlFor="dateTo"
                                                className="sr-only dark:text-[#eee]"
                                            >
                                                Date to
                                            </Label>
                                            <Input
                                                type="date"
                                                name="dateTo"
                                                value={dateTo}
                                                onChange={(e) => setDateTo(e.target.value)}
                                                className="cursor-pointer"
                                                id="dateTo"
                                            />
                                        </span>
                                    </div>
                                    <span>
                                        <Label
                                            htmlFor='searchTicket'
                                            className='sr-only'
                                        >
                                            Search ticket
                                        </Label>
                                        <Input
                                            placeholder='Search ticket'
                                            type="string"
                                            id="searchTicket"
                                            name="searchTicket"
                                            onChange={(e) => setSearchTicket(e.target.value)}
                                        />
                                        {errors.ticket_number && <p className="text-sm text-red-500 font-medium">{errors.ticket_number}</p>}

                                    </span>
                                </div>
                            </section>
                            {
                                ticket_number ?
                                    <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg mb-4">
                                        <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                            <TableHead />
                                            <TableBody ticket_number={ticket_number} booking_agent={booking_agent} addAgentTaskLoading={addAgentTaskLoading} addTask={addTask} />
                                        </table>
                                    </div> : null}
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <ReportTableHead />
                                    <ReportTableBody groupedTasks={filteredData} handleRowClick={handleRowClick} totalJobs={totalJobsCount} />
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
                                            {openModal?.tickets?.map((x: any, i: any) => <p className="font-semibold" key={i}>
                                                {x}
                                            </p>)}
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
