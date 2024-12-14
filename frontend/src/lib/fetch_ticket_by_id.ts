// This function should not be confused with the hook that is similar to thi

import axios from "axios";

export const fetchRSTicketDataById = async (repairId: string) => {
    try {
        const { data } = await axios.get(
            `https://allelectronics.repairshopr.com/api/v1/tickets/${repairId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                },
            }
        );
        if (data?.ticket?.id == repairId) {
            return data;
        }
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error(
                "Error fetching repairshopr ticket api data by id:",
                error
            );
        }
    }
};
