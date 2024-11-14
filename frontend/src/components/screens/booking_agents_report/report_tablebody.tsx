import { TAgentTasks } from '@/lib/types'

type TReportTableBody = {
    groupedTasks: TAgentTasks[]
    handleRowClick: (row: any) => void
}
const ReportTableBody = ({ groupedTasks, handleRowClick }: TReportTableBody) => {
    return (
        <tbody className="z-0">

            {groupedTasks?.map((item: any) => (
                <tr onClick={() => handleRowClick(item)} key={item.createdBy} className="border-b cursor-pointer hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium text-sm">{item.createdBy}</td>
                    <td className="px-4 py-3 font-medium text-sm">{item.tasksCount}</td>
                </tr>
            ))}
        </tbody>
    )
}

export default ReportTableBody