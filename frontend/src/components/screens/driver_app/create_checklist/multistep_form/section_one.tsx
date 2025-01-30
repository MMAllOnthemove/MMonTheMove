"use client"
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useFetchDrivers from '@/hooks/useFetchDrivers';
import cars from '@/lib/cars';
import vehicle_use_reasons from '@/lib/reasons_for_vehicle_use';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const FormWrapper = dynamic(() => import('./wrapper'), { ssr: false })

interface ISectionOne {
    car: string;
    setCar: (value: string) => void
    reason_for_use: string;
    selectCarUseReason: (value: string) => void
    driver: string;
    setDriver: (value: string) => void
    next_service_date: string;
    setNextServiceDate: (value: string) => void;
    next_service_kms: string;
    setNextServiceKms: (value: string) => void;
    license_disc_expiry: string;
    setLicenseDiscExpiry: (value: string) => void;
}



const SectionOne: React.FC<ISectionOne> = ({ next_service_date, setNextServiceDate, next_service_kms, setNextServiceKms, license_disc_expiry, setLicenseDiscExpiry, car, setCar, reason_for_use, selectCarUseReason, driver, setDriver }) => {
    const { driversList } = useFetchDrivers()
    const [open, setOpen] = useState(false)
    const [reasonOpen, setReasonOpen] = useState(false)
    const [driversOpen, setDriversOpen] = useState(false)

    const formattedData = cars?.map((car) => ({
        value: car.car,
        label: car.car,
    }))
    const reasons = vehicle_use_reasons?.map((car) => ({
        value: car.name,
        label: car.name,
    }))
    const drivers = driversList?.map((driver) => ({
        value: driver.driver_firstname + " " + driver.driver_lastname,
        label: driver.driver_firstname,
    }))
    return (
        <FormWrapper title='Pick car'>

            <div className="space-y-1 mb-2">

                <Select value={car} onValueChange={(e) => setCar(e)}>
                    <SelectTrigger >
                        <SelectValue placeholder="Select a car" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Cars</SelectLabel>
                            {formattedData.map((x) => (
                                <SelectItem key={x.label} value={x.value}>
                                    {x.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>


            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
                <div>
                    <label htmlFor='next_service_date' className='text-sm font-medium text-gray-900 mb-2'>Next service date</label>
                    <Input type="date" id='next_service_date' name='next_service_date' value={next_service_date}
                        onChange={(e) => setNextServiceDate(e.target.value)} className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm block w-full" />
                </div>
                <div>
                    <label htmlFor='next_service_kms' className='text-sm font-medium text-gray-900 mb-2'>Next service kms</label>
                    <Input type="text" id='next_service_kms' name='next_service_kms' value={next_service_kms}
                        onChange={(e) => setNextServiceKms(e.target.value)} className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm block w-full" />
                </div>
            </div>
            <div className="mb-2">
                <label htmlFor='license_disc_expiry' className='text-sm font-medium text-gray-900 mb-2'>License disc expiry</label>
                <Input type="date" id='next_service_kms' name='license_disc_expiry' value={license_disc_expiry}
                    onChange={(e) => setLicenseDiscExpiry(e.target.value)} className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm block w-full" />
            </div>
            <div className="space-y-1 mb-2">
                <Select value={reason_for_use} onValueChange={(e) => selectCarUseReason(e)}>
                    <SelectTrigger >
                        <SelectValue placeholder="Select a reason for use" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Reasons</SelectLabel>
                            {reasons.map((x) => (
                                <SelectItem key={x.label} value={x.value}>
                                    {x.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-1 mb-2">
                <Select value={driver} onValueChange={(e) => setDriver(e)}>
                    <SelectTrigger >
                        <SelectValue placeholder="Select a driver" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Drivers</SelectLabel>
                            {drivers.map((x) => (
                                <SelectItem key={x.label} value={x.value}>
                                    {x.value}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

        </FormWrapper>
    )
}

export default SectionOne