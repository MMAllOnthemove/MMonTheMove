const columns: any = [
  {
    header: "Service Order No",
    accessorKey: "service_order_no",
  },
  {
    header: "Ticket",
    accessorKey: "ticket",
  },
  {
    header: "Created",
    accessorKey: "created_date",
    // cell: info => moment(info).format("YYYY-MM-DD")
  },
  {
    header: "Warranty",
    accessorKey: "warranty",
  },
  {
    header: "Engineer",
    accessorKey: "engineer",
  },
  {
    header: "Fault",
    accessorKey: "fault",
  },
  {
    header: "In house status",
    accessorKey: "in_house_status",
  },
  {
    header: "QC Done",
    accessorKey: "is_qc_checked",
  },
];
export default columns;
