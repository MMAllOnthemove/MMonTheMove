import axios from "axios";
import { useEffect, useState } from "react";

const useRepairshoprFetchTicket = (searchTicket: string | number) => {
    const [fetchRSTicketData, setData] = useState();
    useEffect(() => {
        const fetchRSTicketData = async () => {
            try {
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
                    console.log(data);
                    setData(data);
                }
            } catch (error) {
                console.log("tickets search query", error);
            }
        };
        fetchRSTicketData();
    }, [searchTicket]);
    return { fetchRSTicketData };
};

export default useRepairshoprFetchTicket;
