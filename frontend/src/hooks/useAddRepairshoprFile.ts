import axios from "axios";

type TuseRepairshoprFile = {
    files: {
        url: string;
        filename: string;
    }[];
};

const useRepairshoprFile = () => {
    const addRepairTicketFile = async (
        ticketId: string | number | undefined,
        values: TuseRepairshoprFile
    ) => {
        try {
            const response = await axios.post(
                `https://allelectronics.repairshopr.com/api/v1/tickets/${ticketId}/attach_file_url`,
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
            if (process.env.NODE_ENV !== "production") {
                console.error("Error ading repairshopr file:", error);
            }
        }
    };

    return { addRepairTicketFile };
};

export default useRepairshoprFile;
