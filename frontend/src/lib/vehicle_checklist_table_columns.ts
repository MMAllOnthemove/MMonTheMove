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
        header: "Next service",
        accessorKey: "formatted_next_service_date",
    },
    {
        header: "KMs before",
        accessorKey: "mileage",
    },
    {
        header: "KMs after",
        accessorKey: "mileage_after",
    },
];
export default columns;
