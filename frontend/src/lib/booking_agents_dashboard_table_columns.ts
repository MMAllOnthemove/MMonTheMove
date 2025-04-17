import { TColumns } from "./types";

const columns: TColumns | any = [
    {
        header: "Booking agent",
        accessorKey: "booking_agent",
    },
    {
        header: "Tickets booked",
        accessorKey: "total_tasks",
    },
    {
        header: "IW",
        accessorKey: "in_warranty_count",
    },
    {
        header: "OOW",
        accessorKey: "out_of_warranty_count",
    },
    {
        header: "Dunoworx IW",
        accessorKey: "dunoworx_in_warranty",
    },
    {
        header: "Dunoworx OOW",
        accessorKey: "dunoworx_out_of_warranty",
    },
    {
        header: "DSV IW",
        accessorKey: "dsv_in_warranty",
    },
    {
        header: "DSV OOW",
        accessorKey: "dsv_out_of_warranty",
    },
];
export default columns;
