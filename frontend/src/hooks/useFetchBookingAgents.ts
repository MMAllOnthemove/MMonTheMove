import axios from "axios";
import { useEffect, useState } from "react";

type TAgents = {
    id: string;
    unique_id: string;
    agent_firstname: string;
    agent_lastname: string;
    department: string;
};

const useFetchAgent = () => {
    const [bookingAgentList, setData] = useState<TAgents[] | any>([]);
    const [bookingAgentListLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/booking_agents`,
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
    }, [bookingAgentList]);

    return { bookingAgentList, bookingAgentListLoading };
};

export default useFetchAgent;