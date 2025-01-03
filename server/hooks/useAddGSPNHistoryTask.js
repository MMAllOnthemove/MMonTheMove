import axios from "axios";
import { pool } from "../db.js";

const createHHPGSPNTaskHistory = async (payload) => {
    try {
        const { rows } = await pool.query(
            "INSERT INTO technician_tasks_history (service_order_no, date_booked, created_at, model, warranty, engineer, fault, imei, serial_number, repairshopr_status, gspn_status, ticket_number, department, job_added_by, parts_pending_date, parts_issued_date, parts_pending, stores, parts_ordered_date, qc_complete, qc_complete_date, repair_completed, repairshopr_job_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) returning *",
            payload
        );
    } catch (error) {
        // throw error;
    }
};

export default createHHPGSPNTaskHistory;
