import { RepairshorTicketComment } from "@/lib/types";
import axios from "axios";

const useRepairshoprComment = () => {
    const updateRepairTicketComment = async (
        ticketId: string | number | undefined,
        values: RepairshorTicketComment
    ) => {
        try {
            const response = await axios.post(
                `https://allelectronics.repairshopr.com/api/v1/tickets/${ticketId}/comment`,
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
            console.error("error", error);
            if (process.env.NODE_ENV !== "production") {
                console.error("Error updating repairshopr comment:", error);
            }
        }
    };

    return { updateRepairTicketComment };
};

export default useRepairshoprComment;
