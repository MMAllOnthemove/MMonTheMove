import { pool } from "../../../db.js";

export const UpdateAssemblyTerm = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed in the URL
    const { term } = req.body; // Get the changed fields from the frontend
    if (!id) return;
    try {
        const query = await pool.query(
            "UPDATE assembly_terms SET term = $1 where id = $2",
            [term, id]
        );

        return res.status(200).json({
            message: "Term updated",
        });
    } catch (error) {
        return res.status(500).json({ error: "Could not update, try again" });
    }
};
