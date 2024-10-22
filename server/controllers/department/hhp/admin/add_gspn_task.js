import "dotenv/config";
import * as Yup from "yup";
import { pool } from "../../../../db.js";
import createHHPGSPNTaskHistory from "../../../../hooks/useAddGSPNHistoryTask.js";

const hhpGSPNJobsSchema = Yup.object().shape({
    service_order: Yup.string()
        .min(10, "Service order is 10 digits!")
        .max(10, "Service order is 10 digits!"),
    date_booked: Yup.string(),
    model: Yup.string().required("Model number is required!"),
    warranty: Yup.string().required("Warranty is required!"),
    engineer: Yup.string().required("Engineer is required!"),
    fault: Yup.string(),
    imei: Yup.string(),
    serial_number: Yup.string().required("Serial number is required!"),
    repairshopr_status: Yup.string().required("Select status!"),
    gspn_status: Yup.string(),
    ticket_number: Yup.string().required("What is the ticket number?!"),
    department: Yup.string(),
    stores: Yup.string(),
    job_added_by: Yup.string()
        .email("Email is invalid!")
        .required("Email is required!"),
    repairshopr_job_id: Yup.string(),
});

// Post jobs to database
const AddGSPNTask = async (req, res) => {
    const {
        service_order,
        date_booked,
        created_at,
        model,
        warranty,
        engineer,
        fault,
        imei,
        serial_number,
        repairshopr_status,
        gspn_status,
        ticket_number,
        department,
        job_added_by,
        parts_pending_date,
        parts_issued_date,
        parts_pending,
        stores,
        parts_ordered_date,
        qc_complete,
        qc_complete_date,
        repair_completed,
        repairshopr_job_id,
    } = req.body;

    try {
        await hhpGSPNJobsSchema.validate(req.body, { abortEarly: false });
        const payload = [
            service_order,
            date_booked,
            created_at,
            model,
            warranty,
            engineer,
            fault,
            imei,
            serial_number,
            repairshopr_status,
            gspn_status,
            ticket_number,
            department,
            job_added_by,
            parts_pending_date,
            parts_issued_date,
            parts_pending,
            stores,
            parts_ordered_date,
            qc_complete,
            qc_complete_date,
            repair_completed,
            repairshopr_job_id,
        ];
        const findIfExists = await pool.query(
            "SELECT service_order_no from hhp_jobs WHERE service_order_no = $1 OR ticket_number = $2 LIMIT 1",
            [service_order, ticket_number]
        );
        if (findIfExists.rows.length > 0) {
            await createHHPGSPNTaskHistory(payload);
            // Checking the ticket input as it is the one where user puts in info
            return res
                .status(401)
                .send({ message: "This task already exists!" });
        } else {
            await pool.query(
                "INSERT INTO hhp_jobs (service_order_no, date_booked, created_at, model, warranty, engineer, fault, imei, serial_number, repairshopr_status, gspn_status, ticket_number, department, job_added_by, parts_pending_date, parts_issued_date, parts_pending, stores, parts_ordered_date, qc_complete, qc_complete_date, repair_completed, repairshopr_job_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) returning *",
                payload
            );
            await createHHPGSPNTaskHistory(payload);

            res.status(201).json({ message: "Successfully created!" });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export default AddGSPNTask;
