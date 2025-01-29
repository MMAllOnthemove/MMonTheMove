"use client"

import dynamic from 'next/dynamic'
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page'), { ssr: false }
)
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page'), { ssr: false }
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page'), { ssr: false }
)
import useUserLoggedIn from '@/hooks/useGetUser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import useCreateCustomerOnRepairshopr from '@/hooks/useCreateCustomer'
import useCreateCustomerLocally from '@/hooks/useCreateCustomerLocally'
import { datetimestamp } from '@/lib/date_formats'
import { useRouter } from 'nextjs-toploader/app'
import React, { useState } from 'react'
import Sidebar from '@/components/sidebar/page'
import { Label } from '@/components/ui/label'
import { capitalizeText } from '@/lib/capitalize'
import provinces from '@/lib/provinces'
type PhoneDetail = {
    type: string;
    number: string;
};

const CreateCustomerStaffScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
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
        const fullname = `${capitalizeText(firstName)} ${capitalizeText(lastName)}`
        router.push(`/bookings/staff/customers_today`)

    }
    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='container mx-auto p-1'>

                            <PageTitle title="customer" hasSpan={true} spanText={"Create"} />
                            <p className="text-sm text-center text-gray-500 font-medium">This will create customer on rs and locally</p>
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
                        </main>
                    </>
                ) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    )
}

export default CreateCustomerStaffScreen