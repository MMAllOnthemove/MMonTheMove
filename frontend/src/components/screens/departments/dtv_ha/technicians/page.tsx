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
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUpdateDTVHATask from '@/hooks/updateDTVHATask';
import useAddTaskCommentLocally from '@/hooks/useAddCommentLocally';
import useAddPart from '@/hooks/useAddPart';
import useRepairshoprFile from '@/hooks/useAddRepairshoprFile';
import useDeletePart from '@/hooks/useDeleteTaskPart';
import useDTVHATasks from '@/hooks/useDTVHATasks';
import useFetchEngineer from '@/hooks/useFetchEngineers';
import useFetchPartsForTask from '@/hooks/useGetPartsForTask';
import useUserLoggedIn from '@/hooks/useGetUser';
import useIpaasSOPartsInfo from '@/hooks/useIpaasGetSOPartsInfo';
import useRepairshoprComment from '@/hooks/useRepairshoprComment';
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket';
import useUpdateAssessmentDate from '@/hooks/useUpdateDTVHAAsseement';
import { datetimestamp } from '@/lib/date_formats';
import columns from '@/lib/dtv_ha_table_columns';
import { fetchRSTicketDataById } from '@/lib/fetch_ticket_by_id';
import { fieldsToExtract } from '@/lib/fields_to_extract';
import findChanges from '@/lib/find_changes';
import { ModifyTaskModalTechnicians, PropertiesType, RepairshorTicketComment, TechniciansTableData } from '@/lib/types';
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
import TableHead from './tablehead';
import TableBody from './tablebody';
import AddRepairshoprDTVHATask from './add/repairshopr/page';
import AddgspnDTVHATask from './add/gspn/page';
import TasksUpdate from './tasks_update/page';
import Parts from './parts/page';

const DTVHATechniciansScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { dtvhaTasks, dtvhaTasksLoading, refetchdtvhaTasks } = useDTVHATasks()
    const { updateRepairTicket } = useRepairshoprTicket()
    const { updateRepairTicketComment } = useRepairshoprComment()
    const { updateDTVHATask } = useUpdateDTVHATask()
    const { addRepairTicketFile } = useRepairshoprFile()
    const { addCommentLocally } = useAddTaskCommentLocally()
    const [modifyTaskModal, setModifyTaskModal] = useState<ModifyTaskModalTechnicians | any>();
    const { taskPartsList, refetch } = useFetchPartsForTask(modifyTaskModal?.id)
    const { addThisPart, addPartLoading, addPartErrors } = useAddPart()
    const { getSOPartsInfo } = useIpaasSOPartsInfo()
    const { deletePart, deletePartLoading } = useDeletePart()
    const [service_order_no, setServiceOrder] = useState<string | number | any>("")
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
    const [compensation, setCompensation] = useState<CheckedState | undefined | any | any>()
    const [parts_requested, setPartsRequested] = useState<CheckedState | undefined>()
    const [parts_requested_date, setPartsRequestedDate] = useState<string | undefined>("")
    const [unit_complete, setUnitComplete] = useState<boolean>(false)
    const [completed_date, setUnitCompleteDate] = useState<string | undefined>("")
    const [engineer, setEngineer] = useState<string>("")
    const [submitPartsUpdateLoading, setSubmitPartsUpdateLoading] = useState(false)
    const [repairshopr_id, setUserId] = useState<number | undefined>(); // To store the selected repairshopr user ID
    const [engineersComboBox, setEngineerComboBox] = useState(false)
    const [warranty, setWarranty] = useState("")
    const [addPartOnRepairshoprLoading, setaddPartOnRepairshoprLoading] = useState(false)

    // for purpose of updating
    const [repairshoprWarranty, setRepairshoprWarranty] = useState<string | number | any>("")
    const [repairshoprBackupRequires, setRepairshoprBackupRequires] = useState<string>("");
    const [repairshoprItemCondition, setRepairshoprItemCondition] = useState<string>("")
    const [specialRequirement, setSpecialRequirement] = useState("")
    const [job_repair_no, setJobRepairNo] = useState("")
    const [locationBin, setLocationBin] = useState("")
    const [collected, setCollected] = useState(false)
    const [collected_date, setCollectedDate] = useState("")
    const [repairshoprServiceOrder, setRepairshoprServiceOrder] = useState("")
    const { updateAssessmentDate } = useUpdateAssessmentDate()

    // engineer filters
    const [engineerFilter, setEngineerFilter] = useState<string>("")
    const [unassisgnedFilter, setUnassignedFilter] = useState<string>("")


    const handleEngineerFilter = (e: any) => {
        setUnassignedFilter("")
        setEngineerFilter(e)
    }
    const handleUnassignedFilter = (e: any) => {
        setUnassignedFilter(e)
        setEngineerFilter("")
    }

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
        label: user?.engineer_firstname + " " + user?.engineer_lastname,
    }))
    // search parts from ipaas
    useEffect(() => {
        const handleGetSOPartInfo = async (search_part: string) => {
            if (!search_part) return;
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
        // for dtv/ha asssement date will be based on whether the row was open
        if (row?.original?.engineer) {
            const units_assessed = true;
            const assessment_date = datetimestamp;
            const id = row?.original?.id;
            const payload = { assessment_date, units_assessed }
            await updateAssessmentDate(id, payload)

        }
        // fetch data for this open ticket so we can update on repairshopr
        // example data since repairshopr is so f*ckn foolish
        try {

            const getTicketDataFromRepairshopr = await fetchRSTicketDataById(row?.original?.repairshopr_job_id);
            const properties = getTicketDataFromRepairshopr?.ticket?.properties;
            if (properties) {

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
                setSpecialRequirement(extractedValues["Special Requirement"])
                setLocationBin(extractedValues["Location (BIN)"])
                if (properties["Service Order No. "]) {
                    setRepairshoprServiceOrder(extractedValues["Service Order No. "])
                    setServiceOrder(extractedValues["Service Order No. "])
                } else if (properties["Service Order No."]) {
                    setRepairshoprServiceOrder(extractedValues["Service Order No."])
                    setServiceOrder(extractedValues["Service Order No."])
                }
                if (properties["Job Repair No."]) setJobRepairNo(extractedValues["Job Repair No."]);
                if (properties["Job Repair No.:"]) setJobRepairNo(extractedValues["Job Repair No.:"]);
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
    const handleDelete = async (id: string | undefined, part_name: string, part_desc: string) => {

        const comment = `Part ${part_name}${part_desc} deleted by ${user?.full_name}`
        const commentPayload: RepairshorTicketComment = {
            "subject": "Update",
            "tech": user?.full_name,
            "body": '*' + comment,
            "hidden": true,
            "do_not_email": true
        }
        await deletePart(id);
        try {
            if (comment) await updateRepairTicketComment(modifyTaskModal?.repairshopr_job_id, commentPayload)

        } catch (error) {
            console.log("error commenting deleted part", error)
        }
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
    const filterDTVHAData = useMemo(() => {
        if (!dtvhaTasks) return [];
        // If "unassigned" filter is active, ignore the engineer filter
        if (unassisgnedFilter) {
            return dtvhaTasks.filter((task: any) => !task?.engineer || task?.engineer === null);
        }

        // If "engineerFilter" is active, apply it
        if (engineerFilter) {
            return dtvhaTasks.filter((task: any) =>
                task?.engineer?.toLowerCase()?.includes(engineerFilter.toLowerCase())
            );
        }
        return dtvhaTasks;
    }, [engineerFilter, dtvhaTasks, unassisgnedFilter]);


    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data: filterDTVHAData,
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
        setCompensation(modifyTaskModal?.compensation)
    }, [modifyTaskModal?.compensation, modifyTaskModal?.assessment_date, modifyTaskModal?.parts_requested, modifyTaskModal?.parts_requested_date, modifyTaskModal?.unit_status, modifyTaskModal?.engineer, modifyTaskModal?.repairshopr_id, modifyTaskModal?.parts_issued, modifyTaskModal?.parts_issued_date, modifyTaskModal?.parts_pending, modifyTaskModal?.parts_pending_date, modifyTaskModal?.service_order_no])




    const [dtvHaFiles, setDTVHAFiles] = useState([]);
    const [dtvHaFilesUploading, setDTVHAFilesUploading] = useState(false);

    const handleDTVHAFiles = (event: any) => {
        setDTVHAFiles(event.target.files);
    };
    // submit DTVHA files to backend and repairshopr
    const submitDTVHAFiles = async () => {
        setDTVHAFilesUploading(true);
        try {
            const formData = new FormData();
            const ticket_number = modifyTaskModal?.ticket_number
            Array.from(dtvHaFiles).forEach((file) => {
                formData.append('files', file);
            });
            // Append ticket_number once
            formData.append('ticket_number', ticket_number);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/dtv_ha/files`, formData, {
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
                setDTVHAFiles([])
            }
            setDTVHAFilesUploading(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            setDTVHAFilesUploading(false)
            if (process.env.NODE_ENV !== "production") {
                console.error("Error uploading dtv/ha files:", error);
            }
        }
    }

    const repairshopr_payload = {
        "user_id": repairshopr_id,
        "status": unit_status,
        "properties": {
            "IMEI": "",
            "Warranty": repairshoprWarranty,
            "Warranty ": repairshoprWarranty,
            "Backup Requires": `${repairshoprBackupRequires}`,
            "Backup Requires ": `${repairshoprBackupRequires}`,
            "Item Condition": repairshoprItemCondition,
            "Item Condition ": repairshoprItemCondition,
            "Service Order No.": service_order_no,
            "Service Order No. ": service_order_no,
            "Special Requirement": specialRequirement,
            "Special Requirement ": specialRequirement,
            "Job Repair No.": `${job_repair_no}`,
            "Job Repair No.:": `${job_repair_no}`,
            "Location (BIN)": `${locationBin}`,
        }
    }
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const commentPayload: RepairshorTicketComment = {
            "subject": "Update",
            "tech": user?.full_name,
            "body": '*' + reparshoprComment,
            "hidden": true,
            "do_not_email": true
        }

        const id = modifyTaskModal?.id
        const updated_at = datetimestamp;
        if (modifyTaskModal?.service_order_no !== service_order_no) {
            setServiceOrder(service_order_no)
        }
        if (unit_status === "Resolved") {
            setCollected(true);
            setCollectedDate(datetimestamp)
        }
        const updatePayload = {
            // This goes to our in house db
            id, service_order_no, unit_status, assessment_date, updated_at, engineer, warranty, collected, collected_date, compensation
        }

        const changes = findChanges(modifyTaskModal, updatePayload)

        const created_at = datetimestamp;

        const addCommentLocallyPayload = {
            "task_id": id,
            "comment": '*' + reparshoprComment,
            "created_at": created_at,
            "created_by": user?.full_name,
        }

        try {
            const res = await updateRepairTicket(modifyTaskModal?.repairshopr_job_id, repairshopr_payload);
            console.log("res", res)
            if (reparshoprComment?.length > 0) {
                await updateRepairTicketComment(modifyTaskModal?.repairshopr_job_id, commentPayload)
                await addCommentLocally(addCommentLocallyPayload)

            };

            if (Object.keys(changes).length > 0) {
                await updateDTVHATask(id, changes)
                setServiceOrder("")
                setRepairshoprComment("")
                setRepairshoprStatus("")
                setAssessmentDate("")
                setEngineer("")
                setWarranty("")
                setRepairshoprWarranty("")
                setRepairshoprBackupRequires("")
                setRepairshoprItemCondition("")
                toast.success(`Successfully updated`);

                closeModal()
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.log("error in dtv/ha techincians screen", error)
            }
        }

    }
    // Update the parts tab
    const handlePartsSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const id = modifyTaskModal?.id;
        const updated_at = datetimestamp;

        const firstApprovalPayload = {
            ...repairshopr_payload,
            "status": "Parts Request 1st Approval",
        }
        const partsOrderedPayload = {
            ...repairshopr_payload,
            "status": "Parts to be ordered",
        }
        const partsIssuedPayload = {
            ...repairshopr_payload,
            "status": "Parts Issued",
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
                await updateDTVHATask(id, changes)
                toast.success(`Successfully updated`);
                setCompensation(null)
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
                console.log("error in dtv/ha parts screen", error)
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
        const payload = { task_row_id, ticket_number, part_name, part_desc, part_quantity, created_at, created_by, compensation }
        await addThisPart(payload);
        refetch(); // Refresh the list of parts
        setSearchPart("")
        setPartName("")
        setPartDesc("")
        setCompensation(false)
        setPartQuantity(0)
    }

    const addPartListToRepairshoprComment = async () => {
        setaddPartOnRepairshoprLoading(true)
        try {
            // this will send the parts as as list on repairshopr
            // Create the parts list with a conditional "(compensation)" label
            const partsList = taskPartsList.map((part, index) => {
                const compensationLabel = part?.compensation ? " (compensation)" : "";

                return `${index + 1}. ${part.part_name} - ${part.part_desc} (Quantity: ${part.part_quantity})${compensationLabel}`;
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
                            <PageTitle title="Management" hasSpan={true} spanText={"DTV/HA"} />

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
                            <section className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />

                                <div className="flex justify-between items-center gap-3">
                                    <Select name="engineerFilter" value={unassisgnedFilter} onValueChange={handleUnassignedFilter}>
                                        <SelectTrigger className="w-full hidden md:flex">
                                            <SelectValue placeholder="Filter by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"unassigned"}>Unassigned</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select name="engineerFilter" value={engineerFilter} onValueChange={handleEngineerFilter}>
                                        <SelectTrigger className="w-full hidden md:flex">
                                            <SelectValue placeholder="Filter by" />
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
                            {/* modal for adding task */}

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
                                            <TabsContent value="gspn"><AddgspnDTVHATask onChange={() => setOpenAddTaskModal(false)} /></TabsContent>
                                            <TabsContent value="repairshopr"><AddRepairshoprDTVHATask onChange={() => setOpenAddTaskModal(false)} /> </TabsContent>
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
                                                <TabsTrigger value="Parts">Parts</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="Techs">
                                                <TasksUpdate job_repair_no={job_repair_no} location={locationBin} assessment_date={modifyTaskModal?.assessment_date} dtv_tasks_loading={dtvHaFilesUploading} setDTVHAFilesProp={handleDTVHAFiles} submitDTVHAFiles={submitDTVHAFiles} date_booked={modifyTaskModal?.date_booked} service_order_noProp={service_order_no} setServiceOrderProp={(e) => setServiceOrder(e.target.value)} reparshoprCommentProp={reparshoprComment} setRepairshoprCommentProp={(e: React.SyntheticEvent | any) => setRepairshoprComment(e.target.value)} unit_statusProp={unit_status} setRepairshoprStatusProp={(e) => setRepairshoprStatus(e)} submitTasksUpdate={handleSubmit} engineer={engineer} engineersComboBox={engineersComboBox} setEngineer={setEngineer} setEngineerComboBox={setEngineerComboBox} setUserId={setUserId} warranty={warranty} setWarranty={(e) => setWarranty(e)} serial_number={modifyTaskModal?.serial_number} model={modifyTaskModal?.model} />
                                            </TabsContent>
                                            <TabsContent value="Parts">
                                                <Parts compensation={compensation} setCompensation={(e) => setCompensation(e)} deletePartLoading={deletePartLoading} part_data={[...taskPartsList]} parts_requestedProp={parts_requested} setPartsRequestedProp={(e) => setPartsRequested(e)} setPartsRequestedDateProp={setPartsRequestedDate} parts_orderedProp={parts_ordered} setPartsOrderedProp={(e) => setPartsOrdered(e)} parts_pendingProp={parts_pending} setPartsPendingProp={(e) => setPartsPending(e)} parts_issuedProp={parts_issued} setPartsIssuedProp={(e) => setPartsIssued(e)} setPartsIssuedDateProp={setPartsIssuedDate} setPartsPendingDateProp={setPartsPendingDate} setPartsOrderedDateProp={setPartsOrderedDate} submitPartsUpdate={handlePartsSubmit} search_part={search_part} setSearchPart={setSearchPart} part_desc={part_desc} setPartDesc={setPartDesc} part_quantity={part_quantity} setPartQuantity={setPartQuantity} addPart={addPart} addPartLoading={addPartLoading} submitPartsUpdateLoading={submitPartsUpdateLoading} errors={addPartErrors} handleDelete={handleDelete} addPartOnRepairshoprLoading={addPartOnRepairshoprLoading} addPartOnRepairshopr={addPartListToRepairshoprComment} />
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

export default DTVHATechniciansScreen