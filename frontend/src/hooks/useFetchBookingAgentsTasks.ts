import axios from "axios";
import { useEffect, useState } from "react";

type TAgents = {
    id: number;
    unique_id: string;
    ticket_number: string;
    booking_agent: string;
    department: string;
    created_at: string;
};

const useFetchAgentTasks = () => {
    const [bookingAgentTasksList, setData] = useState<TAgents[] | any>([]);
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
                    // console.log(response);
                    setData(response?.data);
                }
            } catch (error) {
                // console.log("Get engineers list error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [bookingAgentTasksList]);

    return { bookingAgentTasksList, bookingAgentTasksListLoading };
};

export default useFetchAgentTasks;
