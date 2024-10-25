import { pool } from "../../../../db.js";
import "dotenv/config";
import * as Yup from "yup";

const hhpRepairJobsSchema = Yup.object({
    service_order_no: Yup.string(),
    date_booked: Yup.string(),
    model: Yup.string(),
    warranty: Yup.string(),
    engineer: Yup.string(),
    fault: Yup.string(),
    imei: Yup.string(),
    serial_number: Yup.string(),
    status: Yup.string(),
    ticket_number: Yup.number(),
    department: Yup.string(),
    job_added_by: Yup.string(),
    stores: Yup.string(),
    repairshopr_job_id: Yup.string(),
    repeat_repair: Yup.boolean(),
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
        await hhpRepairJobsSchema.validate(req.body, { abortEarly: false });
        const findIfExists = await pool.query(
            "SELECT id from hhp_jobs WHERE ticket_number = $1",
            [ticket_number]
        );
        if (findIfExists.rows.length > 0) {
            res.status(400).json("Ticket already exists!");
        } else {
            const { rows } = await pool.query(
                "INSERT INTO hhp_jobs (service_order_no, date_booked, model, warranty, engineer, fault, imei, serial_number, unit_status, ticket_number, department, job_added_by, stores, repairshopr_job_id, repeat_repair, parts_pending) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *",
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
    } catch (err) {
        console.error("add hhp task failed:", err);

        // to get error for a specific field
        const errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        console.log("errors", errors);
        res.status(500).json({ errors });
    }
};
export default AddHHPTask;
