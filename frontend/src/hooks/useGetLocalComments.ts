"use client";
import { TCustomers } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type TComment = {
    id: number;
    unique_id: number;
    task_id: number;
    comment: string;
    created_by: string;
    created_at: string;
};
const useGetComments = (
    task_id: number | undefined | string | string[] | any
) => {
    const [commentsList, setData] = useState<TComment[]>([]);
    const [commentsListLoading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchComments = async (page: number) => {
        if (!task_id) return;
        try {
            setLoading(true);
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
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchComments(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [task_id, currentPage]);

    return {
        commentsList,
        commentsListLoading,
        currentPage,
        totalPages,
        fetchComments,
    };
};

export default useGetComments;
