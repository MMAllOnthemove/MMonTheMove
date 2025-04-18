import { pool } from "../../../../db.js";
import appLogs from "../../../logs/logs.js";

export const UpdateAssessmentDate = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed in the URL
<<<<<<< HEAD
    const { assessment_date, units_assessed, created_by } = req.body; // Get the changed fields from the frontend
=======
    const { assessment_date, units_assessed, created_by, ticket_number } =
        req.body; // Get the changed fields from the frontend
>>>>>>> origin/sockets-realtime
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
<<<<<<< HEAD
        await appLogs("UPDATE", created_by, req.body);
=======
        await appLogs("UPDATE", created_by, req.body, ticket_number);
>>>>>>> origin/sockets-realtime
        return res.status(200).json({
            message: "HHP task updated",
        });
    } catch (error) {
        return res.status(500).json({ error: "Could not update, try again" });
    }
};
