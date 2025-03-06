import { pool } from "../../db.js";
import * as Yup from "yup";
import appLogs from "../logs/logs.js";
import emitBookingStatsUpdate from "./emit_live_updates.js";

const addAgentsSchema = Yup.object({
    ticket_number: Yup.string().required("Ticket number is required!"),
    created_by: Yup.string(),
    created_at: Yup.string(),
    original_ticket_date: Yup.string(),
    problemType: Yup.string(),
    booking_agent: Yup.string().required("Select booking agent!"),
});

const addBookingAgentTask = async (req, res) => {
    const {
        ticket_number,
        created_by,
        booking_agent,
        created_at,
        original_ticket_date,
        problemType,
    } = req.body;
    try {
        await addAgentsSchema.validate(req.body, { abortEarly: false });
        const findIfExists = await pool.query(
            "SELECT ticket_number from booking_agents_tasks where ticket_number = $1",
            [ticket_number]
        );

        // check if it has 'HHP'
        if (!problemType.includes("HHP"))
            return res.status(401).json({ message: "Not an HHP ticket" });

        // check if the task already exists in the database before creating a new one
        if (findIfExists.rows.length > 0) {
            return res.status(401).json({ message: "Task already exists" });
        } else {
            const { rows } = await pool.query(
                "INSERT INTO booking_agents_tasks (ticket_number, created_by, booking_agent, created_at, original_ticket_date) VALUES ($1, $2, $3, $4, $5) returning *",
                [
                    ticket_number,
                    created_by,
                    booking_agent,
                    created_at,
                    original_ticket_date,
                ]
            );
            await appLogs("INSERT", created_by, req.body);
            emitBookingStatsUpdate();
            return res.status(201).json({
                message: "Successfully created",
                task: rows[0],
            });
        }
    } catch (error) {
        console.log("error booking agent task", error);
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

export default addBookingAgentTask;
