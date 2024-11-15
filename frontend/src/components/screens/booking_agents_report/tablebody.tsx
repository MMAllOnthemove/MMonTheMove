import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from 'react';
type TTableBody = {
    ticket_number: string,
    booking_agent: string | undefined,
    addAgentTaskLoading: boolean;
    addTask: (data: React.SyntheticEvent) => void;
    // errors?: {
    //     ticket_number?: string;
    //     created_by?: string;
    //     booking_agent?: string;
    // }
}
const TableBody = ({ ticket_number, booking_agent, addAgentTaskLoading, addTask }: TTableBody) => {
    return (
        <tbody className="z-0">
            <tr className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]">
                <td className="px-4 py-3 font-medium text-sm max-w-full">
                    {ticket_number}
                </td>
                <td className="px-4 py-3 font-medium text-sm max-w-full">

                    {booking_agent}
                </td>
                <td className="px-4 py-3 font-medium text-sm max-w-full">
                    <Button
                        type="button"
                        role="button"
                        onClick={addTask}

                        disabled={addAgentTaskLoading}> {addAgentTaskLoading ? 'Adding...' : 'Add task'}
                    </Button>
                </td>
            </tr>
        </tbody>
    )
}

export default TableBody