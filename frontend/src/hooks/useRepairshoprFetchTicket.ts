import axios from "axios";

const useRepairshoprFetchTicket = () => {

    const fetchRSTicketData = async (searchTicket: string | number) => {
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

            if (data?.tickets[0]?.number == searchTicket) return data;
        } catch (error) {
            throw error;
        }
    };

    return { fetchRSTicketData };
};

export default useRepairshoprFetchTicket;
