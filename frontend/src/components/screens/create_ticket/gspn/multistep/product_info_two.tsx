"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useIpaasSymptomCodes from '@/hooks/useSymptomCodes';
import { useEffect, useState } from 'react';
import FormWrapper from './wrapper';
import service_types from "@/lib/service_types";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, ClockIcon } from "@radix-ui/react-icons";
import { datetimestamp } from "@/lib/date_formats";
import moment from "moment";
type TProductInfo = {
    model: string
    symCode1: string;
    setSymCode1: (value: string) => void
    symCode2: string;
    setSymCode2: (value: string) => void
    symCode3: string;
    setSymCode3: (value: string) => void
    serviceType: string;
    setServiceType: (value: string) => void
    tokenNo: string;
    setTokenNo: (value: string) => void
    requestDate: string;
    setRequestDate: (value: string) => void
    requestTime: string;
    setRequestTime: (value: string) => void
    unitReceiveDate: string;
    setUnitReceieveDate: (value: string) => void
    unitReceiveTime: string;
    setUnitReceieveTime: (value: string) => void
    firstAppDate: string;
    setFirstAppDate: (value: string) => void
    firstAppTime: string;
    setFirstAppTime: (value: string) => void
    repairReceiveDate: string;
    setRepairReceiveDate: (value: string) => void
    repairReceiveTime: string;
    setRepairReceiveTime: (value: string) => void

}

