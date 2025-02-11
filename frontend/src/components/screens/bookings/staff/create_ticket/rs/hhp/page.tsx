"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useAddAgentTask from '@/hooks/useAddBookingAgentTask';
import useAddTaskCommentLocally from '@/hooks/useAddCommentLocally';
import useAddHHPTask from '@/hooks/useAddHHPTask';
import useCheckWarranty from '@/hooks/useCheckHHPWarranty';
import useCreateTicket from '@/hooks/useCreateTicket';
import useUserLoggedIn from '@/hooks/useGetUser';
import { assetTypes } from '@/lib/asset_types';
import { datetimestamp } from '@/lib/date_formats';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import AlertDialogServiceOrder from './alert_dialog';
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';


// Define a flat list of faults
const faults = [
    { value: "Cracked Screen", label: "Cracked Screen" },
    { value: "Broken Glass", label: "Broken Glass" },
    { value: "Touchscreen Malfunction", label: "Touchscreen Malfunction" },
    { value: "Unresponsive Touch", label: "Unresponsive Touch" },
    { value: "Dead Pixels", label: "Dead Pixels" },
    { value: "Flickering Screen", label: "Flickering Screen" },
    { value: "Screen Burn-in", label: "Screen Burn-in" },
    { value: "Color Distortion", label: "Color Distortion" },
    { value: "Broken or Flickering AMOLED Panel", label: "Broken or Flickering AMOLED Panel" },
    { value: "Display Lines or Artifacts", label: "Display Lines or Artifacts" },
    { value: "Black Screen", label: "Black Screen" },
    { value: "Screen Bleeding", label: "Screen Bleeding (e.g., light leaking around edges)" },
    { value: "Brightness Issues", label: "Brightness Issues" },
    { value: "Display Dead Zones", label: "Display Dead Zones" },
    { value: "Cracked or Dislodged Digitizer", label: "Cracked or Dislodged Digitizer" },
    { value: "Battery Not Charging", label: "Battery Not Charging" },
    { value: "Fast Draining Battery", label: "Fast Draining Battery" },
    { value: "Battery Swelling or Expansion", label: "Battery Swelling or Expansion" },
    { value: "Overheating While Charging", label: "Overheating While Charging" },
    { value: "Charging Port Damage", label: "Charging Port Damage" },
    { value: "Wireless Charging Not Working", label: "Wireless Charging Not Working" },
    { value: "Battery Not Holding Charge", label: "Battery Not Holding Charge" },
    { value: "Inconsistent Charging Speed", label: "Inconsistent Charging Speed" },
    { value: "Phone Turning Off Unexpectedly", label: "Phone Turning Off Unexpectedly" },
    { value: "Slow Charging", label: "Slow Charging" },
    { value: "Charging Cable Failure", label: "Charging Cable Failure" },
    { value: "No Sound from Speakers", label: "No Sound from Speakers" },
    { value: "Distorted Sound from Speakers", label: "Distorted Sound from Speakers" },
    { value: "Microphone Not Working", label: "Microphone Not Working" },
    { value: "Audio Cutting In and Out", label: "Audio Cutting In and Out" },
    { value: "Call Audio Issues", label: "Call Audio Issues" },
    { value: "Headphone Jack Issues", label: "Headphone Jack Issues" },
    { value: "Bluetooth Audio Problems", label: "Bluetooth Audio Problems" },
    { value: "Speakers Not Responding to Volume Changes", label: "Speakers Not Responding to Volume Changes" },
    { value: "Camera Lens Cracked or Scratched", label: "Camera Lens Cracked or Scratched" },
    { value: "Camera Not Focusing", label: "Camera Not Focusing" },
    { value: "Blurred Photos", label: "Blurred Photos" },
    { value: "Poor Low-light Performance", label: "Poor Low-light Performance" },
    { value: "Black or Blank Camera Screen", label: "Black or Blank Camera Screen" },
    { value: "Shutter Button Not Responding", label: "Shutter Button Not Responding" },
    { value: "Camera App Crashing or Freezing", label: "Camera App Crashing or Freezing" },
    { value: "Flash Not Working", label: "Flash Not Working" },
    { value: "Front or Rear Camera Malfunction", label: "Front or Rear Camera Malfunction" },
    { value: "Overheating When Using Camera", label: "Overheating When Using Camera" },
    { value: "Water Damage to Camera", label: "Water Damage to Camera" },
    { value: "Phone Freezing or Lagging", label: "Phone Freezing or Lagging" },
    { value: "App Crashes", label: "App Crashes" },
    { value: "Phone Stuck in Boot Loop", label: "Phone Stuck in Boot Loop" },
    { value: "System Update Failures", label: "System Update Failures" },
    { value: "Wi-Fi or Cellular Connectivity Problems", label: "Wi-Fi or Cellular Connectivity Problems" },
    { value: "Slow Performance or Unresponsiveness", label: "Slow Performance or Unresponsiveness" },
    { value: "Unresponsive Touchscreen After Software Update", label: "Unresponsive Touchscreen After Software Update" },
    { value: "Bluetooth Connectivity Problems", label: "Bluetooth Connectivity Problems" },
    { value: "OS Not Booting Up", label: "OS Not Booting Up" },
    { value: "Device Not Responding to Fingerprint or Face Recognition", label: "Device Not Responding to Fingerprint or Face Recognition" },
    { value: "Weak or No Wi-Fi Signal", label: "Weak or No Wi-Fi Signal" },
    { value: "No Cellular Network/Signal", label: "No Cellular Network/Signal" },
    { value: "Dropped Calls", label: "Dropped Calls" },
    { value: "SIM Card Not Detected", label: "SIM Card Not Detected" },
    { value: "No Internet Connection", label: "No Internet Connection" },
    { value: "Bluetooth Not Pairing", label: "Bluetooth Not Pairing" },
    { value: "GPS Not Working", label: "GPS Not Working" },
    { value: "Mobile Data Not Working", label: "Mobile Data Not Working" },
    { value: "Airplane Mode Stuck On", label: "Airplane Mode Stuck On" },
    { value: "Install screen protector", label: "Install screen protector" },
    { value: "Water Damage", label: "Water Damage" },
    { value: "Dropped or Impact Damage", label: "Dropped or Impact Damage" },
    { value: "Button Malfunctions", label: "Button Malfunctions" },
    { value: "Frame or Chassis Damage", label: "Frame or Chassis Damage" },
    { value: "Cracked Back Glass", label: "Cracked Back Glass" },
    { value: "Bent or Warped Body", label: "Bent or Warped Body" },
    { value: "Damage from Extreme Temperatures", label: "Damage from Extreme Temperatures" },
    { value: "Overheating", label: "Overheating" },
    { value: "Slow Processing/Freezing", label: "Slow Processing/Freezing" },
    { value: "Faulty RAM or Storage", label: "Faulty RAM or Storage" },
    { value: "Unresponsive Home Button or Volume Buttons", label: "Unresponsive Home Button or Volume Buttons" },
    { value: "Power Button Malfunction", label: "Power Button Malfunction" },
    { value: "Vibration Not Working", label: "Vibration Not Working" },
    { value: "Fingerprint Sensor Issues", label: "Fingerprint Sensor Issues" },
    { value: "Face Recognition Not Working", label: "Face Recognition Not Working" },
    { value: "Sensors Not Responding", label: "Sensors Not Responding" },
    { value: "App Not Installing or Updating", label: "App Not Installing or Updating" },
    { value: "Phone Not Turning On", label: "Phone Not Turning On" },
    { value: "Phone Restarting Randomly", label: "Phone Restarting Randomly" },
    { value: "Phone Not Recognized by Computer", label: "Phone Not Recognized by Computer" },
    { value: "Touchscreen Showing Ghost Touches", label: "Touchscreen Showing Ghost Touches" },
    { value: "Software/Hardware Compatibility Issues", label: "Software/Hardware Compatibility Issues" },
    { value: "Wi-Fi Calling Not Working", label: "Wi-Fi Calling Not Working" },
    { value: "Bluetooth Device Disconnecting", label: "Bluetooth Device Disconnecting" },

];

