import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useFetchHHPReports = () => {
    const [reportsLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReports = async (
        fromDate?: string,
        toDate?: string,
        downloaded_by?: string,
        downloaded_at?: string
    ) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/reports/dashboard/table`,
                {
                    params: {
                        fromDate,
                        toDate,
                        downloaded_by,
                        downloaded_at,
                    },
                    withCredentials: true,
                    responseType: "blob",
                }
            );
            // Create a download link for the Blob
            const url = window.URL.createObjectURL(new Blob([data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = `report_${Date.now()}.csv`; // Set a filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url); // Clean up
            toast.success("Report downloaded successfully!");
        } catch (err: any) {
            if (process.env.NODE_ENV !== "production") {
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
