import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useFetchHHPReports = () => {
    const [reportsLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReports = async (
        engineer?: string,
        dateFrom?: string,
        dateTo?: string,
        unit_status?: string,
        downloaded_by?: string,
        downloaded_at?: string
    ) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/reports`,
                {
                    params: {
                        engineer,
                        dateFrom,
                        dateTo,
                        unit_status,
                        downloaded_by,
                        downloaded_at,
                    },
                    withCredentials: true,
                    responseType: "blob",
                }
            );
        } catch (err: any) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching reports:", err);
                toast.error("Error fetching reports");
            }
            setError("Failed to fetch reports. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { reportsLoading, fetchReports, error };
};

export default useFetchHHPReports;
