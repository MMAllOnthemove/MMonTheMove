import { TColumns } from "./types";
import moment from "moment";

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
        header: "Phone",
        accessorKey: "phone_number",
    },
    {
        header: "Phone alternative",
        accessorKey: "home_number",
    },
    {
        header: "Address",
        accessorKey: "address",
        cell: ({ row }: { row: any }) => (
            <div>
                <span>{row.original.address}</span>
                <br />
                <small style={{ color: "gray" }}>{row.original.address_2}</small>
            </div>
        ),
    },
    {
        header: "Visit date",
        accessorKey: "visit_date",
        cell: ({ row }: { row: any }) => (
            <div>
                <span>{moment(row.original.visit_date).format("YYYY-MM-DD")}</span>
                <br />
                <small style={{ color: "gray" }}>{moment(row.original.visit_date).format("HH:mm:ss")}</small>

            </div>
        ),
    },


];
export default columns;
