import axios from "axios";
import toast from "react-hot-toast";

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
        if (!ticketId) return;
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
            console.log(response)
            if (response?.data) toast.success(response?.data?.message);
            return response.data;
        } catch (error: any) {
            console.log(error)
            if (error?.response?.data?.error)
                toast.error(error?.response?.data?.error);
        }
    };

    return { addRepairTicketFile };
};

export default useRepairshoprFile;
