import moment from "moment"

export const columns: any = [{
    header: 'ID',
    accessorKey: 'id'
},
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
    accessorKey: 'partsPendingDate'
},
{
    header: 'Parts ordered date',
    accessorKey: 'partsOrderedDate'
},
{
    header: 'Parts issued date',
    accessorKey: 'partsIssuedDate'
},
{
    header: 'QC completed date',
    accessorKey: 'qcCompletedDate'
},
{
    header: 'Repair completed date',
    accessorKey: 'repairCompletedDate'
},
{
    header: 'Engineer analysis',
    accessorKey: 'engineer_analysis'
},
{
    header: 'Ticket',
    accessorKey: 'ticket'
},
]