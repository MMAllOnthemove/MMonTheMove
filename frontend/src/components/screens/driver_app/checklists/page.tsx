"use client"
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from 'react';

import LoadingScreen from '@/components/loading_screen/page';
import NotLoggedInScreen from '@/components/not_logged_in/page';
import PageTitle from '@/components/PageTitle/page';
import ManagementSearchForm from '@/components/search_field/page';
import Sidebar from '@/components/sidebar/page';
import Pagination from '@/components/table_pagination/page';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useUpdateChecklist from "@/hooks/updateChecklist";
import useFetchChecklists from '@/hooks/useGetChecklists';
import useUserLoggedIn from '@/hooks/useGetUser';
import columns from '@/lib/vehicle_checklist_table_columns';
import CreateChecklistScreen from '../create_checklist/page';


const ChecklistsScreen = () => {
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { checklistList } = useFetchChecklists()
    const [openAddModal, setOpenAddModal] = useState(false)
    const [mileage_after, setMileageAfter] = useState<string>('')
    const [next_service_date, setNextService] = useState<string>('')
    const [openClickedRow, setOpenClickedRow] = useState<boolean | null | any>();

    const [openChecklistSummaryRow, setOpenChecklistSummaryRow] = useState(null); // Track which row is open
    const { updateChecklist, loadUpdateChecklist } = useUpdateChecklist()
    const handleChecklistSummaryRowClick = (rowKey: any) => {
        // Toggle open/close for the clicked row
        setOpenChecklistSummaryRow(openChecklistSummaryRow === rowKey ? null : rowKey);
    };

    const handleRowClick = (row: any) => {
        setOpenClickedRow(row?.original);
    };

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
        const payload = { rowId, mileage_after, next_service_date }
        await updateChecklist(rowId, payload)


    }

    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");


    const table = useReactTable({
        data: checklistList,
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
                                        {table.getRowModel().rows.map((row: any) => (
                                            <tr
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
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger>External tests</AccordionTrigger>
                                                <AccordionContent>
                                                    <div>
                                                        <ul className="list-decimal list-inside">
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('windshield')}>Windshield: <span className={`${openClickedRow?.windshield === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.windshield}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'windshield' && openClickedRow?.windshield !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.windshield_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('rear_window')}>Rear window: <span className={`${openClickedRow?.rear_window === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.rear_window}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'rear_window' && openClickedRow?.rear_window !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.rear_window_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('windshield_wipers')}>Windshield wipers: <span className={`${openClickedRow?.windshield_wipers === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.windshield_wipers}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'windshield_wipers' && openClickedRow?.windshield_wipers !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.windshield_wipers_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('headlights')}>Headlights: <span className={`${openClickedRow?.headlights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.headlights}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'headlights' && openClickedRow?.headlights !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.headlights_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('tail_lights')}>Tail lights: <span className={`${openClickedRow?.tail_lights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.tail_lights}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'tail_lights' && openClickedRow?.tail_lights !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.tail_lights_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('turn_indicator_lights')}>Turn indicator lights: <span className={`${openClickedRow?.turn_indicator_lights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.turn_indicator_lights}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'turn_indicator_lights' && openClickedRow?.turn_indicator_lights !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.turn_indicator_lights_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('stop_lights')}>Stop lights: <span className={`${openClickedRow?.stop_lights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.stop_lights}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'stop_lights' && openClickedRow?.stop_lights !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.stop_lights_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('doors')}>Doors: <span className={`${openClickedRow?.doors === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.doors}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'doors' && openClickedRow?.doors !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.doors_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('bumpers')}>Bumpers: <span className={`${openClickedRow?.bumpers === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.bumpers}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'bumpers' && openClickedRow?.bumpers !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.bumpers_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('muffler_exhaust_system')}>Exhaust system: <span className={`${openClickedRow?.muffler_exhaust_system === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.muffler_exhaust_system}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'muffler_exhaust_system' && openClickedRow?.muffler_exhaust_system !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.muffler_exhaust_system_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('tires')}>Tires: <span className={`${openClickedRow?.tires === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.tires}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'tires' && openClickedRow?.tires !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.tires_fail_reason}</p>
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
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('foot_brakes')}>Foot brakes: <span className={`${openClickedRow?.foot_brakes === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.foot_brakes}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'foot_brakes' && openClickedRow?.foot_brakes !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.foot_brakes_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('emergency_brake')}>Hand brake: <span className={`${openClickedRow?.emergency_brake === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.emergency_brake}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'emergency_brake' && openClickedRow?.emergency_brake !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.emergency_brake_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('front_seat_adjustment')}>Front seat adjustment: <span className={`${openClickedRow?.front_seat_adjustment === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.front_seat_adjustment}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'front_seat_adjustment' && openClickedRow?.front_seat_adjustment !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.front_seat_adjustment_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('horn')}>Horn: <span className={`${openClickedRow?.horn === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.horn}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'horn' && openClickedRow?.horn !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.horn_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('speedometer')}>Speedometer: <span className={`${openClickedRow?.speedometer === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.speedometer}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'speedometer' && openClickedRow?.speedometer !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.speedometer_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('interior_exterior_view_mirros')}>Internal mirror: <span className={`${openClickedRow?.interior_exterior_view_mirros === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.interior_exterior_view_mirros}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'interior_exterior_view_mirros' && openClickedRow?.interior_exterior_view_mirros !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.interior_exterior_view_mirros_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('safety_belts')}>Safely belts: <span className={`${openClickedRow?.safety_belts === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.safety_belts}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'safety_belts' && openClickedRow?.safety_belts !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.safety_belts_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('engine_start_stop')}>Engine start/stop: <span className={`${openClickedRow?.engine_start_stop === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.engine_start_stop}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'engine_start_stop' && openClickedRow?.engine_start_stop !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.engine_start_stop_fail_reason}</p>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-3">
                                                <AccordionTrigger>Accessories</AccordionTrigger>
                                                <AccordionContent>
                                                    <div>
                                                        <ul className="list-decimal list-inside">
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('triangle')}>Triangle: <span className={`${openClickedRow?.triangle === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.triangle}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'triangle' && openClickedRow?.triangle !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.triangle_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('car_jack')}>Car jack: <span className={`${openClickedRow?.car_jack === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.car_jack}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'car_jack' && openClickedRow?.car_jack !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.car_jack_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('spare_wheel')}>Spare wheel: <span className={`${openClickedRow?.spare_wheel === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.spare_wheel}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'spare_wheel' && openClickedRow?.spare_wheel !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.spare_wheel_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('hass')}>Hass: <span className={`${openClickedRow?.hass === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.hass}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'hass' && openClickedRow?.hass !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.hass_fail_reason}</p>
                                                            )}
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('tools')}>Hand tools: <span className={`${openClickedRow?.tools === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.tools}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'tools' && openClickedRow?.tools !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.tools_fail_reason}</p>
                                                            )}
                                                        </ul>
                                                    </div>
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
                                                            <li>Driver: <span className="text-gray-600 font-medium">{openClickedRow?.driver}</span></li>
                                                            <li>Car: <span className="text-gray-600 font-medium">{openClickedRow?.car}</span></li>
                                                            <li className="cursor-pointer" onClick={() => handleChecklistSummaryRowClick('spare_wheel')}>Spare wheel: <span className={`${openClickedRow?.spare_wheel === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.spare_wheel}</span></li>
                                                            {/* Conditionally show the reason if the row is open */}
                                                            {openChecklistSummaryRow === 'spare_wheel' && openClickedRow?.spare_wheel !== "Pass" && (
                                                                <p className="text-gray-500">Reason: {openClickedRow?.spare_wheel_fail_reason}</p>
                                                            )}
                                                            <li>Reason for use: <span className="text-gray-600 font-medium">{openClickedRow?.reason_for_use}</span></li>
                                                            <li>Mileage start: <span className="text-gray-600 font-medium">{openClickedRow?.mileage}</span></li>
                                                            <li>Mileage end: <span className="text-gray-600 font-medium">{openClickedRow?.mileage_after}</span></li>
                                                            <li>Created by: <span className="text-gray-600 font-medium">{openClickedRow?.created_by}</span></li>
                                                            <li>Created at: <span className="text-gray-600 font-medium">{openClickedRow?.created_at}</span></li>
                                                        </ul>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

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