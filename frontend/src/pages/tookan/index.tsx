import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { datetimestamp } from '../../../utils/datemin';
import moment from 'moment';
import Head from 'next/head';
import { getSOInfoAllTookan } from '@/functions/ipass_api';
import { capitalizeFirstLetter } from '../../../utils/capitalize';
import { tookan_departments, tookan_status } from '../../../utils/tookan';
import Link from 'next/link';
import NotLoggedIn from '@/components/NotLoggedIn';
import { fetchCurrentUser } from '@/hooks/useFetch';
import Modal from '@/components/PopupModal';
import Navbar from '@/components/Navbar';
function Tookan() {
    const { userData } = fetchCurrentUser();

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const [country, setCountry] = useState("")
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



    useEffect(() => {
        getSOInfoAllTookan({
            serviceOrder,
            setFirstname,
            setLastname,
            setEmail,
            setPhone,
            setAddress,
            setFault,
        });
    }, [serviceOrder]);


    const createTookanTask = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        let username = capitalizeFirstLetter(firstname) + " " + capitalizeFirstLetter(lastname);

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
        }

        await axios.post(`${process.env.NEXT_PUBLIC_TOOKAN_LINK}/create_task`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if (res.status === 200) {
                alert(res.data.message);
                setPopJobId(res?.data?.data?.job_id);
                setFault("")
                setFirstname("")
                setLastname("")
                setEmail("")
                setPhone("")
                setAddress("")
                setLatitudeLongitude("")
                setStartDate("")
                setEndDate("")
                setIsModalOpen(true)
            }

        }).then((error) => {
            // 
        })

    }


    const assignToTeam = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const values = {
            "job_id": popupJobId,
            "team_id": department,
            "job_status": tookanStatus,
            "api_key": `${process.env.NEXT_PUBLIC_TOOKAN_API_TOKEN}`
        }
        await axios.post(`${process.env.NEXT_PUBLIC_TOOKAN_LINK}/assign_task`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            if (res.status === 200) {
                alert(res.data.message);
                setIsModalOpen(false);
                setFirstname("");
                setLastname("");
                setEmail("");
                setPhone("");
                setAddress("");
                setAddress2("");
                setCity("");
                setState("");
                setZip("");
                setCountry("");
                setFault("");
            }

        }).then((error) => {
            //
        })
    }
    return (
        <>
            <Head><title>Tookan | MM ALL ELECTRONICS</title></Head>

            {!userData ? (
                <NotLoggedIn />
            ) : (
                <>
                    <Navbar />
                    <div
                        className="fixed top-0 bottom-0 left-0 right-0 w-full flex items-center justify-center rounded-sm"
                    >
                        <div
                            className="w-full md:max-w-[700px] max-w-[550px] bg-white dark:bg-[#22303C] relative my-0 mx-[20px] text-left flex flex-col overflow-hidden popup-modal-dialog"
                        >
                            <div className="flex items-center p-[1rem] border-b border-blue-[#eee]">
                                <h3 className="text-slate-800 font-medium dark:text-[#eee]">
                                    Create Tookan task
                                </h3>
                            </div>
                            <div className="overflow-auto">
                                <div className="p-[1rem]">
                                    <form onSubmit={createTookanTask}>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="mb-1">
                                                <label htmlFor='serviceOrder' className='block mb-2 text-sm font-medium text-gray-900 dark:text-[#eee]'>Service order/ticket no</label>
                                                <input type="text" value={serviceOrder} onChange={(e) => setServiceOrder(e.target.value)} name='serviceOrder' id='serviceOrder' className="mb-2 dark:bg-[#22303C] dark:text-[#eee] bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />

                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1">
                                            <div className="mb-1">
                                                <label htmlFor='fault' className='block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]'>Fault (description)</label>
                                                <textarea value={fault} onChange={(e) => setFault(e.target.value)} name='fault' id='fault' className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"></textarea>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="mb-1">
                                                <label htmlFor='firstname' className='block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]'>First Name</label>
                                                <input type="text" value={capitalizeFirstLetter(firstname)} onChange={(e) => setFirstname(e.target.value)} name='firstname' id='firstname' className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />

                                            </div>
                                            <div className="mb-1">
                                                <label htmlFor='lastname' className='block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]'>Last Name</label>
                                                <input type="text" value={capitalizeFirstLetter(lastname)} onChange={(e) => setLastname(e.target.value)} id='lastname' name='lastname' className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />

                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="mb-1">
                                                <label htmlFor='email' className='block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]'>Email</label>
                                                <input type="text" value={email?.toLowerCase()} onChange={(e) => setEmail(e.target.value)} name='email' id='email' className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />

                                            </div>
                                            <div className="mb-1">
                                                <label htmlFor='phone' className='block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]'>Telephone</label>
                                                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} id='phone' name='phone' className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />

                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor='address' className='block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]'>Address</label>

                                            <small>Please copy the address, open google maps, and ensure the address is correct</small>
                                            <div className="flex items-center justify-between gap-2 mb-4">
                                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} name='address' id='address' className=" bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 w-full p-1.5 flex flex-grow" />

                                                <Link href={`http://maps.google.com/?q=${address}`} target="_blank" rel="noopener noreferrer" className='text-white bg-gray-900 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5'>Map</Link>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="mb-1">
                                                <label htmlFor='latitude_longitude' className='block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]'>Latitude and Longitude</label>
                                                <input type="text" value={latitudeLogintude} onChange={(e) => setLatitudeLongitude(e.target.value)} name='latitude_longitude' id='latitude_longitude' className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />

                                            </div>
                                            {/* <div className="mb-1">
                                        <label htmlFor='longitude' className='block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]'>Longitude</label>
                                        <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} id='longitude' name='longitude' className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />

                                    </div> */}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="mb-1">
                                                <label htmlFor='startDate' className='block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]'>Task start date</label>
                                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} name='startDate' id='startDate' className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />

                                            </div>
                                            <div className="mb-1">
                                                <label htmlFor='endDate' className='block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]'>Task end date</label>
                                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} name='endDate' id='endDate' className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />

                                            </div>
                                        </div>

                                        <button type="submit" className="text-white bg-gray-900 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                                            Create task
                                        </button>
                                    </form>
                                    <small className='font-medium text-slate-700 dark:text-[#eee]'>Type in the service order to auto populate</small>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Modal
                        isVisible={modalOpen}
                        title="Assign service order"
                        content={
                            <>
                                {popupJobId}
                                <form onSubmit={assignToTeam}>
                                    <div className="mb-4">
                                        <label htmlFor='popupServiceOrder' className='block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]'>Service Order</label>
                                        <input type="text" defaultValue={serviceOrder} id='popupServiceOrder' name='popupServiceOrder' className="mb-2 dark:bg-[#22303C] dark:text-[#eee] bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" />
                                    </div>
                                    <div className="mb-4">
                                        <select name="department" id="department" className="mb-2 dark:bg-[#22303C] dark:text-[#eee] bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                            <option value="" disabled>Assign to department</option>
                                            {tookan_departments.map((dep) => (
                                                <option key={dep.id} value={dep._value}>{dep._name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <select name="tookan_status" id="tookan_status" className="mb-2 dark:bg-[#22303C] dark:text-[#eee] bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 cursor-pointer" value={tookanStatus} onChange={(e) => setTookanStatus(e.target.value)}>
                                            <option value="" disabled>Choose status</option>
                                            {tookan_status.map((dep) => (
                                                <option key={dep.id} value={dep._value}>{dep._name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" className="text-white bg-gray-900 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                                        Assign task
                                    </button>
                                </form>

                            </>
                        }
                        onClose={() => setIsModalOpen(false)}

                    />

                </>
            )}

        </>
    )
}

export default Tookan
