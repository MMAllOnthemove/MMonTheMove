import { ChecklistAdd } from "@/lib/types";
import axios from "axios";
import { useState } from "react";
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

const useAddChecklist = () => {
    const [addChecklistLoading, setLoading] = useState(false); // Loading state
    const [addChecklistErrors, setErrors] = useState<ErrorMessages>({}); // Explicitly typed

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

            return response;
        } catch (error: any) {
            if (error?.response.data?.message) {
                toast.error(`${error?.response.data?.message}`);
            } else if (error.response && error.response.data.errors) {
                toast.error(`Fill in all fields`);
                setErrors(error.response.data.errors); // Set validation errors to state
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { addChecklist, addChecklistLoading, addChecklistErrors };
};

export default useAddChecklist;
