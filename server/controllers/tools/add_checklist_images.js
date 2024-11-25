import { pool } from "../../db.js";
import "dotenv/config";
import * as Yup from "yup";

// Post repair jobs
const AddCheckListImagesDeveloper = async (req, res) => {
    const { vehicle_checklist_id, image_url, created_at } = req.body;

    try {
        const { rows } = await pool.query(
            "INSERT INTO vehicle_checklist_images (vehicle_checklist_id, image_url, created_at) values ($1, $2, $3) returning *",
            [vehicle_checklist_id, image_url, created_at]
        );
        return res.status(201).json({
            message: "Image added",
            rows: rows,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export default AddCheckListImagesDeveloper;
