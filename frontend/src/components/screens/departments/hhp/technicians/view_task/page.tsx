"use client"

import Modal from '@/components/modal/page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import useRepairshoprComment from '@/hooks/useRepairshoprComment';
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket';
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
import axios from 'axios';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

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
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { hhpTask, refetch } = useFetchHHPTaskById(id ? decodeURIComponent(Array.isArray(id) ? id[0] : id) : null)
    const { commentsList, commentsListLoading, totalPages, currentPage, fetchComments } = useGetComments(id)
    const {
        attachmentsList,
        attachmentsListLoading,
        currentAttPage,
        totalAttPages,
        fetchAttachments,
    } = useGetAttachments(id)
    const { updateHHPTaskLoading, updateTask } = useHHPTasksCrud()
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
    const [hhpFiles, setHHPFiles] = useState([]);
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
    const [collected, setCollected] = useState<string | undefined | null | any>(false)
    const [collected_date, setCollectedDate] = useState<string | null>("")
    const [warranty, setWarranty] = useState<string | null | undefined>("")
    const [ticket_type_id, setTicketTypeId] = useState<string | number | undefined | null | any>("")

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



    const hhp_issue_types = [...assetTypes].filter(asset => asset.value.includes("HHP"));

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
        const updatePayload = {
            // This goes to our in house db
            id, service_order_no: serviceOrder, unit_status: selected, updated_at, engineer, collected, collected_date, stores: issue_type, device_location: deviceLocation, job_repair_no: repairNo
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
        setHHPFiles(event.target.files);
    };

    const handleTicketRSWarranty = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        const selectedWarranty = ticket_type_id === "21877" ? type_21877?.find((x) => x.code === selected) : type_21878?.find((x) => x.code === selected);
        setRSWarranty(selected);
        setWarranty(selectedWarranty?.warranty);
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
            id, service_order_no: serviceOrder, unit_status, updated_at, engineer, warranty, rs_warranty, collected, stores: issue_type, collected_date, device_location: deviceLocation, job_repair_no: repairNo
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
                await addRepairTicketFile(hhpTask?.repairshopr_job_id, repairshopr_payload)
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
                        <Sidebar />
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
                                                <Input type="text" name="device_location" value={additionalInfo || ''} onChange={(e) => setDeviceLocation(e.target.value)} />
                                            </div>
                                            <div>
                                                <Label htmlFor="add_job_repair_no">Add job repair no</Label>
                                                <Input type="text" name="add_job_repair_no" value={repairNo || ''} onChange={(e) => setRepairNo(e.target.value)} />
                                            </div>

                                        </div>
                                        <Button type="button" className='mt-2' onClick={updateTicket} disabled={updateHHPTaskLoading}>{updateHHPTaskLoading ? 'Updating' : `Update ${hhpTask?.ticket_number}`}</Button>
                                    </>
                                }
                            />
                        }
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
                                                                repairshopr_statuses_techs?.map((x) => (

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
                                                <Select
                                                    value={issue_type || ''}
                                                    onValueChange={updateIssueType}
                                                    name='issue_type'
                                                >
                                                    <SelectTrigger className="w-[auto] font-medium">
                                                        <SelectValue placeholder="Issue type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Issue types</SelectLabel>

                                                            {hhp_issue_types.map((x: any) =>
                                                                (<SelectItem key={x.value} value={`${x.value}`}>{x?.label}</SelectItem>))
                                                            }
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
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
                                            {/* hhpTask && hhpTask?.images?.map((x)  */}

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
                                                                    <h5 className="font-medium text-sm">124724</h5>
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
                                            <div>
                                                <h5 className="font-medium text-sm text-gray-500">Model number</h5>
                                                <Link href="/" className="font-medium text-sm">{hhpTask?.model}</Link>
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
                                        <Button type="button" disabled={addCommentLoading} onClick={handleComment}>{addCommentLoading ? 'Loading...' : 'Comment'}</Button>
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

                        </main>

                    </>
                ) : <NotLoggedInScreen />
            }


        </>
    )
}

export default ViewHHPTaskScreen