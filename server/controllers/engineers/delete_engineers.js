import { pool } from "../../db.js";

const deleteEngineers = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            "DELETE FROM engineers WHERE unique_id = $1",
            [id]
        );
        return res.status(200).json({ message: "Successfully deleted!" });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

export default deleteEngineers;
