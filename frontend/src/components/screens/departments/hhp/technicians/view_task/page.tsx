"use client"

import useFetchHHPTaskById from '@/hooks/useFetchHHPtaskById';
import useUserLoggedIn from '@/hooks/useGetUser';
import { useParams } from 'next/navigation';
import React from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment';
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page')
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page')
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page')
)
const ViewHHPTaskScreen = () => {
    const params = useParams(); // Fetch URL parameters
    const { id } = params;
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { hhpTask } = useFetchHHPTaskById(decodeURIComponent(Array.isArray(id) ? id[0] : id))

    return (
        <>
            {
                loading ? (<LoadingScreen />) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <div className='bg-gray-100'>
                            <div className='container p-1'>
                                <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                        Ticket Details
                                    </h1>

                                    {/* General Information */}
                                    <section className="mb-6">
                                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                            General Information
                                        </h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Service Order No:</p>
                                                <p className="text-gray-700">{hhpTask?.service_order_no}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Ticket Number:</p>
                                                <p className="text-gray-700">{hhpTask?.ticket_number}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Date Booked:</p>
                                                <p className="text-gray-700">{hhpTask?.date_booked}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Engineer:</p>
                                                <p className="text-gray-700">{hhpTask?.engineer}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Department:</p>
                                                <p className="text-gray-700">{hhpTask?.department}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Model:</p>
                                                <p className="text-gray-700">{hhpTask?.model}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Serial number:</p>
                                                <p className="text-gray-700">{hhpTask?.serial_number}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">IMEI:</p>
                                                <p className="text-gray-700">{hhpTask?.imei}</p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Status Information */}
                                    <section className="mb-6">
                                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Status</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Unit Status:</p>
                                                <p className="text-gray-700">{hhpTask?.unit_status || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">QC Complete:</p>
                                                <p className="text-gray-700">{hhpTask?.qc_complete || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Unit Complete:</p>
                                                <p className="text-gray-700">{hhpTask?.unit_complete || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Collected:</p>
                                                <p className="text-gray-700">{hhpTask?.collected || "N/A"}</p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Parts Information */}
                                    <section className="mb-6">
                                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                            Parts Information
                                        </h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Parts Pending:</p>
                                                <p className="text-gray-700">{hhpTask?.parts_pending || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Parts Issued:</p>
                                                <p className="text-gray-700">{hhpTask?.parts_issued || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Parts List:</p>

                                                {Array.isArray(hhpTask?.parts) &&
                                                    hhpTask?.parts?.map((x) => (
                                                        <div key={x?.part_id} className='border-b pb-2'>
                                                            <p className="text-gray-700 text-sm">Part name: {x?.part_name}</p>
                                                            <p className="text-gray-700 text-sm">Part description: {x?.part_desc}</p>
                                                            <p className="text-gray-700 text-sm">Seal number: {x?.seal_number}</p>
                                                            <p className="text-gray-700 text-sm">Quantity: {x?.part_quantity}</p>
                                                            <p className="text-gray-700 text-sm">Compensation: {x?.compensation ? "Yes" : "No"}</p>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </section>

                                    {/* Dates Information */}
                                    <section className="mb-6">
                                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                            Dates
                                        </h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Assessment Date:</p>
                                                <p className="text-gray-700">{hhpTask?.assessment_date || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Parts Ordered Date:</p>
                                                <p className="text-gray-700">{hhpTask?.parts_ordered_date || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">QC Date:</p>
                                                <p className="text-gray-700">{hhpTask?.qc_date || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Completed Date:</p>
                                                <p className="text-gray-700">{hhpTask?.completed_date || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Collected Date:</p>
                                                <p className="text-gray-700">{hhpTask?.collected_date || "N/A"}</p>
                                            </div>
                                        </div>
                                    </section>
                                    <hr className='pb-2'/>
                                    {/* Comments */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                            Comments
                                        </h2>
                                        {Array.isArray(hhpTask?.comments) &&
                                            hhpTask?.comments?.map((x) => (
                                                <div key={x?.comment_id} className='border rounded-sm p-2 bg-gray-100'>
                                                    <p className="text-gray-700 text-sm font-medium flex justify-between items-center"><span>{x?.created_by}</span> <span>{
                                                        moment(x?.comment_created_at).isValid() ? moment(x?.comment_created_at).format("DD MMMM, YYYY HH:mm") : ""}</span></p>

                                                    <p className="text-gray-700 mt-2">{x?.comment_text}</p>

                                                </div>
                                            ))
                                        }
                                    </section>
                                </div>

                            </div>
                        </div>
                    </>
                ) : <NotLoggedInScreen />
            }


        </>
    )
}

export default ViewHHPTaskScreen