import { DriverAdd } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type TPayload = {
    customer_id: string | number;
    problem_type: string;
    subject: string;
    status: string; //  will always be 'New' for a recently created ticket
    ticket_type_id: string | number;
    user_id: string | number;
    properties: {
        "Service Order No.": string | number;
        "Service Order No. ": string | number;
        "Item Condition ": string;
        "Item Condition": string;
        "Backup Requires": string | number; // No
        "Backup Requires ": string | number; // No
        "Warranty ": string | number;
        Warranty: string | number;
        IMEI: string;
        "Job Repair No.": string | number;
        "Job Repair No.:": string | number;
        "Special Requirement": string;
        "Special Requirement ": string;
        Password?: string | number;
    };
    asset_ids: string | number;
};

const useCreateTicket = () => {
    const [createTicketLoading, setLoading] = useState(false); // Loading state
    const router = useRouter();
    const addTicket = async (values: TPayload) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_REPAIRSHOPR_CREATE_TICKET}`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );

            toast.success(
                `Ticket created, Here is your ticket: ${data?.ticket?.number}`,
                {
                    duration: 8000,
                }
            );
            return data;
        } catch (error: any) {
            toast.error(`${error?.response?.error}`);
        } finally {
            setLoading(false);
        }
    };

    return { addTicket, createTicketLoading };
};

export default useCreateTicket;
