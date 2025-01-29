"use client"
import useUserLoggedIn from '@/hooks/useGetUser';
import useIpaasGetSOInfoAll from '@/hooks/useIpaasGetSoInfoAll';
import useTookanAssignTeam from '@/hooks/useTookanAssignTeam';
import useTookanApi from '@/hooks/useTookanTask';
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import PageTitle from '@/components/PageTitle/page';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { assetTypes } from '@/lib/asset_types';
import { capitalizeText } from '@/lib/capitalize';
import { Textarea } from '@/components/ui/textarea';
import useCreateTicket from '@/hooks/useCreateTicket';
import useAddHHPTask from '@/hooks/useAddHHPTask';
import useAddAgentTask from '@/hooks/useAddBookingAgentTask';
import { datetimestamp } from '@/lib/date_formats';
import useCreateCustomerOnRepairshopr from '@/hooks/useCreateCustomer';
import useCreateCustomerLocally from '@/hooks/useCreateCustomerLocally';
import axios from 'axios';
import toast from 'react-hot-toast';
import useRepairshoprFile from '@/hooks/useAddRepairshoprFile';
import Modal from '@/components/modal/page';
import useAddTaskCommentLocally from '@/hooks/useAddCommentLocally';
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page')
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page')
)

const BookFromSOScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { getSOInfoAllTookan, loadingData } = useIpaasGetSOInfoAll();
    const { addTicket, createTicketLoading } = useCreateTicket()
    const { addAgentTask, addAgentTaskLoading, errors } = useAddAgentTask()
    const { addCustomer, createCustomerLoading } = useCreateCustomerOnRepairshopr()
    const { addRepairTicketFile } = useRepairshoprFile()
    const { addCommentLocally } = useAddTaskCommentLocally()
    const { addCustomerLocally } = useCreateCustomerLocally()
    const { addTask } = useAddHHPTask();
    const [search, setSearch] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [businessname, setBusinessName] = useState("")
    const [phone, setPhone] = useState("")
    const [phone_2, setPhone2] = useState("")
    const [address, setAddress] = useState("")
    const [address_2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [serviceOrder, setServiceOrder] = useState("")
    const [fault, setFault] = useState("")
    const [task_id, setTaskId] = useState("")
    const [newTicketId, setNewTicketId] = useState("")
    const [imei, setIMEI] = useState("")
    const [serialNumber, setSerialNumber] = useState("")
    const [model, setModel] = useState("")
    const [issue_type, setIssueType] = useState("");
    const [password, setPassword] = useState("")
    const [requires_backup, setRequiresBackup] = useState("")
    const [itemCondition, setItemCondition] = useState("");
    const [specialRequirement, setSpecialRequirement] = useState("")
    const [adh, setADH] = useState("")
    const [warranty, setWarranty] = useState("");
    const [ticketTypeId, setTicketTypeId] = useState<number | any>();
    const [warrantyCode, setWarrantyCode] = useState<number | any>();
    const [localWarranty, setLocalWarranty] = useState("");
    const [job_repair_no, setJobRepairNo] = useState("")
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setADH(e.target.checked ? 'ADH' : 'IW');
    };
    const hhp_issue_types = assetTypes.filter(asset => asset.value.includes("HHP"));
    const handleGetSOInfo = async (serviceOrder: string) => {
        if (!serviceOrder) return
        try {
            const data = await getSOInfoAllTookan(serviceOrder);
            // const fullAddress = `${data.Return.EsBpInfo.CustAddrStreet1} ${data.Return.EsBpInfo.CustAddrStreet2} ${data.Return.EsBpInfo.CustCity} ${data.Return.EsBpInfo.CustCountry}`;
            setFirstname(data.Return.EsBpInfo.CustFirstName);
            setLastname(data.Return.EsBpInfo.CustLastName);
            setEmail(data.Return.EsBpInfo.CustEmail);
            setPhone(data.Return.EsBpInfo.CustMobilePhone || '');
            setPhone2(data.Return.EsBpInfo.CustOfficePhone || '');
            setAddress(data.Return.EsBpInfo.CustAddrStreet1);
            setAddress2(data.Return.EsBpInfo.CustAddrStreet2);
            setCity(data.Return.EsBpInfo.CustCity);
            setState(data.Return.EsBpInfo.CustState);
            setServiceOrder(data.Return.EsHeaderInfo.SvcOrderNo);
            setFault(data.Return.EsModelInfo.DefectDesc);
            setIMEI(data.Return.EsModelInfo.IMEI);
            setSerialNumber(data.Return.EsModelInfo.SerialNo);
            setModel(data.Return.EsModelInfo.Model);
            const warranty_type = data?.Return.EsModelInfo?.WtyType;
            setWarranty(warranty_type);

            if (warranty_type === "LP") {
                setTicketTypeId("21877");
                setWarrantyCode("75130");
                setLocalWarranty("IW");
            } else if (warranty_type === "OW") {
                setTicketTypeId("21878");
                setWarrantyCode("69477");
                setLocalWarranty("OOW");
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error)
            }
        }
    };
    const [hhpFiles, setHHPFiles] = useState([]);
    const [hhpFilesUploading, setHHPFilesUploading] = useState(false);
    const [attachmentsModal, setAttachmentsModal] = useState(false)


    const openModal = () => {
        setAttachmentsModal(true)
    }
    const closeModal = () => {
        setAttachmentsModal(false)
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
            zip: "",
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

            const createdAsset = await axios.post(
                `${process.env.NEXT_PUBLIC_REPAIRSHOPR_CREATE_ASSETS}`,
                newAssetPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );

            asset_ids = [createdAsset?.data?.asset?.id]; // Add newly created asset ID
        }


        // Step 4: Prepare ticket payload

        const payload = {
            "customer_id": customer_id, // only need this for creating a ticket on rs
            "problem_type": issue_type, // Will aways be HHP for handheld devices, no need to choose
            "subject": "*" + fault,
            "status": "New", //  will always be 'New' for a recently created ticket
            "ticket_type_id": `${ticketTypeId}`,
            "user_id": `${user?.repairshopr_id}`,
            "properties": {
                "Service Order No.": serviceOrder,
                "Service Order No. ": serviceOrder,
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
            "service_order_no": serviceOrder,
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
        const res = await addTask(payload)
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

            const ticket_number = serviceOrder
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

    // search service order (ticket)
    // get service order
    // create customer in the rs customer api
    // store customer details in our customers table
    // store customer id from that in visits table
    // if email or phone number exists
    // get the customer id from that
    // store it in state
    // search it in the assets rs api (assets being model number, serial number)
    // if it returns nothing
    // proceed using the current assets user will create
    // if it returns data, store the assets id in state
    // continue filling out other form parameters


    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />


                        <main className="container mx-auto p-1">
                            <PageTitle title="ticket" hasSpan={true} spanText={"Create"} />
                            <div className='mx-auto flex w-full max-w-[300px] gap-3'>
                                <Input type="search" name="search" placeholder='Search service order' value={search} onChange={(e) => setSearch(e.target.value)} />
                                <Button type="button" disabled={loadingData} onClick={() => handleGetSOInfo(search)}>{loadingData ? 'Searching...' : 'Search'}</Button>
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
                                    <Input type="email" name="phone" value={phone || ""} onChange={(e) => setPhone(e.target.value)} />
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
                                    <Label htmlFor="fault" className="text-gray-500">Fault</Label>
                                    <Input type="text" name="fault" value={fault || ""} onChange={(e) => setFault(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor='warranty' className="text-gray-500">Warranty</Label>
                                    <Input type="text" name='warranty' id='warranty' placeholder='warranty' value={localWarranty} onChange={(e) => setLocalWarranty(e.target.value)} />

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

export default BookFromSOScreen