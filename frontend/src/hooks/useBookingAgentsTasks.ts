import { TBookingAgentsDashboard } from "@/lib/types";
import socket from "@/socket";
import axios from "axios";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
interface ErrorMessages {
    ticket_number?: string;
    created_by?: string;
    booking_agent?: string;
}

const useBookingAgentsTasks = (
    dateFrom?: string | null | undefined,
    dateTo?: string | null | undefined
) => {
    const [addAgentTaskLoading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed
    const [bookingAgentTasksList, setData] = useState<
        TBookingAgentsDashboard[]
    >([]);
    const [bookingAgentTasksListLoading, setBookingAgentTasksList] =
        useState(true);

    const fetchBookingAgentTasks = async (
        dateFrom: string | null | undefined,
        dateTo: string | null | undefined
    ) => {
        try {
            if (!dateFrom && !dateTo) return;
            setBookingAgentTasksList(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/booking_agents/tasks?from=${dateFrom}&to=${dateTo}`,
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
            setBookingAgentTasksList(false);
        }
    };

    const addAgentTask = async (values: any) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/booking_agents/tasks`,
                values,
                {
                    withCredentials: true,
                }
            );
            // 🔴 Emit task creation event
            socket.emit("bookingAgentTask", response?.data?.task);
            setData((prev: any) => [...prev, response?.data?.task]);
            // if (response.status === 201) {
            //     toast.success(`${response?.data?.message}`);
            // }
        } catch (error: any) {
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
    // 🔄 Listen for real-time updates
    useEffect(() => {
        fetchBookingAgentTasks(dateFrom, dateTo);
        socket.on("bookingAgentTask", (task) => {
            if (!task || !task.booking_agent || !task.ticket_number) {
                return; // Ignore incomplete task
            }
            toast.success(`${task?.booking_agent} just made a booking`, {
                position: "bottom-center",
            });
            setData((prev: any) => [...prev, task]); // Add assigned task
        });
        socket.on("bookingStatAdded", (task) => {
            if (!task || !task.booking_agent || !task.ticket_number) {
                return; // Ignore incomplete task
            }
            setData((prev: any) => [...prev, task]); // Update for the stats
        });

        return () => {
            socket.off("bookingAgentTask");
            socket.off("bookingStatAdded");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateFrom, dateTo]);
    return {
        fetchBookingAgentTasks,
        addAgentTask,
        addAgentTaskLoading,
        bookingAgentTasksList,
        bookingAgentTasksListLoading,
        errors,
    };
};

export default useBookingAgentsTasks;
