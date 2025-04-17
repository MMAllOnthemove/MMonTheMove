import axios from "axios";
import "dotenv/config";

const createTicketOnRepairshopr = async (
    customerId,
    issue_type,
    subject,
    ticket_type_id,
    repairshopr_id,
    serviceOrderNumber,
    itemCondition,
    requires_backup,
    adh,
    imei,
    job_repair_no,
    specialRequirement,
    password,
    assetId,
    created_by,
    warrantyCode
) => {
    const payload = {
        customer_id: customerId, // only need this for creating a ticket on rs, stored in the client local storage
        problem_type: `${issue_type}`, // Will aways be HHP for handheld devices, no need to choose
        subject: subject,
        status: "New", //  will always be 'New' for a recently created ticket
        ticket_type_id: `${ticket_type_id}`,
        user_id: `${repairshopr_id}`,
        properties: {
            "Service Order No.": serviceOrderNumber,
            "Service Order No. ": serviceOrderNumber,
            "Item Condition ": itemCondition,
            "Item Condition": itemCondition,
            "Backup Requires": requires_backup,
            "Backup Requires ": requires_backup,
            "Warranty ":
                adh === "ADH" && ticket_type_id === "21877"
                    ? "75132"
                    : warrantyCode, // ADH RS code
            Warranty:
                adh === "ADH" && ticket_type_id === "21877"
                    ? "75132"
                    : warrantyCode, // ADH RS code
            IMEI: `${imei}`,
            "Job Repair No.": job_repair_no,
            "Job Repair No.:": job_repair_no,
            "Special Requirement": specialRequirement,
            "Special Requirement ": specialRequirement,
            Password: `${password}`,
            "Location (BIN)": "",
        },
        asset_ids: assetId,
        comments_attributes: [
            {
                subject: "Initial Issue",
                body: `${subject}${
                    specialRequirement ? `\n\n${specialRequirement}` : ""
                }`,
                hidden: false,
                do_not_email: true,
                tech: created_by,
            },
        ],
    };

    try {
        const response = await axios.post(
            `https://allelectronics.repairshopr.com/api/v1/tickets`,
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                },
            }
        );

        return response;
    } catch (error) {
        console.log("rs error", error);
    }
};
export default createTicketOnRepairshopr;
