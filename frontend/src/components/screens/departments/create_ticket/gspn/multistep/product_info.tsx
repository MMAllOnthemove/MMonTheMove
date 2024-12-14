"use client"
import { Input } from '@/components/ui/input';
import React from 'react'
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

type TProductInfo = {
    model: string;
    setModel: (value: string) => void
    serial_number: string;
    setSerialNumber: (value: string) => void
    imei: string;
    setIMEI: (value: string) => void
    purchase_date: string;
    setPurchaseDate: (value: string) => void
    accessory: string;
    setAccessory: (value: string) => void
    defectDesc: string;
    setDefectDesc: (value: string) => void
    remark: string;
    setRemark: (value: string) => void
    wtyException: string;
    setWtyException: (value: string) => void
    wtyType: string;
    setWtyType: (value: string) => void
}
const ProductInfo = ({ model, setModel, serial_number, setSerialNumber, imei, setIMEI, purchase_date, setPurchaseDate, wtyException, setWtyException, wtyType, setWtyType, accessory, setAccessory, defectDesc, setDefectDesc, remark, setRemark }: TProductInfo) => {
    return (
        <>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-center">
                <div>
                    <label htmlFor='model' className='text-sm font-medium text-gray-900 '>Model</label>
                    <Input type="text" id='model' name='model' value={model}
                        maxLength={18}
                        onChange={(e) => setModel(e.target.value)} />
                        
                </div>
                <div>
                    <label htmlFor='serial_number' className='text-sm font-medium text-gray-900 '>Serial number</label>
                    <Input type="text" id='serial_number' name='serial_number' value={serial_number} maxLength={16}
                        onChange={(e) => setSerialNumber(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='imei' className='text-sm font-medium text-gray-900 '>IMEI</label>
                    <Input type="text" id='imei' name='imei' value={imei} maxLength={16}
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
                    <label htmlFor='wtyException' className='text-sm font-medium text-gray-900'>Wty Type</label>

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
                    <label htmlFor='accessory' className='text-sm font-medium text-gray-900'>Accessories</label>
                    <Input type="text" id='accessory' name='accessory' value={accessory} maxLength={62}
                        onChange={(e) => setAccessory(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='defectDesc' className='text-sm font-medium text-gray-900'>Defect desc</label>
                    <Input type="text" id='defectDesc' name='defectDesc' value={defectDesc} maxLength={70}
                        onChange={(e) => setDefectDesc(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='remark' className='text-sm font-medium text-gray-900'>Remark</label>
                    <Input type="text" id='remark' name='remark' value={remark} maxLength={64}
                        onChange={(e) => setRemark(e.target.value)} />
                </div>
            </div>
        </>
    )
}

export default ProductInfo