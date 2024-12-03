import { pool } from "../../db.js";
import * as Yup from "yup";

// Define Yup schema for request body validation
const updateChecklistSchema = Yup.object({
    rowId: Yup.string(),
    mileage_after: Yup.string(),
    next_service_date: Yup.string(),
    next_service_kms: Yup.string(),
    license_disc_expiry: Yup.string(),
});

const updateChecklist = async (req, res) => {
    const {
        rowId,
        mileage_after,
        next_service_date,
        next_service_kms,
        license_disc_expiry,
    } = req.body;
    try {
        // Validate request body
        await updateChecklistSchema.validate(req.body, { abortEarly: false });
        const result = await pool.query(
            "UPDATE vehicle_checklist SET mileage_after = $1, next_service_date = $2, next_service_kms = $3, license_disc_expiry = $4  WHERE id = $5",
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

        return res.status(200).json({
            message: "Successfully updated",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Could not update, try again" });
    }
};

export default updateChecklist;
