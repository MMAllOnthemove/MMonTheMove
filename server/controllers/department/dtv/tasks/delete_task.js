import { pool } from "../../../../db.js";

// Delete job by id
const DeleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("req.params delete id", id);
    const deleteQuery = await pool.query(
      "DELETE FROM driver_jobs WHERE id = $1",
      [id]
    );
    res.status(200).json("Job deleted");
    console.log("deleteQuery", deleteQuery);
  } catch (error) {
    console.log("server job delete", error);
  }
};
export default DeleteTaskById;
