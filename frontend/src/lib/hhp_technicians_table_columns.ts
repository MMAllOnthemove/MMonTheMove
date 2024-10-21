const columns: any = [
    {
        header: "Service Order No",
        accessorKey: "service_order_no",
    },
    {
        header: "Ticket",
        accessorKey: "ticket_number",
    },
    {
        header: "Created",
        accessorKey: "date_booked",
        // cell: info => moment(info).format("YYYY-MM-DD")
    },
    {
        header: "IW/OW",
        accessorKey: "warranty",
    },
    {
        header: "Stores",
        accessorKey: "stores",
        // cell: info => moment(info).format("YYYY-MM-DD")
    },
    {
        header: "Engineer",
        accessorKey: "engineer",
    },
    {
        header: "Status",
        accessorKey: "repairshopr_status",
    },
    {
        header: "Assessment date",
        accessorKey: "assessment_date",
    },
    {
        header: "QC complete",
        accessorKey: "qc_complete",
    },
    {
        header: "Parts ordered date",
        accessorKey: "parts_ordered_date",
    },
    {
        header: "Parts pending",
        accessorKey: "parts_pending_date",
    },
    {
        header: "Parts issue date",
        accessorKey: "parts_issued_date",
    },
    {
        header: "Completed date",
        accessorKey: "repair_completed",
    },
];
export default columns;
