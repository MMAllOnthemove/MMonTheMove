"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useAddTaskCommentLocally from '@/hooks/useAddCommentLocally';
import useRepairshoprFile from '@/hooks/useAddRepairshoprFile';
import useFetchEngineer from '@/hooks/useFetchEngineers';
import useFetchHHPTaskById from '@/hooks/useFetchHHPtaskById';
import useGetAttachments from '@/hooks/useGetAttachments';
import useGetCustomerLocallyByRSId from '@/hooks/useGetCustomerLocallyByRSId';
import useGetComments from '@/hooks/useGetLocalComments';
import useUserLoggedIn from '@/hooks/useGetUser';
import { useHHPTasksCrud } from '@/hooks/useHHPTasksCrud';
import useIpaasSOPartsInfo from '@/hooks/useIpaasGetSOPartsInfo';
import useRepairshoprComment from '@/hooks/useRepairshoprComment';
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket';
import useSocket from "@/hooks/useSocket";
import useTaskParts from '@/hooks/useTaskParts';
import { assetTypes } from '@/lib/asset_types';
import calculateDueDate from '@/lib/calculate_due_date';
import { datetimestamp } from '@/lib/date_formats';
import findChanges from '@/lib/find_changes';
import openInNewTab from '@/lib/open_new_tab';
import repairshopr_statuses from '@/lib/repairshopr_status';
import repairshopr_statuses_techs from '@/lib/tech_rs_statuses';
import { RepairshorTicketComment } from '@/lib/types';
import { type_21877, type_21878 } from '@/lib/warranty_maps';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { CheckedState } from '@radix-ui/react-checkbox';
import axios from 'axios';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Parts from '../parts/page';
import QC from '../qc/page';

