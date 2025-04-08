
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useHHPTasks from "@/hooks/useHHPTasks";
import moment from "moment";
import useUpdateHHPTask from "@/hooks/updateHHPTask";
import useAddTaskCommentLocally from "@/hooks/useAddCommentLocally";
import useAddCommentsLocally from "@/hooks/useCommentsLocally";

const TicketUpdaterScreen: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [processedTickets, setProcessedTickets] = useState<Set<string>>(new Set());
    const { hhpTasks } = useHHPTasks();
    const { addCommentLocally, addCommentLoading, addCommentErrors } = useAddCommentsLocally()
    const { updateHHPTask } = useUpdateHHPTask();
    const [isRunning, setIsRunning] = useState(false);

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

            const filtered = tickets?.filter((x) => x.ticket_number == '1269029 ')
            // const filtered = tickets?.filter((x: any) => x.stores === 'HHP (Robtronics)' && x.unit_status !== 'Resolved')
            // const filtered = tickets?.filter((x: any) => x.created_by === null)

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

                const secondSystemData = await axios.get(
                    `https://allelectronics.repairshopr.com/api/v1/tickets?query=${ticket.ticket_number}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                        },
                    }
                );

                await processAndUpdateTicket(ticket, secondSystemData.data?.tickets[0]);
                setProcessedTickets((prevSet) => new Set(prevSet).add(ticket.ticket_number));
                await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
            }

            setLogs((prevLogs) => [...prevLogs, "All tickets processed."]);
        } catch (error) {
            setLogs((prevLogs) => [...prevLogs, "Error fetching tickets."]);
        } finally {
            setIsRunning(false);
        }
    };

    const processAndUpdateTicket = async (ticket: any, secondSystemTicket: any) => {
        try {
            const serviceOrderNumber = secondSystemTicket.properties["Service Order No. "]?.trim();
            const location = secondSystemTicket.properties["Location (BIN)"]?.trim();
            const additional_info = secondSystemTicket.properties["Special Requirement "]?.trim();
            const job_repair_no = secondSystemTicket.properties["Job Repair No.:"]?.trim();
            const accessories_and_condition = secondSystemTicket.properties["Item Condition "]?.trim();
            const requires_backup = secondSystemTicket.properties["Backup Requires"]?.trim();
            const rs_warranty = secondSystemTicket.properties["Warranty"]?.trim();
            const ticket_type_id = secondSystemTicket.ticket_type_id

            // Extract comments from the second system
            const newComments = secondSystemTicket.comments
                .map((comment: any) => ({
                    body: comment.body,
                    tech: comment.tech,
                    created_at: moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss"),
                }));

            // Add comments locally if there are new ones
            for (const comment of newComments) {

                const payload = {
                    "task_id": ticket.id,
                    "comment": '*' + comment?.body,
                    "created_at": comment?.created_at,
                    "created_by": comment?.tech,
                }
                await addCommentLocally(payload);
                setLogs((prevLogs) => [
                    ...prevLogs,
                    `Added comment to ticket number: ${ticket.ticket_number}`,
                ]);
            }
            const assigned = ["unit given", "unit assigned to"]
            const qc_fail = secondSystemTicket.comments.some((comment: any) =>
                comment.body.toLowerCase().includes("qc fail")
            )
                ? "Fail"
                : ""
            const qc_fail_date = secondSystemTicket.comments
                .filter((comment: any) =>
                    comment.body.toLowerCase().includes("qc fail")
                )
                .map((comment: any) =>
                    moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss")
                )[0] || "";



            // update comments
            const changes = {
                service_order_no: serviceOrderNumber,
                repairshopr_customer_id: secondSystemTicket?.customer_id,
                engineer: secondSystemTicket.user?.full_name,
                warranty: secondSystemTicket.ticket_type_name === "In Warranty"
                    ? "IW"
                    : "OOW",
                date_booked: moment(secondSystemTicket.created_at).format("YYYY-MM-DD HH:mm:ss"),
                additional_info: additional_info,
                device_location: location,
                job_repair_no: job_repair_no,
                unit_status: ticket.unit_status === secondSystemTicket.status
                    ? ticket.unit_status
                    : secondSystemTicket.status,
                qc_complete: secondSystemTicket.comments.some((comment: any) =>
                    comment.body.toLowerCase().includes("qc pass")
                )
                    ? "Pass"
                    : "",
                qc_date:
                    secondSystemTicket.comments
                        .filter((comment: any) =>
                            comment.body.toLowerCase().includes("qc pass")
                        )
                        .map((comment: any) =>
                            moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss")
                        )[0] || "",
                qc_fail: qc_fail,
                qc_fail_date: qc_fail_date,
                parts_ordered: secondSystemTicket.comments.some((comment: any) =>
                    comment.body.toLowerCase().includes("parts added")
                )
                    && true,
                parts_ordered_date:
                    secondSystemTicket.comments
                        .filter((comment: any) =>
                            comment.body.toLowerCase().includes("parts added")
                        )
                        .map((comment: any) =>
                            moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss")
                        )[0] || "",
                parts_issued: secondSystemTicket.comments.some((comment: any) =>
                    comment.body.toLowerCase().includes("parts issued")
                )
                    && true,
                parts_issued_date:
                    secondSystemTicket.comments
                        .filter((comment: any) =>
                            comment.body.toLowerCase().includes("parts issued")
                        )
                        .map((comment: any) =>
                            moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss")
                        )[0] || "",
                unit_complete: secondSystemTicket.comments.some((comment: any) =>
                    comment.body.toLowerCase().includes("qc pass")
                ),
                completed_date:
                    secondSystemTicket.comments
                        .filter((comment: any) =>
                            comment.body.toLowerCase().includes("qc pass")
                        )
                        .map((comment: any) =>
                            moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss")
                        )[0] || "",
                assigned_date:
                    secondSystemTicket.comments
                        .filter((comment: any) =>
                            comment.body.toLowerCase().includes(assigned)
                        )
                        .map((comment: any) =>
                            moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss")
                        )[0] || "",
                accessories_and_condition: accessories_and_condition,
                requires_backup: requires_backup,
                rs_warranty: rs_warranty,
                ticket_type_id: ticket_type_id,
                created_by: secondSystemTicket.comments.filter((x: string | undefined | any) => x.subject === "Initial Issue").map((x: string | undefined | any) => x.tech)[0]
            };


            // Compare changes before updating
            if (
                serviceOrderNumber !== changes.service_order_no ||
                ticket.engineer !== changes.engineer ||
                ticket.warranty !== changes.warranty ||
                location !== changes.device_location ||
                job_repair_no !== changes.job_repair_no ||
                ticket.date_booked !== changes.date_booked ||
                ticket.additional_info !== changes.additional_info ||
                ticket.unit_status !== changes.unit_status ||
                ticket.qc_complete !== changes.qc_complete ||
                ticket.qc_fail !== changes.qc_fail ||
                ticket.qc_date !== changes.qc_date ||
                ticket.qc_fail_date !== changes.qc_fail_date ||
                ticket.unit_complete !== changes.unit_complete ||
                ticket.completed_date !== changes.completed_date ||
                ticket.accessories_and_condition != changes.accessories_and_condition ||
                ticket.requires_backup != changes.requires_backup ||
                ticket.rs_warranty != changes.rs_warranty ||
                ticket.created_by !== changes.created_by ||
                ticket_type_id || ticket.parts_ordered !== changes.parts_ordered || ticket.parts_ordered_date !== changes.parts_ordered_date || ticket.warranty !== changes.warranty || ticket.assigned_date !== changes.assigned_date

            ) {
                await updateHHPTask(ticket.id, changes);
                setLogs((prevLogs) => [
                    ...prevLogs,
                    `Updated ticket number: ${ticket.ticket_number}`,
                ]);
            } else {
                setLogs((prevLogs) => [
                    ...prevLogs,
                    `No changes for ticket number: ${ticket.ticket_number}`,
                ]);
            }
        } catch (error) {
            setLogs((prevLogs) => [
                ...prevLogs,
                `Error updating ticket number: ${ticket.ticket_number}`,
            ]);
        }
    };
    // return null;
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

export default TicketUpdaterScreen;
