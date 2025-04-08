"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import useUpdateAssemblyTerm from '@/hooks/updateAssemblyTerm'
import useAddAssemblyTerm from '@/hooks/useAddAssemblyTerm'
import useDeleteAssemblyTerm from '@/hooks/useDeleteAssemblyTerm'
import useAssemblyTerms from '@/hooks/useGetAssemblyTerm'
import useUserLoggedIn from '@/hooks/useGetUser'
import columns from '@/lib/assembly_terms_columns'
import { datetimestamp } from '@/lib/date_formats'
import { TAssemblyTermTable } from '@/lib/types'
import {
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
const LoadingScreen = dynamic(() => import('@/components/loading_screen/page'), { ssr: false })
const Modal = dynamic(() => import('@/components/modal/page'), { ssr: false })
const NotLoggedInScreen = dynamic(() => import('@/components/not_logged_in/page'), { ssr: false })
const PageTitle = dynamic(() => import('@/components/PageTitle/page'), { ssr: false })
const ManagementSearchForm = dynamic(() => import('@/components/search_field/page'), { ssr: false })
const Sidebar = dynamic(() => import('@/components/sidebar/page'), { ssr: false })

const Pagination = dynamic(() => import('@/components/table_pagination/page'), { ssr: false })
const TableHead = dynamic(() => import('./tablehead'), { ssr: false })
const TableBody = dynamic(() => import('./tablebody'), { ssr: false })

const AssemblyTermScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { assemblyTermsList, assemblyTermsListLoading, refetch } = useAssemblyTerms()
    const { updateAssemblyTerm, updateAssemblyTermLoading } = useUpdateAssemblyTerm()
    const { addAssemblyTerm, addAssemblyTermLoading, errors } = useAddAssemblyTerm()
    const { deleteAssemblyTerm, deleteEngineerLoading } = useDeleteAssemblyTerm()
    const [modifyAssemblyTermModal, setModifyAssemblyTermModal] = useState<TAssemblyTermTable | any>();
    const [modifyAssemblyTermModalOpen, setModifyAssemblyTermModalOpen] = useState(false);
    const [term, setTerm] = useState("")
    const [isBold, setBold] = useState(false)
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");

    const handleRowClick = async (row: TAssemblyTermTable) => {
        setModifyAssemblyTermModal(row?.original);
        setModifyAssemblyTermModalOpen(true);
    }
    const closeModal = () => {
        setTerm("")
        setBold(false)
        setModifyAssemblyTermModalOpen(false)
        setModifyAssemblyTermModal(null)
    }
    const openAddTermModal = () => {
        setOpenAddTaskModal(true)
        setTerm("")
        setBold(false)
    }
    const closeAddTermModal = () => {
        setOpenAddTaskModal(false)
        setTerm("")
        setBold(false)
    }
    const table = useReactTable({
        data: assemblyTermsList,
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
    const handleBold = (e: React.SyntheticEvent | any) => {
        if (!isBold) {
            setBold(e);
        }
    }
    // preload 

    useEffect(() => {
        if (modifyAssemblyTermModal) {
            setTerm(modifyAssemblyTermModal?.term)
            setBold(modifyAssemblyTermModal?.bold);
        }
    }, [modifyAssemblyTermModal])

    const addTerm = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const created_at = datetimestamp
        const payload = {
            term, bold: isBold, created_at
        }
        await addAssemblyTerm(payload);
        refetch()
        setOpenAddTaskModal(false)
    }
    const updateTerm = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const id = modifyAssemblyTermModal?.id;
        const payload = {
            term
        }
        await updateAssemblyTerm(id, payload);
        refetch()
        closeModal()
    }
    const delTerm = async (e: TAssemblyTermTable) => {
        await deleteAssemblyTerm(e?.original?.id);
        refetch()
    }

    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : isLoggedIn && user?.user_role === "admin" || user?.user_role === "manager" ? (
                    <>
                        <Sidebar />
                        <main className='container p-1'>

                            <PageTitle title="assembly terms" hasSpan={true} spanText={"Create"} />


                            <section className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />
                                <Button type="button" onClick={openAddTermModal}> Add task</Button>

                            </section>
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <TableHead table={table} />
                                    <TableBody table={table} handleRowClick={handleRowClick} deleteRow={delTerm} />
                                </table>
                            </div>
                            <div className="h-2" />
                            <Pagination table={table} />

                            {/* modal for adding task */}
                            {
                                openAddTaskModal &&
                                <Modal
                                    isVisible={openAddTaskModal}
                                    onClose={closeAddTermModal}
                                    title={"Add term"}
                                    content={
                                        <>
                                            <Textarea className='mb-2' placeholder='Type the term here....' value={term} onChange={(e) => setTerm(e.target.value)} />
                                            <div className="flex items-center space-x-2 mb-3">
                                                <Checkbox id="bold" name="bold" checked={isBold}
                                                    onCheckedChange={handleBold} />
                                                <label
                                                    htmlFor="bold"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Is bold?
                                                </label>
                                            </div>
                                            <Button className="w-full" type="button" disabled={addAssemblyTermLoading} onClick={addTerm}>{addAssemblyTermLoading ? 'Adding...' : 'Add term'}</Button>

                                        </>
                                    }
                                />
                            }
                            {/* modal for updating task */}
                            {
                                modifyAssemblyTermModal &&
                                <Modal
                                    isVisible={modifyAssemblyTermModalOpen}
                                    onClose={closeModal}
                                    title={"Update terms"}
                                    content={
                                        <>
                                            <Textarea className='mb-2' placeholder='Type the term here....' value={term} onChange={(e) => setTerm(e.target.value)} />
                                            <div className="flex items-center space-x-2 mb-3">
                                                <Checkbox id="bold" name="bold" checked={isBold}
                                                    onCheckedChange={handleBold} />
                                                <label
                                                    htmlFor="bold"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Is bold?
                                                </label>
                                            </div>
                                            <Button className="w-full" type="button" disabled={updateAssemblyTermLoading} onClick={updateTerm}>{updateAssemblyTermLoading ? 'Updating...' : 'Update term'}</Button>

                                        </>
                                    }
                                />
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

export default AssemblyTermScreen
