import axios from "axios";
import { useEffect, useState } from "react";

type TInvoices = {
    id: number;
    number: number;
    created_at: string;
    updated_at: string | null;
    total: string;
    verified_paid: boolean;
    tech_marked_paid: boolean;
    is_paid: boolean;
}[];

const useFetchTicketInvoices = (ticket_id: string | undefined) => {
    const [invoicesList, setInvoices] = useState<TInvoices>([]);
    const [invoicesListLoading, setInvoicesLoading] = useState(true);

    const refetch = async () => {
        if (!ticket_id) return;
        try {
            setInvoicesLoading(true);
            const response = await axios.get(
                `https://allelectronics.repairshopr.com/api/v1/invoices/?ticket_id=${ticket_id?.trim()}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );
            if (response?.data) {
                setInvoices(response?.data?.invoices);
            }
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching engineers:", error);
            }
        } finally {
            setInvoicesLoading(false);
        }
    };
    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { invoicesList, invoicesListLoading, refetch };
};

export default useFetchTicketInvoices;
