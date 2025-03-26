import { TAddPart, TTaskParts } from "@/lib/types";
import socket from "@/socket";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface ErrorMessages {
    part_name?: string;
    part_desc?: string;
    part_quantity?: string;
}
interface OldPartErrorMessages {
    old_part_name?: string | undefined;
    old_part_desc?: string | undefined;
}
type TUpdateValues = {
    id: string;
    unique_id?: string;
    ticket_number?: string;
    part_name?: string;
    compensation?: boolean | null | undefined | any;
    part_desc?: string;
    seal_number?: string | null;
    credit_req_number?: string | null;
    parts_status: string | null;
    created_at?: string;
    created_by: string;
    updated_at: string | null;
    is_old_part?: boolean | null;
    stock_availability?: string;
    sales_status?: string;
};

const useTaskParts = (id?: string) => {
    const [taskPartsList, setData] = useState<TTaskParts[]>([]);
    const [taskPartsListLoading, setLoading] = useState(true);
    const [taskOldPartsList, setOldPartsData] = useState<TTaskParts[]>([]);
    const [taskOldPartsListLoading, setOldPartsLoading] = useState(true);
    const [addPartLoading, setaddPartLoading] = useState(false); // Loading state
    const [addPartErrors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed
    const [addOldPartLoading, setaddOldPartLoading] = useState(false); // Loading state
    const [addOldPartErrors, setOldPartErrors] = useState<OldPartErrorMessages>(
        {}
    ); // Explicitly typed
    const [updatePartLoading, setUpdatePart] = useState(false); // Loading state
    const [deletePartLoading, setDeletePartLoading] = useState(false); // Loading state
    const addThisPart = async (values: TAddPart | any) => {
        setaddPartLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/parts`,
                values,
                {
                    withCredentials: true,
                }
            );
            setData((prev: any) => [...prev, response?.data?.part]);
            // 🔴 Emit task creation event
            // socket.emit("addPart", response?.data?.part);
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
            }
        } catch (error: any) {
            console.error("addThisPart error", error);
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set validation errors to state
            }
        } finally {
            setaddPartLoading(false); // Stop loading
        }
    };
    const addThisOldPart = async (values: TAddPart | any) => {
        setaddOldPartLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/parts/old_parts`,
                values,
                {
                    withCredentials: true,
                }
            );
            setOldPartsData((prev: any) => [...prev, response?.data?.part]);
            // 🔴 Emit task creation event
            // socket.emit("addPart", response?.data?.part);
            if (response.status === 201) {
                toast.success(`${response?.data?.message}`);
            }
        } catch (error: any) {
            console.error("addThisOldPart error", error);
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                setOldPartErrors(error.response.data.errors); // Set validation errors to state
            }
        } finally {
            setaddOldPartLoading(false); // Stop loading
        }
    };
    const updatePart = async (
        partId: string | number | undefined,
        values: TUpdateValues
    ) => {
        if (!partId) return;
        setUpdatePart(true);
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/parts/` +
                    partId,
                values,
                {
                    withCredentials: true,
                }
            );
            setData((prev: any) =>
                prev.map((part: any) =>
                    part.id === partId ? response?.data.part : part
                )
            );
            // 🔴 Emit task update event
            socket.emit("updatePart", response?.data.part);
            toast.success(response?.data?.message);
            // return response.data;
        } catch (error: any) {
            console.error("updatePart error", error);
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setUpdatePart(false); // Stop loading
        }
    };
    const refetchPartsForThisTask = async () => {
        if (!id) return; // Exit if id is undefined
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/parts/${id}`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setData(response?.data);
            }
        } catch (error: any) {
            console.error("refetchPartsForThisTask error", error);
            if (
                error?.response?.data?.error &&
                process.env.NODE_ENV !== "production"
            ) {
                console.error(`${error?.response?.data?.error}`);
            }
        } finally {
            setLoading(false);
        }
    };
    const getOldPartsForThisTask = async () => {
        if (!id) return; // Exit if id is undefined
        try {
            setOldPartsLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/parts/old_parts/${id}`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setOldPartsData(response?.data);
            }
        } catch (error: any) {
            console.error("getOldPartsForThisTask error", error);
            if (
                error?.response?.data?.error &&
                process.env.NODE_ENV !== "production"
            ) {
                console.error(`${error?.response?.data?.error}`);
            }
        } finally {
            setOldPartsLoading(false);
        }
    };
    const deletePart = async (id: string | undefined) => {
        if (!id) return;
        setDeletePartLoading(true);
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/parts/${id}`,
                {
                    withCredentials: true,
                }
            );
            setData((prev) => prev.filter((part) => part.id !== id));
            // if (response?.data) {
            //     toast.success(`${response?.data?.message}`);
            // }
        } catch (error: any) {
            console.error("deletePart error", error);
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.error}`);
            }
        } finally {
            setDeletePartLoading(false); // Stop loading
        }
    };
    useEffect(() => {
        refetchPartsForThisTask();
        getOldPartsForThisTask();
        // socket.on("addPart", (part) => {
        //     toast.success(
        //         `${part?.created_by} added part: ${part?.part_name}`,
        //         {
        //             position: "bottom-center",
        //         }
        //     );
        //     setData((prev: any) => [...prev, part]); // Add assigned task
        // });
        socket.on("updatePart", (updatedPart) => {
            setData((prev: any) =>
                prev.map((part: any) =>
                    part.id === updatedPart.id ? updatedPart : part
                )
            );
        });
        socket.on("deletePart", (deletedPart) => {
            setData((prev) => prev.filter((part) => part.id !== deletedPart));
        });

        return () => {
            // socket.off("addPart");
            socket.off("updatePart");
            socket.off("emitLatestPartsAdded");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return {
        taskPartsList,
        taskPartsListLoading,
        taskOldPartsList,
        taskOldPartsListLoading,
        addOldPartLoading,
        addOldPartErrors,
        addThisOldPart,
        addThisPart,
        refetchPartsForThisTask,
        getOldPartsForThisTask,
        addPartLoading,
        addPartErrors,
        updatePart,
        updatePartLoading,
        deletePart,
        deletePartLoading,
    };
};

export default useTaskParts;
