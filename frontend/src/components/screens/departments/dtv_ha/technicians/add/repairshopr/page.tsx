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
import useAddDTVHATask from '@/hooks/useAddDTVHATask';
import useFetchEngineer from '@/hooks/useFetchEngineers';
import useGetStores from '@/hooks/useGetStores';
import useUserLoggedIn from '@/hooks/useGetUser';
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket';
import { datetimestamp } from '@/lib/date_formats';
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const AddRepairshoprDTVHATask = ({ onChange }: { onChange: (value: boolean) => void }) => {
    const { user } = useUserLoggedIn()
    const { updateRepairTicket } = useRepairshoprTicket()
    const [searchTicket, setSearchTicket] = useState("")
    const [warranty, setWarranty] = useState("")
    const [engineer, setEngineer] = useState("")
    const [status, setStatus] = useState("")
    const [stores, setStore] = useState("")
    const [repeat_repair, setRepeatRepair] = useState("")
    const { engineersList } = useFetchEngineer()
    const { storesList } = useGetStores()
    const { addTask, addDTVHATaskLoading, addDTVHATaskErrors } = useAddDTVHATask();
    const [repairshopr_id, setUserId] = useState<number | undefined>(); // To store the selected repairshopr user ID

    const engineerListFomatted = engineersList?.map((user) => ({
        id: user?.id,
        repairshopr_id: user?.repairshopr_id,
        value: user?.engineer_firstname + " " + user?.engineer_lastname,
        label: user?.engineer_firstname
    }))
    const storeListFomatted = storesList?.map((user) => ({
        value: user?.store_name,
        label: user?.store_name
    }))

    const [repairshopr_job_id, setRepairshoprJobId] = useState('')
    const [service_order_no, setServiceOrderNo] = useState("")
    const [fault, setFault] = useState("")
    const [ticket_number, setTicketNumber] = useState("")
    const [assetId, setAssetId] = useState("")
    const [date_booked, setDateBooked] = useState("")
    const [model, setModel] = useState("")
    const [serial_number, setSerialNumber] = useState("")
    const [storeComboBox, setStoreComboBox] = useState(false)
    const [engineersComboBox, setEngineerComboBox] = useState(false)
    const [department] = useState("DTV/HA")
    const [loadApi, setLoadpi] = useState(false)

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
                if (data?.tickets[0]["properties"]["Warranty"] || data?.tickets[0]["properties"]["Warranty "] === '69476' || 69476) setWarranty('IW')
                if (data?.tickets[0]["properties"]["Warranty"] || data?.tickets[0]["properties"]["Warranty "] === '69477' || 69477) setWarranty('OOW')
                setServiceOrderNo(data?.tickets[0]["properties"]["Service Order No."])
                setTicketNumber(data?.tickets[0]?.number)
                setRepairshoprJobId(data?.tickets[0]?.id)
                setStatus(data?.tickets[0]?.status)
                setDateBooked(data?.tickets[0]?.created_at
                )
                setFault(data?.tickets[0]?.subject)
                if (data?.tickets[0]?.subject.startsWith('Rework')) setRepeatRepair('Yes')
                if (!data?.tickets[0]?.subject.startsWith('Rework')) setRepeatRepair('No')
            }
        };
        fetchRSData();
    }, [searchTicket]);

    useEffect(() => {
        const fetchRSByIdData = async () => {
            try {
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
            try {

                const { data } = await axios.get(`https://allelectronics.repairshopr.com/api/v1/customer_assets/${assetId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                });

                if (data?.asset?.id == assetId) {
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
            engineer,
            fault,
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
        setRepairshoprJobId('')
        setServiceOrderNo('')
        setFault('')
        setTicketNumber('')
        setAssetId('')
        setDateBooked('')
        setModel('')
        setSerialNumber('')
        if (addDTVHATaskErrors) {
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
                    <Label htmlFor="serial_number">Serial number</Label>
                    <Input type="text" name="serial_number" defaultValue={loadApi ? 'Loading...' : serial_number} disabled aria-disabled />
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

                                                key={framework.id}
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
                    {addDTVHATaskErrors.engineer && <p className="text-sm text-red-500 font-medium">{addDTVHATaskErrors.engineer}</p>}

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
                    {addDTVHATaskErrors.stores && <p className="text-sm text-red-500 font-medium">{addDTVHATaskErrors.stores}</p>}

                </div>
                <Button className="w-full outline-none" type="submit" onClick={handleSubmit} disabled={addDTVHATaskLoading}> {addDTVHATaskLoading ? 'Adding...' : 'Add task'}</Button>
            </form>
        </div>
    )
}

export default AddRepairshoprDTVHATask
