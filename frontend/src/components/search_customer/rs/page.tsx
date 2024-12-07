"use client"
import PageTitle from '@/components/PageTitle/page';
import ManagementSearchForm from '@/components/search_field/page';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import columns from '@/lib/create_rs_customer_table';
import { Customer, CustomerResultRowClick } from '@/lib/types';
import {
    ColumnOrderState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TableBody from './tablebody';
import TableHead from './tablehead';





const SearchCustomerRepairshoprScreen = () => {
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

    const [addCustomerLoading, setAddCustomerLoading] = useState(false)

    // this is the modal for editing customer details
    const [editModalOpen, setEditModalOpen] = useState<CustomerResultRowClick | any>();

    const router = useRouter()

    useEffect(() => {
        const checkIfCustomerWasHere = async () => {
            try {
                const { data } = await axios.get(`https://allelectronics.repairshopr.com/api/v1/customers?query=${searchCustomer}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`
                    },
                })
                if (data?.customers?.length > 0) {
                    const filteredCustomers = data.customers.filter((customer: any) => {
                        const searchLower = searchCustomer.toLowerCase();
                        const firstNameMatch = customer.firstname?.toLowerCase().includes(searchLower);
                        const lastNameMatch = customer.lastname?.toLowerCase().includes(searchLower);
                        const emailMatch = customer.email?.toLowerCase().includes(searchLower);
                        const fullNameMatch = `${customer.firstname} ${customer.lastname}`.toLowerCase().includes(searchLower);

                        return firstNameMatch || lastNameMatch || emailMatch || fullNameMatch;
                    });
                    if (filteredCustomers.length > 0) {
                        const customer = filteredCustomers[0]; // Pick the first match
                        setResult(filteredCustomers);
                        setCustomerId(customer.id);
                        setFirstname(customer.firstname);
                        setLastname(customer.lastname);
                        setBusinessname(customer.business_name);
                        setEmail(customer.email);
                        setPhoneNumber(customer.mobile);
                        setPhoneNumber2(customer.phone);
                        setAddress(customer.address);
                        setAddress2(customer.address_2);
                        setCity(customer.city);
                        setState(customer.state);
                        setZip(customer.zip);
                    }
                }
            } catch (error) {
                // console.log("search repair customer error", error)
            }

        }
        const delayDebounce = setTimeout(() => {
            if (searchCustomer) {
                checkIfCustomerWasHere();
            }
        }, 300); // Debounce delay

        return () => clearTimeout(delayDebounce);
    }, [searchCustomer])

    const addExistingCustomer = async () => {
        const custInfo = {
            customerId: customerId,
            email: email,
            firstname: firstname,
            lastname: lastname,
            businessname: businessname,
            phoneNumber: phoneNumber,
            phoneNumber2: phoneNumber2,
            address: address,
            address2: address2,
            city: city,
            state: state,
            zip: zip
        };
        setAddCustomerLoading(true)
        // Convert the custInfo object to a JSON string
        try {
            const custInfoString = JSON.stringify(custInfo);
            if (typeof window !== "undefined" && window.localStorage) {
                window.localStorage.setItem("custInfo", custInfoString);
                router.push("/repairshopr_asset")
            }
        } catch (error) {
            console.log("failed to add customer to local storage", error)
        } finally {
            setAddCustomerLoading(false)

        }
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
        try {

            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_REPAIRSHOPR_CREATE_CUSTOMER}/${customerId}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`
                },
            })
            if (data?.customer) {
                setEditModalOpen(false);
                // to prevent having to search again, set the resulting details to the customer details (email or fullname)
                if (data?.customer?.email !== "" || data?.customer?.email !== null)
                    setSearchCustomer(data?.customer?.email);
                else setSearchCustomer(data?.customer?.fullname);

            }
        } catch (error) {
            console.log("update customer rs error", error)
        }
    }

    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");


    // Table column visibility 
    const [columnVisibility, setColumnVisibility] = useState({})

    // Table column order
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const table = useReactTable({
        data: result,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            pagination,
            columnVisibility,
            columnOrder,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
    });

    // clicking a row to open that row's modal
    const handleRowClick = async (row: CustomerResultRowClick) => {
        setEditModalOpen(row?.original);
    };

    return (
        <>
            <PageTitle title="customer" hasSpan={true} spanText={"Search"} />
            <section className="flex justify-between items-center py-5">
                <ManagementSearchForm
                    filtering={searchCustomer}
                    setFiltering={(e) => setSearchCustomer(e.target.value)}
                />

                <Button type="button" onClick={addExistingCustomer} disabled={addCustomerLoading}> {addCustomerLoading ? 'Adding...' : 'Add customer'}</Button>

            </section>
            {/* modal for sorting table columns */}
            {
                editModalOpen &&
                <Dialog open={editModalOpen} onOpenChange={() => setEditModalOpen(false)} >
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit customer { }</DialogTitle>
                            <DialogDescription>
                                Verify with the customer that these are their details
                            </DialogDescription>
                        </DialogHeader>
                        <div>
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
                            <div className='mb-1'>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    value={email || ''}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete='false'
                                />
                            </div>
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
                            <Button type="button" onClick={updateCustomerDetailsOnRepairshopr}>Update details</Button>
                        </div>

                    </DialogContent>
                </Dialog>
            }


            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                    <TableHead table={table} />
                    {!result ? null : <TableBody table={table} handleRowClick={handleRowClick} />}
                </table>
            </div>
        </>
    )
}

export default SearchCustomerRepairshoprScreen