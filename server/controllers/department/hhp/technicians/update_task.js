import "dotenv/config";
import { pool } from "./../../../../db.js";

// Update job by id

const UpdateTask = async (req, res) => {
    try {
        const {
            assessment_date,
            parts_pending_date,
            parts_issued_date,
            parts_pending,
            repairshopr_status,
            serviceOrder,
            qc_complete,
            qc_date,
            taskId,
        } = req.body;
        const editQuery = await pool.query(
            "UPDATE hhp_jobs SET assessment_date = $1, parts_pending_date = $2, parts_issued_date = $3, parts_pending = $4, repairshopr_status = $5, service_order_no = $6, qc_complete = $7, qc_date = $8  WHERE unique_id = $9 returning *",
            [
                assessment_date,
                parts_pending_date,
                parts_issued_date,
                parts_pending,
                repairshopr_status,
                serviceOrder,
                qc_complete,
                qc_date,
                taskId,
            ]
        );
        res.status(201).json({ message: "Succesfully updated!" });
    } catch (error) {
        console.log("update task error backend", error);
    }
};

export default UpdateTask;
// export { UpdateJob, UpdateJobclaimsGSPNStatus };
