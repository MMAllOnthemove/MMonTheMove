import { pool } from "../../db.js";
import * as Yup from "yup";

// Define Yup schema for request body validation
const updateChecklistSchema = Yup.object({
    rowId: Yup.string(),
    mileage_after: Yup.string(),
    next_service_date: Yup.string(),
});

const updateChecklist = async (req, res) => {
    const { rowId, mileage_after, next_service_date } = req.body;
    try {
        // Validate request body
        await updateChecklistSchema.validate(req.body, { abortEarly: false });
        const result = await pool.query(
            "UPDATE vehicle_checklist SET mileage_after = $1, next_service_date = $2 WHERE id = $3 RETURNING *",
            [mileage_after, next_service_date, rowId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Checklist item not found" });
        }

        res.status(200).json({
            message: "Successfully updated",
            updatedItem: result.rows[0], // Optionally return the updated item
        });
    } catch (error) {
        res.status(500).json({ error: "Could not update, try again" });
    }
};

export default updateChecklist;
