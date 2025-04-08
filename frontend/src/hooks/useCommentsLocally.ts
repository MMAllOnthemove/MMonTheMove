import axios from "axios";
import { useEffect, useState } from "react";
import socket from "@/socket";
import toast from "react-hot-toast";
interface ErrorMessages {
    comment?: string;
}
type TComment = {
    id: number;
    unique_id: number;
    task_id: number;
    comment: string;
    created_by: string;
    created_at: string;
};
const useAddCommentsLocally = (
    task_id?: number | undefined | string | string[] | any
) => {
    const [addCommentLoading, setLoading] = useState(false); // Loading state
    const [addCommentErrors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed
    const [commentsList, setData] = useState<TComment[]>([]);
    const [commentsListLoading, setCommentsListLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

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
            setData((prev: any) => [...prev, response?.data?.rows]); // Append new task
            // 🔴 Emit task creation event
            socket.emit("addTicketComment", response?.data?.task);
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

    const fetchComments = async (page: number) => {
        if (!task_id) return;
        try {
            setCommentsListLoading(true);
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/comments?id=${task_id}&page=${page}&limit=10`,
                {
                    withCredentials: true,
                }
            );
            if (data) {
                setData(data?.data);
                setCurrentPage(data?.meta.totalPages);
                setTotalPages(data?.meta.currentPage);
            }
            return data;
        } catch (error: any) {
             console.error("fetchComments error", error);
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setCommentsListLoading(false);
        }
    };
    // 🔄 Listen for real-time updates
    useEffect(() => {
        fetchComments(currentPage);
        socket.on("addTicketComment", (task) => {
            setData((prev: any) => [...prev, task]);
        });

        return () => {
            socket.off("addTicketComment");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [task_id, currentPage]);


    return {
        addCommentLocally,
        addCommentLoading,
        addCommentErrors,
        commentsList,
        commentsListLoading,
        currentPage,
        totalPages,
        fetchComments,
    };
};

export default useAddCommentsLocally;
