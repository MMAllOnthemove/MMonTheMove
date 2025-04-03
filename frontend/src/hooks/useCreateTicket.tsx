import axios from "axios";
import { useRouter } from 'nextjs-toploader/app';
import { useState } from "react";
import toast from "react-hot-toast";
import useGetEngineerBins from "./useGetEngineerBins";

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
    const { engineerBinList, engineerBinListLoading, refetch } = useGetEngineerBins();
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
                (t) => (
                    <span className='flex gap-2 justify-between'>
                        Ticket created, Here is your ticket: {data?.ticket?.number}
                        <button className='outline-none border-none bg-transparent cursor-pointer' onClick={() => toast.dismiss(t.id)}>&#10006;</button>
                    </span>
                ),
                {
                    duration: 86400000, // 24 hours
                }
            );
            refetch()
            return data;
        } catch (error: any) {
            toast.error(`${error?.response?.data?.error}`);
        } finally {
            setLoading(false);
        }
    };

    return { addTicket, createTicketLoading };
};

export default useCreateTicket;
