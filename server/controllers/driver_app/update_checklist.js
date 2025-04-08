import { pool } from "../../db.js";
import * as Yup from "yup";
import appLogs from "../logs/logs.js";

// Define Yup schema for request body validation
const updateChecklistSchema = Yup.object({
    rowId: Yup.string(),
    mileage_after: Yup.string(),
});

const updateChecklist = async (req, res) => {
    const {
        rowId,
        mileage_after,
        next_service_date,
        next_service_kms,
        license_disc_expiry,
        created_by,
    } = req.body;
    try {
        // Validate request body
        await updateChecklistSchema.validate(req.body, { abortEarly: false });
        const result = await pool.query(
<<<<<<< HEAD
            "UPDATE vehicle_checklist SET mileage_after = $1, next_service_date = $2, next_service_kms = $3, license_disc_expiry = $4 WHERE id = $5",
=======
            "UPDATE vehicle_checklist SET mileage_after = $1, next_service_date = $2, next_service_kms = $3, license_disc_expiry = $4 WHERE id = $5 returning *",
>>>>>>> origin/sockets-realtime
            [
                mileage_after,
                next_service_date,
                next_service_kms,
                license_disc_expiry,
                rowId,
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Checklist item not found" });
        }
        await appLogs("UPDATE", created_by, req.body);
        return res.status(200).json({
            message: "Successfully updated",
<<<<<<< HEAD
=======
            rows: result.rows[0],
>>>>>>> origin/sockets-realtime
        });
    } catch (error) {
        return res.status(500).json({ error: "Could not update, try again" });
    }
};

export default updateChecklist;
