import { TDashboardRowData } from "./types";

const groupedDataFunction = (
    data: any[],
    engineers: any[],
    dateFrom: string | null,
    dateTo: string | null
) => {
    const grouped: { [key: string]: TDashboardRowData } = {};
    data.filter((ticket: any) => {
        // Filter by engineer (only include engineers in the engineersList)
        return engineers.some(
            (engineer) =>
                `${engineer?.engineer_firstname} ${engineer?.engineer_lastname}` ===
                ticket.engineer
        );
    })
        .filter((ticket: any) => {
            // Filter by date range
            const ticketDate = new Date(ticket.date_booked);
            const from = dateFrom ? new Date(dateFrom) : null;
            const to = dateTo ? new Date(dateTo) : null;

            if (from && ticketDate < from) return false;
            if (to && ticketDate > to) return false;

            return true;
        })
        .forEach((ticket: any) => {
            if (!grouped[ticket.engineer]) {
                grouped[ticket.engineer] = { engineer: ticket.engineer };
            }
            // Group by unit_status (e.g., 'New', 'In Progress', etc.)
            if (!grouped[ticket.engineer][ticket.unit_status]) {
                grouped[ticket.engineer][ticket.unit_status] = [];
            }
            (grouped[ticket.engineer][ticket.unit_status] as any[]).push(
                ticket
            );

            // Handle the qc_complete field as its own status if it's 'Pass'
            if (ticket.qc_complete === "Pass") {
                const qcStatus = "QC Passed";
                if (!grouped[ticket.engineer][qcStatus]) {
                    grouped[ticket.engineer][qcStatus] = [];
                }
                (grouped[ticket.engineer][qcStatus] as any[]).push(ticket);
            }
        });
    return Object.values(grouped);
};

export default groupedDataFunction;
