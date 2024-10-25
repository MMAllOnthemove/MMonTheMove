import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import warranties from '@/lib/warranties';
import useFetchEngineer from '@/hooks/useFetchEngineers';
import repairshopr_statuses from '@/lib/repairshopr_status';
import useGetStores from '@/hooks/useGetStores';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import useUserLoggedIn from '@/hooks/useGetUser';
import useAddHHPTask from '@/hooks/useAddRepairHHPTask';

type closeModalInParent = {
    onChange: (id: boolean) => void;
}

const AddRepairshoprHHPTask = ({ onChange }: closeModalInParent) => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const [searchTicket, setSearchTicket] = useState("")
    const [warranty, setWarranty] = useState("")
    const [engineer, setEngineer] = useState("")
    const [status, setStatus] = useState("")
    const [stores, setStore] = useState("")
    const [repeat_repair, setRepeatRepair] = useState("")
    const { engineersList } = useFetchEngineer()
    const { storesList } = useGetStores()
    const { addTask, addHHPTaskLoading, addHHPTaskErrors } = useAddHHPTask();

    const [imei, setIMEI] = useState("")
    const [repairshopr_job_id, setRepairshoprJobId] = useState('')
    const [service_order_no, setServiceOrderNo] = useState("")
    const [fault, setFault] = useState("")
    const [ticket_number, setTicketNumber] = useState("")
    const [assetId, setAssetId] = useState("")
    const [date_booked, setDateBooked] = useState("")
    const [model, setModel] = useState("")
    const [serial_number, setSerialNumber] = useState("")

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
                // console.log(data)
                setIMEI(data?.asset?.properties["IMEI No."])
                setModel(data?.asset?.properties["Model No.:"])
                setSerialNumber(data?.asset?.asset_serial)

            }

        };
        fetchRSByAssetData();
    }, [searchTicket, assetId]);
    // console.log(engineersList)
    /*  
    service_order_no,
    date_booked 
    model
    warranty
    engineer - configure this
    fault
    imei
    serial_number
    unit_status
    ticket_number - will be auto added (opposite for service order on the gspn)
    department - will be always be HHP
    job_added_by
    stores
    repeat_repair
    
    */
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
        onChange(false)
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

                            <SelectItem value={'true'}>Yes</SelectItem>
                            <SelectItem value={'false'}>No</SelectItem>

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
