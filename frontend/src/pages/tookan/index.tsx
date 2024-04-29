import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { datetimestamp } from '../../../utils/datemin';
import moment from 'moment';
import Head from 'next/head';
import { getSOInfoAllTookan } from '@/functions/ipass_api';
function Tookan() {

    let formattedStartTime = moment(datetimestamp).format("YYYY-MM-DD 09:30:00")
    let formattedEndTime = moment(datetimestamp).format("YYYY-MM-DD 17:00:00")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [serviceOrder, setServiceOrder] = useState("")
    const startTime = datetimestamp
    const endTime = datetimestamp
    const [fault, setFault] = useState("")


    useEffect(() => {
        getSOInfoAllTookan({
            serviceOrder,
            setFirstname,
            setLastname,
            setEmail,
            setPhone,
            setFault,
        });
    }, [serviceOrder]);


    const createTookanTask = async (e: React.SyntheticEvent) => {
        e.preventDefault();


        let username = firstname + " " + lastname;
        const values = {
            "customer_username": username,
            "customer_email": email,
            "customer_phone": phone,
            "order_id": serviceOrder,
            "job_description": fault,
            "job_pickup_datetime": formattedStartTime,
            "job_delivery_datetime": formattedEndTime,
            "has_pickup": "0",
            "has_delivery": "0",
            "layout_type": "1",
            "tracking_link": 1,
            "timezone": "+2",
            "api_key": `${process.env.NEXT_PUBLIC_TOOKAN_API_TOKEN}`
        }

        await axios.post(`${process.env.NEXT_PUBLIC_TOOKAN_LINK}`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {

            if (res.data) {
                alert(res.data.message);
                setFirstname("")
                setLastname("")
                setEmail("")
                setPhone("")
                setServiceOrder("")
                setFault("")

            }

        }).then((error) => {
            // console.log(error)
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
                                        <input type="text" defaultValue={firstname} name='firstname' id='firstname' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor='lastname'>Last Name</label>
                                        <input type="text" defaultValue={lastname} id='lastname' name='lastname' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label htmlFor='email'>Email</label>
                                        <input type="text" defaultValue={email} name='email' id='email' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor='phone'>Telephone</label>
                                        <input type="text" defaultValue={phone} id='phone' name='phone' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

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

                                        <textarea defaultValue={fault} name='fault' id='fault' className="mb-2 bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></textarea>

                                    </div>
                                </div>
                                <button type="submit" className="text-white bg-gray-900 hover:bg-gray-800 border border-gray-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                                    Create task
                                </button>
                            </form>
                            <small className='font-medium text-slate-700'>Type in the service order to auto populate</small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tookan
