"use client"
import { Button } from '@/components/ui/button'
import useAddAgent from '@/hooks/useAddBookingAgent'
import useDeleteBookingAgent from '@/hooks/useDeleteBookingAgent'
import useFetchAgent from '@/hooks/useFetchBookingAgents'
import useUserLoggedIn from '@/hooks/useGetUser'
import columns from '@/lib/booking_agents_table_columns'
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
const Tablehead = dynamic(() => import('./tablehead'), { ssr: false })
const TableBody = dynamic(() => import('./tablebody'), { ssr: false })
const AgentsModal = dynamic(() => import('./modal'), { ssr: false })
const LoadingScreen = dynamic(() => import('@/components/loading_screen/page'), { ssr: false })
const NotLoggedInScreen = dynamic(() => import('@/components/not_logged_in/page'), { ssr: false })
// const PageTitle = dynamic(() => import('@/components/PageTitle/page'))
import PageTitle from '@/components/PageTitle/page'
const ModifyAgentsModal = dynamic(() => import('./modify_agents_modal'), { ssr: false })

const ManagementSearchForm = dynamic(() => import('@/components/search_field/page'), { ssr: false })
const Sidebar = dynamic(() => import('@/components/sidebar/page'), { ssr: false })

const Pagination = dynamic(() => import('@/components/table_pagination/page'), { ssr: false })

const AgentsScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
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
                ) : isLoggedIn && user?.user_role === "admin" ? (
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
                                    <Tablehead table={table} />
                                    <TableBody table={table} handleRowClick={handleRowClick} />
                                </table>
                            </div>
                            <div className="h-2" />
                            <Pagination table={table} />
                            {/* modal for adding booking agent */}
                            <AgentsModal openAddModal={openAddModal} setOpenAddModal={() => setOpenAddModal(false)} agent_firstname={agent_firstname} setAgentFirstname={setAgentFirstname} agent_lastname={agent_lastname} setAgentLastname={setAgentLastname} errors={errors} addBookingAg={addBookingAg} addAgentLoading={addAgentLoading} />
                            {/* modal for updating booking agent */}
                            <ModifyAgentsModal modifyAgentModal={modifyAgentModal} agent_firstname={modifyAgentModal?.agent_firstname} setModifyAgentModal={closeModifyEngineerModal} deleteBookingAg={deleteBookingAg} deleteAgentLoading={deleteAgentLoading} />

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
