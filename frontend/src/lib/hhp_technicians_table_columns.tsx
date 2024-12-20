import moment from "moment";
import { TColumns } from "./types";


const columns: TColumns | any = [
    {
        header: "Service Order No",
        accessorKey: "service_order_no",
        cell: ({ cell, getValue }: any) => {
            const value = getValue();
            const isEmpty = value === null || value === undefined || value === 0 || value === "" || value?.toLowerCase() === "tbc";

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

                    {isEmpty ? "No SO number" : value}
                </div>
            );
        },
    },
    {
        header: "Ticket",
        accessorKey: "ticket_number",
        cell: ({ row }: { row: any }) => (
            <div>
                <span>{row.original.ticket_number}</span>
                <br />
                <small style={{ color: "gray" }}>{row.original.warranty}</small>
            </div>
        ),
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
        // cell: info => moment(info).format("YYYY-MM-DD")
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
        header: "QC complete",
        accessorKey: "qc_complete",
        cell: ({ row, getValue }: any) => {
            const dateValue = row.original.qc_complete; // Access raw data
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
        header: "Parts pending",
        accessorKey: "parts_pending_date",
    },
    {
        header: "Parts issue date",
        accessorKey: "parts_issued_date",
    },
    {
        header: "Completed date",
        accessorKey: "completed_date",
    },

];
export default columns;
