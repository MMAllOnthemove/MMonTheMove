
"use client";
import useUpdateHHPTask from "@/hooks/updateHHPTask";
import useAddCommentsLocally from "@/hooks/useCommentsLocally";
import useHHPTasks from "@/hooks/useHHPTasks";
import useSocket from "@/hooks/useSocket";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

const TransferAttachmentsScreen: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [processedTickets, setProcessedTickets] = useState<Set<string>>(new Set());
    const { hhpTasks } = useHHPTasks();
    const { addCommentLocally, addCommentLoading, addCommentErrors } = useAddCommentsLocally()
    const { updateHHPTask } = useUpdateHHPTask();
    const [isRunning, setIsRunning] = useState(false);

    const { socket } = useSocket()

    useEffect(() => {
        if (!isRunning) {
            fetchAndUpdateTickets();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning]);

    const fetchAndUpdateTickets = async () => {
        setIsRunning(true);
        try {
            const { data: tickets } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs`,
                { withCredentials: true }
            );

            // const filtered = tickets?.filter((x) => x.ticket_type_id === null || x.ticket_type_id === "" || x.ticket_type_id === 'null')
            // const filtered = tickets?.filter((x: any) => x.stores === 'HHP (Robtronics)' && x.unit_status !== 'Resolved')
            // const filtered = tickets?.filter((x) => x.ticket_number === '128114')

            for (const ticket of tickets) {
                if (processedTickets.has(ticket.ticket_number)) {
                    setLogs((prevLogs) => [
                        ...prevLogs,
                        `Skipping already processed ticket: ${ticket.ticket_number}`,
                    ]);
                    continue;
                }

                // if (ticket.ticket_number.toString().length < 6) {
                //     setLogs((prevLogs) => [
                //         ...prevLogs,
                //         `Skipping invalid ticket number: ${ticket.ticket_number}`,
                //     ]);
                //     continue;
                // }
                const rs_id = ticket.repairshopr_job_id?.trim()
                const secondSystemData = await axios.get(
                    `https://allelectronics.repairshopr.com/api/v1/tickets/${rs_id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                        },
                    }
                );
                // console.log("secondSystemData", secondSystemData)
                await processAndUpdateTicket(ticket, secondSystemData.data?.ticket);
                setProcessedTickets((prevSet) => new Set(prevSet).add(ticket.ticket_number));
                await new Promise((resolve) => setTimeout(resolve, 10000)); // 1-second delay
            }

            setLogs((prevLogs) => [...prevLogs, "All tickets processed."]);
        } catch (error) {
            setLogs((prevLogs) => [...prevLogs, "Error fetching tickets."]);
        } finally {
            setIsRunning(false);
        }
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const processAndUpdateTicket = async (ticket: any, secondSystemTicket: any) => {
        try {
            const prevAttachments = secondSystemTicket.attachments.map((att: any) => ({
                id: att?.id,
                file_name: att?.file_name,
                file: att?.file?.url,
                created: att?.created_at
            }));

            for (const img of prevAttachments) {
                const payload = {
                    task_id: ticket?.id,
                    image_url: img?.file,
                    created_at: moment(img.created_at).format("YYYY-MM-DD HH:mm:ss")
                };

                try {
                    await axios.post("http://localhost:8000/attachments", payload, {
                        withCredentials: true
                    });

                    setLogs(prevLogs => [
                        ...prevLogs,
                        `Uploaded image for ticket ${ticket.ticket_number}: ${img.file_name}`
                    ]);

                    await sleep(2000); // 2-second delay between images
                } catch (imgErr) {
                    setLogs(prevLogs => [
                        ...prevLogs,
                        `Failed to upload image for ticket ${ticket.ticket_number}: ${img.file_name}`
                    ]);
                }
            }

            setLogs(prevLogs => [
                ...prevLogs,
                `Completed ticket number: ${ticket.ticket_number}`
            ]);

        } catch (error) {
            setLogs(prevLogs => [
                ...prevLogs,
                `Error processing ticket number: ${ticket.ticket_number}`
            ]);
        }
    };


    return (
        <div>
            <h1>Ticket Updater</h1>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>
                        {log}
                    </li>
                ))}
            </ul>
        </div>
    )




};

export default TransferAttachmentsScreen;
