import { ITookanCreateTask } from "@/lib/interfaces";
import axios from "axios";

const useTookanApi = () => {
    const apiLink = process.env.NEXT_PUBLIC_TOOKAN_LINK;

    const createTask = async (values: ITookanCreateTask) => {
        try {
            const response = await axios.post(
                `${apiLink}/create_task`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error creating tookan task:", error);
            }
        }
    };

    return { createTask };
};

export default useTookanApi;
