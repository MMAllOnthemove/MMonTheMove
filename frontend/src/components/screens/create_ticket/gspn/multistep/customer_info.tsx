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
import FormWrapper from './wrapper';
import provinces from '@/lib/provinces';


type TCustomerInfo = {
    firstName: string;
    setFirstName: (value: string) => void
    lastName: string;
    setLastName: (value: string) => void
    homePhone: string;
    setHomePhone: (value: string) => void
    officePhone: string;
    setOfficePhone: (value: string) => void
    mobilePhone: string;
    setMobilePhone: (value: string) => void
    email: string;
    setEmail: (value: string) => void
    address: string;
    setAddress: (value: string) => void
    address_2: string;
    setAddress_2: (value: string) => void
    city: string;
    setCity: (value: string) => void
    state: string;
    setState: (value: string) => void
    zip: string;
    setZip: (value: string) => void
    country: string;
    setCountry: (value: string) => void

}

const CustomerInfoScreen = ({ firstName, setFirstName, lastName, setLastName, homePhone, setHomePhone, officePhone, setOfficePhone, mobilePhone, setMobilePhone, email, setEmail, address, setAddress, address_2, setAddress_2, city, setCity, state, setState, zip, setZip, country, setCountry }: TCustomerInfo) => {
    return (
        <FormWrapper title="Customer info">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <div>
                    <label htmlFor='firstname' className='text-sm font-medium text-gray-900 mb-2'>First Name</label>
                    <Input type="text" name='firstname' id='firstname' value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='lastname' className='text-sm font-medium text-gray-900 mb-2'>Last Name</label>
                    <Input type="text" id='lastname' name='lastname' value={lastName}
                        onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='email' className='text-sm font-medium text-gray-900 mb-2'>Email address</label>
                    <Input type="email" id='email' name='email' value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <div>
                    <label htmlFor='mobilePhone' className='text-sm font-medium text-gray-900 mb-2'>Mobile phone</label>
                    <Input type="text" id='mobilePhone' name='mobilePhone' value={mobilePhone}
                        onChange={(e) => setMobilePhone(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='officePhone' className='text-sm font-medium text-gray-900 mb-2'>Office phone</label>
                    <Input type="text" id='officePhone' name='officePhone' value={officePhone}
                        onChange={(e) => setOfficePhone(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='homePhone' className='text-sm font-medium text-gray-900 mb-2'>Home phone</label>
                    <Input type="text" id='homePhone' name='homePhone' value={homePhone}
                        onChange={(e) => setHomePhone(e.target.value)} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <div>
                    <label htmlFor='address' className='text-sm font-medium text-gray-900 mb-2'>Address line 1</label>
                    <Input type="text" id='address' name='address' value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='address_2' className='text-sm font-medium text-gray-900 mb-2'>Address line 2</label>
                    <Input type="text" id='address_2' name='address_2' value={address_2}
                        onChange={(e) => setAddress_2(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='city' className='text-sm font-medium text-gray-900 mb-2'>City</label>
                    <Input type="text" id='city' name='city' value={city}
                        onChange={(e) => setCity(e.target.value)} />
                </div>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <div>
                    <label htmlFor='state' className='text-sm font-medium text-gray-900'>Province</label>

                    <Select value={state}
                        name="state"
                        onValueChange={(e) =>
                            setState(e)
                        }>
                        <SelectTrigger>
                            <SelectValue placeholder="List of provinces" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Provinces</SelectLabel>
                                {
                                    provinces?.map((x) => (
                                        <SelectItem key={x.label} value={`${x.value}`}>{x?.label}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor='zip' className='text-sm font-medium text-gray-900 mb-2'>Zip/Postal code</label>
                    <Input type="text" id='zip' name='zip' value={zip}
                        onChange={(e) => setZip(e.target.value)} />
                </div>

                <div>
                    <label htmlFor='country' className='text-sm font-medium text-gray-900 mb-2'>Country</label>
                    <Input type="text" id='country' name='country' defaultValue={country} disabled
                        onChange={(e) => setCountry(e.target.value)} />
                </div>

            </div>
        </FormWrapper>

    )
}

export default CustomerInfoScreen