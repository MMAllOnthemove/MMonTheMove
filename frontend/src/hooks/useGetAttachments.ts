"use client";
import { TCustomers } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type TAttachment = {
    id: number | string;
    unique_id?: string;
    task_id: number | string;
    image_url: string;
    created_at: string;
};
const useGetAttachments = (
    task_id: number | undefined | string | string[] | any
) => {
    const [attachmentsList, setData] = useState<TAttachment[]>([]);
    const [attachmentsListLoading, setLoading] = useState(true);
    const [currentAttPage, setCurrentPage] = useState(1);
    const [totalAttPages, setTotalPages] = useState(0);

    const fetchAttachments = async (page: number) => {
        if (!task_id) return;
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/attachments?id=${task_id}&page=${page}&limit=10`,
                {
                    withCredentials: true,
                }
            );
            if (data) {
                setData(data?.data);
                setCurrentPage(data?.meta.currentPage); // current page
                setTotalPages(data?.meta.totalPages); // total pages
            }
            return data;
        } catch (error: any) {
            console.error("fetchAttachments error", error);
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAttachments(currentAttPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [task_id, currentAttPage]);

    return {
        attachmentsList,
        attachmentsListLoading,
        currentAttPage,
        totalAttPages,
        fetchAttachments,
    };
};

export default useGetAttachments;
