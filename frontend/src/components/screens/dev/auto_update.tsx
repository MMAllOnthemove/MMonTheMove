"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import useHHPTasks from "@/hooks/useHHPTasks";
import moment from "moment";
import useUpdateHHPTask from "@/hooks/updateHHPTask";

const TicketUpdaterScreen: React.FC = () => {
    const [tickets, setTickets] = useState<any[]>([]);
    const [logs, setLogs] = useState<string[]>([]);
    const { hhpTasks, hhpTasksLoading } = useHHPTasks()
    const { updateHHPTask, updateHHPTaskLoading } = useUpdateHHPTask()
    const [isRunning, setIsRunning] = useState(false);
    useEffect(() => {
        if (!isRunning) {
            setIsRunning(true);
            const interval = setInterval(() => {
                fetchAndUpdateTickets();
            }, 30000);

            return () => clearInterval(interval); // Cleanup on component unmount
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning]);

    const fetchAndUpdateTickets = async () => {
        try {
            if (hhpTasks.length === 0) {
                setIsRunning(false);
                return;
            }

            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs`,
                {
                    withCredentials: true,
                }
            );
            for (const ticket of data) {
                if (ticket.ticket_number.toString().length < 6) {
                    setLogs((prevLogs) => [...prevLogs, `Skipping ticket number: ${ticket.ticket_number} (Invalid ticket number)`]);
                    continue;
                }
                const secondSystemData = await axios.get(
                    `https://allelectronics.repairshopr.com/api/v1/tickets?query=${ticket?.ticket_number}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                        },
                    }
                );

                await processAndUpdateTicket(ticket, secondSystemData.data?.tickets[0]);
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
            }
        } catch (error) {
            console.error("Error fetching tickets:", error);
            setLogs((prevLogs) => [...prevLogs, "Error fetching tickets."]);
        }
    };

    const processAndUpdateTicket = async (ticket: any, secondSystemTicket: any) => {
        try {
            const serviceOrderNumber = secondSystemTicket.properties['Service Order.']?.trim();
            const changes = {
                'service_order_no': serviceOrderNumber,
                engineer: secondSystemTicket.user?.full_name,
                warranty: secondSystemTicket.ticket_type_name.includes("In Warranty") ? "IW" : "OOW",
                date_booked: moment(secondSystemTicket.created_at).format("YYYY-MM-DD HH:mm:ss"),
                unit_status: ticket.unit_status === secondSystemTicket.status ? ticket.unit_status : secondSystemTicket.status,
                qc_complete: secondSystemTicket.comments.some((comment: any) =>
                    comment.body.toLowerCase().includes("qc pass")
                )
                    ? "Pass"
                    : "",
                qc_date: secondSystemTicket.comments
                    .filter((comment: any) => comment.body.toLowerCase().includes("qc pass"))
                    .map((comment: any) => moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss"))[0] || '',
                unit_complete: secondSystemTicket.comments.some((comment: any) =>
                    comment.body.toLowerCase().includes("qc pass") ? true : false
                ),
                completed_date: secondSystemTicket.comments
                    .filter((comment: any) => comment.body.toLowerCase().includes("qc pass"))
                    .map((comment: any) => moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss"))[0] || '',
            };
            // Compare changes before updating
            if (
                serviceOrderNumber !==
                changes.service_order_no ||
                ticket.engineer !== changes.engineer ||
                ticket.warranty !== changes.warranty ||
                ticket.date_booked !== changes.date_booked ||
                ticket.unit_status !== changes.unit_status ||
                ticket.qc_complete !== changes.qc_complete ||
                ticket.qc_date !== changes.qc_date ||
                ticket.unit_complete !== changes.unit_complete ||
                ticket.completed_date !== changes.completed_date
            ) {
                await updateHHPTask(ticket.id, changes);
                setLogs((prevLogs) => [...prevLogs, `Updated ticket number: ${ticket.ticket_number}`]);
            }
            else {
                setLogs((prevLogs) => [...prevLogs, `No changes for ticket number: ${ticket.ticket_number}`]);
            }
            setLogs((prevLogs) => [...prevLogs, `Updated ticket number: ${ticket.ticket_number}`]);
        } catch (error) {
            console.error("Error updating ticket:", error);
            setLogs((prevLogs) => [...prevLogs, `Error updating ticket number: ${ticket.ticket_number}`]);
        }
    };

    return (
        <div>
            <h1>Ticket Updater</h1>
            <p>Total {hhpTasks?.length}</p>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>{index + 1}. {log}</li>
                ))}
            </ul>
        </div>
    );
};

export default TicketUpdaterScreen;
