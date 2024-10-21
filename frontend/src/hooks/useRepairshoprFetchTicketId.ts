import axios from "axios";

const useRepairshoprFetchTicketId = () => {
    const fetchRSTicketDataById = async (repairId: string | number) => {
        try {
            const { data } = await axios.get(
                `https://allelectronics.repairshopr.com/api/v1/tickets?query=${repairId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );

            if (data?.ticket?.id == repairId) return data;
        } catch (error) {
            throw error;
        }
    };

    return { fetchRSTicketDataById };
};

export default useRepairshoprFetchTicketId;
