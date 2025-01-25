import { pool } from "../../../db.js";
import "dotenv/config";
import * as Yup from "yup";

const AddAssemblyTermsSchema = Yup.object({
    term: Yup.string(),
    bold: Yup.boolean(),
    created_at: Yup.string(),
});

const AddAssemblyTerms = async (req, res) => {
    const { term, bold, created_at } = req.body;
    try {
        await AddAssemblyTermsSchema.validate(req.body, { abortEarly: false });
        const findIfExists = await pool.query(
            "SELECT * from assembly_terms WHERE term = $1 limit 1",
            [term]
        );

        if (findIfExists.rows.length > 0) {
            return res.status(409).json({
                message: "Term exists",
            });
        } else {
            const { rows } = await pool.query(
                "INSERT INTO assembly_terms (term, bold, created_at) values ($1, $2, $3) returning *",
                [term, bold, created_at]
            );

           
            return res.status(201).json({
                message: "Term created",
                terms: rows,
            });
        }
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
export default AddAssemblyTerms;
