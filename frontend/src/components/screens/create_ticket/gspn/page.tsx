"use client"

import React, { useState } from 'react'
import Sidebar from "@/components/sidebar/page"
import LoadingScreen from "@/components/loading_screen/page"
import NotLoggedInScreen from "@/components/not_logged_in/page"
import useUserLoggedIn from "@/hooks/useGetUser"
import PageTitle from "@/components/PageTitle/page"
import { Button } from '@/components/ui/button'
import ProductInfo from './multistep/product_info'
import ProductInfoTwo from './multistep/product_info_two'
import CustomerInfoScreen from './multistep/customer_info'
import useCreateServiceOrder from '@/hooks/useCreateServiceOrder'
import useCheckWarranty from '@/hooks/useCheckDTVHAWarranty'
import { datetimestamp } from '@/lib/date_formats'
import moment from 'moment'

const GSPNScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { addServiceOrder, addServiceOrderLoading } = useCreateServiceOrder()
    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, 3)); // Adjust this if you add more steps
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
    const [symCode1, setSymCode1] = useState("")
    const [symCode2, setSymCode2] = useState("")
    const [symCode3, setSymCode3] = useState("")
    const [serviceType, setServiceType] = useState("")
    const [tokenNo, setTokenNo] = useState("")
    const [requestDate, setRequestDate] = useState("")
    const [requestTime, setRequestTime] = useState("")
    const [unitReceiveDate, setUnitReceieveDate] = useState("")
    const [unitReceiveTime, setUnitReceieveTime] = useState("")
    const [firstAppDate, setFirstAppDate] = useState("")
    const [firstAppTime, setFirstAppTime] = useState("")
    const [repairReceiveDate, setRepairReceiveDate] = useState("")
    const [repairReceiveTime, setRepairReceiveTime] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [homePhone, setHomePhone] = useState("")
    const [officePhone, setOfficePhone] = useState("")
    const [mobilePhone, setMobilePhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [address_2, setAddress_2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const [country, setCountry] = useState("RSA")


    const handleSubmit = async () => {
        // const payload = {
        //     model, serial_number, imei, purchase_date, wtyException, wtyType, accessory, defectDesc,
        //     remark, symCode1, symCode2, symCode3, serviceType, tokenNo, requestDate, requestTime,
        //     unitReceiveDate, firstAppDate, firstAppTime, repairReceiveDate, repairReceiveTime,
        //     firstName, lastName, homePhone, officePhone, mobilePhone, email, address,
        //     address_2, city, state, zip, country
        // }
        const generateTimeStampForPacCode = datetimestamp;
        const todaysDate = moment(datetimestamp).format("YYYYMMDD");
        const modifiedPurchaseDate = moment(purchase_date).format("YYYYMMDD")
        const values = {
            "IsCommonHeader": {
                "Company": `${process.env.NEXT_PUBLIC_COMPANY}`,
                "AscCode": `${process.env.NEXT_PUBLIC_ASC_CODE}`,
                "Lang": `${process.env.NEXT_PUBLIC_LANG}`,
                "Country": `${process.env.NEXT_PUBLIC_COUNTRY}`,
                "Pac": `9999999${generateTimeStampForPacCode}`
            },
            "IvCreationCheck": `${todaysDate}`,
            "IsHeaderInfo": {
                "AscJobNo": ""
            },
            "IsBpInfo": {
                "CustomerCode": "",
                "Addrnumber": ""
            },
            "IsModelInfo": {
                "Model": `${model}`,
                "SerialNo": `${serial_number}`,
                "IMEI": `${imei}`,
                "PurchaseDate": `${modifiedPurchaseDate && modifiedPurchaseDate !== "Invalid date" ? modifiedPurchaseDate : ""}`,
                "Accessory": `${accessory}`,
                "DefectDesc": `${defectDesc}`,
                "Remark": `${remark}`,
                "WtyException": `${wtyException}`
            },
            "IsJobInfo": {
                "SymCode1": `${symCode1}`,
                "SymCode2": `${symCode2}`,
                "SymCode3": `${symCode3}`,
                "SvcType": `${serviceType}`,
                "QueueTokenNo": `${tokenNo}`,
            },
            "IsDateInfo": {
                "RequestDate": `${requestDate}`,
                "RequestTime": `${requestTime}`,
                "UntRecvDate": `${unitReceiveDate}`,
                "UntRecvTime": `${unitReceiveTime}`,
                "FirstAppDate": `${firstAppDate}`,
                "FirstAppTime": `${firstAppTime}`
            },
            "IsWtyInfo": {
                "WtyConsType": ""
            },
            "IsBpDetail": {
                "CustFirstName": `${firstName}`,
                "CustLastName": `${lastName}`,
                "CustHomePhone": `${homePhone}`,
                "CustOfficePhone": `${officePhone}`,
                "CustMobilePhone": `${mobilePhone}`,
                "CustEmail": `${email}`,
                "CustAddrStreet2": `${address_2}`,
                "CustAddrStreet1": `${address}`,
                "CustCity": `${city}`,
                "CustState": `${state}`,
                "CustZipcode": `${zip}`,
                "Country": `${country}`
            }
        }
        await addServiceOrder(values)
    }
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
                            {step === 2 && <ProductInfoTwo model={model} symCode1={symCode1} setSymCode1={setSymCode1} symCode2={symCode2} setSymCode2={setSymCode2} symCode3={symCode3} setSymCode3={setSymCode3} serviceType={serviceType} setServiceType={setServiceType} tokenNo={tokenNo} setTokenNo={setTokenNo} requestDate={requestDate} setRequestDate={setRequestDate} requestTime={requestTime} setRequestTime={setRequestTime} unitReceiveDate={unitReceiveDate} setUnitReceieveDate={setUnitReceieveDate} unitReceiveTime={unitReceiveTime} setUnitReceieveTime={setUnitReceieveTime} firstAppDate={firstAppDate} setFirstAppDate={setFirstAppDate} firstAppTime={firstAppTime} setFirstAppTime={setFirstAppTime} repairReceiveDate={repairReceiveDate} setRepairReceiveDate={setRepairReceiveDate} repairReceiveTime={repairReceiveTime} setRepairReceiveTime={setRepairReceiveTime} />}
                            {step === 3 && <CustomerInfoScreen firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} homePhone={homePhone} setHomePhone={setHomePhone} officePhone={officePhone} setOfficePhone={setOfficePhone} mobilePhone={mobilePhone} setMobilePhone={setMobilePhone} email={email} setEmail={setEmail} address={address} setAddress={setAddress} address_2={address_2} setAddress_2={setAddress_2} city={city} setCity={setCity} state={state} setState={setState} zip={zip} setZip={setZip} country={country} setCountry={setCountry} />}
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
                                {step < 3 && (
                                    <Button
                                        type="button"
                                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                                        onClick={nextStep}
                                    >
                                        Next
                                    </Button>
                                )}

                                {step == 3 && (
                                    <Button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={addServiceOrderLoading}
                                        className="px-4 py-2 font-semibold text-white bg-gray-900 rounded hover:bg-green-700"
                                    >
                                        {
                                            addServiceOrderLoading ? 'Loading...' : 'Create service order'
                                        }

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