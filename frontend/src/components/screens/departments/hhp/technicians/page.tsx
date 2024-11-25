"use client"
import LoadingScreen from '@/components/loading_screen/page';
import NotLoggedInScreen from '@/components/not_logged_in/page';
import PageTitle from '@/components/PageTitle/page';
import ManagementSearchForm from '@/components/search_field/page';
import Sidebar from '@/components/sidebar/page';
import Pagination from '@/components/table_pagination/page';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUpdateHHPTask from '@/hooks/updateHHPTask';
import useAddPart from '@/hooks/useAddPart';
import useRepairshoprFile from '@/hooks/useAddRepairshoprFile';
import useDeletePart from '@/hooks/useDeleteTaskPart';
import useFetchEngineer from '@/hooks/useFetchEngineers';
import useFetchPartsForTask from '@/hooks/useGetPartsForTask';
import useUserLoggedIn from '@/hooks/useGetUser';
import useHHPTasks from '@/hooks/useHHPTasks';
import useIpaasSOPartsInfo from '@/hooks/useIpaasGetSOPartsInfo';
import useRepairshoprComment from '@/hooks/useRepairshoprComment';
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket';
import { datetimestamp } from '@/lib/date_formats';
import findChanges from '@/lib/find_changes';
import columns from '@/lib/hhp_technicians_table_columns';
import { ModifyTaskModalTechnicians, RepairshorTicketComment, TechniciansTableData } from '@/lib/types';
import { CheckedState } from '@radix-ui/react-checkbox';
import {
    ColumnOrderState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import axios from 'axios';
import React, { useEffect, useMemo, useState } from "react";
import toast from 'react-hot-toast';
import AddgspnHHPTask from './add/gspn/page';
import AddRepairshoprHHPTask from './add/repairshopr/page';
import Parts from './parts/page';
import QC from './qc/page';
import TableBody from './tablebody';
import TableHead from './tablehead';
import TasksUpdate from './tasks_update/page';
type PropertiesType = {
    IMEI?: string;
    Warranty?: string;
    "Warranty "?: string;
    "Backup Requires"?: string;
    "Item Condition"?: string;
    "Item Condition "?: string;
};


const TechniciansScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { hhpTasks } = useHHPTasks()
    const { updateRepairTicket } = useRepairshoprTicket()
    const { updateRepairTicketComment } = useRepairshoprComment()
    const { updateHHPTask } = useUpdateHHPTask()
    const { addRepairTicketFile } = useRepairshoprFile()

    const [modifyTaskModal, setModifyTaskModal] = useState<ModifyTaskModalTechnicians | any>();
    // parts for row clicked
    const { taskPartsList, refetch } = useFetchPartsForTask(modifyTaskModal?.id)
    const { addThisPart, addPartLoading, addPartErrors } = useAddPart()
    const { getSOPartsInfo } = useIpaasSOPartsInfo()
    const { deletePart, deletePartLoading } = useDeletePart()
    const [service_order_no, setServiceOrder] = useState<string | number | undefined>("")
    const [reparshoprComment, setRepairshoprComment] = useState("")
    const [unit_status, setRepairshoprStatus] = useState<string>("")
    const [assessment_date, setAssessmentDate] = useState<string | undefined>("")
    const [parts_pending_date, setPartsPendingDate] = useState<string | undefined>("")
    const [parts_issued_date, setPartsIssuedDate] = useState<string | undefined>("")
    const [parts_issued, setPartsIssued] = useState<CheckedState | undefined>()
    const [parts_pending, setPartsPending] = useState<CheckedState | undefined>()
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const [openSortTableColumnsModal, setSortTableColumns] = useState(false)
    const [parts_ordered_date, setPartsOrderedDate] = useState<string | undefined>("")
    const [parts_ordered, setPartsOrdered] = useState<CheckedState | undefined>()
    const [parts_requested, setPartsRequested] = useState<CheckedState | undefined>()
    const [parts_requested_date, setPartsRequestedDate] = useState<string | undefined>("")
    const [qc_complete, setQCComplete] = useState<string>('')
    const [qc_comment, setQCFailReason] = useState('')
    const [qc_date, setQCCompleteDate] = useState<string | undefined>("")
    const [engineer, setEngineer] = useState<string>("")
    const [submitPartsUpdateLoading, setSubmitPartsUpdateLoading] = useState(false)
    const [repairshopr_id, setUserId] = useState<number | undefined>(); // To store the selected repairshopr user ID
    const [engineersComboBox, setEngineerComboBox] = useState(false)
    const [warranty, setWarranty] = useState("")
    const [addPartOnRepairshoprLoading, setaddPartOnRepairshoprLoading] = useState(false)
    // for purpose of updating
    const [repairshoprWarranty, setRepairshoprWarranty] = useState<string>("")
    const [repairshoprBackupRequires, setRepairshoprBackupRequires] = useState<string>("");
    const [repairshoprItemCondition, setRepairshoprItemCondition] = useState<string>("")
    const [repairshoprIMEI, setRepairshoprIMEI] = useState<string>("")


    // fetch repairshopr ticket by id so we an update warranty (it requires so much parameters just for that)
    const fetchRSTicketDataById = async (repairId: string) => {
        try {
            const { data } = await axios.get(
                `https://allelectronics.repairshopr.com/api/v1/tickets/${repairId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );
            if (data?.ticket?.id == repairId) {
                return data;
            };
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error(
                    "Error fetching repairshopr ticket api data by id:",
                    error
                );
            }
        }
    };


    // engineer filters
    const [engineerFilter, setEngineerFilter] = useState<string>("")

    // parts
    const [search_part, setSearchPart] = useState("")
    const [part_name, setPartName] = useState("")
    const [part_desc, setPartDesc] = useState("")
    const [part_quantity, setPartQuantity] = useState<number | undefined>()
    const { engineersList } = useFetchEngineer()
    // for filtering by engineer
    const engineerListFomatted = engineersList?.map((user) => ({
        id: user?.id,
        repairshopr_id: user?.repairshopr_id,
        value: user?.engineer_firstname + " " + user?.engineer_lastname,
        label: user?.engineer_firstname
    }))

    // search parts from ipaas
    useEffect(() => {
        const handleGetSOPartInfo = async (search_part: string) => {
            try {
                const data = await getSOPartsInfo(search_part);
                setPartName(data?.Return?.EsPartsInfo?.PartsNo)
                setPartDesc(data?.Return?.EsPartsInfo?.PartsDescription)
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error)
                }
            }
        };
        handleGetSOPartInfo(search_part)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search_part])

    const handleRowClick = async (row: TechniciansTableData) => {
        setModifyTaskModal(row?.original);

        // by opening the modal, that will be the assessment_date and assessed_true
        // check if logged in user matches the engineer name, so only engineer can set auto assess
        if (row?.original?.engineer === user?.full_name) {
            const units_assessed = true;
            const assessment_date = datetimestamp;
            const id = row?.original?.id;
            const payload = { assessment_date, units_assessed }
            axios.patch(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/assess/` +
                id,
                payload,
                {
                    withCredentials: true,
                }
            );
        }
        // fetch data for this open ticket so we can update on repairshopr
        // example data since repairshopr is so f*ckn foolish
        try {
            const getTicketDataFromRepairshopr = await fetchRSTicketDataById(row?.original?.repairshopr_job_id);
            const properties = getTicketDataFromRepairshopr?.ticket?.properties;
            if (properties) {
                const fieldsToExtract = ["IMEI", "Warranty", "Backup Requires", "Item Condition"];
                const extractedValues: Record<string, string> = {};
                fieldsToExtract.forEach((field: any) => {
                    // Find the correct key for the field
                    const matchedKey = Object?.keys(properties).find(
                        (key) => key.trim() === field
                    );
                    // Assign the value to the extractedValues object if key is found
                    extractedValues[field] = matchedKey ? properties[matchedKey as keyof PropertiesType] : null;
                });
                setRepairshoprWarranty(extractedValues["Warranty"])
                setRepairshoprBackupRequires(extractedValues["Backup Requires"])
                setRepairshoprItemCondition(extractedValues["Item Condition"])
                setRepairshoprIMEI(extractedValues["IMEI"])
            } else {
                // 
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error)
            }
        }

    };

    const closeModal = () => {
        setModifyTaskModal(false);
    };
    const handleDelete = async (id: string | undefined) => {
        // console.log(id)
        await deletePart(id);
        refetch(); // Refresh the list of parts
    };

    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");


    // Table column visibility 
    const [columnVisibility, setColumnVisibility] = useState({})

    // Table column order
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])


    // Data for the table, so we can filter it
    const filterHHPData = useMemo(() => {
        if (!hhpTasks) return [];
        if (engineerFilter) {
            return hhpTasks.filter((task) =>
                task?.engineer?.toLowerCase()?.includes(engineerFilter.toLowerCase())
            );
        }
        return hhpTasks;
    }, [engineerFilter, hhpTasks]);





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
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
    });


    useEffect(() => {
        // store values from db but still allow user to update those same fields
        // this helps when comparing
        setRepairshoprStatus(modifyTaskModal?.unit_status)
        setUserId(modifyTaskModal?.repairshopr_id)
        setEngineer(modifyTaskModal?.engineer)
        setAssessmentDate(modifyTaskModal?.assessment_date)
        setPartsIssued(modifyTaskModal?.parts_issued)
        setPartsIssuedDate(modifyTaskModal?.parts_issued_date)
        setPartsRequestedDate(modifyTaskModal?.parts_requested_date)
        setPartsRequested(modifyTaskModal?.parts_requested)
        setPartsPending(modifyTaskModal?.parts_pending)
        setPartsPendingDate(modifyTaskModal?.parts_pending_date)
        setQCComplete(modifyTaskModal?.qc_complete)
        setQCCompleteDate(modifyTaskModal?.qc_date)
        setServiceOrder(modifyTaskModal?.service_order_no)
        setWarranty(modifyTaskModal?.warranty)
    }, [modifyTaskModal?.warranty, modifyTaskModal?.assessment_date, modifyTaskModal?.parts_requested, modifyTaskModal?.parts_requested_date, modifyTaskModal?.unit_status, modifyTaskModal?.engineer, modifyTaskModal?.repairshopr_id, modifyTaskModal?.parts_issued, modifyTaskModal?.parts_issued_date, modifyTaskModal?.parts_pending, modifyTaskModal?.parts_pending_date, modifyTaskModal?.qc_complete, modifyTaskModal?.qc_date, modifyTaskModal?.service_order_no])


    const [qcFiles, setQCFiles] = useState([]);
    const [qcFilesUploading, setQCFilesUploading] = useState(false);
    // const [qcFilesUrls, setQCFilesUrls] = useState([]);

    const handleQCFiles = (event: any) => {
        setQCFiles(event.target.files);
    };

    // submit qc files to backend and repairshopr
    const submitQCFiles = async () => {
        setQCFilesUploading(true);
        try {
            const formData = new FormData();
            const ticket_number = modifyTaskModal?.ticket_number
            Array.from(qcFiles).forEach((file) => {
                formData.append('files', file);
            });
            // Append ticket_number once
            formData.append('ticket_number', ticket_number);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/files/qc`, formData, {
                withCredentials: true,
            })

            if (data) {
                toast.success(`${data?.message}`)
                const repairshopr_payload = {
                    files: data.fileUrls.map((url: any) => ({
                        url: url,
                        filename: url.split('/').pop(), // Extract filename from URL
                    })),
                };
                await addRepairTicketFile(modifyTaskModal?.repairshopr_job_id, repairshopr_payload)
                setQCFiles([])
            }
            // setQCFilesUrls(data?.fileUrls)
            setQCFilesUploading(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            setQCFilesUploading(false)
            if (process.env.NODE_ENV !== "production") {
                console.error("Error uploading qc images:", error);
            }
        }
    }

    // Update the QC tab
    const handleQCSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const id = modifyTaskModal?.id;
        const updated_at = datetimestamp;
        if (modifyTaskModal?.service_order_no !== service_order_no) {
            setServiceOrder(service_order_no)
        }

        const updatePayload = {
            // This goes to our in house db
            id, updated_at, qc_comment, qc_date, qc_complete
        }
        const changes = findChanges(modifyTaskModal, updatePayload)
        const commentPayload: RepairshorTicketComment = {
            "subject": "Update",
            "tech": user?.full_name,
            "body": "*QC analysis: " + qc_comment,
            "hidden": true,
            "do_not_email": true
        }
        try {

            if (Object.keys(changes).length > 0) {
                await updateHHPTask(id, changes)
                if (qc_comment?.length > 0) await updateRepairTicketComment(modifyTaskModal?.repairshopr_job_id, commentPayload)
                setQCFailReason("")
                toast.success(`Successfully updated`);
                closeModal()
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.log("error in qc techincians screen", error)
            }
        }
    }


    const [hhpFiles, setHHPFiles] = useState([]);
    const [hhpFilesUploading, setHHPFilesUploading] = useState(false);

    const handleHHPFiles = (event: any) => {
        setHHPFiles(event.target.files);
    };

    // submit hhp files to backend and repairshopr
    const submitHHPFiles = async () => {
        setHHPFilesUploading(true);
        try {
            const formData = new FormData();
            const ticket_number = modifyTaskModal?.ticket_number
            Array.from(hhpFiles).forEach((file) => {
                formData.append('files', file);
            });
            // Append ticket_number once
            formData.append('ticket_number', ticket_number);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/files`, formData, {
                withCredentials: true,
            })

            if (data) {
                toast.success(`${data?.message}`)
                const repairshopr_payload = {
                    files: data.fileUrls.map((url: any) => ({
                        url: url,
                        filename: url.split('/').pop(), // Extract filename from URL
                    })),
                };
                await addRepairTicketFile(modifyTaskModal?.repairshopr_job_id, repairshopr_payload)
                setHHPFiles([])
            }
            // setQCFilesUrls(data?.fileUrls)
            setHHPFilesUploading(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            setHHPFilesUploading(false)
            if (process.env.NODE_ENV !== "production") {
                console.error("Error uploading hhp files:", error);
            }
        }
    }
    // Update the techs tab
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const statusPayload = {
            "status": unit_status
        }

        const commentPayload: RepairshorTicketComment = {
            "subject": "Update",
            "tech": user?.full_name,
            "body": '*' + reparshoprComment,
            "hidden": true,
            "do_not_email": true
        }

        const id = modifyTaskModal?.id;
        const updated_at = datetimestamp;
        if (modifyTaskModal?.service_order_no !== service_order_no) {
            setServiceOrder(service_order_no)
        }
        // this will be essenstial to also update the warranty in our system if user voids it
        if (repairshoprWarranty === "69476" || 69476) setWarranty('IW')
        if (repairshoprWarranty === "69477" || 69477) setWarranty('OOW')

        const updatePayload = {
            // This goes to our in house db
            id, service_order_no, unit_status, assessment_date, updated_at, repairshopr_id, warranty
        }
        const changes = findChanges(modifyTaskModal, updatePayload)
        const changeIdOnRepairshoprPayload = {
            "user_id": repairshopr_id,
        }
        // this will update repairshopr warranty using the imei, backup, item condition, warranty
        const updateTicketWarrantyPayload = {
            "properties": {
                "IMEI": repairshoprIMEI,
                "Warranty": repairshoprWarranty,
                "Backup Requires": repairshoprBackupRequires,
                "Item Condition ": repairshoprItemCondition
            }
        }
        try {
            if (unit_status !== "" || unit_status !== null || unit_status !== undefined) await updateRepairTicket(modifyTaskModal?.repairshopr_job_id, statusPayload)
            if (repairshopr_id || repairshopr_id !== null || repairshopr_id !== undefined) await updateRepairTicket(modifyTaskModal?.repairshopr_job_id, changeIdOnRepairshoprPayload)
            if (repairshoprWarranty || repairshoprWarranty !== null || repairshoprWarranty !== undefined) await updateRepairTicket(modifyTaskModal?.repairshopr_job_id, updateTicketWarrantyPayload)

            if (reparshoprComment) await updateRepairTicketComment(modifyTaskModal?.repairshopr_job_id, commentPayload)
            if (Object.keys(changes).length > 0) {
                await updateHHPTask(id, changes)
                setServiceOrder("")
                setRepairshoprComment("")
                setRepairshoprStatus("")
                setAssessmentDate("")
                setQCFailReason("")
                setEngineer("")
                setWarranty("")
                setRepairshoprWarranty("")
                setRepairshoprBackupRequires("")
                setRepairshoprItemCondition("")
                setRepairshoprIMEI("")
                toast.success(`Successfully updated`);
                closeModal()
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.log("error in hhp techincians screen", error)
            }
        }
    }

    // Update the parts tab
    const handlePartsSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const id = modifyTaskModal?.id;
        const updated_at = datetimestamp;
        const firstApprovalPayload = {
            "status": "Parts Request 1st Approval"
        }
        const partsOrderedPayload = {
            "status": "Parts to be ordered"
        }
        const partsIssuedPayload = {
            "status": "Parts Issued"
        }

        const updatePayload = {
            // This goes to our in house db
            id, updated_at, parts_issued, parts_issued_date, parts_requested, parts_requested_date, parts_ordered, parts_ordered_date, parts_pending, parts_pending_date
        }
        const changes = findChanges(modifyTaskModal, updatePayload)
        try {
            setSubmitPartsUpdateLoading(true)

            if (Object.keys(changes).length > 0) {
                if (changes?.parts_requested) await updateRepairTicket(modifyTaskModal?.repairshopr_job_id, firstApprovalPayload)
                if (changes?.parts_ordered) await updateRepairTicket(modifyTaskModal?.repairshopr_job_id, partsOrderedPayload)
                if (changes?.parts_issued) await updateRepairTicket(modifyTaskModal?.repairshopr_job_id, partsIssuedPayload)
                // await updateHHPTask(id, changes)
                toast.success(`Successfully updated`);
                setPartsIssuedDate("")
                setPartsIssued(undefined)
                setPartsPending(undefined)
                setPartsPendingDate("")
                setPartsOrdered(undefined)
                setPartsOrderedDate("")
                closeModal()
            }
            setSubmitPartsUpdateLoading(false)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.log("error in hhp parts screen", error)
            }
        } finally {
            setSubmitPartsUpdateLoading(false)
        }
    }

    // add part searched
    const addPart = async () => {

        const task_row_id = modifyTaskModal?.id;
        const ticket_number = modifyTaskModal?.ticket_number
        const created_at = datetimestamp;
        const created_by = user?.email
        const payload = { task_row_id, ticket_number, part_name, part_desc, part_quantity, created_at, created_by }
        await addThisPart(payload);
        refetch(); // Refresh the list of parts
        setSearchPart("")
        setPartName("")
        setPartDesc("")
        setPartQuantity(0)
    }

    const addPartListToRepairshoprComment = async () => {
        setaddPartOnRepairshoprLoading(true)
        try {
            // this will send the parts as as list on repairshopr
            const partsList = taskPartsList.map((part, index) => {
                return `${index + 1}. ${part.part_name} - ${part.part_desc} (Quantity: ${part.part_quantity})`;
            }).join('\n');

            const comment = `Parts added:\n${partsList}`;
            const commentPayload: RepairshorTicketComment = {
                "subject": "Update",
                "tech": user?.full_name,
                "body": '*' + comment,
                "hidden": true,
                "do_not_email": true
            }
            if (comment) await updateRepairTicketComment(modifyTaskModal?.repairshopr_job_id, commentPayload)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.log("comment part", error)
            }
        } finally {
            setaddPartOnRepairshoprLoading(false); // Stop loading
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
                                    <Select name="engineerFilter" value={engineerFilter} onValueChange={(e) => setEngineerFilter(e)}>
                                        <SelectTrigger className="w-full hidden md:flex">
                                            <SelectValue placeholder="Filter by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {engineerListFomatted.map((dep) => (
                                                <SelectItem key={dep.id} value={`${dep.value}`}>{`${dep.label}`}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button type="button" onClick={() => setSortTableColumns(true)} className="hidden md:block">Sort columns</Button>
                                    <Button type="button" onClick={() => setOpenAddTaskModal(true)}> Add task</Button>
                                </div>

                            </section>
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <TableHead table={table} />
                                    <TableBody table={table} handleRowClick={handleRowClick} />
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
                                        <Tabs defaultValue="Techs" className='w-full'>
                                            <TabsList>
                                                <TabsTrigger value="Techs">Techs</TabsTrigger>
                                                <TabsTrigger value="QC">QC</TabsTrigger>
                                                <TabsTrigger value="Parts">Parts</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="Techs">
                                                <TasksUpdate assessment_datetime={modifyTaskModal?.assessment_datetime} hhp_tasks_loading={hhpFilesUploading} setHHPFilesProp={handleHHPFiles} submitHHPFiles={submitHHPFiles} date_booked_datetime={modifyTaskModal?.date_booked_datetime} service_order_noProp={service_order_no} setServiceOrderProp={(e) => setServiceOrder(e.target.value)} reparshoprCommentProp={reparshoprComment} setRepairshoprCommentProp={(e: React.SyntheticEvent | any) => setRepairshoprComment(e.target.value)} unit_statusProp={unit_status} setRepairshoprStatusProp={(e) => setRepairshoprStatus(e)} submitTasksUpdate={handleSubmit} engineer={engineer} engineersComboBox={engineersComboBox} setEngineer={setEngineer} setEngineerComboBox={setEngineerComboBox} setUserId={setUserId} warranty={warranty} setWarranty={setWarranty} />
                                            </TabsContent>
                                            <TabsContent value="QC">
                                                <QC qc_fail_reasonProp={qc_comment} setQCFailReasonProp={(e: React.SyntheticEvent | any) => setQCFailReason(e.target.value)} qc_completeProp={qc_complete} setQCCompleteProp={setQCComplete} setQCCompleteDateProp={setQCCompleteDate} qc_FilesLoadingProp={qcFilesUploading} setQCFilesProp={handleQCFiles} submitQCFiles={submitQCFiles} submitQC={handleQCSubmit} />
                                            </TabsContent>
                                            <TabsContent value="Parts">
                                                <Parts deletePartLoading={deletePartLoading} part_data={[...taskPartsList]} parts_requestedProp={parts_requested} setPartsRequestedProp={(e) => setPartsRequested(e)} setPartsRequestedDateProp={setPartsRequestedDate} parts_orderedProp={parts_ordered} setPartsOrderedProp={(e) => setPartsOrdered(e)} parts_pendingProp={parts_pending} setPartsPendingProp={(e) => setPartsPending(e)} parts_issuedProp={parts_issued} setPartsIssuedProp={(e) => setPartsIssued(e)} setPartsIssuedDateProp={setPartsIssuedDate} setPartsPendingDateProp={setPartsPendingDate} setPartsOrderedDateProp={setPartsOrderedDate} submitPartsUpdate={handlePartsSubmit} search_part={search_part} setSearchPart={setSearchPart} part_desc={part_desc} setPartDesc={setPartDesc} part_quantity={part_quantity} setPartQuantity={setPartQuantity} addPart={addPart} addPartLoading={addPartLoading} submitPartsUpdateLoading={submitPartsUpdateLoading} errors={addPartErrors} handleDelete={handleDelete} addPartOnRepairshoprLoading={addPartOnRepairshoprLoading} addPartOnRepairshopr={addPartListToRepairshoprComment} />
                                            </TabsContent>
                                        </Tabs>

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