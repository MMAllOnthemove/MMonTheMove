"use client"
import { Button } from '@/components/ui/button'
import useAddFuelConsumption from '@/hooks/useAddFuelConsumption'
import useGetFuelConsumption from '@/hooks/useGetFuelConsumption'
import useGetSingleFuelConsumption from '@/hooks/useGetSingleFuelConsumption'
import useUserLoggedIn from '@/hooks/useGetUser'
import { datetimestamp } from '@/lib/date_formats'
import columns from '@/lib/fuel_consumption_columns'
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
const AddFuelConsumptionModal = dynamic(() => import('./modal'))
const LoadingScreen = dynamic(() => import('@/components/loading_screen/page'))
const NotLoggedInScreen = dynamic(() => import('@/components/not_logged_in/page'))
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page')
)
const ManagementSearchForm = dynamic(() => import('@/components/search_field/page'))
const Sidebar = dynamic(() => import('@/components/sidebar/page'))
const Pagination = dynamic(() => import('@/components/table_pagination/page'))

const FuelConsumptionScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { fuelConsumptionList, refetch } = useGetFuelConsumption()
    const { addFuelConsumption,
        addConsumptionLoading, } = useAddFuelConsumption()
    // const { carsList, carsListLoading } = useCars()
    const [plate_number, setPlateNumber] = useState("")
    const { fuelConsumptionCarData } = useGetSingleFuelConsumption(plate_number)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [receipt_number, setReceiptNumber] = useState<number | undefined>()
    const [odometer, setOdometer] = useState<number | undefined>()
    const [filled_volume_litres, setFilledVolumeLitres] = useState<number | undefined>()
    const [fuel_price_per_litre, setPricePerLitre] = useState<number | undefined>()
    const [tank_filled, setTankFilled] = useState("")


    // Table sorting    
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");
    const table = useReactTable({
        data: fuelConsumptionList,
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

    // These will be auto calculated
    const previousOdometer = fuelConsumptionCarData[0]?.odometer ?? 0;
    const km_travelled_from_last_refill = odometer ?? 0 - previousOdometer

    const litres_travelled_from_last_refill = filled_volume_litres ?? 0;
    const total_fill_cost = (filled_volume_litres ?? 0) * (fuel_price_per_litre ?? 0)
    const km_consumption_per_litre = (km_travelled_from_last_refill ?? 0) / (litres_travelled_from_last_refill ?? 0)
    const litres_consumption_per_100km = (1 / km_consumption_per_litre) * 100
    const miles_gallon = km_consumption_per_litre * 0.62137 / 0.2641
    const cost_of_the_km = 1 / km_consumption_per_litre * (fuelConsumptionList[0]?.total_fill_cost ?? 0)

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const created_at = datetimestamp;
        try {
            const payload = {
                "car_name": plate_number,
                "receipt_number": receipt_number,
                "odometer": odometer,
                "filled_volume_litres": filled_volume_litres,
                "fuel_price_per_litre": fuel_price_per_litre,
                "tank_filled": tank_filled,
                "km_travelled_from_last_refill": km_travelled_from_last_refill,
                "litres_travelled_from_last_refill": litres_travelled_from_last_refill,
                "total_fill_cost": total_fill_cost,
                "km_consumption_per_litre": km_consumption_per_litre,
                "litres_consumption_per_100km": litres_consumption_per_100km,
                "cost_of_the_km": cost_of_the_km,
                "miles_gallon": miles_gallon,
                "created_at": created_at,
            }
            await addFuelConsumption(payload)
            setReceiptNumber(undefined)
            setOdometer(undefined)
            setFilledVolumeLitres(undefined)
            setPricePerLitre(undefined)
            setTankFilled("")
            setOpenAddModal(false)
            refetch()
        } catch (error) {
            if (process.env.NODE_ENV !== 'production')
                console.error("error", error)
        }
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
                            <PageTitle title="list" hasSpan={true} spanText={"Fuel consumption"} />
                            <section className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />
                                <Button type="button" onClick={() => setOpenAddModal(true)}> Add consumption</Button>
                            </section>
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <Tablehead table={table} />
                                    <TableBody table={table} />
                                </table>
                            </div>
                            <div className="h-2" />
                            <Pagination table={table} />
                            {/* modal for adding consumption */}
                            <AddFuelConsumptionModal receipt_number={receipt_number} setReceiptNumber={setReceiptNumber} plate_number={plate_number} setPlateNumber={(e) => setPlateNumber(e)} odometer={odometer} setOdometer={setOdometer} filled_volume_litres={filled_volume_litres} setFilledVolumeLitres={setFilledVolumeLitres} fuel_price_per_litre={fuel_price_per_litre} setPricePerLitre={setPricePerLitre} openAddModal={openAddModal} tank_filled={tank_filled} setTankFilled={setTankFilled} setOpenAddModal={() => setOpenAddModal(false)} km_travelled_from_last_refill={km_travelled_from_last_refill} litres_travelled_from_last_refill={litres_travelled_from_last_refill} total_fill_cost={total_fill_cost} km_consumption_per_litre={km_consumption_per_litre} litres_consumption_per_100km={litres_consumption_per_100km} miles_gallon={miles_gallon} cost_of_the_km={cost_of_the_km} submit={submit} submitLoading={addConsumptionLoading} />
                        </main>
                    </>
                ) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    )
}

export default FuelConsumptionScreen