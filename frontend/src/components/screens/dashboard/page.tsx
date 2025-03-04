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
import { calculateAverageRepairTime, countUnitsByStatus, getAveragePartsPendingTime, getCompletionRate, getFrequentFaults, getRepairByEngineer, getUnitsBookedOverTime, getWarrantyStatusBreakdown, partsIssuedRate } from '@/lib/analytics_functions'
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
    const averageRepairTime = useMemo(() => calculateAverageRepairTime(hhpTasks, dateFrom, dateTo), [hhpTasks, dateFrom, dateTo])

    const averageCompletionRate = useMemo(() => getCompletionRate(hhpTasks, dateFrom, dateTo), [hhpTasks, dateFrom, dateTo])
    const averagePartsPendingTime = useMemo(() => getAveragePartsPendingTime(hhpTasks), [hhpTasks])
    const averagePartsIssuedTime = useMemo(() => partsIssuedRate(hhpTasks), [hhpTasks])

    // Table sorting
    const [frequentFaultsTableSorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [frequentFaultsTableFilter, setFiltering] = useState("");


    const freqFaults = useMemo(() =>
        Object.entries(getFrequentFaults(hhpTasks, dateFrom, dateTo)).flatMap(
            ([phoneName, faults]) =>
                Object.entries(faults).map(([fault, count]) => ({
                    phoneName,
                    fault,
                    count,
                }))
        ),
        [hhpTasks, dateFrom, dateTo]
    );

    const warrantyBreakdown = useMemo(
        () =>
            Object.entries(
                getWarrantyStatusBreakdown(hhpTasks, dateFrom, dateTo)
            ).map(([warranty, count]) => ({
                warranty,
                count,
            })),
        [hhpTasks, dateFrom, dateTo]
    );


    const unitsBookedInMonthly = useMemo(() => Object.entries(getUnitsBookedOverTime(hhpTasks, dateFrom, dateTo)).map(([yearMonth, count]) => {
        return { yearMonth: moment(yearMonth).format('MMMM'), count };
    }), [hhpTasks, dateFrom, dateTo]);
    const resetFilters = () => {
        setEngineer(""); // Clear engineer filter
        setDateFrom(""); // Clear date from filter
        setDateTo(""); // Clear date to filter
    };


    const engineerWorkload = useMemo(() =>
        Object.entries(getRepairByEngineer(hhpTasks, dateFrom, dateTo)).map(([engineer, { count, completedTasks }]) => ({
            engineer,
            count,
            completedTasks, // Include the list of completed ticket numbers
        })).sort((a, b) => b.count - a.count), // Sort by count in descending order,
        [hhpTasks, dateFrom, dateTo]
    );

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
    const partsRequestUnits = useMemo(() => countUnitsByStatus(hhpTasks, { status: "Parts Request 1st Approval", startDate: dateFrom, endDate: dateTo, engineer: engineer }), [hhpTasks, dateFrom, dateTo, engineer])
    const partsRequestData = [{ browser: "Parts Request 1st Approval", visitors: partsRequestUnits, fill: "oklch(0.627 0.194 149.214)" }]
    const partsRequestChartConfig = {
        visitors: { label: "Parts Request 1st Approval Jobs" },
    } satisfies ChartConfig
    const quotePendingUnits = useMemo(() => countUnitsByStatus(hhpTasks, { status: "Quote Pending", startDate: dateFrom, endDate: dateTo, engineer: engineer }), [hhpTasks, dateFrom, dateTo, engineer])
    const quotePendingData = [{ browser: "Quote Pending", visitors: quotePendingUnits, fill: "oklch(0.637 0.237 25.331)" }]
    const quotePendingChartConfig = {
        visitors: { label: "Quote Pending" },
    } satisfies ChartConfig
    const partsToOrderedUnits = useMemo(() => countUnitsByStatus(hhpTasks, { status: "Parts to be ordered", startDate: dateFrom, endDate: dateTo, engineer: engineer }), [hhpTasks, dateFrom, dateTo, engineer])
    const partsToOrderedData = [{ browser: "Parts to be ordered", visitors: partsToOrderedUnits, fill: "oklch(0.637 0.237 25.331)" }]

    const partsToOrderedChartConfig = {
        visitors: { label: "Parts to be ordered" },
    } satisfies ChartConfig
    const partsIssuedUnits = useMemo(() => countUnitsByStatus(hhpTasks, { status: "Parts Issued", startDate: dateFrom, endDate: dateTo, engineer: engineer }), [hhpTasks, dateFrom, dateTo, engineer])
    const partsIssuedData = [{ browser: "Parts Issued", visitors: partsIssuedUnits, fill: "oklch(0.723 0.219 149.579)" }]
    const partsIssuedChartConfig = {
        visitors: { label: "Parts Issued" },
    } satisfies ChartConfig
    const customerReplyUnits = useMemo(() => countUnitsByStatus(hhpTasks, { status: "Customer Reply", startDate: dateFrom, endDate: dateTo, engineer: engineer }), [hhpTasks, dateFrom, dateTo, engineer])
    const customerReplyData = [{ browser: "Customer Reply", visitors: customerReplyUnits, fill: "oklch(0.723 0.219 149.579)" }]
    const customerReplyChartConfig = {
        visitors: { label: "Customer Reply" },
    } satisfies ChartConfig
    const inProgressUnits = useMemo(() => countUnitsByStatus(hhpTasks, { status: "In Progress", startDate: dateFrom, endDate: dateTo, engineer: engineer }), [hhpTasks, dateFrom, dateTo, engineer])
    const inProgressData = [{ browser: "In Progress", visitors: inProgressUnits, fill: "oklch(0.723 0.219 149.579)" }]
    const inProgressChartConfig = {
        visitors: { label: "In Progress" },
    } satisfies ChartConfig
    const assignedToTechUnits = useMemo(() => countUnitsByStatus(hhpTasks, { status: "Assigned to Tech", startDate: dateFrom, endDate: dateTo, engineer: engineer }), [hhpTasks, dateFrom, dateTo, engineer])
    const assignedToTechData = [{ browser: "Assigned to Tech", visitors: assignedToTechUnits, fill: "oklch(0.723 0.219 149.579)" }]
    const assignedToTechChartConfig = {
        visitors: { label: "Assigned to Tech" },
    } satisfies ChartConfig
    const qcUnitsUnits = useMemo(() => countUnitsByStatus(hhpTasks, { status: "QC", startDate: dateFrom, endDate: dateTo, engineer: engineer }), [hhpTasks, dateFrom, dateTo, engineer])
    const qcUnitsData = [{ browser: "QC", visitors: qcUnitsUnits, fill: "oklch(0.723 0.219 149.579)" }]
    const qcUnitsChartConfig = {
        visitors: { label: "QC" },
    } satisfies ChartConfig

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

    return (
        <>
            {
                loading ? (<LoadingScreen />) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='container mx-auto p-1'>
                            <PageTitle title="Dashboard" hasSpan={true} spanText={"HHP"} />
                            <div className="flex items-center gap-5">
                                <div className="flex gap-3 items-center">
                                    <span>
                                        {/* <Label
                                        htmlFor="dateFrom"
                                        className="sr-only dark:text-[#eee]"
                                    >
                                        Date from
                                    </Label> */}
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
                                        {/* <Label
                                        htmlFor="dateTo"
                                        className="sr-only dark:text-[#eee]"
                                    >
                                        Date to
                                    </Label> */}
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

                                <Select name="engineerFilter" value={engineer} onValueChange={(e) => setEngineer(e)}>
                                    <SelectTrigger className="w-[400ppx] hidden md:flex">
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
                                <Button type="button" onClick={resetFilters}> Reset filters</Button>

                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-4 items-center gap-3 py-3">
                                <Card onClick={() => handleCardClick("Assigned to Tech")} className="flex flex-col cursor-pointer">
                                    <CardHeader className="items-center pb-0">
                                        <CardTitle>Assigned to Tech</CardTitle>
                                        <CardDescription>Selected Date Range</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 pb-0">
                                        <ChartContainer
                                            config={assignedToTechChartConfig}
                                            className="mx-auto aspect-square max-h-[250px]"
                                        >
                                            <RadialBarChart
                                                data={assignedToTechData}
                                                startAngle={0}
                                                endAngle={250}
                                                innerRadius={80}
                                                outerRadius={110}
                                            >
                                                <PolarGrid
                                                    gridType="circle"
                                                    radialLines={false}
                                                    stroke="none"
                                                    polarRadius={[86, 74]}
                                                />
                                                <RadialBar dataKey="visitors" background cornerRadius={10} />
                                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                                    <Label
                                                        content={({ viewBox }) => {
                                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                                return (
                                                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                                                                            {assignedToTechUnits.toLocaleString()}
                                                                        </tspan>
                                                                        {/* <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                                            In Progress
                                                                        </tspan> */}
                                                                    </text>
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </PolarRadiusAxis>
                                            </RadialBarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>
                                <Card onClick={() => handleCardClick("In Progress")} className="flex flex-col cursor-pointer">
                                    <CardHeader className="items-center pb-0">
                                        <CardTitle>In Progress</CardTitle>
                                        <CardDescription>Selected Date Range</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 pb-0">
                                        <ChartContainer
                                            config={inProgressChartConfig}
                                            className="mx-auto aspect-square max-h-[250px]"
                                        >
                                            <RadialBarChart
                                                data={inProgressData}
                                                startAngle={0}
                                                endAngle={250}
                                                innerRadius={80}
                                                outerRadius={110}
                                            >
                                                <PolarGrid
                                                    gridType="circle"
                                                    radialLines={false}
                                                    stroke="none"
                                                    polarRadius={[86, 74]}
                                                />
                                                <RadialBar dataKey="visitors" background cornerRadius={10} />
                                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                                    <Label
                                                        content={({ viewBox }) => {
                                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                                return (
                                                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                                                                            {inProgressUnits.toLocaleString()}
                                                                        </tspan>
                                                                        {/* <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                                            In Progress
                                                                        </tspan> */}
                                                                    </text>
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </PolarRadiusAxis>
                                            </RadialBarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>
                                <Card onClick={() => handleCardClick("Parts to be ordered")} className="flex flex-col cursor-pointer">
                                    <CardHeader className="items-center pb-0">
                                        <CardTitle>Parts to be ordered</CardTitle>
                                        <CardDescription>Selected Date Range</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 pb-0">
                                        <ChartContainer
                                            config={partsToOrderedChartConfig}
                                            className="mx-auto aspect-square max-h-[250px]"
                                        >
                                            <RadialBarChart
                                                data={partsToOrderedData}
                                                startAngle={0}
                                                endAngle={250}
                                                innerRadius={80}
                                                outerRadius={110}
                                            >
                                                <PolarGrid
                                                    gridType="circle"
                                                    radialLines={false}
                                                    stroke="none"
                                                    polarRadius={[86, 74]}
                                                />
                                                <RadialBar dataKey="visitors" background cornerRadius={10} />
                                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                                    <Label
                                                        content={({ viewBox }) => {
                                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                                return (
                                                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                                                                            {partsToOrderedUnits.toLocaleString()}
                                                                        </tspan>
                                                                        {/* <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                                            Parts to be ordered
                                                                        </tspan> */}
                                                                    </text>
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </PolarRadiusAxis>
                                            </RadialBarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>
                                <Card onClick={() => handleCardClick("Quote Pending")} className="flex flex-col cursor-pointer">
                                    <CardHeader className="items-center pb-0">
                                        <CardTitle>Quote pending</CardTitle>
                                        <CardDescription>Selected Date Range</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 pb-0">
                                        <ChartContainer
                                            config={quotePendingChartConfig}
                                            className="mx-auto aspect-square max-h-[250px]"
                                        >
                                            <RadialBarChart
                                                data={quotePendingData}
                                                startAngle={0}
                                                endAngle={250}
                                                innerRadius={80}
                                                outerRadius={110}
                                            >
                                                <PolarGrid
                                                    gridType="circle"
                                                    radialLines={false}
                                                    stroke="none"
                                                    polarRadius={[86, 74]}
                                                />
                                                <RadialBar dataKey="visitors" background cornerRadius={10} />
                                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                                    <Label
                                                        content={({ viewBox }) => {
                                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                                return (
                                                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                                                                            {quotePendingUnits.toLocaleString()}
                                                                        </tspan>
                                                                        {/* <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                                            Quote Pending
                                                                        </tspan> */}
                                                                    </text>
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </PolarRadiusAxis>
                                            </RadialBarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>

                                {/* modal for adding task */}
                                {
                                    isStatusModalOpen &&
                                    <Modal
                                        isVisible={isStatusModalOpen}
                                        onClose={() => setIsStatusModalOpen(false)}
                                        title={`${selectedStatus} (${filteredTickets?.length})`}
                                        content={

                                            <>
                                                {filteredTickets.length > 0 ? (
                                                    <ul className="space-y-2">
                                                        {filteredTickets.map((ticket, index: any) => (
                                                            <Card key={ticket.ticket_number} className="p-2 rounded-sm">
                                                                <p className="" >{index + 1}{`).`} <span>Ticket</span> {ticket.ticket_number} </p>
                                                                <p className=""><span>Date booked:</span> {moment(ticket.date_booked).format("YYYY-MM-DD")}</p>
                                                                <p className=""><span>Warranty:</span> {ticket.warranty}</p>
                                                                <p className=""><span>Status:</span> {ticket.unit_status}</p>
                                                                <p className=""><span>Engineer:</span> {ticket.engineer}</p>
                                                            </Card >

                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No tickets available.</p>
                                                )}
                                            </>
                                        }
                                    />
                                }
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-4 items-center gap-3 py-3">
                                <Card onClick={() => handleCardClick("Customer Reply")} className="flex flex-col cursor-pointer">
                                    <CardHeader className="items-center pb-0">
                                        <CardTitle>Customer reply</CardTitle>
                                        <CardDescription>Selected Date Range</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 pb-0">
                                        <ChartContainer
                                            config={customerReplyChartConfig}
                                            className="mx-auto aspect-square max-h-[250px]"
                                        >
                                            <RadialBarChart
                                                data={customerReplyData}
                                                startAngle={0}
                                                endAngle={250}
                                                innerRadius={80}
                                                outerRadius={110}
                                            >
                                                <PolarGrid
                                                    gridType="circle"
                                                    radialLines={false}
                                                    stroke="none"
                                                    polarRadius={[86, 74]}
                                                />
                                                <RadialBar dataKey="visitors" background cornerRadius={10} />
                                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                                    <Label
                                                        content={({ viewBox }) => {
                                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                                return (
                                                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                                                                            {customerReplyUnits.toLocaleString()}
                                                                        </tspan>
                                                                        {/* <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                                            Customer Reply
                                                                        </tspan> */}
                                                                    </text>
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </PolarRadiusAxis>
                                            </RadialBarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>

                                <Card onClick={() => handleCardClick("Parts Issued")} className="flex flex-col cursor-pointer">
                                    <CardHeader className="items-center pb-0">
                                        <CardTitle>Parts Issued</CardTitle>
                                        <CardDescription>Selected Date Range</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 pb-0">
                                        <ChartContainer
                                            config={partsIssuedChartConfig}
                                            className="mx-auto aspect-square max-h-[250px]"
                                        >
                                            <RadialBarChart
                                                data={partsIssuedData}
                                                startAngle={0}
                                                endAngle={250}
                                                innerRadius={80}
                                                outerRadius={110}
                                            >
                                                <PolarGrid
                                                    gridType="circle"
                                                    radialLines={false}
                                                    stroke="none"
                                                    polarRadius={[86, 74]}
                                                />
                                                <RadialBar dataKey="visitors" background cornerRadius={10} />
                                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                                    <Label
                                                        content={({ viewBox }) => {
                                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                                return (
                                                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                                                                            {partsIssuedUnits.toLocaleString()}
                                                                        </tspan>
                                                                        {/* <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                                            Parts Issued
                                                                        </tspan> */}
                                                                    </text>
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </PolarRadiusAxis>
                                            </RadialBarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>

                                <Card onClick={() => handleCardClick("QC")} className="flex flex-col cursor-pointer">
                                    <CardHeader className="items-center pb-0">
                                        <CardTitle>Quality Control</CardTitle>
                                        <CardDescription>Selected Date Range</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 pb-0">
                                        <ChartContainer
                                            config={qcUnitsChartConfig}
                                            className="mx-auto aspect-square max-h-[250px]"
                                        >
                                            <RadialBarChart
                                                data={qcUnitsData}
                                                startAngle={0}
                                                endAngle={250}
                                                innerRadius={80}
                                                outerRadius={110}
                                            >
                                                <PolarGrid
                                                    gridType="circle"
                                                    radialLines={false}
                                                    stroke="none"
                                                    polarRadius={[86, 74]}
                                                />
                                                <RadialBar dataKey="visitors" background cornerRadius={10} />
                                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                                    <Label
                                                        content={({ viewBox }) => {
                                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                                return (
                                                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                                                                            {qcUnitsUnits.toLocaleString()}
                                                                        </tspan>
                                                                        {/* <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                                            In Progress
                                                                        </tspan> */}
                                                                    </text>
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </PolarRadiusAxis>
                                            </RadialBarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>


                                <Card onClick={() => handleCardClick("Parts Request 1st Approval")} className="flex flex-col cursor-pointer">
                                    <CardHeader className="items-center pb-0">
                                        <CardTitle>Parts Request 1st Approval</CardTitle>
                                        <CardDescription>Selected Date Range</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 pb-0">
                                        <ChartContainer
                                            config={partsRequestChartConfig}
                                            className="mx-auto aspect-square max-h-[250px]"
                                        >
                                            <RadialBarChart
                                                data={partsRequestData}
                                                startAngle={0}
                                                endAngle={250}
                                                innerRadius={80}
                                                outerRadius={110}
                                            >
                                                <PolarGrid
                                                    gridType="circle"
                                                    radialLines={false}
                                                    stroke="none"
                                                    polarRadius={[86, 74]}
                                                />
                                                <RadialBar dataKey="visitors" background cornerRadius={10} />
                                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                                    <Label
                                                        content={({ viewBox }) => {
                                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                                return (
                                                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                                                                            {partsRequestUnits.toLocaleString()}
                                                                        </tspan>
                                                                        {/* <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                                            Completed
                                                                        </tspan> */}
                                                                    </text>
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </PolarRadiusAxis>
                                            </RadialBarChart>
                                        </ChartContainer>
                                    </CardContent>
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
