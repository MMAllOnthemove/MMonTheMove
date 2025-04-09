import { TBookingAgentsDashboard } from '@/lib/types'


type TReportTableBody = {
    groupedTasks: TBookingAgentsDashboard[]
    handleRowClick: (row: any) => void,
    totalJobs: string | number;
}
const ReportTableBody = ({ groupedTasks, handleRowClick, totalJobs }: TReportTableBody) => {
    return (
        <>

            <tbody className="z-0">

                {groupedTasks?.map((item: any) => (
                    <tr onClick={() => handleRowClick(item)} key={item.booking_agent} className="border-b cursor-pointer hover:bg-gray-100">
                        <td className="px-4 py-3 font-medium text-sm text-start">{item.booking_agent}</td>
                        <td className="px-4 py-3 font-medium text-sm">{item.total_tasks}</td>
                        <td className="px-4 py-3 font-medium text-sm">{item.in_warranty_count}</td>
                        <td className="px-4 py-3 font-medium text-sm">{item.out_of_warranty_count}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr className="border-b cursor-pointer hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium text-sm text-start">Total</td>
                    <td className="px-4 py-3 font-medium text-sm">{totalJobs}</td>
                </tr>
            </tfoot>
        </>
    )
}

export default ReportTableBody