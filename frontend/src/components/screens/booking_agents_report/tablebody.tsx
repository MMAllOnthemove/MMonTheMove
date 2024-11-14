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
    booking_agent: string,
    setBookingAgent: (e: string) => void;
    bookingAgentList: Array<{ id: string, agent_firstname: string, agent_lastname: string }>
    addAgentTaskLoading: boolean;
    addTask: (data: React.SyntheticEvent) => void;
    errors: {
        ticket_number?: string;
        created_by?: string;
        booking_agent?: string;
    }
}
const TableBody = ({ ticket_number, booking_agent, bookingAgentList, addAgentTaskLoading, setBookingAgent, addTask, errors }: TTableBody) => {
    return (
        <tbody className="z-0">
            <tr className="border-b cursor-pointer dark:bg-[#22303c] hover:bg-[#eee] hover:text-gray-900 focus:bg-[#eee] focus:text-gray-900 active:bg-[#eee] active:text-gray-900  dark:hover:bg-[#eee] dark:text-[#eee] dark:hover:text-[#22303c]">
                <td className="px-4 py-3 font-medium text-sm max-w-full">
                    {ticket_number}
                </td>
                <td className="px-4 py-3 font-medium text-sm max-w-full">
                    <span>
                        <label
                            htmlFor="booking_agent"
                            className='sr-only'
                        >
                            Booking agent
                        </label>

                        <Select name="booking_agent" value={booking_agent} onValueChange={setBookingAgent}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Booking agent" />
                            </SelectTrigger>
                            <SelectContent>
                                {bookingAgentList.map((dep) => (
                                    <SelectItem key={dep.id} value={`${dep.agent_firstname} ${dep.agent_lastname}`}>{`${dep.agent_firstname} ${dep.agent_lastname}`}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.booking_agent && <p className="text-sm text-red-500 font-medium">{errors.booking_agent}</p>}

                    </span>
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