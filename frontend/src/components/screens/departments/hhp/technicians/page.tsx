"use client"
import LoadingScreen from '@/components/loading_screen/page';
import NotLoggedInScreen from '@/components/not_logged_in/page';
import PageTitle from '@/components/PageTitle/page';
import ManagementSearchForm from '@/components/search_field/page';
import Sidebar from '@/components/sidebar/page';
import TableBody from '@/components/table_body/page';
import Pagination from '@/components/table_pagination/page';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import useUserLoggedIn from '@/hooks/useGetUser';
import useHHPTasks from '@/hooks/useHHPTasks';
import columns from '@/lib/hhp_technicians_table_columns';
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";



const TechniciansScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { hhpTasks, hhpTasksLoading } = useHHPTasks()
    const [modifyTaskModal, setModifyTaskModal] = useState<boolean | null | any>();
    const handleRowClick = (row: any) => {
        setModifyTaskModal(row?.original);
    };

    const closeModal = () => {
        setModifyTaskModal(false);
    };

    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");

    const table = useReactTable({
        data: hhpTasks,
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

                            <PageTitle title="Management" hasSpan={true} spanText={"HHP"} />

                            {
                                hhpTasksLoading ? (
                                    <p className='text-center font-medium text-slate-950'>Loading tasks...</p>
                                ) : (
                                    <>
                                        <section className="flex justify-between items-center py-5">
                                            <ManagementSearchForm
                                                filtering={filtering}
                                                setFiltering={(e) => setFiltering(e.target.value)}
                                            />
                                        </section>
                                        <div className="max-h-[540px] overflow-y-auto">
                                            <table className="relative w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                                <thead className="sticky top-0 bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white dark:text-[#eee] text-sm uppercase font-semibold">
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
                                                            onClick={() => handleRowClick(row)}
                                                            className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]"
                                                        >
                                                            <td className="px-4 py-3 font-medium text-sm max-w-full">
                                                                <button
                                                                    type="button"
                                                                    role="button"
                                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </td>

                                                            {row.getVisibleCells().map((cell: any) => (
                                                                <td
                                                                    key={cell.id}
                                                                    className="px-4 py-3  font-medium text-sm max-w-full"
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

                                        {
                                            modifyTaskModal && <Dialog open={modifyTaskModal} onOpenChange={closeModal} >
                                                {/* <DialogTrigger>Open</DialogTrigger> */}
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>{modifyTaskModal?.engineer}</DialogTitle>
                                                        <DialogDescription>

                                                        </DialogDescription>
                                                    </DialogHeader>


                                                </DialogContent>
                                            </Dialog>
                                        }
                                    </>
                                )
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

export default TechniciansScreen
