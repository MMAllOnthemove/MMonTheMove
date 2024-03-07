import { pool } from "../../../db.js";

// Update job by id
// get job by id
const UpdateJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { dispatchAnalysis, inHouseStatus, dateModified, dispatchBy } =
      req.body;
    const editQuery = await pool.query(
      "UPDATE parts_department SET dispatch_analysis = $1, in_house_status = $2, job_modified_date = $3, modified_by_who = $4 WHERE id = $5 returning *",
      [dispatchAnalysis, inHouseStatus, dateModified, dispatchBy, id]
    );
    res.json(editQuery.rows);
  } catch (err) {}
};

export default UpdateJobById;
