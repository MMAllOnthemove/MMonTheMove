import { pool } from "../../../../db.js";

// Delete job by id
const DeleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = await pool.query(
      "DELETE FROM driver_jobs WHERE id = $1",
      [id]
    );
    res.status(200).json("Job deleted");
  } catch (error) {}
};
export default DeleteTaskById;
