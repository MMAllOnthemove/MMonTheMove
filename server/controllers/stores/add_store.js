import { pool } from "../../db.js";
import * as Yup from "yup";

const addStoreSchema = Yup.object({
    store_name: Yup.string().required("Please enter store name"),
});

const addStore = async (req, res) => {
    const { store_name } = req.body;
    try {
        await addStoreSchema.validate(req.body, { abortEarly: false });
        const { rows } = await pool.query(
            "INSERT INTO stores (store_name) VALUES ($1)",
            [store_name]
        );

        res.status(201).json({
            message: "Successfully created",
        });
    } catch (error) {
        // to get error for a specific field
        const errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        res.status(500).json({ errors });
    }
};

export default addStore;
