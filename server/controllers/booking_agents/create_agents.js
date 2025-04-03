import { pool } from "../../db.js";
import * as Yup from "yup";
import appLogs from "../logs/logs.js";

const addAgentsSchema = Yup.object({
    agent_firstname: Yup.string().required("Firstname is required!"),
    agent_lastname: Yup.string().required("Lastname is required!"),
    created_at: Yup.string(),
    department: Yup.string(),
});

const addAgent = async (req, res) => {
    const {
        agent_firstname,
        agent_lastname,
        department,
        created_at,
        created_by,
    } = req.body;
    try {
        await addAgentsSchema.validate(req.body, { abortEarly: false });

        // Check if agent already exists (optional, can be adjusted based on your use case)
        const { rows: existingAgent } = await pool.query(
            "SELECT * FROM booking_agents WHERE agent_firstname = $1 AND agent_lastname = $2",
            [agent_firstname, agent_lastname]
        );

        if (existingAgent.length > 0) {
            return res
                .status(409)
                .json({ message: "Booking agent already exists" });
        }
        const { rows } = await pool.query(
            "INSERT INTO booking_agents (agent_firstname, agent_lastname, department, created_at) VALUES ($1, $2, $3, $4)",
            [agent_firstname, agent_lastname, department, created_at]
        );

        // store logs

        await appLogs("INSERT", created_by, req.body);
        return res.status(201).json({
            message: "Successfully created",
        });
    } catch (error) {
        // Handle validation or other errors
        const errors = {};
        if (error.inner) {
            error.inner.forEach((err) => {
                errors[err.path] = err.message; // Collect field validation errors
            });
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default addAgent;
