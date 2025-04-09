import { Button } from '@/components/ui/button'
import { TBookingAgentData } from '@/lib/types'
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
    handleRowClick: (data: TBookingAgentData) => void;
}
const TableBody = ({ table, handleRowClick }: TTableBody) => {
    return (
        <tbody className="z-0">
            {table.getRowModel().rows?.map((row: any) => (
                <tr
                    key={row.id}

                    className="border-b cursor-pointer hover:bg-gray-100"
                >
                    <td className="px-4 py-3 font-medium text-sm max-w-full">
                        <Button
                            onClick={() => handleRowClick(row)}
                            type="button"
                            role="button"
                            className="text-red-500 hover:underline bg-transparent shadow-none"
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
    )
}

export default TableBody