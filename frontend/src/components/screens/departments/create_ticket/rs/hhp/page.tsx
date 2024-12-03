"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { assetTypes } from '@/lib/asset_types';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import toast from 'react-hot-toast';
import { datetimestamp } from '@/lib/date_formats';
import { TUser } from '@/lib/types';
import useAddHHPTask from '@/hooks/useAddHHPTask';
import useUserLoggedIn from '@/hooks/useGetUser';
const HHP = () => {
    const { addTask, addHHPTaskLoading, addHHPTaskErrors } = useAddHHPTask();
    const { user } = useUserLoggedIn()

    // This is for repairshopr
    const [ticketTypeId, setTicketTypeId] = useState<number>();
    const [warrantyCode, setWarrantyCode] = useState<number>();
    const [fault, setFault] = useState("")
    const [itemCondition, setItemCondition] = useState("");
    const [specialRequirement, setSpecialRequirement] = useState("")
    const [password, setPassword] = useState("")
    const [customerId, setCustomerId] = useState<any>("")
    const [requires_backup, setRequiresBackup] = useState("")
    const [job_repair_no, setJobRepairNo] = useState("")
    const [ticket_number, setTicketNumber] = useState<string | number>("")

    const [IMEI, setIMEI] = useState("");
    const [serialNumber, setSerialNumber] = useState("")
    const [modelNumber, setModelNumber] = useState("")
    const [warranty, setWarranty] = useState("");
    const [issue_type, setIssueType] = useState("");

    const [createTicketLoading, setCreateTicketLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [openAttachmentsModal, setOpenAttachmentsModal] = useState(false);
    // Asset id
    const [assetId, setAssetId] = useState('')
    // these will be send to our db as soon as a ticket is booked
    // some of the values will be stored in state from the result
    const [localWarranty, setLocalWarranty] = useState("") // this is just the warranty just a different variable (I am out of variable names, lol)
    const [ticket_status, setTicketStatus] = useState("")
    const [repairshopr_job_id, setepairshoprJobId] = useState("")
    useEffect(() => {
        const loadCustomerInfo = () => {
            if (typeof window !== undefined && window.localStorage) {
                const parsedData = JSON.parse(localStorage.getItem('custInfo') || '""');
                // console.log(parsedData)
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
                // console.log(parsedData)
                if (parsedData !== null) {
                    setAssetId(parsedData?.asset_id)
                    setIMEI(parsedData?.asset_imei)
                    setSerialNumber(parsedData?.asset_serial)
                    setModelNumber(parsedData?.model_number)
                }
            }
        };
        loadCustomerAssetInfo()
    }, [])



    useEffect(() => {
        const checkWarranty = async () => {
            const generateTimeStampForPacCode = moment(new Date(
                Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
            )
                .toISOString()
                .replace("T", " ")
                .replace("Z", "")).format("YYMMDDhhmmss");



            // console.log(formattedDate)
            const values = {
                "IsCommonHeader": {
                    "Company": `${process.env.NEXT_PUBLIC_COMPANY}`,
                    "AscCode": `${process.env.NEXT_PUBLIC_ASC_CODE}`,
                    "Lang": `${process.env.NEXT_PUBLIC_LANG}`,
                    "Country": `${process.env.NEXT_PUBLIC_COUNTRY}`,
                    "Pac": `9999999${generateTimeStampForPacCode}`
                },
                "IvModel": `${modelNumber}`,
                "IvPurchaseDate": ``,
                "IvSerialNo": `${serialNumber}`,
                "IvIMEI": `${IMEI}`

            }


            // console.log("values", values)
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_IPAAS_API_CHECK_WARRANTY}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`
                },

            })
            try {
                if (data) {
                    const warranty_type = data?.Return?.EvWtyType
                    setWarranty(warranty_type);
                    if (warranty_type === "LP") {
                        setWarrantyCode(69476)
                        setTicketTypeId(21877);
                        setLocalWarranty("IW")
                    } else {
                        setWarrantyCode(69477)
                        setTicketTypeId(21878);
                        setLocalWarranty("OOW")
                    }
                }
            } catch (error) {
                console.log("check warranty error", error)
            }


        }
        if (IMEI && modelNumber && serialNumber) checkWarranty();
    }, [IMEI, modelNumber, serialNumber, warranty]);

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
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/files/ticket_attachments`, formData, {
                withCredentials: true,
            })

            if (data) {
                toast.success(`${data?.message}`)
                console.log("file urls frontend", data)
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
            "problem_type": `${issue_type}`, // Will aways be HHP for handheld devices, no need to choose
            "subject": `${fault}`,
            "status": "New", //  will always be 'New' for a recently created ticket
            "ticket_type_id": `${ticketTypeId}`,
            "user_id": `${user?.repairshopr_id}`,
            "properties": {
                "Service Order No.": "",
                "Service Order No. ": "",
                "Item Condition ": `${itemCondition}`,
                "Item Condition": `${itemCondition}`,
                "Backup Requires": `${requires_backup}`,
                "Backup Requires ": `${requires_backup}`,
                "Warranty ": `${warrantyCode}`,
                "Warranty": `${warrantyCode}`,
                "IMEI": `${IMEI}`,
                "Job Repair No.": `${job_repair_no}`,
                "Job Repair No.:": `${job_repair_no}`,
                "Special Requirement": `${specialRequirement}`,
                "Special Requirement ": `${specialRequirement}`,
                "Password": `${password}`
            },
            "asset_ids": assetId
        }
        console.log("createTicket", payload)
        setCreateTicketLoading(true)

        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_REPAIRSHOPR_CREATE_TICKET}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`
                }
            })
            console.log("ticket created data", data)
            await sendTicketDataToOurDB(data?.ticket?.number, data?.ticket?.id)

            toast.success(`Ticket created, Here is your ticket: ${data?.ticket?.number}`, {
                duration: 8000,

            });

            setTicketNumber(data?.ticket?.number)
            setepairshoprJobId(data?.ticket?.id)

            setOpenAttachmentsModal(true)
            if (typeof window !== 'undefined' && window.localStorage) localStorage.clear();

        } catch (error: any) {
            toast.error(`${error?.response?.error}`)
        } finally {
            setCreateTicketLoading(false)
        }
    }
    const sendTicketDataToOurDB = async (ticketNumber: string | number, ticketId: string | number) => {
        const created_at = datetimestamp;
        const date_booked = datetimestamp; // seeing as the task will be added same time
        // initially a unit does not have a service_order_no
        // omit the engineer until unit has been assigned
        // turn off the validation check for engineer
        const department = "HHP" // obviously
        const repeat_repair = "No"

        switch (issue_type) {
            case "HHP(Mobile Phone/Tablets)":
                setIssueType("Carry In")
                break;

            case "HHP (DSV)":
                setIssueType("DSV")
                break;

            case "HHP (Robtronics)":
                setIssueType("Robtronics")
                break;
            case "Dunoworx (HHP)":
                setIssueType("Dunoworks")
                break;
            default:
                setIssueType("Carry In")
        }
        const payload = {
            "service_order_no": "",
            "date_booked": date_booked,
            "model": modelNumber,
            "warranty": localWarranty,
            "fault": fault,
            "imei": IMEI,
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
        console.log("our db create payload", payload)
        await addTask(payload)

    }


    const hhp_issue_types = assetTypes.filter(asset => asset.value.includes("HHP"));
    return (
        <>
            {
                openModal &&
                <Dialog open={openModal} onOpenChange={() => setOpenModal(false)} >
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add image and circle scratches</DialogTitle>
                            <DialogDescription>

                            </DialogDescription>
                        </DialogHeader>
                        <div className="tldraw__editor h-[400px]" style={{ position: 'fixed', inset: 0 }}>
                            <Tldraw persistenceKey="example" />
                        </div>

                    </DialogContent>
                </Dialog>
            }
            {
                openAttachmentsModal &&
                <Dialog open={openAttachmentsModal} onOpenChange={() => setOpenAttachmentsModal(false)} >
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add ticket attachments</DialogTitle>
                            <DialogDescription>

                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center">
                            <Input type="file" multiple className="my-3" onChange={handleTicketFiles} />
                            <Button className="ml-3" disabled={ticketFilesUploading} onClick={async () => await sendTicketAttachments(ticket_number)}>{ticketFilesUploading ? 'Uploading' : 'Attach'}</Button>
                        </div>

                    </DialogContent>
                </Dialog>
            }
            <form onSubmit={createTicket}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                    <div>
                        <Label htmlFor='fault' className='sr-only'>Fault description</Label>
                        <Input type="text" name='fault' id='fault' placeholder='Fault description' value={fault || ""} onChange={(e) => setFault(e.target.value)} />
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

                                    {hhp_issue_types.map((x: any) =>
                                        (<SelectItem key={x.value} value={`${x.value}`}>{x?.label}</SelectItem>))
                                    }
                                </SelectGroup>

                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor='itemCondition' className='sr-only'>Item condition</Label>
                        <Input type="text" name='itemCondition' id='itemCondition' placeholder='Item condition' value={itemCondition} onChange={(e) => setItemCondition(e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                    <div>
                        <Label htmlFor='job_repair_no' className='sr-only'>Job repair no</Label>
                        <Input type="text" name='job_repair_no' id='job_repair_no' placeholder='Job repair no' value={job_repair_no} onChange={(e) => setJobRepairNo(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='password' className='sr-only'>Password or pin</Label>
                        <div className='flex flex-1/2 gap-2'>
                            <Input type="text" name='password' id='password' placeholder='Password or pin' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button type="button" onClick={() => setOpenModal(true)}>Pattern</Button>
                        </div>
                    </div>
                    <div>
                        <Select
                            value={requires_backup}
                            onValueChange={(e) => setRequiresBackup(e)}
                            name='requires_backup'
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Backup requires" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Requires backup</SelectLabel>
                                    <SelectItem value={`69753`}>No</SelectItem>
                                    <SelectItem value={`69752`}>Yes</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="mb-2">
                    <Label htmlFor='specialRequirement' className='sr-only'>Special requirement</Label>
                    <Textarea placeholder='Special requirement' value={specialRequirement} onChange={(e) => setSpecialRequirement(e.target.value)}></Textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                    <div>
                        <Label htmlFor='IMEI' className='sr-only'>IMEI</Label>
                        <Input type="text" value={IMEI || ""} onChange={(e) => setIMEI(e.target.value)} name='IMEI number' id='IMEI' placeholder='IMEI' />
                    </div>
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

export default HHP