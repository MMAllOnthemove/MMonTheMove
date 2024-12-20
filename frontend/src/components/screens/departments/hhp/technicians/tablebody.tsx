import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import useUserLoggedIn from '@/hooks/useGetUser'
import { TechniciansTableData } from '@/lib/types'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import {
    flexRender,
    Row,
} from "@tanstack/react-table"


type TTableBody = {
    table: {
        getRowModel: () => {
            rows: Row<any>[],
            flatRows: Row<any>[],
            rowsById: Record<string, Row<any>>,
        }
    }
    handleRowClick: (data: TechniciansTableData) => void;
    deleteRow: (data: TechniciansTableData) => void;
}
const TableBody = ({ table, handleRowClick, deleteRow }: TTableBody) => {
    const { user, isLoggedIn } = useUserLoggedIn()
    return (
        <tbody className="z-0">
            {table.getRowModel().rows.map((row: any) => (
                <tr
                    key={row.id}
                    className="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-[#22303c] dark:bg-[#2f3f4e]"
                >
                    <td className="px-4 py-3 font-medium text-sm max-w-full cursor-pointer">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 bg-transparent border-none shadow-none outline-none focus:bg-transparent active:bg-transparent hover:bg-transparent">
                                    <EllipsisHorizontalIcon className="h-8 w-8 p-0 text-gray-900" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem className='cursor-pointer'
                                    onClick={() => handleRowClick(row)}
                                >
                                    Open summary
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem disabled>Open in full</DropdownMenuItem>
                                {isLoggedIn && user?.user_role === "admin" &&
                                    <DropdownMenuItem onClick={() => deleteRow(row)} className='cursor-pointer'>Delete</DropdownMenuItem>}
                            </DropdownMenuContent>
                        </DropdownMenu>
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
    )
}

export default TableBody