import { TAgentTasks } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFetchAgentTasks = () => {
    const [bookingAgentTasksList, setData] = useState<TAgentTasks[]>([]);
    const [bookingAgentTasksListLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/booking_agents/tasks`,
                    {
                        withCredentials: true,
                    }
                );
                if (response?.data) {
                    setData(response?.data);
                }
            } catch (error: any) {
                toast.error(error?.response?.data?.error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { bookingAgentTasksList, bookingAgentTasksListLoading };
};

export default useFetchAgentTasks;
