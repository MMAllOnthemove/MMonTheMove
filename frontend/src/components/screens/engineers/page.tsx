"use client"
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useAddEngineer from '@/hooks/useAddEngineer'
import useDeleteEngineer from '@/hooks/useDeleteEngineer'
import useFetchEngineer from '@/hooks/useFetchEngineers'
import useUserLoggedIn from '@/hooks/useGetUser'
import useIpaasGetEngineerList from '@/hooks/useGSPNEngineerList'
import useUpdateEngineer from '@/hooks/useUpdateEngineer'
import departments from '@/lib/departments'
import columns from '@/lib/engineers_columns'
import findChanges from '@/lib/find_changes'
import { TEngineersList, TEngineersListTable } from '@/lib/types'
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
const ManagementSearchForm = dynamic(() =>
    import('@/components/search_field/page'), { ssr: false }
)
const LoadingScreen = dynamic(() =>
    import('@/components/loading_screen/page')
)
const NotLoggedInScreen = dynamic(() =>
    import('@/components/not_logged_in/page')
)
const PageTitle = dynamic(() =>
    import('@/components/PageTitle/page'), { ssr: false }
)

const Sidebar = dynamic(() =>
    import('@/components/sidebar/page'), { ssr: false }
)
const Pagination = dynamic(() =>
    import('@/components/table_pagination/page'), { ssr: false }
)


