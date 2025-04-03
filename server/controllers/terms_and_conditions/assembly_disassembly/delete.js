import { pool } from "../../../db.js";

const deleteAssemblyTerm = async (req, res) => {
    const { id } = req.params;

    if (!id) return;
    try {
        const { rows } = await pool.query(
            "DELETE FROM assembly_terms WHERE id = $1 returning *",
            [id]
        );
        return res.status(200).json({ message: "Successfully deleted!" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default deleteAssemblyTerm;
