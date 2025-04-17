"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import useCreateCustomerOnRepairshopr from '@/hooks/useCreateCustomer'
import { datetimestamp } from '@/lib/date_formats'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page'), { ssr: false }
)

import { Label } from '@/components/ui/label'
import useCustomerLocally from '@/hooks/useCustomerLocally'
import { capitalizeText } from '@/lib/capitalize'
import provinces from '@/lib/provinces'
import AlertDialogPassword from '../../modal/page'
type PhoneDetail = {
    type: string;
    number: string;
};

const CreateCustomerRepairshoprScreen = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [businessname, setBusinessName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [address_2, setAddress_2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [zip, setZip] = useState("")
    const [phoneDetails, setPhoneDetails] = useState([{ type: "mobile", number: "" }]);

    const { addCustomer, createCustomerLoading } = useCreateCustomerOnRepairshopr()
    const { addCustomerLocally } = useCustomerLocally()
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
            "firstname": capitalizeText(firstName),
            "lastname": capitalizeText(lastName),
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
        // send the customer name in the url params
        // this will then be stored in the customer name, in the next screen
        // const fullname = `${capitalizeText(firstName)} ${capitalizeText(lastName)}`
        // router.push(`/assembly_terms/${encodeURIComponent(fullname)}`)
        setOpenDialog(true)

    }
    return (

        <div className='container mx-auto p-1'>
            {
                openDialog &&
                <AlertDialogPassword openModal={openDialog} setOpenModal={setOpenDialog} firstName={firstName} lastName={lastName} />
            }

            <PageTitle title="customer" hasSpan={true} spanText={"Create"} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                    <div>
                        <Label htmlFor='firstname'>First Name</Label>
                        <Input type="text" name='firstname' id='firstname' value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='lastname'>Last Name</Label>
                        <Input type="text" id='lastname' name='lastname' value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='business_name'>Business Name <small>(only if you have. Leave blank otherwise)</small></Label>
                        <Input type="text" id='business_name' name='business_name' value={businessname}
                            onChange={(e) => setBusinessName(e.target.value)} />
                    </div>

                    <div>
                        <Label htmlFor='email'>Email address</Label>
                        <Input type="email" id='email' name='email' value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <Label htmlFor='customer_phone'>Phone number</Label>
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
                                    <SelectItem value="phone">Phone</SelectItem>
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
                        <Label htmlFor='address'>Address line 1</Label>
                        <Input type="text" id='address' name='address' value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='address_2'>Address line 2</Label>
                        <Input type="text" id='address_2' name='address_2' value={address_2}
                            onChange={(e) => setAddress_2(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='city' >City</Label>
                        <Input type="text" id='city' name='city' value={city}
                            onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='state'>Province</Label>

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
                        <Label htmlFor='zip' >Zip/Postal code</Label>
                        <Input type="text" id='zip' name='zip' value={zip}
                            onChange={(e) => setZip(e.target.value)} />
                    </div>
                </div>
            </div>
            <Button type='button' disabled={createCustomerLoading} className="mt-3" onClick={createCustomer}>
                {createCustomerLoading ? 'Creating...' : 'Create customer'}
            </Button>
        </div>
    )
}

export default CreateCustomerRepairshoprScreen