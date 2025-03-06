import socket from "@/socket";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useDeletePart = () => {
    const [deletePartLoading, setLoading] = useState(false); // Loading state

    const deletePart = async (id: string | undefined) => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/parts/${id}`,
                {
                    withCredentials: true,
                }
            );

            if (response?.data) {
                toast.success(`${response?.data?.message}`);
            }
        } catch (error: any) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.error}`);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };
    // 🔄 Listen for real-time updates
    useEffect(() => {
        // Listen for real-time emitLatestPartsAdded updates
        socket.on("emitLatestPartsAdded", (updatedStats) => {
            // console.log("Received emitLatestPartsAdded event:", updatedStats);
        });

        return () => {
            socket.off("emitLatestPartsAdded");
        };
    }, []);
    return { deletePart, deletePartLoading };
};

export default useDeletePart;
