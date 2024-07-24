const columns: any = [
    {
        header: "Service Order No",
        accessorKey: "SvcOrderNo",
    },
    {
        header: "Created",
        accessorKey: "ReqDate",
        // cell: info => moment(info).format("YYYY-MM-DD")
    },
    {
        header: "Warranty",
        accessorKey: "WarrantyType",
    },
    {
        header: "Engineer",
        accessorKey: "EngineerName",
    },
    {
        header: "Status",
        accessorKey: "StatusDesc",
    },
];
export default columns;
