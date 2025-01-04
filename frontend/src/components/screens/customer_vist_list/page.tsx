"use client"
import useGetCustomerVisits from '@/hooks/useGetCustomerVisits';
import columns from '@/lib/customer_visit_table';
import { datetimestamp } from '@/lib/date_formats';
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
import moment from 'moment';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react';

import ManagementSearchForm from '@/components/search_field/page';
import useUserLoggedIn from '@/hooks/useGetUser';
import { useRouter } from 'next/navigation';
import TableBody from './tablebody';
import TableHead from './tablehead';
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
const CustomerVistListScreen = () => {
    const today = moment(datetimestamp).format('YYYY-MM-DD');
    const { customerVisitList, customerVisitListLoading, refetch } = useGetCustomerVisits(today)



    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const router = useRouter()
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
    const handleCreateTicket = async (row: any) => {
        const originalData = row?.original;
        // to be able to grab customer id from rs on this page
        router.push(`/repairshopr_asset/${encodeURIComponent(originalData?.email)}`)
    }
    const handleCreateSO = async (row: any) => {
        const originalData = row?.original;
        // for gspn, user can type
        router.push(`/create_ticket/gspn/${encodeURIComponent(originalData?.email)}`)
    }
    const table = useReactTable({
        data: customerVisitList,
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

    // Calculate total jobs count
    const totalJobsCount = useMemo(() => {
        return customerVisitList.length;
    }, [customerVisitList]);


    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (<>

                    <Sidebar />
                    <main className='container p-1'>
                        <PageTitle title="list" hasSpan={true} spanText={"Customer"} />
                        <section className="flex justify-between items-center py-5">
                            <ManagementSearchForm
                                filtering={filtering}
                                setFiltering={(e) => setFiltering(e.target.value)}
                            />
                        </section>

                        <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                            <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                <TableHead table={table} />
                                <TableBody table={table} handleCreateTicket={handleCreateTicket} handleCreateSO={handleCreateSO} totalJobs={totalJobsCount} />
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

export default CustomerVistListScreen