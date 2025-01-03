"use client";
import { THHPTasks } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useDTVHATasks = () => {
    const [dtvhaTasks, setDTVHATasks] = useState<THHPTasks[] | any>([]);
    const [dtvhaTasksLoading, setDTVHATasksLoading] = useState(true);

    const refetchdtvhaTasks = async () => {
        try {
            setDTVHATasksLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/dtv_ha/jobs`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setDTVHATasks(response.data);
            }
            return response?.data;
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching DTV/HA tasks:", error);
            }
        } finally {
            setDTVHATasksLoading(false);
        }
    };
    useEffect(() => {
        refetchdtvhaTasks();
    }, []);

    return { dtvhaTasks, dtvhaTasksLoading, refetchdtvhaTasks };
};

export default useDTVHATasks;
