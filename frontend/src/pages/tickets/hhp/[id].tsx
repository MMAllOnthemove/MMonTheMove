import Button from '@/components/Buttons';
import Container from '@/components/Container';
import NotLoggedIn from '@/components/NotLoggedIn';
import { fetchCurrentUser, fetchTicketById } from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import { HHPSymptom1, HHPSymptom2A, HHPSymptom2B, HHPSymptom2C, HHPSymptom2D, HHPSymptom2E, HHPSymptom2F, HHPSymptom2G, HHPSymptom2H, HHPSymptom2I, HHPSymptom2J, HHPSymptom2K, HHPSymptom2L, HHPSymptom2M, HHPSymptom2N, HHPSymptom2O, HHPSymptom2P, HHPSymptom2Q, HHPSymptom3A, HHPSymptom3AA, HHPSymptom3AB, HHPSymptom3AC, HHPSymptom3AD, HHPSymptom3AE, HHPSymptom3AF, HHPSymptom3AG, HHPSymptom3AH, HHPSymptom3AI, HHPSymptom3AJ, HHPSymptom3AK, HHPSymptom3AL, HHPSymptom3AM, HHPSymptom3AN, HHPSymptom3AO, HHPSymptom3AP, HHPSymptom3AQ, HHPSymptom3AR, HHPSymptom3AS, HHPSymptom3AT, HHPSymptom3AU, HHPSymptom3AV, HHPSymptom3AW, HHPSymptom3AX, HHPSymptom3AY, HHPSymptom3AZ, HHPSymptom3B, HHPSymptom3BA, HHPSymptom3BB, HHPSymptom3BC, HHPSymptom3BD, HHPSymptom3BF, HHPSymptom3BG, HHPSymptom3BH, HHPSymptom3BI, HHPSymptom3BJ, HHPSymptom3BK, HHPSymptom3BL, HHPSymptom3BM, HHPSymptom3BN, HHPSymptom3BO, HHPSymptom3BP, HHPSymptom3BQ, HHPSymptom3C, HHPSymptom3CA, HHPSymptom3CB, HHPSymptom3CC, HHPSymptom3CD, HHPSymptom3CE, HHPSymptom3CF, HHPSymptom3CG, HHPSymptom3CH, HHPSymptom3CI, HHPSymptom3CJ, HHPSymptom3CK, HHPSymptom3CL, HHPSymptom3CM, HHPSymptom3CN, HHPSymptom3CO, HHPSymptom3CP, HHPSymptom3CQ, HHPSymptom3CR, HHPSymptom3CS, HHPSymptom3CT, HHPSymptom3CU, HHPSymptom3CV, HHPSymptom3CW, HHPSymptom3CX, HHPSymptom3CY, HHPSymptom3D, HHPSymptom3DA, HHPSymptom3DB, HHPSymptom3DC, HHPSymptom3DD, HHPSymptom3DE, HHPSymptom3DF, HHPSymptom3DH, HHPSymptom3DI, HHPSymptom3DJ, HHPSymptom3DK, HHPSymptom3DL, HHPSymptom3DM, HHPSymptom3DN, HHPSymptom3DO, HHPSymptom3DP, HHPSymptom3DQ, HHPSymptom3DR, HHPSymptom3DS, HHPSymptom3DT, HHPSymptom3DU, HHPSymptom3DV, HHPSymptom3DW, HHPSymptom3DX, HHPSymptom3DY, HHPSymptom3DZ, HHPSymptom3E, HHPSymptom3EA, HHPSymptom3EB, HHPSymptom3EC, HHPSymptom3ED, HHPSymptom3EE, HHPSymptom3EF, HHPSymptom3EG, HHPSymptom3EH, HHPSymptom3EI, HHPSymptom3EJ, HHPSymptom3EK, HHPSymptom3EL, HHPSymptom3EM, HHPSymptom3EN, HHPSymptom3EO, HHPSymptom3EP, HHPSymptom3EQ, HHPSymptom3ER, HHPSymptom3ES, HHPSymptom3ET, HHPSymptom3EU, HHPSymptom3EV, HHPSymptom3EW, HHPSymptom3EX, HHPSymptom3EY, HHPSymptom3EZ, HHPSymptom3F, HHPSymptom3FA, HHPSymptom3FB, HHPSymptom3FC, HHPSymptom3FD, HHPSymptom3FE, HHPSymptom3FF, HHPSymptom3FG, HHPSymptom3FH, HHPSymptom3FI, HHPSymptom3FJ, HHPSymptom3FK, HHPSymptom3FL, HHPSymptom3FM, HHPSymptom3FN, HHPSymptom3FO, HHPSymptom3FP, HHPSymptom3FR, HHPSymptom3FS, HHPSymptom3FT, HHPSymptom3FU, HHPSymptom3FV, HHPSymptom3FW, HHPSymptom3FX, HHPSymptom3FY, HHPSymptom3FZ, HHPSymptom3G, HHPSymptom3GA, HHPSymptom3GB, HHPSymptom3GC, HHPSymptom3GD, HHPSymptom3GE, HHPSymptom3GF, HHPSymptom3GG, HHPSymptom3GH, HHPSymptom3H, HHPSymptom3I, HHPSymptom3J, HHPSymptom3K, HHPSymptom3L, HHPSymptom3M, HHPSymptom3N, HHPSymptom3O, HHPSymptom3P, HHPSymptom3Q, HHPSymptom3R, HHPSymptom3S, HHPSymptom3T, HHPSymptom3U, HHPSymptom3V, HHPSymptom3W, HHPSymptom3X, HHPSymptom3Y, HHPSymptom3Z, HHPSymptom3Z_ } from '../../../../utils/gspn_hhp_symptoms';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import CreateSOModal from '@/components/PopupModal/so_create_modal';


