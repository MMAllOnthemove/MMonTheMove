"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useAddTaskCommentLocally from '@/hooks/useAddCommentLocally';
import useCheckWarranty from '@/hooks/useCheckHHPWarranty';
import useCreateTicket from '@/hooks/useCreateTicket';
import useUserLoggedIn from '@/hooks/useGetUser';
import { assetTypes } from '@/lib/asset_types';
import { datetimestamp } from '@/lib/date_formats';
import React, { useEffect, useState } from 'react';

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
import useBookingAgentsTasks from '@/hooks/useBookingAgentsTasks';
import { useHHPTasksCrud } from '@/hooks/useHHPTasksCrud';
import useSocket from '@/hooks/useSocket';
import faults_hhp from '@/lib/hhp_faults';
import { cn } from "@/lib/utils";
import warranties from '@/lib/warranties';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import AlertDialogServiceOrder from './alert_dialog';




const HHP = (customerProps: string | string[] | any) => {
    const { customerId, email } = customerProps?.customerProps;
    const { socket, isConnected } = useSocket()
    const { addTask, hhpAddTaskErrors } = useHHPTasksCrud();
    const { addAgentTask, addAgentTaskLoading, errors } = useBookingAgentsTasks()
    const { user } = useUserLoggedIn()
    const { addCommentLocally } = useAddTaskCommentLocally()
    const { addTicket, createTicketLoading } = useCreateTicket()
    const [itemCondition, setItemCondition] = useState("");
    const [specialRequirement, setSpecialRequirement] = useState("")
    const [password, setPassword] = useState("")
    const [requires_backup, setRequiresBackup] = useState("")
    const [job_repair_no, setJobRepairNo] = useState("")
    const [IMEI, setIMEI] = useState("");
    const [serialNumber, setSerialNumber] = useState("")
    const [modelNumber, setModelNumber] = useState("")
    const [issue_type, setIssueType] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false)
    const [serviceOrderNumber, setServiceOrder] = useState("")
    const [task_id, setTaskId] = useState("")
    // Asset id
    const [assetId, setAssetId] = useState('')
    const [isRework, setIsRework] = useState<boolean>(false);
    const [addRepairNoToTitle, setAddRepairNoToTitle] = useState<boolean>(false);


    const [fault, setFault] = useState("")
    const [openFaultList, setOpenFaultList] = React.useState(false)

    const isFormValid = itemCondition && requires_backup && IMEI && serialNumber && modelNumber

    // these will be send to our db as soon as a ticket is booked
    // some of the values will be stored in state from the result
    // this is just the warranty just a different variable (I am out of variable names, lol)
    const { warranty, warrantyCode, ticketTypeId, localWarranty, selectedWarranty, ticketTypeIdManually, handleWarrantyChange } = useCheckWarranty(modelNumber, serialNumber, IMEI)

    const [adh, setADH] = useState("")
    useEffect(() => {
        const loadCustomerAssetInfo = () => {
            if (typeof window !== undefined && window.localStorage) {
                const parsedData = JSON.parse(localStorage.getItem('assetInfo') || '""');
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

    // Dynamic subject generation
    const subject = () => {
        if (isRework && addRepairNoToTitle) {
            return `*Rework: ${job_repair_no} - ${fault}`;
        } else if (isRework) {
            return `*Rework: ${fault}`;
        } else if (addRepairNoToTitle) {
            return `*${job_repair_no} - ${fault}`;
        }
        return `*${fault}`;
    };
    const createTicket = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const payload = {
            "customer_id": customerId, // only need this for creating a ticket on rs
            "problem_type": `${issue_type}`, // Will aways be HHP for handheld devices, no need to choose
            "subject": subject(),
            "status": "New", //  will always be 'New' for a recently created ticket
            "ticket_type_id": `${ticketTypeIdManually ?? ticketTypeId}`,
            "user_id": `${user?.repairshopr_id}`,
            "properties": {
                "Service Order No.": serviceOrderNumber,
                "Service Order No. ": serviceOrderNumber,
                "Item Condition ": itemCondition,
                "Item Condition": itemCondition,
                "Backup Requires": requires_backup,
                "Backup Requires ": requires_backup,
                "Warranty ": selectedWarranty ?? (adh === 'ADH' && ticketTypeId === "21877" ? '75132' : warrantyCode), // ADH RS code
                "Warranty": selectedWarranty ?? (adh === 'ADH' && ticketTypeId === "21877" ? '75132' : warrantyCode), // ADH RS code
                "IMEI": `${IMEI}`,
                "Job Repair No.": job_repair_no,
                "Job Repair No.:": job_repair_no,
                "Special Requirement": specialRequirement,
                "Special Requirement ": specialRequirement,
                "Password": `${password}`,
                "Location (BIN)": "",
            },
            "asset_ids": assetId,
            "comments_attributes": [
                {
                    "subject": "Initial Issue",
                    "body": `*${fault}`,
                    "hidden": false,
                    "do_not_email": true,
                    "tech": `${user?.full_name}`
                }
            ]

        }
        const created_at = datetimestamp;
        const data = await addTicket(payload)
        await sendTicketDataToOurDB(
            data?.ticket?.number,
            data?.ticket?.id,
            data?.ticket?.customer_id,
            data?.ticket?.ticket_type_id
        );
        const addCommentLocallyPayload = {
            "task_id": `${task_id}`,
            "comment": `* ${fault}`,
            "created_at": created_at,
            "created_by": user?.full_name,
            "ticket_number": data?.ticket?.number,
        }
        const bookingAgentsStatPayload = {
            ticket_number: data?.ticket?.number, created_by: user?.email, booking_agent: user?.full_name, created_at: datetimestamp, original_ticket_date: data?.ticket?.created_at, problemType: data?.ticket?.problem_type
        }
        await addCommentLocally(addCommentLocallyPayload)
        await addAgentTask(bookingAgentsStatPayload); // adds it to the booking agent table, for reporting
        setOpenDialog(true)
    }
    const sendTicketDataToOurDB = async (ticketNumber: string | number, ticketId: string | number, repairshoprCustomerId: string | number, ticket_type_id: number | string) => {
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
            "service_order_no": serviceOrderNumber,
            "date_booked": date_booked,
            "model": modelNumber,
            "warranty": adh === 'ADH' ? adh : localWarranty,
            "fault": subject(),
            "imei": IMEI,
            "serial_number": serialNumber,
            "status": "New",
            "additional_info": specialRequirement,
            "ticket_number": `${ticketNumber} `,
            "department": department,
            "job_added_by": user?.email,
            "stores": issue_type,
            "repairshopr_job_id": `${ticketId} `,
            "repairshopr_customer_id": repairshoprCustomerId,
            "repeat_repair": repeat_repair,
            "created_at": created_at,
            "job_repair_no": job_repair_no,
            "accessories_and_condition": itemCondition,
            "requires_backup": requires_backup,
            "rs_warranty": warrantyCode,
            "ticket_type_id": ticket_type_id
        }
        const res: any = await addTask(payload)
        if (res?.id) setTaskId(res?.id)


    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setADH(e.target.checked ? 'ADH' : 'IW');
    };
    const hhp_issue_types = assetTypes.filter(asset => asset.value.includes("HHP"));
    return (
        <>

            {
                openDialog &&
                <AlertDialogServiceOrder openModal={openDialog} setOpenModal={setOpenDialog} customerEmail={email} />
            }
            <form onSubmit={createTicket}>
                <div className="grid grid-cols-1 text-start md:grid-cols-4 gap-4 items-center mb-2">
                    <div>
                        <Label htmlFor='fault' className="text-gray-500">Select fault *</Label>

                        <Popover open={openFaultList} onOpenChange={setOpenFaultList}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openFaultList}
                                    className="w-full justify-between text-gray-500 border-red-500 focus:border-red-500 focus-visible:ring-0 focus:shadow-none focus:outline-none"
                                >
                                    {fault
                                        ? faults_hhp.find((framework) => framework.value === fault)?.label
                                        : "Select fault..."}
                                    <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Search fault..." />
                                    <CommandList>
                                        <CommandEmpty>No faults found.</CommandEmpty>
                                        <CommandGroup>
                                            {faults_hhp.map((framework) => (
                                                <CommandItem
                                                    id='fault'
                                                    key={framework.value}
                                                    value={framework.value}
                                                    onSelect={(currentValue) => {
                                                        setFault(currentValue === fault ? "" : currentValue)
                                                        setOpenFaultList(false)
                                                    }}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            fault === framework.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {framework.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div>
                        <label className="ml-2 flex gap-2 text-gray-500">
                            <input
                                className="cursor-pointer"
                                type="checkbox"
                                checked={isRework}
                                onChange={() => setIsRework((prev) => !prev)}
                            />
                            Rework?
                        </label>
                        <label className="ml-2 flex gap-2 text-gray-500">
                            <input
                                className="cursor-pointer"
                                type="checkbox"
                                checked={addRepairNoToTitle}
                                onChange={() => setAddRepairNoToTitle((prev) => !prev)}
                            />
                            Add job repair no to fault?
                        </label>
                    </div>
                    <div>
                        <Label htmlFor='serviceOrderNumber' className="text-gray-500">Service order number</Label>
                        <Input type="number" name='serviceOrderNumber' id='serviceOrderNumber' placeholder='Service order number' value={serviceOrderNumber || ""} onChange={(e) => setServiceOrder(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='itemCondition' className="text-gray-500">Item condition *</Label>
                        <Input type="text" name='itemCondition' id='itemCondition' className="border-red-500 focus:border-red-500 focus-visible:ring-0 focus:shadow-none focus:outline-none" placeholder='Item condition' value={itemCondition} onChange={(e) => setItemCondition(e.target.value)} />
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-2">
                    <div>
                        <Label htmlFor='job_repair_no' className="text-gray-500">Job repair no</Label>
                        <Input type="text" name='job_repair_no' id='job_repair_no' placeholder='Job repair no' value={job_repair_no} onChange={(e) => setJobRepairNo(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='password' className="text-gray-500">Device password</Label>
                        <Input type="text" name='password' id='password' placeholder='Device password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='requires_backup' className="text-gray-500">Requires backup? *</Label>
                        <Select
                            value={requires_backup}
                            onValueChange={(e) => setRequiresBackup(e)}
                            name='requires_backup'

                        >
                            <SelectTrigger className="text-gray-500 border-red-500 focus:border-red-500 focus-visible:ring-0 focus:shadow-none focus:outline-none">
                                <SelectValue placeholder="Backup requires *" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Requires backup *</SelectLabel>
                                    <SelectItem value={`${(ticketTypeIdManually ?? ticketTypeId) === "21877" ? '75129' : '69753'}`}>No</SelectItem>
                                    <SelectItem value={`${(ticketTypeIdManually ?? ticketTypeId) === "21878" ? '75128' : '69752'}`}>Yes</SelectItem>

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* todo: remove */}

                    <p>ticketTypeId {ticketTypeId}</p>
                    <div>
                        <Label htmlFor='issue_type' className="text-gray-500">Issue type</Label>
                        <Select
                            value={issue_type || ""}
                            onValueChange={(e) => setIssueType(e)}
                            name='stores'
                        >
                            <SelectTrigger className="text-gray-500 border-red-500 focus:border-red-500 focus-visible:ring-0 focus:shadow-none focus:outline-none">
                                <SelectValue placeholder="Issue type *" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Issue types</SelectLabel>

                                    {hhp_issue_types.map((x: any) =>
                                        (<SelectItem key={x.value} value={`${x.value} `}>{x?.label}</SelectItem>))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {hhpAddTaskErrors.stores && <p className="text-sm text-red-500 font-medium">{hhpAddTaskErrors.stores}</p>}
                    </div>

                </div>

                <div className="mb-2">
                    <Label htmlFor='specialRequirement' className="text-gray-500">Special requirement</Label>
                    <Textarea placeholder='Special requirement' value={specialRequirement} onChange={(e) => setSpecialRequirement(e.target.value)}></Textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
                    <div>
                        <Label htmlFor='imei' className="text-gray-500">IMEI *</Label>
                        <Input type="text" name="imei" className="border-red-500 focus:border-red-500 focus-visible:ring-0 focus:shadow-none focus:outline-none" value={IMEI || ""} onChange={(e) => setIMEI(e.target.value)} id='imei' placeholder='IMEI' />
                    </div>
                    {hhpAddTaskErrors.imei && <p className="text-sm text-red-500 font-medium">{hhpAddTaskErrors.imei}</p>}
                    <div>
                        <Label htmlFor='model' className="text-gray-500">Model *</Label>
                        <Input type="text" value={modelNumber || ""} className="border-red-500 focus:border-red-500 focus-visible:ring-0 focus:shadow-none focus:outline-none" placeholder='Model number' onChange={(e) => setModelNumber(e.target.value)} name='model' id='model' />
                    </div>
                    <div>
                        <Label htmlFor='serial_number' className="text-gray-500">Serial number *</Label>
                        <Input type="text" value={serialNumber || ""} className="border-red-500 focus:border-red-500 focus-visible:ring-0 focus:shadow-none focus:outline-none" placeholder='Serial number' onChange={(e) => setSerialNumber(e.target.value)} name='serial_number' id='serial_number' />
                        {hhpAddTaskErrors.serial_number && <p className="text-sm text-red-500 font-medium">{hhpAddTaskErrors.serial_number}</p>}

                    </div>
                    {/* todo: uncomment */}
                    <p>selectedWarranty {selectedWarranty}</p>
                    <p>localWarranty {localWarranty}</p>
                    <p>ticketTypeIdManually {ticketTypeIdManually}</p>
                    <div>
                        <Label htmlFor='selectedWarranty' className="text-gray-500">Change warranty</Label>
                        <Select
                            value={selectedWarranty || ""}
                            onValueChange={handleWarrantyChange}
                            name='selectedWarranty'
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Change warranty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Warranties</SelectLabel>

                                    {warranties.map((x: any) =>
                                        (<SelectItem key={x.id} value={`${x.warranty}`}>{x?.warranty}</SelectItem>))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2 items-center justify-between cursor-pointer">
                        <label htmlFor='adh'>

                            <input
                                type="checkbox"
                                checked={adh === 'ADH'}
                                onChange={handleCheckboxChange}
                            />
                            ADH Warranty
                        </label>
                    </div>
                </div>
                {warranty ? <p className="text-lg font-semibold text-sky-700 md:text-xl text-center my-3">Unit is {warranty === "LP" ? "IW" : warranty}</p> : ""}

                <Button type="submit" disabled={createTicketLoading || !isFormValid}>
                    {createTicketLoading ? 'Creating...' : 'Create ticket'}
                </Button>
            </form>



        </>
    )
}

export default HHP