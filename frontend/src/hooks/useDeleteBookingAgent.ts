import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";

const useDeleteBookingAgent = () => {
    const [deleteAgentLoading, setLoading] = useState(false); // Loading state

    const deleteAgent = async (agentId: string) => {
        setLoading(true);
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/booking_agents/${agentId}`,
                {
                    withCredentials: true,
                }
            );
            console.log("deleteAgent response", response);
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
                // window.location.reload();
                // setLoading(true);
            }
        } catch (error: any) {
            console.log("delete error", error);
            // console.log("login error", error?.response.data?.message);
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { deleteAgent, deleteAgentLoading };
};

export default useDeleteBookingAgent;