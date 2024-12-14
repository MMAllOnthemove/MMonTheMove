import { pool } from "../../../../db.js";

export const UpdateAssessmentDate = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed in the URL
    const { assessment_date, units_assessed } = req.body; // Get the changed fields from the frontend

    if (!id) return;
    try {
        const query = await pool.query(
            "UPDATE technician_tasks SET assessment_date = $1, units_assessed = $2 WHERE (assessment_date <> $1 OR assessment_date IS NULL) AND (units_assessed <> $2 OR units_assessed IS NULL) AND id = $3",
            [assessment_date, units_assessed, id]
        );
        // If no rows were updated, it could indicate no change or invalid ID, handle that case
        // if (query.rowCount === 0) {
        //     return res.status(404).json({
        //         message: "Did not update assessment date",
        //     });
        // }

        return res.status(200).json({
            message: "DTV/HA task updated",
        });
    } catch (error) {
        console.error("Error updating record:", error);
        return res.status(500).json({ error: "Could not update, try again" });
    }
};
