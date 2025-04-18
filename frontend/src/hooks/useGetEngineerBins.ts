"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import socket from "@/socket";
type TEngineerBins = {
    engineer: string | null;
    unit_status: string;
    units_count: string;
    difference: string;
    tickets: [
        {
            ticket_number: string | number;
            ticket_id: string | number;
            date_booked: string;
            difference: string ;
        }
    ];
};

const useGetEngineerBins = () => {
    const [engineerBinList, setData] = useState<TEngineerBins[]>([]);
    const [engineerBinListLoading, setLoading] = useState(true);

    const refetch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/engineer/bin`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setData(response.data);
            }
            return response?.data;
        } catch (error: any) {
            if (process.env.NODE_ENV !== "production") {
                console.log(error);
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        refetch();
        // Listen for real-time bin stats updates
        socket.on("binStatsUpdated", (updatedStats) => {
            setData(updatedStats);
        });

        return () => {
            socket.off("binStatsUpdated");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { engineerBinList, engineerBinListLoading, refetch };
};

export default useGetEngineerBins;
