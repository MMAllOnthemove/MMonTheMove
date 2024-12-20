"use client"
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import useFetchDrivers from '@/hooks/useFetchDrivers';
import cars from '@/lib/cars';
import vehicle_use_reasons from '@/lib/reasons_for_vehicle_use';
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from 'react';
import FormWrapper from './wrapper';

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
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            {car
                                ? formattedData?.find((framework) => framework.value === car)?.label
                                : "Select car..."}
                            <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search car..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No car found.</CommandEmpty>
                                <CommandGroup>
                                    {formattedData?.map((framework) => (
                                        <CommandItem

                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                setCar(currentValue === car ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            {framework.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    car === framework.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
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

                <Popover open={reasonOpen} onOpenChange={setReasonOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={reasonOpen}
                            className="w-full justify-between"
                        >
                            {reason_for_use
                                ? reasons?.find((framework) => framework.value === reason_for_use)?.label
                                : "Select reason for use..."}
                            <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search reasons..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No reasons found.</CommandEmpty>
                                <CommandGroup>
                                    {reasons?.map((framework) => (
                                        <CommandItem

                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                selectCarUseReason(currentValue === reason_for_use ? "" : currentValue)
                                                setReasonOpen(false)
                                            }}
                                        >
                                            {framework.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    reason_for_use === framework.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="space-y-1 mb-2">

                <Popover open={driversOpen} onOpenChange={setDriversOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={driversOpen}
                            className="w-full justify-between"
                        >
                            {driver
                                ? drivers?.find((framework) => framework.value === driver)?.label
                                : "Select driver..."}
                            <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search drivers..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No driver found.</CommandEmpty>
                                <CommandGroup>
                                    {drivers?.map((framework) => (
                                        <CommandItem

                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                setDriver(currentValue === driver ? "" : currentValue)
                                                setDriversOpen(false)
                                            }}
                                        >
                                            {framework.value}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    driver === framework.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

        </FormWrapper>
    )
}

export default SectionOne