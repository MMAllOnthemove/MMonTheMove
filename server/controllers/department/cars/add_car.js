import { pool } from "../../../db.js";
import * as Yup from "yup";

const carSchema = Yup.object().shape({
    plate_number: Yup.string().required(),
    car_model: Yup.string().required(),
    created_at: Yup.string(),
});

const addCar = async (req, res) => {
    const { plate_number, car_model, created_at } = req.body;

    try {
        await carSchema.validate(req.body, { abortEarly: false });
        const findIfExists = await pool.query(
            "SELECT plate_number from cars where plate_number = $1",
            [plate_number]
        );
        if (findIfExists.rows.length > 0) {
            return res.status(409).json({ message: "Car exists" });
        } else {
            await pool.query(
                "INSERT INTO cars (plate_number, car_model, created_at) values ($1, $2, $3) returning *",
                [plate_number, car_model, created_at]
            );
            return res.status(201).json({
                message: "Successfully created",
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

export default addCar;
