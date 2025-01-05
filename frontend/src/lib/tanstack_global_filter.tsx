import { Row } from "@tanstack/react-table";

export const globalFilterFn = <TData extends Record<string, any>>(
    row: Row<TData>,
    _columnId: string,
    filterValue: string
): boolean => {
    const searchableFields = [
        row.original.service_order_no,
        row.original.ticket_number,
        row.original.model,
        row.original.phone_name,
        row.original.serial_number,
        row.original.imei,
        row.original.status
    ]; // Add all fields you want to search
    const combinedValue = searchableFields.join(" ").toLowerCase();

    return combinedValue.includes(filterValue.toLowerCase());
};