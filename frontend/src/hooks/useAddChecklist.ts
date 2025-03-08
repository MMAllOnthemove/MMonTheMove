import { VehicleInspection } from "@/lib/types";
import socket from "@/socket";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ErrorMessages {
    reasonForUse?: string;
    driver?: string;
    footBrakes?: string;
    emergencyBrake?: string;
    steeringWheel?: string;
    windshield?: string;
    rearWindow?: string;
    windshieldWipers?: string;
    headlights?: string;
    tailLights?: string;
    turnIndicatorLights?: string;
    stopLights?: string;
    frontSeatAdjustment?: string;
    doors?: string;
    horn?: string;
    speedometer?: string;
    bumpers?: string;
    mufflerExhaustSystem?: string;
    tires?: string;
    interiorExteriorViewMirrors?: string;
    safetyBelts?: string;
    engineStartStop?: string;
    createdBy?: string;
    mileage?: string;
    licensePlate?: string;
    triangle?: string;
    carJack?: string;
    spareWheel?: string;
    hass?: string;
    tools?: string;
}
type TUpdateValues = {
    rowId: string | number | undefined | any;
    mileage_after: string;
    next_service_date: string;
    created_by: string | undefined;
};
const useCarChecklist = () => {
    const [addChecklistLoading, setLoading] = useState(false); // Loading state
    const [addChecklistErrors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed
    const [checklistList, setchecklist] = useState<VehicleInspection[]>([]);
    const [checklistListLoading, setchecklistLoading] = useState(true);
    const [loadUpdateChecklist, setLoadUpdateChecklist] = useState(false);
    const addChecklist = async (values: any) => {
        setLoading(true);
        setErrors({}); // Reset error before new attempt
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/checklists`,
                values,
                {
                    withCredentials: true,
                }
            );
            setchecklist((prev: any) => [...prev, response.data?.rows]); // Add assigned task
            socket.emit("addCarChecklist", response.data?.rows);
            toast.success(`${response?.data?.message}`);
            return response?.data;
        } catch (error: any) {
            if (error?.response?.data?.message) {
                toast.error(`${error?.response?.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                toast.error(`Fill in all fields`);
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };
    const refetchChecklists = async () => {
        try {
            setchecklistLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/checklists`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data) {
                setchecklist(response?.data);
            }
        } catch (error: any) {
            if (error?.response?.data?.error) {
                toast.error(`${error?.response?.data?.error}`);
            }
        } finally {
            setchecklistLoading(false);
        }
    };
    const updateChecklist = async (
        rowId: string | number | undefined | any,
        values: TUpdateValues
    ) => {
        if (!rowId) return;
        try {
            setLoadUpdateChecklist(true);
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/checklists/` + rowId,
                values,
                {
                    withCredentials: true,
                }
            );
            setchecklist((prev: any) =>
                prev.map((task: any) =>
                    task.id === rowId ? response?.data.rows : task
                )
            );
            // 🔴 Emit task update event
            socket.emit("updateCarChecklist", response?.data?.rows);
            toast.success(response?.data?.message);
            // window.location.reload();
        } catch (error: any) {
            if (error) toast.error(error?.response?.data?.error);
        } finally {
            setLoadUpdateChecklist(false);
        }
    };
    useEffect(() => {
        // refetchChecklists();
        socket.on("addCarChecklist", (task) => {
            setchecklist((prev: any) => [...prev, task]); // Add assigned task
        });
        socket.on("updateCarChecklist", (task) => {
            setchecklist((prev: any) => [...prev, task]); // Add assigned task
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        addChecklist,
        addChecklistLoading,
        addChecklistErrors,
        checklistList,
        checklistListLoading,
        refetchChecklists,
        updateChecklist,
        loadUpdateChecklist,
    };
};

export default useCarChecklist;
