import { useEffect, useState } from 'react';
import axios from 'axios';
import { THHPTasks } from '@/lib/types';
import toast from 'react-hot-toast';
import socket from '@/socket';

type TUpdateValues = {
    id?: string | number;
    device_name?: string;
    service_order_no?: string;
    unit_status?: string;
    assessment_date?: string;
    parts_pending_date?: string;
    parts_issued_date?: string;
    parts_issued?: boolean;
    parts_pending?: boolean;
    qc_date?: string;
    qc_complete?: string;
    updatedByWho: string;
    ticket_number?: string | number;
};
type TUpdateSO = {
    updated_at?: string;
    updated_by?: string;
    service_order_no?: string;
    unit_status?: string;
};
interface AddTaskErrors {
    date_booked?: string;
    model?: string;
    warranty?: string;
    engineer?: string;
    fault?: string;
    imei?: string;
    serial_number?: string;
    status?: string;
    ticket_number?: string;
    department?: string;
    job_added_by?: string;
    stores?: string;
    repairshopr_job_id?: string;
    repeat_repair?: string;
    additional_info?: string;
}
type TAddTask = {
    id?: string;
    unique_id?: string;
    service_order_no?: string | null;
    qc_date?: string;
    device_name?: string;
    date_booked?: string;
    created_at?: string | null;
    model?: string | null;
    warranty?: string | null;
    engineer?: string | null;
    fault?: string | null;
    imei?: string | null;
    serial_number?: string | null;
    repairshopr_status?: string | null;
    gspn_status?: string | null;
    ticket_number?: string | null;
    department?: string | null;
    job_added_by?: string | null;
    assessment_date?: string | null;
    parts_pending_date?: string | null;
    parts_issued_date?: string | null;
    parts_pending?: string | null;
    stores?: string | null;
    parts_ordered_date?: string | null;
    qc_complete?: string | boolean | null;
    repairshopr_job_id?: string | number;
    unit_status?: string | null;
    qc_complete_date?: string | null;
    repair_completed?: string | null;
}

export const useHHPTasksCrud = () => {
    const [hhpTasks, setHHPTasks] = useState<THHPTasks[] | any>([]);
    const [hhpTasksLoading, setHHPTasksLoading] = useState(false);
    const [hhpAddTaskLoading, setHHPAddTaskLoading] = useState(false);
    const [hhpAddTaskErrors, setHHPAddTaskErrors] = useState<AddTaskErrors>({});
    const [updateHHPTaskLoading, setUpdateHHPTaskLoading] = useState(false); // Loading state
    const [updateHHPTaskSOLoading, setUpdateHHPTaskSOLoading] = useState(false); // Loading state
    const [deleteHHPTaskLoading, setDeleteHHPTaskLoading] = useState(false); // Loading state

    const fetchTasks = async () => {
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

    const addTask = async (values: TAddTask) => {
        setHHPAddTaskLoading(true)
        setHHPAddTaskErrors({})
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs`,
                values,
                {
                    withCredentials: true,
                }
            );
            setHHPTasks((prev: any) => [...prev, response?.data?.task]);// Append new task
            // 🔴 Emit task creation event
            socket.emit("addTask", response?.data?.task);
            return response;
            // toast.success(`${data?.message}`);
        } catch (error: any) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error?.response?.data?.errors) {
                const errorMessages = Object.entries(error.response.data.errors)
                    .map(([key, entry]) => `${entry}`)
                    .join('\n');
                toast(errorMessages, {
                    duration: 10000,
                });
                setHHPAddTaskErrors(error.response.data.errors);
            }
        } finally {
            setHHPAddTaskLoading(false); // Stop loading
        }
    };

    const updateTask = async (taskId: string | number | undefined,
        values: TUpdateValues) => {
        if (!taskId) return;
        setUpdateHHPTaskLoading(true);
        try {
            const { data } = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/` +
                taskId,
                values,
                {
                    withCredentials: true,
                }
            );
            setHHPTasks((prev: any) =>
                prev.map((task: any) => (task.id === taskId ? data.task : task))
            );

            // 🔴 Emit task update event
            socket.emit("updateTask", data?.task);
        } catch (error: any) {
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setUpdateHHPTaskLoading(false)
        }

    };
    const updateTaskSO = async (taskId: string | number | undefined,
        values: TUpdateSO) => {
        if (!taskId) return;
        setUpdateHHPTaskSOLoading(true);
        try {
            const { data } = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/so/` +
                taskId,
                values,
                {
                    withCredentials: true,
                }
            );
            setHHPTasks((prev: any) =>
                prev.map((task: any) => (task.id === taskId ? data.task : task))
            );

            // 🔴 Emit task update event
            socket.emit("updateTask", data?.task);
        } catch (error: any) {
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setUpdateHHPTaskSOLoading(false)
        }

    };

    const deleteTask = async (taskId: string, userId: string | undefined) => {
        if (!taskId) return;
        setDeleteHHPTaskLoading(true)
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/${taskId}`,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" }, // Ensure JSON format
                    data: { userId }
                }
            );
            // // 🔴 Emit task delete event
            // socket.emit("deleteTask", { taskId, deletedBy: userId });
            setHHPTasks((prev: any) => prev.filter((task: any) => task.id !== taskId));
            // toast.success(`Ticket: ${response?.data?.task?.ticket_number} has been deleted`, { position: 'bottom-right' });
        } catch (error: any) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            }
        } finally {
            setDeleteHHPTaskLoading(false); // Stop loading
        }
    };
    // 🔄 Listen for real-time updates
    useEffect(() => {
        fetchTasks()
        socket.on("addTask", (task) => {
            toast.success(`Ticket: ${task?.ticket_number} has been added`, { position: 'bottom-center' });
            setHHPTasks((prev: any) => [...prev, task]); // Add assigned task
        });

        socket.on("updateTask", (updatedTask) => {
            toast.success(`Ticket: ${updatedTask?.ticket_number} has been updated`, { position: 'bottom-center' });
            setHHPTasks((prev: any) =>
                prev.map((task: any) => (task.id === updatedTask.id ? updatedTask : task))
            );
        });

        socket.on("deleteTask", ({ task, deletedBy, ticket_number }) => {
            toast.success(`Ticket: ${ticket_number} has been deleted by ${deletedBy}`, { position: 'bottom-center', duration: 4000 });
            setHHPTasks((prev: any) => prev.filter((task: any) => task.id !== task?.id));
        });

        return () => {
            socket.off("task-assigned");
            socket.off("addTask");
            socket.off("updateTask");
            socket.off("deleteTask");
        };
    }, []);
    return { hhpTasks, hhpTasksLoading, fetchTasks, hhpAddTaskLoading, addTask, hhpAddTaskErrors, updateHHPTaskLoading, updateTask, updateTaskSO, updateHHPTaskSOLoading, deleteHHPTaskLoading, deleteTask };
};
