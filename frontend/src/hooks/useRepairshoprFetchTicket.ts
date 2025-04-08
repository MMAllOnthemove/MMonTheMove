import { TicketData } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
            } catch (error: any) {
                if (error?.response?.data?.message.length > 0) {
                    const errors = error?.response?.data?.message;
                    toast.error(errors);
                }
            }
        };
        fetchRSTicketData();
    }, [searchTicket]);
    return { fetchRSTicketData };
};

export default useRepairshoprFetchTicket;
