import { pool } from "../../db.js";
import * as Yup from "yup";

const addEngineerSchema = Yup.object({
    engineer_firstname: Yup.string().required("Firstname is required!"),
    engineer_lastname: Yup.string().required("Lastname is required!"),
    engineer_code: Yup.string().required("Type engineer code"),
    department: Yup.string(),
    created_at: Yup.string(),
});

const addEngineers = async (req, res) => {
    const {
        engineer_firstname,
        engineer_lastname,
        engineer_code,
        department,
        created_at,
    } = req.body;
    try {
        await addEngineerSchema.validate(req.body, { abortEarly: false });
        const findIfExists = await pool.query(
            "SELECT engineer_code FROM engineers WHERE engineer_code = $1",
            [engineer_code]
        );

        if (findIfExists.rows.length > 0) {
            return res.status(401).json({
                message: "Engineer already exists",
            });
        }
        const { rows } = await pool.query(
            "INSERT INTO engineers (engineer_firstname, engineer_lastname, engineer_code, department, created_at) VALUES ($1, $2, $3, $4, $5)",
            [
                engineer_firstname,
                engineer_lastname,
                engineer_code,
                department,
                created_at,
            ]
        );
        res.status(201).json({
            message: "Successfully created",
        });
    } catch (error) {
        // to get error for a specific field
        const errors = {};
        error?.inner?.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        res.status(500).json({ errors });
    }
};

export default addEngineers;
