"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAddClaims from '@/hooks/useAddClaims'
import useUserLoggedIn from '@/hooks/useGetUser'
import useIpaasGetSOInfoAll from '@/hooks/useIpaasGetSoInfoAll'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page'), { ssr: false }
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page'), { ssr: false }
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page'), { ssr: false }
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)

import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { datetimestamp } from '@/lib/date_formats'
import departments from '@/lib/departments'
import { getSOInfoAllLogInfoSection } from '@/lib/types'

const ClaimsScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const [searchServiceOrder, setSearchServiceOrder] = useState("")
    const { addAddClaim, addClaimLoading, errors } = useAddClaims()
    const { getSOInfoAllTookan, loadingData } = useIpaasGetSOInfoAll();
    const [claim_status, setClaimStatus] = useState("")
    const [ticket_number, setTicketNumber] = useState("")
    const [service_order_no, setServiceOrder] = useState("")
    const [department, setDepartment] = useState("")


    const handleGetSOInfo = async (serviceOrder: string | number) => {
        if (!serviceOrder) return;
        try {
            const data = await getSOInfoAllTookan(serviceOrder);
            const statusDescs = data?.EtLogInfo?.results?.map(
                (result: getSOInfoAllLogInfoSection) => result?.StatusDesc
            );

            if (statusDescs && statusDescs.length > 0) {
                setClaimStatus(statusDescs[statusDescs.length - 1]);
            }
            setServiceOrder(data?.Return?.EsHeaderInfo?.SvcOrderNo);
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(error);
            }
        }
    };

    // handleGetSOInfo(searchServiceOrder);



    const addTask = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const created_by = user?.email;
        const created_at = datetimestamp;
        const payload = { claim_status, ticket_number, service_order_no, department, created_by, created_at };
        await addAddClaim(payload);
        setSearchServiceOrder('')
        setClaimStatus('')
        setTicketNumber('')
        setServiceOrder('')
        setDepartment('')
    }
    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='container p-1'>
                            <PageTitle title="claims" hasSpan={true} spanText={"Add"} />

                            <section >
                                <div className="flex gap-3 items-center mb-3">

                                    <span className="flex gap-3 items-center justify-between flex-col lg:flex-row">
                                        <Label
                                            htmlFor='searchTicket'
                                            className='sr-only'
                                        >
                                            Search ticket
                                        </Label>
                                        <Input
                                            placeholder='Search ticket'
                                            type="number"
                                            id="searchTicket"
                                            name="searchTicket"
                                            value={searchServiceOrder}
                                            onChange={(e) => setSearchServiceOrder(e.target.value)}
                                        />

                                    </span>
                                    <Button type="button" disabled={loadingData} onClick={() => handleGetSOInfo(searchServiceOrder)}>{loadingData ? 'Searching...' : 'Search'}</Button>
                                </div>
                            </section>
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg mb-4">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] uppercase font-semibold">
                                        <tr className=" font-semibold">
                                            <th className="px-4 py-3 cursor-pointer font-semibold">
                                                Service order
                                            </th>
                                            <th className="px-4 py-3 cursor-pointer font-semibold">
                                                Ticket
                                            </th>
                                            <th className="px-4 py-3 cursor-pointer font-semibold">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 cursor-pointer font-semibold">
                                                Department
                                            </th>
                                            <th className="px-4 py-3 cursor-pointer font-semibold">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="z-0">
                                        <tr className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]">
                                            <td className="px-4 py-3 font-medium text-sm max-w-full">
                                                <span>
                                                    {service_order_no}
                                                    {errors.service_order_no && <p className="text-sm text-red-500 font-medium">{errors.service_order_no}</p>}

                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-sm">
                                                <span>
                                                    <span>
                                                        <Label
                                                            htmlFor='searchTicket'
                                                            className='sr-only'
                                                        >
                                                            Ticket number
                                                        </Label>
                                                        <Input
                                                            placeholder='Type ticket number'
                                                            type="number"
                                                            id="ticket_number"
                                                            name="ticket_number"
                                                            value={ticket_number}
                                                            className='w-full'
                                                            onChange={(e) => setTicketNumber(e.target.value)}
                                                        />
                                                        {errors.ticket_number && <p className="text-sm text-red-500 font-medium">{errors.ticket_number}</p>}

                                                    </span>

                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-sm max-w-full">
                                                <span>
                                                    {claim_status}
                                                    {errors.claim_status && <p className="text-sm text-red-500 font-medium">{errors.claim_status}</p>}

                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-sm max-w-full">
                                                <span>

                                                    <Select name="department" value={department} onValueChange={(e) => setDepartment(e)}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select department" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {departments.map((dep) => (
                                                                <SelectItem key={dep.id} value={`${dep.dep}`}>{`${dep.dep}`}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.department && <p className="text-sm text-red-500 font-medium">{errors.department}</p>}

                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-sm max-w-full">
                                                <Button
                                                    type="button"
                                                    role="button"
                                                    onClick={addTask}

                                                    disabled={addClaimLoading}> {addClaimLoading ? 'Adding...' : 'Add claim'}
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </main>
                    </>
                ) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    )
}

export default ClaimsScreen
