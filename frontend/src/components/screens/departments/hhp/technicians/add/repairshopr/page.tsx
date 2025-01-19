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
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useFetchEngineer from '@/hooks/useFetchEngineers';
import useGetStores from '@/hooks/useGetStores';
import useUserLoggedIn from '@/hooks/useGetUser';
import { useHHPTasksCrud } from '@/hooks/useHHPTasksCrud';
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket';
import { datetimestamp } from '@/lib/date_formats';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AddRepairshoprHHPTask = ({ onChange }: { onChange: (value: boolean) => void }) => {
    const { user } = useUserLoggedIn()
    const { updateRepairTicket } = useRepairshoprTicket()
    const [searchTicket, setSearchTicket] = useState("")
    const [warranty, setWarranty] = useState("")
    const [engineer, setEngineer] = useState('');
    const [status, setStatus] = useState("")
    const [stores, setStore] = useState("");

    const [repeat_repair, setRepeatRepair] = useState("")
    const { engineersList } = useFetchEngineer()
    const { storesList } = useGetStores()
    const { hhpAddTaskLoading, addTask, hhpAddTaskErrors } = useHHPTasksCrud()
    const [repairshopr_id, setUserId] = useState<string | number | undefined>("");

    const engineerListFomatted = engineersList?.map((user) => ({
        id: user?.id,
        repairshopr_id: user?.repairshopr_id,
        value: user?.engineer_firstname + " " + user?.engineer_lastname,
        label: user?.engineer_firstname
    }))


    const [imei, setIMEI] = useState("")
    const [repairshoprIMEI, setRepairshoprIMEI] = useState<string>("")
    const [repairshopr_job_id, setRepairshoprJobId] = useState('')
    const [service_order_no, setServiceOrderNo] = useState("")
    const [fault, setFault] = useState("")
    const [ticket_number, setTicketNumber] = useState("")
    const [assetId, setAssetId] = useState("")
    const [date_booked, setDateBooked] = useState("")
    const [model, setModel] = useState("")
    const [serial_number, setSerialNumber] = useState("")
    const [department] = useState("HHP")
    const [loadApi, setLoadpi] = useState(false)
    const [engineersComboBox, setEngineerComboBox] = useState(false)


    const [job_repair_no, setJobRepair] = useState("")
    const [accessories_and_condition, setItemCondition] = useState("")
    const [requires_backup, setBackupCode] = useState("")
    const [rs_warranty, setRSWarranty] = useState("")
    const [repairshopr_customer_id, setCustomerRSId] = useState("")



    // Fetch ticket info
    useEffect(() => {
        const fetchRSData = async () => {
            if (!searchTicket) return
            try {
                const { data } = await axios.get(`https://allelectronics.repairshopr.com/api/v1/tickets?query=${searchTicket}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                });
                if (data?.tickets[0]?.number == searchTicket) {
                    if (data?.tickets[0]?.ticket_type_name === "In Warranty") setWarranty('IW') // ticket_type_name is new in the api
                    if (data?.tickets[0]?.ticket_type_name === "Out of Warranty") setWarranty('OOW')
                    setServiceOrderNo(data?.tickets[0]["properties"]["Service Order No."])
                    setJobRepair(data?.tickets[0]["properties"]["Job Repair No.:"])
                    setItemCondition(data?.tickets[0]["properties"]["Item Condition"])
                    setBackupCode(data?.tickets[0]["properties"]["Backup Requires"])
                    setRSWarranty(data?.tickets[0]["properties"]["Warranty"])
                    setCustomerRSId(data?.tickets?.customer_id)
                    setRepairshoprIMEI(data?.tickets[0]["properties"]["IMEI"])
                    setIMEI(data?.tickets[0]["properties"]["IMEI"])
                    setTicketNumber(data?.tickets[0]?.number)
                    setRepairshoprJobId(data?.tickets[0]?.id)
                    setStatus(data?.tickets[0]?.status)
                    setDateBooked(data?.tickets[0]?.created_at
                    )
                    setFault(data?.tickets[0]?.subject)
                    if (data?.tickets[0]?.subject.startsWith('Rework')) setRepeatRepair('Yes')
                    if (!data?.tickets[0]?.subject.startsWith('Rework')) setRepeatRepair('No')
                }
            } catch (error) {
                if (process.env.NODE_ENV !== "production") console.error(error)
            }
        };
        fetchRSData();
    }, [searchTicket]);

    useEffect(() => {
        const fetchRSByIdData = async () => {
            try {
                if (!repairshopr_job_id) return;
                const { data } = await axios.get(`https://allelectronics.repairshopr.com/api/v1/tickets/${repairshopr_job_id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                });

                if (data?.ticket?.id == repairshopr_job_id) {
                    setAssetId(data?.ticket?.asset_ids[0])
                }
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error)
                }
            }
        }

        fetchRSByIdData();
    }, [searchTicket, repairshopr_job_id]);


    useEffect(() => {
        const fetchRSByAssetData = async () => {
            setLoadpi(true)
            if (!assetId) return
            try {
                const { data } = await axios.get(`https://allelectronics.repairshopr.com/api/v1/customer_assets/${assetId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                });

                if (data?.asset?.id == assetId) {
                    // setIMEI(data?.asset?.properties["IMEI No."])
                    setModel(data?.asset?.properties["Model No.:"])
                    setSerialNumber(data?.asset?.asset_serial)

                }
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error)
                }
            } finally {
                setLoadpi(false)
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
            engineer: engineer,
            fault,
            imei: imei ?? repairshoprIMEI,
            serial_number,
            status,
            ticket_number,
            department,
            job_added_by,
            stores,
            repairshopr_job_id,
            repeat_repair,
            created_at,
            job_repair_no,
            accessories_and_condition,
            requires_backup,
            rs_warranty,
            repairshopr_customer_id
        }
        const userIdPayload = {
            "user_id": repairshopr_id,
        }

        await addTask(payload)
        if (engineer) await updateRepairTicket(repairshopr_job_id, userIdPayload)
        setSearchTicket('')
        setWarranty('')
        setEngineer('')
        setStatus('')
        setStore('')
        setRepeatRepair('')
        setIMEI('')
        setRepairshoprJobId('')
        setServiceOrderNo('')
        setFault('')
        setTicketNumber('')
        setAssetId('')
        setDateBooked('')
        setModel('')
        setSerialNumber('')
        setJobRepair('')
        setItemCondition('')
        setBackupCode('')
        setRSWarranty('')
        setCustomerRSId('')

        if (hhpAddTaskErrors) {
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
                    <Input type="text" name="imei" defaultValue={loadApi ? 'Loading...' : imei} disabled aria-disabled />
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
                                    : "Assign to"}
                                <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search technician..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>Technician not found.</CommandEmpty>
                                    <CommandGroup>
                                        {engineerListFomatted?.map((framework) => (
                                            <CommandItem
                                                key={framework.value}
                                                value={framework.value}
                                                onSelect={(currentValue) => {
                                                    setEngineer(currentValue === engineer ? "" : currentValue)
                                                    setUserId(framework?.repairshopr_id); // Store the corresponding repairshopr ID
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



                    {hhpAddTaskErrors.engineer && <p className="text-sm text-red-500 font-medium">{hhpAddTaskErrors.engineer}</p>}

                </div>


                <div className="mb-3">
                    <Select value={stores} onValueChange={(e) => setStore(e)} name='stores'>
                        <SelectTrigger >
                            <SelectValue placeholder="Select store" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Service types</SelectLabel>
                                {storesList.map((store) => (
                                    <SelectItem key={store.id} value={store.store_name}>
                                        {store.store_name}
                                    </SelectItem>
                                ))}

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {hhpAddTaskErrors.stores && <p className="text-sm text-red-500 font-medium">{hhpAddTaskErrors.stores}</p>}

                </div>
                <Button className="w-full outline-none" type="submit" onClick={handleSubmit} disabled={hhpAddTaskLoading}> {hhpAddTaskLoading ? 'Adding...' : 'Add task'}</Button>
            </form >
        </div >
    )
}

export default AddRepairshoprHHPTask
