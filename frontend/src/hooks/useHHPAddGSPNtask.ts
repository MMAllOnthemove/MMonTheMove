import { IHHPgspn } from "@/lib/interfaces";
import axios from "axios";

const useHHPAddGSPNtask = () => {
    const createHHPGSPNTask = async (values: IHHPgspn) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Erro adding HHP task by GSPN:", error);
            }
        }
    };

    return { createHHPGSPNTask };
};

export default useHHPAddGSPNtask;
