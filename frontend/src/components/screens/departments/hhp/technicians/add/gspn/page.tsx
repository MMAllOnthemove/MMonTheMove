import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAddHHPTask from '@/hooks/useAddHHPTask'
import useFetchEngineer from '@/hooks/useFetchEngineers'
import useGetStores from '@/hooks/useGetStores'
import useUserLoggedIn from '@/hooks/useGetUser'
import useHHPTasks from '@/hooks/useHHPTasks'
import useIpaasGetSOInfoAll from '@/hooks/useIpaasGetSoInfoAll'
import useRepairshoprFetchTicket from '@/hooks/useRepairshoprFetchTicket'
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket'
import { datetimestamp } from '@/lib/date_formats'
import repairshopr_statuses from '@/lib/repairshopr_status'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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


    const { addTask, addHHPTaskLoading, addHHPTaskErrors } = useAddHHPTask();
    const { refetchHhpTasks } = useHHPTasks()
    const { getSOInfoAllTookan } = useIpaasGetSOInfoAll();
    const [searchServiceOrder, setSearchSericeOrder] = useState("")
    const [warranty, setWarranty] = useState("")
    const [engineer, setEngineer] = useState({ repairshopr_id: '', value: '' });

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
        if (!ticket_number) return;
        // setTicketNumber(fetchRSTicketData?.tickets[0]?.number)
        setRepairshoprJobId(fetchRSTicketData?.tickets[0]?.id)

    }, [fetchRSTicketData])

    useEffect(() => {
        const handleGetSOInfo = async (serviceOrder: string) => {
            setLoadGSPNApiData(true)
            if (!serviceOrder) return;
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

    const handleEngineer = (value: string) => {
        // Find the selected engineer by full name (value)
        const selected = engineerListFomatted.find((engineer) => engineer.value === value);
        if (selected) {
            setEngineer({ repairshopr_id: `${selected.repairshopr_id}`, value: selected.value });
        }
    };


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
            engineer: engineer?.value,
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
            "user_id": Number(engineer?.repairshopr_id),
        }
        await addTask(payload)
        if (engineer?.value !== "" || engineer?.value !== null || engineer?.value !== undefined) await updateRepairTicket(repairshopr_job_id, userIdPayload)
        setSearchSericeOrder('')
        setWarranty('')
        setEngineer({ repairshopr_id: '', value: '' })
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
        refetchHhpTasks()
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
                    <Select value={status} onValueChange={(e) => setStatus(e)}>
                        <SelectTrigger >
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Statuses</SelectLabel>
                                {repairshopr_statuses.map((stat) => (
                                    <SelectItem key={stat.id} value={stat._status}>
                                        {stat._status}
                                    </SelectItem>
                                ))}

                            </SelectGroup>
                        </SelectContent>
                    </Select>


                    {addHHPTaskErrors.status && <p className="text-sm text-red-500 font-medium">{addHHPTaskErrors.status}</p>}

                </div>
                <div className="mb-3">
                    <Select onValueChange={handleEngineer}>
                        <SelectTrigger >
                            <SelectValue placeholder="Select an engineer" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Technicians</SelectLabel>
                                {engineerListFomatted.map((x) => (
                                    <SelectItem key={x.repairshopr_id} value={x.value}>
                                        {x.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {addHHPTaskErrors.engineer && <p className="text-sm text-red-500 font-medium">{addHHPTaskErrors.engineer}</p>}

                </div>

                <div className="mb-3">
                    <Select value={stores} onValueChange={(e) => setStore(e)}>
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
                    {addHHPTaskErrors.stores && <p className="text-sm text-red-500 font-medium">{addHHPTaskErrors.stores}</p>}

                </div>
                <Button className="w-full outline-none" type="submit" onClick={handleSubmit} disabled={addHHPTaskLoading}> {addHHPTaskLoading ? 'Adding...' : 'Add task'}</Button>
            </form>
        </div>
    )
}

export default AddgspnHHPTask
