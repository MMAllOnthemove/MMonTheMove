import { useState } from 'react';
import axios from 'axios';
import { THHPTasks } from '@/lib/types';
import toast from 'react-hot-toast';

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

export const useHHPTasksCrud = () => {
    const [hhpTasks, setHHPTasks] = useState<THHPTasks[] | any>([]);
    const [hhpTasksLoading, setHHPTasksLoading] = useState(false);
    const [hhpAddTaskLoading, setHHPAddTaskLoading] = useState(false);
    const [hhpAddTaskErrors, setHHPAddTaskErrors] = useState<AddTaskErrors>({});
    const [updateHHPTaskLoading, setUpdateHHPTaskLoading] = useState(false); // Loading state
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

    const addTask = async (values: any) => {
        setHHPAddTaskLoading(true)
        setHHPAddTaskErrors({})
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs`,
                values,
                {
                    withCredentials: true,
                }
            );
            setHHPTasks((prev: any) => [...prev, data?.task]);// Append new task
            toast.success(`${data?.message}`);
        } catch (error: any) {
            console.error("error", error)
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
            // setHHPTasks((prev: any) => [...prev, data?.task])
            await fetchTasks()
            // setHHPTasks((prev: any) => prev.map((task: any) => (task.id === taskId ? data : task)));
        } catch (error: any) {
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setUpdateHHPTaskLoading(false)
        }

    };

    const deleteTask = async (id: string) => {
        if (!id) return;
        setDeleteHHPTaskLoading(true)
        try {
            const { data } = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/${id}`,
                {
                    withCredentials: true,
                }
            );
            toast.success(`${data?.message}`);
            setHHPTasks((prev: any) => prev.filter((task: any) => task.id !== id));
        } catch (error: any) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            }
        } finally {
            setDeleteHHPTaskLoading(false); // Stop loading
        }
    };

    return { hhpTasks, fetchTasks, hhpAddTaskLoading, addTask, hhpAddTaskErrors, updateHHPTaskLoading, updateTask, deleteHHPTaskLoading, deleteTask };
};
