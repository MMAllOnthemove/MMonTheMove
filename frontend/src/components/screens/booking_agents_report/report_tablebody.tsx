import { TBookingAgentsDashboard } from '@/lib/types'

import {
    flexRender,
    Row,
} from "@tanstack/react-table"

type TReportTableBody = {
    handleRowClick: (row: any) => void,
    totalJobs: string | number;
    table: {
        getRowModel: () => {
            rows: Row<any>[],
            flatRows: Row<any>[],
            rowsById: Record<string, Row<any>>,
        }
    }
}
const ReportTableBody = ({ handleRowClick, totalJobs, table }: TReportTableBody) => {
    return (
        <>

            <tbody className="z-0">
                {table.getRowModel().rows.map((row: any) => (

                    <tr onClick={() => handleRowClick(row)} key={row.id} className="border-b cursor-pointer hover:bg-gray-100">
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
            <tfoot className="text-center">
                <tr className="border-b cursor-pointer hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium text-sm text-start">Total</td>
                    <td className="px-4 py-3 font-medium text-sm">{totalJobs}</td>
                </tr>
            </tfoot>
        </>
    )
}

export default ReportTableBody