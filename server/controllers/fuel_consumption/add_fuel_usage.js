import { pool } from "../../db.js";
import * as Yup from "yup";

const addFuelUsageSchema = Yup.object({
    car_name: Yup.string().required(),
    receipt_number: Yup.string().required(),
    odometer: Yup.string().required(),
    filled_volume_litres: Yup.number(),
    fuel_price_per_litre: Yup.number(),
    tank_filled: Yup.string(),
    km_travelled_from_last_refill: Yup.number(),
    litres_travelled_from_last_refill: Yup.number(),
    total_fill_cost: Yup.number(),
    km_consumption_per_litre: Yup.number(),
    km_consumption_per_kilometer: Yup.number(),
    cost_of_the_km: Yup.number(),
    created_at: Yup.string(),
});

const addFuelUsage = async (req, res) => {
    const {
        car_name,
        receipt_number,
        odometer,
        filled_volume_litres,
        fuel_price_per_litre,
        tank_filled,
        km_travelled_from_last_refill,
        litres_travelled_from_last_refill,
        total_fill_cost,
        km_consumption_per_litre,
        km_consumption_per_kilometer,
        cost_of_the_km,
        created_at,
    } = req.body;
    try {
        await addFuelUsageSchema.validate(req.body, { abortEarly: false });

        const { rows } = await pool.query(
            "INSERT INTO vehicle_fuel_consumption (car_name, receipt_number, odometer, filled_volume_litres, fuel_price_per_litre, tank_filled, km_travelled_from_last_refill, litres_travelled_from_last_refill, total_fill_cost, km_consumption_per_litre, km_consumption_per_kilometer, cost_of_the_km, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
            [
                car_name,
                receipt_number,
                odometer,
                filled_volume_litres,
                fuel_price_per_litre,
                tank_filled,
                km_travelled_from_last_refill,
                litres_travelled_from_last_refill,
                total_fill_cost,
                km_consumption_per_litre,
                km_consumption_per_kilometer,
                cost_of_the_km,
                created_at,
            ]
        );
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

export default addFuelUsage;
