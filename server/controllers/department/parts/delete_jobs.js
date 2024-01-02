import { pool } from "../../../db.js";

// Delete job by id
const DeleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = await pool.query(
      "DELETE FROM parts_department WHERE id = $1",
      [id]
    );
    if (res.status === 200 || res.status === 201) {
      res.send("Deleted successfully");
      res.send(deleteQuery.rows[0]);
    } else if (res.status === 404 || res.status === 405) {
      res.send("Failed to delete");
    }
  } catch (error) {
    // console.log(error);
  }
};

export default DeleteJob;
