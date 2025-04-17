"use client"
import dynamic from 'next/dynamic';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useState } from 'react';
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page'),
    { ssr: false }
)
const Modal = dynamic(() =>
    import('@/components/modal/page'),
    { ssr: false }
)

const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page'), { ssr: false }
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page'), { ssr: false }
)
const ProductInfo = dynamic(() =>
    import('./multistep/product_info'), { ssr: false }
)
const ProductInfoTwo = dynamic(() =>
    import('./multistep/product_info_two'), { ssr: false }
)
const CustomerInfoScreen = dynamic(() =>
    import('./multistep/customer_info'), { ssr: false }
)

import { Button } from '@/components/ui/button';
import useUserLoggedIn from "@/hooks/useGetUser";

import useCreateServiceOrder from '@/hooks/useCreateServiceOrder';
import useGetCustomerLocally from '@/hooks/useGetCustomerLocally';
import { datetimestamp } from '@/lib/date_formats';
import moment from 'moment';
import { useParams } from 'next/navigation';
import { useHHPTasksCrud } from '@/hooks/useHHPTasksCrud';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const GSPNScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { addServiceOrder, addServiceOrderLoading } = useCreateServiceOrder()
    const {  updateTaskSO, updateHHPTaskSOLoading } = useHHPTasksCrud()
    const [step, setStep] = useState(1);
    const params = useParams()
    const { customer_email } = params;
    const { singleCustomer } = useGetCustomerLocally(
        decodeURIComponent(Array.isArray(customer_email) ? customer_email[0] : customer_email)
    );
    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, 3)); // Adjust this if you add more steps
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const router = useRouter();

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
    const [firstName, setFirstName] = useState<string | undefined>("")
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
    const [country, setCountry] = useState("ZA")


    const [newServiceOrder, setNewServiceOrder] = useState("")
    const [ticket_number, setTicketNumber] = useState("")

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        if (customer_email && singleCustomer) {
            setFirstName(singleCustomer[0]?.first_name || "");
            setLastName(singleCustomer[0]?.last_name || "");
            setEmail(singleCustomer[0]?.email || "");
            setMobilePhone(singleCustomer[0]?.phone_number || "");
            setHomePhone(singleCustomer[0]?.home_number || "");
            setAddress(singleCustomer[0]?.address || "");
            setAddress_2(singleCustomer[0]?.address_2 || "");
            setCity(singleCustomer[0]?.city || "");
            setZip(singleCustomer[0]?.zip || "");
        }
    }, [customer_email, singleCustomer]);

    useEffect(() => {
        const loadCustomerAssetInfo = () => {
            if (typeof window !== undefined && window.localStorage) {
                const parsedData = JSON.parse(localStorage.getItem('assetInfo') || '""');
                if (parsedData !== null) {
                    setSerialNumber(parsedData?.asset_serial)
                    setModel(parsedData?.model_number)
                    setIMEI(parsedData?.asset_imei)

                }
            }
        };
        loadCustomerAssetInfo()
    }, [])


    const handleSubmit = async () => {
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
                "AscJobNo": "",
                "ADHPackConfirm": `${serviceType && serviceType === "ADH" ? 'X' : ""}` // according to abdul, we should try it like this
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
                "DefectDesc": `*${defectDesc}`,
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
        const result = await addServiceOrder(values)

        setNewServiceOrder(result?.Return?.EvSvcOrderNo);

        setOpenModal((prev) => !prev)


        setModel("")
        setSerialNumber("")
        setIMEI("")
        setPurchaseDate("")
        setWtyException("")
        setWtyType("")
        setDefectDesc("")
        setRemark("")
        setSymCode1("")
        setSymCode2("")
        setSymCode3("")
        setServiceType("")
        setTokenNo("")
        setRequestDate("")
        setRequestTime("")
        setUnitReceieveDate("")
        setUnitReceieveTime("")
        setFirstAppDate("")
        setFirstAppTime("")
        setRepairReceiveDate("")
        setRepairReceiveTime("")
        setFirstName("")
        setLastName("")
        setHomePhone("")
        setOfficePhone("")
        setMobilePhone("")
        setEmail("")
        setAddress("")
        setAddress_2("")
        setCity("")
        setState("")
        setZip("")
        setCountry("")
        // now we can clear assets from local storage
        if (typeof window !== 'undefined' && window.localStorage) localStorage.clear();
        router.back()
    }

    const handleUpdateTicketSO = async () => {
        const updated_at = datetimestamp;
        const payload = {
            service_order: newServiceOrder, updated_by: user?.email, updated_at, ticket_number
        }

        await updateTaskSO(ticket_number, payload)
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

                            {
                                openModal &&

                                <Modal isVisible={openModal}
                                    onClose={() => setOpenModal(false)}
                                    title="Update service order"
                                    content={
                                        <>
                                            <div>
                                                <Label htmlFor="newServiceOrder">Service Order</Label>
                                                <Input name="newServiceOrder" value={newServiceOrder} onChange={(e) => setNewServiceOrder(e.target.value)} />
                                            </div>
                                            <div>
                                                <Label htmlFor="ticket_number">Add ticket number to update</Label>
                                                <Input name="ticket_number" value={ticket_number} onChange={(e) => setTicketNumber(e.target.value)} />
                                            </div>
                                            <Button type="button" className='mt-2' onClick={handleUpdateTicketSO} disabled={updateHHPTaskSOLoading}>{updateHHPTaskSOLoading ? 'Updating' : `Update ${ticket_number}`}</Button>

                                        </>
                                    }
                                />
                            }

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