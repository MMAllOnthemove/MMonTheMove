"use client"
import LoadingScreen from '@/components/loading_screen/page';
import NotLoggedInScreen from '@/components/not_logged_in/page';
import PageTitle from '@/components/PageTitle/page';
import Sidebar from '@/components/sidebar/page';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAddAgentTask from '@/hooks/useAddBookingAgentTask';
import useFetchAgent from '@/hooks/useFetchBookingAgents';
import useUserLoggedIn from '@/hooks/useGetUser';
import useRepairshoprFetchTicket from '@/hooks/useRepairshoprFetchTicket';
import React, { useEffect, useState } from 'react';


import useFetchAgentTasks from '@/hooks/useFetchBookingAgentsTasks';
import { bookingAgentMapOverJobs } from '@/lib/booking_agents_map_over_tasks';
import { datetimestamp } from '@/lib/date_formats';
import { TAgentTasks, TBookingAgentsTasksViewIndieList } from '@/lib/types';
import moment from 'moment';
import TableHead from './tablehead';
import TableBody from './tablebody';
import ReportTableHead from './report_tablehead';
import ReportTableBody from './report_tablebody';

const BookingAgentsReportScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { addAgentTask, addAgentTaskLoading, errors } = useAddAgentTask()
    const { bookingAgentList } = useFetchAgent()
    const { bookingAgentTasksList } = useFetchAgentTasks()
    const [searchTicket, setSearchTicket] = useState("")
    const [ticket_number, setTicketNumber] = useState<string | undefined>("")
    const [booking_agent, setBookingAgent] = useState("")

    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");
    const { fetchRSTicketData } = useRepairshoprFetchTicket(searchTicket)


    const [openModal, setOpenModal] = useState<boolean | null | TBookingAgentsTasksViewIndieList | any>();
    const [groupedTasks, setGroupedTasks] = useState<TAgentTasks[]>([]);

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
        const payload = { ticket_number, created_by, booking_agent, created_at };
        await addAgentTask(payload);

    }
    useEffect(() => {
        if (fetchRSTicketData) {
            setTicketNumber(fetchRSTicketData?.tickets[0]?.number)
        }
    }, [searchTicket, fetchRSTicketData])


    // Group tasks by name and calculate jobs count based on date range
    useEffect(() => {
        const filteredTasks = bookingAgentTasksList?.filter((task) => {
            const taskDate = moment(task.created_at).format("YYYY-MM-DD");
            return taskDate >= dateFrom && taskDate <= dateTo;
        });

        // group tasks that have the same booking agent, so it does not show every entry, the add the entry to the jobs count
        const grouped = filteredTasks.reduce((acc: { [key: string]: any }, task) => {
            const existingUser = acc[task.booking_agent];
            if (existingUser) {
                existingUser.tasksCount++;
            } else {
                acc[task.booking_agent] = { createdBy: task.booking_agent, tasksCount: 0 };
            }
            return acc;
        }, {});

        setGroupedTasks(Object.values(grouped));
    }, [bookingAgentTasksList, dateFrom, dateTo]);

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
                                            <TableBody ticket_number={ticket_number} booking_agent={booking_agent} setBookingAgent={(e) => setBookingAgent(e)} bookingAgentList={bookingAgentList} addAgentTaskLoading={addAgentTaskLoading} addTask={addTask} errors={errors} />
                                        </table>
                                    </div> : null}
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <ReportTableHead />
                                    <ReportTableBody groupedTasks={groupedTasks} handleRowClick={handleRowClick} />
                                </table>
                            </div>
                            {
                                openModal && <Dialog open={openModal} onOpenChange={closeModal} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{openModal?.createdBy}&apos;s tasks list</DialogTitle>
                                        </DialogHeader>

                                        <div className="divide-y-1">
                                            {bookingAgentMapOverJobs(bookingAgentTasksList, dateFrom,
                                                dateTo, openModal?.createdBy)?.map((x) => <p className=" font-semibold" key={x.id}>
                                                    {x?.ticket_number}
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
