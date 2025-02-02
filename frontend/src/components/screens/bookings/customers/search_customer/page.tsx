"use client"
import { Button } from '@/components/ui/button';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useCreateCustomerLocally from '@/hooks/useCreateCustomerLocally';
import useUpdateRepairshoprCustomer from '@/hooks/useUpdateRepairshoprCustomer';
import { capitalizeText } from '@/lib/capitalize';
import { datetimestamp } from '@/lib/date_formats';
import { Customer } from '@/lib/types';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'nextjs-toploader/app';
import { useState } from 'react';
import AlertDialogPassword from '../modal/page';
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)

const SearchCustomerRepairshoprCustomerScreen = () => {
    const [searchCustomer, setSearchCustomer] = useState("");
    const [result, setResult] = useState<Customer[] | any>([]);
    const [customerId, setCustomerId] = useState("")
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [businessname, setBusinessname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumber2, setPhoneNumber2] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const { addCustomerLocally, createCustomerLocallyLoading } = useCreateCustomerLocally()
    const { updateCustomer, updateCustomerRepairshoprLoading } = useUpdateRepairshoprCustomer()
    // this is the modal for editing customer details
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null); // Customer being edited
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    // router.prefetch("/assembly_terms")
    const checkIfCustomerWasHere = async () => {
        const trimmedSearch = searchCustomer.trim(); // Remove leading and trailing spaces
        if (!trimmedSearch) return; // Do nothing if the input is empty after trimming
        setIsLoading(true)
        try {
            const { data } = await axios.get(
                `https://allelectronics.repairshopr.com/api/v1/customers?query=${searchCustomer}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    }
                }
            );

            if (data?.customers?.length > 0) {
                const searchLower = searchCustomer.toLowerCase();

                const exactMatchCustomer = data.customers.find((customer: any) => {
                    const firstNameExact = customer.firstname?.toLowerCase() === searchLower;
                    const lastNameExact = customer.lastname?.toLowerCase() === searchLower;
                    const emailExact = customer.email?.toLowerCase() === searchLower;
                    const mobileExact = customer.mobile?.toLowerCase() === searchLower;
                    const phoneExact = customer.phone?.toLowerCase() === searchLower;
                    const fullNameExact =
                        `${customer.firstname} ${customer.lastname}`.toLowerCase() === searchLower;

                    return firstNameExact || lastNameExact || emailExact || fullNameExact || mobileExact || phoneExact;
                });

                if (exactMatchCustomer) {
                    setResult([exactMatchCustomer]); // Display only the exact match
                    setSearchCustomer(trimmedSearch);
                    setCustomerId(exactMatchCustomer.id);
                    setFirstname(exactMatchCustomer.firstname);
                    setLastname(exactMatchCustomer.lastname);
                    setBusinessname(exactMatchCustomer.business_name);
                    setEmail(exactMatchCustomer.email);
                    setPhoneNumber(exactMatchCustomer.mobile);
                    setPhoneNumber2(exactMatchCustomer.phone);
                    setAddress(exactMatchCustomer.address);
                    setAddress2(exactMatchCustomer.address_2);
                    setCity(exactMatchCustomer.city);
                    setState(exactMatchCustomer.state);
                    setZip(exactMatchCustomer.zip);
                } else {
                    setResult([]); // No exact match found
                }
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') console.error("Error fetching customer data:", error);
        } finally {
            setIsLoading(false)
        }
    };


    const addExistingCustomer = async () => {
        const visit_date = datetimestamp
        const custInfo = {
            repairshopr_customer_id: customerId,
            email: email,
            firstname: capitalizeText(firstname),
            lastname: capitalizeText(lastname),
            businessname: businessname,
            phone: phoneNumber,
            mobile: phoneNumber2,
            address: address,
            address2: address2,
            city: city,
            state: state,
            zip: zip,
            visit_date: visit_date
        };
        await addCustomerLocally(custInfo)
        // send the customer name in the url params
        // this will then be stored in the customer name, in the next screen
        const fullname = `${capitalizeText(firstname)} ${capitalizeText(lastname)}`
        // router.push(`/assembly_terms/${encodeURIComponent(fullname)}`)
        setOpenDialog(true)
    }
    const updateCustomerDetailsOnRepairshopr = async () => {
        const payload = {
            "firstname": firstname,
            "lastname": lastname,
            "businessname": businessname,
            "email": email,
            "phone": phoneNumber,
            "mobile": phoneNumber2,
            "address": address,
            "address_2": address2,
            "city": city,
            "state": state,
            "zip": zip,
        }
        const data = await updateCustomer(customerId, payload)
        if (data) {
            setEditModalOpen(false);
            // to prevent having to search again, set the resulting details to the customer details (email or fullname)
            if (data?.email !== "" || data?.email !== null) {
                setSearchCustomer(data?.email); checkIfCustomerWasHere()
            }

            else setSearchCustomer(data?.fullname);
        }

    }
    const openEditModal = (customer: any) => {
        setSelectedCustomer(customer);
        setEditModalOpen(true);
    };

    const closeModal = () => {
        setEditModalOpen(false);
        setSelectedCustomer(null);
    };

    return (
        <main className="flex justify-center items-center h-screen bg-orange-100">
            {
                editModalOpen &&
                <Dialog open={editModalOpen} onOpenChange={closeModal} >
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit customer</DialogTitle>
                            <DialogDescription>
                                Verify with the customer that these are their details
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <div className="flex gap-2 items-center justify-between">
                                <div className='mb-1'>
                                    <Label htmlFor="firstname">First name</Label>
                                    <Input
                                        value={firstname || ''}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        autoComplete='false'
                                        type="text"
                                    />
                                </div>
                                <div className='mb-1'>
                                    <Label htmlFor="lastname">Last name</Label>
                                    <Input
                                        value={lastname || ''}
                                        onChange={(e) => setLastname(e.target.value)}
                                        autoComplete='false'
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className='mb-1'>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    value={email || ''}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete='false'
                                />
                            </div>
                            <div className="flex gap-2 items-center justify-between">
                                <div className='mb-1'>
                                    <Label htmlFor="phoneNumber">Phone number</Label>
                                    <Input
                                        type="phoneNumber"
                                        value={phoneNumber || ''}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        autoComplete='false'
                                    />
                                </div>
                                <div className='mb-1'>
                                    <Label htmlFor="phoneNumber2">Phone number 2</Label>
                                    <Input
                                        type="phoneNumber2"
                                        value={phoneNumber2 || ''}
                                        onChange={(e) => setPhoneNumber2(e.target.value)}
                                        autoComplete='false'
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 items-center justify-between">
                                <div className='mb-1'>
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        type="address"
                                        value={address || ''}
                                        onChange={(e) => setAddress(e.target.value)}
                                        autoComplete='false'
                                    />
                                </div>
                                <div className='mb-1'>
                                    <Label htmlFor="address2">Address 2</Label>
                                    <Input
                                        type="address2"
                                        value={address2 || ''}
                                        onChange={(e) => setAddress2(e.target.value)}
                                        autoComplete='false'
                                    />
                                </div>
                            </div>
                            <Button className='mt-2' type="button" onClick={updateCustomerDetailsOnRepairshopr} disabled={updateCustomerRepairshoprLoading}>{updateCustomerRepairshoprLoading ? 'Updating...' : 'Update details'}</Button>
                        </div>

                    </DialogContent>
                </Dialog>
            }
            {
                openDialog &&
                <AlertDialogPassword openModal={openDialog} setOpenModal={setOpenDialog} firstName={firstname} lastName={lastname} />
            }
            <Card className="max-w-md mx-auto p-1">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-bold">
                        Welcome back
                    </CardTitle>
                    <CardDescription className='text-center'>
                        Search using firstname, lastname, fullname, or email
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search Input */}
                    <div className="space-y-2">
                        <Input
                            type="text"
                            placeholder="Enter your name or phone number"
                            value={searchCustomer}
                            onChange={(e) => setSearchCustomer(e.target.value)}
                            className="w-full"
                        />
                        <Button
                            onClick={checkIfCustomerWasHere}
                            className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                            disabled={isLoading || !searchCustomer.trim()} // Disable if input is empty after trimming
                        >
                            {isLoading ? "Searching..." : "Search"}
                        </Button>
                    </div>

                    {/* Result Section */}
                    <div className="mt-6">
                        {result.length > 0 ? (
                            result.map((customer: any) => (
                                <Card
                                    key={customer.id}
                                    className="bg-white shadow-md rounded-md"
                                >
                                    <CardHeader>
                                        <CardTitle className="text-lg font-bold">
                                            {customer.firstname} {customer.lastname}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>
                                            <strong>Email:</strong> {customer.email}
                                        </p>
                                        <p>
                                            <strong>Mobile:</strong> {customer.mobile}
                                        </p>
                                        <p>
                                            <strong>Phone:</strong> {customer.phone}
                                        </p>
                                        <p>
                                            <strong>Address:</strong> {customer.address} {customer.address_2} {customer.city} {customer.state} {customer.zip}
                                        </p>

                                        <div className='flex flex-col lg:flex-row justify-between gap-4 mt-3'>
                                            <Button
                                                onClick={openEditModal}
                                                className=''
                                            >
                                                Edit details
                                            </Button>
                                            <Button
                                                onClick={addExistingCustomer}
                                                className='bg-blue-500 hover:bg-blue-600'
                                                disabled={createCustomerLocallyLoading}
                                            > {
                                                    createCustomerLocallyLoading ? 'Adding...' : 'Continue'
                                                }

                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center">
                                No matching customer found. Please try again.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

        </main>
    )
}

export default SearchCustomerRepairshoprCustomerScreen