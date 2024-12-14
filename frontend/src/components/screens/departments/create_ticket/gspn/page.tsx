"use client"

import React, { useState } from 'react'
import Sidebar from "@/components/sidebar/page"
import LoadingScreen from "@/components/loading_screen/page"
import NotLoggedInScreen from "@/components/not_logged_in/page"
import useUserLoggedIn from "@/hooks/useGetUser"
import PageTitle from "@/components/PageTitle/page"
import { Button } from '@/components/ui/button'
import ProductInfo from './multistep/product_info'

const GSPNScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, 9)); // Adjust this if you add more steps
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };



    const [model, setModel] = useState("")
    const [serial_number, setSerialNumber] = useState("")
    const [imei, setIMEI] = useState("")
    const [purchase_date, setPurchaseDate] = useState("")
    const [wtyException, setWtyException] = useState("")
    const [wtyType, setWtyType] = useState("")
    const [accessory, setAccessory] = useState("")
    const [defectDesc, setDefectDesc] = useState("")
    const [remark, setRemark] = useState("")
    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='container p-1'>
                            <PageTitle title="service order" hasSpan={true} spanText={"Create"} />

                            {step === 1 && <ProductInfo model={model} setModel={setModel} serial_number={serial_number} setSerialNumber={setSerialNumber} imei={imei} setIMEI={setIMEI} purchase_date={purchase_date} setPurchaseDate={setPurchaseDate} wtyException={wtyException} setWtyException={setWtyException} wtyType={wtyType} setWtyType={setWtyType} accessory={accessory} setAccessory={setAccessory} defectDesc={defectDesc} setDefectDesc={setDefectDesc} remark={remark} setRemark={setRemark} />}
                            <div className="flex justify-between mt-4">
                                {step > 1 && (
                                    <Button
                                        type="button"
                                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                                        onClick={prevStep}
                                    >
                                        Back
                                    </Button>
                                )}
                                {step < 9 && (
                                    <Button
                                        type="button"
                                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                                        onClick={nextStep}
                                    >
                                        Next
                                    </Button>
                                )}

                                {step == 9 && (
                                    <Button
                                        type="button"
                                        className="px-4 py-2 font-semibold text-white bg-gray-900 rounded hover:bg-green-700"
                                    >
                                        Submit
                                    </Button>
                                )}
                            </div>
                        </main>
                    </>
                ) : (
                    <NotLoggedInScreen />
                )
            }


        </>
    )
}

export default GSPNScreen