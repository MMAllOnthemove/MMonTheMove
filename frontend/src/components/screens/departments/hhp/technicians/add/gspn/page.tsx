import useAddHHPTask from '@/hooks/useAddHHPTask'
import useGetStores from '@/hooks/useGetStores'
import useUserLoggedIn from '@/hooks/useGetUser'
import { closeModalInParent } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import warranties from '@/lib/warranties'
import useFetchEngineer from '@/hooks/useFetchEngineers'
import repairshopr_statuses from '@/lib/repairshopr_status'
import { Button } from '@/components/ui/button'
import useRepairshoprFetchTicket from '@/hooks/useRepairshoprFetchTicket'
import useIpaasGetSOInfoAll from '@/hooks/useIpaasGetSoInfoAll'




const AddgspnHHPTask = ({ onChange }: { onChange: (value: boolean) => void }) => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { engineersList } = useFetchEngineer()
    const { storesList } = useGetStores()
    const { addTask, addHHPTaskLoading, addHHPTaskErrors } = useAddHHPTask();
    const { getSOInfoAllTookan } = useIpaasGetSOInfoAll();
    const [searchServiceOrder, setSearchSericeOrder] = useState("")
    const [warranty, setWarranty] = useState("")
    const [engineer, setEngineer] = useState("")
    const [status, setStatus] = useState("")
    const [stores, setStore] = useState("")
    const [repeat_repair, setRepeatRepair] = useState('')
    const [imei, setIMEI] = useState("")
    const [repairshopr_job_id, setRepairshoprJobId] = useState('')
    const [service_order_no, setServiceOrderNo] = useState("")
    const [fault, setFault] = useState("")
    const [ticket_number, setTicketNumber] = useState("")
    const [date_booked, setDateBooked] = useState("")
    const [model, setModel] = useState("")
    const [serial_number, setSerialNumber] = useState("")

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
                setDateBooked(data?.Return?.EsHeaderInfo?.CreateDate);
                setModel(data?.Return?.EsModelInfo?.Model);
                setSerialNumber(data?.Return?.EsModelInfo?.SerialNo);
                setFault(data?.Return?.EsModelInfo?.DefectDesc);
            } catch (error) {
                console.error(error);
            }
        };
        handleGetSOInfo(searchServiceOrder)
    }, [searchServiceOrder, getSOInfoAllTookan])


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const job_added_by = user?.email
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
            // for these two we will handle in the backend as false for pending
            // parts_pending,
            // parts_pending_date,
            stores,
            repairshopr_job_id,
            repeat_repair,
        }
        console.log(payload)
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

                    <Select name="engineer" value={engineer} onValueChange={(e) => setEngineer(e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select engineer" />
                        </SelectTrigger>
                        <SelectContent>
                            {engineersList.map((dep) => (
                                <SelectItem key={dep.unique_id} value={`${dep.engineer_firstname} ${dep?.engineer_lastname}`}>{`${dep.engineer_firstname} ${dep?.engineer_lastname}`}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {addHHPTaskErrors.engineer && <p className="text-sm text-red-500 font-medium">{addHHPTaskErrors.engineer}</p>}

                </div>
                <div className="mb-3">

                    <Select name="status" value={status} onValueChange={(e) => setStatus(e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {repairshopr_statuses.map((dep) => (
                                <SelectItem key={dep.id} value={`${dep._status}`}>{`${dep._status}`}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {addHHPTaskErrors.status && <p className="text-sm text-red-500 font-medium">{addHHPTaskErrors.status}</p>}

                </div>
                <div className="mb-3">
                    <Select name="stores" value={stores} onValueChange={(e) => setStore(e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select stores" />
                        </SelectTrigger>
                        <SelectContent>
                            {storesList.map((dep) => (
                                <SelectItem key={dep.id} value={`${dep.store_name}`}>{`${dep.store_name}`}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
