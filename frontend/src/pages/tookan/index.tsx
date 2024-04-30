import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { datetimestamp } from '../../../utils/datemin';
import moment from 'moment';
import Head from 'next/head';
import { getSOInfoAllTookan } from '@/functions/ipass_api';
import { capitalizeFirstLetter } from '../../../utils/capitalize';
import TicketsModal from '@/components/PopupModal/tickets-modal';
import { tookan_departments, tookan_status } from '../../../utils/tookan';
function Tookan() {

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

    let d = datetimestamp;
    let formattedStartTime = moment(d).format("YYYY-MM-DD 09:30:00")
    let formattedEndTime = moment(d).format("YYYY-MM-DD 17:00:00")
    // For the popup modal
    const [modalOpen, setIsModalOpen] = useState(false)
    const [popupServiceOrder, setPopupServiceOrder] = useState("")
    const [tookanStatus, setTookanStatus] = useState("")
    const [department, setDepartment] = useState("")
    const [popupJobId, setPopJobId] = useState("")



    function addToLocalStorage(job_id: string) {
        const values = {
            "job_id": job_id,
            "service_order": serviceOrder
        }
        const infoString = JSON.stringify(values);
        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem("info", infoString);
            // console.log('Dummy object stored successfully!');
            // router.push("/device_inspection")
        }
    }

    useEffect(() => {
        const loadFromStorage = () => {
            if (typeof window !== 'undefined' && window.localStorage) {
                const storedData = localStorage.getItem('info');
                // console.log('Stored data:', storedData); // Log the retrieved data
                try {
                    const parsedData = JSON.parse(storedData || '{}');
                    // console.log('Parsed data:', parsedData); // Log the parsed data
                    if (parsedData !== null) {
                        setPopupServiceOrder(parsedData.service_order);
                        setPopJobId(parsedData.job_id);
                    }
                } catch (error) {
                    // console.error('Error parsing data:', error); // Log any parsing errors
                }
            }
        };
        loadFromStorage();
    }, []);



    useEffect(() => {
        getSOInfoAllTookan({
            serviceOrder,
            setFirstname,
            setLastname,
            setEmail,
            setPhone,
            setAddress,
            setAddress2,
            setCity,
            setState,
            setZip,
            setCountry,
            setFault,
        });
    }, [serviceOrder]);



    const createTookanTask = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        let username = capitalizeFirstLetter(firstname) + " " + capitalizeFirstLetter(lastname);
        let fullAddress = address + " " + address2 + " " + city + " " + country;
        const values = {
            "customer_email": email?.toLowerCase(),
            "order_id": serviceOrder,
            "customer_username": username,
            "customer_phone": phone,
            "customer_address": fullAddress,
            "job_description": capitalizeFirstLetter(fault),
            "job_pickup_datetime": `${startDate} 09:30:00`,
            "job_delivery_datetime": `${endDate} 17:00:00`,
            "has_pickup": "0",
            "has_delivery": "0",
            "layout_type": "1",
            "tracking_link": 1,
            "timezone": "+2",
            "api_key": `${process.env.NEXT_PUBLIC_TOOKAN_API_TOKEN}`
        }
        // console.log(values)
        await axios.post(`${process.env.NEXT_PUBLIC_TOOKAN_LINK}/create_task`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            // console.log(res)
            if (res.status === 200) {
                alert(res.data.message);
                addToLocalStorage(res?.data?.data?.job_id);
                setFirstname("")
                setLastname("")
                setEmail("")
                setPhone("")
                setServiceOrder("")
                setFault("")
                setIsModalOpen(true)
            }

        }).then((error) => {
            // console.log("error", error)
        })

    }

    const clearLocalStorage = () => {
        if (typeof window !== "undefined" && window.localStorage) localStorage.clear();
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
            // console.log(res)
            if (res.status === 200) {
                alert(res.data.message);
                setIsModalOpen(false);
                clearLocalStorage()
            }

        }).then((error) => {
            // console.log("error", error)
        })
    }
    return (
        <>
            <Head><title>Tookan | MM ALL ELECTRONICS</title></Head>

            <div
                className="fixed top-0 bottom-0 left-0 right-0 w-full flex items-center justify-center rounded-sm"
            >
                <div
                    className="w-full max-w-[550px] bg-white dark:bg-[#22303C] relative my-0 mx-[20px] text-left flex flex-col overflow-hidden popup-modal-dialog"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center p-[1rem] border-b border-blue-[#eee]">
                        <h3 className="text-slate-800 font-medium dark:text-[#eee]">
                            Create Tookan task
                        </h3>
                    </div>
                    <div className="overflow-auto">
                        <div className="p-[1rem]">
                            <form onSubmit={createTookanTask}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label htmlFor='firstname'>First Name</label>
                                        <input type="text" value={capitalizeFirstLetter(firstname)} onChange={(e) => setFirstname(e.target.value)} name='firstname' id='firstname' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor='lastname'>Last Name</label>
                                        <input type="text" value={capitalizeFirstLetter(lastname)} onChange={(e) => setLastname(e.target.value)} id='lastname' name='lastname' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label htmlFor='email'>Email</label>
                                        <input type="text" value={email?.toLowerCase()} onChange={(e) => setEmail(e.target.value)} name='email' id='email' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor='phone'>Telephone</label>
                                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} id='phone' name='phone' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label htmlFor='startDate'>Start date</label>
                                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} name='startDate' id='startDate' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor='endDate'>End date</label>
                                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} name='endDate' id='endDate' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="mb-4">
                                        <label htmlFor='serviceOrder'>Service order/ticket no</label>
                                        <input type="text" value={serviceOrder} onChange={(e) => setServiceOrder(e.target.value)} name='serviceOrder' id='serviceOrder' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                                    </div>
                                </div>
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label htmlFor='fault'>Fault (description)</label>
                                        <textarea value={fault} onChange={(e) => setFault(e.target.value)} name='fault' id='fault' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="text-white bg-gray-900 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                                    Create task
                                </button>
                            </form>
                            <small className='font-medium text-slate-700'>Type in the service order to auto populate</small>
                        </div>
                    </div>
                </div>
            </div>


            <TicketsModal
                isVisible={modalOpen}
                title="Assign service order"
                content={
                    <>
                        <form onSubmit={assignToTeam}>
                            <div className="mb-4">
                                <label htmlFor='popupServiceOrder'>Service Order</label>
                                <input type="text" defaultValue={popupServiceOrder} id='popupServiceOrder' name='popupServiceOrder' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>
                            <div className="mb-4">
                                <select name="department" id="department" className="cursor-pointer bg-white outline-none border border-gray-300 outline-0 text-gray-900  font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                    <option value="" disabled>Assign to department</option>
                                    {tookan_departments.map((dep) => (
                                        <option key={dep.id} value={dep._value}>{dep._name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <select name="tookan_status" id="tookan_status" className="cursor-pointer bg-white outline-none border border-gray-300 outline-0 text-gray-900  font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={tookanStatus} onChange={(e) => setTookanStatus(e.target.value)}>
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
    )
}

export default Tookan
