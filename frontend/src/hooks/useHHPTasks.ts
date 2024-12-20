"use client";
import { THHPTasks } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useHHPTasks = () => {
    const [hhpTasks, setHHPTasks] = useState<THHPTasks[] | any>([]);
    const [hhpTasksLoading, setHHPTasksLoading] = useState(true);

    const refetchHhpTasks = async () => {
        try {
            setHHPTasksLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setHHPTasks(response.data);
            }
            return response?.data;
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching HHP tasks:", error);
            }
        } finally {
            setHHPTasksLoading(false);
        }
    };
    useEffect(() => {
        refetchHhpTasks();
    }, []);

    return { hhpTasks, hhpTasksLoading, refetchHhpTasks };
};

export default useHHPTasks;
