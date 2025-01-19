import { TColumns } from "./types";
import moment from "moment";

const columns: TColumns | any = [
    {
        header: "Full name",
        accessorKey: "customer_name",
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "Phones",
        accessorKey: "phone",
    },
    {
        header: "Units booked",
        accessorKey: "unit_count",
    },
    {
        header: "Visit date",
        accessorKey: "visit_date",
        cell: ({ row }: { row: any }) => (
            <div>
                <span>{moment(row.original.visit_date).format("YYYY-MM-DD")}</span>
            </div>
        ),
    },
    {
        accessorKey: "recent_ticket",
        header: "Recent Ticket",
    },


];
export default columns;
