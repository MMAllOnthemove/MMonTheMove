import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useRepairshoprFetchTicketId = (repairId?: string | number) => {
    const [fetchRSTicketDataById, setData] = useState("");
    const refetchTicketDataById = async () => {
        try {
            if (!repairId) return;
            const { data } = await axios.get(
                `https://allelectronics.repairshopr.com/api/v1/tickets/${repairId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );

            if (data?.ticket?.id == repairId) setData(data);
        } catch (error: any) {
            if (error?.response?.data?.message.length > 0) {
                const errors = error?.response?.data?.message;
                toast.error(errors);
            }
        }
    };
    useEffect(() => {
        refetchTicketDataById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [repairId]);
    return { fetchRSTicketDataById, refetchTicketDataById };
};

export default useRepairshoprFetchTicketId;
