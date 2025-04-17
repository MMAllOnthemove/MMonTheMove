"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useCheckWarranty from '@/hooks/useCheckHHPWarranty';
import useUserLoggedIn from '@/hooks/useGetUser';
import { assetTypes } from '@/lib/asset_types';
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
    const { addTaskAuto, hhpAddTaskAutoErrors, hhpTasksAutoLoading } = useHHPTasksCrud();
    const { user } = useUserLoggedIn()
    const [itemCondition, setItemCondition] = useState("");
    const [specialRequirement, setSpecialRequirement] = useState("")
    const [password, setPassword] = useState("")
    const [requires_backup, setRequiresBackup] = useState("")
    const [job_repair_no, setJobRepairNo] = useState("")
    const [IMEI, setIMEI] = useState("");
    const [serialNumber, setSerialNumber] = useState("")
    const [modelNumber, setModelNumber] = useState("")
    const [issue_type, setIssueType] = useState("");
    const [openDialog, setOpenDialog] = useState(false)
    const [serviceOrderNumber, setServiceOrder] = useState("")
    // Asset id
    const [assetId, setAssetId] = useState('')
    const [isRework, setIsRework] = useState<boolean>(false);
    const [addRepairNoToTitle, setAddRepairNoToTitle] = useState<boolean>(false);


    const [fault, setFault] = useState("")
    const [extraFault, setExtraFault] = useState("")
    const [openExtraFault, setOpenExtraFault] = useState(false)
    const [openFaultList, setOpenFaultList] = useState(false)


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
        if (isRework && addRepairNoToTitle && openExtraFault) {
            return `*Rework: ${job_repair_no} - ${fault}, ${extraFault}`;
        }
        if (isRework && addRepairNoToTitle) {
            return `*Rework: ${job_repair_no} - ${fault}`;
        }
        if (isRework && openExtraFault) {
            return `*Rework: ${fault}, ${extraFault}`;
        }
        if (addRepairNoToTitle && openExtraFault) {
            return `*${job_repair_no} - ${fault}, ${extraFault}`;
        }
        if (addRepairNoToTitle) {
            return `*${job_repair_no} - ${fault}`;
        }
        if (isRework) {
            return `*Rework: ${fault}`;
        }
        if (openExtraFault) {
            return `*${fault}, ${extraFault}`;
        }

        return `*${fault}`;
    };



    // new do not delete
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
            "service_order_no": serviceOrderNumber,
            "model": modelNumber,
            "warranty": adh === 'ADH' ? adh : localWarranty,
            "imei": IMEI,
            "serial_number": serialNumber,
            "unit_status": "New",
            "department": "HHP",
            "job_added_by": user?.email,
            "stores": resolvedIssueType,
            "accessories_and_condition": itemCondition,
            "additional_info": specialRequirement,
            "job_repair_no": job_repair_no,
            "requires_backup": requires_backup,
            "fault": subject(),
            "repeat_repair": "No",
            "ticket_type_id": `${ticketTypeIdManually}`,
            "adh": adh,
            "password": `${password}`,
            "assetId": assetId,
            "repairshopr_customer_id": customerId,
            "created_by": user?.full_name,
            warrantyCode,
            issue_type: issue_type?.trim(),
            repairshopr_id: user?.repairshopr_id
        }
        await addTaskAuto(payload)

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
                                    className={`flex justify-between border border-gray-200 shadow-none focus-visible:ring-0 focus-visible:shadow-none focus-visible:outline-none w-full`}
                                // className="w-full justify-between text-gray-500 border-red-500 focus:border-red-500 focus-visible:ring-0 focus:shadow-none focus:outline-none"
                                >
                                    {fault
                                        ? faults_hhp.find((framework) => framework.value === fault)?.label
                                        : "Select fault..."}
                                    <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0 text-start">
                                <Command>
                                    <CommandInput placeholder="Search fault..." />
                                    <CommandList>
                                        <CommandEmpty>No faults found.</CommandEmpty>
                                        <CommandGroup>
                                            {faults_hhp.map((framework) => (
                                                <CommandItem
                                                    className="text-start"
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
                        <label className="ml-2 flex gap-2 text-gray-800 text-sm">
                            <input
                                className="cursor-pointer"
                                type="checkbox"
                                checked={isRework}
                                onChange={() => setIsRework((prev) => !prev)}
                            />
                            Rework?
                        </label>
                        <label className="ml-2 flex gap-2 text-gray-800 text-sm">
                            <input
                                className="cursor-pointer"
                                type="checkbox"
                                checked={addRepairNoToTitle}
                                onChange={() => setAddRepairNoToTitle((prev) => !prev)}
                            />
                            Add job repair no to fault?
                        </label>
                        <label className="ml-2 flex gap-2 text-gray-800 text-sm">
                            <input
                                className="cursor-pointer"
                                type="checkbox"
                                checked={openExtraFault}
                                onChange={() => setOpenExtraFault((prev) => !prev)}
                            />
                            Add extra text to fault?
                        </label>
                    </div>
                    <div>
                        <Label htmlFor='serviceOrderNumber' className="text-gray-500">Service order number</Label>
                        <Input type="number" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" name='serviceOrderNumber' id='serviceOrderNumber' placeholder='Service order number' value={serviceOrderNumber || ""} onChange={(e) => setServiceOrder(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='itemCondition' className="text-gray-500">Item condition *</Label>
                        <Input type="text" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" name='itemCondition' id='itemCondition' placeholder='Item condition' value={itemCondition} onChange={(e) => setItemCondition(e.target.value)} />
                    </div>

                </div>
                {
                    openExtraFault && <div>
                        <Label htmlFor='extraFault' className="text-gray-500">Add more faults</Label>
                        <Input type="text" name='extraFault' id='extraFault' placeholder='Add more faults' className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={extraFault} onChange={(e) => setExtraFault(e.target.value)} />
                    </div>
                }
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-2">
                    <div>
                        <Label htmlFor='job_repair_no' className="text-gray-500">Job repair no</Label>
                        <Input type="text" name='job_repair_no' id='job_repair_no' placeholder='Job repair no' className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={job_repair_no} onChange={(e) => setJobRepairNo(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='password' className="text-gray-500">Device password</Label>
                        <Input type="text" name='password' id='password' placeholder='Device password' className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='requires_backup' className="text-gray-500">Requires backup? *</Label>
                        <Select
                            value={requires_backup}
                            onValueChange={(e) => setRequiresBackup(e)}
                            name='requires_backup'

                        >
                            <SelectTrigger className="w-full placeholder:font-regular placeholder:text-gray-400 text-gray-400 outline-none placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none">
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
                    <div>
                        <Label htmlFor='issue_type' className="text-gray-500">Issue type</Label>
                        <Select
                            value={issue_type || ""}
                            onValueChange={(e) => setIssueType(e)}
                            name='stores'
                        >
                            <SelectTrigger className="w-full placeholder:font-regular placeholder:text-gray-400 text-gray-400 outline-none placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none">
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
                    </div>

                </div>

                <div className="mb-2">
                    <Label htmlFor='specialRequirement' className="text-gray-500">Special requirement</Label>
                    <Textarea placeholder='Special requirement' className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={specialRequirement} onChange={(e) => setSpecialRequirement(e.target.value)}></Textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
                    <div>
                        <Label htmlFor='imei' className="text-gray-500">IMEI *</Label>
                        <Input type="text" name="imei" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={IMEI || ""} onChange={(e) => setIMEI(e.target.value)} id='imei' placeholder='IMEI' />
                    </div>
                    <div>
                        <Label htmlFor='model' className="text-gray-500">Model *</Label>
                        <Input type="text" value={modelNumber || ""} className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" placeholder='Model number' onChange={(e) => setModelNumber(e.target.value)} name='model' id='model' />
                    </div>
                    <div>
                        <Label htmlFor='serial_number' className="text-gray-500">Serial number *</Label>
                        <Input type="text" value={serialNumber || ""} className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" placeholder='Serial number' onChange={(e) => setSerialNumber(e.target.value)} name='serial_number' id='serial_number' />
                    </div>
                    <div>
                        <Label htmlFor='selectedWarranty' className="text-gray-500">Select warranty *</Label>
                        <Select
                            value={selectedWarranty || ""}
                            onValueChange={handleWarrantyChange}
                            name='selectedWarranty'
                        >
                            <SelectTrigger className={`${hhpAddTaskAutoErrors.warranty && 'border-red-500 focus:border-red-500 border border-1'} border border-gray-200 shadow-none focus-visible:ring-0 focus-visible:shadow-none focus-visible:outline-none w-full`}>
                                <SelectValue placeholder="Select warranty" />
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
                    <div className="flex gap-2 items-center cursor-pointer">
                        <label htmlFor='adh' className="text-gray-500">

                            ADH Warranty
                        </label>
                        <input
                            type="checkbox"
                            checked={adh === 'ADH'}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                </div>
                {warranty ? <p className="text-lg font-semibold text-sky-700 md:text-xl text-center my-3">Unit is {warranty === "LP" ? "IW" : warranty}</p> : ""}

                <Button type="submit" className='w-full text-sm text-gray-100 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] shadow-none border-none' disabled={hhpTasksAutoLoading}>
                    {hhpTasksAutoLoading ? 'Creating...' : 'Create ticket'}
                </Button>

            </form>



        </>
    )
}

export default HHP