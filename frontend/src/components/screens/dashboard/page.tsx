"use client"
import useHHPTasks from '@/hooks/useHHPTasks'
import React, { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import useUserLoggedIn from '@/hooks/useGetUser'
import NotLoggedInScreen from '@/components/not_logged_in/page'
import LoadingScreen from '@/components/loading_screen/page'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { calculateAverageRepairTime, calculateAverageRepairTimeByWarranty, calculateAverageTimeToRepairByFault, getAveragePartsPendingTime, getCompletionRate, getFrequentFaults, getRepairsByStore, partsIssuedRate } from '@/lib/analytics_functions'
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import columns from '@/lib/frequent_faults__table_columns'
import TableBody from '@/components/table_body/page'
import Pagination from '@/components/table_pagination/page'
import Sidebar from '@/components/sidebar/page'
import PageTitle from '@/components/PageTitle/page'

const chartConfig = {
    count: {
        label: "Units booked",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const DashboardScreen = () => {
    const { hhpTasks } = useHHPTasks()
    const { isLoggedIn, loading } = useUserLoggedIn()
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")



    const storeRepairsCount = useMemo(() => Object.entries(
        getRepairsByStore(hhpTasks, dateFrom, dateTo)
    ).map(([store, count]) => ({
        store,
        count,
    })), [hhpTasks, dateFrom, dateTo])

    const averageRepairTime = useMemo(() => calculateAverageRepairTime(hhpTasks), [hhpTasks])

    const averageCompletionRate = useMemo(() => getCompletionRate(hhpTasks), [hhpTasks])
    const averagePartsPendingTime = useMemo(() => getAveragePartsPendingTime(hhpTasks), [hhpTasks])
    const averagePartsIssuedTime = useMemo(() => partsIssuedRate(hhpTasks), [hhpTasks])

    // Table sorting
    const [frequentFaultsTableSorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [frequentFaultsTableFilter, setFiltering] = useState("");


    const freqFaults = useMemo(() => Object.entries(getFrequentFaults(hhpTasks)).map(([fault]) => ({
        fault,
    })), [hhpTasks])




    const frequentFaultsTable = useReactTable({
        data: freqFaults,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: frequentFaultsTableSorting,
            globalFilter: frequentFaultsTableFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    return (
        <>
            {
                loading ? (<LoadingScreen />) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='container mx-auto p-1'>
                            <PageTitle title="Dashboard" hasSpan={true} spanText={"HHP"} />
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

                            <div className="grid grid-cols-1 lg:grid-cols-4 items-center gap-3 py-3">
                                <Card className='text-center'>
                                    <CardHeader>
                                        <CardTitle className="text-md text-gray-400 font-normal">Average repair time (days)</CardTitle>

                                        <h4 className='text-5xl font-bold text-gray-950'>{averageRepairTime}</h4>

                                    </CardHeader>
                                </Card>
                                <Card className='text-center'>
                                    <CardHeader>
                                        <CardTitle className="text-md text-gray-400 font-normal">Average completion rate (%)</CardTitle>

                                        <h4 className='text-5xl font-bold text-gray-950'>{averageCompletionRate}</h4>

                                    </CardHeader>
                                </Card>
                                <Card className='text-center'>
                                    <CardHeader>
                                        <CardTitle className="text-md text-gray-400 font-normal">Average parts pending time (days)</CardTitle>

                                        <h4 className='text-5xl font-bold text-gray-950'>{averagePartsPendingTime}</h4>

                                    </CardHeader>
                                </Card>
                                <Card className='text-center'>
                                    <CardHeader>
                                        <CardTitle className="text-md text-gray-400 font-normal">Average parts pending time (days)</CardTitle>

                                        <h4 className='text-5xl font-bold text-gray-950'>{averagePartsIssuedTime}</h4>

                                    </CardHeader>
                                </Card>
                            </div>
                        </main>
                    </>
                ) : (<NotLoggedInScreen />)
            }
        </>
    )
}

export default DashboardScreen
