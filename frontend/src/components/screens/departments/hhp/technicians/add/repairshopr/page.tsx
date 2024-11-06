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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useAddHHPTask from '@/hooks/useAddHHPTask';
import useFetchEngineer from '@/hooks/useFetchEngineers';
import useGetStores from '@/hooks/useGetStores';
import useUserLoggedIn from '@/hooks/useGetUser';
import { datetimestamp } from '@/lib/date_formats';
import repairshopr_statuses from '@/lib/repairshopr_status';
import { cn } from "@/lib/utils";
import warranties from '@/lib/warranties';
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const AddRepairshoprHHPTask = ({ onChange }: { onChange: (value: boolean) => void }) => {
    const { user } = useUserLoggedIn()
    const [searchTicket, setSearchTicket] = useState("")
    const [warranty, setWarranty] = useState("")
    const [engineer, setEngineer] = useState("")
    const [status, setStatus] = useState("")
    const [stores, setStore] = useState("")
    const [repeat_repair, setRepeatRepair] = useState("")
    const { engineersList } = useFetchEngineer()
    const { storesList } = useGetStores()
    const { addTask, addHHPTaskLoading, addHHPTaskErrors } = useAddHHPTask();
    const engineerListFomatted = engineersList?.map((user) => ({
        value: user?.engineer_firstname + " " + user?.engineer_lastname,
        label: user?.engineer_firstname
    }))
    const storeListFomatted = storesList?.map((user) => ({
        value: user?.store_name,
        label: user?.store_name
    }))
    const statusListFomatted = repairshopr_statuses?.map((user) => ({
        value: user?._status,
        label: user?._status
    }))
    const [imei, setIMEI] = useState("")
    const [repairshopr_job_id, setRepairshoprJobId] = useState('')
    const [service_order_no, setServiceOrderNo] = useState("")
    const [fault, setFault] = useState("")
    const [ticket_number, setTicketNumber] = useState("")
    const [assetId, setAssetId] = useState("")
    const [date_booked, setDateBooked] = useState("")
    const [model, setModel] = useState("")
    const [serial_number, setSerialNumber] = useState("")
    const [open, setOpen] = useState(false)
    const [storeComboBox, setStoreComboBox] = useState(false)
    const [engineersComboBox, setEngineerComboBox] = useState(false)
    const [department] = useState("HHP")

    // Fetch ticket info
    useEffect(() => {
        const fetchRSData = async () => {
            const { data } = await axios.get(`https://allelectronics.repairshopr.com/api/v1/tickets?query=${searchTicket}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                },
            });
            if (data?.tickets[0]?.number == searchTicket) {
                setServiceOrderNo(data?.tickets[0]["properties"]["Service Order No."])
                setTicketNumber(data?.tickets[0]?.number)
                setRepairshoprJobId(data?.tickets[0]?.id)
                setDateBooked(data?.tickets[0]?.created_at
                )
                setFault(data?.tickets[0]?.subject)
            }
        };
        fetchRSData();
    }, [searchTicket]);

    useEffect(() => {
        const fetchRSByIdData = async () => {
            const { data } = await axios.get(`https://allelectronics.repairshopr.com/api/v1/tickets/${repairshopr_job_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                },
            });

            if (data?.ticket?.id == repairshopr_job_id) {
                setAssetId(data?.ticket?.asset_ids[0])
            }

        };
        fetchRSByIdData();
    }, [searchTicket, repairshopr_job_id]);


    useEffect(() => {
        const fetchRSByAssetData = async () => {
            const { data } = await axios.get(`https://allelectronics.repairshopr.com/api/v1/customer_assets/${assetId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                },
            });

            if (data?.asset?.id == assetId) {
                setIMEI(data?.asset?.properties["IMEI No."])
                setModel(data?.asset?.properties["Model No.:"])
                setSerialNumber(data?.asset?.asset_serial)

            }

        };
        fetchRSByAssetData();
    }, [searchTicket, assetId]);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const job_added_by = user?.email
        const created_at = datetimestamp;
        const payload = {
            service_order_no,
            date_booked,
            model,
            warranty,
            engineer,
            fault,
            imei,
            serial_number,
            status,
            ticket_number,
            department,
            job_added_by,
            stores,
            repairshopr_job_id,
            repeat_repair,
            created_at
        }
        await addTask(payload)
        if (addHHPTaskErrors) {
            onChange(false)
        }


    }
    return (
        <div>
            <form>
                <div className="mb-3">
                    <Label htmlFor="ticket_number">Ticket number</Label>
                    <Input type="text" name="ticket_number" value={searchTicket} onChange={(e) => setSearchTicket(e.target.value)} />

                </div>
                <div className="mb-3">
                    <Label htmlFor="imei">IMEI</Label>
                    <Input type="text" name="imei" defaultValue={imei} disabled aria-disabled />
                </div>
                <div className="mb-3">

                    <Select name="warranty" value={warranty} onValueChange={(e) => setWarranty(e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select warranty" />
                        </SelectTrigger>
                        <SelectContent>
                            {warranties.map((dep) => (
                                <SelectItem key={dep.id} value={`${dep.warranty}`}>{`${dep.warranty}`}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {addHHPTaskErrors.warranty && <p className="text-sm text-red-500 font-medium">{addHHPTaskErrors.warranty}</p>}

                </div>
                <div className="mb-3">
                    <Popover open={engineersComboBox} onOpenChange={setEngineerComboBox}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={engineersComboBox}
                                className="w-full justify-between"
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
                                                value={framework.value}
                                                onSelect={(currentValue) => {
                                                    setEngineer(currentValue === engineer ? "" : currentValue)
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
                    {addHHPTaskErrors.engineer && <p className="text-sm text-red-500 font-medium">{addHHPTaskErrors.engineer}</p>}

                </div>
                <div className="mb-3">

                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                            >
                                {status
                                    ? statusListFomatted?.find((framework) => framework.value === status)?.label
                                    : "Select status..."}
                                <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search status..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No status found.</CommandEmpty>
                                    <CommandGroup>
                                        {statusListFomatted?.map((framework) => (
                                            <CommandItem

                                                key={framework.value}
                                                value={framework.value}
                                                onSelect={(currentValue) => {
                                                    setStatus(currentValue === status ? "" : currentValue)
                                                    setOpen(false)
                                                }}
                                            >
                                                {framework.label}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        status === framework.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {addHHPTaskErrors.status && <p className="text-sm text-red-500 font-medium">{addHHPTaskErrors.status}</p>}

                </div>
                <div className="mb-3">
                    <Popover open={storeComboBox} onOpenChange={setStoreComboBox}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={storeComboBox}
                                className="w-full justify-between"
                            >
                                {stores
                                    ? storeListFomatted?.find((framework) => framework.value === stores)?.label
                                    : "Select store or customer..."}
                                <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search type of customer..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No customer type found.</CommandEmpty>
                                    <CommandGroup>
                                        {storeListFomatted?.map((framework) => (
                                            <CommandItem

                                                key={framework.value}
                                                value={framework.value}
                                                onSelect={(currentValue) => {
                                                    setStore(currentValue === stores ? "" : currentValue)
                                                    setStoreComboBox(false)
                                                }}
                                            >
                                                {framework.label}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        stores === framework.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {addHHPTaskErrors.stores && <p className="text-sm text-red-500 font-medium">{addHHPTaskErrors.stores}</p>}

                </div>
                <div className="mb-3">
                    <Select name="repeat_repair" value={repeat_repair} onValueChange={(e) => setRepeatRepair(e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Repeat repair?" />
                        </SelectTrigger>
                        <SelectContent>

                            <SelectItem value={'Yes'}>Yes</SelectItem>
                            <SelectItem value={'No'}>No</SelectItem>

                        </SelectContent>
                    </Select>
                    {addHHPTaskErrors.repeat_repair && <p className="text-sm text-red-500 font-medium">{addHHPTaskErrors.repeat_repair}</p>}

                </div>
                <Button className="w-full outline-none" type="submit" onClick={handleSubmit} disabled={addHHPTaskLoading}> {addHHPTaskLoading ? 'Adding...' : 'Add task'}</Button>
            </form>
        </div>
    )
}

export default AddRepairshoprHHPTask
