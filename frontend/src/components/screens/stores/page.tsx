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
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAddStore from '@/hooks/useAddStore';
import useDeleteStore from '@/hooks/useDeleteStore';
import useGetStores from '@/hooks/useGetStores';
import useUserLoggedIn from '@/hooks/useGetUser';
import columns from '@/lib/stores_columns';

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


const StoresScreen = () => {
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { storesList } = useGetStores()
    const { addStore, addStoreLoading, errors } = useAddStore()
    const { deleteStore, deleteStoreLoading } = useDeleteStore()
    const [store_name, setStoreName] = useState("")
    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");

    const [openAddModal, setOpenAddModal] = useState(false)

    const [modifyStoreModal, setModifyStoreModal] = useState<boolean | null | unknown>();


    const handleRowClick = (row: unknown) => {
        setModifyStoreModal(row?.original);
    };

    const closeModifyStoreModal = () => {
        setModifyStoreModal(false);
    };


    const table = useReactTable({
        data: storesList,
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


    const addRow = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const payload = { store_name };
        await addStore(payload);
        setOpenAddModal(false)
    }
    const delEng = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const id = modifyStoreModal?.unique_id;
        await deleteStore(id);
        closeModifyStoreModal()
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

                            <PageTitle title="List" hasSpan={true} spanText={"Store"} />


                            <section className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />

                                <Button type="button" onClick={() => setOpenAddModal(true)}> Add store</Button>

                            </section>
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] uppercase font-semibold">
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <tr key={headerGroup.id} className=" font-semibold">
                                                <th className="px-4 py-3 cursor-pointer  font-semibold">
                                                    Action
                                                </th>

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
                                                <td className="px-4 py-3 font-medium text-sm max-w-full">
                                                    <button
                                                        onClick={() => handleRowClick(row)}
                                                        type="button"
                                                        role="button"
                                                        className="text-red-500 dark:text-red-500 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>

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
                            {/* modal for adding store */}
                            {
                                openAddModal && <Dialog open={openAddModal} onOpenChange={() => setOpenAddModal(false)} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add store</DialogTitle>
                                        </DialogHeader>
                                        <form>
                                            <div className="space-y-3 mb-3">
                                                <Label htmlFor="store_name">Store name</Label>
                                                <Input
                                                    value={store_name}
                                                    onChange={(e) => setStoreName(e.target.value)}
                                                    name="store_name"
                                                    className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                                />
                                                {errors.store_name && <p className="text-sm text-red-500 font-medium">{errors.store_name}</p>}
                                            </div>
                                            <Button className="w-full outline-none" type="submit" onClick={addRow} disabled={addStoreLoading}>{addStoreLoading ? 'Creating...' : 'Add store'}</Button>
                                        </form>


                                    </DialogContent>
                                </Dialog>
                            }
                            {/* modal for updating store */}
                            {
                                modifyStoreModal && <Dialog open={modifyStoreModal} onOpenChange={closeModifyStoreModal} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete store</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to delete <strong>{modifyStoreModal?.store_name}</strong>?
                                            </DialogDescription>
                                        </DialogHeader>


                                        <div className="grid items-center grid-cols-2 gap-3">
                                            <Button className="outline-none" type="button" onClick={closeModifyStoreModal}>No, cancel</Button>
                                            <Button className="outline-none bg-red-600 hover:bg-red-500 focus:bg-red-500" type="button" onClick={delEng} disabled={deleteStoreLoading}>{deleteStoreLoading ? 'Deleting...' : 'Yes, delete'}</Button>

                                        </div>

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

export default StoresScreen
