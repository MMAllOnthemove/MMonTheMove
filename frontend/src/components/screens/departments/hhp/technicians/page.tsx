"use client"
import LoadingScreen from '@/components/loading_screen/page';
import NotLoggedInScreen from '@/components/not_logged_in/page';
import PageTitle from '@/components/PageTitle/page';
import ManagementSearchForm from '@/components/search_field/page';
import Sidebar from '@/components/sidebar/page';
import TableBody from '@/components/table_body/page';
import Pagination from '@/components/table_pagination/page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useUserLoggedIn from '@/hooks/useGetUser';
import useHHPTasks from '@/hooks/useHHPTasks';
import columns from '@/lib/hhp_technicians_table_columns';
import {
    ColumnOrderState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import useRepairshoprComment from '@/hooks/useRepairshoprComment';
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket';
import findChanges from '@/lib/find_changes';

import useUpdateHHPTask from '@/hooks/updateHHPTask';
import { datetimestamp } from '@/lib/date_formats';
import repairshopr_statuses from '@/lib/repairshopr_status';
import { ModifyTaskModalTechnicians, RepairshorTicketComment, TechniciansTableData } from '@/lib/types';
import { CheckedState } from '@radix-ui/react-checkbox';
import moment from 'moment';
import toast from 'react-hot-toast';
import AddgspnHHPTask from './add/gspn/page';
import AddRepairshoprHHPTask from './add/repairshopr/page';



const TechniciansScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { hhpTasks } = useHHPTasks()
    const { updateRepairTicket } = useRepairshoprTicket()
    const { updateRepairTicketComment } = useRepairshoprComment()
    const { updateHHPTask } = useUpdateHHPTask()

    const [modifyTaskModal, setModifyTaskModal] = useState<ModifyTaskModalTechnicians | any>();
    const [service_order_no, setServiceOrder] = useState<string | number | undefined>("")
    const [reparshoprComment, setRepairshoprComment] = useState("")
    const [unit_status, setRepairshoprStatus] = useState<string>("")
    const [assessment_date, setAssessmentDate] = useState<string | undefined>("")
    const [parts_pending_date, setPartsPendingDate] = useState<string | undefined>("")
    const [parts_issued_date, setPartsIssuedDate] = useState<string | undefined>("")
    const [parts_issued, setPartsIssued] = useState<CheckedState | undefined>()
    const [parts_pending, setPartsPending] = useState<CheckedState | undefined>()
    const [qc_date, setQCCompleteDate] = useState<string | undefined>("")
    const [qc_complete, setQCComplete] = useState<string>('')
    const [qc_fail_reason, setQCFailReason] = useState('')
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const [openSortTableColumnsModal, setSortTableColumns] = useState(false)

    const [parts_ordered_date, setPartsOrderedDate] = useState<string | undefined>("")
    const [parts_ordered, setPartsOrdered] = useState<CheckedState | undefined>()


    const [units_assessed, setUnitAssessed] = useState<CheckedState | undefined>()

    const handleUnitsAssessed = (e: React.SyntheticEvent | any) => {
        if (!units_assessed) {
            setUnitAssessed(e);
            setAssessmentDate(datetimestamp)
        }
    }
    const handleQCcheck = (e: React.SyntheticEvent | any) => {
        setQCComplete(e.target.value);
        if (qc_complete === 'Pass') {
            setQCCompleteDate(datetimestamp)
        }
    }

    const handlePartsOrdered = (e: React.SyntheticEvent | any) => {
        if (!parts_ordered) {
            setPartsOrdered(e);
            setPartsOrderedDate(datetimestamp)
        }
    }
    const handlePartsPending = (e: React.SyntheticEvent | any) => {
        if (!parts_pending) {
            setPartsPending(e);
            setPartsPendingDate(datetimestamp)
        }
    }
    const handlePartsIssued = (e: React.SyntheticEvent | any) => {
        if (!parts_issued) {
            setPartsIssued(e);
            setPartsIssuedDate(datetimestamp)
        }
    }
    const handleRowClick = (row: TechniciansTableData) => {
        setModifyTaskModal(row?.original);
    };

    const closeModal = () => {
        setModifyTaskModal(false);
    };

    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");


    // Table column visibility 
    const [columnVisibility, setColumnVisibility] = useState({})

    // Table column order
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])

    const table = useReactTable({
        data: hhpTasks,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            columnVisibility,
            columnOrder,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });



    useEffect(() => {
        // store values from db but still allow user to update those same fields
        // this helps when comparing
        setAssessmentDate(modifyTaskModal?.assessment_date)
        setPartsIssued(modifyTaskModal?.parts_issued)
        setPartsIssuedDate(modifyTaskModal?.parts_issued_date)
        setPartsPending(modifyTaskModal?.parts_pending)
        setPartsPendingDate(modifyTaskModal?.parts_pending_date)
        setQCComplete(modifyTaskModal?.qc_complete)
        setQCCompleteDate(modifyTaskModal?.qc_date)
        setServiceOrder(modifyTaskModal?.service_order_no)
    }, [modifyTaskModal?.assessment_date, modifyTaskModal?.parts_issued, modifyTaskModal?.parts_issued_date, modifyTaskModal?.parts_pending, modifyTaskModal?.parts_pending_date, modifyTaskModal?.qc_complete, modifyTaskModal?.qc_date, modifyTaskModal?.service_order_no])


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const statusPayload = {
            "status": unit_status
        }
        const commentPayload: RepairshorTicketComment = {
            "subject": "Update",
            "tech": user?.full_name,
            "body": reparshoprComment,
            "hidden": true,
            "do_not_email": true
        }

        const id = modifyTaskModal?.id;
        const updated_at = datetimestamp;
        if (modifyTaskModal?.service_order_no !== service_order_no) {
            setServiceOrder(service_order_no)
        }
        const updatePayload = {
            // This goes to our in house db
            id, service_order_no, unit_status, assessment_date, parts_pending_date, parts_issued_date, parts_issued, parts_pending, qc_date, qc_complete, qc_fail_reason, updated_at, units_assessed, parts_ordered, parts_ordered_date

        }
        const changes = findChanges(modifyTaskModal, updatePayload)
        try {
            if (unit_status !== "" || unit_status !== null || unit_status !== undefined) await updateRepairTicket(modifyTaskModal?.repairshopr_job_id, statusPayload)

            if (reparshoprComment) await updateRepairTicketComment(modifyTaskModal?.repairshopr_job_id, commentPayload)
            if (Object.keys(changes).length > 0) {
                await updateHHPTask(id, changes)
                toast.success(`Successfully updated`);
                closeModal()
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.log("error in hhp techincians screen", error)
            }
        }
    }

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
                                openSortTableColumnsModal && <Dialog open={openSortTableColumnsModal} onOpenChange={() => setSortTableColumns(false)} >
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
                            <section className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />

                                <div className="flex justify-between items-center gap-3">
                                    <Button type="button" onClick={() => setSortTableColumns(true)} className="hidden md:block">Sort columns</Button>
                                    <Button type="button" onClick={() => setOpenAddTaskModal(true)}> Add task</Button>
                                </div>

                            </section>
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] uppercase font-semibold">
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <tr key={headerGroup.id} className=" font-semibold">
                                                <th className="px-4 py-3 cursor-pointer  font-semibold">
                                                    Action
                                                </th>

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

                                    <TableBody>
                                        {table.getRowModel().rows.map((row: any) => (
                                            <tr
                                                key={row.id}
                                                onClick={() => handleRowClick(row)}
                                                className="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-[#22303c] dark:bg-[#2f3f4e]"
                                            >
                                                <td className="px-4 py-3 font-medium text-sm max-w-full">
                                                    <Button
                                                        type="button"
                                                        role="button"
                                                        className="text-blue-600 dark:text-blue-500 hover:underline bg-transparent"
                                                    >
                                                        Edit
                                                    </Button>
                                                </td>

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
                                    </TableBody>
                                </table>
                            </div>
                            <div className="h-2" />
                            <Pagination table={table} />


                            {/* modal for updating task */}
                            {
                                openAddTaskModal && <Dialog open={openAddTaskModal} onOpenChange={() => setOpenAddTaskModal(false)} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add task</DialogTitle>
                                            <DialogDescription>
                                                Please note you can add tasks based on system
                                            </DialogDescription>
                                        </DialogHeader>

                                        <Tabs defaultValue="gspn">
                                            <TabsList>
                                                <TabsTrigger value="gspn">GSPN</TabsTrigger>
                                                <TabsTrigger value="repairshopr">Repairshopr</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="gspn"><AddgspnHHPTask onChange={() => setOpenAddTaskModal(false)} /></TabsContent>
                                            <TabsContent value="repairshopr"><AddRepairshoprHHPTask onChange={() => setOpenAddTaskModal(false)} /></TabsContent>
                                        </Tabs>


                                    </DialogContent>
                                </Dialog>
                            }
                            {/* modal for updating task */}
                            {
                                modifyTaskModal && <Dialog open={modifyTaskModal} onOpenChange={closeModal} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{modifyTaskModal?.ticket_number}</DialogTitle>
                                            <DialogDescription>

                                            </DialogDescription>
                                        </DialogHeader>
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger>Service order, note and status</AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="mb-3">
                                                        <Label htmlFor="serviceOrder">Service order</Label>
                                                        <Input type="text" name="serviceOrder" value={service_order_no} onChange={(e) => setServiceOrder(e.target.value)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <Label htmlFor="reparshoprComment">Repairshopr note</Label>
                                                        <Textarea value={reparshoprComment} name="reparshoprComment" onChange={(e) => setRepairshoprComment(e.target.value)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <Select name="status" value={unit_status} onValueChange={(e) => setRepairshoprStatus(e)}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Status" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {repairshopr_statuses.map((dep) => (
                                                                    <SelectItem key={dep.id} value={`${dep._status}`}>{dep._status}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-2">
                                                <AccordionTrigger>Assessment, QC </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="mb-3">
                                                        <div className="flex items-center space-x-2 mb-3">
                                                            <Checkbox id="units_assessed" checked={units_assessed}
                                                                onCheckedChange={handleUnitsAssessed} />
                                                            <label
                                                                htmlFor="units_assessed"
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                Unit assessed?
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">QC completete?</label>
                                                        <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                                                            <input
                                                                type="radio"
                                                                name="qc_complete"
                                                                checked={qc_complete === 'Fail'}
                                                                value="Fail"
                                                                onChange={handleQCcheck}
                                                            /> Fail
                                                        </div>
                                                        <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                                                            <input
                                                                type="radio"
                                                                name="qc_complete"
                                                                checked={qc_complete === 'Pass'}
                                                                value="Pass"
                                                                onChange={handleQCcheck}
                                                            /> Pass
                                                        </div>
                                                        {
                                                            qc_complete === 'Fail' ? <div>
                                                                <Textarea placeholder="Reason for QC failing." value={qc_fail_reason} onChange={(e => setQCFailReason(e.target.value))} />
                                                            </div> : null
                                                        }
                                                    </div>

                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-3">
                                                <AccordionTrigger>Parts department</AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="mb-3">
                                                        <div className="flex items-center space-x-2 mb-3">
                                                            <Checkbox id="parts_pending" checked={parts_pending}
                                                                onCheckedChange={handlePartsPending} />
                                                            <label
                                                                htmlFor="parts_pending"
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                Parts pending?
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="flex items-center space-x-2 mb-3">
                                                            <Checkbox id="parts_ordered" checked={parts_ordered}
                                                                onCheckedChange={handlePartsOrdered} />
                                                            <label
                                                                htmlFor="parts_ordered"
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                Parts ordered?
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <hr className="py-2" />
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <Checkbox id="parts_issued" checked={parts_issued}
                                                            onCheckedChange={handlePartsIssued} />
                                                        <label
                                                            htmlFor="parts_issued"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            Parts issued?
                                                        </label>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-4">
                                                <AccordionTrigger>More info</AccordionTrigger>
                                                <AccordionContent>
                                                    <div>
                                                        <ul className="list-decimal list-inside">
                                                            <li>Booked date and time: <span className="text-gray-600 font-medium">{moment(modifyTaskModal?.date_booked_datetime).format("YYYY-MM-DD HH:mm:ss")}</span></li>
                                                            <li>Assessment date and time: <span className="text-gray-600 font-medium">{modifyTaskModal?.assessment_datetime ? moment(modifyTaskModal?.assessment_datetime).format("YYYY-MM-DD HH:mm:ss") : null}</span></li>
                                                        </ul>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        <Button className="w-full outline-none" type="button" onClick={handleSubmit}> Update</Button>

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

export default TechniciansScreen
