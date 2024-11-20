import { pool } from "../../db.js";

const deleteStore = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            "DELETE FROM stores WHERE unique_id = $1",
            [id]
        );
        return res.status(201).json({ message: "Successfully deleted!" });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

export default deleteStore;
