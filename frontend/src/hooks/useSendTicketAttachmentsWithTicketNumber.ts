import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const useSendTicketAttachmentsWithTicketNumber = async (
    ticketNumber: string | number,
    ticketFiles: any[],
    repairshopr_job_id: string | number,
    subdomain: string
) => {
    try {
        const formData = new FormData();
        ticketFiles.forEach((file) => formData.append("files", file));
        formData.append("ticket_number", `${ticketNumber}`);

        const response = await axios.post(
            // `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/dtv_ha/files/ticket_attachments`,
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}${subdomain}`,
            formData,
            {
                withCredentials: true,
            }
        );

        const { data } = response;
        if (data) {
            toast.success(`${data?.message}`);
            const fileUrls = data.fileUrls;
            const repairshoprPayload = {
                files: fileUrls.map((url: any) => ({
                    url,
                    filename: url.split("/").pop(),
                })),
            };

            await axios.post(
                `${process.env.NEXT_PUBLIC_REPAIRSHOPR_ATTACHMENTS}/${repairshopr_job_id}/attach_file_url`,
                repairshoprPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );

            return fileUrls;
        }
    } catch (error) {
        console.error("add ticket attachments error", error);
    }
};

export default useSendTicketAttachmentsWithTicketNumber;