type TCustomerCodesData = {
    "SymDesc1": string,
    "SymCode1": string,
    "SymDesc2": string,
    "SymCode2": string,
    "SymDesc3": string,
    "SymCode3": string,
    "SymDesc4": string,
    "SymCode4": string,
    "ResolutionDesc": string,
    "Resolution": string,
    "ProductGroup": string
}
const ProductInfoTwo = ({ model, symCode1, setSymCode1, symCode2, setSymCode2, symCode3, setSymCode3, serviceType, setServiceType, tokenNo, setTokenNo, requestDate, setRequestDate, requestTime, setRequestTime, unitReceiveDate, setUnitReceieveDate, unitReceiveTime, setUnitReceieveTime, firstAppDate, setFirstAppDate, firstAppTime, setFirstAppTime, repairReceiveDate, setRepairReceiveDate, repairReceiveTime, setRepairReceiveTime }: TProductInfo) => {
    const { getCustomerCodes } = useIpaasSymptomCodes()
    const [symptomCodes, setData] = useState<TCustomerCodesData[]>([])
    // Extract unique SymCode1 options
    const symCode1Options = [...new Map(
        symptomCodes?.map((item) => [item.SymCode1, `${item.SymCode1} - ${item.SymDesc1}`])
    ).entries()];

    // const [selectedSymCode1, setSelectedSymCode1] = useState("");
    const [symCode2Options, setSymCode2Options] = useState<any>([]);
    // const [selectedSymCode2, setSelectedSymCode2] = useState("");
    const [symCode3Options, setSymCode3Options] = useState<any>([]);
    // const [selectedSymCode3, setSelectedSymCode3] = useState("");
    useEffect(() => {
        const handleSymptomCodes = async (model: string) => {
            if (!model) return;
            try {
                const data = await getCustomerCodes(model);
                setData(data)
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error)
                }
            }
        };
        handleSymptomCodes(model)
    }, [model, getCustomerCodes])

    const handleSymCode1Change = (value: string | any) => {
        setSymCode1(value);
        setSymCode2("");
        setSymCode3("");

        // Filter unique SymCode2 options for the selected SymCode1
        const filteredSymCode2 = [
            ...new Map(
                symptomCodes?.filter((item) => item.SymCode1 === value)
                    .map((item) => [item.SymCode2, `${item.SymCode2} - ${item.SymDesc2}`])
            ).entries()
        ];
        setSymCode2Options(filteredSymCode2);
        setSymCode3Options([]);
    };

    const handleSymCode2Change = (value: string | any) => {
        setSymCode2(value);
        setSymCode3("");

        // Filter unique SymCode3 options for the selected SymCode1 and SymCode2
        const filteredSymCode3 = [
            ...new Map(
                symptomCodes?.filter((item) => item.SymCode1 === symCode1 && item.SymCode2 === value)
                    .map((item) => [item.SymCode3, `${item.SymCode3} - ${item.SymDesc3}`])
            ).entries(),
        ];
        setSymCode3Options(filteredSymCode3);
    };

    const handleSymCode3Change = (value: string | any) => {
        setSymCode3(value);
    };
    const token = 'Q130000000'; // Change this to your desired default value
    const handleToken = () => {
        setTokenNo(token);
    };
    const handleReqDateTime = () => {
        const date = moment(datetimestamp).format('YYYYMMDD');
        const time = moment(datetimestamp).format('hhmmss');
        setRequestDate(date)
        setRequestTime(time)
    }
    const handleReceivedDateTime = () => {
        const date = moment(datetimestamp).format('YYYYMMDD');
        const time = moment(datetimestamp).format('hhmmss');
        setUnitReceieveDate(date)
        setUnitReceieveTime(time)
    }
    const handleFirstAppDateTime = () => {
        const date = moment(datetimestamp).format('YYYYMMDD');
        const time = moment(datetimestamp).format('hhmmss');
        setFirstAppDate(date)
        setFirstAppTime(time)
    }
    const handleRepairReceivedDateTime = () => {
        const date = moment(datetimestamp).format('YYYYMMDD');
        const time = moment(datetimestamp).format('hhmmss');
        setRepairReceiveDate(date)
        setRepairReceiveTime(time)
    }
    return (
        <FormWrapper title="Job info">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-center">

                <div>
                    <label htmlFor='symCode1' className='text-sm font-medium text-gray-900'>SymCode1:</label>
                    <Select value={symCode1}
                        name="symCode1"
                        onValueChange={(e) =>
                            handleSymCode1Change(e)
                        }>
                        <SelectTrigger>
                            <SelectValue placeholder="Select SymCode1" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select SymCode1</SelectLabel>
                                {symCode1Options?.map(([value, label]) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor='symCode2' className='text-sm font-medium text-gray-900'>SymCode2:</label>
                    <Select value={symCode2}
                        name="symCode2"
                        disabled={!symCode2Options.length}
                        onValueChange={(e) =>
                            handleSymCode2Change(e)
                        }>
                        <SelectTrigger>
                            <SelectValue placeholder="Select SymCode2" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select SymCode2</SelectLabel>
                                {symCode2Options?.map(([value, label]: string | any) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor='symCode3' className='text-sm font-medium text-gray-900'>SymCode3:</label>
                    <Select value={symCode3}
                        name="symCode3"
                        disabled={!symCode3Options.length}
                        onValueChange={(e) =>
                            handleSymCode3Change(e)
                        }>
                        <SelectTrigger>
                            <SelectValue placeholder="Select SymCode3" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select SymCode3</SelectLabel>
                                {symCode3Options?.map(([value, label]: string | any) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-center">
                <div>
                    <label htmlFor='serviceType' className='text-sm font-medium text-gray-900'>Service Type</label>
                    <Select value={serviceType}
                        name="serviceType"
                        onValueChange={(e) =>
                            setServiceType(e)
                        }>
                        <SelectTrigger>
                            <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Service Type</SelectLabel>
                                {service_types?.map((x) => (
                                    <SelectItem key={x?.id} value={x?.value}>{x?.label}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor='tokenNo' className='text-sm font-medium text-gray-900'>Token No</label>
                    <div className="flex items-center gap-1">
                        <Input type="text" id='tokenNo' name='tokenNo' value={tokenNo} disabled
                            onChange={(e) => setTokenNo(e.target.value)} />
                        <button className="border-none outline-none" onClick={handleToken}><MagnifyingGlassIcon className="h-5 w-5 text-gray-900" /></button>
                    </div>
                </div>
                <div>
                    <label htmlFor='requestDate' className='text-sm font-medium text-gray-900'>Request date & time</label>
                    <div className="flex items-center gap-1">
                        <Input type="text" id='requestDate' name='requestDate' value={requestDate} disabled
                            onChange={(e) => setRequestDate(e.target.value)} />
                        <Input type="text" id='requestTime' name='requestTime' value={requestTime} disabled
                            onChange={(e) => setRequestTime(e.target.value)} />
                        <button className="border-none outline-none" onClick={handleReqDateTime}><ClockIcon className="h-5 w-5 text-gray-900" /></button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-center">
                <div>
                    <label htmlFor='unitReceiveDate' className='text-sm font-medium text-gray-900'>Received date & time</label>
                    <div className="flex items-center gap-1">
                        <Input type="text" id='unitReceiveDate' name='unitReceiveDate' value={unitReceiveDate} disabled
                            onChange={(e) => setUnitReceieveDate(e.target.value)} />
                        <Input type="text" id='requestTime' name='requestTime' value={unitReceiveTime} disabled
                            onChange={(e) => setUnitReceieveTime(e.target.value)} />
                        <button className="border-none outline-none" onClick={handleReceivedDateTime}><ClockIcon className="h-5 w-5 text-gray-900" /></button>
                    </div>
                </div>
                <div>
                    <label htmlFor='firstAppDate' className='text-sm font-medium text-gray-900'>First app date & time</label>
                    <div className="flex items-center gap-1">

                        <Input type="text" id='firstAppDate' name='firstAppDate' value={firstAppDate} disabled
                            onChange={(e) => setFirstAppDate(e.target.value)} />
                        <Input type="text" id='firstAppTime' name='firstAppTime' value={firstAppTime} disabled
                            onChange={(e) => setFirstAppTime(e.target.value)} />
                        <button className="border-none outline-none" onClick={handleFirstAppDateTime}><ClockIcon className="h-5 w-5 text-gray-900" /></button>
                    </div>
                </div>
                <div>
                    <label htmlFor='firstAppDate' className='text-sm font-medium text-gray-900'>Repair receive date & time</label>
                    <div className="flex items-center gap-1">

                        <Input type="text" id='repairReceiveDate' name='repairReceiveDate' value={repairReceiveDate} disabled
                            onChange={(e) => setRepairReceiveDate(e.target.value)} />
                        <Input type="text" id='repairReceiveTime' name='repairReceiveTime' value={repairReceiveTime} disabled
                            onChange={(e) => setRepairReceiveTime(e.target.value)} />
                        <button className="border-none outline-none" onClick={handleRepairReceivedDateTime}><ClockIcon className="h-5 w-5 text-gray-900" /></button>
                    </div>
                </div>
            </div>
        </FormWrapper>
    )
}

export default ProductInfoTwo