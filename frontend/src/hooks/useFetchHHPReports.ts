import axios from "axios";
import { useState } from "react";

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

            // Trigger file download
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `report_${Date.now()}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Error fetching reports:", err);
            }
            setError("Failed to fetch reports. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { reportsLoading, fetchReports, error };
};

export default useFetchHHPReports;
