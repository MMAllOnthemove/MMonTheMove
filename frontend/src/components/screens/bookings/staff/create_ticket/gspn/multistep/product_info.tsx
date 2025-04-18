"use client"
import { Input } from '@/components/ui/input';
import React, { useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import warranties_gspn from '@/lib/warranty_exceptions';
import FormWrapper from './wrapper';
import useCheckWarranty from '@/hooks/useCheckDTVHAWarranty';

type TProductInfo = {
    model: string | any;
    setModel: (value: string) => void
    serial_number: string | any;
    setSerialNumber: (value: string) => void
    imei: string | any;
    setIMEI: (value: string) => void
    purchase_date: string;
    setPurchaseDate: (value: string) => void
    accessory: string | any;
    setAccessory: (value: string) => void
    defectDesc: string | any;
    setDefectDesc: (value: string) => void
    remark: string | any;
    setRemark: (value: string) => void
    wtyException: string | any;
    setWtyException: (value: string) => void
    wtyType: string | any;
    setWtyType: (value: string) => void
}
const ProductInfo = ({ model, setModel, serial_number, setSerialNumber, imei, setIMEI, purchase_date, setPurchaseDate, wtyException, setWtyException, wtyType, setWtyType, accessory, setAccessory, defectDesc, setDefectDesc, remark, setRemark }: TProductInfo) => {
    const { warranty } = useCheckWarranty(model, serial_number)

    useEffect(() => {
        if (warranty) setWtyType(warranty)
    }, [model, serial_number, setWtyType, warranty])

    return (
        <FormWrapper title="Model info">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-center">
                <div>
                    <label htmlFor='model' className='text-sm font-medium text-gray-900 '>Model</label>
                    <Input type="text" id='model' name='model' defaultValue={model || ""}
                        maxLength={18}
                        onChange={(e) => setModel(e.target.value)} />

                </div>
                <div>
                    <label htmlFor='serial_number' className='text-sm font-medium text-gray-900 '>Serial number</label>
                    <Input type="text" id='serial_number' name='serial_number' defaultValue={serial_number || ""} maxLength={16}
                        onChange={(e) => setSerialNumber(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='imei' className='text-sm font-medium text-gray-900 '>IMEI</label>
                    <Input type="text" id='imei' name='imei' defaultValue={imei || ""} maxLength={16}
                        onChange={(e) => setIMEI(e.target.value)} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-center">
                <div>
                    <label htmlFor='purchase_date' className='text-sm font-medium text-gray-900'>Purchase date</label>
                    <Input type="date" id='purchase_date' name='purchase_date' value={purchase_date}
                        onChange={(e) => setPurchaseDate(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='wtyType' className='text-sm font-medium text-gray-900'>Warranty</label>
                    <Input type="text" id='wtyType' name='wtyType' defaultValue={wtyType} disabled aria-disabled
                        onChange={(e) => setWtyType(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='wtyException' className='text-sm font-medium text-gray-900'>Wty Type <small>(For voiding warranty)</small></label>

                    <Select value={wtyException}
                        name="wtyException"
                        onValueChange={(e) =>
                            setWtyException(e)
                        }>
                        <SelectTrigger>
                            <SelectValue placeholder="Void warranty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Void warranty</SelectLabel>
                                {
                                    warranties_gspn?.map((x) => (
                                        <SelectItem key={x.id} value={`${x.warrantyCode}`}>{x?.label}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-center">
                <div>
                    <label htmlFor='accessory' className='text-sm font-medium text-gray-900'>Accessories <small>(What it came with)</small></label>
                    <Input type="text" id='accessory' name='accessory' value={accessory} maxLength={62}
                        onChange={(e) => setAccessory(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='defectDesc' className='text-sm font-medium text-gray-900'>Defect desc <small>(The fault)</small></label>
                    <Input type="text" id='defectDesc' name='defectDesc' value={defectDesc} maxLength={70}
                        onChange={(e) => setDefectDesc(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='remark' className='text-sm font-medium text-gray-900'>Remark</label>
                    <Input type="text" id='remark' name='remark' value={remark} maxLength={64}
                        onChange={(e) => setRemark(e.target.value)} />
                </div>
            </div>

        </FormWrapper>
    )
}

export default ProductInfo