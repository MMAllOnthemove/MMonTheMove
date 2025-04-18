"use client"
import dynamic from 'next/dynamic'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page'), { ssr: false }
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page'), { ssr: false }
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import useUserLoggedIn from '@/hooks/useGetUser'
import useIpaasGetSOInfoAll from '@/hooks/useIpaasGetSoInfoAll'
import useTookanAssignTeam from '@/hooks/useTookanAssignTeam'
import useTookanApi from '@/hooks/useTookanTask'
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter'
import { today } from '@/lib/date_formats'
import { tookan_departments, tookan_status } from '@/lib/tookan'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"


const SearchGSPNTicket = () => {
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { getSOInfoAllTookan } = useIpaasGetSOInfoAll();
    const { createTask } = useTookanApi();
    const { assignToTeam } = useTookanAssignTeam();
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [serviceOrder, setServiceOrder] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [fault, setFault] = useState("")
    const [latitudeLogintude, setLatitudeLongitude] = useState("")

    // For the popup modal
    const [modalOpen, setIsModalOpen] = useState(false)
    const [tookanStatus, setTookanStatus] = useState("")
    const [department, setDepartment] = useState("")
    const [popupJobId, setPopJobId] = useState("")


    const latitude = latitudeLogintude?.split(", ")[0]
    const longitude = latitudeLogintude?.split(", ")[1]
    const [assToTeamLoading, setAssignToTeamLoading] = useState(false)

    useEffect(() => {
        const handleGetSOInfo = async (serviceOrder: string) => {
            if (!serviceOrder) return
            try {
                const data = await getSOInfoAllTookan(serviceOrder);
                const fullAddress = `${data.Return.EsBpInfo.CustAddrStreet1} ${data.Return.EsBpInfo.CustAddrStreet2} ${data.Return.EsBpInfo.CustCity} ${data.Return.EsBpInfo.CustCountry}`;
                setFirstname(data.Return.EsBpInfo.CustFirstName);
                setLastname(data.Return.EsBpInfo.CustLastName);
                setEmail(data.Return.EsBpInfo.CustEmail);
                setPhone(data.Return.EsBpInfo.CustMobilePhone || '');
                setAddress(fullAddress);
                setFault(data.Return.EsModelInfo.DefectDesc);
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error)
                }
            }
        };
        handleGetSOInfo(serviceOrder)
    }, [serviceOrder, getSOInfoAllTookan])

    const handleCreateTookanTask = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const username = capitalizeFirstLetter(firstname) + " " + capitalizeFirstLetter(lastname);

        const values = {
            "customer_email": email?.toLowerCase(),
            "order_id": serviceOrder,
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
                                        <Label htmlFor='serviceOrder' className="text-sm text-gray-800 font-medium after:ml-0.5 after:text-red-500 after:content-['*']">Service order number</Label>
                                        <Input type="text" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" defaultValue={serviceOrder} onChange={(e) => setServiceOrder(e.target.value)} name='serviceOrder' id='serviceOrder' />

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
                                        <Label htmlFor='firstname' className="text-sm text-gray-800 font-medium">First name</Label>
                                        <Input type="text" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" defaultValue={capitalizeFirstLetter(firstname) || ""} onChange={(e) => setFirstname(e.target.value)} name='firstname' id='firstname' />

                                    </div>
                                    <div className="mb-1">
                                        <Label htmlFor='lastname' className="text-sm text-gray-800 font-medium">Last name</Label>
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
                                    <Label htmlFor='address' className='block text-sm font-medium text-gray-900'>Address</Label>

                                    <small className='font-medium text-gray-600'>Please copy the address, open google maps, and ensure the address is correct</small>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <Input type="text" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" defaultValue={address || ""} onChange={(e) => setAddress(e.target.value)} name='address' id='address' />
                                        <Link href={`http://maps.google.com/?q=${address}`} target="_blank" rel="noopener noreferrer" className='flex flex-grow text-white bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:outline-none font-medium rounded-sm text-sm px-5 py-2'>Map</Link>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="mb-1">
                                        <Label htmlFor='latitude_longitude' className="text-sm text-gray-800 font-medium">Latitude and Longitude</Label>
                                        <Input type="text" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" value={latitudeLogintude} onChange={(e) => setLatitudeLongitude(e.target.value)} name='latitude_longitude' id='latitude_longitude' />

                                    </div>
                                    {/* <div className="mb-1">
                                        <Label htmlFor='longitude' className='block mb-2 text-sm font-medium  text-gray-900'>Longitude</Label>
                                        <Input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} id='longitude' name='longitude' className="mb-2 bg-white dark:bg-[#22303C] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />

                                    </div> */}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-1">
                                        <Label htmlFor='startDate' className="text-sm text-gray-800 font-medium">Task start date</Label>
                                        <Input type="date" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" min={today} value={startDate} onChange={(e) => setStartDate(e.target.value)} name='startDate' id='startDate' />

                                    </div>
                                    <div className="mb-1">
                                        <Label htmlFor='endDate' className="text-sm text-gray-800 font-medium">Task end date</Label>
                                        <Input type="date" className="w-full placeholder:font-regular placeholder:text-gray-400 placeholder:text-sm shadow-none border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none" min={today} value={endDate} onChange={(e) => setEndDate(e.target.value)} name='endDate' id='endDate' />

                                    </div>
                                </div>

                                <Button type="submit" className='text-sm text-gray-100 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] shadow-none border-none my-4 w-full'>
                                    Create task
                                </Button>
                            </form>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {
                modalOpen && <Dialog open={modalOpen} onOpenChange={() => setIsModalOpen(false)} >
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Assign {serviceOrder}?</DialogTitle>
                            <DialogDescription>
                                {popupJobId}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAssignTookanTask}>
                            <div className="mb-4">
                                <Select name="department" value={department} onValueChange={(e) => setDepartment(e)}>
                                    <SelectTrigger className="w-full shadow-none text-gray-400 border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none">
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
                                    <SelectTrigger className="w-full shadow-none text-gray-400 border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tookan_status.map((dep) => (
                                            <SelectItem key={dep.id} value={`${dep._value}`}>{dep._name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" disabled={assToTeamLoading} className='w-full text-sm text-gray-100 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] shadow-none border-none'>
                                {assToTeamLoading ? 'Assigning...' : 'Assign to team'}
                            </Button>
                        </form>

                    </DialogContent>
                </Dialog>
            }




        </>
    )
}

export default SearchGSPNTicket
