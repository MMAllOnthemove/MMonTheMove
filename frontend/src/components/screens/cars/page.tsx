"use client"
import { Button } from '@/components/ui/button'
import useAddAgent from '@/hooks/useAddBookingAgent'
import useDeleteBookingAgent from '@/hooks/useDeleteBookingAgent'
import useFetchAgent from '@/hooks/useFetchBookingAgents'
import useUserLoggedIn from '@/hooks/useGetUser'
import { datetimestamp } from '@/lib/date_formats'
import { TBookingAgentData } from '@/lib/types'
import {
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
const Tablehead = dynamic(() => import('./tablehead'))
const TableBody = dynamic(() => import('./tablebody'))
const LoadingScreen = dynamic(() => import('@/components/loading_screen/page'))
const NotLoggedInScreen = dynamic(() => import('@/components/not_logged_in/page'))
// const PageTitle = dynamic(() => import('@/components/PageTitle/page'))
import PageTitle from '@/components/PageTitle/page'
import useAddCar from '@/hooks/useAddCar'
import useCars from '@/hooks/useGetCars'
import columns from '@/lib/cars_columns'
const CarsModal = dynamic(() => import('./modal'))

const ManagementSearchForm = dynamic(() => import('@/components/search_field/page'))
const Sidebar = dynamic(() => import('@/components/sidebar/page'))

const Pagination = dynamic(() => import('@/components/table_pagination/page'))

const CarsScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { carsList, carsListLoading, refetch } = useCars()

    const { addCar, addCarLoading, errors } = useAddCar()
    const [plate_number, setPlateNumber] = useState("")
    const [car_model, setCarModel] = useState("")
    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");

    const [openAddModal, setOpenAddModal] = useState(false)

    // const { hhpTask } = useFetchHHPTaskById(modifyTaskModal?.id)





    const table = useReactTable({
        data: carsList,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    const addCars = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const created_at = datetimestamp;
        const payload = { plate_number, car_model, created_at };
        await addCar(payload);
        refetch()
        setPlateNumber('')
        setCarModel('')
        setOpenAddModal(false)
    }


    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn && user?.user_role === "admin" ? (
                    <>
                        <Sidebar />
                        <main className='container p-1'>
                            <PageTitle title="List" hasSpan={true} spanText={"Cars"} />
                            <section className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />
                                <Button type="button" onClick={() => setOpenAddModal(true)}> Add car</Button>
                            </section>
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <Tablehead table={table} />
                                    <TableBody table={table} />
                                </table>
                            </div>
                            <div className="h-2" />
                            <Pagination table={table} />
                            {/* modal for adding booking agent */}
                            <CarsModal openAddModal={openAddModal} setOpenAddModal={() => setOpenAddModal(false)} plate_number={plate_number} setPlateNumber={setPlateNumber} car_model={car_model} setCarModel={setCarModel} errors={errors} addCars={addCars} addCarsLoading={addCarLoading} />

                        </main>
                    </>
                ) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    )
}

export default CarsScreen
