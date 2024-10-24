"use client"
import useFetchEngineer from '@/hooks/useFetchEngineers'
import useUserLoggedIn from '@/hooks/useGetUser'
import React, { useState } from 'react'
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import columns from '@/lib/engineers_columns';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import ManagementSearchForm from '@/components/search_field/page';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/sidebar/page';
import LoadingScreen from '@/components/loading_screen/page';
import PageTitle from '@/components/PageTitle/page';
import Pagination from '@/components/table_pagination/page';
import NotLoggedInScreen from '@/components/not_logged_in/page';
import TableBody from '@/components/table_body/page';
import useAddEngineer from '@/hooks/useAddEngineer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import useDeleteEngineer from '@/hooks/useDeleteEngineer';


const EngineersScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { engineersList, engineersListLoading } = useFetchEngineer()
    const { addEngineer, addEngineerLoading, errors } = useAddEngineer()
    const { deleteEngineer, deleteEngineerLoading } = useDeleteEngineer()
    const [engineer_firstname, setEngineerFirstname] = useState("")
    const [engineer_lastname, setEngineerLastname] = useState("")
    const [department] = useState("HHP")
    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");

    const [openAddModal, setOpenAddModal] = useState(false)
    const [modifyEngineerModal, setModifyEngineerModal] = useState<boolean | null | any>();
    // const { hhpTask } = useFetchHHPTaskById(modifyTaskModal?.id)

    const handleRowClick = (row: any) => {
        setModifyEngineerModal(row?.original);
    };

    const closeModifyEngineerModal = () => {
        setModifyEngineerModal(false);
    };


    const table = useReactTable({
        data: engineersList,
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
        const payload = { engineer_firstname, engineer_lastname, department };
        // console.log(payload)
        const response = await addEngineer(payload);
        console.log("response add engi..", response)
        setOpenAddModal(false)
    }
    const delEng = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const id = modifyEngineerModal?.unique_id;
        const payload = { id }
        console.log(payload)
        const response = await deleteEngineer(id);
        console.log("response del engi..", response)
        closeModifyEngineerModal()
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

                            <PageTitle title="List" hasSpan={true} spanText={"Engineer"} />


                            <section className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />

                                <Button type="button" onClick={() => setOpenAddModal(true)}> Add engineer</Button>

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
                                        {table.getRowModel().rows.map((row: any) => (
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
                            {/* modal for adding engineer */}
                            {
                                openAddModal && <Dialog open={openAddModal} onOpenChange={() => setOpenAddModal(false)} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add engineer</DialogTitle>
                                            <DialogDescription>
                                                It will auto detect that it is HHP
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form>
                                            <div className="space-y-3 mb-3">
                                                <Label htmlFor="engineer_firstname">Engineer name</Label>
                                                <Input
                                                    value={engineer_firstname}
                                                    onChange={(e) => setEngineerFirstname(e.target.value)}
                                                    name="email"
                                                    className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                                />
                                                {errors.engineer_firstname && <p className="text-sm text-red-500 font-medium">{errors.engineer_firstname}</p>}
                                            </div>
                                            <div className="space-y-3 mb-3">
                                                <Label htmlFor="engineer_firstname">Engineer lastname</Label>
                                                <Input
                                                    value={engineer_lastname}
                                                    onChange={(e) => setEngineerLastname(e.target.value)}
                                                    name="email"
                                                    className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                                />
                                                {errors.engineer_lastname && <p className="text-sm text-red-500 font-medium">{errors.engineer_lastname}</p>}
                                            </div>

                                            <Button className="w-full outline-none" type="submit" onClick={addEng} disabled={addEngineerLoading}>{addEngineerLoading ? 'Creating...' : 'Add engineer'}</Button>
                                        </form>


                                    </DialogContent>
                                </Dialog>
                            }
                            {/* modal for updating engineer */}
                            {
                                modifyEngineerModal && <Dialog open={modifyEngineerModal} onOpenChange={closeModifyEngineerModal} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete engineer</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to delete <strong>{modifyEngineerModal?.engineer_firstname}</strong>?
                                            </DialogDescription>
                                        </DialogHeader>


                                        <div className="grid items-center grid-cols-2 gap-3">
                                            <Button className="outline-none" type="button" onClick={closeModifyEngineerModal}>No, cancel</Button>
                                            <Button className="outline-none bg-red-600 hover:bg-red-500 focus:bg-red-500" type="button" onClick={delEng} disabled={deleteEngineerLoading}>{deleteEngineerLoading ? 'Deleting...' : 'Yes, delete'}</Button>

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

export default EngineersScreen
