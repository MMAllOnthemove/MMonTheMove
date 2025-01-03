import { pool } from "../../db.js";
import * as Yup from "yup";

const addDriversSchema = Yup.object({
    driver_firstname: Yup.string().required("Firstname is required!"),
    driver_lastname: Yup.string().required("Lastname is required!"),
    created_at: Yup.string(),
});

const addDrivers = async (req, res) => {
    const payload = req.body;

    const keys = Object.keys(payload);
    const values = Object.values(payload);
    // Construct dynamic SQL query for patching only changed values using prepared statements
    const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");

    // The query with placeholders ($1, $2, ..., $n) for prepared statements
    const query = `INSERT INTO drivers (${keys.join(", ")}) VALUES (${keys
        .map((_, index) => `$${index + 1}`)
        .join(", ")}) RETURNING *`;

    try {
        await addDriversSchema.validate(req.body, { abortEarly: false });
        const result = await pool.query({
            text: query,
            values: values,
        });

        return res.status(201).json({
            message: "Successfully created",
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

export default addDrivers;
