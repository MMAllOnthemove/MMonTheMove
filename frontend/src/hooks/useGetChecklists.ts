import { VehicleInspection } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// interface ErrorMessages {
//     reasonForUse?: string;
//     driver?: string;
//     footBrakes?: string;
//     emergencyBrake?: string;
//     steeringWheel?: string;
//     windshield?: string;
//     rearWindow?: string;
//     windshieldWipers?: string;
//     headlights?: string;
//     tailLights?: string;
//     turnIndicatorLights?: string;
//     stopLights?: string;
//     frontSeatAdjustment?: string;
//     doors?: string;
//     horn?: string;
//     speedometer?: string;
//     bumpers?: string;
//     mufflerExhaustSystem?: string;
//     tires?: string;
//     interiorExteriorViewMirrors?: string;
//     safetyBelts?: string;
//     engineStartStop?: string;
//     createdBy?: string;
//     mileage?: string;
//     licensePlate?: string;
//     triangle?: string;
//     carJack?: string;
//     spareWheel?: string;
//     hass?: string;
//     tools?: string;
// }

const useFetchChecklists = () => {
    const [checklistList, setchecklist] = useState<VehicleInspection[]>([]);
    const [checklistListLoading, setchecklistLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
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

        fetchData();
    }, [checklistList]);

    return { checklistList, checklistListLoading };
};

export default useFetchChecklists;
