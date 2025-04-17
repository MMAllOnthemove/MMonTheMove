"use client"
import PageTitle from '@/components/PageTitle/page';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import useUserLoggedIn from '@/hooks/useGetUser';
import useIpaasGetSOInfoAll from '@/hooks/useIpaasGetSoInfoAll';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useRepairshoprFile from '@/hooks/useAddRepairshoprFile';
import { useHHPTasksCrud } from '@/hooks/useHHPTasksCrud';
import useSocket from '@/hooks/useSocket';
import { assetTypes } from '@/lib/asset_types';
import { capitalizeText } from '@/lib/capitalize';


import warranties from '@/lib/warranties';
import provinces from '@/lib/provinces';
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
    const { socket, isConnected } = useSocket()
    const { getSOInfoAllTookan, loadingData } = useIpaasGetSOInfoAll();
    const { addTaskFromSO, hhpAddTaskFromGSPNLoading, hhpAddTaskFromGSPNErrors } = useHHPTasksCrud();
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
    const [task_id, setTaskId] = useState<any>("")
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
    // const isFormValid = firstname && lastname && fault && itemCondition && requires_backup && imei && serialNumber && model && issue_type
    const hhp_issue_types = assetTypes.filter(asset => asset.value.includes("HHP"));
    const handleGetSOInfo = async (serviceOrder: string) => {
        if (!serviceOrder) return
        try {
            const data = await getSOInfoAllTookan(serviceOrder);
            setFirstname(data.Return.EsBpInfo.CustFirstName);
            setLastname(data.Return.EsBpInfo.CustLastName);
            setEmail(data.Return.EsBpInfo.CustEmail);
            setPhone(data.Return.EsBpInfo.CustMobilePhone || '');
            setPhone2(data.Return.EsBpInfo.CustOfficePhone || '');
            setAddress(data.Return.EsBpInfo.CustAddrStreet2); // switched them as that's how it looks in the api res
            setAddress2(data.Return.EsBpInfo.CustAddrStreet1);
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

    const handleWarrantyChange = (
        event: any
    ) => {
        setLocalWarranty(event);
        // Update other state variables based on the selected warranty
        if (event === "IW") {
            setTicketTypeId("21877");
            setWarrantyCode("75130");
            setLocalWarranty("IW");
        } else if (event === "OOW") {
            setTicketTypeId("21878");
            setWarrantyCode("69477");
            setLocalWarranty("OOW");
        }
    };


    const resolvedIssueType = (() => {
        switch (issue_type.trim()) {
            case "HHP(Mobile Phone/Tablets)":
                return "Carry In";
            case "HHP (DSV)":
                return "DSV";
            case "HHP (Robtronics)":
                return "Robtronics";
            case "Dunoworx (HHP)":
                return "Dunoworks";
            default:
                return "Carry In";
        }
    })();


    const createTicket = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const payload = {
            first_name: firstname,
            last_name: lastname,
            business_name: businessname,
            email: email,
            phone_number: phone,
            home_number: phone_2,
            address: address,
            address_2: address_2,
            city: city,
            state: state,
            zip: "",
            "service_order_no": serviceOrder,
            "model": model,
            "warranty": adh === 'ADH' ? adh : localWarranty,
            "imei": imei,
            "serial_number": serialNumber,
            "unit_status": "New",
            "department": "HHP",
            "job_added_by": user?.email,
            "stores": resolvedIssueType,
            "accessories_and_condition": itemCondition,
            "additional_info": specialRequirement,
            "job_repair_no": job_repair_no,
            "requires_backup": requires_backup,
            "fault": `*${fault}`,
            "repeat_repair": "No",
            "ticket_type_id": `${ticketTypeId}`,
            "adh": adh,
            "password": `${password}`,
            "assetId": "", // we do not have it inially when sending data to the backend, it will be updated from there
            "repairshopr_customer_id": "", // we do not have it inially when sending data to the backend, it will be updated from there
            "created_by": user?.full_name,
            warrantyCode,
            issue_type: issue_type?.trim(),
            repairshopr_id: user?.repairshopr_id
        }
        await addTaskFromSO(payload)

    }


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
                                    <Input type="search" name="search" className="w-full pplaceholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" placeholder='Search service order' value={search} onChange={(e) => setSearch(e.target.value)} />
                                <Button type="button" disabled={loadingData} onClick={() => handleGetSOInfo(search)}>{loadingData ? 'Searching...' : 'Search'}</Button>
                            </div>


                            <div className='grid grid-cols-1 md:grid-cols-3 items-center gap-3 mb-3'>
                                <div>
                                    <Label htmlFor="firstname" className="text-gray-500">First name</Label>
                                    <Input type="text" name="firstname" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={capitalizeText(firstname) || ""} onChange={(e) => setFirstname(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="lastname" className="text-gray-500">Last name</Label>
                                    <Input type="text" name="lastname" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={capitalizeText(lastname) || ""} onChange={(e) => setLastname(e.target.value)} />
                                </div>

                                <div>
                                    <Label htmlFor='business_name' className="text-gray-500">Business name</Label>
                                    <Input type="text" id='business_name' className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" name='business_name' value={businessname || ""}
                                        onChange={(e) => setBusinessName(e.target.value)} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 items-center gap-3 mb-3'>
                                <div>
                                    <Label htmlFor="email" className="text-gray-500">Email</Label>
                                    <Input type="email" name="email" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={email?.toLowerCase() || ""} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="phone" className="text-gray-500">Phone</Label>
                                    <Input type="text" name="phone" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={phone || ""} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="phone_2" className="text-gray-500">Alternative Phone</Label>
                                    <Input type="text" name="phone_2" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={phone_2 || ""} onChange={(e) => setPhone2(e.target.value)} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-4 items-center gap-3 mb-3'>
                                <div>
                                    <Label htmlFor="address" className="text-gray-500">Address</Label>
                                    <Input type="text" name="address" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={address || ""} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="address_2" className="text-gray-500">Address 2</Label>
                                    <Input type="text" name="address_2" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={address_2 || ""} onChange={(e) => setAddress2(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="city" className="text-gray-500">City</Label>
                                    <Input type="text" name="city" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={city || ""} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="state" className="text-gray-500">Province/state</Label>
                                    <Select name="state" value={state || ""} onValueChange={(e) => setState(e)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a province/state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Provinces</SelectLabel>
                                                {
                                                    provinces?.map((x) => (

                                                        <SelectItem key={x.label} value={x.value}>{x.label}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </div>
                            </div>


                            <div className='grid grid-cols-1 md:grid-cols-3 items-center gap-3 mb-3'>

                                <div>
                                    <Label htmlFor="imei" className="text-gray-500">IMEI</Label>
                                    <Input type="text" name="imei" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={imei || ""} onChange={(e) => setIMEI(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="serialNumber" className="text-gray-500">Serial number</Label>
                                    <Input type="text" name="serialNumber" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={serialNumber || ""} onChange={(e) => setSerialNumber(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="model" className="text-gray-500">Model</Label>
                                    <Input type="text" name="model" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={model || ""} onChange={(e) => setModel(e.target.value)} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-4 items-center gap-3 mb-3'>
                                <div>
                                    <Label htmlFor="fault" className="text-gray-500">Fault</Label>
                                    <Input type="text" name="fault" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={fault || ""} onChange={(e) => setFault(e.target.value)} />
                                </div>
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
                                    <Input type="text" name='job_repair_no' className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" id='job_repair_no' placeholder='Job repair no' value={job_repair_no} onChange={(e) => setJobRepairNo(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor='password' className="text-gray-500">Password or pin</Label>
                                    <Input type="text" name='password' className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" id='password' placeholder='Password or pin' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor='requires_backup' className="text-gray-500">Requires backup?</Label>
                                    <Select
                                        value={requires_backup}
                                        onValueChange={(e) => setRequiresBackup(e)}
                                        name='requires_backup'
                                    >
                                        <SelectTrigger className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm border border-gray-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent focus-visible:shadow-none">
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
                                    <Input type="text" name='itemCondition' className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" id='itemCondition' placeholder='Item condition' value={itemCondition} onChange={(e) => setItemCondition(e.target.value)} />
                                </div>


                            </div>
                            <div>
                                <Label htmlFor='specialRequirement' className="text-gray-500">Special requirement</Label>
                                <Textarea placeholder='Special requirement' className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" name="specialRequirement" value={specialRequirement} onChange={(e) => setSpecialRequirement(e.target.value)}></Textarea>
                            </div>


                            <Button type="button" className='my-2 w-full text-sm text-gray-100 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] shadow-none border-none' disabled={hhpAddTaskFromGSPNLoading} onClick={createTicket}>
                                {hhpAddTaskFromGSPNLoading ? 'Creating...' : 'Create ticket on repairshopr'}
                            </Button>

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