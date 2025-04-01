"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from 'next/dynamic'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page')
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page'), { ssr: false }
)

const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)
const Pagination = dynamic(() =>
    import('@/components/table_pagination/page'), { ssr: false }
)

import useAddTaskCommentLocally from '@/hooks/useAddCommentLocally'
import useAddPart from '@/hooks/useAddPart'
import useRepairshoprFile from '@/hooks/useAddRepairshoprFile'
import useDeletePart from '@/hooks/useDeleteTaskPart'
import useFetchEngineer from '@/hooks/useFetchEngineers'
import useUserLoggedIn from '@/hooks/useGetUser'
import useIpaasSOPartsInfo from '@/hooks/useIpaasGetSOPartsInfo'
import useRepairshoprComment from '@/hooks/useRepairshoprComment'
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket'
import useUpdateAssessmentDate from '@/hooks/useUpdateAssessmentDate'
import { datetimestamp } from '@/lib/date_formats'

import Modal from '@/components/modal/page'
import { useHHPTasksCrud } from '@/hooks/useHHPTasksCrud'
import columns from '@/lib/hhp_technicians_table_columns'
import { globalFilterFn } from '@/lib/tanstack_global_filter'
import { ModifyTaskModalTechnicians, TechniciansTableData } from '@/lib/types'
import { CheckedState } from '@radix-ui/react-checkbox'
import {
    ColumnFiltersState,
    ColumnOrderState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table"
import React, { useEffect, useMemo, useState } from "react"
const AddgspnHHPTask = dynamic(() =>
    import('./add/gspn/page')
)
const AddRepairshoprHHPTask = dynamic(() =>
    import('./add/repairshopr/page'), { ssr: false }
)
const Parts = dynamic(() =>
    import('./parts/page'), { ssr: false }
)
const QC = dynamic(() =>
    import('./qc/page'), { ssr: false }
)
const TableBody = dynamic(() =>
    import('./tablebody'), { ssr: false }
)
const TableHead = dynamic(() =>
    import('./tablehead'), { ssr: false }
)
const TasksUpdate = dynamic(() =>
    import('./tasks_update/page'), { ssr: false }
)
const ManagementSearchForm = dynamic(() =>
    import('@/components/search_field/page'), { ssr: false }
)
// import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useFetchHHPReports from '@/hooks/useFetchHHPReports'
import useIpaasGetBranchStockOverview from '@/hooks/useGetBranchStockOverview'
import useSocket from "@/hooks/useSocket"
import useTaskParts from "@/hooks/useTaskParts"
import useUpdateParts from "@/hooks/useUpdateParts"
import openFullScreenPopup from '@/lib/openFullScreenPopup'
import repairshopr_statuses from '@/lib/repairshopr_status'
import repairshopr_statuses_techs from '@/lib/tech_rs_statuses'
import moment from 'moment'
import openEngineerBinsTab from "@/lib/openEngineerBinsTab"
import useAddCommentsLocally from "@/hooks/useCommentsLocally"
const DateCalculationsScreen = dynamic(() =>
    import('./date_calculations/page'), { ssr: false }
)


const TechniciansScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { socket, isConnected } = useSocket()
    const { hhpTasks, fetchTasks, updateHHPTaskLoading, updateTask, deleteTask } = useHHPTasksCrud()
    const { updatePart, updatePartLoading } = useUpdateParts()
    const { reportsLoading, fetchReports, error } = useFetchHHPReports();

    const { updateRepairTicket } = useRepairshoprTicket()
    const { updateRepairTicketComment } = useRepairshoprComment()
    const { addRepairTicketFile } = useRepairshoprFile()
    const { addCommentLocally } = useAddCommentsLocally()
    const [modifyTaskModal, setModifyTaskModal] = useState<ModifyTaskModalTechnicians | any>();
    const [modifyTaskModalOpen, setModifyTaskModalOpen] = useState(false);
    // parts for row clicked
    const { taskPartsList } = useTaskParts(modifyTaskModal?.id)
    const { addThisPart, addPartLoading, addPartErrors } = useAddPart()
    const { getSOPartsInfo } = useIpaasSOPartsInfo()
    const { getBranchStockOverview, stockOverviewListLoading } = useIpaasGetBranchStockOverview()
    const { deletePart, deletePartLoading } = useDeletePart()
    const [service_order_no, setServiceOrder] = useState<string | number | any>("")
    const [reparshoprComment, setRepairshoprComment] = useState("")
    const [unit_status, setRepairshoprStatus] = useState<string>("")
    const [assessment_date, setAssessmentDate] = useState<string | undefined>("")
    const [parts_issued_date, setPartsIssuedDate] = useState<string | undefined>("")
    const [parts_issued, setPartsIssued] = useState<CheckedState | undefined>()
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const [openSortTableColumnsModal, setSortTableColumns] = useState(false)
    const [engineer, setEngineer] = useState("");
    const { updateAssessmentDate } = useUpdateAssessmentDate()
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
 


    // engineer filters
    const [engineerFilter, setEngineerFilter] = useState<string>("")
    const [unassisgnedFilter, setUnassignedFilter] = useState<string>("")
    const [statusFilter, setStatusFilter] = useState<string>("")


    const handleEngineerFilter = (e: any) => {
        setUnassignedFilter("")
        setStatusFilter("")
        setEngineerFilter(e)
    }
    const handleUnassignedFilter = (e: any) => {
        setUnassignedFilter(e)
        setEngineerFilter("")
        setStatusFilter("")
    }
    const handleStatusFilter = (e: any) => {
        setStatusFilter(e)
        setEngineerFilter("")
        setUnassignedFilter("")
    }
    const handleDateFromFilter = (e: any) => {
        setDateFrom(e.target.value)
        setEngineerFilter("")
        setStatusFilter("")
        setUnassignedFilter("")
    }
    const handleDateToFilter = (e: any) => {
        setDateTo(e.target.value)
        setEngineerFilter("")
        setStatusFilter("")
        setUnassignedFilter("")
    }

    // parts
    const [search_part, setSearchPart] = useState("")

    const { engineersList } = useFetchEngineer();
    const hhpTechs = engineersList?.filter((x)=> x.department === "HHP")
    // for filtering by engineer
    const engineerListFomatted = hhpTechs?.map((user) => ({
        id: user?.id,
        repairshopr_id: user?.repairshopr_id,
        value: user?.engineer_firstname + " " + user?.engineer_lastname,
        label: user?.engineer_firstname + " " + user?.engineer_lastname,
    }))




    const handleOpenSinglePage = async (row: TechniciansTableData) => {
        const data = row.original?.id
        // router.push(`/departments/hhp/technicians/${encodeURIComponent(data)}`)
        openFullScreenPopup(`/departments/hhp/technicians/${encodeURIComponent(data)}`)
        if (user?.full_name?.toLowerCase()?.includes(row?.original?.engineer?.toLowerCase())) {
            const id = row?.original?.id;
            const created_by = user?.email
            const payload = { assessment_date: datetimestamp, units_assessed: true, created_by, ticket_number: row?.original?.ticket_number }
            await updateAssessmentDate(id, payload)
        }
    }

    const handleRowClick = async (row: TechniciansTableData) => {
        setModifyTaskModal(row?.original);
        setModifyTaskModalOpen(true);
        // by opening the modal, that will be the assessment_date and assessed_true
        // check if logged in user matches the engineer name, so only engineer can set auto assess
        if (user?.full_name?.toLowerCase()?.includes(row?.original?.engineer?.toLowerCase())) {
            const id = row?.original?.id;
            const created_by = user?.email
            const payload = { assessment_date: datetimestamp, units_assessed: true, created_by, ticket_number: row?.original?.ticket_number }
            await updateAssessmentDate(id, payload)
        }

    };



    const handleDeleteRow = async (row: TechniciansTableData) => {
        const userId = user?.user_unique_id
        await deleteTask(row?.original?.id, userId);
        fetchTasks()

    };
    const downloadReport = async () => {
        const downloaded_by = user?.email;
        const downloaded_at = datetimestamp;
        await fetchReports(
            engineer || undefined,
            dateFrom || undefined,
            dateTo || undefined,
            unit_status || undefined,
            downloaded_by,
            downloaded_at
        );
    }

    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");


    // Table column visibility 
    const [columnVisibility, setColumnVisibility] = useState({})

    // Table column order
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])


    const resetFilters = () => {
        setEngineerFilter(""); // Clear engineer filter
        setUnassignedFilter(""); // Clear unassigned filter
        setStatusFilter(""); // Clear status filter
    };

    // Data for the table with filtering logic
    const filterHHPData = useMemo(() => {
        if (!hhpTasks) return []; // Return empty array if no tasks

        // Return the full dataset when no filters are active
        if (!engineerFilter && !unassisgnedFilter && !statusFilter && !dateFrom &&
            !dateTo) {
            return hhpTasks;
        }

        // Apply "unassigned" filter if active
        if (unassisgnedFilter) {
            return hhpTasks.filter((task: any) => !task?.engineer || task?.engineer === null);
        }

        // Apply "engineer" filter if active
        if (engineerFilter) {
            return hhpTasks.filter((task: any) =>
                task?.engineer?.toLowerCase()?.includes(engineerFilter?.toLowerCase())
            );
        }
        // Apply "status" filter if active
        if (statusFilter) {
            return hhpTasks.filter((task: any) =>
                task?.unit_status?.toLowerCase()?.includes(statusFilter?.toLowerCase())
            );
        }

        const filteredTasks = hhpTasks?.filter((task: any) => {
            const taskDate = moment(task?.date_booked).format("YYYY-MM-DD");
            return (taskDate >= dateFrom) && (taskDate <= dateTo);
        });
        if (dateFrom && dateTo) {
            return filteredTasks
        }



        return hhpTasks; // Default return the full dataset
    }, [engineerFilter, hhpTasks, unassisgnedFilter, statusFilter, dateFrom, dateTo]);


    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data: filterHHPData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            pagination,
            columnVisibility,
            columnOrder,
            columnFilters
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
        globalFilterFn, // Use the typed global filter function
        onColumnFiltersChange: setColumnFilters,
    });





    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='container p-1'>

                            <PageTitle title="Management" hasSpan={true} spanText={"HHP"} />

                            {/* modal for sorting table columns */}
                            {
                                openSortTableColumnsModal &&
                                <Dialog open={openSortTableColumnsModal} onOpenChange={() => setSortTableColumns(false)} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Sort columns</DialogTitle>
                                            <DialogDescription>
                                                Toggle columns you want/do not want
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="inline-block border border-black shadow rounded">
                                            <div className="px-1 border-b border-black">
                                                <label>
                                                    <input
                                                        className='bg-sky-600 cursor-pointer checked:bg-slate-950 focus:bg-slate-950'
                                                        {...{
                                                            type: 'checkbox',
                                                            checked: table.getIsAllColumnsVisible(),
                                                            onChange: table.getToggleAllColumnsVisibilityHandler(),
                                                        }}
                                                    />{' '}
                                                    Show them all
                                                </label>
                                            </div>
                                            {table.getAllLeafColumns().map(column => {
                                                return (
                                                    <div key={column.id} className="px-1">
                                                        <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                                            <input
                                                                className='bg-sky-600 cursor-pointer checked:bg-slate-950 focus:bg-slate-950'
                                                                {...{
                                                                    type: 'checkbox',
                                                                    checked: column.getIsVisible(),
                                                                    onChange: column.getToggleVisibilityHandler(),
                                                                }}
                                                            />{' '}
                                                            {column?.columnDef?.header as any}

                                                        </label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            }
                            <section className="flex flex-wrap justify-between items-center py-5 gap-2 w-full overflow-auto">
                                {/* Search Field - Allow it to grow */}
                                <div className="flex-grow min-w-[200px]">
                                    <ManagementSearchForm
                                        filtering={filtering}
                                        setFiltering={(e) => setFiltering(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-between items-center gap-3">

                                    {
                                        user?.user_role === "admin" ?
                                            <>

                                                <Button type="button" onClick={() => openEngineerBinsTab('/departments/hhp/bins')}>Bin stats</Button>
                                                <Button type="button" onClick={downloadReport} disabled={reportsLoading}>{reportsLoading ? 'Downloading...' : 'Get report'}</Button>
                                            </>
                                            : null
                                    }
                                    {
                                        user?.user_role === "admin" ?
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
                                                        onChange={handleDateFromFilter}
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
                                                        onChange={handleDateToFilter}
                                                        className="cursor-pointer"
                                                        id="dateTo"
                                                    />
                                                </span>
                                            </div> : null
                                    }
                                    <Select name="statusFilter" value={statusFilter} onValueChange={handleStatusFilter}>
                                        <SelectTrigger className="w-full hidden md:flex">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {isLoggedIn && user?.user_role === "admin" ?
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    {repairshopr_statuses.map((dep) => (
                                                        <SelectItem key={dep.id} value={`${dep._status}`}>{`${dep._status}`}</SelectItem>
                                                    ))}
                                                </SelectGroup> :
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    {repairshopr_statuses_techs.map((dep) => (
                                                        <SelectItem key={dep.id} value={`${dep._status}`}>{`${dep._status}`}</SelectItem>
                                                    ))}
                                                </SelectGroup>}
                                        </SelectContent>
                                    </Select>

                                    <Select name="engineerFilter" value={unassisgnedFilter} onValueChange={handleUnassignedFilter}>
                                        <SelectTrigger className="w-full hidden md:flex">
                                            <SelectValue placeholder="Unassigned" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"unassigned"}>Unassigned</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select name="engineerFilter" value={engineerFilter} onValueChange={handleEngineerFilter}>
                                        <SelectTrigger className="w-full hidden md:flex">
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
                                    <Button type="button" onClick={() => setSortTableColumns(true)} className="hidden md:block">Sort columns</Button>
                                    <Button type="button" onClick={() => setOpenAddTaskModal(true)}> Add task</Button>
                                </div>

                            </section>
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <TableHead table={table} />
                                    <TableBody table={table} handleRowClick={handleRowClick} deleteRow={handleDeleteRow} handleOpenSinglePage={handleOpenSinglePage} />
                                </table>
                            </div>
                            <div className="h-2" />
                            <Pagination table={table} />


                            {/* modal for adding task */}
                            {
                                openAddTaskModal &&
                                <Modal
                                    isVisible={openAddTaskModal}
                                    onClose={() => setOpenAddTaskModal(false)}
                                    title={"Add task"}
                                    content={
                                        <Tabs defaultValue="repairshopr">
                                            <TabsList>
                                                <TabsTrigger value="gspn">GSPN</TabsTrigger>
                                                <TabsTrigger value="repairshopr">Repairshopr</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="gspn"><AddgspnHHPTask onChange={() => setOpenAddTaskModal(false)} /></TabsContent>
                                            <TabsContent value="repairshopr"><AddRepairshoprHHPTask onChange={() => setOpenAddTaskModal(false)} /></TabsContent>
                                        </Tabs>

                                    }
                                />
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

export default TechniciansScreen