import { pool } from "../../../../db.js";
import "dotenv/config";
import * as Yup from "yup";

const AddDTVHATaskSchema = Yup.object({
    service_order_no: Yup.string(),
    date_booked: Yup.string().required("This field is required"),
    model: Yup.string().required("This field is required"),
    warranty: Yup.string().required("This field is required"),
    engineer: Yup.string(),
    fault: Yup.string().required("This field is required"),
    serial_number: Yup.string().required("This field is required"),
    status: Yup.string().required("This field is required"),
    ticket_number: Yup.string().required("This field is required"),
    department: Yup.string().required("This field is required"),
    job_added_by: Yup.string().required("This field is required"),
    stores: Yup.string().required("This field is required"),
    repairshopr_job_id: Yup.string().required("This field is required"),
    repeat_repair: Yup.string().required("This field is required"),
    units_assessed: Yup.boolean(),
});

// Post repair jobs
const AddDTVHATask = async (req, res) => {
    const {
        service_order_no,
        date_booked,
        model,
        warranty,
        engineer,
        fault,
        serial_number,
        status,
        ticket_number,
        department,
        job_added_by,
        stores,
        repairshopr_job_id,
        repeat_repair,
        created_at,
    } = req.body;

    try {
        await AddDTVHATaskSchema.validate(req.body, { abortEarly: false });
        const findIfExists = await pool.query(
            "SELECT id from technician_tasks WHERE ticket_number = $1",
            [ticket_number]
        );
        if (findIfExists.rows.length > 0) {
            return res.status(409).json({
                message: "Ticket already exists",
            });
        } else {
            const { rows } = await pool.query(
                "INSERT INTO technician_tasks (service_order_no, date_booked, model, warranty, engineer, fault, imei, serial_number, unit_status, ticket_number, department, job_added_by, stores, repairshopr_job_id, repeat_repair, created_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *",
                [
                    service_order_no,
                    date_booked,
                    model,
                    warranty,
                    engineer,
                    fault,
                    serial_number,
                    serial_number,
                    status,
                    ticket_number,
                    department,
                    job_added_by,
                    stores,
                    repairshopr_job_id,
                    repeat_repair,
                    created_at,
                ]
            );
            return res.status(201).json({
                message: "DTV/HA task created",
            });
        }
    } catch (error) {
        console.log(error);
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
export default AddDTVHATask;
