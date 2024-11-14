import { Button } from '@/components/ui/button'
import { TechniciansTableData } from '@/lib/types'
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
}
const TableBody = ({ table, handleRowClick }: TTableBody) => {
    return (
        <tbody className="z-0">
            {table.getRowModel().rows.map((row: any) => (
                <tr
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    className="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-[#22303c] dark:bg-[#2f3f4e]"
                >
                    <td className="px-4 py-3 font-medium text-sm max-w-full">
                        <Button
                            type="button"
                            role="button"
                            className="text-blue-600 dark:text-blue-500 hover:underline bg-transparent shadow-none outline-none focus:bg-transparent active:bg-transparent hover:bg-transparent"
                        >
                            Edit
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
    )
}

export default TableBody