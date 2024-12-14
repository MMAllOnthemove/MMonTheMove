import axios from "axios";
import { useEffect, useState } from "react";

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
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error(
                    "Error fetching repairshopr ticket api data by id:",
                    error
                );
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
