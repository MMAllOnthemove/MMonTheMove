import { pool } from "../../db.js";
import * as Yup from "yup";

const addAgentsSchema = Yup.object({
    agent_firstname: Yup.string().required("Firstname is required!"),
    agent_lastname: Yup.string().required("Lastname is required!"),
    department: Yup.string(),
});

const addAgent = async (req, res) => {
    const { agent_firstname, agent_lastname, department } = req.body;
    try {
        await addAgentsSchema.validate(req.body, { abortEarly: false });
        const { rows } = await pool.query(
            "INSERT INTO booking_agents (agent_firstname, agent_lastname, department) VALUES ($1, $2, $3)",
            [agent_firstname, agent_lastname, department]
        );

        res.status(201).json({
            message: "Successfully created",
        });
    } catch (error) {
        console.error("add agent failed:", error);

        // to get error for a specific field
        const errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        console.log("errors", errors);
        res.status(500).json({ errors });
    }
};

export default addAgent;
