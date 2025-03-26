"use client"
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page'), { ssr: false }
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page'), { ssr: false }
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page'), { ssr: false }
)
const ManagementSearchForm = dynamic(() =>
    import('@/components/search_field/page'), { ssr: false }
)
const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)
const Pagination = dynamic(() =>
    import('@/components/table_pagination/page'), { ssr: false }
)

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"


// import required modules
import { Card, CardContent } from '@/components/ui/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import useUpdateChecklist from "@/hooks/updateChecklist"
import useCarChecklist from '@/hooks/useAddChecklist'
import useUserLoggedIn from '@/hooks/useGetUser'
import openInNewTab from '@/lib/open_new_tab'
import { VehicleInspection } from "@/lib/types"
import columns from '@/lib/vehicle_checklist_table_columns'
import isWithinTwoMonths from '@/lib/within_two_months'
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import moment from 'moment'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSocket from '@/hooks/useSocket'
const CreateChecklistScreen = dynamic(() =>
    import('../create_checklist/page'), { ssr: false }
)

const ChecklistsScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { isConnected } = useSocket()
    const { checklistList } = useCarChecklist()
    const [openAddModal, setOpenAddModal] = useState(false)
    const [mileage_after, setMileageAfter] = useState<string>('')
    const [next_service_date, setNextService] = useState<string>('')
    const [openClickedRow, setOpenClickedRow] = useState<boolean | null | any>();

    const todaysDate = moment().format('YYYY-MM-DD');

    const [openChecklistSummaryRow, setOpenChecklistSummaryRow] = useState(null); // Track which row is open
    const { updateChecklist, loadUpdateChecklist } = useUpdateChecklist()
    const [todaysCheckList, setTodaysChecklist] = useState<VehicleInspection[]>([]);
    const [oldCheckList, setOldChecklist] = useState<VehicleInspection[]>([]);


    const handleChecklistSummaryRowClick = (rowKey: any) => {
        // Toggle open/close for the clicked row
        setOpenChecklistSummaryRow(openChecklistSummaryRow === rowKey ? null : rowKey);
    };

    const handleRowClick = useCallback(
        (row: any) => {
            setOpenClickedRow(row?.original);
            const todayDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
            // Filter today's checklist
            const today = checklistList?.filter(
                (checklist) =>
                    checklist.car === row?.original?.car && moment(checklist.created_at).format('YYYY-MM-DD') === todayDate
            );
            // Filter historical checklists
            const history = checklistList?.filter(
                (checklist) =>
                    checklist.car === row?.original?.car && checklist.created_at !== todayDate
            );

            setTodaysChecklist(today)
            setOldChecklist(history)
        },
        [checklistList],
    );

    const closeOpenClickedRow = () => {
        setOpenClickedRow(false);
    };
    useEffect(() => {
        // store values from db but still allow user to update those same fields
        // this helps when comparing
        setNextService(openClickedRow?.formatted_next_service_date || "")
        setMileageAfter(openClickedRow?.mileage_after || "")
    }, [openClickedRow?.mileage_after, openClickedRow?.formatted_next_service_date])


    // update the mileage after return
    const updateVehicleChecklist = async () => {
        const rowId = openClickedRow?.id
        const created_by = user?.email
        const payload = { rowId, mileage_after, next_service_date, created_by }
        await updateChecklist(rowId, payload)
    }

    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");


    // Get unique cars
    const uniqueCars = useMemo(
        () => Array.from(new Set(checklistList.map((item) => item.car)))
            .map((car) => {
                return checklistList.find((item) => item.car === car);
            }),
        [checklistList]
    );


    const table = useReactTable({
        data: uniqueCars,
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


    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn ? (
                    <>
                        <Sidebar />
                        <main className='container p-1'>
                            <PageTitle title="Checklists" hasSpan={true} spanText={"Vehicle"} />
                            <section className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />

                                <Button type="button" onClick={() => setOpenAddModal(true)}> Add checklist</Button>
                            </section>
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] uppercase font-semibold">
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <tr key={headerGroup.id} className=" font-semibold">

                                                {headerGroup.headers.map((header) => {
                                                    return (
                                                        <th
                                                            key={header.id}
                                                            className="px-4 py-3 cursor-pointer  font-semibold"
                                                        >
                                                            {header.isPlaceholder ? null : (
                                                                <div
                                                                    {...{
                                                                        className: header.column.getCanSort()
                                                                            ? "cursor-pointer select-none"
                                                                            : "",
                                                                        onClick:
                                                                            header.column.getToggleSortingHandler(),
                                                                    }}
                                                                >
                                                                    {flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )}
                                                                    {{
                                                                        asc: " 👇",
                                                                        desc: " 👆",
                                                                    }[header.column.getIsSorted() as string] ??
                                                                        null}
                                                                </div>
                                                            )}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </thead>

                                    <tbody className="z-0">
                                        {table.getRowModel().rows.map((row: any) =>
                                        (
                                            isWithinTwoMonths(todaysDate, row?.original?.license_disc_expiry) ? (
                                                <tr
                                                    key={row.id}
                                                    onClick={() => handleRowClick(row)}
                                                    className="border-b cursor-pointer hover:bg-red-800 bg-red-600"
                                                >

                                                    {row.getVisibleCells().map((cell: any) => (
                                                        <td
                                                            key={cell.id}
                                                            className="px-4 py-3 font-medium text-sm text-gray-100"
                                                        >
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ) : <tr
                                                key={row.id}
                                                onClick={() => handleRowClick(row)}
                                                className="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-[#22303c] dark:bg-[#2f3f4e]"
                                            >

                                                {row.getVisibleCells().map((cell: any) => (
                                                    <td
                                                        key={cell.id}
                                                        className="px-4 py-3 font-medium text-sm"
                                                    >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="h-2" />
                            <Pagination table={table} />
                            {/* modal for adding checklist */}
                            {
                                openAddModal && <Dialog open={openAddModal} onOpenChange={() => setOpenAddModal(false)} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text-center">Add checklist</DialogTitle>
                                        </DialogHeader>
                                        <CreateChecklistScreen onSuccess={() => setOpenAddModal(false)} />


                                    </DialogContent>
                                </Dialog>
                            }
                            {/* modal for opening */}
                            {
                                openClickedRow && <Dialog open={openClickedRow} onOpenChange={closeOpenClickedRow} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Checklist details</DialogTitle>

                                        </DialogHeader>
                                        <Tabs defaultValue="today" className="w-full">
                                            <TabsList className="grid w-full grid-cols-3">
                                                <TabsTrigger value="today" className=" rounded border active:border-emerald-500 focus:border-emerald-500">Today</TabsTrigger>
                                                <TabsTrigger value="images" className=" rounded border active:border-emerald-500 focus:border-emerald-500">Images</TabsTrigger>
                                                <TabsTrigger value="history" className=" rounded border active:border-emerald-500 focus:border-emerald-500">History</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="today">

                                                {todaysCheckList ?
                                                    todaysCheckList?.map((x: any) => (
                                                        <Accordion type="single" collapsible key={x?.id}>
                                                            <AccordionItem value="item-1">
                                                                <AccordionTrigger>External tests</AccordionTrigger>
                                                                <AccordionContent>
                                                                    <div>
                                                                        <ul className="list-decimal list-inside">
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('windshield')}>Windshield: <span className={`${x?.windshield === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.windshield}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'windshield' && x?.windshield !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.windshield_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('rear_window')}>Rear window: <span className={`${x?.rear_window === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.rear_window}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'rear_window' && x?.rear_window !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.rear_window_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('windshield_wipers')}>Windshield wipers: <span className={`${x?.windshield_wipers === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.windshield_wipers}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'windshield_wipers' && x?.windshield_wipers !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.windshield_wipers_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('headlights')}>Headlights: <span className={`${x?.headlights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.headlights}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'headlights' && x?.headlights !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.headlights_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('tail_lights')}>Tail lights: <span className={`${x?.tail_lights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.tail_lights}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'tail_lights' && x?.tail_lights !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.tail_lights_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('turn_indicator_lights')}>Turn indicator lights: <span className={`${x?.turn_indicator_lights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.turn_indicator_lights}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'turn_indicator_lights' && x?.turn_indicator_lights !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.turn_indicator_lights_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('stop_lights')}>Stop lights: <span className={`${x?.stop_lights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.stop_lights}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'stop_lights' && x?.stop_lights !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.stop_lights_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('doors')}>Doors: <span className={`${x?.doors === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.doors}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'doors' && x?.doors !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.doors_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('bumpers')}>Bumpers: <span className={`${x?.bumpers === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.bumpers}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'bumpers' && x?.bumpers !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.bumpers_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('muffler_exhaust_system')}>Exhaust system: <span className={`${x?.muffler_exhaust_system === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.muffler_exhaust_system}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'muffler_exhaust_system' && x?.muffler_exhaust_system !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.muffler_exhaust_system_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('tires')}>Tires: <span className={`${x?.tires === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.tires}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'tires' && x?.tires !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.tires_fail_reason}</p>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                            <AccordionItem value="item-2">
                                                                <AccordionTrigger>Internal tests</AccordionTrigger>
                                                                <AccordionContent>
                                                                    <div>
                                                                        <ul className="list-decimal list-inside">
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('foot_brakes')}>Foot brakes: <span className={`${x?.foot_brakes === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.foot_brakes}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'foot_brakes' && x?.foot_brakes !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.foot_brakes_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('emergency_brake')}>Hand brake: <span className={`${x?.emergency_brake === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.emergency_brake}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'emergency_brake' && x?.emergency_brake !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.emergency_brake_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('front_seat_adjustment')}>Front seat adjustment: <span className={`${x?.front_seat_adjustment === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.front_seat_adjustment}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'front_seat_adjustment' && x?.front_seat_adjustment !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.front_seat_adjustment_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('horn')}>Horn: <span className={`${x?.horn === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.horn}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'horn' && x?.horn !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.horn_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('speedometer')}>Speedometer: <span className={`${x?.speedometer === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.speedometer}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'speedometer' && x?.speedometer !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.speedometer_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('interior_exterior_view_mirros')}>Internal mirror: <span className={`${x?.interior_exterior_view_mirros === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.interior_exterior_view_mirros}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'interior_exterior_view_mirros' && x?.interior_exterior_view_mirros !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.interior_exterior_view_mirros_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('safety_belts')}>Safely belts: <span className={`${x?.safety_belts === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.safety_belts}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'safety_belts' && x?.safety_belts !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.safety_belts_fail_reason}</p>
                                                                            )}
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('engine_start_stop')}>Engine start/stop: <span className={`${x?.engine_start_stop === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.engine_start_stop}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'engine_start_stop' && x?.engine_start_stop !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.engine_start_stop_fail_reason}</p>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                            <AccordionItem value="item-3">
                                                                <AccordionTrigger>Accessories</AccordionTrigger>
                                                                <AccordionContent>

                                                                    <ul className="list-decimal list-inside">
                                                                        <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('triangle')}>Triangle: <span className={`${x?.triangle === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.triangle}</span></li>
                                                                        {/* Conditionally show the reason if the row is open */}
                                                                        {openChecklistSummaryRow === 'triangle' && x?.triangle !== "Pass" && (
                                                                            <p className="text-gray-500">Reason: {x?.triangle_fail_reason}</p>
                                                                        )}
                                                                        <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('car_jack')}>Car jack: <span className={`${x?.car_jack === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.car_jack}</span></li>
                                                                        {/* Conditionally show the reason if the row is open */}
                                                                        {openChecklistSummaryRow === 'car_jack' && x?.car_jack !== "Pass" && (
                                                                            <p className="text-gray-500">Reason: {x?.car_jack_fail_reason}</p>
                                                                        )}
                                                                        <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('spare_wheel')}>Spare wheel: <span className={`${x?.spare_wheel === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.spare_wheel}</span></li>
                                                                        {/* Conditionally show the reason if the row is open */}
                                                                        {openChecklistSummaryRow === 'spare_wheel' && x?.spare_wheel !== "Pass" && (
                                                                            <p className="text-gray-500">Reason: {x?.spare_wheel_fail_reason}</p>
                                                                        )}
                                                                        <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('hass')}>Hass: <span className={`${x?.hass === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.hass}</span></li>
                                                                        {/* Conditionally show the reason if the row is open */}
                                                                        {openChecklistSummaryRow === 'hass' && x?.hass !== "Pass" && (
                                                                            <p className="text-gray-500">Reason: {x?.hass_fail_reason}</p>
                                                                        )}
                                                                        <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('tools')}>Hand tools: <span className={`${x?.tools === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.tools}</span></li>
                                                                        {/* Conditionally show the reason if the row is open */}
                                                                        {openChecklistSummaryRow === 'tools' && x?.tools !== "Pass" && (
                                                                            <p className="text-gray-500">Reason: {x?.tools_fail_reason}</p>
                                                                        )}
                                                                    </ul>

                                                                </AccordionContent>
                                                            </AccordionItem>
                                                            <AccordionItem value="item-4">
                                                                <AccordionTrigger>Update checklist</AccordionTrigger>
                                                                <AccordionContent>
                                                                    <div>
                                                                        <Input className="mb-3" type="date" name="next_service_date" placeholder="Next service date" id="next_service_date" value={next_service_date} onChange={(e) => setNextService(e.target.value)} />
                                                                        <Input className="mb-3" type="text" name="mileage_after" placeholder="Mileage when driver comes back" id="mileage_after" value={mileage_after} onChange={(e) => setMileageAfter(e.target.value)} />
                                                                        <Button className="w-full" onClick={updateVehicleChecklist} disabled={loadUpdateChecklist}>{loadUpdateChecklist ? 'Updating...' : 'Update checklist'}</Button>
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                            <AccordionItem value="item-5">
                                                                <AccordionTrigger>More info</AccordionTrigger>
                                                                <AccordionContent>
                                                                    <div>
                                                                        <ul className="list-decimal list-inside">
                                                                            <li>Driver: <span className="text-gray-600 font-medium">{x?.driver}</span></li>
                                                                            <li>Car: <span className="text-gray-600 font-medium">{x?.car}</span></li>
                                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('spare_wheel')}>Spare wheel: <span className={`${x?.spare_wheel === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{x?.spare_wheel}</span></li>
                                                                            {/* Conditionally show the reason if the row is open */}
                                                                            {openChecklistSummaryRow === 'spare_wheel' && x?.spare_wheel !== "Pass" && (
                                                                                <p className="text-gray-500">Reason: {x?.spare_wheel_fail_reason}</p>
                                                                            )}
                                                                            <li>Reason for use: <span className="text-gray-600 font-medium">{x?.reason_for_use}</span></li>
                                                                            <li>Mileage start: <span className="text-gray-600 font-medium">{x?.mileage}</span></li>
                                                                            <li>Mileage end: <span className="text-gray-600 font-medium">{x?.mileage_after}</span></li>
                                                                            <li>Created by: <span className="text-gray-600 font-medium">{x?.created_by}</span></li>
                                                                            <li>Created at: <span className="text-gray-600 font-medium">{x?.created_at}</span></li>
                                                                        </ul>
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        </Accordion>
                                                    ))
                                                    : (
                                                        <p>No checklist found for today.</p>
                                                    )}

                                            </TabsContent>
                                            <TabsContent value="images">
                                                <div className="p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                                    {todaysCheckList?.length > 0 ? todaysCheckList?.flatMap((item, itemIndex) =>
                                                        item?.image_urls?.map((url: any, urlIndex: any) => (
                                                            <Card key={`${itemIndex}-${urlIndex}`} className="cursor-pointer" onClick={() => openInNewTab(url)}>
                                                                <CardContent className="relative w-full pb-[100%] overflow-hidden">
                                                                    {url ?
                                                                        <Image
                                                                            alt={`Checklist image ${urlIndex + 1}`}
                                                                            src={url}
                                                                            layout="fill"
                                                                            objectFit="cover"
                                                                            className="absolute top-0 left-0"
                                                                        /> : null}
                                                                </CardContent>
                                                            </Card>
                                                        ))
                                                    ) : null}
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="history">
                                                <div className=" gap-4 divide-y-1 overflow-auto h-[200px]">

                                                    {oldCheckList &&

                                                        oldCheckList.map((checklist: any, index: any) => (
                                                            <Link href={`/drivers/checklists/${checklist?.id}`} target="_blank" rel="noopener noreferrer" key={checklist.unique_id} className="block cursor-pointer text-gray-700 font-medium pb-2 divide-y-2">
                                                                {index + 1}   {checklist.car}: {checklist.created_at}
                                                            </Link>
                                                        ))

                                                    }
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </DialogContent>
                                </Dialog>
                            }
                        </main>
                    </>
                ) :
                    (
                        <NotLoggedInScreen />
                    )
            }
        </>
    )
}

export default ChecklistsScreen