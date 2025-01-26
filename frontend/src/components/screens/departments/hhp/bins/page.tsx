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
import React from 'react'
import { getEngineerBinsData } from '@/lib/analytics_functions'
const Sidebar = dynamic(() => import('@/components/sidebar/page'))
const LoadingScreen = dynamic(() => import('@/components/loading_screen/page'))
const PageTitle = dynamic(() => import('@/components/PageTitle/page'))
const NotLoggedInScreen = dynamic(() => import('@/components/not_logged_in/page'))
const BinsScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { engineerBinList, engineerBinListLoading, refetch } = useGetEngineerBins();


    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn && user?.user_role === "admin" ? (
                    <>
                        <Sidebar />
                        <main className='container p-1'>
                            <PageTitle title="bins" hasSpan={true} spanText={"Engineer"} />
                            <Accordion type="single" collapsible>
                                {Object.entries(getEngineerBinsData(engineerBinList)).map(([engineer, tasks]) => (
                                    <AccordionItem key={engineer} value={engineer}>
                                        <AccordionTrigger>{engineer === null || engineer === 'null' ? 'Unassigned' : engineer}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-4">
                                                {tasks.map((task, index) => (
                                                    <div key={index} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                                                        <p className="font-medium">Status: {task.unit_status}</p>
                                                        <p>Total Units: {task.units_count}</p>
                                                        <p>Ticket Numbers:</p>
                                                        <ul className="list-disc list-inside pl-4">
                                                            {task.ticket_numbers.map((ticket, i) => (
                                                                <li key={i}>{ticket}</li>
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