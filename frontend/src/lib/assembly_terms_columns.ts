import { TColumns } from "./types";

const columns: TColumns | any = [
    {
        header: "Term",
        accessorKey: "term",
    },
    {
        header: "Priority",
        accessorKey: "bold",
    },
    {
        header: "Created",
        accessorKey: "created_at",
    },
];
export default columns;
