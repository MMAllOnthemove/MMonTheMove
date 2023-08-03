import moment from "moment"

export const columns: any = [
    {
        header: 'Service Order No',
        accessorKey: 'service_order_no'
    },
    {
        header: 'Created',
        accessorKey: 'created_date',
        // cell: info => moment(info).format("YYYY-MM-DD")
    },
    {
        header: 'Model',
        accessorKey: 'model'
    },
    {
        header: 'Warranty',
        accessorKey: 'warranty'
    },
    {
        header: 'Engineer',
        accessorKey: 'engineer'
    },
    {
        header: 'Fault',
        accessorKey: 'fault'
    },
    {
        header: 'IMEI',
        accessorKey: 'imei'
    },
    {
        header: 'Serial Number',
        accessorKey: 'serial_number'
    },
    {
        header: 'In house status',
        accessorKey: 'in_house_status'
    },
    {
        header: 'Assessment',
        accessorKey: 'engineer_assign_date'
    },
    {
        header: 'Parts pending date',
        accessorKey: 'parts_pending_date'
    },
    {
        header: 'Parts ordered date',
        accessorKey: 'parts_ordered_date'
    },
    {
        header: 'Parts ordered',
        accessorKey: 'partslist'
    },
    {
        header: 'Parts issued date',
        accessorKey: 'parts_issued_date'
    },
    {
        header: 'QC Done',
        accessorKey: 'isqcchecked'
    },
    {
        header: 'QC completed date',
        accessorKey: 'qc_completed_date'
    },
    {
        header: 'Repair completed date',
        accessorKey: 'repair_completed_date'
    },
    {
        header: 'Engineer analysis',
        accessorKey: 'engineer_analysis'
    },
    {
        header: 'Ticket',
        accessorKey: 'ticket'
    },
    {
        header: 'Department',
        accessorKey: 'department'
    },
    {
        header: 'Completed days',
        accessorKey: 'completed_days'
    },
]