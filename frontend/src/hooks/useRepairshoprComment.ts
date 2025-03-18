import { RepairshorTicketComment } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";

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
        } catch (error: any) {
            if (error?.response?.data?.message.length > 0) {
                const errors = error?.response?.data?.message;
                toast.error(errors);
            }
        }
    };

    return { updateRepairTicketComment };
};

export default useRepairshoprComment;
