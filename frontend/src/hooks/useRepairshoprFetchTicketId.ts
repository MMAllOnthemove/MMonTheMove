import axios from "axios";
import { useEffect, useState } from "react";

const useRepairshoprFetchTicketId = (repairId: string | number) => {
    const [fetchRSTicketDataById, setData] = useState("");
    useEffect(() => {
        const fetchRSTicketDataById = async () => {
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

                if (data?.ticket?.id == repairId) setData(data);
            } catch (error) {
                console.log("tickets search by id", error);
            }
        };
        fetchRSTicketDataById();
    }, [repairId]);
    return { fetchRSTicketDataById };
};

export default useRepairshoprFetchTicketId;