export default function EditTicket() {
    const { userData } = fetchCurrentUser();
    const router = useRouter();
    const { id } = router.query;

    const { getTicketByid } = fetchTicketById(id);
    const [repairTicketId, setRepairTicketId] = useState("")

    const [createSOModalVisible, setCreateSOModalVisble] = useState(false);
    const [createSOSuccess, setCreateSOSuccess] = useState('')
    const [getServiceOrderNumber, setGetServicOrderNumber] = useState("")

    const ticketNumber = getTicketByid[0]?.ticket_number;
    const unitFault = getTicketByid[0]?.unit_fault;
    const unitWarranty = getTicketByid[0]?.warranty_period;
    const IMEI = getTicketByid[0]?.imei;
    const model = getTicketByid[0]?.model_number;
    const serialNumber = getTicketByid[0]?.serial_number;
    const customerFullName = getTicketByid[0]?.customer_fullname;
    let customer_name = customerFullName?.split(" ")
    const customerEmail = getTicketByid[0]?.customer_email;

    const customerPhone = getTicketByid[0]?.customer_phone;
    const customerAddress = getTicketByid[0]?.customer_address;
    const customerAddress2 = getTicketByid[0]?.customer_address_2;
    const customerCity = getTicketByid[0]?.customer_city;
    const customerState = getTicketByid[0]?.customer_state;
    const customerZipCode = getTicketByid[0]?.zip;
    const purchaseDate = getTicketByid[0]?.purchase_date;
    let modifiedPurchaseDate = moment(purchaseDate).format("YYYYMMDD");
    const createdDate = getTicketByid[0]?.created_date;


    const [symptom1, setSymptom1] = useState("")
    const [symptom1Clicked, setSymptom1Clicked] = useState(false)
    const [symptom1ClickedLabel, setSymptom1ClickedLabel] = useState("")

    const [symptom2, setSymptom2] = useState("")
    const [symptom2Clicked, setSymptom2Clicked] = useState(false)
    const [symptom2ClickedLabel, setSymptom2ClickedLabel] = useState("")

    const [symptom3, setSymptom3] = useState("")
    const [symptom3Clicked, setSymptom3Clicked] = useState(false)
    const [symptom3ClickedLabel, setSymptom3ClickedLabel] = useState("")



    const [accessory, setAccessory] = useState("")


    useEffect(() => {
        getTicketId();
    }, [id])
    const getTicketId = async () => {
        const response = await fetch(`https://allelectronics.repairshopr.com/api/v1/tickets?query=${ticketNumber}`, {
            method: "GET",
            mode: "cors",
            cache: "default",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("ticket", data)
                setRepairTicketId(data.tickets[0]?.id)
            });
    }



    const createServiceOrder = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const generateTimeStampForPacCode = moment(new Date(
            Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
        )
            .toISOString()
            .replace("T", " ")
            .replace("Z", "")).format("YYMMDDhhmmss");
        const todaysDate = moment(new Date(
            Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
        )
            .toISOString()
            .replace("T", " ")
            .replace("Z", "")).format("YYYYMMDD");

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
                "SerialNo": `${serialNumber}`,
                "IMEI": `${IMEI}`,
                "PurchaseDate": `${modifiedPurchaseDate === null || modifiedPurchaseDate === undefined ? "" : modifiedPurchaseDate}`,
                "Accessory": `${accessory}`,
                "DefectDesc": `${unitFault}`,
                "Remark": "",
                "WtyException": ""
            },
            "IsJobInfo": {
                "SymCode1": `${symptom1}`,
                "SymCode2": `${symptom2}`,
                "SymCode3": `${symptom3}`,
                "SvcType": "CI",
                "QueueTokenNo": "",
            },
            "IsDateInfo": {
                "RequestDate": "",
                "UntRecvDate": "",
                "UntRecvTime": ""
            },
            "IsWtyInfo": {
                "WtyConsType": ""
            },
            "IsBpDetail": {
                "CustFirstName": `${customer_name[0]}`,
                "CustLastName": `${customer_name[customer_name.length - 1]}`,
                "CustHomePhone": "",
                "CustOfficePhone": "",
                "CustMobilePhone": `${customerPhone}`,
                "CustEmail": `${customerEmail}`,
                "CustAddrStreet2": `${customerAddress2}`,
                "CustAddrStreet1": `${customerAddress}`,
                "CustCity": `${customerCity}`,
                "CustState": "GP",
                "CustZipcode": `${customerZipCode}`,
                "Country": "RSA"
            }
        }
        await axios.post(`${process.env.NEXT_PUBLIC_IPAAS_API_CreateSO} `, values, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS} `
            },
        }).then(function (response) {
            console.log(response)
            setCreateSOSuccess(response?.data.Return.EvRetMsg);
            setGetServicOrderNumber(response?.data.Return.EvSvcOrderNo);
            setCreateSOModalVisble(true)

        })
            .catch(function (error) {
                console.log(error)
            });

    }



    return (
        <main>
            <Container>
                {!userData ? (
                    <NotLoggedIn />
                ) : <>

                    <span className="flex items-center justify-between my-3">
                        <Button
                            type="button"
                            onClick={() => history.back()}
                            className="bg-[#082f49]  font-semibold text-white dark:text-[#eee] hover:bg-blue-800 rounded-sm text-sm p-2.5 text-center"
                            text="Back"
                        />
                        <div>
                            <h1 className="text-center py-2 text-gray-900 dark:text-[#eee] font-semibold lg:text-2xl">
                                {" "}
                                Editing ticket: {ticketNumber}
                            </h1>
                            <h3 className="text-center dark:text-[#eee] font-semibold">
                                You are editing as:{" "}
                                <span className="text-sky-700  font-bold">{userData}</span>
                            </h3>
                        </div>
                        <div />
                    </span>


                    <CreateSOModal
                        isVisible={createSOModalVisible}
                        title="Create service order"
                        content={
                            <>
                                <p>{getServiceOrderNumber}</p>
                                <p>{createSOSuccess}</p>
                            </>
                        }
                        onClose={() => setCreateSOModalVisble(false)}

                    />
                    <form onSubmit={createServiceOrder}>


                        <span>
                            <label
                                htmlFor="ticketNumber"
                                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                            >
                                Ticket No
                            </label>
                            <input
                                type="text"
                                name="ticketNumber"
                                id="ticketNumber"
                                className="mb-2 bg-gray-50 dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                defaultValue={ticketNumber}
                                disabled
                            />
                        </span>

                        <span>
                            <label
                                htmlFor="fault"
                                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                            >
                                Fault
                            </label>
                            <input
                                type="text"
                                name="fault"
                                id="fault"
                                className="mb-2 bg-gray-50 dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                defaultValue={unitFault}
                                disabled
                            />
                        </span>
                        <span>
                            <label
                                htmlFor="fullName"
                                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                            >
                                Customer fullname
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                className="mb-2 bg-gray-50 dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                defaultValue={customerFullName}
                                disabled
                            />
                        </span>
                        <span>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                            >
                                Customer email
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="mb-2 bg-gray-50 dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                defaultValue={customerEmail}
                                disabled
                            />
                        </span>
                        <span>
                            <label
                                htmlFor="warranty"
                                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                            >
                                Warranty
                            </label>
                            <input
                                type="text"
                                name="warranty"
                                id="warranty"
                                className="mb-2 bg-gray-50 dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                defaultValue={unitWarranty}
                                disabled
                            />
                        </span>
                        <span>
                            <label
                                htmlFor="imei"
                                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                            >
                                IMEI
                            </label>
                            <input
                                type="text"
                                name="imei"
                                id="imei"
                                className="mb-2 bg-gray-50 dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                defaultValue={IMEI}
                                disabled
                            />
                        </span>
                        <span>
                            <label
                                htmlFor="model"
                                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                            >
                                Model
                            </label>
                            <input
                                type="text"
                                name="model"
                                id="model"
                                className="mb-2 bg-gray-50 dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                defaultValue={model}
                                disabled
                            />
                        </span>
                        <span>
                            <label
                                htmlFor="serialNumber"
                                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                            >
                                Serial Number
                            </label>
                            <input
                                type="text"
                                name="serialNumber"
                                id="serialNumber"
                                className="mb-2 bg-gray-50 dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                defaultValue={serialNumber}
                                disabled
                            />
                        </span>
                        <span>
                            <label
                                htmlFor="accessory"
                                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
                            >
                                Accessory
                            </label>
                            <input
                                type="text"
                                name="accessory"
                                id="accessory"
                                className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                value={accessory}
                                onChange={(e) => setAccessory(e.target.value)}
                            />
                        </span>
                        <h4 className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]">Customer symptoms</h4>
                        {/* Customer symptom 1 */}
                        <div className="dropdown">
                            <div
                                onClick={(e) => {
                                    setSymptom1Clicked(!symptom1Clicked);
                                }}
                                className="dropdown-btn flex items-center justify-between"
                            >
                                {symptom1ClickedLabel ? `${symptom1ClickedLabel}` : "Customer symptom 1"}
                                {symptom1Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                            </div>
                            {HHPSymptom1.map((d) => (
                                <div
                                    key={d.id}
                                    className="dropdown-content"
                                    style={{ display: symptom1Clicked ? 'block' : 'none' }}
                                >
                                    <div
                                        key={d.id}
                                        onClick={(e) => {


                                            setSymptom1(d.value)
                                            setSymptom1ClickedLabel(d._name);
                                            setSymptom1Clicked(!symptom1Clicked);
                                        }}
                                        className="item"
                                    >
                                        {d._name}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Symptom 2 */}
                        {
                            symptom1ClickedLabel === "02 - [Installation]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2Q.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "05 - [FMM Service]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2A.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "06 - [Samsung Apps]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2B.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }

                        {
                            symptom1ClickedLabel === "AS - [Apps & Services]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2C.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "L1 - [Software Update]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2D.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "L2 - [Power]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2E.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "L3 - [Lock]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2F.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "L4 - [IMAGE / TOUCH SCREEN QUALITY]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2G.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "L5 - [Call Quality / Sound]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2H.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "L6 - [Connections]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2I.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "L7 - [Physical Damage]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2J.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "L8 - [SPECIFICATIONS]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2K.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "L9 - [Accessories]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2L.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "LA - [Internet / OS]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2M.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "LB - [Menu / Apps]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2N.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "LC - [Hubs]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2O.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        {
                            symptom1ClickedLabel === "Z1 - [Galaxy Diagnostic]" ? (

                                <div className="dropdown">
                                    <div
                                        onClick={(e) => {
                                            setSymptom2Clicked(!symptom2Clicked);
                                        }}
                                        className="dropdown-btn flex items-center justify-between"
                                    >
                                        {symptom2ClickedLabel ? `${symptom2ClickedLabel}` : "Customer symptom 2"}
                                        {symptom2Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                    </div>
                                    {HHPSymptom2P.map((d) => (
                                        <div
                                            key={d.id}
                                            className="dropdown-content"
                                            style={{ display: symptom2Clicked ? 'block' : 'none' }}
                                        >
                                            <div
                                                key={d.id}
                                                onClick={(e) => {


                                                    setSymptom2(d.value)
                                                    setSymptom2ClickedLabel(d._name);
                                                    setSymptom2Clicked(!symptom2Clicked);
                                                }}
                                                className="item"
                                            >
                                                {d._name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }

                        {/* Symptom 3 */}

                        <div>
                            {
                                symptom2ClickedLabel === "01 - [Interface software]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3A.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Wireless Modem / Dial up networking]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3B.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [Operating system / software]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3C.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [Network]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3D.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "05 - [Software upgrade]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3E.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Usage (How to Start)]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3F.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Usage (function)]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3G.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [Usage (How to Stop)]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3H.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [Quality/Trouble (Website)]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3I.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "05 - [Quality/Trouble (Function)]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3J.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Usage]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3K.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Installation]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3L.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [Quality/Trouble)]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3M.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }

                            {
                                symptom2ClickedLabel === "31 - [AMX SmartHome]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3N.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }

                            {
                                symptom2ClickedLabel === "32 - [Bixby 1.0]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3O.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "33 - [Bixby Home]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3P.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "34 - [Bixby Vision]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3Q.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "35 - [Chef Collection [US only]]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3R.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "36 - [CMC]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3S.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "37 - [Enhanced Features]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3T.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "38 - [Find My Mobile]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3U.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "39 - [Galaxy Store]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3V.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "40 - [Galaxy Themes]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3W.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "41 - [Galaxy Wearable]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3X.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "42 - [Game Booster]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3Y.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "43 - [Game Launcher]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3Z.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "44 - [GDPR BixbyPP]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AA.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "45 - [GDPR MUSE]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AB.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "46 - [GDPR Runestone]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AC.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "47 - [GDPR Samsung Gear 360]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AC.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "48 - [HomeloT]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AD.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "49 - [Kids Mode]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AE.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "50 - [MILK]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AF.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "51 - [Milk Video]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AG.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "52 - [Milk VR]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AH.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "53 - [PENUP]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AI.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "54 - [Peppermint [KR only]]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AJ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "55 - [Pictionary [US only]]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AK.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "56 - [S Assistant [CN only]]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AL.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "57 - [S Educate [US only]]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AM.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "58 - [S Note]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AN.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "59 - [Samsung Account]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AO.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "60 - [Samsung Blockchain Keystore]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AP.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "61 - [Samsung Blockchain Wallet]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AQ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "62 - [Samsung Cloud]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AR.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "63 - [Samsung Daily]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AS.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "64 - [Samsung DeX]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AT.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "65 - [Samsung Flow]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AU.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "66 - [Samsung Free]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AV.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "67 - [Samsung Health]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AW.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "68 - [Samsung Health Monitor]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AX.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "69 - [Samsung Internet]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AY.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "70 - [Samsung Kids Home]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AE.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "71 - [Samsung Marshmallow]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3AZ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "72 - [Samsung Music]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3Z_.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "73 - [Samsung Pass]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BA.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "74 - [Samsung Rewards]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BB.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "75 - [Samsung Smart Switch Mobile]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BC.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "76 - [Samsung Smart Switch [US only]]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BD.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "77 - [Samsung Social]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3S.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "78 - [Samsung TV Plus]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BF.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "79 - [Samsung VR]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BG.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "80 - [Samsung+ [US only]]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BH.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "81 - [Samsung Wi-Fi]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BI.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "82 - [SmartThings]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BJ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "83 - [The New Bixby]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3P.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "84 - [Tizen Store [en ONLY]]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BK.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "85 - [Vodafone Smart Home]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BL.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "86 - [Samsung Pay]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BM.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "87 - [Samsung Pay Gear]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BN.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "88 - [Galaxy Store Event]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BO.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "89 - [Samsung Health Cycle tracking]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BP.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "99 - [Others]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3BQ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Information about Software Update]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CA.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Problems after downloading update]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CB.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Turn on/off]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CC.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [No charge]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CD.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [Intermittent Power]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CE.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [Quick discharge]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CF.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Carrier Lock]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CG.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [SIM Card Lock]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CH.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [Device Lock]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CI.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [Non technical]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CJ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Touch screen]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CK.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Defective color]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CL.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [Display color tone]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CM.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Coverage problems]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CN.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Sound problems]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CO.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [Non technical]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CP.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Bluetooth]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CQ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Mobile data]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CR.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [PC= KIES / Kiers Air / New PC Studio / PC Studio]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CS.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [PC = Massive storage]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CT.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "05 - [TV connection]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CU.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "06 - [Wireless connection]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CV.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "07 - [NFC]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CW.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "08 - [WiFi direct]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CX.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "09 - [Non technical]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3CY.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Antenna]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DA.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Head devices / accessories]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DB.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [In battery]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DC.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [In camera]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DD.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "05 - [In cover]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DE.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "06 - [In keyboard]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DF.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "07 - [Overheating]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DH.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "08 - [SD card, SIM card]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DI.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "09 - [Vibration]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DJ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "10 - [Broken screen]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DK.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "11 - [Defective color]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DL.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "12 - [Liquid trace]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DM.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "13 - [Stains]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DN.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "14 - [Non technical]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DO.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "15 - [Hinge]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DP.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Hardware]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DQ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Software]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DR.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [Product feature]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DR.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [User manual]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DT.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "05 - [Non technical]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DU.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Adaptors]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DV.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Headphones]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DW.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [Case / cover]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DX.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [Battery]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DY.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "05 - [Charger]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3DZ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "06 - [S pen]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EA.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "07 - [DOA Battery cover]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EB.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "08 - [Hands free accessories]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EC.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "09 - [Bluetooth]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3ED.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "10 - [Memory card]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EE.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "11 - [Dock]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EF.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "12 - [Data cable]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EG.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "13 - [Cast dongle]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EH.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "14 - [Others]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EI.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Email / accounts]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EJ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Google play]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EK.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [Webpages]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EL.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [Sync]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EM.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "05 - [Operating system]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EN.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "06 - [MAC OS]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EO.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "07 - [Zune]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EP.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "08 - [Non technical]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EQ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Agenda]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3ER.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Apps]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3ES.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [Samsung Apps]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3ET.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [Calendar]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EU.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "05 - [Language]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EV.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "06 - [GPS]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EW.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "07 - [Features]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EX.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "08 - [Calls]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EY.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "09 - [Camera]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3EZ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "10 - [Modem / router]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FA.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "11 - [Driving mode]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FB.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "12 - [Others]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FC.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "13 - [All share]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FD.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "14 - [Screen]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FE.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "15 - [Find my mobile]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FF.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "16 - [SMS / MMS]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FG.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "17 - [Videos]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FH.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "18 - [Widgets]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FI.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "19 - [Non technical]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FJ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "20 - [Compass]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FK.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Game hub]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FL.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Media hub]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FM.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [Music hub]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FN.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [Social hub]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FO.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "05 - [Samsung hub]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FP.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "06 - [Hubs (others)]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FR.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "01 - [Power]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FS.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "02 - [Battery]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FT.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "03 - [Charging]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FU.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "04 - [Sound]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FV.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "05 - [Display]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FW.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "06 - [Touch]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FX.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "07 - [Button]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FY.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "08 - [Camera]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3FZ.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "09 - [Call]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3GA.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "10 - [Operation / performace]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3GB.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "11 - [FW / SW]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3GC.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                            {
                                symptom2ClickedLabel === "12 - [Connection, WiFi, BT IR]" ? (

                                    <div className="dropdown">
                                        <div
                                            onClick={(e) => {
                                                setSymptom3Clicked(!symptom3Clicked);
                                            }}
                                            className="dropdown-btn flex items-center justify-between"
                                        >
                                            {symptom3ClickedLabel ? `${symptom3ClickedLabel}` : "Customer symptom 3"}
                                            {symptom3Clicked ? <ChevronUpIcon className="h-4 w-4 text-grey-500" /> : <ChevronDownIcon className="h-4 w-4 text-grey-500" />}

                                        </div>
                                        {HHPSymptom3GD.map((d) => (
                                            <div
                                                key={d.id}
                                                className="dropdown-content"
                                                style={{ display: symptom3Clicked ? 'block' : 'none' }}
                                            >
                                                <div
                                                    key={d.id}
                                                    onClick={(e) => {


                                                        setSymptom3(d.value)
                                                        setSymptom3ClickedLabel(d._name);
                                                        setSymptom3Clicked(!symptom3Clicked);
                                                    }}
                                                    className="item"
                                                >
                                                    {d._name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
                        </div>

                        <button type="submit" className="bg-[#082f49] font-semibold text-white dark:text-[#eee] hover:bg-blue-800 rounded-sm text-sm p-2.5 text-center">Send to GSPN</button>
                    </form>
                </>}
            </Container>



        </main >
    )
}

