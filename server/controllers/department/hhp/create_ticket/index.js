import "dotenv/config";
import * as Yup from "yup";
import { pool } from "../../../../db.js";
import createTicketOnRepairshopr from "./add_to_repairshopr.js";
import { datetimestamp } from "../../../../utils/datetimestamp.js";
import appLogs from "../../../logs/logs.js";
import "dotenv/config";

const verifyCreateTicketData = Yup.object({
    service_order_no: Yup.string(),
    model: Yup.string().required("Please enter the model"),
    warranty: Yup.string().required("Please select a warranty option"),
    // fault: Yup.string().required("Please describe the fault"),
    fault: Yup.string()
        .required("Please describe the fault")
        .test("not-only-asterisks", "Please select the fault", (value) => {
            if (!value) return false;
            // Remove all asterisks and whitespace, then check if anything meaningful remains
            return value.replace(/\*/g, "").trim().length > 0;
        }),
    imei: Yup.string().required("IMEI number is required"),
    serial_number: Yup.string().required("Serial number is required"),

    unit_status: Yup.string(), // always 'new'
    department: Yup.string(), // always 'HHP'

    job_added_by: Yup.string().required("You're not logged in"),
    issue_type: Yup.string().required(
        "Please select the service or issue type"
    ),
    accessories_and_condition: Yup.string().required(
        "Please list the item condition and any accessories"
    ),

    additional_info: Yup.string(),
    job_repair_no: Yup.string(),
    date_booked: Yup.string(),

    requires_backup: Yup.string().required(
        "Please indicate if backup is needed"
    ),
});

// first get data from the client
// verify no errors if errors, send them to the client
// if errors do not create an entry
// send the verified data and create an entry
// then send the data from there to repairshopr
// on success
// get the result from there and update the created entry locally
// send the success message
// this will make sure data is filtered, verified and not lost
const returnDataWithNewRow =
    "SELECT tt.*, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('comment_id', ttc.id, 'comment_text', ttc.comment, 'comment_created_at', ttc.created_at, 'created_by', ttc.created_by) ORDER BY ttc.created_at DESC) FILTER (WHERE ttc.id IS NOT NULL), '[]') AS comments, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('part_id', p.id, 'unique_id', p.unique_id, 'ticket_number', p.ticket_number, 'part_name', p.part_name, 'part_desc', p.part_desc, 'seal_number', p.seal_number, 'part_quantity', p.part_quantity, 'parts_status', p.parts_status, 'created_at', p.created_at, 'created_by', p.created_by, 'updated_at', p.updated_at, 'compensation', p.compensation) ORDER BY p.created_at DESC) FILTER (WHERE p.id IS NOT NULL), '[]') AS parts, COALESCE(d.marketing_name, '') AS phone_name FROM technician_tasks tt LEFT JOIN technician_tasks_comments ttc ON tt.id = ttc.task_id LEFT JOIN devices d ON LEFT(tt.model, 8) = LEFT(d.device_model, 8) AND d.company = 'Samsung' LEFT JOIN parts_for_tasks p ON tt.id = p.task_row_id WHERE tt.department LIKE '%HHP%' AND tt.id = $1 GROUP BY tt.id, d.marketing_name ORDER BY tt.date_booked DESC";
const insertQuery = `
        insert into technician_tasks 
        (
        service_order_no,
        model,
        warranty,
        imei,
        serial_number,
        unit_status,
        department,
        job_added_by,
        stores,
        accessories_and_condition,
        additional_info,
        job_repair_no,
        requires_backup,
        repairshopr_customer_id,
        fault,
        repeat_repair,
        ticket_type_id,
        created_by, 
        created_at, 
        date_booked)
        values
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        returning id
`;

