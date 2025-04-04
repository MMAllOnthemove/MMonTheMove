"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import useFetchEngineer from '@/hooks/useFetchEngineers'
import useGetEngineerBins from '@/hooks/useGetEngineerBins'
import useUserLoggedIn from '@/hooks/useGetUser'
import { useHHPTasksCrud } from '@/hooks/useHHPTasksCrud'
import useSocket from '@/hooks/useSocket'
import openFullScreenPopup from '@/lib/openFullScreenPopup'
import { TUser } from "@/lib/types"
import moment from 'moment'
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('@/components/sidebar/page'))
const LoadingScreen = dynamic(() => import('@/components/loading_screen/page'))
const PageTitle = dynamic(() => import('@/components/PageTitle/page'))
const NotLoggedInScreen = dynamic(() => import('@/components/not_logged_in/page'))


function AdminsBin({ user, isLoggedIn, loading }: { user: TUser | null, isLoggedIn: boolean | null, loading: boolean | null }) {

    const { engineerBinList, engineerBinListLoading, refetch } = useGetEngineerBins();
    const { engineersList } = useFetchEngineer()

    const { socket, isConnected } = useSocket()
    // Allowed unit statuses
    const allowedStatuses = new Set([
        "Assigned to Tech",
        "New",
        "In Progress",
        "Parts Request 1st Approval"
    ]);

    const hhpTechs = engineersList?.filter((x) => x.department === 'HHP')
    // Convert engineer list to a lookup object
    const engineerLookup = new Set(hhpTechs.map(e => `${e.engineer_firstname} ${e.engineer_lastname}`));


    const { hhpTasks, hhpTasksLoading } = useHHPTasksCrud()

    // Function to calculate engineer bins
    const calculateEngineerBins = (repairJobs: any) => {
        const bins: any = {};

        repairJobs.forEach((job: any) => {
            const { engineer, unit_status, date_booked, ticket_number, id, warranty } = job;


            // If admin, only include engineers from the engineers list
            const isUnassigned =
                !engineer || engineer === 'null' || engineer.trim() === '';

            const engineerName = isUnassigned ? "Unassigned" : engineer;

            // If not unassigned, apply filtering
            if (user?.user_role === "admin" || user?.user_role === "manager") {
                if (!isUnassigned && !engineerLookup.has(engineerName)) return;
            } else {
             
                if (isUnassigned || engineerName !== user?.full_name) return;
            }


            // Only process jobs where the status is in allowedStatuses
            if (!allowedStatuses.has(unit_status)) return;

            // Calculate difference in days from the booking date
            const dateBooked: any = new Date(date_booked);
            const currentDate: any = new Date();
            const differenceInDays = Math.floor((currentDate - dateBooked) / (1000 * 3600 * 24));

            // Initialize engineer bin if not exists
            if (!bins[engineerName]) {
                bins[engineerName] = {};
            }

            // Initialize unit status bin if not exists
            if (!bins[engineerName][unit_status]) {
                bins[engineerName][unit_status] = { units_count: 0, tickets: [] };
            }

            // Increment unit count
            bins[engineerName][unit_status].units_count += 1;

            // Add ticket details
            bins[engineerName][unit_status].tickets.push({
                id: id,
                ticket_number: ticket_number,
                difference: `${differenceInDays} days`,
                date_booked: date_booked,
                warranty: warranty
            });
        });

        return bins;
    };

    // Calculate bins
    const engineerBins = calculateEngineerBins(hhpTasks);


    // const
    return (
        <>

            {
                hhpTasksLoading ? <p>Loading stats</p> :

                    <>


                        <p className="text-sm text-sky-500 text-center font-medium">Based on New, Assigned, In Progress, Parts request tickets</p>
                        <Accordion type='single' collapsible className="w-full">
                            {Object.entries(engineerBins).map(([engineer, statuses]: any) => {
                                const totalUnits = Object.values(statuses).reduce((sum: number, stat: any) => sum + stat?.units_count, 0);
                                return (
                                    <AccordionItem key={engineer} value={engineer}>
                                        <AccordionTrigger>
                                            {engineer} ({totalUnits})
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className='space-y-4'>
                                                {Object.entries(statuses).map(([status, data]: any) => (
                                                    <div key={status} className='p-4 border rounded-lg shadow-sm bg-gray-50'>
                                                        <p className='font-medium'>Status: {status}</p>
                                                        <p>Total Units: {data?.units_count}</p>
                                                        <p>Ticket Numbers:</p>
                                                        <ol className=' pl-4'>
                                                            {data?.tickets.map((ticket: any, i: any) => (
                                                                <li key={ticket.id} className="mb-2">
                                                                    <span className='font-medium'>{ticket?.ticket_number}</span>
                                                                    <span className='font-medium mx-1'>({ticket?.warranty})</span>
                                                                    ({moment(ticket.date_booked).format('YYYY-MM-DD')})
                                                                    {ticket.difference.includes('hours') || ticket.difference.includes('minutes')
                                                                        ? ' Few hours ago'
                                                                        : ` ${ticket.difference} ago`}
                                                                    <Button variant='outline' className="text-xs ml-2" onClick={() => openFullScreenPopup(`/departments/hhp/technicians/${encodeURIComponent(ticket.id)}`)}>View</Button>
                                                                </li>
                                                            ))}
                                                        </ol>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </>

            }






        </>
    )
}

export default AdminsBin