const EngineersScreen = () => {
    const { user, isLoggedIn, loading } = useUserLoggedIn()
    const { engineersList } = useFetchEngineer()
    const { addEngineer, addEngineerLoading, errors } = useAddEngineer()
    const { deleteEngineer, deleteEngineerLoading } = useDeleteEngineer()
    const { updateEngineer, updateEngineerLoading } = useUpdateEngineer()
    const { gspnEngineerList, gspnEngineerListLoading } = useIpaasGetEngineerList()
    const [engineer_firstname, setEngineerFirstname] = useState("")
    const [engineer_lastname, setEngineerLastname] = useState("")
    const [engineer_code, setEngineerCode] = useState("")
    const [repairshopr_id, setRepairshoprId] = useState("")

    const [department, setDepartment] = useState("")
    // popover select
    const [open, setOpen] = useState(false)

    // Table sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Table filtering
    const [filtering, setFiltering] = useState("");

    const [openModifyModal, setModifyModal] = useState<TEngineersList | any>();

    const [deleteTechModal, setDeleteTechModal] = useState<TEngineersList | any>();

    const handleRowDelete = (row: TEngineersListTable) => {
        setDeleteTechModal(row?.original);
    };

    const closeHandleDeleteRow = () => {
        setDeleteTechModal(false);
    };
    const handleRowModify = (row: TEngineersListTable) => {
        setModifyModal(row?.original);
    };

    const closeHandleModifyRow = () => {
        setModifyModal(false);
    };

    const formattedData = departments?.map((user) => ({
        value: user?.dep,
        label: user?.dep
    }))

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


    // preload 

    useEffect(() => {
        if (openModifyModal) {
            setEngineerFirstname(openModifyModal?.engineer_firstname)
            setEngineerLastname(openModifyModal?.engineer_lastname)
            setDepartment(openModifyModal?.department)
            setEngineerCode(openModifyModal?.engineer_code)
            setRepairshoprId(openModifyModal?.repairshopr_id)
        }
    }, [openModifyModal])

    const addEng = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const names = gspnEngineerList
        await addEngineer({ names });
    }
    const updateEng = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const id = openModifyModal?.unique_id;
        const payload = {
            engineer_firstname: engineer_firstname,
            engineer_lastname: engineer_lastname,
            department: department,
            engineer_code: engineer_code,
            repairshopr_id: repairshopr_id,
        }
        const changes = findChanges(openModifyModal, payload)
        await updateEngineer(id, changes);
        closeHandleModifyRow()
    }
    const delEng = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const id = deleteTechModal?.unique_id;
        await deleteEngineer(id);
        closeHandleDeleteRow()
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

                            <PageTitle title="List" hasSpan={true} spanText={"Engineer"} />


                            <section className="flex justify-between items-center py-5">
                                <ManagementSearchForm
                                    filtering={filtering}
                                    setFiltering={(e) => setFiltering(e.target.value)}
                                />

                                {/* <Button type="button" onClick={() => setOpenAddModal(true)}> Add engineer</Button> */}
                                <Button className="outline-none" type="button" onClick={addEng}>Load new engineers</Button>


                            </section>
                            <div className="overflow-y-auto max-h-[540px] rounded-lg shadow-lg">
                                <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 table-auto">
                                    <caption>Double click on a row to edit technician</caption>
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

                                    <tbody className="z-0">
                                        {table.getRowModel().rows.map((row: any) => (
                                            <tr
                                                key={row.id}
                                                onClick={() => handleRowModify(row)}
                                                className="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-[#22303c] dark:bg-[#2f3f4e]"
                                            >
                                                <td className="px-4 py-3 font-medium text-sm max-w-full">
                                                    <Button
                                                        onClick={() => handleRowDelete(row)}
                                                        type="button"
                                                        role="button"
                                                        className="text-red-500 dark:text-red-500 hover:underline bg-transparent outline-none shadow-none hover:bg-transparent"
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
                                    </tbody>
                                </table>
                            </div>
                            <div className="h-2" />
                            <Pagination table={table} />
                            {/* modal for modifying engineer */}
                            {
                                openModifyModal && <Dialog open={openModifyModal} onOpenChange={closeHandleModifyRow} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit engineer</DialogTitle>
                                            <DialogDescription>
                                                It will auto detect that it is HHP
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form>
                                            <div className="grid grid-cols-2 items-center justify-between gap-2">
                                                <div className="space-y-3 mb-3">
                                                    <Label htmlFor="engineer_firstname">Engineer name</Label>
                                                    <Input
                                                        defaultValue={engineer_firstname}
                                                        onChange={(e) => setEngineerFirstname(e.target.value)}
                                                        name="engineer_firstname"
                                                        className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                                    />
                                                </div>
                                                <div className="space-y-3 mb-3">
                                                    <Label htmlFor="engineer_firstname">Engineer lastname</Label>
                                                    <Input
                                                        defaultValue={engineer_lastname}
                                                        onChange={(e) => setEngineerLastname(e.target.value)}
                                                        name="engineer_lastname"
                                                        className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3 mb-3">
                                                <Select defaultValue={department}
                                                    name="department"
                                                    onValueChange={(e) =>
                                                        setDepartment(e)
                                                    }>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Departments" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Departments</SelectLabel>
                                                            {
                                                                departments?.map((x) => (

                                                                    <SelectItem key={x?.dep} value={`${x.dep}`}>{x?.dep}</SelectItem>
                                                                ))
                                                            }

                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-2 items-center justify-between gap-2">
                                                <div className="space-y-3 mb-3">
                                                    <Label htmlFor="engineer_code">Engineer code</Label>
                                                    <Input
                                                        disabled
                                                        aria-disabled
                                                        defaultValue={engineer_code}
                                                        onChange={(e) => setEngineerCode(e.target.value)}
                                                        name="engineer_code"
                                                        className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                                    />
                                                </div>
                                                <div className="space-y-3 mb-3">
                                                    <Label htmlFor="repairshopr_id">Repairshopr id</Label>
                                                    <Input
                                                        defaultValue={repairshopr_id}
                                                        onChange={(e) => setRepairshoprId(e.target.value)}
                                                        name="repairshopr_id"
                                                        className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                                    />

                                                </div>
                                            </div>
                                            <Button className="w-full outline-none" type="submit" onClick={updateEng} disabled={updateEngineerLoading}>{updateEngineerLoading ? 'Updating...' : 'Update engineer'}</Button>
                                        </form>


                                    </DialogContent>
                                </Dialog>
                            }
                            {/* modal for deleting engineer */}
                            {
                                deleteTechModal && <Dialog open={deleteTechModal} onOpenChange={closeHandleDeleteRow} >
                                    {/* <DialogTrigger>Open</DialogTrigger> */}
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete engineer</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to delete <strong>{deleteTechModal?.engineer_firstname}</strong>?
                                            </DialogDescription>
                                        </DialogHeader>


                                        <div className="grid items-center grid-cols-2 gap-3">
                                            <Button className="outline-none" type="button" onClick={closeHandleDeleteRow}>No, cancel</Button>
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
