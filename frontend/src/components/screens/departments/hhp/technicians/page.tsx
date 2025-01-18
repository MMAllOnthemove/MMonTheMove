"use client"
import dynamic from 'next/dynamic'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page')
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page')
)

const Sidebar = dynamic(() =>
    import('@/components/sidebar/page')
)
const Pagination = dynamic(() =>
    import('@/components/table_pagination/page')
)

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

import useAddTaskCommentLocally from '@/hooks/useAddCommentLocally'
import useAddPart from '@/hooks/useAddPart'
import useRepairshoprFile from '@/hooks/useAddRepairshoprFile'
import useDeletePart from '@/hooks/useDeleteTaskPart'
import useFetchEngineer from '@/hooks/useFetchEngineers'
import useFetchPartsForTask from '@/hooks/useGetPartsForTask'
import useUserLoggedIn from '@/hooks/useGetUser'
import useIpaasSOPartsInfo from '@/hooks/useIpaasGetSOPartsInfo'
import useRepairshoprComment from '@/hooks/useRepairshoprComment'
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket'
import useUpdateAssessmentDate from '@/hooks/useUpdateAssessmentDate'
import { datetimestamp } from '@/lib/date_formats'
import { fetchRSTicketDataById } from '@/lib/fetch_ticket_by_id'
import { fieldsToExtract } from '@/lib/fields_to_extract'
import findChanges from '@/lib/find_changes'

import { ModifyTaskModalTechnicians, PropertiesType, RepairshorTicketComment, TechniciansTableData } from '@/lib/types'
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
import axios from 'axios'
import React, { useEffect, useMemo, useState } from "react"
import toast from 'react-hot-toast'
const AddgspnHHPTask = dynamic(() =>
    import('./add/gspn/page')
)
const AddRepairshoprHHPTask = dynamic(() =>
    import('./add/repairshopr/page')
)
const Parts = dynamic(() =>
    import('./parts/page')
)
const QC = dynamic(() =>
    import('./qc/page')
)
const TableBody = dynamic(() =>
    import('./tablebody')
)
const TableHead = dynamic(() =>
    import('./tablehead')
)
const TasksUpdate = dynamic(() =>
    import('./tasks_update/page')
)
const ManagementSearchForm = dynamic(() =>
    import('@/components/search_field/page')
)

import Modal from '@/components/modal/page'
import { useHHPTasksCrud } from '@/hooks/useHHPTasksCrud'
import columns from '@/lib/hhp_technicians_table_columns'
import { globalFilterFn } from '@/lib/tanstack_global_filter'
import { useRouter } from 'next/navigation'
import repairshopr_statuses from '@/lib/repairshopr_status'
const DateCalculationsScreen = dynamic(() =>
    import('./date_calculations/page')
)




const TechniciansScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { hhpTasks, fetchTasks, updateHHPTaskLoading, updateTask, deleteTask } = useHHPTasksCrud()

    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { updateRepairTicket } = useRepairshoprTicket()
    const { updateRepairTicketComment } = useRepairshoprComment()
    const { addRepairTicketFile } = useRepairshoprFile()
    const { addCommentLocally } = useAddTaskCommentLocally()
    const [modifyTaskModal, setModifyTaskModal] = useState<ModifyTaskModalTechnicians | any>();
    const [modifyTaskModalOpen, setModifyTaskModalOpen] = useState(false);
    // parts for row clicked
    const { taskPartsList, refetch } = useFetchPartsForTask(modifyTaskModal?.id)
    const { addThisPart, addPartLoading, addPartErrors } = useAddPart()
    const { getSOPartsInfo } = useIpaasSOPartsInfo()
    const { deletePart, deletePartLoading } = useDeletePart()
    const [service_order_no, setServiceOrder] = useState<string | number | any>("")
    const [reparshoprComment, setRepairshoprComment] = useState("")
    const [unit_status, setRepairshoprStatus] = useState<string>("")
    const [assessment_date, setAssessmentDate] = useState<string | undefined>("")
    const [parts_issued_date, setPartsIssuedDate] = useState<string | undefined>("")
    const [parts_issued, setPartsIssued] = useState<CheckedState | undefined>()
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const [openSortTableColumnsModal, setSortTableColumns] = useState(false)
    const [parts_ordered_date, setPartsOrderedDate] = useState<string | undefined>("")
    const [parts_ordered, setPartsOrdered] = useState<CheckedState | undefined>()
    const [compensation, setCompensation] = useState<CheckedState | undefined | any | any>()
    const [parts_requested, setPartsRequested] = useState<CheckedState | undefined>()
    const [parts_requested_date, setPartsRequestedDate] = useState<string | undefined>("")
    const [qc_complete, setQCComplete] = useState<string>('')
    const [partsExtraText, setPartsExtraText] = useState<string>('')
    const [qc_comment, setQCFailReason] = useState('')
    const [qc_date, setQCCompleteDate] = useState<string | undefined>("")
    const [unit_complete, setUnitComplete] = useState<boolean>(false)
    const [completed_date, setUnitCompleteDate] = useState<string | undefined>("")
    const [engineer, setEngineer] = useState("");
    const [engineerUserId, setEngineerUserId] = useState<string | number | undefined>("");
    const [engineerCombobox, setEngineerCombobox] = useState(false);
    const [submitPartsUpdateLoading, setSubmitPartsUpdateLoading] = useState(false)
    const [addPartOnRepairshoprLoading, setaddPartOnRepairshoprLoading] = useState(false)
    // for purpose of updating
    const [repairshoprWarranty, setRepairshoprWarranty] = useState<string | number | any>("")
    const [repairshoprBackupRequires, setRepairshoprBackupRequires] = useState<string>("");
    const [repairshoprItemCondition, setRepairshoprItemCondition] = useState<string>("")
    const [repairshoprIMEI, setRepairshoprIMEI] = useState<string>("")
    const [specialRequirement, setSpecialRequirement] = useState("")
    const [job_repair_no, setJobRepairNo] = useState("")
    const [locationBin, setLocationBin] = useState("")
    const [collected, setCollected] = useState(false)
    const [collected_date, setCollectedDate] = useState("")
    const [repairshoprServiceOrder, setRepairshoprServiceOrder] = useState("")
    const { updateAssessmentDate } = useUpdateAssessmentDate()

    const [device_location, setDeviceLocation] = useState("")
    const [add_job_repair_no, setAddJobRepairNo] = useState("")



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

    // parts
    const [search_part, setSearchPart] = useState("")
    const [part_name, setPartName] = useState("")
    const [part_desc, setPartDesc] = useState("")
    const [part_quantity, setPartQuantity] = useState<number | undefined>()
    const [part_status, setPartStatus] = useState("")
    const [parts_order_id, setPartsOrderId] = useState("")
    const [submitPartOrderIdLoading, setSubmitPartsOrderIdLoading] = useState(false)
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

    const router = useRouter()
    const handleOpenSinglePage = async (row: TechniciansTableData) => {
        const data = row.original?.id
        router.push(`/departments/hhp/technicians/${encodeURIComponent(data)}`)
    }
    const handleRowClick = async (row: TechniciansTableData) => {
        setModifyTaskModal(row?.original);
        setModifyTaskModalOpen(true);
        // by opening the modal, that will be the assessment_date and assessed_true
        // check if logged in user matches the engineer name, so only engineer can set auto assess
        if (row?.original?.engineer === user?.full_name) {
            const id = row?.original?.id;
            const payload = { assessment_date: datetimestamp, units_assessed: true }
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
                // setSpecialRequirement(extractedValues["Special Requirement"])
                setRepairshoprIMEI(extractedValues["IMEI"])
                // setLocationBin(extractedValues["Location (BIN)"])
                if (properties["Service Order No. "]) {
                    setRepairshoprServiceOrder(properties["Service Order No. "])
                    setServiceOrder(properties["Service Order No. "])
                } else if (properties["Service Order No."]) {
                    setRepairshoprServiceOrder(properties["Service Order No."])
                    setServiceOrder(properties["Service Order No."])
                }
                // if (properties["Job Repair No."]) setJobRepairNo(properties["Job Repair No."]);
                // else if (properties["Job Repair No.:"]) setJobRepairNo(properties["Job Repair No.:"]);
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error)
            }
        }

    };

    const closeModal = () => {
        // clear the parts search, repair comment, part comment when this is closed
        setSearchPart('')
        setServiceOrder('')
        setDeviceLocation('')
        setLocationBin('')
        setSpecialRequirement('')
        setAddJobRepairNo('')
        setPartsOrderId('')
        setRepairshoprStatus('')
        setEngineer('')
        setAssessmentDate('')
        setPartsIssued(undefined)
        setPartsIssuedDate('')
        setPartsRequestedDate('')
        setPartsRequested(undefined)
        setQCComplete('')
        setQCCompleteDate('')
        setRepairshoprComment('')
        setPartsExtraText("")
        setModifyTaskModalOpen(false);
        setModifyTaskModal(null);
    };
    const handleDeletePart = async (id: string | undefined, part_name: string, part_desc: string) => {

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
            if (process.env.NODE_ENV !== 'production') console.error("error commenting deleted part", error)
        }
        refetch(); // Refresh the list of parts

    };
    const handleDeleteRow = async (row: TechniciansTableData) => {
        await deleteTask(row?.original?.id);

    };

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
        if (!engineerFilter && !unassisgnedFilter && !statusFilter) {
            return hhpTasks;
        }

        // Apply "unassigned" filter if active
        if (unassisgnedFilter) {
            return hhpTasks.filter((task: any) => !task?.engineer || task?.engineer === null);
        }

        // Apply "engineer" filter if active
        if (engineerFilter) {
            return hhpTasks.filter((task: any) =>
                task?.engineer?.toLowerCase()?.includes(engineerFilter.toLowerCase())
            );
        }
        // Apply "status" filter if active
        if (statusFilter) {
            return hhpTasks.filter((task: any) =>
                task?.unit_status?.toLowerCase()?.includes(statusFilter.toLowerCase())
            );
        }

        return hhpTasks; // Default return the full dataset
    }, [engineerFilter, hhpTasks, unassisgnedFilter, statusFilter]);


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

    useEffect(() => {
        // store values from db but still allow user to update those same fields
        // this helps when comparing
        if (modifyTaskModal) {

            setDeviceLocation(modifyTaskModal?.device_location)
            setLocationBin(modifyTaskModal?.device_location)
            setSpecialRequirement(modifyTaskModal?.additional_info)
            setAddJobRepairNo(modifyTaskModal?.job_repair_no)
            setJobRepairNo(modifyTaskModal?.job_repair_no)
            setPartsOrderId(modifyTaskModal?.parts_order_id)
            // setPartStatus(modifyTaskModal?.unit_status || "")
            setRepairshoprStatus(modifyTaskModal?.unit_status)
            setEngineer(modifyTaskModal?.engineer)
            setAssessmentDate(modifyTaskModal?.assessment_date)
            setPartsIssued(modifyTaskModal?.parts_issued)
            setPartsIssuedDate(modifyTaskModal?.parts_issued_date)
            setPartsRequestedDate(modifyTaskModal?.parts_requested_date)
            setPartsRequested(modifyTaskModal?.parts_requested)
            setQCComplete(modifyTaskModal?.qc_complete)
            setQCCompleteDate(modifyTaskModal?.qc_date)
            setCompensation(modifyTaskModal?.compensation)
        }

    }, [modifyTaskModal])

    // in case user does not select a new techincian, attach the user id to the current matching technician
    useEffect(() => {
        if (engineer && engineerListFomatted) {
            const existingTech = engineerListFomatted.find(
                (tech) => tech.value === engineer
            );
            if (existingTech) {
                setEngineerUserId(existingTech.repairshopr_id);
            }
        }
    }, [engineer, engineerListFomatted]);



    const [qcFiles, setQCFiles] = useState([]);
    const [qcFilesUploading, setQCFilesUploading] = useState(false);

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
        const created_at = datetimestamp;


        const updatePayload = {
            // This goes to our in house db
            id, updated_at, qc_comment, qc_date, qc_complete, unit_complete, completed_date, additional_info: specialRequirement
        }
        const changes = findChanges(modifyTaskModal, updatePayload)
        const commentPayload: RepairshorTicketComment = {
            "subject": "Update",
            "tech": user?.full_name,
            "body": "*QC analysis: " + qc_comment,
            "hidden": true,
            "do_not_email": true
        }

        const addCommentLocallyPayload = {
            "task_id": id,
            "comment": "*QC analysis: " + qc_comment,
            "created_at": created_at,
            "created_by": user?.full_name,
        }
        try {

            if (Object.keys(changes).length > 0) {
                await updateTask(id, changes)
                if (qc_comment?.length > 0) {
                    await updateRepairTicketComment(modifyTaskModal?.repairshopr_job_id, commentPayload)
                    await addCommentLocally(addCommentLocallyPayload)
                }
                setQCFailReason("")
                toast.success(`Successfully updated`);
                closeModal()
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("error in qc techincians screen", error)
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
            const ticket_number = modifyTaskModal?.ticket_number;
            const task_id = modifyTaskModal?.id;
            const created_at = datetimestamp;
            Array.from(hhpFiles).forEach((file) => {
                formData.append('files', file);
            });
            // Append ticket_number once
            formData.append('ticket_number', ticket_number);
            formData.append('task_id', task_id);
            formData.append('created_at', created_at);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/files`, formData, {
                withCredentials: true,
            })

            if (data) {
                toast.success(`${data?.message}`)
                const repairshopr_payload = {
                    files: data.fileUrls.map((url: any) => ({
                        url: url,
                        filename: url?.split('/')?.pop(), // Extract filename from URL
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


    const repairshopr_payload = {
        "user_id": engineerUserId,
        "status": unit_status,
        "properties": {
            "IMEI": repairshoprIMEI,
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
            "Job Repair No.": `${add_job_repair_no}`,
            "Job Repair No.:": `${add_job_repair_no}`,
            "Location (BIN)": `${device_location}`,
        }
    }
    // Update the techs tab
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const commentPayload: RepairshorTicketComment = {
            "subject": "Update",
            "tech": user?.full_name,
            "body": '*' + reparshoprComment,
            "hidden": true,
            "do_not_email": true
        }

        const id = modifyTaskModal?.id;
        const updated_at = datetimestamp;
        // if (modifyTaskModal?.service_order_no !== service_order_no) {
        //     setServiceOrder(service_order_no)
        // }

        if (unit_status === "Resolved") {
            setCollected(true);
            setCollectedDate(datetimestamp)
        }
        const updatePayload = {
            // This goes to our in house db
            id, service_order_no, unit_status, assessment_date, updated_at, engineer, collected, collected_date, compensation, device_location, job_repair_no: add_job_repair_no
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
            if (reparshoprComment) {
                await updateRepairTicketComment(modifyTaskModal?.repairshopr_job_id, commentPayload)
                await addCommentLocally(addCommentLocallyPayload)

            };

            if (Object.keys(changes).length > 0) {
                await updateTask(id, changes)
                setServiceOrder("")
                setRepairshoprComment("")
                setRepairshoprStatus("")
                setAssessmentDate("")
                setQCFailReason("")
                setEngineer('')
                setRepairshoprWarranty("")
                setRepairshoprBackupRequires("")
                setRepairshoprItemCondition("")
                setRepairshoprIMEI("")
                toast.success(`Successfully updated`);
                closeModal()
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("error updating in hhp techincians screen", error)
            }
        }

    }


    // Update the parts tab
    const handlePartsSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const id = modifyTaskModal?.id;
        const updated_at = datetimestamp;

        const updateRSpayload = {
            ...repairshopr_payload,
            "status": part_status,
        }


        const updatePayload = {
            // This goes to our in house db
            id, updated_at, parts_issued, parts_issued_date, parts_requested, parts_requested_date, parts_ordered, parts_order_id, parts_ordered_date, unit_status: part_status
        }

        const changes = findChanges(modifyTaskModal, updatePayload)
        try {
            setSubmitPartsUpdateLoading(true)

            if (Object.keys(changes).length > 0) {
                if (changes) await updateRepairTicket(modifyTaskModal?.repairshopr_job_id, updateRSpayload)
                await updateTask(id, changes)
                toast.success(`Successfully updated`);
                setSearchPart("")
                setPartsExtraText("")
                setPartDesc("")
                setPartQuantity(0)
                setPartsRequested(undefined)
                setSearchPart("")
                setCompensation(null)
                setPartsIssuedDate("")
                setPartsIssued(undefined)
                setPartsOrdered(undefined)
                setPartsOrderedDate("")
                closeModal()
            }
            setSubmitPartsUpdateLoading(false)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("error in hhp parts screen", error)
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

            const comment = `${partsExtraText}\n\nParts added:\n${partsList}`;
            const commentPayload: RepairshorTicketComment = {
                "subject": "Update",
                "tech": user?.full_name,
                "body": '*' + comment,
                "hidden": true,
                "do_not_email": true
            }
            if (comment) {
                await updateRepairTicketComment(modifyTaskModal?.repairshopr_job_id, commentPayload)
                // clear comment
                setPartsExtraText("")
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("comment part", error)
            }
        } finally {
            setaddPartOnRepairshoprLoading(false); // Stop loading
        }
    }

    // this will send the order no to rs
    const submitPartOrderId = async () => {
        setSubmitPartsOrderIdLoading(true)
        const updateRSpayload = {
            ...repairshopr_payload,
            "status": 'Waiting for Parts',
        }

        const commentPayload: RepairshorTicketComment = {
            "subject": "Update",
            "tech": user?.full_name,
            "body": '*Parts ordered:\n' + parts_order_id,
            "hidden": true,
            "do_not_email": true
        }
        // add the comment to our local db as well
        const created_at = datetimestamp;
        const addCommentLocallyPayload = {
            "task_id": modifyTaskModal?.id,
            "comment": '*Parts ordered:\n' + parts_order_id,
            "created_at": created_at,
            "created_by": user?.full_name,
        }
        try {

            if (parts_order_id) {
                await updateRepairTicketComment(modifyTaskModal?.repairshopr_job_id, commentPayload)
                await addCommentLocally(addCommentLocallyPayload)
                await updateRepairTicket(modifyTaskModal?.repairshopr_job_id, updateRSpayload)
                // clear comment
                setPartsOrderId("")
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("comment parts_order_id", error)
            }
        } finally {
            setSubmitPartsOrderIdLoading(false); // Stop loading
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

                                    <Select name="statusFilter" value={statusFilter} onValueChange={handleStatusFilter}>
                                        <SelectTrigger className="w-full hidden md:flex">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Engineer</SelectLabel>
                                                {repairshopr_statuses.map((dep) => (
                                                    <SelectItem key={dep.id} value={`${dep._status}`}>{`${dep._status}`}</SelectItem>
                                                ))}
                                            </SelectGroup>
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
                                        <Tabs defaultValue="gspn">
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
                            {/* modal for updating task */}
                            {
                                modifyTaskModal &&
                                <Modal
                                    isVisible={modifyTaskModalOpen}
                                    onClose={closeModal}
                                    title={modifyTaskModal?.ticket_number}
                                    content={
                                        <>
                                            <Tabs defaultValue="Techs" className='w-full'>
                                                <TabsList>
                                                    <TabsTrigger value="Techs">Techs</TabsTrigger>
                                                    <TabsTrigger value="QC">QC</TabsTrigger>
                                                    <TabsTrigger value="Parts">Parts</TabsTrigger>
                                                    <TabsTrigger value="Time">Time summary</TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="Techs">
                                                    <TasksUpdate updateTask={updateHHPTaskLoading} job_repair_no={job_repair_no} location={locationBin} assessment_date={modifyTaskModal?.assessment_date} hhp_tasks_loading={hhpFilesUploading} setHHPFilesProp={handleHHPFiles} submitHHPFiles={submitHHPFiles} date_booked={modifyTaskModal?.date_booked} service_order_noProp={service_order_no} setServiceOrderProp={(e) => setServiceOrder(e.target.value)} reparshoprCommentProp={reparshoprComment} setRepairshoprCommentProp={(e: React.SyntheticEvent | any) => setRepairshoprComment(e.target.value)} unit_statusProp={unit_status} setRepairshoprStatusProp={setRepairshoprStatus} submitTasksUpdate={handleSubmit} engineer={engineer} setEngineer={setEngineer} engineerCombobox={engineerCombobox} setEngineerUserId={setEngineerUserId} setEngineerCombobox={setEngineerCombobox} imei={modifyTaskModal?.imei} serial_number={modifyTaskModal?.serial_number} model={modifyTaskModal?.model} additional_info={specialRequirement} device_location={device_location} setDeviceLocation={setDeviceLocation} add_job_repair_no={add_job_repair_no} setAddJobRepairNo={setAddJobRepairNo} />
                                                </TabsContent>
                                                <TabsContent value="QC">
                                                    <QC qcUpdateLoading={updateHHPTaskLoading} qc_fail_reasonProp={qc_comment} setQCFailReasonProp={(e: React.SyntheticEvent | any) => setQCFailReason(e.target.value)} qc_completeProp={qc_complete} setQCCompleteProp={setQCComplete} setQCCompleteDateProp={setQCCompleteDate} qc_FilesLoadingProp={qcFilesUploading} setQCFilesProp={handleQCFiles} submitQCFiles={submitQCFiles} setUnitCompleteDateProp={setUnitCompleteDate} setUnitCompleteProp={setUnitComplete} submitQC={handleQCSubmit} />
                                                </TabsContent>
                                                <TabsContent value="Parts">
                                                    <Parts submitPartOrderId={submitPartOrderId} submitPartOrderIdLoading={submitPartOrderIdLoading} parts_order_id={parts_order_id} setPartsOrderId={setPartsOrderId} stored_parts_order_id={modifyTaskModal?.parts_order_id} partsExtraText={partsExtraText} setPartsExtraText={setPartsExtraText} compensation={compensation} setCompensation={(e) => setCompensation(e)} deletePartLoading={deletePartLoading} part_data={[...taskPartsList]} parts_requestedProp={parts_requested} setPartsRequestedProp={(e) => setPartsRequested(e)} setPartsRequestedDateProp={setPartsRequestedDate} parts_orderedProp={parts_ordered} setPartsOrderedProp={(e) => setPartsOrdered(e)} parts_issuedProp={parts_issued} setPartsIssuedProp={(e) => setPartsIssued(e)} setPartsIssuedDateProp={setPartsIssuedDate} setPartsOrderedDateProp={setPartsOrderedDate} submitPartsUpdate={handlePartsSubmit} search_part={search_part} setSearchPart={setSearchPart} part_desc={part_desc} setPartDesc={setPartDesc} part_quantity={part_quantity} setPartQuantity={setPartQuantity} addPart={addPart} addPartLoading={addPartLoading} submitPartsUpdateLoading={submitPartsUpdateLoading} errors={addPartErrors} handleDelete={handleDeletePart} addPartOnRepairshoprLoading={addPartOnRepairshoprLoading} addPartOnRepairshopr={addPartListToRepairshoprComment} imei={modifyTaskModal?.imei} serial_number={modifyTaskModal?.serial_number} model={modifyTaskModal?.model} part_status={part_status} setPartStatus={setPartStatus} />
                                                </TabsContent>
                                                <TabsContent value="Time">
                                                    <DateCalculationsScreen data={hhpTasks} openTaskId={modifyTaskModal?.id} />
                                                </TabsContent>
                                            </Tabs>
                                        </>
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