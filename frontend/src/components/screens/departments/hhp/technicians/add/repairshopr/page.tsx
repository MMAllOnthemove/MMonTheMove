import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useAddHHPTask from '@/hooks/useAddHHPTask';
import useFetchEngineer from '@/hooks/useFetchEngineers';
import useGetStores from '@/hooks/useGetStores';
import useUserLoggedIn from '@/hooks/useGetUser';
import useHHPTasks from '@/hooks/useHHPTasks';
import useRepairshoprTicket from '@/hooks/useRepairshoprTicket';
import { datetimestamp } from '@/lib/date_formats';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AddRepairshoprHHPTask = ({ onChange }: { onChange: (value: boolean) => void }) => {
    const { user } = useUserLoggedIn()
    const { updateRepairTicket } = useRepairshoprTicket()
    const [searchTicket, setSearchTicket] = useState("")
    const [warranty, setWarranty] = useState("")
    const [engineer, setEngineer] = useState({ repairshopr_id: '', value: '' });
    const [status, setStatus] = useState("")
    const [stores, setStore] = useState("");

    const [repeat_repair, setRepeatRepair] = useState("")
    const { engineersList } = useFetchEngineer()
    const { storesList } = useGetStores()
    const { addTask, addHHPTaskLoading, addHHPTaskErrors } = useAddHHPTask();
    const { refetchHhpTasks } = useHHPTasks()
    const [repairshopr_id, setUserId] = useState<number | undefined>(); // To store the selected repairshopr user ID

    const engineerListFomatted = engineersList?.map((user) => ({
        id: user?.id,
        repairshopr_id: user?.repairshopr_id,
        value: user?.engineer_firstname + " " + user?.engineer_lastname,
        label: user?.engineer_firstname
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
    const [department] = useState("HHP")
    const [loadApi, setLoadpi] = useState(false)


    const handleEngineer = (value: string) => {
        // Find the selected engineer by full name (value)
        const selected = engineerListFomatted.find((engineer) => engineer.value === value);
        if (selected) {
            setEngineer({ repairshopr_id: `${selected.repairshopr_id}`, value: selected.value });
        }
    };



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
            try {
                if (!assetId) return
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
        if (engineer?.value) await updateRepairTicket(repairshopr_job_id, userIdPayload)
        setSearchTicket('')
        setWarranty('')
        setEngineer({ repairshopr_id: '', value: '' })
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
        refetchHhpTasks()
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
                    <Input type="text" name="imei" defaultValue={loadApi ? 'Loading...' : imei} disabled aria-disabled />
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
            </form >
        </div >
    )
}

export default AddRepairshoprHHPTask
