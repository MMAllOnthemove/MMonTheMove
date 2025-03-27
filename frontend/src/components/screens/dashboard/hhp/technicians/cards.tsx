"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import dynamic from 'next/dynamic'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page'), { ssr: false }
)
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page'), { ssr: false }
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page'), { ssr: false }
)

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)
const Pagination = dynamic(() =>
    import('@/components/table_pagination/page'), { ssr: false }
)
// import { Label } from '@/components/ui/label'
import useFetchEngineer from '@/hooks/useFetchEngineers'
import useUserLoggedIn from '@/hooks/useGetUser'
import useHHPTasks from '@/hooks/useHHPTasks'
import useSocket from '@/hooks/useSocket'
import { calculateAverageRepairTime } from '@/lib/analytics_functions'
import { useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"


const HHPDashboardCards = () => {
    const { hhpTasks } = useHHPTasks()
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { isConnected } = useSocket()
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const [engineer, setEngineer] = useState<string | null | undefined | any>();

    // show tasks by engineer which are complete

    const { engineersList } = useFetchEngineer()
    // for filtering by engineer
    const engineerListFomatted = engineersList?.map((user) => ({
        id: user?.id,
        repairshopr_id: user?.repairshopr_id,
        value: user?.engineer_firstname + " " + user?.engineer_lastname,
        label: user?.engineer_firstname + " " + user?.engineer_lastname,
    }))



    // Function to filter tasks based on the selected date range and technician
    const isDateInRange = (date: string, start: string | null, end: string | null) => {
        if (!start || !end) return true;
        const jobDate = new Date(date).getTime();
        return jobDate >= new Date(start).getTime() && jobDate <= new Date(end).getTime();
    };

    // Compute total job count per status
    const jobCountsByStatus = useMemo(() => {
        return hhpTasks.reduce((acc: any, task: any) => {
            acc[task.unit_status] = (acc[task.unit_status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [hhpTasks]);

    // Compute filtered job counts
    const filteredJobCounts = useMemo(() => {
        const counts: Record<string, number> = {};

        hhpTasks.forEach((task: any) => {
            if (!isDateInRange(task.date_booked, dateFrom, dateTo)) return;
            if (engineer && task.engineer !== engineer) return;

            counts[task.unit_status] = (counts[task.unit_status] || 0) + 1;
        });

        // Ensure all statuses from the original job list are included, setting missing ones to zero
        Object.keys(jobCountsByStatus).forEach((status) => {
            if (!counts[status]) counts[status] = 0;
        });

        return counts;
    }, [hhpTasks, dateFrom, dateTo, engineer, jobCountsByStatus]);

    // Extract list of jobs under the selected status
    const selectedStatusJobs = useMemo(() => {
        return hhpTasks.filter(
            (task: any) =>
                task.unit_status === selectedStatus &&
                isDateInRange(task.date_booked, dateFrom, dateTo) &&
                (!engineer || task.engineer === engineer)
        );
    }, [hhpTasks, selectedStatus, dateFrom, dateTo, engineer]);



    return (
        <>



            <div>
                {/* Filters */}
                <div className="grid lg:grid-cols-3 gap-4 mb-2">
                    <Input type="date" onChange={(e) => setDateFrom(e.target.value)} className="cursor-pointer" />
                    <Input type="date" onChange={(e) => setDateTo(e.target.value)} className="cursor-pointer" />

                    <Select name="engineer" value={engineer} onValueChange={(e) => setEngineer(e || null)}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Technician" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Engineer</SelectLabel>
                                {engineerListFomatted.map((dep) => (
                                    <SelectItem key={dep.id} value={`${dep.value}`}>{`${dep.label}`}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid lg:grid-cols-3 gap-4">
                    {Object.entries(jobCountsByStatus).map(([status, totalCount]) => {
                        const filteredCount = filteredJobCounts[status] ?? 0; // Ensure zero is shown if no jobs match
                        return (
                            <Card key={status} className="cursor-pointer" onClick={() => setSelectedStatus(status)}>
                                <CardHeader>
                                    <CardTitle>{status}</CardTitle>
                                    <CardDescription>Total Jobs</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold">{filteredCount}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
            {/* Ticket List Modal */}
            {selectedStatus && (
                <Dialog open={!!selectedStatus} onOpenChange={() => setSelectedStatus(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Jobs under &quot;{selectedStatus}&quot;</DialogTitle>
                        </DialogHeader>
                        <div className="mt-2 max-h-80 overflow-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-2 text-left"></th>
                                        <th className="p-2 text-left">Ticket Number</th>
                                        <th className="p-2 text-left">Engineer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedStatusJobs.length > 0 ? (
                                        selectedStatusJobs.map((task: any, idx: any) => (
                                            <tr key={task.id} className="border-b">
                                                <td className="p-2">{idx + 1}</td>
                                                <td className="p-2">{task.ticket_number}</td>
                                                <td className="p-2">{task.engineer}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={2} className="p-2 text-center">No jobs found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </DialogContent>
                </Dialog>
            )}



        </>

    )

}

export default HHPDashboardCards