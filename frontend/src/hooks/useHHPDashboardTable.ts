"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const useHHPDashboardTable = (
    dateFrom: string | null,
    dateTo: string | null
) => {
    const [hhpDashboardTable, setHHPDashboardTable] = useState<any>([]);
    const [hhpDashboardTableLoading, setHHPDashboardTableLoading] =
        useState(false);

    const refetchHHPDashboardTable = async (
        dateFrom: string | null,
        dateTo: string | null
    ) => {
        try {
            if (!dateFrom && !dateTo) return;
            setHHPDashboardTableLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/dashboard?from=${dateFrom}&to=${dateTo}`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setHHPDashboardTable(response.data);
            }
            return response?.data;
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error(
                    "Error fetching HHP table dashboard data:",
                    error
                );
            }
        } finally {
            setHHPDashboardTableLoading(false);
        }
    };
    useEffect(() => {
        // Make sure to call `refetchHHPDashboardTable` with the provided date range
        refetchHHPDashboardTable(dateFrom, dateTo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateFrom, dateTo]); // Dependency on `dateFrom` and `dateTo`

    return {
        hhpDashboardTable,
        hhpDashboardTableLoading,
        refetchHHPDashboardTable,
    };
};

export default useHHPDashboardTable;