const BackToTop = dynamic(() =>
    import('@/components/toTopButton/page')
)
const Modal = dynamic(() =>
    import('@/components/modal/page')
)
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
const ViewHHPTaskScreen = () => {
    const params = useParams(); // Fetch URL parameters
    const { id } = params;
    const { socket, isConnected } = useSocket()
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { hhpTasks, fetchTasks, updateHHPTaskLoading, updateTask, deleteTask } = useHHPTasksCrud()
    const { hhpTask, refetch, hhpTaskLoading } = useFetchHHPTaskById(id ? decodeURIComponent(Array.isArray(id) ? id[0] : id) : null)
    const { commentsList, commentsListLoading, totalPages, currentPage, fetchComments } = useGetComments(id)
    const [reparshoprComment, setRepairshoprComment] = useState("")
    const { getSOPartsInfo } = useIpaasSOPartsInfo()
    const [qc_comment, setQCFailReason] = useState('')
    const [qc_complete, setQCComplete] = useState<string>('')
    const [qc_date, setQCCompleteDate] = useState<string | undefined>("")
    const [qcFiles, setQCFiles] = useState([]);
    const [qcFilesUploading, setQCFilesUploading] = useState(false);
    const [completed_date, setUnitCompleteDate] = useState<string | undefined>("")
    const [unit_complete, setUnitComplete] = useState<boolean>(false)

    const [partsIssuedText, setIssuedExtraText] = useState("")
    const [issuedPartsLoading, setIssuedPartsLoading] = useState<boolean>(false);
    const [selectedIssuedParts, setSelectedIssuedParts] = useState<any>([]);
    const [part_in_stock, setInStock] = useState<string | undefined>("")
    const [parts_order_id, setPartsOrderId] = useState("")
    const [submitPartOrderIdLoading, setSubmitPartsOrderIdLoading] = useState(false)
    const [partsExtraText, setPartsExtraText] = useState<string>('')
    const [parts_issued, setPartsIssued] = useState<CheckedState | undefined>()
    const [parts_requested, setPartsRequested] = useState<CheckedState | undefined>()
    const [parts_requested_date, setPartsRequestedDate] = useState<string | undefined>("")
    const [compensation, setCompensation] = useState<CheckedState | undefined | any | any>()
    const [parts_ordered, setPartsOrdered] = useState<CheckedState | undefined>()
    const [submitPartsUpdateLoading, setSubmitPartsUpdateLoading] = useState(false)
    const [part_quantity, setPartQuantity] = useState<number | undefined>()
    interface FileUpload {
        file: File | any;
        progress: number;
    }
    const { taskPartsList,
        taskPartsListLoading,
        addThisPart,
        addPartLoading,
        addPartErrors,
        updatePart,
        updatePartLoading, deletePart, deletePartLoading, refetchPartsForThisTask } = useTaskParts(hhpTask?.id)


    // add part searched
    const addPart = async () => {
        const task_row_id = hhpTask?.id;
        const ticket_number = hhpTask?.ticket_number
        const created_at = datetimestamp;
        const created_by = user?.email
        const payload = { task_row_id, ticket_number, part_name, part_desc, part_quantity, created_at, created_by, compensation }
        await addThisPart(payload);
        refetchPartsForThisTask()
        setSearchPart("")
        setPartName("")
        setPartDesc("")
        setCompensation(false)
        setPartQuantity(0)
    }

    // this will send the order no to rs
    const submitPartOrderId = async () => {
        setSubmitPartsOrderIdLoading(true)
        const updateRSpayload = {
            ...repairshopr_payload,
            "status": 'Waiting for Parts',
        }
        const id = hhpTask?.id;
        const updated_at = datetimestamp;
        const updatePayload = {
            // This goes to our in house db
            id, updated_at, updated_by: user?.email, unit_status: "Waiting for Parts"
        }
        const changes = findChanges(hhpTask, updatePayload)

        const commentPayload: RepairshorTicketComment = {
            "subject": "Parts Order",
            "tech": user?.full_name,
            "body": '*Parts ordered:\n' + parts_order_id,
            "hidden": true,
            "do_not_email": true
        }
        // add the comment to our local db as well
        const created_at = datetimestamp;
        const addCommentLocallyPayload = {
            "task_id": hhpTask?.id,
            "comment": '*Parts ordered:\n' + parts_order_id,
            "created_at": created_at,
            "created_by": user?.full_name,
            "ticket_number": hhpTask?.ticket_number
        }
        try {

            if (parts_order_id) {
                await updateRepairTicketComment(hhpTask?.repairshopr_job_id, commentPayload)
                await addCommentLocally(addCommentLocallyPayload)
                await updateRepairTicket(hhpTask?.repairshopr_job_id, updateRSpayload)
                // clear comment
                setPartsOrderId("")
            }
            await updateTask(id, changes)
            closeModal()
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("comment parts_order_id", error)
            }
        } finally {
            setSubmitPartsOrderIdLoading(false); // Stop loading
        }
    }
    const addPartIssuedToRepairshoprComment = async () => {
        setIssuedPartsLoading(true)
        try {
            // this will send the parts as as list on repairshopr

            if (!selectedIssuedParts || selectedIssuedParts.length === 0) {
                return;
            }


            // Loop through selected parts and send updates
            for (const part of selectedIssuedParts) {
                if (!part.id) {
                    console.error("Missing part ID:", part);
                    continue;
                }

                const updatePayload = {
                    // id: part.id,
                    seal_number: part.seal_number, // Ensure seal number is being sent
                    checked: true, // If part is selected, send checked=true
                };

                await updatePart(part.id, part);
            }
            const partsList = selectedIssuedParts?.map((part: any, index: any) => {

                return `${index + 1}. ${part.part_name} - Seal number:${part.seal_number}`;
            }).join('\n');

            const comment = `${partsIssuedText}\n\nParts issued to:\n${partsList}`;
            const commentPayload: RepairshorTicketComment = {
                "subject": "Update",
                "tech": user?.full_name,
                "body": '*' + comment,
                "hidden": true,
                "do_not_email": true
            }
            const created_at = datetimestamp;
            const addCommentLocallyPayload = {
                "task_id": hhpTask?.id,
                "comment": '*' + reparshoprComment,
                "created_at": created_at,
                "created_by": user?.full_name,
                "ticket_number": hhpTask?.ticket_number
            }
            if (comment) {
                await updateRepairTicketComment(hhpTask?.repairshopr_job_id, commentPayload)
                await addCommentLocally(addCommentLocallyPayload)
                // clear comment
                setIssuedExtraText("")
            }

        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("comment part", error)
            }
        } finally {
            setIssuedPartsLoading(false); // Stop loading
        }
    }
    const handleQCFiles = (event: any) => {
        setQCFiles(event.target.files);
    };
    // submit qc files to backend and repairshopr
    const submitQCFiles = async () => {
        setQCFilesUploading(true);
        try {
            const formData = new FormData();
            const ticket_number = hhpTask?.ticket_number;
            const task_id = hhpTask?.id;
            const created_at = datetimestamp;
            Array.from(qcFiles).forEach((file) => {
                formData.append('files', file);
            });
            // Append ticket_number once
            formData.append('ticket_number', ticket_number);
            formData.append('task_id', task_id);
            formData.append('created_at', created_at);
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
                await addRepairTicketFile(hhpTask?.repairshopr_job_id, repairshopr_payload)
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
        const id = hhpTask?.id;
        const updated_at = datetimestamp;
        const created_at = datetimestamp;


        const updatePayload = {
            // This goes to our in house db
            id, updated_by: user?.email, updated_at, qc_comment, qc_date, qc_complete, unit_complete, completed_date, additional_info: additionalInfo
        }
        const changes = findChanges(hhpTask, updatePayload)
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
            "ticket_number": hhpTask?.ticket_number
        }
        try {

            if (Object.keys(changes).length > 0) {
                await updateTask(id, changes)
                if (qc_comment?.length > 0) {
                    await updateRepairTicketComment(hhpTask?.repairshopr_job_id, commentPayload)
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

    const {
        attachmentsList,
        attachmentsListLoading,
        currentAttPage,
        totalAttPages,
        fetchAttachments,
    } = useGetAttachments(id)
    const { addCommentLocally, addCommentLoading } = useAddTaskCommentLocally()
    const { updateRepairTicket } = useRepairshoprTicket()
    const { updateRepairTicketComment } = useRepairshoprComment()

    const handlePageChange = (page: number) => {
        fetchComments(page);
    };
    const handleAttachmentsPageChange = (page: number) => {
        fetchAttachments(page)
    }
    const { addRepairTicketFile } = useRepairshoprFile()
    const [hhpFiles, setHHPFiles] = useState<FileUpload[]>([]);
    const [hhpFilesUploading, setHHPFilesUploading] = useState(false);
    const [engineer, setEngineer] = useState<string | undefined>("")
    const [repairshopr_id, setUserId] = useState<number | undefined>(); // To store the selected repairshopr user ID
    const [issue_type, setIssueType] = useState<string | null | undefined | any>("");
    const { engineersList } = useFetchEngineer()
    const { singleCustomerByRsId, singleCustomerByRsIdLoading } = useGetCustomerLocallyByRSId(hhpTask?.repairshopr_customer_id)
    const [unit_status, setUnitStatus] = useState<string | undefined>("")
    const [comment, setComment] = useState("")
    const [imei, setIMEI] = useState<string | undefined>("")
    const [rs_warranty, setRSWarranty] = useState<string | null>("")
    const [itemCondition, setCondition] = useState<string | null>("")
    const [serviceOrder, setServiceOrder] = useState<string | undefined>("")
    const [additionalInfo, setAdditionalInfo] = useState<string | null>("")
    const [backup_requires_code, setBackupCode] = useState<string | null>("")
    const [repairNo, setRepairNo] = useState<string | undefined>("")
    const [deviceLocation, setDeviceLocation] = useState<string | null>("")
    const [modifyTaskModalOpen, setModifyTaskModalOpen] = useState(false);
    const [quote_accepted, setQuoteAccepted] = useState(false)
    const [quote_rejected, setQuoteRejected] = useState(false)
    const [part_status, setPartStatus] = useState("")
    const [addPartOnRepairshoprLoading, setaddPartOnRepairshoprLoading] = useState(false)
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
            const created_at = datetimestamp;
            const addCommentLocallyPayload = {
                "task_id": hhpTask?.id,
                "comment": '*' + reparshoprComment,
                "created_at": created_at,
                "created_by": user?.full_name,
                "ticket_number": hhpTask?.ticket_number
            }
            if (comment) {
                await updateRepairTicketComment(hhpTask?.repairshopr_job_id, commentPayload)
                await addCommentLocally(addCommentLocallyPayload)
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
    const handleDeletePart = async (id: string | undefined, part_name: string, part_desc: string) => {
        const created_at = datetimestamp;
        const comment = `Part ${part_name}${part_desc} deleted by ${user?.full_name}`
        const commentPayload: RepairshorTicketComment = {
            "subject": "Update",
            "tech": user?.full_name,
            "body": '*' + comment,
            "hidden": true,
            "do_not_email": true
        }
        const addCommentLocallyPayload = {
            "task_id": hhpTask?.id,
            "comment": '*' + comment,
            "created_at": created_at,
            "created_by": user?.full_name,
            "ticket_number": hhpTask?.ticket_number
        }
        await deletePart(id);
        try {
            if (comment) { await updateRepairTicketComment(hhpTask?.repairshopr_job_id, commentPayload); await addCommentLocally(addCommentLocallyPayload); fetchComments(1) }

        } catch (error) {
            if (process.env.NODE_ENV !== 'production') console.error("error commenting deleted part", error)
        }
        refetch(); // Refresh the list of parts

    };
    const [collected, setCollected] = useState<string | undefined | null | any>(false)
    const [collected_date, setCollectedDate] = useState<string | null>("")
    const [warranty, setWarranty] = useState<string | null | undefined>("")
    const [ticket_type_id, setTicketTypeId] = useState<string | number | undefined | null | any>("")
    const [parts_issued_date, setPartsIssuedDate] = useState<string | undefined>("")
    const [parts_ordered_date, setPartsOrderedDate] = useState<string | undefined>("")
    // parts
    const [search_part, setSearchPart] = useState("")
    const [part_name, setPartName] = useState("")
    const [part_desc, setPartDesc] = useState("")
    const openModal = () => {
        setModifyTaskModalOpen(true);
    }
    const closeModal = () => {
        setModifyTaskModalOpen(false);
    };



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



    useEffect(() => {
        if (hhpTask) {
            setTicketTypeId(hhpTask?.ticket_type_id)
            setEngineer(hhpTask?.engineer)
            setIssueType(hhpTask?.stores)
            setUnitStatus(hhpTask?.unit_status)
            setIMEI(hhpTask?.imei)
            setRSWarranty(hhpTask?.rs_warranty)
            setCondition(hhpTask?.accessories_and_condition)
            setServiceOrder(hhpTask?.service_order_no)
            setAdditionalInfo(hhpTask?.additional_info)
            setBackupCode(hhpTask?.requires_backup)
            setRepairNo(hhpTask?.job_repair_no)
            setDeviceLocation(hhpTask?.device_location)
            setCollected(hhpTask?.collected)
            setCollectedDate(hhpTask?.collected_date)
            setQuoteRejected(hhpTask?.quote_rejected)
            setQuoteAccepted(hhpTask?.quote_accepted)
            // setUserId(hhpTask?.repairshopr_id)
        }
    }, [id, hhpTask])



    const repairshopr_payload = {
        "user_id": repairshopr_id,
        "status": unit_status,
        "properties": {
            "IMEI": imei,
            "Warranty": rs_warranty,
            "Warranty ": rs_warranty,
            "Backup Requires": backup_requires_code,
            "Backup Requires ": backup_requires_code,
            "Item Condition": itemCondition,
            "Item Condition ": itemCondition,
            "Service Order No.": serviceOrder,
            "Service Order No. ": serviceOrder,
            "Special Requirement": additionalInfo,
            "Special Requirement ": additionalInfo,
            "Job Repair No.": repairNo,
            "Job Repair No.:": repairNo,
            "Location (BIN)": deviceLocation,
        }
    }

    const updateIssueType = async (e: any) => {
        const selected = e;
        setIssueType(e)
        const problem_type_update = {
            ...repairshopr_payload,
            "problem_type": selected,
        }
        const id = hhpTask?.id;
        const updated_at = datetimestamp;
        const updatePayload = {
            // This goes to our in house db
            id, service_order_no: serviceOrder, accessories_and_condition: itemCondition, unit_status, updated_at, engineer, collected, stores: selected, collected_date, device_location: deviceLocation, job_repair_no: repairNo
        }
        const changes = findChanges(hhpTask, updatePayload)
        await updateRepairTicket(hhpTask?.repairshopr_job_id, problem_type_update);
        if (Object.keys(changes).length > 0) {
            await updateTask(id, changes)
        }
        refetch();

    }
    const updateStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setUnitStatus(selected);
        const status_update = {
            ...repairshopr_payload,
            "status": selected,
        }
        const id = hhpTask?.id;
        const updated_at = datetimestamp;
        if (selected === "Resolved") {
            setCollected(true);
            setCollectedDate(datetimestamp)
        }
        if (selected === "Quote Approved") setQuoteAccepted(true)
        if (selected === "Quote Rejected") setQuoteRejected(true)
        const updatePayload = {
            // This goes to our in house db
            id, service_order_no: serviceOrder, quote_accepted, quote_rejected, unit_status: selected, updated_at, engineer, collected, collected_date, stores: issue_type, device_location: deviceLocation, job_repair_no: repairNo
        }
        const changes = findChanges(hhpTask, updatePayload)
        await updateRepairTicket(hhpTask?.repairshopr_job_id, status_update);
        if (Object.keys(changes).length > 0) {
            await updateTask(id, changes)
        }
        refetch();
    }


    const updateEngineer = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        const existingTech = engineerListFomatted.find((tech: any) => tech.value === selected);
        const userId = existingTech ? existingTech.repairshopr_id : null;

        const engineer_update = {
            ...repairshopr_payload,
            "user_id": userId,
        };

        setEngineer(selected);
        const id = hhpTask?.id;
        const updated_at = datetimestamp;
        const updatePayload = {
            // This goes to our in house db
            id, service_order_no: serviceOrder, unit_status, updated_at, engineer: selected, collected, collected_date, stores: issue_type, device_location: deviceLocation, job_repair_no: repairNo
        }

        const changes = findChanges(hhpTask, updatePayload)

        await updateRepairTicket(hhpTask?.repairshopr_job_id, engineer_update);
        if (Object.keys(changes).length > 0) {
            await updateTask(id, changes)
        }
        refetch();
    }

    const handleHHPFiles = (event: any) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files).map((file) => ({
                file,
                progress: 0,
            }));
            setHHPFiles(selectedFiles);
        }
    };

    const handleTicketRSWarranty = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        const selectedWarranty = ticket_type_id === "21877" ? type_21877?.find((x) => x.code === selected) : type_21878?.find((x) => x.code === selected);
        setRSWarranty(selected);
        setWarranty(selectedWarranty?.warranty);
    }
    // Update the parts tab
    const handlePartsSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (unit_status === 'Parts to be ordered') {
            setPartsOrdered(true);
            setPartsOrderedDate(datetimestamp)
        }
        if (unit_status === 'Parts Issued') {
            setPartsIssued(true);
            setPartsIssuedDate(datetimestamp)
        }
        if (unit_status === 'Parts Request 1st Approval') {
            setPartsRequested(true);
            setPartsRequestedDate(datetimestamp)
        }
        const id = hhpTask?.id;
        const updated_at = datetimestamp;

        const updateRSpayload = {
            ...repairshopr_payload,
            "status": part_status,
        }


        const updatePayload = {
            // This goes to our in house db
            id, updated_at, updated_by: user?.email, parts_issued, parts_issued_date, accessories_and_condition: itemCondition, parts_requested, parts_requested_date, parts_ordered, parts_order_id, parts_ordered_date, unit_status: part_status
        }

        const changes = findChanges(hhpTask, updatePayload)
        try {
            setSubmitPartsUpdateLoading(true)

            if (Object.keys(changes).length > 0) {
                if (changes) await updateRepairTicket(hhpTask?.repairshopr_job_id, updateRSpayload)
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
    const updateTicket = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        const ticket_type_id_update = {
            ...repairshopr_payload,
            "Warranty": rs_warranty,
            "Warranty ": rs_warranty,
            "ticket_type_id": ticket_type_id,
        }
        const id = hhpTask?.id;
        const updated_at = datetimestamp;
        const updatePayload = {
            // This goes to our in house db
            id, service_order_no: serviceOrder, unit_status, updated_at, engineer, warranty, rs_warranty, collected, additional_info: additionalInfo, stores: issue_type, collected_date, device_location: deviceLocation, job_repair_no: repairNo
        }
        const changes = findChanges(hhpTask, updatePayload)
        await updateRepairTicket(hhpTask?.repairshopr_job_id, ticket_type_id_update);
        if (Object.keys(changes).length > 0) {
            await updateTask(id, changes)
        }
        refetch();
        closeModal()
    }

    // submit hhp files to backend and repairshopr
    const submitHHPFiles = async () => {
        setHHPFilesUploading(true);
        try {
            const formData = new FormData();
            const ticket_number: any = hhpTask?.ticket_number;
            const task_id: any = hhpTask?.id;
            const created_at = datetimestamp;

            for (const fileObj of hhpFiles) {
                formData.append('files', fileObj.file);

                // Append ticket_number once
                formData.append('ticket_number', ticket_number);
                formData.append('task_id', task_id);
                formData.append('created_at', created_at);
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/files`, formData, {

                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                        fileObj.progress = percent;
                        setHHPFiles([...hhpFiles]);
                    },
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
                    await addRepairTicketFile(hhpTask?.repairshopr_job_id, repairshopr_payload)
                    setHHPFiles([])
                }
                // setQCFilesUrls(data?.fileUrls)
                setHHPFilesUploading(false)
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error);
            setHHPFilesUploading(false)
            if (process.env.NODE_ENV !== "production") {
                console.error("Error uploading hhp files:", error);
            }
        }
    }

    const handleComment = async () => {
        const repairshopr_job_id = hhpTask?.repairshopr_job_id;
        const id = hhpTask?.id;
        const commentPayload: RepairshorTicketComment = {
            "subject": "Update",
            "tech": user?.full_name,
            "body": '*' + comment,
            "hidden": true,
            "do_not_email": true
        }
        const created_at = datetimestamp;
        const addCommentLocallyPayload = {
            "task_id": id,
            "comment": '*' + comment,
            "created_at": created_at,
            "created_by": user?.full_name,
            "ticket_number": hhpTask?.ticket_number,
        }
        if (comment) {
            await updateRepairTicketComment(repairshopr_job_id, commentPayload)
            await addCommentLocally(addCommentLocallyPayload)
            setComment("")
            fetchComments(1) // always get first page

        };
    }


    return (
        <>
            {
                loading ? (<LoadingScreen />) : isLoggedIn ? (
                    <>
                        {/* <Sidebar /> */}
                        {/* modal for updating task */}
                        {
                            modifyTaskModalOpen &&
                            <Modal
                                isVisible={modifyTaskModalOpen}
                                onClose={closeModal}
                                title={hhpTask?.ticket_number}
                                content={
                                    <>
                                        <div className="relative">
                                            {/* so we can change warranty this on rs */}
                                            {
                                                ticket_type_id === "21877" ?
                                                    <select name='rs_warranty' className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm shadow-sm focus:outline-none cursor-pointer [&>span]:line-clamp-1" value={rs_warranty || ''}
                                                        onChange={handleTicketRSWarranty}>
                                                        <option value="">Select warranty</option>
                                                        {
                                                            type_21877?.map((x: any) => (

                                                                <option key={`${x?.id}`} value={`${x?.code}`}>{x?.warranty}</option>
                                                            ))
                                                        }
                                                    </select> : <select name='rs_warranty' className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm shadow-sm focus:outline-none cursor-pointer [&>span]:line-clamp-1" value={rs_warranty || ''}
                                                        onChange={handleTicketRSWarranty}>
                                                        <option value="">Select warranty</option>
                                                        {
                                                            type_21878?.map((x: any) => (

                                                                <option key={`${x?.id}`} value={`${x?.code}`}>{x?.warranty}</option>
                                                            ))
                                                        }
                                                    </select>
                                            }


                                            <span
                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                        <div className="mb-3">
                                            <Label htmlFor="serviceOrder">Service order</Label>
                                            <Input type="text" name="serviceOrder" value={serviceOrder || ''} onChange={(e) => setServiceOrder(e.target.value)} />
                                        </div>
                                        <div>
                                            <div>
                                                <Label htmlFor="device_location">Add location</Label>
                                                <Input type="text" name="device_location" value={deviceLocation || ''} onChange={(e) => setDeviceLocation(e.target.value)} />
                                            </div>
                                            <div>
                                                <Label htmlFor="add_job_repair_no">Add job repair no</Label>
                                                <Input type="text" name="add_job_repair_no" value={repairNo || ''} onChange={(e) => setRepairNo(e.target.value)} />
                                            </div>
                                            <div>
                                                <Label htmlFor="additionalInfo">Special requirement</Label>
                                                <Textarea value={additionalInfo || ""} onChange={(e) => setAdditionalInfo(e.target.value)} />
                                            </div>
                                        </div>
                                        <Button type="button" className='mt-2' onClick={updateTicket} disabled={updateHHPTaskLoading}>{updateHHPTaskLoading ? 'Updating' : `Update ${hhpTask?.ticket_number}`}</Button>
                                    </>
                                }
                            />
                        }

                        {hhpTaskLoading ? <p className="text-center text-gray-800">Loading ticket info please wait...</p> :


                            <main className="container mx-auto p-1">

                                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                                    <div className='py-2 md:py-3 px-1 md:px-3'>
                                        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">#{hhpTask?.ticket_number}</h1>
                                        <h3 className='scroll-m-20 text-lg font-semibold tracking-tight'>{hhpTask?.fault}</h3>
                                    </div>

                                </div>

                                <div>
                                    {/* four cards that show the process */}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 items-start">
                                    {/* column 1 */}
                                    <div className="px-3 py-2">

                                        <div className="flex flex-col gap-7">
                                            <div className="p-1">
                                                <h4 className="scroll-m-20 text-lg border-b pb-2 font-semibold tracking-tight">Ticket info</h4>

                                                <div className='flex items-center gap-4 md:justify-between my-2'>
                                                    <h5 className="font-medium text-sm text-gray-500">Status</h5>
                                                    <div className="relative">
                                                        {isLoggedIn && user?.user_role === "admin" ?
                                                            <select name='unit_status' className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm shadow-sm focus:outline-none cursor-pointer [&>span]:line-clamp-1" value={unit_status || ''}
                                                                onChange={updateStatus}>
                                                                <option disabled value={""}>Select status</option>
                                                                {
                                                                    repairshopr_statuses?.map((x) => (

                                                                        <option key={`${x?.id}`} value={`${x?._status}`}>{x?._status}</option>
                                                                    ))
                                                                }
                                                            </select> :
                                                            <select name='unit_status' className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm shadow-sm focus:outline-none cursor-pointer [&>span]:line-clamp-1" value={unit_status || ''}
                                                                onChange={updateStatus}>
                                                                <option disabled value={""}>Select status</option>
                                                                {
                                                                    repairshopr_statuses?.map((x) => (

                                                                        <option key={`${x?.id}`} value={`${x?._status}`}>{x?._status}</option>
                                                                    ))
                                                                }
                                                            </select>}
                                                        <span
                                                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-4 md:justify-between mb-2'>
                                                    <h5 className="font-medium text-sm text-gray-500">Assignee</h5>
                                                    <div className="relative">
                                                        <select name='engineer' value={engineer || ''} className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm shadow-sm focus:outline-none cursor-pointer [&>span]:line-clamp-1"
                                                            onChange={updateEngineer}>
                                                            <option disabled value={""}>Select engineer</option>
                                                            {
                                                                engineerListFomatted?.map((x) => (

                                                                    <option key={`${x?.id}`} value={`${x?.value}`}>{x?.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        <span
                                                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>

                                                </div>
                                                <div className='flex items-center gap-4 md:justify-between mb-2'>
                                                    <h5 className="font-medium text-sm text-gray-500">Type</h5>
                                                    <p className="font-medium text-sm">{issue_type}</p>
                                                </div>
                                                <div className='flex items-center gap-4 md:justify-between mb-2'>
                                                    <h5 className="font-medium text-sm text-gray-500">Due date</h5>
                                                    <p className="font-medium text-sm">{calculateDueDate(hhpTask?.date_booked)}</p>
                                                </div>
                                                <div className='flex items-center gap-4 md:justify-between mb-2'>
                                                    <h5 className="font-medium text-sm text-gray-500">Created</h5>
                                                    <p className="font-medium text-sm">{moment(hhpTask?.date_booked).format("lll")}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="scroll-m-20 text-lg border-b pb-2 font-semibold tracking-tight">Customer info</h4>

                                                {
                                                    singleCustomerByRsIdLoading ? <p className="font-medium text-sm text-gray-600">Loading customer...</p> :
                                                        <>

                                                            <div className='flex items-center gap-4 md:justify-between my-2'>
                                                                <h5 className="font-medium text-sm  text-gray-500">Customer</h5>
                                                                <Link href="/" className="text-blue-600 text-sm font-semibold">{`${singleCustomerByRsId[0]?.first_name} ${singleCustomerByRsId[0]?.last_name}`}</Link>
                                                            </div>
                                                            <div className='flex items-center gap-4 md:justify-between mb-2'>
                                                                <h5 className="font-medium text-sm  text-gray-500">Email</h5>
                                                                <Link href="/" className="text-blue-600 font-medium text-sm">{`${singleCustomerByRsId[0]?.email}`}</Link>
                                                            </div>
                                                            <div className='flex items-center gap-4 md:justify-between mb-2'>
                                                                <h5 className="font-medium text-sm  text-gray-500">Mobile</h5>
                                                                <Link href="/" className="text-blue-600 font-medium text-sm">{`${singleCustomerByRsId[0]?.phone_number}`}</Link>
                                                            </div>
                                                            <div className='flex items-center gap-4 md:justify-between mb-2'>
                                                                <h5 className="font-medium text-sm  text-gray-500">Phone</h5>
                                                                <Link href="/" className="text-blue-600 font-medium text-sm">{`${singleCustomerByRsId[0]?.home_number}`}</Link>
                                                            </div>
                                                            <div className='flex items-center gap-4 md:justify-between'>
                                                                <h5 className="font-medium text-sm  text-gray-500">Primary Address</h5>
                                                                <Link href="/" className="text-blue-600 font-medium text-sm text-end">{`${singleCustomerByRsId[0]?.address ? singleCustomerByRsId[0]?.address : ''} \n ${singleCustomerByRsId[0]?.address_2 ? singleCustomerByRsId[0]?.address_2 : ''} ${singleCustomerByRsId[0]?.city ? singleCustomerByRsId[0]?.city : ''}`}</Link>
                                                            </div>
                                                        </>
                                                }

                                            </div>
                                            <div>
                                                <div className='flex justify-between items-center border-b pb-2'>
                                                    <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Attachments</h4>
                                                    <div className='flex gap-3 items-center'>
                                                        {/* <Input type="file" accept="image/*,video/*, application/pdf" multiple className="border w-[auto]" /> */}
                                                        <div className="flex items-center">
                                                            <Button variant="outline"
                                                                type="button"
                                                                disabled={hhpFilesUploading}
                                                                onClick={() => document.getElementById('fileUpload')?.click()}
                                                            >
                                                                {hhpFilesUploading ? 'Uploading..' : 'Upload'}
                                                            </Button>
                                                            <input
                                                                disabled={hhpFilesUploading}
                                                                type="file"
                                                                id="fileUpload"
                                                                className="hidden"
                                                                multiple
                                                                onChange={handleHHPFiles}
                                                            />
                                                        </div>
                                                        {/* <Input type="file" accept="image/*,video/*, application/pdf" multiple className="my-3" onChange={handleHHPFiles} /> */}
                                                        {
                                                            hhpFiles?.length > 0 ?
                                                                <Button type="button" onClick={submitHHPFiles}>Submit</Button> : <Button variant="outline" type="button">View all</Button>
                                                        }


                                                    </div>

                                                </div>
                                                {/* files being uploaded */}
                                                <div className="mt-4">
                                                    {hhpFiles?.map((fileObj: any, index: any) => (
                                                        <div key={index} className="mb-2 border p-2">
                                                            <p className="font-medium text-sm">{fileObj.file.name}</p>
                                                            <div className="w-full bg-gray-200 rounded h-2">
                                                                <div
                                                                    className="bg-blue-500 h-2 rounded"
                                                                    style={{ width: `${fileObj.progress}%` }}
                                                                />
                                                            </div>
                                                            <p className="text-xs text-gray-500">{fileObj.progress}%</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {
                                                    attachmentsList && attachmentsList?.map((x) => (
                                                        <div key={x?.id} className='flex items-center gap-4 md:justify-between my-2 border p-2'>

                                                            <div className="flex flex-col">
                                                                <div className="flex gap-3 items-center cursor-pointer" onClick={() => openInNewTab(x?.image_url)}>
                                                                    <Image
                                                                        width={50}
                                                                        height={50}
                                                                        alt={`Ticket image`}
                                                                        src={x?.image_url}
                                                                        className='rounded-sm shadow-sm'
                                                                    />
                                                                    <div>
                                                                        <h5 className="font-medium text-sm">{hhpTask?.ticket_number}</h5>
                                                                        <p className="font-medium text-sm">{moment(x?.created_at).format("DD MMMM, YYYY HH:mm")}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button type="button"><EllipsisHorizontalIcon className="h-6 w-6 p-0 text-gray-900" /></button>
                                                        </div>
                                                    ))
                                                }

                                                {
                                                    attachmentsListLoading ? <p>Loading...</p> :
                                                        <>

                                                            {[...Array(totalAttPages)]?.map((_, index) => (
                                                                <Button
                                                                    type="button"
                                                                    key={index}
                                                                    onClick={() => handleAttachmentsPageChange(index + 1)}
                                                                    disabled={currentAttPage === index + 1}
                                                                >
                                                                    {index + 1}
                                                                </Button>
                                                            ))}
                                                        </>
                                                }

                                            </div>
                                        </div>

                                    </div>
                                    {/* column 2 */}
                                    <div className="px-3 py-2 flex flex-col gap-7">
                                        <div className="py-2 px-3">
                                            <div className='flex justify-between items-center border-b pb-2'>
                                                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Custom fields</h4>
                                                <Button variant="outline" type="button" onClick={openModal}>Edit</Button>
                                            </div>

                                            <div className="row flex items-center justify-between border-b py-2">
                                                <div>
                                                    <h5 className="font-medium text-sm text-gray-500 text-start">Service order number</h5>
                                                    <p className="font-medium text-sm text-start">{hhpTask?.service_order_no}</p>
                                                </div>
                                                <div>
                                                    <h5 className="font-medium text-sm text-gray-500  text-end">Item condition</h5>
                                                    <p className="font-medium text-sm  text-end">{hhpTask?.accessories_and_condition}</p>
                                                </div>
                                            </div>
                                            <div className="row flex items-center justify-between border-b py-2">
                                                <div>
                                                    <h5 className="font-medium text-sm text-gray-500 text-start">Requires backup</h5>
                                                    <p className="font-medium text-sm text-start">{hhpTask?.requires_backup === '69753' ? 'No' : 'Yes'}</p>
                                                </div>
                                                <div>
                                                    <h5 className="font-medium text-sm text-gray-500  text-end">Warranty</h5>
                                                    <p className="font-medium text-sm  text-end">{hhpTask?.warranty}</p>
                                                </div>
                                            </div>
                                            <div className="row flex items-center justify-between border-b py-2">
                                                <div>
                                                    <h5 className="font-medium text-sm text-gray-500 text-start">Password</h5>
                                                    <p className="font-medium text-sm"></p>
                                                </div>
                                                <div>
                                                    <h5 className="font-medium text-sm text-gray-500 text-end">Location (BIN)</h5>
                                                    <p className="font-medium text-sm text-end">{hhpTask?.device_location}</p>
                                                </div>
                                            </div>
                                            <div className="row flex items-center justify-between border-b py-2 w-full">
                                                <div className="w-full">
                                                    <h5 className="font-medium text-sm text-gray-500 text-start">Special requirement</h5>
                                                    <div className="rounded bg-gray-100 w-full h-auto p-1">
                                                        <p className="font-medium text-sm">{hhpTask?.additional_info}</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row flex items-center justify-between py-2">
                                                <div>
                                                    <h5 className="font-medium text-sm text-gray-500 text-start">Job repair number</h5>
                                                    <p className="font-medium text-sm text-start">{hhpTask?.job_repair_no}</p>
                                                </div>
                                            </div>

                                            <hr />
                                        </div>
                                        {/* Quality control */}
                                        <div className="py-2 px-3">
                                            <div className="flex justify-between items-center border-b pb-2">
                                                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Quality control</h4>
                                                <div className='flex gap-3 items-center'>
                                                    {/* <Input type="file" accept="image/*,video/*, application/pdf" multiple className="border w-[auto]" /> */}
                                                    <div className="flex items-center">
                                                        <Button variant="outline"
                                                            type="button"
                                                            disabled={qcFilesUploading}
                                                            onClick={() => document.getElementById('qcfileUpload')?.click()}
                                                        >
                                                            {qcFilesUploading ? 'Uploading..' : 'Upload'}
                                                        </Button>
                                                        <input
                                                            disabled={qcFilesUploading}
                                                            type="file"
                                                            id="qcfileUpload"
                                                            className="hidden"
                                                            multiple
                                                            onChange={handleQCFiles}
                                                        />
                                                    </div>
                                                    {/* <Input type="file" accept="image/*,video/*, application/pdf" multiple className="my-3" onChange={handleHHPFiles} /> */}
                                                    {
                                                        qcFiles?.length > 0 ?
                                                            <Button type="button" onClick={submitQCFiles}>Submit</Button> : <Button variant="outline" type="button">View all</Button>
                                                    }


                                                </div>
                                            </div>
                                            <QC qcUpdateLoading={updateHHPTaskLoading} qc_fail_reasonProp={qc_comment} setQCFailReasonProp={(e: React.SyntheticEvent | any) => setQCFailReason(e.target.value)} qc_completeProp={qc_complete} setQCCompleteProp={setQCComplete} setQCCompleteDateProp={setQCCompleteDate} setUnitCompleteDateProp={setUnitCompleteDate} setUnitCompleteProp={setUnitComplete} submitQC={handleQCSubmit} />
                                        </div>
                                        {/* Parts */}
                                        <div className="py-2 px-3">
                                            <div className="flex justify-between items-center border-b pb-2">
                                                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Parts</h4>

                                            </div>
                                            <Parts partsIssuedText={partsIssuedText} setIssuedExtraText={setIssuedExtraText} issuedPartsLoading={issuedPartsLoading} submitPartsIssued={addPartIssuedToRepairshoprComment} onSelectionChange={setSelectedIssuedParts} in_stock={part_in_stock} submitPartOrderId={submitPartOrderId} submitPartOrderIdLoading={submitPartOrderIdLoading} parts_order_id={parts_order_id} setPartsOrderId={setPartsOrderId} stored_parts_order_id={hhpTask?.parts_order_id} partsExtraText={partsExtraText} setPartsExtraText={setPartsExtraText} compensation={compensation} setCompensation={(e) => setCompensation(e)} deletePartLoading={deletePartLoading} part_data={taskPartsList} parts_requestedProp={parts_requested} setPartsRequestedProp={(e) => setPartsRequested(e)} setPartsRequestedDateProp={setPartsRequestedDate} parts_orderedProp={parts_ordered} setPartsOrderedProp={(e) => setPartsOrdered(e)} parts_issuedProp={parts_issued} setPartsIssuedProp={(e) => setPartsIssued(e)} setPartsIssuedDateProp={setPartsIssuedDate} setPartsOrderedDateProp={setPartsOrderedDate} submitPartsUpdate={handlePartsSubmit} search_part={search_part} setSearchPart={setSearchPart} part_desc={part_desc} setPartDesc={setPartDesc} part_quantity={part_quantity} setPartQuantity={setPartQuantity} addPart={addPart} addPartLoading={addPartLoading} submitPartsUpdateLoading={submitPartsUpdateLoading} errors={addPartErrors} handleDelete={handleDeletePart} addPartOnRepairshoprLoading={addPartOnRepairshoprLoading} addPartOnRepairshopr={addPartListToRepairshoprComment} imei={hhpTask?.imei} serial_number={hhpTask?.serial_number} model={hhpTask?.model} part_status={part_status} setPartStatus={setPartStatus} />
                                        </div>
                                        {/* assets */}
                                        {/* name should be auto filled by model istead of user (just to appease the rs api) */}
                                        <div className="py-2 px-3">
                                            <div className="flex justify-between items-center border-b pb-2">
                                                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Product information (Assets)</h4>
                                                <div className="flex gap-3">
                                                    <Button variant="outline" type="button" disabled>New</Button>
                                                    <Button variant="outline" type="button" disabled>Add existing</Button>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-4 md:justify-between my-2'>
                                                <div className='flex flex-col'>
                                                    <h5 className="font-medium text-sm text-gray-500">Model number</h5>
                                                    <Link href="/" className="font-medium text-sm">{hhpTask?.model}</Link>
                                                    <Link href="/" className="font-medium text-sm text-gray-500">{hhpTask?.phone_name}</Link>
                                                </div>
                                                <div>
                                                    <h5 className="font-medium text-sm text-gray-500">IMEI</h5>
                                                    <p className="font-medium text-sm">{hhpTask?.imei}</p>
                                                </div>
                                                <div>
                                                    <h5 className="font-medium text-sm text-gray-500">Serial number</h5>
                                                    <p className="font-medium text-sm">{hhpTask?.serial_number}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-2 px-3">
                                            <div className="border-b pb-2">
                                                <h4 className="scroll-m-20 text-lg  font-semibold tracking-tight">Ticket comments (communication)</h4>
                                            </div>
                                            {/* textarea */}
                                            {/* <RichTextEditor content={newComment} onChange={setNewComment} /> */}
                                            <Textarea value={comment} onChange={(e) => setComment(e.target.value)} className='my-2 outline-none focus:outline-none focus:border-none focus-visible:outline-none focus-visible:border-none' name="comment" placeholder="Add comment..." cols={3} />
                                            <Button type="button" disabled={addCommentLoading} onClick={handleComment}>{addCommentLoading ? 'Loading...' : 'Submit comment'}</Button>
                                            <div>
                                                <div className='w-full my-2'>
                                                    <div>
                                                        {commentsList?.map((comment: any) => (
                                                            <div key={comment.id} className="border border-gray-200 rounded p-2 mb-2">
                                                                <div className='flex justify-between items-center'>
                                                                    <h5 className="font-medium text-sm  text-gray-500">{comment?.created_by}</h5>
                                                                    <h4></h4>
                                                                    <h5 className="font-medium text-sm  text-gray-500">{moment(comment?.created_at).format('D MMMM, YYYY HH:mm')}</h5>
                                                                </div>
                                                                <p className="leading-4 my-2" dangerouslySetInnerHTML={{
                                                                    __html: comment?.comment?.replace(/\n/g, "<br/>") // Handle line breaks
                                                                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")


                                                                }} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>


                                                <div>
                                                    {
                                                        commentsListLoading ? <p>Loading...</p> :
                                                            <>

                                                                {[...Array(totalPages)]?.map((_, index) => (
                                                                    <Button
                                                                        type="button"
                                                                        key={index}
                                                                        onClick={() => handlePageChange(index + 1)}
                                                                        disabled={currentPage === index + 1}
                                                                    >
                                                                        {index + 1}
                                                                    </Button>
                                                                ))}
                                                            </>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <BackToTop />
                            </main>

                        }


                    </>
                ) : <NotLoggedInScreen />
            }


        </>
    )
}

export default ViewHHPTaskScreen