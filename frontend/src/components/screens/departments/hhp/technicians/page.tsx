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
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

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
import repairshopr_statuses from '@/lib/repairshopr_status';
import { CheckedState } from '@radix-ui/react-checkbox';
import AddRepairshoprHHPTask from './add/repairshopr/page';




const TechniciansScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { hhpTasks, hhpTasksLoading } = useHHPTasks()
    const { updateRepairTicket } = useRepairshoprTicket()
    const { updateRepairTicketComment } = useRepairshoprComment()
    // const { updateHHPTask } = useUpdateHHPTask()
    const [modifyTaskModal, setModifyTaskModal] = useState<boolean | null | any>();
    const [service_order_no, setServiceOrder] = useState("")
    const [reparshoprComment, setRepairshoprComment] = useState("")
    const [repairshopr_status, setRepairshoprStatus] = useState("")
    const [assessment_date, setAssessmentDate] = useState("")
    const [parts_pending_date, setPartsPendingDate] = useState("")
    const [parts_issued_date, setPartsIssuedDate] = useState("")
    const [parts_issued, setPartsIssued] = useState<CheckedState | undefined>()
    const [parts_pending, setPartsPending] = useState<CheckedState | undefined>()
    const [qc_date, setQCCompleteDate] = useState("")
    const [qc_complete, setQCComplete] = useState<CheckedState | undefined>()


    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)

    // const { hhpTask } = useFetchHHPTaskById(modifyTaskModal?.id)

    const handleRowClick = (row: any) => {
        setModifyTaskModal(row?.original);
    };

    const closeModal = () => {
        setModifyTaskModal(false);
    };

    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");

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
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });


    /* 


updated qc status, send to our db with time qc is completed
for the comment, send to repaishopr
can edit the service order to add it, thereby if it was not there
can update status, send to our db and repairshopr

    */


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(modifyTaskModal)

        const statusPayload = {
            "status": repairshopr_status
        }
        const commentPayload = {
            "subject": "Update",
            "tech": user?.full_name,
            "body": reparshoprComment,
            "hidden": true,
            "do_not_email": true
        }

        const id = modifyTaskModal?.id;
        const updatePayload = {
            // This goes to our in house db
            id, service_order_no, repairshopr_status, assessment_date, parts_pending_date, parts_issued_date, parts_issued, parts_pending, qc_date, qc_complete
        }

        const changes = findChanges(modifyTaskModal, updatePayload)
        console.log("changes", changes)
        try {
            // const statusPayloadResponse = await updateRepairTicket(modifyTaskModal?.repairshopr_job_id, statusPayload)
            // const commentResponse = await updateRepairTicketComment(modifyTaskModal?.repairshopr_job_id, commentPayload)
            // if (Object.keys(changes).length > 0) {
            //     const updateHHPJobsresponse = await updateHHPTask(id, changes)
            //     console.log("updateHHPJobsresponse", updateHHPJobsresponse)
            // }
        } catch (error) {
            console.log("error rs shopr", error)
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


                            <section className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />

                                <Button type="button" onClick={() => setOpenAddTaskModal(true)}> Add task</Button>

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
                                                    <button
                                                        type="button"
                                                        role="button"
                                                        className="text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Edit
                                                    </button>
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
                                            <TabsContent value="gspn">Make changes to your account here.</TabsContent>
                                            <TabsContent value="repairshopr"><AddRepairshoprHHPTask onChange={() => setOpenAddTaskModal(false)} /></TabsContent>
                                        </Tabs>

                                        {/* <Button className="w-full outline-none" type="button"> Update</Button> */}

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
                                                        <Select name="status" value={repairshopr_status} onValueChange={(e) => setRepairshoprStatus(e)}>
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
                                                <AccordionTrigger>Assessment, QC and dates</AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="mb-3">
                                                        <Label htmlFor="assessment_date">Assessment date</Label>
                                                        <Input type="date" value={assessment_date} name="assessment_date" onChange={(e) => setAssessmentDate(e.target.value)} />
                                                    </div>
                                                    <hr className="py-2" />
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <Checkbox id="parts_pending" checked={parts_pending}
                                                            onCheckedChange={(e) => setPartsPending(e)} />
                                                        <label
                                                            htmlFor="parts_pending"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            Parts pending?
                                                        </label>
                                                    </div>
                                                    <hr className="py-2" />
                                                    <div className="mb-3">
                                                        <Label htmlFor="parts_pending_date">Parts pending date</Label>
                                                        <Input type="date" value={parts_pending_date} name="parts_pending_date" onChange={(e) => setPartsPendingDate(e.target.value)} />
                                                    </div>
                                                    <hr className="py-2" />
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <Checkbox id="parts_issued" checked={parts_issued}
                                                            onCheckedChange={(e) => setPartsIssued(e)} />
                                                        <label
                                                            htmlFor="parts_issued"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            Parts issued?
                                                        </label>
                                                    </div>
                                                    <hr className="py-2" />
                                                    <div className="mb-3">
                                                        <Label htmlFor="parts_issued_date">Parts issued date</Label>
                                                        <Input type="date" value={parts_issued_date} name="parts_issued_date" onChange={(e) => setPartsIssuedDate(e.target.value)} />
                                                    </div>
                                                    <hr className="py-2" />
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <Checkbox id="qc" checked={qc_complete}
                                                            onCheckedChange={(e) => setQCComplete(e)} />
                                                        <label
                                                            htmlFor="qc"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            Mark as QC done
                                                        </label>
                                                    </div>
                                                    <hr className="py-2" />
                                                    <div className="mb-3">
                                                        <Label htmlFor="qc_date">QC complete date</Label>
                                                        <Input type="date" value={qc_date} name="qc_date" onChange={(e) => setQCCompleteDate(e.target.value)} />
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