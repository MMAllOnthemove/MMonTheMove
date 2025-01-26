import axios from "axios";
import { useEffect, useState } from "react";

type IHHPTask = {
    id: string;
    ticket_number: string;
    repairshopr_job_id: string;
};
const useFetchHHPTaskByTicket = (taskId: string | string[] | any) => {
    const [hhpTask, setHHPTask] = useState<IHHPTask | null>(null);
    const [hhpTaskLoading, setLoading] = useState(false);
    const refetch = async () => {
        if (!taskId) return;
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/ticket/` +
                    taskId,
                {
                    withCredentials: true,
                }
            );
            if (data) {
                setHHPTask(data[0]);
            }
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching HHP task by id:", error);
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const delayFetch = setTimeout(() => {
            refetch();
        }, 5000); // 5-second delay

        return () => clearTimeout(delayFetch); // Cleanup timeout if searchTicket changes

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskId]);
    return { hhpTask, refetch, hhpTaskLoading };
};
export default useFetchHHPTaskByTicket;
