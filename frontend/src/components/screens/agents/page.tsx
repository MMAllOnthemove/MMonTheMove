"use client"
import LoadingScreen from '@/components/loading_screen/page'
import NotLoggedInScreen from '@/components/not_logged_in/page'
import PageTitle from '@/components/PageTitle/page'
import ManagementSearchForm from '@/components/search_field/page'
import Sidebar from '@/components/sidebar/page'
import TableBody from '@/components/table_body/page'
import Pagination from '@/components/table_pagination/page'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAddAgent from '@/hooks/useAddBookingAgent'
import useDeleteBookingAgent from '@/hooks/useDeleteBookingAgent'
import useFetchAgent from '@/hooks/useFetchBookingAgents'
import useUserLoggedIn from '@/hooks/useGetUser'
import columns from '@/lib/booking_agents_table_columns'
import { datetimestamp } from '@/lib/date_formats'
import { TBookingAgentData } from '@/lib/types'
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import React, { useState } from 'react'

const AgentsScreen = () => {
    const { isLoggedIn, loading } = useUserLoggedIn()
    const { bookingAgentList } = useFetchAgent()
    const { addAgent, addAgentLoading, errors } = useAddAgent()
    const { deleteAgent, deleteAgentLoading } = useDeleteBookingAgent()
    const [agent_firstname, setAgentFirstname] = useState("")
    const [agent_lastname, setAgentLastname] = useState("")
    const [department] = useState("HHP")
    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");

    const [openAddModal, setOpenAddModal] = useState(false)
    const [modifyAgentModal, setModifyAgentModal] = useState<boolean | null | undefined | any>();
    // const { hhpTask } = useFetchHHPTaskById(modifyTaskModal?.id)

    const handleRowClick = (row: TBookingAgentData) => {
        setModifyAgentModal(row?.original);
    };

    const closeModifyEngineerModal = () => {
        setModifyAgentModal(false);
    };


    const table = useReactTable({
        data: bookingAgentList,
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

    const addBookingAg = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const created_at = datetimestamp;
        const payload = { agent_firstname, agent_lastname, department, created_at };
        await addAgent(payload);
        setAgentFirstname('')
        setAgentLastname('')
        setOpenAddModal(false)
    }
    const deleteBookingAg = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const id = modifyAgentModal?.unique_id;

        await deleteAgent(id);
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

                            <PageTitle title="List" hasSpan={true} spanText={"Booking agent"} />


                            <section className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />

                                <Button type="button" onClick={() => setOpenAddModal(true)}> Add agent</Button>

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
                                                    <Button
                                                        onClick={() => handleRowClick(row)}
                                                        type="button"
                                                        role="button"
                                                        className="text-red-500 dark:text-red-500 hover:underline bg-transparent"
                                                    >
                                                        Delete
                                                    </Button>
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
                            {/* modal for adding booking agent */}
                            {
                                openAddModal && <Dialog open={openAddModal} onOpenChange={() => setOpenAddModal(false)} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add booking agent</DialogTitle>
                                            <DialogDescription>
                                                It will auto detect that it is HHP
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form>
                                            <div className="space-y-3 mb-3">
                                                <Label htmlFor="agent_firstname">Booking agent name</Label>
                                                <Input
                                                    value={agent_firstname}
                                                    onChange={(e) => setAgentFirstname(e.target.value)}
                                                    name="email"
                                                    className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                                />
                                                {errors.agent_firstname && <p className="text-sm text-red-500 font-medium">{errors.agent_firstname}</p>}
                                            </div>
                                            <div className="space-y-3 mb-3">
                                                <Label htmlFor="agent_lastname">Booking agent lastname</Label>
                                                <Input
                                                    value={agent_lastname}
                                                    onChange={(e) => setAgentLastname(e.target.value)}
                                                    name="email"
                                                    className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                                />
                                                {errors.agent_lastname && <p className="text-sm text-red-500 font-medium">{errors.agent_lastname}</p>}
                                            </div>

                                            <Button className="w-full outline-none" type="submit" onClick={addBookingAg} disabled={addAgentLoading}>{addAgentLoading ? 'Creating...' : 'Add agent'}</Button>
                                        </form>


                                    </DialogContent>
                                </Dialog>
                            }
                            {/* modal for updating booking agent */}
                            {
                                modifyAgentModal && <Dialog open={modifyAgentModal} onOpenChange={closeModifyEngineerModal} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete booking agent</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to delete <strong>{modifyAgentModal?.agent_firstname}</strong>?
                                            </DialogDescription>
                                        </DialogHeader>


                                        <div className="grid items-center grid-cols-2 gap-3">
                                            <Button className="outline-none" type="button" onClick={closeModifyEngineerModal}>No, cancel</Button>
                                            <Button className="outline-none bg-red-600 hover:bg-red-500 focus:bg-red-500" type="button" onClick={deleteBookingAg} disabled={deleteAgentLoading}>{deleteAgentLoading ? 'Deleting...' : 'Yes, delete'}</Button>

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

export default AgentsScreen
