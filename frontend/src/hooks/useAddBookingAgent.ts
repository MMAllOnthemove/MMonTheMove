import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
interface ErrorMessages {
    agent_firstname?: string;
    agent_lastname?: string;
    department?: string;
}

const useAddAgent = () => {
    const [addAgentLoading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

    const router = useRouter();
    const addAgent = async (values: any) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/booking_agents`,
                values,
                {
                    withCredentials: true,
                }
            );
            console.log("booking_agents response", response);
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
            }
        } catch (error: any) {
            // console.log("login error", error?.response.data?.message);

            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set validation errors to state
            }
            // setError(error?.response?.data?.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { addAgent, addAgentLoading, errors };
};

export default useAddAgent;
