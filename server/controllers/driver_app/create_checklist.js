import { pool } from "../../db.js";
import * as Yup from "yup";

const addAgentsSchema = Yup.object({
    agent_firstname: Yup.string().required("Firstname is required!"),
    agent_lastname: Yup.string().required("Lastname is required!"),
    department: Yup.string(),
});

const createChecklist = async (req, res) => {
    const {
        ticket_number,
        reason_for_use,
        driver,
        foot_brakes,
        emergency_brake,
        steering_wheel,
        windshield,
        rear_window,
        windshield_wipers,
        headlights,
        tail_lights,
        turn_indicator_lights,
        stop_lights,
        front_seat_adjustment,
        doors,
        horn,
        speedometer,
        bumpers,
        muffler_exhaust_system,
        tires,
        interior_exterior_view_mirros,
        safety_belts,
        engine_start_stop,
        final_comment,
        next_service_date,
        cost_of_service,
        created_by,
        mileage,
        license_plate,
        vehicle_make,
        vehicle_model,
        vehicle_year,
        vehicle_color,
        vehicle_type,
        triangle,
        car_jack,
        spare_wheel,
        hass,
        tools,
        created_at,
    } = req.body;
    try {
        // await addAgentsSchema.validate(req.body, { abortEarly: false });
        const { rows } = await pool.query(
            "INSERT INTO vehicle_checklist (ticket_number, reason_for_use, driver, foot_brakes, emergency_brake, steering_wheel, windshield, rear_window, windshield_wipers, headlights, tail_lights, turn_indicator_lights, stop_lights, front_seat_adjustment, doors, horn, speedometer, bumpers, muffler_exhaust_system, tires, interior_exterior_view_mirros, safety_belts, engine_start_stop, final_comment, next_service_date, cost_of_service, created_by, mileage, license_plate, vehicle_make, vehicle_model, vehicle_year, vehicle_color, vehicle_type, triangle, car_jack, spare_wheel, hass, tools, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40)",
            [
                ticket_number,
                reason_for_use,
                driver,
                foot_brakes,
                emergency_brake,
                steering_wheel,
                windshield,
                rear_window,
                windshield_wipers,
                headlights,
                tail_lights,
                turn_indicator_lights,
                stop_lights,
                front_seat_adjustment,
                doors,
                horn,
                speedometer,
                bumpers,
                muffler_exhaust_system,
                tires,
                interior_exterior_view_mirros,
                safety_belts,
                engine_start_stop,
                final_comment,
                next_service_date,
                cost_of_service,
                created_by,
                mileage,
                license_plate,
                vehicle_make,
                vehicle_model,
                vehicle_year,
                vehicle_color,
                vehicle_type,
                triangle,
                car_jack,
                spare_wheel,
                hass,
                tools,
                created_at,
            ]
        );

        res.status(201).json({
            message: "Successfully created",
        });
    } catch (error) {
        console.log(error);
        // to get error for a specific field
        const errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.message; // `err.path` is the field name, `err.message` is the error message
        });
        res.status(500).json({ errors });
    }
};

export default createChecklist;
