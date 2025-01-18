"use client"

import Modal from '@/components/modal/page';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
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
import useFetchEngineer from '@/hooks/useFetchEngineers';
import useFetchHHPTaskById from '@/hooks/useFetchHHPtaskById';
import useGetCustomerLocallyByRSId from '@/hooks/useGetCustomerLocallyByRSId';
import useGetComments from '@/hooks/useGetLocalComments';
import useUserLoggedIn from '@/hooks/useGetUser';
import { useHHPTasksCrud } from '@/hooks/useHHPTasksCrud';
import { assetTypes } from '@/lib/asset_types';
import calculateDueDate from '@/lib/calculate_due_date';
import repairshopr_statuses from '@/lib/repairshopr_status';
import { ModifyTaskModalTechnicians } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronUpDownIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import TasksUpdate from '../tasks_update/page';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { datetimestamp } from '@/lib/date_formats';
import findChanges from '@/lib/find_changes';
import useRepairshoprComment from '@/hooks/useRepairshoprComment';
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket';

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
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { hhpTask, refetch } = useFetchHHPTaskById(id ? decodeURIComponent(Array.isArray(id) ? id[0] : id) : null)
    const { commentsList, commentsListLoading, totalPages, currentPage, fetchComments } = useGetComments(id)
    const { hhpTasks, fetchTasks, updateHHPTaskLoading, updateTask, deleteTask } = useHHPTasksCrud()
    const { updateRepairTicket } = useRepairshoprTicket()
    const { updateRepairTicketComment } = useRepairshoprComment()
    const handlePageChange = (page: number) => {
        fetchComments(page);
    };

    const [hhpFiles, setHHPFiles] = useState([]);
    const [hhpFilesUploading, setHHPFilesUploading] = useState(false);
    const [engineer, setEngineer] = useState<string | undefined>("")
    const [engineersComboBox, setEngineerComboBox] = useState(false)
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


    const handleHHPFiles = (event: any) => {
        setHHPFiles(event.target.files);
    };
    const submitHHPFiles = async () => { }
    const hhp_issue_types = [...assetTypes].filter(asset => asset.value.includes("HHP"));

    useEffect(() => {
        if (hhpTask) {
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

    // in case user does not select a new techincian, attach the user id to the current matching technician
    useEffect(() => {
        if (engineer && engineerListFomatted) {
            const existingTech = engineerListFomatted.find(
                (tech: any) => tech.value === engineer
            );
            if (existingTech) {
                setUserId(existingTech.repairshopr_id);
            }
        }
    }, [engineer, engineerListFomatted]);


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

    const updateAll = async () => { }
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
            id, service_order_no: serviceOrder, unit_status: selected, updated_at, engineer, collected, collected_date, device_location: deviceLocation, job_repair_no: repairNo
        }
        const changes = findChanges(hhpTask, updatePayload)
        await updateRepairTicket(hhpTask?.repairshopr_job_id, status_update);
        if (Object.keys(changes).length > 0) {
            await updateTask(id, changes)
        }
        refetch();
    }
    const updateEngineer = async () => {
        const engineer_update = {
            ...repairshopr_payload,
            "user_id": repairshopr_id,
        }
        const id = hhpTask?.id;
        const updated_at = datetimestamp;
        const updatePayload = {
            // This goes to our in house db
            id, service_order_no: serviceOrder, unit_status, updated_at, engineer, collected, collected_date, device_location: deviceLocation, job_repair_no: repairNo
        }
        const changes = findChanges(hhpTask, updatePayload)
        await updateRepairTicket(hhpTask?.repairshopr_job_id, engineer_update);
        if (Object.keys(changes).length > 0) {
            await updateTask(id, changes)
        }
        refetch();
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
                                        <Button type="button" className='mt-2'>Update {hhpTask?.ticket_number}</Button>
                                    </>
                                }
                            />
                        }
                        <main className="container mx-auto p-1">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                                <div className='py-3'>
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
                                                    <select name='unit_status' className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm shadow-sm focus:outline-none cursor-pointer [&>span]:line-clamp-1" value={unit_status || ''}
                                                        onChange={updateStatus}>
                                                        <option disabled value={""}>Select status</option>
                                                        {
                                                            repairshopr_statuses?.map((x) => (

                                                                <option key={`${x?.id}`} value={`${x?._status}`}>{x?._status}</option>
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
                                                <h5 className="font-medium text-sm text-gray-500">Assignee</h5>
                                                <Popover open={engineersComboBox} onOpenChange={setEngineerComboBox}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={engineersComboBox}
                                                            className="w-[auto] justify-between font-medium"
                                                        >
                                                            {engineer
                                                                ? engineerListFomatted?.find((framework) => framework.value === engineer)?.label
                                                                : "Select engineer..."}
                                                            <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search engineer..." className="h-9" />
                                                            <CommandList>
                                                                <CommandEmpty>No engineer found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {engineerListFomatted?.map((framework) => (
                                                                        <CommandItem

                                                                            key={framework.value}
                                                                            defaultValue={framework.value || ""}
                                                                            onSelect={async (currentValue) => {
                                                                                setEngineer(currentValue === engineer ? "" : currentValue)
                                                                                setUserId(framework?.repairshopr_id); // Store the corresponding repairshopr ID
                                                                                await updateEngineer()
                                                                                setEngineerComboBox(false)
                                                                            }}
                                                                        >
                                                                            {framework.label}
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    "ml-auto h-4 w-4",
                                                                                    engineer === framework.value ? "opacity-100" : "opacity-0"
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <div className='flex items-center gap-4 md:justify-between mb-2'>
                                                <h5 className="font-medium text-sm text-gray-500">Type</h5>
                                                <Select
                                                    value={issue_type || ''}
                                                    onValueChange={(e) => setIssueType(e)}
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
                                            {/* <div className='flex items-center gap-4 md:justify-between mb-2'>
                                                <h5 className="font-medium text-sm text-gray-500">Invoices</h5>
                                                <p className="font-medium text-sm">#84953</p>
                                            </div>
                                            <div className='flex items-center gap-4 md:justify-between mb-2'>
                                                <h5 className="font-medium text-sm text-gray-500">Billing Status</h5>
                                                <p className="font-medium text-sm">Invoiced</p>
                                            </div>
                                            <div className='flex items-center gap-4 md:justify-between mb-2'>
                                                <h5 className="font-medium text-sm text-gray-500">Estimates</h5>
                                                <p className="font-medium text-sm">#84953</p>
                                            </div> */}
                                        </div>
                                        <div>
                                            <h4 className="scroll-m-20 text-lg border-b pb-2 font-semibold tracking-tight">Customer info</h4>

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
                                                <Link href="/" className="text-blue-600 font-medium text-sm">{`${singleCustomerByRsId[0]?.address ? singleCustomerByRsId[0]?.address : ''} \n ${singleCustomerByRsId[0]?.address_2 ? singleCustomerByRsId[0]?.address_2 : ''} ${singleCustomerByRsId[0]?.city ? singleCustomerByRsId[0]?.city : ''}`}</Link>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='flex justify-between items-center border-b pb-2'>
                                                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Attachments</h4>
                                                <div className='flex gap-3 items-center'>
                                                    {/* <Input type="file" accept="image/*,video/*, application/pdf" multiple className="border w-[auto]" /> */}
                                                    <div className="flex items-center">
                                                        <Button variant="outline"
                                                            type="button"
                                                            onClick={() => document.getElementById('fileUpload')?.click()}
                                                        >
                                                            Upload
                                                        </Button>
                                                        <input
                                                            type="file"
                                                            id="fileUpload"
                                                            className="hidden"
                                                            multiple
                                                            onChange={handleHHPFiles}
                                                        />
                                                    </div>

                                                    <Button variant="outline" type="button" >View all</Button>
                                                </div>
                                            </div>


                                            <div className='flex items-center gap-4 md:justify-between my-2'>
                                                <div className="flex gap-3 items-center">
                                                    <Image
                                                        alt={`Test image`}
                                                        src={"/samsung_test_phone.jpg"}
                                                        width={70}
                                                        height={70}
                                                        className='rounded-sm shadow-sm'
                                                    />
                                                    <div>
                                                        <h5 className="font-medium text-sm">124724</h5>
                                                        <p className="font-medium text-sm">08 January, 2025 17:01</p>
                                                    </div>
                                                </div>
                                                <button type="button"><EllipsisHorizontalIcon className="h-6 w-6 p-0 text-gray-900" /></button>
                                            </div>



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
                                        <Textarea className='my-2 outline-none focus:outline-none focus:border-none focus-visible:outline-none focus-visible:border-none' name="comment" placeholder="Add comment..." cols={3} value={comment} onChange={(e) => setComment(e.target.value)} />
                                        <Button>Comment</Button>
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