"use client"
import Modal from '@/components/modal/page';
import PageTitle from '@/components/PageTitle/page';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useAddTaskCommentLocally from '@/hooks/useAddCommentLocally';
import useRepairshoprFile from '@/hooks/useAddRepairshoprFile';
import useBookingAgentsTasks from '@/hooks/useBookingAgentsTasks';
import useCheckWarranty from '@/hooks/useCheckHHPWarranty';
import useCreateCustomerOnRepairshopr from '@/hooks/useCreateCustomer';
import useCreateCustomerLocally from '@/hooks/useCreateCustomerLocally';
import useCreateTicket from '@/hooks/useCreateTicket';
import useUserLoggedIn from '@/hooks/useGetUser';
import { useHHPTasksCrud } from '@/hooks/useHHPTasksCrud';
import useFetchCustomer from '@/hooks/useSearchCustomerRS';
import useSocket from '@/hooks/useSocket';
import { assetTypes } from '@/lib/asset_types';
import { capitalizeText } from '@/lib/capitalize';
import { datetimestamp } from '@/lib/date_formats';
import faults_hhp from '@/lib/hhp_faults';
import { cn } from "@/lib/utils";
import warranties from '@/lib/warranties';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateAssets } from './add_assets';
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page')
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page')
)


const DunoworxRobtronicScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { customerSearchLoading, customer, checkIfCustomerWasHere } = useFetchCustomer();
    const { socket, isConnected } = useSocket()
    const { createAssetsOnRepairshopr, createAssetLoading } = useCreateAssets()
    const { addTicket, createTicketLoading } = useCreateTicket()
    const { addAgentTask, addAgentTaskLoading, errors } = useBookingAgentsTasks()
    const { addCustomer, createCustomerLoading } = useCreateCustomerOnRepairshopr()
    const { addRepairTicketFile } = useRepairshoprFile()
    const { addCommentLocally } = useAddTaskCommentLocally()
    const { addCustomerLocally } = useCreateCustomerLocally()
    const { addTask } = useHHPTasksCrud();
    const [search, setSearch] = useState("")
    const [firstname, setFirstname] = useState<string | any>("")
    const [lastname, setLastname] = useState<string | any>("")
    const [email, setEmail] = useState<string | any>("")
    const [businessname, setBusinessName] = useState<string | any>("")
    const [phone, setPhone] = useState<string | any>("")
    const [phone_2, setPhone2] = useState<string | any>("")
    const [address, setAddress] = useState<string | any>("")
    const [address_2, setAddress2] = useState<string | any>("")
    const [city, setCity] = useState<string | any>("")
    const [state, setState] = useState<string | any>("")
    // const [serviceOrder, setServiceOrder] = useState<string | number | any>("")
    const [fault, setFault] = useState<string | any>("")
    const [task_id, setTaskId] = useState("")
    const [newTicketId, setNewTicketId] = useState("")
    const [imei, setIMEI] = useState<string>("")
    const [serialNumber, setSerialNumber] = useState<string>("")
    const [model, setModel] = useState<string>("")
    const [issue_type, setIssueType] = useState<string | any>("")
    const [password, setPassword] = useState<string | any>("")
    const [requires_backup, setRequiresBackup] = useState<string | number | any>("")
    const [itemCondition, setItemCondition] = useState<string | number | any>("");
    const [specialRequirement, setSpecialRequirement] = useState("")
    const [ticket_number, setTicket] = useState("")
    const [adh, setADH] = useState("")
    const [customerId, setCustomerId] = useState<string | number | any>("")
    const [job_repair_no, setJobRepairNo] = useState("")
    const [hhpFiles, setHHPFiles] = useState([]);
    const [hhpFilesUploading, setHHPFilesUploading] = useState(false);
    const [attachmentsModal, setAttachmentsModal] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState<string | null | any>("")
    const [phoneNumber2, setPhoneNumber2] = useState<string | any>("")
    const [zip, setZip] = useState<string | any>("")
    const { warranty, warrantyCode, ticketTypeId, localWarranty, selectedWarranty, handleWarrantyChange } = useCheckWarranty(model, serialNumber, imei)
    const [assetId, setAssetId] = useState('')
    const [isRework, setIsRework] = useState<boolean>(false);
    const [addRepairNoToTitle, setAddRepairNoToTitle] = useState<boolean>(false);
    const [openFaultList, setOpenFaultList] = React.useState(false)


    const openModal = () => {
        setAttachmentsModal(true)
    }
    const closeModal = () => {
        setAttachmentsModal(false)
    }

    const lookupCustomer = async () => {
        const exactMatchCustomer = await checkIfCustomerWasHere(search);
        setCustomerId(exactMatchCustomer?.id);
        setFirstname(exactMatchCustomer?.firstname);
        setLastname(exactMatchCustomer?.lastname);
        setBusinessName(exactMatchCustomer?.business_name);
        setEmail(exactMatchCustomer?.email);
        setPhoneNumber(exactMatchCustomer?.mobile);
        setPhoneNumber2(exactMatchCustomer?.phone);
        setAddress(exactMatchCustomer?.address);
        setAddress2(exactMatchCustomer?.address_2);
        setCity(exactMatchCustomer?.city);
        setState(exactMatchCustomer?.state);
        setZip(exactMatchCustomer?.zip);
    }

    const handleCustomerSearchOrCreation = async (
        customerData: any,
        created_at: string,
        visit_date: string
    ) => {
        // Search for existing customer in the customers API
        const customerSearchResponse = await axios.get(
            `https://allelectronics.repairshopr.com/api/v1/customers?query=${customerData.phone}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                },
            }
        );

        const existingCustomers = customerSearchResponse?.data?.customers || [];

        if (existingCustomers.length > 0) {
            // Return the first matching customer ID if it exists
            return existingCustomers[0]?.id;
        }

        // If no customer exists, create a new one
        const payload = {
            firstname: capitalizeText(customerData.firstname),
            lastname: capitalizeText(customerData.lastname),
            businessname: customerData.businessname,
            email: customerData.email,
            phone: customerData.phone,
            mobile: customerData.phone_2,
            address: customerData.address,
            address_2: customerData.address_2,
            city: customerData.city,
            state: customerData.state,
            zip: customerData.zip,
        };

        const customer_id = await addCustomer(payload);

        const spreadCustomerPayload = {
            ...payload,
            repairshopr_customer_id: customer_id,
            created_at,
            visit_date,
        };

        await addCustomerLocally(spreadCustomerPayload);

        return customer_id;
    };


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
        const visit_date = datetimestamp
        const created_at = datetimestamp

        // Step 1: Get or Create Customer
        const customer_id = await handleCustomerSearchOrCreation({
            firstname,
            lastname,
            businessname,
            email,
            phone,
            phone_2,
            address,
            address_2,
            city,
            state,
        }, created_at, visit_date);

        // search if asset exists
        const asset_data = await axios.get(
            `${process.env.NEXT_PUBLIC_REPAIRSHOPR_CREATE_ASSETS}?query=${serialNumber}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                },
            }
        );
        const assets = asset_data?.data?.assets.filter(
            (asset: any) => asset.customer_id == customer_id
        ) || []
        // Step 2: Search or Create Asset
        let asset_ids = assets.length ? assets.map((asset: any) => asset.id) : [];
        // Step 3: If no assets, create a new asset
        if (assets.length === 0) {
            const newAssetPayload = {
                "asset_type_name": "HHP",
                "properties": {
                    "IMEI No.": imei,
                    "Model No.:": model
                },
                "name": model,
                "customer_id": customer_id,
                "asset_serial": serialNumber
            };
            const createdAsset = await createAssetsOnRepairshopr(newAssetPayload)
            // const createdAsset = await axios.post(
            //     `${process.env.NEXT_PUBLIC_REPAIRSHOPR_CREATE_ASSETS}`,
            //     newAssetPayload,
            //     {
            //         headers: {
            //             "Content-Type": "application/json",
            //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
            //         },
            //     }
            // );

            asset_ids = [createdAsset?.id]; // Add newly created asset ID
        }


        // Step 4: Prepare ticket payload

        const payload = {
            "customer_id": customer_id, // only need this for creating a ticket on rs
            "problem_type": issue_type, // Will aways be HHP for handheld devices, no need to choose
            "subject": subject(),
            "status": "New", //  will always be 'New' for a recently created ticket
            "ticket_type_id": `${ticketTypeId}`,
            "user_id": `${user?.repairshopr_id}`,
            "properties": {
                "Service Order No.": "",
                "Service Order No. ": "",
                "Item Condition ": itemCondition,
                "Item Condition": itemCondition,
                "Backup Requires": requires_backup,
                "Backup Requires ": requires_backup,
                "Warranty ": adh === 'ADH' && ticketTypeId === "21877" ? '75132' : warrantyCode, // ADH RS code
                "Warranty": adh === 'ADH' && ticketTypeId === "21877" ? '75132' : warrantyCode, // ADH RS code
                "IMEI": imei,
                "Job Repair No.": job_repair_no,
                "Job Repair No.:": job_repair_no,
                "Special Requirement": specialRequirement,
                "Special Requirement ": specialRequirement,
                "Password": `${password}`,
                "Location (BIN)": "",
            },
            "asset_ids": asset_ids, // Use the asset IDs here
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
        // Step 5: Create ticket
        const data = await addTicket(payload)
        // we will grab the ticket id so we can send attachments to the correct ticket on rs
        setNewTicketId(data?.ticket?.id)
        // grab the ticket number which will be used for adding attachements with the ticket name as the filename in the backend
        setTicket(data?.ticket?.number)


        await sendTicketDataToOurDB(
            data?.ticket?.number,
            data?.ticket?.id,
            data?.ticket?.customer_id,
            data?.ticket?.ticket_type_id
        );
        // Step 7: Add task for booking agents
        const bookingAgentsStatPayload = {
            ticket_number: data?.ticket?.number,
            created_by: user?.email,
            booking_agent: user?.full_name,
            created_at: datetimestamp,
            original_ticket_date: data?.ticket?.created_at,
            problemType: data?.ticket?.problem_type,
        };
        await addAgentTask(bookingAgentsStatPayload); // adds it to the booking agent table, for reporting
        const addCommentLocallyPayload = {
            "task_id": task_id,
            "comment": `*${fault}`,
            "created_at": created_at,
            "created_by": user?.full_name,
        }
        await addCommentLocally(addCommentLocallyPayload)
        openModal() // open modal for attachments

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
            "service_order_no": "",
            "date_booked": date_booked,
            "model": model,
            "warranty": adh === 'ADH' ? adh : localWarranty,
            "fault": fault,
            "imei": imei,
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
        const res: any = await addTask(payload)
        setTaskId(res?.id)

    }
    const handleHHPFiles = (event: any) => {
        setHHPFiles(event.target.files);
    };
    // submit hhp files to backend and repairshopr
    const submitHHPFiles = async () => {
        setHHPFilesUploading(true);
        try {
            const formData = new FormData();

            const created_at = datetimestamp;
            Array.from(hhpFiles).forEach((file) => {
                formData.append('files', file);
            });
            // Append ticket_number once


            formData.append('task_id', task_id);
            formData.append('ticket_number', ticket_number);
            formData.append('created_at', created_at);
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
                await addRepairTicketFile(newTicketId, repairshopr_payload)
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
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setADH(e.target.checked ? 'ADH' : 'IW');
    };
    const hhp_issue_types = assetTypes.filter(asset => asset.value.includes("HHP"));
    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />

                        <main className="container mx-auto p-1">
                            <PageTitle title="Dunoworx/Robtronics" hasSpan={false} />
                            <div className='mx-auto flex w-full max-w-[300px] gap-3'>
                                <Input type="search" name="search" placeholder='Search email' value={search} onChange={(e) => setSearch(e.target.value)} />
                                <Button type="button" disabled={customerSearchLoading} onClick={lookupCustomer}>{customerSearchLoading ? 'Searching...' : 'Search'}</Button>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 items-center gap-3 mb-3'>
                                <div>
                                    <Label htmlFor="firstname" className="text-gray-500">First name</Label>
                                    <Input type="text" name="firstname" className="w-full" value={capitalizeText(firstname) || ""} onChange={(e) => setFirstname(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="lastname" className="text-gray-500">Last name</Label>
                                    <Input type="text" name="lastname" className="w-full" value={capitalizeText(lastname) || ""} onChange={(e) => setLastname(e.target.value)} />
                                </div>

                                <div>
                                    <Label htmlFor='business_name' className="text-gray-500">Business name</Label>
                                    <Input type="text" id='business_name' name='business_name' value={businessname || ""}
                                        onChange={(e) => setBusinessName(e.target.value)} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 items-center gap-3 mb-3'>
                                <div>
                                    <Label htmlFor="email" className="text-gray-500">Email</Label>
                                    <Input type="email" name="email" value={email?.toLowerCase() || ""} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="phone" className="text-gray-500">Phone</Label>
                                    <Input type="text" name="phone" value={phone || ""} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="phone_2" className="text-gray-500">Alternative Phone</Label>
                                    <Input type="text" name="phone_2" value={phone_2 || ""} onChange={(e) => setPhone2(e.target.value)} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-4 items-center gap-3 mb-3'>
                                <div>
                                    <Label htmlFor="address" className="text-gray-500">Address</Label>
                                    <Input type="text" name="address" value={address || ""} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="address_2" className="text-gray-500">Address 2</Label>
                                    <Input type="text" name="address_2" value={address_2 || ""} onChange={(e) => setAddress2(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="city" className="text-gray-500">City</Label>
                                    <Input type="text" name="city" value={city || ""} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="state" className="text-gray-500">State</Label>
                                    <Input type="text" name="state" value={state || ""} onChange={(e) => setState(e.target.value)} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 items-center gap-3 mb-3'>

                                <div>
                                    <Label htmlFor="imei" className="text-gray-500">IMEI</Label>
                                    <Input type="text" name="imei" value={imei || ""} onChange={(e) => setIMEI(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="serialNumber" className="text-gray-500">Serial number</Label>
                                    <Input type="text" name="serialNumber" value={serialNumber || ""} onChange={(e) => setSerialNumber(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="model" className="text-gray-500">Model</Label>
                                    <Input type="text" name="model" value={model || ""} onChange={(e) => setModel(e.target.value)} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-4 items-center gap-3 mb-3'>
                                <div>
                                    <Label htmlFor='fault' className="text-gray-500">Select fault</Label>

                                    <Popover open={openFaultList} onOpenChange={setOpenFaultList}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openFaultList}
                                                className="w-full justify-between"
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
                                {/* <div>
                                    <Label htmlFor="fault" className="text-gray-500">Fault</Label>
                                    <Input type="text" name="fault" value={fault || ""} onChange={(e) => setFault(e.target.value)} />
                                </div> */}
                                {/* <div>
                                    <Label htmlFor='warranty' className="text-gray-500">Warranty</Label>
                                    <Input type="text" name='warranty' id='warranty' placeholder='warranty' value={localWarranty} onChange={(e) => setLocalWarranty(e.target.value)} />

                                </div> */}
                                <div>
                                    <Label htmlFor='localWarranty' className="text-gray-500">Change warranty</Label>
                                    <Select
                                        value={localWarranty || ""}
                                        onValueChange={handleWarrantyChange}
                                        name='localWarranty'
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
                                <div>
                                    <Label htmlFor='issue_type' className="text-gray-500">Issue type</Label>
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
                                <div className="flex gap-2 items-center justify-between cursor-pointer ">
                                    <label htmlFor='adh' className="text-gray-500">

                                        <input
                                            type="checkbox"
                                            checked={adh === 'ADH'}
                                            onChange={handleCheckboxChange}
                                        />
                                        ADH
                                    </label>
                                </div>

                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-4 items-center gap-3 mb-3'>
                                <div>
                                    <Label htmlFor='job_repair_no' className="text-gray-500">Job repair no</Label>
                                    <Input type="text" name='job_repair_no' id='job_repair_no' placeholder='Job repair no' value={job_repair_no} onChange={(e) => setJobRepairNo(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor='password' className="text-gray-500">Password or pin</Label>
                                    <Input type="text" name='password' id='password' placeholder='Password or pin' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor='requires_backup' className="text-gray-500">Requires backup?</Label>
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
                                    <Label htmlFor='itemCondition' className="text-gray-500">Item condition</Label>
                                    <Input type="text" name='itemCondition' id='itemCondition' placeholder='Item condition' value={itemCondition} onChange={(e) => setItemCondition(e.target.value)} />
                                </div>


                            </div>
                            <div>
                                <Label htmlFor='specialRequirement' className="text-gray-500">Special requirement</Label>
                                <Textarea placeholder='Special requirement' name="specialRequirement" value={specialRequirement} onChange={(e) => setSpecialRequirement(e.target.value)}></Textarea>
                            </div>

                            <Button type="button" className="mt-2 w-full" disabled={createTicketLoading} onClick={createTicket}>
                                {createTicketLoading ? 'Creating...' : 'Create ticket'}
                            </Button>

                            {/* modal for adding attachments */}
                            {
                                attachmentsModal &&
                                <Modal
                                    isVisible={attachmentsModal}
                                    onClose={closeModal}
                                    title={"Add task"}
                                    content={
                                        <div className="flex items-center">
                                            <Input type="file" accept="image/*,video/*, application/pdf" multiple className="my-3" onChange={handleHHPFiles} />
                                            <Button className="ml-3" disabled={hhpFilesUploading} onClick={submitHHPFiles}>{hhpFilesUploading ? 'Uploading' : 'Attach'}</Button>
                                        </div>

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

export default DunoworxRobtronicScreen