const updateQuery = `
    update technician_tasks set 
    repairshopr_job_id = $1, 
    ticket_number = $2,
    rs_warranty = $3,
    repairshopr_asset_id = $4
    where id = $5
`;
const deleteQuery = `DELETE FROM technician_tasks WHERE id = $1`;
const insertCommentQuery = `INSERT INTO technician_tasks_comments (task_id, comment, created_at, created_by) VALUES ($1, $2, $3, $4) returning *`;
const bookingAgentTaskInsertQuery =
    "INSERT INTO booking_agents_tasks (ticket_number, created_by, booking_agent, created_at, original_ticket_date) VALUES ($1, $2, $3, $4, $5) returning *";

// Post repair jobs
const createHHPTicket = async (req, res) => {
    const {
        service_order_no,
        model,
        warranty,
        imei,
        serial_number,
        unit_status,
        department,
        job_added_by,
        stores,
        accessories_and_condition,
        additional_info,
        job_repair_no,
        requires_backup,
        repairshopr_customer_id, // on update
        fault,
        repairshopr_job_id, // on update
        repeat_repair,
        ticket_number, // on update
        rs_warranty, // on update
        ticket_type_id,
        repairshopr_asset_id, // on update
        repairshopr_id, // this is the user id rs uses
        adh,
        password,
        assetId, // since users will have this stored in local storage on the client
        created_by,
        warrantyCode, // used in rs
        issue_type, // used in rs
    } = req.body;
    const created_at = datetimestamp;

    try {
        await verifyCreateTicketData.validate(req.body, { abortEarly: false });
        // insert data locally first
        const { rows } = await pool.query(insertQuery, [
            service_order_no,
            model,
            warranty,
            imei,
            serial_number,
            unit_status,
            department,
            job_added_by,
            stores,
            accessories_and_condition,
            additional_info,
            job_repair_no,
            requires_backup,
            repairshopr_customer_id,
            fault,
            repeat_repair,
            ticket_type_id,
            created_by,
            created_at,
            created_at,
        ]);

        const insertedId = rows[0]?.id;
        await appLogs("INSERT", job_added_by, req.body);
        // then update the row with the data from the data from repairshopr, thereby ensuring clean data with no errors
        const rs_response = await createTicketOnRepairshopr(
            repairshopr_customer_id,
            issue_type,
            fault,
            ticket_type_id,
            repairshopr_id,
            service_order_no,
            accessories_and_condition,
            requires_backup,
            adh,
            imei,
            job_repair_no,
            additional_info,
            password,
            assetId,
            created_by,
            warrantyCode
        );
        // now, get data from rs and update the recently created entry, we will use the id for this
        // check if the status from rs is 200 first
        // then send 201 from our local db
        if (rs_response?.status === 200) {
            const updateRow = await pool.query(updateQuery, [
                rs_response?.data?.ticket?.id,
                rs_response?.data?.ticket?.number,
                warrantyCode,
                rs_response?.data?.ticket?.asset_ids[0],
                insertedId,
            ]);
            await appLogs(
                "UPDATE",
                job_added_by,
                updateRow,
                rs_response?.data?.ticket?.number
            );
            const fetchResult = await pool.query(returnDataWithNewRow, [
                insertedId,
            ]);
            // insert an intial comment locally, that has the person who booked, the time and date, and the fault is the body (rs is handled)
            await pool.query(insertCommentQuery, [
                insertedId,
                fault,
                created_at,
                job_added_by,
            ]);

            // then lastly, add it to the booking agents' table for data reporting
            await pool.query(bookingAgentTaskInsertQuery, [
                rs_response?.data?.ticket?.number,
                job_added_by,
                created_by,
                created_at,
                created_at
            ]);
            return res.status(201).json({
                message: `Ticket created ${rs_response?.data?.ticket?.number}`,
                task: fetchResult.rows[0],
            });
        } else {
            // Something went wrong even if it didn't throw — delete entry
            await pool.query(deleteQuery, [insertedId]);
            return res
                .status(500)
                .json({ message: "Failed to create ticket in RepairShopr" });
        }
    } catch (error) {
        // Handle validation or other errors
        const errors = {};
        if (error.inner) {
            error.inner.forEach((err) => {
                errors[err.path] = err.message; // Collect field validation errors
            });
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export default createHHPTicket;
