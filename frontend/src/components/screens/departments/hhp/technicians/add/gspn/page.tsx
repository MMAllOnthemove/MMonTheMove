import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import useAddHHPTask from '@/hooks/useAddHHPTask'
import useFetchEngineer from '@/hooks/useFetchEngineers'
import useGetStores from '@/hooks/useGetStores'
import useUserLoggedIn from '@/hooks/useGetUser'
import useIpaasGetSOInfoAll from '@/hooks/useIpaasGetSoInfoAll'
import useRepairshoprFetchTicket from '@/hooks/useRepairshoprFetchTicket'
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket'
import { datetimestamp } from '@/lib/date_formats'
import repairshopr_statuses from '@/lib/repairshopr_status'
import { cn } from "@/lib/utils"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"
// import moment from 'moment-timezone';
import moment from 'moment'
import React, { useEffect, useState } from 'react'


const AddgspnHHPTask = ({ onChange }: { onChange: (value: boolean) => void }) => {
    const { user } = useUserLoggedIn()
    const { engineersList } = useFetchEngineer()
    const { storesList } = useGetStores()
    const [repairshopr_id, setUserId] = useState<number | undefined>(); // To store the selected repairshopr user ID
    const { updateRepairTicket } = useRepairshoprTicket()
    const engineerListFomatted = engineersList?.map((user) => ({
        repairshopr_id: user?.repairshopr_id,
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

    const { addTask, addHHPTaskLoading, addHHPTaskErrors } = useAddHHPTask();
    const { getSOInfoAllTookan } = useIpaasGetSOInfoAll();
    const [searchServiceOrder, setSearchSericeOrder] = useState("")
    const [warranty, setWarranty] = useState("")
    const [engineer, setEngineer] = useState("")
    const [status, setStatus] = useState("")
    const [stores, setStore] = useState("")
    const [repeat_repair, setRepeatRepair] = useState('')
    const [imei, setIMEI] = useState("")
    const [repairshopr_job_id, setRepairshoprJobId] = useState<number | undefined>()
    const [service_order_no, setServiceOrderNo] = useState("")
    const [fault, setFault] = useState("")
    const [ticket_number, setTicketNumber] = useState<string | undefined>('')
    const [date_gspn_booked, setDateGSPNBooked] = useState("")
    const [time_booked, setTimeBooked] = useState("")
    const [model, setModel] = useState("")
    const [serial_number, setSerialNumber] = useState("")
    const [open, setOpen] = useState(false)
    const [storeComboBox, setStoreComboBox] = useState(false)
    const [engineersComboBox, setEngineerComboBox] = useState(false)
    const [department] = useState("HHP")
    const [loadGSPNApiData, setLoadGSPNApiData] = useState(false)
    const { fetchRSTicketData } = useRepairshoprFetchTicket(ticket_number)


    useEffect(() => {
        if (fetchRSTicketData) {
            setTicketNumber(fetchRSTicketData?.tickets[0]?.number)
            setRepairshoprJobId(fetchRSTicketData?.tickets[0]?.id)
        }
    }, [fetchRSTicketData])

    useEffect(() => {
        const handleGetSOInfo = async (serviceOrder: string) => {
            setLoadGSPNApiData(true)
            try {
                const data = await getSOInfoAllTookan(serviceOrder);
                if (data?.Return?.EsModelInfo?.WtyType === "OW") setWarranty('OOW')
                if (data?.Return?.EsModelInfo?.WtyType === "LP") setWarranty('IW')

                setIMEI(data?.Return?.EsModelInfo?.IMEI);
                setServiceOrderNo(data?.Return?.EsHeaderInfo?.SvcOrderNo);
                setDateGSPNBooked(data?.Return?.EsHeaderInfo?.CreateDate);
                setTimeBooked(data?.Return?.EsHeaderInfo?.CreateTime);
                setModel(data?.Return?.EsModelInfo?.Model);
                setSerialNumber(data?.Return?.EsModelInfo?.SerialNo);
                setFault(data?.Return?.EsModelInfo?.DefectDesc);
                if (data?.Return?.EsJobInfo?.RedoFlag === 'Y') setRepeatRepair('Yes')
                if (data?.Return?.EsJobInfo?.RedoFlag === 'N') setRepeatRepair('No')
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error)
                }
            } finally {
                setLoadGSPNApiData(false);
            }
        };
        handleGetSOInfo(searchServiceOrder)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchServiceOrder])


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const job_added_by = user?.email;
        const created_at = datetimestamp;  // const date_booked = moment.tz(`${date_gspn_booked}${date_gspn_booked}`, "YYYYMMDDHHmmss", "Africa/Johannesburg");
        const date_booked = moment(`${date_gspn_booked}${time_booked}`, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss");


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
        const userIdPayload = {
            "user_id": repairshopr_id,
        }
        await addTask(payload)
        if (engineer !== "" || engineer !== null || engineer !== undefined) await updateRepairTicket(repairshopr_job_id, userIdPayload)
        setSearchSericeOrder('')
        setWarranty('')
        setEngineer('')
        setStatus('')
        setStore('')
        setRepeatRepair('')
        setIMEI('')
        setRepairshoprJobId(0)
        setServiceOrderNo('')
        setFault('')
        setTicketNumber('')
        setDateGSPNBooked('')
        setTimeBooked('')
        setModel('')
        setSerialNumber('')
        // Ensure onChange is defined before calling it
        if (addHHPTaskErrors) {
            onChange(false)
        }

    }
    return (
        <div>
            <form>
                <div className="mb-3">
                    <Label htmlFor="searchServiceOrder">Service order number</Label>
                    <Input type="text" name="searchServiceOrder" value={searchServiceOrder} onChange={(e) => setSearchSericeOrder(e.target.value)} />

                </div>
                <div className="mb-3">
                    <Label htmlFor="ticket_number">Ticket number</Label>
                    <Input type="text" name="ticket_number" value={ticket_number} onChange={(e) => setTicketNumber(e.target.value)} />
                    {addHHPTaskErrors.ticket_number && <p className="text-sm text-red-500 font-medium">{addHHPTaskErrors.ticket_number}</p>}
                </div>
                <div className="mb-3">
                    <Label htmlFor="imei">IMEI</Label>
                    <Input type="text" name="imei" defaultValue={loadGSPNApiData ? 'Loading...' : imei} disabled aria-disabled />
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
                    {addHHPTaskErrors.engineer && <p className="text-sm text-red-500 font-medium">{addHHPTaskErrors.engineer}</p>}

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
                <Button className="w-full outline-none" type="submit" onClick={handleSubmit} disabled={addHHPTaskLoading}> {addHHPTaskLoading ? 'Adding...' : 'Add task'}</Button>
            </form>
        </div>
    )
}

export default AddgspnHHPTask
