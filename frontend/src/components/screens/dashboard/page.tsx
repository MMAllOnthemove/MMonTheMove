"use client"
import dynamic from 'next/dynamic'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page'), { ssr: false }
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page'), { ssr: false }
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page'), { ssr: false }
)
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)
const Pagination = dynamic(() =>
    import('@/components/table_pagination/page'), { ssr: false }
)
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import useUserLoggedIn from '@/hooks/useGetUser'
import useHHPTasks from '@/hooks/useHHPTasks'
import { calculateAverageRepairTime, countTechniciansByStatus, countUnitsByStatus, getAveragePartsPendingTime, getCompletionRate, getFrequentFaults, getRepairByEngineer, getUnitsBookedOverTime, getWarrantyStatusBreakdown, partsIssuedRate } from '@/lib/analytics_functions'
import engineerWorkColumns from '@/lib/engineer_workload_table_columns'
import columns from '@/lib/frequent_faults__table_columns'
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import {
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"
import moment from 'moment'
import { useMemo, useState } from 'react'
import useSocket from '@/hooks/useSocket'
import Modal from '@/components/modal/page'
import useFetchEngineer from '@/hooks/useFetchEngineers'
import { Button } from '@/components/ui/button'
import isDateInRange from '@/lib/date_range'
import repairshopr_statuses from '@/lib/repairshopr_status'

const DashboardScreen = () => {
    const { hhpTasks } = useHHPTasks()
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { isConnected } = useSocket()
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [selectedEngineerTasks, setSelectedEngineerTasks] = useState<boolean | null | any>(false);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [engineer, setEngineer] = useState<string | undefined>("")
    const [unit_status, setUnitStatus] = useState<string | undefined>("")
    const averageRepairTime = useMemo(() => calculateAverageRepairTime(hhpTasks, dateFrom, dateTo), [hhpTasks, dateFrom, dateTo])
    const [selectedTechnician, setSelectedTechnician] = useState<string | null>(null);
    // show tasks by engineer which are complete
    const handleEngineerTasksTable = (row: any) => {
        const list = row?.original;
        setSelectedEngineerTasks(list);
    }
    const { engineersList } = useFetchEngineer()
    // for filtering by engineer
    const engineerListFomatted = engineersList?.map((user) => ({
        id: user?.id,
        repairshopr_id: user?.repairshopr_id,
        value: user?.engineer_firstname + " " + user?.engineer_lastname,
        label: user?.engineer_firstname + " " + user?.engineer_lastname,
    }))
    // trial and error
    const techniciansData = useMemo(() => countTechniciansByStatus(hhpTasks, { unit_status, startDate: dateFrom, endDate: dateTo, technician: selectedTechnician }), [hhpTasks, unit_status, dateFrom, dateTo, selectedTechnician]);


    const handleCardClick = (status: string) => {
        setSelectedStatus(status);

        // Apply the same filtering logic as countUnitsByStatus
        const filtered = hhpTasks?.filter((item: any) => {
            // Match status
            if (item.unit_status !== status) return false;

            // Check if item falls within the selected date range
            const isWithinDateRange = !dateFrom || !dateTo || isDateInRange(item.date_booked, dateFrom, dateTo);

            // Check if the engineer matches (if selected)
            const matchesEngineer = engineer ? item.engineer === engineer : true;

            return isWithinDateRange && matchesEngineer;
        });
        setFilteredTickets(filtered);
        setIsStatusModalOpen(true)
    };

    // Function to filter tasks based on the selected date range and technician
    const isDateInRange = (date: string, start: string | null, end: string | null) => {
        if (!start || !end) return true;
        const jobDate = new Date(date).getTime();
        return jobDate >= new Date(start).getTime() && jobDate <= new Date(end).getTime();
    };

    // Compute total job count per status
    const jobCountsByStatus = useMemo(() => {
        return hhpTasks.reduce((acc, task) => {
            acc[task.unit_status] = (acc[task.unit_status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [hhpTasks]);

    // Compute filtered counts based on filters
    const filteredJobCounts = useMemo(() => {
        return hhpTasks.reduce((acc, task) => {
            if (!isDateInRange(task.date_booked, dateFrom, dateTo)) return acc;
            if (selectedTechnician && task.engineer !== selectedTechnician) return acc;

            acc[task.unit_status] = (acc[task.unit_status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [hhpTasks, dateFrom, dateTo, selectedTechnician]);

    // Extract list of jobs under the selected status
    const selectedStatusJobs = useMemo(() => {
        return hhpTasks.filter(
            (task) =>
                task.unit_status === selectedStatus &&
                isDateInRange(task.date_booked, dateFrom, dateTo) &&
                (!selectedTechnician || task.engineer === selectedTechnician)
        );
    }, [hhpTasks, selectedStatus, dateFrom, dateTo, selectedTechnician]);

    // Extract unique engineers for filtering
    const engineers = useMemo(() => {
        const uniqueEngineers = new Set(hhpTasks.map((task) => task.engineer));
        return Array.from(uniqueEngineers);
    }, [hhpTasks]);


    return (
        <>
            {
                loading ? (<LoadingScreen />) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='container mx-auto p-1'>
                            <PageTitle title="Dashboard" hasSpan={true} spanText={"HHP"} />
                            <div>
                                {/* Filters */}
                                <div className="flex gap-4">
                                    <select onChange={(e) => setUnitStatus(e.target.value)} className="border p-2 rounded">
                                        <option value="Complete">Complete</option>
                                        <option value="Assigned to Tech">Assigned to Tech</option>
                                    </select>
                                    <input type="date" onChange={(e) => setDateFrom(e.target.value)} className="border p-2 rounded" />
                                    <input type="date" onChange={(e) => setDateTo(e.target.value)} className="border p-2 rounded" />
                                    <select onChange={(e) => setEngineer(e.target.value)} className="border p-2 rounded">
                                        <option value="">All Technicians</option>
                                        {engineers.map((tech) => (
                                            <option key={tech} value={tech}>
                                                {tech}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {Object.entries(jobCountsByStatus).map(([status, totalCount]) => {
                                        const filteredCount = filteredJobCounts[status] || 0;
                                        return (
                                            <Card key={status} className="cursor-pointer">
                                                <CardHeader>
                                                    <CardTitle>{status}</CardTitle>
                                                    <CardDescription>Total Jobs</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-4xl font-bold">{filteredCount > 0 ? filteredCount : totalCount}</div>
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
                                            <DialogTitle>Jobs under "{selectedStatus}"</DialogTitle>
                                        </DialogHeader>
                                        <div className="mt-2 max-h-80 overflow-auto">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="border-b">
                                                        <th className="p-2 text-left">Ticket Number</th>
                                                        <th className="p-2 text-left">Engineer</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedStatusJobs.length > 0 ? (
                                                        selectedStatusJobs.map((task) => (
                                                            <tr key={task.id} className="border-b">
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
                        </main>


                    </>
                ) : (<NotLoggedInScreen />)
            }
        </>

    )
}

export default DashboardScreen
