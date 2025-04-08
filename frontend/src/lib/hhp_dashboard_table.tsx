import moment from "moment";
import { TColumns, THHPTasks } from "./types";
import { ColumnDef } from "@tanstack/react-table";


const columns: ColumnDef<Record<string, any>, any>[] =
    [
        {
            header: "Service Order No",
            accessorKey: "service_order_no",
            cell: ({ row, getValue }: any) => {
                const value = getValue() as string;
                const isEmpty = value === null || value === undefined || value === "" || value?.toLowerCase() === "tbc";

                return (
                    <div
                    >
                        <p> {isEmpty ? <span className="text-red-500 font-medium">No SO number</span> : value}</p>

                        <small style={{ color: "gray" }}>{row.original.ticket_number}</small>
                    </div>
                );
            },
        },
        {
            header: "IW/OOW",
            accessorKey: "warranty",
            cell: ({ getValue }: any) => {
                const value = getValue(); // Get the cell value

                return (
                    <>
                        {
                            value === "IW" || value === "ADH/IW" ? <small className="text-green-700">{value}</small> : <small className="text-red-500">{value}</small>
                        }

                    </>
                );

            },
        },
        {
            header: "Model",
            accessorKey: "model",
            cell: ({ row }: { row: any }) => (
                <div>
                    <span>{row.original.model}</span>
                    <br />
                    <small style={{ color: "gray" }}>{row.original.phone_name}</small>
                </div>
            ),
        },
        {
            header: "Serial number",
            accessorKey: "serial_number",
            cell: ({ row }: { row: any }) => (
                <div>
                    <span>{row.original.serial_number}</span>
                    <br />
                    <small style={{ color: "gray" }}>{row.original.imei}</small>
                </div>
            ),
        },
        {
            header: "Booked",
            accessorKey: "date_booked",
            cell: ({ row }: { row: any }) => {
                const dateValue = row.original.date_booked; // Access raw data
                return moment(dateValue).format("YYYY-MM-DD HH:mm:ss");
            },
        },
        {
            header: "Stores",
            accessorKey: "stores",
        },
        {
            header: "Engineer",
            accessorKey: "engineer",
        },
        {
            header: "Status",
            accessorKey: "unit_status",
        },
        {
            header: "Assessment date",
            accessorKey: "assessment_date", // Ensure this matches your data key
            cell: ({ row, getValue }: any) => {
                const dateValue = row.original.assessment_date; // Access raw data
                const value = getValue(); // Gets the value based on accessorKey
                const isEmpty = value === null || value === undefined || value === 0 || value?.toLowerCase() === "invalid date";
                return (
                    <div
                        style={{
                            backgroundColor: isEmpty ? "#ffcccc" : "transparent",
                            color: isEmpty ? "red" : "inherit",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            textAlign: "center",
                        }}
                    >
                        {isEmpty ? "No assessment date" : moment(dateValue).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                );
            },
        },
        {
            header: "QC date",
            accessorKey: "qc_date",
            cell: ({ row, getValue }: any) => {
                const dateValue = row.original.qc_date; // Access raw data
                const value = getValue();
                const isEmpty = value === null || value === undefined || value === 0 || value?.toLowerCase() === "invalid date";
                return (
                    <div
                        style={{
                            backgroundColor: isEmpty ? "#ffcccc" : "transparent",
                            color: isEmpty ? "red" : "inherit",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            textAlign: "center",
                        }}
                    >
                        {isEmpty ? "No QC date" : moment(dateValue).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                );
            },
        },
        {
            header: "Parts ordered date",
            accessorKey: "parts_ordered_date",
        },
        {
            header: "Parts issue date",
            accessorKey: "parts_issued_date",
        },
        {
            header: "Completed date",
            accessorKey: "completed_date",
        },

    ]
export default columns;
