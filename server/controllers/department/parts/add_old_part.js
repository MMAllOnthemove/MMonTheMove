import { pool } from "../../../db.js";
import "dotenv/config";
import * as Yup from "yup";
import appLogs from "../../logs/logs.js";
import emitLatestPartsAdded from "./emit_latest_parts.js";

const AddOldPartSchema = Yup.object({
    task_row_id: Yup.number(),
    ticket_number: Yup.string(),
    old_part_name: Yup.string().required("Part name is required"),
    old_part_desc: Yup.string().required("Part desc is required"),
    created_at: Yup.string(),
    created_by: Yup.string(),
});

// Post repair jobs
const AddOldPart = async (req, res) => {
    const {
        task_row_id,
        ticket_number,
        old_part_name,
        old_part_desc,
        is_old_part,
        created_at,
        created_by,
    } = req.body;
    try {
        await AddOldPartSchema.validate(req.body, { abortEarly: false });
        const { rows: existingPart } = await pool.query(
            "SELECT * FROM parts_for_tasks WHERE part_name = $1 and ticket_number = $2 limit 1",
            [old_part_name, ticket_number]
        );

        if (existingPart.length > 0) {
            return res
                .status(409)
                .json({ message: "Old part already added for this ticket" });
        }
        const { rows } = await pool.query(
            "INSERT INTO parts_for_tasks (task_row_id, ticket_number, part_name, part_desc, is_old_part, created_at, created_by) values ($1, $2, $3, $4, $5, $6, $7) returning *",
            [
                task_row_id,
                ticket_number,
                old_part_name,
                old_part_desc,
                is_old_part,
                created_at,
                created_by,
            ]
        );
        await appLogs("INSERT", created_by, req.body, ticket_number);
        return res.status(201).json({
            message: "Old part added",
            part: rows[0],
        });
    } catch (error) {
        // to get error for a specific field
        const errors = {};
        if (error.inner) {
            error?.inner?.forEach((err) => {
                errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
            });
            return res.status(500).json({ errors });
        }
        // Handle other errors
        return res.status(500).json({ message: "Internal server error" });
    }
};
export default AddOldPart;
