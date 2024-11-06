import { pool } from "../../db.js";
import * as Yup from "yup";

const addStoreSchema = Yup.object({
    store_name: Yup.string().required("Please enter store name"),
});

const addStore = async (req, res) => {
    const { store_name, created_at } = req.body;
    try {
        await addStoreSchema.validate(req.body, { abortEarly: false });
        const { rows } = await pool.query(
            "INSERT INTO stores (store_name, created_at) VALUES ($1, $2)",
            [store_name, created_at]
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

export default addStore;
