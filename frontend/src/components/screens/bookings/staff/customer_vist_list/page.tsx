"use client"
import useGetCustomerVisits from '@/hooks/useGetCustomerVisits';
import useUserLoggedIn from '@/hooks/useGetUser';
import columns from '@/lib/customer_visit_table';
import { datetimestamp } from '@/lib/date_formats';
import { TechniciansTableData } from '@/lib/types';
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
import { useRouter } from 'nextjs-toploader/app';
import React, { useMemo, useState } from 'react';
const Modal = dynamic(() =>
    import('@/components/modal/page'), { ssr: false }
)

const ManagementSearchForm = dynamic(() =>
    import('@/components/search_field/page'), { ssr: false }
)
const TableBody = dynamic(() =>
    import('./tablebody'), { ssr: false }
)
const TableHead = dynamic(() =>
    import('./tablehead'), { ssr: false }
)
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
const Pagination = dynamic(() =>
    import('@/components/table_pagination/page'), { ssr: false }
)
const CustomerVistListScreen = () => {
    const today = moment(datetimestamp).format('YYYY-MM-DD');
    const { customerVisitList } = useGetCustomerVisits(today)


    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const router = useRouter()
    // router.prefetch("/repairshopr_asset/")
    // router.prefetch("/create_ticket/gspn/")
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
    const [showCustomerTicketListModal, setShowCustomerTicketListModal] = useState<TechniciansTableData | any>();
    const [openModal, setOpenModal] = useState(false);
    const handleCreateTicket = async (row: any) => {
        const originalData = row?.original;
        router.push(`/bookings/staff/repairshopr_asset/${encodeURIComponent(originalData?.email)}`)

    }
    const handleCreateSO = async (row: any) => {
        const originalData = row?.original;
        // for gspn, user can type
        router.push(`/bookings/staff/create_ticket/gspn/${encodeURIComponent(originalData?.email)}`)

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


    const handleRowSelect = (row: TechniciansTableData) => {
        setShowCustomerTicketListModal(row?.original);
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
        setShowCustomerTicketListModal(null);
    };
    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (<>

                    <Sidebar />
                    <main className='container p-1'>
                        <PageTitle title="customers" hasSpan={true} spanText={"Today's"} />
                        <section className="flex justify-between items-center py-5">
                            <ManagementSearchForm
                                filtering={filtering}
                                setFiltering={(e) => setFiltering(e.target.value)}
                            />
                        </section>

                        {
                            showCustomerTicketListModal &&
                            <Modal
                                isVisible={openModal}
                                onClose={closeModal}
                                title={showCustomerTicketListModal?.customer_name}
                                content={
                                    <div className="h-[100px] overflow-auto">
                                        {
                                            showCustomerTicketListModal && showCustomerTicketListModal.ticket_numbers &&
                                            showCustomerTicketListModal.ticket_numbers.map((x: any, index: any) => (
                                                <ol key={index}>
                                                    <li>{x}</li>
                                                </ol>
                                            ))
                                        }
                                    </div>

                                }
                            />
                        }
                        <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                            <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                <TableHead table={table} />
                                <TableBody table={table} handleRowSelect={handleRowSelect} handleCreateTicket={handleCreateTicket} handleCreateSO={handleCreateSO} totalJobs={totalJobsCount} />
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