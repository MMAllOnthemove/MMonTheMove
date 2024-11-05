import { pool } from "../../db.js";
import * as Yup from "yup";

const addAgentsSchema = Yup.object({
    agent_firstname: Yup.string().required("Firstname is required!"),
    agent_lastname: Yup.string().required("Lastname is required!"),
    department: Yup.string(),
});

const addEngineers = async (req, res) => {
    const payload = req.body;

    const keys = Object.keys(payload);
    const values = Object.values(payload);
    // Construct dynamic SQL query for patching only changed values using prepared statements
    const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");

    // The query with placeholders ($1, $2, ..., $n) for prepared statements
    const query = `INSERT INTO engineers (${keys.join(", ")}) VALUES (${keys
        .map((_, index) => `$${index + 1}`)
        .join(", ")}) RETURNING *`;

    try {
        // await addAgentsSchema.validate(req.body, { abortEarly: false });
        // Execute the prepared statement query
        const result = await pool.query({
            text: query,
            values: values,
        });

        res.status(201).json({
            message: "Successfully created",
        });
    } catch (error) {
        //
        // to get error for a specific field
        // const errors = {};
        // error.inner.forEach((err) => {
        //     errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        // });
        // res.status(500).json({ errors });
    }
};

export default addEngineers;
