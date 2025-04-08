import { RepairshoprPutTicket } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";

const useRepairshoprTicket = () => {
    const updateRepairTicket = async (
        ticketId: string | number | undefined,
        values: RepairshoprPutTicket
    ) => {
        if (!ticketId) return;
        try {
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
            if (response.data) {
                return response.data;
            }
        } catch (error: any) {
            console.error("useRepairshoprTicket error", error);
            if (error?.response?.data?.message.length > 0) {
                const errors = error?.response?.data?.message;
                toast.error(errors);
            }
        }
    };

    return { updateRepairTicket };
};

export default useRepairshoprTicket;
