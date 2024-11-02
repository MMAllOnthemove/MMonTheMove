"use client"
import LoadingScreen from '@/components/loading_screen/page';
import NotLoggedInScreen from '@/components/not_logged_in/page';
import PageTitle from '@/components/PageTitle/page';
import ManagementSearchForm from '@/components/search_field/page';
import Sidebar from '@/components/sidebar/page';
import TableBody from '@/components/table_body/page';
import Pagination from '@/components/table_pagination/page';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAddDriver from '@/hooks/useAddDriver';
import useFetchDrivers from '@/hooks/useFetchDrivers';
import useUserLoggedIn from '@/hooks/useGetUser';
import columns from '@/lib/drivers_table_columns';
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useState } from 'react';
import toast from 'react-hot-toast';


const DriversScreen = () => {
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { driversList } = useFetchDrivers()
    const { addDriver, addDriverLoading, errors } = useAddDriver()
    const [driver_firstname, setDriverFirstname] = useState("")
    const [driver_lastname, setDriverLastname] = useState("")
    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");

    const [openAddModal, setOpenAddModal] = useState(false)



    const table = useReactTable({
        data: driversList,
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


    const addEng = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const payload = { driver_firstname, driver_lastname };
        await addDriver(payload);
        console.log(errors)
        toast.error(`Fill in all fields`);
        setOpenAddModal(false)
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

                            <PageTitle title="List" hasSpan={true} spanText={"Driver"} />


                            <section className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />

                                <Button type="button" onClick={() => setOpenAddModal(true)}> Add driver</Button>

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
                                        {table.getRowModel().rows.map((row: unknown) => (
                                            <tr
                                                key={row.id}

                                                className="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-[#22303c] dark:bg-[#2f3f4e]"
                                            >

                                                {row.getVisibleCells().map((cell: unknown) => (
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
                            {/* modal for adding driver */}
                            {
                                openAddModal && <Dialog open={openAddModal} onOpenChange={() => setOpenAddModal(false)} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add driver</DialogTitle>
                                        </DialogHeader>
                                        <form>
                                            <div className="space-y-3 mb-3">
                                                <Label htmlFor="driver_firstname">Driver name</Label>
                                                <Input
                                                    value={driver_firstname}
                                                    onChange={(e) => setDriverFirstname(e.target.value)}
                                                    name="email"
                                                    className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                                />
                                                {errors.driver_firstname && <p className="text-sm text-red-500 font-medium">{errors.driver_firstname}</p>}
                                            </div>
                                            <div className="space-y-3 mb-3">
                                                <Label htmlFor="driver_firstname">Driver lastname</Label>
                                                <Input
                                                    value={driver_lastname}
                                                    onChange={(e) => setDriverLastname(e.target.value)}
                                                    name="email"
                                                    className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                                />
                                                {errors.driver_lastname && <p className="text-sm text-red-500 font-medium">{errors.driver_lastname}</p>}
                                            </div>

                                            <Button className="w-full outline-none" type="submit" onClick={addEng} disabled={addDriverLoading}>{addDriverLoading ? 'Creating...' : 'Add driver'}</Button>
                                        </form>


                                    </DialogContent>
                                </Dialog>
                            }



                        </main>
                    </>
                ) : (
                    <NotLoggedInScreen />
                )
            }
        </>
    )
}

export default DriversScreen
