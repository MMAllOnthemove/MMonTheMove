import { pool } from "../../../../db.js";

const UpdateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { isJobComplete, jobComment, updatedByWho, dateUpdated } = req.body;
    const { rows } = await pool.query(
      "UPDATE driver_jobs SET job_status = $1, updated_by = $2, job_comment = $3, updated_at = $4  WHERE id = $5 returning *",
      [isJobComplete, updatedByWho, jobComment, dateUpdated, id]
    );
    res.json(rows);
  } catch (error) {}
};
export default UpdateTaskById;
