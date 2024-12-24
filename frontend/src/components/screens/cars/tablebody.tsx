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
    handleRowClick?: (data: TBookingAgentData) => void;
}
const TableBody = ({ table }: TTableBody) => {
    return (
        <tbody className="z-0">
            {table.getRowModel().rows?.map((row: any) => (
                <tr
                    key={row.id}

                    className="border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-[#22303c] dark:bg-[#2f3f4e]"
                >

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