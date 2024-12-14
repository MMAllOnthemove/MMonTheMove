import { RepairshoprPutTicket } from "@/lib/types";
import axios from "axios";

const useRepairshoprTicket = () => {
    const updateRepairTicket = async (
        ticketId: string | number | undefined,
        values: RepairshoprPutTicket
    ) => {
        try {
            if (!ticketId) return;
            const response = await axios.put(
                `https://allelectronics.repairshopr.com/api/v1/tickets/${ticketId}`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error(
                    "Error updating repairshopr ticket by id:",
                    error
                );
            }
        }
    };

    return { updateRepairTicket };
};

export default useRepairshoprTicket;
