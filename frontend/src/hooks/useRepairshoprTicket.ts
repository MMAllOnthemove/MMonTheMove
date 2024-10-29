import axios from "axios";

const useRepairshoprTicket = () => {
    const updateRepairTicket = async (
        ticketId: string | number,
        values: unknown
    ) => {
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

            return response.data;
        } catch (error) {
            //
        }
    };

    return { updateRepairTicket };
};

export default useRepairshoprTicket;
