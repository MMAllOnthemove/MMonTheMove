import "dotenv/config";
import * as Yup from "yup";
import { pool } from "../../../../db.js";
import appLogs from "../../../logs/logs.js";
import emitBinStatsUpdate from "../bin_dashboard/emit_bin_updates.js";

const AddHHPTaskSchema = Yup.object({
    service_order_no: Yup.string(),
    date_booked: Yup.string().required("Date booked required"),
    model: Yup.string().required("Model is required"),
    warranty: Yup.string().required("Warranty is required"),
    engineer: Yup.string(),
    repairshopr_customer_id: Yup.string(),
    fault: Yup.string().required("Fault is required"),
    imei: Yup.string().required("IMEI is required"),
    serial_number: Yup.string().required("Serial number is required"),
    status: Yup.string().required("Status is required"),
    ticket_number: Yup.string().required("Ticket number is required"),
    department: Yup.string().required("Department is required"),
    job_added_by: Yup.string().required("Please log in"),
    additional_info: Yup.string(),
    stores: Yup.string().required("Select service type"),
    repairshopr_job_id: Yup.string().required("Repairshopr job id is missing"),
    repeat_repair: Yup.string().required("Is it a repeat repair?"),
    units_assessed: Yup.boolean(),
});

// Post repair jobs
const AddHHPTask = async (req, res) => {
    const {
        service_order_no,
        date_booked,
        model,
        warranty,
        engineer,
        fault,
        imei,
        serial_number,
        status,
        ticket_number,
        department,
        job_added_by,
        stores,
        repairshopr_job_id,
        repeat_repair,
        created_at,
        additional_info,
        repairshopr_customer_id,
        job_repair_no,
        accessories_and_condition,
        requires_backup,
        rs_warranty,
        ticket_type_id,
        created_by,
    } = req.body;

    try {
        await AddHHPTaskSchema.validate(req.body, { abortEarly: false });
        const findIfExists = await pool.query(
            "SELECT 1 from technician_tasks WHERE ticket_number = $1 limit 1",
            [ticket_number]
        );
        const returnDataWithNewRow =
            "SELECT tt.*, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('comment_id', ttc.id, 'comment_text', ttc.comment, 'comment_created_at', ttc.created_at, 'created_by', ttc.created_by) ORDER BY ttc.created_at DESC) FILTER (WHERE ttc.id IS NOT NULL), '[]') AS comments, COALESCE(JSON_AGG(JSON_BUILD_OBJECT('part_id', p.id, 'unique_id', p.unique_id, 'ticket_number', p.ticket_number, 'part_name', p.part_name, 'part_desc', p.part_desc, 'seal_number', p.seal_number, 'part_quantity', p.part_quantity, 'parts_status', p.parts_status, 'created_at', p.created_at, 'created_by', p.created_by, 'updated_at', p.updated_at, 'compensation', p.compensation) ORDER BY p.created_at DESC) FILTER (WHERE p.id IS NOT NULL), '[]') AS parts, COALESCE(d.marketing_name, '') AS phone_name FROM technician_tasks tt LEFT JOIN technician_tasks_comments ttc ON tt.id = ttc.task_id LEFT JOIN devices d ON LEFT(tt.model, 8) = LEFT(d.device_model, 8) AND d.company = 'Samsung' LEFT JOIN parts_for_tasks p ON tt.id = p.task_row_id WHERE tt.department LIKE '%HHP%' AND tt.id = $1 GROUP BY tt.id, d.marketing_name ORDER BY tt.date_booked DESC";
        if (findIfExists.rows.length > 0) {
            return res.status(409).json({
                message: "Ticket already exists",
            });
        } else {
            const { rows } = await pool.query(
                "INSERT INTO technician_tasks (service_order_no, date_booked, model, warranty, engineer, fault, imei, serial_number, unit_status, ticket_number, department, job_added_by, stores, repairshopr_job_id, repeat_repair, created_at, additional_info, repairshopr_customer_id, job_repair_no, accessories_and_condition, requires_backup, rs_warranty, ticket_type_id, created_by) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) returning id",
                [
                    service_order_no,
                    date_booked,
                    model,
                    warranty,
                    engineer,
                    fault,
                    imei,
                    serial_number,
                    status,
                    ticket_number,
                    department,
                    job_added_by,
                    stores,
                    repairshopr_job_id,
                    repeat_repair,
                    created_at,
                    additional_info,
                    repairshopr_customer_id,
                    job_repair_no,
                    accessories_and_condition,
                    requires_backup,
                    rs_warranty,
                    ticket_type_id,
                    created_by,
                ]
            );

            const fetchResult = await pool.query(returnDataWithNewRow, [
                rows[0].id,
            ]);
            await appLogs("INSERT", job_added_by, req.body);
            // io.emit("addTask", rows[0]); // Notify clients about task addition
            await emitBinStatsUpdate(); // Call bin stats update function
        
            return res.status(201).json({
                message: "HHP task created",
                task: fetchResult.rows[0],
            });
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
export default AddHHPTask;
