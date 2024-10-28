import { pool } from "../../db.js";
import * as Yup from "yup";

const addAgentsSchema = Yup.object({
    ticket_number: Yup.string().required("Ticket number is required!"),
    created_by: Yup.string(),
    booking_agent: Yup.string(),
});

const addBookingAgentTask = async (req, res) => {
    const { ticket_number, created_by, booking_agent } = req.body;
    try {
        await addAgentsSchema.validate(req.body, { abortEarly: false });
        const { rows } = await pool.query(
            "INSERT INTO booking_agents_tasks (ticket_number, created_by, booking_agent) VALUES ($1, $2, $3)",
            [ticket_number, created_by, booking_agent]
        );

        res.status(201).json({
            message: "Successfully created",
        });
    } catch (error) {
        console.error("add booking_agents_tasks failed:", error);

        // to get error for a specific field
        const errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        console.log("errors", errors);
        res.status(500).json({ errors });
    }
};

export default addBookingAgentTask;
