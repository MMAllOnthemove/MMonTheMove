"use client"
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useAddDTVHATask from '@/hooks/useAddDTVHATask';
import useCreateTicket from '@/hooks/useCreateTicket';
import useUserLoggedIn from '@/hooks/useGetUser';
import { assetTypesDTV } from '@/lib/asset_types';
import { datetimestamp } from '@/lib/date_formats';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AttachmentsModal from '../attachments_modal/page';
import useCheckWarranty from '@/hooks/useCheckDTVHAWarranty';

const DTVHA = () => {
    const { addTask } = useAddDTVHATask()
    const { user } = useUserLoggedIn()
    const { addTicket, createTicketLoading } = useCreateTicket()

    // This is for repairshopr
    const [fault, setFault] = useState("")
    const [itemCondition, setItemCondition] = useState("");
    const [specialRequirement, setSpecialRequirement] = useState("")
    const [customerId, setCustomerId] = useState<any>("")
    const [job_repair_no, setJobRepairNo] = useState("")
    const [ticket_number, setTicketNumber] = useState<string | number>("")

    const [serialNumber, setSerialNumber] = useState("")
    const [modelNumber, setModelNumber] = useState("")

    const { warranty, warrantyCode, ticketTypeId, localWarranty } = useCheckWarranty(modelNumber, serialNumber)

    const [issue_type, setIssueType] = useState("");

    const [openAttachmentsModal, setOpenAttachmentsModal] = useState(false);

    const [serviceOrderNumber, setServiceOrder] = useState("")
    // Asset id
    const [assetId, setAssetId] = useState('')
    // these will be send to our db as soon as a ticket is booked
    // some of the values will be stored in state from the result
    const [repairshopr_job_id, setepairshoprJobId] = useState("")
    useEffect(() => {
        const loadCustomerInfo = () => {
            if (typeof window !== undefined && window.localStorage) {
                const parsedData = JSON.parse(localStorage.getItem('custInfo') || '""');
                if (parsedData !== null) {
                    setCustomerId(parsedData?.customerId)

                }
            }
        };
        loadCustomerInfo()
    }, [])

    useEffect(() => {
        const loadCustomerAssetInfo = () => {
            if (typeof window !== undefined && window.localStorage) {
                const parsedData = JSON.parse(localStorage.getItem('assetInfo') || '""');
                if (parsedData !== null) {
                    setAssetId(parsedData?.asset_id)
                    setSerialNumber(parsedData?.asset_serial)
                    setModelNumber(parsedData?.model_number)
                }
            }
        };
        loadCustomerAssetInfo()
    }, [])





    const [ticketFiles, setTicketFiles] = useState([]);
    const [ticketFilesUploading, setTicketFilesUploading] = useState(false);

    const handleTicketFiles = (event: any) => {
        setTicketFiles(event.target.files);
    };

    const sendTicketAttachments = async (ticketNumber: string | number) => {
        setTicketFilesUploading(true);
        try {
            const formData = new FormData();

            Array.from(ticketFiles).forEach((file) => {
                formData.append('files', file);
            });
            // Append ticket_number once
            formData.append('ticket_number', `${ticketNumber}`);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/dtv_ha/files/ticket_attachments`, formData, {
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
                // send them to repairshopr
                await axios.post(`${process.env.NEXT_PUBLIC_REPAIRSHOPR_ATTACHMENTS}/${repairshopr_job_id}/attach_file_url`, repairshopr_payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`
                    }
                })
                setTicketFiles(data?.fileUrls)
            }
            // setQCFilesUrls(data?.fileUrls)
            setTicketFilesUploading(false)
        } catch (error) {
            console.error("add ticket attachments error", error)
        }
    }

    const createTicket = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        const payload = {
            "customer_id": customerId,
            "problem_type": `${issue_type}`,
            "subject": `${fault}`,
            "status": "New", //  will always be 'New' for a recently created ticket
            "ticket_type_id": `${ticketTypeId}`,
            "user_id": `${user?.repairshopr_id}`,
            "properties": {
                "Service Order No.": `${serviceOrderNumber}`,
                "Service Order No. ": `${serviceOrderNumber}`,
                "Item Condition ": `${itemCondition}`,
                "Item Condition": `${itemCondition}`,
                "Backup Requires": `69753`, // No
                "Backup Requires ": `69753`,// No
                "Warranty ": `${warrantyCode}`,
                "Warranty": `${warrantyCode}`,
                "IMEI": "",
                "Job Repair No.": `${job_repair_no}`,
                "Job Repair No.:": `${job_repair_no}`,
                "Special Requirement": `${specialRequirement}`,
                "Special Requirement ": `${specialRequirement}`,
                "Password": ""
            },
            "asset_ids": assetId,
            "comments_attributes": [
                {
                    "subject": "Initial Issue",
                    "body": `${fault}`,
                    "hidden": false,
                    "do_not_email": false,
                    "tech": `${user?.full_name}`
                }
            ]
        }

        const data = await addTicket(payload)
        await sendTicketDataToOurDB(data?.ticket?.number, data?.ticket?.id)
        setTicketNumber(data?.ticket?.number)
        setepairshoprJobId(data?.ticket?.id)

        setOpenAttachmentsModal(true)
        if (typeof window !== 'undefined' && window.localStorage) localStorage.clear();


    }
    const sendTicketDataToOurDB = async (ticketNumber: string | number, ticketId: string | number) => {
        const created_at = datetimestamp;
        const date_booked = datetimestamp; // seeing as the task will be added same time
        // initially a unit does not have a service_order_no
        // omit the engineer until unit has been assigned
        // turn off the validation check for engineer
        const department = "DTV/HA" // obviously
        const repeat_repair = "No"

        switch (issue_type) {
            case "Home Appliance":
                setIssueType("Carry In")
                break;
            case "TV":
                setIssueType("Carry In")
                break;
            case "Audio":
                setIssueType("Carry In")
                break;
            case "Monitor":
                setIssueType("Carry In")
                break;
            case "Home Appliance (DSV)":
                setIssueType("Home Appliance (DSV)")
                break;
            case "DTV(DSV)":
                setIssueType("DTV(DSV)")
            default:
                setIssueType("Carry In")
        }
        const payload = {
            "service_order_no": serviceOrderNumber,
            "date_booked": date_booked,
            "model": modelNumber,
            "warranty": localWarranty,
            "fault": fault,
            "imei": serialNumber, // since home appliances have no imei number, we will use the serial number as imei
            "serial_number": serialNumber,
            "status": "New",
            "ticket_number": `${ticketNumber}`,
            "department": department,
            "job_added_by": user?.email,
            "stores": issue_type,
            "repairshopr_job_id": `${ticketId}`,
            "repeat_repair": repeat_repair,
            "created_at": created_at
        }
        await addTask(payload)

    }



    return (
        <>

            {
                openAttachmentsModal &&
                <AttachmentsModal openModal={openAttachmentsModal} setOpenModal={setOpenAttachmentsModal} ticketFilesUploading={ticketFilesUploading} handleTicketFiles={handleTicketFiles} sendTicketAttachments={async () => await sendTicketAttachments(ticket_number)} />

            }
            <form onSubmit={createTicket}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">

                    <div>
                        <Label htmlFor='fault' className='sr-only'>Fault description</Label>
                        <Input type="text" name='fault' id='fault' placeholder='Fault description' value={fault || ""} onChange={(e) => setFault(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='serviceOrderNumber' className='sr-only'>Service order number</Label>
                        <Input type="number" name='serviceOrderNumber' id='serviceOrderNumber' placeholder='Service order number' value={serviceOrderNumber || ""} onChange={(e) => setServiceOrder(e.target.value)} />
                    </div>
                    <div>
                        <Select
                            value={issue_type || ""}
                            onValueChange={(e) => setIssueType(e)}
                            name='issue_type'
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Issue type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Issue types</SelectLabel>

                                    {assetTypesDTV.map((x: any) =>
                                        (<SelectItem key={x.value} value={`${x.value}`}>{x?.label}</SelectItem>))
                                    }
                                </SelectGroup>

                            </SelectContent>
                        </Select>
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-2">
                    <div>
                        <Label htmlFor='job_repair_no' className='sr-only'>Job repair no</Label>
                        <Input type="text" name='job_repair_no' id='job_repair_no' placeholder='Job repair no' value={job_repair_no} onChange={(e) => setJobRepairNo(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='itemCondition' className='sr-only'>Item condition</Label>
                        <Input type="text" name='itemCondition' id='itemCondition' placeholder='Item condition' value={itemCondition} onChange={(e) => setItemCondition(e.target.value)} />
                    </div>
                </div>

                <div className="mb-2">
                    <Label htmlFor='specialRequirement' className='sr-only'>Special requirement</Label>
                    <Textarea placeholder='Special requirement' value={specialRequirement} onChange={(e) => setSpecialRequirement(e.target.value)}></Textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <div>
                        <Label htmlFor='model' className='sr-only'>Model</Label>
                        <Input type="text" value={modelNumber || ""} placeholder='Model number' onChange={(e) => setModelNumber(e.target.value)} name='model' id='model' />
                    </div>
                    <div>
                        <Label htmlFor='serialNumber' className='sr-only'>Serial number</Label>
                        <Input type="text" value={serialNumber || ""} placeholder='Serial number' onChange={(e) => setSerialNumber(e.target.value)} name='serialNumber' id='serialNumber' />
                    </div>
                </div>
                {warranty ? <p className="text-lg font-semibold text-sky-700 md:text-xl text-center my-3">Unit is {warranty === "LP" ? "IW" : warranty}</p> : ""}

                <Button type="submit" disabled={createTicketLoading}>
                    {createTicketLoading ? 'Creating...' : 'Create ticket'}
                </Button>
            </form>



        </>
    )
}

export default DTVHA