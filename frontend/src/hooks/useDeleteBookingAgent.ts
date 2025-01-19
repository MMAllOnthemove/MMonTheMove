import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";

const useDeleteBookingAgent = () => {
    const [deleteAgentLoading, setLoading] = useState(false); // Loading state

    const deleteAgent = async (agentId: string) => {
        if (!agentId) return;
        setLoading(true);
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/booking_agents/${agentId}`,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
            }
        } catch (error: any) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.error}`);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { deleteAgent, deleteAgentLoading };
};

export default useDeleteBookingAgent;
