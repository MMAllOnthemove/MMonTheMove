import { ITookanAssignToTeam } from "@/lib/interfaces";
import axios from "axios";

const useTookanAssignTeam = () => {
    const apiLink = process.env.NEXT_PUBLIC_TOOKAN_LINK;

    const assignToTeam = async (values: ITookanAssignToTeam) => {
        try {
            const response = await axios.post(
                `${apiLink}/assign_task`,
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
                console.error("Error assigning to team via tookan:", error);
            }
        }
    };

    return { assignToTeam };
};

export default useTookanAssignTeam;
