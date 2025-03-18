"use client"
import useGetEngineerBins from '@/hooks/useGetEngineerBins'
import useUserLoggedIn from '@/hooks/useGetUser'
import dynamic from 'next/dynamic'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import React, { useMemo } from 'react'
import { getEngineerBinsData } from '@/lib/analytics_functions'
import Link from 'next/link'
import useSocket from '@/hooks/useSocket'
import moment from 'moment'
const Sidebar = dynamic(() => import('@/components/sidebar/page'))
const LoadingScreen = dynamic(() => import('@/components/loading_screen/page'))
const PageTitle = dynamic(() => import('@/components/PageTitle/page'))
const NotLoggedInScreen = dynamic(() => import('@/components/not_logged_in/page'))
const BinsScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { engineerBinList, engineerBinListLoading, refetch } = useGetEngineerBins();


    const { socket, isConnected } = useSocket()

    const calculateByStatus = useMemo(() => {
        return (engineer: string | null) => {
            if (!engineerBinList) return 0;

            const filteredData = engineerBinList.filter((x) => {
                const isEngineerMatch =
                    (engineer === null && (x.engineer === null || x.engineer === 'null')) || // Unassigned case
                    x.engineer === engineer; // Normal engineer match

                return isEngineerMatch;
            });

            const totalCount = filteredData.reduce((acc, item) => {
                if (
                    ['Assigned to Tech', 'New', 'In Progress', 'Parts Request 1st Approval'].includes(item.unit_status)
                ) {
                    return acc + Number(item.units_count);
                }
                return acc;
            }, 0);

            return totalCount;
        };
    }, [engineerBinList]);



    // const calculatePartsToBeOrdered = [...engineerBinList]?.filter((x) => x?.unit_status === 'Parts to be ordered')

    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn && user?.user_role === "admin" ? (
                    <>
                        {/* <Sidebar /> */}
                        <main className='container p-1'>
                            <PageTitle title="bins" hasSpan={true} spanText={"Engineer"} />
                            <p className="text-sm text-sky-500 text-center font-medium">Based on New, Assigned, In Progress, Parts request tickets</p>
                            <Accordion type="single" collapsible>
                                {Object.entries(getEngineerBinsData(engineerBinList)).map(([engineer, tasks]) => (
                                    <AccordionItem key={engineer} value={engineer}>
                                        <AccordionTrigger>{engineer === null || engineer === 'null' ? 'Unassigned' : engineer}  ({calculateByStatus(engineer)})</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-4">
                                                {tasks?.map((task, index) => (
                                                    <div key={index} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                                                        <p className="font-medium">Status: {task.unit_status}</p>
                                                        <p>Total Units: {task.units_count}</p>
                                                        <p>Ticket Numbers:</p>
                                                        <ul className="list-disc list-inside pl-4">

                                                            {task.tickets?.map((ticket, i) => (
                                                                <li key={i}>
                                                                    <span className="font-medium">{ticket.ticket_number}</span>({moment(ticket?.date_booked).format("YYYY-MM-DD")})  {ticket.difference?.includes('hours') || ticket.difference?.includes('minutes')
                                                                        ? 'Few hours ago'
                                                                        : `${ticket.difference} ago`}
                                                                </li>
                                                            ))}

                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </main>

                    </>
                ) : (
                    <NotLoggedInScreen />
                )
            }

        </>
    )
}

export default BinsScreen