const HHP = (customerProps: string | string[] | any) => {
    const { customerId, email } = customerProps?.customerProps;
    const { addTask } = useAddHHPTask();
    const { addAgentTask, addAgentTaskLoading, errors } = useAddAgentTask()
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


    const [fault, setFault] = useState("")
    // const [customFault, setCustomFault] = useState('');
    // const [isCustom, setIsCustom] = useState(false);
    const [openFaultList, setOpenFaultList] = React.useState(false)

    // const handleSelectChange = (e) => {
    //     setFault(e);
    //     setIsCustom(false); // If the user selects from dropdown, reset the custom input
    // };

    // const handleInputChange = (e) => {
    //     setCustomFault(e.target.value);
    //     setFault(''); // Reset selected fault if the user types a custom one
    // };

    // const handleCustomFaultToggle = () => {
    //     setIsCustom(!isCustom);
    //     setFault(''); // Clear selection if they choose to type a custom fault
    // };


    // these will be send to our db as soon as a ticket is booked
    // some of the values will be stored in state from the result
    // this is just the warranty just a different variable (I am out of variable names, lol)
    const { warranty, warrantyCode, ticketTypeId, localWarranty } = useCheckWarranty(modelNumber, serialNumber, IMEI)
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


    const createTicket = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        const payload = {
            "customer_id": customerId, // only need this for creating a ticket on rs
            "problem_type": `${issue_type}`, // Will aways be HHP for handheld devices, no need to choose
            "subject": isRework ? `*Rework: ${fault}` : `*${fault}`,
            "status": "New", //  will always be 'New' for a recently created ticket
            "ticket_type_id": `${ticketTypeId}`,
            "user_id": `${user?.repairshopr_id}`,
            "properties": {
                "Service Order No.": serviceOrderNumber,
                "Service Order No. ": serviceOrderNumber,
                "Item Condition ": itemCondition,
                "Item Condition": itemCondition,
                "Backup Requires": requires_backup,
                "Backup Requires ": requires_backup,
                "Warranty ": adh === 'ADH' && ticketTypeId === "21877" ? '75132' : warrantyCode, // ADH RS code
                "Warranty": adh === 'ADH' && ticketTypeId === "21877" ? '75132' : warrantyCode, // ADH RS code
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

        const data = await addTicket(payload)
        await sendTicketDataToOurDB(
            data?.ticket?.number,
            data?.ticket?.id,
            data?.ticket?.customer_id,
            data?.ticket?.ticket_type_id
        );

        const bookingAgentsStatPayload = {
            ticket_number: data?.ticket?.number, created_by: user?.email, booking_agent: user?.full_name, created_at: datetimestamp, original_ticket_date: data?.ticket?.created_at, problemType: data?.ticket?.problem_type
        }

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
            "fault": fault,
            "imei": IMEI,
            "serial_number": serialNumber,
            "status": "New",
            "additional_info": specialRequirement,
            "ticket_number": `${ticketNumber}`,
            "department": department,
            "job_added_by": user?.email,
            "stores": issue_type,
            "repairshopr_job_id": `${ticketId}`,
            "repairshopr_customer_id": repairshoprCustomerId,
            "repeat_repair": repeat_repair,
            "created_at": created_at,
            "job_repair_no": job_repair_no,
            "accessories_and_condition": itemCondition,
            "requires_backup": requires_backup,
            "rs_warranty": warrantyCode,
            "ticket_type_id": ticket_type_id
        }
        const res = await addTask(payload)
        setTaskId(res?.id)


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
                <div className="grid grid-cols-1 text-start md:grid-cols-3 gap-4 items-center mb-2">
                    <div className='flex items-center gap-2'>
                        <Popover open={openFaultList} onOpenChange={setOpenFaultList}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openFaultList}
                                    className="w-full justify-between"
                                >
                                    {fault
                                        ? faults.find((framework) => framework.value === fault)?.label
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
                                            {faults.map((framework) => (
                                                <CommandItem
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
                        <label className="ml-2 flex gap-2">
                            <input
                                className="cursor-pointer"
                                type="checkbox"
                                checked={isRework}
                                onChange={() => setIsRework((prev) => !prev)}
                            />
                            Rework?
                        </label>
                    </div>
                    <div>
                        <Label htmlFor='serviceOrderNumber' className='sr-only'>Service order number</Label>
                        <Input type="number" name='serviceOrderNumber' id='serviceOrderNumber' placeholder='Service order number' value={serviceOrderNumber || ""} onChange={(e) => setServiceOrder(e.target.value)} />
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
                                    <SelectItem value={`${ticketTypeId === "21877" ? '75129' : '69753'}`}>No</SelectItem>
                                    <SelectItem value={`${ticketTypeId === "21878" ? '75128' : '69752'}`}>Yes</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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

                </div>

                <div className="mb-2">
                    <Label htmlFor='specialRequirement' className='sr-only'>Special requirement</Label>
                    <Textarea placeholder='Special requirement' value={specialRequirement} onChange={(e) => setSpecialRequirement(e.target.value)}></Textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
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

                <Button type="submit" disabled={createTicketLoading}>
                    {createTicketLoading ? 'Creating...' : 'Create ticket'}
                </Button>
            </form>



        </>
    )
}

export default HHP