import { pool } from "../../../../db.js";
import "dotenv/config";
import * as Yup from "yup";

const AddHHPTaskSchema = Yup.object({
    service_order_no: Yup.string(),
    date_booked: Yup.string().required("This field is required"),
    model: Yup.string().required("This field is required"),
    warranty: Yup.string().required("This field is required"),
    engineer: Yup.string().required("This field is required"),
    fault: Yup.string().required("This field is required"),
    imei: Yup.string().required("This field is required"),
    serial_number: Yup.string().required("This field is required"),
    status: Yup.string().required("This field is required"),
    ticket_number: Yup.string().required("This field is required"),
    department: Yup.string().required("This field is required"),
    job_added_by: Yup.string().required("This field is required"),
    stores: Yup.string().required("This field is required"),
    repairshopr_job_id: Yup.string().required("This field is required"),
    repeat_repair: Yup.string().required("This field is required"),
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
    } = req.body;
    try {
        await AddHHPTaskSchema.validate(req.body, { abortEarly: false });
        const findIfExists = await pool.query(
            "SELECT id from technician_tasks WHERE ticket_number = $1",
            [ticket_number]
        );
        if (findIfExists.rows.length > 0) {
            return res.status(401).json({
                message: "Ticket already exists",
            });
        } else {
            const { rows } = await pool.query(
                "INSERT INTO technician_tasks (service_order_no, date_booked, model, warranty, engineer, fault, imei, serial_number, unit_status, ticket_number, department, job_added_by, stores, repairshopr_job_id, repeat_repair, parts_pending) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *",
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
                    true,
                ]
            );
            res.status(201).json({
                message: "HHP task created",
            });
        }
    } catch (error) {
        // to get error for a specific field
        const errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        res.status(500).json({ errors });
    }
};
export default AddHHPTask;
