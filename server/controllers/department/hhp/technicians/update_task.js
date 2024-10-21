import { pool } from "./../../../../db.js";
import cron from "node-cron";
import "dotenv/config";
import axios from "axios";
import createHHPGSPNTaskHistory from "../../../../hooks/useAddGSPNHistoryTask.js";

// Update job by id

const UpdateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            assessment_date,
            parts_pending_date,
            parts_issued_date,
            parts_pending,
        } = req.body;
        const editQuery = await pool.query(
            "UPDATE hhp_jobs SET assessment_date = $1, parts_pending_date = $2, parts_issued_date = $3, parts_pending = $4 WHERE unique_id = $5 returning *",
            [
                assessment_date,
                parts_pending_date,
                parts_issued_date,
                parts_pending,
                id,
            ]
        );
        res.status(201).json({ message: "Succesfully updated!" });
    } catch (error) {
        console.log("update task error backend", error);
    }
};

export default UpdateTask;
// export { UpdateJob, UpdateJobclaimsGSPNStatus };
