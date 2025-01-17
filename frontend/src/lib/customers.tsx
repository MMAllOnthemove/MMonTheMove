import { TColumns } from "./types";

const columns: TColumns | any = [
    {
        header: "Full name",
        accessorKey: "first_name",
        cell: ({ row }: { row: any }) => (
            <span>{row.original.first_name} {row.original.last_name}</span>

        ),
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "Phone numbers",
        accessorKey: "phone_number",
        cell: ({ row }: { row: any }) => (
            <span>{row.original.phone_number} {row.original.home_number} <br /> {row.original.office_number}</span>

        ),
    },
    {
        header: "Address",
        accessorKey: "address",
        cell: ({ row }: { row: any }) => (
            <div>
                <span>{row.original.address}</span>
                <br />
                <small style={{ color: "gray" }}>{row.original.address_2} {row.original.city} {row.original.state} {row.original.zip}</small>
            </div>
        ),
    },



];
export default columns;
