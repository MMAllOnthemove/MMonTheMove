import { TicketData } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useRepairshoprFetchTicket = (searchTicket: string | undefined) => {
    const [fetchRSTicketData, setData] = useState<TicketData>();
    useEffect(() => {
        const fetchRSTicketData = async () => {
            try {
                if (!searchTicket) return;
                const { data } = await axios.get(
                    `https://allelectronics.repairshopr.com/api/v1/tickets?query=${searchTicket}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                        },
                    }
                );

                if (data?.tickets[0]?.number == searchTicket) {
                    setData(data);
                }
            } catch (error) {
                if (process.env.NODE_ENV !== "production") {
                    console.error(
                        "Error repairshopr search ticket data:",
                        error
                    );
                }
            }
        };
        fetchRSTicketData();
    }, [searchTicket]);
    return { fetchRSTicketData };
};

export default useRepairshoprFetchTicket;
