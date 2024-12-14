import moment from "moment";
import { TColumns } from "./types";

const columns: TColumns | any = [
    {
        header: "Car",
        accessorKey: "car",
    },
    {
        header: "Driver",
        accessorKey: "driver",
    },
    {
        header: "Created",
        accessorKey: "created_at",
        cell: ({ row }: { row: any }) => {
            const dateValue = row.original.created_at; // Access raw data
            return moment(dateValue).format("YYYY-MM-DD HH:mm:ss");
        },
    },
    {
        header: "Next service date",
        accessorKey: "formatted_next_service_date",
    },
    {
        header: "Next service kms",
        accessorKey: "next_service_kms",
    },
    {
        header: "Disc expiry",
        accessorKey: "license_disc_expiry",
    },
    {
        header: "Mileage before",
        accessorKey: "mileage",
    },
    {
        header: "Mileage after",
        accessorKey: "mileage_after",
    },
];
export default columns;
