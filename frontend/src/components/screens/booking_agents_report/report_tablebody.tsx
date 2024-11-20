import { TAgentTasks } from '@/lib/types'

type TReportTableBody = {
    groupedTasks: TAgentTasks[]
    handleRowClick: (row: any) => void
}
const ReportTableBody = ({ groupedTasks, handleRowClick }: TReportTableBody) => {
    return (
        <tbody className="z-0">

            {groupedTasks?.map((item: any) => (
                <tr onClick={() => handleRowClick(item)} key={item.booking_agent} className="border-b cursor-pointer hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium text-sm">{item.booking_agent}</td>
                    <td className="px-4 py-3 font-medium text-sm">{item.count}</td>
                </tr>
            ))}
        </tbody>
    )
}

export default ReportTableBody