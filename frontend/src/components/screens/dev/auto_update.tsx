// "use client"
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import useHHPTasks from "@/hooks/useHHPTasks";
// import moment from "moment";
// import useUpdateHHPTask from "@/hooks/updateHHPTask";

// const TicketUpdaterScreen: React.FC = () => {
//     const [tickets, setTickets] = useState<any[]>([]);
//     const [logs, setLogs] = useState<string[]>([]);
//     const { hhpTasks, hhpTasksLoading } = useHHPTasks()
//     const { updateHHPTask, updateHHPTaskLoading } = useUpdateHHPTask()
//     const [isRunning, setIsRunning] = useState(false);
//     useEffect(() => {

//         const interval = setInterval(() => {
//             fetchAndUpdateTickets();
//         }, 3000);

//         return () => clearInterval(interval); // Cleanup on component unmount

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const fetchAndUpdateTickets = async () => {
//         try {


//             const { data } = await axios.get(
//                 `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs`,
//                 {
//                     withCredentials: true,
//                 }
//             );
//             for (const ticket of data) {
//                 if (ticket.ticket_number.toString().length < 6) {
//                     setLogs((prevLogs) => [...prevLogs, `Skipping ticket number: ${ticket.ticket_number} (Invalid ticket number)`]);
//                     continue;
//                 }
//                 const secondSystemData = await axios.get(
//                     `https://allelectronics.repairshopr.com/api/v1/tickets?query=${ticket?.ticket_number}`,
//                     {
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
//                         },
//                     }
//                 );

//                 await processAndUpdateTicket(ticket, secondSystemData.data?.tickets[0]);
//                 await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
//             }
//         } catch (error) {
//             console.error("Error fetching tickets:", error);
//             setLogs((prevLogs) => [...prevLogs, "Error fetching tickets."]);
//         }
//     };

//     const processAndUpdateTicket = async (ticket: any, secondSystemTicket: any) => {
//         try {
//             const serviceOrderNumber = secondSystemTicket.properties['Service Order.']?.trim();
//             const changes = {
//                 'service_order_no': serviceOrderNumber,
//                 engineer: secondSystemTicket.user?.full_name,
//                 warranty: secondSystemTicket.ticket_type_name.includes("In Warranty") ? "IW" : "OOW",
//                 date_booked: moment(secondSystemTicket.created_at).format("YYYY-MM-DD HH:mm:ss"),
//                 unit_status: ticket.unit_status === secondSystemTicket.status ? ticket.unit_status : secondSystemTicket.status,
//                 qc_complete: secondSystemTicket.comments.some((comment: any) =>
//                     comment.body.toLowerCase().includes("qc pass")
//                 )
//                     ? "Pass"
//                     : "",
//                 qc_date: secondSystemTicket.comments
//                     .filter((comment: any) => comment.body.toLowerCase().includes("qc pass"))
//                     .map((comment: any) => moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss"))[0] || '',
//                 unit_complete: secondSystemTicket.comments.some((comment: any) =>
//                     comment.body.toLowerCase().includes("qc pass") ? true : false
//                 ),
//                 completed_date: secondSystemTicket.comments
//                     .filter((comment: any) => comment.body.toLowerCase().includes("qc pass"))
//                     .map((comment: any) => moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss"))[0] || '',
//             };
//             // Compare changes before updating
//             if (
//                 serviceOrderNumber !==
//                 changes.service_order_no ||
//                 ticket.engineer !== changes.engineer ||
//                 ticket.warranty !== changes.warranty ||
//                 ticket.date_booked !== changes.date_booked ||
//                 ticket.unit_status !== changes.unit_status ||
//                 ticket.qc_complete !== changes.qc_complete ||
//                 ticket.qc_date !== changes.qc_date ||
//                 ticket.unit_complete !== changes.unit_complete ||
//                 ticket.completed_date !== changes.completed_date
//             ) {
//                 await updateHHPTask(ticket.id, changes);
//                 setLogs((prevLogs) => [...prevLogs, `Updated ticket number: ${ticket.ticket_number}`]);
//             }
//             else {
//                 setLogs((prevLogs) => [...prevLogs, `No changes for ticket number: ${ticket.ticket_number}`]);
//             }
//             setLogs((prevLogs) => [...prevLogs, `Updated ticket number: ${ticket.ticket_number}`]);
//         } catch (error) {
//             console.error("Error updating ticket:", error);
//             setLogs((prevLogs) => [...prevLogs, `Error updating ticket number: ${ticket.ticket_number}`]);
//         }
//     };

//     return (
//         <div>
//             <h1>Ticket Updater</h1>
//             {/* <p>Total {hhpTasks?.length}</p> */}
//             <ul>
//                 {logs.map((log, index) => (
//                     <li key={index}>{index + 1}. {log}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TicketUpdaterScreen;
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useHHPTasks from "@/hooks/useHHPTasks";
import moment from "moment";
import useUpdateHHPTask from "@/hooks/updateHHPTask";
import useAddTaskCommentLocally from "@/hooks/useAddCommentLocally";

const TicketUpdaterScreen: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [processedTickets, setProcessedTickets] = useState<Set<string>>(new Set());
    const { hhpTasks } = useHHPTasks();
    const { addCommentLocally, addCommentLoading, addCommentErrors } = useAddTaskCommentLocally()
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

            const filtered = tickets?.filter((x) => x.rs_warranty === null)
            // const filtered = tickets?.filter((x: any) => x.stores === 'HHP (Robtronics)' && x.unit_status !== 'Resolved')
            // const filtered = tickets?.filter((x) => x.id === '1397')

            for (const ticket of filtered) {
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

            // Extract comments from the second system
            const newComments = secondSystemTicket.comments
                .map((comment: any) => ({
                    body: comment.body,
                    tech: comment.tech,
                    created_at: moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss"),
                }));

            // Add comments locally if there are new ones
            // for (const comment of newComments) {

            //     const payload = {
            //         "task_id": ticket.id,
            //         "comment": '*' + comment?.body,
            //         "created_at": comment?.created_at,
            //         "created_by": comment?.tech,
            //     }
            //     await addCommentLocally(payload);
            //     setLogs((prevLogs) => [
            //         ...prevLogs,
            //         `Added comment to ticket number: ${ticket.ticket_number}`,
            //     ]);
            // }

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
                accessories_and_condition: accessories_and_condition,
                requires_backup: requires_backup,
                rs_warranty: rs_warranty
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
                ticket.qc_date !== changes.qc_date ||
                ticket.unit_complete !== changes.unit_complete ||
                ticket.completed_date !== changes.completed_date ||
                ticket.accessories_and_condition != changes.accessories_and_condition ||
                ticket.requires_backup != changes.requires_backup ||
                ticket.rs_warranty != changes.rs_warranty


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
    );
};

export default TicketUpdaterScreen;
