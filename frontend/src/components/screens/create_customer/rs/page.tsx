"use client"
import PageTitle from '@/components/PageTitle/page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import useCreateCustomerOnRepairshopr from '@/hooks/useCreateCustomer'
import useCreateCustomerLocally from '@/hooks/useCreateCustomerLocally'
import { datetimestamp } from '@/lib/date_formats'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import provinces from '@/lib/provinces'
type PhoneDetail = {
    type: string;
    number: string;
};

const CreateCustomerRepairshoprScreen = () => {
    const router = useRouter()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [businessname, setBusinessName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [address_2, setAddress_2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const [phoneDetails, setPhoneDetails] = useState([{ type: "mobile", number: "" }]);

    const { addCustomer, createCustomerLoading } = useCreateCustomerOnRepairshopr()
    const { addCustomerLocally } = useCreateCustomerLocally()
    const handlePhoneChange = (
        index: number,
        field: keyof PhoneDetail, // Ensures field can only be "type" or "number"
        value: string
    ) => {
        const updatedPhoneDetails = [...phoneDetails];
        updatedPhoneDetails[index][field] = value; // TypeScript now recognizes this
        setPhoneDetails(updatedPhoneDetails);
    };
    const addPhoneRow = () => {
        setPhoneDetails((prev) => [...prev, { type: "mobile", number: "" }]);
    };

    const removePhoneRow = (index: string | number | any) => {
        setPhoneDetails((prev) => prev.filter((_, i) => i !== index));
    };

    const createCustomer = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const visit_date = datetimestamp
        const created_at = datetimestamp
        const payload = {
            "firstname": firstName,
            "lastname": lastName,
            "businessname": businessname,
            "email": email,
            "phone": phoneDetails
                .filter((phone) => phone.type === "phone")
                .map((phone) => phone.number)
                .join(", "),
            "mobile": phoneDetails
                .filter((phone) => phone.type === "mobile")
                .map((phone) => phone.number)
                .join(", "),
            "address": address,
            "address_2": address_2,
            "city": city,
            "state": state,
            "zip": zip,
        }
        const data = await addCustomer(payload);
        const spreadPayload = {
            ...payload,
            "repairshopr_customer_id": data,
            created_at: created_at,
            visit_date: visit_date

        }
        await addCustomerLocally(spreadPayload)
    }
    return (

        <>

            <PageTitle title="customer" hasSpan={true} spanText={"Create"} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                    <div>
                        <label htmlFor='firstname' className='text-sm font-medium text-gray-900 mb-2'>First Name</label>
                        <Input type="text" name='firstname' id='firstname' value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm block w-full" />
                    </div>
                    <div>
                        <label htmlFor='lastname' className='text-sm font-medium text-gray-900 mb-2'>Last Name</label>
                        <Input type="text" id='lastname' name='lastname' value={lastName}
                            onChange={(e) => setLastName(e.target.value)} className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm block w-full" />
                    </div>
                    <div>
                        <label htmlFor='business_name' className='text-sm font-medium text-gray-900 mb-2'>Business Name <small>(only if you have. Leave blank otherwise)</small></label>
                        <Input type="text" id='business_name' name='business_name' value={businessname}
                            onChange={(e) => setBusinessName(e.target.value)} className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm block w-full" />
                    </div>

                    <div>
                        <label htmlFor='email' className='text-sm font-medium text-gray-900 mb-2'>Email address</label>
                        <Input type="email" id='email' name='email' value={email}
                            onChange={(e) => setEmail(e.target.value)} className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm block w-full" />
                    </div>

                    <label htmlFor='customer_phone' className='text-sm font-medium text-gray-900 mt-2'>Phone number</label>
                    {phoneDetails.map((phone, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <Select
                                name="customer_phone"
                                value={phone.type}
                                onValueChange={(e) =>
                                    handlePhoneChange(index, "type", e)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Phone number" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mobile">Mobile</SelectItem>
                                    <SelectItem value="office">Office</SelectItem>
                                    <SelectItem value="home">Home</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                type="number"
                                placeholder="Phone Number"
                                value={phone.number}
                                onChange={(e) =>
                                    handlePhoneChange(index, "number", e.target.value)
                                }
                            />
                            <Button variant="destructive" onClick={() => removePhoneRow(index)}>
                                Delete
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" className='ml-auto mt-2' onClick={addPhoneRow}>
                        Add Phone
                    </Button>
                </div>
                <div>
                    <div>
                        <label htmlFor='address' className='text-sm font-medium text-gray-900 mb-2'>Address line 1</label>
                        <Input type="text" id='address' name='address' value={address}
                            onChange={(e) => setAddress(e.target.value)} className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm block w-full" />
                    </div>
                    <div>
                        <label htmlFor='address_2' className='text-sm font-medium text-gray-900 mb-2'>Address line 2</label>
                        <Input type="text" id='address_2' name='address_2' value={address_2}
                            onChange={(e) => setAddress_2(e.target.value)} className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm block w-full" />
                    </div>
                    <div>
                        <label htmlFor='city' className='text-sm font-medium text-gray-900 mb-2'>City</label>
                        <Input type="text" id='city' name='city' value={city}
                            onChange={(e) => setCity(e.target.value)} className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm block w-full" />
                    </div>
                    <div>
                        <label htmlFor='state' className='text-sm font-medium text-gray-900'>Province</label>

                        <Select defaultValue={state || ""}
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
                                            <SelectItem key={x.label} value={`${x.label}`}>{x?.label}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor='zip' className='text-sm font-medium text-gray-900 mb-2'>Zip/Postal code</label>
                        <Input type="text" id='zip' name='zip' value={zip}
                            onChange={(e) => setZip(e.target.value)} className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm block w-full" />
                    </div>
                </div>
            </div>
            <Button type='button' disabled={createCustomerLoading} className="mt-3" onClick={createCustomer}>
                {createCustomerLoading ? 'Creating...' : 'Create customer'}
            </Button>
        </>
    )
}

export default CreateCustomerRepairshoprScreen