import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useUserLoggedIn from '@/hooks/useGetUser';
import useIpaasGetSOInfoAll from '@/hooks/useIpaasGetSoInfoAll';
import useTookanAssignTeam from '@/hooks/useTookanAssignTeam';
import useTookanApi from '@/hooks/useTookanTask';
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { today } from '@/lib/date_formats'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page'), { ssr: false }
)
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page'), { ssr: false }
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)

import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Textarea } from '@/components/ui/textarea';
import { tookan_departments, tookan_status } from '@/lib/tookan';

const SearchRepairshoprTicket = () => {
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { getSOInfoAllTookan } = useIpaasGetSOInfoAll();
    const { createTask } = useTookanApi();
    const { assignToTeam } = useTookanAssignTeam();
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [ticketNumber, setTicketNumber] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [fault, setFault] = useState("")
    const [latitudeLogintude, setLatitudeLongitude] = useState("")
    const [searchTicket, setSearchTicket] = useState("")
    // For the popup modal
    const [modalOpen, setIsModalOpen] = useState(false)
    const [tookanStatus, setTookanStatus] = useState("")
    const [department, setDepartment] = useState("")
    const [popupJobId, setPopJobId] = useState("")
    const [repairshopr_job_id, setRepairshoprJobId] = useState('')
    const latitude = latitudeLogintude?.split(", ")[0]
    const longitude = latitudeLogintude?.split(", ")[1]
    const [assToTeamLoading, setAssignToTeamLoading] = useState(false)

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
                    setTicketNumber(data?.tickets[0]?.number)
                    setRepairshoprJobId(data?.tickets[0]?.id)
                    setFault(data?.tickets[0]?.subject)
                }
            } catch (error) {
                if (process.env.NODE_ENV !== "production") console.error(error)
            }
        };
        const delayFetch = setTimeout(() => {
            fetchRSData();
        }, 5000); // 5-second delay

        return () => clearTimeout(delayFetch); // Cleanup timeout if searchTicket changes
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
                    setFirstname(data?.ticket?.customer?.firstname)
                    setLastname(data?.ticket?.customer?.lastname)
                    setEmail(data?.ticket?.customer?.email)
                    setPhone(data?.ticket?.customer?.mobile)
                    setAddress(`${data?.ticket?.customer?.address} ${data?.ticket?.customer?.address_2} ${data?.ticket?.customer?.city} ${data?.ticket?.customer?.state}`)
                }
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error)
                }
            }
        }

        fetchRSByIdData();
    }, [searchTicket, repairshopr_job_id]);


    const handleCreateTookanTask = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const username = capitalizeFirstLetter(firstname) + " " + capitalizeFirstLetter(lastname);

        const values = {
            "customer_email": email?.toLowerCase(),
            "order_id": ticketNumber,
            "customer_username": username,
            "customer_phone": phone,
            "customer_address": address,
            "job_description": capitalizeFirstLetter(fault),
            "job_pickup_datetime": `${startDate} 09:30:00`,
            "job_delivery_datetime": `${endDate} 17:00:00`,
            'job_pickup_latitude': latitude,
            'job_pickup_longitude': longitude,
            "has_pickup": "0",
            "has_delivery": "0",
            "layout_type": "1",
            "tracking_link": 1,
            "timezone": "+2",
            "api_key": `${process.env.NEXT_PUBLIC_TOOKAN_API_TOKEN}`
        };

        try {
            const response = await createTask(values);
            if (response.status === 200) {
                toast.success(response.message);
                setPopJobId(response.data.job_id);
                setIsModalOpen(true);
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error)
            }
        }
    };
    const handleAssignTookanTask = async (e: React.SyntheticEvent) => {
        e.preventDefault();


        const values = {
            "job_id": popupJobId,
            "team_id": department,
            "job_status": tookanStatus,
            "api_key": `${process.env.NEXT_PUBLIC_TOOKAN_API_TOKEN}`
        };

        try {
            setAssignToTeamLoading(true)
            const response = await assignToTeam(values);
            if (response.status === 200) {
                toast.success(response.message);
                setIsModalOpen(false);
                window.location.reload();
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error)
            }
        } finally {
            setAssignToTeamLoading(false)
        }
    };

    return (


        <>

            <Card className='w-full border-none md:max-w-[700px] max-w-[550px] shadow-none md:border md:shadow'>
                <CardHeader>
                    <CardTitle className="text-center text-sm text-gray-800 font-medium">Create tookan task</CardTitle>
                    <CardDescription>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="overflow-auto">
                        <div className="p-[1rem]">
                            <form onSubmit={handleCreateTookanTask}>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="mb-1">
                                        <Label htmlFor='ticketNumber' className="text-sm text-gray-800 font-medium after:ml-0.5 after:text-red-500 after:content-['*']">Ticket no</Label>
                                        <Input type="text" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" defaultValue={searchTicket} onChange={(e) => setSearchTicket(e.target.value)} name='ticketNumber' id='ticketNumber' />

                                    </div>
                                </div>
                                <div className="grid grid-cols-1">
                                    <div className="mb-1">
                                        <Label htmlFor='fault' className="text-sm text-gray-800 font-medium">Fault (description)</Label>
                                        <Textarea className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" defaultValue={fault} onChange={(e) => setFault(e.target.value)} name='fault' id='fault' ></Textarea>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-1">
                                        <Label htmlFor='firstname' className="text-sm text-gray-800 font-medium">First Name</Label>
                                        <Input type="text" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" defaultValue={capitalizeFirstLetter(firstname) || ""} onChange={(e) => setFirstname(e.target.value)} name='firstname' id='firstname' />

                                    </div>
                                    <div className="mb-1">
                                        <Label htmlFor='lastname' className="text-sm text-gray-800 font-medium">Last Name</Label>
                                        <Input type="text" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" defaultValue={capitalizeFirstLetter(lastname) || ""} onChange={(e) => setLastname(e.target.value)} id='lastname' name='lastname' />

                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-1">
                                        <Label htmlFor='email' className="text-sm text-gray-800 font-medium">Email</Label>
                                        <Input type="text" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" defaultValue={email?.toLowerCase() || ""} onChange={(e) => setEmail(e.target.value)} name='email' id='email' />

                                    </div>
                                    <div className="mb-1">
                                        <Label htmlFor='phone' className="text-sm text-gray-800 font-medium">Telephone</Label>
                                        <Input type="text" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" defaultValue={phone || ""} onChange={(e) => setPhone(e.target.value)} id='phone' name='phone' />

                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor='address' className="block text-sm text-gray-800 font-medium">Address</Label>

                                    <small className='font-medium text-gray-600'>Please copy the address, open google maps, and ensure the address is correct</small>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <Input type="text" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none flex flex-grow" defaultValue={address || ""} onChange={(e) => setAddress(e.target.value)} name='address' id='address' />

                                        <Link href={`http://maps.google.com/?q=${address}`} target="_blank" rel="noopener noreferrer" className='flex flex-grow text-white bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:outline-none font-medium rounded-sm text-sm px-5 py-2'>Map</Link>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="mb-1">
                                        <Label htmlFor='latitude_longitude' className='block text-sm font-medium text-gray-900'>Latitude and Longitude</Label>
                                        <Input type="text" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={latitudeLogintude} onChange={(e) => setLatitudeLongitude(e.target.value)} name='latitude_longitude' id='latitude_longitude' />

                                    </div>
                                    {/* <div className="mb-1">
                                        <Label htmlFor='longitude' className='block mb-2 text-sm font-medium  text-gray-900'>Longitude</Label>
                                        <Input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} id='longitude' name='longitude' className="mb-2 bg-white dark:bg-[#22303C] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />

                                    </div> */}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-1">
                                        <Label htmlFor='startDate' className='block text-sm font-medium text-gray-900'>Task start date</Label>
                                        <Input type="date" className='w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none' min={today} value={startDate} onChange={(e) => setStartDate(e.target.value)} name='startDate' id='startDate' />

                                    </div>
                                    <div className="mb-1">
                                        <Label htmlFor='endDate' className='block text-sm font-medium text-gray-900'>Task end date</Label>
                                        <Input type="date" className='w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none' min={today} value={endDate} onChange={(e) => setEndDate(e.target.value)} name='endDate' id='endDate' />

                                    </div>
                                </div>

                                <Button type="submit" className='text-sm text-gray-100 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] shadow-none border-none my-4 w-full'>
                                    Create task
                                </Button>
                            </form>
                            <small className='font-medium text-slate-700 text-center block'>Type in the service order to auto populate</small>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {
                modalOpen && <Dialog open={modalOpen} onOpenChange={() => setIsModalOpen(false)} >
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Assign {ticketNumber}?</DialogTitle>
                            <DialogDescription>
                                {popupJobId}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAssignTookanTask}>
                            <div className="mb-4">
                                <Select name="department" value={department} onValueChange={(e) => setDepartment(e)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Assign to department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tookan_departments.map((dep) => (
                                            <SelectItem key={dep.id} value={`${dep._value}`}>{dep._name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </div>
                            <div className="mb-4">
                                <Select name="tookan_status" value={tookanStatus} onValueChange={(e) => setTookanStatus(e)} >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tookan_status.map((dep) => (
                                            <SelectItem key={dep.id} value={`${dep._value}`}>{dep._name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" disabled={assToTeamLoading} className='w-full'>
                                {assToTeamLoading ? 'Assigning...' : 'Assign to team'}
                            </Button>
                        </form>

                    </DialogContent>
                </Dialog>
            }


        </>



    )
}

export default SearchRepairshoprTicket
