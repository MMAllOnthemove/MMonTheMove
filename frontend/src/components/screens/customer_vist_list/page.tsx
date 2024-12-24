"use client"
import React, { useMemo, useState } from 'react'
import {
    ColumnOrderState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table"
import columns from '@/lib/customer_visit_table';
import useGetCustomerVisits from '@/hooks/useGetCustomerVisits';
import { datetimestamp } from '@/lib/date_formats';
import moment from 'moment';
import useUserLoggedIn from '@/hooks/useGetUser';
import LoadingScreen from '@/components/loading_screen/page';
import NotLoggedInScreen from '@/components/not_logged_in/page';
import Sidebar from '@/components/sidebar/page';
import PageTitle from '@/components/PageTitle/page';
import TableHead from './tablehead';
import TableBody from './tablebody';
import { useRouter } from 'next/navigation';
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
                        <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                            <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                <TableHead table={table} />
                                <TableBody table={table} handleCreateTicket={handleCreateTicket} handleCreateSO={handleCreateSO} totalJobs={totalJobsCount} />
                            </table>
                        </div>
                    </main>

                </>) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    )
}

export default CustomerVistListScreen