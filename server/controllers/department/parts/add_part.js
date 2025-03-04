import { pool } from "../../../db.js";
import "dotenv/config";
import * as Yup from "yup";
import appLogs from "../../logs/logs.js";
import emitLatestPartsAdded from "./emit_latest_parts.js";

const AddPartSchema = Yup.object({
    task_row_id: Yup.number(),
    ticket_number: Yup.string(),
    part_name: Yup.string().required("Part name is required"),
    part_desc: Yup.string().required("Part desc is required"),
    part_quantity: Yup.number()
        .min(1, "Quantity should be min 1")
        .max(4, "Quantity should be max 4")
        .required("Quantity is required"),
    created_at: Yup.string(),
    created_by: Yup.string(),
});

// Post repair jobs
const AddPart = async (req, res) => {
    const {
        task_row_id,
        ticket_number,
        part_name,
        part_desc,
        part_quantity,
        compensation,
        created_at,
        created_by,
    } = req.body;

    try {
        await AddPartSchema.validate(req.body, { abortEarly: false });
        const { rows: existingPart } = await pool.query(
            "SELECT * FROM parts_for_tasks WHERE part_name = $1 and ticket_number = $2 limit 1",
            [part_name, ticket_number]
        );

        if (existingPart.length > 0) {
            return res
                .status(409)
                .json({ message: "Part already added for this ticket" });
        }
        const { rows } = await pool.query(
            "INSERT INTO parts_for_tasks (task_row_id, ticket_number, part_name, part_desc, part_quantity,compensation, created_at, created_by) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
            [
                task_row_id,
                ticket_number,
                part_name,
                part_desc,
                part_quantity,
                compensation,
                created_at,
                created_by,
            ]
        );
        await appLogs("INSERT", created_by, req.body);

        return res.status(201).json({
            message: "Part added",
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
export default AddPart;
