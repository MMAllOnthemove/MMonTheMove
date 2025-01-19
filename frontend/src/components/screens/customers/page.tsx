"use client"
import columns from '@/lib/customers';
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
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react';

import ManagementSearchForm from '@/components/search_field/page';
import useGetCustomers from '@/hooks/useGetCustomers';
import useUserLoggedIn from '@/hooks/useGetUser';
import { useRouter } from 'next/navigation';
import TableBody from './tablebody';
import TableHead from './tablehead';
import { TCustomers, TCustomersTanstackTable } from '@/lib/types';
import Modal from '@/components/modal/page';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useUpdateRepairshoprCustomer from '@/hooks/useUpdateRepairshoprCustomer';
import useUpdateCustomerLocally from '@/hooks/updateCustomer';
import findChanges from '@/lib/find_changes';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import provinces from '@/lib/provinces';

const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page')
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page')
)

const Sidebar = dynamic(() =>
    import('@/components/sidebar/page')
)
const Pagination = dynamic(() =>
    import('@/components/table_pagination/page')
)
const CustomersScreen = () => {
    const { customersList, customersListLoading, refetch } = useGetCustomers()
    const { updateCustomer, updateCustomerRepairshoprLoading } = useUpdateRepairshoprCustomer()
    const { updateCustomerLocally, updateCustomerLocallyLoading } = useUpdateCustomerLocally()
    const { user, isLoggedIn, loading } = useUserLoggedIn()

    const [modifyCustomerModal, setModifyCustomerModal] = useState<TCustomers | any>();
    const [modifyCustomerModalOpen, setModifyCustomerModalOpen] = useState(false);

    // customer fields state
    const [customerId, setCustomerId] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhoneNumber] = useState("")
    const [home_number, setHomePhone] = useState("")
    const [office_number, setOfficePhone] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const [business_name, setBusinessName] = useState("")
    const [address_2, setAddress_2] = useState("")

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
        data: customersList,
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

    // Calculate total customers
    const totalCustomers = useMemo(() => {
        return customersList.length;
    }, [customersList]);

    useEffect(() => {
        // store values from db but still allow user to update those same fields
        // this helps when comparing
        if (modifyCustomerModal) {
            setCustomerId(modifyCustomerModal?.repairshopr_customer_id)
            setFirstName(modifyCustomerModal?.first_name)
            setLastName(modifyCustomerModal?.last_name)
            setEmail(modifyCustomerModal?.email)
            setPhoneNumber(modifyCustomerModal?.phone_number)
            setHomePhone(modifyCustomerModal?.home_number)
            setOfficePhone(modifyCustomerModal?.office_number)
            setAddress(modifyCustomerModal?.address)
            setCity(modifyCustomerModal?.city)
            setState(modifyCustomerModal?.state)
            setZip(modifyCustomerModal?.zip)
            setBusinessName(modifyCustomerModal?.business_name)
            setAddress_2(modifyCustomerModal?.address_2)

        }

    }, [modifyCustomerModal])

    const handleModifyCustomer = (row: TCustomersTanstackTable) => {
        setModifyCustomerModal(row?.original);
        setModifyCustomerModalOpen(true)
    }

    const closeModal = () => {
        setModifyCustomerModal(null);
        setModifyCustomerModal(false);
    };

    const updateCustomerTwoWay = async () => {
        const RSpayload = {
            "firstname": first_name,
            "lastname": last_name,
            "businessname": business_name,
            "email": email,
            "phone": phone_number,
            "mobile": home_number,
            "address": address,
            "address_2": address_2,
            "city": city,
            "state": state,
            "zip": zip,
        }
        const id = modifyCustomerModal?.id

        const updatePayload = {
            // This goes to our in house db
            repairshopr_customer_id: customerId, first_name, last_name, email, phone_number, home_number, office_number, address, city, state, zip, business_name, address_2
        }
        const changes = findChanges(modifyCustomerModal, updatePayload)
        try {
            await updateCustomer(customerId, RSpayload);

            if (Object.keys(changes).length > 0) {
                await updateCustomerLocally(id, changes)
                closeModal()
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("error updating customer in customers screen", error)
            }
        }
    }
    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (<>

                    <Sidebar />
                    <main className='container p-1'>
                        <PageTitle title="Customers" hasSpan={false} />
                        <section className="flex justify-between items-center py-5">
                            <ManagementSearchForm
                                filtering={filtering}
                                setFiltering={(e) => setFiltering(e.target.value)}
                            />
                        </section>
                        {/* modal for editing customer */}
                        {
                            modifyCustomerModal &&
                            <Modal
                                isVisible={modifyCustomerModal}
                                onClose={closeModal}
                                title={`${modifyCustomerModal?.first_name} ${modifyCustomerModal?.last_name}`}
                                content={

                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-2">
                                            <div className='mb-1'>
                                                <Label htmlFor="firstname">First name</Label>
                                                <Input
                                                    value={first_name || ''}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    autoComplete='false'
                                                    type="text"
                                                />
                                            </div>
                                            <div className='mb-1'>
                                                <Label htmlFor="lastname">Last name</Label>
                                                <Input
                                                    value={last_name || ''}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    autoComplete='false'
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-2">
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
                                                <Label htmlFor="phone_number">Phone number</Label>
                                                <Input
                                                    type="text"
                                                    value={phone_number || ''}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    autoComplete='false'
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-2">

                                            <div className='mb-1'>
                                                <Label htmlFor="home_number">Home number</Label>
                                                <Input

                                                    value={home_number || ''}
                                                    onChange={(e) => setHomePhone(e.target.value)}
                                                    autoComplete='false'
                                                />
                                            </div>
                                            <div className='mb-1'>
                                                <Label htmlFor="office_number">Office number</Label>
                                                <Input
                                                    type="text"
                                                    value={office_number || ''}
                                                    onChange={(e) => setOfficePhone(e.target.value)}
                                                    autoComplete='false'
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-2">
                                            <div className='mb-1'>
                                                <Label htmlFor="address">Address</Label>
                                                <Input
                                                    type="text"
                                                    value={address || ''}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    autoComplete='false'
                                                />
                                            </div>
                                            <div className='mb-1'>
                                                <Label htmlFor="address_2">Address 2</Label>
                                                <Input
                                                    type="text"
                                                    value={address_2 || ''}
                                                    onChange={(e) => setAddress_2(e.target.value)}
                                                    autoComplete='false'
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-2">
                                            <div className='mb-1'>
                                                <Label htmlFor="city">City</Label>
                                                <Input
                                                    type="text"
                                                    value={city || ''}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    autoComplete='false'
                                                />
                                            </div>
                                            <div className='mb-1'>
                                                <Label htmlFor="state">Province/state</Label>
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
                                        </div>
                                        <Button className='mt-2' type="button" onClick={updateCustomerTwoWay} disabled={updateCustomerLocallyLoading}>{updateCustomerLocallyLoading ? 'Updating...' : 'Update details'}</Button>
                                    </div>
                                }
                            />
                        }
                        <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                            <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                <TableHead table={table} />
                                <TableBody table={table} handleModifyCustomer={handleModifyCustomer} totalCustomers={totalCustomers} />
                            </table>
                        </div>
                        <div className="h-2" />
                        <Pagination table={table} />
                    </main>

                </>) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    )
}

export default CustomersScreen