import { pool } from "../../db.js";
import * as Yup from "yup";

const addAgentsSchema = Yup.object({
    ticket_number: Yup.string().required("Ticket number is required!"),
    created_by: Yup.string(),
    created_at: Yup.string(),
    booking_agent: Yup.string().required("Select booking agent!"),
});

const addBookingAgentTask = async (req, res) => {
    const { ticket_number, created_by, booking_agent, created_at } = req.body;
    try {
        await addAgentsSchema.validate(req.body, { abortEarly: false });
        const findIfExists = await pool.query(
            "SELECT ticket_number from booking_agents_tasks where ticket_number = $1",
            [ticket_number]
        );
        if (findIfExists.rows.length > 0) {
            res.status(401).json({ message: "Task already exists" });
        } else {
            const { rows } = await pool.query(
                "INSERT INTO booking_agents_tasks (ticket_number, created_by, booking_agent, created_at) VALUES ($1, $2, $3, $4)",
                [ticket_number, created_by, booking_agent, created_at]
            );

            res.status(201).json({
                message: "Successfully created",
            });
        }
    } catch (error) {
        // to get error for a specific field
        const errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        res.status(500).json({ errors });
    }
};

export default addBookingAgentTask;
