import { TColumns } from "./types";

const columns: TColumns = [
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
        accessorKey: "formatted_created_at",
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
