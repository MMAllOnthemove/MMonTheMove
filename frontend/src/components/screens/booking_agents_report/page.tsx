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
import {
    SortingState
} from "@tanstack/react-table";
import React, { useEffect, useState } from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useFetchAgentTasks from '@/hooks/useFetchBookingAgentsTasks';
import { bookingAgentMapOverJobs } from '@/lib/booking_agents_map_over_tasks';
import { bookingAgentFunc } from '@/lib/calculate_booking_agents_tasks';
import moment from 'moment';

const BookingAgentsReportScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { addAgentTask, addAgentTaskLoading, errors } = useAddAgentTask()
    const { bookingAgentList, bookingAgentListLoading } = useFetchAgent()
    const { bookingAgentTasksList, bookingAgentTasksListLoading } = useFetchAgentTasks()
    const [searchTicket, setSearchTicket] = useState("")
    const [ticket_number, setTicketNumber] = useState("")
    const [booking_agent, setBookingAgent] = useState("")
    const [dateFrom, setDateFrom] = useState<string | number | Date | any>("");
    const [dateTo, setDateTo] = useState<string | number | Date | any>("");
    const { fetchRSTicketData } = useRepairshoprFetchTicket(searchTicket)

    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");

    const [openModal, setOpenModal] = useState<boolean | null | any>();
    const [groupedTasks, setGroupedTasks] = useState([]);

    const handleRowClick = (row: any) => {
        setOpenModal(row);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    // const { hhpTask } = useFetchHHPTaskById(modifyTaskModal?.id)



    const addTask = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const created_by = user?.email;
        const payload = { ticket_number, created_by, booking_agent };
        const response = await addAgentTask(payload);
        console.log("response addAgentTask", response)

    }
    useEffect(() => {
        if (fetchRSTicketData) {
            // console.log(fetchRSTicketData)
            setTicketNumber(fetchRSTicketData?.tickets[0]?.number)
        }
    }, [searchTicket, fetchRSTicketData])


    // Group tasks by name and calculate jobs count based on date range
    useEffect(() => {
        const filteredTasks = bookingAgentTasksList.filter((task) => {
            const taskDate = moment(task.created_date).format("YYYY-MM-DD");
            return taskDate >= dateFrom && taskDate <= dateTo;
        });

        // group tasks that have the same booking agent, so it does not show every entry, the add the entry to the jobs count
        const grouped = filteredTasks.reduce((acc, task) => {
            const existingUser = acc[task.booking_agent];
            if (existingUser) {
                existingUser.tasksCount++;
            } else {
                acc[task.booking_agent] = { createdBy: task.booking_agent, tasksCount: 0 };
            }
            return acc;
        }, {});


        // console.log(grouped)
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
                                            type="number"
                                            id="searchTicket"
                                            name="searchTicket"
                                            onChange={(e) => setSearchTicket(e.target.value)}

                                        />
                                    </span>
                                </div>
                            </section>
                            {
                                ticket_number ?

                                    <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg mb-4">
                                        <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                            <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] uppercase font-semibold">
                                                <tr className=" font-semibold">
                                                    <th className="px-4 py-3 cursor-pointer font-semibold">
                                                        Ticket number
                                                    </th>
                                                    <th className="px-4 py-3 cursor-pointer font-semibold">
                                                        Agent
                                                    </th>
                                                    <th className="px-4 py-3 cursor-pointer font-semibold">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="z-0">
                                                <tr className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]">
                                                    <td className="px-4 py-3 font-medium text-sm max-w-full">
                                                        {ticket_number}
                                                    </td>
                                                    <td className="px-4 py-3 font-medium text-sm max-w-full">
                                                        <span>
                                                            <label
                                                                htmlFor="booking_agent"
                                                                className='sr-only'
                                                            >
                                                                Booking agent
                                                            </label>

                                                            <Select name="booking_agent" value={booking_agent} onValueChange={(e) => setBookingAgent(e)}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Booking agent" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {bookingAgentList.map((dep) => (
                                                                        <SelectItem key={dep.id} value={`${dep.agent_firstname} ${dep.agent_lastname}`}>{`${dep.agent_firstname} ${dep.agent_lastname}`}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>

                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 font-medium text-sm max-w-full">
                                                        <Button
                                                            type="button"
                                                            role="button"
                                                            onClick={addTask}

                                                            disabled={addAgentTaskLoading}> {addAgentTaskLoading ? 'Adding...' : 'Add task'}
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> : null}
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white  text-sm uppercase font-semibold">
                                        <tr className=" font-semibold">
                                            <th className="px-4 py-3 cursor-pointer  font-semibold">
                                                Booking Agent
                                            </th>
                                            <th className="px-4 py-3 cursor-pointer  font-semibold">
                                                Jobs booked
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="z-0">

                                        {groupedTasks.map((item: any) => (
                                            <tr onClick={() => handleRowClick(item)} key={item.createdBy} className="border-b cursor-pointer hover:bg-gray-100">
                                                <td className="px-4 py-3 font-medium text-sm">{item.createdBy}</td>
                                                <td className="px-4 py-3 font-medium text-sm">{item.tasksCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
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
