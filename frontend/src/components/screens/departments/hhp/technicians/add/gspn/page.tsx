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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useAddHHPTask from '@/hooks/useAddHHPTask'
import useFetchEngineer from '@/hooks/useFetchEngineers'
import useGetStores from '@/hooks/useGetStores'
import useUserLoggedIn from '@/hooks/useGetUser'
import useIpaasGetSOInfoAll from '@/hooks/useIpaasGetSoInfoAll'
import useRepairshoprFetchTicket from '@/hooks/useRepairshoprFetchTicket'
import { datetimestamp } from '@/lib/date_formats'
import repairshopr_statuses from '@/lib/repairshopr_status'
import { cn } from "@/lib/utils"
import warranties from '@/lib/warranties'
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"
import moment from 'moment'
import React, { useEffect, useState } from 'react'


const AddgspnHHPTask = ({ onChange }: { onChange: (value: boolean) => void }) => {
    const { user } = useUserLoggedIn()
    const { engineersList } = useFetchEngineer()
    const { storesList } = useGetStores()

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

    const { fetchRSTicketData } = useRepairshoprFetchTicket(ticket_number)


    useEffect(() => {
        if (fetchRSTicketData) {
            setTicketNumber(fetchRSTicketData?.tickets[0]?.number)
            setRepairshoprJobId(fetchRSTicketData?.tickets[0]?.id)
        }
    }, [fetchRSTicketData])

    useEffect(() => {
        const handleGetSOInfo = async (serviceOrder: string) => {
            try {
                const data = await getSOInfoAllTookan(serviceOrder);

                setIMEI(data?.Return?.EsModelInfo?.IMEI);
                setServiceOrderNo(data?.Return?.EsHeaderInfo?.SvcOrderNo);
                setDateGSPNBooked(data?.Return?.EsHeaderInfo?.CreateDate);
                setTimeBooked(data?.Return?.EsHeaderInfo?.CreateTime);
                setModel(data?.Return?.EsModelInfo?.Model);
                setSerialNumber(data?.Return?.EsModelInfo?.SerialNo);
                setFault(data?.Return?.EsModelInfo?.DefectDesc);
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error)
                }
            }
        };
        handleGetSOInfo(searchServiceOrder)
    }, [searchServiceOrder, getSOInfoAllTookan])


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const job_added_by = user?.email;
        const created_at = datetimestamp;

        const date_booked = moment(`${date_gspn_booked}${time_booked}`, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss.SSS");

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

export default AddgspnHHPTask
