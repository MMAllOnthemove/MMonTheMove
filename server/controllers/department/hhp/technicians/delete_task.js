import { pool } from "../../../../db.js";

const deleteHHPTask = async (req, res) => {
    const { id } = req.params;

    if (!id) return;
    try {
        const { rows } = await pool.query(
            "DELETE FROM technician_tasks WHERE id = $1 returning *",
            [id]
        );
        res.status(204).json({ message: "Successfully deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default deleteHHPTask;