import { pool } from "../../db.js";
import * as Yup from "yup";

const addEngineersSchema = Yup.object({
    engineer_firstname: Yup.string().required("Firstname is required!"),
    engineer_lastname: Yup.string().required("Lastname is required!"),
    department: Yup.string(),
});

const addEngineers = async (req, res) => {
    const { engineer_firstname, engineer_lastname, department } = req.body;
    try {
        await addEngineersSchema.validate(req.body, { abortEarly: false });
        const { rows } = await pool.query(
            "INSERT INTO engineers (engineer_firstname, engineer_lastname, department) VALUES ($1, $2, $3)",
            [engineer_firstname, engineer_lastname, department]
        );

        res.status(201).json({
            message: "Successfully created",
        });
    } catch (error) {
        console.error("add engineer failed:", error);

        // to get error for a specific field
        const errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        console.log("errors", errors);
        res.status(500).json({ errors });
    }
};

export default addEngineers;
