"use client"
import LoadingScreen from '@/components/loading_screen/page'
import NotLoggedInScreen from '@/components/not_logged_in/page'
import PageTitle from '@/components/PageTitle/page'
import Sidebar from '@/components/sidebar/page'
import Pagination from '@/components/table_pagination/page'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useUserLoggedIn from '@/hooks/useGetUser'
import useHHPTasks from '@/hooks/useHHPTasks'
import { calculateAverageRepairTime, getAveragePartsPendingTime, getCompletionRate, getFrequentFaults, getRepairByEngineer, getUnitsBookedOverTime, getWarrantyStatusBreakdown, partsIssuedRate } from '@/lib/analytics_functions'
import { unitsBookedInMonthlyChartConfig, warrantyBreakdownChartConfig } from '@/lib/chart_configs'
import engineerWorkColumns from '@/lib/engineer_workload_table_columns'
import columns from '@/lib/frequent_faults__table_columns'

import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import moment from 'moment'
import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const DashboardScreen = () => {
    const { hhpTasks } = useHHPTasks()
    const { isLoggedIn, loading } = useUserLoggedIn()
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")



    // const storeRepairsCount = useMemo(() => Object.entries(
    //     getRepairsByStore(hhpTasks, dateFrom, dateTo)
    // ).map(([store, count]) => ({
    //     store,
    //     count,
    // })), [hhpTasks, dateFrom, dateTo])

    const averageRepairTime = useMemo(() => calculateAverageRepairTime(hhpTasks), [hhpTasks])

    const averageCompletionRate = useMemo(() => getCompletionRate(hhpTasks), [hhpTasks])
    const averagePartsPendingTime = useMemo(() => getAveragePartsPendingTime(hhpTasks), [hhpTasks])
    const averagePartsIssuedTime = useMemo(() => partsIssuedRate(hhpTasks), [hhpTasks])

    // Table sorting
    const [frequentFaultsTableSorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [frequentFaultsTableFilter, setFiltering] = useState("");


    const freqFaults = useMemo(() => Object.entries(getFrequentFaults(hhpTasks, dateFrom, dateTo)).map(([fault]) => ({
        fault,
    })), [hhpTasks, dateFrom, dateTo])

    const warrantyBreakdown = useMemo(() => Object.entries(getWarrantyStatusBreakdown(hhpTasks, dateFrom, dateTo)).map(([warranty, count]) => ({
        warranty, count
    })), [hhpTasks, dateFrom, dateTo])

    const unitsBookedInMonthly = useMemo(() => Object.entries(getUnitsBookedOverTime(hhpTasks, dateFrom, dateTo)).map(([yearMonth, count]) => {
        return { yearMonth: moment(yearMonth).format('MMMM'), count };
    }), [hhpTasks, dateFrom, dateTo]);


    const engineerWorkload = useMemo(() => Object.entries(getRepairByEngineer(hhpTasks, dateFrom, dateTo)).map(([engineer, count]) => ({
        engineer, count
    })), [hhpTasks, dateFrom, dateTo])


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
    const engineerWorkloadTable = useReactTable({
        data: engineerWorkload,
        columns: engineerWorkColumns,
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
                                        <CardTitle className="text-md text-gray-400 font-normal">Average parts issued time (days)</CardTitle>

                                        <h4 className='text-5xl font-bold text-gray-950'>{averagePartsIssuedTime}</h4>

                                    </CardHeader>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-3 py-3">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Units booked monthly</CardTitle>
                                        <CardDescription>{dateFrom && dateTo ? `${moment(dateFrom).format("MMM Do YY")} - ${moment(dateTo).format("MMM Do YY")}` : null}</CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <ChartContainer config={unitsBookedInMonthlyChartConfig}>
                                            <BarChart accessibilityLayer data={unitsBookedInMonthly}>
                                                <CartesianGrid vertical={false} />
                                                <XAxis
                                                    dataKey="yearMonth"
                                                    tickLine={false}
                                                    tickMargin={10}
                                                    axisLine={false}
                                                    tickFormatter={(value) => value.slice(0, 3)}
                                                />
                                                <ChartTooltip
                                                    cursor={false}
                                                    content={<ChartTooltipContent hideLabel />}
                                                />
                                                <Bar dataKey="count" fill="var(--color-count)" radius={8} />
                                            </BarChart>
                                        </ChartContainer>
                                    </CardContent>

                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Waranty comparison</CardTitle>
                                        <CardDescription>{dateFrom && dateTo ? `${moment(dateFrom).format("MMM Do YY")} - ${moment(dateTo).format("MMM Do YY")}` : null}</CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <ChartContainer config={warrantyBreakdownChartConfig}>
                                            <BarChart accessibilityLayer data={warrantyBreakdown}>
                                                <CartesianGrid vertical={false} />
                                                <XAxis
                                                    dataKey="warranty"
                                                    tickLine={false}
                                                    tickMargin={10}
                                                    axisLine={false}
                                                    tickFormatter={(value) => value.slice(0, 3)}
                                                />
                                                <ChartTooltip
                                                    cursor={false}
                                                    content={<ChartTooltipContent hideLabel />}
                                                />
                                                <Bar dataKey="count" fill="var(--color-count)" radius={8} />
                                            </BarChart>
                                        </ChartContainer>
                                    </CardContent>

                                </Card>

                            </div>
                            {/* Frequent faults table */}
                            <h4 className="font-semibold leading-none tracking-tight text-md text-gray-950 my-3">Most frequent faults</h4>
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg mt-4">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">

                                    <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] uppercase font-semibold">
                                        {frequentFaultsTable.getHeaderGroups().map((headerGroup) => (
                                            <tr key={headerGroup.id} className=" font-semibold">

                                                {headerGroup.headers.map((header) => {
                                                    return (
                                                        <th
                                                            key={header.id}
                                                            className="px-4 py-3 cursor-pointer  font-semibold"
                                                        >
                                                            {header.isPlaceholder ? null : (
                                                                <div
                                                                    {...{
                                                                        className: header.column.getCanSort()
                                                                            ? "cursor-pointer select-none"
                                                                            : "",
                                                                        onClick:
                                                                            header.column.getToggleSortingHandler(),
                                                                    }}
                                                                >
                                                                    {flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )}
                                                                    {{
                                                                        asc: " 👇",
                                                                        desc: " 👆",
                                                                    }[header.column.getIsSorted() as string] ??
                                                                        null}
                                                                </div>
                                                            )}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </thead>

                                    <tbody className="z-0">
                                        {frequentFaultsTable.getRowModel().rows.map((row: any) => (
                                            <tr
                                                key={row.id}

                                                className="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-[#22303c] dark:bg-[#2f3f4e]"
                                            >


                                                {row.getVisibleCells().map((cell: any) => (
                                                    <td
                                                        key={cell.id}
                                                        className="px-4 py-3 font-medium text-sm"
                                                    >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="h-2" />
                            <Pagination table={frequentFaultsTable} />
                            {/* engineerWorkloadTable table */}
                            <h4 className="font-semibold leading-none tracking-tight text-md text-gray-950 my-3">Units worked on</h4>
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg mt-4">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">

                                    <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] uppercase font-semibold">
                                        {engineerWorkloadTable.getHeaderGroups().map((headerGroup) => (
                                            <tr key={headerGroup.id} className=" font-semibold">

                                                {headerGroup.headers.map((header) => {
                                                    return (
                                                        <th
                                                            key={header.id}
                                                            className="px-4 py-3 cursor-pointer  font-semibold"
                                                        >
                                                            {header.isPlaceholder ? null : (
                                                                <div
                                                                    {...{
                                                                        className: header.column.getCanSort()
                                                                            ? "cursor-pointer select-none"
                                                                            : "",
                                                                        onClick:
                                                                            header.column.getToggleSortingHandler(),
                                                                    }}
                                                                >
                                                                    {flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )}
                                                                    {{
                                                                        asc: " 👇",
                                                                        desc: " 👆",
                                                                    }[header.column.getIsSorted() as string] ??
                                                                        null}
                                                                </div>
                                                            )}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </thead>

                                    <tbody className="z-0">
                                        {engineerWorkloadTable.getRowModel().rows.map((row: any) => (
                                            <tr
                                                key={row.id}

                                                className="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-[#22303c] dark:bg-[#2f3f4e]"
                                            >


                                                {row.getVisibleCells().map((cell: any) => (
                                                    <td
                                                        key={cell.id}
                                                        className="px-4 py-3 font-medium text-sm"
                                                    >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="h-2" />
                            <Pagination table={engineerWorkloadTable} />

                        </main>
                    </>
                ) : (<NotLoggedInScreen />)
            }
        </>
    )
}

export default DashboardScreen
