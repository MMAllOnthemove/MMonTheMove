"use client";
import { TUpdateAssessmentDate } from "@/lib/types";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateAssessmentDate = () => {
    const updateAssessmentDate = async (
        rowId: string | number | any,
        values: TUpdateAssessmentDate
    ) => {
        if (!rowId) return;
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/dtv_ha/jobs/assess/${rowId}`,
                values,
                {
                    withCredentials: true,
                }
            );
        } catch (error: any) {
            if (error) toast.error(error?.response?.data?.error);
        }
    };

    return { updateAssessmentDate };
};

export default useUpdateAssessmentDate;
