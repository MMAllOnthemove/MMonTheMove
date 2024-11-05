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
import { useState } from 'react';

import LoadingScreen from '@/components/loading_screen/page';
import NotLoggedInScreen from '@/components/not_logged_in/page';
import PageTitle from '@/components/PageTitle/page';
import ManagementSearchForm from '@/components/search_field/page';
import Sidebar from '@/components/sidebar/page';
import TableBody from '@/components/table_body/page';
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
import useFetchChecklists from '@/hooks/useGetChecklists';
import useUserLoggedIn from '@/hooks/useGetUser';
import columns from '@/lib/vehicle_checklist_table_columns';
import CreateChecklistScreen from '../create_checklist/page';


const ChecklistsScreen = () => {
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { checklistList } = useFetchChecklists()
    const [openAddModal, setOpenAddModal] = useState(false)

    const [openClickedRow, setOpenClickedRow] = useState<boolean | null | any>();

    const handleRowClick = (row: any) => {
        setOpenClickedRow(row?.original);
    };

    const closeOpenClickedRow = () => {
        setOpenClickedRow(false);
    };



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

                                    <TableBody>
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
                                    </TableBody>
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
                                                            <li>Windshield: <span className={`${openClickedRow?.windshield === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.windshield}</span></li>
                                                            <li>Rear window: <span className={`${openClickedRow?.rear_window === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.rear_window}</span></li>
                                                            <li>Windshield wipers: <span className={`${openClickedRow?.windshield_wipers === 'Pass' ? 'text-green-600 font-medium' : ''}`}>{openClickedRow?.windshield_wipers}</span></li>
                                                            <li>Headlights: <span className={`${openClickedRow?.headlights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.headlights}</span></li>
                                                            <li>Tail lights: <span className={`${openClickedRow?.tail_lights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.tail_lights}</span></li>
                                                            <li>Turn indicator lights: <span className={`${openClickedRow?.turn_indicator_lights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.turn_indicator_lights}</span></li>
                                                            <li>Stop lights: <span className={`${openClickedRow?.stop_lights === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.stop_lights}</span></li>
                                                            <li>Doors: <span className={`${openClickedRow?.doors === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.doors}</span></li>
                                                            <li>Bumpers: <span className={`${openClickedRow?.bumpers === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.bumpers}</span></li>
                                                            <li>Exhaust system: <span className={`${openClickedRow?.muffler_exhaust_system === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.muffler_exhaust_system}</span></li>
                                                            <li>Tires: <span className={`${openClickedRow?.tires === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.tires}</span></li>
                                                        </ul>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-2">
                                                <AccordionTrigger>Internal tests</AccordionTrigger>
                                                <AccordionContent>
                                                    <div>
                                                        <ul className="list-decimal list-inside">
                                                            <li>Foot brakes: <span className={`${openClickedRow?.foot_brakes === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.foot_brakes}</span></li>
                                                            <li>Emergency brakes: <span className={`${openClickedRow?.emergency_brake === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.emergency_brake}</span></li>
                                                            <li>Front seat adjustment: <span className={`${openClickedRow?.front_seat_adjustment === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.front_seat_adjustment}</span></li>
                                                            <li>Horn: <span className={`${openClickedRow?.horn === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.horn}</span></li>
                                                            <li>Speedometer: <span className={`${openClickedRow?.speedometer === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.speedometer}</span></li>
                                                            <li>Internal mirror: <span className={`${openClickedRow?.interior_exterior_view_mirros === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.interior_exterior_view_mirros}</span></li>
                                                            <li>Safely belts: <span className={`${openClickedRow?.safety_belts === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.safety_belts}</span></li>
                                                            <li>Engine start/stop: <span className={`${openClickedRow?.engine_start_stop === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.engine_start_stop}</span></li>
                                                        </ul>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-3">
                                                <AccordionTrigger>Accessories</AccordionTrigger>
                                                <AccordionContent>
                                                    <div>
                                                        <ul className="list-decimal list-inside">
                                                            <li>Triangle: <span className={`${openClickedRow?.triangle === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.triangle}</span></li>
                                                            <li>Car jack: <span className={`${openClickedRow?.car_jack === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.car_jack}</span></li>
                                                            <li>Spare wheel: <span className={`${openClickedRow?.spare_wheel === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.spare_wheel}</span></li>
                                                            <li>Hass: <span className={`${openClickedRow?.hass === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.hass}</span></li>
                                                            <li>Speedometer: <span className={`${openClickedRow?.speedometer === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.speedometer}</span></li>
                                                            <li>Handy tools: <span className={`${openClickedRow?.tools === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.tools}</span></li>
                                                        </ul>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-4">
                                                <AccordionTrigger>More info</AccordionTrigger>
                                                <AccordionContent>
                                                    <div>
                                                        <ul className="list-decimal list-inside">
                                                            <li>Driver: <span className="text-gray-600 font-medium">{openClickedRow?.driver}</span></li>
                                                            <li>Car: <span className="text-gray-600 font-medium">{openClickedRow?.car}</span></li>
                                                            <li>Spare wheel: <span className={`${openClickedRow?.spare_wheel === 'Pass' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>{openClickedRow?.spare_wheel}</span></li>
                                                            <li>Reason for use: <span className="text-gray-600 font-medium">{openClickedRow?.reason_for_use}</span></li>
                                                            <li>Created by: <span className="text-gray-600 font-medium">{openClickedRow?.created_by}</span></li>
                                                            <li>Created at: <span className="text-gray-600 font-medium">{openClickedRow?.formatted_created_at}</span></li>
                                                            <li>Final comment: <span className="text-gray-600 font-medium">{openClickedRow?.final_comment}</span></li>
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