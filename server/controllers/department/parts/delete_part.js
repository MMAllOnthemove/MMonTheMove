import { pool } from "../../../db.js";

const deletePart = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            "DELETE FROM parts_for_tasks WHERE id = $1 returning *",
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "Part not found" });
        }
        // emitLatestPartsAdded();
        res.status(200).json({ message: "Successfully deleted!" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default deletePart;
