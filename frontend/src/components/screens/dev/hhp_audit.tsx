"use client"
import useHHPTasks from '@/hooks/useHHPTasks'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    ColumnOrderState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table"
import useUpdateHHPTask from '@/hooks/updateHHPTask'
import useDeleteHHPTask from '@/hooks/useDeleteHHPTask'
import { ModifyTaskModalTechnicians, TColumns, TechniciansTableData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { datetimestamp } from '@/lib/date_formats'
import moment from 'moment'
const Pagination = dynamic(() =>
    import('@/components/table_pagination/page')
)

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import TableHead from '../departments/hhp/technicians/tablehead'
import TableBody from '../departments/hhp/technicians/tablebody'
import dynamic from 'next/dynamic'
import ManagementSearchForm from '@/components/search_field/page'
import { Label } from '@/components/ui/label'
import Modal from '@/components/modal/page'
const columns: TColumns | any = [

    {
        header: "ticket_number",
        accessorKey: "ticket_number",
    },
    {
        header: "service_order_no",
        accessorKey: "service_order_no",
    },
    {
        header: "warranty",
        accessorKey: "warranty",
    },
    {
        header: "date_booked",
        accessorKey: "date_booked",
    },
    {
        header: "unit_status",
        accessorKey: "unit_status",
    },
    {
        header: "engineer",
        accessorKey: "engineer",
    },
    {
        header: "assessment_date",
        accessorKey: "assessment_date",
    },
    {
        header: "created_at",
        accessorKey: "created_at",
    },
    {
        header: "qc_date",
        accessorKey: "qc_date",
    },
    {
        header: "qc_complete",
        accessorKey: "qc_complete",
    },
    {
        header: "completed_date",
        accessorKey: "completed_date",
    },
    {
        header: "unit_complete",
        accessorKey: "unit_complete",
    },

];


const HHPAuditScreen = () => {
    const { hhpTasks, hhpTasksLoading } = useHHPTasks()
    const { updateHHPTask, updateHHPTaskLoading } = useUpdateHHPTask()
    const { deleteTask, deleteHHPTaskLoading } = useDeleteHHPTask()
    const [ticket_number, setTicket] = useState("")
    const [service_order_no, setServiceOrder] = useState("")
    const [date_booked, setDateBooked] = useState("")
    const [unit_status, setUnitStatus] = useState("")
    const [engineer, setEngineer] = useState("")
    const [assessment_date, setAssessDate] = useState("")
    const [created_at, setCreatedAt] = useState<string | undefined>("")
    const [qc_date, setQCDate] = useState("")
    const [qc_complete, setQCComplete] = useState<any>('')
    const [completed_date, setUnitCompletedDate] = useState("")
    const [unit_complete, setUnitComplete] = useState(false)
    const [modifyTaskModal, setModifyTaskModal] = useState<ModifyTaskModalTechnicians | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [warranty, setWarranty] = useState("")
    const [momentValue, setMomentValue] = useState("")
    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");

    const handleOpenSinglePage = async (row: TechniciansTableData) =>{

    }
    // Table column visibility 
    const [columnVisibility, setColumnVisibility] = useState({})

    // Table column order
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

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
            pagination,
            columnVisibility,
            columnOrder,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
    });
    const closeModal = () => {
        setIsModalVisible(false);
        setModifyTaskModal(null);
    };
    useEffect(() => {
        // store values from db but still allow user to update those same fields
        // this helps when comparing

        if (modifyTaskModal) {
            setTicket(modifyTaskModal?.ticket_number)
            setEngineer(modifyTaskModal?.engineer)
            setAssessDate(modifyTaskModal?.assessment_date)
            setServiceOrder(modifyTaskModal?.service_order_no)
            setDateBooked(modifyTaskModal?.date_booked)
            setUnitStatus(modifyTaskModal?.unit_status)
            setCreatedAt(modifyTaskModal?.created_at)
            setQCDate(modifyTaskModal?.qc_date)
            setWarranty(modifyTaskModal?.warranty)
            setQCComplete(modifyTaskModal?.qc_complete)
            setUnitCompletedDate(modifyTaskModal?.qc_date)
            setUnitComplete(modifyTaskModal?.unit_complete)
        }
    }, [modifyTaskModal])


    const handleQCcheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQCComplete(value);
        if (value === "Pass") {
            setQCDate(datetimestamp);
            setUnitCompletedDate(datetimestamp);
            setUnitComplete(true);
        } else {
            setQCDate("");
            setUnitCompletedDate("");
            setUnitComplete(false);
        }
    };


    const handleRowClick = async (row: TechniciansTableData) => {
        setModifyTaskModal(row?.original);
        setIsModalVisible(true);
    }
    const handleDeleteRow = async (row: TechniciansTableData) => {
        await deleteTask(row?.original?.id);

    };
    const changes = {
        "service_order_no": service_order_no,
        "warranty": service_order_no,
        "ticket_number": ticket_number,
        "date_booked": date_booked ? moment(date_booked).format("YYYY-MM-DD HH:mm:ss") : date_booked,
        "unit_status": unit_status,
        "engineer": engineer,
        "assessment_date": assessment_date ? moment(assessment_date).format("YYYY-MM-DD HH:mm:ss") : assessment_date,
        "created_at": created_at ? moment(created_at).format("YYYY-MM-DD HH:mm:ss") : created_at,
        "qc_complete": qc_complete,
        "qc_date": qc_date ? moment(qc_date).format("YYYY-MM-DD HH:mm:ss") : qc_date,
        "unit_complete": qc_complete === "Pass" ? true : false,
        "completed_date": qc_date ? moment(qc_date).format("YYYY-MM-DD HH:mm:ss") : qc_date,
    }
    const update = async () => {
        const id = modifyTaskModal?.id;
        await updateHHPTask(id, changes)
        closeModal()
    }




    return (
        <>

            <main className='container mx-auto p-1'>

                <h1>HHPAuditScreen</h1>
                {

                    modifyTaskModal &&
                    <Modal
                        isVisible={isModalVisible}
                        onClose={closeModal}
                        title={modifyTaskModal?.ticket_number}
                        content={

                            <>

                                <Input value={momentValue} onChange={(e) => setMomentValue(e.target.value)} />
                                <span>Moment value {moment(momentValue).format("YYYY-MM-DD HH:mm:ss")}</span>

                                <div>
                                    <Label htmlFor="ticket_number">ticket_number</Label>
                                    <Input
                                        value={ticket_number || ""}
                                        onChange={(e) => setTicket(e.target.value)}
                                        name="ticket_number"
                                        placeholder='ticket_number'
                                    />
                                    <Label htmlFor="service_order_no">service_order_no</Label>
                                    <Input
                                        value={service_order_no || ""}
                                        onChange={(e) => setServiceOrder(e.target.value)}
                                        name="service_order_no"
                                        placeholder='service_order_no'
                                    />
                                    <Label htmlFor="date_booked">date_booked</Label>

                                    <Input
                                        value={date_booked || ""}
                                        onChange={(e) => setDateBooked(e.target.value)}
                                        name="date_booked"
                                        placeholder='date_booked'
                                    />
                                    <Label htmlFor="unit_status">unit_status</Label>

                                    <Input
                                        value={unit_status || ""}
                                        onChange={(e) => setUnitStatus(e.target.value)}
                                        name="unit_status"
                                        placeholder='unit_status'
                                    />
                                    <Label htmlFor="engineer">engineer</Label>

                                    <Input
                                        value={engineer || ""}
                                        onChange={(e) => setEngineer(e.target.value)}
                                        name="engineer"
                                        placeholder='engineer'
                                    />
                                    <Label htmlFor="assessment_date">assessment_date</Label>

                                    <Input
                                        value={assessment_date || ""}
                                        onChange={(e) => setAssessDate(e.target.value)}
                                        name="assessment_date"
                                        placeholder='assessment_date'
                                    />
                                    <Label htmlFor="created_at">created_at</Label>

                                    <Input
                                        value={created_at || ""}
                                        onChange={(e) => setCreatedAt(e.target.value)}
                                        name="created_at"
                                        placeholder='created_at'
                                    />
                                    <Label htmlFor="assessment_date">qc_date</Label>

                                    <Input
                                        value={qc_date || ""}
                                        onChange={(e) => setQCDate(e.target.value)}
                                        name="qc_date"
                                        placeholder='qc_date'
                                    />
                                    <Label htmlFor="assessment_date">qc_date</Label>
                                    <select className='block w-full mb-2 border' name="warranty" id="warranty" value={warranty} onChange={(e) => setWarranty(e.target.value)}>
                                        <option value="IW">IW</option>
                                        <option value="OOW">OOW</option>
                                    </select>
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">QC complete?</label>
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

                                    <Button disabled={updateHHPTaskLoading} onClick={update}>{updateHHPTaskLoading ? 'Updating...' : 'Update'}</Button>
                                </div>
                            </>
                        }
                    />

                }
                {/* modal for updating task */}
                {/* {
                    modifyTaskModal && <Dialog open={modifyTaskModal} onOpenChange={closeModal} >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{modifyTaskModal?.ticket_number}</DialogTitle>
                                <DialogDescription>

                                </DialogDescription>
                            </DialogHeader>



                        </DialogContent>
                    </Dialog>
                } */}
                <section className="flex justify-between items-center py-5">
                    <ManagementSearchForm
                        filtering={filtering}
                        setFiltering={(e) => setFiltering(e.target.value)}
                    />
                </section>
                <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                    <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                        <TableHead table={table} />
                        <TableBody table={table} handleRowClick={handleRowClick} deleteRow={handleDeleteRow} handleOpenSinglePage={handleOpenSinglePage} />
                    </table>
                </div>
                <div className="h-2" />
                <Pagination table={table} />
            </main>
        </>
    )
}

export default HHPAuditScreen