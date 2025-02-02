import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    comment?: string;
}

const useAddTaskCommentLocally = () => {
    const [addCommentLoading, setLoading] = useState(false); // Loading state
    const [addCommentErrors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed
    const addCommentLocally = async (values: any) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/comments`,
                values,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
            }
            return response?.data;
        } catch (error: any) {
            if (error?.response?.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                toast.error("Comment empty");
                setErrors(error.response.data.errors); // Set validation errors to state
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { addCommentLocally, addCommentLoading, addCommentErrors };
};

export default useAddTaskCommentLocally;
