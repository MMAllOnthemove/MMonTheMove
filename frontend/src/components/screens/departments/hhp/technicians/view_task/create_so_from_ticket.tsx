import CustomerInfoScreen from '@/components/screens/bookings/staff/create_ticket/gspn/multistep/customer_info';
import ProductInfo from '@/components/screens/bookings/staff/create_ticket/gspn/multistep/product_info';
import ProductInfoTwo from '@/components/screens/bookings/staff/create_ticket/gspn/multistep/product_info_two';
import { Button } from '@/components/ui/button';
import useAddCommentsLocally from '@/hooks/useCommentsLocally';
import useCreateServiceOrder from '@/hooks/useCreateServiceOrder';
import useUserLoggedIn from '@/hooks/useGetUser';
import { useHHPTasksCrud } from '@/hooks/useHHPTasksCrud';
import useRepairshoprComment from '@/hooks/useRepairshoprComment';
import { datetimestamp } from '@/lib/date_formats';
import { IHHPSingleTask, RepairshorTicketComment } from '@/lib/types';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';

type TCreateSOFromTicket = {
    modelProp: string | undefined;
    serial_numberProp: string | undefined;
    imeiProp: string | undefined;
    ticket_number: string | undefined;
    task_id: string | undefined;
    repairshopr_job_id: string | number | undefined;
    faultProp: string | undefined;
    setOpenCreateSOModal: (e: boolean) => void;
    data: IHHPSingleTask | null;
}

const CreateSOFromTicket = ({ faultProp, modelProp, serial_numberProp, imeiProp, setOpenCreateSOModal, data, ticket_number, task_id, repairshopr_job_id }: TCreateSOFromTicket) => {

    const { addServiceOrder, addServiceOrderLoading } = useCreateServiceOrder()
    const { hhpTasks, fetchTasks, updateHHPTaskLoading, updateTask, deleteTask, updateTaskSO, updateHHPTaskSOLoading } = useHHPTasksCrud()
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { addCommentLocally, addCommentLoading } = useAddCommentsLocally()
    const { updateRepairTicketComment } = useRepairshoprComment()
    const [step, setStep] = useState(1);
    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, 3)); // Adjust this if you add more steps
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };



    const [model, setModel] = useState<string | undefined>("")
    const [serial_number, setSerialNumber] = useState<string | undefined>("")
    const [imei, setIMEI] = useState<string | undefined>("")
    const [purchase_date, setPurchaseDate] = useState("")
    const [wtyException, setWtyException] = useState("")
    const [wtyType, setWtyType] = useState("")
    const [accessory, setAccessory] = useState("")
    const [defectDesc, setDefectDesc] = useState<string | undefined>("")
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
    const memoizedProps = useMemo(() => ({
        modelProp,
        serial_numberProp,
        imeiProp,
        faultProp
    }), [modelProp, serial_numberProp, imeiProp, faultProp]);

    useEffect(() => {
        if (data) {
            setModel(modelProp);
            setSerialNumber(serial_numberProp);
            setIMEI(imeiProp);
            setDefectDesc(faultProp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, memoizedProps]);
    // Order and size remain constant

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
        const updated_at = datetimestamp;
        const payload = {
            service_order: result?.Return?.EvSvcOrderNo, updated_by: user?.email, updated_at, ticket_number
        }

        const addCommentLocallyPayload = {
            "task_id": task_id,
            "comment": '*The created service order ' + result?.Return?.EvSvcOrderNo,
            "created_at": updated_at,
            "created_by": user?.full_name,
            "ticket_number": ticket_number
        }
        const commentPayload: RepairshorTicketComment = {
            "subject": "Update",
            "tech": user?.full_name,
            "body": '*The created service order ' + result?.Return?.EvSvcOrderNo,
            "hidden": true,
            "do_not_email": true
        }

        // update to service order in the very ticket you are in
        await updateTaskSO(ticket_number, payload)
        await updateRepairTicketComment(repairshopr_job_id, commentPayload)
        await addCommentLocally(addCommentLocallyPayload)
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

    }


    return (
        <>

            <Button data-testid="service-order-button" variant="outline" type="button" onClick={() => setOpenCreateSOModal(true)}>Close create so</Button>


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

        </>
    )
}

export default CreateSOFromTicket

